export class Block{
  private count: number;
  private sizeWithoutCompressing: number;
  private compressedSavedSizesWithoutDict: number[];

  constructor(
    public base36: string
  ){
    this.count = 1;
    this.sizeWithoutCompressing = 0;
    this.compressedSavedSizesWithoutDict = [];
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
    if(this.compressedSavedSizesWithoutDict[keyLength]) return this.compressedSavedSizesWithoutDict[keyLength];
    this.compressedSavedSizesWithoutDict[keyLength] = this.count * (this.base36.length - keyLength + 1) - this.base36.length  - keyLength;
    return this.compressedSavedSizesWithoutDict[keyLength];
  }
}