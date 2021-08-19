export class Block{
  [property: string]: string | number;
  public count: number;
  private rawSizeAtribute: number;
  private savedSises: number[];

  constructor(
    public base36: string
  ){
    this.count = 1;
    this.rawSizeAtribute = 0;
    this.savedSises = [];
  }

  get rawSize(): number{
    if(this.rawSizeAtribute > 0) return this.rawSizeAtribute;
    this.rawSizeAtribute = this.count * (this.base36.length + 1);
    return this.rawSize;
  }
  
  // savedSizeWith(keyLength: number): number{
  //   if(this.savedSises[keyLength]) return this.savedSises[keyLength];
  //   this.savedSises[keyLength] = r(this.base36.length - k + 1) - keyLength - this.base36.length - d;
  //   return this.savedSises[keyLength];
  // }
}