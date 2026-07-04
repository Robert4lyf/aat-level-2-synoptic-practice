-- Creature/NPC/boss builder for Ledger Legends (Storybook Ledger style).
-- One parameterised chibi builder renders companions (32x40), townsfolk
-- (32x40) and bosses (56x56) so the whole cast stays on-model.
local DIR = "C:/Users/rober/Documents/aat_app/tools/aseprite/"
local L = dofile(DIR.."lib.lua")
local C = {}

local WHITE = L.hx("ffffff")
local function darker(v)  -- pick a darker ink-ish tone for mouths
  return L.INK
end

-- spec fields: ramp, size={w,h}, ears(round|pointy|horns|none), tail,
-- wings(membrane|feather|none), muzzle(snout|beak|grin|none), eyes(cute|fierce),
-- crest(bool), belly(ramp name|nil), inner(hex), nose(hex), blush(bool),
-- extra(function(c, P)) for per-creature flourishes.
function C.build(spec)
  local w = (spec.size and spec.size[1]) or 32
  local h = (spec.size and spec.size[2]) or 40
  local boss = (w>=48)
  local c = L.canvas(w,h)
  local R = L.R[spec.ramp]
  local cx = w/2
  -- proportions
  local headR  = boss and (w*0.26) or (w*0.30)
  local headY  = boss and (h*0.30) or (h*0.34)
  local bodyR  = boss and (w*0.27) or (w*0.29)
  local bodyY  = boss and (h*0.66) or (h*0.68)
  local footY  = h-2

  c:groundshadow(cx, footY, boss and w*0.34 or w*0.32, boss and 3.2 or 2.6)

  -- WINGS (behind)
  if spec.wings=="membrane" then
    local wr=L.R[spec.ramp]
    for side=-1,1,2 do
      local ox=cx+side*bodyR*0.7
      -- wing arm
      local tipx=ox+side*(boss and 15 or 9)
      local topy=bodyY-(boss and 16 or 9)
      c:sphere(ox+side*4, bodyY-4, boss and 8 or 5, boss and 11 or 7, wr, -0.15)
      -- membrane webbing (darker)
      for i=0,3 do
        local fx=ox+side*(i*(boss and 4 or 2.4))
        c:vline(math.floor(fx), math.floor(topy+ i*(boss and 2 or 1.4)), math.floor(bodyY-1), wr[2])
      end
    end
  elseif spec.wings=="feather" then
    local fr=L.R.feather
    for side=-1,1,2 do
      local ox=cx+side*bodyR*0.65
      for i=0,(boss and 3 or 2) do
        c:sphere(ox+side*i*(boss and 3.4 or 2.2), bodyY-6-i*(boss and 3 or 2),
                 boss and 5 or 3.4, boss and 8 or 5, fr, -0.1)
      end
    end
  end

  -- TAIL hints (side)
  if spec.tail=="bushy" then
    c:sphere(cx+bodyR*0.9, bodyY+2, w*0.14, w*0.16, R,-0.1)
    c:sphere(cx+bodyR*0.9, bodyY+1, w*0.07, w*0.09, L.R.cream,0.1)
  elseif spec.tail=="flame" then
    local e=L.R.ember
    for i=0,3 do c:sphere(cx+bodyR*0.85+i, bodyY-2-i*2, 3-i*0.4, 4-i*0.5, e, 0.1+i*0.1) end
  elseif spec.tail=="spade" then
    c:sphere(cx+bodyR*0.85, bodyY+2, 3, 5, R,-0.1)
  end

  -- BODY
  c:sphere(cx, bodyY, bodyR, bodyR*0.98, R)
  -- belly
  local bel = spec.belly and L.R[spec.belly] or L.R.cream
  if spec.muzzle~="none_body" then
    c:sphere(cx, bodyY+1, bodyR*0.55, bodyR*0.66, bel, 0.18)
  end

  -- HEAD
  c:sphere(cx, headY, headR, headR*0.94, R)

  -- EARS / HORNS / CREST
  local earSp = headR*0.72
  if spec.ears=="round" then
    for side=-1,1,2 do
      c:sphere(cx+side*earSp, headY-headR*0.72, headR*0.4, headR*0.42, R)
      c:sphere(cx+side*earSp, headY-headR*0.66, headR*0.2, headR*0.22,
               spec.inner and {L.hx(spec.inner)} or L.R.skin, 0.2)
    end
  elseif spec.ears=="pointy" then
    for side=-1,1,2 do
      local ex=cx+side*earSp
      for i=0,math.floor(headR*0.7) do
        local ww=math.floor((headR*0.7-i)*0.5)
        c:hline(ex-ww, ex+ww, headY-headR*0.5-i, R[3])
      end
      c:sphere(ex,headY-headR*0.55,headR*0.16,headR*0.3, spec.inner and {L.hx(spec.inner)} or L.R.skin,0.2)
    end
  elseif spec.ears=="horns" then
    for side=-1,1,2 do
      local ex=cx+side*earSp*0.9
      local hcol=L.R.cream
      for i=0,math.floor(headR*0.9) do
        local ww=math.max(0,math.floor((headR*0.9-i)*0.42))
        local xx=ex+side*i*0.5
        c:hline(xx-ww, xx+ww, headY-headR*0.5-i, hcol[math.min(#hcol, 2+math.floor(i/3))])
      end
    end
  end
  if spec.crest then
    local gr=L.R.gold
    for i=0,math.floor(headR*0.8) do
      local ww=math.max(0,math.floor((headR*0.8-i)*0.4))
      c:hline(cx-ww,cx+ww, headY-headR*0.85-i, gr[math.min(#gr,3+i%2)])
    end
  end

  -- MUZZLE
  if spec.muzzle=="snout" then
    c:sphere(cx, headY+headR*0.42, headR*0.42, headR*0.34, L.R.cream, 0.2)
  elseif spec.muzzle=="beak" then
    local gr=L.R.gold
    local by=headY+headR*0.38
    for i=0,math.floor(headR*0.5) do
      local ww=math.floor((headR*0.5-i)*0.7)
      c:hline(cx-ww,cx+ww, by+i, gr[math.max(1,3-math.floor(i/2))])
    end
  end

  c:outline()

  -- EYES (after outline, on top)
  local eyeSp = headR*0.44
  local eyeY  = headY - (boss and headR*0.05 or 0)
  if spec.eyes=="fierce" then
    for side=-1,1,2 do
      local ex=math.floor(cx+side*eyeSp)
      -- glowing sclera
      c:fillrect(ex-2,eyeY-1,ex+2,eyeY+1, L.hx(spec.eyeglow or "ffd23e"))
      c:px(ex+side, eyeY, L.INK); c:px(ex, eyeY, L.INK)  -- slit pupil
      -- angry brow
      c:hline(ex-3,ex+2, eyeY-2-(side<0 and 0 or 0), L.INK)
      c:px(math.floor(cx+side*eyeSp)+ (side<0 and -3 or 3), eyeY-3, L.INK)
    end
  else -- cute
    for side=-1,1,2 do
      local ex=math.floor(cx+side*eyeSp)
      c:fillrect(ex-1,eyeY-2,ex,eyeY+2, L.INK)
      c:px(ex-1,eyeY-2,WHITE)  -- shine
      c:px(ex, eyeY+2, L.INK)
    end
  end

  -- NOSE / MOUTH
  if spec.muzzle=="snout" then
    local ny=math.floor(headY+headR*0.30)
    local nz=spec.nose and L.hx(spec.nose) or L.hx("6b3a1c")
    c:px(math.floor(cx),ny,nz); c:px(math.floor(cx)-1,ny,nz)
    c:vline(math.floor(cx), ny+1, ny+2, L.INK)
    c:hline(math.floor(cx)-2,math.floor(cx)-1, ny+2, L.INK)
    c:hline(math.floor(cx)+1,math.floor(cx)+2, ny+2, L.INK)
  elseif spec.muzzle=="grin" then
    local my=math.floor(headY+headR*0.42)
    c:hline(math.floor(cx-headR*0.4), math.floor(cx+headR*0.4), my, L.INK)
    -- fangs
    c:px(math.floor(cx-headR*0.28), my+1, WHITE)
    c:px(math.floor(cx+headR*0.28), my+1, WHITE)
  end

  -- BLUSH
  if spec.blush~=false and not boss then
    for side=-1,1,2 do
      c:blend(math.floor(cx+side*headR*0.7), math.floor(headY+headR*0.28),
              L.rgba(240,120,140,110))
    end
  end

  if spec.extra then spec.extra(c, {cx=cx,headY=headY,headR=headR,bodyY=bodyY,bodyR=bodyR,L=L}) end
  return c
end

-- ---- iron golem / adding-machine boss (56x56) ----------------------------
function C.golem()
  local c=L.canvas(56,56)
  local cx=28
  c:groundshadow(cx,52,18,3.2)
  local I=L.R.iron
  local S=L.R.steel
  -- legs
  c:fillrect(18,44,26,52,I[2]); c:fillrect(30,44,38,52,I[2])
  c:sphere(22,52,5,2.4,I,-0.1); c:sphere(34,52,5,2.4,I,-0.1)
  -- body: heavy riveted chassis
  c:fillrect(14,24,42,46,I[3])
  c:sphere(28,34,15,12,I)
  -- chest plate / ledger screen
  c:fillrect(19,28,37,40,S[2])
  c:fillrect(21,30,35,38,L.hx("1c2a1e")) -- dark screen
  -- green ledger glow lines
  for i=0,3 do c:hline(22,34,31+i*2,L.hx("46d06a")) end
  -- rivets
  for _,p in ipairs({{16,26},{40,26},{16,44},{40,44}}) do c:sphere(p[1],p[2],1.4,1.4,S,0.3) end
  -- shoulders/arms
  c:sphere(12,30,5,6,I); c:sphere(44,30,5,6,I)
  c:fillrect(9,32,14,46,I[2]); c:fillrect(42,32,47,46,I[2])
  c:sphere(11,47,4,4,S,0.1); c:sphere(45,47,4,4,S,0.1)
  -- head: boxy with antenna
  c:fillrect(20,10,36,26,I[3])
  c:sphere(28,17,9,8,I)
  c:vline(28,4,9,S[2]); c:sphere(28,4,2,2,L.R.ember,0.3) -- antenna bulb
  c:outline()
  -- glowing eyes (visor)
  c:fillrect(22,15,34,18,L.hx("0c1810"))
  c:fillrect(23,16,26,17,L.hx("6fe0f2")); c:fillrect(30,16,33,17,L.hx("6fe0f2"))
  -- mouth grille
  for i=0,3 do c:vline(24+i*2,21,23,L.INK) end
  return c
end

-- ---- player (accountant kid) ---------------------------------------------
function C.player()
  local c=L.canvas(32,40)
  local cx=16
  c:groundshadow(cx,37,9,2.6)
  local sk=L.R.skin
  -- legs
  c:fillrect(11,30,14,37, L.hx("38507e")); c:fillrect(18,30,21,37, L.hx("38507e"))
  c:fillrect(11,36,15,38, L.hx("3a2a22")); c:fillrect(17,36,21,38, L.hx("3a2a22"))
  -- torso (vest over shirt)
  c:sphere(cx,26,7,7, L.R.blueroof)
  c:fillrect(13,22,18,30, L.PAPER) -- shirt front
  c:vline(15,22,29, L.INKBLUE)     -- tie
  c:px(15,24,L.hx("b03030"))
  -- arms
  c:sphere(9,25,2.4,4, L.R.blueroof); c:sphere(23,25,2.4,4, L.R.blueroof)
  c:sphere(9,29,1.8,1.8, sk); c:sphere(23,29,1.8,1.8, sk)
  -- head
  c:sphere(cx,13,8,8, sk)
  -- hair
  for i=0,8 do c:hline(9+i-4,9+i+4-4,6, L.hx("5a3a22")) end
  c:sphere(cx,8,8,4, L.R.wood, -0.2)
  c:fillrect(8,6,24,9, L.hx("5a3a22"))
  c:outline()
  -- eyes
  c:fillrect(12,13,12,14,L.INK); c:px(12,13,WHITE)
  c:fillrect(19,13,19,14,L.INK); c:px(19,13,WHITE)
  c:px(16,15,L.hx("c67f4e")) -- nose
  c:hline(14,18,17,L.INK) -- smile
  c:blend(10,15,L.rgba(240,120,140,110)); c:blend(22,15,L.rgba(240,120,140,110))
  -- little green visor cap accent (accountant)
  return c
end

return C
