/* Ledger Legends — small standalone RPG battle demo for AAT practice. */
(function () {
  'use strict';

  var KEY = 'aatRpgDemo_v1';
  var LEN = 5;
  var bosses = [
    ['itbk', '🐉', 'Ledger Drake', 'Ledger Forest'],
    ['pobc', '🪨', 'Reconciliation Golem', 'Control Cavern'],
    ['poc', '🧪', 'Costing Chimera', 'Costing Factory'],
    ['besy', '🦅', 'Enterprise Griffin', 'Enterprise Town']
  ];
  var s = null;

  function esc(x) { return String(x == null ? '' : x).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function data() { try { return JSON.parse(localStorage.getItem(KEY) || '{"xp":0,"wins":{}}'); } catch (e) { return { xp: 0, wins: {} }; } }
  function save(d) { try { localStorage.setItem(KEY, JSON.stringify(d)); } catch (e) {} }
  function boss(id) { return bosses.filter(function (b) { return b[0] === id; })[0] || bosses[0]; }
  function qs(id) { return (window.ALL_QUESTIONS || []).filter(function (q) { return q.topic === id && Array.isArray(q.opts) && q.opts.length >= 4 && typeof q.ans === 'number'; }); }
  function present(q) { var ord = shuffle(q.opts.map(function (_, i) { return i; })); return { q: q.q, topic: q.topic, opts: ord.map(function (i) { return q.opts[i]; }), ans: ord.indexOf(q.ans), exp: q.exp || '' }; }
  function level(xp) { return Math.max(1, Math.floor(Math.sqrt((xp || 0) / 35)) + 1); }

  function inject() {
    if ((document.body.getAttribute('data-subject') || 'aat') !== 'aat') return;
    var grid = document.querySelector('.mode-card-grid');
    if (!grid || document.getElementById('rpgDemoBtn')) return;
    var b = document.createElement('button');
    b.id = 'rpgDemoBtn';
    b.type = 'button';
    b.className = 'mode-card mode-rpg';
    b.innerHTML = '<span class="mode-card-icon" aria-hidden="true">🐉</span><div class="mode-card-info"><div class="mode-card-title">Ledger Legends</div><div class="mode-card-desc">Demo RPG battle · 5 questions</div></div>';
    b.onclick = landing;
    grid.insertBefore(b, grid.firstChild);
  }

  function mount(html) {
    var old = document.getElementById('rpgOverlay');
    if (old) old.remove();
    var el = document.createElement('div');
    el.id = 'rpgOverlay';
    el.className = 'rpg-overlay';
    el.innerHTML = html;
    document.body.appendChild(el);
    el.querySelectorAll('[data-close]').forEach(function (x) { x.onclick = close; });
    el.querySelectorAll('[data-boss]').forEach(function (x) { x.onclick = function () { start(x.getAttribute('data-boss')); }; });
    el.querySelectorAll('[data-opt]').forEach(function (x) { x.onclick = function () { answer(+x.getAttribute('data-opt')); }; });
    var n = el.querySelector('[data-next]'); if (n) n.onclick = next;
    var l = el.querySelector('[data-landing]'); if (l) l.onclick = landing;
    var r = el.querySelector('[data-retry]'); if (r) r.onclick = function () { start(r.getAttribute('data-retry')); };
  }
  function close() { var el = document.getElementById('rpgOverlay'); if (el) el.remove(); }

  function landing() {
    var p = data();
    var cards = bosses.map(function (b) {
      return '<button class="rpg-boss-card" type="button" data-boss="' + b[0] + '"><span class="rpg-boss-icon">' + b[1] + '</span><strong>' + esc(b[2]) + (p.wins && p.wins[b[0]] ? ' ✓' : '') + '</strong><span>' + esc(b[3]) + '</span><small>' + qs(b[0]).length + ' eligible questions</small></button>';
    }).join('');
    mount('<section class="rpg-panel" role="dialog" aria-modal="true"><button class="rpg-close" data-close type="button">×</button><div class="rpg-hero-icon">🐣</div><h2>Ledger Legends</h2><p>A small RPG demo for AAT revision. Choose a boss, answer five real AAT questions, and reduce its HP before Audit Cub is defeated.</p><div class="rpg-profile"><span>Audit Cub · Level ' + level(p.xp) + '</span><span>' + p.xp + ' XP</span><span>' + Object.keys(p.wins || {}).length + '/4 wins</span></div><div class="rpg-boss-grid">' + cards + '</div></section>');
  }

  function start(id) {
    var b = boss(id), pool = qs(id);
    if (!pool.length) return;
    s = { b: b, deck: shuffle(pool).slice(0, Math.min(LEN, pool.length)).map(present), i: 0, player: 30, enemy: 30, answered: null, streak: 0, res: [] };
    battle();
  }

  function bar(v) { return '<div class="rpg-hp"><span style="width:' + Math.max(0, Math.min(100, v / 30 * 100)) + '%"></span></div>'; }
  function over() { return s.player <= 0 || s.enemy <= 0 || s.i + 1 >= s.deck.length; }

  function battle() {
    var q = s.deck[s.i], done = s.answered !== null;
    var opts = q.opts.map(function (o, i) {
      var c = done && i === q.ans ? ' correct' : done && i === s.answered ? ' wrong' : '';
      return '<button class="rpg-option' + c + '" data-opt="' + i + '" type="button" ' + (done ? 'disabled' : '') + '><b>' + String.fromCharCode(65 + i) + '</b> ' + esc(o) + '</button>';
    }).join('');
    var fb = done ? '<div class="rpg-feedback"><strong>' + (s.answered === q.ans ? 'Hit landed.' : 'Attack missed.') + '</strong><br>' + (s.answered === q.ans ? '' : 'Correct: ' + esc(q.opts[q.ans]) + '<br>') + '<em>' + esc(q.exp) + '</em></div><button class="rpg-next" data-next type="button">' + (over() ? 'View result' : 'Next turn') + ' →</button>' : '';
    mount('<section class="rpg-panel rpg-battle" role="dialog" aria-modal="true"><button class="rpg-close" data-close type="button">×</button><div class="rpg-fighters"><div><div class="rpg-sprite">🐣</div><strong>Audit Cub</strong>' + bar(s.player) + '<small>' + s.player + '/30 HP</small></div><div class="rpg-vs">VS</div><div><div class="rpg-sprite">' + s.b[1] + '</div><strong>' + esc(s.b[2]) + '</strong>' + bar(s.enemy) + '<small>' + s.enemy + '/30 HP</small></div></div><p class="rpg-meta">Turn ' + (s.i + 1) + '/' + s.deck.length + ' · Streak ' + s.streak + '</p><h2 class="rpg-question">' + esc(q.q) + '</h2><div class="rpg-options">' + opts + '</div>' + fb + '</section>');
  }

  function answer(i) {
    if (!s || s.answered !== null) return;
    var q = s.deck[s.i], ok = i === q.ans;
    s.answered = i;
    if (ok) { s.streak++; s.enemy = Math.max(0, s.enemy - (s.streak >= 3 ? 12 : 8)); } else { s.streak = 0; s.player = Math.max(0, s.player - 7); }
    s.res.push({ q: q.q, ok: ok, correct: q.opts[q.ans], exp: q.exp });
    battle();
  }
  function next() { if (over()) return result(); s.i++; s.answered = null; battle(); }

  function result() {
    var n = s.res.filter(function (r) { return r.ok; }).length;
    var won = s.enemy <= 0 || (s.player > 0 && n >= 4);
    var p = data(); p.xp = (p.xp || 0) + (won ? 35 : 12); p.wins = p.wins || {}; if (won) p.wins[s.b[0]] = Date.now(); save(p);
    var review = s.res.map(function (r, i) { return '<details><summary>Q' + (i + 1) + ' · ' + (r.ok ? 'Correct' : 'Incorrect') + '</summary><p><strong>' + esc(r.q) + '</strong></p><p>Correct: ' + esc(r.correct) + '</p><p><em>' + esc(r.exp) + '</em></p></details>'; }).join('');
    mount('<section class="rpg-panel rpg-result" role="dialog" aria-modal="true"><button class="rpg-close" data-close type="button">×</button><div class="rpg-hero-icon">' + (won ? '🏆' : '🛡️') + '</div><h2>' + (won ? 'Boss defeated' : 'Battle complete') + '</h2><p>' + esc(s.b[2]) + ': ' + n + '/' + s.deck.length + ' correct · +' + (won ? 35 : 12) + ' XP</p><div class="rpg-profile"><span>Total XP ' + p.xp + '</span><span>Level ' + level(p.xp) + '</span><span>' + Object.keys(p.wins || {}).length + '/4 wins</span></div><div class="rpg-actions"><button class="rpg-next" data-retry="' + s.b[0] + '" type="button">Retry boss</button><button class="rpg-secondary" data-landing type="button">Choose another boss</button></div><div class="rpg-review">' + review + '</div></section>');
  }

  function init() { inject(); var app = document.getElementById('app'); if (app && window.MutationObserver) new MutationObserver(inject).observe(app, { childList: true, subtree: true }); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
}());
