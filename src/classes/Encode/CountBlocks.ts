import { NumOrString } from "../../interfaces/Types.ts";
import { Block } from "./Block.ts";
type BlocksMap = { [base36: string]: Block };

export class CountBlocks{
  private map: BlocksMap;
  private array: Block[];

  constructor( blockImages: NumOrString[][] ){
    this.map = {};
    this.array = [];
    this.count(blockImages);
  }

  get counted(): Block[]{
    return this.array;
  }

  private count(blockImages: NumOrString[][]){
    let blockId: string;
    for(const blockImage of blockImages){
      for(let i = 6; i < blockImage.length; i++){
        blockId = blockImage[i] as string;
        if(!this.map[blockId]){
          this.map[blockId] = new Block(blockId);
          this.array.push(this.map[blockId]);
          continue;
        }
        this.map[blockId].moreOne();
      }
    }
  }
}