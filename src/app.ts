import { ConversionManager } from "./classes/Convert/ConversionManager.ts";

const conversor = new ConversionManager();
await conversor.convert("t3x3.png");// "maum.png"  "arco-iris.png"
///await conversor.saveLua("arco-iris");