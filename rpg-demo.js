/* Ledger Legends — RPG-style AAT battle demo.
   Drop-in enhancement. Requires data.js to expose window.ALL_QUESTIONS. */
(function () {
  'use strict';

  var KEY = 'aatRpgDemo_v2';
  var OLD_KEY = 'aatRpgDemo_v1';
  var LEN = 5;
  // The player is the hero and the sole battle fighter — no companion creatures.
  var FIGHTER = { id: 'player', name: 'The Accountant', icon: '📊', type: 'Ledger', move1: 'Balance Strike', move2: 'Audit Burst' };
  // Each boss now has its own fight: hp (enemy HP), counter (wrong-answer damage),
  // deck (questions), need (correct-to-win-alive), trait (signature gimmick), a
  // wild-encounter sprite key, and pre-battle dialogue in its own menacing voice.
  var BOSSES = [
    { id: 'itbk', icon: '🐉', name: 'Papyrus Wyrm', region: 'Ledger Forest', badge: 'Ledger Badge', type: 'Bookkeeping', wild: 'Source Slime', wildKey: 'slime', scene: 'forest', desc: 'Debits, credits, source documents and ledger basics.',
      hp: 36, counter: 8, deck: 5, need: 4, trait: 'enrage',
      lines: ['Ssso… another scribe crawlsss into my wood to balance my hoard.', 'Every debit hasss its credit, morsel — and you shall settle BOTH.', 'Misss a figure and my ledger-flame burnsss hotter. Beginnn.'] },
    { id: 'pobc', icon: '🪨', name: 'Adding-Machine Golem', region: 'Control Cavern', badge: 'Control Badge', type: 'Control', wild: 'Suspense Bat', wildKey: 'bat', scene: 'cave', desc: 'Control accounts, journals, errors and reconciliations.',
      hp: 44, counter: 9, deck: 5, need: 4, trait: 'armored',
      lines: ['RECONCILE. OR BE VOID.', 'YOUR FIGURES DO NOT AGREE. A DIFFERENCE IS HELD… IN SUSPENSE.', 'LIGHT BLOWS GLANCE OFF MY CASING. STRIKE HARD — OR BE ZEROED.'] },
    { id: 'poc', icon: '🧪', name: 'Cost Chimera', region: 'Costing Factory', badge: 'Costing Badge', type: 'Costing', wild: 'Overhead Imp', wildKey: 'imp', scene: 'factory', desc: 'Cost behaviour, inventory, OAR and costing systems.',
      hp: 50, counter: 10, deck: 6, need: 5, trait: 'regen',
      lines: ['Materials— Labour— Overhead— three hungers, one beast.', 'We absorb every cost into the total… and now we absorb YOU.', 'Wound one head and another feeds. Out-produce us if you dare.'] },
    { id: 'besy', icon: '🦅', name: 'Contract Griffin', region: 'Enterprise Town', badge: 'Enterprise Badge', type: 'Business', wild: 'Contract Sprite', wildKey: 'sprite', scene: 'town', desc: 'Business structures, law, contracts and stakeholders.',
      hp: 58, counter: 11, deck: 6, need: 5, trait: 'aegis',
      lines: ['By offer and acceptance, your challenge is BINDING.', 'There is no clause of escape — the ink is already dry.', 'My seal turns aside your first blows. Sign here… in defeat.'] }
  ];
  var LEAGUE = { id: 'league', icon: '🎓', name: 'The Grand Reckoner', region: 'The Synoptic League', badge: 'Synoptic Crown', type: 'Synoptic', wild: '', wildKey: '', scene: 'town', desc: 'The final reckoning — every topic, all at once.',
    hp: 80, counter: 12, deck: 8, need: 6, trait: 'grand',
    lines: ['All four seals broken… yet still you climb.', 'I am the sum of every ledger, every control, every cost and every contract.', 'Show me all you have learned, trainee — or be STRUCK from the record.'] };

  var MAP_W = 23;
  var MAP_H = 25;
  var START_POS = { x: 2, y: 3 };
  // Gates sit on the band roads of a serpentine "route" that snakes top-to-bottom
  // through the four regions in difficulty order: Forest -> Cavern -> Factory -> Town.
  var MAP_NODES = {
    itbk: { x: 16, y: 3, kind: 'forest-gate', short: 'Forest' },
    pobc: { x: 6, y: 9, kind: 'cave-gate', short: 'Cavern' },
    poc: { x: 16, y: 15, kind: 'factory-door', short: 'Factory' },
    besy: { x: 6, y: 21, kind: 'town-door', short: 'Town' }
  };
  // Hand-drawn tile map: one char per tile (see LEGEND). Each of the 25 rows is
  // exactly 23 chars. Gates, NPCs and blockers are drawn on top by tileType() and
  // sit on '=' (road) or '.' (grass) here so the roads still autotile through them.
  var LEGEND = {
    '.': 'grass', ',': 'flower', '=': 'path', 'o': 'well', 'L': 'ledger-stone',
    'p': 'pathlamp', 's': 'sign', 'k': 'book', 'm': 'mushroom', 'x': 'flowerbed',
    '#': 'tree', '%': 'rock', '~': 'pond', 'b': 'bush', 'f': 'fence', 'F': 'fountain',
    'B': 'barrel', 'C': 'crop', 'H': 'house', 'M': 'market', 'W': 'factory-wall'
  };
  var MAP_ROWS = [
    '#######################',
    '###.b~#k,m##.b~#k,m##.#',
    '#,.##.b~#k,.##.b~#k,m##',
    '##===================##',
    '####################=##',
    '####################=##',
    '#~~~~~~~~~~~~~~~~~~~=~#',
    '####################=##',
    '#L%s,o%%..L%s.o%%.pL=s#',
    '##===================##',
    '#%=%%%%%%%%%%%%%%%%%%%#',
    '#%=%%%%%%%%%%%%%%%%%%%#',
    '#%=%%%%%%%%%%%%%%%%%%%#',
    '#%=%%%%%%%%%%%%%%%%%%%#',
    '#W=sC.B,fBW.sCWB,fBW.s#',
    '##===================##',
    '#BfCBWWBfCBWWBfCBWWB=C#',
    '#BWWBfCBWWBfCBWWBfCB=W#',
    '#BfCBWWBfCBWWBfCBWWB=C#',
    '#BWWBfCBWWBfCBWWBfCB=W#',
    '#FpHH,xoM..pHH,xoM.F=H#',
    '##===================##',
    '#xoM.FpHH,xoM.FpHH,xoM#',
    '#H,xoM.FpHH,xoM.FpHH,x#',
    '#######################'
  ];
  // Route blockers: each sits on a connector between two regions and stays
  // impassable (rendered as a fence) until the previous region's badge is earned.
  var BLOCKERS = {
    '20,6': { needs: 'itbk', label: 'Ledger Badge' },
    '2,12': { needs: 'pobc', label: 'Control Badge' },
    '20,18': { needs: 'poc', label: 'Costing Badge' }
  };

  // Townsfolk NPCs. Each stands just off a road so you approach and talk from an
  // adjacent tile (their own tile blocks movement, like a person standing there).
  // `mon` selects the pixel sprite (rpg-assets/npc-*.png); `lines` is the dialogue.
  var NPCS = {
    quill: {
      x: 2, y: 2, mon: 'professor', tag: 'Guide', name: 'Professor Quill',
      role: 'Head Tutor of Ledger Town',
      lines: [
        'Welcome to Ledger Town, trainee! I am Professor Quill.',
        'Four topic bosses line the route ahead — Forest, then Cavern, Factory and Town. Clear each one to unlock the gate to the next.',
        'Walk the path with the D-pad or arrow keys. When a landmark, gate or townsperson is beside you, press Interact.',
        'Talk to the folk near each region first — they teach the tricks that win battles. Off you go!'
      ]
    },
    librarian: {
      x: 5, y: 2, mon: 'librarian', tag: 'Librarian', name: 'Marion the Librarian',
      role: 'Keeper of the Ledger Library',
      lines: [
        'A quick word before you set off — read the signposts you pass; they mark each region gate.',
        'The route runs one way. A locked gate means you must defeat the boss behind you first to open it.',
        'In battle, a correct answer attacks and keeps you safe; a wrong one lets the boss counter. Study hard!'
      ]
    },
    scribe: {
      x: 11, y: 2, mon: 'fox_scribe', tag: 'Bookkeeper', name: 'Fern the Scribe',
      role: 'Keeper of the Ledger Forest',
      lines: [
        'Heading into the Ledger Forest? Mind the Ledger Drake — it quizzes debits and credits.',
        'Remember DEAD CLIC: Debits grow Expenses, Assets and Drawings; Credits grow Liabilities, Income and Capital.',
        'Every transaction hits two accounts, and total debits must always equal total credits.',
        'Source documents come first: invoices, credit notes, remittances. Record them, then post to the ledger. Good luck!'
      ]
    },
    warden: {
      x: 9, y: 8, mon: 'badger_judge', tag: 'Reconciler', name: 'Vex the Warden',
      role: 'Guardian of the Control Cavern',
      lines: [
        'The Control Cavern is dark with errors and suspense accounts. The Reconciliation Golem waits within.',
        'A control account is a summary — the sales ledger control account should equal the total of the individual customer balances.',
        'When it does not balance, a suspense account holds the difference until you find the error.',
        'Errors of omission, commission, principle and reversal will not show in a trial balance — hunt them carefully!'
      ]
    },
    clerk: {
      x: 11, y: 14, mon: 'mole_clerk', tag: 'Cost Clerk', name: 'Cog the Clerk',
      role: 'Foreman of the Costing Factory',
      lines: [
        'The Costing Factory runs hot! The Costing Chimera tests how costs behave.',
        'Prime cost = direct materials + direct labour + direct expenses. Add overheads and you have total cost.',
        'Fixed costs stay put as output changes; variable costs rise with each unit made.',
        'The overhead absorption rate (OAR) spreads overheads over units — budgeted overhead divided by budgeted activity. Stay sharp!'
      ]
    },
    apprentice: {
      x: 5, y: 14, mon: 'apprentice', tag: 'Apprentice', name: 'Nib the Apprentice',
      role: 'Costing Factory Apprentice',
      lines: [
        'New here? I sweep the Costing Factory floor while Cog handles the big sums.',
        'One tip that sticks: fixed costs stay the same however much we make; variable costs change with every unit.',
        'Per unit it flips — fixed cost per unit falls as output rises, while variable cost per unit stays put. Handy in battle!'
      ]
    },
    mayor: {
      x: 10, y: 20, mon: 'mayor', tag: 'Mayor', name: 'Mayor Sterling',
      role: 'Head of Enterprise Town',
      lines: [
        'Welcome to Enterprise Town! The Enterprise Griffin guards knowledge of business and ethics.',
        'Know your structures: sole traders and partnerships have unlimited liability; companies are separate legal persons.',
        'A contract needs offer, acceptance, consideration and intention to create legal relations.',
        'And always act with integrity, objectivity and confidentiality — the AAT ethical principles. Trade fair!'
      ]
    },
    penny: {
      x: 13, y: 8, mon: 'cat_merchant', tag: 'Trader', name: 'Penny the Trader',
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
  // Resolve the raw tile-map char at (x,y). Out-of-bounds and unknown chars fall
  // back to a safe default so lookups never crash.
  function charAt(x, y) {
    if (y < 0 || y >= MAP_H || x < 0 || x >= MAP_W) return '#';
    var ch = MAP_ROWS[y] && MAP_ROWS[y].charAt(x);
    return LEGEND[ch] ? ch : '.';
  }
  function blockerAt(x, y) { return BLOCKERS[posKey(x, y)] || null; }
  function isRoad(x, y) { return charAt(x, y) === '='; }
  // A road cell connects to any neighbouring road cell or region gate. The
  // canonical n,s,e,w code selects the matching autotiled path sprite so
  // straights, corners, T-junctions and crossroads all join seamlessly.
  function connectsRoad(x, y) { return isRoad(x, y) || bossAt(x, y) != null; }
  function roadShape(x, y) {
    var code = '';
    if (connectsRoad(x, y - 1)) code += 'n';
    if (connectsRoad(x, y + 1)) code += 's';
    if (connectsRoad(x + 1, y)) code += 'e';
    if (connectsRoad(x - 1, y)) code += 'w';
    return code || 'ns';
  }
  function npcAt(x, y) { for (var k in NPCS) { if (NPCS.hasOwnProperty(k)) { var n = NPCS[k]; if (n.x === x && n.y === y) return { id: k, x: n.x, y: n.y, mon: n.mon, tag: n.tag, name: n.name }; } } return null; }

  var st = null;
  var dlg = null;
  var dlgBoss = null;
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
  function normalise(d) { d = d || {}; d.xp = d.xp || 0; d.wins = d.wins || {}; d.badges = d.badges || {}; d.routes = d.routes || {}; d.inventory = d.inventory || { potion: 1 }; d.gifts = d.gifts || {}; d.metNpcs = d.metNpcs || {}; d.npcDir = d.npcDir || {}; if (d.mapV !== 4) { d.pos = { x: START_POS.x, y: START_POS.y }; d.mapV = 4; } /* v4: player-as-hero, companions removed; reset onto the route (keeps xp/badges) */ d.pos = d.pos || { x: START_POS.x, y: START_POS.y }; if (typeof d.pos.x !== 'number' || typeof d.pos.y !== 'number') d.pos = { x: START_POS.x, y: START_POS.y }; d.pos.x = Math.max(0, Math.min(MAP_W - 1, d.pos.x)); d.pos.y = Math.max(0, Math.min(MAP_H - 1, d.pos.y)); d.dir = ['up', 'down', 'left', 'right'].indexOf(d.dir) >= 0 ? d.dir : 'down'; return d; }
  function lvl(xp) { return Math.max(1, Math.floor(Math.sqrt((xp || 0) / 30)) + 1); }
  function fighter() { return FIGHTER; }
  function boss(id) { if (id === 'league') return LEAGUE; return BOSSES.filter(function (b) { return b.id === id; })[0] || BOSSES[0]; }
  function validQ(q) { return q && Array.isArray(q.opts) && q.opts.length >= 4 && typeof q.ans === 'number'; }
  function qs(id) { return (window.ALL_QUESTIONS || []).filter(function (q) { return validQ(q) && (id === 'league' || q.topic === id); }); }
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
      if (x.hasAttribute('data-opt')) return answer(+x.getAttribute('data-opt'), x.getAttribute('data-move'));
      if (x.hasAttribute('data-region')) return tryRegion(x.getAttribute('data-region'));
      if (x.hasAttribute('data-node')) return tryRegion(x.getAttribute('data-node'));
      if (x.hasAttribute('data-npc')) return tryTalk(x.getAttribute('data-npc'));
      if (x.hasAttribute('data-talk-next')) return dlgNext();
      if (x.hasAttribute('data-talk-close')) return leaveTalk();
      if (x.hasAttribute('data-dir')) return movePlayer(x.getAttribute('data-dir'));
      if (x.hasAttribute('data-interact')) return interact();
      if (x.hasAttribute('data-reset-pos')) return resetPosition();
      if (x.hasAttribute('data-boss')) return bossIntro(x.getAttribute('data-boss'));
      if (x.hasAttribute('data-boss-next')) return bossIntroNext();
      if (x.hasAttribute('data-league')) return region('league');
      if (x.hasAttribute('data-next')) return next();
      if (x.hasAttribute('data-landing')) return landing();
      if (x.hasAttribute('data-retry')) return start(x.getAttribute('data-retry'));
      if (x.hasAttribute('data-potion')) return usePotion();
    };
  }
  function close() { var el = document.getElementById('rpgOverlay'); if (el) el.remove(); }

  function nodeDistance(pos, id) { var n = MAP_NODES[id]; return Math.abs(pos.x - n.x) + Math.abs(pos.y - n.y); }
  function nearestRegion(d) { var best = null; BOSSES.forEach(function (b) { var dist = nodeDistance(d.pos, b.id); if (!best || dist < best.dist) best = { boss: b, dist: dist }; }); return best; }
  function canEnter(d, id) { return nodeDistance(d.pos, id) <= 1; }
  function bossAt(x, y) { for (var i = 0; i < BOSSES.length; i++) { var b = BOSSES[i], n = MAP_NODES[b.id]; if (n.x === x && n.y === y) return b; } return null; }
  function tileType(x, y) {
    if (bossAt(x, y)) return 'region';
    if (npcAt(x, y)) return 'npc';
    var bl = blockerAt(x, y);
    if (bl) return load().badges[bl.needs] ? 'path' : 'fence'; // open = walkable road, closed = fence
    return LEGEND[charAt(x, y)]; // always defined; unknown chars default to grass
  }
  function passable(x, y) {
    if (x < 0 || y < 0 || x >= MAP_W || y >= MAP_H) return false;
    var t = tileType(x, y);
    return ['path', 'grass', 'flower', 'book', 'sign', 'well', 'pathlamp', 'ledger-stone', 'region', 'mushroom', 'flowerbed'].indexOf(t) >= 0;
  }
  function adjacentNpc(d) { var best = null; for (var k in NPCS) { if (!NPCS.hasOwnProperty(k)) continue; var n = NPCS[k]; var dist = Math.abs(d.pos.x - n.x) + Math.abs(d.pos.y - n.y); if (dist <= 1 && (!best || dist < best.dist)) best = { id: k, dist: dist }; } return best; }
  var TILE_VARIANTS = {
    grass: [1, 2, 3], flower: [1, 2, 3],
    tree: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 7, 9],   // all 10 species, lightly weighted
    house: [1, 2, 3], market: [2, 1, 3],
    rock: [1, 2, 3, 4, 5, 6, 7, 8],
    pond: [1, 2, 3, 4, 5], barrel: [1, 2, 3, 4],
    bush: [1, 2, 3, 4], mushroom: [1, 2, 3],
    crop: [1, 2, 3], flowerbed: [1, 2, 3],
    'factory-wall': [1, 2, 3, 4]
  };
  function tileVariant(t, x, y) { var v = TILE_VARIANTS[t]; return v ? ' rpg-v' + v[(x * 31 + y * 17) % v.length] : ''; }
  function tileHtml(x, y, d, c) {
    var here = d.pos.x === x && d.pos.y === y;
    var b = bossAt(x, y);
    var npc = npcAt(x, y);
    var bl = blockerAt(x, y);
    var blocked = bl && !d.badges[bl.needs];
    var t = tileType(x, y);
    var shape = (t === 'path') ? ' rpg-path-' + roadShape(x, y) + ' rpg-pv' + (((x * 7 + y * 13) % 3) + 1) : tileVariant(t, x, y);
    var cls = 'rpg-tile rpg-tile-' + t + shape + (here ? ' rpg-player-tile' : '') + (blocked ? ' rpg-locked' : '') + (b && d.badges[b.id] ? ' cleared' : '');
    var attr = b ? ' data-node="' + b.id + '"' : (npc ? ' data-npc="' + npc.id + '"' : '');
    var aria = npc ? 'Talk to ' + esc(npc.name) : (b ? esc(MAP_NODES[b.id].short) + ' entrance' : (blocked ? 'Locked route — earn the ' + esc(bl.label) + ' first' : 'Map tile ' + x + ',' + y));
    var label = b ? '<span class="rpg-location-label">' + esc(MAP_NODES[b.id].short) + '</span>'
      : (npc ? '<span class="rpg-location-label rpg-npc-label">' + esc(npc.tag) + '</span>'
      : (blocked ? '<span class="rpg-location-label rpg-lock-label">🔒 ' + esc(bl.label) + '</span>' : ''));
    var contents = '<span class="rpg-tile-art" aria-hidden="true"></span>' + label;
    if (npc) contents += '<span class="rpg-npc-sprite" data-mon="' + esc(npc.mon) + '" data-dir="' + esc((d.npcDir && d.npcDir[npc.id]) || 'down') + '" aria-hidden="true"></span>';
    if (here) contents += '<span class="rpg-player-sprite" data-dir="' + esc(d.dir || 'down') + '" data-step="' + (((x + y) % 2) ? 'b' : 'a') + '" aria-label="Player"></span>';
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
  function adjacentBlocker(d) {
    var dirs = [[0, -1], [0, 1], [-1, 0], [1, 0]];
    for (var i = 0; i < dirs.length; i++) { var bl = blockerAt(d.pos.x + dirs[i][0], d.pos.y + dirs[i][1]); if (bl && !d.badges[bl.needs]) return bl; }
    return null;
  }
  function worldPrompt(d, message) {
    if (message) return message;
    var np = adjacentNpc(d);
    if (np) return NPCS[np.id].name + ' is beside you. Press Interact to talk.';
    var near = nearestRegion(d);
    if (near && near.dist <= 1) return 'You are close to ' + near.boss.region + '. Press Interact to enter.';
    var lock = adjacentBlocker(d);
    if (lock) return 'The way ahead is locked — earn the ' + lock.label + ' first.';
    return 'Follow the route with the arrows or D-pad. Clear each region to advance.';
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
    var c = fighter();
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
    if (dlg) return;                 // movement is locked while an NPC textbox is open
    var d = load();
    var dx = 0, dy = 0;
    if (dir === 'up') dy = -1; if (dir === 'down') dy = 1; if (dir === 'left') dx = -1; if (dir === 'right') dx = 1;
    var nx = d.pos.x + dx, ny = d.pos.y + dy;
    if (!passable(nx, ny)) { d.dir = dir; save(d); moveRender(d, [], 'That way is blocked — follow the open path.'); return; }
    var oldPlayer = { x: d.pos.x, y: d.pos.y };
    d.dir = dir;
    d.pos = { x: nx, y: ny }; save(d);
    moveRender(d, [oldPlayer, { x: nx, y: ny }]);
  }
  function interact() {
    if (dlg) return;                 // the textbox handles its own advance/close
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
  function resetPosition() { var d = load(); d.pos = { x: START_POS.x, y: START_POS.y }; d.dir = 'down'; save(d); landing(d, 'Player returned to the start of the route.'); cameraSoon(); }

  // NPC dialogue shows as an old-Final-Fantasy floating textbox at the bottom of
  // the screen, layered over the still-visible world map (not a fullscreen panel).
  function talk(id) {
    var n = NPCS[id]; if (!n) return;
    var d = load();
    if (!document.querySelector('.rpg-world')) landing(d); // make sure the map is shown behind the box
    // turn the NPC to face the player, then repaint just that tile so it looks over
    var dir = faceDir(n.x, n.y, d.pos.x, d.pos.y);
    if (d.npcDir[id] !== dir) { d.npcDir[id] = dir; save(d); moveRender(d, [{ x: n.x, y: n.y }]); }
    dlg = { id: id, i: 0 };
    renderTextbox();
  }
  // direction from (fx,fy) toward (tx,ty); vertical wins ties, defaults to down
  function faceDir(fx, fy, tx, ty) {
    var dx = tx - fx, dy = ty - fy;
    if (Math.abs(dy) >= Math.abs(dx)) return dy < 0 ? 'up' : 'down';
    return dx < 0 ? 'left' : 'right';
  }
  function dlgNext() {
    if (!dlg) return; var n = NPCS[dlg.id]; if (!n) return closeTextbox();
    if (dlg.i + 1 < n.lines.length) { dlg.i++; return renderTextbox(); }
    finishTalk(n);
  }
  function closeTextbox() { dlg = null; var box = document.getElementById('rpgTextbox'); if (box) box.remove(); }
  function setWorldMessage(msg) {
    var overlay = document.getElementById('rpgOverlay');
    var el = overlay && overlay.querySelector('.rpg-map-message');
    if (el) el.textContent = msg; else landing(load(), msg);
  }
  function leaveTalk() { closeTextbox(); setWorldMessage(worldPrompt(load())); }
  function finishTalk(n) {
    var d = load(), msg = 'You finished talking to ' + n.name + '.';
    d.metNpcs[dlg.id] = true;
    if (n.gift === 'potion' && !d.gifts[dlg.id]) {
      d.gifts[dlg.id] = true;
      d.inventory.potion = Math.min(9, (d.inventory.potion || 0) + 1);
      msg = n.name + ' gave you a Potion! You now carry ' + d.inventory.potion + '.';
    }
    save(d); closeTextbox(); setWorldMessage(msg);
  }
  function renderTextbox() {
    if (!dlg) return;
    var n = NPCS[dlg.id]; if (!n) return closeTextbox();
    var overlay = document.getElementById('rpgOverlay'); if (!overlay) return;
    var line = n.lines[dlg.i], last = dlg.i + 1 >= n.lines.length;
    var box = document.getElementById('rpgTextbox');
    if (!box) { box = document.createElement('div'); box.id = 'rpgTextbox'; box.className = 'rpg-textbox'; box.setAttribute('role', 'dialog'); box.setAttribute('aria-label', 'Conversation with ' + n.name); overlay.appendChild(box); }
    box.innerHTML = '<div class="rpg-textbox-inner">'
      + '<span class="rpg-textbox-portrait" data-mon="' + esc(n.mon) + '" aria-hidden="true"></span>'
      + '<div class="rpg-textbox-body"><div class="rpg-textbox-name">' + esc(n.name) + '</div><div class="rpg-textbox-line">' + esc(line) + '</div></div>'
      + '<div class="rpg-textbox-controls"><span class="rpg-textbox-progress">' + (dlg.i + 1) + '/' + n.lines.length + '</span>'
      + '<button class="rpg-textbox-next" data-talk-next type="button">' + (last ? 'Done ✓' : 'Next ▸') + '</button>'
      + '<button class="rpg-textbox-leave" data-talk-close type="button" aria-label="Leave conversation">✕</button></div></div>';
  }

  function landing(forcedData, message) {
    dlg = null;
    var d = normalise(forcedData || load()), c = fighter();
    var badges = BOSSES.map(function (b) { return '<span class="rpg-badge ' + (d.badges[b.id] ? 'earned' : '') + '">' + (d.badges[b.id] ? '🏅 ' : '⚪ ') + esc(b.badge) + '</span>'; }).join('');
    var champ = BOSSES.every(function (b) { return d.badges[b.id]; });
    var leagueCta = champ ? '<button class="rpg-league-cta ' + (d.completed ? 'done' : '') + '" data-league type="button">🎓 Enter the Synoptic League' + (d.completed ? ' · Champion 👑' : '') + '</button>' : '';
    var prompt = worldPrompt(d, message);
    mount('<section class="rpg-panel rpg-world" role="dialog" aria-modal="true"><button class="rpg-close" data-close type="button">×</button><div class="rpg-world-head"><div><h2>Ledger Legends</h2><p>Follow the winding route through four topic regions — Forest, Cavern, Factory and Town. Chat with the townsfolk for exam tips, then clear each region\'s boss to unlock the gate to the next and collect every badge before the Synoptic League.</p></div><div class="rpg-trainer-card"><span class="rpg-companion" data-mon="' + c.id + '"></span><strong>' + esc(c.name) + '</strong><small>Lv ' + lvl(d.xp) + ' · ' + d.xp + ' XP</small><small class="rpg-pos">Position ' + d.pos.x + ',' + d.pos.y + '</small></div></div><div class="rpg-badges">' + badges + '</div>' + leagueCta + '<div class="rpg-map-layout"><div class="rpg-pixel-map-wrap"><div class="rpg-pixel-map" role="grid" aria-label="Ledger Legends world map" style="--rpg-cols:' + MAP_W + '">' + mapHtml(d, c) + '</div></div><div class="rpg-map-side"><div class="rpg-map-message">' + esc(prompt) + '</div><div class="rpg-controls" aria-label="Movement controls"><span></span><button type="button" data-dir="up" aria-label="Move up">▲</button><span></span><button type="button" data-dir="left" aria-label="Move left">◀</button><button type="button" data-interact>INTERACT</button><button type="button" data-dir="right" aria-label="Move right">▶</button><span></span><button type="button" data-dir="down" aria-label="Move down">▼</button><span></span></div><button class="rpg-secondary" data-reset-pos type="button">Return to start</button><p class="rpg-note">Keyboard: arrows or WASD to walk; Enter or Space to interact. Talk to the townsfolk (name tags) for study tips. The camera follows your player.</p></div></div></section>');
    centerNow();   // snap the camera onto the player before the first paint
    cameraSoon();  // safety re-centre once late layout (fonts/grid) settles
  }

  function region(id) {
    var d = load(), b = boss(id), c = fighter(), count = qs(id).length;
    var wildLine = b.wildKey ? '<p class="rpg-wild-row"><span class="rpg-wild" data-wild="' + esc(b.wildKey) + '" aria-hidden="true"></span><span><strong>Wild encounter:</strong> A ' + esc(b.wild) + ' skulks the route.</span></p>' : '';
    mount('<section class="rpg-panel rpg-region" role="dialog" aria-modal="true"><button class="rpg-close" data-close type="button">×</button><div class="rpg-region-hero rpg-region-' + esc(b.scene) + '"><span class="rpg-region-art"></span><div><h2>' + esc(b.region) + '</h2><p>' + esc(b.desc) + '</p></div></div><div class="rpg-encounter">' + wildLine + '<p><strong>Region boss:</strong> ' + b.icon + ' ' + esc(b.name) + ' guards the ' + esc(b.badge) + '.</p><p><strong>You fight as:</strong> ' + c.icon + ' ' + esc(c.name) + ', Lv ' + lvl(d.xp) + '.</p><p><strong>Question pool:</strong> ' + count + ' eligible questions.</p></div><div class="rpg-actions"><button class="rpg-next" data-boss="' + b.id + '" type="button">Challenge ' + esc(b.name) + '</button><button class="rpg-secondary" data-landing type="button">Back to world map</button></div></section>');
  }

  function start(id) {
    var d = load(), c = fighter(), b = boss(id), pool = qs(id); if (!pool.length) return;
    var php = 34 + Math.min(12, lvl(d.xp) - 1);   // capped: battles stay a challenge as you level
    st = { b: b, c: c, deck: shuffle(pool).slice(0, Math.min(b.deck || LEN, pool.length)).map(present), i: 0,
      player: php, maxP: php, enemy: b.hp || 34, maxE: b.hp || 34,
      need: b.need || 4, counter: b.counter || 8, trait: b.trait || '', shield: (b.trait === 'aegis' ? 10 : 0), enrage: 0,
      answered: null, move: '', streak: 0, res: [],
      log: (b.wild ? ['A wild ' + b.wild + ' appeared.'] : []).concat([b.name + ' rises to challenge you.']) };
    battle();
  }
  function bar(v, m) { return '<div class="rpg-hp"><span style="width:' + Math.max(0, Math.min(100, v / m * 100)) + '%"></span></div>'; }
  function over() { return st.player <= 0 || st.enemy <= 0 || st.i + 1 >= st.deck.length; }
  function moveName(strong) { return strong ? st.c.move2 : st.c.move1; }
  function damage(ok, strong) {
    if (!ok) return 0;
    var base = strong ? 13 + Math.min(4, st.streak) : 8 + Math.min(3, st.streak);
    if ((st.trait === 'armored' || st.trait === 'grand') && !strong) base = Math.ceil(base / 2); // shrug off quick hits
    return base;
  }

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
    if (ok) {
      st.streak++; var dmg = damage(true, strong);
      if (st.shield > 0) { var absorbed = Math.min(st.shield, dmg); st.shield -= absorbed; dmg -= absorbed; if (absorbed) st.log.unshift(st.b.name + "'s seal absorbed " + absorbed + ' damage.'); }
      st.enemy = Math.max(0, st.enemy - dmg);
      st.log.unshift(st.c.name + ' used ' + st.move + '. It dealt ' + dmg + ' damage.');
    } else {
      st.streak = 0; var hit = st.counter + st.enrage; st.player = Math.max(0, st.player - hit);
      if (st.trait === 'enrage') st.enrage += 2;
      st.log.unshift(st.b.name + ' countered. ' + st.c.name + ' took ' + hit + ' damage.');
    }
    st.res.push({ q: q.q, ok: ok, correct: q.opts[q.ans], exp: q.exp, move: st.move });
    battle();
  }
  function next() {
    if (over()) return result();
    st.i++; st.answered = null;
    if ((st.trait === 'regen' || st.trait === 'grand') && st.enemy > 0) {
      var before = st.enemy; st.enemy = Math.min(st.maxE, st.enemy + 3);
      if (st.enemy > before) st.log.unshift(st.b.name + ' regenerated ' + (st.enemy - before) + ' HP.');
    }
    battle();
  }

  function result() {
    var n = st.res.filter(function (r) { return r.ok; }).length, won = st.enemy <= 0 || (st.player > 0 && n >= (st.need || 4));
    var isLeague = st.b.id === 'league';
    var idx = BOSSES.map(function (b) { return b.id; }).indexOf(st.b.id);
    var xpGain = won ? (isLeague ? 100 : 40 + Math.max(0, idx) * 10) : 15;
    var d = load(); d.xp += xpGain; d.wins[st.b.id] = (d.wins[st.b.id] || 0) + (won ? 1 : 0);
    if (won) { if (isLeague) d.completed = true; else d.badges[st.b.id] = true; }
    d.inventory.potion = Math.min(9, (d.inventory.potion || 0) + 1); save(d);
    var review = st.res.map(function (r, i) { return '<details class="rpg-review-item ' + (r.ok ? 'ok' : 'bad') + '"><summary>Turn ' + (i + 1) + ' · ' + esc(r.move) + ' · ' + (r.ok ? 'Hit' : 'Miss') + '</summary><p><strong>' + esc(r.q) + '</strong></p><p>Correct: ' + esc(r.correct) + '</p><p><em>' + esc(r.exp) + '</em></p></details>'; }).join('');
    if (won && isLeague) {
      mount('<section class="rpg-panel rpg-result rpg-champion" role="dialog" aria-modal="true"><button class="rpg-close" data-close type="button">×</button><div class="rpg-hero-icon">🎓👑</div><h2>Synoptic League Champion!</h2><p>You bested the Grand Reckoner ' + n + '/' + st.deck.length + ' and hold all four badges. The record is yours — you are ready for the real Synoptic assessment.</p><div class="rpg-profile"><span>' + esc(st.c.name) + ' Lv ' + lvl(d.xp) + '</span><span>Total XP ' + d.xp + '</span><span>🏅 4/4 badges + Crown</span></div><div class="rpg-actions"><button class="rpg-next" data-retry="league" type="button">Fight again</button><button class="rpg-secondary" data-landing type="button">World map</button></div><div class="rpg-review">' + review + '</div></section>');
      return;
    }
    var title = won ? (isLeague ? 'The Reckoner endures' : esc(st.b.badge) + ' earned') : 'You escaped to revise';
    mount('<section class="rpg-panel rpg-result" role="dialog" aria-modal="true"><button class="rpg-close" data-close type="button">×</button><div class="rpg-hero-icon">' + (won ? '🏆' : '🛡️') + '</div><h2>' + title + '</h2><p>' + esc(st.b.name) + ': ' + n + '/' + st.deck.length + ' correct · +' + xpGain + ' XP · Potion found.</p><div class="rpg-profile"><span>' + esc(st.c.name) + ' Lv ' + lvl(d.xp) + '</span><span>Total XP ' + d.xp + '</span><span>' + Object.keys(d.badges).length + '/4 badges</span></div><div class="rpg-actions"><button class="rpg-next" data-retry="' + st.b.id + '" type="button">Rematch boss</button><button class="rpg-secondary" data-landing type="button">World map</button></div><div class="rpg-review">' + review + '</div></section>');
  }

  // --- pre-battle boss cutscene: menacing dialogue in each boss's own voice ---
  function bossIntro(id) { dlgBoss = { id: id, i: 0 }; renderBossIntro(); }
  function bossIntroNext() {
    if (!dlgBoss) return; var b = boss(dlgBoss.id);
    if (dlgBoss.i + 1 < b.lines.length) { dlgBoss.i++; return renderBossIntro(); }
    var id = dlgBoss.id; dlgBoss = null; start(id);
  }
  function renderBossIntro() {
    if (!dlgBoss) return; var b = boss(dlgBoss.id);
    var line = b.lines[dlgBoss.i], last = dlgBoss.i + 1 >= b.lines.length;
    mount('<section class="rpg-panel rpg-boss-intro" role="dialog" aria-modal="true" aria-label="' + esc(b.name) + ' confronts you"><button class="rpg-close" data-close type="button">×</button>'
      + '<div class="rpg-backdrop rpg-backdrop-' + esc(b.scene) + '"></div>'
      + '<div class="rpg-boss-intro-inner"><div class="rpg-sprite enemy rpg-boss-portrait" data-mon="' + esc(b.id) + '" aria-hidden="true"></div>'
      + '<div class="rpg-boss-name">' + b.icon + ' ' + esc(b.name) + '</div>'
      + '<div class="rpg-boss-line">“' + esc(line) + '”</div>'
      + '<div class="rpg-actions"><button class="rpg-next" data-boss-next type="button">' + (last ? 'Begin battle ⚔️' : 'Next ▸') + '</button>'
      + '<button class="rpg-secondary" data-landing type="button">Flee</button></div>'
      + '<div class="rpg-boss-progress">' + (dlgBoss.i + 1) + '/' + b.lines.length + '</div></div></section>');
  }

  document.addEventListener('keydown', function (e) {
    if (!document.getElementById('rpgOverlay')) return;
    if (dlg) {   // an NPC textbox is open: Enter/Space advances, Escape leaves, movement is ignored
      if (e.key === 'Escape') { e.preventDefault(); return leaveTalk(); }
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); return dlgNext(); }
      return;
    }
    if (dlgBoss) {   // boss cutscene: Enter/Space advances to the battle, Escape flees
      if (e.key === 'Escape') { e.preventDefault(); dlgBoss = null; return landing(load()); }
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); return bossIntroNext(); }
      return;
    }
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
