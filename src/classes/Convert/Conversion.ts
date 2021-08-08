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

  imageToBlocks(): NumOrString[]{
    ///ler de linhas, depois colunas, comparar pra escolher o resultado menor
    const convertedByLines   = this.pixelLinesToBlocks();
    console.log("Resultado linhas:", convertedByLines);
    const convertedByColumns = this.pixelColumnsToMatrix();
    console.log("Resultado colunas:", convertedByColumns);

    //-this.allConvertedBlocks.push(convertedBlocks);

    // for(const line of this.pixelLines(direction)){
    //   matrixString += this.pixelLineToString(line);//-
    // }

    return []//convertedBlocks;
  }

  pixelLinesToBlocks(): NumOrString[]{
    const width = this.image.width;
    const bitmap = this.image.bitmap;

    for(let iStart = 0; iStart < bitmap.length; iStart += width*4){
      const line = bitmap.subarray( iStart, iStart + width*4 );
      this.pixelConverter.addPixelArray(line);///this.totalBlocks += 
    }
    return this.pixelConverter.serializedBlocks;
  }
  pixelColumnsToMatrix(): NumOrString[]{
    const bitmap = this.image.bitmap;
    for(let iColumn = 0; iColumn < this.image.width; iColumn++){
      for(let iLine = 0; iLine < this.image.height; iLine++){
        let i = iColumn*4 + iLine*4*this.image.width;//cada pixel ocupa 4 índices
        this.pixelConverter.addPixel(bitmap[i++], bitmap[i++], bitmap[i++], bitmap[i]);
      }
    }
    return this.pixelConverter.serializedBlocks;
  }
}