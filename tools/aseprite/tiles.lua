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

-- Soft painterly grass (Stardew-style): smooth value-noise patches, a gentle
-- top-left light gradient, and small clustered blade tufts. No harsh speckle.
local function grass_base(c, seed, R)
  R = R or L.R.grass
  local n = #R
  for y=0,31 do for x=0,31 do
    local patch = L.vnoise(x,y,seed,9)*0.60 + L.vnoise(x,y,seed+5,4)*0.30 + L.vnoise(x,y,seed+11,2)*0.10
    local light = (1 - (x+y)/70) * 0.16        -- subtle brighten toward top-left
    local t = 0.30 + patch*0.46 + light        -- compress toward mid tones
    c:px(x,y, R[L.rampidx(t,n)])
  end end
  -- clustered upright blade tufts (2-4 blades each), soft highlight + base shadow
  for i=1,5 do
    local cx = math.floor(L.hash(i,seed,1)*24)+4
    local cy = math.floor(L.hash(i,seed,2)*20)+8
    local blades = 2+math.floor(L.hash(i,seed,3)*3)
    for b=0,blades-1 do
      local bx = cx + b - blades//2
      local bh = 2+math.floor(L.hash(i*3+b,seed,4)*2)
      c:vline(bx, cy-bh, cy, R[math.min(n,4)])
      c:px(bx, cy-bh, R[n])
      c:px(bx, cy, R[2])
    end
  end
end

-- Warm textured soil (for tilled plots / factory ground): smooth clods + pebbles.
local function dirt_base(c, seed, R)
  R = R or L.R.dirt
  local n=#R
  for y=0,31 do for x=0,31 do
    local t = L.vnoise(x,y,seed,6)*0.7 + L.vnoise(x,y,seed+3,3)*0.3
    c:px(x,y, R[L.rampidx(0.2+t*0.6,n)])
  end end
  for i=1,6 do
    local x=math.floor(L.hash(i,seed,3)*26)+3
    local y=math.floor(L.hash(i,seed,4)*26)+3
    c:px(x,y,R[5]); c:px(x+1,y,R[4]); c:px(x,y+1,R[2])
  end
end

-- ===== ground tiles =====
-- Grass with optional scattered detail for variety (clover, daisies, pebbles).
function T.grass(v)
  local c=L.canvas(32,32); grass_base(c,v,L.R.grass)
  local G=L.R.grass
  if v==2 then
    -- clover patches: little three-leaf clusters
    for i=1,4 do
      local x=math.floor(hash(i,v,21)*24)+4; local y=math.floor(hash(i,v,22)*24)+4
      c:px(x,y,G[2]); c:px(x-1,y,G[2]); c:px(x+1,y,G[2]); c:px(x,y-1,G[2])
      c:px(x,y,G[5])
    end
  elseif v==3 then
    -- daisy freckles + a couple of pebbles
    for i=1,5 do
      local x=math.floor(hash(i,v,23)*26)+3; local y=math.floor(hash(i,v,24)*26)+3
      c:px(x,y,L.hx("fff6e0")); c:px(x,y-1,L.hx("f4e6bd")); c:px(x-1,y,L.hx("f4e6bd")); c:px(x+1,y,L.hx("f4e6bd")); c:px(x,y+1,L.hx("f4e6bd")); c:px(x,y,L.hx("f6ca45"))
    end
    for i=1,3 do
      local x=math.floor(hash(i,v,25)*26)+3; local y=math.floor(hash(i,v,26)*26)+3
      c:px(x,y,L.R.stone[3]); c:px(x+1,y,L.R.stone[2]); c:px(x,y+1,L.R.stone[2])
    end
  end
  return c
end

-- ---- connection-aware dirt/stone path ----
-- Roads occupy a central 16px band; arms extend to the tile edge for each
-- connected neighbour, so vertical, horizontal, crossroads, T-junctions and
-- corners all tile together seamlessly. conns = {n=,s=,e=,w=} booleans.
local PLO, PHI = 8, 23
local function path_tile(conns, seed)
  local c=L.canvas(32,32); grass_base(c,70+seed,L.R.grass)
  local D=L.R.dirt
  local mask={}
  local function setb(x0,y0,x1,y1) for y=y0,y1 do for x=x0,x1 do mask[y*32+x]=true end end end
  setb(PLO,PLO,PHI,PHI)                         -- central junction block
  if conns.n then setb(PLO,0,PHI,PLO-1) end
  if conns.s then setb(PLO,PHI+1,PHI,31) end
  if conns.w then setb(0,PLO,PLO-1,PHI) end
  if conns.e then setb(PHI+1,PLO,31,PHI) end
  local function isd(x,y) return x>=0 and x<=31 and y>=0 and y<=31 and mask[y*32+x] end
  -- irregular side edges (but never erode a tile-border opening, so joins stay clean)
  local erase={}
  for y=0,31 do for x=0,31 do
    if isd(x,y) and x>0 and x<31 and y>0 and y<31 then
      local border = (not isd(x-1,y)) or (not isd(x+1,y)) or (not isd(x,y-1)) or (not isd(x,y+1))
      if border and L.vnoise(x,y,seed+7,2.2)>0.66 then erase[y*32+x]=true end
    end
  end end
  for k in pairs(erase) do mask[k]=nil end
  -- paint textured warm soil
  for y=0,31 do for x=0,31 do
    if isd(x,y) then
      local t=L.vnoise(x,y,seed,5)*0.68 + L.vnoise(x,y,seed+3,2.5)*0.32
      c:px(x,y, D[L.rampidx(0.22+t*0.6,#D)])
    end
  end end
  -- worn lighter centre track along each arm (foot traffic)
  for y=0,31 do for x=0,31 do
    if isd(x,y) then
      local cxd=math.abs(x-15.5); local cyd=math.abs(y-15.5)
      if (cxd<4 and (conns.n or conns.s)) or (cyd<4 and (conns.e or conns.w)) then
        if L.vnoise(x,y,seed+13,3)>0.42 then c:px(x,y,D[4]) end
      end
    end
  end end
  -- dark rim where soil meets grass + grass blades overhanging the edge
  for y=0,31 do for x=0,31 do
    if isd(x,y) then
      if (not isd(x-1,y)) or (not isd(x+1,y)) or (not isd(x,y-1)) or (not isd(x,y+1)) then
        if L.hash(x,y,seed)>0.4 then c:px(x,y,D[2]) end
      end
    elseif app.pixelColor.rgbaA(c:get(x,y))>0 then
      -- overhanging blade from grass side onto soil edge
      if (isd(x,y+1)) and L.hash(x,y,seed+2)>0.7 then c:px(x,y+1,L.R.grass[4]) end
    end
  end end
  -- scattered warm flagstones embedded in the path (Stardew stone-path richness)
  local sHi,sMid,sLo = L.hx("cabfa4"), L.hx("a1957c"), L.hx("6f6350")
  for i=1,6 do
    local x=math.floor(L.hash(i,seed,31)*28)+2
    local y=math.floor(L.hash(i,seed,32)*28)+2
    if isd(x,y) and isd(x+1,y) and isd(x,y+1) then
      c:px(x,y,sMid); c:px(x+1,y,sMid); c:px(x,y+1,sMid); c:px(x+1,y+1,sLo)
      c:px(x,y-1,sHi); c:px(x-1,y,sHi)
    end
  end
  return c
end
-- Build conns from a canonical "nsew"-ordered code string (subset of those letters).
function T.path_shape(code)
  local conns={}
  for ch in code:gmatch("%a") do conns[ch]=true end
  local seed=0; for i=1,#code do seed=seed*7+string.byte(code,i) end
  return path_tile(conns, seed%97)
end
-- backward-compatible default straight path
function T.path(v) return T.path_shape("ns") end

function T.flower(v)
  local c=L.canvas(32,32); grass_base(c,20+v,L.R.meadow)
  -- clustered wildflowers with stems + soft petals, palette varies by variant
  local sets = {
    {"f6ca45","ff5aa0","ffffff"},
    {"c191f4","6ea8e2","ffe694"},
    {"ff6b6b","ffd166","fff3b0"},
  }
  local cols = sets[((v-1)%#sets)+1]
  for i=1,8 do
    local x=math.floor(hash(i,v,11)*24)+4
    local y=math.floor(hash(i,v,12)*22)+6
    local col=L.hx(cols[(i%#cols)+1])
    c:px(x,y+2,L.R.meadow[2]) -- stem
    c:px(x,y-1,col); c:px(x-1,y,col); c:px(x+1,y,col); c:px(x,y+1,col)
    c:px(x,y,L.hx("ffe694")) -- pollen centre
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

-- ===== bold new objects (Stardew-flavoured props) =====

-- Pond: still water with reflection band + lily pad + reeds.
function T.pond()
  local c=L.canvas(32,32); grass_base(c,80,L.R.grass)
  local W=L.R.water
  -- bank shadow
  c:disc(16,17,14,11,L.R.dirt[2])
  -- water body with soft ripples (value noise -> water ramp)
  for y=6,28 do for x=2,29 do
    local nx=(x-16)/14; local ny=(y-17)/11
    if nx*nx+ny*ny<=1.0 then
      local t=L.vnoise(x,y*2,80,4)*0.6 + (1-(nx*nx+ny*ny))*0.4
      c:px(x,y, W[L.rampidx(0.15+t*0.7,#W)])
    end
  end end
  c:outline()
  -- sun glint highlights
  for i=1,3 do local gx=10+i*3; c:hline(gx,gx+2,10+i,W[5]) end
  c:hline(9,13,20,W[5])
  -- lily pad + flower
  c:disc(21,19,3,2,L.R.canopy[3]); c:px(21,19,L.R.canopy[2]); c:px(20,18,L.R.canopy[5])
  c:px(22,18,L.hx("ff9ec4")); c:px(21,17,L.hx("ffd6e8"))
  -- reeds on the near bank
  for _,rx in ipairs({6,8,25}) do c:vline(rx,22,28,L.R.pine[3]); c:px(rx,22,L.R.pine[4]) end
  return c
end

-- Leafy bush with a few berries.
function T.bush()
  local c=L.canvas(32,32); grass_base(c,81,L.R.grass)
  c:groundshadow(16,27,11,2.6)
  local R=L.R.canopy
  c:sphere(13,20,7,6,R); c:sphere(21,21,6,5,R,-0.05); c:sphere(17,16,7,6,R,0.05)
  c:outline()
  for i=1,7 do local x=math.floor(hash(i,1,41)*16)+8; local y=math.floor(hash(i,1,42)*10)+13
    if not c:empty(x,y) then c:px(x,y,R[6] or R[5]) end end
  -- red berries
  for _,p in ipairs({{12,19},{19,18},{22,22},{15,23}}) do
    c:px(p[1],p[2],L.hx("d24d47")); c:px(p[1],p[2]-1,L.hx("ff8a6a"))
  end
  return c
end

-- Cluster of red-cap mushrooms.
function T.mushroom()
  local c=L.canvas(32,32); grass_base(c,82,L.R.grass)
  c:groundshadow(16,27,9,2.2)
  local function shroom(cx,cy,s)
    c:fillrect(cx-1,cy,cx+1,cy+s+2,L.R.cream[3]) -- stem
    c:sphere(cx,cy,s+2,s,L.R.redroof,0.1)         -- cap
    c:px(cx-1,cy-1,L.hx("ffffff")); c:px(cx+2,cy,L.hx("ffffff")); c:px(cx,cy+1,L.hx("ffe6dd")) -- spots
  end
  shroom(13,17,4); shroom(21,20,3); shroom(17,22,2)
  c:outline()
  return c
end

-- Tilled garden plot with green sprouts (crops).
function T.crop()
  local c=L.canvas(32,32); grass_base(c,83,L.R.grass)
  local D=L.R.dirt
  -- soil bed
  c:fillrect(3,7,28,27,D[3]); c:fillrect(3,7,28,8,D[4]); c:fillrect(3,26,28,27,D[2])
  for y=7,27 do for x=3,28 do if L.vnoise(x,y,83,3)>0.6 then c:px(x,y,D[2]) end end end
  -- furrow rows
  for ry=10,26,5 do c:hline(4,27,ry,D[2]); c:hline(4,27,ry-1,D[4]) end
  c:outline()
  -- sprouts in rows
  for row=0,2 do local ry=12+row*5
    for i=0,4 do local x=6+i*5
      c:vline(x,ry-3,ry,L.R.meadow[3]); c:px(x-1,ry-2,L.R.meadow[4]); c:px(x+1,ry-3,L.R.meadow[5])
    end
  end
  return c
end

-- Wooden picket fence (horizontal rail).
function T.fence()
  local c=L.canvas(32,32); grass_base(c,84,L.R.grass)
  local W=L.R.wood
  -- two rails
  c:fillrect(0,14,31,16,W[4]); c:hline(0,31,14,W[5]); c:hline(0,31,16,W[2])
  -- posts with pointed tops
  for _,px in ipairs({4,15,26}) do
    c:groundshadow(px+1,27,3,1.4)
    c:fillrect(px,8,px+2,26,W[3]); c:vline(px,8,26,W[5]); c:vline(px+2,8,26,W[2])
    c:px(px,7,W[3]); c:px(px+1,6,W[4]); c:px(px+2,7,W[3])
  end
  c:outline()
  return c
end

-- Stone fountain with a spouting basin.
function T.fountain()
  local c=L.canvas(32,32); grass_base(c,85,L.R.path)
  c:groundshadow(16,28,13,3)
  local S=L.R.stone; local W=L.R.water
  -- basin
  c:sphere(16,22,13,6,S)
  c:disc(16,22,10,4,W[2]); c:sphere(16,22,9,3.4,W,0.15)
  -- inner pedestal
  c:fillrect(14,12,18,22,S[3]); c:vline(14,12,22,S[2]); c:vline(18,12,22,S[4])
  c:sphere(16,11,4,3,S,0.1)
  -- water jets
  for _,dx in ipairs({-4,0,4}) do
    for y=6,12 do c:blend(16+dx*(y-6)/6, y, L.rgba(180,225,250, 200-(y-6)*10)) end
  end
  c:disc(16,10,3,1.4,W[4])
  c:outline()
  -- glints
  c:px(11,21,W[5]); c:px(20,20,W[5]); c:px(16,20,W[5])
  return c
end

-- Flowerbed: a dense row of tulips.
function T.flowerbed()
  local c=L.canvas(32,32); grass_base(c,86,L.R.meadow)
  local D=L.R.dirt
  c:fillrect(3,20,28,27,D[3]); c:hline(3,28,20,D[4]); c:outline()
  local cols={"ef476f","ffd166","06d6a0","c191f4","ff924c"}
  for i=0,6 do
    local x=5+i*4; local y=18-((i*7)%3)
    c:vline(x,y,22,L.R.meadow[2])              -- stem
    local col=L.hx(cols[(i%#cols)+1])
    c:fillrect(x-1,y-3,x+1,y,col)               -- tulip cup
    c:px(x-1,y-3,L.hx("ffffff")); c:px(x,y-4,col)
  end
  return c
end

-- Wooden barrel prop.
function T.barrel()
  local c=L.canvas(32,32); grass_base(c,87,L.R.grass)
  c:groundshadow(16,28,7,2)
  local W=L.R.wood; local I=L.R.iron
  c:fillrect(9,10,23,28,W[3])
  c:vline(9,11,27,W[2]); c:vline(23,11,27,W[2]); c:vline(11,10,28,W[4]); c:vline(16,10,28,W[5])
  c:sphere(16,10,7,2,W,0.2) -- top lid
  -- iron hoops
  c:hline(9,23,13,I[3]); c:hline(9,23,14,I[2]); c:hline(9,23,24,I[3]); c:hline(9,23,25,I[2])
  c:outline()
  return c
end

return T
