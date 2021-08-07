import { Util } from "../Util.ts";
import { NumOrString } from "../../interfaces/Types.ts";
type CurrentBlock = {block: string, count: number};

export class Serializer{
  readonly serializedBlocks: NumOrString[];
  private current: CurrentBlock;

  constructor(){
    this.serializedBlocks = [];
    this.current = {block: "", count: 1};
  }

  addBlock(block: string){
    if(this.current.block == block) return this.current.count++;

    const serialized = this.serialize();
    this.serializedBlocks.push(serialized);

    this.current.block = block;
    this.current.count = 1;
  }
  private serialize(): string{
    const count = this.current.count;
    let countStr = "";
    if(count > 1) countStr = Util.decToHex(count);

    return Util.hexToBase36( countStr + this.current.block );////ver se a ordem no lua seria melhor ao contrário
  }
}
/*const andClose = true;
const andMergeBlock = true;
const open = false;*/
/*export class Serializer{///deprecated
  private closed = {segment: true, block: true};
  private segments: NumOrString[][];
  private currentSegment: NumOrString[];
  private currentBlock: CurrentBlock;

  constructor(){
    this.segments = [];
    this.currentSegment = [];
    this.currentBlock = {} as CurrentBlock;
  }

  private get segmentIsClosed(): boolean{
    return this.closed.segment;
  }

  update(block: string){
    if(this.segmentIsClosed){//create segment
      this.closed.segment = open;
      this.currentSegment = [x, y, 0];
    }
    if(this.closed.block){
      this.closed.block = open;
      this.setCurrentBlock(block, 1);
      return;
    }

    const blockEqualToCurrent = block.id == this.currentBlock.block.id && block.data == this.currentBlock.block.data;
    if(blockEqualToCurrent){
      this.currentBlock.count++;
      return;
    }

    //bloco diferente do current
    this.mergeCurrentBlock();
    this.setCurrentBlock(block, 1);
  }
  private setCurrentBlock(block: Block, count: number){
    this.currentBlock.count = count;
    this.currentBlock.block = block;
  }
  
  private mergeCurrentBlock(close = false){
    if(close) this.closed.block = true;
    this.currentSegment.push(
      this.currentBlock.count,
      this.currentBlock.block.id,
      this.currentBlock.block.data
    );
  }
  private mergeSegment(mergeBlock = false, close = false){
    if(mergeBlock) this.mergeCurrentBlock(close);//- && !this.closed.block
    if(close) this.closed.segment = true;
    this.segments.push(this.currentSegment);
  }

  closeCurrentSegment(){
    if(this.segmentIsClosed) return;
    this.mergeSegment(andMergeBlock, andClose);
  }
}*/