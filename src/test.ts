for(let iColumn = 0; iColumn < 6; iColumn++){///
  //const line: number[] = [];
  const ar = [];
  for(let iLine = 0; iLine < 3; iLine++){///
    const i = iColumn*4 + iLine*4*6;
    ar.push(i)//console.log(i);
  }
  console.log(ar)
  //lines.push(line);
}