local DIR = "C:/Users/rober/Documents/aat_app/tools/aseprite/"
local T = dofile(DIR.."tiles.lua")
local OUT = DIR.."out/"
local function save(c,n) c:save(OUT..n..".png"); c:close() end

save(T.grass(1),"tile-grass-1"); save(T.grass(2),"tile-grass-2"); save(T.grass(3),"tile-grass-3")

-- connection-aware path set: vertical, horizontal, crossroads, T-junctions, corners, end-caps.
-- Each shape gets 3 randomised variants (different stones/scuffs/puddles) so long
-- straights no longer read as one repeating stamp.
local PATHS = {"ns","ew","nsew","nse","nsw","new","sew","ne","nw","se","sw","n","s","e","w"}
for _,code in ipairs(PATHS) do
  for v=1,3 do save(T.path_shape(code,v),"tile-path-"..code.."-"..v) end
  save(T.path_shape(code,1),"tile-path-"..code)   -- no-suffix alias (= variant 1)
end
-- keep legacy names as aliases so nothing breaks mid-deploy
save(T.path_shape("ns",1),"tile-path-1"); save(T.path_shape("ns",2),"tile-path-2")

save(T.flower(1),"tile-flower-1"); save(T.flower(2),"tile-flower-2"); save(T.flower(3),"tile-flower-3")
save(T.tree(1),"tile-tree-1"); save(T.tree(2),"tile-tree-2"); save(T.tree(3),"tile-tree-3")
save(T.rock(),"tile-rock"); save(T.sign(),"tile-sign"); save(T.book(),"tile-book")
save(T.well(),"tile-well"); save(T.ledger_stone(),"tile-ledger-stone")
save(T.pathlamp(),"tile-pathlamp")
save(T.house(1),"tile-house-1"); save(T.house(2),"tile-house-2")
save(T.factory_wall(),"tile-factory-wall")
save(T.gate_forest(),"tile-gate-forest"); save(T.gate_cave(),"tile-gate-cave")
save(T.gate_factory(),"tile-gate-factory"); save(T.gate_town(),"tile-gate-town")

-- bold new props
save(T.pond(),"tile-pond"); save(T.bush(),"tile-bush"); save(T.mushroom(),"tile-mushroom")
save(T.crop(),"tile-crop"); save(T.fence(),"tile-fence"); save(T.fountain(),"tile-fountain")
save(T.flowerbed(),"tile-flowerbed"); save(T.barrel(),"tile-barrel")
print("TILES_OK")
