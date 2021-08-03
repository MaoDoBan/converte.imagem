type NumOrUndef = number | undefined;

export class PreviousInfos{
  constructor(
    public x: NumOrUndef = undefined,
    public y: NumOrUndef = undefined,
    public z: NumOrUndef = undefined,
    public qtBlocks: NumOrUndef = undefined,
    public idBlock:  NumOrUndef = undefined,
    public metadata: NumOrUndef = undefined
  ){}
}