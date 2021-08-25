//import { Util } from "../Util.ts"; //ideia pra type 3, economizaria uns 2 ou 3 caracteres, nem vale tanto o esforço
import { letters } from "../../interfaces/Types.ts";//Key, KeyType, 

export class KeyNode{
  public children: KeyNode[];

  constructor(
    public key: string,
  ){
    this.children = [];
  }

  get notLeave(): boolean{
    return this.children.length == 0 ? false : true;
  }

  addChildren(){
    let i = 0;
    for(; i < letters.length; i++){ this.children.push( new KeyNode( this.key + letters[i] ) ); }
    // for(; i < 53; i++){             this.addChild( this.key + letters[i], this.biggestType(4) ) }///53
    // for(; i < letters.length; i++){ this.addChild( this.key + letters[i], this.biggestType(8) ) }
    this.print();
  }
  //private addChild(name: string, type: KeyType){ this.children.push( new KeyNode( {name, type} ) ); }
  //private biggestType(type: KeyType): KeyType{ return type > this.key.type ? type : this.key.type; }

  toLeave(){
    this.children = [];
  }

  print(){
    console.log(`KeyNode {key: ${this.key}}`);
  }
}