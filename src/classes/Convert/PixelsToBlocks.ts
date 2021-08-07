import { Color } from "../Tree/Color.ts";
import { Node } from "../Tree/Node.ts";
import { Serializer } from "./Serializer.ts";
import { NumOrString } from "../../interfaces/Types.ts";

export class PixelsToBlocks{
  private static convertedBlocks: { [hex: string]: string } = {};
  private serializer: Serializer;
  
  constructor(){
    this.serializer = new Serializer();
  }

  get serializedBlocks(): NumOrString[]{
    return this.serializer.result;
  }

  addPixelArray(pixelArray: Uint8ClampedArray | number[]){////: number  retornar quantos blocos não ar foram serialisados
    for(let iPixel = 0; iPixel < pixelArray.length; iPixel+=4){
      if(pixelArray[iPixel+3] < 128){//opacidade menor que 50%
        this.serializer.addBlock("_");
        continue;
      }

      const block = this.pixelToBlock(pixelArray[iPixel], pixelArray[iPixel+1], pixelArray[iPixel+2]);
      this.serializer.addBlock(block);
      ///this.ct++;
    }
    //return ;
  }
  private pixelToBlock(...rgb: number[]): string{
    const colorHex = Color.rgbToHex(rgb);
    let block = PixelsToBlocks.convertedBlocks[colorHex];
    if(block) return block;

    const color = new Color(colorHex, rgb);
    block = Node.sequentialSearch(color).block;
    PixelsToBlocks.convertedBlocks[color.hex] = block;
    return block;
  }
}