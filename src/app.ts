import { Image } from 'https://deno.land/x/imagescript/mod.ts';

//o caminho aqui é referente a pasta onde o terminal se encontra ../paleta_cores/667_0.png
//-const raw_image = await Deno.readFile('paleta_cores/667_0.png');
//-const imagem = await Image.decode(raw_image);

//-console.log("Cor média: "+imagem.averageColor().toString(16));//yourNumber.toString(16)

for(let blockId = 667; blockId <= 667; blockId) {//682
  for(let metadata = 0; metadata <= 12; metadata++) {//15
    const rawImage = await Deno.readFile('paleta_cores/'+blockId+'_'+metadata+'.png');
    const imageDecoded = await Image.decode(rawImage);
    console.log("Cor média de "+blockId+'_'+metadata+": "+imageDecoded.averageColor().toString(16));
  }
}