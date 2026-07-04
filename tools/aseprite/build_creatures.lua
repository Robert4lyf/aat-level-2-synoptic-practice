local DIR = "C:/Users/rober/Documents/aat_app/tools/aseprite/"
local L = dofile(DIR.."lib.lua")
local C = dofile(DIR.."creatures.lua")
local OUT = DIR.."out/"

-- fox flourish: white cheeks + dark nose + eye mask
local function fox_extra(c,P)
  local cx,hy,hr=P.cx,P.headY,P.headR
  c:sphere(cx, hy+hr*0.35, hr*0.5, hr*0.36, L.R.cream, 0.25)  -- muzzle
  c:px(cx, hy+hr*0.5, L.INK); c:px(cx-1, hy+hr*0.5, L.INK)    -- nose
end
local function mole_extra(c,P)
  local cx,hy,hr=P.cx,P.headY,P.headR
  -- little dig-claws
  c:px(cx-6,P.bodyY+2,L.hx("d8d0c4")); c:px(cx+6,P.bodyY+2,L.hx("d8d0c4"))
end

local SPECS = {
  ["char-cub"]  = {ramp="gold", ears="round", muzzle="snout", nose="6b3a1c", inner="f0a35c"},
  ["char-fox"]  = {ramp="fox", ears="pointy", tail="bushy", muzzle="none", inner="ffd0a0", extra=fox_extra},
  ["char-mole"] = {ramp="mole", ears="round", muzzle="snout", nose="d4658f", belly="mole", inner="bfb2ae", extra=mole_extra},

  ["boss-itbk"] = {size={56,56}, ramp="dragon", ears="horns", eyes="fierce", eyeglow="d8f048",
                   wings="membrane", tail="spade", muzzle="grin", blush=false, belly="grass"},
  ["boss-poc"]  = {size={56,56}, ramp="purple", ears="horns", eyes="fierce", eyeglow="ff5aa0",
                   tail="flame", muzzle="grin", blush=false, belly="blossom"},
  ["boss-besy"] = {size={56,56}, ramp="griffin", ears="pointy", eyes="fierce", eyeglow="ffd23e",
                   wings="feather", muzzle="beak", crest=true, blush=false, belly="feather"},

  ["npc-quill"]   = {ramp="teal", ears="pointy", muzzle="beak", crest=true, belly="cream", inner="bfe0d8"},
  ["npc-scribe"]  = {ramp="canopy", ears="round", muzzle="snout", nose="2f5d34", inner="bfe89a", belly="grass"},
  ["npc-warden"]  = {ramp="purple", ears="pointy", wings="membrane", muzzle="none", inner="d3b6f2"},
  ["npc-clerk"]   = {ramp="wood", ears="round", tail="bushy", muzzle="snout", nose="3a2418", inner="caa06a"},
  ["npc-mayor"]   = {ramp="blueroof", ears="round", muzzle="snout", nose="1f3b70", inner="a4ccf2", belly="cream"},
  ["npc-merchant"]= {ramp="stone", ears="round", tail="bushy", muzzle="snout", nose="2b2f3a", inner="c9d2e2", belly="cream"},
}

for name,spec in pairs(SPECS) do
  local c = C.build(spec)
  c:save(OUT..name..".png"); c:close()
end
-- special builds
local g=C.golem(); g:save(OUT.."boss-pobc.png"); g:close()
local p=C.player(); p:save(OUT.."char-player.png"); p:close()
print("CREATURES_OK")
