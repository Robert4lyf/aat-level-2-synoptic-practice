/* Concept diagrams, drawn from data.
 *
 * WHAT THIS IS FOR
 *
 * The CIPS Level 2 course teaches shapes: a sourcing cycle that returns to
 * where it started, a supply chain with tiers on both sides of the
 * organisation, five rights balanced against one another, pricing methods
 * ranged between who carries the risk, contract documents stacked in order of
 * precedence. Every one of those is a picture, and every one of them was
 * printed as a paragraph. A reader can follow "the process returns to the
 * beginning" and still not see that it is a loop.
 *
 * SIX SHAPES, AND NO SEVENTH WITHOUT A REASON
 *
 *   cycle     numbered steps that come back round
 *   chain     parties in order, with what flows between them
 *   hub       one idea with things balanced around it
 *   spectrum  a range with two named ends and things placed along it
 *   stack     layers, the top one winning
 *   matrix    two axes, four quadrants
 *
 * A vocabulary this small is the point. A module that can draw anything ends
 * up drawing each thing slightly differently, and a reader learns the shape
 * as well as the content — so the shape has to mean the same thing every
 * time. scripts/check-diagram-figures.js holds every diagram to its kind's
 * own rules: a spectrum whose ends are not opposites, a matrix missing a
 * quadrant, or a cycle of two steps is a diagram that has stopped meaning
 * what its shape says.
 *
 * MOSTLY HTML, NOT SVG. Labels here are English phrases, and SVG text does
 * not wrap: "Total cost of ownership" in a 90-pixel box is one line running
 * off the edge. Everything except the hub is boxes and CSS, which wrap, scale
 * and reflow on a phone. The hub is SVG because a ring genuinely has to be
 * drawn — and it takes only short labels, which the check enforces.
 *
 * PREFIX. The caller says what to call the classes; CIPS passes 'c2-dia' so
 * its stylesheet owns them like everything else on that page.
 */
(function (root, factory) {
  'use strict';
  var api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.DiagramFigure = api;
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  var KINDS = ['cycle', 'chain', 'hub', 'spectrum', 'stack', 'matrix'];
  var QUADRANTS = ['tl', 'tr', 'bl', 'br'];
  /* A hub label has to fit inside a drawn box that cannot reflow. Fourteen
     characters is what fits at the size the ring is legible. */
  var HUB_LABEL_MAX = 14;

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function names(stem) {
    return {
      fig: stem, title: stem + '-title', note: stem + '-note', body: stem + '-body',
      step: stem + '-step', n: stem + '-n', label: stem + '-label', sub: stem + '-sub',
      arrow: stem + '-arrow', back: stem + '-back',
      scale: stem + '-scale', bar: stem + '-bar', end: stem + '-end', pin: stem + '-pin',
      layer: stem + '-layer', rank: stem + '-rank',
      grid: stem + '-grid', cell: stem + '-cell', axis: stem + '-axis', axisy: stem + '-axis-y',
      svg: stem + '-svg'
    };
  }

  function classes(stem) {
    var n = names(stem || 'dia'), out = [];
    Object.keys(n).forEach(function (k) { if (out.indexOf(n[k]) === -1) out.push(n[k]); });
    KINDS.forEach(function (k) { out.push((stem || 'dia') + '-is-' + k); });
    return out;
  }

  function labelled(C, it) {
    return '<span class="' + C.label + '">' + esc(it.label) + '</span>' +
      (it.sub ? '<span class="' + C.sub + '">' + esc(it.sub) + '</span>' : '');
  }

  /* ── cycle ──────────────────────────────────────────────────────────────── */
  function cycle(C, d) {
    var items = d.items || [];
    return '<ol class="' + C.body + '">' + items.map(function (it, i) {
      return '<li class="' + C.step + '"><span class="' + C.n + '">' + (i + 1) + '</span>' +
        '<span>' + labelled(C, it) + '</span></li>';
    }).join('') + '</ol>' +
      '<p class="' + C.back + '">' + esc(d.returns || 'and back to step 1') + '</p>';
  }

  /* ── chain ──────────────────────────────────────────────────────────────── */
  function chain(C, d) {
    var items = d.items || [];
    return '<div class="' + C.body + '">' + items.map(function (it, i) {
      return '<div class="' + C.step + '"><span>' + labelled(C, it) + '</span></div>' +
        (i < items.length - 1
          ? '<div class="' + C.arrow + '" aria-hidden="true">→' +
            (it.flow ? '<span class="' + C.sub + '">' + esc(it.flow) + '</span>' : '') + '</div>'
          : '');
    }).join('') + '</div>';
  }

  /* ── hub ────────────────────────────────────────────────────────────────── */
  /* The one drawn shape. Satellites are placed evenly round a circle and the
     spokes are what carries the meaning: each is balanced against the centre
     and, through it, against all the others. */
  function hub(C, d) {
    var items = d.items || [], n = items.length;
    var W = 340, H = 300, cx = W / 2, cy = H / 2, r = 108;
    var svg = '';
    var pts = items.map(function (it, i) {
      var a = -Math.PI / 2 + (i * 2 * Math.PI) / Math.max(n, 1);
      return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a), it: it };
    });
    pts.forEach(function (p) {
      svg += '<line class="' + C.arrow + '" x1="' + cx + '" y1="' + cy + '" x2="' +
        p.x.toFixed(1) + '" y2="' + p.y.toFixed(1) + '"/>';
    });
    svg += '<circle class="' + C.n + '" cx="' + cx + '" cy="' + cy + '" r="46"/>';
    svg += '<text class="' + C.label + '" x="' + cx + '" y="' + cy + '" text-anchor="middle"' +
      ' dominant-baseline="central">' + esc(d.centre || '') + '</text>';
    pts.forEach(function (p) {
      var w = Math.max(70, esc(p.it.label).length * 7.4 + 18);
      svg += '<rect class="' + C.step + '" x="' + (p.x - w / 2).toFixed(1) + '" y="' + (p.y - 15).toFixed(1) +
        '" width="' + w.toFixed(1) + '" height="30" rx="6"/>' +
        '<text class="' + C.sub + '" x="' + p.x.toFixed(1) + '" y="' + p.y.toFixed(1) +
        '" text-anchor="middle" dominant-baseline="central">' + esc(p.it.label) + '</text>';
    });
    return '<svg class="' + C.svg + '" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="' +
      esc(d.title || 'diagram') + '">' + svg + '</svg>';
  }

  /* ── spectrum ───────────────────────────────────────────────────────────── */
  function spectrum(C, d) {
    var ends = d.ends || ['', ''];
    var items = d.items || [];
    /* The scale and the list are two different things and carry two different
       classes. Sharing one and telling them apart with :first-of-type broke
       the moment the second was an <ol> and the first a <div>. */
    return '<div class="' + C.scale + '">' +
      '<div class="' + C.end + '">' + esc(ends[0]) + '</div>' +
      '<div class="' + C.bar + '" aria-hidden="true"></div>' +
      '<div class="' + C.end + '">' + esc(ends[1]) + '</div></div>' +
      '<ol class="' + C.body + '">' + items.map(function (it) {
        return '<li class="' + C.pin + '" style="--at:' + Math.round((it.at || 0) * 100) + '%">' +
          labelled(C, it) + '</li>';
      }).join('') + '</ol>';
  }

  /* ── stack ──────────────────────────────────────────────────────────────── */
  function stack(C, d) {
    var items = d.items || [];
    return '<ol class="' + C.body + '">' + items.map(function (it, i) {
      return '<li class="' + C.layer + '"><span class="' + C.rank + '">' + (i + 1) + '</span>' +
        '<span>' + labelled(C, it) + '</span></li>';
    }).join('') + '</ol>';
  }

  /* ── matrix ─────────────────────────────────────────────────────────────── */
  function matrix(C, d) {
    var cells = {};
    (d.cells || []).forEach(function (c) { cells[c.q] = c; });
    var grid = QUADRANTS.map(function (q) {
      var c = cells[q];
      return '<div class="' + C.cell + '">' + (c ? labelled(C, c) : '') + '</div>';
    }).join('');
    return '<div class="' + C.grid + '">' +
      '<div class="' + C.axisy + '"><span>' + esc((d.y || [])[1] || '') + '</span>' +
      '<span>' + esc((d.y || [])[0] || '') + '</span></div>' +
      '<div class="' + C.body + '">' + grid + '</div>' +
      '<div class="' + C.axis + '"><span>' + esc((d.x || [])[0] || '') + '</span>' +
      '<span>' + esc((d.x || [])[1] || '') + '</span></div></div>';
  }

  var DRAW = { cycle: cycle, chain: chain, hub: hub, spectrum: spectrum, stack: stack, matrix: matrix };

  function html(d, opts) {
    if (!d || KINDS.indexOf(d.kind) === -1) return '';
    var C = names((opts && opts.stem) || 'dia');
    var h = '<figure class="' + C.fig + ' ' + ((opts && opts.stem) || 'dia') + '-is-' + d.kind + '">';
    if (d.title) h += '<figcaption class="' + C.title + '">' + esc(d.title) + '</figcaption>';
    h += DRAW[d.kind](C, d);
    if (d.note) h += '<p class="' + C.note + '">' + esc(d.note) + '</p>';
    return h + '</figure>';
  }

  return { html: html, classes: classes, KINDS: KINDS, QUADRANTS: QUADRANTS, HUB_LABEL_MAX: HUB_LABEL_MAX };
}));
