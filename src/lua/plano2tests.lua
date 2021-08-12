Dict={a="tf",b="eg",c="f7",d="ho",e="17n",f="j6",g="i4",h="2eb",i="wc",j="so",k="1ak",l="1a5",m="wr",n="xe",o="230",p="424"};
Dados={{"-y","x",0,64,0,64,",u_h;1g_h;1e_;2sj;1e_;2sj;1c_abeba;1a_abeba;1a_abebga;18_abebga;16_agbebia;14_agbebia;14_agbebka;12_agbebka;10_agb;203bia;10_agb;203bia,k_e,a_agba,4_abgfa,i_e,a_agba,4_abgfa,g_h,4_agb;3kz,vxa,e_h,4_agb;3kz,vxa,e_ag;2sjkbhdlh,4_ag;2sjkbhdlh,4_akb;203obe;1odd;203,4_akb;203obe;1odd;4dfij;1lv;2h8bf;22la,ijd;2sjij;1lv;2h8bf;22la,ijd;36rk;16waobf;22lc;1az;36rk;16waobf;22lc;1azabhpagbf;1odc;1azabhpagbf;1odc;1azagjh;4gcbnlc;1azagjh;4gcbnlc;1azc,2_a;1osbepbfbf,vxcmdc,2_a;1osbepbfbf,vxcmdc,6_ak;16w;2vgcibnbf,hpc,ijdc,8_ak;16w;2vgcibnbf,hpc,ijdc,8_cba;4gccibf,iqnde,a_cba;4gccibf,iqnde,c_cja;4ukbnbfc,i_cja;4ukbnbfc,i_cbgja;3nwbfjfda,g_cbgja;3nwbfjfda,i_aijoaib;1bmde,i_aijoaib;1bmde,m_apbfldcda,k_apbfldcda,o_ab;2h8jflcma,o_ab;2h8jflcma,s_;1lvbgbnldcma,s_;1lvbgbnldcma;10_;3kzdmdc;10_;3kzdmdc;1i_amc;1i_amc;1k_cmc;1k_cmc;1k_c,ijdc;1k_c,ijdc;1m_e;1m_e,6_"}};


local controle = {};
local ctGerados = 0;

local function pegaCoordenada()
  local x, y, z = controle.coo.x, controle.coo.y, controle.coo.z;
  local i1, i2 = controle.eixo1.i, controle.eixo2.i;

  ---controle.eixo1.anda = controle.eixo1.anda + 1;
  controle.coo[i1] = controle.coo[i1] + controle.eixo1.soma;
  if(controle.coo[i1] == controle.eixo1.limite) then---controle.eixo1.anda >= controle.eixo1.limite
    ---controle.eixo1.anda = 0;
    controle.coo[i1] = controle.coo[i1] - controle.eixo1.comprimento * controle.eixo1.soma;
    controle.coo[i2] = controle.coo[i2] + controle.eixo2.soma;
  end
  print("                              eixos: "..controle.coo[i1].." "..controle.coo[i2]);

  return x, y, z;
end

Convertidos = {};
local function converteBase36PraBlocos(base36)
  if(Convertidos[base36]) then return Convertidos[base36]; end

  local qtBlocos, idBloco, metadata = 0, 0, 0;
  if(base36:sub(-1,-1) == "_") then
    qtBlocos = tonumber( base36:sub(1,-2), 36 );--base36 pra base10
  else
    local base10 = tonumber(base36,36);--base36 pra base10
    local hex = string.format( "%x", base10 );--base10 pra base16
    qtBlocos = tonumber( hex:sub(1,-3), 16 );--base16 pra base10
    idBloco  = tonumber( hex:sub(-2,-2), 16 ) + 667;
    metadata = tonumber( hex:sub(-1,-1), 16 );
  end

  local convertido = {qt=qtBlocos, id=idBloco, data=metadata};
  Convertidos[base36] = convertido;
  return convertido;
end

local function converteEGera(infoBase36)
  local bloco = converteBase36PraBlocos(infoBase36);
  local x, y, z; local log = true;

  --print("Qt gerar:",bloco.qt);
  for _ = 1, bloco.qt do
    x, y, z = pegaCoordenada();
    --if(bloco.id ~= 0) then Block:setBlockAll(x, y, z, bloco.id, bloco.data); end
    ctGerados = ctGerados + 1;
    if(log) then
      print("GeraBloco: "..x.." "..y.." "..z.." "..bloco.id.." "..bloco.data.." "..ctGerados);
      --log = false;
    end
  end
end

local simbolos = { ["."]=1, [","]=2, [";"]=3, [":"]=4, ["-"]=5, ["="]=6, ["+"]=7 };
local function avaliaCaractere(caractere)
  if controle.base36.lendo then
    controle.base36.caracteresLidos = controle.base36.caracteresLidos .. caractere;
    controle.base36.qt = controle.base36.qt - 1;
    if controle.base36.qt == 0 then
      controle.base36.lendo = false
      converteEGera( controle.base36.caracteresLidos );
    end
    return;
  end

  if simbolos[caractere] ~= nil then
    controle.base36.lendo = true;
    controle.base36.qt = simbolos[caractere];
    controle.base36.caracteresLidos = "";
    return;
  end

  converteEGera( Dict[caractere] );
end

local function pegaIndiceESoma(eixo)
  if(eixo:sub(1,1) == "-") then return eixo:sub(-1,-1), -1; end
  return eixo, 1;
end
local function geraImagem(origem)
  local eixo1, eixo2, x, y, z, comprimentoNoEixo1, dadosCompactos = unpack(Dados[1]);

  local indiceE1, somaE1 = pegaIndiceESoma(eixo1);
  local indiceE2, somaE2 = pegaIndiceESoma(eixo2);
  controle = {
    base36 = { lendo = false, qt = 0, caracteresLidos = "" },
    coo = { x = origem.x+x, y = origem.y+y, z = origem.z+z },
    eixo1 = { i = indiceE1, soma = somaE1, comprimento = comprimentoNoEixo1 },---, anda = 0
    eixo2 = { i = indiceE2, soma = somaE2 }
  };
  controle.eixo1.limite = controle.coo[controle.eixo1.i] + comprimentoNoEixo1 * controle.eixo1.soma;
  print("LIMITE: ",controle.eixo1.limite, controle.coo[controle.eixo1.i], limiteEixo1, controle.eixo1.soma);
  -- print(origem.x, origem.y, origem.z);
  -- print(controle.coo.x, controle.coo.y, controle.coo.z);

  for i = 1, #dadosCompactos do
    avaliaCaractere( dadosCompactos:sub(i, i) );
    if ctGerados > 200 then return; end ---- ----
  end
end

local function clique(evento)
  -- local _,ferramenta = Player:getCurToolID(evento.eventobjid);
  -- if ferramenta ~= 11569 then --cajado de madeira simples
  --   return;
  -- end

  --Chat:sendSystemMsg("Gerando...");
  geraImagem({x=evento.x, y=evento.y, z=evento.z});
end

--ScriptSupportEvent:registerEvent('Player.ClickBlock', clique);
clique({x=0, y=8, z=0});