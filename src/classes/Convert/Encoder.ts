import { NumOrString } from "../../interfaces/Types.ts";
import { Counter } from "./Counter.ts";
type DictNumToString = { [num: number]: string };

export class Encoder{
  private counter: Counter;

  constructor(
    convertedMatrix: NumOrString[][]
  ){
    this.counter = new Counter(convertedMatrix);
  }

  get result(): string{
    this.counter.countBlocks();
    return ""///
  }


}


/*toStringOld(): string{////delete on 0.5
  let values = "";

  for(let i = 0; i < limit; i++){
    segmentsString += letters[i]+',';
  }
  if(limit > 0){
    segmentsString = 
      "local "+segmentsString.slice(0, -1)+//removendo o último caractere
      "="+values.slice(0, -1)+"\n";
  }
}*/

  /*private imageToStringMatrix(){
    const blockMatrix = this.imageToBlockMatrix();
    return matrixString.slice(0, -1);//removendo o último caractere
  }*/

/*toString(): string{
  if(!this.segmentIsClosed) this.mergeSegment(andMergeBlock);

  const numToLetter = this.getNumberToLetter();

  ///fazer var na classe pra guardar o "local a,b,c=123,21,2"
  let segmentsString = "";
  for(const segment of this.segments){
    this.segmentNumToLetter(segment, numToLetter);
    segmentsString += '{'+segment.toString()+'},';
  }
  return segmentsString;
}*/

/*private getNumberToLetter(): DictNumToString{
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
}*/