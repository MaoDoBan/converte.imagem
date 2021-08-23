import { Block } from "./Block.ts";
import { KeyNode } from "./KeyNode.ts";
//type KeyAndBlock = {key: string, base36: string};
type UniqueBlocks = { [block: string]: true };
type SearchData = {
  uniquesListed: UniqueBlocks,
  lengthEncoded: number,
  //compressionArray: KeyAndBlock[]
  //unconpress: string[]
};

export class TrackWorthKeys{
  private rootKeyTree: KeyNode;

  constructor(
    private uncompressedBlocks: string[],//base36 of blocks
    private catalogedBlocks: Block[][]
  ){
    this.rootKeyTree = new KeyNode("", 0, 0);
  }

  get result(): any{///
    const queueNodes = [[this.rootKeyTree], [], [], [], [], []];
    let keyLength = 0;
    let keyNodeToExpand: KeyNode;
    let bestSearched = {lengthEncoded: 999999} as SearchData;
    let actualSearch: SearchData;

    while(true){
      if(queueNodes[keyLength].length == 0){
        keyLength++;
        if(keyLength > 5) break;
        continue;
      }
      keyNodeToExpand = queueNodes[keyLength].shift() as KeyNode;

      keyNodeToExpand.addChildren(keyLength);

      actualSearch = this.mountsDictionary();
      if(actualSearch.lengthEncoded < bestSearched.lengthEncoded){
        bestSearched = actualSearch;
        if(keyLength < 5) queueNodes[keyLength+1].push(...keyNodeToExpand.children);
        continue;
      }
      keyNodeToExpand.toLeave();
      keyLength++;
    }

    console.log("bestSearched:",bestSearched);//--
    let uncompressedLength = 0;
    for(const block of this.uncompressedBlocks){
      uncompressedLength += block.length+1;
    }
    return uncompressedLength;///
  }
  private mountsDictionary(): SearchData{
    const search: SearchData = {
      uniquesListed: {},
      lengthEncoded: 0,
      //compressionArray: KeyAndBlock[]
      //unconpress: string[]
    };

    const queueNodes = [[], [...this.rootKeyTree.children], [], [], [], []];
    const path = [];
    //let i: number;
    //let blockCount: number;

    for(let keyLength = 1; keyLength <= 5; keyLength++){
      //blockCount = 0;
      for(const block of this.catalogedBlocks[keyLength]){
        //blockCount++;
        ;
      }
      //if(blockCount <= queueNodes[keyLength].length) break;
    }
    return search;
  }
}

  /*addToCompress(block: Block, ){
    if( this.uniquesListed[block.base36] ) return false;
    this.uniquesListed[block.base36] = true;

    this.rootKeyTree.;

    this.compressionArray.push({key: , base36: block.base36});
    this.lengthEncoded += block.base36.length+1;
  }*/

  /*addUncompressed(block: Block){
    if( this.uniquesListed[block.base36] ) return false;
    this.uniquesListed[block.base36] = true;

    this.uncompressedBlocks.push(block.base36);
    this.lengthEncoded += block.rawSize;
  }*/