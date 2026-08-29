#!/usr/bin/env node
/**
 * The reference drawer says the right things to the right level.
 *
 * The panel was Level 2's and was shown only there. Offering it at Levels 1 and
 * 3 turned a private cheat sheet into three, and the risk moved with it: the
 * failure is no longer "the drawer does not open", it is "the drawer opens and
 * confidently teaches the reader something their specification excludes".
 * Nothing about that is visible from the screen — a Level 1 reader has no way
 * to know DEAD CLIC is not theirs — so it is asserted here against the syllabus
 * files that already record every exclusion.
 *
 * WHAT IT ASSERTS
 *
 *   - The button appears at Levels 1, 2 and 3 and nowhere else. Français, LSF,
 *     the guitar and the Code de la Route have no reference material, and an
 *     empty drawer is worse than no button.
 *   - Every section declares which levels it serves. A section without `levels`
 *     is the bug this whole file exists to prevent, so it is named, not skipped.
 *   - No level is left with an empty panel.
 *   - LEVEL 1 IS NOT TAUGHT ITS OWN EXCLUSIONS. aat1-syllabus.js concept 2.1.3
 *     excludes debits and credits, ledger accounts and transactions including
 *     VAT; 3.2.3 excludes VAT from a VAT-inclusive amount. The patterns below
 *     look for the TEACHING of those — a formula, a posting rule — rather than
 *     the words, because the Level 1 panel deliberately names two of them to
 *     mark the boundary ("Preparing a bank reconciliation ... is Level 2"), and
 *     a signpost is the opposite of the defect.
 *   - LEVEL 3 IS NOT SHOWN UNITS THIS APP DOES NOT TEACH. Its Level 3 is TPFB
 *     and FAPS. MATS variances and sole-trader income tax are neither, and the
 *     income tax section was until now titled "(L3 TPFB)" — naming the one unit
 *     whose 4.1.12 explicitly excludes "the calculation of Income Tax".
 *   - THE VAT SCHEME FALLBACK HAS NOT DRIFTED. Those thresholds are governed in
 *     aat3-tax-data.js, which Level 2 does not load, so the panel carries a
 *     second copy for it. Rendering the same section under both subjects and
 *     demanding identical text is what stops the copy going stale silently.
 *
 * Run: node scripts/check-reference-panel.js   (exit 1 on any failure)
 */

'use strict';

const path = require('path');
const http = require('http');
const fs = require('fs');
const ROOT = path.join(__dirname, '..');

const RED = '\x1b[31m', GREEN = '\x1b[32m', DIM = '\x1b[2m', BOLD = '\x1b[1m', YEL = '\x1b[33m', RESET = '\x1b[0m';

let chromium;
try { ({ chromium } = require('playwright')); }
catch (e) {
  console.log(`${BOLD}Reference drawer${RESET}\n`);
  if (process.env.REQUIRE_PLAYWRIGHT) {
    console.log(`  ${RED}✗${RESET}  Playwright is required here and is not installed: ${e.message}\n`);
    process.exit(1);
  }
  console.log(`  ${YEL}⚠${RESET}  Playwright is not installed — skipping.\n`);
  process.exit(0);
}

const MIME = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.webmanifest': 'application/manifest+json',
  '.png': 'image/png', '.svg': 'image/svg+xml'
};

function serve() {
  return new Promise((resolve) => {
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

/* Levels that get a drawer, and what must never be inside each one.
   Every pattern is a thing being TAUGHT — a formula, a posting rule, a rate —
   not a word that might appear in a sentence marking a boundary. */
const OFFERED = ['aat1', 'aat', 'aat3'];
const WITHHELD = ['french', 'lsf', 'guitar', 'code-route'];

const FORBIDDEN = {
  /* Level 2's own drawer, which until now had no rules because it was the only
     one and whatever it held was by definition what it held. Two sections were
     removed from it — variance formulas labelled for MATS, and income tax for
     sole traders — because neither is assessed by any unit this app teaches.
     The patterns stay so that putting them back is a decision someone makes on
     purpose rather than by copying an old block in. */
  aat: [
    ['MATS variance formulas — no unit this app teaches assesses them', /Material (price|usage)\s*=|Labour (rate|efficiency)\s*=/i],
    ['income tax for sole traders — no unit this app teaches assesses it', /Personal allowance|AIA:|WDA main pool|Disallowable/i]
  ],
  aat1: [
    ['DEAD CLIC, the Level 2 debit/credit mnemonic (2.1.3 excludes debits and credits)', /DEAD CLIC/i],
    ['a debit/credit posting rule (2.1.3 excludes debits and credits)', /(increase|decrease) on the (Debit|Credit) side/i],
    ['VAT extracted from a gross figure (3.2.3 excludes VAT from VAT-inclusive amounts)', /Gross\s*÷|÷\s*1\.20|÷\s*6\b/],
    ['a ledger-account posting (2.1.3 excludes making entries in ledger accounts)', /\bDr\b|\bCr\b/],
    ['depreciation, which is not in the Level 1 award at all', /=\s*\(Cost\s*−/i]
  ],
  aat3: [
    ['MATS variance formulas — this app\'s Level 3 is TPFB and FAPS', /Material (price|usage)\s*=|Labour (rate|efficiency)\s*=/i],
    ['income tax computation — TPFB 4.1.12 excludes the calculation of Income Tax', /Personal allowance|AIA:|WDA main pool|Disallowable/i],
    ['an employer NIC calculation — TPFB 4.1.12 excludes the calculation of NIC', /Employer NIC\s*=/i],
    ['elasticity, which belongs to the Level 2 business environment', /\bPED\b|\bXED\b|elastic/i],
    ['break-even and costing, which this app teaches at Level 2', /Break-even|Contribution per unit/i]
  ]
};

(async () => {
  const { server, port } = await serve();
  const CANDIDATES = [
    '/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell',
    '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
    '/opt/pw-browsers/chromium'
  ].filter(p => fs.existsSync(p));
  const browser = await chromium.launch(CANDIDATES.length ? { executablePath: CANDIDATES[0] } : {});

  const errors = [];
  const notes = [];
  const schemeText = {};

  async function open(subject) {
    const ctx = await browser.newContext({ viewport: { width: 900, height: 800 } });
    const page = await ctx.newPage();
    await page.addInitScript(([sid]) => {
      localStorage.setItem('multisubject_active', sid);
      const k = sid === 'aat' ? 'aatPrep_v2' : 'prep_v2_' + sid;
      localStorage.setItem(k, JSON.stringify({ settings: { seenSplash: true } }));
    }, [subject]);
    await page.goto(`http://127.0.0.1:${port}/`);
    await page.waitForFunction(() => {
      const a = document.getElementById('app');
      return a && a.textContent.trim().length > 40;
    }, { timeout: 15000 }).catch(() => {});
    await page.waitForTimeout(350);
    return { ctx, page };
  }

  try {
    for (const id of OFFERED.concat(WITHHELD)) {
      const { ctx, page } = await open(id);
      const shown = await page.evaluate(() => {
        const b = document.getElementById('referenceToggle');
        if (!b) return false;
        const r = b.getBoundingClientRect();
        return r.width > 0 && r.height > 0;
      });
      /* The button loses its word below 420px and keeps its glyph, so the glyph
         is the only thing left to press on a phone. A button whose visible text
         has been emptied is still a button of the right size, still clickable,
         and still passes every check that asks whether it is there — which is
         how an empty pill shipped once before. */
      const face = await page.evaluate(() => {
        const b = document.getElementById('referenceToggle');
        if (!b) return null;
        const vis = e => e && e.getBoundingClientRect().width > 0 && (e.textContent || '').trim();
        return { glyph: vis(b.querySelector('.rt-i')) || '', all: (b.textContent || '').trim() };
      });
      const wanted = OFFERED.indexOf(id) !== -1;

      if (shown !== wanted) {
        errors.push(wanted
          ? `${id}: no reference button, but this level has sections written for it.`
          : `${id}: a reference button is offered, and there is no reference material for it — ` +
            `the drawer would open empty.`);
        await ctx.close();
        continue;
      }
      if (!wanted) { notes.push(`${id.padEnd(11)} no button, as intended`); await ctx.close(); continue; }

      await page.click('#referenceToggle');
      await page.waitForTimeout(350);

      const seen = await page.evaluate(() => ({
        open: document.querySelector('.reference-panel').classList.contains('is-open'),
        titles: Array.from(document.querySelectorAll('.ref-section summary')).map(e => e.textContent.trim()),
        body: Array.from(document.querySelectorAll('.ref-section li')).map(e => e.textContent).join(' ‖ '),
        unlevelled: (window.__refUnlevelled || []),
        scheme: Array.from(document.querySelectorAll('.ref-section')).filter(function (d) {
          return /VAT schemes/.test(d.querySelector('summary').textContent);
        }).map(function (d) {
          return Array.from(d.querySelectorAll('li')).map(function (li) { return li.textContent; }).join('\n');
        })[0] || '',
        /* Read straight from the governed file, at the paths the panel is
           supposed to use. If the panel reaches for something else it falls
           back silently, and comparing it against the Level 2 fallback would
           only prove the fallback equals itself. */
        governed: (function () {
          var T = window.AAT3_TAX;
          if (!T) return null;
          var r = T.registration, s = T.schemes;
          if (!r || !s) return { broken: true };
          return {
            reg: r.threshold.value, dereg: r.deregistrationThreshold.value,
            cashJoin: s.cashAccounting.joinThreshold.value, cashLeave: s.cashAccounting.leaveThreshold.value,
            annJoin: s.annualAccounting.joinThreshold.value, annLeave: s.annualAccounting.leaveThreshold.value,
            flatJoin: s.flatRate.joinThreshold.value, flatLeave: s.flatRate.leaveThreshold.value
          };
        })()
      }));

      if (face && !face.glyph) {
        errors.push(`${id}: the reference button shows no glyph (its whole label is "${face.all}"). ` +
                    `Below 420px the word is hidden, so a button with no glyph is an empty pill.`);
      }
      if (!seen.open) errors.push(`${id}: pressing the reference button did not open the drawer.`);
      if (!seen.titles.length) errors.push(`${id}: the drawer opened with no sections in it.`);
      if (seen.scheme) schemeText[id] = seen.scheme;
      if (id === 'aat3') schemeText.__governed = seen.governed;

      for (const [what, re] of (FORBIDDEN[id] || [])) {
        if (re.test(seen.body) || re.test(seen.titles.join(' ‖ '))) {
          const hit = (seen.body.match(re) || seen.titles.join(' ').match(re) || [''])[0];
          errors.push(`${id}: the reference drawer teaches ${what} — matched "${String(hit).slice(0, 40)}". ` +
                      `Mark that section for the levels it belongs to.`);
        }
      }
      notes.push(`${id.padEnd(11)} ${String(seen.titles.length).padStart(2)} sections`);
      await ctx.close();
    }

    /* EVERY SECTION MUST SAY WHO IT IS FOR. REFERENCE lives in a closure, so
       this reads the source: a section that forgets `levels` renders for
       nobody, which is a silent disappearance rather than a visible break, and
       none of the per-level assertions above would notice. */
    {
      const src = fs.readFileSync(path.join(ROOT, 'app.js'), 'utf8');
      const from = src.indexOf('const REFERENCE = {');
      const to = src.indexOf('function refMoney(', from);
      if (from === -1 || to === -1) {
        errors.push('Could not find the REFERENCE block in app.js to check that every section is levelled.');
      } else {
        const block = src.slice(from, to);
        const titles = block.match(/\{ title: '(?:[^'\\]|\\.)*',[^\n]*/g) || [];
        const unlevelled = titles.filter(t => t.indexOf('levels:') === -1);
        if (!titles.length) {
          errors.push('No reference sections found in app.js — the shape of REFERENCE has changed and ' +
                      'this check can no longer see whether sections are levelled.');
        }
        for (const t of unlevelled) {
          const name = (t.match(/title: '((?:[^'\\]|\\.)*)'/) || [])[1] || t.slice(0, 50);
          errors.push(`Reference section "${name}" declares no \`levels\`, so it is shown to nobody. ` +
                      `Name the levels it serves.`);
        }
        if (titles.length && !unlevelled.length) {
          notes.push(`levels       all ${titles.length} sections say which levels they serve`);
        }
      }
    }

    /* The Level 2 fallback and the governed Level 3 data must say the same
       thing. Level 2 never loads aat3-tax-data.js, so its copy of the scheme
       thresholds is literals in app.js; Level 3 derives them. Identical text is
       the only thing keeping the two in step. */
    /* THE PANEL MUST ACTUALLY BE READING THE GOVERNED FILE. Matching the
       Level 2 fallback is necessary and not sufficient: an access path that
       misses — AAT3_TAX.vat.schemes rather than AAT3_TAX.schemes — sends Level
       3 down the fallback too, and then the two agree perfectly while neither
       is governed by anything. Every governed figure must appear, formatted, in
       what Level 3 renders. */
    if (schemeText.aat3) {
      const g = schemeText.__governed;
      if (!g) {
        errors.push('Level 3 rendered the VAT schemes without aat3-tax-data.js loaded, so the thresholds ' +
                    'came from the Level 2 fallback rather than the governed file.');
      } else if (g.broken) {
        errors.push('AAT3_TAX no longer exposes `registration` and `schemes` at the top level. The panel ' +
                    'reads those paths, so the thresholds it shows are the fallback, not the governed file.');
      } else {
        const money = (n) => n >= 1000000
          ? '£' + (n / 1000000).toFixed(2).replace(/\.?0+$/, '') + 'm'
          : '£' + n.toLocaleString('en-GB');
        const missing = Object.keys(g)
          .filter(k => schemeText.aat3.indexOf(money(g[k])) === -1)
          .map(k => `${k} (${money(g[k])})`);
        if (missing.length) {
          errors.push(`Level 3's VAT schemes section does not show the governed figure(s) ` +
                      `${missing.join(', ')} from aat3-tax-data.js — the panel is not reading them.`);
        } else {
          notes.push(`VAT schemes  all 8 governed thresholds reach Level 3 from aat3-tax-data.js`);
        }
      }
    }

    /* PROOF THAT THE PANEL READS THE FILE, not merely that it agrees with it.
       Everything above compares numbers, and the fallback literals ARE the
       governed numbers — so a broken access path renders identical text and
       every comparison passes. The only way to tell reading from coinciding is
       to change the data and insist the render changes with it. */
    {
      const { ctx, page } = await open('aat3');
      const followed = await page.evaluate(() => {
        if (!window.AAT3_TAX || !window.AAT3_TAX.schemes || !window.AAT3_TAX.registration) return null;
        window.AAT3_TAX.registration.threshold.value = 91234;
        window.AAT3_TAX.schemes.cashAccounting.joinThreshold.value = 1230000;
        window.AAT3_TAX.schemes.flatRate.leaveThreshold.value = 234567;
        document.getElementById('referenceToggle').click();
        return new Promise(r => setTimeout(() => {
          const sec = Array.from(document.querySelectorAll('.ref-section'))
            .filter(d => /VAT schemes/.test(d.querySelector('summary').textContent))[0];
          r(sec ? sec.textContent : '');
        }, 250));
      });
      await ctx.close();
      if (followed === null) {
        errors.push('Level 3 could not reach AAT3_TAX.registration / .schemes, so the panel cannot be ' +
                    'reading its thresholds from the governed file.');
      } else {
        const want = [['registration threshold', '£91,234'], ['cash accounting join', '£1.23m'],
                      ['flat rate leave', '£234,567']];
        const stuck = want.filter(([, v]) => followed.indexOf(v) === -1).map(([k, v]) => `${k} (${v})`);
        if (stuck.length) {
          errors.push(`Changing aat3-tax-data.js's figures did not change what Level 3 renders — ` +
                      `${stuck.join(', ')} never appeared. The panel is falling back to the literals in ` +
                      `app.js instead of reading the governed file, and the two agree only by coincidence.`);
        } else {
          notes.push('VAT schemes  editing the governed figures changes what Level 3 renders');
        }
      }
    }

    if (schemeText.aat && schemeText.aat3) {
      if (schemeText.aat !== schemeText.aat3) {
        const a = schemeText.aat.split('\n'), b = schemeText.aat3.split('\n');
        const first = a.find((l, i) => l !== b[i]) || '(length differs)';
        errors.push(`The VAT scheme thresholds differ between Level 2 and Level 3. Level 2 uses the ` +
                    `literals in app.js and Level 3 derives them from aat3-tax-data.js, so they have ` +
                    `drifted apart. First difference: "${String(first).slice(0, 110)}"`);
      } else {
        notes.push(`VAT schemes  Level 2's fallback matches the figures Level 3 derives from aat3-tax-data.js`);
      }
      /* One threshold per scheme was the old defect: a reader revising
         "threshold ≤ £150,000" gets every question about LEAVING a scheme
         wrong, and the two figures are measured against different turnovers. */
      for (const scheme of ['Cash accounting', 'Annual accounting', 'Flat rate']) {
        const line = schemeText.aat3.split('\n').find(l => l.indexOf(scheme) === 0);
        if (!line) { errors.push(`The VAT schemes section no longer covers ${scheme}.`); continue; }
        if (!/[Jj]oin/.test(line) || !/[Ll]eave/.test(line)) {
          errors.push(`${scheme} gives only one threshold — "${line.slice(0, 90)}". Joining and leaving ` +
                      `have different limits, and for the flat rate scheme they are measured against ` +
                      `different turnover figures.`);
        }
      }
    } else if (schemeText.aat3 || schemeText.aat) {
      errors.push('The VAT schemes section reaches only one of Levels 2 and 3, so the two copies of its ' +
                  'thresholds can no longer be compared.');
    }
  } finally {
    await browser.close();
    server.close();
  }

  console.log(`${BOLD}Reference drawer${RESET}\n`);
  notes.forEach(n => console.log(`  ${DIM}${n}${RESET}`));
  console.log('');
  if (errors.length) {
    errors.forEach(e => console.log(`  ${RED}✗${RESET}  ${e}`));
    console.log(`\n${RED}${BOLD}${errors.length} problem(s) with the reference drawer.${RESET}\n`);
    process.exit(1);
  }
  console.log(`  ${GREEN}✓  each level's drawer holds its own material and nothing its syllabus excludes${RESET}\n`);
})();
