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

-- Region topic-bosses only. The townsfolk cast + player are built by build_cast.lua
-- (chibi Stardew style, 4 directions). fox_extra/mole_extra kept above for legacy.
local SPECS = {
  ["boss-itbk"] = {size={56,56}, ramp="dragon", ears="horns", eyes="fierce", eyeglow="d8f048",
                   wings="membrane", tail="spade", muzzle="grin", blush=false, belly="grass"},
  ["boss-poc"]  = {size={56,56}, ramp="purple", ears="horns", eyes="fierce", eyeglow="ff5aa0",
                   tail="flame", muzzle="grin", blush=false, belly="blossom"},
  ["boss-besy"] = {size={56,56}, ramp="griffin", ears="pointy", eyes="fierce", eyeglow="ffd23e",
                   wings="feather", muzzle="beak", crest=true, blush=false, belly="feather"},
}

for name,spec in pairs(SPECS) do
  local c = C.build(spec)
  c:save(OUT..name..".png"); c:close()
end
local g=C.golem(); g:save(OUT.."boss-pobc.png"); g:close()
print("CREATURES_OK")
