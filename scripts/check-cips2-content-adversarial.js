#!/usr/bin/env node
/**
 * Prove the CIPS content gate rejects representative silent corruption — in
 * every module it claims to cover, not just the first one.
 *
 * A gate that runs over two modules can still be watching only one of them:
 * the loop that adds L2M2 to the report is not evidence that the assertions
 * inside it are reached with L2M2's data. So every mutation below is applied
 * to each module in turn, and the gate must reject it each time.
 *
 * The mutations are described in terms of the module's own shape rather than
 * fixed indices, because the modules are not the same shape: L2M1 has six
 * learning outcomes and eight questions each, L2M2 four and twelve.
 */
'use strict';
const path=require('path');
const ROOT=path.join(__dirname,'..');
const {validate, MODULES}=require('./check-cips2-content.js');
const RED='\x1b[31m',GREEN='\x1b[32m',BOLD='\x1b[1m',DIM='\x1b[2m',RESET='\x1b[0m';
function clone(x){return JSON.parse(JSON.stringify(x));}

const cases=[
  ['drop an indicative-content position', (s,l,p)=>{l.LESSONS[0].cards.forEach(c=>{c.covers=[];});}],
  ['point a lesson at an invented criterion', (s,l,p)=>{l.LESSONS[1].criterion=s.code+'-9.9';}],
  ['move a lesson to the wrong learning outcome', (s,l,p)=>{const lo=l.LESSONS[0].lo;l.LESSONS[0].lo=lo===1?2:1;}],
  ['strand a lesson outside GROUPS', (s,l,p)=>{l.GROUPS[0].lessonIds=l.GROUPS[0].lessonIds.slice(1);}],
  ['duplicate a practice-question id', (s,l,p)=>{p.QUESTIONS[1].id=p.QUESTIONS[0].id;}],
  ['repeat a question stem word for word', (s,l,p)=>{p.QUESTIONS[1].q=p.QUESTIONS[0].q;}],
  ['make answer position a cue inside one LO', (s,l,p)=>{const lo=s.outcomes[0].n;p.QUESTIONS.filter(q=>q.lo===lo).forEach(q=>{q.answer=0;});}],
  ['unbalance one LO against the others', (s,l,p)=>{const lo=s.outcomes[0].n;let seen=0;p.QUESTIONS=p.QUESTIONS.filter(q=>q.lo!==lo||seen++<2);}],
  ['write an out-of-range answer key', (s,l,p)=>{p.QUESTIONS[3].answer=4;}],
  ['strip the explanation from a learner check', (s,l,p)=>{l.LESSONS[0].check[0].exp='';}],
  ['leave a criterion with no practice at all', (s,l,p)=>{const cid=s.outcomes[0].criteria[0].id;p.QUESTIONS=p.QUESTIONS.filter(q=>q.criteria.indexOf(cid)<0);}],
  ['turn the applied questions into recall', (s,l,p)=>{p.QUESTIONS.forEach(q=>{q.kind='recall';});}],
  ['map a question to another outcome’s criterion', (s,l,p)=>{const other=s.outcomes[s.outcomes.length-1].criteria[0].id;p.QUESTIONS[0].criteria=[other];}]
];

let failed=0, run=0;
console.log(`${BOLD}CIPS content — adversarial review${RESET}\n`);
for (const m of MODULES) {
  console.log(`  ${DIM}${m.code}${RESET}`);
  for(const [name,mutate] of cases){
    const s=clone(m.sy),l=clone(m.learn),p=clone(m.practice);
    mutate(s,l,p);
    const result=validate(s,l,p);
    run++;
    if(!result.errors.length){console.log(`    ${RED}✗${RESET}  gate ACCEPTED: ${name}`);failed++;}
    else console.log(`    ${GREEN}✓${RESET}  rejected ${name} ${DIM}(${result.errors[0]})${RESET}`);
  }
  /* The unmutated module must still pass, or every rejection above proves
     nothing: a gate that rejects its own data rejects everything. */
  const clean=validate(clone(m.sy),clone(m.learn),clone(m.practice));
  run++;
  if(clean.errors.length){console.log(`    ${RED}✗${RESET}  the gate rejects ${m.code} unmutated: ${clean.errors[0]}`);failed++;}
  else console.log(`    ${GREEN}✓${RESET}  accepts ${m.code} unmutated`);
  console.log('');
}
if(failed){console.log(`${RED}${BOLD}${failed} of ${run} checks failed.${RESET}\n`);process.exit(1);}
console.log(`${GREEN}${BOLD}All ${run} checks pass — every corruption is rejected in every module ✓${RESET}\n`);
