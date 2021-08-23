import { NumOrString } from "../../interfaces/Types.ts";
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
    // Block.arrayToString(contedBlocks);

    const worthKeysBlocks = new WorthManager( contedBlocks ).result;
    console.log(worthKeysBlocks);

    return "";
  }
}