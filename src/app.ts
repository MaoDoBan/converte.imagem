import { ConversionManager } from "./classes/Convert/ConversionManager.ts";

const conversor = new ConversionManager();
await conversor.convert("arco-iris.png");//"t3x3" "maum"
///await conversor.saveLua("arco-iris");