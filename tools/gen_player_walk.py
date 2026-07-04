#!/usr/bin/env python3
"""Directional walk sprites for the Ledger Legends player.

Produces four horizontal 3-frame sheets (stand, step-A, step-B), one per
facing, matching the Storybook style of gen_rpg_assets.py (top-left light,
plum selective outline, warm ramps). Each frame is 32x40; each sheet is 96x40.

    python3 tools/gen_player_walk.py

Outputs:
    rpg-assets/char-player-down.png     (front)
    rpg-assets/char-player-up.png       (back)
    rpg-assets/char-player-left.png     (profile)
    rpg-assets/char-player-right.png    (profile, mirror of left)
    rpg-assets/char-player.png          (front stand — kept for fallback)

The CSS shows one frame at a time via background-size:300% and animates
background-position through the frames on each step (see rpg-demo.css).
"""
import os
from PIL import Image, ImageDraw

from gen_rpg_assets import hx, RAMPS, CREAM, outline, canvas, OUT, PLAYER

FW, FH = 32, 40  # frame size

JACKET, JACKET_D, JACKET_L = PLAYER['jacket']
CAP, CAP_D, CAP_L = PLAYER['cap']
SK = RAMPS['skin']
HAIR = RAMPS['wood'][1]
HAIR_D = RAMPS['wood'][0]
TROUSER = hx('2d4470')
TROUSER_L = hx('3d5b94')
BOOT = RAMPS['wood'][1]
BOOT_H = RAMPS['wood'][3]


# ------------------------------- legs --------------------------------------

def _front_legs(d, phase):
    """Two legs side by side; phase swings one foot forward (lower)."""
    # (leg box) , (boot box)
    if phase == 1:      # left foot forward, right foot back
        rows = [((11, 29, 14, 36), (10, 36, 14, 38)),
                ((18, 29, 21, 33), (17, 33, 21, 35))]
    elif phase == 2:    # right foot forward
        rows = [((11, 29, 14, 33), (10, 33, 14, 35)),
                ((18, 29, 21, 36), (17, 36, 21, 38))]
    else:               # stand
        rows = [((11, 29, 14, 35), (10, 35, 14, 38)),
                ((18, 29, 21, 35), (17, 35, 21, 38))]
    for (lx0, ly0, lx1, ly1), (bx0, by0, bx1, by1) in rows:
        d.rectangle((lx0, ly0, lx1, ly1), fill=TROUSER)
        d.line((lx0, ly0, lx0, ly1), fill=TROUSER_L)
        d.rectangle((bx0, by0, bx1, by1), fill=BOOT)
        d.line((bx0, by0, bx1, by0), fill=BOOT_H)


def _side_legs(d, phase):
    """Profile stride: a back leg and a front leg; phase moves them apart."""
    if phase == 1:      # front leg reaching forward (right), back leg trailing
        back = ((11, 29, 14, 35), (9, 35, 14, 38))
        front = ((17, 29, 20, 35), (17, 35, 22, 38))
    elif phase == 2:    # legs together mid-stride
        back = ((13, 29, 16, 35), (11, 35, 16, 38))
        front = ((16, 29, 19, 35), (16, 35, 21, 38))
    else:               # stand
        back = ((12, 29, 15, 35), (10, 35, 15, 38))
        front = ((16, 29, 19, 35), (16, 35, 21, 38))
    for (lx0, ly0, lx1, ly1), (bx0, by0, bx1, by1) in (back, front):
        shade = TROUSER if (lx0, ly0) == front[0][:2] else hx('24365a')
        d.rectangle((lx0, ly0, lx1, ly1), fill=shade)
        d.rectangle((bx0, by0, bx1, by1), fill=BOOT)
        d.line((bx0, by0, bx1, by0), fill=BOOT_H)


# ------------------------------- frames ------------------------------------

def frame_front(phase):
    img = canvas(FW, FH)
    d = ImageDraw.Draw(img)
    _front_legs(d, phase)
    # torso
    d.rectangle((9, 18, 22, 30), fill=JACKET)
    d.rectangle((9, 18, 22, 20), fill=JACKET_L)
    d.rectangle((19, 18, 22, 30), fill=JACKET_D)
    d.line((15, 20, 15, 29), fill=JACKET_D)              # zip
    d.rectangle((13, 18, 18, 20), fill=CREAM)            # collar
    # arms swing opposite to legs
    la, ra = (20, 18) if phase == 1 else (18, 20) if phase == 2 else (19, 19)
    d.rectangle((5, la, 8, la + 8), fill=JACKET)
    d.rectangle((5, la + 8, 8, la + 10), fill=SK[2])
    d.rectangle((23, ra, 26, ra + 8), fill=JACKET_D)
    d.rectangle((23, ra + 8, 26, ra + 10), fill=SK[2])
    # head
    d.rectangle((10, 6, 21, 17), fill=SK[3])
    d.rectangle((10, 14, 21, 17), fill=SK[2])
    d.point([(11, 15), (20, 15)], fill=RAMPS['blossom'][3])
    d.point([(13, 12), (18, 12)], fill=hx('2b1c14'))
    d.point((13, 11), fill=(255, 255, 255, 255))
    d.line((15, 14, 16, 14), fill=SK[1])
    d.rectangle((10, 8, 21, 9), fill=HAIR)
    d.point([(10, 10), (21, 10), (10, 11)], fill=HAIR)
    # cap + brim + button
    d.rectangle((9, 3, 22, 8), fill=CAP)
    d.rectangle((9, 3, 22, 4), fill=CAP_L)
    d.rectangle((19, 3, 22, 8), fill=CAP_D)
    d.rectangle((17, 7, 26, 9), fill=CAP_D)
    d.point((15, 2), fill=CAP_L)
    return outline(img)


def frame_back(phase):
    img = canvas(FW, FH)
    d = ImageDraw.Draw(img)
    _front_legs(d, phase)
    # torso (back — no collar/zip, centre seam instead)
    d.rectangle((9, 18, 22, 30), fill=JACKET)
    d.rectangle((9, 18, 22, 20), fill=JACKET_L)
    d.rectangle((19, 18, 22, 30), fill=JACKET_D)
    d.line((15, 18, 15, 30), fill=JACKET_D)              # back seam
    la, ra = (20, 18) if phase == 1 else (18, 20) if phase == 2 else (19, 19)
    d.rectangle((5, la, 8, la + 8), fill=JACKET)
    d.rectangle((5, la + 8, 8, la + 10), fill=SK[2])
    d.rectangle((23, ra, 26, ra + 8), fill=JACKET_D)
    d.rectangle((23, ra + 8, 26, ra + 10), fill=SK[2])
    # back of head — hair, small nape of neck
    d.rectangle((10, 6, 21, 17), fill=HAIR)
    d.rectangle((10, 6, 21, 8), fill=RAMPS['wood'][2])   # lit crown
    d.rectangle((13, 15, 18, 17), fill=SK[2])            # nape
    # cap (dome + rear brim, no face brim)
    d.rectangle((9, 3, 22, 8), fill=CAP)
    d.rectangle((9, 3, 22, 4), fill=CAP_L)
    d.rectangle((19, 3, 22, 8), fill=CAP_D)
    d.rectangle((10, 8, 21, 9), fill=CAP_D)              # rear brim band
    d.point((15, 2), fill=CAP_L)
    return outline(img)


def frame_side(phase):
    """Right-facing profile."""
    img = canvas(FW, FH)
    d = ImageDraw.Draw(img)
    _side_legs(d, phase)
    # torso (narrower, front to the right)
    d.rectangle((11, 18, 20, 30), fill=JACKET)
    d.rectangle((11, 18, 20, 20), fill=JACKET_L)
    d.rectangle((11, 18, 12, 30), fill=JACKET_D)         # back edge (left) shade
    d.rectangle((17, 20, 18, 29), fill=JACKET_L)         # front placket
    # front arm swinging
    ay = 20 if phase == 1 else 18 if phase == 2 else 19
    d.rectangle((16, ay, 19, ay + 8), fill=JACKET_L)
    d.rectangle((16, ay + 8, 19, ay + 10), fill=SK[3])   # hand
    # head profile (skin), hair at back-left
    d.rectangle((11, 6, 20, 17), fill=SK[3])
    d.rectangle((11, 12, 14, 17), fill=SK[2])            # jaw shade
    d.rectangle((10, 6, 13, 14), fill=HAIR)              # back hair
    d.point((10, 12), fill=HAIR)
    d.rectangle((20, 12, 21, 14), fill=SK[3])            # nose bump
    d.point((17, 12), fill=hx('2b1c14'))                 # eye
    d.point((16, 11), fill=(255, 255, 255, 255))
    d.point((18, 15), fill=RAMPS['blossom'][3])          # blush
    # cap with brim pointing right (forward)
    d.rectangle((11, 3, 20, 8), fill=CAP)
    d.rectangle((11, 3, 20, 4), fill=CAP_L)
    d.rectangle((11, 3, 12, 8), fill=CAP_D)
    d.rectangle((19, 7, 24, 9), fill=CAP_D)              # forward brim
    d.point((13, 2), fill=CAP_L)
    return outline(img)


def sheet(frame_fn, mirror=False):
    out = canvas(FW * 3, FH)
    for i, phase in enumerate((0, 1, 2)):
        fr = frame_fn(phase)
        if mirror:
            fr = fr.transpose(Image.FLIP_LEFT_RIGHT)
        out.paste(fr, (i * FW, 0))
    return out


def main():
    os.makedirs(OUT, exist_ok=True)
    outputs = {
        'char-player-down.png': sheet(frame_front),
        'char-player-up.png': sheet(frame_back),
        'char-player-right.png': sheet(frame_side),
        'char-player-left.png': sheet(frame_side, mirror=True),
        'char-player.png': outline(frame_front_base()),
    }
    for name, img in outputs.items():
        img.save(os.path.join(OUT, name))
        print('wrote', name, img.size)


def frame_front_base():
    # standing front frame without outline (outline applied by caller) for the
    # single-image fallback char-player.png.
    from PIL import ImageDraw as _ID
    img = canvas(FW, FH)
    d = _ID.Draw(img)
    # reuse the standing front frame but strip its pre-applied outline by
    # simply redrawing phase 0 without the outline pass.
    _front_legs(d, 0)
    d.rectangle((9, 18, 22, 30), fill=JACKET)
    d.rectangle((9, 18, 22, 20), fill=JACKET_L)
    d.rectangle((19, 18, 22, 30), fill=JACKET_D)
    d.line((15, 20, 15, 29), fill=JACKET_D)
    d.rectangle((13, 18, 18, 20), fill=CREAM)
    d.rectangle((5, 19, 8, 27), fill=JACKET)
    d.rectangle((5, 27, 8, 29), fill=SK[2])
    d.rectangle((23, 19, 26, 27), fill=JACKET_D)
    d.rectangle((23, 27, 26, 29), fill=SK[2])
    d.rectangle((10, 6, 21, 17), fill=SK[3])
    d.rectangle((10, 14, 21, 17), fill=SK[2])
    d.point([(11, 15), (20, 15)], fill=RAMPS['blossom'][3])
    d.point([(13, 12), (18, 12)], fill=hx('2b1c14'))
    d.point((13, 11), fill=(255, 255, 255, 255))
    d.line((15, 14, 16, 14), fill=SK[1])
    d.rectangle((10, 8, 21, 9), fill=HAIR)
    d.point([(10, 10), (21, 10), (10, 11)], fill=HAIR)
    d.rectangle((9, 3, 22, 8), fill=CAP)
    d.rectangle((9, 3, 22, 4), fill=CAP_L)
    d.rectangle((19, 3, 22, 8), fill=CAP_D)
    d.rectangle((17, 7, 26, 9), fill=CAP_D)
    d.point((15, 2), fill=CAP_L)
    return img


if __name__ == '__main__':
    main()
