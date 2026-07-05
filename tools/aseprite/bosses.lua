-- Ledger Legends topic-BOSSES + wild encounters. Deliberately fearsome (not the
-- cute cast style): dark high-contrast palettes, glowing eyes, fangs, spikes,
-- looming silhouettes. Bosses are 64x64 front-facing, 2-frame idle (menace tell).
-- Wilds are ~40x40. Uses the shared lib.lua primitives (sphere/outline/etc).
local DIR = "C:/Users/rober/Documents/aat_app/tools/aseprite/"
local L = dofile(DIR.."lib.lua")
local B = {}
local WHITE = L.hx("ffffff")
local INK = L.INK
local function R(...) local t={} for _,s in ipairs({...}) do t[#t+1]=L.hx(s) end return t end

-- glowing eye: dark socket + bright core + hot centre
local function glowEye(c, x, y, col, big)
  local rimr = big and 4 or 3
  c:disc(x,y, rimr, rimr, L.hx("0a0a12"))            -- dark socket
  local gr = big and 3 or 2
  c:disc(x,y, gr, gr, col)                            -- bright core
  c:px(x, y, WHITE)                                   -- hot centre
end
-- softer helper: colored glow bleed around a point
local function glow(c, x, y, hex, r)
  local rr,gg,bb = math.floor(tonumber(hex:sub(1,2),16)), math.floor(tonumber(hex:sub(3,4),16)), math.floor(tonumber(hex:sub(5,6),16))
  for yy=-r,r do for xx=-r,r do local d=xx*xx+yy*yy
    if d<=r*r then c:blend(x+xx,y+yy, L.rgba(rr,gg,bb, math.max(0, 90-d*18))) end end end
end
local function fang(c, x, y, h)              -- downward white fang
  for i=0,(h or 2) do local w=math.max(0,(h or 2)-i-1); c:hline(x-w,x+w, y+i, WHITE) end
end
local function claw(c, x, y, dir)            -- 3 talons
  for i=-1,1 do c:vline(x+i*2, y, y+3, L.hx("d8d2c4")); c:px(x+i*2, y+4, L.hx("f0ece0")) end
end

-- ============================ BOSSES (64x64) ============================

-- itbk — Papyrus Wyrm: looming ink-dragon, long fanged maw, tattered wings
function B.wyrm(frame)
  local c=L.canvas(64,64); local flare = frame==1
  local S=R("0a1c12","12301e","1e4a2c","2f6a3e","4a8f52")   -- deep scale green
  local WB=R("2a2418","3f3524","5a4a30")                    -- dark tattered wing
  c:groundshadow(32,60,21,4)
  -- tattered bat-membrane wings (behind, jagged)
  for side=-1,1,2 do local wx=32+side*16
    c:vline(32+side*12,16,42,WB[1])                          -- main spar
    for k=0,3 do local sx=32+side*(12+k*4); c:vline(sx, 20+k*2, 40-k*3, WB[1]) end -- finger spars
    for k=0,2 do for j=0,2 do c:px(32+side*(13+k*4+j),  40-k*3, WB[2]) end end      -- jagged trailing edge
    for yy=18,38,2 do c:hline(math.min(32+side*12,32+side*24), math.max(32+side*12,32+side*24), yy, WB[2]) end
  end
  -- hunched coiled body
  c:sphere(32,45,17,13, S)
  c:sphere(30,47,9,8, R("14301e","20482c","2f6a3e"),0.1)    -- lit belly scutes
  glow(c,31,47,"d8f048",5); c:hline(28,34,46,L.hx("e8ff58")); c:vline(31,43,50,L.hx("e8ff58")) -- £ rune
  -- thick neck + elongated dragon head thrust forward
  c:sphere(32,32,8,8, S)
  c:sphere(32,20,12,9, S)                                    -- broad skull
  -- brow ridge / horns swept back
  for side=-1,1,2 do for i=0,7 do c:px(32+side*(7+i*0.6), 11-i, i%2==0 and S[1] or S[2]) end
    c:px(32+side*13, 4, S[2]) end
  for i=0,4 do c:px(30-i%2, 27+i*2, S[1]); c:px(33+i%2,27+i*2,S[1]) end   -- neck spikes
  -- long snarling maw (juts forward/down), rows of fangs
  local jaw = flare and 32 or 29
  c:fillrect(21,22,43,jaw, L.hx("07060a"))                   -- black maw cavity
  c:sphere(32, jaw-2, 11, 4, S, 0.05)                        -- lower jaw
  for x=22,42,3 do fang(c,x,22,3) end                        -- big upper fangs
  for x=23,41,4 do local w=1; c:hline(x-1,x+1, jaw-2, WHITE); c:px(x, jaw-3, WHITE) end -- lower fangs
  -- ink drooling
  c:vline(26, jaw-1, jaw+4, L.hx("0a0812")); c:vline(38, jaw-1, jaw+5, L.hx("0a0812")); c:px(38,jaw+6,L.hx("18141f"))
  -- forelimb claws
  claw(c,17,50); claw(c,47,50)
  c:outline()
  -- deep-set glowing acid eyes under the brow (angry, wide-set)
  local ec = flare and L.hx("eaff6a") or L.hx("b8dc30")
  c:fillrect(22,15,30,19,L.hx("05100a")); c:fillrect(34,15,42,19,L.hx("05100a")) -- shadowed sockets
  glow(c,26,17,"d8f048",flare and 4 or 3); glow(c,38,17,"d8f048",flare and 4 or 3)
  glowEye(c,26,17,ec,flare); glowEye(c,38,17,ec,flare)
  c:hline(22,29,14,L.hx("081a10")); c:px(29,15,L.hx("081a10"))  -- angled brows
  c:hline(35,42,14,L.hx("081a10")); c:px(35,15,L.hx("081a10"))
  return c
end

-- pobc — Adding-Machine Golem: hulking iron colossus, angry red error-face
function B.golem(frame)
  local c=L.canvas(64,64); local flare=frame==1
  local I=R("0e121c","1a2030","2c3550","44506e","5a6884")
  local BR=R("6a4a12","9a7020","c69a34")                     -- brass
  local RED=R("5a1018","8a1f2c","d83040")
  c:groundshadow(32,60,21,4)
  c:fillrect(19,44,29,58,I[2]); c:fillrect(35,44,45,58,I[2]); c:sphere(23,58,7,3,I,-0.1); c:sphere(41,58,7,3,I,-0.1)
  -- massive hunched chassis
  c:fillrect(12,24,52,48,I[2]); c:sphere(32,36,21,15,I)
  for _,p in ipairs({{15,26},{49,26},{15,46},{49,46},{32,44}}) do c:sphere(p[1],p[2],2,2,I[3],0.3) end -- rivets
  -- shoulder spikes (menace)
  for side=-1,1,2 do for i=0,4 do c:px(32+side*(18+i), 24-i, I[1]) end end
  -- number-key torso grid + glowing red core
  for ky=0,2 do for kx=0,3 do c:fillrect(21+kx*6,32+ky*5, 25+kx*6,35+ky*5, I[3]); c:px(22+kx*6,33+ky*5, BR[3]) end end
  glow(c,32,40,"d83040",4); c:disc(32,40,2,2, flare and L.hx("ff5a68") or RED[3])   -- reactor core
  -- crank + paper-tape tongue + heavy fists
  c:fillrect(6,30,13,46,I[2]); c:sphere(9,48,4,4,I[3],0.1); c:sphere(11,48,2,2,BR,0.2)
  c:fillrect(47,26,60,30,L.hx("d8d2c0")); for i=0,5 do c:px(49+i*2,28,I[1]) end
  c:sphere(54, flare and 42 or 44, 6,7,I); c:fillrect(50,42,60,52,I[2])   -- raised right fist (tell)
  c:sphere(10,46,6,7,I)
  -- head: heavy iron skull-casing with a dark screen face
  c:fillrect(21,6,43,27,I[2]); c:sphere(32,16,12,10,I)
  c:fillrect(23,4,41,9, I[1])                                -- heavy brow slab
  for side=-1,1,2 do c:px(32+side*11, 4, I[1]); c:px(32+side*12,5,I[1]) end   -- horns
  c:fillrect(24,11,40,23, L.hx("0a0f0a"))                    -- dark screen
  c:vline(23,3,9,I[3]); c:sphere(23,2,2,2, flare and L.R.ember or RED, 0.3)   -- antenna warning
  c:outline()
  -- angry slanted red eyes + jagged grille frown
  local ec = flare and L.hx("ff5a68") or L.hx("d83040")
  glow(c,27,15,"d83040",flare and 4 or 3); glow(c,37,15,"d83040",flare and 4 or 3)
  c:fillrect(25,15,29,17, ec); c:px(25,14,ec); c:fillrect(35,15,39,17, ec); c:px(39,14,ec)  -- slant
  c:px(26,15,L.hx("ffb0b8")); c:px(38,15,L.hx("ffb0b8"))
  c:hline(24,29,13,L.hx("040604")); c:hline(35,40,13,L.hx("040604"))          -- brow shadow
  for i=0,4 do local yy = (i%2==0) and 21 or 20; c:vline(26+i*3,19,yy,RED[2]) end  -- jagged grille frown
  return c
end

-- poc — Cost Chimera: hulking three-headed patchwork beast, three fanged maws
function B.chimera(frame)
  local c=L.canvas(64,64); local flare=frame==1
  local P=R("1a0c30","2e1650","4a2578","6a3aa4","8a5ac8")   -- deep purple
  c:groundshadow(32,60,21,4)
  c:sphere(32,46,18,13, P)                                  -- hunched body
  c:sphere(31,48,9,7, R("22103c","36195c","4a2578"),0.1)
  for side=-1,1,2 do for i=0,4 do c:px(32+side*(15+i),34-i, P[1]) end end  -- back spikes
  -- OAR gauge on flank
  c:disc(50,46,4,4,L.hx("140a1c")); c:disc(50,46,3,3,L.hx("c8b0e0")); c:vline(50,44,46,L.hx("8a1f2c")); c:px(51,45,L.hx("8a1f2c"))
  claw(c,16,52); claw(c,48,52)
  local ec = flare and L.hx("ff7ab0") or L.hx("ff4a98")
  local function head(hx,hy,decorate)
    c:sphere(hx,hy+6,5,6,P)                                 -- neck
    c:sphere(hx,hy,9,8,P)                                   -- skull
    decorate()
    local jaw = flare and hy+7 or hy+5
    c:fillrect(hx-6,hy+2,hx+6,jaw, L.hx("08060e"))          -- black maw
    for x=hx-5,hx+5,3 do fang(c,x,hy+2,3) end               -- upper fangs
    for x=hx-4,hx+4,4 do c:px(x,jaw-1,WHITE); c:px(x,jaw-2,WHITE) end -- lower fangs
    c:fillrect(hx-8,hy-6,hx-2,hy-3,L.hx("0a0614")); c:fillrect(hx+2,hy-6,hx+8,hy-3,L.hx("0a0614")) -- sockets
    glow(c,hx-4,hy-4,"ff4a98",flare and 3 or 2); glow(c,hx+4,hy-4,"ff4a98",flare and 3 or 2)
    glowEye(c,hx-4,hy-4,ec,flare); glowEye(c,hx+4,hy-4,ec,flare)
    c:hline(hx-8,hx-2,hy-8,L.hx("14081f")); c:hline(hx+2,hx+8,hy-8,L.hx("14081f")) -- brows
  end
  -- left head: materials (timber horns)
  head(16,24,function() local M=R("2a1810","4a2e18","6a4426"); for side=-1,1,2 do c:fillrect(16+side*4,12,16+side*7,18,M[2]) end end)
  -- right head: overhead (smokestack + smoke)
  head(48,24,function() local G=R("1a1e26","2e3440","4a5460"); c:fillrect(44,10,52,18,G[2]); c:hline(44,52,10,G[3])
    c:sphere(48, flare and 6 or 7,3,3,L.hx("30303a")); c:sphere(46,4,2,2,L.hx("44444e")) end)
  -- centre head: dominant, biggest, fiercest
  c:sphere(32,20,6,7,P)
  c:sphere(32,12,11,9,P)                                    -- big skull
  for side=-1,1,2 do for i=0,5 do c:px(32+side*(8+i*0.5),4-i, P[1]) end end  -- big horns
  local jaw = flare and 21 or 18
  c:fillrect(24,13,40,jaw, L.hx("06040c"))
  for x=25,39,3 do fang(c,x,13,4) end
  for x=26,38,4 do c:px(x,jaw-1,WHITE); c:px(x,jaw-2,WHITE) end
  c:fillrect(23,5,30,9,L.hx("0a0614")); c:fillrect(34,5,41,9,L.hx("0a0614"))
  c:outline()
  glow(c,27,7,"ff4a98",flare and 4 or 3); glow(c,37,7,"ff4a98",flare and 4 or 3)
  glowEye(c,27,7,ec,flare); glowEye(c,37,7,ec,flare)
  c:hline(23,30,3,L.hx("14081f")); c:hline(34,41,3,L.hx("14081f"))
  return c
end

-- besy — Contract Griffin: raptor terror, sharp feathered wings, screaming beak
function B.griffin(frame)
  local c=L.canvas(64,64); local flare=frame==1
  local G=R("241a08","46340e","6a5218","9a7824","c89e34")   -- dark gold body
  local F=R("1c1608","342a0e","524018","72591f")            -- shadowed feathers
  local PC=R("8a7a52","b0a074","d8c8a0")                    -- contract parchment
  c:groundshadow(32,60,22,4)
  -- sharp layered wings: jagged feather fingers fanning up-out
  for side=-1,1,2 do
    for k=0,4 do
      local ang=k*0.28; local len= (flare and 24 or 21) - k*2
      local bx=32+side*9; local by=34
      local tx=bx+side*math.floor(len*math.cos(ang)); local ty=by-math.floor(len*math.sin(ang)+8)
      for t=0,len do local px=math.floor(bx+(tx-bx)*t/len); local py=math.floor(by+(ty-by)*t/len)
        c:px(px,py, F[2]); c:px(px, py+1, F[1]) end
      c:px(tx,ty, F[3])                                     -- feather tip
      if k==2 then c:disc(tx-side*2,ty+2,3,3, PC[2]); c:px(tx-side*2,ty+2, L.hx("8a1f2c")) end -- contract+seal
    end
    c:vline(32+side*9, 20, 44, F[1])                        -- wing shoulder
  end
  -- lion hindquarters + gold body
  c:sphere(32,47,15,12, G)
  c:sphere(32,49,8,7, R("2e2208","5a4614","8a6e24"),0.1)
  for i=0,3 do c:hline(24,40,44+i*2, i%2==0 and G[1] or G[2]) end  -- fur/feather ruffle
  -- big raptor head, thrust down
  c:sphere(32,20,11,10, R("2a2410","4a3e18","6a5a2e"))
  c:fillrect(24,8,40,12, G[1])                              -- heavy brow slab
  -- large hooked beak (open + screaming on tell)
  local by= flare and 34 or 30
  for i=0,6 do local w=math.floor((6-i)*0.8)+1; c:hline(32-w,32+w, 24+i, i<3 and L.hx("e0b03a") or L.hx("a87018")) end
  c:px(31,by,L.hx("8a5814")); c:px(33,by,L.hx("8a5814"))    -- hook tip
  if flare then c:fillrect(28,28,36,32,L.hx("07060a")); for x=29,35,3 do c:px(x,28,WHITE) end end -- gaping
  -- coin crown
  for i=-1,1 do c:sphere(32+i*6, 10, 2.6,2.6, R("8a5714","e2aa2e","ffe694"),0.2) end
  -- seal medallion
  c:disc(32,43,3,3,L.hx("8a1f2c")); c:disc(32,43,2,2,L.hx("c23044")); c:px(32,43,L.hx("ffd9b0"))
  claw(c,21,53); claw(c,43,53)
  c:outline()
  -- fierce sunken amber eyes under the brow
  local ec = flare and L.hx("ffe27a") or L.hx("ffb81f")
  c:fillrect(24,15,30,20,L.hx("140f04")); c:fillrect(34,15,40,20,L.hx("140f04")) -- sockets
  glow(c,27,18,"ffd23e",flare and 4 or 3); glow(c,37,18,"ffd23e",flare and 4 or 3)
  glowEye(c,27,18,ec,flare); glowEye(c,37,18,ec,flare)
  c:hline(24,30,13,L.hx("140f04")); c:px(30,14,L.hx("140f04"))
  c:hline(34,40,13,L.hx("140f04")); c:px(34,14,L.hx("140f04"))
  return c
end

-- league — The Grand Reckoner: spectral chief examiner, red pen, mortarboard
function B.reckoner(frame)
  local c=L.canvas(64,64); local flare=frame==1
  local SP=R("101020","20203a","343458","50507e","7676a8")  -- spectral indigo
  local RED=R("5a1520","8a2230","c23044","e85a68")
  c:groundshadow(32,60,22,4)
  -- billowing robe body (amalgam)
  c:sphere(32,46,18,14, SP)
  for x=16,48,2 do c:vline(x, 48, 58 - math.floor(math.abs(x-32)*0.2), SP[2]) end -- robe folds
  c:fillrect(16,48,48,58, SP[2])
  -- coin buttons + gear shoulders + contract sash
  for i=0,3 do c:sphere(32,34+i*4,1.6,1.6, R("8a5714","e2aa2e","ffe694"),0.2) end
  c:sphere(16,34,5,5, R("3a3a20","6a6a30","9a9a44")); c:sphere(48,34,5,5, R("3a3a20","6a6a30","9a9a44")) -- gears
  for i=0,7 do c:px(16+math.floor(4*math.cos(i)), 34+math.floor(4*math.sin(i)), L.hx("2a2a14")) end
  c:fillrect(22,30,42,33, L.hx("d8c8a0")); for x=24,40,3 do c:px(x,31,INK) end   -- ledger sash
  -- giant red pen (scythe-like), held right
  c:vline(52, 10, 50, RED[3]); c:fillrect(51,10,53,50, RED[2]); c:sphere(52,8,2.4,3, RED[3])  -- barrel
  for i=0,4 do c:hline(52-i,52, 50+i, L.hx("d8b0b0")) end     -- nib
  glow(c,52,8,"c23044",3)
  -- head: hollow spectral face under a mortarboard
  c:sphere(32,20,9,8, R("181828","2a2a44","3e3e62"))
  c:fillrect(20,10,44,13, L.hx("0e0e18")); c:fillrect(22,13,42,14, L.hx("1a1a2a"))  -- mortarboard
  c:px(32,7,L.hx("e2aa2e")); c:vline(32,7,10,L.hx("8a5714")); c:px(30,9,L.hx("e2aa2e")) -- tassel
  c:fillrect(26,22,38,26, L.hx("07070e"))                    -- hollow mouth void
  c:outline()
  -- hollow glowing eyes (ghostly)
  local ec = flare and L.hx("aef0ff") or L.hx("7fd8f0")
  glow(c,28,20,"7fd8f0",flare and 5 or 4); glow(c,36,20,"7fd8f0",flare and 5 or 4)
  glowEye(c,28,20,ec,flare); glowEye(c,36,20,ec,flare)
  if flare then for x=27,37,2 do c:px(x,24,L.hx("aef0ff")) end end  -- mouth glow tell
  return c
end

-- ============================ WILDS (44x44) ============================
function B.slime(frame)
  local c=L.canvas(44,44); local f=frame==1
  local S=R("101020","1e1e34","30304e","4a4a70")
  c:groundshadow(22,40,12,3)
  c:sphere(22, f and 25 or 26, 13, f and 11 or 10, S)        -- ink blob (squish tell)
  c:sphere(22,27,6,5, R("242440","34345a"),0.1)
  c:px(14,18,L.hx("e8e4d4")); c:px(30,20,L.hx("e8e4d4"))     -- invoice-corner bits
  c:vline(18,34,38,S[1]); c:vline(26,34,37,S[1])             -- drips
  c:outline()
  glow(c,22,22,"d8f048",3); glowEye(c,22,22, f and L.hx("eaff6a") or L.hx("c8e83c"), true)
  c:hline(18,26,21,L.hx("0a0a10"))
  return c
end
function B.bat(frame)
  local c=L.canvas(44,44); local f=frame==1
  local S=R("14141c","24243a","3a3a58")
  c:groundshadow(22,40,10,3)
  for side=-1,1,2 do local wy = f and 20 or 22            -- wing flap tell
    c:sphere(22+side*9, wy, 6, 5, L.hx("cfc6b0")); c:px(22+side*13, wy-2, L.hx("8a1f2c")) end -- torn "?" slips
  c:sphere(22,24,8,7,S)
  for side=-1,1,2 do for i=0,3 do c:px(22+side*(4+i), 16-i, S[1]) end end  -- ears
  c:outline()
  glow(c,18,23,"ff5aa0",2); glow(c,26,23,"ff5aa0",2)
  glowEye(c,18,23, L.hx("ff5aa0")); glowEye(c,26,23, L.hx("ff5aa0"))
  c:px(22,27,WHITE); c:px(20,29,WHITE); c:px(24,29,WHITE)  -- fangs
  return c
end
function B.imp(frame)
  local c=L.canvas(44,44); local f=frame==1
  local S=R("1a1410","2e2418","46341f")
  c:groundshadow(22,40,10,3)
  c:sphere(22,27,10,9,S); c:sphere(22,29,5,5,R("2e2418","46341f"),0.1)
  c:fillrect(17,10,27,16, R("242830","3a4048")[2]); c:hline(17,27,10,L.hx("565e68"))  -- smokestack hat
  c:sphere(20,7,2,2,L.hx("3a3a42")); c:sphere(24,5,1.6,1.6,L.hx("52525c"))            -- smoke
  for side=-1,1,2 do for i=0,3 do c:px(22+side*(6+i),20-i,S[1]) end end               -- horns
  c:px(12,24,L.hx("ff9a2e")); c:px(32,26,L.hx("ffd23e"))                              -- sparks
  c:outline()
  glow(c,18,26,"ff7a1e",2); glow(c,26,26,"ff7a1e",2)
  glowEye(c,18,26, f and L.hx("ffb038") or L.hx("ff7a1e")); glowEye(c,26,26, f and L.hx("ffb038") or L.hx("ff7a1e"))
  fang(c,20,30,1); fang(c,24,30,1)
  return c
end
function B.sprite(frame)
  local c=L.canvas(44,44); local f=frame==1
  local P=R("b8a880","d8c8a0","f2e8cc")                     -- contract paper
  c:groundshadow(22,40,9,3)
  for side=-1,1,2 do c:sphere(22+side*8, f and 22 or 24, 5, 8, P, -0.2) end  -- folded wings (flutter tell)
  c:sphere(22,26,7,8,P); c:fillrect(18,20,26,32,P[2])       -- paper body
  for i=0,3 do c:hline(18,26,22+i*2, L.hx("9a8a60")) end     -- contract lines
  c:disc(22,28,3,3,L.hx("8a1f2c")); c:disc(22,28,2,2,L.hx("c23044")); c:px(22,28,L.hx("ffd9b0")) -- wax-seal face
  c:outline()
  glow(c,22,28,"c23044",2)
  c:px(19,24,L.hx("2a2018")); c:px(25,24,L.hx("2a2018"))    -- tiny eyes
  return c
end

return B
