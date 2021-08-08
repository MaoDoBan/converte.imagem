import { ConversionManager } from "./classes/Convert/ConversionManager.ts";

const conversor = new ConversionManager();
await conversor.convert("arco-iris.png");//"t3x3.png" "maum.png"  "arco-iris.png"
///await conversor.saveLua("arco-iris");