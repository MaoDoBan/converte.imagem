import { Block } from "./Block.ts";
import { KeyNode } from "./KeyNode.ts";
import { Key, EncodeDict } from "../../interfaces/Types.ts";
type SearchData = {
  uniquesMap: EncodeDict,
  lengthSaved: number
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
    let bestSearched = {lengthSaved: -1} as SearchData;
    let actualSearch: SearchData;

    while(keyLength <= 5){
      if(queueNodes[keyLength].length == 0){
        keyLength++;
        continue;
      }
      keyNodeToExpand = queueNodes[keyLength].shift() as KeyNode;
      keyNodeToExpand.addChildren();

      actualSearch = this.mountsDictionary();
      console.log("actualSearch.lengthSaved:", actualSearch.lengthSaved);
      if(actualSearch.lengthSaved > bestSearched.lengthSaved){
        bestSearched = actualSearch;
        if( keyLength < 5 ) queueNodes[keyLength+1].push(...keyNodeToExpand.children);
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
      lengthSaved: 0
    };
    let key = {} as Key;
    for(let keyLength = 1; keyLength <= 5; keyLength++){
      for(const block of this.catalogedBlocks[keyLength]){
        if(search.uniquesMap[block.base36]) continue;

        key = getKey(keyLength);
        if(key.name == "'end'") break;
        search.uniquesMap[block.base36] = key;

        search.lengthSaved += block.savedSizeWith(keyLength, key.type);
        //console.log("mapeando block:", block, key, "length encoded:", search.lengthSaved);
      }
      if(key.name != "'end'") break;
    }
    return search;
  }
}