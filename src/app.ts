import { Image } from "https://deno.land/x/imagescript@1.2.9/mod.ts";

const fileName = "t3x3";//"maum";
const rawImage = await Deno.readFile("paleta_cores/"+fileName+".png");
const imageDecoded = await Image.decode(rawImage);
console.log(imageDecoded);//.bitmap


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
