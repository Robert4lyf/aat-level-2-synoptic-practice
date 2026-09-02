/* Apply the saved CIPS theme before visible course content is parsed. */
(function () {
  'use strict';
  try {
    var data = JSON.parse(localStorage.getItem('prep_v2_cips2') || '{}');
    var dark = data.settings && data.settings.darkMode;
    if (dark == null) {
      dark = !!(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    if (dark && document.body) document.body.classList.add('dark');
  } catch (e) { /* malformed local progress must not block first paint */ }
}());
