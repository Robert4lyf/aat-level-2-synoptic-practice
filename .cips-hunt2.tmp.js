const path=require('path'),http=require('http'),fs=require('fs');
const ROOT='/home/user/aat-level-2-synoptic-practice';
const {chromium}=require('playwright');
const MIME={'.html':'text/html','.js':'text/javascript','.css':'text/css','.webmanifest':'application/manifest+json','.png':'image/png','.svg':'image/svg+xml'};
function serve(){return new Promise(r=>{const s=http.createServer((q,res)=>{const u=decodeURIComponent(q.url.split('?')[0]),f=path.join(ROOT,u==='/'?'index.html':u);if(!f.startsWith(ROOT)||!fs.existsSync(f)||fs.statSync(f).isDirectory()){res.writeHead(404);res.end();return;}res.writeHead(200,{'Content-Type':MIME[path.extname(f)]||'application/octet-stream'});fs.createReadStream(f).pipe(res);});s.listen(0,'127.0.0.1',()=>r({s,port:s.address().port}));});}
(async()=>{
const {s,port}=await serve();const base=`http://127.0.0.1:${port}/`;
const cands=['/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell','/opt/pw-browsers/chromium-1194/chrome-linux/chrome','/opt/pw-browsers/chromium'].filter(fs.existsSync);
const b=await chromium.launch(cands.length?{executablePath:cands[0]}:{});
const found=[];const note=(m)=>{console.log('  *',m);found.push(m);};
const open=async(init)=>{const ctx=await b.newContext({viewport:{width:390,height:844}});const p=await ctx.newPage();
  const errs=[];p.on('pageerror',e=>errs.push('uncaught: '+e.message));p.on('console',m=>{if(m.type()==='error')errs.push(m.text());});
  if(init)await p.addInitScript(init); else await p.addInitScript(()=>localStorage.removeItem('prep_v2_cips2'));
  await p.goto(base+'cips2.html',{waitUntil:'load'});await p.waitForTimeout(400);return{ctx,p,errs};};

console.log('1. corrupt localStorage');
{const {ctx,p,errs}=await open(()=>localStorage.setItem('prep_v2_cips2','{not json'));
console.log('   renders:',!!(await p.$('#c2PageTitle')),'| errors:',errs.length);
if(!(await p.$('#c2PageTitle')))note('corrupt progress prevents the page rendering');
await ctx.close();}

console.log('2. hostile shapes in stored progress');
{const {ctx,p,errs}=await open(()=>localStorage.setItem('prep_v2_cips2',JSON.stringify({
   settings:'nope',lessons:['a','b'],checkpoint:{attempted:'x',correct:-4},practice:{runs:NaN,los:'no',qs:5}})));
await p.click('[data-c2nav="progress"]').catch(()=>{});await p.waitForTimeout(300);
const stats=await p.$$eval('.c2-statgrid strong',e=>e.map(x=>x.textContent)).catch(()=>[]);
console.log('   progress stats:',JSON.stringify(stats),'| errors:',errs.length);
if(errs.length)note('hostile stored progress throws: '+errs[0]);
if(stats.some(x=>/NaN|undefined|Infinity/.test(x)))note('hostile stored progress renders NaN/undefined in the progress stats: '+JSON.stringify(stats));
await ctx.close();}

console.log('3. glossary search with regex-special and very long input');
{const {ctx,p,errs}=await open();
await p.click('[data-c2nav="glossary"]');await p.waitForTimeout(250);
await p.click('#c2GlossarySearch');await p.keyboard.type('*(?[',{delay:20});await p.waitForTimeout(300);
console.log('   after "*(?[" rows:',(await p.$$('.c2-glossary-list > div')).length,'| empty msg:',!!(await p.$('.c2-empty')),'| errors:',errs.length);
if(errs.length)note('glossary search throws on regex-special characters: '+errs[0]);
await ctx.close();}

console.log('4. mixed draw size, repeated');
{const {ctx,p}=await open();
const sizes=await p.evaluate(()=>{const out=[];for(let i=0;i<20;i++){const qs=[];window.CIPS2_MODULES.l2m1.outcomes.forEach(o=>{const pool=window.CIPS2_L2M1_PRACTICE.forLo(o.n).slice();qs.push(...pool.slice(0,2));});out.push(qs.length);}return [...new Set(out)];});
console.log('   mixed sizes seen:',sizes);
if(sizes.length!==1||sizes[0]!==12)note('mixed practice does not always draw 12: '+JSON.stringify(sizes));
await ctx.close();}

console.log('5. repair run disappears once everything is put right');
{const {ctx,p,errs}=await open();
await p.click('[data-c2nav="practice"]');await p.waitForTimeout(250);
await p.click('[data-start-practice="1"]');await p.waitForTimeout(250);
// answer all 8 wrong deliberately
for(let i=0;i<8;i++){const wrong=await p.evaluate(()=>{const b=[...document.querySelectorAll('[data-practice-choice]')];return b.length?0:null;});
  const ans=await p.evaluate(()=>{const t=document.querySelector('.c2-card-label').textContent;return 0;});
  await p.click('[data-practice-choice="0"]');await p.waitForTimeout(60);
  const nx=await p.$('[data-next-practice]');if(nx){await nx.click();await p.waitForTimeout(100);}}
await p.click('[data-screen="practice"]').catch(()=>{});await p.waitForTimeout(250);
const before=await p.$('[data-start-practice="wrong"]');
const n1=before?(await before.textContent()).match(/(\d+) waiting/):null;
console.log('   repair offered:',!!before, n1?n1[0]:'');
// now do the repair run answering every one correctly
if(before){await before.click();await p.waitForTimeout(250);
  let guard=0;
  while(await p.$('[data-practice-choice]') && guard++<40){
    const correct=await p.evaluate(()=>{
      const label=document.querySelector('.c2-card-label').textContent;
      const stem=document.querySelector('#c2PageTitle').textContent;
      const q=window.CIPS2_L2M1_PRACTICE.QUESTIONS.find(x=>x.q===stem);
      return q?q.answer:0;});
    await p.click(`[data-practice-choice="${correct}"]`);await p.waitForTimeout(60);
    const nx=await p.$('[data-next-practice]');if(nx){await nx.click();await p.waitForTimeout(100);}}
  await p.click('[data-screen="practice"]').catch(()=>{});await p.waitForTimeout(300);
  const after=await p.$('[data-start-practice="wrong"]');
  console.log('   repair still offered after putting them all right:',!!after);
  if(after)note('the repair run stays offered after every question in it was answered correctly');
}
console.log('   errors:',errs.length?errs:'(none)');
await ctx.close();}

console.log('\n--- candidate defects:');found.length?found.forEach(f=>console.log('  *',f)):console.log('  (none in this sweep)');
await b.close();s.close();
})();
