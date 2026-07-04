local DIR = "C:/Users/rober/Documents/aat_app/tools/aseprite/"
local L = dofile(DIR.."lib.lua")
local OUT = DIR.."out/"

-- ground shadow + spherical chibi body test (cub)
local function cub()
  local c = L.canvas(32,40)
  c:groundshadow(16,37,10,3)
  local R = L.R.gold
  -- body
  c:sphere(16,27,9,9,R)
  -- belly
  c:sphere(16,29,5,6,L.R.cream, 0.15)
  -- head
  c:sphere(16,14,10,9,R)
  -- ears
  c:sphere(8,7,4,4,R); c:sphere(24,7,4,4,R)
  c:sphere(8,7,2,2,L.R.skin,0.2); c:sphere(24,7,2,2,L.R.skin,0.2)
  -- muzzle
  c:sphere(16,17,4,3,L.R.cream,0.2)
  c:outline()
  -- eyes
  c:px(12,13,L.INK); c:px(12,14,L.INK)
  c:px(20,13,L.INK); c:px(20,14,L.INK)
  c:px(11,13,L.hx("ffffff")); c:px(21,13,L.hx("ffffff"))
  -- nose
  c:px(16,16,L.hx("6b3a1c")); c:px(15,16,L.hx("6b3a1c"))
  -- blush
  c:blend(9,16,L.rgba(240,120,140,120)); c:blend(23,16,L.rgba(240,120,140,120))
  c:save(OUT.."char-cub.png"); c:close()
end

local function grass()
  local c = L.canvas(32,32)
  local R = L.R.grass
  c:fillrect(0,0,31,31,R[3])
  -- subtle shading bands
  for y=0,31 do for x=0,31 do
    local n=((x*7+y*13)%5)
    if n==0 then c:px(x,y,R[4]) elseif n==4 then c:px(x,y,R[2]) end
  end end
  -- grass tufts
  local tufts={{6,24},{22,10},{14,18},{26,26},{4,8}}
  for _,t in ipairs(tufts) do
    local x,y=t[1],t[2]
    c:vline(x,y,y-3,R[5]); c:vline(x-1,y,y-2,R[4]); c:vline(x+1,y,y-2,R[4])
  end
  c:save(OUT.."tile-grass-1.png"); c:close()
end

cub()
grass()
print("SMOKE_OK")
