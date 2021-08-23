//import { Util } from "../Util.ts";

const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_0123456789 ♫↕‼¶§↑↓→←∟↔▲▼!#$%&()*/<>?@[]^`{|}~ÇüéâäàåçêëèïîìÄÅÉæÆôöòûùÿÖÜø£Ø×ƒáíóúñÑ"+
  "ªº¿®¬½¼¡«»░▒▓│┤ÁÂÀ©╣║╗╝¢¥┐└┴┬├─┼ãÃ╚╔╩╦╠═╬¤ðÐÊËÈıÍÎÏ┘┌█¦ÌÓßÔÒõÕµþÞÚÛÙýÝ¯±‗¾¶§÷°¨·¹³²´♥▄▀¸";

export class KeyNode{
  public isLeave: boolean;
  public children: KeyNode[];

  constructor(
    public keyLetter: string,
    public keyType: 0 | 3 | 4 | 8,
    public keySize: number,
  ){
    this.isLeave = true;
    this.children = [];
  }

  static createRoot(): KeyNode{
    const root = new KeyNode("", 0, 0);
    root.addChildren(1);
    return root;
  }

  addChildren(keySize: number){
    this.isLeave = false;

    let i = 0;
    for(; i < 53; i++){
      this.children.push( new KeyNode(letters[i], 4, keySize) );
    }
    for(; i < letters.length; i++){
      this.children.push( new KeyNode(letters[i], 8, keySize) );
    }
  }

  toLeave(){
    this.isLeave = true;
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