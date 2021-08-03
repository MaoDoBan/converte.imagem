import { Image } from "https://deno.land/x/imagescript@1.2.9/mod.ts";
import { Node } from "./Node.ts";
import { Color } from "./Color.ts";
import { Block } from "./Block.ts";
import { SegmentManager } from "./SegmentManager.ts";

export class Converter{
  private static convertedPixels: { [hex: string]: Block } = {};
  private image: Image = {} as Image;
  private x = 0;
  private y = 0;
  private ct = 0;
  constructor(){
    Node.populateAllNodes();
  }

  async convert(fileName: string, orientation = '"x"'){
    const past = Date.now();

    const rawImage = await Deno.readFile("io/"+fileName+".png");
    this.image = await Image.decode(rawImage);
    const blockMatrixString = this.imageToMatrix();
    //-console.log("Matriz:",blockMatrixString);

    Converter.saveLua(fileName, 'local a="a"; Dados={'+orientation+','+blockMatrixString+'}');
    console.log("Demorou ms: "+(Date.now()-past)+"\nO script vai gerar "+this.ct+" blocos"); this.ct = 0;
  }
  
  private imageToMatrix(){
    this.x = 0;
    this.y = this.image.height-1;
    //-this.previous = new PreviousInfos();
    let matrixString = "";
    for(const line of this.pixelLines()){
      matrixString += this.pixelLineToString(line);
      this.y--;
      this.x = 0;
    }
    return matrixString.slice(0, -1);//removendo o último caractere
  }
  private pixelLines(): Uint8ClampedArray[]{
    const lines: Uint8ClampedArray[] = [];
    for(let iRow = 0; iRow < this.image.bitmap.length; iRow += this.image.width*4){
      lines.push( this.image.bitmap.subarray( iRow, iRow + this.image.width*4 ) );
    }
    return lines;
  }
  private pixelLineToString(line: Uint8ClampedArray): string{
    //-console.log("line:\n",line.toString());
    const segMananger = new SegmentManager();
    for(let iPixel = 0; iPixel < line.length; iPixel+=4){
      if(line[iPixel+3] < 128){//opacidade menor que 50%
        this.x++;
        segMananger.closeCurrentSegment();
        continue;
      }

      const block = this.pixelToBlock([ line[iPixel], line[iPixel+1], line[iPixel+2] ]);
      segMananger.update(block, this.x, this.y);
      this.x++; this.ct++;
    }
    return segMananger.allToString();
  }
  private pixelToBlock(rgb: number[]): Block{
    const colorHex = Color.rgbToHex(rgb);
    let block = Converter.convertedPixels[colorHex];
    if(block) return block;
    const color = new Color(colorHex, rgb);
    block = Node.sequentialSearch(color).block;
    Converter.convertedPixels[color.hex] = block;
    return block;
  }

  private static async saveLua(fileName: string, text: string){
    await Deno.writeTextFile("io/"+fileName+".lua", text);
  }
}