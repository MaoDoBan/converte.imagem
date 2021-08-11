import { NumOrString } from "../../interfaces/Types.ts";
import { Counter } from "./Counter.ts";
type BlocksDict = { [block: string]: string };

export class Encoder{
  private counter: Counter;
  private blocksDict: BlocksDict;///uma classe só pra isso? com .toString()
  private dictStr: string;
  private encoded: string;

  constructor(
    private blockImages: NumOrString[][]
  ){
    this.counter = new Counter(this.blockImages);
    this.blocksDict = {};
    this.dictStr = "";
    this.encoded = "";
  }

  get result(): string{
    return this.run();////this.dict + this.encoded;
  }

  private run(): string{
    const qtUniques = this.counter.countBlocks();

    ///se arrayContagem.length maior q 20'000: retorna console.log erro limite
    if(qtUniques > 20000){
      console.log("ERRO: contagem de dict excedeu 20k");
      return "";
    }

    this.encode(); ////////TODO: limitar pra 52 caracteres o dict na versão 0.6
    return this.mergeDictAndEncoded();

    ///se arrayContagem.length menor que 52: retorna montando dict com A-Z
    //if(qtUniques <= 52) return this.encode();//this.assemble(qtUniques);

    ///monta os 46 mais repetidos em a-z A-T, remove eles do array de contagem

    ///calcula a forma mais otimizada...

    // 
  }

  private encode(){
    const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";//.split('');
    let highest: string;
    for(let i = 0; i < this.counter.length; i++){
      highest = this.counter.popHighest();
      this.blocksDict[highest] = letters[i];
      this.dictStr += letters[i]+'="'+highest+'",';
    }
    this.dictStr = this.dictStr.slice(0, -1);//removendo o último caractere

    const specialChars = " .,;:-=+";
    let dictEquivalent: string | undefined;
    let block: string;
    for(const blockImage of this.blockImages){
      for(let i = 0; i < 6; i++){
        this.encoded += blockImage[i]+",";
      }
      this.encoded += '"';
      for(let i = 6; i < blockImage.length; i++){
        block = blockImage[i] as string;
        dictEquivalent = this.blocksDict[block];
        if(dictEquivalent){
          this.encoded += dictEquivalent;
          continue;
        }
        this.encoded += specialChars[block.length]+block;
      }
      this.encoded += '"';
    }
    //console.log("output:",this.blocksDict,this.encoded,this.encoded.length);
  }

  private mergeDictAndEncoded(): string{
    //-const script = this.dictStr + this.encoded;
    return "Dict={" +this.dictStr+ "};\n"+
           "Dados={{" +this.encoded+ "}};";///pra 0.7 suportar múltiplas imagens
  }
}

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
*/