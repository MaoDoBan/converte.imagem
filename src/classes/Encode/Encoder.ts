import { EncodeDict, NumOrString, specialChars } from "../../interfaces/Types.ts";
import { CountBlocks } from "./CountBlocks.ts";
import { WorthManager } from "./WorthManager.ts";

export class Encoder{
  private keys: EncodeDict;

  constructor(
    private blockImages: NumOrString[][]
  ){
    const countedBlocks = new CountBlocks(this.blockImages).counted;
    console.log("| qt countedBlocks:", countedBlocks.length);

    this.keys = new WorthManager( countedBlocks ).result;
    console.log(">> this.keys:", this.keys);
  }

  get result(): string{
    return `Dict={${this.encodeDict()}};\n`+
         `Dados={{${this.encodeBlocks()}}};`;////add suporte a múltiplas imagens?
  }

  private encodeDict(): string{
    let encoded = "";
    for(const block in this.keys){
      if(this.keys[block].type == 4){
        encoded += `${this.keys[block].name}="${block}",`;
        continue;
      }
      encoded += `["${this.keys[block].name}"]="${block}",`;
    }
    return encoded.slice(0, -1);//removendo o último caractere
  }

  private encodeBlocks(): string{
    let encoded = "";
    let block: string;
    for(const blockImage of this.blockImages){
      for(let i = 0; i < 6; i++){
        encoded += blockImage[i]+",";
      }
      encoded += '"';
      for(let i = 6; i < blockImage.length; i++){
        block = blockImage[i] as string;
        if(this.keys[block]){
          encoded += this.keys[block].name;
          continue;
        }
        encoded += specialChars[block.length] + block;
      }
      encoded += '"';
    }
    return encoded;
  }
}