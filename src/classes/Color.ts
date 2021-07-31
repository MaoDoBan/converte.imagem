import { Distances } from "./Distances.ts";

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

  hasDistanceTo(otherColor: Color){
    return this.distances[otherColor.hex] !== undefined;
  }

  calculateDistanceTo(otherColor: Color){
    const distanceRed   = this.r - otherColor.r;
    const distanceGreen = this.g - otherColor.g;
    const distanceBlue  = this.b - otherColor.b;
    let distance = Math.sqrt(
      distanceRed   * distanceRed   +
      distanceGreen * distanceGreen +
      distanceBlue  * distanceBlue
    );
  
    distance = Number(distance.toFixed(4));//reduzindo pra 4 casas decimais
    this.addDistance(otherColor.hex, distance);
    otherColor.addDistance(this.hex, distance);
  
    return distance.toLocaleString('de-DE');//converte . pra , e deixa só 3 casa decimais depois da ,
  }

  populateDistances(arrayColors: Color[], distanceLimit = 444): string{
    let stringListOfDistances = "";
    for(const color of arrayColors){
      for(const otherColor of arrayColors){
        if( color.hasDistanceTo(otherColor) ) continue;
        stringListOfDistances += color.calculateDistanceTo(otherColor)+"\n";
      }
    }
    return stringListOfDistances;
  }

  // hasDistanceTo(colorHex: string): boolean{
  //   return this.distances[colorHex] !== undefined;
  // }
};