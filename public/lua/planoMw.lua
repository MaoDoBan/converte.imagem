local proximasCoordenadas = function(eixo, x, y, z)
  local coords = {x, y, z};
  local converte = {
    x  = {1, 1},  y  = {2, 1},  z  = {3, 1},
    nx = {1, -1}, ny = {2, -1}, nz = {3, -1}
  };

  local i, v = unpack(converte[eixo]);
  coords[i] = coords[i] + v;

  return unpack(coords);
end

local atualOuAnterior = function(anterior, atual)
  if atual == "a" then
    return anterior;
  end
  return atual;
end

local validaBloco = function(anteriores, atuais, posicao)
  local qt = atualOuAnterior(anteriores.qt, atuais[posicao]);
  local id = atualOuAnterior(anteriores.id, atuais[posicao+1]);
  local md = atualOuAnterior(anteriores.md, atuais[posicao+2]);

  anteriores.qt, anteriores.id, anteriores.md = qt, id, md;

  if id < 16 then
    id = id + 667;
  end
  return qt, id, md;
end

local coordenadasInicioLinha = function(anteriores, cooOrigem, cooRelativas)
  local valores = {};
  for i = 1, 3 do
    local coordenada = atualOuAnterior(anteriores.coo[i], cooRelativas[i]);
    valores[i] = cooOrigem[i] + coordenada;
    anteriores.coo[i] = coordenada;
  end
  return unpack(valores);
end

local geraLinha = function(anteriores, linha, eixo, x, y, z)
  for i = 4, #linha, 3 do --um tipo de bloco por vez
    local quantidade, idBloco, metadata = validaBloco(anteriores, linha, i);

    for _ = 1, quantidade do --coloca no mundo todos os blocos do tipo
      Block:setBlockAll(x, y, z, idBloco, metadata);
      x, y, z = proximasCoordenadas(eixo, x, y, z);
    end
  end
end

local geraImagem = function(origem, matriz)
  local eixo = matriz[1];
  local anteriores = {
    coo = {origem[1], origem[2], origem[3]},
    qt = 1, id = 667, md = 0
  };

  for i = 2, #matriz do --uma linha por vez
    local linha = matriz[i];
    local x, y, z = coordenadasInicioLinha(anteriores, origem, linha);

    geraLinha(anteriores, linha, eixo, x, y, z);
  end
end

local clique = function(evento)
  local _,ferramenta = Player:getCurToolID(evento.eventobjid);
  if ferramenta ~= 11569 then --cajado de madeira simples
    return;
  end

  Chat:sendSystemMsg("Tentando gerar "..(#Dados - 1).." linhas");
  geraImagem({evento.x, evento.y, evento.z}, Dados);
end

ScriptSupportEvent:registerEvent('Player.ClickBlock', clique);
  -- TODO: teleportar o jogador pra uma posição segura

Dados = {
  "x",
  {0,0,0,2,1,0,"a",2,15,1,3,"a",3,"a",0},
  {"a",1,"a",2,1,0,"a",2,15,1,3,"a",3,"a",0}
};


-- definindo a estrutura de dados
--[[
local blockMatrix = {
  eixo, --: x, y, z, nx, ny, nz
  {x,y,z,qt,blockId,data,qt,blockId,data,qt,blockId,data}
};
]]
-- x, y, z, blockId, data, qt  se "a" então é igual ao anterior --todo: x, y, z ter valor anterior se "a" em coordenadasInicioLinha
-- blockId vai de 0 a 15, o .lua soma 667
-- eu poderia usar variáveis de a-z A-Z pra reduzir a contagem de caracteres



-- local clicou = function(event)
--   local x, y, z = event.x, event.y, event.z;
--   Block:setBlockAll(x, y, z, 668, 8);
-- end
-- ScriptSupportEvent:registerEvent('Player.ClickBlock', clicou)
  -- if event.content ~= "bah" then
  --   return; -- Chat:sendSystemMsg("Tche")
  -- end
  -- local playerId = event.eventobjid;
  -- local _,x,y,z = Player:getPosition(playerId);
    -- local i = 0;
  -- for blockId = 667, 682 do
  --   for metadataId = 0, 15 do
  --     Block:setBlockAll(x+i, y, z+metadataId, blockId, metadataId);
  --   end
  --   i = i + 1;
  -- end
-- ScriptSupportEvent:registerEvent('Player.NewInputContent', runPlayerCommand);
