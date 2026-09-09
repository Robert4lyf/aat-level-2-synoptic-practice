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
    QUAKE: QUAKE,
    /* The milestones themselves, so the three levels cannot disagree about
       which streaks are worth marking. */
    AT: [50, 100],
  };
})(typeof window !== 'undefined' ? window : (typeof globalThis !== 'undefined' ? globalThis : this));
