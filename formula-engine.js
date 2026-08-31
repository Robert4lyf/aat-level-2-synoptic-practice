/* Spreadsheet formula engine — AAT Level 3 Management Accounting Techniques, LO5.
 *
 * MATS learning outcome 5 ("Use spreadsheet techniques to provide management
 * accounting information") is 15% of that unit and is partly human marked. It
 * cannot be taught honestly by multiple choice: the student has to write a real
 * formula and see what it evaluates to.
 *
 * This module evaluates the exact function set the AAT syllabus lists at 5.2.1:
 *
 *   SUM AVERAGE MIN MAX ROUND ROUNDUP ROUNDDOWN SUMIF COUNT COUNTA COUNTIF
 *   IF (simple and nested) VLOOKUP HLOOKUP DAYS
 *
 * plus absolute/relative cell referencing ($A$1, A$1, $A1, A1), ranges, the
 * arithmetic and comparison operators, and Excel's error values.
 *
 * DESIGN NOTES
 *
 *  - No eval() and no new Function(). Formulas are student input; they are
 *    tokenised and parsed into an AST by a hand-written recursive-descent
 *    parser, then walked. Nothing is ever executed as JavaScript.
 *  - Excel operator precedence is followed, including the two places it differs
 *    from most languages: unary minus binds TIGHTER than ^ (so -2^2 is 4, not
 *    -4), and % is a postfix operator (50% is 0.5).
 *  - Excel rounds half AWAY FROM ZERO. JavaScript's Math.round rounds half
 *    toward +Infinity, so ROUND(-2.5, 0) would give -2 instead of -3. Rounding
 *    is implemented explicitly, with a binary-floating-point correction so
 *    ROUND(2.675, 2) gives 2.68 rather than 2.67.
 *  - Circular references are detected and reported rather than hanging.
 *
 * Works in the browser (window.FormulaEngine) and in Node (module.exports) so
 * the same code is unit tested in CI. See scripts/test-formula-engine.js.
 */
(function (root, factory) {
  'use strict';
  var api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.FormulaEngine = api;
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  /* ── Error values ────────────────────────────────────────────────────────── */
  var ERR = {
    DIV0: '#DIV/0!', VALUE: '#VALUE!', REF: '#REF!', NAME: '#NAME?',
    NUM: '#NUM!', NA: '#N/A', CIRC: '#CIRC!'
  };
  var ERROR_SET = Object.create(null);
  Object.keys(ERR).forEach(function (k) { ERROR_SET[ERR[k]] = true; });

  function isError(v) { return typeof v === 'string' && ERROR_SET[v] === true; }

  /* Hard limits. A student can type anything; nothing here should be able to
     lock the tab up. */
  var MAX_CELLS_IN_RANGE = 20000;
  var MAX_DEPTH = 64;
  var MAX_FORMULA_LEN = 1000;

  /* ── Column letters ↔ zero-based index ───────────────────────────────────── */
  function colToIndex(letters) {
    var n = 0;
    for (var i = 0; i < letters.length; i++) {
      var c = letters.charCodeAt(i);
      if (c >= 97) c -= 32;                       // lower → upper
      if (c < 65 || c > 90) return -1;
      n = n * 26 + (c - 64);
    }
    return n - 1;
  }
  function indexToCol(idx) {
    if (idx < 0) return '';
    var s = '';
    idx += 1;
    while (idx > 0) {
      var rem = (idx - 1) % 26;
      s = String.fromCharCode(65 + rem) + s;
      idx = Math.floor((idx - 1) / 26);
    }
    return s;
  }
  /* 'A1' / '$A$1' → { col, row, absCol, absRow } (zero-based), or null. */
  function parseRef(text) {
    var m = /^(\$?)([A-Za-z]{1,3})(\$?)([0-9]{1,7})$/.exec(text);
    if (!m) return null;
    var col = colToIndex(m[2]);
    var row = parseInt(m[4], 10) - 1;
    if (col < 0 || row < 0 || !isFinite(row)) return null;
    return { col: col, row: row, absCol: m[1] === '$', absRow: m[3] === '$' };
  }
  function refToA1(ref) {
    return (ref.absCol ? '$' : '') + indexToCol(ref.col) + (ref.absRow ? '$' : '') + (ref.row + 1);
  }
  /* Normalised key used by the cell store — always relative form, e.g. "B7". */
  function addrKey(col, row) { return indexToCol(col) + (row + 1); }

  /* ── Tokeniser ───────────────────────────────────────────────────────────── */
  var T = {
    NUM: 'num', STR: 'str', BOOL: 'bool', ERR: 'err', REF: 'ref', NAME: 'name',
    OP: 'op', LPAREN: '(', RPAREN: ')', COMMA: ',', COLON: ':', EOF: 'eof'
  };

  function tokenise(src) {
    var toks = [];
    var i = 0;
    var n = src.length;
    while (i < n) {
      var ch = src[i];

      if (ch === ' ' || ch === '\t' || ch === '\n' || ch === '\r') { i++; continue; }

      // String literal — Excel doubles an embedded quote: "he said ""hi"""
      if (ch === '"') {
        var buf = '';
        i++;
        var closed = false;
        while (i < n) {
          if (src[i] === '"') {
            if (src[i + 1] === '"') { buf += '"'; i += 2; continue; }
            i++; closed = true; break;
          }
          buf += src[i++];
        }
        if (!closed) throw new ParseError('Unclosed text — every " needs a matching "');
        toks.push({ t: T.STR, v: buf });
        continue;
      }

      // Error literal, e.g. #DIV/0! typed directly
      if (ch === '#') {
        var rest = src.slice(i);
        var hit = null;
        Object.keys(ERROR_SET).forEach(function (e) {
          if (!hit && rest.slice(0, e.length).toUpperCase() === e) hit = e;
        });
        if (hit) { toks.push({ t: T.ERR, v: hit }); i += hit.length; continue; }
        throw new ParseError('Unrecognised value starting with #');
      }

      // Number (leading digit or a '.' followed by a digit)
      if (/[0-9]/.test(ch) || (ch === '.' && /[0-9]/.test(src[i + 1] || ''))) {
        var numRe = /^[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?/;
        var m = numRe.exec(src.slice(i));
        if (!m) throw new ParseError('Malformed number');
        toks.push({ t: T.NUM, v: parseFloat(m[0]) });
        i += m[0].length;
        continue;
      }

      // Reference, boolean, or function/defined name
      if (/[A-Za-z_$]/.test(ch)) {
        var wm = /^[$]?[A-Za-z_][A-Za-z0-9_.]*[$]?[0-9]*/.exec(src.slice(i));
        var word = wm ? wm[0] : ch;
        // A reference must be consumed greedily including the $ signs.
        var refm = /^\$?[A-Za-z]{1,3}\$?[0-9]{1,7}(?![A-Za-z0-9_])/.exec(src.slice(i));
        if (refm) {
          var r = parseRef(refm[0]);
          if (r) { toks.push({ t: T.REF, v: r }); i += refm[0].length; continue; }
        }
        var upper = word.toUpperCase();
        if (upper === 'TRUE' || upper === 'FALSE') {
          toks.push({ t: T.BOOL, v: upper === 'TRUE' });
          i += word.length;
          continue;
        }
        toks.push({ t: T.NAME, v: upper });
        i += word.length;
        continue;
      }

      // Operators and punctuation
      var two = src.substr(i, 2);
      if (two === '<=' || two === '>=' || two === '<>') { toks.push({ t: T.OP, v: two }); i += 2; continue; }
      if ('+-*/^&=<>%'.indexOf(ch) !== -1) { toks.push({ t: T.OP, v: ch }); i++; continue; }
      if (ch === '(') { toks.push({ t: T.LPAREN }); i++; continue; }
      if (ch === ')') { toks.push({ t: T.RPAREN }); i++; continue; }
      if (ch === ',') { toks.push({ t: T.COMMA }); i++; continue; }
      if (ch === ';') { toks.push({ t: T.COMMA }); i++; continue; }   // tolerate ; as arg separator
      if (ch === ':') { toks.push({ t: T.COLON }); i++; continue; }

      throw new ParseError('Unexpected character "' + ch + '"');
    }
    toks.push({ t: T.EOF });
    return toks;
  }

  function ParseError(msg) { this.name = 'ParseError'; this.message = msg; }
  ParseError.prototype = Object.create(Error.prototype);

  /* ── Parser (recursive descent, Excel precedence) ─────────────────────────
     Lowest to highest:
       comparison  = <> <= >= < >
       concat      &
       additive    + -
       multiplic.  * /
       power       ^
       percent     postfix %
       unary       - +           (binds tighter than ^, as in Excel)
       primary     literals, refs, ranges, calls, ( … )
  */
  function parse(tokens) {
    var pos = 0;
    function peek() { return tokens[pos]; }
    function next() { return tokens[pos++]; }
    function expect(type, what) {
      var tk = tokens[pos];
      if (!tk || tk.t !== type) throw new ParseError('Expected ' + (what || type));
      pos++;
      return tk;
    }

    function parseExpression(depth) {
      if (depth > MAX_DEPTH) throw new ParseError('Formula is nested too deeply');
      return parseComparison(depth);
    }

    function parseComparison(depth) {
      var left = parseConcat(depth);
      while (peek().t === T.OP && ['=', '<>', '<', '>', '<=', '>='].indexOf(peek().v) !== -1) {
        var op = next().v;
        var right = parseConcat(depth);
        left = { k: 'bin', op: op, a: left, b: right };
      }
      return left;
    }
    function parseConcat(depth) {
      var left = parseAdditive(depth);
      while (peek().t === T.OP && peek().v === '&') {
        next();
        left = { k: 'bin', op: '&', a: left, b: parseAdditive(depth) };
      }
      return left;
    }
    function parseAdditive(depth) {
      var left = parseMultiplicative(depth);
      while (peek().t === T.OP && (peek().v === '+' || peek().v === '-')) {
        var op = next().v;
        left = { k: 'bin', op: op, a: left, b: parseMultiplicative(depth) };
      }
      return left;
    }
    function parseMultiplicative(depth) {
      var left = parsePower(depth);
      while (peek().t === T.OP && (peek().v === '*' || peek().v === '/')) {
        var op = next().v;
        left = { k: 'bin', op: op, a: left, b: parsePower(depth) };
      }
      return left;
    }
    function parsePower(depth) {
      var left = parseUnary(depth);
      // ^ is left-associative in Excel: 2^3^2 = (2^3)^2 = 64
      while (peek().t === T.OP && peek().v === '^') {
        next();
        left = { k: 'bin', op: '^', a: left, b: parseUnary(depth) };
      }
      return left;
    }
    function parseUnary(depth) {
      if (peek().t === T.OP && (peek().v === '-' || peek().v === '+')) {
        var op = next().v;
        var operand = parseUnary(depth);
        return op === '-' ? { k: 'neg', a: operand } : operand;
      }
      return parsePercent(depth);
    }
    function parsePercent(depth) {
      var node = parsePrimary(depth);
      while (peek().t === T.OP && peek().v === '%') { next(); node = { k: 'pct', a: node }; }
      return node;
    }

    function parsePrimary(depth) {
      var tk = peek();

      if (tk.t === T.NUM) { next(); return { k: 'num', v: tk.v }; }
      if (tk.t === T.STR) { next(); return { k: 'str', v: tk.v }; }
      if (tk.t === T.BOOL) { next(); return { k: 'bool', v: tk.v }; }
      if (tk.t === T.ERR) { next(); return { k: 'err', v: tk.v }; }

      if (tk.t === T.LPAREN) {
        next();
        var inner = parseExpression(depth + 1);
        expect(T.RPAREN, 'a closing bracket )');
        return inner;
      }

      if (tk.t === T.REF) {
        next();
        if (peek().t === T.COLON) {
          next();
          var end = peek();
          if (end.t !== T.REF) throw new ParseError('A range needs a cell on both sides of the colon, like B2:B8');
          next();
          return { k: 'range', a: tk.v, b: end.v };
        }
        return { k: 'ref', v: tk.v };
      }

      if (tk.t === T.NAME) {
        next();
        if (peek().t !== T.LPAREN) {
          throw new ParseError('Unknown name "' + tk.v + '" — did you mean a cell reference, or a function with brackets?');
        }
        next(); // (
        var args = [];
        if (peek().t !== T.RPAREN) {
          for (;;) {
            args.push(parseExpression(depth + 1));
            if (peek().t === T.COMMA) { next(); continue; }
            break;
          }
        }
        expect(T.RPAREN, 'a closing bracket ) for ' + tk.v);
        return { k: 'call', name: tk.v, args: args };
      }

      if (tk.t === T.EOF) throw new ParseError('Formula ended unexpectedly');
      throw new ParseError('Unexpected token in formula');
    }

    var ast = parseExpression(0);
    if (peek().t !== T.EOF) throw new ParseError('Unexpected extra input after the formula');
    return ast;
  }

  /* ── Value coercion ──────────────────────────────────────────────────────── */
  function isBlank(v) { return v === null || v === undefined || v === ''; }

  /* Excel-ish: numbers pass through, blanks are 0, TRUE/FALSE are 1/0, numeric
     text converts, anything else is #VALUE!. */
  function toNumber(v) {
    if (isError(v)) return v;
    if (typeof v === 'number') return isFinite(v) ? v : ERR.NUM;
    if (typeof v === 'boolean') return v ? 1 : 0;
    if (isBlank(v)) return 0;
    if (typeof v === 'string') {
      var s = v.trim().replace(/,/g, '');
      if (s === '') return 0;
      var pct = false;
      if (/%$/.test(s)) { pct = true; s = s.slice(0, -1); }
      if (/^[-+]?(\d+\.?\d*|\.\d+)([eE][-+]?\d+)?$/.test(s)) {
        var num = parseFloat(s);
        return pct ? num / 100 : num;
      }
      var d = parseDateValue(v);
      if (d !== null) return d;
      return ERR.VALUE;
    }
    return ERR.VALUE;
  }
  function toText(v) {
    if (isError(v)) return v;
    if (isBlank(v)) return '';
    if (typeof v === 'boolean') return v ? 'TRUE' : 'FALSE';
    return String(v);
  }
  function toBool(v) {
    if (isError(v)) return v;
    if (typeof v === 'boolean') return v;
    if (typeof v === 'number') return v !== 0;
    if (isBlank(v)) return false;
    var s = String(v).trim().toUpperCase();
    if (s === 'TRUE') return true;
    if (s === 'FALSE') return false;
    var n = toNumber(v);
    if (isError(n)) return ERR.VALUE;
    return n !== 0;
  }

  /* Dates: accept ISO (YYYY-MM-DD) and UK (DD/MM/YYYY), returning an Excel-style
     serial so DAYS() can subtract them. Excel's epoch is 1899-12-30. */
  var EXCEL_EPOCH_UTC = Date.UTC(1899, 11, 30);
  function parseDateValue(v) {
    if (typeof v === 'number') return v;
    if (typeof v !== 'string') return null;
    var s = v.trim();
    var m = /^(\d{4})-(\d{1,2})-(\d{1,2})$/.exec(s);
    var y, mo, d;
    if (m) { y = +m[1]; mo = +m[2]; d = +m[3]; }
    else {
      m = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec(s);
      if (!m) return null;
      d = +m[1]; mo = +m[2]; y = +m[3];
    }
    if (mo < 1 || mo > 12 || d < 1 || d > 31) return null;
    var utc = Date.UTC(y, mo - 1, d);
    var back = new Date(utc);
    if (back.getUTCFullYear() !== y || back.getUTCMonth() !== mo - 1 || back.getUTCDate() !== d) return null;
    return Math.round((utc - EXCEL_EPOCH_UTC) / 86400000);
  }

  /* Excel rounds half away from zero, and must not be fooled by binary floating
     point: ROUND(2.675, 2) is 2.68 in Excel but 2.67 with a naive scale-and-
     Math.round, because 2.675 is stored as 2.67499999999999982236431605997495. */
  function excelRound(num, digits, mode) {
    if (!isFinite(num)) return ERR.NUM;
    digits = Math.trunc(digits);
    if (digits > 100) digits = 100;
    if (digits < -100) digits = -100;
    var sign = num < 0 ? -1 : 1;
    var abs = Math.abs(num);
    var factor = Math.pow(10, digits);
    var scaled = abs * factor;
    // Nudge values that are within one ULP-ish of a .5 boundary back onto it.
    var corrected = parseFloat(scaled.toPrecision(15));
    var out;
    if (mode === 'up') out = Math.ceil(corrected - 1e-9);
    else if (mode === 'down') out = Math.floor(corrected + 1e-9);
    else out = Math.floor(corrected + 0.5);
    var res = (out / factor) * sign;
    return Object.is(res, -0) ? 0 : res;
  }

  /* ── Criteria matching for SUMIF / COUNTIF ───────────────────────────────── */
  function makeCriteria(raw) {
    var op = '=';
    var target = raw;
    if (typeof raw === 'string') {
      var m = /^(<=|>=|<>|=|<|>)(.*)$/.exec(raw.trim());
      if (m) { op = m[1]; target = m[2].trim(); }
    }
    var targetNum = (typeof target === 'number') ? target
      : (typeof target === 'string' && target !== '' && !isError(toNumber(target)) && /^[-+]?[0-9.,]+%?$/.test(target.trim()))
        ? toNumber(target) : null;

    var wildcard = null;
    if (op === '=' || op === '<>') {
      if (typeof target === 'string' && /[*?]/.test(target)) {
        var pat = target.replace(/[.+^${}()|[\]\\]/g, '\\$&')
          .replace(/~\*/g, ' STAR').replace(/~\?/g, ' QM')
          .replace(/\*/g, '.*').replace(/\?/g, '.')
          .replace(/ STAR/g, '\\*').replace(/ QM/g, '\\?');
        wildcard = new RegExp('^' + pat + '$', 'i');
      }
    }

    return function (value) {
      if (isError(value)) return false;
      if (wildcard) {
        var hit = wildcard.test(toText(value));
        return op === '<>' ? !hit : hit;
      }
      // Numeric comparison when both sides look numeric
      if (targetNum !== null) {
        if (isBlank(value)) {
          // Blank only matches an explicit "=" against blank, never a number.
          return op === '<>';
        }
        var vn = toNumber(value);
        if (isError(vn) || typeof value === 'string' && !/^\s*[-+]?[0-9.,]+%?\s*$/.test(value)) {
          return op === '<>';
        }
        switch (op) {
          case '=': return vn === targetNum;
          case '<>': return vn !== targetNum;
          case '<': return vn < targetNum;
          case '>': return vn > targetNum;
          case '<=': return vn <= targetNum;
          case '>=': return vn >= targetNum;
        }
        return false;
      }
      // Text comparison, case-insensitive like Excel
      var a = toText(value).toUpperCase();
      var b = toText(target).toUpperCase();
      switch (op) {
        case '=': return a === b;
        case '<>': return a !== b;
        case '<': return a < b;
        case '>': return a > b;
        case '<=': return a <= b;
        case '>=': return a >= b;
      }
      return false;
    };
  }

  /* ── Evaluator ───────────────────────────────────────────────────────────── */

  /* A Sheet holds raw cell contents keyed by "A1". A value is a number, a
     string, a boolean, or a string beginning "=" (a formula). */
  function Sheet(cells) {
    this.cells = Object.create(null);
    if (cells) {
      for (var k in cells) {
        if (Object.prototype.hasOwnProperty.call(cells, k)) {
          var ref = parseRef(k);
          if (!ref) throw new Error('Sheet: bad cell address "' + k + '"');
          this.cells[addrKey(ref.col, ref.row)] = cells[k];
        }
      }
    }
    this._cache = Object.create(null);
    this._visiting = Object.create(null);
  }

  Sheet.prototype.setRaw = function (addr, value) {
    var ref = parseRef(addr);
    if (!ref) throw new Error('Sheet.setRaw: bad address "' + addr + '"');
    this.cells[addrKey(ref.col, ref.row)] = value;
    this.invalidate();
  };
  Sheet.prototype.getRaw = function (addr) {
    var ref = parseRef(addr);
    if (!ref) return undefined;
    return this.cells[addrKey(ref.col, ref.row)];
  };
  Sheet.prototype.invalidate = function () {
    this._cache = Object.create(null);
    this._visiting = Object.create(null);
  };

  /* Evaluated value of one cell. */
  Sheet.prototype.valueAt = function (col, row) {
    var key = addrKey(col, row);
    if (Object.prototype.hasOwnProperty.call(this._cache, key)) return this._cache[key];
    var raw = this.cells[key];
    if (isBlank(raw)) return '';
    if (typeof raw === 'string' && raw.charAt(0) === '=') {
      if (this._visiting[key]) return ERR.CIRC;
      this._visiting[key] = true;
      var out;
      try {
        out = evaluateFormula(raw, this);
      } catch (e) {
        out = (e && e.name === 'ParseError') ? ERR.NAME : ERR.VALUE;
      } finally {
        delete this._visiting[key];
      }
      this._cache[key] = out;
      return out;
    }
    return raw;
  };
  Sheet.prototype.value = function (addr) {
    var ref = parseRef(addr);
    if (!ref) return ERR.REF;
    return this.valueAt(ref.col, ref.row);
  };

  /* Flatten a range node into a list of evaluated values (row-major). */
  function rangeCells(node, sheet) {
    var c1 = Math.min(node.a.col, node.b.col), c2 = Math.max(node.a.col, node.b.col);
    var r1 = Math.min(node.a.row, node.b.row), r2 = Math.max(node.a.row, node.b.row);
    var count = (c2 - c1 + 1) * (r2 - r1 + 1);
    if (count > MAX_CELLS_IN_RANGE) throw new ParseError('That range covers too many cells');
    var vals = [];
    for (var r = r1; r <= r2; r++) {
      for (var c = c1; c <= c2; c++) vals.push(sheet.valueAt(c, r));
    }
    return { values: vals, r1: r1, r2: r2, c1: c1, c2: c2,
             rows: r2 - r1 + 1, cols: c2 - c1 + 1 };
  }

  function evalNode(node, sheet) {
    switch (node.k) {
      case 'num': return node.v;
      case 'str': return node.v;
      case 'bool': return node.v;
      case 'err': return node.v;
      case 'ref': return sheet.valueAt(node.v.col, node.v.row);
      case 'range': {
        // A bare range used where a single value is expected is an error here.
        var rc = rangeCells(node, sheet);
        if (rc.values.length === 1) return rc.values[0];
        return ERR.VALUE;
      }
      case 'neg': {
        var a = toNumber(evalNode(node.a, sheet));
        if (isError(a)) return a;
        return a === 0 ? 0 : -a;
      }
      case 'pct': {
        var p = toNumber(evalNode(node.a, sheet));
        if (isError(p)) return p;
        return p / 100;
      }
      case 'bin': return evalBinary(node, sheet);
      case 'call': return evalCall(node, sheet);
    }
    return ERR.VALUE;
  }

  function evalBinary(node, sheet) {
    var op = node.op;
    var av = evalNode(node.a, sheet);
    if (isError(av)) return av;
    var bv = evalNode(node.b, sheet);
    if (isError(bv)) return bv;

    if (op === '&') {
      var at = toText(av), bt = toText(bv);
      if (isError(at)) return at;
      if (isError(bt)) return bt;
      return at + bt;
    }

    if (['=', '<>', '<', '>', '<=', '>='].indexOf(op) !== -1) {
      // Excel compares numbers to numbers and text to text; blanks coerce.
      var bothNumeric = (typeof av === 'number' || typeof av === 'boolean' || isBlank(av))
                     && (typeof bv === 'number' || typeof bv === 'boolean' || isBlank(bv));
      var x, y;
      if (bothNumeric) { x = toNumber(av); y = toNumber(bv); }
      else { x = toText(av).toUpperCase(); y = toText(bv).toUpperCase(); }
      switch (op) {
        case '=': return x === y;
        case '<>': return x !== y;
        case '<': return x < y;
        case '>': return x > y;
        case '<=': return x <= y;
        case '>=': return x >= y;
      }
    }

    var a = toNumber(av); if (isError(a)) return a;
    var b = toNumber(bv); if (isError(b)) return b;
    switch (op) {
      case '+': return a + b;
      case '-': return a - b;
      case '*': return a * b;
      case '/': return b === 0 ? ERR.DIV0 : a / b;
      case '^': {
        var p = Math.pow(a, b);
        return isFinite(p) ? p : ERR.NUM;
      }
    }
    return ERR.VALUE;
  }

  /* Collect argument values, flattening ranges. Used by the aggregate functions. */
  function flatten(argNodes, sheet) {
    var out = [];
    for (var i = 0; i < argNodes.length; i++) {
      var nd = argNodes[i];
      if (nd.k === 'range') {
        var rc = rangeCells(nd, sheet);
        for (var j = 0; j < rc.values.length; j++) out.push({ v: rc.values[j], fromRange: true });
      } else if (nd.k === 'ref') {
        /* A single cell reference follows the RANGE rule, as in Excel: text
           in a referenced cell is ignored by SUM, not coerced — =SUM(A1)
           with "abc" in A1 is 0, not #VALUE!. Only a value typed directly
           into the formula must convert. */
        out.push({ v: evalNode(nd, sheet), fromRange: true });
      } else {
        out.push({ v: evalNode(nd, sheet), fromRange: false });
      }
    }
    return out;
  }

  /* Numbers only, with Excel's rule: inside a range, text and blanks are
     ignored; typed directly as an argument, they must convert. */
  function numericArgs(items) {
    var nums = [];
    for (var i = 0; i < items.length; i++) {
      var it = items[i];
      if (isError(it.v)) return { error: it.v };
      if (it.fromRange) {
        if (typeof it.v === 'number') nums.push(it.v);
        else if (typeof it.v === 'string' && it.v !== '') {
          var d = parseDateValue(it.v);
          if (d !== null) nums.push(d);
        }
        // blanks, text and booleans in a range are ignored
      } else {
        if (isBlank(it.v)) { nums.push(0); continue; }
        var n = toNumber(it.v);
        if (isError(n)) return { error: n };
        nums.push(n);
      }
    }
    return { nums: nums };
  }

  function needArgs(name, args, min, max) {
    if (args.length < min || (max !== null && args.length > max)) {
      return 'Function ' + name + ' takes ' +
        (max === null ? min + ' or more' : (min === max ? String(min) : min + ' to ' + max)) +
        ' argument' + (max === 1 && min === 1 ? '' : 's') + ', but got ' + args.length;
    }
    return null;
  }

  var FUNCTIONS = {
    SUM: function (args, sheet) {
      var e = needArgs('SUM', args, 1, null); if (e) throw new ParseError(e);
      var r = numericArgs(flatten(args, sheet));
      if (r.error) return r.error;
      var t = 0;
      for (var i = 0; i < r.nums.length; i++) t += r.nums[i];
      return t;
    },
    AVERAGE: function (args, sheet) {
      var e = needArgs('AVERAGE', args, 1, null); if (e) throw new ParseError(e);
      var r = numericArgs(flatten(args, sheet));
      if (r.error) return r.error;
      if (!r.nums.length) return ERR.DIV0;
      var t = 0;
      for (var i = 0; i < r.nums.length; i++) t += r.nums[i];
      return t / r.nums.length;
    },
    MIN: function (args, sheet) {
      var e = needArgs('MIN', args, 1, null); if (e) throw new ParseError(e);
      var r = numericArgs(flatten(args, sheet));
      if (r.error) return r.error;
      if (!r.nums.length) return 0;
      return Math.min.apply(Math, r.nums);
    },
    MAX: function (args, sheet) {
      var e = needArgs('MAX', args, 1, null); if (e) throw new ParseError(e);
      var r = numericArgs(flatten(args, sheet));
      if (r.error) return r.error;
      if (!r.nums.length) return 0;
      return Math.max.apply(Math, r.nums);
    },
    COUNT: function (args, sheet) {
      var e = needArgs('COUNT', args, 1, null); if (e) throw new ParseError(e);
      var items = flatten(args, sheet);
      var c = 0;
      for (var i = 0; i < items.length; i++) {
        var v = items[i].v;
        if (isError(v)) { if (!items[i].fromRange) return v; continue; }
        if (typeof v === 'number') c++;
        else if (typeof v === 'string' && v !== '' && parseDateValue(v) !== null) c++;
        else if (!items[i].fromRange && typeof v === 'boolean') c++;
      }
      return c;
    },
    COUNTA: function (args, sheet) {
      var e = needArgs('COUNTA', args, 1, null); if (e) throw new ParseError(e);
      var items = flatten(args, sheet);
      var c = 0;
      for (var i = 0; i < items.length; i++) if (!isBlank(items[i].v)) c++;
      return c;
    },
    ROUND: function (args, sheet) { return roundLike('ROUND', args, sheet, 'half'); },
    ROUNDUP: function (args, sheet) { return roundLike('ROUNDUP', args, sheet, 'up'); },
    ROUNDDOWN: function (args, sheet) { return roundLike('ROUNDDOWN', args, sheet, 'down'); },

    IF: function (args, sheet) {
      var e = needArgs('IF', args, 2, 3); if (e) throw new ParseError(e);
      var cond = toBool(evalNode(args[0], sheet));
      if (isError(cond)) return cond;
      if (cond) return evalNode(args[1], sheet);
      if (args.length === 3) return evalNode(args[2], sheet);
      return false;
    },

    SUMIF: function (args, sheet) {
      var e = needArgs('SUMIF', args, 2, 3); if (e) throw new ParseError(e);
      if (args[0].k !== 'range' && args[0].k !== 'ref') return ERR.VALUE;
      var rng = asRange(args[0], sheet);
      var crit = evalNode(args[1], sheet);
      if (isError(crit)) return crit;
      var match = makeCriteria(crit);
      var sumRng = rng;
      if (args.length === 3) {
        if (args[2].k !== 'range' && args[2].k !== 'ref') return ERR.VALUE;
        sumRng = asRange(args[2], sheet);
        // Excel resizes the sum range to match the criteria range's shape,
        // anchored at its top-left.
        sumRng = reshape(sumRng, rng, sheet);
      }
      var total = 0;
      for (var i = 0; i < rng.values.length; i++) {
        if (!match(rng.values[i])) continue;
        var sv = sumRng.values[i];
        if (isError(sv)) return sv;
        if (typeof sv === 'number') total += sv;
        else if (typeof sv === 'string' && sv !== '') {
          var n = toNumber(sv);
          if (!isError(n)) total += n;
        }
      }
      return total;
    },
    COUNTIF: function (args, sheet) {
      var e = needArgs('COUNTIF', args, 2, 2); if (e) throw new ParseError(e);
      if (args[0].k !== 'range' && args[0].k !== 'ref') return ERR.VALUE;
      var rng = asRange(args[0], sheet);
      var crit = evalNode(args[1], sheet);
      if (isError(crit)) return crit;
      var match = makeCriteria(crit);
      var c = 0;
      for (var i = 0; i < rng.values.length; i++) if (match(rng.values[i])) c++;
      return c;
    },

    VLOOKUP: function (args, sheet) { return lookup('V', args, sheet); },
    HLOOKUP: function (args, sheet) { return lookup('H', args, sheet); },

    DAYS: function (args, sheet) {
      var e = needArgs('DAYS', args, 2, 2); if (e) throw new ParseError(e);
      var endV = evalNode(args[0], sheet);
      var startV = evalNode(args[1], sheet);
      if (isError(endV)) return endV;
      if (isError(startV)) return startV;
      var end = parseDateValue(endV);
      var start = parseDateValue(startV);
      if (end === null) { var en = toNumber(endV); if (isError(en)) return ERR.VALUE; end = en; }
      if (start === null) { var sn = toNumber(startV); if (isError(sn)) return ERR.VALUE; start = sn; }
      return Math.trunc(end) - Math.trunc(start);
    }
  };

  function roundLike(name, args, sheet, mode) {
    var e = needArgs(name, args, 1, 2); if (e) throw new ParseError(e);
    var nv = toNumber(evalNode(args[0], sheet));
    if (isError(nv)) return nv;
    var digits = 0;
    if (args.length === 2) {
      var dv = toNumber(evalNode(args[1], sheet));
      if (isError(dv)) return dv;
      digits = dv;
    }
    return excelRound(nv, digits, mode);
  }

  /* Normalise a ref or range node into the shape rangeCells returns. */
  function asRange(node, sheet) {
    if (node.k === 'range') return rangeCells(node, sheet);
    var v = sheet.valueAt(node.v.col, node.v.row);
    return { values: [v], r1: node.v.row, r2: node.v.row, c1: node.v.col, c2: node.v.col, rows: 1, cols: 1 };
  }
  /* Re-anchor `sum` so it has the same shape as `crit`, as Excel does. */
  function reshape(sum, crit, sheet) {
    if (sum.rows === crit.rows && sum.cols === crit.cols) return sum;
    var vals = [];
    for (var r = 0; r < crit.rows; r++) {
      for (var c = 0; c < crit.cols; c++) vals.push(sheet.valueAt(sum.c1 + c, sum.r1 + r));
    }
    return { values: vals, r1: sum.r1, r2: sum.r1 + crit.rows - 1,
             c1: sum.c1, c2: sum.c1 + crit.cols - 1, rows: crit.rows, cols: crit.cols };
  }

  function lookup(kind, args, sheet) {
    var name = kind === 'V' ? 'VLOOKUP' : 'HLOOKUP';
    var e = needArgs(name, args, 3, 4); if (e) throw new ParseError(e);
    var needle = evalNode(args[0], sheet);
    if (isError(needle)) return needle;
    if (args[1].k !== 'range') return ERR.VALUE;
    var table = rangeCells(args[1], sheet);
    var idxV = toNumber(evalNode(args[2], sheet));
    if (isError(idxV)) return idxV;
    var index = Math.trunc(idxV);
    var approx = true;
    if (args.length === 4) {
      var a = toBool(evalNode(args[3], sheet));
      if (isError(a)) return a;
      approx = a;
    }
    var lines = kind === 'V' ? table.rows : table.cols;
    var depth = kind === 'V' ? table.cols : table.rows;
    if (index < 1) return ERR.VALUE;
    if (index > depth) return ERR.REF;

    function at(line, off) {
      // values are row-major over (rows × cols)
      var r = kind === 'V' ? line : off;
      var c = kind === 'V' ? off : line;
      return table.values[r * table.cols + c];
    }

    if (!approx) {
      var match = makeCriteria(needle);
      for (var i = 0; i < lines; i++) {
        if (match(at(i, 0))) return at(i, index - 1);
      }
      return ERR.NA;
    }
    // Approximate: assumes the first line is sorted ascending; take the largest
    // value that does not exceed the lookup value.
    var needleNum = toNumber(needle);
    var numeric = !isError(needleNum) && typeof needle !== 'string';
    var best = -1;
    for (var j = 0; j < lines; j++) {
      var cell = at(j, 0);
      if (isBlank(cell)) continue;
      var ok;
      if (numeric || typeof cell === 'number') {
        var cn = toNumber(cell);
        if (isError(cn)) continue;
        ok = cn <= (isError(needleNum) ? NaN : needleNum);
      } else {
        ok = toText(cell).toUpperCase() <= toText(needle).toUpperCase();
      }
      if (ok) best = j; else break;
    }
    if (best < 0) return ERR.NA;
    return at(best, index - 1);
  }

  function evalCall(node, sheet) {
    var fn = FUNCTIONS[node.name];
    if (!fn) return ERR.NAME;
    return fn(node.args, sheet);
  }

  /* ── Public entry points ─────────────────────────────────────────────────── */

  /* Evaluate a formula string ("=SUM(A1:A4)" or a bare expression) against a
     sheet. Returns a value, or an Excel error string. Throws ParseError only
     for genuinely malformed input — callers usually want `check` below. */
  function evaluateFormula(text, sheet) {
    if (typeof text !== 'string') return ERR.VALUE;
    if (text.length > MAX_FORMULA_LEN) throw new ParseError('Formula is too long');
    var body = text.charAt(0) === '=' ? text.slice(1) : text;
    if (!body.trim()) return '';
    var ast = parse(tokenise(body));
    return evalNode(ast, sheet);
  }

  /* Parse without evaluating — used to validate student input as they type. */
  function parseFormula(text) {
    var body = (text || '').charAt(0) === '=' ? text.slice(1) : (text || '');
    return parse(tokenise(body));
  }

  /* Which functions and cells does this formula touch? Powers the "trace
     precedents" idea from syllabus criterion 5.2.4. */
  function analyse(text) {
    var out = { functions: [], refs: [], ranges: [], usesAbsolute: false };
    var ast;
    try { ast = parseFormula(text); } catch (e) { return out; }
    (function walk(n) {
      if (!n || typeof n !== 'object') return;
      if (n.k === 'call') {
        if (out.functions.indexOf(n.name) === -1) out.functions.push(n.name);
        n.args.forEach(walk);
        return;
      }
      if (n.k === 'ref') {
        out.refs.push(refToA1(n.v));
        if (n.v.absCol || n.v.absRow) out.usesAbsolute = true;
        return;
      }
      if (n.k === 'range') {
        out.ranges.push(refToA1(n.a) + ':' + refToA1(n.b));
        if (n.a.absCol || n.a.absRow || n.b.absCol || n.b.absRow) out.usesAbsolute = true;
        return;
      }
      walk(n.a); walk(n.b);
    }(ast));
    return out;
  }

  /* Grade a student's formula for one target cell.
   *
   * spec: {
   *   cells:        base sheet contents
   *   target:       'D2'
   *   expected:     expected evaluated value (number/string/bool)
   *   tolerance:    numeric tolerance, default 1e-9
   *   requireFunctions: ['SUM']       — must use all of these
   *   forbidFunctions:  ['VLOOKUP']   — must use none of these
   *   requireAbsolute:  true          — must use at least one $ reference
   *   mustBeFormula:    true (default) — typing the literal answer is not enough
   * }
   */
  function check(spec, input) {
    var res = { ok: false, value: null, error: null, reason: null, analysis: null };
    var text = (input == null ? '' : String(input)).trim();
    if (!text) { res.reason = 'empty'; res.error = 'Enter a formula.'; return res; }

    var mustBeFormula = spec.mustBeFormula !== false;
    if (mustBeFormula && text.charAt(0) !== '=') {
      res.reason = 'not-a-formula';
      res.error = 'A formula has to start with = — otherwise the cell just holds text.';
      return res;
    }

    var sheet = new Sheet(spec.cells || {});
    // Put the student's formula into the target cell so self-reference is caught.
    if (spec.target) sheet.setRaw(spec.target, text.charAt(0) === '=' ? text : '=' + text);

    var value;
    try {
      value = spec.target ? sheet.value(spec.target) : evaluateFormula(text, sheet);
    } catch (e) {
      res.reason = 'parse';
      res.error = (e && e.message) ? e.message : 'That formula could not be read.';
      return res;
    }
    res.value = value;
    res.analysis = analyse(text);

    if (isError(value)) {
      res.reason = 'error-value';
      res.error = value === ERR.CIRC
        ? 'That formula refers to its own cell, which Excel would reject as a circular reference.'
        : 'The formula evaluates to ' + value + '.';
      return res;
    }

    if (spec.requireFunctions) {
      for (var i = 0; i < spec.requireFunctions.length; i++) {
        var want = String(spec.requireFunctions[i]).toUpperCase();
        if (res.analysis.functions.indexOf(want) === -1) {
          res.reason = 'missing-function';
          res.error = 'The answer is right, but this task asks you to use ' + want + '.';
          if (!valuesMatch(value, spec.expected, spec.tolerance)) {
            res.error = 'This task asks you to use ' + want + '.';
          }
          return res;
        }
      }
    }
    if (spec.forbidFunctions) {
      for (var j = 0; j < spec.forbidFunctions.length; j++) {
        var no = String(spec.forbidFunctions[j]).toUpperCase();
        if (res.analysis.functions.indexOf(no) !== -1) {
          res.reason = 'forbidden-function';
          res.error = 'This task asks you not to use ' + no + '.';
          return res;
        }
      }
    }
    if (spec.requireAbsolute && !res.analysis.usesAbsolute) {
      res.reason = 'needs-absolute';
      res.error = 'This one needs an absolute reference — put $ signs on the part that must not move when the formula is copied.';
      return res;
    }

    if (!valuesMatch(value, spec.expected, spec.tolerance)) {
      res.reason = 'wrong-value';
      res.error = 'That gives ' + formatValue(value) + '.';
      return res;
    }

    res.ok = true;
    return res;
  }

  function valuesMatch(a, b, tol) {
    if (typeof b === 'number' || typeof a === 'number') {
      var an = toNumber(a), bn = toNumber(b);
      if (isError(an) || isError(bn)) return false;
      return Math.abs(an - bn) <= (typeof tol === 'number' ? tol : 1e-9);
    }
    if (typeof b === 'boolean' || typeof a === 'boolean') return toBool(a) === toBool(b);
    return toText(a).trim().toUpperCase() === toText(b).trim().toUpperCase();
  }

  function formatValue(v) {
    if (isError(v)) return v;
    if (isBlank(v)) return '(blank)';
    if (typeof v === 'boolean') return v ? 'TRUE' : 'FALSE';
    if (typeof v === 'number') {
      if (Number.isInteger(v)) return String(v);
      return String(Math.round(v * 1e10) / 1e10);
    }
    return String(v);
  }

  return {
    Sheet: Sheet,
    evaluate: evaluateFormula,
    parse: parseFormula,
    analyse: analyse,
    check: check,
    // helpers exposed for the UI and for tests
    colToIndex: colToIndex,
    indexToCol: indexToCol,
    parseRef: parseRef,
    formatValue: formatValue,
    isError: isError,
    ERRORS: ERR,
    FUNCTION_NAMES: Object.keys(FUNCTIONS).sort()
  };
}));
