import { NumOrString } from "../../interfaces/Types.ts";
type CountMap = { [block: string]: { ct: number, size: number } };

export class Counter{ ////need rework
  private countedBlocks: CountMap;

  constructor(
    private blockImages: NumOrString[][]
  ){
    this.countedBlocks = this.initializeCountedBlocks();
  }

  get length(): number{
    return Object.keys(this.countedBlocks).length;
  }

  countBlocks(): number{
    let lengthIf0Dict = 0;
    for(const blockImage of this.blockImages){
      for(let i = 6; i < blockImage.length; i++){
        const block = blockImage[i] as string;
        this.countedBlocks[block].ct++;
        this.countedBlocks[block].size += block.length+1;
        lengthIf0Dict += block.length+1;
      }
    }
    console.log("Tamanho sem encodar: "+lengthIf0Dict);
    //console.log("Blocos contados:",this.countedBlocks);
    const qtUniques = this.length;
    this.popUnnecessaryWith(1);
    return qtUniques;
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
    let actualSize: number;
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

  popUnnecessaryWith(keyLength: number){
    let sizeIfEncoded: number;
    for(const block in this.countedBlocks){
      sizeIfEncoded = keyLength+4+block.length + keyLength*this.countedBlocks[block].ct;
      if(sizeIfEncoded >= this.countedBlocks[block].size) delete this.countedBlocks[block];
    }
  }
}