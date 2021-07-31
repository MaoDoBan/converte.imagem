export class Distances{
  [hex: string]: number;

  get length(): number {
    return Object.keys(this).length;
  }
}

//export type Distance = {hex: string, distance: number};