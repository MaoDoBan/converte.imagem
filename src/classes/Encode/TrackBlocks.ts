import { Block } from "./Block.ts";
type UniqueBlocks = { [block: string]: true };
type Branch = {
  keyLetter: string,
  keyType: 0 | 3 | 4 | 8,
  keySize: number,
  childrenBranches: Branch[],
  leaves: string[]
};
type KeyAndBlock = {key: string, base36: string};

const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_";

export class TrackBlocks{
  private uniquesListed: UniqueBlocks;
  private rootKeyTree: Branch;
  private queueNextBranches: Branch[];
  private compressionArray: KeyAndBlock[];
  private lengthEncoded: number;

  constructor(
    private uncompressed: string[],//base36 of blocks
    private keyLengthLimit: number
  ){
    this.uniquesListed = {};
    this.compressionArray = [];
    this.lengthEncoded = 0;
    this.rootKeyTree = {
      keyLetter: "",
      keyType: 0,
      keySize: 0,
      childrenBranches: [],
      leaves: []
    };
    this.queueNextBranches = [this.rootKeyTree];
  }

  get length(): number{
    if(this.lengthEncoded >= 0) return this.lengthEncoded;
    this.lengthEncoded = 0;
    
    return this.lengthEncoded;
  }

  addToCompress(block: Block, ){
    if( this.uniquesListed[block.base36] ) return false;
    this.uniquesListed[block.base36] = true;

    this.rootKeyTree.;

    this.compressionArray.push({key: , base36: block.base36});
    this.lengthEncoded += block.base36.length+1;
  }

  addUncompressed(block: Block){
    if( this.uniquesListed[block.base36] ) return false;
    this.uniquesListed[block.base36] = true;

    this.uncompressed.push(block.base36);
    this.lengthEncoded += block.rawSize;
  }
}