import { Image } from "https://deno.land/x/imagescript@1.2.9/mod.ts";
import { Node } from "../Tree/Node.ts";
import { ImageToBlocks } from "./ImageToBlocks.ts";
import { NumOrString } from "../../interfaces/Types.ts";
import { Encoder } from "./Encoder.ts";
type ConvertParameters = {fileName: string, lAxis?: string, cAxis?: string, x?: number, y?: number, z?: number};

export class ConversionManager{
  private allConverted: NumOrString[][];
  constructor(){
    if(Node.allNodesLength == 0) Node.populateAllNodes();

    this.allConverted = [];
  }

  async convert({fileName, lAxis = "x", cAxis = "y", x = 0, y = 0, z = 0}: ConvertParameters){
    ///, direction: {x: string, y: string} //aceitar posição relativa do player
    /// isso só precisa alterar o xy do output lua
    const past = Date.now();

    const rawImage = await Deno.readFile("io/"+fileName);
    const image = await Image.decode(rawImage);
    if(image.height > 256 || image.width > 256) return console.log("ERRO: dimensão passou do limite de 256!");

    const converted = (new ImageToBlocks(image)).result;
    console.log("Comprimento do resultado escolhido:", converted.length, "\nConverted:", converted);

    converted.unshift(lAxis, cAxis, x, y, z, image.width);//add extra information
    this.allConverted.push(converted);
    console.log("Demorou ms: "+(Date.now()-past));
  }

  async save(fileName: string){
    const past = Date.now();
    ////call other function to loop in this.allBlockMatrices populating repeatStatistics with class Counter
    ////loop in this.allBlockMatrices doing blockMatrix.toString()

    const encoded = (new Encoder(this.allConverted)).result;
    console.log(encoded);
    console.log("Demorou ms: "+(Date.now()-past)); return;

    ///'local a="a"; Dados={'+orientation+','+blockStringMatrix+'}'
    await this.outputLua(fileName, encoded);////tirar declarações de variáveis daqui
    ///+"\nO script vai gerar "+this.actual.totalBlocks+" blocos"
    ///this.ct = 0;
  }
  async outputLua(fileName: string, text: string){
    await Deno.writeTextFile("io/"+fileName+".lua", text);
  }
}