import { NumOrString } from "../../interfaces/Types.ts";
import { Block } from "./Block.ts";
type BlocksMap = { [base36: string]: Block };

export class Blocks{
  private map: BlocksMap;
  private sortedArray: Block[];

  constructor(
    blockImages: NumOrString[][]
  ){
    this.map = {};
    this.sortedArray = [];
    this.count(blockImages);
    this.sortByCount();
  }
  get sorted(): Block[]{
    return this.sortedArray;
  }

  private count(blockImages: NumOrString[][]){
    let blockId: string;
    for(const blockImage of blockImages){
      for(let i = 6; i < blockImage.length; i++){
        blockId = blockImage[i] as string;
        if(!this.map[blockId]){
          this.map[blockId] = new Block(blockId);
          this.sortedArray.push(this.map[blockId]);
          continue;
        }
        this.map[blockId].count++;
      }
    }
  }

  sortByCount(){
    this.sortedArray.sort((block1, block2) => {
      if(block1.count > block2.count) return 1;
      if(block1.count < block2.count) return -1;
      return 0;
    });
  }
}