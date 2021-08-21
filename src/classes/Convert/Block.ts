export class Block{
  private count: number;
  private sizeWithoutCompressing: number;
  private compressedSavedSizes: number[][];

  constructor(
    public base36: string
  ){
    this.count = 1;
    this.sizeWithoutCompressing = 0;
    this.compressedSavedSizes = [];
  }

  get rawSize(): number{
    if(this.sizeWithoutCompressing > 0) return this.sizeWithoutCompressing;
    this.sizeWithoutCompressing = this.count * (this.base36.length + 1);
    return this.rawSize;
  }

  moreOne(){
    this.count++;
  }
  
  savedSizeWith(keyLength: number, dictSpace: 3 | 4 | 8): number{
    if(this.compressedSavedSizes[keyLength])
    if(dictSpace == 3){//índice da table do lua, pra k=2+
      ;
    }
    return this.count * (this.base36.length - keyLength + 1) - this.base36.length  - keyLength - dictSpace;
  }
}