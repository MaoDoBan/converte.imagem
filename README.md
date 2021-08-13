Sistema encomendado pela NandaPlay, que vai converter uma imagem em um script .lua para gerar uma pixel-art dentro do Mini World.

Versão 0.6.1 "funcional"

Executar os .lua:
lua src/lua/.lua
lua public/lua/.lua

Comando pra executar .ts na pasta colorPalette:
deno run --allow-read --allow-write --allow-net --unstable src/colorPalette/.ts

#AQUI NANDA:
Comando para converter a imagem pra script lua:

deno run --allow-read --allow-write --allow-net src/app.ts imagem.png