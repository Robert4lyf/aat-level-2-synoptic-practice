#!/usr/bin/env python3
"""Generates the Ledger Legends pixel-art sprite set (tiles, characters, scenes).

Run: python3 tools/gen_rpg_assets.py
Outputs PNGs into rpg-assets/. Pure procedural pixel art (no external assets),
drawn on small canvases with nearest-neighbour scaling so it stays crisp when
displayed with `image-rendering: pixelated` in the browser.
"""
import os
from PIL import Image, ImageDraw

OUT = os.path.join(os.path.dirname(__file__), '..', 'rpg-assets')
os.makedirs(OUT, exist_ok=True)

def canvas(w, h):
    return Image.new('RGBA', (w, h), (0, 0, 0, 0))

def save(img, name, scale=1):
    if scale != 1:
        img = img.resize((img.width * scale, img.height * scale), Image.NEAREST)
    img.save(os.path.join(OUT, name))
    print('wrote', name, img.size)

def outline(img, color=(20, 14, 10, 255), threshold=10):
    """Adds a 1px outline around opaque pixels (classic pixel-art silhouette)."""
    w, h = img.size
    src = img.load()
    out = img.copy()
    dst = out.load()
    for y in range(h):
        for x in range(w):
            if src[x, y][3] >= threshold:
                continue
            neigh = False
            for dx, dy in ((1,0),(-1,0),(0,1),(0,-1)):
                nx, ny = x+dx, y+dy
                if 0 <= nx < w and 0 <= ny < h and src[nx, ny][3] >= threshold:
                    neigh = True
                    break
            if neigh:
                dst[x, y] = color
    return out

def dither(draw, x0, y0, x1, y1, base, spots, density=0.16, seed=0):
    import random
    rnd = random.Random(seed)
    for y in range(y0, y1):
        for x in range(x0, x1):
            if rnd.random() < density:
                draw.point((x, y), fill=rnd.choice(spots))

print('Generating tiles...')

T = 32  # tile canvas size

GRASS_L = (161, 214, 117, 255)
GRASS_M = (124, 189, 84, 255)
GRASS_D = (91, 156, 63, 255)
GRASS_S = (63, 122, 48, 255)

def base_grass(seed=0):
    img = canvas(T, T)
    d = ImageDraw.Draw(img)
    d.rectangle((0, 0, T-1, T-1), fill=GRASS_M)
    dither(d, 0, 0, T, T, GRASS_M, [GRASS_L], density=0.10, seed=seed)
    dither(d, 0, 0, T, T, GRASS_M, [GRASS_D], density=0.08, seed=seed + 99)
    # small tufts
    import random
    rnd = random.Random(seed + 7)
    for _ in range(5):
        x = rnd.randint(2, T-4); y = rnd.randint(2, T-4)
        d.line((x, y, x, y-2), fill=GRASS_S)
        d.line((x-1, y, x-1, y-1), fill=GRASS_D)
        d.line((x+1, y, x+1, y-1), fill=GRASS_D)
    return img

def tile_grass():
    save(base_grass(seed=1), 'tile-grass.png')

def tile_flower():
    img = base_grass(seed=2)
    d = ImageDraw.Draw(img)
    blooms = [(8, 9, (249, 168, 212, 255)), (22, 20, (253, 224, 71, 255)),
              (14, 22, (249, 168, 212, 255)), (24, 9, (191, 219, 254, 255))]
    for x, y, c in blooms:
        d.point((x-1, y), fill=c); d.point((x+1, y), fill=c)
        d.point((x, y-1), fill=c); d.point((x, y+1), fill=c)
        d.point((x, y), fill=(255, 255, 255, 255))
    save(img, 'tile-flower.png')

PATH_L = (222, 202, 150, 255)
PATH_M = (199, 173, 115, 255)
PATH_D = (163, 138, 87, 255)
PATH_S = (124, 101, 61, 255)

def base_path(seed=0):
    img = canvas(T, T)
    d = ImageDraw.Draw(img)
    d.rectangle((0, 0, T-1, T-1), fill=PATH_M)
    dither(d, 0, 0, T, T, PATH_M, [PATH_L], density=0.12, seed=seed)
    dither(d, 0, 0, T, T, PATH_M, [PATH_D], density=0.10, seed=seed + 41)
    import random
    rnd = random.Random(seed + 5)
    for _ in range(4):
        x = rnd.randint(2, T-3); y = rnd.randint(2, T-3)
        d.point((x, y), fill=PATH_S)
        d.point((x+1, y), fill=PATH_S)
    return img

def tile_path():
    save(base_path(seed=3), 'tile-path.png')

def tile_sign():
    img = base_path(seed=11)
    d = ImageDraw.Draw(img)
    d.rectangle((14, 18, 17, 27), fill=(107, 63, 24, 255))
    d.rectangle((15, 19, 15, 26), fill=(139, 90, 43, 255))
    d.rectangle((7, 7, 24, 18), fill=(245, 208, 138, 255))
    d.rectangle((7, 7, 24, 9), fill=(255, 230, 180, 255))
    d.rectangle((7, 16, 24, 18), fill=(198, 154, 78, 255))
    d.rectangle((6, 6, 25, 6), fill=(122, 74, 34, 255))
    d.rectangle((6, 19, 25, 19), fill=(122, 74, 34, 255))
    d.line((6, 6, 6, 19), fill=(122, 74, 34, 255))
    d.line((25, 6, 25, 19), fill=(122, 74, 34, 255))
    for yy in (11, 13, 15):
        d.line((10, yy, 21, yy), fill=(139, 94, 46, 255))
    img = outline(img)
    save(img, 'tile-sign.png')

def tile_book():
    img = base_path(seed=13)
    d = ImageDraw.Draw(img)
    d.rectangle((6, 21, 25, 25), fill=(30, 64, 175, 255))
    d.rectangle((6, 21, 25, 22), fill=(59, 100, 220, 255))
    d.rectangle((6, 24, 25, 25), fill=(20, 45, 130, 255))
    d.rectangle((8, 14, 23, 20), fill=(220, 38, 38, 255))
    d.rectangle((8, 14, 23, 15), fill=(248, 113, 113, 255))
    d.rectangle((8, 19, 23, 20), fill=(153, 27, 27, 255))
    d.rectangle((9, 7, 22, 13), fill=(21, 128, 61, 255))
    d.rectangle((9, 7, 22, 8), fill=(74, 222, 128, 255))
    d.rectangle((9, 12, 22, 13), fill=(13, 84, 40, 255))
    for bx in (9, 22):
        d.line((bx, 7, bx, 13), fill=(240, 230, 200, 255))
    img = outline(img)
    save(img, 'tile-book.png')

def tile_well():
    img = base_path(seed=17)
    d = ImageDraw.Draw(img)
    d.ellipse((5, 20, 26, 29), fill=(100, 116, 139, 255))
    d.ellipse((7, 10, 24, 24), fill=(148, 163, 184, 255))
    d.ellipse((9, 12, 22, 22), fill=(56, 189, 248, 255))
    d.ellipse((10, 13, 21, 18), fill=(125, 211, 252, 255))
    d.rectangle((6, 3, 9, 15), fill=(120, 74, 34, 255))
    d.rectangle((22, 3, 25, 15), fill=(120, 74, 34, 255))
    d.rectangle((5, 2, 26, 5), fill=(150, 96, 47, 255))
    img = outline(img)
    save(img, 'tile-well.png')

def tile_ledger_stone():
    img = base_grass(seed=19)
    d = ImageDraw.Draw(img)
    d.rectangle((7, 5, 24, 27), fill=(148, 163, 184, 255))
    d.rectangle((7, 5, 24, 9), fill=(203, 213, 225, 255))
    d.rectangle((7, 23, 24, 27), fill=(100, 116, 139, 255))
    for i, yy in enumerate((13, 17, 21)):
        d.line((10, yy, 21, yy), fill=(71, 85, 105, 255))
    d.line((7, 5, 7, 27), fill=(226, 232, 240, 255))
    img = outline(img)
    save(img, 'tile-ledger-stone.png')

def tile_pathlamp():
    img = base_path(seed=23)
    d = ImageDraw.Draw(img)
    d.rectangle((14, 14, 17, 28), fill=(51, 65, 85, 255))
    d.rectangle((15, 14, 15, 27), fill=(71, 85, 105, 255))
    d.polygon([(9, 6), (22, 6), (19, 3), (12, 3)], fill=(51, 65, 85, 255))
    d.rectangle((11, 6, 20, 15), fill=(253, 224, 71, 255))
    d.rectangle((11, 6, 20, 9), fill=(254, 240, 138, 255))
    d.rectangle((11, 12, 20, 15), fill=(217, 119, 6, 255))
    for c in [(6,9),(25,9),(6,12),(25,12)]:
        d.point(c, fill=(146, 64, 14, 255))
    img = outline(img)
    save(img, 'tile-pathlamp.png')

print('tiles: grass/flower/path/sign/book/well/ledger/lamp')
tile_grass(); tile_flower(); tile_path(); tile_sign(); tile_book(); tile_well(); tile_ledger_stone(); tile_pathlamp()

def tile_tree():
    img = base_grass(seed=29)
    d = ImageDraw.Draw(img)
    d.rectangle((14, 22, 17, 29), fill=(122, 74, 34, 255))
    d.rectangle((15, 22, 15, 29), fill=(150, 96, 47, 255))
    d.ellipse((3, 2, 28, 23), fill=(29, 111, 53, 255))
    d.ellipse((5, 4, 24, 20), fill=(47, 143, 61, 255))
    d.ellipse((7, 3, 20, 14), fill=(74, 178, 84, 255))
    dither(d, 4, 2, 28, 22, (0,0,0,0), [(18, 82, 39, 255)], density=0.10, seed=30)
    d.ellipse((9, 6, 15, 11), fill=(140, 214, 140, 255))
    img = outline(img, color=(11, 43, 20, 255))
    save(img, 'tile-tree.png')

def tile_rock():
    img = base_grass(seed=31)
    d = ImageDraw.Draw(img)
    d.polygon([(6,26),(5,17),(10,10),(20,9),(26,15),(27,26)], fill=(100, 116, 139, 255))
    d.polygon([(8,25),(8,17),(12,12),(18,11),(16,25)], fill=(148, 163, 184, 255))
    d.polygon([(9,16),(13,13),(16,14),(12,20)], fill=(226, 232, 240, 255))
    d.polygon([(18,25),(19,15),(25,16),(25,25)], fill=(71, 85, 105, 255))
    img = outline(img, color=(30, 41, 59, 255))
    save(img, 'tile-rock.png')

def tile_house(roof=(220, 38, 38, 255), roof_d=(153, 27, 27, 255), roof_l=(248, 113, 113, 255)):
    img = base_path(seed=37)
    d = ImageDraw.Draw(img)
    d.rectangle((4, 16, 27, 29), fill=(245, 224, 160, 255))
    d.rectangle((4, 16, 27, 18), fill=(255, 240, 200, 255))
    d.rectangle((4, 26, 27, 29), fill=(198, 154, 78, 255))
    d.rectangle((13, 20, 18, 29), fill=(139, 90, 43, 255))
    d.rectangle((14, 21, 14, 28), fill=(163, 113, 63, 255))
    d.rectangle((6, 20, 10, 24), fill=(191, 219, 254, 255))
    d.rectangle((21, 20, 25, 24), fill=(191, 219, 254, 255))
    d.rectangle((6, 20, 10, 21), fill=(224, 242, 254, 255))
    d.rectangle((21, 20, 25, 21), fill=(224, 242, 254, 255))
    d.polygon([(1, 17), (15, 3), (30, 17)], fill=roof)
    d.polygon([(1, 17), (15, 3), (15, 17)], fill=roof_l)
    d.polygon([(15, 3), (30, 17), (15, 17)], fill=roof_d)
    d.rectangle((1, 16, 30, 18), fill=(122, 74, 34, 255))
    img = outline(img)
    save(img, 'tile-house.png')

def tile_factory_wall():
    img = canvas(T, T)
    d = ImageDraw.Draw(img)
    d.rectangle((0, 0, T-1, T-1), fill=(184, 170, 134, 255))
    dither(d, 0, 0, T, T, None, [(168, 154, 120, 255)], density=0.12, seed=41)
    d.rectangle((3, 9, 28, 27), fill=(229, 217, 168, 255))
    d.rectangle((3, 9, 28, 12), fill=(201, 179, 113, 255))
    d.rectangle((3, 24, 28, 27), fill=(138, 90, 33, 255))
    for x in (7, 15, 23):
        d.rectangle((x, 14, x+4, 20), fill=(125, 211, 252, 255))
        d.rectangle((x, 14, x+4, 15), fill=(224, 242, 254, 255))
        d.rectangle((x, 14, x+4, 20), outline=(71, 85, 105, 255))
    d.rectangle((0, 1, T-1, 6), fill=(147, 51, 234, 255))
    d.rectangle((0, 1, T-1, 3), fill=(192, 132, 252, 255))
    img = outline(img)
    save(img, 'tile-factory-wall.png')

def tile_gate_forest():
    img = base_grass(seed=43)
    d = ImageDraw.Draw(img)
    d.ellipse((-4, 1, 15, 22), fill=(21, 101, 52, 255))
    d.ellipse((17, 1, 36, 22), fill=(21, 101, 52, 255))
    d.ellipse((-2, 3, 13, 18), fill=(34, 139, 68, 255))
    d.ellipse((19, 3, 34, 18), fill=(34, 139, 68, 255))
    d.rectangle((11, 12, 20, 29), fill=(15, 23, 20, 255))
    d.rectangle((13, 14, 18, 29), fill=(38, 55, 40, 255))
    d.ellipse((11, 8, 20, 17), fill=(38, 55, 40, 255))
    d.rectangle((13, 20, 18, 20), fill=(74, 178, 84, 255))
    img = outline(img, color=(9, 46, 22, 255))
    save(img, 'tile-gate-forest.png')

def tile_gate_cave():
    img = canvas(T, T)
    d = ImageDraw.Draw(img)
    d.rectangle((0, 0, T-1, T-1), fill=(100, 116, 139, 255))
    dither(d, 0, 0, T, T, None, [(148, 163, 184, 255)], density=0.10, seed=47)
    dither(d, 0, 0, T, T, None, [(71, 85, 105, 255)], density=0.10, seed=48)
    d.ellipse((6, 8, 25, 32), fill=(15, 23, 42, 255))
    d.ellipse((9, 11, 22, 32), fill=(2, 6, 23, 255))
    d.polygon([(6, 8), (10, 15), (8, 8)], fill=(71, 85, 105, 255))
    d.polygon([(25, 8), (21, 16), (23, 8)], fill=(71, 85, 105, 255))
    d.point((13, 20), fill=(56, 189, 248, 255))
    d.point((18, 24), fill=(56, 189, 248, 255))
    d.point((14, 21), fill=(125, 211, 252, 255))
    img = outline(img, color=(30, 41, 59, 255))
    save(img, 'tile-gate-cave.png')

def tile_gate_factory():
    img = tile_factory_wall_base()
    d = ImageDraw.Draw(img)
    d.rectangle((9, 10, 22, 29), fill=(30, 27, 46, 255))
    d.rectangle((11, 12, 20, 29), fill=(88, 28, 135, 255))
    d.rectangle((11, 12, 20, 14), fill=(168, 85, 247, 255))
    d.line((15, 15, 15, 27), fill=(147, 51, 234, 255))
    img = outline(img)
    save(img, 'tile-gate-factory.png')

def tile_factory_wall_base():
    img = canvas(T, T)
    d = ImageDraw.Draw(img)
    d.rectangle((0, 0, T-1, T-1), fill=(184, 170, 134, 255))
    dither(d, 0, 0, T, T, None, [(168, 154, 120, 255)], density=0.12, seed=41)
    d.rectangle((0, 1, T-1, 6), fill=(147, 51, 234, 255))
    d.rectangle((0, 1, T-1, 3), fill=(192, 132, 252, 255))
    return img

def tile_gate_town():
    img = base_path(seed=53)
    d = ImageDraw.Draw(img)
    d.rectangle((4, 10, 10, 29), fill=(139, 90, 43, 255))
    d.rectangle((21, 10, 27, 29), fill=(139, 90, 43, 255))
    d.rectangle((4, 10, 27, 14), fill=(220, 38, 38, 255))
    d.rectangle((4, 10, 27, 11), fill=(248, 113, 113, 255))
    d.polygon([(2, 10), (15, 1), (29, 10)], fill=(217, 119, 6, 255))
    d.polygon([(2, 10), (15, 1), (15, 10)], fill=(251, 191, 36, 255))
    d.rectangle((12, 17, 19, 29), fill=(120, 74, 34, 255))
    d.line((15, 17, 15, 29), fill=(150, 96, 47, 255))
    img = outline(img)
    save(img, 'tile-gate-town.png')

print('tiles: tree/rock/house/factory/gates')
tile_tree(); tile_rock(); tile_house(); tile_factory_wall()
tile_gate_forest(); tile_gate_cave(); tile_gate_factory(); tile_gate_town()

# ---------------------------------------------------------------------------
print('Generating characters...')
CW, CH = 32, 40

SKIN = (247, 197, 149, 255)
SKIN_SH = (222, 163, 117, 255)
OUTLINE = (26, 18, 14, 255)

def char_player():
    img = canvas(CW, CH)
    d = ImageDraw.Draw(img)
    # legs
    d.rectangle((11, 30, 14, 37), fill=(30, 58, 138, 255))
    d.rectangle((18, 30, 21, 37), fill=(30, 58, 138, 255))
    d.rectangle((10, 36, 15, 38), fill=(87, 60, 30, 255))
    d.rectangle((17, 36, 22, 38), fill=(87, 60, 30, 255))
    # torso / jacket
    d.rectangle((9, 18, 23, 31), fill=(37, 99, 235, 255))
    d.rectangle((9, 18, 23, 20), fill=(59, 130, 246, 255))
    d.rectangle((9, 27, 23, 31), fill=(29, 78, 216, 255))
    d.line((16, 20, 16, 30), fill=(29, 78, 216, 255))
    # arms
    d.rectangle((5, 19, 9, 29), fill=(59, 130, 246, 255))
    d.rectangle((23, 19, 27, 29), fill=(59, 130, 246, 255))
    d.rectangle((5, 26, 9, 29), fill=SKIN)
    d.rectangle((23, 26, 27, 29), fill=SKIN)
    # backpack strap hint
    d.rectangle((13, 19, 14, 26), fill=(220, 38, 38, 255))
    d.rectangle((18, 19, 19, 26), fill=(220, 38, 38, 255))
    # head
    d.rectangle((10, 6, 22, 18), fill=SKIN)
    d.rectangle((10, 15, 22, 18), fill=SKIN_SH)
    # cap
    d.rectangle((9, 3, 23, 8), fill=(220, 38, 38, 255))
    d.rectangle((9, 3, 23, 5), fill=(248, 113, 113, 255))
    d.rectangle((18, 7, 26, 9), fill=(185, 28, 28, 255))
    # eyes
    d.point((13, 12), fill=OUTLINE); d.point((19, 12), fill=OUTLINE)
    d.line((12, 16, 15, 16), fill=(153, 27, 27, 255))
    img = outline(img)
    save(img, 'char-player.png')

def char_cub():
    img = canvas(CW, CH)
    d = ImageDraw.Draw(img)
    gold = (250, 204, 21, 255); gold_sh = (202, 138, 4, 255); cream = (254, 243, 199, 255)
    d.ellipse((6, 22, 27, 38), fill=gold)
    d.ellipse((6, 30, 27, 38), fill=gold_sh)
    d.ellipse((9, 27, 24, 38), fill=cream)
    d.ellipse((7, 9, 26, 27), fill=gold)
    d.ellipse((7, 18, 26, 27), fill=gold_sh)
    d.ellipse((11, 16, 22, 27), fill=cream)
    d.ellipse((5, 5, 12, 12), fill=gold)
    d.ellipse((21, 5, 28, 12), fill=gold)
    d.ellipse((7, 7, 10, 10), fill=(251, 146, 60, 255))
    d.ellipse((23, 7, 26, 10), fill=(251, 146, 60, 255))
    d.ellipse((11, 14, 14, 17), fill=(28, 20, 15, 255))
    d.ellipse((19, 14, 22, 17), fill=(28, 20, 15, 255))
    d.point((12, 15), fill=(255,255,255,255)); d.point((20, 15), fill=(255,255,255,255))
    d.ellipse((14, 18, 19, 21), fill=(120, 53, 15, 255))
    d.point((15, 22), fill=(120, 53, 15, 255)); d.point((18, 22), fill=(120, 53, 15, 255))
    d.ellipse((22, 27, 30, 32), fill=gold)
    img = outline(img)
    save(img, 'char-cub.png')

def char_fox():
    img = canvas(CW, CH)
    d = ImageDraw.Draw(img)
    orange = (249, 115, 22, 255); orange_sh = (194, 65, 12, 255); white = (255, 251, 235, 255); black = (28, 20, 15, 255)
    d.polygon([(24, 33), (31, 20), (26, 27)], fill=orange)
    d.polygon([(27, 22), (31, 20), (28, 26)], fill=white)
    d.ellipse((6, 21, 26, 38), fill=orange)
    d.ellipse((6, 30, 26, 38), fill=white)
    d.ellipse((8, 8, 26, 26), fill=orange)
    d.polygon([(8, 9), (5, 1), (13, 8)], fill=orange)
    d.polygon([(21, 9), (28, 1), (24, 8)], fill=orange)
    d.polygon([(8, 8), (6, 3), (11, 8)], fill=black)
    d.polygon([(22, 8), (26, 3), (23, 8)], fill=black)
    d.polygon([(12, 16), (17, 22), (11, 23)], fill=white)
    d.polygon([(22, 16), (17, 22), (23, 23)], fill=white)
    d.ellipse((11, 13, 14, 16), fill=black)
    d.ellipse((20, 13, 23, 16), fill=black)
    d.point((12, 14), fill=(255,255,255,255)); d.point((21, 14), fill=(255,255,255,255))
    d.ellipse((15, 18, 19, 21), fill=black)
    img = outline(img)
    save(img, 'char-fox.png')

def char_mole():
    img = canvas(CW, CH)
    d = ImageDraw.Draw(img)
    brown = (120, 113, 108, 255); brown_sh = (68, 64, 60, 255); pink = (249, 168, 212, 255)
    d.ellipse((6, 16, 27, 37), fill=brown)
    d.ellipse((6, 27, 27, 37), fill=brown_sh)
    d.ellipse((9, 22, 24, 34), fill=(214, 211, 209, 255))
    d.ellipse((8, 8, 25, 22), fill=brown)
    d.ellipse((3, 6, 10, 12), fill=brown)
    d.ellipse((23, 6, 30, 12), fill=brown)
    d.ellipse((13, 15, 20, 20), fill=pink)
    d.ellipse((9, 12, 12, 15), fill=black if False else (20,20,20,255))
    d.ellipse((21, 12, 24, 15), fill=(20,20,20,255))
    d.rectangle((5, 32, 11, 38), fill=(214, 211, 209, 255))
    d.rectangle((22, 32, 28, 38), fill=(214, 211, 209, 255))
    d.line((6, 34, 6, 36), fill=(120,113,108,255)); d.line((9,34,9,36), fill=(120,113,108,255))
    d.line((23, 34, 23, 36), fill=(120,113,108,255)); d.line((26,34,26,36), fill=(120,113,108,255))
    img = outline(img)
    save(img, 'char-mole.png')

char_player(); char_cub(); char_fox(); char_mole()

# ---------------------------------------------------------------------------
print('Generating bosses...')
BW, BH = 56, 56

def boss_drake():
    img = canvas(BW, BH)
    d = ImageDraw.Draw(img)
    green = (22, 101, 52, 255); green_l = (34, 139, 68, 255); green_d = (12, 62, 32, 255); gold = (250, 204, 21, 255)
    d.polygon([(6, 34), (2, 20), (16, 26)], fill=green_d)
    d.polygon([(50, 34), (54, 20), (40, 26)], fill=green_d)
    d.polygon([(6, 34), (2, 20), (16, 26)], outline=OUTLINE)
    d.ellipse((10, 24, 46, 52), fill=green)
    d.ellipse((10, 40, 46, 52), fill=green_d)
    d.polygon([(16, 30), (28, 44), (18, 50), (14, 40)], fill=gold)
    d.ellipse((14, 8, 42, 32), fill=green)
    d.ellipse((14, 20, 42, 32), fill=green_l)
    d.polygon([(17, 10), (14, 2), (22, 12)], fill=green_d)
    d.polygon([(34, 10), (42, 2), (30, 12)], fill=green_d)
    d.ellipse((18, 15, 25, 22), fill=(255, 255, 255, 255))
    d.ellipse((31, 15, 38, 22), fill=(255, 255, 255, 255))
    d.ellipse((20, 17, 24, 21), fill=(220, 38, 38, 255))
    d.ellipse((33, 17, 37, 21), fill=(220, 38, 38, 255))
    d.point((21, 18), fill=(0,0,0,255)); d.point((34, 18), fill=(0,0,0,255))
    d.polygon([(22, 26), (28, 30), (34, 26), (28, 33)], fill=gold)
    d.polygon([(46, 30), (52, 26), (49, 38)], fill=green)
    img = outline(img)
    save(img, 'boss-itbk.png')

def boss_golem():
    img = canvas(BW, BH)
    d = ImageDraw.Draw(img)
    grey = (100, 116, 139, 255); grey_l = (148, 163, 184, 255); grey_d = (51, 65, 85, 255); glow = (56, 189, 248, 255)
    d.rectangle((8, 32, 47, 52), fill=grey)
    d.rectangle((8, 44, 47, 52), fill=grey_d)
    d.rectangle((2, 34, 11, 48), fill=grey)
    d.rectangle((44, 34, 53, 48), fill=grey)
    d.rectangle((2, 44, 11, 48), fill=grey_d)
    d.rectangle((44, 44, 53, 48), fill=grey_d)
    d.rectangle((14, 10, 41, 34), fill=grey_l)
    d.rectangle((14, 26, 41, 34), fill=grey)
    d.polygon([(14, 10), (20, 4), (20, 10)], fill=grey_d)
    d.polygon([(41, 10), (35, 4), (35, 10)], fill=grey_d)
    d.rectangle((19, 16, 25, 22), fill=glow)
    d.rectangle((30, 16, 36, 22), fill=glow)
    d.rectangle((20, 17, 24, 18), fill=(224, 242, 254, 255))
    d.rectangle((31, 17, 35, 18), fill=(224, 242, 254, 255))
    d.line((18, 28, 37, 28), fill=grey_d)
    d.rectangle((16, 38, 22, 44), fill=glow)
    d.rectangle((33, 38, 39, 44), fill=glow)
    for x in (12, 20, 28, 36, 44):
        d.line((x, 33, x, 51), fill=grey_d)
    img = outline(img)
    save(img, 'boss-pobc.png')

def boss_chimera():
    img = canvas(BW, BH)
    d = ImageDraw.Draw(img)
    purple = (126, 34, 206, 255); purple_l = (168, 85, 247, 255); purple_d = (76, 29, 149, 255); orange = (251, 146, 60, 255)
    d.polygon([(46, 20), (54, 8), (50, 24)], fill=orange)
    d.ellipse((10, 26, 46, 52), fill=purple)
    d.ellipse((10, 42, 46, 52), fill=purple_d)
    d.polygon([(6, 40), (0, 50), (10, 46)], fill=orange)
    d.ellipse((14, 8, 40, 32), fill=purple)
    d.ellipse((14, 22, 40, 32), fill=purple_l)
    d.polygon([(16, 10), (10, 0), (21, 9)], fill=orange)
    d.polygon([(38, 10), (44, 0), (33, 9)], fill=orange)
    d.ellipse((18, 15, 25, 22), fill=(255, 236, 179, 255))
    d.ellipse((29, 15, 36, 22), fill=(255, 236, 179, 255))
    d.ellipse((20, 17, 24, 21), fill=(220, 38, 38, 255))
    d.ellipse((31, 17, 35, 21), fill=(220, 38, 38, 255))
    d.point((21, 18), fill=(0,0,0,255)); d.point((32, 18), fill=(0,0,0,255))
    d.line((22, 27, 32, 27), fill=purple_d)
    d.polygon([(20, 44), (27, 50), (34, 44), (27, 38)], fill=orange)
    img = outline(img)
    save(img, 'boss-poc.png')

def boss_griffin():
    img = canvas(BW, BH)
    d = ImageDraw.Draw(img)
    tan = (194, 154, 90, 255); tan_l = (222, 184, 120, 255); tan_d = (140, 105, 58, 255)
    blue = (59, 130, 246, 255); blue_l = (147, 197, 253, 255); blue_d = (30, 64, 175, 255); white = (255, 251, 235, 255)
    d.polygon([(2, 30), (14, 14), (18, 40)], fill=blue)
    d.polygon([(54, 30), (42, 14), (38, 40)], fill=blue)
    d.polygon([(2, 30), (14, 14), (10, 32)], fill=blue_l)
    d.polygon([(54, 30), (42, 14), (46, 32)], fill=blue_l)
    d.ellipse((10, 28, 46, 52), fill=tan)
    d.ellipse((10, 44, 46, 52), fill=tan_d)
    d.ellipse((16, 8, 40, 30), fill=white)
    d.ellipse((16, 20, 40, 30), fill=(230, 220, 200, 255))
    d.polygon([(20, 10), (28, 2), (36, 10), (28, 14)], fill=blue_d)
    d.polygon([(23, 15), (28, 22), (33, 15)], fill=(217, 119, 6, 255))
    d.ellipse((19, 12, 25, 18), fill=(255,255,255,255))
    d.ellipse((31, 12, 37, 18), fill=(255,255,255,255))
    d.ellipse((21, 13, 24, 17), fill=(217, 119, 6, 255))
    d.ellipse((33, 13, 36, 17), fill=(217, 119, 6, 255))
    d.point((22, 14), fill=(0,0,0,255)); d.point((34, 14), fill=(0,0,0,255))
    d.polygon([(18, 8), (13, 0), (23, 6)], fill=white)
    d.polygon([(38, 8), (43, 0), (33, 6)], fill=white)
    img = outline(img)
    save(img, 'boss-besy.png')

boss_drake(); boss_golem(); boss_chimera(); boss_griffin()

# ---------------------------------------------------------------------------
print('Generating scenes...')
SW, SH = 160, 96

def vgrad(d, x0, y0, x1, y1, c_top, c_bot):
    h = y1 - y0
    for i in range(h):
        t = i / max(1, h - 1)
        c = tuple(int(c_top[k] + (c_bot[k]-c_top[k]) * t) for k in range(3)) + (255,)
        d.line((x0, y0+i, x1, y0+i), fill=c)

def scene_forest():
    img = canvas(SW, SH)
    d = ImageDraw.Draw(img)
    vgrad(d, 0, 0, SW, 58, (167, 231, 176), (204, 240, 158))
    for x, r in [(14, 22), (46, 28), (80, 24), (116, 30), (146, 20)]:
        d.ellipse((x-r, 34-r*0.7, x+r, 46), fill=(58, 140, 79, 255))
    d.rectangle((0, 46, SW, SH), fill=(93, 168, 76, 255))
    dither(d, 0, 46, SW, SH, None, [(124, 189, 84, 255)], density=0.10, seed=61)
    dither(d, 0, 46, SW, SH, None, [(63, 122, 48, 255)], density=0.08, seed=62)
    for x in (10, 140):
        d.ellipse((x-20, 4, x+20, 44), fill=(21, 101, 52, 255))
        d.ellipse((x-16, 8, x+16, 40), fill=(34, 139, 68, 255))
        d.rectangle((x-4, 40, x+4, SH), fill=(90, 58, 30, 255))
    d.polygon([(64, SH), (64, 30), (80, 14), (96, 30), (96, SH)], fill=(20, 22, 20, 255))
    d.polygon([(70, SH), (70, 34), (80, 22), (90, 34), (90, SH)], fill=(38, 55, 40, 255))
    save(img, 'scene-forest.png')

def scene_cave():
    img = canvas(SW, SH)
    d = ImageDraw.Draw(img)
    vgrad(d, 0, 0, SW, SH, (30, 27, 46, 255), (15, 23, 42, 255))
    for x, w, h in [(10,14,20),(38,10,26),(70,16,18),(100,12,30),(130,18,22),(150,10,16)]:
        d.polygon([(x-w//2, 0), (x+w//2, 0), (x, h)], fill=(51, 65, 85, 255))
        d.polygon([(x-w//4, 0), (x+w//4, 0), (x, h*0.6)], fill=(71, 85, 105, 255))
    d.rectangle((0, 74, SW, SH), fill=(20, 18, 32, 255))
    dither(d, 0, 74, SW, SH, None, [(51, 65, 85, 255)], density=0.14, seed=63)
    for x, y in [(20, 20), (55, 30), (90, 16), (125, 26), (140, 40), (30, 50), (105, 55)]:
        d.ellipse((x-2, y-3, x+2, y+3), fill=(56, 189, 248, 255))
        d.ellipse((x-1, y-2, x+1, y+1), fill=(186, 230, 253, 255))
    save(img, 'scene-cave.png')

def scene_factory():
    img = canvas(SW, SH)
    d = ImageDraw.Draw(img)
    vgrad(d, 0, 0, SW, 60, (76, 29, 149, 255), (168, 85, 247, 255))
    for x, w, h in [(20, 30, 40), (60, 22, 55), (95, 26, 34), (130, 30, 48)]:
        d.rectangle((x, 60-h if 60-h>0 else 0, x+w, 62), fill=(30, 27, 46, 255))
    for x in (32, 145):
        d.rectangle((x, 6, x+6, 40), fill=(51, 46, 74, 255))
        d.ellipse((x-3, 2, x+9, 10), fill=(107, 33, 168, 255))
    d.rectangle((0, 62, SW, SH), fill=(51, 46, 74, 255))
    dither(d, 0, 62, SW, SH, None, [(71, 65, 100, 255)], density=0.12, seed=67)
    for gx, gy in [(24, 78), (70, 82), (120, 76)]:
        d.ellipse((gx-9, gy-9, gx+9, gy+9), outline=(192, 132, 252, 255))
        d.ellipse((gx-3, gy-3, gx+3, gy+3), fill=(192, 132, 252, 255))
    save(img, 'scene-factory.png')

def scene_town():
    img = canvas(SW, SH)
    d = ImageDraw.Draw(img)
    vgrad(d, 0, 0, SW, 56, (253, 186, 116, 255), (254, 240, 180, 255))
    houses = [(6, 24, (220,38,38,255)), (108, 30, (37,99,235,255))]
    for x, w, roofc in houses:
        base_y = 56
        d.rectangle((x, base_y-22, x+w, base_y), fill=(245, 224, 160, 255))
        d.polygon([(x-4, base_y-22), (x+w//2, base_y-38), (x+w+4, base_y-22)], fill=roofc)
        for wx in range(x+4, x+w-6, 12):
            d.rectangle((wx, base_y-16, wx+6, base_y-10), fill=(191, 219, 254, 255))
    d.rectangle((0, 56, SW, SH), fill=(222, 202, 150, 255))
    dither(d, 0, 56, SW, SH, None, [(199, 173, 115, 255)], density=0.12, seed=71)
    for x in range(0, SW, 16):
        c = (239, 68, 68, 255) if (x//16) % 2 == 0 else (250, 204, 21, 255)
        d.polygon([(x, 8), (x+8, 8), (x+4, 16)], fill=c)
    save(img, 'scene-town.png')

scene_forest(); scene_cave(); scene_factory(); scene_town()
print('Done. All assets written to', OUT)

