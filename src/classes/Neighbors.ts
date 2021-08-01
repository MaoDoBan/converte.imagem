export class Neighbors{
  private nearNeighbors: string[];//hex, distance
  private repeatedNeighbors: string[];
  private distances: {[hex: string]: number};

  constructor(){
    this.nearNeighbors = [];
    this.repeatedNeighbors = [];
    this.distances = {};
  }

  get length(): number{
    return this.nearNeighbors.length + this.repeatedNeighbors.length;
  }

  has(hex: string): boolean{
    return this.distances[hex] !== undefined;
  }

  distanceTo(hex: string): number{
    return this.distances[hex];
  }
}