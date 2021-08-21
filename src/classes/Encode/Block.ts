export class Block{
  private count: number;
  private partialSavedSizes: number[];
  private sizeWithoutCompressing: number;

  constructor(
    public base36: string
  ){
    this.count = 1;
    this.partialSavedSizes = [];
    this.sizeWithoutCompressing = 0;
  }

  get rawSize(): number{
    if(this.sizeWithoutCompressing > 0) return this.sizeWithoutCompressing;
    this.sizeWithoutCompressing = this.count * (this.base36.length + 1);
    return this.rawSize;
  }

  moreOne(){
    this.count++;
  }
  
  partialSavedSizeWith(keyLength: number): number{
    if(this.partialSavedSizes[keyLength]) return this.partialSavedSizes[keyLength];

    const dictSizeMin = keyLength == 1 ? 3 : 4 + keyLength;
    this.partialSavedSizes[keyLength] = this.count * (this.base36.length - keyLength + 1) - this.base36.length - dictSizeMin;
    return this.partialSavedSizes[keyLength];
  }

  toString(): string{
    return `Block: {b36: ${this.base36}, ct: ${this.count}, saveds: [${this.partialSavedSizes.join()}], }`;
  }
  static arrayToString(array: Block[]){
    if(array == undefined) return;
    for(const block of array){
      console.log(block.toString());
    }
  }
}