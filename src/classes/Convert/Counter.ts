import { NumOrString, CountMap } from "../../interfaces/Types.ts";

export class Counter{ ////need rework
  private countedBlocks: CountMap;

  constructor(
    private blockImages: NumOrString[][]
  ){
    this.countedBlocks = this.initializeCountedBlocks();
  }

  countBlocks(): number{
    for(const blockImage of this.blockImages){
      for(let i = 6; i < blockImage.length; i++){
        const block = blockImage[i] as string;
        this.countedBlocks[block].ct++;
        this.countedBlocks[block].size += block.length;
      }
    }
    console.log("Blocos contados:",this.countedBlocks);
    return Object.keys(this.countedBlocks).length;
  }

  private initializeCountedBlocks(): CountMap{
    const initialCountedBlocks: CountMap = {};
    for(const blockImage of this.blockImages){
      for(let i = 6; i < blockImage.length; i++){
        initialCountedBlocks[ blockImage[i] ] = {ct: 0, size: 0};
      }
    }
    return initialCountedBlocks;
  }

  popHighest(): string{
    const max = {hex: "", size: 0};
    let actualSize;
    for(const block in this.countedBlocks){
      actualSize = this.countedBlocks[block].size;
      if(actualSize > max.size){
        max.hex = block;
        max.size = actualSize;
      }
    }
    delete this.countedBlocks[max.hex];
    return max.hex;
  }
}