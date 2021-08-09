import { ConversionManager } from "./classes/Convert/ConversionManager.ts";

const conversor = new ConversionManager();
await conversor.convert({fileName: "maum.png"});//"t3x3.png" "maum.png"  "arco-iris.png"
await conversor.save("encoder-teste");