//import { Util } from "../Util.ts";

//const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_0123456789 ♫↕‼¶§↑↓→←∟↔▲▼!#$%&()*/<>?@[]^`{|}~ÇüéâäàåçêëèïîìÄÅÉæÆôöòûùÿÖÜø£Ø×ƒáíóúñÑ"+
//  "ªº¿®¬½¼¡«»░▒▓│┤ÁÂÀ©╣║╗╝¢¥┐└┴┬├─┼ãÃ╚╔╩╦╠═╬¤ðÐÊËÈıÍÎÏ┘┌█¦ÌÓßÔÒõÕµþÞÚÛÙýÝ¯±‗¾¶§÷°¨·¹³²´♥▄▀¸";
const letters = "abcdefgh";

export class KeyNode{
  public children: KeyNode[];

  constructor(
    public keyLetter: string,
    public keyType: 0 | 3 | 4 | 8,
    public keySize: number,
  ){
    this.children = [];
  }

  get isLeave(): boolean{
    return this.children.length == 0 ? true : false;
  }

  addChildren(keySize: number){
    let i = 0;
    for(; i < 4; i++){/////53
      this.children.push( new KeyNode(letters[i], 4, keySize) );
    }
    for(; i < letters.length; i++){
      this.children.push( new KeyNode(letters[i], 8, keySize) );
    }
    console.log("KeyNode addChildren():",this);///--
  }

  toLeave(){//private 
    this.children = [];
  }
}

// static createKeyTree(keyLengthLimit: number, maxKeys: number): Branch{
//   //andar na key length [V]
//   //andar na fila       
//   //andar nas letras    
//   //andar nos números pra k>1 

//   const root = new Branch("", 0, 0, [], []);
//   const queueNextBranches = [root];
//   let branch: Branch;
//   let countLeaves = 0;

//   for(let keyLength = 1; keyLength <= keyLengthLimit; keyLength++){
//     branch = queueNextBranches.shift() as Branch;

//     ;

//     if(queueNextBranches.length == 0) break;
//   }