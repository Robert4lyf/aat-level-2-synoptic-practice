/* ── Milestone celebrations, shared ───────────────────────────────────────────
   An endless run has no finish line, so the only landmarks it can offer are the
   ones the reader builds themselves. Fifty right in a row, and a hundred, are
   worth stopping for.

   WHAT IS SHARED AND WHAT IS NOT. This file owns the overlay, its layers, the
   counts, the timing and the tidying up — the parts that would be identical in
   three places and would rot in two of them. It owns nothing about how a
   celebration LOOKS: every visual rule lives in the level's own stylesheet,
   keyed by class, because "make each one unique for each level" is a
   requirement about appearance and appearance belongs where the level's design
   system is. A check can then compare the three stylesheets rather than taking
   the claim on trust.

   FOUR LAYERS, NOT ONE. The first version drew a scatter of pieces and a
   banner, and a reader called the result disappointing — rightly: eighteen
   shapes on a phone is a sprinkle, and every level could only ever make one
   kind of noise with it. There are now four things a stylesheet can move
   independently — a full-bleed FLASH, a set of shockwave WAVES, the PIECES,
   and the banner — plus, at a hundred, a class on <body> so the screen itself
   can move. Six celebrations built from four layers can differ in kind rather
   than only in colour.

   IT IS AN ANNOUNCEMENT, NOT ONLY A DECORATION. The banner carries the
   milestone in words and is given a live region, so a reader using a screen
   reader is told they have reached fifty rather than being shown a shower of
   shapes they cannot see. Under prefers-reduced-motion every moving layer is
   dropped and the banner alone is shown: the information survives, the motion
   does not, and the screen never shakes. */
(function (root) {
  'use strict';

  /* How long the overlay lives. Long enough to land, short enough that it never
     becomes something to wait out — the run continues underneath and the reader
     can answer straight through it. A hundred is held longer than fifty,
     because a bigger event that ends at the same moment reads as the same
     event.

     LIFE_MS IS THE FLOOR AND THE FALLBACK, not the whole answer: a milestone
     with no entry in LIFE uses it rather than vanishing instantly. */
  var LIFE_MS = 2600;
  var LIFE = { 50: 3200, 100: 4400 };

  /* Pieces per milestone. These were 18 and 34, which is a scatter rather than
     an event. A hundred still earns more than fifty does, everywhere. */
  var PIECES = { 50: 46, 100: 96 };

  /* Shockwave rings — a layer of their own because they do a different job from
     the pieces. The pieces are the confetti; the rings are the bang. */
  var WAVES = { 50: 3, 100: 5 };

  /* ── THE CHICKEN ────────────────────────────────────────────────────────────
     Fifty in a row gets a chicken doing a happy dance. It is drawn rather than
     dropped in as an emoji because a happy dance needs parts that move
     independently — the wings flap at twice the rate of the hop, the legs
     alternate, the head bobs against the body's squash — and an emoji is one
     glyph that can only be scaled and spun.

     THE MARKUP IS HERE AND THE DANCE IS NOT, which is the same split every
     other layer keeps: this file owns what exists, the stylesheet owns what it
     looks like and how it moves. Every part carries a class so the dance can
     reach it.

     FIFTY ONLY. A hundred has the bigger event already and a chicken at both
     would make them the same celebration twice; it is also the reason a reader
     who reaches a hundred sees something they have not seen before. */
  var CHICKEN_AT = 50;
  var CHICKEN_SVG =
    '<svg viewBox="0 0 120 120" width="100%" height="100%" aria-hidden="true" focusable="false">' +
      '<g class="aat-cel-chk">' +
        '<g class="aat-cel-chk-legs">' +
          '<path class="aat-cel-chk-leg aat-cel-chk-leg-a" d="M50 92 v13 M43 107 h13"/>' +
          '<path class="aat-cel-chk-leg aat-cel-chk-leg-b" d="M69 92 v13 M62 107 h13"/>' +
        '</g>' +
        '<g class="aat-cel-chk-body">' +
          /* THREE SWEPT FEATHERS, not the jagged wedge this started as. */
          '<path class="aat-cel-chk-tail" d="M33 60 C15 57 5 44 2 28 C13 37 23 43 31 47 ' +
            'C24 34 23 23 27 13 C33 28 37 41 39 52 Z"/>' +
          '<ellipse class="aat-cel-chk-belly" cx="58" cy="70" rx="31" ry="26"/>' +
          '<g class="aat-cel-chk-wing"><ellipse cx="55" cy="68" rx="17" ry="12"/></g>' +
          '<g class="aat-cel-chk-head">' +
            /* ABOVE THE SKULL, WHICH IT WAS NOT. The first version sat between
               y=27 and y=33 while the skull's top edge is y=27, so the head
               drew straight over it and the bird came out combless — which
               reads as a chick rather than a hen. It is still drawn BEFORE the
               skull, so the base is hidden and the lobes sit on top. */
            '<path class="aat-cel-chk-comb" d="M72 32 C73 17 82 13 83 27 ' +
              'C85 14 93 12 94 26 C97 18 102 21 100 31 Z"/>' +
            '<circle class="aat-cel-chk-skull" cx="84" cy="43" r="16"/>' +
            '<path class="aat-cel-chk-beak" d="M99 41 l16 6 l-16 6 z"/>' +
            '<path class="aat-cel-chk-wattle" d="M96 54 a6 7 0 1 1 -9 5 z"/>' +
            '<circle class="aat-cel-chk-eye" cx="88" cy="39" r="2.8"/>' +
          '</g>' +
        '</g>' +
      '</g>' +
    '</svg>';

  /* THE SCREEN ITSELF MOVES AT A HUNDRED. The class goes on <body> rather than
     on the overlay, because the overlay is what the reader is looking THROUGH:
     shaking it moves nothing they can see. It is taken off again by clear(),
     and is never applied when the reader has asked for reduced motion. */
  var QUAKE = 'aat-cel-quake';

  function calm() {
    try {
      return !!(root.matchMedia && root.matchMedia('(prefers-reduced-motion: reduce)').matches);
    } catch (e) { return false; }
  }

  /* One place knows the class name, and one place can leave it behind.
     `classList` is guarded because this file is driven headless against a DOM
     stub, and a celebration that threw there would take the whole run with
     it. */
  function quake(on) {
    var b = typeof document !== 'undefined' && document.body;
    if (!b || !b.classList) return;
    try { if (on) b.classList.add(QUAKE); else b.classList.remove(QUAKE); } catch (e) {}
  }

  var _open = null;
  function clear() {
    if (!_open) return;
    if (_open.el && _open.el.parentNode) _open.el.parentNode.removeChild(_open.el);
    if (_open.timer) clearTimeout(_open.timer);
    quake(false);
    _open = null;
  }

  /* theme: 'a1' | 'aat' | 'a3'   milestone: 50 | 100 */
  function fire(theme, milestone, label) {
    if (typeof document === 'undefined' || !document.createElement) return null;
    /* ONE AT A TIME. A reader cannot reach fifty and a hundred in the same
       breath, but a repaint that fired twice would stack two overlays and leave
       one of them behind when the other tidied up. */
    clear();

    var wrap = document.createElement('div');
    wrap.className = 'aat-cel aat-cel-' + theme + ' aat-cel-' + milestone;
    wrap.setAttribute('data-cel', theme + '-' + milestone);

    var quiet = calm();
    if (!quiet) {
      var frag = document.createDocumentFragment();

      /* THE FLASH IS APPENDED FIRST so it sits at the back of the stack. One
         element, full-bleed: the bloom of light that makes everything after it
         read as an explosion rather than as shapes arriving. */
      var flash = document.createElement('span');
      flash.className = 'aat-cel-flash';
      frag.appendChild(flash);

      var waves = WAVES[milestone] || 0, wi;
      for (wi = 0; wi < waves; wi++) {
        var w = document.createElement('span');
        w.className = 'aat-cel-w';
        w.style.setProperty('--i', String(wi));
        w.style.setProperty('--n', String(waves));
        frag.appendChild(w);
      }

      var n = PIECES[milestone] || 18;
      for (var i = 0; i < n; i++) {
        var p = document.createElement('span');
        p.className = 'aat-cel-p';
        /* Each piece carries its own index and a spread, so a stylesheet can
           fan them out without this file knowing which direction is up in that
           level's design. `--s` is a SECOND, independent roll: with one random
           per piece, size and distance move together and the fan comes out
           visibly banded. */
        p.style.setProperty('--i', String(i));
        p.style.setProperty('--n', String(n));
        p.style.setProperty('--r', String(Math.round(Math.random() * 100)));
        p.style.setProperty('--s', String(Math.round(Math.random() * 100)));
        frag.appendChild(p);
      }
      /* AFTER THE PIECES, so the bird dances in front of the confetti rather
         than behind it. `aria-hidden` on the <svg> itself: the banner already
         announces the milestone, and "chicken" is not information a reader
         using a screen reader needs read out over it. */
      if (milestone === CHICKEN_AT) {
        var chick = document.createElement('span');
        chick.className = 'aat-cel-chicken';
        chick.setAttribute('aria-hidden', 'true');
        chick.innerHTML = CHICKEN_SVG;
        frag.appendChild(chick);
      }

      wrap.appendChild(frag);
    }

    var banner = document.createElement('div');
    banner.className = 'aat-cel-t';
    banner.setAttribute('role', 'status');
    banner.setAttribute('aria-live', 'polite');
    banner.textContent = label || (milestone + ' in a row');
    wrap.appendChild(banner);

    document.body.appendChild(wrap);
    if (!quiet && milestone === 100) quake(true);
    _open = { el: wrap, timer: setTimeout(clear, LIFE[milestone] || LIFE_MS) };
    return wrap;
  }

  root.AATCelebrate = {
    fire: fire,
    clear: clear,
    LIFE_MS: LIFE_MS,
    LIFE: LIFE,
    PIECES: PIECES,
    WAVES: WAVES,
    CHICKEN_AT: CHICKEN_AT,
    QUAKE: QUAKE,
    /* The milestones themselves, so the three levels cannot disagree about
       which streaks are worth marking. */
    AT: [50, 100],
  };
})(typeof window !== 'undefined' ? window : (typeof globalThis !== 'undefined' ? globalThis : this));
