#!/usr/bin/env node
/**
 * CIPS L2M1 content gate.
 *
 * A syllabus tag on a lesson is not evidence that the lesson teaches the
 * syllabus. This check goes one level lower: every independently-paraphrased
 * indicative-content position in cips2-l2m1-syllabus.js must be covered by at
 * least one card, and nothing may claim a source position that does not exist.
 * It also checks the learner checks and practice bank for structural quality,
 * LO/criterion fidelity and answer-position balance.
 */
'use strict';

const path = require('path');
const ROOT = path.join(__dirname, '..');
const SY = require(path.join(ROOT, 'cips2-l2m1-syllabus.js'));
const LD = require(path.join(ROOT, 'cips2-l2m1-learn-data.js'));
const PB = require(path.join(ROOT, 'cips2-l2m1-practice-data.js'));

const RED='\x1b[31m', GREEN='\x1b[32m', DIM='\x1b[2m', BOLD='\x1b[1m', RESET='\x1b[0m';

function norm(s) { return String(s == null ? '' : s).toLowerCase().replace(/[^a-z0-9]+/g,' ').trim(); }
function validate(sy, learn, practice) {
  const errors=[];
  const stats={ lessons:0, cards:0, sourcePositions:0, practice:0, applied:0, checkpoints:0 };
  if (!sy || sy.code !== 'L2M1') return { errors:['L2M1 syllabus module did not load.'], stats };
  if (!learn || !Array.isArray(learn.LESSONS)) return { errors:['Learning data has no LESSONS array.'], stats };
  if (!practice || !Array.isArray(practice.QUESTIONS)) return { errors:['Practice data has no QUESTIONS array.'], stats };

  const criterionMap=new Map();
  (sy.outcomes||[]).forEach(o => (o.criteria||[]).forEach(c => {
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
  if (qs.length < 48) errors.push(`practice bank has ${qs.length} questions; minimum for this slice is 48`);
  const qIds=new Set(), qText=new Set(), perLo={}, answerByLo={}, criterionPractice=new Map();
  qs.forEach(q => {
    if (!q.id || qIds.has(q.id)) errors.push(`duplicate or missing practice id ${q.id||'(blank)'}`); else qIds.add(q.id);
    const nq=norm(q.q); if(qText.has(nq)) errors.push(`${q.id}: duplicate question wording`); else qText.add(nq);
    validateQuestion({prompt:q.q,options:q.options,answer:q.answer,exp:q.exp},q.id,errors,true);
    if (q.kind!=='recall' && q.kind!=='applied') errors.push(`${q.id}: kind must be recall or applied`);
    if (q.kind==='applied') stats.applied++;
    const lo=Number(q.lo); if(!Number.isInteger(lo)||lo<1||lo>6) errors.push(`${q.id}: invalid LO ${q.lo}`);
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
  for(let lo=1;lo<=6;lo++) {
    if((perLo[lo]||0)!==8) errors.push(`LO${lo}: expected 8 practice questions, found ${perLo[lo]||0}`);
    const pos=answerByLo[lo]||[0,0,0,0];
    if(pos.some(n=>n!==2)) errors.push(`LO${lo}: answer positions are not balanced 2/2/2/2 (got ${pos.join('/')})`);
  }
  criterionMap.forEach((_,id)=>{ if(!(criterionPractice.get(id)>0)) errors.push(`${id}: no practice question maps to this criterion`); });
  if (stats.applied < Math.ceil(qs.length/2)) errors.push(`only ${stats.applied}/${qs.length} practice questions are applied; at least half must require context/application`);

  return { errors, stats };
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

function print(result) {
  const s=result.stats;
  console.log(`${BOLD}CIPS L2M1 content quality${RESET}\n`);
  console.log(`  ${DIM}${s.lessons} lessons · ${s.cards} teaching cards · ${s.sourcePositions} syllabus positions · ${s.checkpoints} checkpoints · ${s.practice} practice questions (${s.applied} applied)${RESET}\n`);
  if(result.errors.length){result.errors.forEach(e=>console.log(`  ${RED}✗${RESET}  ${e}`));console.log(`\n${RED}${BOLD}${result.errors.length} content problem(s).${RESET}\n`);return false;}
  console.log(`  ${GREEN}✓ every L2M1 source position is taught, every criterion is practised and answer positions are balanced${RESET}\n`);return true;
}

if (require.main===module) process.exit(print(validate(SY,LD,PB))?0:1);
module.exports={ validate };
