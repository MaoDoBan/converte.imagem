import { Image } from "https://deno.land/x/imagescript@1.2.9/mod.ts";
import { Node } from "../Tree/Node.ts";
import { Conversion } from "./Conversion.ts";
import { NumOrString } from "../../interfaces/Types.ts";

export class ConversionManager{
  private allConvertedBlocks: NumOrString[][];
  private actual = {} as Conversion;
  constructor(){
    if(Node.allNodesLength == 0) Node.populateAllNodes();

    this.allConvertedBlocks = [];
  }

  async convert(fileName: string){//, direction: {x: string, y: string} //aceitar posição relativa do player
    const past = Date.now();

    const rawImage = await Deno.readFile("io/"+fileName);
    const image = await Image.decode(rawImage);
    if(image.height > 256 || image.width > 256) return console.log("ERRO: dimensão passou do limite de 256!");
    //-this.actual.image = image;
    this.actual = new Conversion(image);

    const converted = this.actual.imageToBlocks();///TODO: incrementar allConvertedBlocks
    //console.log("Resultado:", converted);

    //const blockStringMatrix = this.imageToStringMatrix();
    ///comparar qual tem menos caracteres...
    ///this.convertedImages.push(blockStringMatrix);

    //await this.saveLua(fileName, 'local a="a"; Dados={'+orientation+','+blockStringMatrix+'}');////tirar declarações de variáveis daqui

    console.log("Demorou ms: "+(Date.now()-past));
  }

  /*async save(fileName: string){///need new name? because this.saveLua
    ;
    ////call other function to loop in this.allBlockMatrices populating repeatStatistics with class Counter
    ////loop in this.allBlockMatrices doing blockMatrix.toString()

    //console.log("Demorou ms: "+(Date.now()-past)+"\nO script vai gerar "+this.actual.totalBlocks+" blocos"); this.ct = 0;
  }*/

  async saveLua(fileName: string, text: string){
    await Deno.writeTextFile("io/"+fileName+".lua", text);
  }
}