/* Aseprite's interface, drawn from data.
 *
 * WHAT THIS IS FOR
 *
 * This course is taught in Aseprite. It names the Color Mode dropdown, the
 * onion-skin buttons, the tag bar, the palette panel and the Export Sprite
 * Sheet dialog, and it showed none of them — a reader who has not found the
 * timeline yet cannot act on "set the loop range on the tag". The pixel
 * figures elsewhere in the course teach what to draw; these teach where the
 * control is.
 *
 * WHY DRAWN RATHER THAN SCREENSHOTTED
 *
 * Aseprite is somebody else's proprietary software and a screenshot of it is
 * their copyright, their version number and their theme. A diagram is not:
 * it shows the arrangement, which is the part that has to be learned, and it
 * does not go stale the week the program is re-skinned. It is also the part
 * that can be checked — scripts/check-pixel-panels.js reads the kinds below
 * and fails a panel whose annotations point at nothing.
 *
 * THE SHAPE
 *
 *   panel: { kind, title, note?, rows|tools|frames|layers|swatches, marks? }
 *
 *   A mark is written into a label — '②Color Mode' — and the renderer tints
 *   it. The legend under the panel explains it, and the check requires the
 *   two sets to agree in both directions.
 *
 *   dialog    a settings window: rows of [label, control, value?]
 *   toolbar   a strip of tools, each with the key that selects it
 *   timeline  layers down, frames across, with an onion range and a tag
 *   layers    the layer stack, with what is visible and what is locked
 *   palette   indexed swatches, numbered the way indexed mode numbers them
 *
 * ANNOTATIONS. Like the AAT documents, a panel earns its place by being
 * pointed at: ① beside a control and a line underneath saying what it does.
 * A drawing of a dialog with no marks on it is decoration.
 *
 * THE CHROME DOES NOT THEME, and for the opposite reason to the art. The
 * figures in pixel-ui.js keep literal colours because a hue-shift lesson is
 * wrong if the theme moves its hues. These keep literal colours because
 * Aseprite's interface is dark grey whatever the reader has set this app to,
 * and a panel repainted in light mode stops looking like the program.
 */
(function (root, factory) {
  'use strict';
  var api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.PixelPanels = api;
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  /* Aseprite's default dark theme, near enough to be recognised. */
  var U = {
    bg:      '#32373D',
    panel:   '#3B4148',
    sunken:  '#22262B',
    line:    '#5A6169',
    ink:     '#D6DBE0',
    dim:     '#8D959E',
    accent:  '#F5A623',   // the selected / active colour
    blue:    '#5B9BD5',
    onion:   '#7FD1A0',
    tag:     '#E06C75'
  };

  var MARKS = ['①', '②', '③', '④', '⑤', '⑥'];

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  var MARK_RE = /[\u2460-\u2465]/g;

  /* Text, at the two sizes this whole file uses. A third size would be a
     decision nobody could defend.

     A circled digit anywhere in the string comes out in the accent colour, so
     a mark sitting in a label reads as a pointer rather than as part of the
     label. SVG has no way to colour part of a run except a tspan, hence the
     substitution after escaping. */
  function tx(x, y, s, fill, opts) {
    var o = opts || {};
    var body = esc(s).replace(MARK_RE, function (m) {
      return '<tspan fill="' + U.accent + '" font-weight="700">' + m + '</tspan>';
    });
    return '<text x="' + x + '" y="' + y + '" fill="' + (fill || U.ink) +
      '" font-size="' + (o.size || 11) + '" font-family="ui-monospace, Menlo, Consolas, monospace"' +
      (o.weight ? ' font-weight="' + o.weight + '"' : '') +
      (o.anchor ? ' text-anchor="' + o.anchor + '"' : '') +
      ' dominant-baseline="central">' + body + '</text>';
  }

  function box(x, y, w, h, fill, stroke) {
    return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h +
      '" rx="2" fill="' + fill + '"' + (stroke ? ' stroke="' + stroke + '"' : '') + '/>';
  }

  /* ── dialog ─────────────────────────────────────────────────────────────── */
  /* rows: [label, control, value]. `control` decides what is drawn beside the
     label, and nothing else in the row does:
        field     a typed-in value
        select    a dropdown, value shown with a caret
        check     a tick box, value 'on' or 'off'
        radios    several choices, the one in `on` filled
        button    a push button */
  function dialog(p) {
    var rows = p.rows || [];
    var rh = 26, top = 30;
    /* The window is sized to its contents rather than fixed. A fixed 300px
       clipped "Indexed" off the end of the colour-mode row and cut "Apply
       pixel ratio" in half — and a diagram of a dialog whose labels do not
       fit is a diagram of nothing. Monospace throughout, so a character is
       0.6 of its size and the arithmetic below is exact enough. */
    var ch = 6.6;
    var labelW = 110;
    var ctrlW = 170;
    rows.forEach(function (r) {
      labelW = Math.max(labelW, String(r[0]).length * ch + 16);
      if (r[1] === 'radios') {
        var w = 0;
        String(r[2]).split('|').forEach(function (o) { w += 16 + o.replace(/\*$/, '').length * ch + 14; });
        ctrlW = Math.max(ctrlW, w);
      } else if (r[1] === 'check') {
        ctrlW = Math.max(ctrlW, 22 + String(r[2]).replace(/^(on|off)\s*/, '').length * ch + 14);
      }
    });
    var W = Math.max(300, Math.round(labelW + ctrlW + 24));
    var H = top + rows.length * rh + 14;
    var out = box(0, 0, W, H, U.panel, U.line);
    out += box(0, 0, W, 22, U.bg) + tx(9, 12, p.title || 'Dialog', U.ink, { weight: 700 });
    rows.forEach(function (r, i) {
      var y = top + i * rh, cy = y + 11;
      out += tx(10, cy, r[0], U.dim);
      var cx = Math.round(labelW + 10), cw = W - cx - 12;
      if (r[1] === 'field') {
        out += box(cx, y, cw, 20, U.sunken, U.line) + tx(cx + 7, cy, r[2], U.ink);
      } else if (r[1] === 'select') {
        out += box(cx, y, cw, 20, U.sunken, U.line) + tx(cx + 7, cy, r[2], U.ink) +
          '<path d="M' + (cx + cw - 16) + ' ' + (cy - 2) + ' l5 6 l5 -6 Z" fill="' + U.dim + '"/>';
      } else if (r[1] === 'check') {
        var on = /^on/.test(String(r[2]));
        out += box(cx, y + 3, 14, 14, U.sunken, U.line);
        if (on) out += '<path d="M' + (cx + 3) + ' ' + (cy) + ' l3 4 l6 -8" stroke="' + U.accent +
          '" stroke-width="2.4" fill="none" stroke-linecap="round"/>';
        out += tx(cx + 22, cy, String(r[2]).replace(/^(on|off)\s*/, ''), U.ink);
      } else if (r[1] === 'radios') {
        var opts = String(r[2]).split('|');
        var ox = cx;
        opts.forEach(function (o) {
          var sel = /\*$/.test(o); var lab = o.replace(/\*$/, '');
          out += '<circle cx="' + (ox + 6) + '" cy="' + cy + '" r="6" fill="' + U.sunken +
            '" stroke="' + U.line + '"/>';
          if (sel) out += '<circle cx="' + (ox + 6) + '" cy="' + cy + '" r="3" fill="' + U.accent + '"/>';
          out += tx(ox + 16, cy, lab, sel ? U.ink : U.dim);
          ox += 16 + lab.length * ch + 14;
        });
      } else if (r[1] === 'button') {
        out += box(cx, y, 74, 20, U.bg, U.line) + tx(cx + 37, cy, r[2], U.ink, { anchor: 'middle' });
      }
    });
    return { svg: out, w: W, h: H };
  }

  /* ── toolbar ────────────────────────────────────────────────────────────── */
  /* tools: [key, name, on?]. The icon is the key in a cap, because a drawing
     of Aseprite's pencil at 20 pixels is a grey smudge and the key is what
     the reader actually presses. */
  function toolbar(p) {
    var tools = p.tools || [];
    var cw = 54, W = tools.length * cw + 12, H = 62;
    var out = box(0, 0, W, H, U.panel, U.line);
    tools.forEach(function (t, i) {
      var x = 6 + i * cw;
      out += box(x, 6, cw - 6, 30, t[2] ? U.accent : U.bg, U.line);
      out += tx(x + (cw - 6) / 2, 21, t[0], t[2] ? '#1E1E1E' : U.ink, { anchor: 'middle', size: 15, weight: 700 });
      out += tx(x + (cw - 6) / 2, 47, t[1], U.dim, { anchor: 'middle', size: 9.5 });
    });
    return { svg: out, w: W, h: H };
  }

  /* ── timeline ───────────────────────────────────────────────────────────── */
  /* frames: how many cells across. layers: [name, cells] where cells is a
     string, one character per frame: '#' a drawn cel, '.' an empty one.
     onion: [from, to] shades that range. tag: [from, to, name]. */
  function timeline(p) {
    var n = p.frames || 8, layers = p.layers || [], cw = 30, lw = 84;
    var top = 40, rh = 24;
    var W = lw + n * cw + 10, H = top + layers.length * rh + 12;
    var out = box(0, 0, W, H, U.panel, U.line);
    /* The tag bar sits above the frame numbers, which is where Aseprite puts
       it and why a reader looking at the frames misses it. */
    if (p.tag) {
      var tx0 = lw + (p.tag[0] - 1) * cw, tw = (p.tag[1] - p.tag[0] + 1) * cw;
      out += box(tx0 + 2, 6, tw - 4, 12, U.tag) +
        tx(tx0 + tw / 2, 12, p.tag[2], '#1E1E1E', { anchor: 'middle', size: 9.5, weight: 700 });
    }
    for (var f = 0; f < n; f++) {
      out += tx(lw + f * cw + cw / 2, 30, String(f + 1), U.dim, { anchor: 'middle', size: 10 });
    }
    if (p.onionLabel) out += tx(8, 12, p.onionLabel, U.dim, { size: 9.5 });
    if (p.onion) {
      var ox = lw + (p.onion[0] - 1) * cw, ow = (p.onion[1] - p.onion[0] + 1) * cw;
      out += '<rect x="' + ox + '" y="' + (top - 4) + '" width="' + ow + '" height="' +
        (layers.length * rh + 6) + '" fill="' + U.onion + '" opacity="0.16"/>' +
        '<rect x="' + ox + '" y="' + (top - 4) + '" width="' + ow + '" height="' +
        (layers.length * rh + 6) + '" fill="none" stroke="' + U.onion + '" stroke-dasharray="3 3"/>';
    }
    layers.forEach(function (l, i) {
      var y = top + i * rh;
      out += tx(8, y + 10, l[0], U.ink, { size: 10 });
      for (var f2 = 0; f2 < n; f2++) {
        var ch = (l[1] || '').charAt(f2);
        var x = lw + f2 * cw;
        out += box(x + 3, y, cw - 6, 20, U.sunken, U.line);
        if (ch === '#') out += box(x + 8, y + 5, cw - 16, 10, U.blue);
      }
    });
    return { svg: out, w: W, h: H };
  }

  /* ── layers ─────────────────────────────────────────────────────────────── */
  /* items: [name, visible, locked]. */
  function layers(p) {
    var items = p.items || [], rh = 26, W = 250;
    var H = 22 + items.length * rh + 10;
    var out = box(0, 0, W, H, U.panel, U.line);
    out += box(0, 0, W, 22, U.bg) + tx(9, 12, p.title || 'Layers', U.ink, { weight: 700 });
    items.forEach(function (it, i) {
      var y = 26 + i * rh, cy = y + 11;
      out += box(4, y, W - 8, 22, i === 0 ? U.sunken : U.bg, U.line);
      out += tx(14, cy, it[1] ? '◉' : '○', it[1] ? U.accent : U.dim, { size: 12 });
      out += tx(32, cy, it[2] ? '■' : '□', it[2] ? U.ink : U.dim, { size: 10 });
      out += tx(50, cy, it[0], U.ink, { size: 10.5 });
    });
    return { svg: out, w: W, h: H };
  }

  /* ── palette ────────────────────────────────────────────────────────────── */
  /* colours: array of hex. The index under each swatch is the point: in
     indexed mode that number is what the file stores, and changing the colour
     at an index repaints every pixel holding it. */
  function palette(p) {
    var cols = p.colours || [], per = p.per || 8, sw = 28;
    var rows = Math.ceil(cols.length / per);
    var W = per * sw + 12, H = 22 + rows * (sw + 13) + 6;
    var out = box(0, 0, W, H, U.panel, U.line);
    out += box(0, 0, W, 22, U.bg) + tx(9, 12, p.title || 'Palette', U.ink, { weight: 700 });
    cols.forEach(function (c, i) {
      var x = 6 + (i % per) * sw, y = 28 + Math.floor(i / per) * (sw + 13);
      out += '<rect x="' + x + '" y="' + y + '" width="' + (sw - 4) + '" height="' + (sw - 4) +
        '" fill="' + c + '" stroke="' + U.line + '"/>';
      out += tx(x + (sw - 4) / 2, y + sw + 2, String(i), U.dim, { anchor: 'middle', size: 9 });
    });
    return { svg: out, w: W, h: H };
  }

  var KINDS = {
    dialog: dialog, toolbar: toolbar, timeline: timeline, layers: layers, palette: palette
  };

  /* ── One panel, with its legend ─────────────────────────────────────────── */
  function html(p) {
    if (!p || !KINDS[p.kind]) return '';
    var built = KINDS[p.kind](p);
    var h = '<figure class="px-panel">' +
      '<svg class="px-panel-svg" viewBox="0 0 ' + built.w + ' ' + built.h + '"' +
      ' width="' + built.w + '" height="' + built.h + '" role="img" aria-label="' +
      esc(p.title || p.kind) + '">' + built.svg + '</svg>';
    if (p.marks && p.marks.length) {
      h += '<ol class="px-panel-legend">' + p.marks.map(function (m) {
        return '<li><span class="px-panel-mark">' + esc(m[0]) + '</span><span>' + esc(m[1]) + '</span></li>';
      }).join('') + '</ol>';
    }
    if (p.note) h += '<figcaption class="px-panel-note">' + esc(p.note) + '</figcaption>';
    return h + '</figure>';
  }

  function classes() {
    return ['px-panel', 'px-panel-svg', 'px-panel-legend', 'px-panel-mark', 'px-panel-note'];
  }

  /* Which marks a panel actually prints. Exported so the check compares the
     drawing against its legend without re-walking the data its own way — the
     same reason doc-figure.js exports it. */
  function usedMarks(p) {
    var seen = [];
    var scan = function (v) {
      String(v == null ? '' : v).replace(MARK_RE, function (m) {
        if (seen.indexOf(m) === -1) seen.push(m);
        return m;
      });
    };
    scan(p.title);
    (p.rows || []).forEach(function (r) { r.forEach(scan); });
    (p.tools || []).forEach(function (t) { scan(t[0]); scan(t[1]); });
    (p.layers || []).forEach(function (l) { scan(l[0]); });
    (p.items || []).forEach(function (i) { scan(i[0]); });
    if (p.tag) scan(p.tag[2]);
    if (p.onionLabel) scan(p.onionLabel);
    return seen;
  }

  return { html: html, classes: classes, usedMarks: usedMarks, KINDS: KINDS, MARKS: MARKS, UI: U };
}));
