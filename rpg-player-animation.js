/* Ledger Legends player animation — retired.
   This previously swapped a directional walk spritesheet and set
   `animation: none` on the player sprite (which relied on a corrupt embedded
   PNG, leaving the player invisible). Player and companion animation now live
   entirely in rpg-demo.css (the rpgHop keyframes) and rpg-demo.js. This file is
   kept as an intentional no-op so rpg-scroll-fix.js's injection and the service
   worker precache still resolve. */
(function () {
  'use strict';
}());
