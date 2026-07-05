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

local L = dofile(DIR.."lib.lua")
-- emit a 2-frame animated strip: <base>.png = strip{ fn(0), fn(1) }
local function anim(fn, base)
  local f0=fn(0); local f1=fn(1); local s=L.strip({f0,f1})
  s:save(OUT..base..".png"); s:close(); f0:close(); f1:close()
end

save(T.flower(1),"tile-flower-1"); save(T.flower(2),"tile-flower-2"); save(T.flower(3),"tile-flower-3")

-- trees: 10 tall (32x48) variants, each a 2-frame sway strip
for v=1,10 do anim(function(f) return T.tree(v,f) end, "tile-tree-"..v) end

-- rocks: 8 ground variants
for v=1,8 do save(T.rock(v),"tile-rock-"..v) end
save(T.rock(1),"tile-rock")                                   -- legacy alias

save(T.book(),"tile-book")
save(T.sign(),"tile-sign"); save(T.ledger_stone(),"tile-ledger-stone")   -- tall statics (32x48)
anim(T.well,"tile-well"); anim(T.pathlamp,"tile-pathlamp"); anim(T.fountain,"tile-fountain")  -- tall animated

for v=1,3 do save(T.house(v),"tile-house-"..v) end            -- tall 32x48 houses
for v=1,4 do save(T.factory_wall(v),"tile-factory-wall-"..v) end
save(T.factory_wall(1),"tile-factory-wall")                   -- legacy alias

save(T.gate_forest(),"tile-gate-forest"); save(T.gate_cave(),"tile-gate-cave")
save(T.gate_factory(),"tile-gate-factory"); save(T.gate_town(),"tile-gate-town")

-- ground props with variants
for v=1,5 do anim(function(f) return T.pond(v,f) end, "tile-pond-"..v) end   -- ponds: 2-frame ripple
anim(function(f) return T.pond(1,f) end, "tile-pond")        -- legacy alias
for v=1,4 do save(T.bush(v),"tile-bush-"..v) end
for v=1,3 do save(T.mushroom(v),"tile-mushroom-"..v) end
for v=1,3 do save(T.crop(v),"tile-crop-"..v) end
for v=1,3 do save(T.flowerbed(v),"tile-flowerbed-"..v) end
for v=1,4 do save(T.barrel(v),"tile-barrel-"..v) end
save(T.bush(1),"tile-bush"); save(T.mushroom(1),"tile-mushroom"); save(T.crop(1),"tile-crop")
save(T.flowerbed(1),"tile-flowerbed"); save(T.barrel(1),"tile-barrel")   -- legacy aliases
save(T.fence(),"tile-fence")
print("TILES_OK")
