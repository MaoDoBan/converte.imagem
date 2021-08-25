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
  
  savedSizeWith(keyLength: number): number{
    return this.count * (this.base36.length - keyLength + 1) - this.base36.length - (8 + keyLength);
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