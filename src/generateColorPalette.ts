import { Image } from "https://deno.land/x/imagescript@1.2.9/mod.ts";
import { writeJson } from "https://deno.land/x/jsonfile@1.0.0/mod.ts";

const msPast = Date.now();
const colorsHex: { [blockId: number]: string[] } = {};
const colorsRgb: { [blockId: number]: number[][] } = {};

function fillHex(hex: string){
  const need0s = 8 - hex.length;
  for(let i = 0; i < need0s; i++) {
    hex = "0" + hex;
  }
  return hex;
}

for(let blockId = 667; blockId <= 682; blockId++) {
  const fifteenColorsHex: string[] = [];
  const fifteenColorsRgb: number[][] = [];

  for(let metadata = 0; metadata <= 15; metadata++) {
    const rawImage = await Deno.readFile("paleta_cores/"+blockId+"_"+metadata+".png");
    const imageDecoded = await Image.decode(rawImage);

    const colorHexDecimal = imageDecoded.averageColor();
    const colorHexWithOpacity = colorHexDecimal.toString(16);
    const colorHexWithOpacity8chars = fillHex(colorHexWithOpacity); 
    const colorHex = colorHexWithOpacity8chars.substr(0, 6);//removendo os 2 últimos chars (ff de opacidade)

    const colorRgb: number[] = [];
    for(let i = 0; i <= 4; i += 2) {
      colorRgb[i/2] = parseInt(colorHex.substr(i, 2), 16);
    }

    fifteenColorsHex[metadata] = colorHex;
    fifteenColorsRgb[metadata] = colorRgb;
  }

  colorsHex[blockId] = fifteenColorsHex;
  colorsRgb[blockId] = fifteenColorsRgb;
}

await writeJson("paleta_cores_hex.json", colorsHex, {spaces: 2});
await writeJson("paleta_cores_rgb.json", colorsRgb, {spaces: 2});

console.log("Feito em "+ (Date.now() - msPast) +"ms");