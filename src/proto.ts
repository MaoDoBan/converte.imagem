import { Node } from "./classes/Tree/Node.ts";
// import { Color } from "./classes/Color.ts";


//const Arvere = new Node();
console.log(await Node.populateAllNodes());
//console.log(Node.growTree(32));

const past = Date.now();
// console.log("buscando 0 0 0: ",Node.sequentialSearch([0,0,0]));
// console.log("buscando perto 0 0 0: ",Node.sequentialSearch([0,0,0], "near"));
// console.log("buscando 128 128 128: ",Node.sequentialSearch([128,128,128]));


console.log("Demorou ms: "+(Date.now()-past));


// const qt = 50;
// const stringDistances = Color.populateDistances( Object.values(palette) as Color[], qt );
// const qtDistances = qt+"\n\n" + Color.listHowManyDistances( Object.values(palette) as Color[] );




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

/*
Dict={--salvar em hex
  a="3de",...
}
Dados={
  {"x","y",0,0,0,100,"abfasdfasgSKFFAMSOFImisisjdfisaADFAdfa"},
  {}...
};

///colocar um indicador do "nível de compressão", pra não comprimir poucos dados pq não precisa (medir a quantidade de dados pra decidir)

--fazer calculo se vale a pena por como variável, medindo nome da var, largura do valor, vezes que se repete e somando 2 por causa das aspas
local a,b,c=10,11,19f  --19f seria: qt blockId data
DadosOld3={
  {"x","y",100,0,0,0,c,"27a",c,"44eb","11_"}
  --direçãoX, direçãoY, largura, x, y, z, ...[qt blockId data | qt ar]
  --aceitaria gerar várias imagens, cada uma com eixo, largura, coo diferentes
};

local a,b,c=10,11,{19f}  --no {19f} seria {qt}
DadosOld2 = {
  "x",
  {0,0,0,2,1,0,"a",2,15,1,3,"a",3,"a",0},
  {"a",1,"a",2,1,0,"a",2,15,1,3,"a",3,"a",0}
};

DadosOld = {
  "x",
  {0,0,0,2,1,0,"a",2,15,1,3,"a",3,"a",0},
  {"a",1,"a",2,1,0,"a",2,15,1,3,"a",3,"a",0}
};
*/


///fazer um teste de gerar cor aleatória, umas 10'000'000, e rodar 2 buscas (a informada e a linear),
///  e pensar em como salvar esses dados (de tempo total, quantia de nós vistos até "finalizar a busca" e de distância (poderia ter um
///  contador de acertos da informada e uma lista dos erros com a distância inf e lin))

///ou se em vez de ter 1 nó inicial de busca (128,128,128), pegar uns 6 aleatórios e partir do mais próximo
///poderia ter um híbrido, onde a 7ª opção é o incial central
///testar tb 7 pontos fixos
///9 fixos: 8 nas quinas e 1 central; 8 fixos centralizados no octantes

///todo nodo poderia salvar os 32 visinhos mais próximos apenas

///testar com 1 vizinho só salvo, pra ver a maior distância
///salvar os nodes referenciados por outros, e ver alguma forma de saber se todos se referenciam?... ou só testar busca pra isso


///gerar a imagem pra 2 direções, dai comparar o tamanho do output e escolher o menor
///colocar letras nos nodes, pro idBlock pra reduzir o tamanho do arquivo lua.
///em vez do de cima, contar números que se repetem


///site: poder redimensionar as imagens
/// poder upar várias, e posicionar de forma diferente em relação as outras
/// poder gerar um "cubo" com a imagem, ou um "cilindro quadrado..."

////lua: possibilitar gerar em qualquer eixo trocando o "eixo" no script
////lua: gerar de 5000 em 5000 || escrever no "chat" de 1k em 1k
////lua: teleportar o player pra certo local, esperar, continuar gerando (pra imagens gigantes)

