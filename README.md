Sisteminha inicialmente só para a NandaPlay usar, que vai converter uma imagem em um script .lua para gerar uma pixel-art dentro do Mini World.

Rodar os .lua: lua public/lua/.lua

Comando pra rodar o generateColorPalette.ts:
deno run --allow-read --allow-write --allow-net --unstable src/colorPalette/generateColorPalette.ts

Comando pra rodar o sortColorPalette.ts:
deno run --allow-read --allow-write --allow-net --unstable src/colorPalette/sortColorPalette.ts

Comando pra rodar o app.ts:
deno run --allow-read --allow-net src/app.ts