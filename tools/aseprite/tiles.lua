-- 32x32 map tiles for Ledger Legends (Storybook Ledger style).
local DIR = "C:/Users/rober/Documents/aat_app/tools/aseprite/"
local L = dofile(DIR.."lib.lua")
local T = {}
local WHITE=L.hx("ffffff")

local function hash(x,y,s)
  local v = (x*374761393 + y*668265263 + (s or 0)*2246822519)
  v = (v ~ (v >> 13)) * 1274126177
  v = (v ~ (v >> 16))
  return (v % 100000)/100000.0
end

-- organic grass fill (no stripes): base + scattered light tufts + dark blades
local function grass_base(c, seed, R)
  R = R or L.R.grass
  c:fillrect(0,0,31,31,R[3])
  for y=0,31 do for x=0,31 do
    local n=hash(x//2,y//2,seed)
    if n>0.82 then c:px(x,y,R[4]) elseif n<0.16 then c:px(x,y,R[2]) end
  end end
  -- little upright blade tufts
  local nt = 8
  for i=1,nt do
    local x=math.floor(hash(i,seed,1)*28)+2
    local y=math.floor(hash(i,seed,2)*24)+6
    c:vline(x,y,y-2,R[5]); c:px(x-1,y-1,R[4]); c:px(x+1,y-1,R[4])
  end
end

local function dirt_base(c, seed, R)
  R = R or L.R.dirt
  c:fillrect(0,0,31,31,R[3])
  for y=0,31 do for x=0,31 do
    local n=hash(x//2,y//2,seed)
    if n>0.80 then c:px(x,y,R[4]) elseif n<0.18 then c:px(x,y,R[2]) end
  end end
  -- pebbles
  for i=1,6 do
    local x=math.floor(hash(i,seed,3)*26)+3
    local y=math.floor(hash(i,seed,4)*26)+3
    c:px(x,y,R[5]); c:px(x+1,y,R[4]); c:px(x,y+1,R[2])
  end
end

-- ===== ground tiles =====
function T.grass(v) local c=L.canvas(32,32); grass_base(c,v,L.R.grass); return c end
function T.path(v)
  local c=L.canvas(32,32); grass_base(c,10+v,L.R.grass)
  -- a worn dirt path down the middle
  local R=L.R.dirt
  for y=0,31 do
    local wobble=math.floor((hash(y,v,7)-0.5)*4)
    c:fillrect(9+wobble,y,22+wobble,y,R[3])
    c:px(9+wobble,y,R[2]); c:px(22+wobble,y,R[4])
  end
  for y=0,31 do for x=0,31 do
    if app.pixelColor.rgbaR(c:get(x,y))>90 and hash(x//2,y//2,v)>0.85 then
      -- pebble specks only on dirt
    end
  end end
  if v==2 then for i=1,7 do local x=math.floor(hash(i,v,8)*12)+10; local y=math.floor(hash(i,v,9)*28)+2; c:px(x,y,R[5]); c:px(x,y+1,R[2]) end end
  return c
end
function T.flower(v)
  local c=L.canvas(32,32); grass_base(c,20+v,L.R.meadow)
  local cols = v==1 and {"f6ca45","ff5aa0","ffffff"} or {"c191f4","6ea8e2","ffe694"}
  for i=1,7 do
    local x=math.floor(hash(i,v,11)*26)+3
    local y=math.floor(hash(i,v,12)*26)+3
    local col=L.hx(cols[(i%#cols)+1])
    c:px(x,y-1,col); c:px(x-1,y,col); c:px(x+1,y,col); c:px(x,y+1,col)
    c:px(x,y,L.hx("ffe694"))
  end
  return c
end

-- ===== trees =====
local function tree_round(c, R)
  c:groundshadow(16,29,10,2.4)
  -- trunk
  c:fillrect(14,20,17,29,L.R.wood[2]); c:px(14,20,L.R.wood[3]); c:px(17,29,L.R.wood[1])
  -- canopy layered
  c:sphere(16,13,12,11,R)
  c:sphere(11,9,5,5,R,0.2); c:sphere(21,11,5,5,R,0.1)
  c:outline()
  -- leaf clump highlights
  for i=1,10 do local x=math.floor(hash(i,1,13)*20)+6; local y=math.floor(hash(i,1,14)*14)+5
    if not c:empty(x,y) then c:px(x,y,R[5]) end end
end
function T.tree(v)
  local c=L.canvas(32,32); grass_base(c,30+v,L.R.grass)
  if v==1 then tree_round(c, L.R.canopy)
  elseif v==2 then
    -- pine
    c:groundshadow(16,29,8,2.2)
    c:fillrect(15,24,17,30,L.R.wood[2])
    local P=L.R.pine
    for tier=0,2 do
      local ty=8+tier*6; local ww=6+tier*4
      for i=0,7 do c:hline(16-ww+math.floor(i*ww/4),16+ww-math.floor(i*ww/4), ty+i, P[math.min(#P,3+tier%2)]) end
    end
    c:sphere(13,12,2,2,P[5],0.2)
    c:outline()
  else
    -- blossom tree
    tree_round(c, L.R.blossom)
  end
  return c
end

-- ===== rock / sign / book / well / lamp / monument =====
function T.rock()
  local c=L.canvas(32,32); grass_base(c,40,L.R.grass)
  c:groundshadow(16,26,11,3)
  c:sphere(15,20,10,7,L.R.stone)
  c:sphere(22,23,5,4,L.R.stone,-0.1)
  c:outline()
  c:px(11,17,L.R.stone[5]); c:px(13,16,L.R.stone[5]) -- highlights
  c:hline(12,20,22,L.INK) -- crack
  return c
end
function T.sign()
  local c=L.canvas(32,32); grass_base(c,41,L.R.grass)
  c:groundshadow(16,29,6,2)
  c:fillrect(15,16,17,30,L.R.wood[2]) -- post
  local W=L.R.wood
  c:fillrect(6,8,26,18,W[4]); -- board
  c:fillrect(6,8,26,9,W[5]); c:fillrect(6,17,26,18,W[2])
  c:outline()
  -- engraved lines (text)
  c:hline(9,22,12,L.R.wood[1]); c:hline(9,19,14,L.R.wood[1])
  return c
end
function T.book()
  local c=L.canvas(32,32); grass_base(c,42,L.R.grass)
  c:groundshadow(16,26,10,2.4)
  -- open ledger book
  local W=L.R.wood
  c:fillrect(5,14,15,26,L.PAPER); c:fillrect(17,14,27,26,L.PAPER) -- pages
  c:fillrect(15,13,17,27,W[2]) -- spine
  c:fillrect(4,13,5,27,W[1]); c:fillrect(27,13,28,27,W[1]) -- covers edge
  c:outline()
  -- ruled ledger lines + red margin
  for i=0,4 do c:hline(6,14,16+i*2,L.INKBLUE); c:hline(18,26,16+i*2,L.INKBLUE) end
  c:vline(8,15,25,L.hx("c23b3b")); c:vline(24,15,25,L.hx("c23b3b"))
  return c
end
function T.well()
  local c=L.canvas(32,32); grass_base(c,43,L.R.grass)
  c:groundshadow(16,28,11,3)
  local S=L.R.stone
  c:fillrect(8,18,24,28,S[2]) -- base
  c:sphere(16,18,8,3.5,S) -- rim
  c:disc(16,18,6,2.4,L.hx("14324a")) -- water hole
  c:sphere(16,18,4,1.6,L.R.water[2],0.2)
  -- roof posts + roof
  c:vline(9,8,18,L.R.wood[2]); c:vline(23,8,18,L.R.wood[2])
  for i=0,7 do c:hline(16-8+i,16+8-i,4+i,L.R.redroof[math.min(5,3+i%2)]) end
  c:outline()
  -- stone joints
  c:hline(8,24,23,S[1]); c:vline(16,24,28,S[1])
  return c
end
function T.pathlamp()
  local c=L.canvas(32,32); grass_base(c,44,L.R.grass)
  c:groundshadow(16,30,5,1.8)
  local I=L.R.iron
  c:fillrect(15,12,17,30,I[2]); c:px(15,12,I[3]); c:px(17,30,I[1]) -- post
  c:fillrect(11,29,21,31,I[1]) -- base
  -- lantern
  c:fillrect(12,5,20,13,I[3])
  c:fillrect(13,6,19,12,L.hx("ffe27a")) -- glow
  c:sphere(16,9,2,3,L.R.ember,0.3)
  c:fillrect(11,4,21,5,I[2]); -- cap
  for i=0,4 do c:hline(13-i//2,19+i//2,4-i,I[2]) end
  c:outline()
  -- warm glow bloom
  for r=1,6 do for a=0,15 do
    local ang=a/16*6.283
    c:blend(16+math.cos(ang)*r*1.6, 9+math.sin(ang)*r*1.4, L.rgba(255,210,110, math.max(0,40-r*6)))
  end end
  return c
end
function T.ledger_stone()
  -- carved standing stone monument with a gold ledger sigil (thematic)
  local c=L.canvas(32,32); grass_base(c,45,L.R.grass)
  c:groundshadow(16,29,10,2.6)
  local S=L.R.stone
  -- tablet
  for y=6,29 do
    local ww = (y<10) and (6+(y-6)) or 10
    c:hline(16-ww,16+ww,y,S[3])
  end
  c:sphere(16,9,8,4,S,0.1) -- rounded top
  c:outline()
  -- engraved gold ledger symbol (£ / columns)
  local G=L.R.gold
  c:vline(16,13,24,G[3]); c:hline(12,20,15,G[3]); c:hline(12,20,22,G[3])
  c:hline(13,19,18,G[4])
  -- shading
  c:vline(6,12,28,S[2]); c:vline(26,12,28,S[4])
  return c
end

-- ===== houses / gates / factory =====
local function cottage(c, roofR)
  c:groundshadow(16,29,12,2.4)
  local W=L.R.wood
  -- walls
  c:fillrect(7,16,25,29,W[4])
  c:fillrect(7,16,8,29,W[2]); c:fillrect(24,16,25,29,W[5])
  -- roof
  for i=0,9 do c:hline(16-11+i,16+11-i, 6+i, roofR[math.min(#roofR,3+i%2)]) end
  c:fillrect(5,15,27,16,roofR[1])
  -- door
  c:fillrect(13,21,18,29,W[2]); c:px(17,25,L.R.gold[4])
  -- window
  c:fillrect(9,19,11,22,L.hx("ffe27a")); c:fillrect(21,19,23,22,L.hx("ffe27a"))
  c:outline()
end
function T.house(v)
  local c=L.canvas(32,32); grass_base(c,50+v,L.R.grass)
  cottage(c, v==1 and L.R.redroof or L.R.blueroof)
  return c
end
function T.factory_wall()
  local c=L.canvas(32,32)
  local B=L.R.brick
  c:fillrect(0,0,31,31,B[2])
  -- brick courses
  for y=0,31,4 do
    c:hline(0,31,y,B[1])
    local off=((y//4)%2)*4
    for x=off,31,8 do c:vline(x,y,y+3,B[1]) end
    for yy=y+1,y+3 do for x=0,31 do
      local bx=(x+off)
      if hash(x,yy,1)>0.7 then c:px(x,yy,B[3]) elseif hash(x,yy,2)<0.2 then c:px(x,yy,B[1]) end
    end end
  end
  -- iron band
  c:fillrect(0,14,31,17,L.R.iron[3]); c:hline(0,31,14,L.R.iron[2]); c:hline(0,31,17,L.R.iron[1])
  for x=3,31,7 do c:sphere(x,15,1,1,L.R.iron[5],0.3) end -- rivets
  return c
end

local function gate_arch(c, postR, fillTop)
  c:groundshadow(16,30,12,2.2)
  -- two posts
  c:fillrect(3,10,9,31,postR[2]); c:fillrect(23,10,29,31,postR[2])
  c:fillrect(3,10,4,31,postR[1]); c:fillrect(28,10,29,31,postR[4])
  -- arch top
  for i=0,7 do c:hline(3,29, 10-i-0 ,postR[3]) end
  for i=0,6 do c:hline(3+i, 29-i, 3+i, postR[math.min(#postR,3+i%2)]) end
  if fillTop then fillTop(c) end
  c:outline()
end
function T.gate_forest()
  local c=L.canvas(32,32); grass_base(c,60,L.R.grass)
  gate_arch(c, L.R.wood, function(cc)
    -- foliage on arch
    cc:sphere(8,6,5,4,L.R.canopy,0.1); cc:sphere(24,6,5,4,L.R.canopy,0.1); cc:sphere(16,4,6,4,L.R.canopy,0.15)
  end)
  -- dark path through
  c:fillrect(12,16,20,31,L.R.dirt[2])
  return c
end
function T.gate_cave()
  local c=L.canvas(32,32); grass_base(c,61,L.R.grass)
  c:groundshadow(16,30,13,2.2)
  local S=L.R.stone
  -- rocky mound
  c:sphere(16,18,15,12,S)
  c:sphere(7,22,5,4,S,-0.1); c:sphere(25,22,5,4,S,-0.1)
  c:outline()
  -- cave mouth
  c:disc(16,22,7,8,L.hx("0c0e18"))
  c:disc(16,20,6,6,L.hx("15182a"))
  -- stalactite hints
  c:vline(13,15,17,L.hx("0c0e18")); c:vline(19,15,18,L.hx("0c0e18"))
  return c
end
function T.gate_factory()
  local c=L.canvas(32,32)
  -- brick wall base
  local w=T.factory_wall(); -- reuse pattern by copying? build fresh instead
  local B=L.R.brick
  c:fillrect(0,0,31,31,B[2])
  for y=0,31,4 do c:hline(0,31,y,B[1]); local off=((y//4)%2)*4; for x=off,31,8 do c:vline(x,y,y+3,B[1]) end end
  -- big metal door
  c:groundshadow(16,30,10,2)
  local I=L.R.iron
  c:fillrect(9,10,23,31,I[3])
  c:fillrect(9,10,23,11,I[4]); c:fillrect(9,30,23,31,I[1])
  c:vline(16,11,30,I[1])
  for yy=13,28,4 do c:hline(10,22,yy,I[2]) end
  for _,p in ipairs({{11,12},{21,12},{11,29},{21,29}}) do c:sphere(p[1],p[2],1,1,I[5],0.3) end
  -- warning stripe
  c:fillrect(9,8,23,10,L.R.gold[3]); for x=9,23,4 do c:vline(x,8,10,L.INK) end
  return c
end
function T.gate_town()
  local c=L.canvas(32,32); grass_base(c,62,L.R.path)
  -- cobble approach
  local S=L.R.stone
  gate_arch(c, S, function(cc)
    -- banner
    cc:fillrect(13,2,19,7,L.R.redroof[3]); cc:hline(13,19,2,L.R.gold[3])
    cc:px(16,5,L.R.gold[4])
  end)
  -- open gateway
  c:fillrect(12,14,20,31,L.R.path[2])
  -- lanterns
  c:sphere(6,9,1.6,1.6,L.hx("ffe27a"),0.3); c:sphere(26,9,1.6,1.6,L.hx("ffe27a"),0.3)
  return c
end

return T
