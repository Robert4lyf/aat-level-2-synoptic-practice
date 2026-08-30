/* ── The on-screen calculator, shared ──────────────────────────────────────────
   One implementation, used by Level 2 (app.js) and Level 3 (aat3-ui.js).

   WHY SHARED RATHER THAN COPIED. The arithmetic here is small but it is not
   obvious — `justEvaled` alone decides whether the next digit extends the
   display or replaces it, whether an operator chains off the running total or
   restarts from it, and whether backspace edits a number or clears a result.
   A second copy would be correct on the day it was written and would drift the
   first time either half was fixed, and the drift would be invisible: both
   calculators would still add up, just differently at the edges. The keypad
   LAYOUT is shared for the same reason — see KEYS — so a level cannot quietly
   ship a pad missing the memory row.

   Each caller gets its OWN instance. A single shared instance would carry a
   half-typed sum and a memory value across a subject switch, which is not what
   a calculator on a different exam should be showing.

   WHAT IS NOT SHARED: the markup and the styling. Each level renders KEYS with
   its own class prefix into its own design system, and tells create() which
   element ids to patch. The engine never builds HTML. */
(function (root) {
  'use strict';

  /* The keypad, in reading order, four to a row. Rendered by each level rather
     than by this file, because the class names belong to the level's design
     system — but the SET of keys and their order live here, so the pads cannot
     come apart. `span` is the column span for the odd-sized keys.

     FOUR OPERATIONS, A SIGN AND A POINT. The memory row (MC, MR, M−, M+), the
     square root and the percentage key were all removed at the author's
     request. None of them is missed: the assessment's own on-screen calculator
     is this shape, a VAT question is reached with ÷ 6 or × 1.2 rather than with
     a percentage key whose meaning changes with the pending operator, and a
     square root has no use anywhere in either unit. The engine still knows how
     to do all three — `press` handles them, and percent() still carries the
     operator rule it was fixed to follow — so nothing had to be unlearned to
     take the buttons away, and putting one back is a line in this list. */
  var KEYS = [
    { k: 'clear', label: 'C',  kind: 'fn' },
    { k: 'back',  label: '⌫', kind: 'fn', aria: 'Backspace' },
    { k: 'sign',  label: '±',  kind: 'fn', aria: 'Toggle sign' },
    { k: 'op',  val: '/', label: '÷', kind: 'op', aria: 'Divide' },
    { k: 'num', val: '7', label: '7' },
    { k: 'num', val: '8', label: '8' },
    { k: 'num', val: '9', label: '9' },
    { k: 'op',  val: '*', label: '×', kind: 'op', aria: 'Multiply' },
    { k: 'num', val: '4', label: '4' },
    { k: 'num', val: '5', label: '5' },
    { k: 'num', val: '6', label: '6' },
    { k: 'op',  val: '-', label: '−', kind: 'op', aria: 'Subtract' },
    { k: 'num', val: '1', label: '1' },
    { k: 'num', val: '2', label: '2' },
    { k: 'num', val: '3', label: '3' },
    { k: 'op',  val: '+', label: '+', kind: 'op', aria: 'Add' },
    { k: 'num', val: '0', label: '0', span: 2 },
    { k: 'dot',  label: '.', aria: 'Decimal point' },
    { k: 'eq',   label: '=', kind: 'eq', aria: 'Equals' },
  ];

  function create(opts) {
    opts = opts || {};
    var displayId = opts.displayId || 'calcDisplay';
    var memoryId = opts.memoryId || 'calcMemoryIndicator';

    return {
      display: '0', prev: null, pending: null, justEvaled: false, errored: false, memory: 0,

      reset() { this.display = '0'; this.prev = null; this.pending = null; this.justEvaled = false; this.errored = false; this._refresh(); },
      memoryClear() { this.memory = 0; this._refresh(); },
      memoryRecall() { if (this.errored) this.reset(); this.display = String(this._round(this.memory)); this.justEvaled = true; this._refresh(); },
      memoryAdd() { if (this.errored) return; var v = Number(this.display); if (Number.isFinite(v)) { this.memory = this._round(this.memory + v); this._refresh(); } },
      memorySub() { if (this.errored) return; var v = Number(this.display); if (Number.isFinite(v)) { this.memory = this._round(this.memory - v); this._refresh(); } },
      sqrt() {
        if (this.errored) return;
        var v = Number(this.display);
        if (!Number.isFinite(v) || v < 0) { this._setError(); return; }
        this.display = String(this._round(Math.sqrt(v))); this.justEvaled = true; this._refresh();
      },
      inputDigit(d) {
        if (this.errored) this.reset();
        if (this.justEvaled) { this.display = d; this.justEvaled = false; }
        else this.display = this.display === '0' ? d : this.display + d;
        this._refresh();
      },
      inputDecimal() {
        if (this.errored) this.reset();
        if (this.justEvaled) { this.display = '0.'; this.justEvaled = false; }
        else if (this.display.indexOf('.') === -1) this.display += '.';
        this._refresh();
      },
      backspace() {
        if (this.errored) { this.reset(); return; }
        if (this.justEvaled) { this.reset(); return; }
        this.display = this.display.length > 1 ? this.display.slice(0, -1) : '0';
        if (this.display === '-' || this.display === '-0') this.display = '0';
        this._refresh();
      },
      toggleSign() {
        if (this.errored || this.display === '0' || this.display === 'Error') return;
        this.display = this.display.charAt(0) === '-' ? this.display.slice(1) : '-' + this.display;
        this._refresh();
      },
      applyOp(op) {
        if (this.errored) return;
        var cur = Number(this.display);
        if (!Number.isFinite(cur)) { this._setError(); return; }
        if (this.pending && !this.justEvaled) {
          var r = this._compute(this.prev, cur, this.pending);
          if (!Number.isFinite(r)) { this._setError(); return; }
          this.prev = r;
        } else this.prev = cur;
        this.pending = op; this.justEvaled = true;
        this.display = String(this._round(this.prev));
        this._refresh();
      },
      evaluate() {
        if (this.errored || this.pending == null) return;
        var cur = Number(this.display);
        var r = this._compute(this.prev, cur, this.pending);
        if (!Number.isFinite(r)) { this._setError(); return; }
        this.display = String(this._round(r));
        this.prev = null; this.pending = null; this.justEvaled = true;
        this._refresh();
      },
      /* PER CENT DEPENDS ON THE PENDING OPERATOR, which is the convention every
         desk calculator and Windows Calculator follows — and getting it wrong
         is a silent wrong answer, not an error message.

           4800 + 20 % =   →  5760   net to gross: the percentage OF 4800, added
           4800 * 20 % =   →   960   twenty per cent OF 4800
                  20 %     →     0.2 a bare percentage is a fraction of one

         The first version applied one formula to all four operators —
         `cur * prev / 100` — which is right for + and −, where what is wanted
         is a slice of the running total, and wrong for × and ÷, where the
         slice is then multiplied by the running total a second time. It made
         "4800 * 20 % =" report 4,608,000, and nothing said so: the display
         showed a plausible 960 until equals was pressed. */
      percent() {
        if (this.errored) return;
        var cur = Number(this.display);
        if (!Number.isFinite(cur)) return;
        var mul = this.pending === '*' || this.pending === '/';
        var base = (this.pending && !mul && this.prev != null) ? this.prev : 1;
        this.display = String(this._round(cur * base / 100)); this.justEvaled = true; this._refresh();
      },

      /* The one entry point a key handler needs. Both levels bind every key to
         this rather than repeating the key-name-to-method mapping, which is
         where a pad that renders a √ it never wired up would come from. */
      press(k, val) {
        if (k === 'num') this.inputDigit(val);
        else if (k === 'dot') this.inputDecimal();
        else if (k === 'op') this.applyOp(val);
        else if (k === 'eq') this.evaluate();
        else if (k === 'clear') this.reset();
        else if (k === 'back') this.backspace();
        else if (k === 'sign') this.toggleSign();
        else if (k === 'pct') this.percent();
        else if (k === 'sqrt') this.sqrt();
        else if (k === 'mc') this.memoryClear();
        else if (k === 'mr') this.memoryRecall();
        else if (k === 'madd') this.memoryAdd();
        else if (k === 'msub') this.memorySub();
      },

      _setError() { this.display = 'Error'; this.errored = true; this.pending = null; this.prev = null; this.justEvaled = true; this._refresh(); },
      _compute(a, b, op) { switch (op) { case '+': return a + b; case '-': return a - b; case '*': return a * b; case '/': return b === 0 ? Infinity : a / b; } return b; },
      _round(n) { return Math.round(n * 1e10) / 1e10; },

      /* Patches the two nodes in place instead of asking the page to repaint.
         A repaint on every keypress would take the caret out of the answer box
         the reader is typing into, which is the whole reason the calculator is
         next to it. Guarded for Node, where the checks drive the engine with no
         document at all. */
      _refresh() {
        if (typeof document === 'undefined' || !document.getElementById) return;
        var el = document.getElementById(displayId);
        if (el) {
          el.textContent = this.display;
          if (el.classList) el.classList.toggle('is-error', this.errored);
        }
        var m = document.getElementById(memoryId);
        if (m) m.textContent = this.memory !== 0 ? 'M' : '';
      },
    };
  }

  root.AATCalc = { create: create, KEYS: KEYS };
})(typeof window !== 'undefined' ? window : (typeof globalThis !== 'undefined' ? globalThis : this));
