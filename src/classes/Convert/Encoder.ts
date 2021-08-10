import { NumOrString } from "../../interfaces/Types.ts";
import { Counter } from "./Counter.ts";
type BlocksDict = { [block: string]: string };

export class Encoder{
  private counter: Counter;
  private blocksDict: BlocksDict;///uma classe só pra isso? com .toString()
  private dict: string;
  private encoded: string;

  constructor(
    private blockImages: NumOrString[][]
  ){
    this.counter = new Counter(this.blockImages);
    this.blocksDict = {};
    this.dict = "";
    this.encoded = "";
  }

  get result(): string{
    this.run();
    return ""////this.dict + this.encoded;
  }

  private run(){
    const qtUniques = this.counter.countBlocks();
    this.encode();

    ///se arrayContagem.length maior q 20'000: retorna console.log erro limite
    if(qtUniques > 20000) return console.log("ERRO: contagem de dict excedeu 20k");

    ///se arrayContagem.length menor que 52: retorna montando dict com A-Z
    if(qtUniques <= 52) return //this.assemble(qtUniques);

    ///monta os 46 mais repetidos em a-z A-T, remove eles do array de contagem

    ///calcula a forma mais otimizada...

    // 
  }

  private encode(){
    //const specialChars = " .,;:-=+";
    const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";//.split('');
    for(let i = 0; i < this.counter.length; i++){
      this.blocksDict[ this.counter.popHighest() ] = letters[i];
    }

    let lastBlockIsOnDict = false;
    let dictEquivalent: string | undefined;
    let block: string;
    for(const blockImage of this.blockImages){
      for(let i = 6; i < blockImage.length; i++){
        block = blockImage[i] as string;
        dictEquivalent = this.blocksDict[block];
        if(dictEquivalent){
          if(lastBlockIsOnDict){
            this.encoded += '.';//specialChars[block.length];
            lastBlockIsOnDict = false;
          }
          this.encoded += dictEquivalent;
          continue;
        }
        this.encoded += ","+block;
        lastBlockIsOnDict = true;
      }
    }
    console.log("output:",this.blocksDict,this.encoded,this.encoded.length);
  }

  /*private assemble(limit: number){///, keyLength: number
    const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let highest: string;
    const removedBlocks = this.counter.popUnnecessaryWith(1);
    console.log("removedBlocks:", removedBlocks);
    for(let i = 0; i < limit; i++){
      highest = this.counter.popHighest();
      if(highest){
        this.dict += letters[i]+'="'+highest+'",';
        this.encoded += letters[i];
      }else{
        this.encoded += removedBlocks.shift();
      }
    }
    console.log("output: ", this.dict, this.encoded);
  }*/
}
    ///-------se array de contagem vazio: retorna
    ///this.counter.popUnnecessaryWith(x);


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