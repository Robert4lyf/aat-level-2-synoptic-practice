/* Apply the saved CIPS theme before the learner shell paints. */
(function () {
  'use strict';
  try {
    var data = JSON.parse(localStorage.getItem('prep_v2_cips2') || '{}');
    var dark = data.settings && data.settings.darkMode;
    if (dark == null) dark = !!(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
    if (dark) document.documentElement.classList.add('cips-dark-bootstrap');
  } catch (e) {}
}());
