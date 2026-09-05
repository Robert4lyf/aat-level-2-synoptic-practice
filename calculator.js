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

  /* ── The pending operator is lit on the pad ────────────────────────────────
     A reader keying 1200 × 1.2 has no way to tell, once the display has gone
     back to showing a number, whether the × landed. The pad looked identical
     whether an operation was waiting or nothing was. That matters in both
     directions: it says WHICH operation is about to happen, and — the more
     common mistake — it says that NONE is, so a forgotten operator is visible
     before the next number is typed on top of the old one rather than after
     the answer comes out wrong.

     `pending` already holds exactly this. It is set by applyOp, cleared by
     evaluate, reset and _setError, so nothing new has to be tracked and the
     light cannot disagree with the arithmetic.

     THE ATTRIBUTE AND THE CLASS LIVE HERE, not in the three renderers, because
     the state is patched in two places that must agree: the level rebuilds the
     pad's HTML on a repaint (so the render has to emit the state), and _refresh
     patches the live buttons on a keypress (because Levels 1 and 3 deliberately
     do NOT repaint on a keypress — that is what keeps the caret in the answer
     box). A class name written out twice per level, six times over, is a class
     name that goes stale on one of them.

     `aria-pressed` rather than colour alone. An operator key is genuinely a
     two-state control while a sum is half-typed, and a reader who cannot see
     the fill is exactly the reader who most needs to be told the × landed. */
  var OP_ATTR = 'data-calc-op';
  var OP_ON = 'is-pending';

  /* Returned with a leading space so a renderer can concatenate it straight
     into a class list or a tag without testing it first. */
  function opClass(k, pending) {
    return (k && k.kind === 'op' && k.val === pending) ? ' ' + OP_ON : '';
  }
  function opAttrs(k, pending) {
    if (!k || k.kind !== 'op') return '';
    return ' ' + OP_ATTR + '="' + k.val + '" aria-pressed="' +
      (k.val === pending ? 'true' : 'false') + '"';
  }

  function create(opts) {
    opts = opts || {};
    var displayId = opts.displayId || 'calcDisplay';
    var memoryId = opts.memoryId || 'calcMemoryIndicator';
    /* Scopes the operator lights to one pad. Only one calculator is ever on
       screen, so an unscoped query would be right today — and would light the
       wrong pad's keys the first time that stopped being true. */
    var panelId = opts.panelId || null;

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
        this._lightOps();
      },

      /* Patched rather than repainted, for the same reason the display is. */
      _lightOps() {
        if (typeof document === 'undefined' || !document.querySelectorAll) return;
        var scope = (panelId && document.getElementById(panelId)) || document;
        if (!scope.querySelectorAll) return;
        var ops = scope.querySelectorAll('[' + OP_ATTR + ']');
        for (var i = 0; i < ops.length; i++) {
          /* `pending` is null when nothing is waiting, and getAttribute never
             returns null for an attribute the selector just matched, so this
             is false for every key at rest without a special case. */
          var on = ops[i].getAttribute(OP_ATTR) === this.pending;
          if (ops[i].classList) ops[i].classList.toggle(OP_ON, on);
          if (ops[i].setAttribute) ops[i].setAttribute('aria-pressed', on ? 'true' : 'false');
        }
      },
    };
  }

  /* ── Moving the calculator ─────────────────────────────────────────────────
     The panel covers whatever is under it, and on a task with a table or an
     entry grid that is often the figures being added up. So it can be dragged,
     by its screen — the one large surface on it that is not a key.

     SHARED FOR THE SAME REASON THE ENGINE IS. Three levels render three panels
     with three class prefixes, and a drag implemented three times is a drag
     that clamps to the viewport in three slightly different ways. The markup
     still belongs to each level: this is handed the two elements it needs.

     POSITION IS REMEMBERED PER PANEL, IN MEMORY, because the levels rebuild
     their panels on repaint — answering a question replaces the element that
     was dragged, and a calculator that jumped home every time the reader
     pressed a key would be worse than one that could not be moved at all. It
     is deliberately not persisted to storage: a calculator parked over the
     corner of one exam's table should not be waiting there weeks later. */
  var POS = {};

  function draggable(opts) {
    opts = opts || {};
    var panel = opts.panel, handle = opts.handle;
    if (!panel || !handle || typeof window === 'undefined') return;

    var key = opts.key || 'calc';

    /* ONLY WHERE THE PANEL FLOATS OVER THE PAGE.

       Dragging answers one problem: the calculator is covering the figures
       being added up. Level 2's desktop calculator has that problem solved
       already — it is a 280px grid track beside the question, covering
       nothing — so dragging it there would buy the reader nothing and cost
       them the column, which would either collapse under the question or
       leave a 280px hole where the panel used to be.

       Read from the computed style rather than from a width. The same element
       is a docked column above 880px and a floating sheet below it, and that
       breakpoint lives in the stylesheet; a matchMedia here would be a second
       copy of it, free to disagree with the first. Level 1 and Level 3 float
       at every width and are draggable at every width. */
    if (window.getComputedStyle(panel).position !== 'fixed') return;

    function viewport() {
      return { w: window.innerWidth || 0, h: window.innerHeight || 0 };
    }
    /* Never off the edge. A panel dragged past the side of the window would be
       unreachable, and the only way back would be a reload — which on Level 2
       and Level 3 costs the reader their half-typed sum. */
    function clamp(x, y, w, h) {
      var v = viewport(), pad = 4;
      return {
        x: Math.min(Math.max(pad, x), Math.max(pad, v.w - w - pad)),
        y: Math.min(Math.max(pad, y), Math.max(pad, v.h - h - pad))
      };
    }
    function place(x, y) {
      var w = panel.offsetWidth, h = panel.offsetHeight;
      var c = clamp(x, y, w, h);
      panel.style.position = 'fixed';
      /* right/bottom/margin are how the sheets sit in their default corner;
         all three fight an explicit left/top and have to go. */
      panel.style.right = 'auto';
      panel.style.bottom = 'auto';
      panel.style.marginLeft = '0';
      panel.style.width = w + 'px';
      panel.style.maxWidth = 'none';
      panel.style.left = c.x + 'px';
      panel.style.top = c.y + 'px';
      panel.classList.add('is-floating');
      POS[key] = { x: c.x, y: c.y };
    }

    /* Re-applied on mount, because the element handed in is usually a new one:
       the panel the reader dragged was replaced by the last repaint. */
    if (POS[key]) place(POS[key].x, POS[key].y);

    if (handle.getAttribute('data-calc-drag') === '1') return;
    handle.setAttribute('data-calc-drag', '1');
    handle.setAttribute('title', 'Drag to move the calculator');
    handle.setAttribute('tabindex', '0');
    handle.setAttribute('role', 'button');
    handle.setAttribute('aria-label', 'Move the calculator. Drag it, or use the arrow keys.');

    var dragging = false, grabX = 0, grabY = 0;

    handle.addEventListener('pointerdown', function (e) {
      if (e.button != null && e.button !== 0) return;
      var r = panel.getBoundingClientRect();
      grabX = e.clientX - r.left; grabY = e.clientY - r.top;
      dragging = true;
      panel.classList.add('is-dragging');
      try { handle.setPointerCapture(e.pointerId); } catch (err) {}
      e.preventDefault();
    });
    handle.addEventListener('pointermove', function (e) {
      if (!dragging) return;
      place(e.clientX - grabX, e.clientY - grabY);
      e.preventDefault();
    });
    function release() {
      if (!dragging) return;
      dragging = false;
      panel.classList.remove('is-dragging');
    }
    handle.addEventListener('pointerup', release);
    handle.addEventListener('pointercancel', release);

    /* A drag is a mouse and a touchscreen. The arrows are everyone else — a
       control that can only be moved by pointer is one a keyboard user cannot
       move out of their own way. */
    handle.addEventListener('keydown', function (e) {
      var step = e.shiftKey ? 24 : 8, dx = 0, dy = 0;
      if (e.key === 'ArrowLeft') dx = -step;
      else if (e.key === 'ArrowRight') dx = step;
      else if (e.key === 'ArrowUp') dy = -step;
      else if (e.key === 'ArrowDown') dy = step;
      else return;
      var r = panel.getBoundingClientRect();
      place(r.left + dx, r.top + dy);
      e.preventDefault();
    });

    /* A window that shrinks can leave a moved panel outside it, which is the
       same lost calculator by another route. */
    if (!draggable._resize) {
      draggable._resize = true;
      window.addEventListener('resize', function () {
        Object.keys(POS).forEach(function (k) {
          var el = document.querySelector('[data-calc-panel="' + k + '"]');
          if (!el) return;
          var v = { w: window.innerWidth || 0, h: window.innerHeight || 0 }, pad = 4;
          var x = Math.min(Math.max(pad, POS[k].x), Math.max(pad, v.w - el.offsetWidth - pad));
          var y = Math.min(Math.max(pad, POS[k].y), Math.max(pad, v.h - el.offsetHeight - pad));
          el.style.left = x + 'px'; el.style.top = y + 'px';
          POS[k] = { x: x, y: y };
        });
      });
    }
    panel.setAttribute('data-calc-panel', key);
  }

  root.AATCalc = { create: create, KEYS: KEYS, draggable: draggable,
    opClass: opClass, opAttrs: opAttrs, OP_ATTR: OP_ATTR, OP_ON: OP_ON };
})(typeof window !== 'undefined' ? window : (typeof globalThis !== 'undefined' ? globalThis : this));
