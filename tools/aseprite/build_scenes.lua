local DIR="C:/Users/rober/Documents/aat_app/tools/aseprite/"
local S=dofile(DIR.."scenes.lua"); local OUT=DIR.."out/"
local function sv(c,n) c:save(OUT..n..".png"); c:close() end
sv(S.forest(),"scene-forest"); sv(S.cave(),"scene-cave")
sv(S.factory(),"scene-factory"); sv(S.town(),"scene-town")
print("SCENES_OK")
