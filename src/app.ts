import { ConversionManager } from "./classes/Convert/ConversionManager.ts";

const conversor = new ConversionManager();
await conversor.convert({fileName: Deno.args[0]});//"t3x3.png" "maum.png"  "arco-iris.png"
await conversor.save(Deno.args[0].split('.')[0] + ".lua");