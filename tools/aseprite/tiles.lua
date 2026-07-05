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
    -- tileable value-noise patches only (scales divide 32 so they wrap cleanly).
    -- No per-tile directional gradient: it reset at every tile, so the dark
    -- bottom-right of one tile met the bright top-left of the next and drew a
    -- hard seam. Even, wrap-safe tone lets neighbouring tiles blend.
    local patch = L.vnoise(x,y,seed,8)*0.58 + L.vnoise(x,y,seed+5,4)*0.30 + L.vnoise(x,y,seed+11,16)*0.12
    local t = 0.40 + (patch-0.5)*0.54          -- centre on mid tones, gentle spread
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
  -- scattered warm flagstones embedded in the path (Stardew stone-path richness).
  -- Count, positions, sizes and shapes are all seed-driven so each variant differs.
  local sHi,sMid,sLo = L.hx("cabfa4"), L.hx("a1957c"), L.hx("6f6350")
  local nStones = 4 + math.floor(L.hash(seed,17,5)*5)          -- 4..8
  for i=1,nStones do
    local x=math.floor(L.hash(i,seed,31)*28)+2
    local y=math.floor(L.hash(i,seed,32)*28)+2
    local kind=L.hash(i,seed,41)
    if isd(x,y) then
      if kind<0.42 then                                         -- single pebble-stone
        c:px(x,y,sMid); if isd(x,y-1) then c:px(x,y-1,sHi) end
      elseif kind<0.82 and isd(x+1,y) and isd(x,y+1) then       -- 2x2 flagstone
        c:px(x,y,sMid); c:px(x+1,y,sMid); c:px(x,y+1,sMid); c:px(x+1,y+1,sLo)
        if isd(x,y-1) then c:px(x,y-1,sHi) end
        if isd(x-1,y) then c:px(x-1,y,sHi) end
      elseif isd(x+1,y) and isd(x,y+1) and isd(x+1,y+1) and isd(x+2,y+1) then -- L-cluster
        c:px(x,y,sMid); c:px(x+1,y,sLo); c:px(x,y+1,sMid)
        c:px(x+1,y+1,sMid); c:px(x+2,y+1,sLo)
        if isd(x,y-1) then c:px(x,y-1,sHi) end
      end
    end
  end
  -- scuffs / scrapes: short dark scrapes worn into the soil
  local nScuff = 2 + math.floor(L.hash(seed,23,3)*3)            -- 2..4
  for i=1,nScuff do
    local x=math.floor(L.hash(i,seed+5,51)*26)+3
    local y=math.floor(L.hash(i,seed+5,52)*26)+3
    local len=1+math.floor(L.hash(i,seed+5,53)*3)
    local horiz=L.hash(i,seed+5,54)>0.5
    for k=0,len do
      local sx = horiz and x+k or x
      local sy = horiz and y or y+k
      if isd(sx,sy) then c:px(sx,sy, D[(L.hash(sx,sy,seed)>0.5) and 1 or 2]) end
    end
  end
  -- puddle: seed-gated reflective blob, resting off the worn centre track
  if L.hash(seed,71,7) < 0.5 then
    local P=L.R.puddle
    local pcx=6+math.floor(L.hash(seed,72,20)*20)
    local pcy=6+math.floor(L.hash(seed,73,20)*20)
    local rx=2.2 + L.hash(seed,74,3)*1.8                        -- 2.2..4.0
    local ry=1.4 + L.hash(seed,75,4)*1.0                        -- 1.4..2.4
    for y=0,31 do for x=0,31 do
      if isd(x,y) then
        local dx=(x-pcx)/rx; local dy=(y-pcy)/ry
        local d=dx*dx+dy*dy
        if d<1 then
          c:px(x,y, P[2 + math.floor((1-d)*2.5)])              -- deeper toward centre
          if dy<-0.15 and d>0.35 then c:px(x,y,P[4]) end        -- lit top edge
          if dy> 0.45 and d>0.40 then c:px(x,y,P[1]) end        -- dark bottom rim
        end
      end
    end end
    if isd(pcx-1,pcy-1) and L.hash(seed,76,9)<0.7 then c:px(pcx-1,pcy-1,P[5]) end
  end
  -- gravel / pebble specks
  local nGrit = 5 + math.floor(L.hash(seed,31,6)*6)            -- 5..10
  for i=1,nGrit do
    local x=math.floor(L.hash(i,seed+9,61)*28)+2
    local y=math.floor(L.hash(i,seed+9,62)*28)+2
    if isd(x,y) then c:px(x,y, D[(L.hash(i,seed+9,63)>0.5) and 5 or 1]) end
  end
  -- hairline crack: occasional thin meandering line
  if L.hash(seed,81,11) < 0.4 then
    local x=6+math.floor(L.hash(seed,82,18)*18)
    local y=5+math.floor(L.hash(seed,83,6)*6)
    for k=0,10+math.floor(L.hash(seed,84,8)*8) do
      if isd(x,y) then c:px(x,y,D[1]) end
      y=y+1
      if L.hash(x,y,seed)>0.62 then x=x+1 elseif L.hash(x,y,seed+1)>0.62 then x=x-1 end
    end
  end
  return c
end
-- Build conns from a canonical "nsew"-ordered code string (subset of those letters).
function T.path_shape(code, variant)
  local conns={}
  for ch in code:gmatch("%a") do conns[ch]=true end
  local seed=0; for i=1,#code do seed=seed*7+string.byte(code,i) end
  seed = (seed + ((variant or 1)-1)*29) % 97   -- variant reshuffles the decoration
  return path_tile(conns, seed)
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

-- ===== trees: tall 32x48 transparent sprites that OVERFLOW the tile upward =====
-- The base/shadow sit near y44 (the tile's front edge, where the player stands);
-- the canopy rises and overflows over the tile behind. 10 species, 2-frame sway.
local TREE_H = 48
-- extra leaf/bark ramps (dark -> light) beyond lib's grass/canopy/pine/blossom
local R_AUTUMN   = {L.hx("8a3410"),L.hx("b8501a"),L.hx("d8781f"),L.hx("eea236"),L.hx("f6c657")}
local R_WILLOW   = {L.hx("3c5622"),L.hx("53782e"),L.hx("6c983c"),L.hx("88b552"),L.hx("a6ce70")}
local R_BIRCHLF  = {L.hx("587c30"),L.hx("72963c"),L.hx("8db150"),L.hx("a8cb68"),L.hx("c4e08a")}
local R_BIRCHBK  = {L.hx("b7ae9a"),L.hx("cdc5b2"),L.hx("e2dccd"),L.hx("f2eee2"),L.hx("ffffff")}
local R_DEAD     = {L.hx("4a3420"),L.hx("5e442c"),L.hx("735539"),L.hx("896a49"),L.hx("9e7f5b")}

local function line(c,x0,y0,x1,y1,col,w)
  w = w or 1
  local dx=math.abs(x1-x0); local dy=math.abs(y1-y0)
  local sx=x0<x1 and 1 or -1; local sy=y0<y1 and 1 or -1
  local err=dx-dy
  while true do
    if w>1 then c:fillrect(x0-(w-1),y0,x0,y0,col) else c:px(x0,y0,col) end
    if x0==x1 and y0==y1 then break end
    local e2=2*err
    if e2>-dy then err=err-dy; x0=x0+sx end
    if e2<dx then err=err+dx; y0=y0+sy end
  end
end
-- straight trunk from y=top down to the ground line (y45), half-width w, shaded
local function t_trunk(c, cx, top, w, R)
  R = R or L.R.wood
  c:fillrect(cx-w,top,cx+w,45, R[2])
  c:vline(cx-w,top,45,R[1]); c:vline(cx+w,top,45,R[3]); c:px(cx-w+1,top,R[4])
end
-- layered round canopy (main + two offset lobes) that sways by dx
local function t_canopy(c, cx,cy,rx,ry, R, dx)
  dx = dx or 0
  c:sphere(cx+dx,cy,rx,ry,R)
  c:sphere(cx-math.max(3,math.floor(rx*0.45))+dx, cy-math.max(2,math.floor(ry*0.4)), math.max(3,math.floor(rx*0.52)), math.max(3,math.floor(ry*0.52)), R, 0.22)
  c:sphere(cx+math.max(3,math.floor(rx*0.5))+dx, cy-math.floor(ry*0.15), math.max(3,math.floor(rx*0.45)), math.max(3,math.floor(ry*0.45)), R, 0.06)
end
local function t_speckle(c, cx,cy,rx,ry, col, dx, n, seed)
  for i=1,(n or 10) do
    local x=math.floor(cx+dx+(hash(i,seed,13)*2-1)*rx*0.82)
    local y=math.floor(cy+(hash(i,seed,14)*2-1)*ry*0.82)
    if not c:empty(x,y) then c:px(x,y,col) end
  end
end
function T.tree(v, frame)
  v = v or 1
  local c=L.canvas(32,TREE_H)
  local dx = (frame==1) and 1 or 0                 -- gentle canopy sway
  c:groundshadow(16,45,11,2.8)
  if v==1 then          -- 1 round oak
    t_trunk(c,16,30,2); t_canopy(c,16,18,12,11,L.R.canopy,dx); c:outline()
    t_speckle(c,16,18,12,11,L.R.canopy[6] or L.R.canopy[5],dx,13,1)
  elseif v==2 then      -- 2 tall oak
    t_trunk(c,16,26,2); t_canopy(c,16,15,10,12,L.R.canopy,dx); c:outline()
    t_speckle(c,16,15,10,12,L.R.canopy[6] or L.R.canopy[5],dx,13,2)
  elseif v==3 then      -- 3 pine (conifer tiers, tapering UP correctly)
    t_trunk(c,16,36,2)
    local P=L.R.pine
    for tier=0,3 do
      local base=42-tier*9                         -- widest row of this tier (bottom)
      local ww=14-tier*3
      for i=0,8 do
        local w=math.max(1, ww - math.floor(i*ww/8))
        c:hline(16-w+dx,16+w+dx, base-i, P[math.min(#P,3+tier%2)])
      end
    end
    c:px(16+dx,5,P[5]); c:outline()
  elseif v==4 then      -- 4 cherry blossom
    t_trunk(c,16,28,2); t_canopy(c,16,17,12,10,L.R.blossom,dx); c:outline()
    t_speckle(c,16,17,12,10,L.hx("ffe0ee"),dx,15,4)
  elseif v==5 then      -- 5 willow (drooping strands)
    t_trunk(c,16,24,2); t_canopy(c,16,14,12,8,R_WILLOW,dx); c:outline()
    for _,sx in ipairs({6,10,15,20,25}) do
      local h=6+math.floor(hash(sx,v,7)*7)
      c:vline(sx+dx,19,19+h,R_WILLOW[2]); c:px(sx+dx,19+h,R_WILLOW[1])
    end
  elseif v==6 then      -- 6 birch (white trunk, bark marks)
    t_trunk(c,16,20,1,R_BIRCHBK)
    for _,yy in ipairs({40,35,30,25}) do c:px(15,yy,L.INK); c:px(17,yy-2,L.INK) end
    t_canopy(c,16,13,9,11,R_BIRCHLF,dx); c:outline()
    t_speckle(c,16,13,9,11,R_BIRCHLF[5],dx,12,6)
  elseif v==7 then      -- 7 autumn maple
    t_trunk(c,16,28,2); t_canopy(c,16,17,12,10,R_AUTUMN,dx); c:outline()
    t_speckle(c,16,17,12,10,R_AUTUMN[5],dx,15,7)
    for _,p in ipairs({{9,30},{22,32},{14,34}}) do c:px(p[1],p[2],R_AUTUMN[3]) end  -- fallen leaves
  elseif v==8 then      -- 8 bare/dead tree
    t_trunk(c,16,18,2,R_DEAD)
    line(c,16,22,7,11,R_DEAD[2],2); line(c,16,26,25,15,R_DEAD[2],2)
    line(c,16,17,10,6,R_DEAD[2]); line(c,16,20,24,9,R_DEAD[2]); line(c,15,24,12,14,R_DEAD[1])
    c:px(7+dx,10,R_DEAD[1]); c:px(25+dx,14,R_DEAD[1]); c:outline()
  elseif v==9 then      -- 9 bushy (wide low double canopy)
    t_trunk(c,16,32,2)
    t_canopy(c,10,23,8,8,L.R.canopy,dx); t_canopy(c,22,22,8,8,L.R.canopy,dx)
    t_canopy(c,16,16,10,9,L.R.canopy,dx); c:outline()
    t_speckle(c,16,20,13,11,L.R.canopy[6] or L.R.canopy[5],dx,16,9)
  else                  -- 10 young sapling (small)
    t_trunk(c,16,36,1); t_canopy(c,16,29,7,7,L.R.meadow,dx); c:outline()
    t_speckle(c,16,29,7,7,L.R.meadow[5],dx,7,10)
  end
  return c
end

-- ===== rock / sign / book / well / lamp / monument =====
-- Rocks: 8 shapes/sizes so a cluster never repeats. Ground objects (in-tile),
-- redrawn with volume + a soft cast shadow so they sit on the grass.
function T.rock(v)
  v = v or 1
  local c=L.canvas(32,32); grass_base(c,40+v*3,L.R.grass)
  local S=L.R.stone
  if v==1 then           -- medium boulder
    c:groundshadow(16,26,11,3); c:sphere(15,20,10,7,S); c:sphere(22,23,5,4,S,-0.1)
    c:outline(); c:coreshade(); c:px(11,17,S[5]); c:px(13,16,S[5]); c:hline(12,20,22,L.INK)
  elseif v==2 then       -- scattered pebble cluster (small)
    c:groundshadow(16,27,12,3)
    c:sphere(9,24,4,3,S); c:sphere(20,25,5,3.5,S,-0.05); c:sphere(15,21,3.5,3,S,0.12); c:sphere(26,23,2.6,2,S,-0.1)
    c:outline(); c:px(8,22,S[5]); c:px(19,23,S[5]); c:px(14,19,S[5])
  elseif v==3 then       -- tall standing boulder
    c:groundshadow(16,28,8,2.6); c:sphere(16,17,8,11,S); c:sphere(13,11,4,4,S,0.16)
    c:outline(); c:coreshade(); c:px(12,10,S[5]); c:vline(18,12,25,L.INK); c:px(19,18,S[1])
  elseif v==4 then       -- twin rocks
    c:groundshadow(16,27,12,3)
    c:sphere(10,21,6,5,S); c:sphere(22,23,7,6,S,-0.05)
    c:outline(); c:coreshade(); c:px(7,17,S[5]); c:px(19,19,S[5]); c:hline(20,25,24,L.INK)
  elseif v==5 then       -- flat wide slab
    c:groundshadow(16,27,13,2.8); c:sphere(16,23,13,5,S); c:sphere(11,21,4,2.6,S,0.14)
    c:outline(); c:coreshade(); c:hline(9,24,23,S[1]); c:px(9,20,S[5]); c:px(22,21,S[4])
  elseif v==6 then       -- jagged / angular
    c:groundshadow(16,27,10,2.8)
    c:sphere(16,21,9,7,S)
    c:fillrect(12,14,15,20,S[3]); c:fillrect(18,11,21,19,S[4]); c:fillrect(21,16,24,22,S[2])
    c:outline(); c:coreshade(); c:px(11,17,S[5]); c:px(18,12,S[5]); c:hline(14,20,21,L.INK)
  elseif v==7 then       -- mossy boulder (green moss cap on the lit top)
    c:groundshadow(16,26,11,3); c:sphere(15,20,10,7,S); c:sphere(23,23,4,3,S,-0.1); c:outline(); c:coreshade()
    local Mo=L.R.canopy
    c:sphere(13,15,5,2.6,Mo,0.1); c:sphere(19,16,3,1.8,Mo,0.05)
    for i=1,8 do c:px(math.floor(hash(i,7,41)*12)+9, math.floor(hash(i,7,42)*3)+13, Mo[5]) end
    c:px(11,18,S[5])
  else                   -- 8 cracked boulder with rubble
    c:groundshadow(16,27,12,3); c:sphere(15,20,10,8,S); c:outline(); c:coreshade()
    line(c,12,13,17,27,L.INK); line(c,17,20,23,18,L.INK); c:px(11,16,S[5]); c:px(14,15,S[5])
    c:sphere(25,26,2.4,1.8,S,-0.1); c:sphere(7,27,2,1.6,S,-0.1); c:outline()  -- chips beside it
  end
  return c
end
function T.sign()   -- tall 32x48 overflow sprite (transparent, sits on grass)
  local c=L.canvas(32,48)
  c:groundshadow(16,45,6,2)
  local W=L.R.wood
  c:fillrect(15,26,17,45,W[2]); c:vline(15,26,45,W[3]); c:vline(17,26,45,W[1])   -- post
  c:fillrect(5,18,27,32,W[4]); c:hline(5,27,18,W[5]); c:hline(5,27,32,W[2])       -- board
  c:vline(5,18,32,W[2]); c:vline(27,18,32,W[5])
  c:outline(); c:coreshade()
  c:hline(8,23,23,W[1]); c:hline(8,20,27,W[1])                                    -- engraved text
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
function T.well(frame)   -- tall 32x48 overflow sprite, 2-frame water glint
  local c=L.canvas(32,48)
  local g=(frame==1) and 1 or 0
  c:groundshadow(16,45,11,3)
  local S=L.R.stone; local W=L.R.water
  c:fillrect(8,32,24,45,S[2]); c:vline(8,32,45,S[1]); c:vline(24,32,45,S[4])      -- base
  c:hline(8,24,38,S[1]); c:vline(16,38,45,S[1])                                   -- stone joints
  c:sphere(16,32,8,3.5,S)                                                         -- rim
  c:disc(16,32,6,2.4,L.hx("14324a"))                                             -- water hole
  c:sphere(16,32,4,1.6,W,0.2)                                                   -- water
  c:px(13+g*2,31,W[5]); c:px(16,31,W[5]); c:px(19-g*2,32,W[4])                  -- shimmering glints
  c:hline(14,18,33, (frame==1) and W[4] or W[2])                               -- ripple band toggles
  c:vline(9,14,32,L.R.wood[2]); c:vline(23,14,32,L.R.wood[2])                     -- roof posts
  for i=0,8 do local w=1+i; c:hline(16-w,16+w, 6+i, L.R.redroof[math.min(5,3+i%2)]) end  -- pyramid roof (apex top)
  c:outline()
  return c
end
function T.pathlamp(frame)   -- tall 32x48 overflow sprite, 2-frame flame flicker
  local c=L.canvas(32,48)
  local fl=(frame==1) and 1 or 0
  c:groundshadow(16,45,5,2)
  local I=L.R.iron
  c:fillrect(15,14,17,45,I[2]); c:vline(15,14,45,I[3]); c:vline(17,14,45,I[1])   -- post
  c:fillrect(11,44,21,46,I[1])                                                    -- base
  c:fillrect(12,6,20,15,I[3]); c:fillrect(13,7,19,14,L.hx("ffe27a"))            -- lantern + glow
  c:sphere(16,10,2,3-fl,L.R.ember,0.3)                                           -- flame (flickers)
  c:fillrect(11,5,21,6,I[2]); for i=0,4 do c:hline(13-i//2,19+i//2,5-i,I[2]) end  -- cap
  c:outline()
  for r=1,6 do for a=0,15 do local ang=a/16*6.283                                 -- glow bloom
    c:blend(16+math.cos(ang)*r*1.6, 10+math.sin(ang)*r*1.4, L.rgba(255,210,110, math.max(0,(38+fl*8)-r*6))) end end
  return c
end
function T.ledger_stone()   -- tall 32x48 overflow monument with a gold ledger sigil
  local c=L.canvas(32,48)
  c:groundshadow(16,45,10,2.8)
  local S=L.R.stone
  for y=18,45 do local ww=(y<24) and (4+(y-18)) or 10; c:hline(16-ww,16+ww,y,S[3]) end
  c:sphere(16,20,8,4,S,0.1)                                          -- rounded top
  c:outline(); c:coreshade()
  local G=L.R.gold
  c:vline(16,26,40,G[3]); c:hline(12,20,29,G[3]); c:hline(12,20,38,G[3]); c:hline(13,19,33,G[4])
  c:vline(6,24,44,S[2]); c:vline(26,24,44,S[4])                      -- side shading
  return c
end

-- ===== houses (tall 32x48 overflow sprites) — CORRECT gable roofs =====
-- ridge narrow at the TOP, eaves widen toward the BOTTOM (previously inverted).
local function cottage(c, roofR, wallR)
  wallR = wallR or L.R.wood
  c:groundshadow(16,45,12,2.8)
  local W=wallR
  -- walls (box) with lit/shadow sides
  c:fillrect(6,27,26,45,W[4]); c:vline(6,27,45,W[2]); c:vline(26,27,45,W[5]); c:hline(7,25,27,W[5])
  -- gable roof: i=0 ridge (narrow, top) -> i=11 eaves (wide, bottom)
  for i=0,11 do local w=2+i; c:hline(16-w,16+w, 15+i, roofR[math.min(#roofR,3+(i%2))]) end
  c:hline(1,30,26,roofR[2]); c:hline(1,30,27,roofR[1])          -- eave overhang shadow
  c:px(16,15,roofR[4])
  -- door
  c:fillrect(13,35,18,45,W[1]); c:vline(18,35,45,W[2]); c:px(17,40,L.R.gold[4])
  -- lit windows with frames
  c:fillrect(8,31,11,34,L.hx("ffe27a")); c:rect(8,31,11,34,W[1]); c:px(9,32,L.hx("fff6d4"))
  c:fillrect(21,31,24,34,L.hx("ffe27a")); c:rect(21,31,24,34,W[1]); c:px(22,32,L.hx("fff6d4"))
  -- chimney
  c:fillrect(21,9,24,16,L.R.brick[2]); c:hline(21,24,9,L.R.brick[4])
  c:outline(); c:coreshade()
end
function T.house(v)
  v = v or 1
  local c=L.canvas(32,48)
  if v==1 then cottage(c, L.R.redroof)
  elseif v==2 then cottage(c, L.R.blueroof)
  else cottage(c, L.R.stone, L.R.brick) end                    -- 3 brick townhouse, slate roof
  return c
end
-- Factory wall: seamless brick tile, 4 variants (iron band / cracked / mossy / pipe).
function T.factory_wall(v)
  v = v or 1
  local c=L.canvas(32,32)
  local B=L.R.brick
  c:fillrect(0,0,31,31,B[2])
  for y=0,31,4 do
    c:hline(0,31,y,B[1])
    local off=((y//4)%2)*4
    for x=off,31,8 do c:vline(x,y,y+3,B[1]) end
    for yy=y+1,y+3 do for x=0,31 do
      if hash(x,yy,v)>0.7 then c:px(x,yy,B[3]) elseif hash(x,yy,v+1)<0.2 then c:px(x,yy,B[1]) end
    end end
  end
  if v==1 then           -- riveted iron band
    c:fillrect(0,14,31,17,L.R.iron[3]); c:hline(0,31,14,L.R.iron[2]); c:hline(0,31,17,L.R.iron[1])
    for x=3,31,7 do c:sphere(x,15,1,1,L.R.iron[5],0.3) end
  elseif v==2 then       -- cracked
    line(c,6,1,11,19,L.INK); line(c,20,9,26,30,L.INK); line(c,11,19,15,25,L.INK); line(c,20,9,15,4,L.INK)
  elseif v==3 then       -- mossy / weathered
    for i=1,44 do c:blend(math.floor(hash(i,v,7)*32), math.floor(hash(i,v,8)*13)+18, L.rgba(70,120,54,120)) end
  else                   -- external pipe
    c:fillrect(22,0,26,31,L.R.iron[3]); c:vline(22,0,31,L.R.iron[4]); c:vline(26,0,31,L.R.iron[1])
    for y=4,28,8 do c:hline(21,27,y,L.R.iron[2]) end
  end
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

-- Pond: still water, 5 shapes/sizes, 2-frame ripple (grass identical per frame
-- so only the water shimmers). Ground object (stays a tile background).
local POND_SHAPE = { {16,17,14,11}, {16,18,15,9}, {17,19,10,8}, {15,17,13,12}, {16,18,14,10} }
function T.pond(v, frame)
  v = v or 1
  local c=L.canvas(32,32); grass_base(c,80+v,L.R.grass)
  local W=L.R.water
  local g = (frame==1) and 1 or 0
  local sh=POND_SHAPE[v]; local pcx,pcy,prx,pry=sh[1],sh[2],sh[3],sh[4]
  c:disc(pcx,pcy,prx,pry,L.R.dirt[2])                              -- bank shadow
  for y=0,31 do for x=0,31 do
    local nx=(x-pcx)/prx; local ny=(y-pcy)/pry
    if nx*nx+ny*ny<=1.0 then
      local t=L.vnoise(x,y*2,80+v,4)*0.6 + (1-(nx*nx+ny*ny))*0.4
      c:px(x,y, W[L.rampidx(0.15+t*0.7,#W)])
    end
  end end
  c:outline()
  for i=1,3 do local gx=pcx-6+i*3+g*2; c:hline(gx,gx+2,pcy-6+i,W[5]) end   -- glints (drift 2px)
  local ry = (frame==1) and (pcy-2) or (pcy+3)                            -- moving ripple dashes
  c:hline(pcx-6,pcx-2, ry, W[5]); c:hline(pcx,pcx+4, ry+2, W[4]); c:hline(pcx-3,pcx+1, ry+4, W[5])
  if v~=3 then                                                    -- lily pad + flower
    c:disc(pcx+5,pcy+2,3,2,L.R.canopy[3]); c:px(pcx+5,pcy+2,L.R.canopy[2]); c:px(pcx+4,pcy+1,L.R.canopy[5])
    c:px(pcx+6,pcy+1,L.hx("ff9ec4")); c:px(pcx+5,pcy,L.hx("ffd6e8"))
  end
  if v==5 then c:disc(pcx-5,pcy+3,2,1.4,L.R.canopy[3]); c:px(pcx-5,pcy+3,L.R.canopy[5]) end
  if v==1 or v==2 then for _,rx in ipairs({pcx-9,pcx-7,pcx+9}) do c:vline(rx,pcy+5,pcy+10,L.R.pine[3]); c:px(rx,pcy+5,L.R.pine[4]) end end
  if v==4 then for _,p in ipairs({{4,20},{27,18},{6,10}}) do c:sphere(p[1],p[2],3,2.4,L.R.stone) end; c:outline() end
  return c
end

-- Leafy bush: 4 variants (berry / hedge / tall shrub / flowering).
function T.bush(v)
  v = v or 1
  local c=L.canvas(32,32); grass_base(c,81+v,L.R.grass)
  c:groundshadow(16,27,11,2.6)
  local R=L.R.canopy
  local function speck(seed,n,x0,rx,y0,ry) for i=1,n do
    local x=math.floor(hash(i,seed,41)*rx)+x0; local y=math.floor(hash(i,seed,42)*ry)+y0
    if not c:empty(x,y) then c:px(x,y,R[6] or R[5]) end end end
  if v==1 then           -- round berry bush
    c:sphere(13,20,7,6,R); c:sphere(21,21,6,5,R,-0.05); c:sphere(17,16,7,6,R,0.05); c:outline(); c:coreshade()
    speck(1,7,8,16,13,10)
    for _,p in ipairs({{12,19},{19,18},{22,22},{15,23}}) do c:px(p[1],p[2],L.hx("d24d47")); c:px(p[1],p[2]-1,L.hx("ff8a6a")) end
  elseif v==2 then       -- wide low hedge
    c:sphere(9,22,6,5,R); c:sphere(16,21,7,5,R,0.05); c:sphere(23,22,6,5,R,-0.05); c:outline(); c:coreshade(); speck(2,10,5,22,16,7)
  elseif v==3 then       -- tall narrow shrub
    c:sphere(16,20,6,8,R); c:sphere(14,13,4,4,R,0.1); c:outline(); c:coreshade(); speck(3,7,11,10,10,14)
  else                   -- flowering bush
    c:sphere(13,20,7,6,R); c:sphere(21,21,6,5,R,-0.05); c:sphere(17,16,7,6,R,0.05); c:outline(); c:coreshade()
    for _,p in ipairs({{11,17},{18,15},{22,20},{14,22},{20,24}}) do c:px(p[1],p[2],L.hx("ffd166")); c:px(p[1],p[2]-1,L.hx("fff3b0")); c:px(p[1]-1,p[2],L.hx("ff924c")) end
  end
  return c
end

-- Mushrooms: 3 variants (red-cap / brown toadstool / big+pink).
function T.mushroom(v)
  v = v or 1
  local c=L.canvas(32,32); grass_base(c,82+v,L.R.grass)
  c:groundshadow(16,27,9,2.2)
  local function shroom(cx,cy,s,capR)
    c:fillrect(cx-1,cy,cx+1,cy+s+2,L.R.cream[3]); c:vline(cx-1,cy,cy+s+2,L.R.cream[2])
    c:sphere(cx,cy,s+2,s,capR,0.1)
    c:px(cx-1,cy-1,L.hx("ffffff")); c:px(cx+2,cy,L.hx("ffffff")); c:px(cx,cy+1,L.hx("ffe6dd"))
  end
  if v==1 then shroom(13,17,4,L.R.redroof); shroom(21,20,3,L.R.redroof); shroom(17,22,2,L.R.redroof)
  elseif v==2 then shroom(12,19,3,L.R.dirt); shroom(19,17,4,L.R.dirt); shroom(23,21,2,L.R.dirt)
  else shroom(15,15,5,L.R.redroof); shroom(23,22,2,L.R.blossom) end
  c:outline(); c:coreshade()
  return c
end

-- Tilled garden plot with green sprouts (crops).
-- Tilled plot: 3 crop types (green sprouts / golden wheat / leafy greens).
function T.crop(v)
  v = v or 1
  local c=L.canvas(32,32); grass_base(c,83+v,L.R.grass)
  local D=L.R.dirt
  c:fillrect(3,7,28,27,D[3]); c:fillrect(3,7,28,8,D[4]); c:fillrect(3,26,28,27,D[2])
  for y=7,27 do for x=3,28 do if L.vnoise(x,y,83+v,3)>0.6 then c:px(x,y,D[2]) end end end
  for ry=10,26,5 do c:hline(4,27,ry,D[2]); c:hline(4,27,ry-1,D[4]) end
  c:outline()
  local SP = ({L.R.meadow, L.R.gold, L.R.canopy})[v] or L.R.meadow
  for row=0,2 do local ry=12+row*5
    for i=0,4 do local x=6+i*5
      c:vline(x,ry-3,ry,SP[3]); c:px(x-1,ry-2,SP[4]); c:px(x+1,ry-3,SP[5])
      if v==2 then c:px(x,ry-4,SP[5]) end
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

-- Stone fountain: tall 32x48 overflow sprite (transparent -> sits on grass, no
-- more brown base), 2-frame spouting water.
function T.fountain(frame)
  local c=L.canvas(32,48)
  local g=(frame==1) and 1 or 0
  c:groundshadow(16,45,13,3.2)
  local S=L.R.stone; local W=L.R.water
  c:sphere(16,40,13,6,S)                                            -- basin
  c:disc(16,40,10,4,W[2]); c:sphere(16,40,9,3.4,W,0.15)
  c:fillrect(14,28,18,40,S[3]); c:vline(14,28,40,S[2]); c:vline(18,28,40,S[4])   -- pedestal
  c:sphere(16,27,4,3,S,0.1)
  for _,dx in ipairs({-5,0,5}) do                                  -- water jets (arc + ripple)
    for y=18,28 do
      local off = (dx==0) and 0 or (dx<0 and -1 or 1)
      c:blend(16 + dx*(28-y)/11 + g*off, y, L.rgba(180,225,250, 210-(28-y)*8))
    end
  end
  c:disc(16,26+g,3,1.4,W[4])                                       -- top spray
  c:outline()
  c:px(11,39,W[5]); c:px(20,38,W[5]); c:px(16,38,W[5])            -- basin glints
  return c
end

-- Flowerbed: dense tulip row, 3 colour sets.
function T.flowerbed(v)
  v = v or 1
  local c=L.canvas(32,32); grass_base(c,86+v,L.R.meadow)
  local D=L.R.dirt
  c:fillrect(3,20,28,27,D[3]); c:hline(3,28,20,D[4]); c:outline()
  local sets = {
    {"ef476f","ffd166","06d6a0","c191f4","ff924c"},
    {"ff5aa0","c191f4","6ea8e2","ffd166","ffffff"},
    {"e63946","f6c453","ff924c","ef476f","ffd166"},
  }
  local cols=sets[((v-1)%#sets)+1]
  for i=0,6 do
    local x=5+i*4; local y=18-((i*7)%3)
    c:vline(x,y,22,L.R.meadow[2])
    local col=L.hx(cols[(i%#cols)+1])
    c:fillrect(x-1,y-3,x+1,y,col); c:px(x-1,y-3,L.hx("ffffff")); c:px(x,y-4,col)
  end
  return c
end

-- Wooden barrel prop: 4 variants (upright / on-side / stacked / open) with depth.
function T.barrel(v)
  v = v or 1
  local c=L.canvas(32,32); grass_base(c,87+v,L.R.grass)
  local W=L.R.wood; local I=L.R.iron
  if v==1 then           -- upright
    c:groundshadow(16,28,7,2)
    c:fillrect(9,10,23,28,W[3]); c:vline(9,11,27,W[2]); c:vline(23,11,27,W[2]); c:vline(12,10,28,W[4]); c:vline(16,10,28,W[5])
    c:sphere(16,10,7,2,W,0.2)
    c:hline(9,23,13,I[3]); c:hline(9,23,14,I[2]); c:hline(9,23,24,I[3]); c:hline(9,23,25,I[2])
    c:outline(); c:coreshade()
  elseif v==2 then       -- lying on its side
    c:groundshadow(16,27,11,2.6)
    c:sphere(16,22,11,6,W)
    c:disc(7,22,2.4,5,W[2]); c:disc(25,22,2.4,5,W[5])           -- end caps
    c:vline(12,17,27,I[2]); c:vline(20,17,27,I[2])               -- hoops
    c:outline(); c:coreshade(); c:px(12,18,W[5])
  elseif v==3 then       -- stacked pair
    c:groundshadow(16,29,9,2.4)
    c:fillrect(11,16,21,29,W[3]); c:sphere(16,16,5,1.6,W,0.2); c:hline(11,21,19,I[2]); c:hline(11,21,26,I[2])
    c:fillrect(7,7,15,16,W[3]); c:sphere(11,7,4,1.4,W,0.2); c:hline(7,15,10,I[2]); c:hline(7,15,14,I[2])
    c:outline(); c:coreshade()
  else                   -- open barrel with apples
    c:groundshadow(16,28,7,2)
    c:fillrect(9,12,23,28,W[3]); c:vline(9,13,27,W[2]); c:vline(23,13,27,W[5])
    c:disc(16,12,7,2.2,L.hx("2a1c14"))
    for _,p in ipairs({{13,11},{18,11},{16,10}}) do c:sphere(p[1],p[2],2,1.6,L.R.redroof,0.1) end
    c:hline(9,23,15,I[3]); c:hline(9,23,25,I[3]); c:px(11,20,L.INK); c:px(11,22,L.INK)
    c:outline(); c:coreshade()
  end
  return c
end

return T
