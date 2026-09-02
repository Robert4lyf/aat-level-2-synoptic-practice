/* CIPS page lifecycle helpers: offline registration and small shell invariants. */
(function () {
  'use strict';

  var STORE_KEY = 'prep_v2_cips2';
  var LESSON_TOTAL = 13;

  /* The renderer groups lessons by learning outcome, but the course itself is
     one ordered textbook path. Renumber the rendered rows 1..13 in the DOM so
     sighted and assistive-technology users receive the same sequence. Completed
     rows keep their check mark; their position is already fixed by DOM order.

     Only write when the value is actually wrong. This function runs from a
     MutationObserver that watches the same subtree; unconditionally assigning
     textContent here would create another child-list mutation and could make the
     observer trigger itself indefinitely. */
  function syncLessonSequence() {
    var rows = document.querySelectorAll('.c2-module [data-go="lesson"]');
    Array.prototype.forEach.call(rows, function (row, i) {
      var step = row.querySelector('.c2-step');
      var want = String(i + 1);
      if (step && !row.classList.contains('is-done') && step.textContent !== want) {
        step.textContent = want;
      }
    });
  }

  function allLessonsDone() {
    try {
      var data = JSON.parse(localStorage.getItem(STORE_KEY) || '{}');
      var lessons = data.lessons && typeof data.lessons === 'object' ? data.lessons : {};
      return Object.keys(lessons).filter(function (id) {
        return /^c2m1-\d+$/.test(id) && lessons[id] && lessons[id].done;
      }).length >= LESSON_TOTAL;
    } catch (e) { return false; }
  }

  /* cips2-page.js intentionally falls back to lesson 1 when there is no
     unfinished lesson. That is useful internally, but on the completed-course
     overview it made the primary CTA say "Continue learning" and unexpectedly
     reopen lesson 1. Present completion as review instead. The capture handler
     below redirects that one completed-state click to the existing Module tab,
     without changing the lesson player's normal event wiring. */
  function syncCompletedAction() {
    var button = document.querySelector('.c2-home .c2-hero-actions [data-go="lesson"]');
    if (!button || !allLessonsDone()) return;
    if (button.textContent !== 'Review L2M1 →') button.textContent = 'Review L2M1 →';
    button.setAttribute('data-c2-complete-review', 'true');
  }

  function syncShell() {
    syncLessonSequence();
    syncCompletedAction();
  }

  var host = document.getElementById('cipsApp');
  if (host && typeof MutationObserver !== 'undefined') {
    new MutationObserver(syncShell).observe(host, { childList: true, subtree: true });
    syncShell();
  }

  document.addEventListener('click', function (e) {
    var button = e.target && e.target.closest ? e.target.closest('[data-c2-complete-review="true"]') : null;
    if (!button) return;
    e.preventDefault();
    e.stopImmediatePropagation();
    var moduleTab = document.querySelector('[data-c2nav="module"]');
    if (moduleTab) moduleTab.click();
  }, true);

  if (!('serviceWorker' in navigator)) return;
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('sw.js').catch(function () { /* online study still works */ });
  });
}());
