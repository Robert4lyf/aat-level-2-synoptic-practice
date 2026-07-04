-- 160x96 battle backdrops for Ledger Legends (Storybook Ledger style).
local DIR = "C:/Users/rober/Documents/aat_app/tools/aseprite/"
local L = dofile(DIR.."lib.lua")
local S = {}
local W,H = 160,96

local function lerp(a,b,t) return math.floor(a+(b-a)*t+0.5) end
local function mixc(c1,c2,t)
  return L.rgba(lerp(app.pixelColor.rgbaR(c1),app.pixelColor.rgbaR(c2),t),
                lerp(app.pixelColor.rgbaG(c1),app.pixelColor.rgbaG(c2),t),
                lerp(app.pixelColor.rgbaB(c1),app.pixelColor.rgbaB(c2),t))
end
local function hash(x,y,s)
  local v=(x*374761393+y*668265263+(s or 0)*2246822519)
  v=(v~(v>>13))*1274126177; v=(v~(v>>16)); return (v%100000)/100000.0
end
local function skygrad(c, top, bot, y0, y1)
  for y=y0,y1 do local t=(y-y0)/math.max(1,(y1-y0))
    c:hline(0,W-1,y, mixc(top,bot,t)) end
end

-- rounded tree silhouette
local function tree(c, x, base, r, R, tint)
  c:fillrect(x-1, base-r, x+1, base, L.R.wood[2])
  c:sphere(x, base-r-r*0.6, r, r, R, tint or 0)
end

function S.forest()
  local c=L.canvas(W,H)
  skygrad(c, L.hx("8fd0f0"), L.hx("d9f2e0"), 0, 58)
  -- sun glow
  c:sphere(128,18,10,10, {L.hx("fff6c8")}, 0);
  for r=10,22 do for a=0,23 do local ang=a/24*6.283
    c:blend(128+math.cos(ang)*r,18+math.sin(ang)*r, L.rgba(255,246,200,math.max(0,26-r))) end end
  -- clouds
  for _,cl in ipairs({{30,16,7},{70,26,6},{104,12,5}}) do
    c:sphere(cl[1],cl[2],cl[3]*1.6,cl[3],{L.hx("ffffff")}); c:sphere(cl[1]+cl[3],cl[2]+1,cl[3],cl[3]*0.8,{L.hx("eef6ff")}) end
  -- distant tree band (hazy)
  for x=-4,W+4,14 do tree(c, x, 60, 12, {mixc(L.hx("6ea86a"),L.hx("cfeecb"),0.4)}) end
  -- mid trees
  for _,tx in ipairs({14,52,150}) do tree(c, tx, 66, 16, L.R.canopy, 0.05) end
  -- ground
  skygrad(c, L.hx("5aa24a"), L.hx("3f7d3a"), 58, H-1)
  for y=58,H-1 do for x=0,W-1 do if hash(x//2,y//2,1)>0.86 then c:px(x,y,L.hx("7cc65f")) elseif hash(x//2,y//2,2)<0.12 then c:px(x,y,L.hx("2e5e2f")) end end end
  -- path curving to horizon
  for y=60,H-1 do local t=(y-60)/(H-60); local cxp=80; local hw=lerp(4,26,t)
    c:hline(cxp-hw,cxp+hw,y, mixc(L.hx("c4a266"),L.hx("dcbe82"),t)) end
  -- near bushes framing
  c:sphere(10,H-4,16,12,L.R.canopy,-0.1); c:sphere(150,H-2,18,14,L.R.canopy,-0.1)
  return c
end

function S.cave()
  local c=L.canvas(W,H)
  skygrad(c, L.hx("14162a"), L.hx("232a44"), 0, H-1)
  -- rock walls vignette
  for y=0,H-1 do for x=0,W-1 do
    local edge=math.min(x,W-1-x)/40 + math.min(y,H-1-y)/30
    if edge<1 and hash(x,y,3)>edge*0.7 then c:px(x,y, mixc(L.hx("0c0e18"),L.hx("2a3050"),hash(x,y,4))) end
  end end
  -- stalactites (top) and stalagmites (bottom)
  local Sr=L.R.stone
  for _,sx in ipairs({12,34,60,92,120,148}) do
    local ln=8+math.floor(hash(sx,0,5)*10)
    for i=0,ln do local ww=math.max(0,math.floor((ln-i)*0.28)); c:hline(sx-ww,sx+ww,i, Sr[2]) end
    c:vline(sx,0,ln,Sr[3])
  end
  for _,sx in ipairs({24,76,110,140}) do
    local ln=6+math.floor(hash(sx,1,6)*8)
    for i=0,ln do local ww=math.max(0,math.floor((ln-i)*0.3)); c:hline(sx-ww,sx+ww,H-1-i,Sr[2]) end
  end
  -- glowing crystals
  for _,cr in ipairs({{40,70},{112,74},{72,80},{92,66}}) do
    local x,y=cr[1],cr[2]
    for r=1,7 do for a=0,15 do local ang=a/16*6.283
      c:blend(x+math.cos(ang)*r*1.3,y+math.sin(ang)*r, L.rgba(90,200,240,math.max(0,30-r*4))) end end
    for i=0,4 do c:vline(x-2+i,y,y-3-((i%2)*3),L.R.crystal[math.min(5,2+i%3)]) end
    c:px(x,y-6,L.hx("dbf6ff"))
  end
  -- underground pool
  c:disc(80,H-6,34,6,L.hx("123a4a"))
  c:disc(80,H-7,30,4,L.R.water[2])
  for x=52,108,4 do c:px(x,H-8,L.R.crystal[4]) end
  return c
end

function S.factory()
  local c=L.canvas(W,H)
  skygrad(c, L.hx("241a3a"), L.hx("5a3a6a"), 0, 56)
  -- moon
  c:sphere(28,20,9,9,{L.hx("f4ecd7")}); c:sphere(24,17,7,7,L.hx("241a3a"))
  for i=1,40 do local x=math.floor(hash(i,7,8)*W); local y=math.floor(hash(i,8,9)*50)
    c:px(x,y,L.hx("cfd8ff")) end
  -- factory silhouette buildings
  local B=L.R.iron
  local function bld(x0,x1,top)
    c:fillrect(x0,top,x1,60, B[1])
    for wy=top+3,58,6 do for wx=x0+2,x1-2,5 do if hash(wx,wy,10)>0.35 then c:fillrect(wx,wy,wx+2,wy+2,L.hx("ffcf5a")) end end end
    c:hline(x0,x1,top,B[2])
  end
  bld(6,44,30); bld(48,86,20); bld(90,120,36); bld(124,156,26)
  -- smokestacks + smoke
  for _,sx in ipairs({58,100}) do
    c:fillrect(sx,8,sx+5,24,B[2]); c:fillrect(sx,8,sx+5,10,L.R.redroof[2])
    for i=0,3 do c:sphere(sx+2, 6-i*2, 3+i, 2+i, {L.rgba(120,110,140,150-i*30)}) end
  end
  -- ground: metal floor with pipes
  c:fillrect(0,56,W-1,H-1, L.R.iron[2])
  for y=56,H-1 do for x=0,W-1 do if hash(x//2,y//2,11)>0.85 then c:px(x,y,L.R.iron[3]) end end end
  c:hline(0,W-1,56,L.R.iron[4]); c:hline(0,W-1,57,L.R.iron[1])
  -- big pipe + gear (accounting machine hint)
  c:fillrect(0,74,W-1,80,L.R.steel[2]); c:hline(0,W-1,74,L.R.steel[4]); c:hline(0,W-1,80,L.R.steel[1])
  c:sphere(134,64,10,10,L.R.steel); c:disc(134,64,4,4,L.R.iron[1])
  for a=0,11 do local ang=a/12*6.283; c:fillrect(134+math.cos(ang)*11-1,64+math.sin(ang)*11-1,134+math.cos(ang)*11+1,64+math.sin(ang)*11+1,L.R.steel[3]) end
  return c
end

function S.town()
  local c=L.canvas(W,H)
  skygrad(c, L.hx("bfe6f4"), L.hx("ffe9c8"), 0, 54)
  for _,cl in ipairs({{36,14,7},{112,20,6},{140,10,5}}) do
    c:sphere(cl[1],cl[2],cl[3]*1.7,cl[3],{L.hx("ffffff")}) end
  -- distant hills
  c:sphere(30,60,50,18,L.R.meadow,0.1); c:sphere(120,62,60,20,L.R.meadow,0.05)
  -- row of shop buildings
  local function shop(x0,w,roof)
    c:fillrect(x0,40,x0+w,60,L.R.wood[4])
    for i=0,6 do c:hline(x0-2+i, x0+w+2-i, 40-6+i, roof[math.min(#roof,3+i%2)]) end
    c:fillrect(x0+w//2-2,50,x0+w//2+2,60,L.R.wood[2]) -- door
    c:fillrect(x0+2,44,x0+5,47,L.hx("ffe27a")); c:fillrect(x0+w-5,44,x0+w-2,47,L.hx("ffe27a"))
  end
  shop(8,30,L.R.redroof); shop(46,26,L.R.blueroof); shop(96,30,L.R.redroof); shop(132,22,L.R.gold)
  -- market tents (striped)
  local function tent(x, col)
    for i=0,7 do c:hline(x-10+i, x+10-i, 46+i, (i%2==0) and col or L.hx("fff2d4")) end
    c:fillrect(x-10,54,x+10,62,L.hx("f4e6c4"))
  end
  tent(80, L.R.redroof[3]);
  -- bunting across
  for x=4,W-4,10 do local col=({L.hx("d24d47"),L.hx("4380cb"),L.hx("e2aa2e")})[((x//10)%3)+1]
    c:px(x,26,L.INK); for i=0,3 do c:hline(x-i,x+i,27+i,col) end end
  c:hline(0,W-1,26,L.hx("6b4526"))
  -- cobble ground
  skygrad(c, L.hx("a8854f"), L.hx("8a6a3f"), 60, H-1)
  for y=62,H-1,4 do for x=(y//4%2)*4,W-1,8 do c:rect(x,y,x+7,y+3,L.R.dirt[2]); c:px(x+1,y+1,L.R.dirt[4]) end end
  -- central fountain
  c:sphere(80,H-6,20,6,L.R.stone); c:disc(80,H-8,14,3,L.R.water[2]); c:sphere(80,H-10,3,4,L.R.water[4],0.2)
  return c
end

return S
