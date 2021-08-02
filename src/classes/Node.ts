import { Color } from "./Color.ts";
import { Neighbors } from "./Neighbors.ts";

export class Node{
  private static allNodes: { [hex: string]: Node[] };
  private neighbors: Neighbors;

  constructor(
    readonly blockIdAndData: {blockId: number, data: number},
    private color: Color
  ){
    this.neighbors = new Neighbors();
  }

  get colorRgb(): number[]{
    return this.color.rgb;
  }
  get id(): string{
    return this.color.hex;
  }

  static growTree(limitNeighbors: number){
    ;
  }

  distanceToNode(otherNode: Node): number{
    return this.neighbors.distanceTo(otherNode.id) || Color.calculateColorDistance(this.colorRgb, otherNode.colorRgb);
  }
  distanceToRgb(otherColorRgb: number[]): number{
    return Color.calculateColorDistance(this.colorRgb, otherColorRgb);
  }

  buscaSequencial(){}
  buscaEmLargura(){}
  buscaInformada(){///partindo do centro; partindo de 8 cantos; partindo de 6 cantos; variações das duas anteriores + centro
  }
}