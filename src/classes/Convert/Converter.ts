import { Image } from "https://deno.land/x/imagescript@1.2.9/mod.ts";
import { Node } from "../Tree/Node.ts";
import { ActualConvert } from "./ActualConvert.ts";
import { NumOrString } from "../../interfaces/Types.ts";

export class Converter{
  private allConvertedBlocks: NumOrString[][];
  private actual = {} as ActualConvert;
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
    this.actual = new ActualConvert(image);

    this.imageToBlockMatrix();

    //const blockStringMatrix = this.imageToStringMatrix();
    ///comparar qual tem menos caracteres...
    ///this.convertedImages.push(blockStringMatrix);

    //await this.saveLua(fileName, 'local a="a"; Dados={'+orientation+','+blockStringMatrix+'}');////tirar declarações de variáveis daqui

    console.log("Demorou ms: "+(Date.now()-past));
  }

  async save(fileName: string){///need new name? because this.saveLua
    ;
    ////call other function to loop in this.allBlockMatrices populating repeatStatistics with class Counter
    ////loop in this.allBlockMatrices doing blockMatrix.toString()

    //console.log("Demorou ms: "+(Date.now()-past)+"\nO script vai gerar "+this.actual.totalBlocks+" blocos"); this.ct = 0;
  }
  
  private imageToBlockMatrix(){/////
    ///if pra ver se vai converter lendo linhas ou lendo colunas
    const convertedBlocks = this.actual.pixelLinesToMatrix();

    this.allConvertedBlocks.push(convertedBlocks);

    // for(const line of this.pixelLines(direction)){
    //   matrixString += this.pixelLineToString(line);//-
      
    // }
    console.log("Resultado:", convertedBlocks);
  }

  async saveLua(fileName: string, text: string){
    await Deno.writeTextFile("io/"+fileName+".lua", text);
  }
}

//DEPRECATED delete

  /*private pixelLineToString(line: Uint8ClampedArray | number[]): string{///deprecated, delete in 0.5
    //-console.log("line:\n",line.toString());
    const segManager = new SegmentManager(); V
    for(let iPixel = 0; iPixel < line.length; iPixel+=4){
      if(line[iPixel+3] < 128){//opacidade menor que 50%
        this.x++;
        segManager.closeCurrentSegment();
        continue;
      }

      const block = this.pixelToBlock(line[iPixel], line[iPixel+1], line[iPixel+2]);
      segManager.update(block, this.x, this.y);
      this.x++; this.ct++;
    }
    return segManager.allToString();
  }*/

