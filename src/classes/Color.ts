export class Color{
  readonly rgb: number[];

  constructor(
    readonly hex: string,
    rgb: number[] = []
  ){
    this.rgb = rgb.length > 0 ? rgb : Color.hexToRgb(this.hex);
  }

  static calculateColorDistance(colorRgb1: number[], colorRgb2: number[]): number{
    let sumOfSquares = 0;
    for(let i = 0; i < 3; i++){
      sumOfSquares += (colorRgb1[i] - colorRgb2[i])**2;
    }
    const distance = Math.sqrt(sumOfSquares);
    return Number(distance.toFixed(3));//reduzindo pra 3 casas decimais
  }

  static hexToRgb(hex: string): number[]{
    const colorRgb: number[] = [];
    for(let i = 0; i <= 4; i += 2) {
      colorRgb[i/2] = parseInt(hex.substr(i, 2), 16);
    }
    return colorRgb;
  }

  static rgbToHex(rgb: number[]): string{
    let hex = "";
    for(const part of rgb){
      let partHex = part.toString(16);
      partHex = partHex.length < 2 ? '0'+partHex : partHex;
      hex += partHex;
    }
    return hex;
  }
}