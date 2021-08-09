print("oi vc ai, me da um dinheiro ai")

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

local palavras = {"amor", "flor", "estrela", "árvores", "abacaxi"};
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

function clonar(org)
  return {table.unpack(org)}
end
local p2 = clonar(palavras)
print(#p2, #palavras)
