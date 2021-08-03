import { readJsonSync } from "https://deno.land/x/jsonfile@1.0.0/mod.ts";
import { Color } from "./Color.ts";
import { Neighbor } from "./Neighbor.ts";
import { NeighborsManager } from "./NeighborsManager.ts";
import { ListNearNeighbors } from "./ListNearNeighbors.ts";

export class Node{
  private static dictionaryAllNodes: { [hex: string]: Node } = {};
  static readonly allNodes: Node[] = [];
  private neighbors: NeighborsManager;

  constructor(
    readonly blockIdAndData: {blockId: number, metadata: number},
    private color: Color
  ){
    this.neighbors = new NeighborsManager( this.id );
    Node.dictionaryAllNodes[this.color.hex] = this;
    Node.allNodes.push(this);
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

  static getNeighbors(nodeId: string): NeighborsManager{
    return Node.dictionaryAllNodes[nodeId].neighbors;
  }
  // static get emptyNode(): Node{
  //   return new Node({blockId: 0, metadata: 0}, new Color("empty", [-555,-555,-555]));
  // }
  static getNode(hex: string): Node{
    return Node.dictionaryAllNodes[hex];
  }

  static populateAllNodes(): boolean{
    if(Node.allNodes.length > 0) return false;

    type RawPalette = { [blockId: number]: string[] };
    const rawPalette: RawPalette = readJsonSync("src/colorPalette/hexColorPalette.json") as RawPalette;

    for(let blockId = 667; blockId <= 682; blockId++){
      for(let metadata = 0; metadata <= 15; metadata++){
        const colorHex = rawPalette[blockId][metadata];
        if(Node.dictionaryAllNodes[colorHex]) continue;//evita cor duplicada
        const block = {blockId, metadata};
        new Node(block, new Color(colorHex));
      }
    }

    console.log("Populated "+Node.allNodes.length+" Nodes");
    return true;
  }

  static growTree(limitNeighbors: number): boolean{///inacabada
    for(const node of Node.allNodes){
      const nearNeighbors = new ListNearNeighbors(limitNeighbors);
      for(const otherNode of Node.allNodes){
        if( node.id === otherNode.id ) continue;

        const distance = node.distanceToNode(otherNode);
        nearNeighbors.add( new Neighbor(otherNode.id, distance) );


        ///node.neighbors.distanceTo(otherNode.id)
        //setar near

        //se precisa, setar unique e salvar nos catalogados

        // color.addDistance(otherColor.hex, distance);
        // otherColor.addDistance(color.hex, distance);
      }
      node.neighbors.addSeveral(nearNeighbors);
    }
    return true;
  }

  static sequentialSearch(targetColor: number[] | string, mode: "strict" | "near" = "strict"): Node{
    const color = new Color(targetColor);
    const targetNode = Node.dictionaryAllNodes[color.hex];
    if(targetNode !== undefined && mode === "strict") return targetNode;

    let closerToTarget = {distance: 444, node: Node.allNodes[0]};
    for(const node of Node.allNodes){
      const distanceToNode = node.distanceToRgb(color.rgb);
      if(distanceToNode < closerToTarget.distance){
        if(distanceToNode === 0 && mode === "near") continue;
        closerToTarget = {distance: distanceToNode, node: node};
      }
    }

    console.log("O resultado da busca sequencial estava próximo do alvo em "+closerToTarget.distance);
    return closerToTarget.node;
  }

  // buscaEmLargura(){}

  // buscaInformada(){///partindo do centro; partindo de 8 cantos; partindo de 6 cantos; variações das duas anteriores + centro
  //   ;
  // }
}