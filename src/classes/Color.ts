import { Distances } from "./Distances.ts";//, Distance

export class Color{
  readonly hex: string;
  readonly r: number;
  readonly g: number;
  readonly b: number;
  private distances: Distances;

  constructor(
    readonly blockId: number,
    readonly metadata: number,
    colorRgb: number[]
  ){
    this.hex = this.rgbToHex(colorRgb);
    this.r = colorRgb[0];
    this.g = colorRgb[1];
    this.b = colorRgb[2];
    this.distances = new Distances();
  }

  rgbToHex(rgb: number[]): string{
    let hex = "";
    for(const part of rgb){
      let partHex = part.toString(16);
      partHex = partHex.length < 2 ? '0'+partHex : partHex;
      hex += partHex;
    }
    return hex;
  }

  addDistance(hexOtherColor: string, distance: number){
    this.distances[hexOtherColor] = distance;
  }

  hasDistanceTo(otherColorHex: string){
    return this.distances[otherColorHex] !== undefined;
  }

  calculateDistanceTo(otherColor: Color): number{
    const distanceRed   = this.r - otherColor.r;
    const distanceGreen = this.g - otherColor.g;
    const distanceBlue  = this.b - otherColor.b;
    let distance = Math.sqrt(
      distanceRed   * distanceRed   +
      distanceGreen * distanceGreen +
      distanceBlue  * distanceBlue
    );
  
    distance = Number(distance.toFixed(4));//reduzindo pra 4 casas decimais  
    return distance;
  }

  static populateDistances(arrayColors: Color[], distanceLimit = 444): string{
    console.log("Limite "+distanceLimit);
    let stringListOfDistances = "";
    for(const color of arrayColors){
      for(const otherColor of arrayColors){
        if( color.hasDistanceTo(otherColor.hex) || color.hex === otherColor.hex ) continue;
        const distance = color.calculateDistanceTo(otherColor);
        if(distance > distanceLimit) continue;
        color.addDistance(otherColor.hex, distance);
        otherColor.addDistance(color.hex, distance);
        stringListOfDistances += distance.toLocaleString('de-DE')+"\n";//converte . pra , e deixa só 3 casa decimais depois da ,
      }
    }
    return stringListOfDistances;
  }

  static listHowManyDistances(arrayColors: Color[]): string{
    let list = "";
    for(const color of arrayColors){
      list += color.distances.length+'\n';
    }
    return list;
  }

  // static populateDistances(arrayColors: Color[], distanceLimit = 444): string{
  //   console.log("Limite "+distanceLimit);
  //   let stringListOfDistances = "";
  //   for(const color of arrayColors){
  //     for(const otherColor of arrayColors){
  //       if( color.hasDistanceTo(otherColor.hex) || color.hex === otherColor.hex ) continue;
  //       const distance = color.calculateDistanceTo(otherColor);
  //       if(distance > distanceLimit) continue;
  //       color.addDistance(otherColor.hex, distance);
  //       otherColor.addDistance(color.hex, distance);
  //       stringListOfDistances += distance.toLocaleString('de-DE')+"\n";//converte . pra , e deixa só 3 casa decimais depois da ,
  //     }
  //   }
  //   return stringListOfDistances;
  // }

  // getMinDistance(): Distance{
  //   ;
  // }

  // static listMinDistances(arrayColors: Color[]): string{
  //   for(const color of arrayColors){
  //     list += color.getMinDistance()+'\n';
  //   }
  // }
};