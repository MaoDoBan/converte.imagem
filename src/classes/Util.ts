export class Util{
  static decToHex(dec: number): string{
    return dec.toString(16);
  }

  static hexToDec(hex: string): number{
    return hex === "" ? 0 : parseInt(hex, 16);
  }
  
  static decToBase36(dec: number): string{
    return dec.toString(36);
  }

  static hexToBase36(hex: string): string{
    return hex === "" ? "" : Util.decToBase36( Util.hexToDec(hex) );
  }
}