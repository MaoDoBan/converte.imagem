import { readJson } from "https://deno.land/x/jsonfile@1.0.0/mod.ts";

type RawPalette = { [blockId: number]: number[][] };
type RetornoDistância = { lista: string, qt: number };
type Cor = {
  index: number,
  hex: string,
  r: number, g: number, b: number,
  distâncias: number[]
};
type CoresListadas = { [hex: string]: Cor };

const antes = Date.now();


function distância(cor1: Cor, cor2: Cor): number{
  const distânciaRed   = cor1.r - cor2.r;
  const distânciaGreen = cor1.g - cor2.g;
  const distânciaBlue  = cor1.b - cor2.b;
  const distância = Math.sqrt(
    distânciaRed   * distânciaRed   +
    distânciaGreen * distânciaGreen +
    distânciaBlue  * distânciaBlue
  );

  cor1.distâncias[cor2.index] = distância;
  cor2.distâncias[cor1.index] = distância;
  return distância;
}
function distânciasDaCor(cor: Cor, listaCores: Cor[], retorno: RetornoDistância): RetornoDistância{
  for(const outraCor of listaCores){
    if(cor.distâncias[outraCor.index]) continue;
    retorno.qt++;
    retorno.lista += distância(cor, outraCor)+"\n";
  }

  return retorno;
}

function rgbPraHex(valoresRgb: number[]): string{
  let corHex = "";
  for(const valor of valoresRgb){
    corHex += valor.toString(16); //dec pra hex
  }
  return corHex;
}
function novaCor(corRgb: number[], index: number): Cor{
  return {
    index: index,
    hex: rgbPraHex(corRgb),
    r: corRgb[0],
    g: corRgb[1],
    b: corRgb[2],
    distâncias: []
  };
}
function geraListaCores(paleta: RawPalette): Cor[]{
  const coresListadas: CoresListadas = {};
  const listaCores: Cor[] = [];
  let index = 0;
  for(let blockId = 667; blockId <= 682; blockId++){
    for(let metadata = 0; metadata <= 15; metadata++){
      const corNova = novaCor(paleta[blockId][metadata], index);
      if(coresListadas[corNova.hex]) continue;
      listaCores[index] = corNova;
      index++;
      coresListadas[corNova.hex] = corNova;
    }
  }
  return listaCores;
}

function calculaDistâncias(paleta: RawPalette): RetornoDistância{
  let retorno = {lista: "", qt: 0};

  const listaCores = geraListaCores(paleta);
  for(const cor of listaCores){
    retorno = distânciasDaCor(cor, listaCores, retorno);
  }

  return retorno;
}


const rawPalette: RawPalette = await readJson('src/colorPalette/paleta_cores_rgb.json') as RawPalette;
const distâncias = calculaDistâncias(rawPalette);
console.log("Qt distâncias:",distâncias.qt);

const encoder = new TextEncoder();
const distânciaCodificada = encoder.encode(distâncias.lista);
await Deno.writeFile("src/colorPalette/distancias.txt", distânciaCodificada);

console.log("Demorou ms: "+(Date.now()-antes));