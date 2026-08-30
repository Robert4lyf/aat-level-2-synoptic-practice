#!/usr/bin/env node
/**
 * Fifty and a hundred in a row, marked differently on each of the three levels.
 *
 * TWO CLAIMS, AND THEY FAIL DIFFERENTLY. That the milestone FIRES — at fifty,
 * at a hundred, exactly once each, only in an endless run — is behaviour, and
 * is driven through the real players here. That each level's celebration LOOKS
 * like its own is appearance, and lives entirely in the three stylesheets; a
 * check that only counted overlays would pass against three identical ones,
 * which is precisely the requirement not being met. So the CSS is read.
 *
 * The scroll-to-the-advance-button is checked here too, because it belongs to
 * the same moment: the repaint that grades an answer is the one that should
 * move the page, and no other.
 *
 * Run: node scripts/check-streak-milestones.js
 */
'use strict';

const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');

const RED = '\x1b[31m', GREEN = '\x1b[32m';
const BOLD = '\x1b[1m', DIM = '\x1b[2m', RESET = '\x1b[0m';

let failures = 0, checks = 0;
function ok(cond, label) {
  checks++;
  if (!cond) { failures++; console.log(`  ${RED}✗${RESET} ${label}`); }
}

console.log(`${BOLD}Endless streak milestones${RESET}\n`);

/* ── A DOM stub, only as far as celebrate.js reaches into one ──────────────── */
const made = [];
function El(tag) {
  this.tag = tag; this.className = ''; this.textContent = '';
  this.children = []; this.attrs = {};
  const self = this;
  this.style = { _p: {}, setProperty(k, v) { self.style._p[k] = v; } };
}
El.prototype.setAttribute = function (k, v) { this.attrs[k] = v; };
El.prototype.appendChild = function (c) { this.children.push(c); return c; };
El.prototype.removeChild = function (c) { this.children = this.children.filter(x => x !== c); return c; };
const body = new El('body');
global.document = {
  body,
  createElement(tag) { const e = new El(tag); made.push(e); return e; },
  createDocumentFragment() { const f = new El('#fragment'); f._isFrag = true; return f; },
};
body.parentNode = null;
/* appendChild on the body records a parent so clear() can detach it. */
const realAppend = El.prototype.appendChild;
El.prototype.appendChild = function (c) {
  if (c._isFrag) { c.children.forEach(k => { k.parentNode = this; this.children.push(k); }); return c; }
  c.parentNode = this; return realAppend.call(this, c);
};
global.matchMedia = () => ({ matches: false });

require(path.join(ROOT, 'celebrate.js'));
const Cel = global.AATCelebrate;

function overlays() { return body.children.filter(c => /(^| )aat-cel( |$)/.test(c.className)); }

/* ── 1. The helper itself ─────────────────────────────────────────────────── */
console.log(`${DIM}the overlay${RESET}`);

ok(!!Cel && typeof Cel.fire === 'function', 'celebrate.js exports a fire()');
ok(Array.isArray(Cel.AT) && Cel.AT.length === 2, 'it names the milestones in one place');
ok(Cel.AT.indexOf(50) !== -1 && Cel.AT.indexOf(100) !== -1, 'and they are 50 and 100');

Cel.clear();
const w50 = Cel.fire('a3', 50, '50 in a row');
ok(!!w50, 'firing returns an overlay');
ok(/aat-cel-a3/.test(w50.className) && /aat-cel-50/.test(w50.className),
  `the overlay is keyed by level AND milestone (got "${w50.className}")`);
const banner = w50.children.find(c => c.className === 'aat-cel-t');
ok(!!banner, 'it carries a banner');
ok(banner && banner.textContent === '50 in a row', 'saying which milestone was reached');
ok(banner && banner.attrs['role'] === 'status',
  'in a live region, so it is announced rather than only drawn');
ok(w50.children.filter(c => c.className === 'aat-cel-p').length === Cel.PIECES[50],
  `fifty draws ${Cel.PIECES[50]} pieces`);

const w100 = Cel.fire('a3', 100, '100 in a row');
ok(overlays().length === 1, 'a second firing replaces the first rather than stacking on it');
ok(w100.children.filter(c => c.className === 'aat-cel-p').length === Cel.PIECES[100],
  'and a hundred draws more of them than fifty does');
ok(Cel.PIECES[100] > Cel.PIECES[50], 'because a hundred is the bigger milestone');
Cel.clear();
ok(overlays().length === 0, 'clearing removes it from the page');

/* Motion removed, meaning kept. */
global.matchMedia = () => ({ matches: true });
const quiet = Cel.fire('a1', 50, '50 in a row');
ok(quiet.children.filter(c => c.className === 'aat-cel-p').length === 0,
  'under prefers-reduced-motion no pieces are drawn');
ok(quiet.children.some(c => c.className === 'aat-cel-t'),
  'but the banner still says what was reached');
Cel.clear();
global.matchMedia = () => ({ matches: false });

/* ── 2. Each level's celebration is its own ───────────────────────────────── */
console.log(`${DIM}three looks, not one${RESET}`);

const SHEETS = {
  a1: fs.readFileSync(path.join(ROOT, 'aat1-styles.css'), 'utf8'),
  aat: fs.readFileSync(path.join(ROOT, 'styles.css'), 'utf8'),
  a3: fs.readFileSync(path.join(ROOT, 'aat3-styles.css'), 'utf8'),
};
const THEMES = ['a1', 'aat', 'a3'];

/* Every level must style both of its milestones, or a reader on that level
   reaches a hundred and sees a banner over an empty screen. */
THEMES.forEach(t => {
  [50, 100].forEach(m => {
    ok(SHEETS[t].indexOf(`aat-cel-${t}.aat-cel-${m}`) !== -1,
      `${t} styles its ${m} celebration`);
  });
});

/* And the six must not be the same thing six times. Each is identified by the
   keyframe animations it runs; two celebrations sharing an animation name are
   the same celebration with a different label on it. */
function animsFor(t, m) {
  const sheet = SHEETS[t];
  const out = new Set();
  const re = new RegExp(`aat-cel-${t}\\.aat-cel-${m}[^{]*\\{[^}]*\\}`, 'g');
  let hit;
  while ((hit = re.exec(sheet))) {
    const a = /animation:\s*([a-z0-9-]+)/i.exec(hit[0]);
    if (a) out.add(a[1]);
  }
  return out;
}
const anims = {};
THEMES.forEach(t => [50, 100].forEach(m => { anims[t + '-' + m] = animsFor(t, m); }));
Object.keys(anims).forEach(k => ok(anims[k].size > 0, `${k} runs an animation of its own`));

const keys = Object.keys(anims);
for (let i = 0; i < keys.length; i++) {
  for (let j = i + 1; j < keys.length; j++) {
    const a = anims[keys[i]], b = anims[keys[j]];
    const shared = [...a].filter(x => b.has(x));
    ok(shared.length === 0,
      `${keys[i]} and ${keys[j]} do not share an animation (${shared.join(',') || 'none'})`);
  }
}

/* An animation named in a rule but never defined is a celebration that does
   nothing at all — the shape of defect a class-name check sails past. */
THEMES.forEach(t => {
  const all = new Set([...anims[t + '-50'], ...anims[t + '-100']]);
  all.forEach(name => {
    const defined = SHEETS[t].indexOf('@keyframes ' + name) !== -1 ||
                    SHEETS.aat.indexOf('@keyframes ' + name) !== -1;
    ok(defined, `${t}: the keyframes for ${name} are actually defined`);
  });
});

/* ── 3. It fires when the streak reaches the milestone, and only then ──────── */
const LEVELS = [
  { name: 'Level 3', theme: 'a3', driver: './lib/aat3-driver.js',
    ui: 'AAT3_UI', open: M => M.AAT3_UI.reset('practice', 'tpfb'), unit: 'tpfb' },
  { name: 'Level 1', theme: 'a1', driver: './lib/aat1-driver.js',
    ui: 'AAT1_UI', open: M => M.AAT1_UI.reset('practice') },
];

/* A bank of questions whose first option is always the right one, so the run
   can be answered correctly for as long as it needs to be. */
function bank(n, unitKey) {
  const out = [];
  for (let i = 0; i < n; i++) {
    out.push({ id: 'M-' + i, unitKey, lo: 1, criteria: [unitKey === 'tpfb' ? 'TPFB-1.1.1' : 'BKFN-1.1.1'],
      type: 'mcq', q: 'Which rate applies to most goods? (' + i + ')',
      opts: ['Standard', 'Zero', 'Exempt', 'Outside scope'], ans: 0,
      exp: 'The standard rate is the default for goods and services in the UK.' });
  }
  return out;
}

LEVELS.forEach(L => {
  console.log(`${DIM}${L.name}${RESET}`);
  const D = require(L.driver);

  function run(mode) {
    const M = D.loadUI(D.fakeStore());
    if (L.theme === 'a3') { M.AAT3_PRACTICE = { QUESTIONS: bank(140, 'tpfb') }; M.AAT3_FAPS_PRACTICE = { QUESTIONS: [] }; }
    else { M.AAT1_PRACTICE = { QUESTIONS: bank(140) }; }
    const el = D.fakeEl();
    L.open(M);
    M[L.ui].mount(el);
    D.click(el, 'startpractice', n => n.getAttribute('data-lo') === mode);
    return el;
  }

  /* Answer right, over and over, recording which milestones were celebrated. */
  function sweep(el, times) {
    const seen = [];
    for (let i = 0; i < times; i++) {
      const opts = D.nodes(el, 'ans');
      if (!opts.length) break;
      const right = opts.find(n => n.getAttribute('data-i') === '0');
      if (!right) break;
      Cel.clear();
      right.fire('click');
      const advance = D.nodes(el, 'nextq');
      if (!advance.length) break;
      advance[0].fire('click');
      overlays().forEach(o => seen.push(o.attrs['data-cel']));
    }
    Cel.clear();
    return seen;
  }

  const endless = sweep(run('endless'), 105);
  ok(endless.indexOf(`${L.theme}-50`) !== -1, `${L.name}: fifty in a row is celebrated`);
  ok(endless.indexOf(`${L.theme}-100`) !== -1, `${L.name}: and so is a hundred`);
  ok(endless.filter(x => x === `${L.theme}-50`).length === 1,
    `${L.name}: fifty fires once, not again on the way past`);
  ok(endless.filter(x => x === `${L.theme}-100`).length === 1, `${L.name}: and a hundred fires once`);
  ok(endless.length === 2, `${L.name}: and nothing else is celebrated (${endless.join(',') || 'nothing'})`);

  /* A bounded run has an end of its own to arrive at. */
  const bounded = sweep(run('mix'), 60);
  ok(bounded.length === 0, `${L.name}: a bounded practice run celebrates nothing`);
});

/* ── 4. The six actually paint, in a real browser ─────────────────────────────
   Reading the stylesheet proves a rule was written. It does not prove the rule
   MATCHES: every celebration outside Level 2's is scoped under
   body[data-subject="…"], and a selector that never matches is a milestone that
   fires into an empty screen while every text-level check stays green. So each
   of the six is fired against the real page and the computed animation is read
   back off a piece. Level 2's milestone is only reachable at a streak of fifty,
   which no sweep can honestly drive, so this is where its celebration is
   checked at all. */
const http = require('http');
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.webmanifest': 'application/manifest+json',
  '.png': 'image/png', '.svg': 'image/svg+xml' };
function serve() {
  return new Promise(resolve => {
    const server = http.createServer((req, res) => {
      const url = decodeURIComponent(req.url.split('?')[0]);
      const file = path.join(ROOT, url === '/' ? 'index.html' : url);
      if (!file.startsWith(ROOT) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
        res.writeHead(404); res.end('not found'); return;
      }
      res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] || 'application/octet-stream' });
      fs.createReadStream(file).pipe(res);
    });
    server.listen(0, '127.0.0.1', () => resolve({ server, port: server.address().port }));
  });
}
let chromium = null;
try { ({ chromium } = require('playwright')); } catch (e) { /* handled below */ }

function finish() {
  console.log();
  if (failures) { console.log(`${RED}${BOLD}✗ ${failures} of ${checks} checks failed${RESET}`); process.exit(1); }
  console.log(`${GREEN}${BOLD}✓ ${checks} checks passed${RESET}`);
  process.exit(0);
}

(async () => {
  if (!chromium) {
    if (process.env.REQUIRE_PLAYWRIGHT) {
      console.log(`\n  ${RED}✗${RESET}  Playwright is required here and is not installed.`);
      process.exit(1);
    }
    console.log(`\n  \x1b[33m⚠${RESET}  Playwright is not installed — skipping the paint checks.`);
    finish();
    return;
  }
  console.log(`${DIM}and they paint${RESET}`);
  const { server, port } = await serve();
  const CANDIDATES = [
    '/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell',
    '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  ].filter(p => fs.existsSync(p));
  const browser = await chromium.launch(CANDIDATES.length ? { executablePath: CANDIDATES[0] } : {});
  try {
    const ctx = await browser.newContext();
    const page = await ctx.newPage();
    const errs = [];
    page.on('pageerror', e => errs.push('uncaught: ' + e.message));
    await page.goto(`http://127.0.0.1:${port}/`, { waitUntil: 'load' });
    await page.waitForTimeout(600);

    const SUBJECT = { a1: 'aat1', aat: 'aat', a3: 'aat3' };
    const SHEET = { a1: 'aat1-styles.css', a3: 'aat3-styles.css' };
    const seen = {};
    for (const theme of ['a1', 'aat', 'a3']) {
      for (const m of [50, 100]) {
        const got = await page.evaluate(async ([theme, m, subject, sheet]) => {
          if (sheet && !document.querySelector(`link[href="${sheet}"]`)) {
            await new Promise(res => {
              const l = document.createElement('link');
              l.rel = 'stylesheet'; l.href = sheet; l.onload = res; l.onerror = res;
              document.head.appendChild(l);
            });
          }
          document.body.dataset.subject = subject;
          window.AATCelebrate.clear();
          const wrap = window.AATCelebrate.fire(theme, m, m + ' in a row');
          const piece = wrap.querySelector('.aat-cel-p');
          const banner = wrap.querySelector('.aat-cel-t');
          const cs = piece && getComputedStyle(piece);
          const bs = banner && getComputedStyle(banner);
          /* LAYOUT size, not the painted rect. Level 3's fifty starts at
             scaleX(0) and grows, so a bounding rect read on the first frame is
             legitimately zero wide — measuring it would fail a celebration that
             works. offsetWidth ignores the transform and answers the question
             actually being asked: does this piece occupy space at all. */
          const r = piece ? { width: piece.offsetWidth, height: piece.offsetHeight } : null;
          const out = {
            anim: cs ? cs.animationName : null,
            w: r ? Math.round(r.width) : 0,
            h: r ? Math.round(r.height) : 0,
            bannerBg: bs ? bs.backgroundColor : null,
            pieces: wrap.querySelectorAll('.aat-cel-p').length,
          };
          window.AATCelebrate.clear();
          return out;
        }, [theme, m, SUBJECT[theme], SHEET[theme] || null]);
        const key = `${theme}-${m}`;
        seen[key] = got;
        ok(got.pieces > 0, `${key}: draws pieces`);
        ok(got.anim && got.anim !== 'none', `${key}: its pieces are actually animated (got ${got.anim})`);
        ok(got.w > 0 && got.h > 0, `${key}: and the pieces have a size (${got.w}x${got.h})`);
        ok(got.bannerBg && got.bannerBg !== 'rgba(0, 0, 0, 0)', `${key}: the banner is styled for this level`);
      }
    }
    /* Six celebrations, six animations. The whole point of the request. */
    const names = Object.keys(seen).map(k => seen[k].anim);
    ok(new Set(names).size === 6,
      `all six celebrations animate differently (${new Set(names).size} distinct: ${names.join(', ')})`);
    /* And the three banners do not all look the same either. */
    const bgs = ['a1-50', 'aat-50', 'a3-50'].map(k => seen[k].bannerBg);
    ok(new Set(bgs).size === 3, `each level's banner takes its own colour (${bgs.join(' / ')})`);
    ok(errs.length === 0, `no uncaught error while celebrating${errs.length ? ': ' + errs[0] : ''}`);
    await ctx.close();
  } finally {
    await browser.close();
    server.close();
  }
  finish();
})().catch(e => { console.error(e); process.exit(1); });
