import { Block } from "./Block.ts";
import { TrackWorthKeys } from "./TrackWorthKeys.ts";

export class WorthManager{
  private cataloged: Block[][];
  private baseNotWorth: string[];

  constructor( countedBlocks: Block[] ){
    this.baseNotWorth = [];
    this.cataloged = [[], [], [], [], [], []] as Block[][];
    this.catalogBlocks(countedBlocks);
    this.sortBySavedSize();

    console.log("| cataloged:");
    for(let i = 1; i < this.cataloged.length; i++){
      console.log("i =",i,"  qt:",this.cataloged[i].length);
      // Block.arrayToString(this.cataloged[i]);
    }
    //console.log("| qt baseNotWorth:",this.baseNotWorth.length,"  itens:",this.baseNotWorth);
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

  private sortBySavedSize(){
    for(let i = 1; i < this.cataloged.length; i++){
      this.cataloged[i].sort((block1, block2) => {
        const [saved1, saved2] = [block1.partialSavedSizeWith(i), block2.partialSavedSizeWith(i)];
        if(saved1 > saved2) return 1;
        if(saved1 < saved2) return -1;
        return 0;
      });
    }
  }

  get result(): any{///
    return new TrackWorthKeys(this.baseNotWorth, this.cataloged).result;
  }
}