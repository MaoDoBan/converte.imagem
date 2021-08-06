import { Image } from "https://deno.land/x/imagescript@1.2.9/mod.ts";
import { Node } from "./Node.ts";
import { Color } from "./Color.ts";
import { SegmentManager } from "./SegmentManager.ts";///

export class Converter{
  private static convertedDict: { [hex: string]: string } = {};
  private convertedImages: string[] = [];
  private actual = {
    x: 0,
    y: 0,
    ct: 0,
    image: {} as Image
  };
  constructor(){
    if(Node.allNodesLength == 0) Node.populateAllNodes();
  }

  async convert(fileName: string, orientation = '"x"'){
    const past = Date.now();

    const rawImage = await Deno.readFile("io/"+fileName+".png");
    this.image = await Image.decode(rawImage);
    /// se largura ou altura da imagem > 270, retorna erro

    ///const blockMatrixStringX = this.imageToMatrix("x");
    const blockMatrixStringY = this.imageToStringMatrix("y");
    ///comparar qual tem menos caracteres...
    //-console.log("Matriz:",blockMatrixString);

    Converter.saveLua(fileName, 'local a="a"; Dados={'+orientation+','+blockMatrixStringY+'}');////tirar declarações de variáveis daqui
    console.log("Demorou ms: "+(Date.now()-past)+"\nO script vai gerar "+this.ct+" blocos"); this.ct = 0;
  }
  
  private imageToStringMatrix(direction: "x" | "y"): string{
    this.x = 0;
    this.y = this.image.height-1;
    //-this.previous = new PreviousInfos();
    let matrixString = "";
    for(const line of this.pixelLines(direction)){
      matrixString += this.pixelLineToString(line);
      this.y--;
      this.x = 0;
    }
    return matrixString.slice(0, -1);//removendo o último caractere
  }

  private imageToBlockMatrix(){

  }
  private pixelLines(direction: "x" | "y"): Uint8ClampedArray[] | number[][]{///deprecated, delete in 0.5
    const bitmap = this.image.bitmap;
    const lines: Uint8ClampedArray[] = [];
    if(direction == "x"){
      for(let iRow = 0; iRow < bitmap.length; iRow += this.image.width*4){
        lines.push( bitmap.subarray( iRow, iRow + this.image.width*4 ) );
      }
      return lines;
    }
    return this.pixelLineY();
  }
  private pixelLineY(): number[][]{///deprecated, delete in 0.5
    const bitmap = this.image.bitmap;
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
  }

  private pixelLineToString(line: Uint8ClampedArray | number[]): string{///deprecated, delete in 0.5
    //-console.log("line:\n",line.toString());
    const segManager = new SegmentManager();
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
  }

  private pixelToBlock(...rgb: number[]): string{
    const colorHex = Color.rgbToHex(rgb);
    let block = Converter.convertedDict[colorHex];
    if(block) return block;
    const color = new Color(colorHex, rgb);
    block = Node.sequentialSearch(color).block;
    Converter.convertedDict[color.hex] = block;
    return block;
  }

  private static async saveLua(fileName: string, text: string){
    await Deno.writeTextFile("io/"+fileName+".lua", text);
  }
}