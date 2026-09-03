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
      /* The header's controls, which are now the app's shared `.icon-btn`s and
         brand switcher rather than CIPS-only buttons. The section tabs are the
         shared `.nav-tab` and are deliberately not held to this floor: they are
         the same size here as on Level 2, and a CIPS-only exception to that is
         the inconsistency this page was just fixed for. */
      const minTargets=await page.evaluate(()=>[...document.querySelectorAll('header .icon-btn, header .brand-switch')].map(e=>({t:(e.textContent||'').trim(),h:e.getBoundingClientRect().height,w:e.getBoundingClientRect().width})).filter(x=>x.h<24||x.w<24));
      if(minTargets.length)errors.push(`${w}px: undersized header control(s): ${JSON.stringify(minTargets)}`);
      /* The bar itself is the shared one, at the shared size. A CIPS page that
         grows its own header again fails here. */
      const hdr=await page.evaluate(()=>{const h=document.querySelector('body > header');return h?{h:Math.round(h.getBoundingClientRect().height),brand:!!h.querySelector('.brand-switch'),ctrls:h.querySelectorAll('.icon-btn').length}:null;});
      if(!hdr)errors.push(`${w}px: CIPS has no shared app header.`);
      else{
        if(!hdr.brand)errors.push(`${w}px: the header has no brand switcher, which is how every other subject is left.`);
        if(hdr.ctrls<2)errors.push(`${w}px: the header carries ${hdr.ctrls} icon button(s); the shared header has theme and home.`);
        if(hdr.h>80)errors.push(`${w}px: the CIPS header is ${hdr.h}px — the shared bar is 46px on a phone and 50px above.`);
      }
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
      const l2m1=(stored.modules||{}).l2m1||{};
      if(!(l2m1.lessons&&l2m1.lessons['c2m1-01']&&l2m1.lessons['c2m1-01'].done))errors.push('finishing lesson 1 did not persist completion under its module.');
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
      else {await page.click(`[data-practice-choice="${key.answer}"]`);const fb=(await page.textContent('.c2-feedback')||'').trim();if(!/^Correct/.test(fb))errors.push('choosing the bank answer was not graded correct.');const stored=await page.evaluate(()=>((JSON.parse(localStorage.getItem('prep_v2_cips2')||'{}').modules)||{}).l2m1||{});if(!stored.practice||!stored.practice.los||!stored.practice.los['1']||stored.practice.los['1'].attempted!==1)errors.push('practice answer did not increment LO1 attempt history.');}
      if(consoleErrors.length)errors.push('practice browser errors: '+consoleErrors.join(' | '));await ctx.close();
    }
    notes.push('Practice grades against the authored bank, explains immediately and records the correct LO.');

    /* 4 — theme is a preference, not session state. */
    {
      const {ctx,page}=await open('cips2.html',390,844,()=>{if(sessionStorage.getItem('__c2seed'))return;sessionStorage.setItem('__c2seed','1');localStorage.setItem('prep_v2_cips2',JSON.stringify({settings:{darkMode:false}}));});
      const before=await page.evaluate(()=>document.body.classList.contains('dark'));await page.click('#darkToggle');const after=await page.evaluate(()=>document.body.classList.contains('dark'));if(before===after)errors.push('theme toggle did not change the theme.');await page.reload({waitUntil:'load'});const persisted=await page.evaluate(()=>document.body.classList.contains('dark'));if(persisted!==after)errors.push('theme choice did not survive reload.');await ctx.close();
    }
    notes.push('CIPS dark/light preference survives reload.');

    /* 5 — enter from the real subject picker, return without changing prior subject. */
    {
      const {ctx,page,consoleErrors}=await open('index.html',390,844,()=>{if(sessionStorage.getItem('__c2seed'))return;sessionStorage.setItem('__c2seed','1');localStorage.setItem('multisubject_active','aat');});
      await page.click('#subjectSwitcherBtn');await page.waitForSelector('[data-switch-subject="cips2"]',{timeout:3000});
      const order=await page.$$eval('.subject-card',els=>els.map(e=>e.getAttribute('data-switch-subject')));
      if(order.indexOf('cips2')!==order.indexOf('aat3')+1)errors.push('CIPS is not grouped immediately after AAT Level 3 in the subject picker.');
      const ctext=(await page.textContent('[data-switch-subject="cips2"]')||'').replace(/\s+/g,' ');
      /* The counts themselves are checked against the banks in
         check-cips2-content.js. Repeating a number here would pin the typed
         string a second time, which is the bug that check was written for. */
      if(!/CIPS Level 2/.test(ctext)||!/L2M1/.test(ctext)||!/L2M2/.test(ctext)||!/\d+ lessons/.test(ctext)||!/\d+ practice questions/.test(ctext))errors.push(`subject-picker CIPS card is missing its identity or readiness metadata: ${JSON.stringify(ctext)}`);
      await page.click('[data-switch-subject="cips2"]');await page.waitForURL(/cips2\.html$/);await page.waitForSelector('#c2PageTitle');
      /* Leaving CIPS by its caret must OFFER A CHOICE, not silently reopen the
         subject that happened to be active last. index.html restores that
         subject on a plain arrival, so pressing a control marked "switch
         subject" landed the reader inside Level 3 having been shown nothing —
         the whole point of a caret is that a menu follows it. */
      await page.click('#subjectSwitcherBtn');await page.waitForURL(/index\.html/);
      await page.waitForSelector('.subject-picker',{timeout:5000}).catch(()=>errors.push('leaving CIPS by the brand caret did not open the subject picker — it reopened the last active subject instead.'));
      const active=await page.evaluate(()=>localStorage.getItem('multisubject_active'));if(active!=='aat')errors.push(`returning from CIPS changed the prior active subject to ${active}.`);
      /* And the request is spent once honoured: a reload must not put the
         picker back over whatever the reader has since chosen. */
      if(/#subjects/.test(await page.url()))errors.push('the #subjects request stayed in the URL, so a reload or a back-press reopens the picker.');
      await page.reload({waitUntil:'load'});await page.waitForTimeout(900);
      if(await page.$('.subject-picker'))errors.push('the subject picker reopened on reload — the arrival request outlived the arrival.');
      /* THE OTHER ARRIVAL. Coming from cips2.html is a cross-document
         navigation and runs init; asking for the picker on a page that is
         ALREADY index.html changes nothing but the URL and fires hashchange
         alone. Both have to work, and only the first is exercised above — a
         first version of this fix handled the cross-document case only, passed
         every check here, and left a hash that did nothing whenever the reader
         happened to be on index.html already. */
      await page.evaluate(()=>{location.hash='#subjects';});await page.waitForTimeout(700);
      const viaHash=await page.$$eval('.subject-picker',e=>e.length);
      if(viaHash!==1)errors.push(`asking for the picker by hash on an already-loaded index.html drew ${viaHash} pickers; expected exactly 1.`);
      if(/#subjects/.test(await page.url()))errors.push('the hash-triggered picker did not clear its own request from the URL.');
      if(consoleErrors.length)errors.push('subject bridge browser errors: '+consoleErrors.join(' | '));await ctx.close();
    }
    notes.push('Shared picker opens CIPS and returning preserves the previously active subject.');

    /* 6 — a completed course offers review, not an unexpected restart at lesson 1.
       AND the seed below is deliberately the PRE-L2M2 STORAGE SHAPE: lessons,
       checkpoint and practice at the top level of prep_v2_cips2, which is what
       every existing reader has on disk. If the migration into the per-module
       shape were dropped, this reader — who has finished all thirteen lessons —
       would be shown an untouched course, and the CTA below would read "Start"
       rather than "Review". */
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
      if(!/Review L2M1/.test(cta))errors.push(`completed overview CTA is ${JSON.stringify(cta)} instead of a review action — the pre-L2M2 progress shape was not migrated.`);
      else {await page.click(SEL);await page.waitForSelector('.c2-module');const title=(await page.textContent('#c2PageTitle')||'').trim();if(!/Introducing Procurement and Supply/.test(title))errors.push('completed-course review action did not open the module map.');}
      /* Migrated once and written back in the new shape, so the next load is
         not a second migration of a file that no longer has the old keys. */
      const shape=await page.evaluate(()=>JSON.parse(localStorage.getItem('prep_v2_cips2')||'{}'));
      if(!shape.modules||!shape.modules.l2m1||!shape.modules.l2m1.lessons||!shape.modules.l2m1.lessons['c2m1-13'])errors.push('the pre-L2M2 progress file was not rewritten into the per-module shape.');
      if(shape.lessons)errors.push('the migrated file still carries the old top-level lessons key.');
      if(!shape.settings||shape.settings.darkMode!==false)errors.push('migration lost the top-level settings that cips2-theme-bootstrap.js reads before this script runs.');
      if(consoleErrors.length)errors.push('completed-course browser errors: '+consoleErrors.join(' | '));
      await ctx.close();
    }
    notes.push('After all 13 lessons are complete, the primary overview action opens review rather than restarting lesson 1.');

    /* 7 — a checkpoint entered twice scores itself once, and the screen at the
       end of a lesson is still navigable. */
    {
      const {ctx,page,consoleErrors}=await open('cips2.html',390,844,()=>{if(sessionStorage.getItem('__c2seed'))return;sessionStorage.setItem('__c2seed','1');localStorage.removeItem('prep_v2_cips2');});
      await page.click('[data-c2nav="module"]');
      await page.click('[data-go="lesson"]');
      while(await page.$('[data-card="next"]'))await page.click('[data-card="next"]');
      const right=i=>page.evaluate(n=>window.CIPS2_L2M1_LEARN.LESSONS[0].check[n].answer,i);
      /* Enter the checkpoint, answer, back out to the reading, enter again.
         Every other field was reset on re-entry and the running score was not,
         so answers from the abandoned attempt were counted twice and a
         two-question checkpoint reported three correct. */
      await page.click('[data-start-check]');
      await page.click(`[data-check-choice="${await right(0)}"]`);
      await page.click('[data-ctx-back]');
      await page.click('[data-start-check]');
      await page.click(`[data-check-choice="${await right(0)}"]`);
      await page.click('[data-next-check]');
      await page.click(`[data-check-choice="${await right(1)}"]`);
      await page.click('[data-finish-check]');
      await page.waitForSelector('.c2-complete-card');
      const said=(await page.textContent('.c2-complete-card')||'').replace(/\s+/g,' ');
      const m=/You scored (\d+) \/ (\d+)/.exec(said);
      if(!m)errors.push('the lesson-complete card no longer states a checkpoint score.');
      else if(Number(m[1])>Number(m[2]))errors.push(`re-entering a checkpoint counted the abandoned attempt: "${m[0]}".`);
      const stored=await page.evaluate(()=>{const m=(JSON.parse(localStorage.getItem('prep_v2_cips2')||'{}').modules)||{};const l=(m.l2m1||{}).lessons||{};return Object.values(l)[0];});
      if(stored&&stored.checkpoint&&stored.checkpoint.correct>stored.checkpoint.total)errors.push(`a checkpoint score above its own total was written to storage: ${JSON.stringify(stored.checkpoint)}.`);
      /* This screen draws no context bar, so it must keep the section tabs —
         it had neither, which is a screen with no way out but its own buttons. */
      const tabs=(await page.$$('.nav-tab')).length, ctxb=(await page.$$('.c2-ctx')).length;
      if(!tabs&&!ctxb)errors.push('the lesson-complete screen offers neither section tabs nor a context bar.');
      if(consoleErrors.length)errors.push('lesson-complete browser errors: '+consoleErrors.join(' | '));
      await ctx.close();
    }
    notes.push('A checkpoint re-entered mid-lesson scores itself once, and the screen at the end of a lesson is still navigable.');

    /* 8 — the second module is a real course, not a second label on the first.
       Everything below would pass on a page that merely renamed a tab: what it
       actually asks is whether the map, the bank, the glossary and the stored
       progress all follow the module the reader switched to. */
    {
      const {ctx,page,consoleErrors}=await open('cips2.html',390,844,()=>{if(sessionStorage.getItem('__c2seed'))return;sessionStorage.setItem('__c2seed','1');localStorage.removeItem('prep_v2_cips2');});
      const expect=await page.evaluate(()=>({
        m1:{lessons:window.CIPS2_L2M1_LEARN.LESSONS.length,qs:window.CIPS2_L2M1_PRACTICE.QUESTIONS.length,title:window.CIPS2_MODULES.l2m1.title,los:window.CIPS2_MODULES.l2m1.outcomes.length,exam:window.CIPS2_MODULES.l2m1.assessment.questionCount},
        m2:{lessons:window.CIPS2_L2M2_LEARN.LESSONS.length,qs:window.CIPS2_L2M2_PRACTICE.QUESTIONS.length,title:window.CIPS2_MODULES.l2m2.title,los:window.CIPS2_MODULES.l2m2.outcomes.length,exam:window.CIPS2_MODULES.l2m2.assessment.questionCount,ids:window.CIPS2_L2M2_LEARN.LESSONS.map(l=>l.id)}
      }));
      if(expect.m1.lessons===expect.m2.lessons)errors.push('the two modules have the same lesson count, so this section cannot tell them apart — pick a different discriminator.');

      const cards=await page.$$('[data-open-module]');
      if(cards.length!==2)errors.push(`the overview offers ${cards.length} module cards; both modules with content should appear.`);

      await page.click('[data-open-module="l2m2"]');
      await page.waitForSelector('.c2-module');
      const title=(await page.textContent('#c2PageTitle')||'').trim();
      if(title!==expect.m2.title)errors.push(`switching to L2M2 opened ${JSON.stringify(title)} instead of ${JSON.stringify(expect.m2.title)}.`);
      const rows=await page.$$eval('[data-go="lesson"]',els=>els.map(e=>e.getAttribute('data-id')));
      if(rows.length!==expect.m2.lessons)errors.push(`the L2M2 map shows ${rows.length} lessons; the module has ${expect.m2.lessons}.`);
      if(rows.some(id=>!expect.m2.ids.includes(id)))errors.push(`the L2M2 map lists lessons that are not L2M2's: ${JSON.stringify(rows.filter(id=>!expect.m2.ids.includes(id)))}.`);
      const tab=(await page.textContent('[data-c2nav="module"]')||'').trim();
      if(tab!=='L2M2')errors.push(`the module tab still reads ${JSON.stringify(tab)} after switching to L2M2.`);

      /* The practice bank must be L2M2's. A page that switched the map but not
         the bank would grade L2M2 answers against L2M1 questions. */
      await page.click('[data-c2nav="practice"]');
      const loButtons=(await page.$$('[data-start-practice]')).length;
      if(loButtons!==expect.m2.los+1)errors.push(`the L2M2 practice screen offers ${loButtons} choices; expected ${expect.m2.los} outcomes plus mixed.`);
      const note=(await page.textContent('.c2-practice-note')||'').replace(/\s+/g,' ');
      if(note.indexOf(String(expect.m2.exam)+'-question')<0)errors.push(`the practice note describes a ${/(\d+)-question/.exec(note)?RegExp.$1:'?'}-question exam on L2M2, whose paper is ${expect.m2.exam}.`);
      await page.click('[data-start-practice="1"]');
      const stem=(await page.textContent('#c2PageTitle')||'').trim();
      const from=await page.evaluate(stem=>({
        m2:!!window.CIPS2_L2M2_PRACTICE.QUESTIONS.find(x=>x.q===stem),
        m1:!!window.CIPS2_L2M1_PRACTICE.QUESTIONS.find(x=>x.q===stem)
      }),stem);
      if(!from.m2||from.m1)errors.push('a practice question served under L2M2 does not come from the L2M2 bank.');

      /* Progress is recorded against the module it was earned in. */
      const key=await page.evaluate(stem=>{const q=window.CIPS2_L2M2_PRACTICE.QUESTIONS.find(x=>x.q===stem);return q?q.answer:null;},stem);
      if(key!==null){
        await page.click(`[data-practice-choice="${key}"]`);
        const st=await page.evaluate(()=>JSON.parse(localStorage.getItem('prep_v2_cips2')||'{}'));
        const rec=(st.modules||{}).l2m2||{};
        if(!rec.practice||!rec.practice.los||!rec.practice.los['1'])errors.push('an answer given in L2M2 was not recorded against l2m2.');
        if(((st.modules||{}).l2m1||{}).practice&&Object.keys(st.modules.l2m1.practice.los||{}).length)errors.push('an answer given in L2M2 was recorded against l2m1.');
        if(st.activeModule!=='l2m2')errors.push(`the stored active module is ${JSON.stringify(st.activeModule)} after switching to L2M2.`);
      }

      /* The glossary follows too. Leave the run first: a practice run carries a
         context bar, and the tabs are deliberately hidden while it does. */
      await page.click('[data-ctx-back]');
      await page.waitForSelector('[data-c2nav="glossary"]');
      await page.click('[data-c2nav="glossary"]');
      const terms=await page.$$eval('.c2-glossary-list dt',els=>els.map(e=>(e.textContent||'').trim()));
      const glossFrom=await page.evaluate(()=>({m2:window.CIPS2_L2M2_LEARN.GLOSSARY.map(g=>g[0]),m1:window.CIPS2_L2M1_LEARN.GLOSSARY.map(g=>g[0])}));
      const onlyM1=terms.filter(t=>glossFrom.m1.includes(t)&&!glossFrom.m2.includes(t));
      if(!terms.length)errors.push('the L2M2 glossary rendered no terms.');
      if(onlyM1.length)errors.push(`the glossary under L2M2 shows L2M1-only terms: ${JSON.stringify(onlyM1.slice(0,3))}.`);

      /* And the choice survives a reload, or a reader loses their place every
         time they close the tab. */
      await page.reload({waitUntil:'load'});
      await page.waitForSelector('#c2PageTitle');
      const tabAfter=(await page.textContent('[data-c2nav="module"]')||'').trim();
      if(tabAfter!=='L2M2')errors.push(`after reload the active module reverted to ${JSON.stringify(tabAfter)}.`);

      if(consoleErrors.length)errors.push('second-module browser errors: '+consoleErrors.join(' | '));
      await ctx.close();
    }
    notes.push('L2M2 is a separate course: its own map, bank, glossary and stored progress, and the choice survives a reload.');

    /* 9 — the upgrade window, where a file carries BOTH progress shapes.
       This page is served by a service worker, so a second device can go on
       running the previous version after this one ships: it keeps writing
       `lessons` at the top level while this version writes `modules`, and the
       sync merge unions the two into one file that has both. Preferring
       `modules` and stopping there loses everything the un-upgraded device did
       — which is the reader's own work, on their own account, silently. */
    {
      const {ctx,page,consoleErrors}=await open('cips2.html',390,844,()=>{
        if(sessionStorage.getItem('__c2seed'))return;sessionStorage.setItem('__c2seed','1');
        localStorage.setItem('prep_v2_cips2',JSON.stringify({
          settings:{darkMode:false},
          /* what the old device wrote: lessons 1–4 of L2M1 */
          lessons:{'c2m1-01':{done:true,at:1},'c2m1-02':{done:true,at:1},'c2m1-03':{done:true,at:1},'c2m1-04':{done:true,at:1}},
          checkpoint:{attempted:8,correct:7},
          practice:{runs:2,los:{'1':{attempted:8,correct:6}},qs:{}},
          /* what the new device wrote: lessons 5–6, and some L2M2 */
          modules:{
            l2m1:{lessons:{'c2m1-05':{done:true,at:2},'c2m1-06':{done:true,at:2}},checkpoint:{attempted:4,correct:4},practice:{runs:1,los:{'2':{attempted:8,correct:8}},qs:{}}},
            l2m2:{lessons:{'c2m2-01':{done:true,at:2}},checkpoint:{attempted:3,correct:3},practice:{runs:1,los:{},qs:{}}}
          }
        }));
      });
      await page.click('[data-c2nav="module"]');
      const done=await page.$$eval('[data-go="lesson"].is-done',els=>els.map(e=>e.getAttribute('data-id')).sort());
      const want=['c2m1-01','c2m1-02','c2m1-03','c2m1-04','c2m1-05','c2m1-06'];
      const lost=want.filter(id=>!done.includes(id));
      if(lost.length)errors.push(`upgrading with both progress shapes present lost lessons ${JSON.stringify(lost)} — the flat half of the file was discarded.`);
      const merged=await page.evaluate(()=>JSON.parse(localStorage.getItem('prep_v2_cips2')||'{}'));
      const m1=(merged.modules||{}).l2m1||{};
      if(!m1.checkpoint||m1.checkpoint.attempted!==8)errors.push(`merged checkpoint attempts are ${m1.checkpoint&&m1.checkpoint.attempted}; the larger of the two sides is 8.`);
      if(!m1.practice||m1.practice.runs!==2)errors.push(`merged practice runs are ${m1.practice&&m1.practice.runs}; the larger of the two sides is 2.`);
      if(!m1.practice||!m1.practice.los||!m1.practice.los['1']||!m1.practice.los['2'])errors.push('merging the two shapes dropped one side\'s per-outcome practice record.');
      if(!((merged.modules||{}).l2m2||{}).lessons||!merged.modules.l2m2.lessons['c2m2-01'])errors.push('the merge lost the other module entirely.');
      if(merged.lessons)errors.push('after the merge the file still carries the old top-level lessons key, so the next load merges it again.');
      if(consoleErrors.length)errors.push('upgrade-window browser errors: '+consoleErrors.join(' | '));
      await ctx.close();
    }
    notes.push('A progress file carrying both the old and the new shape keeps every lesson from both, and is left in the new shape alone.');
  }finally{await browser.close();server.close();}
  console.log(`${BOLD}CIPS browser quality${RESET}\n`);notes.forEach(n=>console.log(`  ${DIM}${n}${RESET}`));console.log('');
  if(errors.length){console.log(`${RED}${BOLD}${errors.length} browser/UX problem(s)${RESET}`);errors.forEach(e=>console.log(`  ${RED}✗${RESET} ${e}`));console.log('');process.exit(1);}
  console.log(`${GREEN}${BOLD}CIPS learner journey passes ✓${RESET}\n`);process.exit(0);
})().catch(e=>{console.error(e);process.exit(1);});
