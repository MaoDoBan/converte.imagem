import { Counter } from "./Counter.ts";
type CurrentBlock = {count: number, block: string};
type NumOrString = number | string;
type DictNumToString = { [num: number]: string };

const andClose = true;
const andMergeBlock = true;
const open = false;

export class SegmentManager{
  private closed = {segment: true, block: true};
  private segments: NumOrString[][];
  private currentSegment: NumOrString[];
  private currentBlock: CurrentBlock;
  private counter: Counter;
  constructor(){
    this.segments = [];
    this.currentSegment = [];
    this.currentBlock = {} as CurrentBlock;
    this.counter = new Counter();
  }

  private get segmentIsClosed(): boolean{
    return this.closed.segment;
  }

  update(block: string, x: number, y: number){
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
    if(!this.segmentIsClosed) this.mergeSegment(andMergeBlock);

    const numToLetter = this.getNumberToLetter();

    ///fazer var na classe pra guardar o "local a,b,c=123,21,2"
    let segmentsString = "";
    for(const segment of this.segments){
      this.segmentNumToLetter(segment, numToLetter);
      segmentsString += '{'+segment.toString()+'},';
    }
    return segmentsString;
  }
  private getNumberToLetter(): DictNumToString{
    const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const limit = this.counter.length < letters.length ? this.counter.length : letters.length;
    const repeatedDict: DictNumToString = {};

    for(let i = 0; i < limit; i++){
      const highest = this.counter.popHighest();
      repeatedDict[highest] = letters[i];
    }
    return repeatedDict;
  }
  private segmentNumToLetter(segment: NumOrString[], dict: DictNumToString){
    for(let i = 0; i < segment.length; i++){
      if( dict[ segment[i] as number ] ) segment[i] = dict[ segment[i] as number ];
    }
  }

  // toStringOld(): string{////delete on 0.5
  //   let values = "";

  //   for(let i = 0; i < limit; i++){
  //     segmentsString += letters[i]+',';
  //   }
  //   if(limit > 0){
  //     segmentsString = 
  //       "local "+segmentsString.slice(0, -1)+//removendo o último caractere
  //       "="+values.slice(0, -1)+"\n";
  //   }
  // }
}

/// colocar a só quando o repetido for maior que 9
/*
Dados = {
  "x",
  {0,0,0,2,1,0,"a",2,15,1,3,"a",3,"a",0},
  {"a",1,"a",2,1,0,"a",2,15,1,3,"a",3,"a",0}
};
*/