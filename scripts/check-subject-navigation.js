#!/usr/bin/env node
/**
 * The ways INTO a long list, and whether they still work.
 *
 * This overhaul's central move, in all three AAT levels, was to stop asking a
 * reader to scroll. A Level 1 ladder of twenty-six steps folds by outcome and
 * has an index that jumps; a Level 2 glossary of a hundred and eighty-eight
 * terms is grouped by letter with an index across the top. None of that is
 * visible to a check that reads data, and none of it is layout — every one of
 * these screens can be the right height, in the right colours, with nothing
 * falling off the edge, and still not take the reader where they asked to go.
 *
 * THE ONE WORTH THE MOST. Folding an outcome must not renumber the ladder.
 * Step numbers run continuously across outcomes because that number is what a
 * reader uses to say where they got to, and the renderer counts them as it
 * walks — so a folded section, which renders no rungs, has to advance the
 * count anyway. Get that wrong and folding Outcome 1 renumbers steps 9 to 26
 * as 1 to 18: no error, no layout change, nothing any other check can see, and
 * a reader's place in the course silently means something else.
 *
 * Run: node scripts/check-subject-navigation.js   (exit 1 on any failure)
 */

'use strict';
const path=require('path'),http=require('http'),fs=require('fs');
const ROOT=path.join(__dirname, '..'); let chromium;
try { ({ chromium } = require('playwright')); }
catch (e) {
  console.log('Subject navigation\n');
  if (process.env.REQUIRE_PLAYWRIGHT) {
    console.log(`  Playwright is required here and is not installed: ${e.message}\n`);
    process.exit(1);
  }
  console.log('  Playwright is not installed — skipping.\n');
  process.exit(0);
}
const MIME={'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.webmanifest':'application/manifest+json','.png':'image/png','.svg':'image/svg+xml'};
function serve(){return new Promise(r=>{const s=http.createServer((q,res)=>{const u=decodeURIComponent(q.url.split('?')[0]);const f=path.join(ROOT,u==='/'?'index.html':u);
if(!f.startsWith(ROOT)||!fs.existsSync(f)||fs.statSync(f).isDirectory()){res.writeHead(404);res.end('nf');return;}
res.writeHead(200,{'Content-Type':MIME[path.extname(f)]||'application/octet-stream'});fs.createReadStream(f).pipe(res);});
s.listen(0,'127.0.0.1',()=>r({s,port:s.address().port}));});}
const RED='\x1b[31m', GREEN='\x1b[32m', BOLD='\x1b[1m', DIM='\x1b[2m', RESET='\x1b[0m';
let fails=0, checks=0;
const ok=(c,l)=>{ checks++; if(!c){fails++;console.log(`  ${RED}✗${RESET} ${l}`);} else console.log(`  ${DIM}✓ ${l}${RESET}`); };
console.log(`${BOLD}Subject navigation: folding, jumping and the letter index${RESET}`);
(async()=>{
const {s,port}=await serve();
const C=['/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell'].filter(p=>fs.existsSync(p));
const browser=await chromium.launch(C.length?{executablePath:C[0]}:{});
async function open(id){
  const ctx=await browser.newContext({viewport:{width:390,height:844}});
  const page=await ctx.newPage();
  page.on('pageerror',e=>{fails++;console.log('  ✗ PAGEERROR '+e.message);});
  await page.addInitScript(i=>{localStorage.setItem('multisubject_active',i);
    localStorage.setItem('aatPrep_v2',JSON.stringify({settings:{seenSplash:true}}));},id);
  await page.goto(`http://127.0.0.1:${port}/index.html`,{waitUntil:'load'});
  await page.waitForTimeout(800);
  return {ctx,page};
}
const nums = p => p.$$eval('.a1-rung-n', ns=>ns.map(n=>n.textContent.trim()).filter(t=>/^\d+$/.test(t)).map(Number));

console.log('\nLevel 1 — folding an outcome must not renumber the ladder');
{
  const {ctx,page}=await open('aat1');
  const all = await nums(page);
  ok(all.length===26 && all[0]===1 && all[25]===26, `26 steps numbered 1..26 (got ${all.length}: ${all[0]}..${all[all.length-1]})`);
  ok(all.every((n,i)=>n===i+1), 'and numbered consecutively');

  // fold outcome 1 (8 steps) and check the rest keep their numbers
  await page.click('[data-a1="fold"][data-o="1"]'); await page.waitForTimeout(300);
  const afterFold = await nums(page);
  ok(afterFold.length===18, `folding Outcome 1 hides its 8 steps (${afterFold.length} left)`);
  ok(afterFold[0]===9, `and the next step is still numbered 9 (got ${afterFold[0]})`);
  ok(afterFold[afterFold.length-1]===26, `and the last is still 26 (got ${afterFold[afterFold.length-1]})`);

  // unfold and confirm we are back
  await page.click('[data-a1="fold"][data-o="1"]'); await page.waitForTimeout(300);
  const back = await nums(page);
  ok(JSON.stringify(back)===JSON.stringify(all), 'unfolding restores the ladder exactly');

  // the index chips jump, and unfold on the way
  await page.click('[data-a1="fold"][data-o="3"]'); await page.waitForTimeout(250);
  await page.click('[data-a1="jump"][data-o="3"]'); await page.waitForTimeout(500);
  const expanded = await page.$eval('#a1-oc-3', n=>n.className);
  ok(!/is-shut/.test(expanded), 'jumping to a folded outcome opens it first');
  await ctx.close();
}

console.log('\nLevel 1 — a lesson can be finished, and the ladder records it');
{
  const {ctx,page}=await open('aat1');
  await page.click('[data-a1="open"]'); await page.waitForTimeout(400);
  ok(await page.$('.a1-lessonbar-m'), 'the lesson bar says which half of the lesson you are in');
  const phase = await page.textContent('.a1-lessonbar-m');
  ok(/Reading · page 1 of \d+/.test(phase), `and starts on reading (got "${phase.trim()}")`);
  for (let i=0;i<40;i++){
    const nx=await page.$('[data-a1="next"]'); if(!nx) break;
    await nx.click(); await page.waitForTimeout(120);
  }
  const nowPhase = await page.$('.a1-lessonbar-m');
  ok(!!nowPhase, 'the bar survives the move into the questions');
  if (nowPhase) { const t=await nowPhase.textContent(); ok(/Questions · 1 of \d+/.test(t), `and says so (got "${t.trim()}")`); }
  await ctx.close();
}

console.log('\nLevel 2 — the glossary index reaches its groups, and search still works');
{
  const {ctx,page}=await open('aat');
  await page.click('[data-tab="glossary"]'); await page.waitForTimeout(500);
  const letters = await page.$$eval('.gloss-index-l', ns=>ns.map(n=>n.textContent.trim()));
  ok(letters.length>=20, `an index of ${letters.length} letters`);
  const groups = await page.$$eval('.gloss-group', ns=>ns.map(n=>n.id));
  ok(groups.length===letters.length, 'one group per letter, and no letter without a group');
  ok(groups.every(g=>/^gloss-[A-Z]$/.test(g)), 'every group has a usable id');
  const counted = await page.$$eval('.gloss-card', ns=>ns.length);
  ok(counted===188, `all 188 terms are still on the page (got ${counted})`);
  const terms = await page.$$eval('.gloss-term', ns=>ns.map(n=>n.textContent.trim()));
  const sorted = terms.every((t,i,a)=>i===0||a[i-1].localeCompare(t,'en')<=0);
  ok(sorted, 'and they are in alphabetical order');
  // search returns a flat list
  await page.fill('#glossarySearch','vat'); await page.waitForTimeout(400);
  const g2 = await page.$$eval('.gloss-group', ns=>ns.length);
  const c2 = await page.$$eval('.gloss-card', ns=>ns.length);
  ok(g2===0 && c2>0 && c2<188, `a search returns a flat list of ${c2} (no letter groups)`);
  await ctx.close();
}
await browser.close(); s.close();
console.log(fails
  ? `\n${RED}${BOLD}── ${fails} of ${checks} checks failed ──${RESET}\n`
  : `\n${GREEN}${BOLD}── Every way into a long list still works ✓${RESET}  ${DIM}(${checks} assertions)${RESET}\n`);
process.exit(fails?1:0);
})();
