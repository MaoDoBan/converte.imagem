export class Distances{
  [hex: string]: number;

  get length(): number {
    return Object.keys(this).length;
  }
}