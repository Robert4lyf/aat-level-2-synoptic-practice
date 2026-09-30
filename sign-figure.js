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

  /* ── The outlines ───────────────────────────────────────────────────────
     Each shape is drawn in a 0–100 box and declares a SAFE REGION: the area a
     pictogram may occupy without touching the border. The safe region is not
     documentation, it is a clip path — every glyph is drawn inside it, so
     detail cannot overlap the outline however badly a glyph is written. A
     sign whose pictogram runs into its own red border is not a sign; it is a
     smudge, and at forty metres a smudge is all any of it is.

     The regions are generous where the shape is and mean where it is not. A
     triangle is the difficult one: at the height a pictogram's head sits, the
     usable width is barely a third of the sign, which is exactly why real
     triangular pictograms are narrow at the top and wide at the bottom. */
  var SHAPES = {
    triangle:  { vb: '0 0 100 100',
                 d: 'M50 7 L96 88 H4 Z',
                 safe: 'M50 20 L85 82 H15 Z' },
    triangled: { vb: '0 0 100 100',
                 d: 'M4 12 H96 L50 93 Z',
                 safe: 'M16 24 H84 L50 80 Z' },
    diamond:   { vb: '0 0 100 100',
                 d: 'M50 4 L96 50 L50 96 L4 50 Z',
                 safe: 'M50 17 L83 50 L50 83 L17 50 Z' },
    octagon:   { vb: '0 0 100 100',
                 d: 'M31 4 H69 L96 31 V69 L69 96 H31 L4 69 V31 Z',
                 safe: 'M34 15 H66 L85 34 V66 L66 85 H34 L15 66 V34 Z' },
    square:    { vb: '0 0 100 100',
                 d: 'M8 8 H92 V92 H8 Z',
                 safe: 'M17 17 H83 V83 H17 Z' },
    plate:     { vb: '0 0 140 100',
                 d: 'M4 10 H136 V90 H4 Z',
                 safe: 'M14 20 H126 V80 H14 Z' },
    circle:    { vb: '0 0 100 100', circle: true,
                 safe: 'M50 14 A36 36 0 1 1 49.99 14 Z' }
  };

  /* ── The glyphs ─────────────────────────────────────────────────────────
     Each returns SVG for the inside of a sign, in the same 0–100 box, and is
     clipped to its shape's safe region. Flat fills and thick strokes: a sign
     is read at speed and the first thing to disappear is detail.

     They are drawn from the regulation's own pictograms rather than from
     memory of what a road sign looks like. A bend is a band of road with a
     flat end, not an arrow. A level crossing is a closed gate with pickets,
     not a pole. A roundabout's three arrows run anticlockwise, because that
     is the direction French traffic goes round one. */
  var GLYPHS = {
    /* The whole sign is the message — cédez le passage, and the yellow
       diamond of a priority road. */
    blank: function () { return ''; },

    text: function (ink, t) {
      var s = String(t == null ? '' : t);
      var size = s.length >= 5 ? 22 : s.length === 4 ? 27 : s.length === 3 ? 33 : s.length === 2 ? 42 : 48;
      return '<text x="50" y="51" fill="' + ink + '" font-size="' + size +
        '" font-weight="700" text-anchor="middle" dominant-baseline="central"' +
        ' font-family="Helvetica, Arial, sans-serif">' + esc(s) + '</text>';
    },

    /* STOP is set wider and lighter than a speed limit: it is a word, and on
       the real sign it runs corner to corner across the octagon. */
    stopword: function (ink) {
      return '<text x="50" y="51" fill="' + ink + '" font-size="26" font-weight="700"' +
        ' letter-spacing="1.5" text-anchor="middle" dominant-baseline="central"' +
        ' font-family="Helvetica, Arial, sans-serif">STOP</text>';
    },

    /* A1a. The ROAD, in plan, bending away to the left — a band of even width
       with a flat far end. It is not an arrow; the sign does not tell you to
       go left, it tells you the road does. */
    bend: function (ink) {
      return '<path d="M55 81 V59 C55 51 49 49 39 49" fill="none" stroke="' + ink +
        '" stroke-width="13" stroke-linecap="butt" stroke-linejoin="round"/>';
    },

    /* A13b. A pedestrian in mid-stride, over the bars of a crossing. The
       figure leads with the far leg, which is what makes it read as walking
       rather than standing. */
    pedestrian: function (ink) {
      return '<circle cx="48" cy="40" r="5.2" fill="' + ink + '"/>' +
        '<g stroke="' + ink + '" stroke-width="4.2" stroke-linecap="round" fill="none">' +
        '<path d="M48 46 V59"/><path d="M48 50 L57 55"/><path d="M48 50 L41 57"/>' +
        '<path d="M48 59 L57 70"/><path d="M48 59 L40 69"/></g>' +
        '<g fill="' + ink + '"><rect x="26" y="74" width="9" height="6" rx="1"/>' +
        '<rect x="39" y="74" width="9" height="6" rx="1"/>' +
        '<rect x="52" y="74" width="9" height="6" rx="1"/>' +
        '<rect x="65" y="74" width="9" height="6" rx="1"/></g>';
    },

    /* A13a. Two children, the taller leading. The smaller one is set back and
       down, which is the whole reading of the sign: one of them is further
       from the kerb than the other and neither is looking. */
    children: function (ink) {
      return '<g fill="' + ink + '"><circle cx="42" cy="40" r="5"/><circle cx="60" cy="49" r="4.2"/></g>' +
        '<g stroke="' + ink + '" stroke-width="4" stroke-linecap="round" fill="none">' +
        '<path d="M42 46 V59"/><path d="M42 50 L34 56"/><path d="M42 50 L50 55"/>' +
        '<path d="M42 59 L36 73"/><path d="M42 59 L48 73"/></g>' +
        '<g stroke="' + ink + '" stroke-width="3.4" stroke-linecap="round" fill="none">' +
        '<path d="M60 54 V64"/><path d="M60 57 L54 62"/><path d="M60 57 L66 61"/>' +
        '<path d="M60 64 L56 74"/><path d="M60 64 L65 74"/></g>';
    },

    /* A7. A closed gate, which is what the barriered version of the sign
       shows: a post, two rails and the pickets between them. A single pole
       would be the UNbarriered crossing, a different sign. */
    crossing: function (ink) {
      return '<g stroke="' + ink + '" stroke-linecap="round" fill="none">' +
        '<path d="M34 78 V54" stroke-width="6"/>' +
        '<path d="M34 58 H66" stroke-width="5.5"/>' +
        '<path d="M34 71 H70" stroke-width="5"/>' +
        '<path d="M44 60 V69 M53 60 V69 M62 60 V69" stroke-width="3.6"/></g>';
    },

    /* A15b. A stag, standing, head up. Everything finer than this — a hoof, an
       ear, a fawn beside it — is gone by the time the sign is the size it is
       met at, and the antlers are the only part that has to survive. */
    animals: function (ink) {
      return '<g fill="' + ink + '">' +
        '<path d="M28 70 C30 62 40 61 48 62 C54 62 58 64 60 68 v6 H32 a4 4 0 0 1-4-4 Z"/>' +
        '<path d="M31 73 l-2 9 h4 l1 -9 Z"/>' +
        '<path d="M40 73 l2 9 h-4 l-2 -9 Z"/>' +
        '<path d="M50 73 l-1 9 h4 l1 -9 Z"/>' +
        '<path d="M57 73 l2 9 h-4 l-2 -9 Z"/>' +
        '<path d="M53 67 L58 53 l6 2 -4 14 Z"/>' +
        '<path d="M57 50 l10 3 -7 5 -4 -4 Z"/>' +
        '</g><g stroke="' + ink + '" stroke-width="2.8" stroke-linecap="round" fill="none">' +
        '<path d="M59 50 L54 41"/><path d="M56 45 L50 43"/>' +
        '<path d="M61 50 L66 42"/><path d="M64 46 L70 45"/></g>';
    },

    /* The roundabout, three arrows chasing each other ANTICLOCKWISE, which is
       the way traffic goes round one in France. Drawn once and rotated twice,
       so the three cannot drift apart. */
    roundabout: function (ink) {
      var arm = function (rot) {
        return '<g transform="rotate(' + rot + ' 50 60)">' +
          '<path d="M50 44 A16 16 0 0 0 34 60" fill="none" stroke="' + ink +
          '" stroke-width="6"/>' +
          '<path d="M28 57 H40 L34 69 Z" fill="' + ink + '"/></g>';
      };
      return arm(0) + arm(120) + arm(240);
    },

    /* A4. A car from behind with its tail stepping out, and the two trails it
       left doing it. Without the trails it is a picture of a car. */
    slippery: function (ink) {
      return '<g fill="' + ink + '">' +
        '<path d="M41 42 h18 a3 3 0 0 1 3 2 l4 10 h-32 l4 -10 a3 3 0 0 1 3 -2 Z"/>' +
        '<rect x="32" y="55" width="36" height="14" rx="4"/>' +
        '<rect x="34" y="68" width="7" height="4" rx="1.5"/><rect x="59" y="68" width="7" height="4" rx="1.5"/>' +
        '</g><g fill="none" stroke="' + ink + '" stroke-width="5" stroke-linecap="round">' +
        '<path d="M30 81 C38 76 26 73 34 68"/><path d="M62 81 C70 76 58 73 66 68"/></g>';
    },

    /* The one with the shovel: bent to the work, blade in the ground, and a
       mound beside it. A figure standing upright holding a stick is a figure
       holding a stick. */
    roadworks: function (ink) {
      return '<circle cx="42" cy="42" r="5" fill="' + ink + '"/>' +
        '<g stroke="' + ink + '" stroke-width="4.2" stroke-linecap="round" fill="none">' +
        '<path d="M42 48 L46 59"/><path d="M43 51 L56 57"/>' +
        '<path d="M46 59 L40 73"/><path d="M46 59 L53 72"/>' +
        '<path d="M54 56 L64 63" stroke-width="3.6"/></g>' +
        '<path d="M61 60 l9 6 -5 6 -8 -7 Z" fill="' + ink + '"/>' +
        '<path d="M28 78 q8 -8 16 0 Z" fill="' + ink + '"/>';
    },

    /* B1. The white bar of a "sens interdit". Drawn in the ground colour
       rather than the ink, because on that one sign the whole disc is red. */
    bar: function (ink) {
      return '<rect x="20" y="43" width="60" height="14" rx="1.5" fill="' + ink + '"/>';
    },

    /* B3. Two cars from behind, side by side, the overtaking one picked out in
       red — the only glyph carrying a colour of its own, because on the real
       sign it does. */
    overtake: function (ink) {
      var car = function (x, fill) {
        return '<g fill="' + fill + '" transform="translate(' + x + ' 0)">' +
          '<path d="M8 32 h16 a3 3 0 0 1 3 2 l4 9 h-30 l4 -9 a3 3 0 0 1 3 -2 Z"/>' +
          '<rect x="1" y="44" width="32" height="16" rx="4"/>' +
          '<rect x="3" y="59" width="7" height="5" rx="1.5"/><rect x="24" y="59" width="7" height="5" rx="1.5"/></g>';
      };
      return car(15, C.red) + car(51, ink);
    },

    arrowup:    function (ink) { return arrow(ink, 0); },
    arrowleft:  function (ink) { return arrow(ink, -90); },
    arrowright: function (ink) { return arrow(ink, 90); },

    bicycle: function (ink) {
      return '<g fill="none" stroke="' + ink + '" stroke-width="4">' +
        '<circle cx="33" cy="63" r="11"/><circle cx="67" cy="63" r="11"/>' +
        '<path d="M33 63 L45 45 h9 M45 45 L57 63 M57 63 h10 M43 63 h14" stroke-linecap="round"/></g>' +
        '<circle cx="59" cy="38" r="3.6" fill="' + ink + '"/>' +
        '<path d="M52 36 h13" stroke="' + ink + '" stroke-width="3.4" stroke-linecap="round"/>';
    },

    /* Dipped headlights: the lamp, and the beam falling away from it. The
       beams step DOWN as they go, which is what dipped means. */
    headlights: function (ink) {
      return '<path d="M28 38 h12 a17 17 0 0 1 0 24 H28 Z" fill="' + ink + '"/>' +
        '<g stroke="' + ink + '" stroke-width="4.5" stroke-linecap="round">' +
        '<path d="M62 42 h12"/><path d="M62 52 h14"/><path d="M62 62 h10"/></g>';
    },

    /* A parking disc, set to the arrival time a zone bleue asks for. */
    disc: function (ink) {
      return '<circle cx="50" cy="50" r="25" fill="none" stroke="' + ink + '" stroke-width="5"/>' +
        '<path d="M50 50 V33 M50 50 l12 7" stroke="' + ink + '" stroke-width="5" stroke-linecap="round"/>';
    },

    /* The autoroute pictogram: two carriageways running away into the
       distance, under a bridge. */
    motorway: function (ink) {
      return '<path d="M24 80 L41 34 h7 L36 80 Z" fill="' + ink + '"/>' +
        '<path d="M76 80 L59 34 h-7 l12 46 Z" fill="' + ink + '"/>' +
        '<rect x="32" y="24" width="36" height="7" rx="1" fill="' + ink + '"/>';
    },

    /* The red saltire of "arrêt et stationnement interdits": no waiting at
       all, where a single bar would only forbid leaving the car. */
    cross: function () {
      return '<g stroke="' + C.red + '" stroke-width="10" stroke-linecap="round">' +
        '<path d="M22 22 L78 78"/><path d="M78 22 L22 78"/></g>';
    },

    /* A car, for the medicine pictograms. Small and low, because the triangle
       has almost no room at the height a roof would want. */
    car: function (ink) {
      return '<path d="M39 58 h14 l6 8 h3 a4 4 0 0 1 4 4 v6 a2 2 0 0 1-2 2 H34 a2 2 0 0 1-2-2 v-6 a4 4 0 0 1 4-4 h3 Z"' +
        ' fill="' + ink + '"/>';
    }
  };

  function arrow(ink, rot) {
    return '<g transform="rotate(' + rot + ' 50 50)">' +
      '<rect x="44.5" y="46" width="11" height="26" fill="' + ink + '"/>' +
      '<path d="M50 22 L70 50 H30 Z" fill="' + ink + '"/></g>';
  }

  /* ── Drawing one sign ───────────────────────────────────────────────────
     THE CLIP IS THE POINT. Everything drawn inside a sign — the pictogram,
     the cancelling diagonal, the bars of an end-of-restriction disc — goes
     through the shape's safe region as a clip path. Detail therefore cannot
     touch the border, whatever a glyph does, and the promise holds for a
     glyph written next year by somebody who has not read this comment.

     It guarantees the overlap cannot happen. It does NOT guarantee the glyph
     fits: a pictogram drawn too big is silently cut instead. That is what the
     debug outline below is for, and why every glyph was rendered and looked
     at with the safe region showing before any of this shipped. */
  var uid = 0;

  function signSvg(item, opts) {
    var fam = FAMILIES[item.family] || FAMILIES.danger;
    var sh = SHAPES[fam.shape];
    var ground = (fam.tint && item.tint && C[item.tint]) ? C[item.tint] : fam.ground;
    var glyph = GLYPHS[item.glyph] || GLYPHS.blank;
    /* The bar of a "sens interdit" is white on red; everywhere else the ink is
       the family's. One conditional rather than a colour field per sign,
       because the rule belongs to the family, not to the item. */
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
    /* The cancelling diagonal, over the pictogram because that is where it
       belongs: it strikes out what the sign shows. It runs top-left to
       bottom-right, the way the regulation draws it. */
    if (item.bar) {
      inside += '<path d="M21 21 L79 79" stroke="' + C.red +
        '" stroke-width="10" stroke-linecap="round"/>';
    }
    /* An end-of-restriction disc carries no pictogram of its own: it repeats
       what it cancels and rules five bars through it. */
    if (item.family === 'fin') {
      inside += '<g stroke="' + C.black + '" stroke-width="3" stroke-linecap="round">' +
        '<path d="M20 62 L50 20"/><path d="M30 72 L60 30"/>' +
        '<path d="M40 79 L70 38"/><path d="M50 83 L78 46"/></g>';
    }

    var id = 'sfc' + (++uid);
    var debug = (opts && opts.debug)
      ? '<path d="' + sh.safe + '" fill="none" stroke="#00A3FF" stroke-width="1.2" stroke-dasharray="3 3"/>'
      : '';
    return '<svg class="sign-art" viewBox="' + sh.vb + '" role="img" aria-label="' +
      esc(item.label || '') + '">' +
      '<defs><clipPath id="' + id + '"><path d="' + sh.safe + '"/></clipPath></defs>' +
      body +
      '<g clip-path="url(#' + id + ')">' + inside + '</g>' +
      debug + '</svg>';
  }

  /* ── One row of them ────────────────────────────────────────────────────── */
  function html(fig, opts) {
    if (!fig || !fig.items || !fig.items.length) return '';
    var h = '<figure class="signs">';
    if (fig.title) h += '<figcaption class="signs-title">' + esc(fig.title) + '</figcaption>';
    h += '<div class="signs-row">' + fig.items.map(function (it) {
      return '<div class="sign">' + signSvg(it, opts) +
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
