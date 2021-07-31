import { readJson, writeJson } from 'https://deno.land/x/jsonfile/mod.ts';



type SortedPalette = {
  [red: number]: {
    [green: number]: {
      [blue: number]: {
        blockId: number,
        metadata: number
      }
    }
  }
};
class Palette{
  constructor(
    readonly palette: SortedPalette = {},
    readonly length: number = 0,
  ){}
  
  addColor(){
    ;
  }

  
}
let palette = new Palette();

function readMetadataVariation(){
  for(let metadata = 0; metadata <= 15; metadata++) {
    //insertColor();
  }
}

function readBlock(){
  for(let blockId = 667; blockId <= 682; blockId++) {
    readMetadataVariation();
  }
}










function sortPalette(rawPalette: RawPalette): SortedPalette{
  
  return {};
}







//const sortedPalette = sortPalette(rawPalette);

//await writeJson("src/colorPelette/rgbPaletteSorted.json", colorsHex, {spaces: 2});