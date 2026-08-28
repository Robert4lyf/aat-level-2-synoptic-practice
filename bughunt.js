'use strict';
/* Random-walk every subject and every theme, and after every click assert the
   cheap invariants: nothing throws, the screen is not blank, the page does not
   scroll sideways, and no placeholder has leaked into the text. */
const path=require('path'),http=require('http'),fs=require('fs');
const ROOT=__dirname; const {chromium}=require('playwright');
const MIME={'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.webmanifest':'application/manifest+json','.png':'image/png','.svg':'image/svg+xml'};
function serve(){return new Promise(r=>{const s=http.createServer((q,res)=>{const u=decodeURIComponent(q.url.split('?')[0]);const f=path.join(ROOT,u==='/'?'index.html':u);
if(!f.startsWith(ROOT)||!fs.existsSync(f)||fs.statSync(f).isDirectory()){res.writeHead(404);res.end('nf');return;}
res.writeHead(200,{'Content-Type':MIME[path.extname(f)]||'application/octet-stream'});fs.createReadStream(f).pipe(res);});
s.listen(0,'127.0.0.1',()=>r({s,port:s.address().port}));});}
function rng(seed){let x=seed>>>0||1;return()=>{x^=x<<13;x>>>=0;x^=x>>17;x^=x<<5;x>>>=0;return x/4294967296;};}
const BAD=[/\bundefined\b/,/\bNaN\b/,/\[object Object\]/,/\bInfinity\b/,/\bnull\b/];
const SUBJECTS=['aat1','aat','aat3','french','lsf','guitar','code-route'];
const findings=[];
(async()=>{
const {s,port}=await serve();
const C=['/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell'].filter(p=>fs.existsSync(p));
const browser=await chromium.launch(C.length?{executablePath:C[0]}:{});
for (const subj of SUBJECTS) {
  for (const seed of [11,22,33,44]) {
    const dark = seed % 22 === 0;
    const ctx=await browser.newContext({viewport:{width:390,height:844},hasTouch:true});
    const page=await ctx.newPage();
    const errs=[];
    page.on('pageerror',e=>errs.push('pageerror: '+e.message));
    page.on('console',m=>{if(m.type()==='error')errs.push('console: '+m.text());});
    await page.addInitScript(([id,d])=>{
      localStorage.setItem('multisubject_active',id);
      localStorage.setItem('aatPrep_v2',JSON.stringify({settings:{seenSplash:true,darkMode:d}}));
    },[subj,dark]);
    await page.goto(`http://127.0.0.1:${port}/index.html`,{waitUntil:'load'});
    await page.waitForTimeout(700);
    const rand=rng(seed*7919+subj.length*31);
    const trail=[];
    let hit=false;
    for (let step=0; step<40 && !hit; step++) {
      const btns=await page.$$('#app button:not([disabled]), #app [role=button]:not([disabled]), #app a[href^="#"]');
      if (!btns.length) { trail.push('(nothing clickable)'); break; }
      const i=Math.floor(rand()*btns.length);
      let label='';
      try { label=((await btns[i].textContent())||'').trim().replace(/\s+/g,' ').slice(0,26); } catch(e){}
      try { await btns[i].click({timeout:1200}); } catch(e){ continue; }
      trail.push(label||'·');
      await page.waitForTimeout(150);
      const ins=await page.$$('#app input[type=text], #app input:not([type]), #app input[inputmode]');
      for (const n of ins.slice(0,8)) { try { await n.fill('100'); } catch(e){} }
      const r = await page.evaluate(()=>({
        txt: (document.getElementById('app').textContent||''),
        wide: document.documentElement.scrollWidth > window.innerWidth + 1,
        w: document.documentElement.scrollWidth, vw: window.innerWidth,
      }));
      const note = m => { findings.push({subj,seed,dark,step,why:m,trail:trail.slice(-7)}); hit=true; };
      if (!r.txt.trim()) note('#app is empty');
      else if (r.wide) note(`the page is ${r.w}px wide in a ${r.vw}px window`);
      else BAD.forEach(re=>{ const m=re.exec(r.txt); if(m && !hit){
        const at=r.txt.indexOf(m[0]);
        note(`text contains "${m[0]}" — …${r.txt.slice(Math.max(0,at-70),at+60).replace(/\s+/g,' ')}…`);
      }});
    }
    [...new Set(errs)].forEach(e=>findings.push({subj,seed,dark,step:'-',why:e,trail:trail.slice(-7)}));
    await ctx.close();
  }
  process.stdout.write('swept '+subj+'\n');
}
await browser.close(); s.close();
console.log('\n===== FINDINGS =====');
const seen=new Set();
findings.forEach(f=>{ const k=f.subj+'|'+f.why.slice(0,100); if(seen.has(k))return; seen.add(k);
  console.log(`[${f.subj}${f.dark?' dark':''} seed${f.seed} step${f.step}] ${f.why}`);
  console.log(`    trail: ${f.trail.join(' → ')}`);
});
console.log(`\n${seen.size} distinct finding(s)`);
})();
