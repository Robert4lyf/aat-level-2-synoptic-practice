/**
 * The platform back button, wired to the app's own idea of "back".
 *
 * THE BUG THIS EXISTS FOR. The app never created a history entry. Every
 * in-app back — leaving a lesson, exiting a practice run, closing a cheat
 * sheet — is a JavaScript state change, so as far as the browser was
 * concerned the whole app was one entry deep. Pressing Android's back button
 * did not step back through the app; it popped that single entry and left.
 * Installed as a standalone PWA there is nowhere to leave TO, so the reader
 * got a blank document painted in the theme colour — a black screen with no
 * way out but a reload, several screens deep into a lesson.
 *
 * THE SHAPE OF THE FIX. One sentinel entry, pushed whenever the app is deeper
 * than its own root and consumed when the reader presses back:
 *
 *     at root      history: [ base ]              back leaves the app
 *     deeper       history: [ base, sentinel ]    back steps in-app
 *
 * On a pop the sentinel has already gone, so the app takes one step back and
 * pushes a fresh one if it is still deeper than root. That makes the entry
 * count independent of how deep the reader actually is: four levels down the
 * history is still two entries, and four presses walk out one screen at a
 * time. The alternative — one entry per screen — has to be kept in step with
 * every state change in five modules, and the first one that forgets leaves
 * the reader pressing back at a screen that will not move.
 *
 * WHAT BACK MEANS is not decided here. Each surface already has a back
 * button and the rules behind it — a timed mock guards its exit, an endless
 * run finishes rather than discarding itself — so this asks the surface to
 * do whatever its own button does. A platform gesture that did something
 * different from the button beside it would be a second, invisible set of
 * rules.
 */
(function (root) {
  'use strict';

  var TAG = 'aat-nav';

  var _canGoBack = null;   // () -> boolean: is the app deeper than its root?
  var _back = null;        // () -> void: take one step back
  var _armed = false;      // the popstate listener is attached
  var _pushed = false;     // a sentinel is currently on the stack
  /* Set while we ask the browser to drop a sentinel we no longer need, so the
     popstate it fires is recognised as our own doing and not as the reader
     pressing back. Without it, tapping the in-app Home button would consume
     the sentinel AND run the back action, taking the reader one screen
     further than they asked to go. */
  var _consuming = false;

  function history_() {
    return (root && root.history) || null;
  }

  function init(opts) {
    _canGoBack = opts && opts.canGoBack;
    _back = opts && opts.back;
    if (_armed) return API;
    var h = history_();
    if (!h || !root.addEventListener) return API;
    _armed = true;
    /* Stamp the entry the app started on. Nothing reads it back yet; it is
       here so that a future change can tell an entry this app created from
       one it was launched into. */
    try { h.replaceState({ tag: TAG, sentinel: false }, ''); } catch (e) { /* opaque origin */ }
    root.addEventListener('popstate', onPop);
    return API;
  }

  function onPop() {
    if (_consuming) { _consuming = false; return; }
    /* The entry that was popped IS the sentinel — the browser has already
       removed it, so nothing here needs to. */
    _pushed = false;
    if (!_canGoBack || !_canGoBack()) return;   // at root: let the pop stand
    if (_back) _back();
    /* No sync() call here. Every back action ends in a repaint, and sync()
       runs at the end of every repaint — so pushing a fresh sentinel here as
       well would put two on the stack for one press, and the reader would
       have to press back twice for the next step. */
  }

  /* Called at the end of every repaint, on every surface. Cheap by design:
     it compares one boolean against one boolean and almost always does
     nothing. */
  function sync() {
    if (!_armed) return;
    var h = history_();
    if (!h) return;
    var deep = !!(_canGoBack && _canGoBack());
    if (deep === _pushed) return;
    if (deep) {
      _pushed = true;
      try { h.pushState({ tag: TAG, sentinel: true }, ''); } catch (e) { _pushed = false; }
    } else {
      /* Back at root by some other route — the Home button, finishing a run.
         The sentinel is stale: left there, the reader's next back press would
         be swallowed doing nothing visible. */
      _pushed = false;
      _consuming = true;
      try { h.back(); } catch (e) { _consuming = false; }
    }
  }

  var API = { init: init, sync: sync,
    /* For the checks: the state a browser cannot be asked about directly. */
    _state: function () { return { armed: _armed, pushed: _pushed, consuming: _consuming }; },
    _reset: function () { _armed = false; _pushed = false; _consuming = false; _canGoBack = null; _back = null; } };

  root.AATNav = API;
  if (typeof module === 'object' && module.exports) module.exports = API;
})(typeof window !== 'undefined' ? window : (typeof globalThis !== 'undefined' ? globalThis : this));
