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

/* THE LAYERS THE STYLESHEETS HAVE TO WORK WITH. A celebration built from one
   layer can only ever be one kind of noise, which is what made the first
   version disappointing. These counts are the budget every level draws on, so
   a level that stops using a layer is a level whose celebration got smaller. */
Cel.clear();
const layered = Cel.fire('a3', 100, '100 in a row');
const kids = c => layered.children.filter(x => x.className === c).length;
ok(kids('aat-cel-flash') === 1, 'a celebration carries one full-bleed flash');
ok(kids('aat-cel-w') === Cel.WAVES[100], `and ${Cel.WAVES[100]} shockwave rings at a hundred`);
ok(Cel.WAVES[100] > Cel.WAVES[50], 'a hundred throws more rings than fifty does');
ok(Cel.PIECES[50] >= 40 && Cel.PIECES[100] >= 80,
  `and enough pieces to read as an event (${Cel.PIECES[50]} / ${Cel.PIECES[100]})`);
ok(Cel.LIFE[100] > Cel.LIFE[50],
  'a hundred is held on screen longer than fifty — an equal exit reads as an equal event');

/* THE SCREEN SHAKES AT A HUNDRED AND NOWHERE ELSE, and the class comes off
   again. A shake left behind would move every page in the app afterwards. */
const cls = [];
document.body.classList = {
  add(c) { cls.push(c); }, remove(c) { const i = cls.indexOf(c); if (i !== -1) cls.splice(i, 1); },
};
Cel.clear();
Cel.fire('a3', 50, '50');
ok(cls.indexOf(Cel.QUAKE) === -1, 'fifty does not shake the screen');
Cel.fire('a3', 100, '100');
ok(cls.indexOf(Cel.QUAKE) !== -1, 'a hundred does');
Cel.clear();
ok(cls.indexOf(Cel.QUAKE) === -1, 'and clearing takes the shake off again');
/* Never when the reader asked for stillness — the one case where a shake is
   not a flourish but a problem. */
global.matchMedia = () => ({ matches: true });
Cel.fire('a3', 100, '100');
ok(cls.indexOf(Cel.QUAKE) === -1, 'and it never shakes under prefers-reduced-motion');
Cel.clear();
global.matchMedia = () => ({ matches: false });
delete document.body.classList;

/* ── 1b. The chickens ───────────────────────────────────────────────────────
   Fifty in a row gets a chicken doing a happy dance; a hundred gets two of
   them. It is a joke, and a joke that has quietly stopped rendering is worse
   than no joke — nobody reports a missing chicken as a bug, they just stop
   seeing it. So: the COUNT is asserted at both milestones, and each bird is
   still a chicken rather than a blank box where one used to be.

   THE COUNT, NOT A FLAG. What separates the two celebrations is how many birds
   there are, so a check that only asked "is there a chicken" would pass a
   hundred that drew one, which is the solo again and the thing the pair exists
   to avoid. */
Cel.clear();
const birds = m => Cel.fire('a3', m, `${m} in a row`).children
  .filter(c => c.className === 'aat-cel-chicken');

const one = birds(50);
ok(one.length === 1, `fifty in a row draws one chicken (got ${one.length})`);
ok(Cel.CHICKENS && Cel.CHICKENS[50] === 1 && Cel.CHICKENS[100] === 2,
  `the counts are declared in one place (${JSON.stringify(Cel.CHICKENS)})`);
Object.keys(Cel.CHICKENS).forEach(m => {
  ok(Cel.AT.indexOf(Number(m)) !== -1,
    `and keyed to a milestone the run actually fires at, so no bird is stranded on ${m}`);
});
const chick = one[0];
ok(chick && chick.attrs['aria-hidden'] === 'true',
  'the chicken is hidden from screen readers — the banner already says what was reached');
/* THE PARTS, NAMED. "An element with the right class" would pass against an
   empty <span>. These five are what make it read as a hen rather than a chick
   or a blob, and the comb is in the list because it was drawn INSIDE the skull
   the first time and the head painted straight over it. */
['aat-cel-chk-comb', 'aat-cel-chk-wattle', 'aat-cel-chk-beak', 'aat-cel-chk-eye',
 'aat-cel-chk-leg'].forEach(part => {
  ok(chick && String(chick.innerHTML).indexOf(part) !== -1, `the chicken has its ${part.replace('aat-cel-chk-', '')}`);
});

const two = birds(100);
ok(two.length === 2, `a hundred draws two of them (got ${two.length})`);
/* EACH ONE KNOWS WHICH IT IS. The stylesheet places and phases the pair off
   this index; without it both birds land on the same spot on the same beat and
   the duet is one bird drawn twice. */
ok(two.length === 2 && two[0].attrs['data-chick'] === '0' && two[1].attrs['data-chick'] === '1',
  'and each carries its index, which is what the stylesheet places and phases it by');
ok(two.every(c => c.attrs['aria-hidden'] === 'true'),
  'both are hidden from screen readers — two chickens is not twice the information');
ok(two.every(c => String(c.innerHTML).indexOf('aat-cel-chk-comb') !== -1),
  'and both are whole birds, not one bird and one empty box');

/* Motion removed, chickens removed. A bird frozen mid-hop is a worse joke than
   no bird, and the banner is what carries the meaning. */
global.matchMedia = () => ({ matches: true });
ok(birds(50).length === 0 && birds(100).length === 0,
  'and none at all, at either milestone, under prefers-reduced-motion');
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

/* EVERY LEVEL USES THE NEW LAYERS. celebrate.js draws a flash and a set of
   rings for all six celebrations; a level that styles neither is throwing away
   two thirds of what it was given and is back to a scatter of pieces. Read per
   THEME rather than per milestone, because a level may legitimately share one
   bloom across both of its milestones and vary the scale. */
THEMES.forEach(t => {
  ok(new RegExp(`aat-cel-${t}[^{]*\\.aat-cel-flash`).test(SHEETS[t]),
    `${t} styles the flash layer`);
  ok(new RegExp(`aat-cel-${t}[^{]*\\.aat-cel-w`).test(SHEETS[t]),
    `${t} styles the shockwave rings`);
});

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

/* ── 3b. The streak badge earns each of its two tiers ──────────────────────────
 *
 * The badge went gold at THREE, which is two answers into a run. It was lit for
 * most of a session, so being lit meant nothing. Twenty now turns it gold and
 * thirty-five adds sparkles.
 *
 * BOTH BOUNDARIES FROM BOTH SIDES. A threshold is the one part of this that can
 * be wrong by one and look right: `> 10` and `>= 10` differ on exactly one
 * streak in a hundred, and a check that only ever looked at a long run would
 * never see it. So each tier is read at the answer before it and the answer it
 * lands on.
 *
 * DRIVEN THROUGH THE REAL PLAYER, and the class read off the rendered markup,
 * because the two thresholds are in the renderer while what they mean is in the
 * stylesheet. §5 takes the same class names to a browser to prove they paint.
 */
console.log(`${DIM}the streak badge${RESET}`);

const TIERS = [
  { theme: 'a3', driver: './lib/aat3-driver.js', ui: 'AAT3_UI', name: 'Level 3',
    open: M => M.AAT3_UI.reset('practice', 'tpfb'), unit: 'tpfb' },
  { theme: 'a1', driver: './lib/aat1-driver.js', ui: 'AAT1_UI', name: 'Level 1',
    open: M => M.AAT1_UI.reset('practice') },
];

TIERS.forEach(L => {
  const D = require(L.driver);
  const M = D.loadUI(D.fakeStore());
  if (L.theme === 'a3') { M.AAT3_PRACTICE = { QUESTIONS: bank(60, 'tpfb') }; M.AAT3_FAPS_PRACTICE = { QUESTIONS: [] }; }
  else { M.AAT1_PRACTICE = { QUESTIONS: bank(60) }; }
  const el = D.fakeEl();
  L.open(M);
  M[L.ui].mount(el);
  D.click(el, 'startpractice', n => n.getAttribute('data-lo') === 'endless');

  /* The badge carries no data attribute — it is read off the markup the same
     way a reader reads it, by its class. */
  const badge = () => {
    const m = new RegExp('<div class="' + L.theme + '-streak([^"]*)"').exec(el.innerHTML);
    return m ? m[1] : null;
  };
  const at = {};
  /* PAST A HUNDRED, because the top two tiers are the point of this section
     now and a loop that stopped at twenty-six could not see either of them. */
  for (let n = 1; n <= 101; n++) {
    const opts = D.nodes(el, 'ans');
    const right = opts.find(x => x.getAttribute('data-i') === '0');
    if (!right) break;
    right.fire('click');
    const advance = D.nodes(el, 'nextq');
    if (!advance.length) break;
    advance[0].fire('click');
    at[n] = badge();
  }

  ok(at[1] !== null, `${L.name}: the streak badge is on the endless bar`);
  /* The old threshold, asserted as gone. Without this the whole change is a
     comment: every other assertion here passes just as well at three. */
  ok(at[3] !== null && at[3].indexOf('is-hot') === -1,
    `${L.name}: three in a row no longer lights it (got "${at[3]}")`);
  ok(at[19] !== null && at[19].indexOf('is-hot') === -1,
    `${L.name}: nineteen is still not gold (got "${at[19]}")`);
  ok(at[20] !== null && at[20].indexOf('is-hot') !== -1,
    `${L.name}: twenty turns it gold (got "${at[20]}")`);
  /* THE BAND BETWEEN THE TIERS. Gold at twenty and sparkle at thirty-five
     leave fifteen questions in which gold is the whole of what the badge is
     doing. Read at the midpoint rather than at the boundary, so this says the
     band genuinely exists rather than that its last question does. */
  ok(at[27] !== null && at[27].indexOf('is-hot') !== -1 && at[27].indexOf('is-sparkling') === -1,
    `${L.name}: gold has a band of its own before sparkle (got "${at[27]}")`);
  ok(at[34] !== null && at[34].indexOf('is-sparkling') === -1,
    `${L.name}: thirty-four is gold without sparkles (got "${at[34]}")`);
  ok(at[35] !== null && at[35].indexOf('is-sparkling') !== -1,
    `${L.name}: thirty-five sparkles (got "${at[35]}")`);
  /* Additive, not a swap: the sparkle tier keeps the gold it earned at twenty. */
  ok(at[35] !== null && at[35].indexOf('is-hot') !== -1,
    `${L.name}: and is still gold at thirty-five (got "${at[35]}")`);
  ok(at[36] !== null && at[36].indexOf('is-sparkling') !== -1,
    `${L.name}: and stays sparkling past it (got "${at[36]}")`);

  /* THE TWO MILESTONE TIERS, BOTH BOUNDARIES FROM BOTH SIDES. These are what
     the reader has to show for a milestone once the overlay has gone, so they
     are read at the answer before and the answer that lands on it exactly as
     the lower two are. */
  ok(at[49] !== null && at[49].indexOf('is-blazing') === -1,
    `${L.name}: forty-nine is not yet blazing (got "${at[49]}")`);
  ok(at[50] !== null && at[50].indexOf('is-blazing') !== -1,
    `${L.name}: fifty blazes (got "${at[50]}")`);
  ok(at[99] !== null && at[99].indexOf('is-legendary') === -1,
    `${L.name}: ninety-nine is blazing but not legendary (got "${at[99]}")`);
  ok(at[100] !== null && at[100].indexOf('is-legendary') !== -1,
    `${L.name}: a hundred is legendary (got "${at[100]}")`);
  /* Additive all the way up, like the lower tiers: a badge that swapped one
     class for another would lose the gold and the sparkles it had earned. */
  ok(at[100] !== null && ['is-hot', 'is-sparkling', 'is-blazing']
      .every(c => at[100].indexOf(c) !== -1),
    `${L.name}: and still carries every tier below it (got "${at[100]}")`);
  ok(at[101] !== null && at[101].indexOf('is-legendary') !== -1,
    `${L.name}: and stays legendary past it (got "${at[101]}")`);

  /* THE WORD UNDER THE NUMBER CHANGES TOO. Colour alone was the complaint —
     "the same badge, brighter" is what made the milestone feel like nothing —
     so the label is part of the tier and is checked as part of it. */
  const word = () => {
    const m = new RegExp('<span class="' + L.theme + '-streak-l">([^<]*)<').exec(el.innerHTML);
    return m ? m[1] : null;
  };
  ok(word() === 'legend', `${L.name}: at a hundred the label reads "legend" (got "${word()}")`);
  /* And the accessible name does NOT change with it: a reader who cannot see
     the badge needs the number and what it counts, not the adjective. */
  ok(/aria-label="Current streak 101"/.test(el.innerHTML),
    `${L.name}: the accessible name still says what the number counts`);
});

/* The thresholds are named in the renderer rather than written into the markup,
   so the two levels cannot drift to different numbers unnoticed. */
['aat3-ui.js', 'aat1-ui.js'].forEach(f => {
  const src = fs.readFileSync(path.join(ROOT, f), 'utf8');
  ok(/var STREAK_GOLD = 20;/.test(src), `${f}: names the gold threshold`);
  ok(/var STREAK_SPARKLE = 35;/.test(src), `${f}: names the sparkle threshold`);
  ok(/var STREAK_BLAZE = 50;/.test(src), `${f}: names the blaze threshold`);
  ok(/var STREAK_LEGEND = 100;/.test(src), `${f}: names the legend threshold`);
});

/* THE BADGE'S TOP TIERS ARE THE CELEBRATION'S OWN MILESTONES, and this is the
   assertion that keeps them so. The overlay fires at AATCelebrate.AT; if the
   badge changed at some other pair, a reader would be congratulated at fifty
   and see the badge change at forty — or worse, reach a milestone with nothing
   to show for it, which is the whole defect being fixed. */
['aat3-ui.js', 'aat1-ui.js', 'app.js'].forEach(f => {
  const src = fs.readFileSync(path.join(ROOT, f), 'utf8');
  Cel.AT.forEach(m => {
    const named = new RegExp(`STREAK_(BLAZE|LEGEND) = ${m};`).test(src);
    ok(named, `${f}: has a badge tier at ${m}, the milestone AATCelebrate fires on`);
  });
});

/* LEVEL 2 HAS THEM TOO. Its counter is a different element with a different
   class, and it had NO tiers at all — the same at one as at a hundred — so the
   celebration was the only thing that ever marked a milestone there and it was
   gone in seconds. Read off the renderer's own template rather than driven,
   because app.js builds this string inline. */
{
  const src = fs.readFileSync(path.join(ROOT, 'app.js'), 'utf8');
  ok(/q-counter-endless\$\{streakTier\(/.test(src),
    'app.js: the endless counter takes a tier class');
  ok(/<i>\$\{streakWord\(/.test(src), 'app.js: and its label changes with the tier');
  ok(/aria-label="Current streak \$\{State\.streak \|\| 0\}"/.test(src),
    'app.js: while the accessible name still says what the number counts');
  const sheet = SHEETS.aat;
  ['is-blazing', 'is-legendary'].forEach(c => {
    /* A WORD BOUNDARY, NOT A SUBSTRING. `indexOf` was the first version and a
       selector renamed to `.is-legendary-x` still contained it — the tier went
       unstyled and this said nothing. */
    ok(new RegExp('\\.q-counter-endless\\.' + c + '(?![a-z0-9-])').test(sheet),
      `styles.css: the Level 2 counter styles ${c}`);
  });
}

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
          /* SEEK PAST THE ENTRANCES BEFORE MEASURING WHERE ANYTHING IS.
             This is the same trap the two notes below describe, in its third
             form: read on the first frame, the chicken is still at the 0%
             keyframe — scale(.26), 118px low — so its painted rect is small
             and well below the banner, and a bird that spends the whole
             celebration with its head behind the banner measures as clearing
             it. 1400ms is past the bird's entrance (640ms, plus 150ms of delay
             for the second one) and past the banner's (1.1s), so both are at
             rest and the numbers mean what they say.

             The wrapper's own rect is what gets measured, and only its own
             animation moves it: a transform on the SVG group inside does not
             grow an ancestor's border box, so the hop cannot make this flaky.
             Rest is also the worst case — the hop only ever lifts the bird
             AWAY from the banner and off the floor. */
          document.getAnimations().forEach(a => { try { a.currentTime = 1400; } catch (e) {} });
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
            /* WHERE THE CELEBRATION ACTUALLY LANDED. See the assertions below:
               a transform on an ancestor turns `position: fixed` into
               "fixed to that ancestor", and the whole overlay slid off the
               bottom of a long page without a single rule looking wrong. */
            vh: window.innerHeight, vw: window.innerWidth,
            bannerBox: banner ? (() => {
              const r = banner.getBoundingClientRect();
              return { t: Math.round(r.top), b: Math.round(r.bottom),
                       l: Math.round(r.left), r: Math.round(r.right) };
            })() : null,
            /* The chicken, if this is the milestone that gets one. Read here
               rather than in its own pass so it is measured through the same
               real fire() on the same real stylesheet as everything else. */
            /* EVERY bird, not the first one. A hundred draws two, and reading
               only `querySelector` would measure one of them and call the pair
               proved — which is exactly how a second bird that never moves
               ships unnoticed. */
            chicks: Array.prototype.map.call(
              wrap.querySelectorAll('.aat-cel-chicken'), c => {
                const part = sel => {
                  const e = c.querySelector(sel);
                  if (!e) return null;
                  const s2 = getComputedStyle(e);
                  return { anim: s2.animationName, dur: s2.animationDuration,
                           box: s2.transformBox, delay: s2.animationDelay };
                };
                const cs2 = getComputedStyle(c);
                /* LAYOUT size, for the reason spelled out above the piece
                   measurement: the chicken enters at scale(.26) and grows, so
                   a bounding rect read on the first frame is legitimately
                   small. It reported 88px against a computed 208px and failed
                   a bird that works. offsetWidth ignores the transform. */
                return {
                  w: c.offsetWidth, h: c.offsetHeight,
                  svg: !!c.querySelector('svg'),
                  /* Where it actually stands and which way it faces, resolved
                     by the engine rather than read back off the custom
                     properties: a --cel-x nothing consumes would still read
                     back correctly and place nothing. */
                  x: Math.round(c.getBoundingClientRect().left),
                  top: Math.round(c.getBoundingClientRect().top),
                  bottom: Math.round(c.getBoundingClientRect().bottom),
                  face: cs2.getPropertyValue('--cel-face').trim(),
                  inDelay: cs2.animationDelay,
                  bird: part('.aat-cel-chk'), body: part('.aat-cel-chk-body'),
                  wing: part('.aat-cel-chk-wing'), head: part('.aat-cel-chk-head'),
                  tail: part('.aat-cel-chk-tail'),
                  legA: part('.aat-cel-chk-leg-a'), legB: part('.aat-cel-chk-leg-b'),
                  combFill: (() => {
                    const e = c.querySelector('.aat-cel-chk-comb');
                    return e ? getComputedStyle(e).fill : null;
                  })(),
                };
              }),
          };
          window.AATCelebrate.clear();
          return out;
        }, [theme, m, SUBJECT[theme], SHEET[theme] || null]);
        const key = `${theme}-${m}`;
        seen[key] = got;

        /* ── THE CHICKEN, DANCING ──────────────────────────────────────────
           A picture being wobbled and a dance are the same markup with
           different CSS, so what is asserted is that the parts move against
           EACH OTHER: the wing at twice the body's beat, the two legs half a
           cycle apart. Give them all one duration and the bird moves as a
           rigid lump — which is what "add an animated chicken" most easily
           degrades into. */
        {
          const want = m === 100 ? 2 : 1;
          const chs = got.chicks || [];
          const secs = v => parseFloat(String(v)) * (/ms$/.test(String(v)) ? 0.001 : 1);
          ok(chs.length === want,
            `${key}: draws ${want} chicken(s) (got ${chs.length})`);
          chs.forEach((ch, ci) => {
            const who = want > 1 ? `${key} bird ${ci}` : key;
            ok(ch.svg, `${who}: the chicken is drawn, not an empty box`);
            /* The pair are smaller than the solo so both fit a phone, so the
               floor is lower here — but still a size worth looking at rather
               than a thumbnail. */
            const floor = want > 1 ? 80 : 100;
            ok(ch.w > floor && ch.h > floor, `${who}: at a size worth looking at (${ch.w}x${ch.h})`);
            ['bird', 'body', 'wing', 'head', 'tail', 'legA', 'legB'].forEach(part => {
              ok(ch[part] && ch[part].anim && ch[part].anim !== 'none',
                `${who}: the chicken's ${part} is animated (got ${ch[part] && ch[part].anim})`);
              /* An SVG child's transform-origin resolves against the nearest
                 VIEWPORT unless this is set, so `50% 100%` on the wing rotated
                 it about a point off the bird entirely. */
              ok(ch[part] && ch[part].box === 'fill-box',
                `${who}: and turns about its own box, not the SVG viewport (${part} transform-box ${ch[part] && ch[part].box})`);
            });
            const beat = ch.body && secs(ch.body.dur);
            const flap = ch.wing && secs(ch.wing.dur);
            const wag = ch.tail && secs(ch.tail.dur);
            ok(beat > 0 && flap > 0 && Math.abs(flap * 2 - beat) < 0.02,
              `${who}: the wings flap at twice the body's beat (${flap}s against ${beat}s)`);
            /* THE TAIL IS THE THIRD RATE. Two rates that divide into each other
               still read as one pulse; the wag has to land somewhere neither of
               them does, or the bird is a metronome with feathers. */
            ok(wag > 0 && beat > 0 && Math.abs((beat / wag) - Math.round(beat / wag)) > 0.1,
              `${who}: the tail keeps its own time rather than the body's (${wag}s against ${beat}s)`);
            ok(ch.legA && ch.legB && secs(ch.legA.delay) !== secs(ch.legB.delay),
              `${who}: the legs step out of phase, so the bird is always on one foot ` +
              `(${ch.legA && ch.legA.delay} / ${ch.legB && ch.legB.delay})`);
            /* THE COMB HAS TO BE VISIBLE, and it was not: drawn inside the
               skull circle, the head painted over it and the bird came out
               combless — which reads as a chick rather than a hen. A fill of
               "none" or the body's cream would be the same defect by a
               different route. */
            ok(ch.combFill && ch.combFill !== 'none' && !/255, *25[0-9]/.test(ch.combFill),
              `${who}: the comb is painted its own colour (got ${ch.combFill})`);
          });

          /* ── THE PAIR IS A DUET, NOT A DUPLICATE ────────────────────────
             Three things separate two birds from one bird drawn twice, and
             each fails silently on its own: they stand apart, they face each
             other, and they are half a beat out of step. A --cel-x that no
             rule consumes, a mirror that never applied, or a phase left at 0
             would each leave a hundred looking like fifty with a copy-paste. */
          if (want === 2 && chs.length === 2) {
            const [a, b] = chs;
            ok(Math.abs(a.x - b.x) > 40,
              `${key}: the two stand apart rather than on top of each other (${a.x} / ${b.x})`);
            ok(a.face.trim() === '1' && b.face.trim() === '-1',
              `${key}: and turn inward, so they dance at each other (${a.face} / ${b.face})`);
            const pa = a.bird && secs(a.bird.delay), pb = b.bird && secs(b.bird.delay);
            const beat = a.body && secs(a.body.dur);
            ok(beat > 0 && Math.abs(Math.abs(pb - pa) - beat / 2) < 0.02,
              `${key}: half a beat apart, so one lands as the other lifts ` +
              `(${a.bird && a.bird.delay} / ${b.bird && b.bird.delay} on a ${beat}s beat)`);
            /* The half-cycle between the two legs has to survive the phase
               being added to both — otherwise the second bird stands on two
               feet while the first one dances. */
            ok(Math.abs((secs(b.legB.delay) - secs(b.legA.delay)) -
                        (secs(a.legB.delay) - secs(a.legA.delay))) < 0.02,
              `${key}: and the second bird's legs keep the same half-cycle as the first's`);
            ok(secs(b.inDelay) > secs(a.inDelay),
              `${key}: the second arrives after the first, so they land as two events ` +
              `(${a.inDelay} / ${b.inDelay})`);
          }
        }
        /* ── THE CELEBRATION IS ON THE SCREEN ───────────────────────────
           A transform on an element makes it the containing block for every
           `position: fixed` DESCENDANT. The hundred's shake was a transform on
           <body>, with `both` so it outlived its own 620ms by the whole four
           seconds of the overlay — so `.aat-cel`'s `inset: 0` resolved against
           the DOCUMENT, not the viewport. Measured on a 700px window whose page
           ran to 1012px, the banner landed at y=450 and the birds at 532–700,
           sliding further off the bottom the longer the page. Every rule read
           correctly; only the geometry showed it, which is why it is asserted
           here and not by reading the stylesheet.

           Fifty never showed it, because fifty does not shake — so this has to
           run at BOTH milestones or the one that breaks is the one not looked
           at. */
        ok(got.bannerBox && got.bannerBox.t >= 0 && got.bannerBox.b <= got.vh,
          `${key}: the banner is on the screen, not anchored to the page ` +
          `(${got.bannerBox && got.bannerBox.t}..${got.bannerBox && got.bannerBox.b} of ${got.vh})`);
        (got.chicks || []).forEach((ch, ci) => {
          const who = (got.chicks.length > 1) ? `${key} bird ${ci}` : key;
          ok(ch.bottom <= got.vh && ch.top >= 0,
            `${who}: is on the screen (${ch.top}..${ch.bottom} of ${got.vh})`);
          /* THE BANNER IS DRAWN OVER THE BIRD — z-index 3 against 2 — so a bird
             whose head reaches into the banner's box is a bird with no head.
             Both milestones shipped that way once: the solo cleared the
             banner's lower edge by four pixels and the pair, drawn smaller,
             sat straight behind it. */
          ok(got.bannerBox && ch.top >= got.bannerBox.b,
            `${who}: stands clear of the banner rather than behind it ` +
            `(bird top ${ch.top}, banner bottom ${got.bannerBox && got.bannerBox.b})`);
        });
        ok(got.pieces > 0, `${key}: draws pieces`);
        ok(got.anim && got.anim !== 'none', `${key}: its pieces are actually animated (got ${got.anim})`);
        ok(got.w > 0 && got.h > 0, `${key}: and the pieces have a size (${got.w}x${got.h})`);
        ok(got.bannerBg && got.bannerBg !== 'rgba(0, 0, 0, 0)', `${key}: the banner is styled for this level`);
      }
    }

    /* ── FIXED MEANS FIXED TO THE SCREEN ───────────────────────────────────
       A transform on an element makes it the containing block for every
       `position: fixed` DESCENDANT, and the hundred's shake was a transform on
       <body> — carrying `both`, so it outlived its own 620ms by the whole four
       seconds of the overlay. `.aat-cel`'s `inset: 0` then resolved against
       the DOCUMENT: the banner and the birds were pinned to the page and slid
       off the bottom of the screen, further the longer the page.

       THE SIX-COMBINATION LOOP ABOVE CANNOT SEE THIS, and did not: on a page
       no taller than the window, "anchored to the document" and "anchored to
       the viewport" are the same rectangle, so the bug is invisible until the
       page is long AND scrolled. This makes both true, which is the only
       condition that tells the two apart. Fifty is measured the same way as a
       control: it never shakes, so it must pass here whatever the fix did. */
    {
      const anchored = await page.evaluate(async () => {
        const prev = document.documentElement.style.minHeight;
        document.documentElement.style.minHeight = '260vh';
        window.scrollTo(0, 700);
        /* TWO MOMENTS, because the defect has two halves and each hides the
           other. `at: 300` is DURING the 620ms shake, when the transform is
           live: that is when a shake on <body> itself pins the overlay to the
           page. `at: 1400` is after it, when only a lingering `both` fill
           could still be doing so. Measure one and the other survives. */
        const read = (ms, at) => {
          window.AATCelebrate.clear();
          const wrap = window.AATCelebrate.fire('aat', ms, ms + ' in a row');
          document.getAnimations().forEach(a => { try { a.currentTime = at; } catch (e) {} });
          const R = el => { const r = el.getBoundingClientRect(); return { t: Math.round(r.top), b: Math.round(r.bottom) }; };
          const out = {
            scrolled: Math.round(window.scrollY),
            docH: Math.round(document.documentElement.scrollHeight),
            vh: window.innerHeight,
            banner: R(wrap.querySelector('.aat-cel-t')),
            birds: Array.prototype.map.call(wrap.querySelectorAll('.aat-cel-chicken'), R),
          };
          window.AATCelebrate.clear();
          return out;
        };
        const got = {
          '50@shake': read(50, 300), '50@rest': read(50, 1400),
          '100@shake': read(100, 300), '100@rest': read(100, 1400),
        };
        document.documentElement.style.minHeight = prev;
        window.scrollTo(0, 0);
        return got;
      });
      const ref = anchored['100@rest'];
      ok(ref.scrolled > 300 && ref.docH > ref.vh + 400,
        `the anchor test runs on a page genuinely longer than the window and scrolled down ` +
        `(page ${ref.docH}, window ${ref.vh}, scrolled ${ref.scrolled})`);
      Object.keys(anchored).forEach(when => {
        const g = anchored[when];
        const on = r => r.t >= 0 && r.b <= g.vh;
        ok(on(g.banner),
          `${when}: the banner stays on the screen when the page is long and scrolled ` +
          `(${g.banner.t}..${g.banner.b} of ${g.vh})`);
        g.birds.forEach((r, i) => {
          ok(on(r),
            `${when}: bird ${i} stays on the screen when the page is long and scrolled ` +
            `(${r.t}..${r.b} of ${g.vh})`);
        });
      });
    }

    /* ── The badge's two tiers, painted ─────────────────────────────────────
       §3b proves the renderer puts the classes on. This proves the stylesheets
       do something with them, which no amount of reading markup can.

       THE HEIGHT IS THE POINT OF THE THIRD ASSERTION. `.aN-streak` is a flex
       COLUMN, and ::before/::after in a flex container are flex ITEMS — left in
       normal flow the two sparkles would stack above and below the number and
       stretch the badge, pushing the endless bar apart at exactly the moment a
       reader is being congratulated. They are positioned absolutely to prevent
       that, and this measures that it worked. */
    /* LEVEL 2'S COUNTER, PAINTED. Its tiers were only ever read out of the
       stylesheet, which proves a rule was written and not that it does
       anything — the same gap this section exists to close for the other two.
       styles.css is the page's own sheet, so nothing has to be loaded. */
    {
      const l2 = await page.evaluate(() => {
        const host = document.createElement('div');
        document.body.appendChild(host);
        const make = extra => {
          const s = document.createElement('span');
          s.className = 'q-counter q-counter-endless' + (extra ? ' ' + extra : '');
          s.innerHTML = '<b>100</b><i>legend</i>';
          host.appendChild(s);
          return s;
        };
        const plain = make('');
        const blaze = make('is-blazing');
        const legend = make('is-blazing is-legendary');
        const cs = (el, p) => getComputedStyle(el, p || null);
        const out = {
          plainBg: cs(plain).backgroundImage,
          blazeBg: cs(blaze).backgroundImage,
          blazeTransform: cs(blaze).transform,
          legendBg: cs(legend).backgroundImage,
          halo: cs(legend.querySelector('b'), '::after').animationName,
          haloContent: cs(legend.querySelector('b'), '::after').content,
          haloComposite: cs(legend.querySelector('b'), '::after').maskComposite ||
                         cs(legend.querySelector('b'), '::after').webkitMaskComposite,
          plainH: plain.offsetHeight, legendH: legend.offsetHeight,
        };
        host.remove();
        return out;
      });
      ok(/gradient/.test(l2.blazeBg) && l2.blazeBg !== l2.plainBg,
        `aat: fifty fills the Level 2 counter (got ${l2.blazeBg})`);
      ok(l2.blazeTransform !== 'none', 'aat: and the counter grows');
      ok(/gradient/.test(l2.legendBg) && l2.legendBg !== l2.blazeBg,
        'aat: a hundred is a different fill again');
      ok(l2.haloContent && l2.haloContent !== 'none', 'aat: a hundred draws a halo');
      ok(l2.halo && l2.halo !== 'none', `aat: and the halo turns (got ${l2.halo})`);
      /* IT IS A RING, NOT A WEDGE. The conic gradient is masked down to its
         own padding edge; drop the composite and it fills the whole box and
         spills past the counter as a solid fan — which is exactly what the
         first version did, and only a screenshot caught it. */
      ok(/exclude|xor/.test(String(l2.haloComposite)),
        `aat: and it is masked to a ring rather than a filled wedge (got ${l2.haloComposite})`);
    }

    for (const [theme, subject, sheet] of [['a3', 'aat3', 'aat3-styles.css'], ['a1', 'aat1', 'aat1-styles.css']]) {
      const tier = await page.evaluate(async ([theme, subject, sheet]) => {
        if (!document.querySelector(`link[href="${sheet}"]`)) {
          await new Promise(res => {
            const l = document.createElement('link');
            l.rel = 'stylesheet'; l.href = sheet; l.onload = res; l.onerror = res;
            document.head.appendChild(l);
          });
        }
        document.body.dataset.subject = subject;
        const host = document.createElement('div');
        document.body.appendChild(host);
        const make = extra => {
          const d = document.createElement('div');
          d.className = theme + '-streak' + (extra ? ' ' + extra : '');
          d.innerHTML = `<span class="${theme}-streak-n">25</span>` +
                        `<span class="${theme}-streak-l">streak</span>`;
          host.appendChild(d);
          return d;
        };
        const plain = make('');
        const hot = make('is-hot');
        const spark = make('is-hot is-sparkling');
        const blaze = make('is-hot is-sparkling is-blazing');
        const legend = make('is-hot is-sparkling is-blazing is-legendary');
        /* The pseudo-element argument is the whole point of the reads below:
           getComputedStyle(el) with the second argument dropped silently
           answers about the ELEMENT, which reported position:relative and
           animation:none and looked like a stylesheet bug. */
        const cs = (el, pseudo) => getComputedStyle(el, pseudo || null);
        const box = el => ({ w: el.offsetWidth, h: el.offsetHeight });
        const out = {
          plainBg: cs(plain).backgroundColor,
          hotBg: cs(hot).backgroundColor,
          sparkShadow: cs(spark).boxShadow,
          hotShadow: cs(hot).boxShadow,
          beforeAnim: cs(spark, '::before').animationName,
          beforePos: cs(spark, '::before').position,
          afterPos: cs(spark, '::after').position,
          beforeContent: cs(spark, '::before').content,
          plainBox: box(plain), hotBox: box(hot), sparkBox: box(spark),
          blazeBg: cs(blaze).backgroundImage,
          blazeNum: cs(blaze.querySelector('span')).color,
          sparkNum: cs(spark.querySelector('span')).color,
          blazeTransform: cs(blaze).transform,
          legendBg: cs(legend).backgroundImage,
          legendHalo: cs(legend.querySelector('span'), '::after').animationName,
          legendHaloContent: cs(legend.querySelector('span'), '::after').content,
          legendHaloComposite: cs(legend.querySelector('span'), '::after').maskComposite ||
                               cs(legend.querySelector('span'), '::after').webkitMaskComposite,
          blazeBox: box(blaze), legendBox: box(legend),
        };
        host.remove();
        return out;
      }, [theme, subject, sheet]);

      /* ── The two milestone tiers, painted ────────────────────────────────
         The complaint that started this was that reaching fifty left nothing
         behind. So what is asserted is that the badge becomes a DIFFERENT
         OBJECT, not a brighter one: it takes a gradient fill where the lower
         tiers have a flat wash, the number inverts against it, and a hundred
         puts a turning halo in orbit that fifty does not have. Colour alone
         would satisfy none of these. */
      ok(/gradient/.test(tier.blazeBg),
        `${theme}: fifty fills the badge rather than tinting it (got ${tier.blazeBg})`);
      ok(tier.blazeNum !== tier.sparkNum,
        `${theme}: and the number inverts against the fill (${tier.sparkNum} → ${tier.blazeNum})`);
      ok(tier.blazeTransform !== 'none',
        `${theme}: and the badge grows (got ${tier.blazeTransform})`);
      ok(/gradient/.test(tier.legendBg) && tier.legendBg !== tier.blazeBg,
        `${theme}: a hundred is a different fill again, not the same one brighter`);
      ok(tier.legendHaloContent && tier.legendHaloContent !== 'none',
        `${theme}: a hundred draws a halo (content ${tier.legendHaloContent})`);
      ok(tier.legendHalo && tier.legendHalo !== 'none',
        `${theme}: and the halo turns (got ${tier.legendHalo})`);
      /* A RING, NOT A WEDGE — see the Level 2 note above. */
      ok(/exclude|xor/.test(String(tier.legendHaloComposite)),
        `${theme}: and it is masked to a ring (got ${tier.legendHaloComposite})`);
      /* THE SAME HEIGHT ARGUMENT AS THE SPARKLES. The halo is an absolutely
         positioned pseudo-element on the NUMBER, not a flex item on the badge:
         in flow it would stack under the number and stretch the endless bar at
         the moment the reader is being congratulated.

         MEASURED AGAINST THE BLAZE TIER, NOT THE SPARKLE ONE. A first version
         compared it with sparkle and failed by 3px — correctly, but for the
         wrong reason: `is-blazing` deliberately sets a larger number, and the
         legend badge carries that class too. Against blaze the only difference
         left is the halo, which is what this is about. */
      ok(tier.legendBox.h === tier.blazeBox.h,
        `${theme}: and the halo does not stretch the badge (${tier.blazeBox.h}px → ${tier.legendBox.h}px)`);
      ok(tier.blazeBox.h >= tier.sparkBox.h,
        `${theme}: the blaze tier is at least as tall as the one below it`);

      ok(tier.hotBg !== tier.plainBg,
        `${theme}: the gold tier changes the badge (${tier.plainBg} → ${tier.hotBg})`);
      ok(tier.beforeContent && tier.beforeContent !== 'none',
        `${theme}: the sparkle tier draws a sparkle (content ${tier.beforeContent})`);
      ok(tier.beforeAnim && tier.beforeAnim !== 'none',
        `${theme}: and animates it (got ${tier.beforeAnim})`);
      ok(tier.beforePos === 'absolute' && tier.afterPos === 'absolute',
        `${theme}: both sparkles are out of flow (${tier.beforePos}/${tier.afterPos})`);
      ok(tier.sparkBox.h === tier.hotBox.h && tier.sparkBox.w === tier.hotBox.w,
        `${theme}: and do not resize the badge ` +
        `(${tier.hotBox.w}x${tier.hotBox.h} → ${tier.sparkBox.w}x${tier.sparkBox.h})`);
      /* Something unanimated has to separate the tiers, or a reader with
         prefers-reduced-motion sees twenty-five and ten as the same badge. */
      ok(tier.sparkShadow && tier.sparkShadow !== 'none' && tier.sparkShadow !== tier.hotShadow,
        `${theme}: the sparkle tier is marked without motion too (got ${tier.sparkShadow})`);
    }

    /* ── Room under the advance button ──────────────────────────────────────
       Grading scrolls the button that continues the run to the bottom of the
       viewport. Welded to the very edge it sits under a phone's home indicator
       and reads as a page cut off rather than finished, so scroll-margin-bottom
       asks for a gap. Measured end to end — answer a question for real, let the
       scroll happen, and read where the button ended up — because a check on
       the CSS property alone would pass against a scroll that never ran. */
    const gap = await page.evaluate(async () => {
      const need = ['calculator.js', 'sound.js', 'celebrate.js', 'aat3-syllabus.js',
        'aat3-tax-data.js', 'aat3-learn-data.js', 'aat3-practice-data.js',
        'aat3-faps-data.js', 'aat3-ui.js'];
      for (const src of need) {
        if (document.querySelector(`script[src="${src}"]`)) continue;
        await new Promise((res, rej) => {
          const s = document.createElement('script');
          s.src = src; s.async = false; s.onload = res; s.onerror = rej;
          document.head.appendChild(s);
        });
      }
      /* A question with a long explanation, so the button really is pushed
         below the fold and the scroll has something to do. */
      window.AAT3_PRACTICE = { QUESTIONS: [{
        id: 'G-1', unitKey: 'tpfb', lo: 1, criteria: ['TPFB-1.1.1'], type: 'mcq',
        q: 'Which rate applies to most goods and services supplied in the UK?',
        opts: ['Standard', 'Zero', 'Exempt', 'Outside the scope'], ans: 0,
        exp: ('The standard rate is the default. ' +
              'Everything that is not zero-rated, reduced-rated, exempt or outside the scope carries it. ').repeat(6),
      }] };
      window.AAT3_FAPS_PRACTICE = { QUESTIONS: [] };
      document.body.dataset.subject = 'aat3';
      const host = document.getElementById('app');
      window.AAT3_UI.reset('practice', 'tpfb');
      window.AAT3_UI.mount(host);
      host.querySelector('[data-a3="startpractice"][data-lo="mix"]').click();
      const opt = host.querySelector('[data-a3="ans"]');
      if (!opt) return { err: 'no option to answer' };
      opt.click();
      /* The scroll is smooth, so give it time to land. */
      await new Promise(r => setTimeout(r, 900));
      const btn = host.querySelector('[data-a3="nextq"]');
      if (!btn) return { err: 'no advance button after grading' };
      const r = btn.getBoundingClientRect();
      return {
        below: Math.round(window.innerHeight - r.bottom),
        margin: getComputedStyle(btn).scrollMarginBottom,
        visible: r.top < window.innerHeight && r.bottom > 0,
      };
    });
    ok(!gap.err, `a graded question can be measured${gap.err ? ': ' + gap.err : ''}`);
    ok(gap.visible === true, 'the advance button is on screen after grading');
    ok(gap.below >= 12,
      `and is not welded to the bottom edge (${gap.below}px of air below it)`);
    ok(gap.below <= 120,
      `while still sitting near the bottom rather than mid-screen (${gap.below}px)`);
    ok(gap.margin === '24px', `the gap comes from scroll-margin-bottom (got ${gap.margin})`);

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
