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
    const result = this.serializer.result;
    this.serializer = new Serializer();
    return result;
  }

  addPixelArray(pixelArray: Uint8ClampedArray | number[]){////: number  retornar quantos blocos não ar foram serialisados
    for(let iPixel = 0; iPixel < pixelArray.length; ){///iPixel+=4
      this.addPixel(pixelArray[iPixel++], pixelArray[iPixel++], pixelArray[iPixel++], pixelArray[iPixel++]);
    }
  }
  addPixel(r: number, g: number, b: number, opacity: number){
    if(opacity < 128) return this.serializer.addBlock("_");//opacidade menor que 50%

    const block = this.pixelToBlock(r, g, b);
    this.serializer.addBlock(block);
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