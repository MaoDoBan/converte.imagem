import { Block } from "./Block.ts";
type Branch = {
  keyLength: number,
  baseDictSpace: 3 | 4 | 8,
  key: string,
  leaves: Block[],
  branches: Branch[]
};

export class TrackBlocks{
  private toCompress: Branch[];
  private uncompressed: string[];//base36 of blocks
  private lengthEncoded: number;

  constructor(){
    this.toCompress = [];
    this.uncompressed = [];
    this.lengthEncoded = -1;
  }

  get length(): number{
    if(this.lengthEncoded >= 0) return this.lengthEncoded;
    this.lengthEncoded = 0;
    
    return this.lengthEncoded;
  }

  // addRaw(block: Block, ){
  //   this.raw.push(block);
  //   this.lengthEncoded += block;
  // }
  // addCompress(block: Block, ){
  //   this.compress.push(block);
  //   this.lengthEncoded += block;
  // }
}