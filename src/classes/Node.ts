import { readJson } from "https://deno.land/x/jsonfile@1.0.0/mod.ts";
import { Color } from "./Color.ts";
import { Neighbors } from "./Neighbors.ts";

export class Node{
  private static allNodes: { [hex: string]: Node } = {};
  private neighbors: Neighbors;

  constructor(
    readonly blockIdAndData: {blockId: number, metadata: number},
    private color: Color
  ){
    this.neighbors = new Neighbors();
    Node.allNodes[this.color.hex] = this;
  }

  get colorRgb(): number[]{
    return this.color.rgb;
  }
  get id(): string{
    return this.color.hex;
  }

  distanceToNode(otherNode: Node): number{
    return this.neighbors.distanceTo(otherNode.id) || Color.calculateColorDistance(this.colorRgb, otherNode.colorRgb);
  }
  distanceToRgb(otherColorRgb: number[]): number{
    return Color.calculateColorDistance(this.colorRgb, otherColorRgb);
  }

  static async populateAllNodes(): Promise<boolean>{
    if(Object.keys(Node.allNodes).length > 0) return false;

    type RawPalette = { [blockId: number]: string[] };
    const rawPalette: RawPalette = await readJson("src/colorPalette/hexColorPalette.json") as RawPalette;

    for(let blockId = 667; blockId <= 682; blockId++){
      for(let metadata = 0; metadata <= 15; metadata++){
        const block = {blockId, metadata};
        const colorHex = rawPalette[blockId][metadata];
        new Node(block, new Color(colorHex));
      }
    }

    console.log("Populated "+Object.keys(Node.allNodes).length+" Nodes");
    return true;
  }

  static growTree(limitNeighbors: number){
    return 0;
  }

  // static buscaSequencial(): Node{
  //   ;
  // }
  buscaEmLargura(){}
  buscaInformada(){///partindo do centro; partindo de 8 cantos; partindo de 6 cantos; variações das duas anteriores + centro
  }
}