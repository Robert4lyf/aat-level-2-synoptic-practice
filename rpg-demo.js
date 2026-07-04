/* Ledger Legends — RPG-style AAT battle demo.
   Drop-in enhancement. Requires data.js to expose window.ALL_QUESTIONS. */
(function () {
  'use strict';

  var KEY = 'aatRpgDemo_v2';
  var OLD_KEY = 'aatRpgDemo_v1';
  var LEN = 5;
  var STARTERS = {
    cub: { id: 'cub', name: 'Audit Cub', icon: '🐣', type: 'Control', move1: 'Ledger Swipe', move2: 'Audit Burst', evo: 'Trial Balance Lynx' },
    fox: { id: 'fox', name: 'Journal Fox', icon: '🦊', type: 'Bookkeeping', move1: 'Debit Dash', move2: 'Credit Claw', evo: 'Nominal Fox' },
    mole: { id: 'mole', name: 'Costing Mole', icon: '🦡', type: 'Costing', move1: 'Prime Cost Pounce', move2: 'OAR Quake', evo: 'Factory Badger' }
  };
  var BOSSES = [
    { id: 'itbk', icon: '🐉', name: 'Ledger Drake', region: 'Ledger Forest', badge: 'Ledger Badge', type: 'Bookkeeping', wild: 'Source Slime', scene: 'forest', desc: 'Debits, credits, source documents and ledger basics.' },
    { id: 'pobc', icon: '🪨', name: 'Reconciliation Golem', region: 'Control Cavern', badge: 'Control Badge', type: 'Control', wild: 'Suspense Bat', scene: 'cave', desc: 'Control accounts, journals, errors and reconciliations.' },
    { id: 'poc', icon: '🧪', name: 'Costing Chimera', region: 'Costing Factory', badge: 'Costing Badge', type: 'Costing', wild: 'Overhead Imp', scene: 'factory', desc: 'Cost behaviour, inventory, OAR and costing systems.' },
    { id: 'besy', icon: '🦅', name: 'Enterprise Griffin', region: 'Enterprise Town', badge: 'Enterprise Badge', type: 'Business', wild: 'Contract Sprite', scene: 'town', desc: 'Business structures, law, contracts and stakeholders.' }
  ];

  var MAP_W = 25;
  var MAP_H = 19;
  var START_POS = { x: 12, y: 9 };
  var MAP_NODES = {
    itbk: { x: 4, y: 2, kind: 'forest-gate', short: 'Forest' },
    pobc: { x: 20, y: 2, kind: 'cave-gate', short: 'Cavern' },
    poc: { x: 4, y: 16, kind: 'factory-door', short: 'Factory' },
    besy: { x: 20, y: 16, kind: 'town-door', short: 'Town' }
  };

  // Townsfolk NPCs. Each stands just off a road so you approach and talk from an
  // adjacent tile (their own tile blocks movement, like a person standing there).
  // `mon` selects the pixel sprite (rpg-assets/npc-*.png); `lines` is the dialogue.
  var NPCS = {
    quill: {
      x: 10, y: 8, mon: 'npc-quill', tag: 'Guide', name: 'Professor Quill',
      role: 'Head Tutor of Ledger Town',
      lines: [
        'Welcome to Ledger Town, trainee! I am Professor Quill.',
        'Four topic bosses guard the badges you need for the Synoptic League — one at each corner of the map.',
        'Walk the paths with the D-pad or arrow keys. When a landmark, gate or townsperson is beside you, press Interact.',
        'Talk to the folk near each region first — they teach the tricks that win battles. Off you go!'
      ]
    },
    scribe: {
      x: 6, y: 4, mon: 'npc-scribe', tag: 'Bookkeeper', name: 'Fern the Scribe',
      role: 'Keeper of the Ledger Forest',
      lines: [
        'Heading into the Ledger Forest? Mind the Ledger Drake — it quizzes debits and credits.',
        'Remember DEAD CLIC: Debits grow Expenses, Assets and Drawings; Credits grow Liabilities, Income and Capital.',
        'Every transaction hits two accounts, and total debits must always equal total credits.',
        'Source documents come first: invoices, credit notes, remittances. Record them, then post to the ledger. Good luck!'
      ]
    },
    warden: {
      x: 18, y: 4, mon: 'npc-warden', tag: 'Reconciler', name: 'Vex the Warden',
      role: 'Guardian of the Control Cavern',
      lines: [
        'The Control Cavern is dark with errors and suspense accounts. The Reconciliation Golem waits within.',
        'A control account is a summary — the sales ledger control account should equal the total of the individual customer balances.',
        'When it does not balance, a suspense account holds the difference until you find the error.',
        'Errors of omission, commission, principle and reversal will not show in a trial balance — hunt them carefully!'
      ]
    },
    clerk: {
      x: 6, y: 14, mon: 'npc-clerk', tag: 'Cost Clerk', name: 'Cog the Clerk',
      role: 'Foreman of the Costing Factory',
      lines: [
        'The Costing Factory runs hot! The Costing Chimera tests how costs behave.',
        'Prime cost = direct materials + direct labour + direct expenses. Add overheads and you have total cost.',
        'Fixed costs stay put as output changes; variable costs rise with each unit made.',
        'The overhead absorption rate (OAR) spreads overheads over units — budgeted overhead divided by budgeted activity. Stay sharp!'
      ]
    },
    mayor: {
      x: 18, y: 14, mon: 'npc-mayor', tag: 'Mayor', name: 'Mayor Sterling',
      role: 'Head of Enterprise Town',
      lines: [
        'Welcome to Enterprise Town! The Enterprise Griffin guards knowledge of business and ethics.',
        'Know your structures: sole traders and partnerships have unlimited liability; companies are separate legal persons.',
        'A contract needs offer, acceptance, consideration and intention to create legal relations.',
        'And always act with integrity, objectivity and confidentiality — the AAT ethical principles. Trade fair!'
      ]
    },
    penny: {
      x: 16, y: 10, mon: 'npc-merchant', tag: 'Trader', name: 'Penny the Trader',
      role: 'Travelling Potion Merchant',
      gift: 'potion',
      lines: [
        'Psst — Penny the Trader, at your service. Long road ahead, eh?',
        'Battles heal you when you answer correctly, but a Potion tops you up in a pinch.',
        'Here, take one on the house. Come back stronger and clear those badges!'
      ]
    }
  };

  function posKey(x, y) { return x + ',' + y; }
  function isRoad(x, y) {
    if (y === 9 && x >= 1 && x <= 23) return true;   // central east-west high street
    if (x === 12 && y >= 1 && y <= 17) return true;  // central north-south avenue
    if (y === 3 && x >= 4 && x <= 20) return true;    // northern ring (forest ↔ cavern)
    if (y === 15 && x >= 4 && x <= 20) return true;   // southern ring (factory ↔ town)
    if (x === 4 && y >= 3 && y <= 15) return true;    // western ring (forest ↔ factory)
    if (x === 20 && y >= 3 && y <= 15) return true;   // eastern ring (cavern ↔ town)
    return false;
  }
  function buildBlocked() {
    var out = {}, x, y;
    for (x = 0; x < MAP_W; x++) { out[posKey(x, 0)] = 1; out[posKey(x, MAP_H - 1)] = 1; }
    for (y = 0; y < MAP_H; y++) { out[posKey(0, y)] = 1; out[posKey(MAP_W - 1, y)] = 1; }
    return out;
  }
  function setDecor(out, x, y, t) {
    if (x < 0 || y < 0 || x >= MAP_W || y >= MAP_H) return;
    if (isRoad(x, y)) return;
    if (bossAt(x, y)) return;
    if (npcAt(x, y)) return;
    out[posKey(x, y)] = t;
  }
  function buildDecor() {
    var out = {}, x, y;
    // Leafy inner border framing the whole town.
    for (x = 1; x < MAP_W - 1; x++) {
      if (x % 2 === 0) setDecor(out, x, 1, 'tree');
      if (x % 3 === 0) setDecor(out, x, MAP_H - 2, 'tree');
    }
    for (y = 2; y < MAP_H - 2; y++) {
      if (y % 2 === 0) setDecor(out, 1, y, 'tree');
      if (y % 3 === 1) setDecor(out, MAP_W - 2, y, 'rock');
    }
    [
      // North-west — Ledger Forest quarter.
      [2,2,'tree'], [6,2,'tree'], [8,2,'flower'], [2,4,'flower'], [3,5,'ledger-stone'],
      [7,5,'book'], [2,6,'tree'], [8,4,'sign'], [9,6,'flower'], [3,7,'flower'], [7,7,'tree'],
      // North-east — Control Cavern quarter.
      [22,2,'rock'], [18,2,'rock'], [16,2,'tree'], [22,4,'rock'], [21,5,'pathlamp'],
      [17,5,'well'], [15,5,'book'], [22,6,'rock'], [16,6,'flower'], [21,7,'rock'],
      // South-west — Costing Factory quarter.
      [2,16,'factory-wall'], [3,16,'factory-wall'], [2,14,'factory-wall'], [6,16,'factory-wall'],
      [8,16,'sign'], [3,13,'book'], [7,13,'rock'], [2,12,'factory-wall'], [8,13,'ledger-stone'],
      // South-east — Enterprise Town quarter.
      [22,16,'house'], [18,16,'house'], [15,16,'house'], [22,14,'market'], [16,16,'well'],
      [17,13,'flower'], [21,13,'pathlamp'], [22,12,'house'], [16,13,'book'],
      // Town green around the central crossroads.
      [8,6,'pathlamp'], [10,6,'ledger-stone'], [14,6,'well'], [16,7,'flower'], [11,4,'sign'],
      [8,10,'book'], [8,12,'flower'], [10,12,'flower'], [14,12,'book'], [16,12,'pathlamp'],
      [13,14,'sign'], [14,10,'flower'], [10,10,'well']
    ].forEach(function (d) { setDecor(out, d[0], d[1], d[2]); });
    return out;
  }
  function npcAt(x, y) { for (var k in NPCS) { if (NPCS.hasOwnProperty(k)) { var n = NPCS[k]; if (n.x === x && n.y === y) return { id: k, x: n.x, y: n.y, mon: n.mon, tag: n.tag, name: n.name }; } } return null; }
  var BLOCKED = buildBlocked();
  var DECOR = buildDecor();

  var st = null;
  var dlg = null;
  var runtimeData = null;

  function esc(x) { return String(x == null ? '' : x).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function migrate() { var old = null; try { old = JSON.parse(localStorage.getItem(OLD_KEY) || 'null'); } catch (e) {} return old || {}; }
  function load() {
    if (runtimeData) return normalise(runtimeData);
    try {
      var d = JSON.parse(localStorage.getItem(KEY) || 'null');
      if (d) { runtimeData = normalise(d); return runtimeData; }
    } catch (e) {}
    runtimeData = normalise(migrate());
    return runtimeData;
  }
  function save(d) { runtimeData = normalise(d); try { localStorage.setItem(KEY, JSON.stringify(runtimeData)); } catch (e) {} }
  function normalise(d) { d = d || {}; d.xp = d.xp || 0; d.wins = d.wins || {}; d.badges = d.badges || {}; d.starter = d.starter || ''; d.routes = d.routes || {}; d.inventory = d.inventory || { potion: 1 }; d.gifts = d.gifts || {}; d.metNpcs = d.metNpcs || {}; d.pos = d.pos || { x: START_POS.x, y: START_POS.y }; if (typeof d.pos.x !== 'number' || typeof d.pos.y !== 'number') d.pos = { x: START_POS.x, y: START_POS.y }; d.pos.x = Math.max(0, Math.min(MAP_W - 1, d.pos.x)); d.pos.y = Math.max(0, Math.min(MAP_H - 1, d.pos.y)); d.dir = ['up', 'down', 'left', 'right'].indexOf(d.dir) >= 0 ? d.dir : 'down'; if (!d.companionPos || typeof d.companionPos.x !== 'number' || typeof d.companionPos.y !== 'number') d.companionPos = { x: d.pos.x, y: d.pos.y }; d.companionPos.x = Math.max(0, Math.min(MAP_W - 1, d.companionPos.x)); d.companionPos.y = Math.max(0, Math.min(MAP_H - 1, d.companionPos.y)); return d; }
  function lvl(xp) { return Math.max(1, Math.floor(Math.sqrt((xp || 0) / 30)) + 1); }
  function starter(d) { return STARTERS[d.starter] || null; }
  function boss(id) { return BOSSES.filter(function (b) { return b.id === id; })[0] || BOSSES[0]; }
  function qs(id) { return (window.ALL_QUESTIONS || []).filter(function (q) { return q.topic === id && Array.isArray(q.opts) && q.opts.length >= 4 && typeof q.ans === 'number'; }); }
  function present(q) { var ord = shuffle(q.opts.map(function (_, i) { return i; })); return { q: q.q, topic: q.topic, opts: ord.map(function (i) { return q.opts[i]; }), ans: ord.indexOf(q.ans), exp: q.exp || '' }; }

  function inject() {
    if ((document.body.getAttribute('data-subject') || 'aat') !== 'aat') return;
    var grid = document.querySelector('.mode-card-grid');
    if (!grid || document.getElementById('rpgDemoBtn')) return;
    var b = document.createElement('button');
    b.id = 'rpgDemoBtn'; b.type = 'button'; b.className = 'mode-card mode-rpg';
    b.innerHTML = '<span class="mode-card-icon" aria-hidden="true">🗺️</span><div class="mode-card-info"><div class="mode-card-title">Ledger Legends</div><div class="mode-card-desc">Mini RPG quest · bosses, moves, XP and badges</div></div>';
    b.onclick = function () { landing(); }; grid.insertBefore(b, grid.firstChild);
  }
  function mount(html) {
    var old = document.getElementById('rpgOverlay'); if (old) old.remove();
    var el = document.createElement('div');
    el.id = 'rpgOverlay';
    el.className = 'rpg-overlay';
    el.innerHTML = html;
    document.body.appendChild(el);
    el.onclick = function (ev) {
      var x = ev.target.closest('button');
      if (!x || !el.contains(x)) return;
      if (x.hasAttribute('data-close')) return close();
      if (x.hasAttribute('data-starter')) return chooseStarter(x.getAttribute('data-starter'));
      if (x.hasAttribute('data-opt')) return answer(+x.getAttribute('data-opt'), x.getAttribute('data-move'));
      if (x.hasAttribute('data-region')) return tryRegion(x.getAttribute('data-region'));
      if (x.hasAttribute('data-node')) return tryRegion(x.getAttribute('data-node'));
      if (x.hasAttribute('data-npc')) return tryTalk(x.getAttribute('data-npc'));
      if (x.hasAttribute('data-talk-next')) return dlgNext();
      if (x.hasAttribute('data-dir')) return movePlayer(x.getAttribute('data-dir'));
      if (x.hasAttribute('data-interact')) return interact();
      if (x.hasAttribute('data-reset-pos')) return resetPosition();
      if (x.hasAttribute('data-boss')) return start(x.getAttribute('data-boss'));
      if (x.hasAttribute('data-next')) return next();
      if (x.hasAttribute('data-landing')) return landing();
      if (x.hasAttribute('data-retry')) return start(x.getAttribute('data-retry'));
      if (x.hasAttribute('data-potion')) return usePotion();
    };
  }
  function close() { var el = document.getElementById('rpgOverlay'); if (el) el.remove(); }

  function chooseStarter(id) {
    if (!STARTERS[id]) return;
    var d = load();
    d.starter = id;
    if (!d.xp) d.xp = 10;
    d.inventory = d.inventory || { potion: 1 };
    save(d);
    landing(d);
  }
  function starterScreen(d) {
    var cards = Object.keys(STARTERS).map(function (k) { var c = STARTERS[k]; return '<button class="rpg-starter-card" data-starter="' + k + '" type="button"><span class="rpg-starter-icon" data-mon="' + k + '"></span><strong>' + esc(c.name) + '</strong><small>' + esc(c.type) + ' type</small><em>' + esc(c.move1) + '</em></button>'; }).join('');
    mount('<section class="rpg-panel rpg-start" role="dialog" aria-modal="true"><button class="rpg-close" data-close type="button">×</button><h2>Choose your study companion</h2><p>This makes the mode feel more like an RPG. The companion levels up, learns stronger attacks, and earns badges by defeating topic bosses.</p><div class="rpg-starter-grid">' + cards + '</div></section>');
  }

  function nodeDistance(pos, id) { var n = MAP_NODES[id]; return Math.abs(pos.x - n.x) + Math.abs(pos.y - n.y); }
  function nearestRegion(d) { var best = null; BOSSES.forEach(function (b) { var dist = nodeDistance(d.pos, b.id); if (!best || dist < best.dist) best = { boss: b, dist: dist }; }); return best; }
  function canEnter(d, id) { return nodeDistance(d.pos, id) <= 1; }
  function bossAt(x, y) { for (var i = 0; i < BOSSES.length; i++) { var b = BOSSES[i], n = MAP_NODES[b.id]; if (n.x === x && n.y === y) return b; } return null; }
  function tileType(x, y) {
    var key = posKey(x, y);
    if (bossAt(x, y)) return 'region';
    if (npcAt(x, y)) return 'npc';
    if (DECOR[key]) return DECOR[key];
    if (BLOCKED[key]) return 'tree';
    if (isRoad(x, y)) return 'path';
    return 'grass';
  }
  function passable(x, y) {
    if (x < 0 || y < 0 || x >= MAP_W || y >= MAP_H) return false;
    var t = tileType(x, y);
    return ['path', 'grass', 'flower', 'book', 'sign', 'well', 'pathlamp', 'ledger-stone', 'region'].indexOf(t) >= 0;
  }
  function adjacentNpc(d) { var best = null; for (var k in NPCS) { if (!NPCS.hasOwnProperty(k)) continue; var n = NPCS[k]; var dist = Math.abs(d.pos.x - n.x) + Math.abs(d.pos.y - n.y); if (dist <= 1 && (!best || dist < best.dist)) best = { id: k, dist: dist }; } return best; }
  var TILE_VARIANTS = { grass: [1, 2, 3], flower: [1, 2], path: [1, 2], tree: [1, 2, 1, 2, 3, 1], house: [1, 2], market: [2, 1], rock: [1, 2] };
  function tileVariant(t, x, y) { var v = TILE_VARIANTS[t]; return v ? ' rpg-v' + v[(x * 31 + y * 17) % v.length] : ''; }
  function tileHtml(x, y, d, c) {
    var here = d.pos.x === x && d.pos.y === y;
    var compHere = d.companionPos && d.companionPos.x === x && d.companionPos.y === y;
    var b = bossAt(x, y);
    var npc = npcAt(x, y);
    var t = tileType(x, y);
    var cls = 'rpg-tile rpg-tile-' + t + tileVariant(t, x, y) + (here ? ' rpg-player-tile' : '') + (b && d.badges[b.id] ? ' cleared' : '');
    var attr = b ? ' data-node="' + b.id + '"' : (npc ? ' data-npc="' + npc.id + '"' : '');
    var aria = npc ? 'Talk to ' + esc(npc.name) : (b ? esc(MAP_NODES[b.id].short) + ' entrance' : 'Map tile ' + x + ',' + y);
    var label = b ? '<span class="rpg-location-label">' + esc(MAP_NODES[b.id].short) + '</span>'
      : (npc ? '<span class="rpg-location-label rpg-npc-label">' + esc(npc.tag) + '</span>' : '');
    var contents = '<span class="rpg-tile-art" aria-hidden="true"></span>' + label;
    if (npc) contents += '<span class="rpg-npc-sprite" data-mon="' + esc(npc.mon) + '" aria-hidden="true"></span>';
    if (compHere) contents += '<span class="rpg-companion-sprite rpg-companion-' + esc(c.id) + '" aria-label="Companion"></span>';
    if (here) contents += '<span class="rpg-player-sprite" aria-label="Player"></span>';
    return '<button class="' + cls + '" type="button"' + attr + ' aria-label="' + aria + '">' + contents + '</button>';
  }
  function mapHtml(d, c) {
    var out = '';
    for (var y = 0; y < MAP_H; y++) for (var x = 0; x < MAP_W; x++) out += tileHtml(x, y, d, c);
    return out;
  }
  // Synchronous, instant camera centring. Runs in the same task as mount() so the
  // freshly rebuilt map is scrolled onto the player BEFORE the browser paints —
  // this is what stops the top-left flash and makes the camera follow. No-ops on
  // screens without a map (battle/starter/dialogue/region) via the null guard.
  function centerNow() {
    var overlay = document.getElementById('rpgOverlay');
    if (!overlay) return;
    var viewport = overlay.querySelector('.rpg-pixel-map-wrap');
    var playerTile = overlay.querySelector('.rpg-player-tile');
    if (!viewport || !playerTile) return;
    var vpRect = viewport.getBoundingClientRect();
    var tileRect = playerTile.getBoundingClientRect();
    var targetLeft = viewport.scrollLeft + (tileRect.left - vpRect.left) - (viewport.clientWidth / 2) + (tileRect.width / 2);
    var targetTop = viewport.scrollTop + (tileRect.top - vpRect.top) - (viewport.clientHeight / 2) + (tileRect.height / 2);
    viewport.scrollLeft = Math.max(0, targetLeft);
    viewport.scrollTop = Math.max(0, targetTop);
    // Pin the map viewport within the panel synchronously (same target the
    // scroll-fix helper applies asynchronously). Because the whole overlay is
    // rebuilt on every move, the fresh panel starts scrolled to the top; without
    // this the panel jumped ~header-height a frame later — the move flicker.
    if (!document.body.classList.contains('rpg-map-fullscreen-body')) {
      var panel = overlay.querySelector('.rpg-panel');
      if (panel) panel.scrollTop = Math.max(0, viewport.offsetTop - 12);
    }
  }
  function cameraSoon() { requestAnimationFrame(centerNow); setTimeout(centerNow, 40); }
  function worldPrompt(d, message) {
    if (message) return message;
    var np = adjacentNpc(d);
    if (np) return NPCS[np.id].name + ' is beside you. Press Interact to talk.';
    var near = nearestRegion(d);
    if (near && near.dist <= 1) return 'You are close to ' + near.boss.region + '. Press Interact to enter.';
    return 'Use the D-pad or arrow keys to explore the study town and meet its people.';
  }
  // Patch only the handful of tiles that changed on a step, leaving the overlay,
  // panel, camera viewport and the other ~470 tiles in place. Rebuilding the whole
  // overlay every move re-composited the backdrop blur and re-decoded every tile
  // image — that was the visible move flicker. Incremental patching removes it.
  // Falls back to a full render if the world map is not already mounted.
  function moveRender(d, dirty, message) {
    var overlay = document.getElementById('rpgOverlay');
    var map = overlay && overlay.querySelector('.rpg-pixel-map');
    if (!map || map.children.length !== MAP_W * MAP_H) return landing(d, message);
    var c = starter(d); if (!c) return landing(d, message);
    var seen = {};
    (dirty || []).forEach(function (p) {
      if (!p) return;
      var k = p.x + ',' + p.y; if (seen[k]) return; seen[k] = 1;
      var el = map.children[p.y * MAP_W + p.x]; if (!el) return;
      var tmp = document.createElement('div');
      tmp.innerHTML = tileHtml(p.x, p.y, d, c);
      if (tmp.firstChild) el.replaceWith(tmp.firstChild);
    });
    var msg = overlay.querySelector('.rpg-map-message'); if (msg) msg.textContent = worldPrompt(d, message);
    var pos = overlay.querySelector('.rpg-pos'); if (pos) pos.textContent = 'Position ' + d.pos.x + ',' + d.pos.y;
    centerNow();
    cameraSoon();
  }
  function movePlayer(dir) {
    var d = load(); if (!starter(d)) return landing(d);
    var dx = 0, dy = 0;
    if (dir === 'up') dy = -1; if (dir === 'down') dy = 1; if (dir === 'left') dx = -1; if (dir === 'right') dx = 1;
    var nx = d.pos.x + dx, ny = d.pos.y + dy;
    if (!passable(nx, ny)) { d.dir = dir; save(d); moveRender(d, [], 'That route is blocked. Use the paths between buildings, trees and landmarks.'); return; }
    var oldPlayer = { x: d.pos.x, y: d.pos.y };            // player's current tile (companion will step here)
    var oldComp = { x: d.companionPos.x, y: d.companionPos.y }; // companion's current tile (will clear)
    d.companionPos = { x: d.pos.x, y: d.pos.y };
    d.dir = dir;
    d.pos = { x: nx, y: ny }; save(d);
    moveRender(d, [oldPlayer, oldComp, { x: nx, y: ny }]);
  }
  function interact() {
    var d = load();
    var np = adjacentNpc(d);
    if (np) return talk(np.id);
    var near = nearestRegion(d);
    if (near && near.dist <= 1) return region(near.boss.id);
    landing(d, 'No one and no entrance is close enough. Walk beside a townsperson or a region gate first.'); cameraSoon(false);
  }
  function tryRegion(id) { var d = load(); if (canEnter(d, id)) return region(id); var b = boss(id); landing(d, 'Walk closer to ' + b.region + ' before entering.'); cameraSoon(false); }
  function tryTalk(id) {
    var d = load(), n = NPCS[id]; if (!n) return;
    if (Math.abs(d.pos.x - n.x) + Math.abs(d.pos.y - n.y) <= 1) return talk(id);
    landing(d, 'Walk closer to ' + n.name + ' before talking.'); cameraSoon(false);
  }
  function resetPosition() { var d = load(); d.pos = { x: START_POS.x, y: START_POS.y }; d.companionPos = { x: START_POS.x, y: START_POS.y }; d.dir = 'down'; save(d); landing(d, 'Player returned to the central crossroads.'); cameraSoon(); }

  function talk(id) { if (!NPCS[id]) return; dlg = { id: id, i: 0 }; dialogue(); }
  function dlgNext() {
    if (!dlg) return; var n = NPCS[dlg.id]; if (!n) { dlg = null; return landing(load()); }
    if (dlg.i + 1 < n.lines.length) { dlg.i++; return dialogue(); }
    finishTalk(n);
  }
  function finishTalk(n) {
    var d = load(), msg = 'You finished talking to ' + n.name + '.';
    d.metNpcs[dlg.id] = true;
    if (n.gift === 'potion' && !d.gifts[dlg.id]) {
      d.gifts[dlg.id] = true;
      d.inventory.potion = Math.min(9, (d.inventory.potion || 0) + 1);
      msg = n.name + ' gave you a Potion! You now carry ' + d.inventory.potion + '.';
    }
    save(d); dlg = null; landing(d, msg); cameraSoon(false);
  }
  function dialogue() {
    var d = load(), n = NPCS[dlg.id], line = n.lines[dlg.i], last = dlg.i + 1 >= n.lines.length;
    mount('<section class="rpg-panel rpg-dialogue" role="dialog" aria-modal="true"><button class="rpg-close" data-close type="button">×</button><div class="rpg-dialogue-inner"><div class="rpg-dialogue-portrait rpg-sprite" data-mon="' + esc(n.mon) + '" aria-hidden="true"></div><div class="rpg-dialogue-body"><h2>' + esc(n.name) + '</h2><p class="rpg-dialogue-role">' + esc(n.role) + '</p><div class="rpg-speech">' + esc(line) + '</div><p class="rpg-dialogue-progress">Line ' + (dlg.i + 1) + ' of ' + n.lines.length + '</p><div class="rpg-actions"><button class="rpg-next" data-talk-next type="button">' + (last ? 'Done' : 'Next ▸') + '</button><button class="rpg-secondary" data-landing type="button">Leave</button></div></div></div></section>');
  }

  function landing(forcedData, message) {
    dlg = null;
    var d = normalise(forcedData || load()), c = starter(d); if (!c) return starterScreen(d);
    var badges = BOSSES.map(function (b) { return '<span class="rpg-badge ' + (d.badges[b.id] ? 'earned' : '') + '">' + (d.badges[b.id] ? '🏅 ' : '⚪ ') + esc(b.badge) + '</span>'; }).join('');
    var prompt = worldPrompt(d, message);
    mount('<section class="rpg-panel rpg-world" role="dialog" aria-modal="true"><button class="rpg-close" data-close type="button">×</button><div class="rpg-world-head"><div><h2>Ledger Legends</h2><p>Explore the expanded study town, chat with the townsfolk for exam tips, enter the four topic regions, defeat their bosses and collect every badge before the Synoptic League.</p></div><div class="rpg-trainer-card"><span class="rpg-companion" data-mon="' + c.id + '"></span><strong>' + esc(c.name) + '</strong><small>Lv ' + lvl(d.xp) + ' · ' + d.xp + ' XP</small><small class="rpg-pos">Position ' + d.pos.x + ',' + d.pos.y + '</small></div></div><div class="rpg-badges">' + badges + '</div><div class="rpg-map-layout"><div class="rpg-pixel-map-wrap"><div class="rpg-pixel-map" role="grid" aria-label="Ledger Legends world map" style="--rpg-cols:' + MAP_W + '">' + mapHtml(d, c) + '</div></div><div class="rpg-map-side"><div class="rpg-map-message">' + esc(prompt) + '</div><div class="rpg-controls" aria-label="Movement controls"><span></span><button type="button" data-dir="up" aria-label="Move up">▲</button><span></span><button type="button" data-dir="left" aria-label="Move left">◀</button><button type="button" data-interact>INTERACT</button><button type="button" data-dir="right" aria-label="Move right">▶</button><span></span><button type="button" data-dir="down" aria-label="Move down">▼</button><span></span></div><button class="rpg-secondary" data-reset-pos type="button">Return to centre</button><p class="rpg-note">Keyboard: arrows or WASD to walk; Enter or Space to interact. Talk to the townsfolk (name tags) for study tips. The camera follows your player.</p></div></div></section>');
    centerNow();   // snap the camera onto the player before the first paint
    cameraSoon();  // safety re-centre once late layout (fonts/grid) settles
  }

  function region(id) {
    var d = load(), b = boss(id), c = starter(d), count = qs(id).length;
    mount('<section class="rpg-panel rpg-region" role="dialog" aria-modal="true"><button class="rpg-close" data-close type="button">×</button><div class="rpg-region-hero rpg-region-' + esc(b.scene) + '"><span class="rpg-region-art"></span><div><h2>' + esc(b.region) + '</h2><p>' + esc(b.desc) + '</p></div></div><div class="rpg-encounter"><p><strong>Wild encounter:</strong> A ' + esc(b.wild) + ' blocks the route.</p><p><strong>Gym boss:</strong> ' + b.icon + ' ' + esc(b.name) + ' guards the ' + esc(b.badge) + '.</p><p><strong>Your companion:</strong> ' + c.icon + ' ' + esc(c.name) + ', Lv ' + lvl(d.xp) + '.</p><p><strong>Question pool:</strong> ' + count + ' eligible questions.</p></div><div class="rpg-actions"><button class="rpg-next" data-boss="' + b.id + '" type="button">Challenge ' + esc(b.name) + '</button><button class="rpg-secondary" data-landing type="button">Back to world map</button></div></section>');
  }

  function start(id) {
    var d = load(), c = starter(d), b = boss(id), pool = qs(id); if (!pool.length || !c) return;
    st = { b: b, c: c, deck: shuffle(pool).slice(0, Math.min(LEN, pool.length)).map(present), i: 0, player: 34 + lvl(d.xp), enemy: 34, maxP: 34 + lvl(d.xp), maxE: 34, answered: null, move: '', streak: 0, res: [], log: ['A wild ' + b.wild + ' appeared.', b.name + ' challenged you to an AAT battle.'] };
    battle();
  }
  function bar(v, m) { return '<div class="rpg-hp"><span style="width:' + Math.max(0, Math.min(100, v / m * 100)) + '%"></span></div>'; }
  function over() { return st.player <= 0 || st.enemy <= 0 || st.i + 1 >= st.deck.length; }
  function moveName(strong) { return strong ? st.c.move2 : st.c.move1; }
  function damage(ok, strong) { if (!ok) return 0; return strong ? 13 + Math.min(4, st.streak) : 8 + Math.min(3, st.streak); }

  function battle() {
    var q = st.deck[st.i], done = st.answered !== null, disabled = done ? 'disabled' : '';
    var potions = (load().inventory.potion || 0);
    var opts = q.opts.map(function (o, i) {
      var cls = done && i === q.ans ? ' correct' : done && i === st.answered ? ' wrong' : '';
      var move = i < 2 ? 'quick' : 'special';
      return '<button class="rpg-option' + cls + '" data-opt="' + i + '" data-move="' + move + '" type="button" ' + disabled + '><b>' + String.fromCharCode(65 + i) + '</b><span>' + esc(o) + '</span><small>' + esc(moveName(move === 'special')) + '</small></button>';
    }).join('');
    var fb = done ? '<div class="rpg-feedback"><strong>' + esc(st.log[0]) + '</strong><br>' + (st.answered === q.ans ? '' : 'Correct: ' + esc(q.opts[q.ans]) + '<br>') + '<em>' + esc(q.exp) + '</em></div><button class="rpg-next" data-next type="button">' + (over() ? 'View battle result' : 'Continue quest') + ' →</button>' : '';
    mount('<section class="rpg-panel rpg-battle" role="dialog" aria-modal="true"><button class="rpg-close" data-close type="button">×</button><div class="rpg-arena"><div class="rpg-backdrop rpg-backdrop-' + esc(st.b.scene) + '"></div><div class="rpg-fighters"><div class="rpg-mon"><div class="rpg-sprite ally" data-mon="' + st.c.id + '"></div><strong>' + esc(st.c.name) + '</strong>' + bar(st.player, st.maxP) + '<small>' + st.player + '/' + st.maxP + ' HP</small></div><div class="rpg-vs">⚔️</div><div class="rpg-mon"><div class="rpg-sprite enemy" data-mon="' + st.b.id + '"></div><strong>' + esc(st.b.name) + '</strong>' + bar(st.enemy, st.maxE) + '<small>' + st.enemy + '/' + st.maxE + ' HP</small></div></div></div><div class="rpg-battle-menu"><p class="rpg-meta">' + esc(st.b.region) + ' · Turn ' + (st.i + 1) + '/' + st.deck.length + ' · Streak ' + st.streak + '</p><h2 class="rpg-question">' + esc(q.q) + '</h2><div class="rpg-options">' + opts + '</div><div class="rpg-actions small"><button class="rpg-secondary" data-potion type="button" ' + (done || st.player >= st.maxP || potions <= 0 ? 'disabled' : '') + '>Use Potion (' + potions + ')</button></div>' + fb + '<div class="rpg-log">' + st.log.slice(0, 3).map(function (x) { return '<div>' + esc(x) + '</div>'; }).join('') + '</div></section>');
  }

  function usePotion() {
    if (!st || st.answered !== null || st.player >= st.maxP) return;
    var d = load(); if ((d.inventory.potion || 0) <= 0) return;   // no potions left — do nothing
    d.inventory.potion = (d.inventory.potion || 0) - 1; save(d);  // consume one from the shared inventory
    st.player = Math.min(st.maxP, st.player + 10);
    st.log.unshift(st.c.name + ' drank a Potion (+10 HP). ' + d.inventory.potion + ' left.');
    battle();
  }
  function answer(i, mv) {
    if (!st || st.answered !== null) return;
    var q = st.deck[st.i], ok = i === q.ans, strong = mv === 'special';
    st.answered = i; st.move = moveName(strong);
    if (ok) { st.streak++; var dmg = damage(true, strong); st.enemy = Math.max(0, st.enemy - dmg); st.log.unshift(st.c.name + ' used ' + st.move + '. It dealt ' + dmg + ' damage.'); }
    else { st.streak = 0; st.player = Math.max(0, st.player - 8); st.log.unshift(st.b.name + ' countered. ' + st.c.name + ' took 8 damage.'); }
    st.res.push({ q: q.q, ok: ok, correct: q.opts[q.ans], exp: q.exp, move: st.move });
    battle();
  }
  function next() { if (over()) return result(); st.i++; st.answered = null; battle(); }

  function result() {
    var n = st.res.filter(function (r) { return r.ok; }).length, won = st.enemy <= 0 || (st.player > 0 && n >= 4);
    var d = load(); d.xp += won ? 45 : 15; d.wins[st.b.id] = (d.wins[st.b.id] || 0) + (won ? 1 : 0); if (won) d.badges[st.b.id] = true; d.inventory.potion = Math.min(9, (d.inventory.potion || 0) + 1); save(d);
    var review = st.res.map(function (r, i) { return '<details class="rpg-review-item ' + (r.ok ? 'ok' : 'bad') + '"><summary>Turn ' + (i + 1) + ' · ' + esc(r.move) + ' · ' + (r.ok ? 'Hit' : 'Miss') + '</summary><p><strong>' + esc(r.q) + '</strong></p><p>Correct: ' + esc(r.correct) + '</p><p><em>' + esc(r.exp) + '</em></p></details>'; }).join('');
    mount('<section class="rpg-panel rpg-result" role="dialog" aria-modal="true"><button class="rpg-close" data-close type="button">×</button><div class="rpg-hero-icon">' + (won ? '🏆' : '🛡️') + '</div><h2>' + (won ? esc(st.b.badge) + ' earned' : 'You escaped to revise') + '</h2><p>' + esc(st.b.name) + ': ' + n + '/' + st.deck.length + ' correct · +' + (won ? 45 : 15) + ' XP · Potion found.</p><div class="rpg-profile"><span>' + esc(st.c.name) + ' Lv ' + lvl(d.xp) + '</span><span>Total XP ' + d.xp + '</span><span>' + Object.keys(d.badges).length + '/4 badges</span></div><div class="rpg-actions"><button class="rpg-next" data-retry="' + st.b.id + '" type="button">Rematch boss</button><button class="rpg-secondary" data-landing type="button">World map</button></div><div class="rpg-review">' + review + '</div></section>');
  }

  document.addEventListener('keydown', function (e) {
    if (!document.getElementById('rpgOverlay')) return;
    if (e.key === 'Escape') return close();
    if (document.querySelector('.rpg-dialogue')) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); return dlgNext(); }
      return;
    }
    if (!document.querySelector('.rpg-world')) return;
    var k = e.key.toLowerCase();
    if (k === 'arrowup' || k === 'w') { e.preventDefault(); return movePlayer('up'); }
    if (k === 'arrowdown' || k === 's') { e.preventDefault(); return movePlayer('down'); }
    if (k === 'arrowleft' || k === 'a') { e.preventDefault(); return movePlayer('left'); }
    if (k === 'arrowright' || k === 'd') { e.preventDefault(); return movePlayer('right'); }
    if (k === 'enter' || k === ' ') { e.preventDefault(); return interact(); }
  });
  function init() { inject(); var app = document.getElementById('app'); if (app && window.MutationObserver) new MutationObserver(inject).observe(app, { childList: true, subtree: true }); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
}());
