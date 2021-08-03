import { Image } from "https://deno.land/x/imagescript@1.2.9/mod.ts";
import { Node } from "./Node.ts";
import { PreviousInfos } from "./PreviousInfos.ts";

export class Converter{
  private static dictionaryAllNodes: { [hex: string]: Node } = {};
  private x = 0;
  private y = 0;
  private previous: PreviousInfos = {} as PreviousInfos;
  constructor(){
    Node.populateAllNodes();
  }

  async convert(fileName: string, orientation = "x"){
    const past = Date.now();

    const rawImage = await Deno.readFile("io/"+fileName+".png");
    const imageDecoded = await Image.decode(rawImage);
    //const blockMatrixString = this.bitmapToBlocks(imageDecoded.bitmap, imageDecoded.width, imageDecoded.height);
    const blockMatrixString = this.imageToMatrix(imageDecoded);
    console.log(blockMatrixString)

    //Converter.saveLua(fileName, 'local a="a"; Dados={'+orientation+','+blockMatrixString+'}');
    console.log("Demorou ms: "+(Date.now()-past));
  }
  
  private imageToMatrix(image: Image){
    this.x = 0;
    this.y = image.height-1;
    this.previous = new PreviousInfos();
    let matrixString = "";
    for(const line of this.linesOf(image)){
      matrixString += this.pixelLineToString(line);
      this.y--;
      this.x = 0;
    }
    return matrixString.slice(0, -1);//removendo o último caractere
  }
  private linesOf(image: Image): Uint8ClampedArray[]{
    const {bitmap, width} = image;
    const lines: Uint8ClampedArray[] = [];
    for(let iRow = 0; iRow < bitmap.length; iRow += width*4){
      lines.push( bitmap.subarray( iRow, iRow + width*4 ) );
    }
    return lines;
  }
  private pixelLineToString(line: Uint8ClampedArray): string{
    let lineString = "";
    let segment = "";
    for(let iPixel = 0; iPixel < line.length; iPixel+=4){
      if(line[iPixel+3] < 128){
        this.x++;
        continue;
      }
      //this.pixelToNode();
      //console.log(this.x,this.y,"  ",line[iPixel],line[iPixel+1],line[iPixel+2],line[iPixel+3]);
      this.x++;
    }
    
    return lineString;
  }
  private pixelToNode(rgb: number[]): Node{/// salvar resultados da busca em um dict
    return Node.sequentialSearch(rgb);
  }

  // private bitmapToBlocks(bitmap: Uint8ClampedArray, width: number, height: number): string{
  //   let matrixString = "";
  //   //let previousNode = Node.emptyNode;
  //   let x = 0, y = height;
  //   for(let i = 0; i < bitmap.length; i+=4){//r,g,b,opacity
  //     x++;
  //     if(x > width){
  //       x = 1;
  //       y--;
  //     }
  //     if(bitmap[i+3] < 128) continue;
      
  //     const rgb = [bitmap[i],bitmap[i+1],bitmap[i+2]];
  //     const node = Node.sequentialSearch(rgb);
  //     // if(previousNode.id == node.id){
  //     //   ;
  //     // }else{
  //     //   previousNode = node;
  //     //   matrixString += "{";
  //     // }
  //     /// colocar a só quando o repetido for maior que 9
  //   }
  //   return matrixString;
  // }

  private static async saveLua(fileName: string, text: string){
    await Deno.writeTextFile("io/"+fileName+".lua", text);
  }
}

/*
Dados = {
  "x",
  {0,0,0,2,1,0,"a",2,15,1,3,"a",3,"a",0},
  {"a",1,"a",2,1,0,"a",2,15,1,3,"a",3,"a",0}
};
*/