#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
trace_lsf_signs.py — the canonical pipeline for LSF hand-sign artwork.

Every hand sign shown in the app (alphabet, numbers, vocabulary) must be a
REAL hand drawing traced into crisp vector-quality line art — never a
hand-built geometric SVG (rectangles / ad-hoc paths). Users repeatedly
rejected the geometric approach; this script is the agreed way to draw signs.

PIPELINE (per sign)
  1. Crop the hand from a reference chart (the source line-art image).
  2. Trim the printed caption/label beneath the hand.
  3. Upscale 3x (Lanczos) + light Gaussian blur to de-alias.
  4. Threshold to a clean 1-bit bitmap.
  5. potrace  -> smooth vector SVG (true bezier curves, no blur).
  6. cairosvg -> render at 3x "retina" of the display size.
  7. Recolour to near-black ink on a TRANSPARENT background.
  8. Emit a base64 PNG data URI, ready to drop into a `visual:` field as
     <img src="data:image/png;base64,...">.

DEPENDENCIES (install once in the working environment)
  apt-get install -y potrace
  pip install Pillow numpy cairosvg

USAGE
  # Auto-detect a grid of signs in a chart and print {label: dataURI} JSON:
  python3 tools/trace_lsf_signs.py --source chart.png \
      --labels ABCDEFGHIJKLMNOPQRSTUVWXYZ --auto --out signs.json

  # Or trace a single already-cropped hand image:
  python3 tools/trace_lsf_signs.py --single hand.png --out one.json

The caller is responsible for assembling the data URIs into the grid HTML
(see build_grid() for the exact card markup used across the app) and writing
it into the relevant `visual:` field of lsf-data.js.
"""

import argparse
import base64
import io
import json
import os
import subprocess
import sys
import tempfile

try:
    from PIL import Image, ImageFilter
    import numpy as np
    import cairosvg
except ImportError as e:  # pragma: no cover
    sys.exit("Missing dependency: %s\n"
             "Run: apt-get install -y potrace && pip install Pillow numpy cairosvg" % e)


# ── Tunables ─────────────────────────────────────────────────────────────────
INK_THRESHOLD = 140      # pixels darker than this count as ink (0-255)
UPSCALE       = 3        # pre-trace upscale factor
RETINA        = 3        # render scale relative to display size
DISPLAY_W     = 60       # nominal display width  (px)
DISPLAY_H     = 90       # nominal display height (px)
INK_RGB       = (25, 25, 25)   # near-black ink colour in the final PNG


# ── Vector tracing core (steps 3-8) ──────────────────────────────────────────
def trace_to_data_uri(crop):
    """Take a cropped PIL grayscale hand image -> transparent PNG data URI."""
    w, h = crop.size
    big = crop.resize((w * UPSCALE, h * UPSCALE), Image.LANCZOS)
    big = big.filter(ImageFilter.GaussianBlur(radius=0.5))
    arr = np.array(big)
    bw = (arr < INK_THRESHOLD)

    # potrace consumes a PBM; black (1) = ink.
    bw_img = Image.fromarray(np.where(bw, 0, 255).astype(np.uint8)).convert("1")
    with tempfile.NamedTemporaryFile(suffix=".pbm", delete=False) as ftmp:
        pbm_path = ftmp.name
    with tempfile.NamedTemporaryFile(suffix=".svg", delete=False) as ftmp:
        svg_path = ftmp.name
    try:
        bw_img.save(pbm_path)
        subprocess.run(
            ["potrace", pbm_path, "-s", "--tight", "-o", svg_path,
             "--alphamax", "1.0", "--opttolerance", "0.2", "-k", "0.35"],
            capture_output=True, check=True)
        svg_bytes = open(svg_path, "rb").read()
    finally:
        for p in (pbm_path, svg_path):
            try:
                os.unlink(p)
            except OSError:
                pass

    png_bytes = cairosvg.svg2png(
        bytestring=svg_bytes,
        output_width=DISPLAY_W * RETINA,
        output_height=DISPLAY_H * RETINA,
        background_color="white")

    im = Image.open(io.BytesIO(png_bytes)).convert("RGBA")
    gray = np.array(im.convert("L"))
    ink = gray < 200
    if not ink.any():
        raise ValueError("Traced image is empty — check threshold/source crop.")

    rows = np.where(np.any(ink, axis=1))[0]
    cols = np.where(np.any(ink, axis=0))[0]
    pad = 4
    r0, r1 = max(0, rows[0] - pad), min(im.height, rows[-1] + pad)
    c0, c1 = max(0, cols[0] - pad), min(im.width, cols[-1] + pad)
    cropped = im.crop((c0, r0, c1 + 1, r1 + 1))

    g2 = np.array(cropped.convert("L"))
    mask = g2 < 180
    out = np.zeros((*g2.shape, 4), dtype=np.uint8)
    out[..., 0], out[..., 1], out[..., 2] = INK_RGB
    out[..., 3] = np.where(mask, 255, 0)
    final = Image.fromarray(out, "RGBA")

    buf = io.BytesIO()
    final.save(buf, "PNG", optimize=True)
    return "data:image/png;base64," + base64.b64encode(buf.getvalue()).decode()


# ── Chart cropping (steps 1-2) ───────────────────────────────────────────────
def detect_rows(ink, min_ink=3):
    rowsum = ink.sum(axis=1)
    on = rowsum > min_ink
    bands, start, prev = [], 0, False
    for y, v in enumerate(on):
        if v and not prev:
            start = y
        if not v and prev:
            bands.append((start, y))
        prev = v
    if prev:
        bands.append((start, len(on)))
    return [b for b in bands if b[1] - b[0] > 20]


def detect_cols(ink, y0, y1, min_ink=2):
    band = ink[y0:y1, :]
    on = band.sum(axis=0) > min_ink
    segs, start, prev = [], 0, False
    for x, v in enumerate(on):
        if v and not prev:
            start = x
        if not v and prev:
            segs.append((start, x))
        prev = v
    if prev:
        segs.append((start, len(on)))
    return [s for s in segs if s[1] - s[0] > 12]


def trim_label(ink, y0, y1, x0, x1):
    """Find the valley between the hand and the printed caption below it."""
    sub = ink[y0:y1, x0:x1]
    rowsum = sub.sum(axis=1)
    h = y1 - y0
    for i in range(int(h * 0.50), h):
        if rowsum[i] <= 1:
            return y0 + i
    return y0 + int(h * 0.78)


def crop_chart(source_path, labels):
    """Auto-detect a grid of signs in a chart; return {label: PIL grayscale}."""
    gray = Image.open(source_path).convert("L")
    a = np.array(gray)
    ink = (a < INK_THRESHOLD).astype(int)
    rows = detect_rows(ink)
    cells, idx = {}, 0
    for (y0, y1) in rows:
        for (x0, x1) in detect_cols(ink, y0, y1):
            if idx >= len(labels):
                break
            yb = trim_label(ink, y0, y1, x0, x1)
            pad = 4
            box = (max(0, x0 - pad), max(0, y0 - pad),
                   min(a.shape[1], x1 + pad), min(a.shape[0], yb + pad))
            cells[labels[idx]] = gray.crop(box)
            idx += 1
    if idx < len(labels):
        print("WARNING: detected %d cells but %d labels given. "
              "Pass an explicit --layout if auto-detection misaligned."
              % (idx, len(labels)), file=sys.stderr)
    return cells


# ── Grid HTML assembly (matches the app's existing card markup) ──────────────
def build_grid(label_to_uri, label_to_desc=None):
    label_to_desc = label_to_desc or {}
    card = ("display:flex;flex-direction:column;align-items:center;"
            "background:rgba(124,58,237,.08);border-radius:10px;"
            "padding:8px 5px;gap:3px;min-width:66px")
    img = ("max-width:62px;max-height:84px;width:auto;height:auto;"
           "display:block;margin:auto")
    grid = ("display:grid;grid-template-columns:repeat(auto-fill,minmax(72px,1fr));"
            "gap:8px;padding:6px 0;margin-bottom:4px")
    cards = []
    for label, uri in label_to_uri.items():
        desc = label_to_desc.get(label, "")
        cards.append(
            '<div style="%s">'
            '<img src="%s" alt="LSF %s" style="%s"/>'
            '<span style="font-size:1rem;font-weight:800;color:#7c3aed;'
            'line-height:1">%s</span>'
            '<span style="font-size:.6rem;color:#666;text-align:center;'
            'line-height:1.3">%s</span></div>'
            % (card, uri, label, img, label, desc))
    html = '<div style="%s">%s</div>' % (grid, "".join(cards))
    assert "'" not in html, "Generated HTML contains a single quote (would break the JS string)."
    return html


def main():
    ap = argparse.ArgumentParser(description=__doc__,
                                 formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--source", help="reference chart image (a grid of signs)")
    ap.add_argument("--single", help="one already-cropped hand image")
    ap.add_argument("--labels", default="",
                    help="ordered labels, e.g. ABC... or 1234567890")
    ap.add_argument("--auto", action="store_true",
                    help="auto-detect the grid in --source")
    ap.add_argument("--out", default="-", help="output JSON path ('-' = stdout)")
    ap.add_argument("--grid", help="also write assembled grid HTML to this path")
    args = ap.parse_args()

    result = {}
    if args.single:
        label = args.labels[:1] or "X"
        result[label] = trace_to_data_uri(Image.open(args.single).convert("L"))
    elif args.source and args.auto:
        if not args.labels:
            ap.error("--labels is required with --source/--auto")
        for label, crop in crop_chart(args.source, args.labels).items():
            result[label] = trace_to_data_uri(crop)
    else:
        ap.error("provide either --single IMG or --source IMG --auto --labels ...")

    payload = json.dumps(result)
    if args.out == "-":
        print(payload)
    else:
        open(args.out, "w").write(payload)
        print("Wrote %d signs -> %s" % (len(result), args.out), file=sys.stderr)

    if args.grid:
        open(args.grid, "w").write(build_grid(result))
        print("Wrote grid HTML -> %s" % args.grid, file=sys.stderr)


if __name__ == "__main__":
    main()
