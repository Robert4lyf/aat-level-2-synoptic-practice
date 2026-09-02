/* Keep direct visits to the CIPS page inside the same offline-capable app scope. */
(function () {
  'use strict';
  if (!('serviceWorker' in navigator)) return;
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('sw.js').catch(function () { /* online study still works */ });
  });
}());
