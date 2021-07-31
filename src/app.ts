import { Image } from "https://deno.land/x/imagescript@1.2.9/mod.ts";
import { Palette } from "./classes/Palette.ts";
import { Color } from "./classes/Color.ts";


const past = Date.now();
const palette = new Palette();
console.log("Populou "+palette.length+" Cores!");

const qt = 60;
const stringDistances = Color.populateDistances( Object.values(palette) as Color[], qt );
const qtDistances = qt+"\n\n" + Color.listHowManyDistances( Object.values(palette) as Color[] );

console.log("Demorou ms: "+(Date.now()-past));
const encoder = new TextEncoder();
const encodedString = encoder.encode(qtDistances);//stringDistances
await Deno.writeFile("src/colorPalette/limit_qt_distances.txt", encodedString);//distancias


console.log("Demorou tudo após salvar ms: "+(Date.now()-past));



// const fileName = "t3x3";//"maum";
// const rawImage = await Deno.readFile("paleta_cores/"+fileName+".png");
// const imageDecoded = await Image.decode(rawImage);
// console.log(imageDecoded);//.bitmap


/*
::todo:
ler rgbPaletteSorted.json
converter pra lista duplamente encadeada

ler raw image
decodificar imagem
pegar o bitmap
pegar a largura e a altura da imagem
para altura
  para largura //o i desse setado antes do para altura, e continua sendo incrementado
    convertePixelPraBloco();
  }
}

function convertePixelPraBloco({r,g,b,opacity})
  convertidos array ///essa aqui tem que checar antes de fazer a busca na paleta, vai que já converteu essa cor
  /// se eu usar a estrutura de r.g.b.bloco poderia medir a distância (somando a diferença de r, g, b e podando as maiores que a que já tem)
  /// outra opção é salvar uma árvore com os decimal convertido dos hex

  ///calcular distância 3d

*/

//data struct do bitmap: [r,g,b,opacity,...]
