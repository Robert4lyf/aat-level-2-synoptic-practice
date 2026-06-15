#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
trace_lsf_numbers.py — trace the LSF number signs (1-10) from the reference
chart "Les nombres de 0 a 100" (D'apres Albert Tabaot).

Same pipeline as tools/trace_lsf_signs.py (crop -> potrace -> cairosvg ->
transparent PNG data URI) but specialised for the gridded numbers chart:
  * detects the heavy cell grid and erases it,
  * removes the printed digit caption from each cell,
  * drops small grid-fragment components that touch a cell edge.

The authentic LSF forms (NOT ASL): 1 = thumb, 2 = index point, 3 = thumb +
index + middle, 4 = four fingers, 5 = open hand; 6-9 are TWO-handed (one open
hand = 5 plus the other hand showing 1-4); 10 = both hands forming circles.

Expects pre-cropped cells in /tmp/numcells/<label>.png and writes
/tmp/lsf_numbers_traced.json. See the repo history for the cropping step.
"""
"""Trace LSF number cells (1-10) from the real reference chart."""
import subprocess, tempfile, os, base64, io, json, sys
from PIL import Image, ImageFilter
import numpy as np
from scipy import ndimage

INK_THRESHOLD = 128
UPSCALE = 3
DW, DH = 90, 90      # numbers can be wide (two-handed) so square-ish frame
INK_RGB = (25, 25, 25)

def strip_digit(im, label):
    """Remove the printed digit (bottom-right corner component)."""
    a = np.array(im)
    H, W = a.shape
    ink = a < INK_THRESHOLD
    lbl, n = ndimage.label(ink)
    out = a.copy()
    if label == '10':
        # digit overlaps right-hand wrist; white out a tight corner box
        y0 = int(H*0.82); x0 = int(W*0.86)
        out[y0:, x0:] = 255
        return Image.fromarray(out)
    for i in range(1, n+1):
        ys, xs = np.where(lbl == i)
        cy0, cx0 = ys.min(), xs.min()
        # the digit is a compact component anchored in the bottom-right corner
        if cy0 > 0.72*H and cx0 > 0.78*W:
            out[lbl == i] = 255
    return Image.fromarray(out)

def clean_borders(im):
    """Remove small grid-fragment components that touch the cell edge.

    The hand outline(s) are the largest component(s); knuckle-crease detail
    lines sit INSIDE the hand and never touch the edge. Grid-border fragments
    are small and touch an edge, so we drop those and nothing else."""
    a = np.array(im.convert('L'))
    H, W = a.shape
    ink = a < INK_THRESHOLD
    lbl, n = ndimage.label(ink)
    if n == 0:
        return im
    sizes = ndimage.sum(np.ones_like(lbl), lbl, range(1, n + 1))
    largest = sizes.max()
    out = a.copy()
    for i in range(1, n + 1):
        ys, xs = np.where(lbl == i)
        touches_edge = (ys.min() == 0 or ys.max() == H - 1 or
                        xs.min() == 0 or xs.max() == W - 1)
        if touches_edge and sizes[i - 1] < 0.12 * largest:
            out[lbl == i] = 255
    return Image.fromarray(out)

def trim_ws(im, pad=6):
    a = np.array(im.convert('L'))
    ink = a < 200
    if not ink.any():
        return im
    ys = np.where(np.any(ink, axis=1))[0]
    xs = np.where(np.any(ink, axis=0))[0]
    H, W = a.shape
    y0, y1 = max(0, ys[0]-pad), min(H, ys[-1]+pad+1)
    x0, x1 = max(0, xs[0]-pad), min(W, xs[-1]+pad+1)
    return im.crop((x0, y0, x1, y1))

def trace_to_uri(im):
    im = im.convert('L')
    w, h = im.size
    big = im.resize((w*UPSCALE, h*UPSCALE), Image.LANCZOS)
    big = big.filter(ImageFilter.GaussianBlur(radius=0.4))
    arr = np.array(big)
    bw = arr < INK_THRESHOLD
    bw_img = Image.fromarray(np.where(bw, 0, 255).astype(np.uint8)).convert('1')
    with tempfile.NamedTemporaryFile(suffix='.pbm', delete=False) as f: pbm=f.name
    with tempfile.NamedTemporaryFile(suffix='.svg', delete=False) as f: svgp=f.name
    try:
        bw_img.save(pbm)
        subprocess.run(['potrace', pbm, '-s', '--tight', '-o', svgp,
                        '--alphamax','1.0','--opttolerance','0.2','-k','0.35'],
                       capture_output=True, check=True)
        traced = open(svgp,'rb').read()
    finally:
        for p in (pbm,svgp):
            try: os.unlink(p)
            except: pass
    # render: preserve aspect ratio, fit within DW*3 x DH*3
    import cairosvg
    png = cairosvg.svg2png(bytestring=traced, output_width=DW*3,
                            background_color='white')
    pim = Image.open(io.BytesIO(png)).convert('RGBA')
    g = np.array(pim.convert('L'))
    ink = g < 200
    if not ink.any(): raise ValueError("empty")
    rows = np.where(np.any(ink,axis=1))[0]; cols = np.where(np.any(ink,axis=0))[0]
    pad=4
    r0,r1 = max(0,rows[0]-pad), min(pim.height,rows[-1]+pad)
    c0,c1 = max(0,cols[0]-pad), min(pim.width,cols[-1]+pad)
    crop = pim.crop((c0,r0,c1+1,r1+1))
    g2 = np.array(crop.convert('L'))
    mask = g2 < 180
    o = np.zeros((*g2.shape,4),dtype=np.uint8)
    o[...,0],o[...,1],o[...,2]=INK_RGB
    o[...,3]=np.where(mask,255,0)
    final = Image.fromarray(o,'RGBA')
    buf=io.BytesIO(); final.save(buf,'PNG',optimize=True)
    return "data:image/png;base64,"+base64.b64encode(buf.getvalue()).decode()

result = {}
preview = {}
for label in ['1','2','3','4','5','6','7','8','9','10']:
    im = Image.open(f'/tmp/numcells/{label}.png')
    im = strip_digit(im, label)
    im = clean_borders(im)
    im = trim_ws(im)
    result[label] = trace_to_uri(im)
    # also save a PNG preview
    b64 = result[label].split(',',1)[1]
    open(f'/tmp/numtrace_{label}.png','wb').write(base64.b64decode(b64+'=='))
    print(f"  traced {label}", file=sys.stderr)

with open('/tmp/lsf_numbers_traced.json','w') as f:
    json.dump(result, f)
print("Done -> /tmp/lsf_numbers_traced.json", file=sys.stderr)
