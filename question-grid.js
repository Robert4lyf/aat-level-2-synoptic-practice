/**
 * Two question types the three levels share: a table of choices, and a grid of
 * entries the reader has to place as well as calculate.
 *
 * WHY THESE TWO, AND WHY THEY ARE NOT `tablefill`. Level 2 already has a table
 * with blanks in it, and it covers "work out the missing figure" well. What no
 * type covered is the decision that comes BEFORE the arithmetic: which book,
 * which column, which side. A journal entry, an extended trial balance and a
 * ledger account are all the same skill — knowing where a figure belongs — and
 * a blank whose position is given away has already answered that.
 *
 *   picklist   one choice per row, from a list. "Which day book?" "Dr or Cr?"
 *              It is the commonest format in the real assessment and the app
 *              had no way to ask it.
 *
 *   entrygrid  one input per COLUMN per row. The reader types the amount into
 *              the column it belongs in and leaves the others empty, which is
 *              what a paper journal, a T-account and an extended trial balance
 *              all physically are. Placement and value are graded together
 *              because getting one right and the other wrong is still wrong.
 *
 * SHARED BECAUSE THE RULES ARE SHARED. Three players render their own screens
 * with their own class prefixes, and three copies of "is this row right" would
 * drift the first time a tolerance or a blank-versus-zero rule changed. The
 * markup is themed per level through `prefix` and `attr`; the grading is not
 * themed at all, and lives here once.
 */
(function (root) {
  'use strict';

  /* ── Reading what the reader typed ──────────────────────────────────────────
     An amount box is free text, so it arrives with whatever a person types into
     it: a pound sign, thousands separators, a stray space, a trailing full
     stop. All of those are the same figure and marking them wrong would be
     marking typing rather than bookkeeping.

     THE PARSER KEEPS BLANK AND ZERO APART, and leaves it to `cellOk` to decide
     whether that difference matters. `null` is the only honest value for "they
     did not put anything here", and collapsing it to 0 here would throw away
     the distinction before anything had the chance to rule on it. */
  function amount(v) {
    if (v == null) return null;
    var s = String(v).replace(/[£$,\s]/g, '');
    if (s === '' || s === '.' || s === '-') return null;
    if (!/^-?\d*\.?\d*$/.test(s)) return NaN;
    var n = Number(s);
    return isNaN(n) ? NaN : n;
  }

  /* Money compared to the penny. `0.1 + 0.2` is not `0.3` in binary floating
     point, and a reader who types the right figure must not be told otherwise
     by the last bit of a double. */
  function sameMoney(a, b) {
    if (a == null || b == null) return a === b;
    if (isNaN(a) || isNaN(b)) return false;
    return Math.round(a * 100) === Math.round(b * 100);
  }

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }


  /* ── Class names, written out ───────────────────────────────────────────────
     `px + '-pl-sel'` is shorter and produces the same names — and
     check-subject-styles cannot see any of them, so every rule for this table
     reads as styling nothing that renders, and a renamed class silently
     unstyles the whole grid. The same objection that put CALC_KIND_CLASS in
     aat3-ui.js applies harder here, because this file serves three levels at
     once. Spelling all three sets keeps each stylesheet checkable against the
     markup it is for. */
  var CLASSES = {
    a1: {
      pl: 'a1-pl', plTitle: 'a1-pl-title', plScroll: 'a1-pl-scroll', plTable: 'a1-pl-table',
      plRow: 'a1-pl-row', plSel: 'a1-pl-sel', plSaid: 'a1-pl-said', plKey: 'a1-pl-key',
      eg: 'a1-eg', egTitle: 'a1-eg-title', egScroll: 'a1-eg-scroll', egTable: 'a1-eg-table',
      egRow: 'a1-eg-row', egCell: 'a1-eg-cell', egIn: 'a1-eg-in', egSaid: 'a1-eg-said',
      egKey: 'a1-eg-key', egHint: 'a1-eg-hint', egGiven: 'a1-eg-given',
    },
    a3: {
      pl: 'a3-pl', plTitle: 'a3-pl-title', plScroll: 'a3-pl-scroll', plTable: 'a3-pl-table',
      plRow: 'a3-pl-row', plSel: 'a3-pl-sel', plSaid: 'a3-pl-said', plKey: 'a3-pl-key',
      eg: 'a3-eg', egTitle: 'a3-eg-title', egScroll: 'a3-eg-scroll', egTable: 'a3-eg-table',
      egRow: 'a3-eg-row', egCell: 'a3-eg-cell', egIn: 'a3-eg-in', egSaid: 'a3-eg-said',
      egKey: 'a3-eg-key', egHint: 'a3-eg-hint', egGiven: 'a3-eg-given',
    },
    l2: {
      pl: 'l2-pl', plTitle: 'l2-pl-title', plScroll: 'l2-pl-scroll', plTable: 'l2-pl-table',
      plRow: 'l2-pl-row', plSel: 'l2-pl-sel', plSaid: 'l2-pl-said', plKey: 'l2-pl-key',
      eg: 'l2-eg', egTitle: 'l2-eg-title', egScroll: 'l2-eg-scroll', egTable: 'l2-eg-table',
      egRow: 'l2-eg-row', egCell: 'l2-eg-cell', egIn: 'l2-eg-in', egSaid: 'l2-eg-said',
      egKey: 'l2-eg-key', egHint: 'l2-eg-hint', egGiven: 'l2-eg-given',
    },
  };

  /* ── picklist ─────────────────────────────────────────────────────────────── */

  function picklistRows(q) { return (q && q.picklist && q.picklist.rows) || []; }

  /* Which rows are right, and whether the whole thing is.

     A ROW LEFT UNANSWERED IS WRONG, not unmarked. Under exam conditions a
     question the reader ran out of time on scores nothing, and reporting it as
     anything else would flatter the mark. */
  function gradePicklist(q, picks) {
    var rows = picklistRows(q);
    var per = rows.map(function (r, i) {
      var p = picks ? picks[i] : undefined;
      return p != null && p === r.answer;
    });
    return {
      per: per,
      right: rows.length > 0 && per.every(Boolean),
      answered: rows.filter(function (r, i) { return picks && picks[i] != null; }).length,
      total: rows.length,
    };
  }

  function picklistHtml(q, o) {
    var p = (q && q.picklist) || {};
    var rows = p.rows || [];
    var opts = p.options || [];
    var C = CLASSES[o.prefix];
    if (!C) return '';
    var at = o.attr;
    var done = !!o.showAnswers;
    var picks = o.picks || {};
    var head = '<thead><tr><th>' + esc(p.rowHeader || 'Item') + '</th>' +
      '<th>' + esc(p.choiceHeader || 'Choice') + '</th></tr></thead>';
    var body = rows.map(function (r, i) {
      var sel = picks[i];
      var right = sel != null && sel === r.answer;
      var cls = done ? (right ? ' is-right' : ' is-wrong') : '';
      var control;
      if (done) {
        /* Graded, the control is replaced by what they chose and — when that
           was wrong — what the answer was. A disabled <select> shows only the
           choice, which leaves a reader who got it wrong with no way to see the
           right answer without reading the explanation and mapping it back to
           the row themselves. */
        control = '<span class="' + C.plSaid + '">' +
          esc(sel == null ? '—' : (opts[sel] == null ? '?' : opts[sel])) + '</span>' +
          (right ? '' : '<span class="' + C.plKey + '">' + esc(opts[r.answer]) + '</span>');
      } else {
        control = '<select class="' + C.plSel + '" ' + at + '="plpick" data-r="' + i + '"' +
          ' aria-label="' + esc(r.text) + '">' +
          '<option value="">Choose…</option>' +
          opts.map(function (t, oi) {
            return '<option value="' + oi + '"' + (sel === oi ? ' selected' : '') + '>' + esc(t) + '</option>';
          }).join('') + '</select>';
      }
      return '<tr class="' + C.plRow + cls + '" role="row"><th scope="row" role="rowheader">' +
        esc(r.text) + '</th><td role="cell">' + control + '</td></tr>';
    }).join('');
    /* ROLES WRITTEN OUT. Below 480px the stylesheet lays these rows out as
       stacked blocks, because two columns inside 320px squeeze an option list
       to 74px and break it mid-word. `display: block` on a <table> throws away
       its semantics, so the roles are stated here and the phone layout keeps
       the structure a screen reader announces. */
    return '<div class="' + C.pl + '">' +
      (p.title ? '<div class="' + C.plTitle + '">' + esc(p.title) + '</div>' : '') +
      '<div class="' + C.plScroll + '"><table class="' + C.plTable + '" role="table">' +
        head + '<tbody>' + body + '</tbody></table></div></div>';
  }

  /* ── entrygrid ────────────────────────────────────────────────────────────── */

  function entryRows(q) { return (q && q.entrygrid && q.entrygrid.rows) || []; }
  function entryCols(q) { return (q && q.entrygrid && q.entrygrid.columns) || []; }

  /* The key for one cell. Written once because the renderer and the grader must
     agree about it exactly — the renderer decides what to show as the answer,
     and any disagreement would show a reader a "correct" cell their own entry
     was marked wrong against.

     TWO ROW SHAPES, because two things are being asked. A journal line puts one
     figure on one side, so `{col, amount}` says it exactly. A day book line
     puts a figure in EVERY column — net, VAT, gross — and forcing that through
     the one-cell shape meant splitting each invoice across three rows whose
     labels had to name the figures to make sense, which handed the reader the
     answers. `{cells: {0: 400, 1: 80, 2: 480}}` is the honest shape for it, and
     one row of the grid is then one line of the book. */
  function cellKey(row, ci) {
    if (row && row.cells) {
      var v = row.cells[ci];
      return v == null ? null : v;
    }
    return row.col === ci ? row.amount : null;
  }

  /* WHICH CELLS ARE PRINTED RATHER THAN ASKED.
   *
   * Until this, every cell of every grid rendered as an empty input, so a
   * partly-completed table — the commonest shape in the real assessment —
   * could not be expressed at all. Ten questions were written as though it
   * could: "Complete the closing balance for each customer" over a table with
   * nothing in it, "total each column" of a day book that was never shown.
   * Every figure lived in the answer key and nowhere the reader could reach.
   *
   * `given` names the columns whose figure is SHOWN. The value still lives in
   * `cells`, so the grader, the column totals and the balance rule all keep
   * reading one place — a second copy of the number is a second thing to get
   * wrong. A given cell is printed, is not marked, and is not the reader's to
   * get right or wrong.
   */
  function givenCols(row) {
    var out = {};
    if (!row || !Array.isArray(row.given)) return out;
    row.given.forEach(function (ci) { out[Number(ci)] = true; });
    return out;
  }
  function isGiven(row, ci) { return givenCols(row)[Number(ci)] === true; }

  /* Does what the reader put in this cell match what belongs there?

     A CELL THAT SHOULD BE EMPTY ACCEPTS A TYPED ZERO. A bookkeeper leaves it
     blank, but "£0 is debited" and "nothing is debited" are the same statement,
     and marking the difference tests neatness rather than bookkeeping — the
     same objection as marking a reader down for typing a pound sign. Note the
     asymmetry, which is deliberate: an empty cell where a FIGURE belongs is
     still wrong, because there the reader has said nothing at all. */
  function cellOk(typed, key) {
    if (key == null) return typed == null || typed === 0;
    return sameMoney(typed, key);
  }

  /* Every cell of every row, placement and value together.

     BOTH HALVES OR NEITHER. A figure in the wrong column is not a near miss —
     it reverses an entry, and a return or a trial balance built on it is out by
     twice the amount. So a row counts only when every one of its cells matches,
     which means the empty ones too. */
  function gradeEntry(q, cells) {
    var rows = entryRows(q);
    var cols = entryCols(q);
    var per = rows.map(function (r, ri) {
      /* A GIVEN CELL IS NOT MARKED. It was printed for the reader to work
         from, so crediting or faulting them for it marks the question rather
         than the answer. */
      return cols.every(function (c, ci) {
        if (isGiven(r, ci)) return true;
        return cellOk(amount(cells && cells[ri + ':' + ci]), cellKey(r, ci));
      });
    });
    var touched = 0;
    rows.forEach(function (r, ri) {
      cols.forEach(function (c, ci) {
        if (isGiven(r, ci)) return;
        if (amount(cells && cells[ri + ':' + ci]) != null) touched++;
      });
    });
    return {
      per: per,
      right: rows.length > 0 && per.every(Boolean),
      touched: touched,
      total: rows.length,
    };
  }

  /* What each column of the KEY adds up to. Used by the check script to prove a
     journal actually balances before it is ever shown to a reader — an unbalanced
     journal in the bank teaches the reader to produce one. */
  function columnTotals(q) {
    return entryCols(q).map(function (c, ci) {
      return entryRows(q).reduce(function (n, r) {
        var v = cellKey(r, ci);
        return n + (v == null ? 0 : v);
      }, 0);
    });
  }

  function entryHtml(q, o) {
    var g = (q && q.entrygrid) || {};
    var rows = g.rows || [];
    var cols = g.columns || [];
    var C = CLASSES[o.prefix];
    if (!C) return '';
    var at = o.attr;
    var done = !!o.showAnswers;
    var cells = o.cells || {};
    var head = '<thead><tr><th>' + esc(g.rowHeader || 'Account') + '</th>' +
      cols.map(function (c) { return '<th>' + esc(c) + '</th>'; }).join('') + '</tr></thead>';
    var body = rows.map(function (r, ri) {
      var rowRight = cols.every(function (c, ci) {
        return cellOk(amount(cells[ri + ':' + ci]), cellKey(r, ci));
      });
      var cls = done ? (rowRight ? ' is-right' : ' is-wrong') : '';
      var tds = cols.map(function (c, ci) {
        var key = cellKey(r, ci);
        var val = cells[ri + ':' + ci];
        /* Printed, not asked. Rendered before the answered/unanswered split
           because it reads the same either way — it was never in question. */
        if (isGiven(r, ci)) {
          return '<td class="' + C.egCell + ' ' + C.egGiven + '">' +
            esc(key == null ? '' : Number(key).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })) +
            '</td>';
        }
        if (done) {
          var thisOk = cellOk(amount(val), key);
          return '<td class="' + C.egCell + (thisOk ? '' : ' is-wrong') + '">' +
            '<span class="' + C.egSaid + '">' + esc(val == null || val === '' ? '—' : val) + '</span>' +
            (thisOk ? '' : '<span class="' + C.egKey + '">' + esc(key == null ? '—' : key) + '</span>') +
            '</td>';
        }
        return '<td class="' + C.egCell + '">' +
          '<input class="' + C.egIn + '" inputmode="decimal" ' + at + '="egcell" ' +
          'data-c="' + ri + ':' + ci + '" value="' + esc(val == null ? '' : val) + '" ' +
          'aria-label="' + esc(r.label + ', ' + c) + '"></td>';
      }).join('');
      return '<tr class="' + C.egRow + cls + '"><th scope="row">' + esc(r.label) + '</th>' + tds + '</tr>';
    }).join('');
    return '<div class="' + C.eg + '">' +
      (g.title ? '<div class="' + C.egTitle + '">' + esc(g.title) + '</div>' : '') +
      '<div class="' + C.egScroll + '"><table class="' + C.egTable + '">' +
        head + '<tbody>' + body + '</tbody></table></div>' +
      '<p class="' + C.egHint + '">Put each amount in the column it belongs in, and leave the others empty.</p>' +
      '</div>';
  }

  /* ── What makes one of these questions well formed ──────────────────────────
     Shared for the same reason the grading is: three levels author these tables
     and three copies of the rules would drift. Returns a list of problems, so
     each level's quality gate can report them in its own voice.

     `where` is the caller's label for the question, because a gate that says
     "a row is out of range" without saying whose has made the reader search. */
  function problems(q, where) {
    var out = [];
    var t = (q && q.type) || '';
    if (t === 'picklist') {
      var p = q.picklist;
      if (!p || !Array.isArray(p.rows) || p.rows.length < 2) return [where + ': a picklist needs at least 2 rows.'];
      if (!Array.isArray(p.options) || p.options.length < 2) return [where + ': a picklist needs at least 2 options.'];
      p.rows.forEach(function (r, ri) {
        if (!r.text) out.push(where + ' row ' + (ri + 1) + ': no text.');
        if (!isInt(r.answer) || r.answer < 0 || r.answer >= p.options.length) {
          out.push(where + ' row ' + (ri + 1) + ': answer index out of range.');
        }
      });
      /* GUESSABLE SHAPES. Every row the same option is answerable without
         reading a word; and with exactly two options "never the same twice
         running" is itself the pattern, so a strictly alternating key gives the
         table away. Neither test means anything with more options, where
         alternating is just variety. */
      var keys = p.rows.map(function (r) { return r.answer; });
      if (unique(keys).length === 1) {
        out.push(where + ': every row has the same answer — the table is answerable without reading it.');
      }
      if (p.options.length === 2 && keys.length > 3 &&
          keys.every(function (k, i) { return i === 0 || k !== keys[i - 1]; })) {
        out.push(where + ': with two options the answers strictly alternate, which is a pattern a reader can follow instead of the question.');
      }
      /* WHAT GUESSING IS WORTH. A pick list is marked a mark a row on a timed
         paper, so a reader who picks the commonest option for every row without
         reading one of them collects that many marks. Four "cash book"s out of
         six is two thirds of the marks for knowing nothing, which is not a
         question, it is a subsidy. Half the rows, rounded up, is the most any
         one answer may take — that still allows the even splits a two-option
         table needs, and the one-each shape of a six-option table. */
      var cap = Math.ceil(keys.length / 2);
      var tally = {};
      keys.forEach(function (k) { tally[k] = (tally[k] || 0) + 1; });
      Object.keys(tally).forEach(function (k) {
        if (tally[k] > cap) {
          out.push(where + ': "' + p.options[k] + '" answers ' + tally[k] + ' of ' + keys.length +
            ' rows — picking it every time and reading nothing would earn ' + tally[k] +
            ' of ' + keys.length + ' marks.');
        }
      });
      return out;
    }
    if (t !== 'entrygrid') return out;
    var g = q.entrygrid;
    if (!g || !Array.isArray(g.rows) || g.rows.length < 2) return [where + ': an entry grid needs at least 2 rows.'];
    if (!Array.isArray(g.columns) || g.columns.length < 2) return [where + ': an entry grid needs at least 2 columns.'];
    g.rows.forEach(function (r, ri) {
      var at = where + ' row ' + (ri + 1);
      if (!r.label) out.push(at + ': no label.');
      if (r.cells) {
        var ks = Object.keys(r.cells);
        if (!ks.length) out.push(at + ': cells is empty.');
        ks.forEach(function (k) {
          var ci = Number(k);
          if (!isInt(ci) || ci < 0 || ci >= g.columns.length) out.push(at + ': column ' + k + ' is out of range.');
          if (!isFinite(r.cells[k])) out.push(at + ', column ' + k + ': amount is not a finite number.');
        });
      } else {
        if (!isInt(r.col) || r.col < 0 || r.col >= g.columns.length) out.push(at + ': column index out of range.');
        if (!isFinite(r.amount)) out.push(at + ': amount is not a finite number.');
      }
      /* A LABEL MUST NOT CONTAIN ITS OWN ANSWER. The first day book written for
         this type split each invoice across three rows, so every label had to
         name the figure to read sensibly — and each row then handed over the
         amount it was asking for. That is what `cells` exists to avoid, and
         this is what stops it coming back. */
      g.columns.forEach(function (c, ci) {
        var key = cellKey(r, ci);
        if (key == null) return;
        /* Bounded, so 40 is not "found" inside £400.00 and a clean label
           reported as a leak. The boundary is any non-digit, which is what
           separates one figure from another in a label. */
        var lab = String(r.label || '');
        var forms = [String(key), Number(key).toLocaleString('en-GB')];
        if (forms.some(function (f) {
          return new RegExp('(^|[^\\d.,])' + f.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '($|[^\\d])').test(lab);
        })) {
          out.push(at + ': the label contains the figure the reader is meant to enter (' +
            Number(key).toLocaleString('en-GB') + ').');
        }
      });
    });
    /* A DEBIT AND CREDIT GRID MUST BALANCE. An unbalanced journal in the bank is
       worse than a wrong figure: a reader who enters it correctly is taught that
       double entry need not agree. Recognised from the column headings rather
       than a flag, so a new journal cannot opt out of the one rule that makes it
       a journal. */
    var dr = -1, cr = -1;
    g.columns.forEach(function (c, i) {
      if (dr === -1 && /debit/i.test(c)) dr = i;
      if (cr === -1 && /credit/i.test(c)) cr = i;
    });
    if (dr !== -1 && cr !== -1) {
      var totals = columnTotals(q);
      var d = Math.round(totals[dr] * 100), c2 = Math.round(totals[cr] * 100);
      if (d !== c2) {
        out.push(where + ': the debit column totals ' + (d / 100) + ' and the credit column ' +
          (c2 / 100) + ' — a journal that does not balance teaches the reader to write one.');
      }
      if (d === 0) out.push(where + ': nothing is entered on either side.');
    }
    /* EVERY COLUMN IS USED. A grid whose figures all land in one column asks the
       reader to place nothing, and is a numeric question wearing a table. */
    var used = {};
    g.rows.forEach(function (r) {
      g.columns.forEach(function (c, ci) { if (cellKey(r, ci) != null) used[ci] = 1; });
    });
    if (Object.keys(used).length < 2) {
      out.push(where + ': every figure goes in the same column — there is no placement decision to make.');
    }

    /* `given` names real columns, and never every column of a row. */
    g.rows.forEach(function (r, ri) {
      if (!r.given) return;
      var at = where + ' row ' + (ri + 1);
      if (!Array.isArray(r.given)) { out.push(at + ': given must be an array of column indexes.'); return; }
      r.given.forEach(function (ci) {
        if (!isInt(ci) || ci < 0 || ci >= g.columns.length) out.push(at + ': given column ' + ci + ' is out of range.');
        if (cellKey(r, ci) == null) out.push(at + ': column ' + ci + ' is marked given but has no figure to show.');
      });
      if (unique(r.given).length >= g.columns.length) {
        out.push(at + ': every column is given, so the row asks the reader for nothing.');
      }
    });

    return out;
  }

  function isInt(n) { return typeof n === 'number' && isFinite(n) && Math.floor(n) === n; }
  function unique(a) { return a.filter(function (v, i) { return a.indexOf(v) === i; }); }

  var API = {
    amount: amount, sameMoney: sameMoney,
    picklistHtml: picklistHtml, gradePicklist: gradePicklist, picklistRows: picklistRows,
    entryHtml: entryHtml, gradeEntry: gradeEntry, entryRows: entryRows, entryCols: entryCols,
    cellKey: cellKey, cellOk: cellOk, columnTotals: columnTotals, problems: problems,
  };

  root.AATGrid = API;
  if (typeof module === 'object' && module.exports) module.exports = API;
})(typeof window !== 'undefined' ? window : (typeof globalThis !== 'undefined' ? globalThis : this));
