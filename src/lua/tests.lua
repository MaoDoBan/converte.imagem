print("oi vc ai, me da um dinheiro ai")

--st = ";5d_hY¬U¹▼"--;2myÎX┐X;5c_nDUí_U;28qÎX▼→▼Â▼→▼³óX;2mg;5c_n‼YUYU;2myÏ;28q▼→óú▼X▼XóXÏ→▼;5c_n‼Yñ;38aÀ→▼;1uiÎ→│úÀXóX;5b_hk‼YU¹Àú▼ýÏ→ÏåÏ;5b_nqUYU¹À→ó³ÎúÏåÎ";
--especiais: ".,;:-="
--uteis: " !#$%&()*/<>?@[]^`{|}~+"
-- ‼♫↕¶§↑↓→←∟↔▲▼ºÇªüñÑéâäàåçêëèïîìÄÅÉæÆôöòûùÿÖÜø£Ø×ƒáíóú¿®¬½¼¡«»░▒▓│┤ÁÂÀ©╣║╗╝¢¥┐└╔╩╦╠═╬╚ãÃ┴┬├─┼¤ðÐÊËÈıÍÎÏ┘┌█¦ÌÓßÔÒõÕµþÞÚÛÙýÝ
st = "¯±‗¾¶§÷°¨·¹³²´♥▄▀¸"
for i = 1, #st do
  print( st:sub(i, i) );
end


-- local funcs = {
--   xy      = function() print("XY") end,
--   ["-xz"] = function() print("-XZ") end,
--   ["yx"]  = function() print("YX") end
-- }
-- local aquela = {
--   fu = funcs["xy"]
-- }
-- local essaNao = {
--   fu = funcs["-xz"]
-- }
-- aquela.fu(); essaNao.fu();


-- local c = {num = 10};
-- local function clique(evento)
--   local _,ferramenta = Player:getCurToolID(evento.eventobjid);
--   if ferramenta ~= 11569 then --cajado de madeira simples
--     return;
--   end
--   Chat:sendSystemMsg("Testando... "..c.num);
--   c.num = c.num + 1;
-- end
-- ScriptSupportEvent:registerEvent('Player.ClickBlock', clique);


-- local vari = {avel = 11}
-- local function bah(v)
--   v.avel = 22;
--   return 111, 222, 333;
-- end
-- local a,b,c = bah(vari)
-- print(vari["avel"], a,b,c)


-- local bah = {1,2,3};
-- local a,b,c = unpack(bah);

-- print(a,b,c);

-- local a,b,c=3,2,1
-- print(a,b,c)

-- for i=0, 256 do
--   print( i, ("").char(i+96) );
-- end

-- print(tonumber("7DE",16))
-- local times = {
--   ["time1"] = 12,
--   ["time2"] = 15
-- }

-- local testet = {a=12,b=13,c=14}

-- print(testet.a,testet["b"],testet.c)


-- local func_event = function (params)
--   threadpool:wait(1)
--   Chat:sendChat("teste1")
--   threadpool:wait(3)
--   Chat:sendChat("teste2")
-- end
-- ScriptSupportEvent:registerEvent('Player.PlayAction', func_event)

-- local palavras = {"amor", "flor", "estrela", "árvores", "abacaxi"};
-- for i=1, 20 do
--   local rnum = math.random(#palavras);
--   print(palavras[rnum]);
--   table.remove(palavras, rnum);
--   if(#palavras == nil) then break end
-- end
-- repeat
--   local t = #palavras;
--   print(#palavras);
--   palavras[#palavras] = nil;
--   io.read("*l")
-- until t == 0

-- print(#palavras);
-- palavras[#palavras] = nil
-- print(#palavras);
-- local qtp = #palavras
-- print(qtp)

-- function clonar(org)
--   return {table.unpack(org)}
-- end
-- local p2 = clonar(palavras)
-- print(#p2, #palavras)
