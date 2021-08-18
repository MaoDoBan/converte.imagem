import { readJsonSync } from "https://deno.land/x/jsonfile@1.0.0/mod.ts";

let ct = [0,0,0];
function logTempo(passado: number, indice: number, txt: string){
  let diferença = Date.now() - passado;
  ct[indice] += diferença;
  //console.log("Tempo pra "+txt+": "+ ( diferença ) +"ms");
  return Date.now();
}
type Count = { [dado: string]: number };

let passado = Date.now();
const dadosBrutos = readJsonSync("io/Nanda_dados_brutos.json") as string[];
//passado = logTempo(passado, "ler arquivo");

let dadu;
function contar(){
  const contador1: Count = {};
  for(const dado of dadosBrutos){
    if( contador1[dado] ){
      contador1[dado]++;
      continue;
    }
    contador1[dado] = 1;
  }
  passado = logTempo(passado, 0, "contar1");
  //console.log(contador1);//return;

  const contador2: Count = {};
  for(const dado of dadosBrutos){
    dadu = dado;
    if( !contador2[dadu] ){
      contador2[dadu] = 1;
      continue;
    }
    contador2[dadu]++;
  }
  passado = logTempo(passado, 1, "contar1");

  // const contador2: Count = {};
  // for(const dado of dadosBrutos){
  //   contador2[dado] = contador2[dado] ? ++contador2[dado] : 1;
  // }
  // passado = logTempo(passado, 1, "contar2   ");
  // //console.log(contador2);

  // const contador3: Count = {};
  // for(const dado of dadosBrutos){
  //   contador3[dado] = 0;
  // }
  // for(const dado of dadosBrutos){
  //   contador3[dado]++;
  // }
  // passado = logTempo(passado, 2, "contar3      ");
  //console.log(contador3);
}
//contar();
for (let i = 0; i < 100000; i++){
  contar();
}
console.log(ct);


// console.log(Deno.args[0]);
// const [fileName] = Deno.args;
// console.log(fileName.split('.')[0]);


// let tabela0 = "0";
// let ct = 0;
// for(let i = 0; i < 38; ){
//   ct++;
//   if( tabela0.includes( ct.toString(2) ) ) continue;
//   tabela0 += ct.toString(2); i++;
// }
// console.log(tabela0.length, tabela0);
// //console.log(parseInt(tabela, 2))


// const obi = {fileName: "stringui", lAxis: "x", cAxis: "z", x: 1, y: 11, z: 3};
// console.log(obi);

// let bah = [];

// const {fileName, ...o2} = obi;
// console.log(fileName, o2);