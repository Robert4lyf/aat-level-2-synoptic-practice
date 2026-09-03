#!/usr/bin/env node
/**
 * CIPS content gate — every module that ships teaching content.
 *
 * A syllabus tag on a lesson is not evidence that the lesson teaches the
 * syllabus. This check goes one level lower: every independently-paraphrased
 * indicative-content position in the module's syllabus file must be covered by
 * at least one card, and nothing may claim a source position that does not
 * exist. It also checks the learner checks and practice bank for structural
 * quality, LO/criterion fidelity and answer-position balance.
 *
 * IT USED TO BE ABOUT L2M1 ALONE, and every shape it knew was L2M1's shape:
 * learning outcomes numbered 1..6, exactly eight practice questions per
 * outcome, answer positions balanced 2/2/2/2. L2M2 has four outcomes and
 * twelve questions each, so a gate written to those constants would have
 * rejected a correct module and, worse, could only ever have been fixed by
 * loosening it. The shape is derived from each module instead: whatever the
 * bank holds must divide evenly across the outcomes that module actually has,
 * and evenly again across the four answer positions.
 *
 * Run: node scripts/check-cips2-content.js   (exit 1 on any failure)
 */
'use strict';

const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');

const RED='\x1b[31m', GREEN='\x1b[32m', DIM='\x1b[2m', BOLD='\x1b[1m', RESET='\x1b[0m';

/* The modules with content, in qualification order. A module is added here at
   the same time as its data files; check-cips2-syllabus.js covers the ones that
   are still syllabus-only. */
const MODULES = [
  { id: 'l2m1', code: 'L2M1' },
  { id: 'l2m2', code: 'L2M2' }
].map(m => ({
  ...m,
  sy: require(path.join(ROOT, `cips2-${m.id}-syllabus.js`)),
  learn: require(path.join(ROOT, `cips2-${m.id}-learn-data.js`)),
  practice: require(path.join(ROOT, `cips2-${m.id}-practice-data.js`))
}));

/* Every module of the qualification, content or not — used to check the names
   the page types into its qualification path. */
const ALL_MODULE_IDS = ['l2m1', 'l2m2', 'l2m3', 'l2m4', 'l2m5'];

function norm(s) { return String(s == null ? '' : s).toLowerCase().replace(/[^a-z0-9]+/g,' ').trim(); }

function validate(sy, learn, practice) {
  const errors=[];
  const stats={ lessons:0, cards:0, sourcePositions:0, practice:0, applied:0, checkpoints:0, outcomes:0, perLo:0 };
  if (!sy || !sy.code) return { errors:['syllabus module did not load, or has no code.'], stats };
  if (!learn || !Array.isArray(learn.LESSONS)) return { errors:['Learning data has no LESSONS array.'], stats };
  if (!practice || !Array.isArray(practice.QUESTIONS)) return { errors:['Practice data has no QUESTIONS array.'], stats };

  const outcomes = sy.outcomes || [];
  stats.outcomes = outcomes.length;
  if (!outcomes.length) return { errors:[`${sy.code}: syllabus has no learning outcomes.`], stats };

  const criterionMap=new Map();
  outcomes.forEach(o => (o.criteria||[]).forEach(c => {
    if (criterionMap.has(c.id)) errors.push(`duplicate syllabus criterion ${c.id}`);
    criterionMap.set(c.id,{...c,lo:o.n});
    stats.sourcePositions += Number(c.sourceBulletCount)||0;
  }));

  const lessons=learn.LESSONS;
  stats.lessons=lessons.length;
  if (lessons.length !== criterionMap.size) errors.push(`expected one lesson per criterion (${criterionMap.size}); found ${lessons.length}`);
  const lessonIds=new Set(), lessonCriterionCount=new Map();
  lessons.forEach(l => {
    if (!l || !l.id) { errors.push('lesson without an id'); return; }
    if (lessonIds.has(l.id)) errors.push(`duplicate lesson id ${l.id}`); lessonIds.add(l.id);
    const c=criterionMap.get(l.criterion);
    if (!c) { errors.push(`${l.id}: unknown criterion ${l.criterion}`); return; }
    lessonCriterionCount.set(l.criterion,(lessonCriterionCount.get(l.criterion)||0)+1);
    if (Number(l.lo)!==Number(c.lo)) errors.push(`${l.id}: says LO${l.lo} but ${l.criterion} belongs to LO${c.lo}`);
    if (!l.title || l.title.length < 8) errors.push(`${l.id}: title is missing or too thin`);
    if (!l.summary || l.summary.length < 35) errors.push(`${l.id}: summary is too thin`);
    if (!Number.isFinite(l.minutes) || l.minutes < 10 || l.minutes > 45) errors.push(`${l.id}: implausible reading time ${l.minutes}`);
    if (!Array.isArray(l.cards) || l.cards.length < 4) errors.push(`${l.id}: needs at least four teaching cards`);
    stats.cards += (l.cards||[]).length;

    const covered=new Set();
    (l.cards||[]).forEach((card,ci) => {
      if (!card.h || card.h.length < 5) errors.push(`${l.id} card ${ci+1}: missing heading`);
      const prose=(card.p||[]).join(' ');
      if (!Array.isArray(card.p) || !card.p.length || prose.length < 90) errors.push(`${l.id} card ${ci+1}: teaching prose is too thin`);
      (card.covers||[]).forEach(pos => {
        if (!Number.isInteger(pos) || pos < 1 || pos > c.sourceBulletCount) errors.push(`${l.id} card ${ci+1}: invalid source position ${pos} for ${c.id} (1..${c.sourceBulletCount})`);
        else covered.add(pos);
      });
    });
    const missing=[]; for(let n=1;n<=c.sourceBulletCount;n++) if(!covered.has(n)) missing.push(n);
    if (missing.length) errors.push(`${l.id}: ${c.id} leaves source position(s) uncovered: ${missing.join(', ')}`);

    const checks=l.check||[]; stats.checkpoints += checks.length;
    if (checks.length < 2) errors.push(`${l.id}: needs at least two checkpoint questions`);
    checks.forEach((q,qi) => validateQuestion(q,`${l.id} checkpoint ${qi+1}`,errors,false));
  });
  criterionMap.forEach((_,id) => {
    const n=lessonCriterionCount.get(id)||0;
    if (n!==1) errors.push(`${id}: expected exactly one owning lesson, found ${n}`);
  });

  /* GROUPS are navigation, so they must neither strand nor duplicate a lesson. */
  const grouped=[];
  (learn.GROUPS||[]).forEach(g => (g.lessonIds||[]).forEach(id => grouped.push(id)));
  const groupedSet=new Set(grouped);
  if (grouped.length!==groupedSet.size) errors.push('GROUPS contains a lesson more than once');
  lessons.forEach(l => { if(!groupedSet.has(l.id)) errors.push(`${l.id}: not reachable through GROUPS`); });
  grouped.forEach(id => { if(!lessonIds.has(id)) errors.push(`GROUPS points to unknown lesson ${id}`); });

  const qs=practice.QUESTIONS; stats.practice=qs.length;
  const loCount = outcomes.length;
  /* Eight per outcome is the floor a focused practice run needs to be worth
     starting; the actual figure is whatever the bank holds, provided it is the
     same for every outcome. */
  const minBank = loCount * 8;
  if (qs.length < minBank) errors.push(`practice bank has ${qs.length} questions; the minimum for ${loCount} outcomes is ${minBank}`);
  const expectedPerLo = qs.length / loCount;
  stats.perLo = expectedPerLo;
  if (!Number.isInteger(expectedPerLo)) errors.push(`${qs.length} questions do not divide evenly across ${loCount} learning outcomes`);
  const expectedPerPosition = expectedPerLo / 4;
  if (Number.isInteger(expectedPerLo) && !Number.isInteger(expectedPerPosition))
    errors.push(`${expectedPerLo} questions per outcome cannot be balanced across four answer positions`);

  const validLos = new Set(outcomes.map(o => Number(o.n)));
  const qIds=new Set(), qText=new Set(), perLo={}, answerByLo={}, criterionPractice=new Map();
  qs.forEach(q => {
    if (!q.id || qIds.has(q.id)) errors.push(`duplicate or missing practice id ${q.id||'(blank)'}`); else qIds.add(q.id);
    const nq=norm(q.q); if(qText.has(nq)) errors.push(`${q.id}: duplicate question wording`); else qText.add(nq);
    validateQuestion({prompt:q.q,options:q.options,answer:q.answer,exp:q.exp},q.id,errors,true);
    if (q.kind!=='recall' && q.kind!=='applied') errors.push(`${q.id}: kind must be recall or applied`);
    if (q.kind==='applied') stats.applied++;
    const lo=Number(q.lo); if(!validLos.has(lo)) errors.push(`${q.id}: invalid LO ${q.lo} (this module has ${[...validLos].join(', ')})`);
    perLo[lo]=(perLo[lo]||0)+1;
    answerByLo[lo]=answerByLo[lo]||[0,0,0,0]; if(Number.isInteger(q.answer)&&q.answer>=0&&q.answer<4)answerByLo[lo][q.answer]++;
    if(!Array.isArray(q.criteria)||!q.criteria.length) errors.push(`${q.id}: no criterion mapping`);
    (q.criteria||[]).forEach(cid => {
      const c=criterionMap.get(cid);
      if(!c) errors.push(`${q.id}: unknown criterion ${cid}`);
      else {
        if(Number(c.lo)!==lo) errors.push(`${q.id}: ${cid} belongs to LO${c.lo}, not LO${lo}`);
        criterionPractice.set(cid,(criterionPractice.get(cid)||0)+1);
      }
    });
  });
  if (Number.isInteger(expectedPerLo)) {
    validLos.forEach(lo => {
      if((perLo[lo]||0)!==expectedPerLo) errors.push(`LO${lo}: expected ${expectedPerLo} practice questions, found ${perLo[lo]||0}`);
      if (Number.isInteger(expectedPerPosition)) {
        const pos=answerByLo[lo]||[0,0,0,0];
        if(pos.some(n=>n!==expectedPerPosition)) errors.push(`LO${lo}: answer positions are not balanced ${Array(4).fill(expectedPerPosition).join('/')} (got ${pos.join('/')})`);
      }
    });
  }
  criterionMap.forEach((_,id)=>{ if(!(criterionPractice.get(id)>0)) errors.push(`${id}: no practice question maps to this criterion`); });
  if (stats.applied < Math.ceil(qs.length/2)) errors.push(`only ${stats.applied}/${qs.length} practice questions are applied; at least half must require context/application`);

  return { errors, stats };
}

/* THE SUBJECT-PICKER CARD COUNTS WHAT THE BANKS ACTUALLY HOLD.

   cips2-bridge.js runs on index.html, which does not load any CIPS data, so
   the card it injects cannot read the lesson lists or the question banks — the
   numbers on it are typed. Typed numbers drift, and this one is the first
   thing a reader is told about the course before they open it.

   The browser check asserts the card says "13 lessons", which pins the typed
   string rather than the truth: grow the bank and both the card and that check
   stay happily wrong together. This compares the string against the data —
   now summed across every module with content, since the card describes the
   course rather than one module of it. */
function validateBridgeCard(modules, errors) {
  const src = fs.readFileSync(path.join(ROOT, 'cips2-bridge.js'), 'utf8');
  const m = /\.sc-meta[\s\S]{0,120}?textContent\s*=\s*'([^']+)'/.exec(src);
  if (!m) { errors.push('cips2-bridge.js: could not find the subject-picker card\'s meta line to check its counts against the data.'); return; }
  const said = m[1];
  const lessons = modules.reduce((t, x) => t + x.learn.LESSONS.length, 0);
  const questions = modules.reduce((t, x) => t + x.practice.QUESTIONS.length, 0);

  const saidLessons = /(\d+)\s+lessons/.exec(said);
  const saidQuestions = /(\d+)\s+practice questions/.exec(said);
  if (!saidLessons) errors.push(`the picker card ("${said}") no longer states a lesson count.`);
  else if (Number(saidLessons[1]) !== lessons)
    errors.push(`the picker card says ${saidLessons[1]} lessons; the modules with content hold ${lessons}.`);
  if (!saidQuestions) errors.push(`the picker card ("${said}") no longer states a question count.`);
  else if (Number(saidQuestions[1]) !== questions)
    errors.push(`the picker card says ${saidQuestions[1]} practice questions; the banks hold ${questions}.`);

  /* And it must name the modules it is counting. A card reading "L2M1" while
     the totals cover two modules is a more confusing kind of wrong than a
     stale number: the reader is told the size of a course they cannot see. */
  modules.forEach(x => {
    if (said.indexOf(x.code) < 0) errors.push(`the picker card ("${said}") does not mention ${x.code}, which has content.`);
  });
}

/* THE QUALIFICATION PATH THE PAGE TYPES OUT.

   cips2-page.js lists all five modules by name on its overview screen. Only the
   ones with content are loaded there, so three of those names cannot be read
   from anything at runtime and have to be typed. They are checked here against
   the syllabus files, which is the one place the official titles live. */
function validatePathNames(errors) {
  const src = fs.readFileSync(path.join(ROOT, 'cips2-page.js'), 'utf8');
  const block = /var PATH = \[([\s\S]*?)\];/.exec(src);
  if (!block) { errors.push('cips2-page.js: could not find the PATH list to check its module names.'); return; }
  const rows = [...block[1].matchAll(/id:\s*'([^']+)',\s*code:\s*'([^']+)',\s*title:\s*'([^']+)'/g)]
    .map(m => ({ id: m[1], code: m[2], title: m[3] }));
  if (rows.length !== ALL_MODULE_IDS.length) {
    errors.push(`cips2-page.js PATH lists ${rows.length} modules; the qualification has ${ALL_MODULE_IDS.length}.`);
    return;
  }
  rows.forEach((r, i) => {
    if (r.id !== ALL_MODULE_IDS[i]) { errors.push(`cips2-page.js PATH position ${i+1} is ${r.id}, expected ${ALL_MODULE_IDS[i]}.`); return; }
    const sy = require(path.join(ROOT, `cips2-${r.id}-syllabus.js`));
    if (r.code !== sy.code) errors.push(`cips2-page.js PATH calls ${r.id} "${r.code}"; its syllabus says "${sy.code}".`);
    if (r.title !== sy.title) errors.push(`cips2-page.js PATH titles ${r.code} "${r.title}"; its syllabus says "${sy.title}".`);
  });
}

function validateQuestion(q,label,errors,deep) {
  const stem=String(q.prompt||'');
  if (stem.length < (deep?28:18)) errors.push(`${label}: question stem is too thin`);
  if (!Array.isArray(q.options)||q.options.length!==4) { errors.push(`${label}: must have exactly four options`); return; }
  const opts=q.options.map(x=>norm(x));
  if(opts.some(x=>!x)) errors.push(`${label}: blank option`);
  if(new Set(opts).size!==opts.length) errors.push(`${label}: duplicate options`);
  if(!Number.isInteger(q.answer)||q.answer<0||q.answer>=q.options.length) errors.push(`${label}: answer index ${q.answer} is invalid`);
  if(!q.exp || String(q.exp).length < (deep?55:35)) errors.push(`${label}: explanation is too thin`);
}

function run() {
  console.log(`${BOLD}CIPS content quality${RESET}\n`);
  const all=[];
  MODULES.forEach(m => {
    if (m.sy.code !== m.code) all.push(`${m.id}: syllabus code is ${m.sy.code}, expected ${m.code}.`);
    const r = validate(m.sy, m.learn, m.practice);
    const s = r.stats;
    console.log(`  ${DIM}${m.code}: ${s.outcomes} outcomes · ${s.lessons} lessons · ${s.cards} cards · ${s.sourcePositions} syllabus positions · ${s.checkpoints} checkpoints · ${s.practice} practice (${s.perLo}/outcome, ${s.applied} applied)${RESET}`);
    r.errors.forEach(e => all.push(`${m.code}: ${e}`));
  });
  console.log('');
  validateBridgeCard(MODULES, all);
  validatePathNames(all);
  if(all.length){all.forEach(e=>console.log(`  ${RED}✗${RESET}  ${e}`));console.log(`\n${RED}${BOLD}${all.length} content problem(s).${RESET}\n`);return false;}
  console.log(`  ${GREEN}✓ every source position is taught, every criterion is practised and answer positions are balanced, in all ${MODULES.length} modules${RESET}\n`);
  return true;
}

if (require.main===module) process.exit(run()?0:1);
module.exports={ validate, MODULES };
