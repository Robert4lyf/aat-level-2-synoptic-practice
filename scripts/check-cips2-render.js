#!/usr/bin/env node
/**
 * CIPS L2M1 browser gate: the source and content checks cannot see the product.
 * This runs the actual pages at phone and desktop widths, walks the first lesson
 * through its checkpoint, exercises practice and theme persistence, and enters
 * CIPS through the shared subject picker before returning to the prior subject.
 */
'use strict';
const path=require('path'),http=require('http'),fs=require('fs');
const ROOT=path.join(__dirname,'..');
const RED='\x1b[31m',GREEN='\x1b[32m',DIM='\x1b[2m',BOLD='\x1b[1m',YEL='\x1b[33m',RESET='\x1b[0m';
let chromium;
try{({chromium}=require('playwright'));}catch(e){console.log(`${BOLD}CIPS L2M1 browser quality${RESET}\n`);if(process.env.REQUIRE_PLAYWRIGHT){console.log(`  ${RED}✗${RESET} Playwright required: ${e.message}`);process.exit(1);}console.log(`  ${YEL}⚠${RESET} Playwright unavailable — skipping.\n`);process.exit(0);}
const MIME={'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.webmanifest':'application/manifest+json','.png':'image/png','.svg':'image/svg+xml'};
function serve(){return new Promise(resolve=>{const server=http.createServer((req,res)=>{const u=decodeURIComponent(req.url.split('?')[0]),file=path.join(ROOT,u==='/'?'index.html':u);if(!file.startsWith(ROOT)||!fs.existsSync(file)||fs.statSync(file).isDirectory()){res.writeHead(404);res.end('not found');return;}res.writeHead(200,{'Content-Type':MIME[path.extname(file)]||'application/octet-stream'});fs.createReadStream(file).pipe(res);});server.listen(0,'127.0.0.1',()=>resolve({server,port:server.address().port}));});}
(async()=>{
  const errors=[],notes=[];const {server,port}=await serve();const base=`http://127.0.0.1:${port}/`;
  const candidates=['/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell','/opt/pw-browsers/chromium-1194/chrome-linux/chrome','/opt/pw-browsers/chromium'].filter(fs.existsSync);
  const browser=await chromium.launch(candidates.length?{executablePath:candidates[0]}:{});
  async function open(file,width,height,init){const ctx=await browser.newContext({viewport:{width,height}});const page=await ctx.newPage();const consoleErrors=[];page.on('console',m=>{if(m.type()==='error')consoleErrors.push(m.text());});page.on('pageerror',e=>consoleErrors.push('uncaught: '+e.message));if(init)await page.addInitScript(init);await page.goto(base+file,{waitUntil:'load'});await page.waitForTimeout(350);return{ctx,page,consoleErrors};}
  try{
    /* 1 — responsive shell and accessible controls at both target sizes. */
    for(const [w,h] of [[390,844],[1280,900]]){
      const {ctx,page,consoleErrors}=await open('cips2.html',w,h);
      const seen=await page.evaluate(()=>({title:(document.querySelector('#c2PageTitle')||{}).textContent||'',overflow:document.documentElement.scrollWidth-document.documentElement.clientWidth,buttons:[...document.querySelectorAll('button')].filter(b=>!((b.textContent||'').trim()||b.getAttribute('aria-label')||b.getAttribute('title'))).length,main:(document.getElementById('cipsApp')||{}).textContent?.trim().length||0,sync:!!window.ProgressSync,backup:!!window.ProgressBackup}));
      if(!/Procurement and Supply Operations/i.test(seen.title))errors.push(`${w}px: CIPS landing title did not render.`);
      if(seen.main<300)errors.push(`${w}px: landing content is unexpectedly sparse (${seen.main} chars).`);
      if(seen.overflow>1)errors.push(`${w}px: page overflows horizontally by ${seen.overflow}px.`);
      if(seen.buttons)errors.push(`${w}px: ${seen.buttons} button(s) have no accessible text/name.`);
      if(!seen.sync||!seen.backup)errors.push(`${w}px: CIPS did not load the shared progress backup/sync transport.`);
      if(consoleErrors.length)errors.push(`${w}px: browser errors: ${consoleErrors.join(' | ')}`);
      const minTargets=await page.evaluate(()=>[...document.querySelectorAll('.c2-tabs button,.c2-theme,.c2-hub-link')].map(e=>({t:(e.textContent||'').trim(),h:e.getBoundingClientRect().height,w:e.getBoundingClientRect().width})).filter(x=>x.h<40||x.w<40));
      if(minTargets.length)errors.push(`${w}px: undersized primary touch target(s): ${JSON.stringify(minTargets)}`);
      await ctx.close();
    }
    notes.push('CIPS landing renders without horizontal overflow at 390px and 1280px, with named primary controls and shared progress transport available.');

    /* addInitScript runs before every reload/navigation, not only the first one.
       Every seed below therefore marks sessionStorage before changing localStorage.
       Without that guard, the persistence checks would erase/reset the very value
       they were about to verify and the subject-return check would reset its own
       expected answer on the navigation home. */

    /* 2 — every authored lesson is reachable, numbered as one sequence, and first lesson persists completion. */
    {
      const {ctx,page,consoleErrors}=await open('cips2.html',390,844,()=>{if(sessionStorage.getItem('__c2seed'))return;sessionStorage.setItem('__c2seed','1');localStorage.removeItem('prep_v2_cips2');});
      await page.click('[data-c2nav="module"]');
      const rows=await page.$$('[data-go="lesson"]');
      if(rows.length!==13)errors.push(`module map exposes ${rows.length} lessons instead of 13.`);
      const ids=await page.$$eval('[data-go="lesson"]',els=>els.map(e=>e.getAttribute('data-id')));
      const sequence=await page.$$eval('[data-go="lesson"] .c2-step',els=>els.map(e=>(e.textContent||'').trim()));
      if(sequence.join(',')!=='1,2,3,4,5,6,7,8,9,10,11,12,13')errors.push(`module map lesson sequence is ${JSON.stringify(sequence)} instead of 1–13 in the DOM.`);
      for(const id of ids){await page.click(`[data-go="lesson"][data-id="${id}"]`);await page.waitForSelector('.c2-reading-card');const title=await page.textContent('#c2PageTitle');if(!title||title.trim().length<5)errors.push(`${id}: opens without a lesson heading.`);await page.click('[data-ctx-back]');}
      await page.click('[data-go="lesson"][data-id="c2m1-01"]');
      while(await page.$('[data-card="next"]'))await page.click('[data-card="next"]');
      await page.click('[data-start-check]');
      await page.click('[data-check-choice="0"]');
      if(!(await page.$('.c2-feedback')))errors.push('checkpoint gives no immediate explanation after an answer.');
      await page.click('[data-next-check]');await page.click('[data-check-choice="1"]');await page.click('[data-finish-check]');
      const stored=await page.evaluate(()=>JSON.parse(localStorage.getItem('prep_v2_cips2')||'{}'));
      if(!(stored.lessons&&stored.lessons['c2m1-01']&&stored.lessons['c2m1-01'].done))errors.push('finishing lesson 1 did not persist completion.');
      await page.reload({waitUntil:'load'});await page.click('[data-c2nav="module"]');
      const done=await page.$eval('[data-go="lesson"][data-id="c2m1-01"]',e=>e.classList.contains('is-done'));
      if(!done)errors.push('lesson completion disappeared after reload.');
      if(consoleErrors.length)errors.push('lesson walk browser errors: '+consoleErrors.join(' | '));
      await ctx.close();
    }
    notes.push('All 13 lessons open in one DOM-visible 1–13 sequence; a completed checkpoint persists across reload.');

    /* 3 — practice really grades, explains and records by LO. */
    {
      const {ctx,page,consoleErrors}=await open('cips2.html',390,844,()=>{if(sessionStorage.getItem('__c2seed'))return;sessionStorage.setItem('__c2seed','1');localStorage.removeItem('prep_v2_cips2');});
      await page.click('[data-c2nav="practice"]');await page.click('[data-start-practice="1"]');
      const stem=(await page.textContent('#c2PageTitle')).trim();
      const key=await page.evaluate(stem=>{const q=window.CIPS2_L2M1_PRACTICE.QUESTIONS.find(x=>x.q===stem);return q?{answer:q.answer,id:q.id}:null;},stem);
      if(!key)errors.push('practice screen cannot be reconciled to its question bank.');
      else {await page.click(`[data-practice-choice="${key.answer}"]`);const fb=(await page.textContent('.c2-feedback')||'').trim();if(!/^Correct/.test(fb))errors.push('choosing the bank answer was not graded correct.');const stored=await page.evaluate(()=>JSON.parse(localStorage.getItem('prep_v2_cips2')||'{}'));if(!stored.practice||!stored.practice.los||!stored.practice.los['1']||stored.practice.los['1'].attempted!==1)errors.push('practice answer did not increment LO1 attempt history.');}
      if(consoleErrors.length)errors.push('practice browser errors: '+consoleErrors.join(' | '));await ctx.close();
    }
    notes.push('Practice grades against the authored bank, explains immediately and records the correct LO.');

    /* 4 — theme is a preference, not session state. */
    {
      const {ctx,page}=await open('cips2.html',390,844,()=>{if(sessionStorage.getItem('__c2seed'))return;sessionStorage.setItem('__c2seed','1');localStorage.setItem('prep_v2_cips2',JSON.stringify({settings:{darkMode:false}}));});
      const before=await page.evaluate(()=>document.body.classList.contains('dark'));await page.click('#c2Theme');const after=await page.evaluate(()=>document.body.classList.contains('dark'));if(before===after)errors.push('theme toggle did not change the theme.');await page.reload({waitUntil:'load'});const persisted=await page.evaluate(()=>document.body.classList.contains('dark'));if(persisted!==after)errors.push('theme choice did not survive reload.');await ctx.close();
    }
    notes.push('CIPS dark/light preference survives reload.');

    /* 5 — enter from the real subject picker, return without changing prior subject. */
    {
      const {ctx,page,consoleErrors}=await open('index.html',390,844,()=>{if(sessionStorage.getItem('__c2seed'))return;sessionStorage.setItem('__c2seed','1');localStorage.setItem('multisubject_active','aat');});
      await page.click('#subjectSwitcherBtn');await page.waitForSelector('[data-switch-subject="cips2"]',{timeout:3000});
      const order=await page.$$eval('.subject-card',els=>els.map(e=>e.getAttribute('data-switch-subject')));
      if(order.indexOf('cips2')!==order.indexOf('aat3')+1)errors.push('CIPS is not grouped immediately after AAT Level 3 in the subject picker.');
      const ctext=(await page.textContent('[data-switch-subject="cips2"]')||'').replace(/\s+/g,' ');
      if(!/CIPS Level 2/.test(ctext)||!/13 lessons/.test(ctext))errors.push('subject-picker CIPS card is missing its identity or readiness metadata.');
      await page.click('[data-switch-subject="cips2"]');await page.waitForURL(/cips2\.html$/);await page.waitForSelector('#c2PageTitle');
      await page.click('.c2-hub-link');await page.waitForURL(/index\.html$/);const active=await page.evaluate(()=>localStorage.getItem('multisubject_active'));if(active!=='aat')errors.push(`returning from CIPS changed the prior active subject to ${active}.`);
      if(consoleErrors.length)errors.push('subject bridge browser errors: '+consoleErrors.join(' | '));await ctx.close();
    }
    notes.push('Shared picker opens CIPS and returning preserves the previously active subject.');

    /* 6 — a completed course offers review, not an unexpected restart at lesson 1. */
    {
      const {ctx,page,consoleErrors}=await open('cips2.html',390,844,()=>{
        if(sessionStorage.getItem('__c2seed'))return;sessionStorage.setItem('__c2seed','1');
        const lessons={};for(let i=1;i<=13;i++){const id='c2m1-'+String(i).padStart(2,'0');lessons[id]={done:true,at:1};}
        localStorage.setItem('prep_v2_cips2',JSON.stringify({settings:{darkMode:false},lessons,checkpoint:{attempted:26,correct:26},practice:{runs:0,los:{},qs:{}}}));
      });
      /* Asked of the hero's primary action, not of a marker attribute. The
         attribute this used to look for was written by a MutationObserver that
         patched the renderer's output from outside it; a check that names the
         workaround passes when the workaround is present and fails when the
         renderer is finally made right, which is exactly backwards. */
      const SEL='.c2-hero .c2-hero-actions .c2-primary';
      const cta=(await page.textContent(SEL)||'').trim();
      if(!/Review L2M1/.test(cta))errors.push(`completed overview CTA is ${JSON.stringify(cta)} instead of a review action.`);
      else {await page.click(SEL);await page.waitForSelector('.c2-module');const title=(await page.textContent('#c2PageTitle')||'').trim();if(!/Introducing Procurement and Supply/.test(title))errors.push('completed-course review action did not open the module map.');}
      if(consoleErrors.length)errors.push('completed-course browser errors: '+consoleErrors.join(' | '));
      await ctx.close();
    }
    notes.push('After all 13 lessons are complete, the primary overview action opens review rather than restarting lesson 1.');
  }finally{await browser.close();server.close();}
  console.log(`${BOLD}CIPS L2M1 browser quality${RESET}\n`);notes.forEach(n=>console.log(`  ${DIM}${n}${RESET}`));console.log('');
  if(errors.length){console.log(`${RED}${BOLD}${errors.length} browser/UX problem(s)${RESET}`);errors.forEach(e=>console.log(`  ${RED}✗${RESET} ${e}`));console.log('');process.exit(1);}
  console.log(`${GREEN}${BOLD}CIPS L2M1 learner journey passes ✓${RESET}\n`);process.exit(0);
})().catch(e=>{console.error(e);process.exit(1);});
