import { Neighbor } from "./Neighbor.ts";

export class ListNearNeighbors{
  readonly list: Neighbor[] = [];
  constructor(
    private lengthLimit: number
  ){}

  add(newNeighbor: Neighbor){
    if( this.dontNeedAdd(newNeighbor.distance) ) return;
    for(let i = 0; i < this.list.length; i++){
      const neighbor = this.list[i];
      if(newNeighbor.distance < neighbor.distance){
        this.list.splice(i, 0, newNeighbor);
        break;
      }
    }
    if(this.list.length > this.lengthLimit){
      this.list.splice(this.lengthLimit, 1);//removendo o último pra manter o tamanho
    }
  }
  private dontNeedAdd(newDistance: number): boolean{
    const farDistance = this.list[this.list.length-1].distance;
    return this.list.length == this.lengthLimit && newDistance >= farDistance;
  }
}