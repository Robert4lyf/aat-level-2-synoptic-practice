#!/usr/bin/env node
/**
 * Structural validator for story-data.js (Wrenfield story mode).
 *
 * The failure mode this guards against is content rot: a flag that nothing sets,
 * a variant keyed on a flag that no longer exists, marks that no longer sum to
 * the day's advertised total, a step with no correct answer, or a bucket that can
 * never be reached. None of that throws at runtime — it just silently produces a
 * day that is unwinnable, unmarkable, or missing its payoff.
 *
 * It cannot tell you whether the accounting is right. That is a hand-check, and
 * the worked arithmetic is in docs/wrenfield-game-design.md for exactly that.
 *
 * Run: node scripts/validate-story-data.js
 */

'use strict';

const fs = require('fs');
const path = require('path');

const RED = '\x1b[31m', GREEN = '\x1b[32m', YELLOW = '\x1b[33m', BOLD = '\x1b[1m', DIM = '\x1b[2m', RESET = '\x1b[0m';

const window = {};
const src = fs.readFileSync(path.resolve(__dirname, '..', 'story-data.js'), 'utf8');
// eslint-disable-next-line no-new-func
new Function('window', src)(window);

const S = window.AAT_STORY;
const errors = [];
const warnings = [];
const err = (where, msg) => errors.push(`${where}: ${msg}`);
const warn = (where, msg) => warnings.push(`${where}: ${msg}`);

if (!S || !Array.isArray(S.days)) {
  console.error(`${RED}${BOLD}story-data.js did not define window.AAT_STORY.days${RESET}`);
  process.exit(1);
}

const castIds = new Set((S.cast || []).map(c => c.id));
const STEP_TYPES = new Set(['flags', 'choice', 'figures', 'written']);
const DOC_KINDS = new Set(['doc', 'email', 'photo', 'panel']);

/* Collect every step across a beat, including all variant branches. */
function beatVariants(beat) {
  if (!beat.variants) return [{ key: null, view: beat }];
  return Object.entries(beat.variants.cases || {}).map(([key, c]) => {
    const view = Object.assign({}, beat, c);
    if (c.docsExtra) view.docs = (beat.docs || []).concat(c.docsExtra);
    return { key, view };
  });
}

function checkStep(where, step) {
  if (!STEP_TYPES.has(step.type)) { err(where, `unknown step type "${step.type}"`); return 0; }
  const marks = Number(step.marks);
  if (!Number.isFinite(marks) || marks <= 0) err(where, 'step has no positive `marks`');
  if (!step.prompt) err(where, 'step has no `prompt`');

  if (step.type === 'flags' || step.type === 'choice') {
    const opts = step.options || [];
    if (opts.length < 2) err(where, `${step.type} needs at least 2 options`);
    const ok = opts.filter(o => o.ok).length;
    if (ok === 0) err(where, `${step.type} has no correct option — it is unwinnable`);
    if (step.type === 'choice' && ok > 1) err(where, 'choice has more than one correct option');
    const ids = opts.map(o => o.id);
    if (new Set(ids).size !== ids.length) err(where, 'duplicate option ids');
    opts.forEach(o => { if (!o.id) err(where, 'option missing id'); if (!o.label) err(where, `option "${o.id}" missing label`); });
    if (step.type === 'flags' && ok === opts.length) warn(where, 'every flags option is correct — ticking all of them always scores full marks');
  }
  if (step.type === 'figures') {
    const fields = step.fields || [];
    if (!fields.length) err(where, 'figures step has no fields');
    fields.forEach(f => {
      if (!f.id) err(where, 'field missing id');
      if (!f.label) err(where, `field "${f.id}" missing label`);
      if (!Number.isFinite(Number(f.answer))) err(where, `field "${f.id}" has a non-numeric answer`);
    });
    const ids = fields.map(f => f.id);
    if (new Set(ids).size !== ids.length) err(where, 'duplicate field ids');
  }
  if (step.type === 'written') {
    const rubric = step.rubric || [];
    if (!rubric.length) err(where, 'written step has no rubric');
    const sum = rubric.reduce((t, r) => t + (Number(r.marks) || 0), 0);
    if (sum !== marks) err(where, `rubric sums to ${sum} but the step is worth ${marks}`);
    rubric.forEach((r, i) => { if (!r.point) err(where, `rubric point ${i} has no text`); });
    if (!step.modelAnswer) err(where, 'written step has no modelAnswer');
  }
  return marks;
}

function checkDocs(where, docs) {
  (docs || []).forEach((d, i) => {
    const kind = d.kind || 'doc';
    if (!DOC_KINDS.has(kind)) err(where, `doc ${i} has unknown kind "${kind}"`);
    if (kind === 'email' && !castIds.has(d.from)) err(where, `doc ${i} is from "${d.from}", who is not in the cast`);
    if (kind === 'photo' && !d.caption) err(where, `doc ${i} is a photo with no caption`);
  });
}

const setFlags = new Set();
const readFlags = [];

S.days.forEach(day => {
  const D = `day ${day.id}`;
  if (!day.id) err(D, 'day has no id');
  if (!day.title) err(D, 'day has no title');
  if (!Array.isArray(day.beats) || !day.beats.length) { err(D, 'day has no beats'); return; }

  const itemIds = new Set();
  let dayMarks = 0;

  day.beats.forEach((beat, bi) => {
    const B = `${D} beat ${bi}${beat.id ? ' (' + beat.id + ')' : ''}`;
    if (beat.kind !== 'item' && beat.kind !== 'scene') { err(B, `unknown beat kind "${beat.kind}"`); return; }
    if (!beat.at) warn(B, 'beat has no time');
    if (beat.variants) {
      if (!beat.variants.on) err(B, 'variants block has no `on` flag');
      else readFlags.push({ where: B, flag: beat.variants.on });
      if (!Object.keys(beat.variants.cases || {}).length) err(B, 'variants block has no cases');
    }

    if (beat.kind === 'scene') {
      beatVariants(beat).forEach(({ key, view }) => {
        const W = key ? `${B}[${key}]` : B;
        if (!(view.lines || []).length) err(W, 'scene has no lines');
        (view.lines || []).forEach((l, li) => {
          if (l.who && !castIds.has(l.who)) err(W, `line ${li} is spoken by "${l.who}", who is not in the cast`);
          if (!l.text && !l.dir) err(W, `line ${li} has neither text nor direction`);
        });
      });
      return;
    }

    // items
    if (!beat.id) err(B, 'item has no id');
    else if (itemIds.has(beat.id)) err(B, `duplicate item id "${beat.id}"`);
    else itemIds.add(beat.id);
    if (!beat.title) err(B, 'item has no title');
    if (!beat.marks) err(B, 'item has no marks');
    dayMarks += Number(beat.marks) || 0;

    const variants = beatVariants(beat);
    variants.forEach(({ key, view }) => {
      const W = key ? `${B}[${key}]` : B;
      checkDocs(W, view.docs);
      const steps = view.steps || [];
      if (!steps.length) { err(W, 'item has no steps'); return; }
      const sum = steps.reduce((t, st, si) => t + checkStep(`${W} step ${si}`, st), 0);
      if (sum !== Number(beat.marks)) err(W, `steps sum to ${sum} marks but the item is worth ${beat.marks}`);
      if (!view.why) warn(W, 'item has no `why` explanation shown after marking');

      // A step that sets a flag must have that flag consumed by a bucket or a variant.
      steps.forEach((st, si) => { if (st.setFlag) setFlags.add(st.setFlag); });

      // Buckets must be reachable: either keyed by an option id of the flag-setting
      // step, keyed pass/fail, or supplied directly by a variant.
      const buckets = view.bucket ? null : view.buckets;
      if (buckets) {
        const flagStep = steps.find(st => st.setFlag);
        const source = view.outcomeFrom
          ? day.beats.flatMap(b => beatVariants(b).flatMap(v => v.view.steps || [])).find(st => st.setFlag === view.outcomeFrom)
          : flagStep;
        const validKeys = new Set(['pass', 'fail']);
        (source && source.options || []).forEach(o => validKeys.add(o.id));
        Object.keys(buckets).forEach(k => {
          if (!validKeys.has(k)) err(W, `bucket "${k}" can never be reached — no option or pass/fail produces it`);
          const b = buckets[k];
          if (b.who && !castIds.has(b.who)) err(W, `bucket "${k}" is spoken by "${b.who}", who is not in the cast`);
          if (!b.text) err(W, `bucket "${k}" has no text`);
        });
        if (source) {
          (source.options || []).forEach(o => {
            if (!buckets[o.id] && !buckets.pass) warn(W, `option "${o.id}" has no bucket — that choice gets no reaction`);
          });
        }
      }
      if (view.bucket && view.bucket.who && !castIds.has(view.bucket.who)) err(W, 'variant bucket speaker is not in the cast');
      if (view.outcomeFrom) readFlags.push({ where: W, flag: view.outcomeFrom });
    });
  });

  if (dayMarks !== Number(day.totalMarks)) {
    err(D, `items sum to ${dayMarks} marks but the day advertises ${day.totalMarks}`);
  }
  (day.outro && day.outro.carry || []).forEach((c, i) => {
    if (!c.when || !c.text) err(D, `outro carry ${i} is missing when/text`);
    if (c.ifFlag) readFlags.push({ where: `${D} outro carry ${i}`, flag: c.ifFlag });
  });
  (day.outro && day.outro.lines || []).forEach((l, li) => {
    if (l.who && !castIds.has(l.who)) err(D, `outro line ${li} is spoken by "${l.who}", who is not in the cast`);
  });
});

/* Flags: every flag read must be set somewhere. `<itemId>.pass` is set by the
   engine after marking, so those are implicitly available. */
const itemIds = new Set();
S.days.forEach(d => (d.beats || []).forEach(b => { if (b.kind === 'item' && b.id) itemIds.add(b.id); }));
readFlags.forEach(({ where, flag }) => {
  const isPassFlag = flag.endsWith('.pass') && itemIds.has(flag.slice(0, -5));
  if (!setFlags.has(flag) && !isPassFlag) err(where, `reads flag "${flag}", which nothing ever sets`);
});
setFlags.forEach(flag => {
  if (!readFlags.some(r => r.flag === flag)) warn('flags', `flag "${flag}" is set but never read`);
});

/* ── Report ── */
const days = S.days.length;
const items = S.days.reduce((t, d) => t + (d.beats || []).filter(b => b.kind === 'item').length, 0);
const scenes = S.days.reduce((t, d) => t + (d.beats || []).filter(b => b.kind === 'scene').length, 0);
const marks = S.days.reduce((t, d) => t + (Number(d.totalMarks) || 0), 0);

console.log(`${BOLD}Story data check${RESET}`);
console.log(`${DIM}${days} day(s) · ${items} items · ${scenes} scenes · ${marks} marks · ${S.cast.length} cast${RESET}\n`);

if (errors.length) {
  console.log(`${RED}${BOLD}── ERRORS (${errors.length}) ──${RESET}`);
  errors.forEach(e => console.log(`  ${RED}✗${RESET}  ${e}`));
} else {
  console.log(`${GREEN}${BOLD}── ERRORS: none ✓${RESET}`);
}
if (warnings.length) {
  console.log(`\n${YELLOW}${BOLD}── WARNINGS (${warnings.length}) ──${RESET}`);
  warnings.forEach(w => console.log(`  ${YELLOW}⚠${RESET}  ${w}`));
}
console.log(`\nResult: ${errors.length} error(s), ${warnings.length} warning(s)`);
process.exit(errors.length ? 1 : 0);
