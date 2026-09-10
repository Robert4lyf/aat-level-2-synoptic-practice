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
        items: Array.from(document.querySelectorAll('.ref-section li')).map(e => e.textContent),
        /* `open` is the attribute, not a guess from geometry. A <details> that
           is closed still has its <li>s in the DOM with their text intact,
           which is why every other assertion here reads the same either way —
           and why nothing would notice `open` being put back. */
        expanded: Array.from(document.querySelectorAll('.ref-section')).filter(d => d.open).length,
        sections: Array.from(document.querySelectorAll('.ref-section')).map(function (d) {
          return {
            title: d.querySelector('summary') ? d.querySelector('summary').textContent.trim() : '(untitled)',
            items: d.querySelectorAll('li').length
          };
        }),
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
        })(),
        /* WHAT THE LEVEL 3 DRAWER MUST BE SHOWING, built HERE from the governed
           file rather than typed into this checker. Each needle is the exact
           substring the panel should render for that figure, so a literal typed
           into app.js passes today and fails the moment aat3-tax-data.js rolls
           to a new Finance Act — which is the drift this is for. Comparing the
           panel against a copy in the checker would only prove the copy equals
           itself. */
        tpfbNeedles: (function () {
          var T = window.AAT3_TAX;
          if (!T) return null;
          var m = function (n) {
            if (n >= 1000000) return '£' + (n / 1000000).toFixed(2).replace(/\.?0+$/, '') + 'm';
            return '£' + n.toLocaleString('en-GB');
          };
          var reg = T.registration, rec = T.records, inv = T.invoicing, pe = T.partialExemption;
          var ec = T.errorCorrection, pf = ec.penaltyForError, a = T.assessments;
          var ls = T.penalties.lateSubmission, lp = T.penalties.latePayment, fn = T.penalties.failureToNotify;
          var b = T.blockedExpenses, f = T.fuelScaleCharges, bd = T.badDebtRelief;
          var pr = T.payroll.records, pay = T.payroll.paymentToHmrc;
          var lf = T.payroll.penalties.lateFiling, plp = T.payroll.penalties.latePayment;
          return [
            ['VAT rates', T.rates.standard.value + '% · reduced rate ' + T.rates.reduced.value + '%'],
            ['actual tax point window', 'within ' + inv.actualTaxPointDays.value + ' days AFTER'],
            ['invoice issue window', 'within ' + inv.issueWithinDays.value + ' days of the tax point'],
            ['registration threshold', 'exceeded ' + m(reg.threshold.value)],
            ['deregistration threshold', 'fall below ' + m(reg.deregistrationThreshold.value)],
            ['changes in advance', reg.changesToNotify.inAdvanceDays.value + ' days IN ADVANCE'],
            ['failure to notify', fn.behaviours.nonDeliberate.max + '% non-deliberate, ' + fn.behaviours.deliberate.max + '% deliberate'],
            ['VAT record retention', 'at least ' + rec.retentionYears.value + ' years'],
            ['VAT records penalty', 'penalty of up to ' + m(rec.penalty.value)],
            ['simplified invoice limit', 'at or below ' + m(inv.simplifiedLimit.value)],
            ['leased car proportion', 'exactly ' + b.cars.hiredOrLeased.value + '% of the input tax'],
            ['CO2 rounding', 'multiple of ' + f.roundDownToMultipleOf.value + ' g/km'],
            ['bad debt age', 'at least ' + bd.debtAgeMonths.value + ' months overdue'],
            ['bad debt claim window', 'Claim within ' + bd.claimWindow.value],
            ['de minimis monthly', 'below ' + m(pe.deMinimisPerMonth.value) + ' a month'],
            ['de minimis proportion', 'no more than ' + pe.inputTaxProportion.value + '% of total input tax'],
            ['error method 1 limit', 'greater of ' + m(ec.netErrorLimit.value)],
            ['error ceiling', 'absolute ceiling of ' + m(ec.absoluteCeiling.value)],
            ['error notification form', 'form ' + ec.separateNotificationForm],
            ['error time limit', 'within ' + ec.timeLimitYears.value + ' years'],
            ['submission thresholds', ls.thresholds.annual + ' points for annual returns, ' + ls.thresholds.quarterly + ' for quarterly, ' + ls.thresholds.monthly + ' for monthly'],
            ['submission penalty', 'a ' + m(ls.penalty.value) + ' penalty'],
            ['late payment day 15', lp.firstPenaltyDay15.value + '% of what is outstanding at day 15'],
            ['late payment annualised', lp.secondPenaltyAnnualised.value + '% a year'],
            ['careless penalty', 'Careless: maximum ' + pf.careless.max + '%'],
            ['deliberate penalty', 'Deliberate: maximum ' + pf.deliberate.max + '%'],
            ['concealed penalty', 'concealed: maximum ' + pf.deliberateAndConcealed.max + '%'],
            ['assessment window', 'within ' + a.normalTimeLimitYears.value + ' years, extended to ' + a.extendedTimeLimitYears.value],
            ['payroll retention', 'records for ' + pr.retentionYears.value + ' years'],
            ['payroll records penalty', 'up to ' + m(pr.penalty.value)],
            ['PAYE electronic deadline', 'by the ' + pay.electronicDeadline.value + 'nd of the following month'],
            ['PAYE quarterly threshold', 'under ' + m(pay.quarterlyThreshold.value) + ' a month'],
            ['late FPS smallest band', m(lf.byEmployees['1to9']) + ' for 1–9 employees'],
            ['late FPS largest band', m(lf.byEmployees['250plus']) + ' for 250 or more'],
            ['extended payroll failure', lf.extendedFailurePercent.value + '% of the tax that should have been reported'],
            ['payroll default bands', plp.byDefaults['1to3'] + '% for 1–3, ' + plp.byDefaults['4to6'] + '% for 4–6'],
            ['payroll six-month addition', 'further ' + plp.sixMonths.value + '% if still unpaid after 6 months']
          ];
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

      /* ── NOTHING RENDERS AS PLUMBING ─────────────────────────────────────
         Every figure in the Level 3 tax sections is reached through a node in
         aat3-tax-data.js, and those nodes wrap their figure in `.value`. Read
         one without it and JavaScript does not complain: it stringifies the
         object, and the drawer confidently shows "Claim within [object
         Object]." to somebody revising bad debt relief. That shipped into this
         very panel while it was being written, and only reading the rendered
         page caught it — no unit test on the data would, because the data is
         fine. `undefined` and `NaN` are the same failure through a mistyped
         path or a missing field. */
      (seen.items || []).forEach(function (li) {
        var m = /\[object Object\]|\bundefined\b|\bNaN\b|\bnull\b/.exec(li);
        if (m) errors.push(`${id}: a reference line renders "${m[0]}" — a data node read without .value, or a path that does not exist:\n      ${li.slice(0, 150)}`);
      });

      /* ── SECTIONS START CLOSED, AND STILL OPEN ───────────────────────────
         Closed by default is what makes a 23-section drawer usable: the titles
         fit on a phone screen and one tap gets the answer. Both halves are
         asserted, because each fails in a way the other hides. All-expanded
         passes every text assertion in this file, since a closed <details>
         keeps its text in the DOM. And a section that cannot be opened would
         satisfy "starts closed" perfectly while being useless. */
      if (seen.expanded !== 0) {
        errors.push(`${id}: ${seen.expanded} reference section(s) render already expanded. ` +
                    `The drawer is meant to open as a list of titles — every text assertion here ` +
                    `passes either way, so nothing else would catch this.`);
      }
      /* A REAL click, not element.click(). The synthetic one dispatches the
         event straight at the node and ignores pointer-events, overlays and
         anything sitting on top — a section made untappable by CSS passed that
         version of this check perfectly. Playwright's click hit-tests the
         point a thumb would land on, so it fails when a reader's would. */
      let tapped = null;
      if (!(await page.locator('.ref-section summary').count())) {
        errors.push(`${id}: no reference section to open.`);
      } else {
        try {
          await page.locator('.ref-section summary').first().click({ timeout: 3000 });
          await page.waitForTimeout(150);
          tapped = await page.evaluate(() => {
            const d = document.querySelector('.ref-section');
            return { open: d.open, itemsVisible: Array.from(d.querySelectorAll('li')).some(li => li.offsetHeight > 0) };
          });
        } catch (e) {
          errors.push(`${id}: a section heading could not be clicked where a reader would tap it — ` +
                      `${String(e.message).split('\n')[0]}`);
        }
        if (tapped && (!tapped.open || !tapped.itemsVisible)) {
          errors.push(`${id}: tapping a section heading did not reveal its lines ` +
                      `(open=${tapped.open}, any line visible=${tapped.itemsVisible}). ` +
                      `Closed by default is only right if opening works.`);
        }
      }

      /* ── EVERY SECTION HAS SOMETHING IN IT ───────────────────────────────
         The Level 3 sections return [] when window.AAT3_TAX is missing, which
         is the right way to fail — it costs the section rather than throwing
         inside renderReferencePanel() and taking the whole drawer down. But a
         guard that becomes the normal path is a silent empty panel, so an
         empty section is a failure here rather than a shrug. */
      (seen.sections || []).forEach(function (sec) {
        if (!sec.items) errors.push(`${id}: section “${sec.title}” rendered with no items — its data source is missing, not merely different.`);
      });

      /* ── THE FIGURES ARE THE GOVERNED ONES ───────────────────────────────
         Level 3 only. Each needle was built in-page from aat3-tax-data.js, so
         this compares the panel against the file rather than against a second
         copy kept here. */
      if (id === 'aat3') {
        if (!seen.tpfbNeedles) {
          errors.push('aat3: window.AAT3_TAX was not loaded when the drawer rendered, so no figure could be checked against it.');
        } else {
          seen.tpfbNeedles.forEach(function (pair) {
            if (seen.body.indexOf(pair[1]) === -1) {
              errors.push(`aat3: the drawer does not show the governed ${pair[0]} — aat3-tax-data.js gives "${pair[1]}", and nothing in the panel matches it.`);
            }
          });
          notes.push(`aat3         ${seen.tpfbNeedles.length} figures matched against aat3-tax-data.js`);
        }
      }

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
        /* The same trick, applied to the tax sections the drawer gained. A
           needle built from the file cannot tell a figure that was READ from
           one that was TYPED and happens to agree — 30% is 30% either way. It
           can only tell them apart once the file says something else, so the
           file is made to say something else here. Every sentinel is a value
           no Finance Act would produce, so a match is proof of a read. */
        const T = window.AAT3_TAX;
        T.records.retentionYears.value = 47;
        T.records.penalty.value = 4321;
        T.invoicing.simplifiedLimit.value = 271;
        T.invoicing.actualTaxPointDays.value = 41;
        T.partialExemption.inputTaxProportion.value = 57;
        T.errorCorrection.absoluteCeiling.value = 54321;
        T.errorCorrection.penaltyForError.careless.max = 37;
        T.penalties.lateSubmission.penalty.value = 271;
        T.penalties.latePayment.secondPenaltyAnnualised.value = 17;
        T.assessments.extendedTimeLimitYears.value = 27;
        T.blockedExpenses.cars.hiredOrLeased.value = 57;
        T.badDebtRelief.debtAgeMonths.value = 61;
        T.payroll.records.retentionYears.value = 43;
        T.payroll.paymentToHmrc.quarterlyThreshold.value = 1543;
        T.payroll.penalties.lateFiling.byEmployees['250plus'] = 447;
        T.payroll.penalties.latePayment.sixMonths.value = 53;
        document.getElementById('referenceToggle').click();
        return new Promise(r => setTimeout(() => {
          const sec = Array.from(document.querySelectorAll('.ref-section'))
            .filter(d => /VAT schemes/.test(d.querySelector('summary').textContent))[0];
          r({
            schemes: sec ? sec.textContent : '',
            body: Array.from(document.querySelectorAll('.ref-section li')).map(e => e.textContent).join(' ‖ ')
          });
        }, 250));
      });
      await ctx.close();
      if (followed === null) {
        errors.push('Level 3 could not reach AAT3_TAX.registration / .schemes, so the panel cannot be ' +
                    'reading its thresholds from the governed file.');
      } else {
        const want = [['registration threshold', '£91,234'], ['cash accounting join', '£1.23m'],
                      ['flat rate leave', '£234,567']];
        const stuck = want.filter(([, v]) => followed.schemes.indexOf(v) === -1).map(([k, v]) => `${k} (${v})`);

        /* Every TPFB section carries at least one perturbed figure, so a
           section that quietly stopped reading the file is named by its own
           row rather than hidden behind a neighbour that still does. */
        const wantTpfb = [
          ['VAT record retention', '47 years'],
          ['VAT records penalty', '£4,321'],
          ['simplified invoice limit', '£271 including VAT'],
          ['actual tax point window', '41 days AFTER'],
          ['de minimis proportion', '57% of total input tax'],
          ['error correction ceiling', '£54,321'],
          ['careless inaccuracy maximum', 'Careless: maximum 37%'],
          ['late submission penalty', '£271 penalty'],
          ['late payment annualised rate', '17% a year'],
          ['extended assessment window', 'extended to 27'],
          ['leased car proportion', 'exactly 57% of the input tax'],
          ['bad debt age', '61 months overdue'],
          ['payroll record retention', 'records for 43 years'],
          ['payroll quarterly threshold', '£1,543 a month'],
          ['largest late-FPS band', '£447 for 250 or more'],
          ['payroll six-month addition', 'further 53%']
        ];
        const frozen = wantTpfb.filter(([, v]) => followed.body.indexOf(v) === -1).map(([k, v]) => `${k} (expected "${v}")`);
        if (frozen.length) {
          errors.push(`Changing aat3-tax-data.js did not change what the Level 3 tax sections render — ` +
                      `${frozen.join('; ')}. Those figures are typed into app.js, not read from the governed ` +
                      `file, and they agree with it only until the next Finance Act.`);
        } else {
          notes.push(`TPFB tax     all ${wantTpfb.length} perturbed figures moved with aat3-tax-data.js`);
        }
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
