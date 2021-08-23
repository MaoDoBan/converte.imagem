import { Block } from "./Block.ts";
import { KeyNode } from "./KeyNode.ts";
type UniqueBlocks = { [block: string]: true };
type KeyAndBlock = {key: string, base36: string};

export class TrackWorthKeys{
  private uniquesListed: UniqueBlocks;
  private rootKeyTree: KeyNode;
  //private queueNextBranches: Branch[];
  //private queueNextKeys: string[];
  private compressionArray: KeyAndBlock[];
  private lengthEncoded: number;

  constructor(
    private uncompressedBlocks: string[],//base36 of blocks
    private catalogedBlocks: Block[][]
  ){
    this.uniquesListed = {};
    //this.queueNextKeys = [];
    this.compressionArray = [];
    this.rootKeyTree = KeyNode.createRoot();

    this.lengthEncoded = 0;
    this.countUncompressedBlocks();
  }

  private countUncompressedBlocks(){
    for(const block of this.uncompressedBlocks){
      this.lengthEncoded += block.length+1;
    }
  }

  get result(): any{///
    let foundLowest = false;
    while(!foundLowest){
      foundLowest = this.search();
    }
    return ;
  }

  private search(): boolean{
    for(let keyLength = 1; keyLength <= 5; keyLength++){
      for(const block of this.catalogedBlocks[keyLength]){
        // if( this.uniquesListed[block.base36] ) continue;
        // this.uniquesListed[block.base36] = true;

        ;
      }
    }
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

    this.uncompressedBlocks.push(block.base36);
    this.lengthEncoded += block.rawSize;
  }
}

//while(queueNextBranches.length){

// for(let keyLength = 1; keyLength <= maxKeyLength; keyLength++){
//   branch = queueNextBranches
// }

// get length(): number{
//   if(this.lengthEncoded >= 0) return this.lengthEncoded;
//   this.lengthEncoded = 0;
//   return 0;
// }