-- Render the chosen player (Option 4, Cozy Scholar) in all 4 directions,
-- each as a 2-frame idle strip. Approval/QC only (_-prefixed).
local DIR = "C:/Users/rober/Documents/aat_app/tools/aseprite/"
local M = dofile(DIR.."chars.lua")
local L = dofile(DIR.."lib.lua")
local OUT = DIR.."out/"

local SPEC = {
  skin=M.SKIN.light, hair=M.HAIR.auburn, hairStyle="tousled",
  shirt=M.SHIRT.cream, tie=M.TIE.green, tieStyle="straight",
  over={ramp=M.CLOTH.mustard, style="cardigan"}, glasses="round",
  trouser=M.R("3a2616","55381f"), satchel=true,
}

for _,dir in ipairs({"down","up","left","right"}) do
  local f0=M.human(SPEC,0,dir)
  local f1=M.human(SPEC,1,dir)
  local s=L.strip({f0,f1})
  s:save(OUT.."_p4-"..dir..".png"); s:close(); f0:close(); f1:close()
end
print("P4_OK")
