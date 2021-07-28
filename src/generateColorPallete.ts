import { Image } from "https://deno.land/x/imagescript/mod.ts";
import { writeJson } from "https://deno.land/x/jsonfile/mod.ts";

const msPast = Date.now();
const colorsHex: string[][] = [];
const colorsRgb: number[][][] = [];

for(let blockId = 667; blockId <= 667; blockId++) {//682
  const fifteenColorsHex: string[] = [];
  const fifteenColorsRgb: number[][] = [];

  for(let metadata = 0; metadata <= 15; metadata++) {
    const rawImage = await Deno.readFile("paleta_cores/"+blockId+"_"+metadata+".png");
    const imageDecoded = await Image.decode(rawImage);

    const colorHexDecimal = imageDecoded.averageColor();
    const colorHexWithOpacity = colorHexDecimal.toString(16);
    const colorHex = colorHexWithOpacity.substr(0, 6);

    const colorRgb: number[] = [];
    for(let i = 0; i <= 2; i += 2) {
      colorRgb[i/2] = parseInt(colorHex.substr(i, 2), 16);
    }

    fifteenColorsHex[metadata] = colorHex;
    fifteenColorsRgb[metadata] = colorRgb;
  }

  colorsHex[blockId] = fifteenColorsHex;
  colorsRgb[blockId] = fifteenColorsRgb;
}

await writeJson("paleta_cores_hex.json", colorsHex, {spaces: 2});
await writeJson("paleta_cores_rgb.json", colorsRgb, {spaces: 2});

console.log("Feito em "+ (Date.now() - msPast) +"ms");