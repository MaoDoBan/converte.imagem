let tabela0 = "0";
let ct = 0;
for(let i = 0; i < 38; ){
  ct++;
  if( tabela0.includes( ct.toString(2) ) ) continue;
  tabela0 += ct.toString(2); i++;
}
console.log(tabela0.length, tabela0);
//console.log(parseInt(tabela, 2))


function começaComOutraEtiqueta(table: string[]){
  ;
}
const tabela = ["0"];
ct = 0;
let etiqueta = "";
for(let i = 1; i < 38; ){
  ct++;
  etiqueta = ct.toString(2);
  if( tabela.includes(etiqueta) ) continue
  tabela[i] = etiqueta;
  i++;
}
console.log("tabela:", tabela);


// const obi = {fileName: "stringui", lAxis: "x", cAxis: "z", x: 1, y: 11, z: 3};
// console.log(obi);

// let bah = [];

// const {fileName, ...o2} = obi;
// console.log(fileName, o2);


// for(let iColumn = 0; iColumn < 6; iColumn++){///
//   //const line: number[] = [];
//   const ar = [];
//   for(let iLine = 0; iLine < 3; iLine++){///
//     const i = iColumn*4 + iLine*4*6;
//     ar.push(i)//console.log(i);
//   }
//   console.log(ar)
//   //lines.push(line);
// }