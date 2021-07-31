import { readJsonSync } from "https://deno.land/x/jsonfile@1.0.0/mod.ts";
import { Color } from "./Color.ts";
type RawPalette = { [blockId: number]: number[][] };

export class Palette{
  [hex: string]: Color | number;

  constructor(){
    const rawPalette: RawPalette = readJsonSync("src/colorPalette/paleta_cores_rgb.json") as RawPalette;
    for(let blockId = 667; blockId <= 682; blockId++){
      for(let metadata = 0; metadata <= 15; metadata++){
        const color = new Color(blockId, metadata, rawPalette[blockId][metadata]);
        if(this[color.hex] !== undefined) continue;
        this[color.hex] = color;
      }
    }
  }

  get length(): number{
    return Object.keys(this).length;
  }
}