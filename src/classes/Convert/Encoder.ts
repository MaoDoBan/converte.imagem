import { NumOrString } from "../../interfaces/Types.ts";
import { CountBlocks } from "./CountBlocks.ts";
import { WorthManager } from "./WorthManager.ts";

const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_";

export class Encoder{
  private blocks: CountBlocks;

  constructor(
    private blockImages: NumOrString[][]
  ){
    this.blocks = new CountBlocks(this.blockImages);
  }

  get result(): string{
    const worthControl = new WorthManager( this.blocks.counted );

    // if(countedBlocks.length <= letters.length){
    //   ;
    //   return "";///
    // }

    //;

    return "";///
  }
}

/*
    let bLog = "\n";
    for(const block of counteds){
      bLog += " "+block.count;
    }
    console.log(bLog);

    bLog = "\n";
    for(const block of this.blocks.sorted){
      bLog += " "+block.count;
    }
    console.log(bLog);
*/