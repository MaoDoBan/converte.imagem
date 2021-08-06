import { Block } from "./Block.ts";
import { NumberCounter } from "./NumberCounter.ts";
type CurrentBlock = {count: number, block: Block};
type NumOrString = number | string;
type NumToString = { [num: number]: string };

const andClose = true;
const andMergeBlock = true;
const open = false;

export class SegmentManager{
  private closed = {segment: true, block: true};
  private segments: NumOrString[][];
  private currentSegment: NumOrString[];
  private currentBlock: CurrentBlock;
  private counter: NumberCounter;
  constructor(){
    this.segments = [];
    this.currentSegment = [];
    this.currentBlock = {} as CurrentBlock;
    this.counter = new NumberCounter();
  }

  private get segmentIsClosed(): boolean{
    return this.closed.segment;
  }

  update(block: Block, x: number, y: number){
    if(this.segmentIsClosed){//create segment
      this.closed.segment = open;
      this.currentSegment = [x, y, 0];
      this.counter.increment(x, y);
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
    this.counter.increment(
      this.currentBlock.block.id,
      this.currentBlock.block.data,
      this.currentBlock.count
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

  toString(): string{
    const repeated = this.getNumberToLetter();
  }
  private getNumberToLetter(): NumToString{
    const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const limit = this.counter.length < letters.length ? this.counter.length : letters.length;
    const repeatedDict: NumToString = {};

    for(let i = 0; i < limit; i++){
      const highest = this.counter.popHighest();
      repeatedDict[highest] = letters[i];
    }
    return repeatedDict;
  }

  toStringOld(): string{////delete on 0.5
    const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const limit = this.counter.length < letters.length ? this.counter.length : letters.length;
    let segmentsString = "";
    let values = "";

    for(let i = 0; i < limit; i++){
      segmentsString += letters[i]+',';
    }
    if(limit > 0){
      segmentsString = 
        "local "+segmentsString.slice(0, -1)+//removendo o último caractere
        "="+values.slice(0, -1)+"\n";
    }

    for(const segment of this.segments){
      segmentsString += '{'+segment.toString()+'},';
    }
    //-return segmentsString;
    // this.counter.popHighest();
    // if(!this.segmentIsClosed) this.mergeSegment(andMergeBlock);
    // let segmentsString = "";
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