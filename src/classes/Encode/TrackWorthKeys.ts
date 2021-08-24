import { Block } from "./Block.ts";
import { KeyNode } from "./KeyNode.ts";
import { Key, EncodeDict } from "../../interfaces/Types.ts";
type SearchData = {
  uniquesMap: EncodeDict,
  //countUniques: number,
  lengthEncoded: number
};

export class TrackWorthKeys{
  private rootKeyTree: KeyNode;

  constructor(
    private catalogedBlocks: Block[][]
  ){
    this.rootKeyTree = new KeyNode( {name: "", type: 4} );
  }

  get result(): EncodeDict{
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
      keyNodeToExpand.addChildren();

      actualSearch = this.mountsDictionary();
      //console.log("actualSearch:", actualSearch);
      console.log("actualSearch.lengthEncoded:", actualSearch.lengthEncoded);
      if(actualSearch.lengthEncoded < bestSearched.lengthEncoded){
        bestSearched = actualSearch;
        if( keyLength < 5 )///se não usou todas as chaves de keyLength
          queueNodes[keyLength+1].push(...keyNodeToExpand.children);
        continue;
      }
      keyNodeToExpand.toLeave();
      keyLength++;
    }

    //--console.log("bestSearched:", bestSearched);
    return bestSearched.uniquesMap;
  }

  private mountsDictionary(): SearchData{
    const queueNodes = [[], [...this.rootKeyTree.children], [], [], [], []];
    function getKey(keyLength: number): Key{
      let node = queueNodes[keyLength].shift();
      while(node?.notLeave){
        queueNodes[keyLength+1].push(...node.children);
        node = queueNodes[keyLength].shift();
      }
      if(!node) return {name: "'end'", type: 4};

      return node.key;
    }

    const search: SearchData = {
      uniquesMap: {},
      //countUniques: 0,
      lengthEncoded: 0
    };
    let key = {} as Key;
    for(let keyLength = 1; keyLength <= 5; keyLength++){
      for(const block of this.catalogedBlocks[keyLength]){
        if(search.uniquesMap[block.base36]) continue;

        key = getKey(keyLength);
        if(key.name == "'end'") break;
        search.uniquesMap[block.base36] = key;
        //search.countUniques++;

        search.lengthEncoded += block.partialSavedSizeWith(keyLength, key.type);
        console.log("mapeando block:", block, key, "length encoded:", search.lengthEncoded);
      }
      if(key.name != "'end'") break;
    }

    for(const block of this.catalogedBlocks[1]){
      if(search.uniquesMap[block.base36]) continue;
      search.lengthEncoded += block.rawSize;
    }
    console.log("length encoded +notListed:", search.lengthEncoded);

    //console.log("countKeys:", search.countUniques);
    return search;
  }
}