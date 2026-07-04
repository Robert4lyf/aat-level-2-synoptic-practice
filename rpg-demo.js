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

  var MAP_W = 12;
  var MAP_H = 9;
  var START_POS = { x: 5, y: 4 };
  var MAP_NODES = {
    itbk: { x: 1, y: 1, kind: 'forest-gate', short: 'Forest' },
    pobc: { x: 9, y: 1, kind: 'cave-gate', short: 'Cavern' },
    poc: { x: 2, y: 7, kind: 'factory-door', short: 'Factory' },
    besy: { x: 9, y: 6, kind: 'town-door', short: 'Town' }
  };
  var BLOCKED = { '0,0': 1, '1,0': 1, '2,0': 1, '7,0': 1, '8,0': 1, '9,0': 1, '10,0': 1, '11,0': 1, '0,1': 1, '11,1': 1, '0,2': 1, '11,2': 1, '0,7': 1, '11,7': 1, '0,8': 1, '1,8': 1, '2,8': 1, '3,8': 1, '7,8': 1, '8,8': 1, '9,8': 1, '10,8': 1, '11,8': 1 };
  var DECOR = {
    '3,0': 'tree', '4,0': 'tree', '5,0': 'tree', '6,0': 'tree', '2,1': 'tree', '3,1': 'tree',
    '7,1': 'rock', '8,1': 'rock', '10,1': 'rock', '3,2': 'flower', '6,2': 'sign', '10,2': 'rock',
    '1,3': 'grass', '2,3': 'grass', '8,3': 'ledger-stone', '10,3': 'tree', '1,4': 'grass', '9,4': 'market',
    '3,5': 'book', '6,5': 'well', '10,5': 'house', '1,6': 'factory-wall', '2,6': 'factory-wall', '3,6': 'factory-wall',
    '8,6': 'pathlamp', '10,6': 'house', '4,7': 'tree', '5,7': 'tree', '6,7': 'tree'
  };

  var st = null;
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
  function normalise(d) { d = d || {}; d.xp = d.xp || 0; d.wins = d.wins || {}; d.badges = d.badges || {}; d.starter = d.starter || ''; d.routes = d.routes || {}; d.inventory = d.inventory || { potion: 1 }; d.pos = d.pos || { x: START_POS.x, y: START_POS.y }; if (typeof d.pos.x !== 'number' || typeof d.pos.y !== 'number') d.pos = { x: START_POS.x, y: START_POS.y }; d.pos.x = Math.max(0, Math.min(MAP_W - 1, d.pos.x)); d.pos.y = Math.max(0, Math.min(MAP_H - 1, d.pos.y)); return d; }
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
    b.onclick = landing; grid.insertBefore(b, grid.firstChild);
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
    var cards = Object.keys(STARTERS).map(function (k) { var c = STARTERS[k]; return '<button class="rpg-starter-card" data-starter="' + k + '" type="button"><span>' + c.icon + '</span><strong>' + esc(c.name) + '</strong><small>' + esc(c.type) + ' type</small><em>' + esc(c.move1) + '</em></button>'; }).join('');
    mount('<section class="rpg-panel rpg-start" role="dialog" aria-modal="true"><button class="rpg-close" data-close type="button">×</button><h2>Choose your study companion</h2><p>This makes the mode feel more like an RPG. The companion levels up, learns stronger attacks, and earns badges by defeating topic bosses.</p><div class="rpg-starter-grid">' + cards + '</div></section>');
  }

  function nodeDistance(pos, id) { var n = MAP_NODES[id]; return Math.abs(pos.x - n.x) + Math.abs(pos.y - n.y); }
  function nearestRegion(d) { var best = null; BOSSES.forEach(function (b) { var dist = nodeDistance(d.pos, b.id); if (!best || dist < best.dist) best = { boss: b, dist: dist }; }); return best; }
  function canEnter(d, id) { return nodeDistance(d.pos, id) <= 1; }
  function posKey(x, y) { return x + ',' + y; }
  function bossAt(x, y) { for (var i = 0; i < BOSSES.length; i++) { var b = BOSSES[i], n = MAP_NODES[b.id]; if (n.x === x && n.y === y) return b; } return null; }
  function tileType(x, y) {
    var key = posKey(x, y);
    if (bossAt(x, y)) return 'region';
    if (DECOR[key]) return DECOR[key];
    if (BLOCKED[key]) return 'tree';
    if (y === 4 || x === 5 || x === 6 || (y === 2 && x > 1 && x < 10) || (y === 6 && x > 1 && x < 10)) return 'path';
    return 'grass';
  }
  function passable(x, y) {
    if (x < 0 || y < 0 || x >= MAP_W || y >= MAP_H) return false;
    var t = tileType(x, y);
    return ['path', 'grass', 'flower', 'book', 'sign', 'well', 'pathlamp', 'ledger-stone', 'region'].indexOf(t) >= 0;
  }
  function tileHtml(x, y, d, c) {
    var here = d.pos.x === x && d.pos.y === y;
    var b = bossAt(x, y);
    var t = tileType(x, y);
    var cls = 'rpg-tile rpg-tile-' + t + (here ? ' rpg-player-tile' : '') + (b && d.badges[b.id] ? ' cleared' : '');
    var node = b ? ' data-node="' + b.id + '"' : '';
    var label = b ? '<span class="rpg-location-label">' + esc(MAP_NODES[b.id].short) + '</span>' : '';
    var contents = '<span class="rpg-tile-art" aria-hidden="true"></span>' + label;
    if (here) contents += '<span class="rpg-player-sprite" aria-label="Player"><span></span></span><span class="rpg-companion-sprite rpg-companion-' + esc(c.id) + '" aria-label="Companion"><span></span></span>';
    return '<button class="' + cls + '" type="button"' + node + ' aria-label="Map tile ' + x + ',' + y + '">' + contents + '</button>';
  }
  function mapHtml(d, c) {
    var out = '';
    for (var y = 0; y < MAP_H; y++) for (var x = 0; x < MAP_W; x++) out += tileHtml(x, y, d, c);
    return out;
  }
  function movePlayer(dir) {
    var d = load(); if (!starter(d)) return landing(d);
    var dx = 0, dy = 0;
    if (dir === 'up') dy = -1; if (dir === 'down') dy = 1; if (dir === 'left') dx = -1; if (dir === 'right') dx = 1;
    var nx = d.pos.x + dx, ny = d.pos.y + dy;
    if (!passable(nx, ny)) return landing(d, 'That route is blocked. Use the paths between buildings, trees and landmarks.');
    d.pos.x = nx; d.pos.y = ny; save(d);
    var near = nearestRegion(d);
    landing(d, near && near.dist <= 1 ? 'You are close to ' + near.boss.region + '. Press Interact to enter.' : 'Walk to a building, cave or forest entrance, then press Interact.');
  }
  function interact() { var d = load(), near = nearestRegion(d); if (near && near.dist <= 1) return region(near.boss.id); landing(d, 'No entrance is close enough. Walk next to a region building, cave or forest gate first.'); }
  function tryRegion(id) { var d = load(); if (canEnter(d, id)) return region(id); var b = boss(id); landing(d, 'Walk closer to ' + b.region + ' before entering.'); }
  function resetPosition() { var d = load(); d.pos = { x: START_POS.x, y: START_POS.y }; save(d); landing(d, 'Player returned to the central path.'); }

  function landing(forcedData, message) {
    var d = normalise(forcedData || load()), c = starter(d); if (!c) return starterScreen(d);
    var badges = BOSSES.map(function (b) { return '<span class="rpg-badge ' + (d.badges[b.id] ? 'earned' : '') + '">' + (d.badges[b.id] ? '🏅 ' : '⚪ ') + esc(b.badge) + '</span>'; }).join('');
    var near = nearestRegion(d);
    var prompt = message || (near && near.dist <= 1 ? 'You are close to ' + near.boss.region + '. Press Interact to enter.' : 'Use the D-pad or arrow keys to move around the study town.');
    mount('<section class="rpg-panel rpg-world" role="dialog" aria-modal="true"><button class="rpg-close" data-close type="button">×</button><div class="rpg-world-head"><div><h2>Ledger Legends</h2><p>Walk around the study town, enter topic regions, defeat bosses and collect badges before the Synoptic League.</p></div><div class="rpg-trainer-card"><span class="rpg-companion">' + c.icon + '</span><strong>' + esc(c.name) + '</strong><small>Lv ' + lvl(d.xp) + ' · ' + d.xp + ' XP</small><small>Position ' + d.pos.x + ',' + d.pos.y + '</small></div></div><div class="rpg-badges">' + badges + '</div><div class="rpg-map-layout"><div class="rpg-pixel-map-wrap"><div class="rpg-pixel-map" role="grid" aria-label="Ledger Legends world map">' + mapHtml(d, c) + '</div></div><div class="rpg-map-side"><div class="rpg-map-message">' + esc(prompt) + '</div><div class="rpg-controls" aria-label="Movement controls"><span></span><button type="button" data-dir="up" aria-label="Move up">▲</button><span></span><button type="button" data-dir="left" aria-label="Move left">◀</button><button type="button" data-interact>INTERACT</button><button type="button" data-dir="right" aria-label="Move right">▶</button><span></span><button type="button" data-dir="down" aria-label="Move down">▼</button><span></span></div><button class="rpg-secondary" data-reset-pos type="button">Return to centre</button><p class="rpg-note">Keyboard: arrows or WASD to walk; Enter or Space to interact.</p></div></div></section>');
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
    var opts = q.opts.map(function (o, i) {
      var cls = done && i === q.ans ? ' correct' : done && i === st.answered ? ' wrong' : '';
      var move = i < 2 ? 'quick' : 'special';
      return '<button class="rpg-option' + cls + '" data-opt="' + i + '" data-move="' + move + '" type="button" ' + disabled + '><b>' + String.fromCharCode(65 + i) + '</b><span>' + esc(o) + '</span><small>' + esc(moveName(move === 'special')) + '</small></button>';
    }).join('');
    var fb = done ? '<div class="rpg-feedback"><strong>' + esc(st.log[0]) + '</strong><br>' + (st.answered === q.ans ? '' : 'Correct: ' + esc(q.opts[q.ans]) + '<br>') + '<em>' + esc(q.exp) + '</em></div><button class="rpg-next" data-next type="button">' + (over() ? 'View battle result' : 'Continue quest') + ' →</button>' : '';
    mount('<section class="rpg-panel rpg-battle" role="dialog" aria-modal="true"><button class="rpg-close" data-close type="button">×</button><div class="rpg-arena"><div class="rpg-backdrop rpg-backdrop-' + esc(st.b.scene) + '"></div><div class="rpg-fighters"><div class="rpg-mon"><div class="rpg-sprite ally">' + st.c.icon + '</div><strong>' + esc(st.c.name) + '</strong>' + bar(st.player, st.maxP) + '<small>' + st.player + '/' + st.maxP + ' HP</small></div><div class="rpg-vs">⚔️</div><div class="rpg-mon"><div class="rpg-sprite enemy">' + st.b.icon + '</div><strong>' + esc(st.b.name) + '</strong>' + bar(st.enemy, st.maxE) + '<small>' + st.enemy + '/' + st.maxE + ' HP</small></div></div></div><div class="rpg-battle-menu"><p class="rpg-meta">' + esc(st.b.region) + ' · Turn ' + (st.i + 1) + '/' + st.deck.length + ' · Streak ' + st.streak + '</p><h2 class="rpg-question">' + esc(q.q) + '</h2><div class="rpg-options">' + opts + '</div><div class="rpg-actions small"><button class="rpg-secondary" data-potion type="button" ' + (done || st.player >= st.maxP ? 'disabled' : '') + '>Use Potion</button></div>' + fb + '<div class="rpg-log">' + st.log.slice(0, 3).map(function (x) { return '<div>' + esc(x) + '</div>'; }).join('') + '</div></section>');
  }

  function usePotion() { if (!st || st.answered !== null || st.player >= st.maxP) return; st.player = Math.min(st.maxP, st.player + 10); st.log.unshift(st.c.name + ' restored 10 HP.'); battle(); }
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
    var d = load(); d.xp += won ? 45 : 15; d.wins[st.b.id] = (d.wins[st.b.id] || 0) + (won ? 1 : 0); if (won) d.badges[st.b.id] = true; d.inventory.potion = Math.min(3, (d.inventory.potion || 0) + 1); save(d);
    var review = st.res.map(function (r, i) { return '<details class="rpg-review-item ' + (r.ok ? 'ok' : 'bad') + '"><summary>Turn ' + (i + 1) + ' · ' + esc(r.move) + ' · ' + (r.ok ? 'Hit' : 'Miss') + '</summary><p><strong>' + esc(r.q) + '</strong></p><p>Correct: ' + esc(r.correct) + '</p><p><em>' + esc(r.exp) + '</em></p></details>'; }).join('');
    mount('<section class="rpg-panel rpg-result" role="dialog" aria-modal="true"><button class="rpg-close" data-close type="button">×</button><div class="rpg-hero-icon">' + (won ? '🏆' : '🛡️') + '</div><h2>' + (won ? esc(st.b.badge) + ' earned' : 'You escaped to revise') + '</h2><p>' + esc(st.b.name) + ': ' + n + '/' + st.deck.length + ' correct · +' + (won ? 45 : 15) + ' XP · Potion found.</p><div class="rpg-profile"><span>' + esc(st.c.name) + ' Lv ' + lvl(d.xp) + '</span><span>Total XP ' + d.xp + '</span><span>' + Object.keys(d.badges).length + '/4 badges</span></div><div class="rpg-actions"><button class="rpg-next" data-retry="' + st.b.id + '" type="button">Rematch boss</button><button class="rpg-secondary" data-landing type="button">World map</button></div><div class="rpg-review">' + review + '</div></section>');
  }

  document.addEventListener('keydown', function (e) {
    if (!document.getElementById('rpgOverlay')) return;
    if (e.key === 'Escape') return close();
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
