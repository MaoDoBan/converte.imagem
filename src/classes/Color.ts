export class Color{
  readonly rgb: number[];
  readonly hex: string;

  constructor(
    color: string | number[],
    rgb: number[] = []
  ){
    if(typeof(color) == "string"){
      this.hex = color;
      if(rgb.length == 3){
        this.rgb = rgb;
        return;
      }
      this.rgb = Color.hexToRgb(color);
      return;
    }
    this.rgb = color;
    this.hex = Color.rgbToHex(color);
  }
  /*
  static validate(color: Color |  number[] | string): Color{
    if(color instanceof Color) return color;
    return new Color(color);
  }
  */
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