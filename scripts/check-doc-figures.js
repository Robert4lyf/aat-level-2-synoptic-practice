#!/usr/bin/env node
/* Source documents: does the paper add up?
 *
 * WHY THIS EXISTS
 *
 * The three AAT courses now draw invoices, credit notes, statements, payslips
 * and bank statements on the lesson cards, from data, through doc-figure.js.
 * The whole value of that is that a reader can take a figure off the document
 * and work with it. So the figures have to be right — and "right" here is not
 * a matter of taste, it is arithmetic:
 *
 *   · a line extends:            quantity × unit price = amount
 *   · a line with a VAT split:   net + VAT = total
 *   · the totals block chains:   subtotals agree, discounts come off,
 *                                VAT is the stated percentage of the net,
 *                                and the last line equals the running figure
 *   · a statement runs:          every balance is the one before it, plus
 *                                the charge and less the payment on that row
 *   · the annotations match:     every mark printed on the document is
 *                                explained in its legend, and every mark in
 *                                the legend is printed on the document
 *
 * A fabricated invoice that does not add up teaches a reader to distrust
 * arithmetic, which is the opposite of the subject. Written as HTML in a
 * `visual` none of this could be asked; written as data, all of it can.
 *
 * DOCUMENTS THAT ARE WRONG ON PURPOSE
 *
 * Some are meant to be. "What can be wrong" in Checking a supplier invoice
 * shows an invoice with a line extended wrongly and a total that does not add,
 * because that is the lesson. Such a document carries a `planted` note saying
 * what is wrong with it, and then this check INVERTS: the arithmetic failures
 * are expected, and it is a document with a `planted` note and nothing wrong
 * with it that fails the build. A note cannot outlive the errors it describes,
 * and a real mistake cannot hide behind one.
 */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const RED = '\x1b[31m', GREEN = '\x1b[32m', DIM = '\x1b[2m', BOLD = '\x1b[1m', RESET = '\x1b[0m';

const DocFigure = require(path.join(ROOT, 'doc-figure.js'));
const { AAT1_LEARN_PATH } = require(path.join(ROOT, 'aat1-learn-data.js'));
const { AAT3_LEARN_PATH } = require(path.join(ROOT, 'aat3-learn-data.js'));
global.window = global.window || {};
require(path.join(ROOT, 'learn-data.js'));
const LEARN_PATH = global.window.LEARN_PATH;

const errors = [];
const notes = [];

/* ── Gathering ────────────────────────────────────────────────────────────── */
/* A document can hang off a lesson card or off a question — Level 1 puts one
   in front of a reader and asks them to read a figure off it. Both count. */
const docs = [];
function walk(course, units) {
  (units || []).forEach((u) => {
    (u.lessons || []).forEach((l) => {
      (l.cards || []).forEach((c, i) => {
        if (c.doc) docs.push({ where: `${course} ${l.id || l.title} card ${i} (${c.h || ''})`, d: c.doc });
      });
      (l.questions || []).forEach((q, i) => {
        if (q.doc) docs.push({ where: `${course} ${l.id || l.title} question ${i}`, d: q.doc });
      });
    });
  });
}
walk('L1', AAT1_LEARN_PATH);
walk('L2', LEARN_PATH);
walk('L3', AAT3_LEARN_PATH);

/* ── Reading a figure off a document ──────────────────────────────────────── */
/* Everything printed on these is a string, because that is what a document is:
   "1,200.00", "(150.00)", "£6.50", "②(120.00)". Parentheses mean a deduction,
   the same convention the paper uses. An empty cell or a dash is not a figure
   and is not an error either — a statement's brought-forward row has no charge
   and no payment. */
const MARK_RE = /[①②③④⑤⑥⑦⑧⑨⑩]/g;
function num(s) {
  let t = String(s == null ? '' : s).replace(MARK_RE, '').replace(/[*`£\s,]/g, '');
  if (t === '' || t === '—' || t === '-' || t === 'n/a') return null;
  let neg = false;
  if (/^\(.*\)$/.test(t)) { neg = true; t = t.slice(1, -1); }
  if (/^[−-]/.test(t)) { neg = true; t = t.slice(1); }
  if (!/^\d+(\.\d+)?$/.test(t)) return NaN;
  const v = parseFloat(t);
  return neg ? -v : v;
}
const money = (v) => (v < 0 ? `(${Math.abs(v).toFixed(2)})` : v.toFixed(2));
const near = (a, b, tol) => Math.abs(a - b) <= (tol == null ? 0.01 : tol);
const plain = (s) => String(s == null ? '' : s).replace(MARK_RE, '').replace(/[*`]/g, '').trim();

const SUBTOTAL = /^(net|subtotal|sub-total|goods|gross|total net|total goods)/i;
const IS_VAT = /\bvat\b/i;
const IS_DISCOUNT = /discount/i;

/* ── One document ─────────────────────────────────────────────────────────── */
function checkDoc(where, d) {
  const fail = [];                        // arithmetic — inverted by `planted`
  const bad = (m) => errors.push(`${where}: ${m}`);

  if (DocFigure.KINDS.indexOf(d.kind || 'generic') === -1) {
    bad(`kind "${d.kind}" is not one doc-figure.js styles — add it to KINDS and give it a rule, or use one of ${DocFigure.KINDS.join(', ')}.`);
  }
  if (!d.title) bad('has no title, so its header strip reads "Document".');

  /* ── The table ──────────────────────────────────────────────────────────── */
  let base = null;                        // sum of an "Amount" column, if any
  const T = d.table;
  if (T) {
    const heads = (T.headers || []).map(plain);
    const rows = T.rows || [];
    if (!heads.length) bad('has a table with no headers; a column of figures nobody has labelled is not a document.');
    rows.forEach((r, i) => {
      if (heads.length && r.length !== heads.length) {
        bad(`table row ${i + 1} has ${r.length} cells against ${heads.length} headers.`);
      }
    });
    (T.align || []).forEach((a, i) => {
      if (a !== 'text' && a !== 'num') bad(`table align[${i}] is "${a}"; only "text" and "num" exist.`);
    });

    const col = (re) => heads.findIndex((h) => re.test(h));
    const iQty = col(/^(qty|quantity|hours|units|no\.)/i);
    const iPrice = col(/(price|rate|each)/i);
    const iAmount = col(/^amount/i);
    const iNet = col(/^net/i);
    const iVat = col(/^vat/i);
    const iTotal = col(/^total/i);

    /* Every cell in a column headed like money must BE money. A stray
       character in a figure renders as a figure and reads as one. */
    heads.forEach((h, i) => {
      /* A money column is one headed with a £, because that is the convention
         these documents are written to. Guessing from the words instead read
         "Payments" as a money column on a payslip, where it heads the
         description, and "VAT" as one on a mixed-rated invoice, where it
         holds "20%". A rule you can see in the data beats a clever one. */
      if (i === 0 || !/£/.test(h)) return;
      rows.forEach((r, ri) => {
        if (num(r[i]) !== null && Number.isNaN(num(r[i]))) {
          bad(`table row ${ri + 1}, column "${h}": "${r[i]}" is in a money column and is not a figure.`);
        }
      });
    });

    if (iQty !== -1 && iPrice !== -1 && iAmount !== -1) {
      rows.forEach((r, ri) => {
        const q = num(r[iQty]), p = num(r[iPrice]), a = num(r[iAmount]);
        if (q == null || p == null || a == null || [q, p, a].some(Number.isNaN)) return;
        if (!near(q * p, a)) {
          fail.push(`line ${ri + 1} extends ${q} × ${money(p)} as ${money(a)}; it is ${money(q * p)}.`);
        }
      });
    }
    if (iNet !== -1 && iVat !== -1 && iTotal !== -1) {
      rows.forEach((r, ri) => {
        const n = num(r[iNet]), v = num(r[iVat]), t = num(r[iTotal]);
        if (n == null || v == null || t == null || [n, v, t].some(Number.isNaN)) return;
        if (!near(n + v, t)) {
          fail.push(`line ${ri + 1} splits ${money(t)} as ${money(n)} net plus ${money(v)} VAT, which comes to ${money(n + v)}.`);
        }
      });
    }
    if (iAmount !== -1) {
      base = rows.reduce((acc, r) => {
        const v = num(r[iAmount]);
        return acc + (v == null || Number.isNaN(v) ? 0 : v);
      }, 0);
    }

    /* ── Rows worked out from other rows ─────────────────────────────────── */
    /* A VAT return's box 3 is boxes 1 and 2, and its box 5 is box 3 less box
       4. Nothing in the shape of the table says so, and a return whose box 5
       is wrong is the single worst thing this course could print, so the
       document declares the arithmetic:

         derived: [{ col: 2, row: 4, is: [2, '-', 3] }]

       Rows and columns are indexes into `rows` and `headers`, and `is` reads
       left to right: operand, operator, operand, and on for as long as it
       runs. */
    (T.derived || []).forEach((r, ri) => {
      const cell = (row) => (rows[row] || [])[r.col];
      if (!rows[r.row] || cell(r.row) === undefined) {
        bad(`derived rule ${ri + 1} points at row ${r.row}, column ${r.col}, which the table does not have.`);
        return;
      }
      const terms = r.is || [];
      let acc = null, op = '+';
      let ok = true;
      terms.forEach((x, k) => {
        if (k % 2) { op = x; return; }
        const v = num(cell(x));
        if (v == null || Number.isNaN(v)) {
          bad(`derived rule ${ri + 1} reads row ${x}, column ${r.col} as "${cell(x)}", which is not a figure.`);
          ok = false; return;
        }
        acc = acc === null ? v : (op === '-' ? acc - v : acc + v);
      });
      if (!ok || acc === null) return;
      const got = num(cell(r.row));
      if (got == null || Number.isNaN(got)) {
        bad(`derived rule ${ri + 1} checks row ${r.row}, column ${r.col}, which reads "${cell(r.row)}".`);
        return;
      }
      if (!near(acc, got)) {
        fail.push(`row ${r.row + 1} is ${money(got)}; ${r.is.join(' ').replace(/\d+/g, (n) => 'row ' + (Number(n) + 1))} comes to ${money(acc)}.`);
      }
    });

    /* ── A running balance ───────────────────────────────────────────────── */
    /* Whether a charge adds or subtracts depends on whose statement it is —
       a bank statement's "paid out" reduces the balance, a supplier's
       "charges" increases what we owe — so the direction is declared in the
       data rather than guessed from the column heading. A balance column with
       no declaration is the dangerous case: it would be skipped in silence. */
    const iBal = col(/balance/i);
    const run = T.running;
    if (iBal !== -1 && !run) {
      bad('has a balance column and no `running: { add, sub, balance }`, so nothing checks that the balance runs.');
    }
    if (run) {
      if (run.balance == null || run.add == null || run.sub == null) {
        bad('`running` needs all three of add, sub and balance as column indexes.');
      } else {
        let bal = null;
        rows.forEach((r, ri) => {
          const b = num(r[run.balance]);
          const add = num(r[run.add]), sub = num(r[run.sub]);
          if (b == null || Number.isNaN(b)) {
            bad(`table row ${ri + 1} has no balance; every row of a statement carries one.`);
            return;
          }
          const moved = (add == null || Number.isNaN(add) ? 0 : add) - (sub == null || Number.isNaN(sub) ? 0 : sub);
          if (bal === null) { bal = b; return; }           // brought forward
          const want = bal + moved;
          if (!near(want, b)) {
            fail.push(`row ${ri + 1} runs ${money(bal)} to ${money(b)}; with ${money(moved)} on the row it should be ${money(want)}.`);
          }
          bal = b;
        });
      }
    }
  }

  /* ── The totals block ───────────────────────────────────────────────────── */
  /* Read exactly as a reader reads it, top to bottom. A subtotal asserts the
     running figure, a bracketed line comes off it, a VAT line goes on it and
     is checked against the rate printed in its own label, and the last line
     is the document's claim about all of it. */
  const tot = d.totals || [];
  if (tot.length) {
    let runv = base;
    let net = null;
    tot.forEach((row, i) => {
      const label = plain(row[0]);
      const v = num(row[1]);
      if (v == null || Number.isNaN(v)) {
        bad(`total "${label}" reads "${row[1]}", which is not a figure.`);
        return;
      }
      const extra = row[2];
      /* A THIRD SLOT, saying what the line is worked on. A mixed-rated invoice
         states its standard-rated and zero-rated values before the goods
         total, and those lines are read rather than added — `'memo'` says so.
         A VAT line on such an invoice is 20% of one of them and not of the
         net, and giving that figure is how the rate still gets checked. */
      if (extra === 'memo') return;
      const last = i === tot.length - 1;
      if (last) {
        if (runv != null && !near(runv, v)) {
          fail.push(`the document's "${label}" is ${money(v)}; the lines above it come to ${money(runv)}.`);
        }
        return;
      }
      if (SUBTOTAL.test(label)) {
        if (runv != null && !near(runv, v)) {
          fail.push(`"${label}" is ${money(v)}; what precedes it comes to ${money(runv)}.`);
        }
        runv = v;                        // carry on from the printed figure
        net = v;
      } else if (IS_VAT.test(label)) {
        const m = label.match(/([0-9]+(?:\.[0-9]+)?)\s*%/);
        const on = typeof extra === 'number' ? extra : net;
        if (m && on != null) {
          const want = on * parseFloat(m[1]) / 100;
          if (!near(want, v)) {
            fail.push(`"${label}" is ${money(v)}; ${m[1]}% of ${money(on)} is ${money(want)}.`);
          }
        }
        runv = (runv == null ? 0 : runv) + v;
      } else if (IS_DISCOUNT.test(label) && v > 0) {
        bad(`"${label}" is shown as ${money(v)}. A deduction is written in brackets, the way the paper writes it.`);
        runv = (runv == null ? 0 : runv) - v;
      } else {
        runv = (runv == null ? 0 : runv) + v;
      }
    });
  }

  /* ── The annotations ────────────────────────────────────────────────────── */
  const printed = DocFigure.usedMarks(d);
  const legend = (d.annotations || []).map((a) => a[0]);
  printed.forEach((m) => {
    if (legend.indexOf(m) === -1) bad(`prints ${m} on the document and never says what it is.`);
  });
  legend.forEach((m, i) => {
    if (DocFigure.MARKS.indexOf(m) === -1) bad(`annotation ${i + 1} is marked "${m}", which is not one of ${DocFigure.MARKS.join('')}.`);
    else if (printed.indexOf(m) === -1) bad(`explains ${m} in its legend and prints it nowhere on the document.`);
    if (legend.indexOf(m) !== i) bad(`uses ${m} for two different annotations.`);
    if (DocFigure.MARKS[i] !== m) bad(`annotation ${i + 1} is ${m}; the legend runs in order, so it should be ${DocFigure.MARKS[i]}.`);
  });
  (d.annotations || []).forEach((a, i) => {
    if (!a[1] || plain(a[1]).length < 25) {
      bad(`annotation ${i + 1} explains ${a[0]} in ${plain(a[1] || '').length} characters. Point at it and say why it matters, or drop the mark.`);
    }
  });

  /* ── Wrong on purpose, or just wrong ────────────────────────────────────── */
  if (d.planted) {
    if (typeof d.planted !== 'string' || d.planted.length < 40) {
      bad('has a `planted` note too short to say what is wrong with it.');
    }
    if (!fail.length) {
      bad('carries a `planted` note and adds up perfectly. Either the errors it describes have been fixed — in which case delete the note — or they were never there.');
    }
    return fail.length;
  }
  fail.forEach((f) => bad(f));
  return 0;
}

let planted = 0;
docs.forEach(({ where, d }) => { planted += checkDoc(where, d) ? 1 : 0; });

/* ── Every class the renderer can emit has a rule, and the reverse ────────── */
/* Level 1's stem is covered by check-subject-styles.js against its own
   stylesheet. This is the shared one, in styles.css, which that check does not
   look at because styles.css belongs to no single subject. */
const css = fs.readFileSync(path.join(ROOT, 'styles.css'), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');
const canEmit = DocFigure.classes('doc').concat(['doc-num', 'doc-tablewrap']);
canEmit.forEach((c) => {
  if (!new RegExp('\\.' + c + '[\\s,.:{>+~\\[]').test(css)) {
    errors.push(`styles.css: .${c} can be rendered by doc-figure.js and has no rule, so it renders unstyled.`);
  }
});
const styledDoc = [...new Set([...css.matchAll(/\.(doc-[a-z0-9-]+)/g)].map((m) => m[1]))];
styledDoc.forEach((c) => {
  if (canEmit.indexOf(c) === -1) {
    errors.push(`styles.css: .${c} is styled and doc-figure.js cannot produce it.`);
  }
});

/* ── Wiring ───────────────────────────────────────────────────────────────── */
const read = (f) => fs.readFileSync(path.join(ROOT, f), 'utf8');
[
  ['index.html', /<script src="doc-figure\.js">/, 'index.html does not load doc-figure.js, so every document renders as nothing.'],
  ['sw.js', /'\.\/doc-figure\.js'/, 'sw.js does not precache doc-figure.js, so documents vanish offline.'],
  ['app.js', /card\.doc\b/, 'app.js never reads card.doc, so Level 2 documents are data nothing draws.'],
  ['aat3-ui.js', /c\.doc\b/, 'aat3-ui.js never reads c.doc, so Level 3 documents are data nothing draws.'],
  ['aat1-ui.js', /DocFigure/, 'aat1-ui.js no longer calls the shared renderer.'],
].forEach(([f, re, msg]) => { if (!re.test(read(f))) errors.push(msg); });

/* ── Report ───────────────────────────────────────────────────────────────── */
console.log(`${BOLD}Source documents: does the paper add up?${RESET}\n`);
const byCourse = {};
docs.forEach(({ where }) => { const k = where.split(' ')[0]; byCourse[k] = (byCourse[k] || 0) + 1; });
notes.push(`${docs.length} documents — ` + Object.keys(byCourse).sort().map((k) => `${byCourse[k]} in ${k}`).join(', '));
const kinds = [...new Set(docs.map(({ d }) => d.kind || 'generic'))].sort();
notes.push(`${kinds.length} of ${DocFigure.KINDS.length} kinds in use: ${kinds.join(', ')}`);
const marked = docs.filter(({ d }) => (d.annotations || []).length).length;
notes.push(`${marked} carry an annotated legend, ${planted} are wrong on purpose and say so`);
notes.forEach((n) => console.log(`  ${DIM}${n}${RESET}`));
console.log('');

if (errors.length) {
  console.log(`${RED}${BOLD}── ${errors.length} problem${errors.length === 1 ? '' : 's'} ──${RESET}`);
  errors.forEach((e) => console.log(`  ${RED}✗${RESET}  ${e}`));
  console.log('');
  process.exit(1);
}
console.log(`${GREEN}${BOLD}── Every document adds up ✓${RESET}\n`);
