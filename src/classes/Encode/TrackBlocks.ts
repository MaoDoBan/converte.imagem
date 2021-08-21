import { Block } from "./Block.ts";
type Branch = {
  keyLength: number,
  dictSpace: 3 | 4 | 8,
  key: string,
  leaves: Block[],
  branches: Branch[]
};

export class TrackBlocks{
  private raw: Block[];
  private compress: Branch[];
  private lengthEncoded: number;

  constructor(){
    this.raw = [];
    this.compress = [];
    this.lengthEncoded = -1;
  }

  get length(): number{
    if(this.lengthEncoded >= 0) return this.lengthEncoded;
    this.lengthEncoded = 0;
    
    return this.lengthEncoded;
  }

  addRaw(block: Block, ){
    this.raw.push(block);
    this.lengthEncoded += block;
  }
  addCompress(block: Block, ){
    this.compress.push(block);
    this.lengthEncoded += block;
  }
}