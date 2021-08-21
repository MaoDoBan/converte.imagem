class multiDict{
  [index: number, second: number]: string;
}


// function sortBy<T>( array: Array<T>, selector: ((el: T) => number) ): Array<T>{
//   const ret = Array.from(array);

//   return ret.sort((a, b) => {
//     const selectedA = selector(a);
//     const selectedB = selector(b);

//     if (selectedA > selectedB) return 1;
//     if (selectedA < selectedB) return -1;
//     return 0;
//   });
// }
// const people = [
//   { name: 'Vii', age: 54 },
//   { name: 'Tah', age: 23 },
//   { name: 'Anna', age: 34 },
//   { name: 'Kim', age: 42 },
//   { name: 'John', age: 23 },
//   { name: 'Ju', age: 54 },
// ]
// const sortedByAge = sortBy(people, it => it.age);
// console.log(sortedByAge);


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