import { Converter } from "./classes/Convert/Converter.ts";

const converter = new Converter();
await converter.convert("arco-iris.png");//"t3x3" "maum"
///await converter.saveLua("arco-iris");