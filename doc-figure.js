/* Source documents, drawn from data.
 *
 * WHAT THIS IS FOR
 *
 * The three AAT courses spend most of their length teaching a reader to work
 * from source documents — an invoice, a credit note, a supplier statement, a
 * remittance advice, a petty cash voucher — and until now showed them exactly
 * four times, all in Level 1. Everywhere else the reader is told what an
 * invoice contains and left to picture it. An assessment will not do that: it
 * puts the document in front of them and asks for a figure off it.
 *
 * Level 1 had already solved this, in a local `docHtml()` inside aat1-ui.js.
 * Nothing else could reach it. This is that function, lifted out so Levels 2
 * and 3 and the shared lesson player can call it too, with the parts the
 * other levels need added.
 *
 * WHY A RENDERER RATHER THAN MARKUP IN THE DATA
 *
 * app.js's lesson cards already accept a `visual` field that is raw HTML, and
 * that is how not to do this. A document written as HTML in a data file is a
 * document nothing can check: nobody can ask whether its VAT is 20% of its
 * net, whether its lines add to its total, or whether the statement's running
 * balance actually runs. Written as data it is all three, and
 * scripts/check-doc-figures.js asks exactly those questions on every build.
 * A fabricated invoice that does not add up teaches a reader to distrust
 * arithmetic, which is the opposite of the subject.
 *
 * THE SHAPE
 *
 *   kind        invoice | creditnote | statement | remittance | order |
 *               grn | voucher | payslip | vatreturn | banking | generic —
 *               styling and the label a screen reader hears, nothing more
 *   title, tag  the heading and the chip beside it
 *   from, to    the two parties, each an array of lines
 *   fields      [[label, value], …] — the reference block
 *   table       { headers, rows, align, running, derived } — the body
 *   totals      [[label, value, on?], …] — the last one is emphasised
 *   foot        terms, or a note printed on the document
 *   stamp       a corner mark: PAID, COPY, CANCELLED
 *   sig         [[label, value], …] — authorisation lines on a voucher
 *   planted     what is deliberately wrong with it, where that is the lesson
 *   annotations [[mark, explanation], …] — see below
 *
 * Four of those are read only by scripts/check-doc-figures.js, which is where
 * they are documented: `running` says which way a statement's columns move its
 * balance, `derived` says which rows are worked out from which others, a
 * total's third slot says what its percentage is worked on (or `'memo'` for a
 * line that is stated rather than added), and `planted` licenses a document
 * that is wrong on purpose. The renderer ignores all four, which is the point:
 * they describe the arithmetic, and the arithmetic is not a display concern.
 *
 * ANNOTATIONS ARE THE POINT. A picture of an invoice is decoration; an
 * invoice with "① the invoice number — quote this when you pay" beneath it is
 * the lesson. Marks are written into the document's own text as ①②③, and the
 * legend under it says what each one is. The check requires that every mark
 * used in the legend appears somewhere in the document and the other way
 * round, because a legend pointing at a mark nobody can find is worse than no
 * legend at all.
 *
 * CLASS NAMES. Level 1 styles these as .a1-doc-*, in its own lazily loaded
 * stylesheet; Level 2, Level 3 and the shared lesson player use .doc-*, in
 * styles.css. Two sets rather than one because Level 1's document design is
 * built out of --a1-* tokens that exist only in its stylesheet, and rewriting
 * it to share a global rule would have changed how four cards that already
 * shipped look, for no reader's benefit. The caller says which:
 *
 *   stem        the document's own classes — 'a1-doc' or, by default, 'doc'
 *   prefix      the host's generic ones, `{prefix}-num` on a figure column
 *               and `{prefix}-tablewrap` round the table — 'a1' or 'doc'
 *   tableClass  an extra class on the <table>, for a host whose table
 *               padding and borders live on a generic rule
 */
(function (root, factory) {
  'use strict';
  var api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.DocFigure = api;
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  /* The kinds that carry their own styling. A kind outside this list still
     renders — it simply gets the generic treatment — but the check reports it,
     because a kind nobody styled is usually a typo rather than a decision. */
  var KINDS = [
    'invoice',      // a sales or purchase invoice
    'creditnote',   // cancels or reduces an invoice
    'statement',    // a supplier's month-end list of what is outstanding
    'remittance',   // what a customer says they are paying, and against what
    'order',        // a purchase order
    'grn',          // goods received note
    'voucher',      // petty cash voucher
    'payslip',      // an employee's pay statement
    'vatreturn',    // the nine boxes
    'banking',      // a paying-in slip, cheque or bank statement
    'generic'
  ];

  /* The marks annotations use. Circled digits rather than [1], because they
     have to sit inside a money column without being mistaken for a figure. */
  var MARKS = ['①', '②', '③', '④', '⑤', '⑥', '⑦', '⑧', '⑨', '⑩'];

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  /* **bold**, *italic* and `key term`, on already-escaped text — the same
     three Level 1 uses, so its documents read exactly as they did. */
  function md(s) {
    return esc(s)
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/(^|[^*])\*([^*]+?)\*/g, '$1<em>$2</em>')
      .replace(/`([^`]+?)`/g, '<span class="term">$1</span>');
  }

  /* Wrap each mark in its own element so it can be tinted and given a size of
     its own — inside a table cell a raw ① is either invisible or enormous
     depending on the font that happened to win. */
  function marks(html, markClass) {
    return html.replace(/[①②③④⑤⑥⑦⑧⑨⑩]/g,
      function (m) { return '<span class="' + markClass + '">' + m + '</span>'; });
  }

  /* THE ONE PLACE CLASS NAMES ARE SPELLED. Both the renderer and
     scripts/check-doc-figures.js read this, so "is every class this can emit
     actually styled, and is every styled class one it can emit" is a question
     with an answer rather than a guess at a regular expression. Two hosts use
     two stems — see CLASS NAMES above — and neither can drift from the other. */
  function names(stem) {
    var n = {
      doc: stem,
      top: stem + '-top', kind: stem + '-kind', tag: stem + '-tag',
      stamp: stem + '-stamp',
      parties: stem + '-parties', party: stem + '-party', partyL: stem + '-party-l',
      fields: stem + '-fields', field: stem + '-field',
      fieldL: stem + '-field-l', fieldV: stem + '-field-v',
      table: stem + '-table',
      totals: stem + '-totals', total: stem + '-total',
      sig: stem + '-sig', sigline: stem + '-sigline',
      sigL: stem + '-sig-l', sigV: stem + '-sig-v',
      foot: stem + '-foot', mark: stem + '-mark', legend: stem + '-legend'
    };
    KINDS.forEach(function (k) { n['kind_' + k] = stem + '-' + k; });
    return n;
  }

  /* Every class name a document can carry, for a given stem. */
  function classes(stem) {
    var n = names(stem || 'doc'), out = [];
    Object.keys(n).forEach(function (k) { if (out.indexOf(n[k]) === -1) out.push(n[k]); });
    return out;
  }

  function html(d, opts) {
    if (!d) return '';
    var o = opts || {};
    var p = o.prefix || 'doc';          // {p}-num, {p}-tablewrap
    var C = names(o.stem || 'doc');
    /* Level 1's table already carried its generic table class as well as the
       document one, and its padding and borders come from that rule. Pass it
       through rather than duplicating the rule under a second name. */
    var tcls = (o.tableClass ? o.tableClass + ' ' : '') + C.table;
    var t = function (s) { return marks(md(s), C.mark); };
    /* Labels are escaped rather than marked up — a field label is not a place
       for bold — but a mark in one still has to be tinted, or it renders as a
       stray glyph in whichever font happened to carry it. */
    var lt = function (s) { return marks(esc(s), C.mark); };
    var kind = d.kind || 'generic';
    var h = '<figure class="' + C.doc + ' ' + (C['kind_' + kind] || C.kind_generic) + '"' +
            ' aria-label="' + esc(d.tag || d.title || 'Document') + '">';

    h += '<div class="' + C.top + '"><span class="' + C.kind + '">' +
         esc(d.title || 'Document') + '</span>' +
         (d.tag ? '<span class="' + C.tag + '">' + esc(d.tag) + '</span>' : '') +
         (d.stamp ? '<span class="' + C.stamp + '">' + esc(d.stamp) + '</span>' : '') +
         '</div>';

    if (d.from || d.to) {
      h += '<div class="' + C.parties + '">' +
        ['from', 'to'].map(function (side) {
          var lines = d[side];
          if (!lines || !lines.length) return '';
          return '<div class="' + C.party + '"><div class="' + C.partyL + '">' +
            esc(side === 'from' ? (d.fromLabel || 'From') : (d.toLabel || 'To')) + '</div>' +
            lines.map(function (x) { return '<div>' + t(x) + '</div>'; }).join('') + '</div>';
        }).join('') + '</div>';
    }

    if (d.fields && d.fields.length) {
      h += '<div class="' + C.fields + '">' + d.fields.map(function (f) {
        return '<div class="' + C.field + '"><span class="' + C.fieldL + '">' +
          lt(f[0]) + '</span><span class="' + C.fieldV + '">' + t(f[1]) + '</span></div>';
      }).join('') + '</div>';
    }

    if (d.table) {
      /* Column 0 is the description and reads left; everything else is a
         figure or a code and reads right, which is how a document is printed
         and how a reader's eye finds the column it wants. `align` overrides
         that per column for the rare table whose second column is prose. */
      var al = d.table.align || [];
      var numCls = function (i) {
        var a = al[i] || (i ? 'num' : 'text');
        return a === 'num' ? ' class="' + p + '-num"' : '';
      };
      h += '<div class="' + p + '-tablewrap"><table class="' + tcls + '">';
      if (d.table.headers) {
        h += '<thead><tr>' + d.table.headers.map(function (x, i) {
          return '<th' + numCls(i) + '>' + t(x) + '</th>';
        }).join('') + '</tr></thead>';
      }
      h += '<tbody>' + (d.table.rows || []).map(function (r) {
        return '<tr>' + r.map(function (x, i) {
          return '<td' + numCls(i) + '>' + t(x) + '</td>';
        }).join('') + '</tr>';
      }).join('') + '</tbody></table></div>';
    }

    if (d.totals && d.totals.length) {
      h += '<div class="' + C.totals + '">' + d.totals.map(function (x, i) {
        var last = i === d.totals.length - 1;
        return '<div class="' + C.total + (last ? ' is-final' : '') + '">' +
          '<span>' + t(x[0]) + '</span><span class="' + p + '-num">' + t(x[1]) + '</span></div>';
      }).join('') + '</div>';
    }

    if (d.sig && d.sig.length) {
      h += '<div class="' + C.sig + '">' + d.sig.map(function (x) {
        return '<div class="' + C.sigline + '"><span class="' + C.sigL + '">' +
          lt(x[0]) + '</span><span class="' + C.sigV + '">' + t(x[1]) + '</span></div>';
      }).join('') + '</div>';
    }

    if (d.foot) h += '<div class="' + C.foot + '">' + t(d.foot) + '</div>';
    h += '</figure>';

    /* The legend sits outside the document, because it is the course talking
       about the document rather than anything printed on it. */
    if (d.annotations && d.annotations.length) {
      h += '<ol class="' + C.legend + '">' + d.annotations.map(function (a) {
        return '<li><span class="' + C.mark + '">' + esc(a[0]) + '</span>' +
          '<span>' + md(a[1]) + '</span></li>';
      }).join('') + '</ol>';
    }
    return h;
  }

  /* Which marks a document actually prints, and which its legend explains.
     Exported so the check can compare the two without re-implementing the
     walk — a checker that parses the data its own way tests its own parser. */
  function usedMarks(d) {
    var seen = [];
    var scan = function (s) {
      String(s == null ? '' : s).replace(/[①②③④⑤⑥⑦⑧⑨⑩]/g, function (m) {
        if (seen.indexOf(m) === -1) seen.push(m);
        return m;
      });
    };
    ['from', 'to'].forEach(function (k) { (d[k] || []).forEach(scan); });
    (d.fields || []).forEach(function (f) { f.forEach(scan); });
    (d.totals || []).forEach(function (x) { x.forEach(scan); });
    (d.sig || []).forEach(function (x) { x.forEach(scan); });
    if (d.table) {
      (d.table.headers || []).forEach(scan);
      (d.table.rows || []).forEach(function (r) { r.forEach(scan); });
    }
    scan(d.foot);
    return seen;
  }

  return { html: html, usedMarks: usedMarks, classes: classes, KINDS: KINDS, MARKS: MARKS };
}));
