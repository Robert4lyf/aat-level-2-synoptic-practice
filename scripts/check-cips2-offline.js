#!/usr/bin/env node
/** Prove the exposed CIPS vertical slice is actually installed for offline use. */
'use strict';
const path=require('path'),http=require('http'),fs=require('fs');
const ROOT=path.join(__dirname,'..');
const RED='\x1b[31m',GREEN='\x1b[32m',DIM='\x1b[2m',BOLD='\x1b[1m',YEL='\x1b[33m',RESET='\x1b[0m';
let chromium;
try{({chromium}=require('playwright'));}catch(e){console.log(`${BOLD}CIPS offline install${RESET}\n`);if(process.env.REQUIRE_PLAYWRIGHT){console.log(`  ${RED}✗${RESET} Playwright required: ${e.message}`);process.exit(1);}console.log(`  ${YEL}⚠${RESET} Playwright unavailable — skipping.\n`);process.exit(0);}
const MIME={'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.webmanifest':'application/manifest+json','.png':'image/png','.svg':'image/svg+xml'};
const REQUIRED=['cips2.html','cips2-styles.css','cips2-page.js','cips2-bridge.js','cips2-register.js','cips2-l2m1-syllabus.js','cips2-l2m1-learn-data.js','cips2-l2m1-practice-data.js'];
function serve(){return new Promise(resolve=>{const server=http.createServer((req,res)=>{const u=decodeURIComponent(req.url.split('?')[0]),file=path.join(ROOT,u==='/'?'index.html':u);if(!file.startsWith(ROOT)||!fs.existsSync(file)||fs.statSync(file).isDirectory()){res.writeHead(404);res.end('not found');return;}res.writeHead(200,{'Content-Type':MIME[path.extname(file)]||'application/octet-stream'});fs.createReadStream(file).pipe(res);});server.listen(0,'127.0.0.1',()=>resolve({server,port:server.address().port}));});}
(async()=>{
  const errors=[],{server,port}=await serve(),base=`http://127.0.0.1:${port}/`;
  const candidates=['/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell','/opt/pw-browsers/chromium-1194/chrome-linux/chrome','/opt/pw-browsers/chromium'].filter(fs.existsSync);
  const browser=await chromium.launch(candidates.length?{executablePath:candidates[0]}:{});
  const ctx=await browser.newContext({viewport:{width:390,height:844},serviceWorkers:'allow'}),page=await ctx.newPage();
  try{
    await page.goto(base+'cips2.html',{waitUntil:'load'});
    await page.evaluate(()=>navigator.serviceWorker.ready).catch(()=>null);
    await page.waitForFunction(()=>!!navigator.serviceWorker.controller,{timeout:10000}).catch(()=>{});
    const status=await page.evaluate(async required=>{
      const keys=await caches.keys();
      const version=keys.find(k=>/^aat-l2-v/.test(k));
      const cache=version?await caches.open(version):null;
      const missing=[];
      if(cache)for(const f of required){if(!(await cache.match('./'+f)) && !(await cache.match(f)))missing.push(f);}
      return {controller:!!navigator.serviceWorker.controller,version,missing};
    },REQUIRED);
    if(!status.controller)errors.push('CIPS page never became controlled by the service worker.');
    if(!status.version)errors.push('No versioned app cache was installed.');
    if(status.missing.length)errors.push('CIPS assets missing from installed cache: '+status.missing.join(', '));

    if(!errors.length){
      await ctx.setOffline(true);
      await page.reload({waitUntil:'domcontentloaded',timeout:10000}).catch(e=>errors.push('offline reload failed: '+e.message));
      if(!errors.length){
        await page.waitForSelector('#c2PageTitle',{timeout:5000}).catch(()=>errors.push('offline CIPS reload did not render the learner page.'));
        const title=await page.textContent('#c2PageTitle').catch(()=>null);
        if(!title||!/Procurement and Supply Operations/i.test(title))errors.push('offline CIPS page rendered the wrong or empty screen.');
      }
    }
  }finally{await ctx.close();await browser.close();server.close();}
  console.log(`${BOLD}CIPS offline install${RESET}\n`);
  if(errors.length){errors.forEach(e=>console.log(`  ${RED}✗${RESET} ${e}`));console.log(`\n${RED}${BOLD}CIPS is not safely offline.${RESET}\n`);process.exit(1);}
  console.log(`  ${DIM}service worker controls the CIPS page; all ${REQUIRED.length} required assets are present in the versioned cache${RESET}`);
  console.log(`  ${GREEN}✓ CIPS L2M1 reloads while the browser is offline${RESET}\n`);
})().catch(e=>{console.error(e);process.exit(1);});
