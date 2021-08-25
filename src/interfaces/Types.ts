export type NumOrString = number | string;

export type KeyType = 4 | 8;//3 | 
export type Key = {name: string, type: KeyType};
export type EncodeDict = { [block: string]: Key };
export const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_0123456789 ♫↕‼¶§↑↓→←∟↔▲▼!#$%&()*/<>?@[]^`{|}~ÇüéâäàåçêëèïîìÄÅÉæÆôöòûùÿÖÜø£Ø×ƒáíóúñÑ"
                      +"ªº¿®¬½¼¡«»░▒▓│┤ÁÂÀ©╣║╗╝¢¥┐└┴┬├─┼ãÃ╚╔╩╦╠═╬¤ðÐÊËÈıÍÎÏ┘┌█¦ÌÓßÔÒõÕµþÞÚÛÙýÝ¯±‗¾¶§÷°¨·¹³²´♥▄▀¸";