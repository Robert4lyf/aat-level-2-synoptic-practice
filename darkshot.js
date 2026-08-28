'use strict';
const path=require('path'),http=require('http'),fs=require('fs');
const ROOT=__dirname; const {chromium}=require('playwright');
const MIME={'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.webmanifest':'application/manifest+json','.png':'image/png','.svg':'image/svg+xml'};
function serve(){return new Promise(r=>{const s=http.createServer((q,res)=>{const u=decodeURIComponent(q.url.split('?')[0]);const f=path.join(ROOT,u==='/'?'index.html':u);
if(!f.startsWith(ROOT)||!fs.existsSync(f)||fs.statSync(f).isDirectory()){res.writeHead(404);res.end('nf');return;}
res.writeHead(200,{'Content-Type':MIME[path.extname(f)]||'application/octet-stream'});fs.createReadStream(f).pipe(res);});
s.listen(0,'127.0.0.1',()=>r({s,port:s.address().port}));});}
(async()=>{
const {s,port}=await serve();
const C=['/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell'].filter(p=>fs.existsSync(p));
const browser=await chromium.launch(C.length?{executablePath:C[0]}:{});
for (const j of JSON.parse(process.argv[2])) {
  const ctx=await browser.newContext({viewport:{width:390,height:844},deviceScaleFactor:2});
  const page=await ctx.newPage();
  await page.addInitScript(([id,d])=>{localStorage.setItem('multisubject_active',id);
    localStorage.setItem('aatPrep_v2',JSON.stringify({settings:{seenSplash:true,darkMode:d}}));
    localStorage.setItem('prep_v2_aat1',JSON.stringify({settings:{darkMode:d}}));},[j.id,!!j.dark]);
  await page.goto(`http://127.0.0.1:${port}/index.html`,{waitUntil:'load'});
  await page.waitForTimeout(900);
  for (const sel of (j.clicks||[])) { const e=await page.$(sel); if(e){await e.click(); await page.waitForTimeout(600);} }
  if (j.scroll) { await page.evaluate(y=>window.scrollTo(0,y), j.scroll); await page.waitForTimeout(300); }
  await page.screenshot({path:`/tmp/${j.name}.png`});
  console.log(j.name);
  await ctx.close();
}
await browser.close(); s.close();
})();
