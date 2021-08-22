import { NumOrString } from "../../interfaces/Types.ts";
import { Block } from "./Block.ts";
import { CountBlocks } from "./CountBlocks.ts";
import { WorthManager } from "./WorthManager.ts";

export class Encoder{
  private blocks: CountBlocks;

  constructor(
    private blockImages: NumOrString[][]
  ){
    this.blocks = new CountBlocks(this.blockImages);
  }

  get result(): string{
    const contedBlocks = this.blocks.counted;
    console.log("| qt contedBlocks:",contedBlocks.length);
    Block.arrayToString(contedBlocks);

    const worthControl = new WorthManager( contedBlocks );

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