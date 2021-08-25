export type NumOrString = number | string;

//export type KeyType = 4 | 8;//3 | //eu teria que filtrar palavras reservadas...
//export type Key = {name: string, type: KeyType};
export type EncodeDict = { [block: string]: string };//Key
export const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_0123456789 !#$%&()*/<>?@[]^`{|}~+'";
//export const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_0123456789 ♫↕‼¶§↑↓→←∟↔▲▼!#$%&()*/<>?@[]^`{|}~ÇüéâäàåçêëèïîìÄÅÉæÆôöòûùÿÖÜø£Ø×ƒáíóúñÑ"
//                      +"ªº¿®¬½¼¡«»░▒▓│┤ÁÂÀ©╣║╗╝¢¥┐└┴┬├─┼ãÃ╚╔╩╦╠═╬¤ðÐÊËÈıÍÎÏ┘┌█¦ÌÓßÔÒõÕµþÞÚÛÙýÝ¯±‗¾¶§÷°¨·¹³²´♥▄▀¸";//lua 5.1 não suporta direito isso pra tirar char da string

export const specialChars = " .,;:-=";