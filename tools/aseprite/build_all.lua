-- Build every Ledger Legends asset into tools/aseprite/out/ in one pass.
-- Run:  aseprite -b -script tools/aseprite/build_all.lua
local DIR = "C:/Users/rober/Documents/aat_app/tools/aseprite/"
dofile(DIR.."build_tiles.lua")
dofile(DIR.."build_cast.lua")
dofile(DIR.."build_bosses.lua")
dofile(DIR.."build_scenes.lua")
print("BUILD_ALL_OK")
