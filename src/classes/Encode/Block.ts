import { KeyType } from "../../interfaces/Types.ts";

export class Block{
  private count: number;

  constructor(
    public base36: string
  ){
    this.count = 1;
  }

  moreOne(){
    this.count++;
  }
  
  savedSizeWith(keyLength: number, type: KeyType = 4): number{
    const dictSize = {
      //3: 3,
      4: 4 + keyLength,
      8: 8 + keyLength
    };
    return this.count * (this.base36.length - keyLength + 1) - this.base36.length - dictSize[type];
  }

  toString(): string{
    return `Block: {b36: ${this.base36}, ct: ${this.count} }`;
  }
  static arrayToString(array: Block[]){
    if(array == undefined) return;
    for(const block of array){
      console.log(block.toString());
    }
  }
}