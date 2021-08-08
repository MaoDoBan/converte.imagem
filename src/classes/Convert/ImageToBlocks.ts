import { Image } from "https://deno.land/x/imagescript@1.2.9/mod.ts";
import { PixelsToBlocks } from "./PixelsToBlocks.ts";
import { NumOrString } from "../../interfaces/Types.ts";

export class ImageToBlocks{
  private pixelConverter: PixelsToBlocks;
  
  constructor(
    readonly image: Image
  ){
    this.pixelConverter = new PixelsToBlocks();
  }

  get result(): NumOrString[]{
    return this.convert();
  }

  convert(): NumOrString[]{
    const convertedByLines   = this.pixelLinesToBlocks();
    console.log("Resultado linhas:", convertedByLines);
    const convertedByColumns = this.pixelColumnsToMatrix(convertedByLines.length);
    console.log("Resultado colunas:", convertedByColumns);

    return convertedByLines.length <= convertedByColumns.length ? convertedByLines : convertedByColumns;//convertedBlocks;
  }

  pixelLinesToBlocks(): NumOrString[]{
    const bitmap = this.image.bitmap;
    for(let i = 0; i < bitmap.length;){
      this.pixelConverter.addPixel(bitmap[i++], bitmap[i++], bitmap[i++], bitmap[i++]);
    }
    return this.pixelConverter.serializedBlocks;
  }
  pixelColumnsToMatrix(limit: number): NumOrString[]{
    const bitmap = this.image.bitmap;
    for(let iColumn = 0; iColumn < this.image.width; iColumn++){
      for(let iLine = 0; iLine < this.image.height; iLine++){
        let i = iColumn*4 + iLine*4*this.image.width;//cada pixel ocupa 4 índices
        this.pixelConverter.addPixel(bitmap[i++], bitmap[i++], bitmap[i++], bitmap[i]);
        if(this.pixelConverter.length >= limit) return this.pixelConverter.serializedBlocks;
      }
    }
    return this.pixelConverter.serializedBlocks;
  }
}