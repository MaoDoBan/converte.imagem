import { Image } from "https://deno.land/x/imagescript@1.2.9/mod.ts";
import { Palette } from "./classes/Palette.ts";
import { Color } from "./classes/Color.ts";


const past = Date.now();
const palette = new Palette();
console.log("Populou "+palette.length+" Cores!");

const qt = 50;
const stringDistances = Color.populateDistances( Object.values(palette) as Color[], qt );
const qtDistances = qt+"\n\n" + Color.listHowManyDistances( Object.values(palette) as Color[] );

const encoder = new TextEncoder();
const encodedString = encoder.encode(qtDistances);//stringDistances
await Deno.writeFile("src/colorPalette/limit_qt_distances.txt", encodedString);//distancias


console.log("Demorou ms: "+(Date.now()-past));



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

///fazer um teste de gerar cor aleatória, umas 10'000'000, e rodar 2 buscas (a informada e a linear),
///  e pensar em como salvar esses dados (de tempo total, quantia de nós vistos até "finalizar a busca" e de distância (poderia ter um
///  contador de acertos da informada e uma lista dos erros com a distância inf e lin))

///ou se em vez de ter 1 nó inicial de busca (128,128,128), pegar uns 6 aleatórios e partir do mais próximo
///poderia ter um híbrido, onde a 7ª opção é o incial central
///testar tb 7 pontos fixos

///todo nodo poderia salvar os 32 visinhos mais próximos apenas

//data struct do bitmap: [r,g,b,opacity,...]
