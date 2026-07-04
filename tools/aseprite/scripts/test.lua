local s = Sprite(8,8, ColorMode.RGB)
local img = s.cels[1].image
img:drawPixel(4,4, app.pixelColor.rgba(0,255,0,255))
img:drawPixel(2,2, app.pixelColor.rgba(255,0,0,255))
s:saveAs("C:/Users/rober/Documents/aat_app/tools/aseprite/out/test.png")
print("SCRIPT_OK "..s.width.."x"..s.height)
