local DIR = "C:/Users/rober/Documents/aat_app/tools/aseprite/"
local T = dofile(DIR.."tiles.lua")
local OUT = DIR.."out/"
local function save(c,n) c:save(OUT..n..".png"); c:close() end

save(T.grass(1),"tile-grass-1"); save(T.grass(2),"tile-grass-2"); save(T.grass(3),"tile-grass-3")
save(T.path(1),"tile-path-1"); save(T.path(2),"tile-path-2")
save(T.flower(1),"tile-flower-1"); save(T.flower(2),"tile-flower-2")
save(T.tree(1),"tile-tree-1"); save(T.tree(2),"tile-tree-2"); save(T.tree(3),"tile-tree-3")
save(T.rock(),"tile-rock"); save(T.sign(),"tile-sign"); save(T.book(),"tile-book")
save(T.well(),"tile-well"); save(T.ledger_stone(),"tile-ledger-stone")
save(T.pathlamp(),"tile-pathlamp")
save(T.house(1),"tile-house-1"); save(T.house(2),"tile-house-2")
save(T.factory_wall(),"tile-factory-wall")
save(T.gate_forest(),"tile-gate-forest"); save(T.gate_cave(),"tile-gate-cave")
save(T.gate_factory(),"tile-gate-factory"); save(T.gate_town(),"tile-gate-town")
print("TILES_OK")
