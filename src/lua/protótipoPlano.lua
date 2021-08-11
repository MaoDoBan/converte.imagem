local proximasCoordenadas = function(eixo, x, y, z)
  local coords = {x, y, z};
  local converte = {
    x  = {1, 1},  y  = {2, 1},  z  = {3, 1},
    nx = {1, -1}, ny = {2, -1}, nz = {3, -1}
  };

  local i, v = table.unpack(converte[eixo]);
  coords[i] = coords[i] + v;

  return table.unpack(coords);
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
  print("vb valores: "..posicao.." "..qt.." "..id.." "..md);

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
  return table.unpack(valores);
end

local geraImagem = function(origem, matriz)
  local eixo = matriz[1];
  local anteriores = {
    coo = {origem[1], origem[2], origem[3]},
    qt = 1, id = 667, md = 0
  };

  for i = 2, #matriz do
    local linha = matriz[i];
    local x, y, z = coordenadasInicioLinha(anteriores, origem, linha);

    print("gi #linha: "..#linha);
    for j = 4, #linha, 3 do
      local quantidade, idBloco, metadata = validaBloco(anteriores, linha, j);
      print("gi qt: "..quantidade);

      for k = 1, quantidade do
        print("Colocando bloco: ",x, y, z, idBloco, metadata);
        x, y, z = proximasCoordenadas(eixo, x, y, z);
      end
    end
  end
end

local clique = function(event)
  local x, y, z = event.x, event.y, event.z;

  print("Tentando");
  geraImagem({x, y, z}, {
    "x",
    {0,0,0,2,1,0,"a",2,15,1,3,"a",3,"a",0},
    {"a",1,"a",2,1,0,"a",2,15,1,3,"a",3,"a",0}
  });
end

clique({x = 1, y = 8, z = 2});


-- lembrar de colocar os métodos do MW