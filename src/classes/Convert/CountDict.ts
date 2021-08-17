import { NumOrString } from "../../interfaces/Types.ts";
type Block = {
  base36: string,
  count: number,
  //mair largura de chave em que ainda vale a pena comprimir
  //quanto espaço ocupa sem comprimir
  //quanto espaço ocupa comprimindo pra cada comprimento de chave em que vale a pena comprimir
};

export class CountDict{
  ;

  constructor(
    private blockImages: NumOrString[][]
  ){}

  ;
}