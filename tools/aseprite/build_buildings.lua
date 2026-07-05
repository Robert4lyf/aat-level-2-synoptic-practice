-- Build the multi-tile building sprites into tools/aseprite/out/.
-- Run:  aseprite -b -script tools/aseprite/build_buildings.lua
local DIR = "C:/Users/rober/Documents/aat_app/tools/aseprite/"
local B = dofile(DIR.."buildings.lua")
local OUT = DIR.."out/"
local function save(c,n) c:save(OUT..n..".png"); c:close() end

save(B.house_small_1(),  "building-house-small-1")
save(B.house_small_2(),  "building-house-small-2")
save(B.house_medium_1(), "building-house-medium-1")
save(B.house_medium_2(), "building-house-medium-2")
save(B.house_large_1(),  "building-house-large-1")
save(B.house_large_2(),  "building-house-large-2")
save(B.shop_1(),         "building-shop-1")
save(B.shop_2(),         "building-shop-2")
save(B.town_hall_1(),    "building-town-hall-1")
save(B.town_hall_2(),    "building-town-hall-2")
save(B.factory_1(),      "building-factory-1")
save(B.factory_2(),      "building-factory-2")
print("BUILDINGS_OK")
