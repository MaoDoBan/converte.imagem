import { Block } from "./Block.ts";
import { TrackBlocks } from "./TrackBlocks.ts";

export class WorthManager{
  private best: TrackBlocks;
  private actual: TrackBlocks;
  private worths: Block[][];

  constructor( countedBlocks: Block[] ){
    // this.initialFilterWorth();
    //tacar tudo que der pra k=1 apenas no compress do best
  }

  // private sortByWorth(){
  //   array.sort((block1, block2) => {
  //     worth1 = ;
  //     worth2 = ;
  //     if(worth1 > worth2) return 1;
  //     if(worth1 < worth2) return -1;
  //     return 0;
  //   });
  // }
}


  // filter(array: Block[], sizeOnDic: number, limit: number){
  //   for(const block of array){
  //     ;
  //     e = block.rawSize - rk - k - l - sizeOnDic;
  //     if(){}
  //   }
  // }

  // private initialFilterWorth(){
  //   let rawSize: number;
  //   let worths: number[] = [];
  //   for(const block of this.array){
  //     rawSize = ;
  //     worths[1] = rawSize - block.count - block.base36.length - 9;
  //     if()
  //   }
  // }

  // get sorted(): Block[]{
  //   this.sortBy("count");
  //   return this.array;
  // }