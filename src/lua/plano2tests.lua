Dict={a="tf",b="eg",c="f7",d="ho",e="17n",f="j6",g="i4",h="2eb",i="wc",j="so",k="1ak",l="1a5",m="wr",n="xe",o="230",p="424"};
Dados={{"x","y",0,0,0,58,",u_h;1g_h;1e_;2sj;1e_;2sj;1c_abeba;1a_abeba;1a_abebga;18_abebga;16_agbebia;14_agbebia;14_agbebka;12_agbebka;10_agb;203bia;10_agb;203bia,k_e,a_agba,4_abgfa,i_e,a_agba,4_abgfa,g_h,4_agb;3kz,vxa,e_h,4_agb;3kz,vxa,e_ag;2sjkbhdlh,4_ag;2sjkbhdlh,4_akb;203obe;1odd;203,4_akb;203obe;1odd;4dfij;1lv;2h8bf;22la,ijd;2sjij;1lv;2h8bf;22la,ijd;36rk;16waobf;22lc;1az;36rk;16waobf;22lc;1azabhpagbf;1odc;1azabhpagbf;1odc;1azagjh;4gcbnlc;1azagjh;4gcbnlc;1azc,2_a;1osbepbfbf,vxcmdc,2_a;1osbepbfbf,vxcmdc,6_ak;16w;2vgcibnbf,hpc,ijdc,8_ak;16w;2vgcibnbf,hpc,ijdc,8_cba;4gccibf,iqnde,a_cba;4gccibf,iqnde,c_cja;4ukbnbfc,i_cja;4ukbnbfc,i_cbgja;3nwbfjfda,g_cbgja;3nwbfjfda,i_aijoaib;1bmde,i_aijoaib;1bmde,m_apbfldcda,k_apbfldcda,o_ab;2h8jflcma,o_ab;2h8jflcma,s_;1lvbgbnldcma,s_;1lvbgbnldcma;10_;3kzdmdc;10_;3kzdmdc;1i_amc;1i_amc;1k_cmc;1k_cmc;1k_c,ijdc;1k_c,ijdc;1m_e;1m_e,6_"}};


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

local function converteEGera(infoBase36, controle)--incrementar coordenadas
  local bloco = converteBase36PraBlocos(infoBase36);
  print(bloco.qt, bloco.id, bloco.data);
end

Simbolos = { ["."]=1,[","]=2,[";"]=3,[":"]=4,["-"]=5,["="]=6,["+"]=7 };
local function avaliaCaractere(caractere, controle)
  if controle.base36.lendo then
    controle.base36.caracteresLidos = controle.base36.caracteresLidos .. caractere;
    controle.base36.qt = controle.base36.qt - 1;
    if controle.base36.qt == 0 then
      controle.base36.lendo = false
      converteEGera(controle.base36.caracteresLidos, controle);
    end
    return;
  end

  if Simbolos[caractere] ~= nil then
    controle.base36.lendo = true;
    controle.base36.qt = Simbolos[caractere];
    controle.base36.caracteresLidos = "";
    return;
  end

  converteEGera( Dict[caractere], controle );
end

local function geraImagem(origem)
  local eixo1, eixo2, x, y, z, largura, dadosCompactos = unpack(Dados[1]);
  local controle = {
    base36 = {
      lendo = false,
      qt = 0,
      caracteresLidos = ""
    },
    larguraImagem = largura,
    coordenadas = {
      x = origem.x+x, y = origem.y+y, z = origem.z+z
    },
    eixo1 = eixo1, eixo2 = eixo2
  };

  for i = 1, #dadosCompactos do
    avaliaCaractere( dadosCompactos:sub(i, i), controle );
  end
end

local function clique(evento)
  local _,ferramenta = Player:getCurToolID(evento.eventobjid);
  if ferramenta ~= 11569 then --cajado de madeira simples
    return;
  end

  Chat:sendSystemMsg("Gerando...");
  geraImagem({x=evento.x, y=evento.y, z=evento.z});
end

ScriptSupportEvent:registerEvent('Player.ClickBlock', clique);