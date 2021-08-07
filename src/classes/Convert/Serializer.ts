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

  addBlock(block: string){
    if(this.current.block == block) return this.current.count++;

    this.serialize();
    this.current.block = block;
    this.current.count = 1;
  }
  private serialize(){
    const count = this.current.count;
    const countStr = count > 1 ? Util.decToHex(count) : "";
    const serialized = Util.hexToBase36( countStr + this.current.block );
    this.serializedBlocks.push(serialized);
  }
}