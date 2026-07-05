-- Emit the 5 boss 2-frame idle strips + 4 wild strips (deploy-ready).
local DIR = "C:/Users/rober/Documents/aat_app/tools/aseprite/"
local B = dofile(DIR.."bosses.lua")
local L = dofile(DIR.."lib.lua")
local OUT = DIR.."out/"
local function strip(fn, base)
  local f0=fn(0); local f1=fn(1); local s=L.strip({f0,f1})
  s:save(OUT..base..".png"); s:close(); f0:close(); f1:close()
end
strip(B.wyrm,    "boss-itbk")
strip(B.golem,   "boss-pobc")
strip(B.chimera, "boss-poc")
strip(B.griffin, "boss-besy")
strip(B.reckoner,"boss-league")
strip(B.slime,   "wild-slime")
strip(B.bat,     "wild-bat")
strip(B.imp,     "wild-imp")
strip(B.sprite,  "wild-sprite")
print("BOSSES_OK")
