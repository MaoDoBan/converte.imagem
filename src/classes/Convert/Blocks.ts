import { NumOrString } from "../../interfaces/Types.ts";
type Block = {
  base36: string,
  count: number,
  next: Block | undefined,
  previous: Block | undefined
};
type BlocksMap = { [base36: string]: Block };

export class Blocks{
  private ordered: Block = {} as Block;
  private endOrdered: Block = {} as Block;
  private map: BlocksMap;

  constructor(
    blockImages: NumOrString[][]
  ){
    this.map = {};
    this.count(blockImages);
  }
  get orderedList(): Block{
    return this.ordered;
  }

  private count(blockImages: NumOrString[][]){
    this.ordered = this.newBlock(blockImages[0][6] as string);
    this.ordered.previous = undefined;

    let blockId: string;
    for(const blockImage of blockImages){
      for(let i = 7; i < blockImage.length; i++){
        blockId = blockImage[i] as string;
        if(!this.map[blockId]){
          this.map[blockId] = this.newBlock(blockId);
          continue;
        }
        this.countedBlocks[block].ct++;
        this.countedBlocks[block].size += block.length+1;
      }
    }
    const qtUniques = this.length;
    return countedBlocks;
  }

  private newBlock(base36: string): Block{
    const block = {
      base36,
      count: 1,
      next: undefined,
      previous: this.endOrdered
    };
    this.endOrdered = block;
    return block;
  }

  private incrementCount(base36: string){
    let block = this.map[base36];
    block.count++;
    if(block.previous && block.previous.count < block.count){
      
      block.next = ;
      block.previous = ;
    }
  }
}

// type Block = {
//   base36: string,
//   repeat: number,
//   //mair largura de chave em que ainda vale a pena comprimir
//   //quanto espaço ocupa sem comprimir
//   //quanto espaço ocupa comprimindo pra cada comprimento de chave em que vale a pena comprimir
// };
//type BlockMap = { [base36: string]: { count: number, size: number } };