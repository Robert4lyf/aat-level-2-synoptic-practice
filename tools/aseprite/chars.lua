-- Chibi human/animal character builder for Ledger Legends.
-- Cute Stardew-style chibi at 32x40 (big head, small body). Front-facing + a
-- 2-frame idle (frame 1 = blink + a per-character signature motion). Directions
-- (back/side/left) are added in a later production pass; this module currently
-- provides the front pose used for design approval.
local DIR = "C:/Users/rober/Documents/aat_app/tools/aseprite/"
local L = dofile(DIR.."lib.lua")
local M = {}
local WHITE = L.hx("ffffff")
local INK = L.INK
local function R(...) local t={} for _,s in ipairs({...}) do t[#t+1]=L.hx(s) end return t end
M.R = R

-- ---- palettes -------------------------------------------------------------
M.SKIN = {
  light = R("b5723f","e0a06e","f2c193","ffd9ac","fff0d8"),
  tan   = R("8a5230","b5723f","d9975a","f0b982","ffe0b8"),
  brown = R("5e3a22","7d4e2e","a06a3e","c68a54","e6b483"),
  deep  = R("41260f","5e3a22","7d4e2e","9a6238","c1894f"),
}
M.HAIR = {
  brown  = R("241408","3f2814","5e3f22"),
  black  = R("12131b","222736","39414f"),
  blond  = R("8a6220","c39a3c","e8c86a"),
  auburn = R("3f160a","6a2814","9a4a24"),
  grey   = R("4a4a54","767682","a8a8b6"),
  ginger = R("6a2e0e","a84e1c","d97e30"),
}
M.SHIRT = {
  white = R("cdd2e0","e8ecf4","ffffff"),
  blue  = R("a4bcdc","c8dcf0","eaf4ff"),
  cream = R("d4c092","ecdcb0","fff4d8"),
  pink  = R("dca6b4","f0c8d2","ffe6ec"),
}
M.CLOTH = {
  navy    = R("161f36","28324f","3c4f78"),
  charcoal= R("222530","353a48","4c5468"),
  brown   = R("3a2616","55381f","784f2c"),
  teal    = R("124039","1f6a5c","2f9880"),
  green   = R("173f22","255e34","377e49"),
  rust    = R("5a2416","8a3a1e","b5622e"),
  plum    = R("2f1640","4a2566","6a3a90"),
  mustard = R("6a4a12","9a7020","c69a34"),
}
M.TIE = {
  red   = R("8a1f2c","c23044"),
  blue  = R("21386b","3a5aa0"),
  green = R("1c5a3a","2f8c56"),
  gold  = R("8a5714","e2aa2e"),
  plum  = R("47256a","6a3a90"),
}
M.VISOR = R("1c6a3a","2f9c56","57c47e")   -- accountant eyeshade

-- ---- small drawing helpers ------------------------------------------------
local function px(c,x,y,v) c:px(x,y,v) end

local LENS = L.hx("eaf4fa")   -- pale lens tint so specs read clearly
-- one round/square lens: pale interior + soft-dark frame ring (radius ~3)
local function drawLens(c, ex, ecy, fc, square)
  c:fillrect(ex-1,ecy-2,ex+1,ecy+2, LENS)     -- rounded 5x5 interior
  c:fillrect(ex-2,ecy-1,ex+2,ecy+1, LENS)
  if square then
    c:rect(ex-2,ecy-2,ex+2,ecy+2, fc)
  else
    c:hline(ex-1,ex+1,ecy-3,fc); c:hline(ex-1,ex+1,ecy+3,fc)
    c:vline(ex-3,ecy-1,ecy+1,fc); c:vline(ex+3,ecy-1,ecy+1,fc)
    c:px(ex-2,ecy-2,fc); c:px(ex+2,ecy-2,fc); c:px(ex-2,ecy+2,fc); c:px(ex+2,ecy+2,fc)
  end
end
-- glasses drawn on top after outline. style: round|square|pushed.
-- Big cute lenses; the eye (via pupilFn) is drawn inside the pale lens.
local function glasses(c, lx, rx, ey, style, fc, pupilFn)
  fc = fc or L.hx("29211a")                    -- soft dark-brown frame (cuter than pure ink)
  local ecy = (style=="pushed") and (ey-4) or ey
  local sq = (style=="square")
  drawLens(c, lx, ecy, fc, sq); drawLens(c, rx, ecy, fc, sq)
  if style~="pushed" and pupilFn then pupilFn(ecy) end   -- eyes inside lenses
  for _,ex in ipairs({lx,rx}) do c:px(ex-1,ecy-2, WHITE) end   -- top-left glint
  c:hline(lx+3, rx-3, ecy, fc)                 -- bridge
  c:px(lx-3, ecy, fc); c:px(rx+3, ecy, fc)     -- temple arms
end

-- natural chibi hair: rounded crown + pointed fringe + sideburns + strand
-- highlights, so it reads as hair rather than a helmet/cap.
local function drawHair(c, hs, hair, skin, underhat)
  local cx=16
  local H1,H2,H3 = hair[1],hair[2],hair[3]
  if hs=="bald" then return end
  if underhat then                                          -- only what shows below a hat brim
    -- outer column runs full; inner column stops above the eyes (leaves a skin gap)
    c:vline(8,10,15,H2); c:px(9,10,H2); c:px(9,11,H2); c:px(9,12,H2)
    c:vline(24,10,15,H2); c:px(23,10,H2); c:px(23,11,H2); c:px(23,12,H2)
    if hs=="long" then c:vline(7,11,24,H2); c:vline(8,16,25,H2); c:vline(24,16,25,H2); c:vline(25,11,24,H2); c:hline(19,24,12,H3) end
    if hs=="ponytail" then c:sphere(25,11,2.2,3.2,hair); c:vline(26,12,17,H2); c:px(25,17,H1) end
    return
  end
  c:sphere(cx,5, 8.2, 4.8, hair, -0.22)                    -- crown volume
  c:vline(8,6,11,H2); c:vline(9,5,13,H2)                   -- sideburns
  c:vline(24,6,11,H2); c:vline(23,5,13,H2)
  local function fringe(tips)
    for _,t in ipairs(tips) do
      c:vline(t[1], 4, t[2], H2)
      c:px(t[1], t[2], H1)                                 -- darker pointed tip
      c:px(t[1]+1, t[2]-2, H3)                             -- strand sheen
    end
  end
  if hs=="undercut" then
    for y=8,13 do c:px(8,y,skin[2]); c:px(9,y,skin[3]); c:px(23,y,skin[3]); c:px(24,y,skin[2]) end
    fringe({{10,8},{12,9},{14,8},{16,9},{18,8},{20,9},{22,8}})
    c:hline(12,19,3,H3)
  elseif hs=="tousled" then
    for i=0,7 do local x=9+i*2; c:vline(x, ({3,1,4,2,3,2,4,1})[i+1], 5, H2) end   -- spiky top
    fringe({{9,11},{11,9},{13,12},{15,10},{17,8},{19,11},{21,9},{23,12}})
    c:px(7,8,H2); c:px(25,8,H2); c:px(14,3,H3); c:px(18,2,H3)
  elseif hs=="sidepart" then
    c:px(12,5,skin[3]); c:px(12,6,skin[2]); c:px(11,7,skin[2])                    -- parting
    fringe({{9,8},{11,8},{13,10},{15,11},{17,12},{19,11},{21,10},{23,9}})
    c:hline(15,21,4,H3)
  elseif hs=="bun" then
    fringe({{10,9},{12,10},{14,9},{16,9},{18,10},{20,9},{22,9}})
    c:sphere(cx,3,3,2.6,hair); c:hline(14,18,2,H3)
  elseif hs=="ponytail" then
    fringe({{10,9},{12,10},{14,9},{16,9},{18,10},{20,9},{22,9}})
    c:sphere(25,8,2.4,3.6, hair); c:vline(26,9,16,H2); c:px(25,16,H1)   -- side ponytail
  elseif hs=="long" then
    fringe({{10,9},{12,11},{14,10},{16,9},{18,10},{20,11},{22,9}})
    c:vline(7,7,24,H2); c:vline(8,6,25,H2)                              -- left fall
    c:vline(24,6,25,H2); c:vline(25,7,24,H2)                            -- right fall
    c:hline(19,24,4,H3)
  elseif hs=="bob" then
    c:fillrect(7,6,25,9,H2)
    fringe({{9,10},{11,11},{13,11},{15,11},{17,11},{19,11},{21,11},{23,10}})
    c:vline(7,7,17,H2); c:vline(24,7,17,H2)                             -- jaw-length sides
    c:hline(10,20,5,H3)
  else -- combed
    fringe({{10,9},{12,10},{14,10},{16,9},{18,10},{20,10},{22,9}})
    c:hline(12,20,3,H3)
  end
end

-- ============================================================================
-- HUMAN chibi (front / down pose). frame: 0 = base, 1 = idle (blink).
-- Back (up) and side (right/left) poses follow; M.human dispatches by dir.
-- ============================================================================
local function humanFront(spec, frame, turn)
  frame = frame or 0
  local blink = frame==1
  local c = L.canvas(32,40)
  local cx = 16
  local skin = spec.skin or M.SKIN.light
  local hair = spec.hair or M.HAIR.brown
  local shirt = spec.shirt or M.SHIRT.white
  local over = spec.over          -- {ramp=, style=} garment over the shirt, or nil
  local trouser = spec.trouser or R("2c3550","3d4a6e")
  local shoe = spec.shoe or L.hx("2a1c14")

  c:groundshadow(cx, 38, 9, 2.3)

  -- LEGS + shoes
  c:fillrect(11,31,14,37, trouser[2]); c:fillrect(11,31,12,37, trouser[1])
  c:fillrect(18,31,21,37, trouser[2]); c:fillrect(18,31,19,37, trouser[1])
  c:fillrect(10,37,15,38, shoe); c:fillrect(17,37,22,38, shoe)

  -- BODY: shirt torso base
  c:sphere(cx,28,8,7, shirt)
  -- arms: sleeved garments colour the arms; sleeveless ones (apron/overalls/
  -- suspenders) leave shirt-coloured arms so nothing looks disconnected.
  local sleeve = shirt
  if over and (over.style=="blazer" or over.style=="cardigan" or over.style=="uniform"
    or over.style=="robe" or over.style=="dress" or over.style=="vest") then sleeve = over.ramp end
  local rolled = spec.sleevesRolled
  c:sphere(8,27,2.6,4.2, sleeve); c:sphere(24,27,2.6,4.2, sleeve)
  local handY = rolled and 29 or 31
  if rolled then c:sphere(8,29,2.4,2,skin); c:sphere(24,29,2.4,2,skin) end
  c:sphere(8,handY,2,2, skin); c:sphere(24,handY,2,2, skin)

  -- OVER garment on the torso
  if over then
    local o = over.ramp
    if over.style=="vest" then
      -- waistcoat: covers sides/shoulders, leaves a central shirt placket + tie
      c:sphere(cx,28,8,7, o)
      c:fillrect(14,23,18,34, shirt[2])     -- shirt placket down the middle
      c:px(13,24,shirt[3]); c:px(19,24,shirt[3])
    elseif over.style=="blazer" then
      c:sphere(cx,28,8,7, o)
      c:fillrect(14,24,18,34, shirt[2])     -- shirt gap
      -- lapels (lighter diagonal)
      c:px(13,24,o[3]); c:px(12,25,o[3]); c:px(11,26,o[3])
      c:px(20,24,o[3]); c:px(21,25,o[3]); c:px(22,26,o[3])
      c:px(11,27,L.hx("d9c48a"))            -- pocket square
    elseif over.style=="cardigan" then
      c:sphere(cx,28,8,7, o)
      c:fillrect(15,23,17,34, shirt[2])     -- narrow V of shirt
      c:px(15,23,shirt[3]); c:px(17,23,shirt[3])
      -- knit ribbing hint
      c:px(10,31,o[1]); c:px(22,31,o[1]); c:px(16,33,o[1])
    elseif over.style=="suspenders" then
      -- no jacket: shirt + two suspender straps
      c:vline(13,23,33, o[1]); c:vline(20,23,33, o[1])
      c:px(13,23,o[2]); c:px(20,23,o[2])
    elseif over.style=="apron" then
      c:fillrect(13,25,19,29, o[2])            -- bib (upper, narrower)
      c:fillrect(11,29,21,35, o[2])            -- skirt (lower, wider)
      c:vline(13,22,25,o[1]); c:vline(19,22,25,o[1])   -- neck straps to shoulders
      c:hline(11,21,29, o[1])                  -- waist tie
      c:px(11,31,o[3]); c:px(21,31,o[3])       -- side highlights
      if spec.apronStain then c:px(15,32,L.hx("8a3a1e")); c:px(17,33,L.hx("6a4a1e")) end
    elseif over.style=="robe" then
      c:sphere(cx,28,8.4,7.4, o)               -- fuller robe body
      c:fillrect(9,24,23,36, o[2]); c:vline(16,24,36,o[1])   -- centre seam
      c:hline(9,23,24,o[3])                    -- shoulder trim
    elseif over.style=="overalls" then
      c:fillrect(11,26,21,35, o[2])            -- denim bib
      c:vline(13,23,26,o[1]); c:vline(19,23,26,o[1])
      c:px(13,26,L.hx("e2aa2e")); c:px(19,26,L.hx("e2aa2e"))  -- buttons
      c:fillrect(14,29,18,32, o[3])            -- front pocket
    elseif over.style=="uniform" then
      c:sphere(cx,28,8,7, o)
      c:fillrect(15,23,17,34, shirt[2])
      c:px(11,26,L.R.gold[3]); c:px(11,28,L.R.gold[3])       -- brass buttons
      c:hline(9,23,23, o[3])                   -- collar
    elseif over.style=="dress" then
      c:sphere(cx,27,7.5,6, o)
      for x=9,23 do local d=math.abs(x-16); c:vline(x, 30, 36-math.floor(d*0.3), o[2]) end -- flared skirt
      c:hline(11,21,30,o[1]); c:hline(12,20,24,o[3])          -- waist + collar
    end
  end

  -- COLLAR + TIE
  if spec.tie then
    local t=spec.tie
    local knot = spec.tieStyle=="loose" and 25 or 24
    -- collar
    c:px(14,23,shirt[3]); c:px(18,23,shirt[3])
    if spec.tieStyle=="bow" then
      c:fillrect(14,24,15,25, t[2]); c:fillrect(17,24,18,25, t[2]); c:px(16,24,t[1])
    else
      c:px(16,knot-1,t[2]); c:fillrect(16,knot,16,knot+1,t[1])
      local bot = spec.tieStyle=="loose" and 30 or 32
      c:vline(16,knot+1,bot, t[2]); c:px(16,bot,t[1])
      if spec.tieStyle~="loose" then c:px(15,bot-1,t[1]); c:px(17,bot-1,t[1]) end
    end
  end
  if spec.pocketWatch then c:px(19,30,L.hx("e2aa2e")); c:px(19,31,L.hx("8a5714")) end
  if spec.coinPouch then c:sphere(22,32,2.2,2, R("6a4a2a","9a6e3e")); c:px(22,31,L.hx("e2aa2e")) end
  if spec.satchel then
    for i=0,9 do c:px(10+i, 22+i, L.hx("5a3a1e")) end     -- strap: shoulder -> hip
    c:sphere(22,33,3,2.6, R("6a4222","9a6a34")); c:fillrect(20,32,24,34, L.hx("6a4222"))
    c:px(22,31, L.hx("caa14e"))                            -- buckle
  end
  if spec.prop then M.prop(c, spec.prop) end

  -- HEAD
  local hy = 13
  c:sphere(cx,hy,8.5,8, skin)
  if turn=="right" then c:sphere(25,15,2,2.4, skin, 0.1) end   -- nose/muzzle bump => reads as a turned head

  -- HAIR (reduced under a hat so it never overdraws the headgear)
  if not spec.bald then drawHair(c, spec.hairStyle or "combed", hair, skin, spec.hat~=nil) end
  if spec.visor then                                    -- accountant eyeshade brim
    c:fillrect(9,10,23,11, M.VISOR[2])
    c:hline(10,22,10, M.VISOR[3])                        -- top highlight
    c:hline(9,23,12, M.VISOR[1])                         -- underside shadow
    c:px(8,11,M.VISOR[1]); c:px(24,11,M.VISOR[1])        -- side clasps
  end
  if spec.hat then M.hat(c, spec.hat, cx) end
  if spec.quillEar then
    c:vline(25,7,12, L.hx("e8ecf4")); c:px(26,6,L.hx("ffffff")); c:px(24,8,L.hx("c23044"))
  end

  c:outline()

  if spec.beard then M.beard(c, spec.beard, spec.beardCol or hair) end

  -- FACE (after outline). `turn` rotates the head to a 3/4 side view while the
  -- body and outfit stay the unchanged front, so the side matches the front.
  local ey = blink and 15 or 14
  local lx,rx = 11, 21
  local nosex, mouthx, blushL = 16, 16, 9
  if turn=="right" then lx, rx, nosex, mouthx, blushL = 14, 22, 25, 19, 13 end
  local behindLens = spec.glasses and spec.glasses~="pushed"
  local function eyeAt(ex, eyy, behind)
    if blink then
      if behind then                                      -- fuller closed lid so the lens keeps its tone
        c:hline(ex-2,ex+2,eyy,INK); c:px(ex-1,eyy-1,INK); c:px(ex+1,eyy-1,INK)
      else                                                -- cute happy arch (∩)
        c:px(ex-2,eyy,INK); c:px(ex-1,eyy-1,INK); c:px(ex,eyy-1,INK); c:px(ex+1,eyy-1,INK); c:px(ex+2,eyy,INK)
      end
    else
      if behind then                                      -- smaller pupil, lens shows around it
        c:fillrect(ex-1,eyy-1,ex,eyy+1, INK); c:px(ex-1,eyy-1, WHITE)
      else                                                -- big round eye + sparkle
        c:fillrect(ex-1,eyy-1,ex+1,eyy+1, INK); c:px(ex-1,eyy-1, WHITE)
      end
    end
  end
  local function drawEyes(eyy, behind) eyeAt(lx,eyy,behind); eyeAt(rx,eyy,behind) end
  if not behindLens then drawEyes(ey, false) end
  c:px(nosex,15, skin[1]); c:px(nosex,16, skin[1])       -- nose (sits on the bump when turned)
  if not (spec.beard=="full" or spec.beard=="beardgrey") then c:hline(mouthx-1,mouthx+1,18, INK) end
  if not blink then c:blend(blushL,17,L.rgba(242,124,142,120)); c:blend(23,17,L.rgba(242,124,142,120)) end

  -- GLASSES
  if spec.glasses then
    glasses(c, lx, rx, ey, spec.glasses, spec.glassCol, function(ecy) drawEyes(ecy, spec.glasses~="pushed") end)
  end

  -- SIGNATURE idle motion (frame 1)
  if frame==1 and spec.idle then spec.idle(c, {cx=cx,L=L,WHITE=WHITE}) end

  return c
end

-- shared palette resolve
local function resolve(spec)
  return spec.skin or M.SKIN.light, spec.hair or M.HAIR.brown,
         spec.shirt or M.SHIRT.white, spec.over,
         spec.trouser or R("2c3550","3d4a6e"), spec.shoe or L.hx("2a1c14")
end

-- HUMAN back (up). No face; hair covers the head, garment back, collar peek.
local function humanBack(spec, frame)
  local c=L.canvas(32,40); local cx=16
  local skin,hair,shirt,over,trouser,shoe = resolve(spec)
  local rolled=spec.sleevesRolled
  c:groundshadow(cx,38,9,2.3)
  c:fillrect(11,31,14,37,trouser[2]); c:fillrect(11,31,12,37,trouser[1])
  c:fillrect(18,31,21,37,trouser[2]); c:fillrect(18,31,19,37,trouser[1])
  c:fillrect(10,37,15,38,shoe); c:fillrect(17,37,22,38,shoe)
  local body=(over and over.ramp) or shirt
  c:sphere(cx,28,8,7, body)
  c:sphere(8,27,2.6,4.2, body); c:sphere(24,27,2.6,4.2, body)
  if rolled then c:sphere(8,29,2.4,2,skin); c:sphere(24,29,2.4,2,skin) end
  c:sphere(8, rolled and 29 or 31,2,2,skin); c:sphere(24, rolled and 29 or 31,2,2,skin)
  if over then c:hline(13,19,22, shirt[3]) end                 -- shirt collar peek
  if spec.satchel then for i=0,9 do c:px(20-i,22+i,L.hx("5a3a1e")) end
    c:sphere(10,33,3,2.6,R("6a4222","9a6a34")) end
  -- head from behind
  local hy=13
  c:sphere(cx,hy,8.5,8, skin)
  c:sphere(cx,hy-1,8.6,7.4, hair, -0.15)                       -- hair mass
  for i=0,7 do local x=9+i*2; c:px(x, hy+7-(i%2), hair[1]) end -- jagged nape
  c:hline(12,20,hy-6,hair[3]); c:px(16,hy-7,hair[3])           -- crown sheen
  if spec.hairStyle=="bun" then c:sphere(cx,hy-9,3,2.6,hair) end
  if spec.hat then M.hat(c, spec.hat, cx) end                  -- hat covers crown, nape hair shows
  if spec.visor then c:fillrect(9,hy-3,23,hy-2, M.VISOR[2]) end
  if spec.quillEar then c:vline(25,hy-6,hy-1,L.hx("e8ecf4")); c:px(26,hy-7,WHITE) end
  c:outline()
  if spec.glasses then c:px(7,hy+1,L.hx("29211a")); c:px(25,hy+1,L.hx("29211a")) end -- temple tips
  return c
end

-- HUMAN side (right-facing). Profile; left is this mirrored.
local function humanSide(spec, frame)
  local c=L.canvas(32,40); local blink=frame==1
  local skin,hair,shirt,over,trouser,shoe = resolve(spec)
  local cx=15
  c:groundshadow(16,38,8,2.3)
  -- legs (back leg darker, front leg forward)
  c:fillrect(12,31,15,37,trouser[1]); c:fillrect(11,37,16,38,shoe)   -- back
  c:fillrect(16,31,19,37,trouser[2]); c:fillrect(16,37,21,38,shoe)   -- front
  -- torso profile + front (belly/shirt) bulge to the right
  local body=(over and over.ramp) or shirt
  c:sphere(cx,28,6.6,7, body)
  c:sphere(18,29,3.2,5.4, shirt)
  if spec.tie then c:vline(18,25,31, spec.tie[2]); c:px(18,31,spec.tie[1]) end
  c:sphere(18,27,2.4,4, body)                                  -- front arm
  c:sphere(18, spec.sleevesRolled and 29 or 31, 2,2, skin)
  if spec.sleevesRolled then c:sphere(18,29,2.2,1.6,skin) end
  -- head profile
  local hy=13
  c:sphere(cx,hy,8,8, skin)
  c:px(23,hy,skin[3]); c:px(23,hy+1,skin[2]); c:px(23,hy+2,skin[1]) -- nose bump
  -- hair: crown + back down the left
  c:sphere(12,6,7.4,5, hair, -0.2)
  c:fillrect(7,5,16,9, hair[2])
  c:vline(8,6,15,hair[2]); c:vline(9,7,17,hair[2])              -- back of head
  c:px(19,9,hair[2]); c:px(20,10,hair[2]); c:px(18,10,hair[2])  -- front fringe tips
  if spec.hairStyle=="bun" then c:sphere(9,7,3,2.6,hair) end
  if spec.quillEar then c:vline(11,3,8,L.hx("e8ecf4")); c:px(10,2,WHITE) end
  if spec.hat then M.hat(c, spec.hat, 15) end
  c:outline()
  if spec.beard then                                          -- profile beard on the jaw
    local bc=spec.beardCol or hair
    if spec.beard=="full" or spec.beard=="beardgrey" then
      c:fillrect(17,17,22,21,bc[1]); c:hline(18,21,16,bc[2]); c:px(23,18,bc[1]); c:px(23,19,bc[1])
    elseif spec.beard=="goatee" then c:fillrect(19,18,22,21,bc[1])
    elseif spec.beard=="mustache" then c:hline(20,23,17,bc[1]) end
  end
  -- one eye + mouth on the face (right)
  local ex, ey = 19, blink and hy+1 or hy
  if spec.glasses then
    drawLens(c, ex, ey, L.hx("29211a"), spec.glasses=="square")  -- round single lens
    if not blink then c:fillrect(ex-1,ey-1,ex,ey,INK); c:px(ex-1,ey-1,WHITE)
    else c:px(ex-1,ey,INK); c:px(ex,ey,INK) end
    c:px(ex-1,ey-2,WHITE)                                        -- glint
    c:px(ex-3,ey,L.hx("29211a"))                                -- temple back
  else
    if not blink then c:fillrect(ex-1,ey-1,ex,ey,INK); c:px(ex-1,ey-1,WHITE)
    else c:px(ex-2,ey,INK); c:px(ex-1,ey-1,INK); c:px(ex,ey-1,INK); c:px(ex+1,ey,INK) end
  end
  if spec.visor then c:fillrect(16,hy-3,24,hy-2,M.VISOR[2]); c:px(24,hy-2,M.VISOR[1]) end
  c:px(21,hy+4,INK); c:px(22,hy+4,INK)                          -- mouth
  if not blink then c:blend(20,hy+3,L.rgba(242,124,142,120)) end
  return c
end

-- dispatch by direction. Sides are the front pose with the head turned (so the
-- outfit/colours match the front exactly); left = mirror of the right turn.
function M.human(spec, frame, dir)
  frame = frame or 0; dir = dir or "down"
  if dir=="up" then return humanBack(spec, frame)
  elseif dir=="right" then return humanFront(spec, frame, "right")
  elseif dir=="left" then local s=humanFront(spec, frame, "right"); local f=s:flipH(); s:close(); return f
  else return humanFront(spec, frame) end
end

-- hats (silhouette-defining). Drawn over the (reduced) hair; each fully covers
-- the crown x7..25 and is a single connected, correctly-oriented shape.
function M.hat(c, kind, cx)
  if kind=="tophat" then
    c:fillrect(10,0,22,6, L.hx("241c2a"))                 -- crown (upright cylinder)
    c:hline(11,21,0, L.hx("3a3040"))                      -- top sheen
    c:hline(10,22,5, L.hx("7a1f2c"))                      -- band
    c:fillrect(6,6,26,7, L.hx("15111c"))                  -- wide brim
  elseif kind=="bowler" then
    c:sphere(cx,6,7,4, R("241c14","3f2e1e","5a4630"))     -- rounded dome
    c:fillrect(7,9,25,10, L.hx("2a2018")); c:px(6,9,L.hx("3f2e1e")); c:px(25,9,L.hx("3f2e1e"))
  elseif kind=="mayor" then
    c:fillrect(11,1,21,6, L.R.blueroof[1])                -- short formal crown
    c:hline(11,21,1, L.R.blueroof[2]); c:hline(11,21,6, L.hx("e2aa2e"))  -- gold band
    c:fillrect(7,6,25,7, L.hx("101828"))                 -- brim
  elseif kind=="newsboy" then
    local rp=R("2e3a4a","46586e","62748c")
    c:sphere(cx,6,8.6,3.8, rp)                            -- rounded cap dome y2..10
    c:fillrect(7,9,24,10, rp[1])
    c:fillrect(17,10,25,11, rp[1]); c:px(25,10,rp[1])     -- short front peak (right)
    c:px(15,4, rp[3]); c:px(cx,7,rp[1])                   -- button + seam
  elseif kind=="flatcap" then
    local rp=R("3a2e1e","5a4a30","72603e")
    c:sphere(cx,7,8.6,3.2, rp)                            -- flat dome
    c:fillrect(16,9,25,10, rp[1]); c:px(25,9,rp[1])       -- front peak
    c:hline(9,22,6, rp[3])
  elseif kind=="beanie" then
    c:sphere(cx,6,8.4,4.2, R("5a2430","8a3a48","b5566a"))
    c:fillrect(7,9,25,11, L.hx("6a2a38")); c:hline(8,24,10, L.hx("d0687c"))  -- knit fold
  elseif kind=="wizard" then
    local P=L.R.purple
    for y=0,7 do local w=y                                 -- cone: narrow tip -> wide base
      c:hline(cx-w,cx+w, y, P[math.min(#P, 2+(7-y)//3)]) end
    c:px(cx+2,0,P[4])                                     -- little droop at the tip
    c:fillrect(5,8,27,10, P[1])                           -- wide brim
    c:hline(6,26,8, P[3]); c:px(cx-3,4, L.hx("f6ca45")); c:px(cx+4,6, L.hx("ffe694")) -- stars
  elseif kind=="chef" then
    c:sphere(cx,3,5,4, R("dcdce4","f2f2f8","ffffff"))      -- puffed crown
    c:sphere(10,4,3.4,3, R("dcdce4","f2f2f8","ffffff")); c:sphere(22,4,3.4,3, R("dcdce4","f2f2f8","ffffff"))
    c:fillrect(9,7,23,10, L.hx("e6e8f0")); c:hline(9,23,7, WHITE)  -- band
  elseif kind=="straw" then
    local rp=R("9a7a2e","c8a24a","e6c877")
    c:sphere(cx,6,6.5,3, rp)                              -- low crown
    c:fillrect(4,8,28,9, rp[2]); c:hline(4,28,9, rp[1]); c:hline(6,26,8, rp[3])  -- wide brim
    c:hline(10,22,6, L.hx("7a5e22"))                      -- band
  elseif kind=="guard" then
    c:sphere(cx,7,8.6,4.4, L.R.iron)                      -- helmet dome
    c:hline(8,24,10, L.R.steel[3])                        -- brow rim
    c:fillrect(15,1,17,5, L.R.steel[2]); c:sphere(16,1,1.6,1.6, L.R.gold,0.2)  -- crest + stud
  elseif kind=="headscarf" then
    local rp=R("8a2f4a","c24a6a","e07090")
    c:sphere(cx,6,9,4.8, rp)                              -- wraps whole crown
    c:fillrect(7,9,25,11, rp[2]); c:hline(9,23,4, rp[3])  -- fold sheen
    c:sphere(25,11,2.2,2, rp[1]); c:px(27,12,rp[2])       -- side knot
    for x=9,23,3 do c:px(x,3,rp[3]) end                   -- polka dots
  elseif kind=="teapot" then
    local tp=R("236e5e","3f9c86","6fc7ad")               -- glazed teal teapot
    c:sphere(cx,7,7,4.3, tp)                              -- rounded pot body (the crown)
    c:fillrect(10,10,22,11, tp[1])                       -- flat base
    c:hline(10,22,8, L.hx("e2aa2e"))                     -- painted gold band
    -- spout: grows out of the body's left side, angling up (no gap)
    c:px(9,6,tp[2]); c:px(8,5,tp[2]); c:px(7,5,tp[3]); c:px(6,4,tp[3])
    c:px(9,7,tp[1]); c:px(8,6,tp[1])
    -- handle: a loop attached to the body's right side
    c:px(23,5,tp[2]); c:px(24,5,tp[1]); c:px(25,6,tp[1]); c:px(25,7,tp[1]); c:px(24,8,tp[1]); c:px(23,7,tp[1])
    -- lid sits on the body + gold knob
    c:sphere(cx,3,3,1.8, tp[2]); c:hline(13,19,4,tp[1]); c:sphere(cx,1,1.4,1.4, L.hx("e2aa2e"))
    -- steam from the spout tip
    c:px(5,3,L.hx("cfeee6")); c:px(6,2,L.hx("dff2ec")); c:px(5,1,L.hx("cfeee6"))
  end
end

-- beards/moustaches on the lower face (drawn after outline). col = hair ramp.
-- Jaw-following taper (wide cheeks -> narrow chin) with light-to-dark shading,
-- so it reads as a beard shape rather than a ball or a flat block.
local function beard(c, kind, col)
  local D,Md,Hi = col[1], col[2], col[3] or col[2]
  if kind=="full" then
    c:hline(10,22,17,Md); c:hline(10,22,18,Md)                  -- wide at the jaw
    c:hline(11,21,19,Md); c:hline(12,20,20,D)
    c:hline(13,19,21,D);  c:hline(14,18,22,D)                   -- taper to chin
    c:px(10,17,Hi); c:px(22,17,Hi)                              -- cheeks catch light
    c:hline(12,20,16,Md); c:px(11,16,D); c:px(21,16,D)          -- moustache / upper lip
    c:vline(9,15,18,Md); c:vline(23,15,18,Md)                   -- sideburns join hair
  elseif kind=="beardgrey" then
    c:hline(10,22,17,Md); c:hline(10,22,18,Md)
    c:hline(11,21,19,Md); c:hline(12,20,20,Md)
    c:hline(13,19,21,D);  c:hline(14,18,22,D)
    c:px(10,17,Hi); c:px(22,17,Hi); c:px(13,20,Hi); c:px(18,20,Hi)  -- grey wisps
    c:hline(12,20,16,Md); c:vline(9,15,18,Md); c:vline(23,15,18,Md)
  elseif kind=="goatee" then
    c:hline(14,18,18,Md); c:hline(14,18,19,Md)
    c:hline(15,17,20,D);  c:hline(15,17,21,D); c:px(16,22,D)    -- narrow chin tuft
    c:hline(13,19,16,Md); c:px(12,17,Md); c:px(20,17,Md)        -- thin moustache
  elseif kind=="mustache" then
    c:hline(12,19,17, Md); c:px(12,18,D); c:px(19,18,D)         -- clean moustache below nose
  end
end

-- held prop beside/in front of the character (right side). Small readable icons.
local function prop(c, kind)
  if kind=="book" then c:fillrect(21,28,26,33, L.R.redroof[2]); c:vline(23,28,33,L.hx("f2e4bd")); c:hline(21,26,28,L.hx("8a1f2c"))
  elseif kind=="ledger" then c:fillrect(20,27,26,33, L.R.wood[2]); c:fillrect(21,28,25,32,L.hx("f2e4bd")); c:hline(22,24,30,L.INKBLUE)
  elseif kind=="magnifier" then c:sphere(24,26,3,3, L.R.crystal); c:rect(21,23,27,29,L.hx("8a5714")); c:vline(20,29,33,L.hx("6a4a1e"))
  elseif kind=="clipboard" then c:fillrect(21,27,26,34, L.R.wood[3]); c:fillrect(22,28,25,33,L.hx("f2e4bd")); c:fillrect(23,26,24,28,L.R.iron[3])
  elseif kind=="hammer" then c:vline(24,26,34,L.R.wood[2]); c:fillrect(22,24,27,26,L.R.steel[2])
  elseif kind=="lute" then c:sphere(23,31,3.4,4, L.R.wood); c:vline(24,22,28,L.R.wood[3]); c:px(24,22,L.hx("e2aa2e"))
  elseif kind=="basket" then c:sphere(23,31,4,3, R("8a5a2e","b5824a")); c:hline(19,27,29,L.hx("6a4222")); c:sphere(22,29,1.4,1.4,L.R.redroof); c:sphere(24,29,1.4,1.4,L.R.gold)
  elseif kind=="staff" then c:vline(25,20,35,L.R.wood[2]); c:sphere(25,19,2.4,2.4,L.R.crystal,0.2)
  elseif kind=="teapot" then c:sphere(23,31,3.4,3, R("2f6a5c","47ad99")); c:hline(26,27,30,L.hx("2f6a5c")); c:px(23,27,L.hx("bfeee0"))
  elseif kind=="coins" then c:sphere(23,32,3,2.4, R("6a4a2a","9a6e3e")); c:px(22,30,L.hx("e2aa2e")); c:px(24,29,L.hx("f6ca45"))
  elseif kind=="lantern" then c:vline(24,24,27,L.R.iron[2]); c:fillrect(22,27,26,32,L.hx("f6ca45")); c:rect(22,27,26,32,L.R.iron[2])
  elseif kind=="brush" then c:vline(24,26,33,L.R.wood[2]); c:fillrect(22,24,26,26,L.R.blossom[3])
  elseif kind=="quillpen" then c:vline(24,24,31,L.hx("e8ecf4")); c:px(25,23,WHITE); c:px(24,31,L.INKBLUE)
  end
end
M.prop = prop; M.beard = beard

-- palettes for animals
M.FUR = {
  fox=R("8a3a16","c05e22","e08a3e"), grey=R("5a5f6e","7e8494","aab0c0"),
  brown=R("5a3f26","7d5836","a67a4e"), white=R("cfd0d8","e8eaf0","ffffff"),
  black=R("232630","363b48","4e5666"), tan=R("9a7440","c29a5e","e0c088"),
  ginger=R("8a4a1e","c07028","e29a4e"), pink=R("b56a6a","d69090","f0b8b8"),
  green=R("3a6a3a","5a9a52","82c274"), cream=R("b09a6a","d0bc8a","efe0b0"),
  slate=R("3f4a52","5a6a74","82929c"), sand=R("9a8250","c2a86e","e2cc96"),
}
local INK2 = INK
-- ============================================================================
-- ANIMAL chibi (front pose). Species knobs make silhouettes genuinely distinct.
-- fields: fur, belly, ears(round|pointy|tall|floppy|tuft|antlers|none),
--   muzzle(snout|short|beak|none), beakCol, nose, whiskers, tail(bushy|thin|
--   flat|ring|none), tailCol, spikes, wool, shell, mask, glasses, acc(bowtie|
--   scarf|collar|apron|vest), accCol, hat, prop, idle
-- ============================================================================
local function animalFront(spec, frame, turn)
  local blink = frame==1
  local c=L.canvas(32,40); local cx=16
  local fur=spec.fur or M.FUR.brown
  local belly=spec.belly or M.FUR.cream
  local ic = spec.inner or L.hx("e29aa2")           -- inner-ear pink
  c:groundshadow(cx,38,9,2.4)
  c:sphere(11,36,2.6,2, fur); c:sphere(21,36,2.6,2, fur)   -- feet

  -- TAIL (behind body)
  local tc = spec.tailCol or fur
  if spec.tail=="bushy" then c:sphere(24,31,4.2,5, tc); c:sphere(25,29,2.2,3, belly)
  elseif spec.tail=="ring" then for i=0,3 do c:sphere(24+i,32-i*2,2.6-i*0.2,2.2,(i%2==0) and tc or M.FUR.black) end
  elseif spec.tail=="thin" then for i=0,6 do c:px(23+i,32-i,tc[2]); c:px(24+i,32-i,tc[1]) end
  elseif spec.tail=="flat" then c:sphere(25,34,3.6,2.4, R("5a3f2a","7a5638")) end

  -- BODY + belly
  c:sphere(cx,30,7.6,7, fur)
  c:sphere(cx,31,4.4,5, belly, 0.12)
  if spec.wings then                                             -- folded wings (raven)
    c:vline(10,27,33,fur[1]); c:vline(11,28,33,fur[2])
    c:vline(22,27,33,fur[1]); c:vline(21,28,33,fur[2])
    c:px(11,32,fur[3]); c:px(21,32,fur[3])
  end
  if spec.spikes then
    for i=0,12 do local a=(i/12)*math.pi; c:px(math.floor(cx-8*math.cos(a)), math.floor(30-7*math.sin(a)), ({fur[1],fur[2]})[1+i%2]) end
  end
  if spec.shell then
    c:sphere(cx,31,7.8,6.6, R("4a3a1e","6a5228","8a7038"))
    for _,p in ipairs({{16,28},{12,31},{20,31},{14,34},{18,34}}) do c:rect(p[1]-1,p[2]-1,p[1]+1,p[2]+1,L.hx("3a2e14")) end
  end
  c:sphere(9,29,2.2,3.2, fur); c:sphere(23,29,2.2,3.2, fur)  -- arms

  -- ACCESSORY on the chest
  local ac = spec.accCol or L.R.redroof
  if spec.acc=="bowtie" then c:fillrect(14,25,15,27,ac[2]); c:fillrect(17,25,18,27,ac[2]); c:px(16,26,ac[1])
  elseif spec.acc=="scarf" then c:fillrect(11,25,21,27, ac[2]); c:vline(13,27,31,ac[1]); c:hline(11,21,25,ac[3])
  elseif spec.acc=="collar" then c:hline(12,20,25, ac[2]); c:sphere(16,26,1.4,1.4,L.R.gold,0.2)
  elseif spec.acc=="vest" then c:sphere(cx,30,7.4,6.6, ac); c:sphere(cx,31,3.6,4.6, belly,0.1); c:px(16,27,L.R.gold[3])
  elseif spec.acc=="apron" then
    c:fillrect(13,26,19,30, ac[2]); c:fillrect(11,30,21,35, ac[2])  -- bib + skirt
    c:vline(13,24,26,ac[1]); c:vline(19,24,26,ac[1]); c:hline(11,21,30,ac[1]) end
  if spec.prop then M.prop(c, spec.prop) end

  -- HEAD
  local hy=14
  c:sphere(cx,hy,9,8.6, fur)
  if spec.wool then for _,p in ipairs({{8,8},{24,8},{7,13},{25,13},{10,5},{22,5},{16,4}}) do c:sphere(p[1],p[2],3,2.6, M.FUR.white) end
    c:sphere(cx,hy,7.5,7, M.FUR.white) end
  if spec.stripes then                                          -- badger: white face + dark eye-stripes
    c:sphere(cx,15,7,4.8, spec.stripes)
    c:fillrect(11,8,13,13, fur[1]); c:fillrect(19,8,21,13, fur[1])
  end
  if spec.crest then                                            -- raven: little feather crest
    c:px(cx-2,hy-9,fur[2]); c:px(cx,hy-10,fur[2]); c:px(cx+2,hy-9,fur[2]); c:px(cx,hy-8,fur[1])
  end
  if spec.sheen then                                            -- iridescent highlight (raven)
    c:px(12,hy-3,spec.sheen); c:px(13,hy-4,spec.sheen); c:px(11,hy-1,spec.sheen); c:px(14,29,spec.sheen)
  end

  -- EARS
  local es=6
  if spec.ears=="round" then
    for s=-1,1,2 do c:sphere(cx+s*es,hy-8,3.2,3.2,fur); c:sphere(cx+s*es,hy-7,1.6,1.6,ic) end
  elseif spec.ears=="pointy" then
    for s=-1,1,2 do local ex=(s<0) and 9 or 22          -- mirror-paired about x=15.5
      for i=0,6 do local w=math.floor((7-i)*0.4); c:hline(ex-w,ex+w, hy-6-i, fur[2]) end
      c:px(ex,hy-6,ic); c:px(ex,hy-7,ic); c:px(ex,hy-8,ic) end  -- symmetric inner ear
  elseif spec.ears=="tall" then
    for s=-1,1,2 do local ex=cx+s*4; c:sphere(ex,hy-10,2.2,6,fur); c:sphere(ex,hy-10,1,4,ic) end
  elseif spec.ears=="floppy" then
    for s=-1,1,2 do c:sphere(cx+s*8,hy-2,2.4,4.4,fur); c:sphere(cx+s*8,hy-2,1.2,2.6,ic) end
  elseif spec.ears=="tuft" then
    for s=-1,1,2 do local ex=cx+s*es
      for i=0,7 do local w=math.floor((8-i)*0.35); c:hline(ex-w,ex+w+s, hy-6-i, fur[2]) end
      c:px(ex+s,hy-13,fur[3]) end
  elseif spec.ears=="antlers" then
    for s=-1,1,2 do local ex=cx+s*5
      for i=0,7 do c:px(ex+s*math.floor(i*0.4), hy-8-i, L.R.wood[3]) end
      c:px(ex+s*3,hy-13,L.R.wood[3]); c:px(ex+s*4,hy-14,L.R.wood[3]); c:px(ex-s,hy-13,L.R.wood[2]) end
  end
  if spec.hat then M.hat(c, spec.hat, cx) end

  -- MUZZLE / BEAK — shifts right when the head is turned, so the snout/beak
  -- points the way the animal faces (the outfit/body stay the unchanged front).
  local mcx = (turn=="right") and (cx+5) or cx
  if spec.muzzle=="snout" then
    c:sphere(mcx,hy+4,4,3.2, belly,0.15)
  elseif spec.muzzle=="short" then
    c:sphere(mcx,hy+4,3,2.4, belly,0.15)
  elseif spec.muzzle=="beak" then
    local bk=spec.beakCol or L.R.gold
    if type(bk)=="number" then bk={bk,bk,bk} end
    for i=0,3 do local w=math.floor((4-i)*0.8); c:hline(mcx-w,mcx+w, hy+4+i, bk[math.max(1,3-i)]) end
  end

  c:outline()

  -- FACE
  local ey = blink and hy+1 or hy
  local lx,rx = 12,20
  if turn=="right" then lx,rx = 15,21 end                      -- eyes follow the turn
  if spec.rpface then                                           -- red panda: white cheeks/brows + tear marks
    local wh=M.FUR.white[3]
    c:sphere(11,hy+2,2.6,2.4, wh); c:sphere(21,hy+2,2.6,2.4, wh)
    c:hline(9,12,hy-3,wh); c:hline(20,23,hy-3,wh)
    c:px(12,hy+2,fur[1]); c:px(20,hy+2,fur[1])
  end
  if spec.mask then c:fillrect(9,ey-2,23,ey+2, spec.maskCol or M.FUR.black[1]) end
  local function eye(ex, behind)
    if blink then
      if behind then c:hline(ex-2,ex+2,ey,INK2); c:px(ex-1,ey-1,INK2); c:px(ex+1,ey-1,INK2)
      else c:px(ex-2,ey,INK2);c:px(ex-1,ey-1,INK2);c:px(ex,ey-1,INK2);c:px(ex+1,ey-1,INK2);c:px(ex+2,ey,INK2) end
    else
      if behind then c:fillrect(ex-1,ey-1,ex,ey+1,INK2); c:px(ex-1,ey-1,WHITE)
      else c:fillrect(ex-1,ey-2,ex+1,ey+1, INK2); c:px(ex-1,ey-2,WHITE); c:px(ex,ey+1,WHITE) end
    end
  end
  if spec.glasses then
    for _,ex in ipairs({lx,rx}) do c:fillrect(ex-1,ey-2,ex+1,ey+2,LENS); c:fillrect(ex-2,ey-1,ex+2,ey+1,LENS) end
    eye(lx,true); eye(rx,true)
    for _,ex in ipairs({lx,rx}) do
      c:hline(ex-1,ex+1,ey-3,INK2);c:hline(ex-1,ex+1,ey+3,INK2);c:vline(ex-3,ey-1,ey+1,INK2);c:vline(ex+3,ey-1,ey+1,INK2)
    end
    c:hline(lx+3,rx-3,ey,INK2)
  else eye(lx); eye(rx) end
  -- nose (for furry muzzles) — sits on the muzzle, which shifts when turned
  if spec.muzzle=="snout" or spec.muzzle=="short" then
    local nz=spec.nose or L.hx("2a1c1c"); c:fillrect(mcx-1,hy+3,mcx+1,hy+4,nz); c:hline(mcx-1,mcx+1,hy+5,INK2)
  elseif spec.muzzle=="none" and not spec.glasses then
    c:hline(12,20,hy+4,INK2); c:px(11,hy+3,INK2); c:px(21,hy+3,INK2)   -- wide smile (frog)
  end
  if spec.whiskers then
    if turn=="right" then c:hline(mcx+1,mcx+7,hy+4,belly[3]); c:hline(mcx+1,mcx+7,hy+6,belly[2])
    else c:hline(4,9,hy+4,belly[3]); c:hline(23,28,hy+4,belly[3]); c:hline(4,9,hy+6,belly[2]); c:hline(23,28,hy+6,belly[2]) end
  end
  if spec.blush~=false then c:blend(9,hy+3,L.rgba(242,130,150,110)); c:blend(23,hy+3,L.rgba(242,130,150,110)) end
  if frame==1 and spec.idle then spec.idle(c,{cx=cx,L=L,WHITE=WHITE}) end
  return c
end

-- shared ear drawer (front/back view) at a given ear-centre pair
local function animalEars(c, spec, fur, ic, hy, backview)
  local es=6
  if spec.ears=="round" then for s=-1,1,2 do c:sphere(16+s*es,hy-8,3.2,3.2,fur); if not backview then c:sphere(16+s*es,hy-7,1.6,1.6,ic) end end
  elseif spec.ears=="pointy" then for s=-1,1,2 do local ex=(s<0) and 9 or 22
    for i=0,6 do local w=math.floor((7-i)*0.4); c:hline(ex-w,ex+w,hy-6-i,fur[2]) end
    if not backview then c:px(ex,hy-6,ic); c:px(ex,hy-7,ic); c:px(ex,hy-8,ic) end end
  elseif spec.ears=="tall" then for s=-1,1,2 do local ex=16+s*4; c:sphere(ex,hy-10,2.2,6,fur); if not backview then c:sphere(ex,hy-10,1,4,ic) end end
  elseif spec.ears=="floppy" then for s=-1,1,2 do c:sphere(16+s*8,hy-2,2.4,4.4,fur); if not backview then c:sphere(16+s*8,hy-2,1.2,2.6,ic) end end
  elseif spec.ears=="tuft" then for s=-1,1,2 do local ex=16+s*es
    for i=0,7 do local w=math.floor((8-i)*0.35); c:hline(ex-w,ex+w+s,hy-6-i,fur[2]) end; c:px(ex+s,hy-13,fur[3]) end
  elseif spec.ears=="antlers" then for s=-1,1,2 do local ex=16+s*5
    for i=0,7 do c:px(ex+s*math.floor(i*0.4),hy-8-i,L.R.wood[3]) end
    c:px(ex+s*3,hy-13,L.R.wood[3]); c:px(ex+s*4,hy-14,L.R.wood[3]) end end
end

-- ANIMAL back (up). No face; fur/ears/tail/hat from behind.
local function animalBack(spec, frame)
  local c=L.canvas(32,40); local cx=16; local hy=14
  local fur=spec.fur or M.FUR.brown; local belly=spec.belly or M.FUR.cream
  local ic=spec.inner or L.hx("e29aa2"); local tc=spec.tailCol or fur
  c:groundshadow(cx,38,9,2.4)
  c:sphere(11,36,2.6,2,fur); c:sphere(21,36,2.6,2,fur)
  if spec.tail=="bushy" then c:sphere(cx,33,4.4,5,tc); c:sphere(cx,31,2.2,3,belly)
  elseif spec.tail=="ring" then for i=0,3 do c:sphere(cx,35-i*2,3-i*0.2,2.2,(i%2==0) and tc or M.FUR.black) end
  elseif spec.tail=="thin" then for i=0,6 do c:px(cx,33-i,tc[2]) end
  elseif spec.tail=="flat" then c:sphere(cx,36,3.6,2.2,R("5a3f2a","7a5638")) end
  c:sphere(cx,30,7.6,7,fur)
  if spec.wings then c:vline(10,27,33,fur[1]); c:vline(22,27,33,fur[1]); c:vline(16,28,33,fur[2]) end
  c:sphere(9,29,2.2,3.2,fur); c:sphere(23,29,2.2,3.2,fur)
  local ac=spec.accCol or L.R.redroof
  if spec.acc=="scarf" then c:fillrect(11,25,21,27,ac[2])
  elseif spec.acc=="collar" then c:hline(12,20,25,ac[2])
  elseif spec.acc=="apron" then c:vline(13,25,32,ac[1]); c:vline(19,25,32,ac[1])
  elseif spec.acc=="vest" then c:sphere(cx,30,7.4,6.6,ac) end
  c:sphere(cx,hy,9,8.6,fur)
  if spec.shell then c:sphere(cx,31,7.8,6.6,R("4a3a1e","6a5228","8a7038")) end
  animalEars(c, spec, fur, ic, hy, true)
  if spec.wool then for _,p in ipairs({{8,8},{24,8},{7,13},{25,13},{10,5},{22,5},{16,4}}) do c:sphere(p[1],p[2],3,2.6,M.FUR.white) end; c:sphere(cx,hy,7.5,7,M.FUR.white) end
  if spec.hat then M.hat(c,spec.hat,cx) end
  c:hline(13,19,hy-3,fur[1])                                    -- nape hint
  c:outline()
  return c
end

-- ANIMAL side (right). Profile; muzzle/beak points right, one eye + ear.
local function animalSide(spec, frame)
  local c=L.canvas(32,40); local blink=frame==1; local cx=15; local hy=14
  local fur=spec.fur or M.FUR.brown; local belly=spec.belly or M.FUR.cream
  local ic=spec.inner or L.hx("e29aa2"); local tc=spec.tailCol or fur
  c:groundshadow(16,38,8,2.4)
  c:sphere(12,36,2.4,2,fur); c:sphere(19,36,2.4,2,fur)
  if spec.tail=="bushy" then c:sphere(7,31,4,5,tc); c:sphere(7,29,2,2.6,belly)
  elseif spec.tail=="ring" then for i=0,3 do c:sphere(7-i,32-i,2.4,2.2,(i%2==0) and tc or M.FUR.black) end
  elseif spec.tail=="thin" then for i=0,6 do c:px(8-i,32-i,tc[2]) end
  elseif spec.tail=="flat" then c:sphere(6,34,3,2.2,R("5a3f2a","7a5638")) end
  c:sphere(cx,30,6.6,7,fur); c:sphere(18,31,3,5,belly,0.1); c:sphere(18,29,2.2,3,fur)
  local ac=spec.accCol or L.R.redroof
  if spec.acc=="scarf" then c:fillrect(15,25,21,27,ac[2]); c:vline(20,27,31,ac[1])
  elseif spec.acc=="collar" then c:hline(15,21,25,ac[2])
  elseif spec.acc=="bowtie" then c:fillrect(17,25,19,27,ac[2])
  elseif spec.acc=="apron" then c:fillrect(16,26,21,34,ac[2])
  elseif spec.acc=="vest" then c:sphere(cx,30,6.2,6.6,ac) end
  c:sphere(cx,hy,8,8,fur)
  if spec.muzzle=="snout" or spec.muzzle=="short" then
    c:sphere(21,hy+3,3,2.6,belly,0.15); local nz=spec.nose or L.hx("2a1c1c"); c:px(23,hy+3,nz); c:px(23,hy+2,nz)
  elseif spec.muzzle=="beak" then local bk=spec.beakCol or L.R.gold; if type(bk)=="number" then bk={bk,bk,bk} end
    for i=0,3 do c:hline(21,23+i,hy+2+i,bk[math.max(1,3-i)]) end end
  local es=6
  if spec.ears=="round" then c:sphere(11,6,3.2,3.2,fur)
  elseif spec.ears=="pointy" then for i=0,6 do local w=math.floor((7-i)*0.4); c:hline(11-w,11+w,hy-6-i,fur[2]) end
  elseif spec.ears=="tall" then c:sphere(11,hy-10,2.2,6,fur)
  elseif spec.ears=="floppy" then c:sphere(9,hy-1,2.4,4.4,fur)
  elseif spec.ears=="tuft" then for i=0,7 do local w=math.floor((8-i)*0.35); c:hline(11-w,11+w-1,hy-6-i,fur[2]) end
  elseif spec.ears=="antlers" then for i=0,7 do c:px(11-math.floor(i*0.4),hy-8-i,L.R.wood[3]) end end
  if spec.wool then c:sphere(cx,hy,7,6.5,M.FUR.white); c:sphere(9,10,3,2.6,M.FUR.white); c:sphere(11,6,2.6,2.4,M.FUR.white) end
  if spec.shell then c:sphere(13,31,6.6,6,R("4a3a1e","6a5228","8a7038")) end
  if spec.hat then M.hat(c,spec.hat,cx) end
  c:outline()
  local ex,ey=18, blink and hy+1 or hy
  if spec.mask then c:fillrect(13,ey-2,22,ey+2, spec.maskCol or M.FUR.black[1]) end
  if spec.glasses then
    c:fillrect(ex-1,ey-2,ex+1,ey+2,LENS); c:fillrect(ex-2,ey-1,ex+2,ey+1,LENS)
    if not blink then c:fillrect(ex-1,ey-1,ex,ey+1,INK2); c:px(ex-1,ey-1,WHITE) else c:hline(ex-2,ex+2,ey,INK2) end
    c:hline(ex-1,ex+1,ey-3,INK2);c:hline(ex-1,ex+1,ey+3,INK2);c:vline(ex-3,ey-1,ey+1,INK2);c:vline(ex+3,ey-1,ey+1,INK2)
  else
    if not blink then c:fillrect(ex-1,ey-2,ex+1,ey+1,INK2); c:px(ex-1,ey-2,WHITE)
    else c:px(ex-2,ey,INK2);c:px(ex-1,ey-1,INK2);c:px(ex,ey-1,INK2);c:px(ex+1,ey,INK2) end
  end
  if spec.whiskers then c:hline(22,27,hy+3,belly[3]); c:hline(22,27,hy+5,belly[2]) end
  if not blink then c:blend(15,hy+3,L.rgba(242,130,150,110)) end
  return c
end

-- dispatch by direction. Sides are the front pose with the head/muzzle turned
-- (body + markings stay the front), so the side matches the front. left=mirror.
function M.animal(spec, frame, dir)
  frame=frame or 0; dir=dir or "down"
  if dir=="up" then return animalBack(spec,frame)
  elseif dir=="right" then return animalFront(spec,frame,"right")
  elseif dir=="left" then local s=animalFront(spec,frame,"right"); local f=s:flipH(); s:close(); return f
  else return animalFront(spec,frame) end
end

-- Build a 2-frame idle strip (frame0 | frame1) -> 64x40 canvas.
function M.strip2(builder, spec)
  local f0 = builder(spec, 0)
  local f1 = builder(spec, 1)
  local s = L.strip({f0,f1})
  f0:close(); f1:close()
  return s
end

return M
