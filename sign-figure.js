/* French road signs, drawn from data.
 *
 * WHAT THIS IS FOR
 *
 * The Code de la route course opens with a lesson called "Les panneaux de
 * signalisation" and seventeen questions about them, and until now showed not
 * one sign. It asked "a triangular sign with a red border means?" and answered
 * in words. A learner who can answer that from the sentence still fails at a
 * junction, because the examination — and the road — show the sign and expect
 * recognition, not a definition.
 *
 * WHY DRAWN RATHER THAN PHOTOGRAPHED
 *
 * Photographs of real signs belong to whoever took them. These are built from
 * the shapes and colours the regulation specifies, in flat SVG, so they carry
 * no licence and no roadside clutter — and, more usefully, so they can be
 * CHECKED. scripts/check-sign-figures.js reads the family table below and
 * fails the build when a sign's family, shape and colours disagree with the
 * rule the course teaches beside it. A triangle drawn on a blue ground would
 * contradict the card it sits on, and no amount of proof-reading catches that
 * reliably in a file of a hundred signs.
 *
 * THE SHAPE
 *
 *   signs: {
 *     title   heading above the row
 *     items   [{ family, glyph, text?, bar?, label, means }]
 *     note    a line printed under the row
 *   }
 *
 *   family   danger | interdiction | obligation | indication | priorite |
 *            stop | cedez | fin | agglo | medicament — decides the outline
 *            and the colours, and nothing else does
 *   glyph    what is drawn inside it, from GLYPHS below
 *   text     the characters a text-carrying glyph prints ("70", "P")
 *   bar      true draws the red diagonal a prohibition uses to cancel
 *   label    the sign's name in French — what a learner has to say
 *   means    what it requires of the driver, in one line
 *
 * THE ART DOES NOT THEME. Every colour here is a literal, because a sign whose
 * red turns pink in dark mode is a sign the reader learns wrong. Only the
 * surface behind the row follows the theme, in styles.css. The same decision,
 * for the same reason, as the pixel art course's figures.
 */
(function (root, factory) {
  'use strict';
  var api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.SignFigure = api;
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  /* The regulation's colours, as near as a screen gets them. */
  var C = {
    red:    '#D22630',
    blue:   '#0B4EA2',
    yellow: '#F7C600',
    orange: '#E8760C',
    white:  '#FFFFFF',
    black:  '#1C1C1C',
    grey:   '#767676',
    green:  '#0E7A4B'
  };

  /* THE FAMILY TABLE. This is the course's own rule, written where a check can
     read it: shape, ground and border per family. Changing a colour here
     changes every sign of that family and nothing else, and the check asserts
     that the families the cards teach are the families the cards draw. */
  var FAMILIES = {
    danger:       { shape: 'triangle',  ground: C.white,  border: C.red,   ink: C.black, teaches: 'un danger devant' },
    interdiction: { shape: 'circle',    ground: C.white,  border: C.red,   ink: C.black, teaches: 'une interdiction' },
    obligation:   { shape: 'circle',    ground: C.blue,   border: C.blue,  ink: C.white, teaches: 'une obligation' },
    indication:   { shape: 'square',    ground: C.blue,   border: C.blue,  ink: C.white, teaches: 'une information' },
    priorite:     { shape: 'diamond',   ground: C.yellow, border: C.white, ink: C.black, teaches: 'la priorité' },
    stop:         { shape: 'octagon',   ground: C.red,    border: C.white, ink: C.white, teaches: "l'arrêt absolu" },
    cedez:        { shape: 'triangled', ground: C.white,  border: C.red,   ink: C.black, teaches: 'céder le passage' },
    fin:          { shape: 'circle',    ground: C.white,  border: C.grey,  ink: C.grey,  teaches: 'la fin d\'une règle' },
    /* Parking prohibitions are their own family and catch people out for that
       reason: a blue ground under a red ring, where every other prohibition is
       white. The course teaches "rond rouge = interdiction", and this is the
       exception that has to be shown rather than described. */
    stationnement:{ shape: 'circle',    ground: C.blue,   border: C.red,   ink: C.white, teaches: "une interdiction de stationner" },
    agglo:        { shape: 'plate',     ground: C.white,  border: C.black, ink: C.black, teaches: "l'entrée d'une agglomération" },
    /* Not a road sign at all: the pictogram on a medicine box. It is in this
       module because lesson 4 teaches the three levels beside the alcohol
       limits, and a reader meets it as a triangle with a number exactly the
       way they meet a warning sign. Its ground is set per item. */
    medicament:   { shape: 'triangle',  ground: C.yellow, border: C.black, ink: C.black, teaches: 'un niveau de risque au volant', tint: true }
  };

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  /* ── The outlines ───────────────────────────────────────────────────────── */
  /* Everything is drawn in a 0–100 box. A sign's glyph gets the middle of it;
     the numbers below are where each shape leaves room. */
  var SHAPES = {
    triangle:  { vb: '0 0 100 100', inner: [30, 42, 70, 80],
                 d: 'M50 7 L96 88 H4 Z' },
    triangled: { vb: '0 0 100 100', inner: [26, 22, 74, 58],
                 d: 'M4 12 H96 L50 93 Z' },
    diamond:   { vb: '0 0 100 100', inner: [30, 30, 70, 70],
                 d: 'M50 4 L96 50 L50 96 L4 50 Z' },
    octagon:   { vb: '0 0 100 100', inner: [16, 34, 84, 66],
                 d: 'M31 4 H69 L96 31 V69 L69 96 H31 L4 69 V31 Z' },
    square:    { vb: '0 0 100 100', inner: [18, 18, 82, 82],
                 d: 'M8 8 H92 V92 H8 Z' },
    plate:     { vb: '0 0 140 100', inner: [14, 28, 126, 72],
                 d: 'M4 10 H136 V90 H4 Z' },
    circle:    { vb: '0 0 100 100', inner: [24, 24, 76, 76], circle: true }
  };

  /* ── The glyphs ─────────────────────────────────────────────────────────── */
  /* Each returns SVG for the inside of a sign. `ink` is the family's foreground
     and `t` the item's text. Kept to flat fills and thick strokes: a sign is
     read at forty metres and detail is what disappears first. */
  var GLYPHS = {
    /* The whole sign is the message — cédez le passage, and the yellow
       diamond of a priority road. */
    blank: function () { return ''; },

    text: function (ink, t) {
      var s = String(t == null ? '' : t);
      var size = s.length >= 4 ? 26 : s.length === 3 ? 33 : s.length === 2 ? 40 : 46;
      return '<text x="50" y="50" fill="' + ink + '" font-size="' + size +
        '" font-weight="700" text-anchor="middle" dominant-baseline="central"' +
        ' font-family="Helvetica, Arial, sans-serif">' + esc(s) + '</text>';
    },

    /* STOP is set wider and thinner than a speed limit: it is a word, and on
       the real sign it fills the octagon corner to corner. */
    stopword: function (ink) {
      return '<text x="50" y="51" fill="' + ink + '" font-size="27" font-weight="700"' +
        ' letter-spacing="1.5" text-anchor="middle" dominant-baseline="central"' +
        ' font-family="Helvetica, Arial, sans-serif">STOP</text>';
    },

    /* The road itself, bending away to the left and tapering as it goes —
       which is what the sign draws: a plan view, not an arrow. */
    bend: function (ink) {
      return '<path d="M50 82 V56 Q50 42 38 42 H33" fill="none" stroke="' + ink +
        '" stroke-width="11" stroke-linecap="butt"/>' +
        '<path d="M34 32 V52 L18 42 Z" fill="' + ink + '"/>';
    },

    /* Someone on a crossing: figure above, stripes below. */
    pedestrian: function (ink) {
      return '<circle cx="50" cy="44" r="5.4" fill="' + ink + '"/>' +
        '<path d="M50 50 v11 M50 54 l-9 5 M50 54 l9 4 M50 61 l-7 10 M50 61 l7 10"' +
        ' stroke="' + ink + '" stroke-width="4" stroke-linecap="round" fill="none"/>' +
        '<g fill="' + ink + '"><rect x="31" y="75" width="8" height="5.5"/>' +
        '<rect x="43" y="75" width="8" height="5.5"/><rect x="55" y="75" width="8" height="5.5"/>' +
        '<rect x="67" y="75" width="6" height="5.5"/></g>';
    },

    /* Two figures, the taller leading the smaller. */
    children: function (ink) {
      return '<g fill="' + ink + '" stroke="' + ink + '" stroke-width="3.2" stroke-linecap="round">' +
        '<circle cx="40" cy="46" r="4.6" stroke="none"/>' +
        '<path d="M40 51 v11 M40 55 l-7 4 M40 55 l7 3 M40 62 l-5 9 M40 62 l5 9" fill="none"/>' +
        '<circle cx="60" cy="54" r="3.8" stroke="none"/>' +
        '<path d="M60 58 v8 M60 61 l-6 3 M60 61 l6 3 M60 66 l-4 7 M60 66 l4 7" fill="none"/></g>';
    },

    /* A level crossing with its gate down: the post, the barrier across the
       road, and the bars that make a closed gate rather than a pole. */
    crossing: function (ink) {
      return '<g stroke="' + ink + '" stroke-linecap="round" fill="none">' +
        '<path d="M28 78 V46" stroke-width="6"/>' +
        '<path d="M28 52 H78" stroke-width="7"/>' +
        '<path d="M28 68 H74" stroke-width="5"/>' +
        '<path d="M40 52 V68 M54 52 V68 M68 52 V68" stroke-width="4"/></g>';
    },

    /* A stag, head up. Everything smaller than this — a fawn, hooves, an ear
       — turns to a smudge at the size a sign is actually read. */
    animals: function (ink) {
      return '<g fill="' + ink + '">' +
        '<path d="M30 62 h30 v12 h-30 Z"/>' +
        '<rect x="31" y="72" width="4.5" height="12"/><rect x="41" y="72" width="4.5" height="12"/>' +
        '<rect x="52" y="72" width="4.5" height="12"/>' +
        '<path d="M56 64 L66 44 l7 3 -8 19 Z"/>' +
        '<path d="M64 44 l16 2 -2 7 -15 -3 Z"/>' +
        '</g><g stroke="' + ink + '" stroke-width="3" stroke-linecap="round" fill="none">' +
        '<path d="M67 43 L62 30 M62 34 L55 31 M67 43 L74 32 M71 37 L79 35"/></g>';
    },

    /* The roundabout's three arrows, chasing each other anticlockwise the way
       French traffic goes round one. */
    roundabout: function (ink) {
      /* One arm drawn once and rotated twice. The arc runs from the top of the
         ring anticlockwise to its left, which is the way traffic goes round a
         French roundabout, and the head sits at the end of that travel. */
      var arm = function (rot) {
        return '<g transform="rotate(' + rot + ' 50 58)">' +
          '<path d="M50 35 A23 23 0 0 0 27 52" fill="none" stroke="' + ink +
          '" stroke-width="7"/>' +
          '<path d="M19 50 H35 L27 64 Z" fill="' + ink + '"/></g>';
      };
      return arm(0) + arm(120) + arm(240);
    },

    /* A car with its back end stepping out, and the skid it left. */
    slippery: function (ink) {
      return '<g fill="' + ink + '">' +
        '<path d="M34 46 h22 l6 8 h5 a4 4 0 0 1 4 4 v6 a3 3 0 0 1-3 3 H33 a3 3 0 0 1-3-3 v-6 a4 4 0 0 1 4-4 Z"/>' +
        '<rect x="33" y="65" width="6" height="4"/><rect x="59" y="65" width="6" height="4"/>' +
        '</g><g fill="none" stroke="' + ink + '" stroke-width="4.5" stroke-linecap="round">' +
        '<path d="M34 82 C40 76 32 72 38 67"/><path d="M62 82 C68 76 60 72 66 67"/></g>';
    },

    /* The one with the shovel. */
    roadworks: function (ink) {
      return '<g stroke="' + ink + '" stroke-width="4" stroke-linecap="round" fill="none">' +
        '<path d="M42 54 v13 M42 58 l10 4 M42 67 l-6 11 M42 67 l7 11"/>' +
        '<path d="M52 62 L64 50" stroke-width="4.5"/></g>' +
        '<circle cx="42" cy="49" r="5" fill="' + ink + '"/>' +
        '<path d="M60 46 l13 -6 5 11 -13 6 Z" fill="' + ink + '"/>';
    },

    /* The white bar of a "sens interdit". Drawn in the ground colour rather
       than the ink because on that sign the whole disc is red. */
    bar: function (ink) {
      return '<rect x="20" y="43" width="60" height="14" rx="2" fill="' + ink + '"/>';
    },

    /* Two cars side by side, the overtaking one picked out — the only glyph
       that carries a colour of its own, because on the real sign it does. */
    overtake: function (ink) {
      var car = function (x, fill) {
        return '<g fill="' + fill + '" transform="translate(' + x + ' 0)">' +
          '<path d="M30 38 h15 l6 9 h3 a3 3 0 0 1 3 3 v13 a2 2 0 0 1-2 2 H28 a2 2 0 0 1-2-2 V50 a3 3 0 0 1 3-3 Z"/>' +
          '<rect x="27" y="66" width="5" height="5"/><rect x="49" y="66" width="5" height="5"/></g>';
      };
      return car(-10, C.red) + car(22, ink);
    },

    arrowup:    function (ink) { return arrow(ink, 0); },
    arrowleft:  function (ink) { return arrow(ink, -90); },
    arrowright: function (ink) { return arrow(ink, 90); },

    bicycle: function (ink) {
      return '<g fill="none" stroke="' + ink + '" stroke-width="4">' +
        '<circle cx="33" cy="66" r="12"/><circle cx="67" cy="66" r="12"/>' +
        '<path d="M33 66 L46 46 h10 M46 46 L58 66 M58 66 h9 M44 66 h14" stroke-linecap="round"/></g>' +
        '<circle cx="60" cy="38" r="4" fill="' + ink + '"/>';
    },

    /* Dipped headlights: a lamp and the beam falling away from it. */
    headlights: function (ink) {
      return '<path d="M30 40 h14 a16 16 0 0 1 0 32 H30 Z" fill="' + ink + '"/>' +
        '<g stroke="' + ink + '" stroke-width="4" stroke-linecap="round">' +
        '<path d="M62 46 h14"/><path d="M62 56 h16"/><path d="M62 66 h12"/></g>';
    },

    /* A parking disc, set to the arrival time the zone bleue asks for. */
    disc: function (ink) {
      return '<circle cx="50" cy="50" r="26" fill="none" stroke="' + ink + '" stroke-width="5"/>' +
        '<path d="M50 50 V32 M50 50 l13 8" stroke="' + ink + '" stroke-width="5" stroke-linecap="round"/>';
    },

    /* The autoroute pictogram: two carriageways running away under a bridge. */
    motorway: function (ink) {
      return '<path d="M22 84 L40 30 h8 L36 84 Z" fill="' + ink + '"/>' +
        '<path d="M78 84 L60 30 h-8 l12 54 Z" fill="' + ink + '"/>' +
        '<rect x="30" y="20" width="40" height="7" fill="' + ink + '"/>';
    },

    /* The red saltire of "arrêt et stationnement interdits" — no waiting at
       all, where a single diagonal would only forbid leaving the car. */
    cross: function () {
      return '<g stroke="' + C.red + '" stroke-width="10" stroke-linecap="round">' +
        '<path d="M22 22 L78 78"/><path d="M78 22 L22 78"/></g>';
    },

    /* A car, for the medicine pictograms. */
    car: function (ink) {
      return '<path d="M28 54 h20 l7 9 h9 a4 4 0 0 1 4 4 v8 a2 2 0 0 1-2 2 H26 a2 2 0 0 1-2-2 v-8 a4 4 0 0 1 4-4 Z"' +
        ' fill="' + ink + '"/>';
    }
  };

  function arrow(ink, rot) {
    return '<g transform="rotate(' + rot + ' 50 52)">' +
      '<rect x="45" y="46" width="10" height="28" fill="' + ink + '"/>' +
      '<path d="M50 24 L70 50 H30 Z" fill="' + ink + '"/></g>';
  }

  /* ── Drawing one sign ───────────────────────────────────────────────────── */
  function signSvg(item) {
    var fam = FAMILIES[item.family] || FAMILIES.danger;
    var sh = SHAPES[fam.shape];
    var ground = (fam.tint && item.tint && C[item.tint]) ? C[item.tint] : fam.ground;
    var glyph = GLYPHS[item.glyph] || GLYPHS.blank;
    /* The bar of a "sens interdit" is white on red; everywhere else the ink is
       the family's. One conditional rather than a colour field per sign,
       because the rule is the family's, not the item's. */
    var ink = (item.glyph === 'bar' && item.family === 'interdiction') ? C.white : fam.ink;
    var body = sh.circle
      ? '<circle cx="50" cy="50" r="46" fill="' + ground + '" stroke="' + fam.border + '" stroke-width="9"/>'
      : '<path d="' + sh.d + '" fill="' + ground + '" stroke="' + fam.border +
        '" stroke-width="9" stroke-linejoin="round"/>';
    /* A "sens interdit" is a solid red disc, not a red ring. */
    if (item.family === 'interdiction' && item.glyph === 'bar') {
      body = '<circle cx="50" cy="50" r="46" fill="' + C.red + '" stroke="' + C.white + '" stroke-width="5"/>';
    }
    var inside = glyph(ink, item.text);
    /* The cancelling diagonal, drawn over the glyph because that is where it
       goes: it strikes out what the sign shows. */
    var slash = item.bar
      ? '<path d="M20 80 L80 20" stroke="' + C.red + '" stroke-width="10" stroke-linecap="round"/>'
      : '';
    /* The end-of-restriction disc has no border of its own; it carries five
       slanted bars across whatever it cancels. */
    if (item.family === 'fin') {
      slash = '<g stroke="' + C.black + '" stroke-width="4.5" stroke-linecap="round">' +
        '<path d="M24 74 L62 22"/><path d="M33 79 L71 27"/><path d="M42 82 L76 35"/></g>';
    }
    return '<svg class="sign-art" viewBox="' + sh.vb + '" role="img" aria-label="' +
      esc(item.label || '') + '">' + body + inside + slash + '</svg>';
  }

  /* ── One row of them ────────────────────────────────────────────────────── */
  function html(fig) {
    if (!fig || !fig.items || !fig.items.length) return '';
    var h = '<figure class="signs">';
    if (fig.title) h += '<figcaption class="signs-title">' + esc(fig.title) + '</figcaption>';
    h += '<div class="signs-row">' + fig.items.map(function (it) {
      return '<div class="sign">' + signSvg(it) +
        '<span class="sign-label">' + esc(it.label || '') + '</span>' +
        '<span class="sign-means">' + esc(it.means || '') + '</span></div>';
    }).join('') + '</div>';
    if (fig.note) h += '<p class="signs-note">' + esc(fig.note) + '</p>';
    return h + '</figure>';
  }

  /* Every class this can emit, for scripts/check-sign-figures.js. Same reason
     as doc-figure.js: a checker that re-derives the names tests its own
     derivation, and a rule for a class the renderer stopped emitting is dead
     code nobody notices. */
  function classes() {
    return ['signs', 'signs-title', 'signs-row', 'sign', 'sign-art', 'sign-label', 'sign-means', 'signs-note'];
  }

  return {
    html: html, signSvg: signSvg, classes: classes,
    FAMILIES: FAMILIES, GLYPHS: GLYPHS, SHAPES: SHAPES, COLOURS: C
  };
}));
