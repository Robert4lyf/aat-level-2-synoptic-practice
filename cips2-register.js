/* CIPS page lifecycle helpers: offline registration and stable lesson sequence. */
(function () {
  'use strict';

  /* The renderer groups lessons by learning outcome, but the course itself is
     one ordered textbook path. Renumber the rendered rows 1..13 in the DOM so
     sighted and assistive-technology users receive the same sequence. Completed
     rows keep their check mark; their position is already fixed by DOM order. */
  function syncLessonSequence() {
    var rows = document.querySelectorAll('.c2-module [data-go="lesson"]');
    Array.prototype.forEach.call(rows, function (row, i) {
      var step = row.querySelector('.c2-step');
      if (step && !row.classList.contains('is-done')) step.textContent = String(i + 1);
    });
  }
  var host = document.getElementById('cipsApp');
  if (host && typeof MutationObserver !== 'undefined') {
    new MutationObserver(syncLessonSequence).observe(host, { childList: true, subtree: true });
    syncLessonSequence();
  }

  if (!('serviceWorker' in navigator)) return;
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('sw.js').catch(function () { /* online study still works */ });
  });
}());
