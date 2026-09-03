#!/usr/bin/env node
/**
 * The tab you are on is readable, on every subject that has tabs, in both themes.
 *
 * THE BUG THIS GUARDS. `.nav-tab.active` sets `color: #fff`, which is right in
 * light mode because --subj is a deep colour there. In dark mode --subj inverts
 * to a LIGHT one for every subject, and white on those is around 2:1. It was
 * not even getting white: `.dark .nav-tab { color: #c5d0e4 }` has the same
 * specificity as `.nav-tab.active` and comes later in the file, so it won. The
 * label of the tab the reader is currently on was the least readable text on
 * the screen. Measured, in dark mode, before the fix:
 *
 *     Level 2            1.64:1
 *     Français           1.32:1
 *     LSF                1.19:1
 *     Code de la Route   1.78:1
 *     CIPS Level 2       1.21:1
 *
 * WHY IT NEEDED A CHECK OF ITS OWN. Nothing else looks at this. The layout
 * sweep in check-subject-layout.js walks Level 1 and Level 3, which are two of
 * the three subjects that never render a tab strip — so the component with the
 * failure was outside every contrast check the repo had. And the fix is one
 * declaration in a shared stylesheet, three thousand lines from the rule it
 * corrects: exactly the kind of thing a later edit removes without knowing.
 *
 * WHICH SUBJECTS. Only the ones that actually paint a strip. aat1, aat3 and
 * guitar delegate to their own modules and render their own navigation, so
 * asking them about `.nav-tab` measures a component they never show — which is
 * how an earlier version of this measurement produced three failing numbers
 * for screens no reader can reach. The list below is checked against the
 * registry in app.js, so a subject that gains or loses tabs fails here rather
 * than quietly dropping out of the sweep.
 *
 * Run: node scripts/check-tab-contrast.js   (exit 1 on any failure)
 */
'use strict';
const path = require('path'), http = require('http'), fs = require('fs');
const ROOT = path.join(__dirname, '..');
const RED = '\x1b[31m', GREEN = '\x1b[32m', DIM = '\x1b[2m', BOLD = '\x1b[1m', YEL = '\x1b[33m', RESET = '\x1b[0m';

let chromium;
try { ({ chromium } = require('playwright')); } catch (e) {
  console.log(`${BOLD}Tab contrast${RESET}\n`);
  if (process.env.REQUIRE_PLAYWRIGHT) { console.log(`  ${RED}✗${RESET} Playwright required: ${e.message}`); process.exit(1); }
  console.log(`  ${YEL}⚠${RESET} Playwright unavailable — skipping.\n`); process.exit(0);
}

/* WCAG AA for normal text. The label is .78rem semibold — nowhere near the
   18.66px bold that would let it count as large. */
const FLOOR = 4.5;

/* Subjects app.js gives more than one tab, plus CIPS, which renders the same
   component on its own page. */
const TABBED = ['aat', 'french', 'lsf', 'code-route'];
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.webmanifest': 'application/manifest+json', '.png': 'image/png', '.svg': 'image/svg+xml' };
function serve() {
  return new Promise(resolve => {
    const server = http.createServer((req, res) => {
      const u = decodeURIComponent(req.url.split('?')[0]);
      const file = path.join(ROOT, u === '/' ? 'index.html' : u);
      if (!file.startsWith(ROOT) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) { res.writeHead(404); res.end('not found'); return; }
      res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] || 'application/octet-stream' });
      fs.createReadStream(file).pipe(res);
    });
    server.listen(0, '127.0.0.1', () => resolve({ server, port: server.address().port }));
  });
}

/* Measured off the painted element, never computed from the stylesheet: the
   whole failure was a rule winning a cascade nobody expected it to win. */
const MEASURE = `() => {
  const strip = document.querySelector('.nav-tabs');
  if (!strip) return { none: true };
  const act = strip.querySelector('.nav-tab.active');
  const other = [...strip.querySelectorAll('.nav-tab')].find(t => t !== act);
  const lum = c => {
    const p = c.match(/[\\d.]+/g);
    if (!p || p.length < 3) return null;
    if (p.length > 3 && Number(p[3]) < 1) return 'translucent';
    const [r, g, b] = p.slice(0, 3).map(Number).map(v => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };
  const cr = (a, b) => {
    const l1 = lum(a), l2 = lum(b);
    if (l1 === null || l2 === null || l1 === 'translucent' || l2 === 'translucent') return null;
    return Math.round(((Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05)) * 100) / 100;
  };
  const ss = getComputedStyle(strip);
  const sa = act ? getComputedStyle(act) : null;
  const so = other ? getComputedStyle(other) : null;
  return {
    count: strip.querySelectorAll('.nav-tab').length,
    activeInk: sa ? sa.color : null, activeFill: sa ? sa.backgroundColor : null,
    active: sa ? cr(sa.color, sa.backgroundColor) : null,
    idle: so ? cr(so.color, ss.backgroundColor) : null
  };
}`;

let checks = 0;
const errors = [];
function ok(cond, msg) { checks++; if (!cond) errors.push(msg); }

(async () => {
  /* The list must match the app's own registry, or a subject can lose its tabs
     and silently leave this sweep. */
  const app = fs.readFileSync(path.join(ROOT, 'app.js'), 'utf8');
  const registry = [...app.matchAll(/id:\s*'([a-z0-9-]+)'[\s\S]{0,400}?tabs:\s*\[([^\]]*)\]/g)]
    .map(m => ({ id: m[1], tabs: (m[2].match(/'/g) || []).length / 2 }));
  const multi = registry.filter(r => r.tabs > 1).map(r => r.id).sort();
  ok(JSON.stringify(multi) === JSON.stringify([...TABBED].sort()),
    `the subjects app.js gives more than one tab are ${JSON.stringify(multi)}, but this check sweeps ${JSON.stringify([...TABBED].sort())}.`);

  const { server, port } = await serve();
  const base = `http://127.0.0.1:${port}/`;
  const candidates = ['/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell',
    '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', '/opt/pw-browsers/chromium'].filter(fs.existsSync);
  const browser = await chromium.launch(candidates.length ? { executablePath: candidates[0] } : {});
  const rows = [];

  try {
    for (const dark of [false, true]) {
      for (const subj of TABBED.concat('cips2')) {
        const ctx = await browser.newContext({ viewport: { width: 1100, height: 800 } });
        const page = await ctx.newPage();
        const cips = subj === 'cips2';
        await page.addInitScript(([s, d]) => {
          if (s !== 'cips2') localStorage.setItem('multisubject_active', s);
          const key = s === 'aat' ? 'aatPrep_v2' : 'prep_v2_' + s;
          localStorage.setItem(key, JSON.stringify({ settings: { darkMode: d } }));
        }, [subj, dark]);
        await page.goto(base + (cips ? 'cips2.html' : ''), { waitUntil: 'load' });
        await page.waitForTimeout(cips ? 500 : 1100);
        /* app.js opens on a splash for the subjects it renders; step past it. */
        for (let i = 0; i < 3 && !(await page.$('.nav-tabs')); i++) {
          const b = await page.$('#app button');
          if (!b) break;
          await b.click().catch(() => {});
          await page.waitForTimeout(600);
        }
        const m = await page.evaluate(new Function('return ' + MEASURE)());
        const where = `${subj} ${dark ? 'dark' : 'light'}`;
        if (m.none) {
          errors.push(`${where}: no tab strip rendered — this subject is in the sweep but shows no tabs, so nothing here was measured.`);
          checks++;
        } else {
          ok(m.active !== null && m.active >= FLOOR,
            `${where}: the selected tab's label is ${m.active === null ? 'unmeasurable (translucent)' : m.active + ':1'} — ${m.activeInk} on ${m.activeFill}, floor ${FLOOR}.`);
          ok(m.idle !== null && m.idle >= FLOOR,
            `${where}: an unselected tab's label is ${m.idle === null ? 'unmeasurable (translucent)' : m.idle + ':1'}, floor ${FLOOR}.`);
          rows.push(`${where.padEnd(18)} ${m.count} tabs · selected ${String(m.active).padStart(6)}:1 · idle ${String(m.idle).padStart(6)}:1`);
        }
        await ctx.close();
      }
    }
  } finally { await browser.close(); server.close(); }

  console.log(`${BOLD}Tab contrast${RESET}\n`);
  rows.forEach(r => console.log(`  ${DIM}${r}${RESET}`));
  console.log('');
  if (errors.length) {
    console.log(`${RED}${BOLD}${errors.length} of ${checks} checks failed${RESET}`);
    errors.forEach(e => console.log(`  ${RED}✗${RESET} ${e}`));
    console.log('');
    process.exit(1);
  }
  console.log(`${GREEN}${BOLD}${checks} checks pass — the tab you are on is readable ✓${RESET}\n`);
  process.exit(0);
})().catch(e => { console.error(e); process.exit(1); });
