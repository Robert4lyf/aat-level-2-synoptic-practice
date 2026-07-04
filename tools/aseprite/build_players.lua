-- Emit the 5 player accountant options as 2-frame idle strips (approval only).
local DIR = "C:/Users/rober/Documents/aat_app/tools/aseprite/"
local M = dofile(DIR.."chars.lua")
local OUT = DIR.."out/"
local function save(c,n) c:save(OUT..n..".png"); c:close() end

local OPTS = {
  { -- 1 Classic clerk
    skin=M.SKIN.light, hair=M.HAIR.brown, hairStyle="sidepart",
    shirt=M.SHIRT.white, tie=M.TIE.blue, tieStyle="straight",
    over={ramp=M.CLOTH.charcoal, style="vest"}, glasses="round",
    trouser=M.R("2c3550","3d4a6e"),
  },
  { -- 2 Old-school bookkeeper
    skin=M.SKIN.tan, hair=M.HAIR.grey, hairStyle="combed",
    shirt=M.SHIRT.blue, tie=M.TIE.red, tieStyle="straight",
    over={ramp=M.SHIRT.blue, style="suspenders"}, visor=true, sleevesRolled=true,
    trouser=M.R("3a2e1e","55432a"), pocketWatch=true,
  },
  { -- 3 Modern analyst
    skin=M.SKIN.brown, hair=M.HAIR.black, hairStyle="undercut",
    shirt=M.SHIRT.white, tie=M.TIE.plum, tieStyle="straight",
    over={ramp=M.CLOTH.navy, style="blazer"}, glasses="square",
    trouser=M.R("161f36","28324f"),
  },
  { -- 4 Cozy scholar
    skin=M.SKIN.light, hair=M.HAIR.auburn, hairStyle="tousled",
    shirt=M.SHIRT.cream, tie=M.TIE.green, tieStyle="straight",
    over={ramp=M.CLOTH.mustard, style="cardigan"}, glasses="round",
    trouser=M.R("3a2616","55381f"), satchel=true,
  },
  { -- 5 Field auditor
    skin=M.SKIN.tan, hair=M.HAIR.ginger, hairStyle="tousled",
    shirt=M.SHIRT.white, tie=M.TIE.gold, tieStyle="loose",
    glasses="pushed", sleevesRolled=true, quillEar=true, coinPouch=true,
    trouser=M.R("3f3524","5a4a30"),
  },
}

for i,spec in ipairs(OPTS) do
  save(M.strip2(M.human, spec), "_player-opt"..i)
end
print("PLAYERS_OK")
