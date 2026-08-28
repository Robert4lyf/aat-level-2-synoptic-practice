#!/usr/bin/env node
/**
 * Do the Level 2 exams still rehearse the qualification they claim to?
 *
 * Level 2 has offered a synoptic mock and three unit assessments for a long
 * time, and everything anyone knew about whether they were RIGHT was written in
 * comments beside the numbers. A comment saying "120 minutes, as the real
 * assessment allows" is not evidence; it is a note about what someone believed
 * on the day they typed it, and it stays green while the number beside it
 * drifts, while the specification is revised, and while the question bank grows
 * in a way that starves a task the draw is supposed to fill.
 *
 * So this asks the specification instead. aat2-syllabus.js is the record of
 * what AAT publishes — durations, marking, unit weightings, which unit is the
 * synoptic — and every assertion below compares the app against THAT rather
 * than against a comment.
 *
 * WHAT IT ASSERTS
 *   the synoptic runs for as long as BESY is given, read from the syllabus
 *   each unit assessment runs for its own unit's published duration
 *   every non-synoptic unit has an assessment, and the synoptic unit has none
 *   Principles of Costing never appears in a synoptic it is not part of
 *   the blueprint totals 100 marks, split across the areas the real paper is
 *   the written tasks match a paper the syllabus calls partially human-marked
 *   the bank can actually FILL every task, which is the failure a blueprint
 *     cannot show you: a quota nothing satisfies produces a short paper and a
 *     percentage out of the wrong denominator
 *   a paper built by the real builder is the length and shape it promises
 *
 * Driven through the real builders, in a browser, over the real bank. app.js
 * names them on window.__AAT2_EXAM for this purpose and freezes what it hands
 * over, so a check cannot scribble on the app it is inspecting.
 *
 * Run: node scripts/check-aat2-exams.js
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
  console.log(`${BOLD}AAT Level 2 exams vs. the specification${RESET}\n`);
  if (process.env.REQUIRE_PLAYWRIGHT) {
    console.log(`  ${RED}✗${RESET}  Playwright is required here and is not installed: ${e.message}\n`);
    process.exit(1);
  }
  console.log(`  ${YEL}⚠${RESET}  Playwright is not installed — skipping.\n`);
  process.exit(0);
}

const SYL = require('../aat2-syllabus.js').SYLLABUS;

let failures = 0, checks = 0;
function ok(cond, label) {
  checks++;
  if (!cond) { failures++; console.log(`  ${RED}✗${RESET} ${label}`); }
}

const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.webmanifest': 'application/manifest+json',
  '.png': 'image/png', '.svg': 'image/svg+xml' };

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

/* Which unit is the synoptic, and which are sat on their own, taken from the
   specification rather than from a list typed into the app. */
const UNITS = Object.keys(SYL.units).map(k => Object.assign({ key: k }, SYL.units[k]));
const SYNOPTIC_UNIT = UNITS.find(u => u.assessment && u.assessment.synoptic);
const UNIT_EXAM_UNITS = UNITS.filter(u => !(u.assessment && u.assessment.synoptic));

console.log(`${BOLD}AAT Level 2 exams vs. the specification${RESET}\n`);

(async () => {
  const { server, port } = await serve();
  const CANDIDATES = [
    '/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell',
    '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  ].filter(p => fs.existsSync(p));
  const browser = await chromium.launch(CANDIDATES.length ? { executablePath: CANDIDATES[0] } : {});

  try {
    const ctx = await browser.newContext();
    const page = await ctx.newPage();
    const pageErrors = [];
    page.on('pageerror', e => pageErrors.push('uncaught: ' + e.message));
    await page.addInitScript(() => localStorage.setItem('multisubject_active', 'aat'));
    await page.goto(`http://127.0.0.1:${port}/`, { waitUntil: 'load' });
    await page.waitForFunction(() => window.__AAT2_EXAM && Array.isArray(window.ALL_QUESTIONS)
      && window.ALL_QUESTIONS.length > 0, { timeout: 15000 });

    ok(pageErrors.length === 0, `the app loads without an uncaught error (${pageErrors.join('; ')})`);

    const spec = await page.evaluate(() => {
      const E = window.__AAT2_EXAM;
      return {
        blueprint: E.SYNOPTIC_BLUEPRINT,
        totalMarks: E.SYNOPTIC_TOTAL_MARKS,
        excluded: E.SYNOPTIC_EXCLUDED_TOPICS,
        durationMs: E.MOCK_DURATION_MS,
        types: E.MOCK_TYPES,
        units: E.UNIT_ASSESSMENTS,
        bankSize: window.ALL_QUESTIONS.length,
      };
    });

    /* ── 1. The clock ─────────────────────────────────────────────────────── */
    console.log(`${DIM}1. How long each exam runs${RESET}`);
    {
      const want = SYNOPTIC_UNIT.assessment.durationMinutes;
      ok(spec.durationMs === want * 60000,
        `the synoptic runs for the ${want} minutes ${SYNOPTIC_UNIT.code} is given (app says ${spec.durationMs / 60000})`);
      spec.units.forEach(u => {
        const syl = SYL.units[u.id];
        ok(!!syl, `unit assessment "${u.id}" is a unit the qualification actually has`);
        if (syl) {
          ok(u.durationMin === syl.assessment.durationMinutes,
            `${syl.code} runs for its published ${syl.assessment.durationMinutes} minutes (app says ${u.durationMin})`);
          ok(u.title === syl.title, `${syl.code} is offered under its published title (app says "${u.title}")`);
        }
      });
    }

    /* ── 2. Which exams exist at all ──────────────────────────────────────── */
    console.log(`${DIM}2. Which exams exist${RESET}`);
    {
      const offered = spec.units.map(u => u.id).sort();
      const expected = UNIT_EXAM_UNITS.map(u => u.key).sort();
      ok(offered.join(',') === expected.join(','),
        `every separately assessed unit has an assessment and no others do (offered ${offered.join(', ')}; expected ${expected.join(', ')})`);
      ok(!offered.includes(SYNOPTIC_UNIT.key),
        `${SYNOPTIC_UNIT.code} is not offered as a unit assessment — it is the synoptic`);
    }

    /* ── 3. What the synoptic covers ──────────────────────────────────────── */
    console.log(`${DIM}3. What the synoptic covers${RESET}`);
    {
      ok(spec.totalMarks === 100, `the blueprint totals 100 marks (got ${spec.totalMarks})`);
      ok(spec.blueprint.length === 8, `the paper is 8 tasks (got ${spec.blueprint.length})`);
      ok(spec.blueprint.every((t, i) => t.n === i + 1), 'the tasks are numbered 1..n in order');
      ok(spec.blueprint.every(t => t.areas.reduce((s, a) => s + a.marks, 0) === t.marks),
        'each task\'s area quotas add up to the task\'s own mark allocation');
      ok(spec.blueprint.every(t => t.markRange && t.markRange[0] <= t.marks && t.marks <= t.markRange[1]),
        'each task\'s marks sit inside the spread that task is observed to take');

      /* POC is a unit assessment only. The synoptic is BESY in full plus the
         parts of ITBK and POBC it draws on — a costing question in it would be
         teaching the reader to expect something that cannot appear. */
      ok(spec.excluded.includes('poc'),
        'Principles of Costing is excluded from the synoptic, which it is not part of');
      const areas = [].concat(...spec.blueprint.map(t => t.areas.map(a => a.area)));
      ok(!areas.some(a => a === 'poc' || a.indexOf('poc-') === 0),
        'and no task asks for costing marks by the back door');

      /* The published split. BESY is the synoptic unit and carries most of the
         paper; ITBK and POBC contribute the bookkeeping halves of Tasks 4
         and 7. Asserted as a band, not a number: per-sitting allocations vary,
         which is what markRange records. */
      const byArea = {};
      spec.blueprint.forEach(t => t.areas.forEach(a => {
        const bucket = a.area.indexOf('besy') === 0 ? 'besy' : a.area;
        byArea[bucket] = (byArea[bucket] || 0) + a.marks;
      }));
      const pc = k => Math.round(((byArea[k] || 0) / spec.totalMarks) * 100);
      ok(pc('besy') >= 60 && pc('besy') <= 75, `BESY carries most of the paper (got ${pc('besy')}%)`);
      ok(pc('itbk') >= 15 && pc('itbk') <= 25, `Introduction to Bookkeeping carries about a fifth (got ${pc('itbk')}%)`);
      ok(pc('pobc') >= 5 && pc('pobc') <= 15, `Principles of Bookkeeping Controls carries about a tenth (got ${pc('pobc')}%)`);
      ok(pc('besy') + pc('itbk') + pc('pobc') >= 99, 'and those three account for the whole paper');

      /* The synoptic is the one Level 2 assessment the specification does not
         call computer-marked. The written tasks are why. */
      ok(/human/i.test(SYNOPTIC_UNIT.assessment.marking),
        `the specification calls the synoptic ${SYNOPTIC_UNIT.assessment.marking.toLowerCase()}`);
      const written = spec.blueprint.filter(t => t.written);
      ok(written.length === 2, `two tasks carry an extended written response (got ${written.length})`);
      ok(written.every(t => t.areas.some(a => a.written)),
        'and each names which of its areas is the written element');
      ok(spec.types.includes('written'), 'the paper can draw a written question at all');
    }

    /* ── 4. The bank can fill what the blueprint asks for ─────────────────── */
    console.log(`${DIM}4. The bank can fill the paper${RESET}`);
    {
      /* THE FAILURE A BLUEPRINT CANNOT SHOW YOU. A task whose area has too few
         questions produces a short paper: the reader sits ninety-something
         marks believing it is a hundred, and their percentage is out of the
         wrong denominator. This asks the real bank, area by area. */
      const supply = await page.evaluate(() => {
        const E = window.__AAT2_EXAM;
        const out = [];
        E.SYNOPTIC_BLUEPRINT.forEach(t => t.areas.forEach(a => {
          const pool = window.ALL_QUESTIONS.filter(q =>
            E.SYNOPTIC_EXCLUDED_TOPICS.indexOf(q.topic) === -1 &&
            E.MOCK_TYPES.indexOf(q.type || 'mcq') !== -1 &&
            E.matchesArea(q, a.area));
          out.push({
            task: t.n, area: a.area, quota: a.marks,
            count: pool.length,
            marks: pool.reduce((s, q) => s + E.questionMarks(q), 0),
            written: pool.filter(q => q.type === 'written').length,
            wantsWritten: !!a.written,
          });
        }));
        return out;
      });

      supply.forEach(s => {
        ok(s.count > 0, `Task ${s.task}'s "${s.area}" has questions at all`);
        /* Twice the quota, not once: the draw skips anything that would
           overshoot, so an area whose marks only just cover its quota cannot
           fill it once a 4-mark grid lands in a 5-mark hole. */
        ok(s.marks >= s.quota * 2,
          `Task ${s.task}'s "${s.area}" has room to draw ${s.quota} marks more than one way (${s.marks} marks available)`);
        if (s.wantsWritten) {
          ok(s.written > 0, `Task ${s.task}'s written element has a written question to anchor it (${s.area})`);
        }
      });

      const unitSupply = await page.evaluate(() => {
        const E = window.__AAT2_EXAM;
        const out = {};
        E.UNIT_ASSESSMENTS.forEach(u => {
          const pool = window.ALL_QUESTIONS.filter(q =>
            q.topic === u.id && E.MOCK_TYPES.indexOf(q.type || 'mcq') !== -1);
          out[u.id] = { count: pool.length, marks: pool.reduce((s, q) => s + E.questionMarks(q), 0) };
        });
        return out;
      });
      spec.units.forEach(u => {
        const avail = unitSupply[u.id] || { count: 0, marks: 0 };
        ok(avail.marks >= u.marks,
          `the ${u.id.toUpperCase()} bank can fill a ${u.marks}-mark assessment (${avail.marks} marks over ${avail.count} questions)`);
      });
    }

    /* ── 5. A paper the builder actually builds ───────────────────────────── */
    console.log(`${DIM}5. Papers the real builder builds${RESET}`);
    {
      const papers = await page.evaluate(() => {
        const E = window.__AAT2_EXAM;
        const out = [];
        for (let i = 0; i < 25; i++) {
          const qs = E.buildSynopticMock();
          const byTask = {};
          qs.forEach(q => { byTask[q._task] = (byTask[q._task] || 0) + q._marks; });
          out.push({
            n: qs.length,
            marks: qs.reduce((s, q) => s + q._marks, 0),
            tasks: Object.keys(byTask).length,
            byTask,
            topics: [...new Set(qs.map(q => q.topic))],
            dupes: qs.length - new Set(qs.map(q => q.id)).size,
            hasWritten: qs.some(q => q.type === 'written'),
          });
        }
        return out;
      });

      const shortest = Math.min(...papers.map(p => p.marks));
      const longest = Math.max(...papers.map(p => p.marks));
      ok(shortest >= 95 && longest <= 105,
        `every paper lands within five marks of a hundred (${shortest}–${longest} across 25 papers)`);
      ok(papers.every(p => p.tasks === 8), 'every paper has all eight tasks');
      ok(papers.every(p => p.dupes === 0), 'no paper asks the same question twice');
      ok(papers.every(p => !p.topics.includes('poc')),
        'no paper across 25 sittings contains a costing question');
      ok(papers.every(p => p.hasWritten),
        'every paper contains the extended written response the real one is marked by hand for');
      ok(papers.every(p => spec.blueprint.every(t => (p.byTask[t.n - 1] || 0) >= Math.floor(t.marks * 0.8))),
        'every task on every paper reaches at least four fifths of its allocation');

      const unitPapers = await page.evaluate(() => {
        const E = window.__AAT2_EXAM;
        return E.UNIT_ASSESSMENTS.map(u => {
          const qs = E.buildUnitAssessment(u.id);
          return {
            id: u.id, want: u.marks,
            marks: qs.reduce((s, q) => s + q._marks, 0),
            topics: [...new Set(qs.map(q => q.topic))],
            dupes: qs.length - new Set(qs.map(q => q.id)).size,
          };
        });
      });
      unitPapers.forEach(p => {
        ok(p.marks >= p.want, `the ${p.id.toUpperCase()} assessment reaches its ${p.want} marks (got ${p.marks})`);
        ok(p.topics.length === 1 && p.topics[0] === p.id,
          `and asks nothing outside ${p.id.toUpperCase()} (drew ${p.topics.join(', ')})`);
        ok(p.dupes === 0, `and asks nothing twice`);
      });
    }

    console.log();
    console.log(`  ${DIM}${spec.bankSize} questions in the bank · synoptic ${spec.totalMarks} marks over ` +
      `${spec.blueprint.length} tasks in ${spec.durationMs / 60000} min · ` +
      `${spec.units.length} unit assessments${RESET}`);
  } finally {
    await browser.close();
    server.close();
  }

  console.log();
  if (failures) {
    console.log(`${RED}${BOLD}── ${failures} of ${checks} checks failed${RESET}`);
    process.exit(1);
  }
  console.log(`${GREEN}${BOLD}── The Level 2 exams match the specification ✓${RESET} ${DIM}(${checks} checks)${RESET}`);
})().catch(e => { console.error(e); process.exit(1); });
