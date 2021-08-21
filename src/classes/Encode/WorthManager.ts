import { Block } from "./Block.ts";
import { TrackBlocks } from "./TrackBlocks.ts";

export class WorthManager{
  private best: TrackBlocks;
  private actual: TrackBlocks;
  private cataloged: Block[][];
  private baseNotWorth: string[];

  constructor( countedBlocks: Block[] ){
    this.baseNotWorth = [];
    this.cataloged = [[], [], [], [], [], []] as Block[][];
    this.catalogBlocks(countedBlocks);

    console.log("| cataloged:");
    for(let i = 1; i < this.cataloged.length; i++){
      console.log("i =",i,"  qt:",this.cataloged[i].length);
      Block.arrayToString(this.cataloged[i]);
    }
    console.log("| qt baseNotWorth:",this.baseNotWorth.length,"  itens:",this.baseNotWorth);

    this.best = {} as TrackBlocks;//tacar best: só k=1 apenas no compress do best
    this.actual = {} as TrackBlocks;
  }

  private catalogBlocks(blocks: Block[]){
    let economizedSizeMin: number;
    for(const block of blocks){
      for(let keyLength = 1; keyLength <= 5; keyLength++){
        economizedSizeMin = block.partialSavedSizeWith(keyLength);
        if(economizedSizeMin < 2){
          if(keyLength == 1) this.baseNotWorth.push(block.base36);
          break;
        }
        this.cataloged[keyLength].push(block);
      }
    }
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

  // private initialFilterWorth(){
  //   let rawSize: number;
  //   let worths: number[] = [];
  //   for(const block of this.array){
  //     rawSize = ;
  //     worths[1] = rawSize - block.count - block.base36.length - 9;
  //     if()
  //   }
  // }