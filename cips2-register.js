/* CIPS page lifecycle: offline registration and the shared progress transport.
 *
 * This file used to do more, and what it did belonged elsewhere. It watched
 * #cipsApp with a MutationObserver and, on every repaint, renumbered the lesson
 * rows the renderer had just written and rewrote the label on the overview's
 * primary button; a capture-phase click listener then redirected that button
 * before the renderer's own handler could see it. Both were corrections to
 * cips2-page.js applied from outside cips2-page.js — a renderer that cannot
 * number its own rows or name its own button will be wrong again the next time
 * either changes, and the patch is not where anyone would look. Both now live
 * in the renderer (lessonStep, and the completed branch of the hero action),
 * which also retired the observer that had to be careful not to trigger itself.
 */
(function () {
  'use strict';

  /* CIPS stores progress under the same prep_v2_* convention as the existing
     self-rendering subjects. Initialising the shared transport here means a
     direct visit pulls progress written on another device instead of waiting
     until the learner happens to answer something locally. A remote merge can
     replace records cips2-page.js already read into memory, so refresh once in
     that case and let the normal page load rebuild from the merged store. */
  if (window.ProgressSync && typeof window.ProgressSync.init === 'function') {
    window.ProgressSync.init({
      onRemoteChange: function () { window.location.reload(); }
    });
  }

  if (!('serviceWorker' in navigator)) return;
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('sw.js').catch(function () { /* online study still works */ });
  });
}());
