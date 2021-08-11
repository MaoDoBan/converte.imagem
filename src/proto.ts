/*
::todo:
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
Dict={a="3de",...};
Dados={
  {"x","y",0,0,0,100,"abfasdfasgSKFFAMSOFImisisjdfisaADFAd,fa"},//vírgula indica que não ta no dict
  {}...
};

v="zzzz"
///colocar um indicador do "nível de compressão", pra não comprimir poucos dados pq não precisa (medir a quantidade de dados pra decidir) 300'000 parece um bom limite
/// tamanhos enormes precisa dividir em pedaços de 512x512

--fazer calculo se vale a pena por como variável, medindo nome da var, largura do valor, vezes que se repete e somando 2 por causa das aspas
local a,b,c=10,11,19f  --19f seria: qt blockId data
DadosOld3={
  {"x","y",100,0,0,0,c,"27a",c,"44eb","11_"}
  --direçãoX, direçãoY, largura, x, y, z, ...[qt blockId data | qt ar]
  --aceitaria gerar várias imagens, cada uma com eixo, largura, coo diferentes
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

