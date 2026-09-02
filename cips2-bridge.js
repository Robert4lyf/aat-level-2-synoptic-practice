/* CIPS Level 2 — bridge into the existing subject picker.
 *
 * CIPS is intentionally a standalone learner surface for this first vertical
 * slice. app.js's registry is a large shared engine, so rather than make an
 * unrelated AAT change this bridge adds one visually identical subject card and
 * intercepts only that card before app.js sees it. The previous active subject
 * remains stored, so returning from CIPS brings the reader back where they were.
 */
(function () {
  'use strict';

  function inject() {
    if (document.querySelector('[data-switch-subject="cips2"]')) return;
    var grid = document.querySelector('.subject-cards');
    if (!grid) return;
    var sample = grid.querySelector('.subject-card');
    if (!sample) return;

    var card = sample.cloneNode(true);
    card.setAttribute('data-switch-subject', 'cips2');
    card.classList.remove('subject-active');
    card.style.setProperty('--card-subj', '#0b6b57');
    card.style.setProperty('--card-subj-light', 'rgba(11,107,87,.09)');
    var flag = card.querySelector('.sc-flag'); if (flag) flag.textContent = '📦';
    var name = card.querySelector('.sc-name'); if (name) name.textContent = 'CIPS Level 2';
    var desc = card.querySelector('.sc-desc'); if (desc) desc.textContent = 'Certificate in Procurement and Supply Operations';
    var meta = card.querySelector('.sc-meta'); if (meta) meta.textContent = 'L2M1 complete · 13 lessons · 48 practice questions';
    card.setAttribute('aria-label', 'Open CIPS Level 2 study');

    /* Keep professional qualifications together rather than tacking CIPS onto
       the end after language and hobby subjects. */
    var after = grid.querySelector('[data-switch-subject="aat3"]');
    if (after && after.parentNode === grid) after.insertAdjacentElement('afterend', card);
    else grid.appendChild(card);
  }

  /* Capture runs before app.js's delegated click handler. It is essential that
     the main app never tries to resolve cips2 through a registry that does not
     contain it. */
  document.addEventListener('click', function (e) {
    var target = e.target && e.target.closest ? e.target.closest('[data-switch-subject="cips2"]') : null;
    if (!target) return;
    e.preventDefault();
    e.stopImmediatePropagation();
    window.location.href = 'cips2.html';
  }, true);

  var observer = new MutationObserver(inject);
  observer.observe(document.documentElement, { childList: true, subtree: true });
  inject();
}());
