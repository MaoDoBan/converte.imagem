import { Util } from "../Util.ts";
import { NumOrString } from "../../interfaces/Types.ts";
type CurrentBlock = {block: string, count: number};

export class Serializer{
  private serializedBlocks: NumOrString[];
  private current: CurrentBlock;

  constructor(){
    this.serializedBlocks = [];
    this.current = {block: "", count: 1};
  }

  get result(): NumOrString[]{
    this.serialize();
    this.current = {block: "", count: 1};
    return this.serializedBlocks;
  }
  get length(): number{
    const serialLength = this.serializedBlocks.length;
    return this.current.block == "" ? serialLength : serialLength+1;
  }

  addBlock(block: string){
    if(this.current.block == block) return this.current.count++;

    this.serialize();
    this.current.block = block;
    this.current.count = 1;
  }

  private serialize(){
    const {block, count} = this.current;
    const countStr = count > 1 ? Util.decToHex(count) : "";
    const serialized = this.mergeCountAndBlockToBase36(countStr, block);
    if(serialized !== "") this.serializedBlocks.push(serialized);
  }
  private mergeCountAndBlockToBase36(countHex: string, blockHex: string): string{
    if(blockHex === "_") return Util.hexToBase36(countHex) + blockHex;

    return Util.hexToBase36( countHex + blockHex );
  }
}