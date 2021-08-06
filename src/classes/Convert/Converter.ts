import { Image } from "https://deno.land/x/imagescript@1.2.9/mod.ts";
import { Node } from "./Node.ts";
import { Color } from "./Color.ts";
import { SegmentManager } from "./SegmentManager.ts";
import { BlockMatrix } from "./BlockMatrix.ts";

export class Converter{
  private static convertedDict: { [hex: string]: string } = {};
  private allBlockMatrices: BlockMatrix[];
  private segManager: SegmentManager;
  private actual = {
    x: 0,
    y: 0,
    qtBlocks: 0,
    image: {} as Image,
    blockMatrix: {} as BlockMatrix
  };
  constructor(){
    if(Node.allNodesLength == 0) Node.populateAllNodes();

    this.allBlockMatrices = [];
    this.segManager = new SegmentManager();
  }

  async convert(fileName: string){//, direction: {x: string, y: string} //aceitar posição relativa do player
    const past = Date.now();

    const rawImage = await Deno.readFile("io/"+fileName);
    const image = await Image.decode(rawImage);
    if(image.height > 256 || image.width > 256) return console.log("ERRO: dimensão passou do limite de 256!");
    this.actual.image = image;

    this.imageToBlockMatrix();

    //const blockStringMatrix = this.imageToStringMatrix();
    ///comparar qual tem menos caracteres...
    ///this.convertedImages.push(blockStringMatrix);

    //await this.saveLua(fileName, 'local a="a"; Dados={'+orientation+','+blockStringMatrix+'}');////tirar declarações de variáveis daqui
    console.log("Demorou ms: "+(Date.now()-past)+"\nO script vai gerar "+this.actual.qtBlocks+" blocos"); this.ct = 0;
  }
  
  private imageToBlockMatrix(){/////TODO:

    for(const line of this.pixelLines(direction)){
      matrixString += this.pixelLineToString(line);//-
      
    }
    console.log("Resultado:", blockStringMatrix);
  }

  private pixelLinesToMatrix(){
    const width = this.actual.image.width;
    const bitmap = this.actual.image.bitmap;
    
    this.actual.x = 0;
    this.actual.y = this.actual.image.height-1;

    for(let iStart = 0; iStart < bitmap.length; iStart += width*4){
      const line = bitmap.subarray( iStart, iStart + width*4 );
      this.addPixelArray(line);

      this.actual.y--;
      this.actual.x = 0;
    }
  }
  /*private pixelColumnsToMatrix(): number[][]{///planos pra 0.7
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

  private 

  private pixelToBlock(...rgb: number[]): string{
    const colorHex = Color.rgbToHex(rgb);
    let block = Converter.convertedDict[colorHex];
    if(block) return block;

    const color = new Color(colorHex, rgb);
    block = Node.sequentialSearch(color).block;
    Converter.convertedDict[color.hex] = block;
    return block;
  }

  async saveLua(fileName: string, text: string){
    await Deno.writeTextFile("io/"+fileName+".lua", text);
  }
}

//DEPRECATED TODO: delete
  /*private pixelLines(direction: "x" | "y"): Uint8ClampedArray[] | number[][]{//--V
    const bitmap = this.image.bitmap;
    const lines: Uint8ClampedArray[] = [];
    if(direction == "x"){
      for(let iRow = 0; iRow < bitmap.length; iRow += this.image.width*4){
        lines.push( bitmap.subarray( iRow, iRow + this.image.width*4 ) );
      }
      return lines;
    }
    return this.pixelLineY();
  }*/
  /*private pixelLineY(): number[][]{///deprecated, delete in 0.5
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
  }*/

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

  /*private imageToStringMatrix(){
    const blockMatrix = this.imageToBlockMatrix();
    return matrixString.slice(0, -1);//removendo o último caractere
  }*/