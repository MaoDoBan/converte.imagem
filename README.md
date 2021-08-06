Sisteminha inicialmente só para a NandaPlay usar, que vai converter uma imagem em um script .lua para gerar uma pixel-art dentro do Mini World.

Versão 0.6 em andamento

Rodar os .lua:
lua src/lua/.lua
lua public/lua/.lua

Comando pra rodar .ts na pasta colorPalette:
deno run --allow-read --allow-write --allow-net --unstable src/colorPalette/.ts

Comando pra rodar o app.ts:
deno run --allow-read --allow-write --allow-net src/app.ts
deno run --allow-read --allow-write --allow-net src/proto.ts