import { Block } from "./Block.ts";
import { PreviousInfos } from "./PreviousInfos.ts";
type CurrentBlock = {count: number, block: Block};

const andClose = true;
const andMergeBlock = true;
const open = false;

export class SegmentManager{
  private static previous: PreviousInfos = {} as PreviousInfos;
  private closed = {segment: true, block: true};
  private segments: number[][];
  private currentSegment: number[];
  private currentBlock: CurrentBlock;
  constructor(){
    this.segments = [];
    this.currentSegment = [];
    this.currentBlock = {} as CurrentBlock;
  }

  update(block: Block, x: number, z: number){
    if(this.closed.segment){
      this.closed.segment = open;
      this.currentSegment = [x, 0, z];
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
    if(this.closed.segment) return;
    this.mergeSegment(andMergeBlock, andClose);
  }

  allToString(): string{
    if(!this.closed.segment) this.mergeSegment(andMergeBlock);
    let segmentsString = "";
    for(const segment of this.segments){
      segmentsString += '{'+segment.toString()+'},';
    }
    return segmentsString;
  }
}

/// colocar a só quando o repetido for maior que 9
/*
Dados = {
  "x",
  {0,0,0,2,1,0,"a",2,15,1,3,"a",3,"a",0},
  {"a",1,"a",2,1,0,"a",2,15,1,3,"a",3,"a",0}
};
*/