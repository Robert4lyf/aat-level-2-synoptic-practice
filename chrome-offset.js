/**
 * How tall the app chrome is, published as a CSS variable.
 *
 * THE BUG THIS EXISTS FOR. Every surface in this app puts a sticky bar of its
 * own beneath the sticky app header — the Level 1 and Level 3 context bars, the
 * lesson bar inside a lesson, the CIPS tab strip. Each one picked a number and
 * stuck at it, and every number was wrong:
 *
 *     the header measures 72.8px at 320px wide, 46px at 390px and 50px above
 *     that. It wraps. It is not one height, and no constant can be all three.
 *
 * So the Level 1 and Level 3 bars stuck at `top: 0` — directly underneath a
 * header that paints over them at z-index 50. Scrolled into a unit path, the
 * context bar's back button was not merely hard to see: elementFromPoint at its
 * centre returned the header, so the button could not be pressed at all. The
 * lesson bar lost its top 46px the same way, which on Level 3 is a 63px bar
 * reduced to a sliver, and the 3px progress rule under it disappeared outright.
 * CIPS picked 68px, then 62px on phones, against a bar that measures 70.6px, so
 * nine pixels of its tab strip sat behind the header at every scroll position.
 *
 * THE SHAPE OF THE FIX. One element per page carries `data-app-chrome`. Its
 * height is measured and written to `--chrome-h` on the root element, and every
 * sticky bar sticks at `var(--chrome-h)` rather than at a number somebody typed.
 * A bar that stacks under another bar adds that bar's own height to it — those
 * heights are content-driven but width-stable, and check-sticky-chrome.js
 * measures every one of them at four widths, so a stale offset fails a check
 * instead of shipping.
 *
 * WHY A VARIABLE AND NOT A LAYOUT. The obvious alternative is to make the
 * header and each bar one sticky group so the browser does the arithmetic.
 * That works where the two are siblings — CIPS's shell does exactly that with
 * its bar and tabs — but the AAT header lives outside `#app` and the bars are
 * rendered inside it by three modules that never see each other. A variable
 * crosses that seam; a wrapper cannot.
 */
(function (root) {
  'use strict';

  var doc = root.document;
  var el = null;
  var last = -1;

  function measure() {
    if (!el || !doc.documentElement) return;
    /* getBoundingClientRect, not offsetHeight: the header is 72.81px at the
       widths where it wraps, and a whole-pixel measurement cannot describe it.

       ROUNDED DOWN, and the direction matters. This used to round up, on the
       reasoning that rounding down would leave "a sliver of the bar beneath it
       showing through" — which is exactly backwards. The bars sit at z-index 5
       and 6; the chrome is opaque at z-index 50. Rounding DOWN tucks a bar a
       fraction of a pixel further under the chrome, where it cannot be seen.
       Rounding UP pushed it a fraction of a pixel further DOWN, and opened a
       gap between the two through which the scrolling page showed. Measured at
       320px and 360px, where the chrome is 72.81px tall: --chrome-h was
       published as 73 and every bar beneath it sat 0.19px too low.

       Rounding is not the whole fix — see the -1px in the rules that consume
       this. It is the half that stops the published number overshooting. */
    var h = Math.floor(el.getBoundingClientRect().height);
    if (h === last) return;
    last = h;
    doc.documentElement.style.setProperty('--chrome-h', h + 'px');
  }

  function init(target) {
    el = target || doc.querySelector('[data-app-chrome]');
    if (!el) return API;
    measure();
    /* The header changes height without the window changing size: the subject
       switcher renames it, a long subject title wraps the row, a font finishes
       loading. ResizeObserver catches all three; the resize listener is for the
       browsers that do not have it, where an orientation change is the case
       that actually matters. */
    if (typeof root.ResizeObserver === 'function') {
      new root.ResizeObserver(measure).observe(el);
    }
    root.addEventListener('resize', measure);
    if (doc.fonts && doc.fonts.ready && doc.fonts.ready.then) {
      doc.fonts.ready.then(measure).catch(function () {});
    }
    return API;
  }

  var API = {
    init: init,
    measure: measure,
    /* For the checks, which cannot ask a browser what this module believes. */
    _height: function () { return last; },
    _reset: function () { el = null; last = -1; }
  };

  root.AppChrome = API;
  if (typeof module === 'object' && module.exports) module.exports = API;

  /* Self-starting. Every page that loads this wants the same thing, and a page
     that has to remember to call init() is a page that will forget. */
  if (doc) {
    if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', function () { init(); });
    else init();
  }
})(typeof window !== 'undefined' ? window : (typeof globalThis !== 'undefined' ? globalThis : this));
