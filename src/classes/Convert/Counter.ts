import { NumOrString } from "../../interfaces/Types.ts";
type CountMap = { [block: string]: number };

export class Counter{ ////need rework
  private countedBlocks: CountMap;

  constructor(
    private blockImages: NumOrString[][]
  ){
    this.countedBlocks = this.initializeCountedBlocks();
  }

  countBlocks(){
    for(const blockImage of this.blockImages){
      for(let i = 6; i < blockImage.length; i++){
        const block = blockImage[i] as string;
        this.countedBlocks[ block ] += block.length;
      }
    }
    console.log("Blocos contados:",this.countedBlocks);
  }

  private initializeCountedBlocks(): CountMap{
    const initialCountedBlocks: CountMap = {};
    for(const blockImage of this.blockImages){
      for(let i = 6; i < blockImage.length; i++){
        initialCountedBlocks[ blockImage[i] ] = 0;
      }
    }
    return initialCountedBlocks;
  }
}


/*increment(...numbers: number[]){
  for(const num of numbers){
    if(num < 10 || num > this.limit){
      continue;
    }
    this.counter[num] += 2;
    if(num >= 100) this.counter[num]++;//se 100+ vai ocupar 3 caracteres
  }
}*/

/*popHighestToHex(): string{////
  let max = {num: -1, count: 0};
  for(let i = 10; i < this.counter.length; i++){
    if(this.counter[i] && this.counter[i] > max.count){
      max.num = i;
      max.count = this.counter[i];
    }
  }
  delete this.counter[max.num];
  return max.num;
}*/