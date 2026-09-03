const path=require('path'),http=require('http'),fs=require('fs');
const ROOT='/home/user/aat-level-2-synoptic-practice';
const {chromium}=require('playwright');
const MIME={'.html':'text/html','.js':'text/javascript','.css':'text/css','.webmanifest':'application/manifest+json','.png':'image/png','.svg':'image/svg+xml'};
function serve(){return new Promise(r=>{const s=http.createServer((q,res)=>{const u=decodeURIComponent(q.url.split('?')[0]),f=path.join(ROOT,u==='/'?'index.html':u);if(!f.startsWith(ROOT)||!fs.existsSync(f)||fs.statSync(f).isDirectory()){res.writeHead(404);res.end();return;}res.writeHead(200,{'Content-Type':MIME[path.extname(f)]||'application/octet-stream'});fs.createReadStream(f).pipe(res);});s.listen(0,'127.0.0.1',()=>r({s,port:s.address().port}));});}
(async()=>{
const {s,port}=await serve();const base=`http://127.0.0.1:${port}/`;
const cands=['/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell','/opt/pw-browsers/chromium-1194/chrome-linux/chrome','/opt/pw-browsers/chromium'].filter(fs.existsSync);
const b=await chromium.launch(cands.length?{executablePath:cands[0]}:{});
const found=[];
const open=async()=>{const ctx=await b.newContext({viewport:{width:390,height:844}});const p=await ctx.newPage();
  const errs=[];p.on('pageerror',e=>errs.push('uncaught: '+e.message));p.on('console',m=>{if(m.type()==='error')errs.push(m.text());});
  await p.addInitScript(()=>localStorage.removeItem('prep_v2_cips2'));
  await p.goto(base+'cips2.html',{waitUntil:'load'});await p.waitForTimeout(400);return{ctx,p,errs};};

// ── A: can the checkpoint score exceed its total?
{const {ctx,p,errs}=await open();
await p.click('[data-c2nav="module"]');await p.waitForTimeout(200);
await p.click('[data-go="lesson"]');await p.waitForTimeout(250);
while(await p.$('[data-card="next"]'))await p.click('[data-card="next"]');
await p.click('[data-start-check]');await p.waitForTimeout(200);
// answer Q1 correctly (find the right option from the data), then back out and re-enter
const rightIdx=await p.evaluate(()=>window.CIPS2_L2M1_LEARN.LESSONS[0].check[0].answer);
await p.click(`[data-check-choice="${rightIdx}"]`);await p.waitForTimeout(150);
await p.click('[data-ctx-back]');await p.waitForTimeout(200);          // back to the reading
await p.click('[data-start-check]');await p.waitForTimeout(200);       // re-enter the checkpoint
await p.click(`[data-check-choice="${rightIdx}"]`);await p.waitForTimeout(150);
await p.click('[data-next-check]');await p.waitForTimeout(150);
const r2=await p.evaluate(()=>window.CIPS2_L2M1_LEARN.LESSONS[0].check[1].answer);
await p.click(`[data-check-choice="${r2}"]`);await p.waitForTimeout(150);
await p.click('[data-finish-check]');await p.waitForTimeout(250);
const txt=(await p.textContent('.c2-complete-card')||'').replace(/\s+/g,' ');
const m=/You scored (\d+) \/ (\d+)/.exec(txt);
const stored=await p.evaluate(()=>JSON.parse(localStorage.getItem('prep_v2_cips2')||'{}').lessons);
console.log('A. checkpoint score after re-entering:',m?m[0]:'(not found)');
console.log('   stored:',JSON.stringify(Object.values(stored||{})[0]));
if(m&&Number(m[1])>Number(m[2]))found.push(`checkpoint score ${m[1]}/${m[2]} — score exceeds total after re-entering the checkpoint`);
// ── K: does the lesson-complete screen have tabs or a context bar?
console.log('K. on lesson-complete: tabs',(await p.$$('.nav-tab')).length,'| ctx bar',(await p.$$('.c2-ctx')).length);
if((await p.$$('.nav-tab')).length===0 && (await p.$$('.c2-ctx')).length===0)found.push('lesson-complete screen shows neither tabs nor a context bar');
console.log('   errors:',errs);
await ctx.close();}
console.log('\n--- candidate defects:');found.forEach(f=>console.log('  *',f));
await b.close();s.close();
})();
