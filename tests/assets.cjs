const {chromium}=require('playwright'),assert=require('node:assert/strict');
(async()=>{const b=await chromium.launch({headless:true,executablePath:'/usr/bin/chromium',args:['--no-sandbox']});const c=await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:3});await c.route('https://fonts.googleapis.com/**',r=>r.abort());const p=await c.newPage();const errors=[];p.on('pageerror',e=>errors.push(e.message));await p.goto('http://127.0.0.1:8766/');
assert.equal(await p.locator('.thumbs .animal').count(),12);
async function check(){await p.locator('.animal').evaluateAll(async items=>{await Promise.all(items.map(x=>x.querySelector('img').decode()));});const art=await p.locator('.animal').evaluateAll(items=>items.map(x=>{const img=x.querySelector('img'),r=img.getBoundingClientRect();return{src:img.getAttribute('src'),ok:img.complete&&img.naturalWidth>0,brand:!!x.querySelector('.brand'),fit:getComputedStyle(img).objectFit,aspect:Math.abs(r.width/r.height-1)};}));assert(art.every(x=>x.ok&&/^assets\/type-\d{2}\.webp$/.test(x.src)&&!x.brand&&x.fit==='contain'));assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));}
await check();
for(let n=0;n<12;n++){
 await p.evaluate(n=>{st.ans=[];TYPE_ORDER.forEach(i=>st.ans[i]=3);st.birth={date:'2000-02-29',noTime:true,zone:'Asia/Tokyo'};st.ans[36]=1;st.ans[37]=1;st.res=compute();st.res.type={n};st.res.sub={n:(n+1)%12};st.screen='result';render();},n);
 await check();assert.equal(await p.locator('.pic img').getAttribute('src'),`assets/type-${String(n+1).padStart(2,'0')}.webp`);
 for(let j=0;j<12;j++){await p.locator(`[data-a=pick][data-j="${j}"]`).click();assert.equal(await p.locator('#cmp img').getAttribute('src'),`assets/type-${String(j+1).padStart(2,'0')}.webp`);}
}
assert.deepEqual(errors,[]);console.log('PASS: new art in intro, all 12 personal results and 144 compatibility selections; no per-animal brand labels; contain/no horizontal overflow at mobile DPR3.');await b.close();})().catch(e=>{console.error(e);process.exit(1)});
