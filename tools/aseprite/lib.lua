-- Ledger Legends — "Storybook Ledger" art library (Aseprite Lua)
-- Shared palette + shaded primitives. Light from TOP-LEFT, warm rim light,
-- selective dark-plum ink outline. Every asset draws through these helpers so
-- the whole world reads as one cohesive set.

local M = {}

-- ---- colour helpers -------------------------------------------------------
local function rgba(r,g,b,a) return app.pixelColor.rgba(r,g,b,a or 255) end
local function hx(s,a)
  s = s:gsub("#","")
  return rgba(tonumber(s:sub(1,2),16), tonumber(s:sub(3,4),16), tonumber(s:sub(5,6),16), a or 255)
end
M.hx = hx
M.rgba = rgba

-- Global ink outline (dark warm plum, never pure black)
M.INK = hx("241826")

-- Ramps: dark -> light, hue-shifted (shadows cooler, highlights warmer).
local function ramp(...) local t={} for _,s in ipairs({...}) do t[#t+1]=hx(s) end return t end
M.R = {
  grass   = ramp("2e5e2f","3f7d3a","59a24a","7cc65f","a6e07d"),
  meadow  = ramp("4f8f39","63a847","7cbf56","95d36b","b7e888"),
  canopy  = ramp("22461f","315e28","437a35","5c9a45","7cbb5c","9fd772"),
  pine    = ramp("133423","1c5138","2c724c","3f8f60","63b183"),
  dirt    = ramp("6f4a28","8c6236","ac7f4b","ca9f66","e8c590"),
  path    = ramp("8a6a3f","a8854f","c4a266","dcbe82","f0d8a4"),
  wood    = ramp("41291a","5c3b22","7d5530","a17840","c69c5a","e6c37c"),
  stone   = ramp("39404f","535d70","76839a","9fadc2","ccd7ea"),
  water   = ramp("1c5f8f","2f86bd","4fabe0","86d2f2","c2ecfc"),
  redroof = ramp("7c2530","a8343d","d24d47","ef7a63","ffab8c"),
  blueroof= ramp("21386b","2f57a0","4380cb","6ea8e2","a6cef2"),
  gold    = ramp("8a5714","b8801f","e2aa2e","f6ca45","ffe694"),
  fox     = ramp("7c3013","a8491b","d16b24","f08d36","ffb562"),
  mole    = ramp("3f3a3d","5a5254","79706e","99908c","bcb2ae"),
  dragon  = ramp("17402a","22613c","2e844e","47a75f","72c67c"),
  purple  = ramp("3a1560","562592","793ec0","9d61e2","c191f4"),
  teal    = ramp("164a45","226b60","2f8c7c","47ad99","74c8b6"),
  griffin = ramp("6e4a20","96682e","bb8a44","d9ab5e","f0cd85"),
  feather = ramp("b8ab88","d3c7a4","e7dcc0","f4ecd7","fdf9ec"),
  iron    = ramp("2a3040","414a5e","5d6980","8290a8","aeb9cf"),
  steel   = ramp("454b5a","626a7e","8894a8","b0bccf","dde6f4"),
  skin    = ramp("9a5a34","c67f4e","e6a06c","f6c290","ffdcae"),
  brick   = ramp("5a3a33","7a4d42","986552","b78166","d2a07e"),
  blossom = ramp("b0426f","d4658f","f088b4","fbb0d2","ffd6e8"),
  cream   = ramp("d8c49a","e8d5ac","f4e6c4","fff2d4","fffbe8"),
  ember   = ramp("8a2a12","c24618","ef7a1e","ffb038","ffe27a"),
  crystal = ramp("2a6f8c","3f9fc0","6fc8e2","a6e4f4","dbf6ff"),
  puddle  = ramp("30414d","445a68","5f7a8a","8aa3b2","b9cdd6"),
}
M.CREAM   = hx("fff2d4")
M.CREAMSH = hx("e8d5ac")
M.PAPER   = hx("f2e4bd")
M.INKBLUE = hx("223a6b")

-- ---- canvas ---------------------------------------------------------------
local Canvas = {}
Canvas.__index = Canvas
function M.canvas(w,h)
  local spr = Sprite(w,h, ColorMode.RGB)
  local c = setmetatable({spr=spr, img=spr.cels[1].image, w=w, h=h}, Canvas)
  return c
end

local function unpackc(v)
  return app.pixelColor.rgbaR(v), app.pixelColor.rgbaG(v),
         app.pixelColor.rgbaB(v), app.pixelColor.rgbaA(v)
end

-- alpha-over blend src (int) onto pixel at x,y
function Canvas:blend(x,y,v)
  x=math.floor(x); y=math.floor(y)
  if x<0 or y<0 or x>=self.w or y>=self.h then return end
  local sa = app.pixelColor.rgbaA(v)
  if sa==0 then return end
  if sa==255 then self.img:drawPixel(x,y,v); return end
  local d = self.img:getPixel(x,y)
  local dr,dg,db,da = unpackc(d)
  local sr,sg,sb = app.pixelColor.rgbaR(v), app.pixelColor.rgbaG(v), app.pixelColor.rgbaB(v)
  local a = sa/255
  local outa = sa + da*(1-a)
  if outa<=0 then return end
  local function mix(s,dd) return math.floor((s*sa + dd*da*(1-a))/outa + 0.5) end
  self.img:drawPixel(x,y, rgba(mix(sr,dr),mix(sg,dg),mix(sb,db), math.floor(outa+0.5)))
end

-- set opaque pixel (no blend)
function Canvas:px(x,y,v)
  x=math.floor(x); y=math.floor(y)
  if x<0 or y<0 or x>=self.w or y>=self.h then return end
  self.img:drawPixel(x,y,v)
end

function Canvas:get(x,y)
  if x<0 or y<0 or x>=self.w or y>=self.h then return 0 end
  return self.img:getPixel(x,y)
end
function Canvas:empty(x,y) return app.pixelColor.rgbaA(self:get(x,y))==0 end

function Canvas:hline(x0,x1,y,v) if x1<x0 then x0,x1=x1,x0 end for x=x0,x1 do self:px(x,y,v) end end
function Canvas:vline(x,y0,y1,v) if y1<y0 then y0,y1=y1,y0 end for y=y0,y1 do self:px(x,y,v) end end
function Canvas:fillrect(x0,y0,x1,y1,v)
  if x1<x0 then x0,x1=x1,x0 end if y1<y0 then y0,y1=y1,y0 end
  for y=y0,y1 do for x=x0,x1 do self:px(x,y,v) end end
end
function Canvas:rect(x0,y0,x1,y1,v)
  self:hline(x0,x1,y0,v); self:hline(x0,x1,y1,v)
  self:vline(x0,y0,y1,v); self:vline(x1,y0,y1,v)
end

-- filled ellipse with spherical cel-shading from a ramp (dark->light).
-- light dir top-left; rim darkening at the edge. `bias` shifts overall light.
function Canvas:sphere(cx,cy,rx,ry,rp,bias)
  bias = bias or 0
  if type(rp)=="number" then rp={rp} end
  local n = #rp
  local Lx,Ly = -0.62,-0.66
  for y=math.floor(cy-ry), math.ceil(cy+ry) do
    for x=math.floor(cx-rx), math.ceil(cx+rx) do
      local nx=(x+0.5-cx)/rx local ny=(y+0.5-cy)/ry
      local d2=nx*nx+ny*ny
      if d2<=1.0 then
        local dot = nx*Lx+ny*Ly            -- -1..1 (1 = lit side)
        local rim = 1.0-d2                  -- 0 at edge, 1 at center
        local t = 0.5 + dot*0.5             -- 0..1 lit
        t = t*0.72 + rim*0.28               -- pull edges darker
        t = t + bias
        local idx = math.floor(t*(n-1) + 0.5)+1
        if idx<1 then idx=1 elseif idx>n then idx=n end
        -- warm rim highlight on the extreme top-left crescent
        if dot>0.72 and d2>0.5 then idx=math.min(n,idx+1) end
        self:px(x,y,rp[idx])
      end
    end
  end
end

-- soft ground shadow (semi-transparent), squashed ellipse
function Canvas:groundshadow(cx,cy,rx,ry)
  local col = rgba(20,14,26,90)
  for y=math.floor(cy-ry), math.ceil(cy+ry) do
    for x=math.floor(cx-rx), math.ceil(cx+rx) do
      local nx=(x+0.5-cx)/rx local ny=(y+0.5-cy)/ry
      if nx*nx+ny*ny<=1.0 then self:blend(x,y,col) end
    end
  end
end

-- filled disc convenience (flat colour)
function Canvas:disc(cx,cy,rx,ry,v)
  for y=math.floor(cy-ry), math.ceil(cy+ry) do
    for x=math.floor(cx-rx), math.ceil(cx+rx) do
      local nx=(x+0.5-cx)/rx local ny=(y+0.5-cy)/ry
      if nx*nx+ny*ny<=1.0 then self:px(x,y,v) end
    end
  end
end

-- Selective ink outline: any transparent pixel 4-adjacent to a filled pixel
-- becomes INK. Grows the silhouette outward by 1px (keeps interior clean).
function Canvas:outline(col)
  col = col or M.INK
  local todo={}
  for y=0,self.h-1 do for x=0,self.w-1 do
    if self:empty(x,y) then
      if (not self:empty(x-1,y)) or (not self:empty(x+1,y)) or
         (not self:empty(x,y-1)) or (not self:empty(x,y+1)) then
        todo[#todo+1]={x,y}
      end
    end
  end end
  for _,p in ipairs(todo) do self:px(p[1],p[2],col) end
end

-- 1px inner ink on the bottom-right interior edge for extra form
function Canvas:coreshade(col)
  col = col or M.INK
  local todo={}
  for y=0,self.h-1 do for x=0,self.w-1 do
    if not self:empty(x,y) then
      if self:empty(x+1,y) or self:empty(x,y+1) then todo[#todo+1]={x,y} end
    end
  end end
end

-- ---- procedural texture helpers -------------------------------------------
-- integer hash -> 0..1 (stable, seedable)
function M.hash(x,y,s)
  local v = (x*374761393 + y*668265263 + (s or 0)*2246822519) & 0x7fffffff
  v = (v ~ (v >> 13)) * 1274126177
  v = (v ~ (v >> 16)) & 0x7fffffff
  return (v % 100000)/100000.0
end
-- smooth value noise: bilinear interp of hash on a coarse grid, smoothstep'd.
-- Gives soft painterly patches instead of harsh per-pixel speckle. Returns 0..1.
function M.vnoise(x,y,seed,scale)
  scale = scale or 6
  local gx,gy = x/scale, y/scale
  local x0,y0 = math.floor(gx), math.floor(gy)
  local fx,fy = gx-x0, gy-y0
  fx = fx*fx*(3-2*fx); fy = fy*fy*(3-2*fy)
  local h = M.hash
  local a,b = h(x0,y0,seed), h(x0+1,y0,seed)
  local c,d = h(x0,y0+1,seed), h(x0+1,y0+1,seed)
  local top = a+(b-a)*fx
  local bot = c+(d-c)*fx
  return top+(bot-top)*fy
end
-- map a 0..1 value to a ramp index (1..#ramp), clamped
function M.rampidx(t,n)
  local i = math.floor(t*(n-1)+0.5)+1
  if i<1 then i=1 elseif i>n then i=n end
  return i
end

function Canvas:save(path)
  self.img = self.spr.cels[1].image  -- refresh handle
  self.spr:saveAs(path)
end
function Canvas:close() self.spr:close() end

M.Canvas = Canvas
return M
