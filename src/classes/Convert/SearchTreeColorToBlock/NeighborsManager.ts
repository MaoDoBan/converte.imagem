import { Neighbor } from "./Neighbor.ts";
import { ListNearNeighbors } from "./ListNearNeighbors.ts";
import { Node } from "./Node.ts";

export class NeighborsManager{
  readonly nearNeighbors: string[];//os próximos, mesmo repetidos em outros nodes
  // readonly uniqueNeighbors: string[];//vizinhos próximos não repetidos
  private distances: {[hex: string]: number};

  constructor(
    private nodeId: string
  ){
    this.nearNeighbors = [];
    // this.uniqueNeighbors = [];
    this.distances = {};
  }

  get length(): number{
    return this.nearNeighbors.length;
  }

  addNear(neighbor: Neighbor){
    if(this.distances[neighbor.hex] !== undefined) return;
    this.distances[neighbor.hex] = neighbor.distance;

    for(let i = 0; i < this.nearNeighbors.length; i++){
      if( this.distances[ this.nearNeighbors[i] ] >= neighbor.distance ){
        this.nearNeighbors.splice(i, 0, neighbor.hex);//adicionando no i
        break;
      }
    }
  }
  addSeveral(neighbors: ListNearNeighbors){
    for(const neighbor of neighbors.list){
      this.addNear(neighbor);
      
      const otherNeighborsManager = Node.getNeighbors( neighbor.hex );
      const myself = new Neighbor(this.nodeId, neighbor.distance);
      otherNeighborsManager.addNear( myself );//referência cruzada, garante não ter Nodes isolados
    }
  }
  // addUnique(hex: string, distance: number){
  //   ///verificar se já tem, pra não adicionar

  //   ///adicionar ordenado
  //   this.uniqueNeighbors.push(hex);
  //   if(this.distances[hex] === undefined) this.distances[hex] = distance;
  // }

  has(hex: string): boolean{
    return this.distances[hex] !== undefined;
  }

  distanceTo(hex: string): number{
    return this.distances[hex];
  }
}