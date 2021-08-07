import { Image } from "https://deno.land/x/imagescript@1.2.9/mod.ts";
import { PixelsToBlocks } from "./PixelsToBlocks.ts";
import { NumOrString } from "../../interfaces/Types.ts";

export class Conversion{
  private pixelConverter: PixelsToBlocks;
  
  constructor(
    readonly image: Image
  ){
    this.pixelConverter = new PixelsToBlocks();
  }

  imageToBlockMatrix(): NumOrString[]{
    ///ler de linhas, depois colunas, comparar pra escolher o resultado menor
    const convertedBlocks = this.pixelLinesToMatrix();

    //-this.allConvertedBlocks.push(convertedBlocks);

    // for(const line of this.pixelLines(direction)){
    //   matrixString += this.pixelLineToString(line);//-
    // }
    console.log("Resultado:", this.pixelConverter.serializedBlocks);

    return convertedBlocks;
  }

  pixelLinesToMatrix(): NumOrString[]{
    const width = this.image.width;
    const bitmap = this.image.bitmap;

    for(let iStart = 0; iStart < bitmap.length; iStart += width*4){
      const line = bitmap.subarray( iStart, iStart + width*4 );
      this.pixelConverter.addPixelArray(line);///this.totalBlocks += 
    }
    return this.pixelConverter.serializedBlocks;
  }
  /*pixelColumnsToMatrix(): number[][]{///planos pra 0.7
    const bitmap = this.actual.image.bitmap;
    const lines: number[][] = [];
    for(let iColumn = 0; iColumn < this.image.width; iColumn++){
      const line: number[] = [];
      for(let iLine = 0; iLine < this.image.height; iLine++){
        const i = iColumn*4 + iLine*4*this.image.width;//cada pixel ocupa 4 índices
        line.push(bitmap[i], bitmap[i+1], bitmap[i+2], bitmap[i+3]);
      }
      lines.push(line);
    }
    return lines;
  }*/
}