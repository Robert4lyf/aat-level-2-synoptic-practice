-- Multi-tile BUILDING sprites for Ledger Legends (Storybook Ledger style).
-- Front-facing / gently oblique facades: light from TOP-LEFT, dark-plum ink
-- outline, hue-shifted ramp shading, soft ground shadow. Transparent RGBA
-- background (NO baked grass) — just the structure + a soft contact shadow.
--
-- Layout convention (matches the game's tile grid):
--   canvas W = footprint_w*32, H = (footprint_h+1)*32
--   the bottom row of the footprint is flush with the IMAGE BOTTOM;
--   the roof rises up into the extra top 1-tile overhang;
--   the door is centred on the footprint's bottom edge.
local DIR = "C:/Users/rober/Documents/aat_app/tools/aseprite/"
local L = dofile(DIR.."lib.lua")
local B = {}
local R = L.R

local function clampi(i,n) if i<1 then return 1 elseif i>n then return n end return i end
local function alpha(v) return app.pixelColor.rgbaA(v) end

-- Ink outline that only rings the OPAQUE silhouette (alpha==255). The soft
-- ground shadow is semi-transparent, so this leaves it un-ringed (a plain
-- outline() would draw a plum halo around the shadow ellipse).
local function ink_outline(c, col)
  col = col or L.INK
  local todo = {}
  local function solid(x,y) return alpha(c:get(x,y))==255 end
  for y=0,c.h-1 do for x=0,c.w-1 do
    if alpha(c:get(x,y))<255 then
      if solid(x-1,y) or solid(x+1,y) or solid(x,y-1) or solid(x,y+1) then
        todo[#todo+1] = {x,y}
      end
    end
  end end
  for _,p in ipairs(todo) do c:px(p[1],p[2],col) end
end

-- Soft contact shadow hugging the base, drifting to the lower-right (light TL).
local function base_shadow(c, W, H)
  c:groundshadow(W/2, H-1, W/2-2, 4)          -- stays inside the side margins
  c:groundshadow(W*0.58, H-2, W*0.30, 5)      -- extra pool to the shadow side
end

-- ---- walls ----------------------------------------------------------------
-- Shaded rectangular wall face: lit top/left edge, shadowed bottom/right, plus a
-- soft right-edge gradient so the box reads as a rounded volume (oblique cue).
local function wallface(c,x0,y0,x1,y1,ramp)
  c:fillrect(x0,y0,x1,y1,ramp[4])
  c:hline(x0,x1,y0,ramp[5]); c:vline(x0,y0,y1,ramp[5])
  c:hline(x0,x1,y1,ramp[2]); c:vline(x1,y0,y1,ramp[2])
  local span = x1-x0
  local s = x1-math.floor(span*0.30)
  for x=s,x1 do
    local a = math.floor(64*(x-s)/math.max(1,(x1-s)))
    for y=y0,y1 do c:blend(x,y,L.rgba(24,16,30,a)) end
  end
end

-- wall surface texturing over an already-painted wallface rect
local function tex_brick(c,x0,y0,x1,y1,ramp)
  for y=y0,y1,4 do
    c:hline(x0,x1,y,ramp[1])
    local off=(((y-y0)//4)%2)*4
    for x=x0+off,x1,8 do c:vline(x,y,math.min(y1,y+3),ramp[1]) end
  end
  for y=y0+1,y1 do for x=x0,x1 do
    if L.hash(x,y,7)>0.80 then c:px(x,y,ramp[3])
    elseif L.hash(x,y,9)<0.10 then c:px(x,y,ramp[2]) end
  end end
  c:hline(x0,x1,y0,ramp[5]); c:vline(x0,y0,y1,ramp[5])   -- keep lit edges crisp
end

local function tex_stone(c,x0,y0,x1,y1,ramp)
  local seed=3
  for y=y0,y1,6 do
    c:hline(x0,x1,y,ramp[1])
    local off=(((y-y0)//6)%2)*8
    for x=x0+off,x1,16 do c:vline(x,y,math.min(y1,y+5),ramp[1]) end
  end
  for y=y0+1,y1 do for x=x0,x1 do
    if L.vnoise(x,y,seed,4)>0.62 then c:px(x,y,ramp[4]) end
  end end
  c:hline(x0,x1,y0,ramp[5]); c:vline(x0,y0,y1,ramp[5])
end

-- Tudor cream wall with dark timber framing (corner posts, beams, braces).
local function tex_timber(c,x0,y0,x1,y1,creamR,woodR,floors)
  local T=woodR[1]
  -- corner posts + top/bottom plates
  c:fillrect(x0,y0,x0+1,y1,woodR[2]); c:fillrect(x1-1,y0,x1,y1,woodR[2])
  c:hline(x0,x1,y0,woodR[2]); c:hline(x0,x1,y0+1,woodR[2])
  -- floor bands
  floors = floors or {}
  for _,fy in ipairs(floors) do c:hline(x0,x1,fy,woodR[2]); c:hline(x0,x1,fy+1,woodR[1]) end
  -- diagonal braces in each panel corner (subtle)
  local function brace(px,py,dir)
    for i=0,4 do c:px(px+dir*i, py-i, woodR[1]) end
  end
  brace(x0+3,y1-2,1); brace(x1-3,y1-2,-1)
end

-- ---- roof -----------------------------------------------------------------
-- Trapezoid roof, ridge horizontal at the top; ridgeFrac→0 gives a gable
-- (triangle), →0.5 a hip. Shaded lighter toward the ridge and the (lit) left,
-- with banded shingle courses. `soffit` paints an eave shadow onto the wall.
local function roof(c, x0, x1, apexY, eaveY, ramp, ridgeFrac, wl, wr)
  ridgeFrac = ridgeFrac or 0.08
  local cx = (x0+x1)/2
  local eaveHalf = (x1-x0)/2
  local ridgeHalf = math.max(1, eaveHalf*ridgeFrac)
  local n=#ramp
  for y=apexY,eaveY do
    local t = (y-apexY)/math.max(1,(eaveY-apexY))
    local half = ridgeHalf + (eaveHalf-ridgeHalf)*t
    local lx = math.floor(cx-half+0.5); local rx = math.ceil(cx+half-0.5)
    local band = ((y-apexY)%4==0) and 0.13 or 0.0
    for x=lx,rx do
      local xf = (x-lx)/math.max(1,(rx-lx))
      local v = 0.88 - t*0.26 - xf*0.34 - band
      c:px(x,y, ramp[clampi(math.floor(v*(n-1)+0.5)+1,n)])
    end
    c:px(lx,y,ramp[math.min(n,5)]); c:px(rx,y,ramp[2])   -- barge-board edges
  end
  -- ridge cap (bright)
  local rl=math.floor(cx-ridgeHalf+0.5); local rr=math.ceil(cx+ridgeHalf-0.5)
  c:hline(rl,rr,apexY,ramp[n])
  -- eave: dark underline + overhang shadow onto the wall top (soffit)
  c:hline(x0,x1,eaveY,ramp[1])
  if wl then for x=wl,wr do c:blend(x,eaveY+1,L.rgba(18,12,24,120)); c:blend(x,eaveY+2,L.rgba(18,12,24,70)) end end
end

-- little gabled dormer poking through a roof slope
local function dormer(c, cx, baseY, w, h, roofR, frameR)
  local x0=cx-w//2; local x1=x0+w-1
  wallface(c,x0,baseY-h,x1,baseY,frameR)
  -- window
  c:fillrect(x0+1,baseY-h+1,x1-1,baseY-1,L.hx("ffe27a")); c:px(x0+2,baseY-h+2,L.hx("fff6d4"))
  -- tiny gable roof
  for i=0,w//2+1 do c:hline(x0-1+i, x1+1-i, baseY-h-1-i, roofR[math.min(#roofR,3+(i%2))]) end
  c:px(cx,baseY-h-1-(w//2+1),roofR[#roofR])
end

-- ---- fixtures -------------------------------------------------------------
local WARM   = L.hx("ffe27a")
local WARMHI = L.hx("fff6d4")
local GLASS  = L.hx("bfe0f0")
local GLASSHI= L.hx("dcf2fb")

-- lit cottage window with frame + glint
local function litwin(c,x0,y0,x1,y1,frameR)
  c:fillrect(x0,y0,x1,y1,WARM)
  c:rect(x0,y0,x1,y1,frameR[1])
  local mx=(x0+x1)//2; local my=(y0+y1)//2
  c:vline(mx,y0,y1,frameR[1]); c:hline(x0,x1,my,frameR[1])
  c:px(x0+1,y0+1,WARMHI)
end

-- glazed (daylight) paned window for shops/civic
local function paned(c,x0,y0,x1,y1,frameR)
  c:fillrect(x0,y0,x1,y1,GLASS)
  c:fillrect(x0,y0,(x0+x1)//2,(y0+y1)//2,GLASSHI)
  c:rect(x0-1,y0-1,x1+1,y1+1,frameR[1])
  local mx=(x0+x1)//2; local my=(y0+y1)//2
  c:vline(mx,y0,y1,frameR[1]); c:hline(x0,x1,my,frameR[1])
end

-- shutters flanking a window
local function shutters(c,x0,y0,x1,y1,ramp)
  c:fillrect(x0-3,y0,x0-1,y1,ramp[3]); c:vline(x0-3,y0,y1,ramp[4])
  c:fillrect(x1+1,y0,x1+3,y1,ramp[2]); c:vline(x1+3,y0,y1,ramp[1])
  for yy=y0+1,y1-1,2 do c:hline(x0-3,x0-1,yy,ramp[1]); c:hline(x1+1,x1+3,yy,ramp[1]) end
end

-- arched plank door, centred at cx with its threshold on botY
local function door(c, cx, botY, w, h, woodR, gold)
  local x0=cx-w//2; local x1=x0+w-1
  local topY=botY-h
  c:fillrect(x0,topY,x1,botY,woodR[2])
  -- rounded arch head
  for x=x0,x1 do
    local dx=(x-(x0+x1)/2)/math.max(1,((w-1)/2))
    local rise=math.floor((1-dx*dx)*2.6+0.5)
    c:vline(x,topY-rise,topY-1,woodR[2])
  end
  c:vline(x0-1,topY,botY,woodR[1]); c:vline(x1+1,topY,botY,woodR[1])   -- jambs
  c:vline(x0,topY,botY,woodR[3])                                        -- lit edge
  for x=x0+2,x1-1,3 do c:vline(x,topY,botY,woodR[1]) end                -- planks
  local ky=(topY+botY)//2
  c:px(x1-1,ky,gold[4]); c:px(x1-1,ky+1,gold[3])                        -- knob
  c:hline(x0-2,x1+2,botY,woodR[1])                                      -- threshold
end

-- brick chimney (topY..botY), lit cap
local function chimney(c,x,topY,botY,w,brickR)
  c:fillrect(x,topY,x+w,botY,brickR[2])
  c:vline(x,topY,botY,brickR[3]); c:vline(x+w,topY,botY,brickR[1])
  c:fillrect(x-1,topY,x+w+1,topY+1,brickR[4])                           -- cap
  for yy=topY+3,botY,3 do c:hline(x,x+w,yy,brickR[1]) end
end

-- rising smoke plume (drifts up-left), soft translucent puffs
local function smoke(c, x, y, scale)
  scale = scale or 1
  local puffs = {{0,0,4,96},{-2,-6,5,82},{-5,-13,6,66},{-9,-21,7,50},{-14,-30,8,34},{-20,-40,9,20}}
  for _,p in ipairs(puffs) do
    local rr=p[3]*scale
    for yy=math.floor(-rr),math.ceil(rr) do for xx=math.floor(-rr),math.ceil(rr) do
      local d=(xx*xx+yy*yy)/(rr*rr)
      if d<=1 then c:blend(x+p[1]*scale+xx, y+p[2]*scale+yy, L.rgba(230,228,234, math.floor(p[4]*(1-d)))) end
    end end
  end
end

-- striped shop awning: attaches at y, slopes forward to y+depth, scalloped fringe
local function awning(c, x0, x1, y, depth, colA, colB, edge)
  for i=0,depth do
    local yy=y+i
    for x=x0,x1 do
      local stripe = (((x-x0)//5)%2==0)
      c:px(x,yy, stripe and colA or colB)
    end
  end
  c:hline(x0,x1,y,edge)                                   -- lit top rail
  -- scalloped fringe along the front edge
  local fy=y+depth
  for x=x0,x1 do
    local ph=((x-x0)%5)
    local drop = (ph==2) and 3 or (ph==1 or ph==3) and 2 or 1
    local stripe=(((x-x0)//5)%2==0)
    for k=1,drop do c:px(x,fy+k, stripe and colA or colB) end
    c:px(x,fy+drop,edge)
  end
end

-- hanging shop sign on a wrought-iron bracket
local function hanging_sign(c, x, y, woodR, gold, label)
  local I=R.iron
  c:hline(x,x+7,y,I[3]); c:px(x,y,I[2])                   -- bracket arm
  c:vline(x+7,y,y+2,I[2])                                 -- hanger
  c:fillrect(x+3,y+3,x+11,y+11,woodR[3])                 -- board
  c:rect(x+3,y+3,x+11,y+11,woodR[1])
  c:hline(x+5,x+9,y+6,gold[3]); c:hline(x+5,x+9,y+9,gold[3])   -- gilt lettering
  c:px(x+7,y+2,gold[4])
end

-- ===========================================================================
--  HOUSES
-- ===========================================================================
-- Shared house facade builder. cfg fields:
--   W,H, roofR, wallR, wallStyle('timber'|'brick'|'stone'|'plain'),
--   creamR (for timber), eaveY, apexY, ridgeFrac, extras(fn c)
local function house(cfg)
  local W,H = cfg.W, cfg.H
  local c=L.canvas(W,H)
  base_shadow(c,W,H)
  local x0,x1 = 2, W-3
  local wl,wr = 6, W-7
  local eaveY = cfg.eaveY or 34
  local apexY = cfg.apexY or 3
  -- walls
  wallface(c, wl, eaveY-1, wr, H-1, cfg.wallR)
  if cfg.wallStyle=="brick" then tex_brick(c,wl,eaveY-1,wr,H-1,cfg.wallR)
  elseif cfg.wallStyle=="stone" then tex_stone(c,wl,eaveY-1,wr,H-1,cfg.wallR)
  elseif cfg.wallStyle=="timber" then tex_timber(c,wl,eaveY-1,wr,H-1,cfg.creamR,R.wood,cfg.floors) end
  -- roof over the top of the walls
  roof(c, x0, x1, apexY, eaveY, cfg.roofR, cfg.ridgeFrac, wl, wr)
  if cfg.extras then cfg.extras(c) end
  ink_outline(c); c:coreshade()
  return c
end

-- small 2x2 cottage (64x96)
local function cottage_small(roofR, blue)
  return house{
    W=64,H=96, roofR=roofR, wallR=R.cream, wallStyle="timber", creamR=R.cream,
    eaveY=34, apexY=3, ridgeFrac=0.06, floors={},
    extras=function(c)
      local W,H=64,96
      -- windows either side of the door
      litwin(c,12,44,21,55,R.wood); shutters(c,12,44,21,55,blue and R.blueroof or R.redroof)
      litwin(c,43,44,52,55,R.wood); shutters(c,43,44,52,55,blue and R.blueroof or R.redroof)
      -- door
      door(c, W//2, H-1, 12, 22, R.wood, R.gold)
      -- chimney rising into the overhang
      chimney(c, 45, 6, 22, 4, R.brick)
      -- flower box under a window
      c:fillrect(43,55,52,57,R.wood[2]); c:px(45,54,L.hx("ef476f")); c:px(48,54,L.hx("ffd166")); c:px(50,54,L.hx("6ea8e2"))
    end
  }
end
function B.house_small_1() return cottage_small(R.redroof,false) end   -- red-roof cottage
function B.house_small_2() return cottage_small(R.blueroof,true) end   -- blue-roof cottage

-- medium 3x2 (96x96)
function B.house_medium_1()   -- timber/cream walls, red roof
  return house{
    W=96,H=96, roofR=R.redroof, wallR=R.cream, wallStyle="timber", creamR=R.cream,
    eaveY=34, apexY=3, ridgeFrac=0.10, floors={62},
    extras=function(c)
      local W,H=96,96
      litwin(c,14,44,25,56,R.wood); shutters(c,14,44,25,56,R.redroof)
      litwin(c,71,44,82,56,R.wood); shutters(c,71,44,82,56,R.redroof)
      litwin(c,20,68,30,80,R.wood); litwin(c,66,68,76,80,R.wood)
      door(c, W//2, H-1, 14, 24, R.wood, R.gold)
      chimney(c, 74, 4, 22, 5, R.brick)
    end
  }
end
function B.house_medium_2()   -- brick walls, grey (slate) roof
  return house{
    W=96,H=96, roofR=R.stone, wallR=R.brick, wallStyle="brick",
    eaveY=34, apexY=3, ridgeFrac=0.12,
    extras=function(c)
      local W,H=96,96
      litwin(c,14,44,25,56,R.stone); litwin(c,71,44,82,56,R.stone)
      litwin(c,20,68,30,80,R.stone); litwin(c,66,68,76,80,R.stone)
      door(c, W//2, H-1, 14, 24, R.wood, R.gold)
      -- stone lintel + step over door
      c:hline(W//2-9,W//2+8,H-25,R.stone[4])
      chimney(c, 20, 4, 22, 5, R.brick); chimney(c, 72, 6, 22, 5, R.brick)
    end
  }
end

-- large 3x3 manor (96x128) with dormers
local function manor(roofR)
  return house{
    W=96,H=128, roofR=roofR, wallR=R.cream, wallStyle="timber", creamR=R.cream,
    eaveY=36, apexY=4, ridgeFrac=0.34, floors={68,100},
    extras=function(c)
      local W,H=96,128
      -- three window rows
      for _,wy in ipairs({46,78}) do
        litwin(c,14,wy,25,wy+12,R.wood); shutters(c,14,wy,25,wy+12,roofR)
        litwin(c,43,wy,52,wy+12,R.wood)
        litwin(c,71,wy,82,wy+12,R.wood); shutters(c,71,wy,82,wy+12,roofR)
      end
      -- grand door with fanlight
      door(c, W//2, H-1, 16, 30, R.wood, R.gold)
      c:fillrect(W//2-7,H-31,W//2+6,H-27,WARM); c:rect(W//2-7,H-31,W//2+6,H-27,R.wood[1])
      -- dormers through the roof
      dormer(c, 30, 34, 12, 8, roofR, R.cream)
      dormer(c, 66, 34, 12, 8, roofR, R.cream)
      -- chimneys
      chimney(c, 16, 4, 22, 5, R.brick); chimney(c, 76, 4, 22, 5, R.brick)
    end
  }
end
function B.house_large_1() return manor(R.redroof) end
function B.house_large_2() return manor(R.blueroof) end

-- ===========================================================================
--  SHOPS (3x2, 96x96)
-- ===========================================================================
function B.shop_1()   -- general store, green awning + hanging sign
  local awnA=L.hx("2f8c4f"); local awnB=L.hx("246b3c"); local awnE=L.hx("6fbf7f")
  return house{
    W=96,H=96, roofR=R.stone, wallR=R.cream, wallStyle="timber", creamR=R.cream,
    eaveY=32, apexY=4, ridgeFrac=0.44,
    extras=function(c)
      local W,H=96,96
      -- store sign board across the fascia
      c:fillrect(10,34,85,44,R.wood[2]); c:rect(10,34,85,44,R.wood[1]); c:hline(10,85,34,R.wood[4])
      c:hline(20,40,39,R.gold[3]); c:hline(46,74,39,R.gold[3])          -- "GENERAL STORE" gilt
      -- big display windows either side of the entrance
      paned(c,12,58,34,76,R.wood); paned(c,62,58,84,76,R.wood)
      -- glazed shop door
      c:fillrect(W//2-8,H-24,W//2+7,H-1,R.wood[2])
      c:fillrect(W//2-6,H-22,W//2+5,H-9,GLASS); c:fillrect(W//2-6,H-22,W//2,H-16,GLASSHI)
      c:rect(W//2-8,H-24,W//2+7,H-1,R.wood[1]); c:px(W//2+5,H-13,R.gold[4])
      -- awning above the windows/door
      awning(c, 8, 87, 48, 6, awnA, awnB, awnE)
      -- hanging sign
      hanging_sign(c, 74, 47, R.wood, R.gold)
      -- barrels / crate by the door
      c:fillrect(6,80,14,94,R.wood[3]); c:hline(6,14,83,R.iron[2]); c:hline(6,14,91,R.iron[2]); c:sphere(10,80,4,1.4,R.wood,0.2)
    end
  }
end
function B.shop_2()   -- bakery, red-striped awning
  local awnA=L.hx("d24d47"); local awnB=L.hx("f4ece0"); local awnE=L.hx("ff8a6a")
  return house{
    W=96,H=96, roofR=R.redroof, wallR=R.cream, wallStyle="timber", creamR=R.cream,
    eaveY=32, apexY=4, ridgeFrac=0.40,
    extras=function(c)
      local W,H=96,96
      c:fillrect(10,34,85,44,R.wood[2]); c:rect(10,34,85,44,R.wood[1]); c:hline(10,85,34,R.wood[4])
      c:hline(24,42,39,R.gold[3]); c:hline(50,70,39,R.gold[3])          -- "BAKERY"
      paned(c,12,58,34,76,R.wood); paned(c,62,58,84,76,R.wood)
      -- warm glow from the shop (bread on show)
      c:fillrect(14,68,32,75,L.hx("ffe9b0"))
      c:fillrect(W//2-8,H-24,W//2+7,H-1,R.wood[2])
      c:fillrect(W//2-6,H-22,W//2+5,H-9,WARM); c:px(W//2-4,H-20,WARMHI)
      c:rect(W//2-8,H-24,W//2+7,H-1,R.wood[1]); c:px(W//2+5,H-13,R.gold[4])
      awning(c, 8, 87, 48, 6, awnA, awnB, awnE)
      -- hanging pretzel/bread sign
      hanging_sign(c, 74, 47, R.wood, R.gold)
      c:sphere(80,52,2,2,R.gold,0.2)                                    -- golden bread on the sign
      -- little chimney (oven) with a wisp of smoke
      chimney(c, 20, 4, 20, 5, R.brick); smoke(c, 22, 4, 0.7)
    end
  }
end

-- ===========================================================================
--  TOWN HALLS (4x3, 128x128)
-- ===========================================================================
-- civic stone facade shared core
local function civic(cfg)
  local W,H=128,128
  local c=L.canvas(W,H)
  base_shadow(c,W,H)
  local wl,wr=8,W-9
  local eaveY=cfg.eaveY or 40
  wallface(c, wl, eaveY-1, wr, H-1, R.stone)
  tex_stone(c, wl, eaveY-1, wr, H-1, R.stone)
  -- string courses between floors
  for _,fy in ipairs({74,104}) do c:hline(wl,wr,fy,R.stone[2]); c:hline(wl,wr,fy+1,R.stone[5]) end
  -- roof
  roof(c, 3, W-4, 6, eaveY, cfg.roofR, 0.55, wl, wr)
  if cfg.extras then cfg.extras(c) end
  ink_outline(c); c:coreshade()
  return c
end

function B.town_hall_1()   -- civic hall: portico + flag
  return civic{
    roofR=R.redroof, eaveY=40,
    extras=function(c)
      local W,H=128,128
      -- rows of tall arched windows
      for _,wx in ipairs({16,40,86,110}) do
        paned(c,wx,50,wx+16,72,R.stone)
        for x=wx-1,wx+17 do local dx=(x-(wx+8))/9; c:vline(x,48-math.floor((1-dx*dx)*3),49,R.stone[3]) end
      end
      for _,wx in ipairs({16,40,86,110}) do paned(c,wx,82,wx+16,100,R.stone) end
      -- central portico: pediment on four columns
      local px0,px1=48,80
      -- steps
      for i=0,3 do c:hline(px0-2-i,px1+2+i,H-1-i,R.stone[math.min(5,3+i)]) end
      -- columns
      for _,cxp in ipairs({50,60,68,78}) do
        c:fillrect(cxp,H-30,cxp+2,H-5,R.stone[4]); c:vline(cxp,H-30,H-5,R.stone[5]); c:vline(cxp+2,H-30,H-5,R.stone[2])
      end
      -- entablature + triangular pediment
      c:fillrect(px0-2,H-34,px1+2,H-30,R.stone[3])
      for i=0,16 do c:hline(px0-2+i,px1+2-i,H-35-i,R.stone[math.min(5,3+i%2)]) end
      c:px((px0+px1)//2,H-35-16,R.stone[5])
      -- civic door in the portico
      door(c, W//2, H-5, 16, 26, R.wood, R.gold)
      -- flag flying from the ridge apex (blue pennant + gold trim reads over the red roof)
      local fx=W//2
      c:vline(fx,0,10,R.iron[2]); c:px(fx,0,R.gold[4])          -- pole + finial
      for i=0,6 do c:hline(fx+1, fx+1+(6-i), 2+i, (i%2==0) and R.blueroof[4] or R.blueroof[3]) end
      c:hline(fx+1,fx+7,2,R.gold[3])                            -- gilt top edge
      -- civic clock set into the pediment tympanum
      c:sphere(W//2,H-42,4,4,R.cream,0.15)
      c:px(W//2,H-46,L.INK); c:px(W//2,H-38,L.INK); c:px(W//2-4,H-42,L.INK); c:px(W//2+4,H-42,L.INK)
      c:vline(W//2,H-44,H-42,L.INK); c:px(W//2+1,H-41,L.INK)    -- hands
    end
  }
end

function B.town_hall_2()   -- town hall with clock tower
  return civic{
    roofR=R.blueroof, eaveY=44,
    extras=function(c)
      local W,H=128,128
      for _,wx in ipairs({16,38,74,98}) do
        paned(c,wx,54,wx+14,74,R.stone)
        paned(c,wx,84,wx+14,102,R.stone)
      end
      -- central entrance
      door(c, W//2, H-1, 16, 28, R.wood, R.gold)
      c:fillrect(W//2-10,H-30,W//2+9,H-28,R.stone[4])         -- lintel
      paned(c,W//2-9,H-52,W//2-2,H-34,R.stone); paned(c,W//2+2,H-52,W//2+9,H-34,R.stone)
      -- CLOCK TOWER rising from the roof centre
      local tx0,tx1=W//2-13,W//2+12
      c:fillrect(tx0,10,tx1,46,R.stone[4])                    -- tower shaft
      wallface(c,tx0,10,tx1,46,R.stone); tex_stone(c,tx0,12,tx1,46,R.stone)
      -- belfry openings
      paned(c,tx0+3,26,tx0+9,40,R.stone); paned(c,tx1-9,26,tx1-3,40,R.stone)
      -- clock face
      c:sphere(W//2,20,7,7,R.cream,0.15)
      c:px(W//2,14,L.INK); c:px(W//2,26,L.INK); c:px(W//2-6,20,L.INK); c:px(W//2+6,20,L.INK)
      c:vline(W//2,16,20,L.INK); c:hline(W//2,W//2+4,20,L.INK)   -- hands
      -- tower cap roof (pyramid) + gold finial
      for i=0,10 do c:hline(tx0-1+i,tx1+1-i,9-i,R.blueroof[math.min(5,3+i%2)]) end
      c:px(W//2,-1<0 and 0 or 0,R.gold[4]); c:vline(W//2,0,3,R.gold[3]); c:px(W//2,0,R.gold[5])
    end
  }
end

-- ===========================================================================
--  FACTORIES (4x3, 128x128)
-- ===========================================================================
function B.factory_1()   -- brick mill + smoking chimney
  local W,H=128,128
  local c=L.canvas(W,H)
  base_shadow(c,W,H)
  local wl,wr=8,W-9
  local eaveY=40
  wallface(c, wl, eaveY-1, wr, H-1, R.brick)
  tex_brick(c, wl, eaveY-1, wr, H-1, R.brick)
  -- shallow slate roof (low pitch)
  roof(c, 4, W-5, 22, eaveY, R.stone, 0.62, wl, wr)
  -- riveted iron string course
  c:fillrect(wl,72,wr,75,R.iron[3]); c:hline(wl,wr,72,R.iron[4]); c:hline(wl,wr,75,R.iron[1])
  for x=wl+3,wr,9 do c:sphere(x,73,1,1,R.iron[5],0.3) end
  -- rows of tall industrial windows (cool glazing, many panes)
  local function bigwin(x0,y0,x1,y1)
    c:fillrect(x0,y0,x1,y1,GLASS); c:fillrect(x0,y0,(x0+x1)//2,(y0+y1)//2,GLASSHI)
    c:rect(x0-1,y0-1,x1+1,y1+1,R.iron[1])
    for x=x0+4,x1,5 do c:vline(x,y0,y1,R.iron[1]) end
    for y=y0+4,y1,5 do c:hline(x0,x1,y,R.iron[1]) end
    for x=x0,x1 do local dx=(x-(x0+x1)/2)/((x1-x0)/2); c:vline(x,y0-1-math.floor((1-dx*dx)*3),y0-1,R.brick[4]) end -- arch
  end
  bigwin(16,50,32,68); bigwin(40,50,56,68); bigwin(88,50,104,68)
  bigwin(16,84,32,102); bigwin(40,84,56,102); bigwin(88,84,104,102)
  -- big factory doors (central loading)
  c:fillrect(W//2-14,H-34,W//2+13,H-1,R.wood[2])
  c:vline(W//2,H-34,H-1,R.wood[1]); c:rect(W//2-14,H-34,W//2+13,H-1,R.wood[1])
  for x=W//2-12,W//2+11,4 do c:vline(x,H-32,H-3,R.wood[1]) end
  c:fillrect(W//2-14,H-34,W//2+13,H-31,R.gold[3]); for x=W//2-14,W//2+13,4 do c:vline(x,H-34,H-31,L.INK) end  -- hazard stripe
  -- tall smoking chimney (right side)
  local cx=104
  c:fillrect(cx,2,cx+11,eaveY,R.brick[2]); c:vline(cx,2,eaveY,R.brick[3]); c:vline(cx+11,2,eaveY,R.brick[1])
  for yy=6,eaveY,4 do c:hline(cx,cx+11,yy,R.brick[1]) end
  c:fillrect(cx-1,2,cx+12,5,R.brick[4]); c:fillrect(cx-1,2,cx+12,3,R.iron[3])   -- capstone band
  ink_outline(c); c:coreshade()
  smoke(c, cx+5, 0, 1.15)                                     -- plume over the outline
  return c
end

function B.factory_2()   -- steel works
  local W,H=128,128
  local c=L.canvas(W,H)
  base_shadow(c,W,H)
  local wl,wr=8,W-9
  local eaveY=42
  -- steel-panel walls
  wallface(c, wl, eaveY-1, wr, H-1, R.steel)
  for x=wl,wr,10 do c:vline(x,eaveY-1,H-1,R.steel[2]); c:vline(x+1,eaveY-1,H-1,R.steel[5]) end  -- vertical ribs
  -- riveted iron bands
  for _,by in ipairs({66,98}) do
    c:fillrect(wl,by,wr,by+3,R.iron[3]); c:hline(wl,wr,by,R.iron[5]); c:hline(wl,wr,by+3,R.iron[1])
    for x=wl+2,wr,8 do c:sphere(x,by+1,1,1,R.iron[5],0.3) end
  end
  -- corrugated sawtooth roof (steel ribs)
  for x=4,W-5 do
    local rib = ((x)%6)
    local top = 14 + ((rib<3) and 0 or 2)
    for y=top,eaveY do
      local xf=(y-top)/(eaveY-top)
      c:px(x,y, R.steel[clampi(5-math.floor(xf*3)-((rib==0) and 0 or 1),5)])
    end
  end
  c:hline(4,W-5,eaveY,R.iron[1]); c:hline(4,W-5,14,R.steel[5])
  -- big steel windows
  local function swin(x0,y0,x1,y1)
    c:fillrect(x0,y0,x1,y1,R.crystal[2]); c:fillrect(x0,y0,(x0+x1)//2,(y0+y1)//2,R.crystal[4])
    c:rect(x0-1,y0-1,x1+1,y1+1,R.iron[1])
    for x=x0+4,x1,5 do c:vline(x,y0,y1,R.iron[1]) end
    for y=y0+4,y1,5 do c:hline(x0,x1,y,R.iron[1]) end
  end
  swin(16,50,34,62); swin(44,50,62,62); swin(90,50,108,62)
  swin(16,74,34,90); swin(90,74,108,90)
  -- roll-up steel door
  c:fillrect(W//2-16,H-40,W//2+15,H-1,R.iron[3])
  for yy=H-38,H-3,3 do c:hline(W//2-16,W//2+15,yy,R.iron[1]) end
  c:rect(W//2-16,H-40,W//2+15,H-1,R.iron[1])
  c:fillrect(W//2-16,H-40,W//2+15,H-37,R.gold[3]); for x=W//2-16,W//2+15,5 do c:vline(x,H-40,H-37,L.INK) end
  -- twin short chimney stacks + a vent, each smoking a little
  for _,sx in ipairs({30,54}) do
    c:fillrect(sx,4,sx+7,eaveY,R.iron[3]); c:vline(sx,4,eaveY,R.iron[4]); c:vline(sx+7,4,eaveY,R.iron[1])
    c:fillrect(sx-1,4,sx+8,7,R.iron[2])
  end
  -- cylindrical water/steel tank on the right
  c:sphere(104,26,13,10,R.steel); c:fillrect(91,26,117,eaveY,R.steel[3])
  c:vline(91,26,eaveY,R.steel[2]); c:vline(117,26,eaveY,R.steel[5])
  c:hline(93,115,20,R.steel[5]); c:hline(93,115,33,R.steel[2])
  ink_outline(c); c:coreshade()
  smoke(c, 33, 2, 0.7); smoke(c, 57, 2, 0.6)
  return c
end

return B
