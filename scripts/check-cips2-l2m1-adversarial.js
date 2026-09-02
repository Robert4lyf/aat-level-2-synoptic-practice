#!/usr/bin/env node
/** Prove the L2M1 quality gate rejects representative silent corruption. */
'use strict';
const path=require('path');
const ROOT=path.join(__dirname,'..');
const baseSy=require(path.join(ROOT,'cips2-l2m1-syllabus.js'));
const baseLd=require(path.join(ROOT,'cips2-l2m1-learn-data.js'));
const basePb=require(path.join(ROOT,'cips2-l2m1-practice-data.js'));
const {validate}=require('./check-cips2-l2m1-content.js');
const RED='\x1b[31m',GREEN='\x1b[32m',BOLD='\x1b[1m',DIM='\x1b[2m',RESET='\x1b[0m';
function clone(x){return JSON.parse(JSON.stringify(x));}
const cases=[
  ['drop an indicative-content position', (s,l,p)=>{l.LESSONS[0].cards[0].covers=[];}],
  ['point a lesson at an invented criterion', (s,l,p)=>{l.LESSONS[1].criterion='L2M1-9.9';}],
  ['move a lesson to the wrong learning outcome', (s,l,p)=>{l.LESSONS[2].lo=6;}],
  ['duplicate a practice-question id', (s,l,p)=>{p.QUESTIONS[1].id=p.QUESTIONS[0].id;}],
  ['make answer position a cue inside one LO', (s,l,p)=>{p.QUESTIONS.filter(q=>q.lo===1).forEach(q=>q.answer=0);}],
  ['remove most practice from an LO', (s,l,p)=>{p.QUESTIONS=p.QUESTIONS.filter((q,i)=>q.lo!==6||i%3===0);}],
  ['write an out-of-range answer key', (s,l,p)=>{p.QUESTIONS[8].answer=4;}],
  ['strip the explanation from a learner check', (s,l,p)=>{l.LESSONS[4].check[0].exp='';}]
];
let failed=0;
console.log(`${BOLD}CIPS L2M1 adversarial review${RESET}\n`);
for(const [name,mutate] of cases){
  const s=clone(baseSy),l=clone(baseLd),p=clone(basePb); mutate(s,l,p);
  const result=validate(s,l,p);
  if(!result.errors.length){console.log(`  ${RED}✗${RESET}  gate ACCEPTED: ${name}`);failed++;}
  else console.log(`  ${GREEN}✓${RESET}  rejected ${name} ${DIM}(${result.errors[0]})${RESET}`);
}
if(failed){console.log(`\n${RED}${BOLD}${failed} corruption(s) escaped the gate.${RESET}\n`);process.exit(1);}
console.log(`\n${GREEN}${BOLD}All ${cases.length} representative corruptions were rejected ✓${RESET}\n`);
