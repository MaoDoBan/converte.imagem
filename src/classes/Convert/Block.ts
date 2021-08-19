export class Block{
  public count: number;
  constructor(
    public base36: string
  ){
    this.count = 1;
  }
}