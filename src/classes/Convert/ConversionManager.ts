import { Image } from "https://deno.land/x/imagescript@1.2.9/mod.ts";
import { Node } from "./SearchTreeColorToBlock/Node.ts";
import { ImageToBlocks } from "./ImageToBlocks.ts";
import { NumOrString } from "../../interfaces/Types.ts";
import { Encoder } from "../Encode/Encoder.ts";
type ConvertParameters = {fileName: string, lineAxis?: string, columnAxis?: string, x?: number, y?: number, z?: number};
//import { writeJson } from "https://deno.land/x/jsonfile@1.0.0/mod.ts";

export class ConversionManager{
  private allConverted: NumOrString[][];
  constructor(){
    if(Node.allNodesLength == 0) Node.populateAllNodes();

    this.allConverted = [];
  }

  async convert({fileName, lineAxis = '"x"', columnAxis = '"-y"', x = 0, y = 0, z = 0}: ConvertParameters){
    ///, direction: {x: string, y: string} //aceitar posição relativa do player
    /// isso só precisa alterar o xy do output lua
    const past = Date.now();

    const rawImage = await Deno.readFile("io/"+fileName);
    const image = await Image.decode(rawImage);
    if(image.height > 256 || image.width > 256) return console.log("ERRO: dimensão passou do limite de 256!");///deixar sem limite em certas circunstâncias

    const converted = ( new ImageToBlocks( image, lineAxis, columnAxis ) ).result;
    console.log("Comprimento do array resultado escolhido:", converted.length);//, "\nConverted:", converted

    const axis1Limit = converted[0] == lineAxis ? y+image.width : y+image.height;
    converted.unshift(x, y+axis1Limit, z, axis1Limit);//add extra information
    this.allConverted.push(converted);

    //await writeJson("io/Nanda dados brutos.json", converted);
  
    console.log("Demorou ms: "+(Date.now()-past));
  }

  async save(fileName: string){
    const past = Date.now();

    const encoded = (new Encoder(this.allConverted)).result;
    //console.log(encoded);
    console.log("Demorou ms: "+(Date.now()-past));
    console.log("Tamanho do lua dict + dados:", encoded.length);
    //console.log("encoded:",encoded);
    //return;

    const generatorScript = await Deno.readTextFile("src/lua/gerador.lua");
    const result = encoded + "\n\n\n" + generatorScript;
    //-return;
    ///'local a="a"; Dados={'+orientation+','+blockStringMatrix+'}'
    await this.outputLua(fileName, result);////tirar declarações de variáveis daqui
    ///+"\nO script vai gerar "+this.actual.totalBlocks+" blocos"
    ///this.ct = 0;
  }
  async outputLua(fileName: string, text: string){
    await Deno.writeTextFile("io/"+fileName, text);
  }
}