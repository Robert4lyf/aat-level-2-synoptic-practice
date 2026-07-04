#!/usr/bin/env python3
"""Ledger Legends pixel-art asset generator.

Run:  python3 tools/gen_rpg_assets.py            # regenerate every asset
      python3 tools/gen_rpg_assets.py --list     # list asset names
      python3 tools/gen_rpg_assets.py --only tree  # regenerate matching subset

Outputs crisp low-res PNGs into rpg-assets/ for display with
`image-rendering: pixelated`. Everything is procedural — no external art.

============================ HOW TO ADD ASSETS =============================
This file is organised so that new assets are added as DATA, not drawing
code. Scroll to the "ASSET SPec TABLES" section near the bottom:

  * TILES     — 32x32 map tiles.   Add {'kind': ..., **params}.
  * CREATURES — companions/bosses. Add a spec dict (palette, ears, tail,
                wings, eyes...) and the shared creature builder renders it
                with correct shading, outline and proportions.
  * SCENES    — 160x96 backdrops.  Pick a layout + palette params.

The builders enforce the style contract below, so a spec-only change stays
on-model even without artistic judgement.

============================= STYLE CONTRACT ===============================
  * Light always comes from the TOP-LEFT. Shadows fall bottom-right.
  * Colours come from the RAMPS table: hue-shifted ramps (shadows go
    cooler/darker, highlights warmer/lighter) — never plain black/white
    shading. Reuse existing ramps before inventing new ones.
  * Sprites get a selective dark-plum outline (OUTLINE), not pure black.
  * Objects standing on the ground get a soft ground-shadow ellipse.
  * Texture = small hand-shaped clumps (grass tufts, pebbles), never
    single-pixel random noise.
  * Cute proportions: big heads, round bodies, 1px eye shines, blush.
============================================================================
"""
import argparse
import os
from random import Random

from PIL import Image, ImageChops, ImageDraw

OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'rpg-assets')

OUTLINE = (34, 22, 38, 255)          # global selective-outline colour (dark plum)


def hx(s, a=255):
    s = s.lstrip('#')
    return (int(s[0:2], 16), int(s[2:4], 16), int(s[4:6], 16), a)


# --- Palette ramps: dark -> light, hue-shifted for that warm retro glow. ---
RAMPS = {
    'foliage':  [hx('1c4a2b'), hx('2a6b3a'), hx('3f9448'), hx('63bb58'), hx('92da74'), hx('c8f0a0')],
    'pine':     [hx('123626'), hx('1c5138'), hx('2c724c'), hx('459465'), hx('72b989')],
    'meadow':   [hx('4f8f39'), hx('63a847'), hx('7cbf56'), hx('95d36b'), hx('b4e585')],
    'path':     [hx('8a6a3f'), hx('a8854f'), hx('c4a266'), hx('dcbe82'), hx('f0d8a4')],
    'wood':     [hx('3d2517'), hx('5c3b22'), hx('7d5530'), hx('a17840'), hx('c69c5a'), hx('e6c37c')],
    'stone':    [hx('3d4456'), hx('586377'), hx('7b889d'), hx('a4b0c4'), hx('d0d8e8')],
    'water':    [hx('1e5f8c'), hx('2c85ba'), hx('49abde'), hx('7ed0f2'), hx('bdeafc')],
    'roof_red': [hx('7c2026'), hx('a83236'), hx('d24b46'), hx('f07a64'), hx('ffab8c')],
    'roof_blue':[hx('1f3b70'), hx('2d57a0'), hx('407ecb'), hx('6ca6e2'), hx('a4ccf2')],
    'gold':     [hx('8c5c14'), hx('bb801e'), hx('e2aa2e'), hx('f6ca45'), hx('ffe38d')],
    'fox':      [hx('7c3013'), hx('aa4b1b'), hx('d36c25'), hx('f08d36'), hx('ffb560')],
    'mole':     [hx('413c3d'), hx('5d5554'), hx('7c7270'), hx('9b908d'), hx('bab0ad')],
    'dragon':   [hx('184026'), hx('23613a'), hx('2f844a'), hx('47a75d'), hx('70c67a')],
    'purple':   [hx('3b1662'), hx('582692'), hx('7b3ec0'), hx('9d61e2'), hx('c191f4')],
    'griffin':  [hx('6e4a20'), hx('96682e'), hx('bb8a44'), hx('d9ab5e'), hx('f0cd85')],
    'feather':  [hx('9c8f74'), hx('c2b697'), hx('ddd3b6'), hx('f0e9d2'), hx('fdf9ec')],
    'iron':     [hx('2c3140'), hx('434b5e'), hx('5f6a80'), hx('828ea6'), hx('aab6cc')],
    'skin':     [hx('a05a32'), hx('cf8352'), hx('eaa871'), hx('f8c894'), hx('ffdfb4')],
    'brick':    [hx('5c3a33'), hx('7c4f42'), hx('9a6752'), hx('b98366'), hx('d4a17e')],
    'blossom':  [hx('b04a78'), hx('d76898'), hx('f08ab8'), hx('fbb1d3'), hx('ffd7ea')],
}

CREAM = hx('fff3d6')
CREAM_SH = hx('e8d5ac')


# ============================ core canvas helpers ==========================

def canvas(w, h):
    return Image.new('RGBA', (w, h), (0, 0, 0, 0))


def save(img, name):
    os.makedirs(OUT, exist_ok=True)
    img.save(os.path.join(OUT, name))
    print('wrote', name, img.size)


def B(box):
    return tuple(int(round(v)) for v in box)


def _mask(size, draw_fn):
    m = Image.new('L', size, 0)
    draw_fn(ImageDraw.Draw(m))
    return m


def ellipse_mask(size, box):
    return _mask(size, lambda d: d.ellipse(B(box), fill=255))


def poly_mask(size, pts):
    return _mask(size, lambda d: d.polygon([B(p) for p in pts], fill=255))


def paint(img, mask, color):
    img.paste(Image.new('RGBA', img.size, color), (0, 0), mask)


def shift(box, dx, dy):
    return (box[0] + dx, box[1] + dy, box[2] + dx, box[3] + dy)


def shaded_ellipse(img, box, ramp, depth=2, shine=True):
    """Cel-shaded ball: mid fill, cool bottom-right crescent, warm top-left
    crescent, optional inner shine. The workhorse for bodies/heads/canopies."""
    dark, mid, light = ramp[0], ramp[1], ramp[2]
    lightest = ramp[3] if len(ramp) > 3 else ramp[-1]
    base = ellipse_mask(img.size, box)
    paint(img, base, mid)
    paint(img, ImageChops.subtract(base, ellipse_mask(img.size, shift(box, -depth, -depth))), dark)
    paint(img, ImageChops.subtract(base, ellipse_mask(img.size, shift(box, depth, depth))), light)
    if shine:
        x0, y0, x1, y1 = box
        w, h = x1 - x0, y1 - y0
        sb = (x0 + w * 0.24, y0 + h * 0.16, x0 + w * 0.52, y0 + h * 0.4)
        paint(img, ellipse_mask(img.size, sb), lightest)


def shaded_poly(img, pts, ramp, shade_side='right'):
    """Flat-shaded polygon with a darker sliver on the shadow side."""
    base = poly_mask(img.size, pts)
    paint(img, base, ramp[1])
    d = 2 if shade_side == 'right' else -2
    paint(img, ImageChops.subtract(base, poly_mask(img.size, [(p[0] - d, p[1] - 1) for p in pts])), ramp[0])
    paint(img, ImageChops.subtract(base, poly_mask(img.size, [(p[0] + d, p[1] + 2) for p in pts])), ramp[2])


def outline(img, color=OUTLINE, threshold=10):
    """1px selective outline around every opaque region."""
    w, h = img.size
    src = img.load()
    out = img.copy()
    dst = out.load()
    for y in range(h):
        for x in range(w):
            if src[x, y][3] >= threshold:
                continue
            for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                nx, ny = x + dx, y + dy
                if 0 <= nx < w and 0 <= ny < h and src[nx, ny][3] >= threshold:
                    dst[x, y] = color
                    break
    return out


def ground_shadow(img, cx, y, w, color):
    """Soft contact shadow so objects sit ON the ground, not float."""
    d = ImageDraw.Draw(img)
    d.ellipse(B((cx - w / 2, y - 2, cx + w / 2, y + 2)), fill=color)


def dither_band(d, x0, y, x1, color, rows=2):
    """Checkerboard blend row between two colour bands (scene horizons)."""
    for r in range(rows):
        for x in range(int(x0), int(x1)):
            if (x + r) % 2 == 0:
                d.point((x, int(y) + r), fill=color)


def grass_tufts(d, w, h, ramp, seed, n=7, margin=2, y0=0):
    """Hand-shaped grass clumps: light L-shape blades + dark root px."""
    rnd = Random(seed)
    for _ in range(n):
        x = rnd.randint(margin, w - margin - 2)
        y = rnd.randint(max(y0, margin + 2), h - margin - 1)
        d.point([(x, y - 1), (x, y - 2), (x + 1, y - 1)], fill=ramp[4])
        d.point([(x, y), (x + 1, y)], fill=ramp[3])
        d.point((x + rnd.choice((-1, 2)), y + 1), fill=ramp[0])


def pebbles(d, w, h, ramp, seed, n=5, margin=3):
    """Little 2x1 pebbles with a light top edge."""
    rnd = Random(seed)
    for _ in range(n):
        x = rnd.randint(margin, w - margin - 3)
        y = rnd.randint(margin, h - margin - 2)
        d.point([(x, y + 1), (x + 1, y + 1), (x + 2, y + 1)], fill=ramp[0])
        d.point([(x, y), (x + 1, y)], fill=ramp[3])


# ============================ base ground tiles ============================

T = 32  # map tile size


def base_grass(seed=1, tufts=7):
    img = canvas(T, T)
    d = ImageDraw.Draw(img)
    m = RAMPS['meadow']
    d.rectangle((0, 0, T - 1, T - 1), fill=m[2])
    rnd = Random(seed)
    for _ in range(10):                      # broad soft mottling patches
        x, y = rnd.randint(-4, T - 4), rnd.randint(-4, T - 4)
        d.ellipse((x, y, x + rnd.randint(5, 9), y + rnd.randint(4, 7)),
                  fill=rnd.choice((m[1], m[3])))
    grass_tufts(d, T, T, m, seed + 7, n=tufts)
    return img


def base_path(seed=3):
    img = canvas(T, T)
    d = ImageDraw.Draw(img)
    p = RAMPS['path']
    d.rectangle((0, 0, T - 1, T - 1), fill=p[2])
    rnd = Random(seed)
    for _ in range(9):
        x, y = rnd.randint(-4, T - 4), rnd.randint(-4, T - 4)
        d.ellipse((x, y, x + rnd.randint(5, 9), y + rnd.randint(3, 6)),
                  fill=rnd.choice((p[1], p[3])))
    pebbles(d, T, T, p, seed + 11, n=5)
    return img


# ============================== tile recipes ===============================

def leaf_clusters(img, boxes, ramp, seed, n=4):
    """Sprinkle lighter leaf clumps on the sunny (top-left) side of a canopy."""
    d = ImageDraw.Draw(img)
    rnd = Random(seed)
    for x0, y0, x1, y1 in boxes:
        for _ in range(n):
            x = rnd.randint(int(x0 + 2), int(x0 + (x1 - x0) * 0.6))
            y = rnd.randint(int(y0 + 1), int(y0 + (y1 - y0) * 0.5))
            d.point([(x, y), (x + 1, y), (x, y + 1)], fill=ramp[4])
            d.point((x + 1, y + 1), fill=ramp[3])


def tile_grass(variant=1):
    img = base_grass(seed=variant * 13, tufts=6 + variant)
    d = ImageDraw.Draw(img)
    if variant == 2:                          # tiny daisies
        for x, y in ((7, 9), (21, 20)):
            d.point([(x - 1, y), (x + 1, y), (x, y - 1), (x, y + 1)], fill=CREAM)
            d.point((x, y), fill=RAMPS['gold'][3])
    if variant == 3:                          # a pebble and extra blades
        p = RAMPS['stone']
        d.point([(22, 9), (23, 9)], fill=p[3])
        d.point([(22, 10), (23, 10), (24, 10)], fill=p[1])
    return img


def tile_path(variant=1):
    img = base_path(seed=variant * 17)
    d = ImageDraw.Draw(img)
    if variant == 2:                          # grass creeping over the edge
        m = RAMPS['meadow']
        d.point([(2, 3), (3, 3), (2, 4), (28, 27), (29, 27), (29, 26)], fill=m[3])
        d.point([(3, 4), (28, 26)], fill=m[1])
    return img


def tile_flower(variant=1):
    img = base_grass(seed=40 + variant, tufts=4)
    d = ImageDraw.Draw(img)
    sets = {
        1: [(8, 10, RAMPS['blossom'][3]), (22, 8, RAMPS['gold'][3]), (14, 22, RAMPS['blossom'][2]), (25, 21, CREAM)],
        2: [(9, 8, RAMPS['roof_blue'][3]), (23, 12, CREAM), (7, 22, RAMPS['roof_blue'][4]), (20, 24, RAMPS['blossom'][3])],
    }[variant]
    m = RAMPS['meadow']
    for x, y, c in sets:
        d.point((x, y + 2), fill=m[0])                       # stem
        d.point((x - 1, y + 2), fill=m[1])                   # leaf
        d.point([(x - 1, y), (x + 1, y), (x, y - 1), (x, y + 1)], fill=c)
        d.point((x, y), fill=CREAM if c != CREAM else RAMPS['gold'][3])
    return img


def tile_tree(variant=1):
    img = base_grass(seed=60 + variant, tufts=3)
    m = RAMPS['meadow']
    ground_shadow(img, 16, 27, 20, m[0])
    d = ImageDraw.Draw(img)
    w = RAMPS['wood']
    if variant == 2:                          # pine
        p = RAMPS['pine']
        d.rectangle((14, 25, 17, 29), fill=w[1])
        d.line((15, 25, 15, 29), fill=w[3])
        shaded_poly(img, [(16, 13), (4, 27), (28, 27)], p)
        shaded_poly(img, [(16, 7), (6, 20), (26, 20)], p)
        shaded_poly(img, [(16, 1), (9, 13), (23, 13)], p)
        d.line((16, 2, 10, 12), fill=p[4])   # sunny left edge
        d.line((16, 8, 8, 19), fill=p[4])
        return outline(img, color=hx('0d2a1d'))
    f = RAMPS['blossom'] if variant == 3 else RAMPS['foliage']
    # trunk with root flare + grain
    d.rectangle((13, 20, 18, 28), fill=w[1])
    d.line((14, 20, 14, 28), fill=w[3])
    d.line((17, 21, 17, 28), fill=w[0])
    d.point([(12, 28), (19, 28)], fill=w[1])
    # canopy: back lobes then front, each cel-shaded
    lobes = [(4, 6, 18, 20), (14, 5, 28, 19), (7, 2, 23, 15), (5, 8, 25, 23)]
    for lb in lobes:
        shaded_ellipse(img, lb, f, shine=False)
    shaded_ellipse(img, (8, 5, 22, 17), f)
    leaf_clusters(img, [(5, 3, 26, 20)], f, seed=variant * 5, n=7)
    if variant == 3:                          # blossom tree: petals drift down
        d.point([(9, 24), (23, 25), (26, 20)], fill=RAMPS['blossom'][4])
    return outline(img, color=hx('12301e') if variant != 3 else hx('4a1d33'))


def tile_rock(variant=1):
    img = base_grass(seed=80, tufts=4)
    m, s = RAMPS['meadow'], RAMPS['stone']
    ground_shadow(img, 16, 26, 22, m[0])
    shaded_ellipse(img, (14, 12, 29, 27), s[1:], shine=False)
    shaded_ellipse(img, (3, 14, 18, 28), s[1:])
    d = ImageDraw.Draw(img)
    d.line((9, 20, 11, 23), fill=s[0])                       # crack
    d.point([(17, 15), (18, 15), (17, 16)], fill=s[4])       # glint
    d.point([(6, 25), (7, 26), (15, 26), (22, 24)], fill=RAMPS['foliage'][3])  # moss
    return outline(img)


def tile_sign():
    img = base_path(seed=90)
    p = RAMPS['path']
    ground_shadow(img, 16, 28, 14, p[0])
    d = ImageDraw.Draw(img)
    w = RAMPS['wood']
    d.rectangle((14, 17, 17, 27), fill=w[1])
    d.line((15, 17, 15, 27), fill=w[3])
    d.rectangle((5, 5, 26, 17), fill=w[3])
    d.rectangle((5, 5, 26, 7), fill=w[4])
    d.rectangle((5, 15, 26, 17), fill=w[1])
    d.rectangle((5, 5, 26, 17), outline=w[0])
    for yy in (9, 12):
        d.line((9, yy, 22, yy), fill=w[0])
    d.point([(7, 7), (24, 7), (7, 15), (24, 15)], fill=RAMPS['iron'][3])  # nails
    return outline(img)


def tile_book():
    img = base_path(seed=95)
    p = RAMPS['path']
    ground_shadow(img, 16, 27, 18, p[0])
    d = ImageDraw.Draw(img)
    # closed red ledger underneath
    d.rectangle((7, 19, 24, 25), fill=RAMPS['roof_red'][1])
    d.rectangle((7, 19, 24, 20), fill=RAMPS['roof_red'][2])
    d.rectangle((8, 24, 24, 25), fill=RAMPS['roof_red'][0])
    d.line((9, 21, 9, 23), fill=RAMPS['gold'][3])            # gilt spine band
    # open book on top
    d.polygon([(6, 13), (15, 10), (15, 19), (6, 21)], fill=CREAM)
    d.polygon([(25, 13), (16, 10), (16, 19), (25, 21)], fill=CREAM_SH)
    d.line((15, 10, 15, 19), fill=RAMPS['wood'][1])
    d.line((16, 10, 16, 19), fill=RAMPS['wood'][1])
    for i in range(3):
        d.line((8, 14 + i * 2, 13, 13 + i * 2), fill=RAMPS['stone'][2])
        d.line((18, 13 + i * 2, 23, 14 + i * 2), fill=RAMPS['stone'][2])
    d.line((21, 10, 21, 14), fill=RAMPS['roof_red'][2])      # ribbon bookmark
    return outline(img)


def tile_well():
    img = base_grass(seed=100, tufts=4)
    m = RAMPS['meadow']
    ground_shadow(img, 16, 29, 22, m[0])
    d = ImageDraw.Draw(img)
    s, w = RAMPS['stone'], RAMPS['wood']
    shaded_ellipse(img, (6, 17, 26, 30), s[1:], shine=False)  # stone ring
    d.ellipse((10, 20, 22, 26), fill=RAMPS['water'][0])       # water
    d.ellipse((12, 21, 20, 24), fill=RAMPS['water'][2])
    d.point([(14, 22), (15, 22)], fill=RAMPS['water'][4])
    d.rectangle((7, 6, 9, 19), fill=w[1]); d.line((8, 6, 8, 19), fill=w[3])
    d.rectangle((23, 6, 25, 19), fill=w[1]); d.line((24, 6, 24, 19), fill=w[3])
    shaded_poly(img, [(16, 1), (3, 8), (29, 8)], RAMPS['roof_red'])  # peaked roof
    d.line((16, 8, 16, 14), fill=w[0])                       # rope
    d.rectangle((14, 14, 18, 17), fill=w[2])                 # bucket
    d.rectangle((14, 14, 18, 14), fill=w[4])
    return outline(img)


def tile_ledger_stone():
    img = base_grass(seed=110, tufts=4)
    m, s = RAMPS['meadow'], RAMPS['stone']
    ground_shadow(img, 16, 27, 20, m[0])
    d = ImageDraw.Draw(img)
    d.polygon([(9, 8), (22, 8), (24, 26), (7, 26)], fill=s[2])
    d.polygon([(9, 8), (13, 8), (11, 26), (7, 26)], fill=s[3])
    d.polygon([(19, 8), (22, 8), (24, 26), (20, 26)], fill=s[1])
    d.line((9, 8, 22, 8), fill=s[4])
    d.line((16, 12, 16, 22), fill=s[0])                      # carved T-account
    d.line((11, 12, 21, 12), fill=s[0])
    d.point([(13, 15), (13, 18), (19, 15), (19, 18)], fill=s[0])
    d.point([(8, 25), (9, 26), (22, 26), (23, 25)], fill=RAMPS['foliage'][3])
    return outline(img)


def tile_pathlamp():
    img = base_path(seed=120)
    p = RAMPS['path']
    ground_shadow(img, 16, 29, 12, p[0])
    d = ImageDraw.Draw(img)
    i = RAMPS['iron']
    d.rectangle((13, 26, 19, 28), fill=i[1])                 # base
    d.rectangle((15, 12, 17, 26), fill=i[1])
    d.line((15, 12, 15, 26), fill=i[3])
    d.rectangle((11, 4, 21, 12), fill=RAMPS['gold'][3])      # glass
    d.rectangle((11, 4, 21, 6), fill=RAMPS['gold'][4])
    d.rectangle((11, 10, 21, 12), fill=RAMPS['gold'][1])
    d.rectangle((11, 4, 21, 12), outline=i[0])
    d.polygon([(10, 4), (16, 1), (22, 4)], fill=i[1])        # cap
    d.point((16, 0), fill=i[3])                              # finial
    d.point([(8, 6), (24, 6), (7, 10), (25, 10), (16, 14)], fill=RAMPS['gold'][4])  # sparkle
    return outline(img)


def tile_house(variant=1):
    img = base_path(seed=130 + variant)
    p = RAMPS['path']
    ground_shadow(img, 16, 29, 26, p[0])
    d = ImageDraw.Draw(img)
    w = RAMPS['wood']
    roof = RAMPS['roof_red'] if variant == 1 else RAMPS['roof_blue']
    # walls
    d.rectangle((5, 14, 26, 28), fill=CREAM)
    d.rectangle((5, 24, 26, 28), fill=CREAM_SH)
    d.rectangle((5, 27, 26, 28), fill=RAMPS['stone'][2])     # stone footing
    for x in (5, 26):
        d.line((x, 14, x, 28), fill=w[2])                    # corner beams
    # door
    d.rectangle((13, 19, 18, 28), fill=w[1])
    d.rectangle((14, 20, 17, 28), fill=w[2])
    d.line((14, 20, 14, 27), fill=w[3])
    d.point((17, 24), fill=RAMPS['gold'][3])                 # knob
    # windows with frame + sill + glass shine
    for wx in (7, 21):
        d.rectangle((wx, 18, wx + 4, 22), fill=w[3])
        d.rectangle((wx + 1, 19, wx + 3, 21), fill=RAMPS['water'][2])
        d.point((wx + 1, 19), fill=RAMPS['water'][4])
        d.line((wx, 23, wx + 4, 23), fill=w[1])              # sill
    # roof with ridge highlight + shading rows + eaves
    d.polygon([(2, 15), (16, 3), (29, 15)], fill=roof[1])
    d.polygon([(2, 15), (16, 3), (16, 15)], fill=roof[2])
    d.line((16, 3, 3, 14), fill=roof[3])
    d.line((16, 4, 28, 15), fill=roof[0])
    d.rectangle((2, 14, 29, 15), fill=roof[0])               # eaves
    # chimney
    d.rectangle((21, 5, 24, 10), fill=RAMPS['brick'][2])
    d.rectangle((20, 4, 25, 5), fill=RAMPS['brick'][3])
    return outline(img)


def tile_factory_wall():
    img = canvas(T, T)
    d = ImageDraw.Draw(img)
    b = RAMPS['brick']
    d.rectangle((0, 0, T - 1, T - 1), fill=b[1])
    for row in range(0, T, 5):                               # running-bond bricks
        d.line((0, row + 4, T, row + 4), fill=b[0])
        off = 4 if (row // 5) % 2 else 0
        for x in range(off, T, 8):
            d.line((x, row, x, row + 4), fill=b[0])
        d.line((0, row, T, row), fill=b[2])
    # purple pipe with rivets + shine
    d.rectangle((0, 8, T - 1, 13), fill=RAMPS['purple'][2])
    d.line((0, 9, T, 9), fill=RAMPS['purple'][3])
    d.line((0, 13, T, 13), fill=RAMPS['purple'][0])
    for x in (4, 14, 24):
        d.point([(x, 10), (x, 12)], fill=RAMPS['purple'][4])
    return img


def gate_base_label(img):
    return outline(img)


def tile_gate_forest():
    img = base_grass(seed=150, tufts=3)
    f = RAMPS['foliage']
    ground_shadow(img, 16, 29, 26, RAMPS['meadow'][0])
    # dense canopy walls either side
    for lb in ((-6, 0, 14, 22), (18, 0, 38, 22), (-2, -6, 16, 12), (16, -6, 34, 12)):
        shaded_ellipse(img, lb, f, shine=False)
    leaf_clusters(img, [(0, 0, 30, 14)], f, seed=9, n=8)
    d = ImageDraw.Draw(img)
    # dark archway entrance with path fading in
    d.polygon([(11, 29), (11, 14), (16, 9), (21, 14), (21, 29)], fill=hx('102217'))
    d.polygon([(13, 29), (13, 15), (16, 12), (19, 15), (19, 29)], fill=hx('1c3a26'))
    d.rectangle((14, 24, 18, 29), fill=RAMPS['path'][1])
    d.point([(12, 13), (20, 12)], fill=f[4])                 # fireflies
    return outline(img, color=hx('0d2418'))


def tile_gate_cave():
    img = canvas(T, T)
    d = ImageDraw.Draw(img)
    s = RAMPS['stone']
    d.rectangle((0, 0, T - 1, T - 1), fill=s[1])
    rnd = Random(160)
    for _ in range(8):
        x, y = rnd.randint(-4, T - 4), rnd.randint(-4, T - 4)
        d.ellipse((x, y, x + rnd.randint(5, 9), y + rnd.randint(4, 7)),
                  fill=rnd.choice((s[0], s[2])))
    # rocky crown
    d.polygon([(0, 8), (6, 2), (13, 7), (19, 1), (26, 6), (31, 3), (31, 10), (0, 10)], fill=s[2])
    d.polygon([(0, 8), (6, 2), (9, 8)], fill=s[3])
    # cave mouth
    d.polygon([(6, 30), (6, 16), (11, 10), (21, 10), (26, 16), (26, 30)], fill=hx('141122'))
    d.polygon([(9, 30), (9, 17), (13, 13), (19, 13), (23, 17), (23, 30)], fill=hx('080614'))
    # crystals
    for x, y, c in ((8, 25, 2), (23, 22, 3), (12, 28, 3)):
        d.line((x, y, x, y - 3), fill=RAMPS['water'][c])
        d.point((x, y - 3), fill=RAMPS['water'][4])
    return outline(img, color=hx('1d2130'))


def tile_gate_factory():
    img = tile_factory_wall()
    d = ImageDraw.Draw(img)
    i, pu = RAMPS['iron'], RAMPS['purple']
    # big riveted metal door
    d.rectangle((8, 9, 23, 29), fill=i[1])
    d.rectangle((10, 11, 21, 29), fill=i[2])
    d.line((10, 11, 21, 11), fill=i[3])
    d.line((15, 11, 15, 29), fill=i[0]); d.line((16, 11, 16, 29), fill=i[0])
    for y in (13, 19, 25):
        d.point([(11, y), (20, y)], fill=i[4])               # rivets
    # neon trim + warning lamp
    d.rectangle((8, 7, 23, 8), fill=pu[3])
    d.point([(9, 7), (14, 7), (19, 7)], fill=pu[4])
    d.rectangle((14, 3, 17, 6), fill=RAMPS['gold'][3])
    d.point((15, 4), fill=RAMPS['gold'][4])
    return outline(img, color=hx('241a2e'))


def tile_gate_town():
    img = base_path(seed=170)
    p, w = RAMPS['path'], RAMPS['wood']
    ground_shadow(img, 16, 29, 26, p[0])
    d = ImageDraw.Draw(img)
    # posts
    for x in (4, 25):
        d.rectangle((x, 10, x + 2, 29), fill=w[1])
        d.line((x + 1, 10, x + 1, 29), fill=w[3])
    # arch beam + little gable
    d.rectangle((2, 8, 29, 12), fill=w[2])
    d.line((2, 8, 29, 8), fill=w[4])
    d.line((2, 12, 29, 12), fill=w[0])
    shaded_poly(img, [(16, 1), (4, 8), (28, 8)], RAMPS['roof_red'])
    # bunting under the beam
    for k, x in enumerate(range(5, 27, 5)):
        c = RAMPS['gold'][3] if k % 2 else RAMPS['roof_red'][2]
        d.polygon([(x, 13), (x + 3, 13), (x + 1, 16)], fill=c)
    # welcome board
    d.rectangle((11, 18, 20, 23), fill=w[4])
    d.line((12, 20, 19, 20), fill=w[1])
    d.line((13, 22, 18, 22), fill=w[1])
    return outline(img)


# ============================ creature builder =============================
# One shared builder renders every companion and boss from a spec dict, so
# adding a new monster = adding data. Draw order: tail, wings, body, belly,
# feet, head, ears/horns, face, extras, outline.

def build_creature(spec):
    w, h = spec.get('size', (32, 40))
    img = canvas(w, h)
    d = ImageDraw.Draw(img)
    ramp = RAMPS[spec['ramp']]
    belly = spec.get('belly_color', CREAM)
    sx, sy = w / 32.0, h / 40.0            # everything scales off a 32x40 grid

    def X(v): return v * sx
    def Y(v): return v * sy
    body = (X(6), Y(20), X(26), Y(38))
    head = (X(5), Y(6), X(27), Y(26))

    # --- tail (behind body) ---
    tail = spec.get('tail')
    if tail == 'bushy':
        shaded_ellipse(img, (X(22), Y(18), X(33), Y(33)), ramp, shine=False)
        paint(img, ellipse_mask(img.size, (X(26), Y(17), X(33), Y(24))), belly)
    elif tail == 'spade':
        d.line(B((X(25), Y(30), X(31), Y(24))), fill=ramp[1], width=max(1, int(2 * sx)))
        shaded_poly(img, [(X(29), Y(26)), (X(33), Y(20)), (X(33), Y(27))], ramp)
    elif tail == 'flame':
        d.line(B((X(25), Y(30), X(30), Y(23))), fill=ramp[1], width=max(1, int(2 * sx)))
        g = RAMPS['gold']
        shaded_ellipse(img, (X(27), Y(16), X(34), Y(25)), [g[0], g[1], g[3], g[4]])

    # --- wings (behind body) ---
    wings = spec.get('wings')
    if wings == 'membrane':
        for m1, m2 in (((X(2), Y(14)), -1), ((X(30), Y(14)), 1)):
            cx = m1[0]
            shaded_poly(img, [(cx, m1[1]), (cx + m2 * X(1), Y(30)), (cx - m2 * X(7), Y(26))], ramp)
            d.line(B((cx, m1[1], cx - m2 * X(5), Y(25))), fill=ramp[3])
    elif wings == 'feather':
        f = RAMPS['feather']
        for cx, m in ((X(3), 1), (X(29), -1)):
            shaded_poly(img, [(cx, Y(12)), (cx + m * X(2), Y(31)), (cx + m * X(10), Y(25))], f)
            for k in range(3):               # feather scallops
                d.arc(B((cx - X(2) + m * X(k * 2), Y(24 + k * 2), cx + X(4) + m * X(k * 2), Y(30 + k * 2))),
                      200 if m > 0 else 340, 340 if m > 0 else 200 + 360, fill=f[0])

    # --- body + belly + feet ---
    shaded_ellipse(img, body, ramp, shine=False)
    if spec.get('belly', True):
        bm = ellipse_mask(img.size, (X(9), Y(25), X(23), Y(38)))
        paint(img, bm, belly)
        paint(img, ImageChops.subtract(bm, ellipse_mask(img.size, (X(9), Y(24), X(23), Y(36)))), CREAM_SH)
    if spec.get('feet', True):
        for fx in (X(9), X(19)):
            shaded_ellipse(img, (fx, Y(34), fx + X(5), Y(39)), ramp, depth=1, shine=False)

    # --- head ---
    shaded_ellipse(img, head, ramp, depth=2)

    # --- ears / horns / crest ---
    ears = spec.get('ears', 'round')
    inner = spec.get('inner_ear', RAMPS['blossom'][3])
    if ears == 'round':
        for ex, m in ((X(5), 1), (X(21), -1)):
            shaded_ellipse(img, (ex, Y(3), ex + X(7), Y(10)), ramp, depth=1, shine=False)
            paint(img, ellipse_mask(img.size, (ex + X(2), Y(5), ex + X(5), Y(8))), inner)
    elif ears == 'pointy':
        for ex, m in ((X(7), 1), (X(25), -1)):
            shaded_poly(img, [(ex, Y(7)), (ex - m * X(2), Y(0)), (ex + m * X(5), Y(5))], ramp)
            d.polygon([B((ex, Y(6))), B((ex - m * X(1), Y(2))), B((ex + m * X(2), Y(5)))], fill=hx('2b1a12'))
    elif ears == 'horns':
        g = RAMPS['gold']
        for ex, m in ((X(8), 1), (X(24), -1)):
            shaded_poly(img, [(ex, Y(8)), (ex - m * X(4), Y(0)), (ex + m * X(3), Y(6))],
                        [g[1], g[2], g[4]])
    if spec.get('crest'):                    # head plume (griffin)
        f = RAMPS['feather']
        shaded_poly(img, [(X(13), Y(6)), (X(16), Y(0)), (X(19), Y(6))], f)

    if spec.get('extras'):                   # markings live UNDER the face
        spec['extras'](img, d, X, Y)

    # --- face ---
    eyes = spec.get('eyes', 'cute')
    ey = Y(spec.get('eye_y', 15))
    if eyes == 'cute':
        for ex in (X(11), X(19)):
            d.ellipse(B((ex, ey, ex + X(3), ey + Y(4))), fill=hx('2b1c14'))
            d.point(B((ex + 1, ey + 1)), fill=(255, 255, 255, 255))
        if spec.get('blush', True):
            for bx in (X(8), X(22)):
                d.point([B((bx, ey + Y(4))), B((bx + 1, ey + Y(4)))], fill=RAMPS['blossom'][3])
    else:                                    # fierce boss eyes
        for ex in (X(10), X(19)):
            d.ellipse(B((ex, ey, ex + X(4), ey + Y(4))), fill=CREAM)
            d.ellipse(B((ex + X(1), ey + Y(1), ex + X(3), ey + Y(4))), fill=RAMPS['roof_red'][2])
            d.point(B((ex + X(2), ey + Y(2))), fill=hx('1a0d0d'))
            d.line(B((ex - X(1), ey - Y(1), ex + X(4), ey)), fill=ramp[0])  # brow
    muzzle = spec.get('muzzle')
    if muzzle == 'snout':
        shaded_ellipse(img, (X(12), Y(17), X(20), Y(23)), [CREAM_SH, belly, CREAM], depth=1, shine=False)
        d.ellipse(B((X(14), Y(18), X(17), Y(20))), fill=spec.get('nose', hx('3a2418')))
    elif muzzle == 'beak':
        g = RAMPS['gold']
        shaded_poly(img, [(X(13), Y(17)), (X(19), Y(17)), (X(16), Y(23))], [g[0], g[1], g[3]])
    elif muzzle == 'grin':
        d.arc(B((X(12), Y(16), X(20), Y(22))), 20, 160, fill=ramp[0])
        d.point([B((X(13), Y(20))), B((X(19), Y(20)))], fill=CREAM)      # fangs
    return outline(img, color=spec.get('outline', OUTLINE))


def creature_extras_fox(img, d, X, Y):
    """White muzzle wedges + dark nose for the fox (under the eyes)."""
    for pts in ([(X(10), Y(16)), (X(16), Y(24)), (X(8), Y(23))],
                [(X(22), Y(16)), (X(16), Y(24)), (X(24), Y(23))]):
        d.polygon([B(p) for p in pts], fill=CREAM)
    d.ellipse(B((X(14.5), Y(19.5), X(17.5), Y(22))), fill=hx('2b1a12'))


def creature_extras_drake(img, d, X, Y):
    """Belly scutes for the ledger drake."""
    for k in range(3):
        d.line(B((X(11), Y(28 + k * 3), X(21), Y(28 + k * 3))), fill=RAMPS['gold'][1])


def build_golem(spec):
    """Blocky stone golem — its own builder since it isn't round."""
    w, h = spec.get('size', (56, 56))
    img = canvas(w, h)
    d = ImageDraw.Draw(img)
    s = RAMPS['stone']
    glow = RAMPS['water']
    # arms
    for x0 in (1, 43):
        d.rectangle((x0, 26, x0 + 11, 50), fill=s[1])
        d.rectangle((x0, 26, x0 + 11, 30), fill=s[2])
        d.rectangle((x0, 46, x0 + 11, 50), fill=s[0])
        d.line((x0 + 1, 27, x0 + 1, 49), fill=s[3])
    # torso
    d.rectangle((10, 26, 45, 52), fill=s[2])
    d.rectangle((10, 26, 45, 30), fill=s[3])
    d.rectangle((10, 46, 45, 52), fill=s[1])
    d.rectangle((10, 50, 45, 52), fill=s[0])
    # head
    d.rectangle((15, 6, 40, 28), fill=s[3])
    d.rectangle((15, 6, 40, 10), fill=s[4])
    d.rectangle((15, 24, 40, 28), fill=s[2])
    d.polygon([(15, 6), (20, 0), (22, 6)], fill=s[2])   # broken crown horns
    d.polygon([(40, 6), (35, 0), (33, 6)], fill=s[2])
    # glowing rune eyes + core
    for ex in (19, 30):
        d.rectangle((ex, 13, ex + 6, 18), fill=glow[2])
        d.rectangle((ex + 1, 14, ex + 5, 15), fill=glow[4])
    d.polygon([(27, 34), (32, 39), (27, 44), (22, 39)], fill=glow[2])
    d.polygon([(27, 36), (30, 39), (27, 42), (24, 39)], fill=glow[4])
    # cracks + moss
    d.line((17, 20, 20, 23), fill=s[0]); d.line((36, 9, 34, 13), fill=s[0])
    d.line((13, 33, 16, 37), fill=s[0])
    d.point([(16, 7), (17, 7), (39, 27), (12, 27), (44, 31)], fill=RAMPS['foliage'][3])
    return outline(img, color=hx('1d2130'))


# ============================== player sprite ==============================

def build_player(spec):
    img = canvas(32, 40)
    d = ImageDraw.Draw(img)
    sk = RAMPS['skin']
    jacket, jacket_d, jacket_l = spec['jacket']
    cap, cap_d, cap_l = spec['cap']
    # legs + boots
    for lx in (11, 18):
        d.rectangle((lx, 29, lx + 3, 35), fill=hx('2d4470'))
        d.line((lx, 29, lx, 35), fill=hx('3d5b94'))
    for lx in (10, 17):
        d.rectangle((lx, 35, lx + 4, 38), fill=RAMPS['wood'][1])
        d.line((lx, 35, lx + 4, 35), fill=RAMPS['wood'][3])
    # torso
    d.rectangle((9, 18, 22, 30), fill=jacket)
    d.rectangle((9, 18, 22, 20), fill=jacket_l)
    d.rectangle((19, 18, 22, 30), fill=jacket_d)             # right-side shade
    d.line((15, 20, 15, 29), fill=jacket_d)                  # zip
    d.rectangle((13, 18, 18, 20), fill=CREAM)                # collar
    # arms + hands
    for ax, shade in ((5, jacket), (23, jacket_d)):
        d.rectangle((ax, 19, ax + 3, 27), fill=shade)
        d.rectangle((ax, 27, ax + 3, 29), fill=sk[2])
    # head
    d.rectangle((10, 6, 21, 17), fill=sk[3])
    d.rectangle((10, 14, 21, 17), fill=sk[2])
    d.point([(11, 15), (20, 15)], fill=RAMPS['blossom'][3])  # blush
    d.point([(13, 12), (18, 12)], fill=hx('2b1c14'))         # eyes
    d.point((13, 11), fill=(255, 255, 255, 255))
    d.line((15, 14, 16, 14), fill=sk[1])                     # nose hint
    # hair peeking under cap
    d.rectangle((10, 8, 21, 9), fill=RAMPS['wood'][1])
    d.point([(10, 10), (21, 10), (10, 11)], fill=RAMPS['wood'][1])
    # cap with brim + button
    d.rectangle((9, 3, 22, 8), fill=cap)
    d.rectangle((9, 3, 22, 4), fill=cap_l)
    d.rectangle((19, 3, 22, 8), fill=cap_d)
    d.rectangle((17, 7, 26, 9), fill=cap_d)                  # brim
    d.point((15, 2), fill=cap_l)                             # button
    return outline(img)


# =============================== scenes ====================================

SW, SH = 160, 96


def vgrad(d, x0, y0, x1, y1, c_top, c_bot):
    hgt = y1 - y0
    for i in range(hgt):
        t = i / max(1, hgt - 1)
        c = tuple(int(c_top[k] + (c_bot[k] - c_top[k]) * t) for k in range(3)) + (255,)
        d.line((x0, y0 + i, x1, y0 + i), fill=c)


def sky(d, top, bottom, horizon):
    vgrad(d, 0, 0, SW, horizon, top, bottom)
    dither_band(d, 0, horizon - 2, SW, bottom)


def clouds(d, seed, color, shade, y_max=30, n=3):
    rnd = Random(seed)
    for _ in range(n):
        x, y = rnd.randint(0, SW - 30), rnd.randint(3, y_max)
        for ox, oy, r in ((0, 3, 6), (8, 0, 8), (18, 3, 6), (9, 5, 9)):
            d.ellipse((x + ox, y + oy, x + ox + r * 2, y + oy + r), fill=color)
        d.line((x + 2, y + 9, x + 24, y + 9), fill=shade)


def hills(d, y, color, seed, amp=8):
    rnd = Random(seed)
    pts = [(0, SH)]
    x = 0
    while x < SW:
        pts.append((x, y + rnd.randint(-amp, amp)))
        x += rnd.randint(18, 30)
    pts += [(SW, y), (SW, SH)]
    d.polygon(pts, fill=color)


def scene_canopy_tree(img, d, cx, cy, r, ramp):
    shaded_ellipse(img, (cx - r, cy - r, cx + r, cy + int(r * 0.9)), ramp, shine=False)
    leaf_clusters(img, [(cx - r, cy - r, cx + r, cy)], ramp, seed=cx, n=4)


def scene_forest():
    img = canvas(SW, SH)
    d = ImageDraw.Draw(img)
    f, m = RAMPS['foliage'], RAMPS['meadow']
    sky(d, hx('bfe8f5'), hx('e8f7d9'), 52)
    d.ellipse((126, 6, 146, 26), fill=hx('fff6c8'))          # sun
    d.ellipse((129, 9, 143, 23), fill=hx('fffbe2'))
    clouds(d, 5, hx('ffffff'), hx('dceef2'), y_max=18, n=2)
    hills(d, 40, f[1], seed=8, amp=5)                        # far treeline
    hills(d, 46, f[2], seed=13, amp=4)
    d.rectangle((0, 54, SW, SH), fill=m[2])
    dither_band(d, 0, 54, SW, f[2])
    grass_tufts(d, SW, SH, m, seed=21, n=26, margin=4, y0=58)
    # winding path to the archway
    d.polygon([(70, SH), (76, 70), (78, 60), (82, 60), (86, 70), (94, SH)], fill=RAMPS['path'][2])
    d.polygon([(74, SH), (78, 70), (80, 62), (82, 66), (84, SH)], fill=RAMPS['path'][3])
    # big framing trees
    for cx, r in ((16, 20), (144, 22)):
        d.rectangle((cx - 3, 58, cx + 3, 84), fill=RAMPS['wood'][1])
        d.line((cx - 2, 58, cx - 2, 84), fill=RAMPS['wood'][3])
        scene_canopy_tree(img, d, cx, 42, r + 6, f)
    # archway of two leaning canopies
    scene_canopy_tree(img, d, 62, 40, 16, f)
    scene_canopy_tree(img, d, 100, 38, 17, f)
    d.polygon([(74, 60), (81, 48), (88, 60)], fill=hx('16351f'))
    d.point([(70, 50), (94, 46), (80, 44)], fill=f[4])       # fireflies
    return img


def scene_cave():
    img = canvas(SW, SH)
    d = ImageDraw.Draw(img)
    s, w = RAMPS['stone'], RAMPS['water']
    vgrad(d, 0, 0, SW, SH, hx('241f38'), hx('120e20'))
    # stalactites with lit left edges
    rnd = Random(31)
    x = 4
    while x < SW - 8:
        wd, ln = rnd.randint(6, 14), rnd.randint(10, 26)
        d.polygon([(x, 0), (x + wd, 0), (x + wd // 2, ln)], fill=s[1])
        d.line((x + 1, 0, x + wd // 2, ln - 1), fill=s[2])
        x += wd + rnd.randint(2, 8)
    # floor + stalagmites
    d.polygon([(0, 78), (30, 74), (70, 80), (120, 74), (SW, 78), (SW, SH), (0, SH)], fill=hx('1c1830'))
    for gx, gh in ((18, 12), (128, 15), (146, 9)):
        d.polygon([(gx - 6, SH), (gx, SH - 20 - gh), (gx + 6, SH)], fill=s[1])
        d.line((gx - 3, SH - 4, gx, SH - 16 - gh), fill=s[2])
    # glowing pool
    d.ellipse((56, 80, 104, 94), fill=w[1])
    d.ellipse((62, 82, 98, 90), fill=w[2])
    d.point([(70, 84), (76, 85), (88, 84)], fill=w[4])
    # crystal clusters
    for cx, cy in ((40, 70), (112, 66), (84, 60)):
        for k, (ox, ln) in enumerate(((0, 10), (5, 14), (10, 8))):
            d.polygon([(cx + ox, cy + 12), (cx + ox + 2, cy + 12 - ln), (cx + ox + 4, cy + 12)], fill=w[2])
            d.line((cx + ox + 1, cy + 11, cx + ox + 2, cy + 13 - ln), fill=w[4])
        d.point([(cx - 2, cy + 13), (cx + 15, cy + 12)], fill=hx('3a4a7a'))  # glow motes
    return img


def scene_factory():
    img = canvas(SW, SH)
    d = ImageDraw.Draw(img)
    pu, i, b = RAMPS['purple'], RAMPS['iron'], RAMPS['brick']
    sky(d, hx('4a2a7c'), hx('9a5fd0'), 58)
    d.ellipse((18, 6, 34, 22), fill=hx('f3e9ff'))            # moon
    d.ellipse((23, 8, 35, 20), fill=hx('4a2a7c'))
    d.point([(60, 10), (90, 16), (120, 8), (140, 20), (74, 26)], fill=hx('e8d8ff'))  # stars
    # skyline
    for x0, wd, hgt in ((6, 22, 26), (60, 18, 34), (118, 26, 22)):
        d.rectangle((x0, 58 - hgt, x0 + wd, 60), fill=hx('2a1c46'))
    # main mill building
    d.rectangle((40, 34, 116, 78), fill=b[1])
    d.rectangle((40, 34, 116, 38), fill=b[2])
    for row in range(38, 78, 7):
        d.line((40, row, 116, row), fill=b[0])
    d.polygon([(36, 34), (52, 22), (68, 34)], fill=i[1])     # sawtooth roof
    d.polygon([(68, 34), (84, 22), (100, 34)], fill=i[1])
    d.polygon([(100, 34), (112, 24), (120, 34)], fill=i[1])
    d.line((36, 34, 52, 22), fill=i[3]); d.line((68, 34, 84, 22), fill=i[3])
    for wx in (48, 62, 76, 90, 104):                          # lit windows
        d.rectangle((wx, 44, wx + 6, 52), fill=RAMPS['gold'][3])
        d.rectangle((wx, 44, wx + 6, 46), fill=RAMPS['gold'][4])
        d.rectangle((wx, 58, wx + 6, 66), fill=pu[3])
    # chimneys + smoke puffs
    for cx in (52, 96):
        d.rectangle((cx, 10, cx + 6, 24), fill=b[0])
        d.line((cx + 1, 10, cx + 1, 24), fill=b[2])
        d.ellipse((cx - 3, 2, cx + 6, 9), fill=hx('cbb8e8'))
        d.ellipse((cx + 4, -2, cx + 12, 5), fill=hx('b9a3dd'))
    # ground
    d.rectangle((0, 78, SW, SH), fill=hx('322752'))
    dither_band(d, 0, 78, SW, hx('241c40'))
    d.line((0, 82, SW, 82), fill=pu[2])                      # conveyor stripe
    for x in range(4, SW, 12):
        d.point((x, 82), fill=pu[4])
    # big gear leaning on the wall
    d.ellipse((14, 58, 42, 86), fill=i[1])
    d.ellipse((20, 64, 36, 80), fill=i[2])
    d.ellipse((25, 69, 31, 75), fill=pu[3])
    for gx, gy in ((26, 54), (12, 68), (40, 68), (26, 84)):
        d.rectangle((gx, gy, gx + 5, gy + 5), fill=i[1])
    return img


def scene_town():
    img = canvas(SW, SH)
    d = ImageDraw.Draw(img)
    p, w = RAMPS['path'], RAMPS['wood']
    sky(d, hx('ffd9a0'), hx('ffeecd'), 56)                   # golden hour
    d.ellipse((66, 8, 88, 30), fill=hx('ffedb8'))            # sun
    d.ellipse((70, 12, 84, 26), fill=hx('fff8dc'))
    clouds(d, 41, hx('fff4de'), hx('f2ddb4'), y_max=16, n=2)
    hills(d, 48, RAMPS['meadow'][1], seed=52, amp=4)
    # row of houses
    for x0, roof, wd in ((8, RAMPS['roof_red'], 34), (52, RAMPS['roof_blue'], 30), (118, RAMPS['roof_red'], 34)):
        d.rectangle((x0, 42, x0 + wd, 70), fill=CREAM)
        d.rectangle((x0, 62, x0 + wd, 70), fill=CREAM_SH)
        d.polygon([(x0 - 4, 42), (x0 + wd // 2, 26), (x0 + wd + 4, 42)], fill=roof[1])
        d.polygon([(x0 - 4, 42), (x0 + wd // 2, 26), (x0 + wd // 2, 42)], fill=roof[2])
        d.line((x0 + wd // 2, 27, x0 - 2, 41), fill=roof[3])
        dx = x0 + wd // 2 - 3
        d.rectangle((dx, 58, dx + 6, 70), fill=w[1])
        d.line((dx + 1, 59, dx + 1, 69), fill=w[3])
        for wx in (x0 + 4, x0 + wd - 9):
            d.rectangle((wx, 48, wx + 5, 54), fill=RAMPS['gold'][3])
            d.point((wx + 1, 49), fill=RAMPS['gold'][4])
    # bunting strung across
    d.line((0, 20, 60, 26), fill=w[1]); d.line((60, 26, 120, 20), fill=w[1]); d.line((120, 20, 160, 26), fill=w[1])
    rnd = Random(9)
    for x in range(4, SW, 10):
        y = 20 + int(6 * abs(((x / 60.0) % 2) - 1) if x < 120 else 20)
        y = 22 + (x % 20) // 5
        c = (RAMPS['roof_red'][2], RAMPS['gold'][3], RAMPS['roof_blue'][3])[(x // 10) % 3]
        d.polygon([(x, y), (x + 5, y), (x + 2, y + 5)], fill=c)
    # plaza + fountain
    d.rectangle((0, 70, SW, SH), fill=p[3])
    dither_band(d, 0, 70, SW, p[1])
    pebbles(d, SW, SH - 72, p, seed=61, n=10)
    d.ellipse((86, 76, 114, 92), fill=RAMPS['stone'][2])
    d.ellipse((90, 78, 110, 88), fill=RAMPS['water'][2])
    d.point([(96, 80), (102, 81)], fill=RAMPS['water'][4])
    d.line((100, 70, 100, 78), fill=RAMPS['water'][3])       # spout
    return img


# =========================== ASSET SPEC TABLES =============================
# ADD NEW ASSETS HERE. Keys become PNG filenames (name + '.png').

CREATURES = {
    # --- companions (32x40, cute) ---
    'char-cub': dict(ramp='gold', ears='round', tail=None, muzzle='snout',
                     nose=hx('6b3a1c'), inner_ear=hx('f0a35c')),
    'char-fox': dict(ramp='fox', ears='pointy', tail='bushy', muzzle=None,
                     extras=creature_extras_fox),
    'char-mole': dict(ramp='mole', ears='round', tail=None, muzzle='snout',
                      nose=RAMPS['blossom'][3], belly_color=hx('cfc5c0'),
                      inner_ear=hx('bfb2ae')),
    # --- bosses (56x56, fierce) ---
    'boss-itbk': dict(size=(56, 56), ramp='dragon', ears='horns', eyes='fierce',
                      wings='membrane', tail='spade', muzzle='grin', blush=False,
                      belly_color=hx('d8e8b0'), extras=creature_extras_drake),
    'boss-poc': dict(size=(56, 56), ramp='purple', ears='horns', eyes='fierce',
                     tail='flame', muzzle='grin', blush=False,
                     belly_color=hx('d9c2f2')),
    'boss-besy': dict(size=(56, 56), ramp='griffin', ears='pointy', eyes='fierce',
                      wings='feather', tail=None, muzzle='beak', crest=True,
                      blush=False, belly_color=RAMPS['feather'][3], eye_y=14),
}

PLAYER = dict(jacket=(hx('2d63c9'), hx('1f4694'), hx('4a86e0')),
              cap=(hx('d24b46'), hx('a83236'), hx('f07a64')))

TILES = {
    'tile-grass-1': lambda: tile_grass(1),
    'tile-grass-2': lambda: tile_grass(2),
    'tile-grass-3': lambda: tile_grass(3),
    'tile-path-1': lambda: tile_path(1),
    'tile-path-2': lambda: tile_path(2),
    'tile-flower-1': lambda: tile_flower(1),
    'tile-flower-2': lambda: tile_flower(2),
    'tile-tree-1': lambda: tile_tree(1),
    'tile-tree-2': lambda: tile_tree(2),
    'tile-tree-3': lambda: tile_tree(3),
    'tile-rock': tile_rock,
    'tile-sign': tile_sign,
    'tile-book': tile_book,
    'tile-well': tile_well,
    'tile-ledger-stone': tile_ledger_stone,
    'tile-pathlamp': tile_pathlamp,
    'tile-house-1': lambda: tile_house(1),
    'tile-house-2': lambda: tile_house(2),
    'tile-factory-wall': tile_factory_wall,
    'tile-gate-forest': tile_gate_forest,
    'tile-gate-cave': tile_gate_cave,
    'tile-gate-factory': tile_gate_factory,
    'tile-gate-town': tile_gate_town,
}

SCENES = {
    'scene-forest': scene_forest,
    'scene-cave': scene_cave,
    'scene-factory': scene_factory,
    'scene-town': scene_town,
}


def all_assets():
    assets = {}
    assets.update({name: fn for name, fn in TILES.items()})
    assets['char-player'] = lambda: build_player(PLAYER)
    for name, spec in CREATURES.items():
        assets[name] = (lambda s: lambda: build_creature(s))(spec)
    assets['boss-pobc'] = lambda: build_golem({})
    assets.update({name: fn for name, fn in SCENES.items()})
    return assets


def main():
    ap = argparse.ArgumentParser(description='Generate Ledger Legends pixel art')
    ap.add_argument('--list', action='store_true', help='list asset names and exit')
    ap.add_argument('--only', help='only build assets whose name contains this substring')
    args = ap.parse_args()
    assets = all_assets()
    if args.list:
        for name in assets:
            print(name)
        return
    for name, fn in assets.items():
        if args.only and args.only not in name:
            continue
        save(fn(), name + '.png')


if __name__ == '__main__':
    main()
