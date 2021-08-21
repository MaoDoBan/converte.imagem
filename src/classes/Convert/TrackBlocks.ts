import { Block } from "./Block.ts";
// type Branch = {
//   keyLength: number,
//   leaves: Block[],
//   branches: Branch[]
// };

export class TrackBlocks{
  private raw: Block[];
  private compress: Block[];
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
  // private countLength(array: Block[], ){
  //   for(const block of array){
  //     this.lengthEncoded += block;
  //   }
  // }

  addRaw(block: Block, ){
    this.raw.push(block);
    this.lengthEncoded += block;
  }
  addCompress(block: Block, ){
    this.compress.push(block);
    this.lengthEncoded += block;
  }
}