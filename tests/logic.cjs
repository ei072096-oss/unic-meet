const fs=require('fs'),vm=require('vm'),assert=require('node:assert/strict');
const html=fs.readFileSync(__dirname+'/../index.html','utf8'),source=html.match(/<script>([\s\S]*?)<\/script>/)[1];
const c=vm.createContext({URL,URLSearchParams,Intl,Date,console,UnicPillars:require('../four-pillars'),location:{href:'https://example.com/?private=discard#old'}});vm.runInContext(source,c);
vm.runInContext(`
const found=new Map();let seed=42;function rand(){seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;}
for(let i=0;i<50000&&found.size<12;i++){const a=[];TYPE_ORDER.forEach(q=>a[q]=1+Math.floor(rand()*5));a[36]=1;a[37]=1;st.ans=a;st.birth={date:'2000-02-29',noTime:true};const r=compute();if(!found.has(r.type.id))found.set(r.type.id,a);}
globalThis.testData={found:[...found.keys()],examples:[...found.values()],valid:['2000-02-29','2024-02-29','2025-04-30'].map(validateBirth),invalid:['','1900-02-29','2025-02-29','2024-04-31','2999-01-01'].map(validateBirth)};
`,c);
assert.equal(c.testData.found.length,12,'all types reachable');assert(c.testData.valid.every(x=>!x));assert(c.testData.invalid.every(Boolean));
vm.runInContext(`
for(let i=0;i<12;i++){
 st.res={type:{n:i},sub:{n:(i+1)%12}};
 const u=new URL(resultUrl()),r=parseShared(u.search);
 if(r.type!==i||r.sub!==(i+1)%12)throw Error('share roundtrip');
 if([...u.searchParams.keys()].join(',')!=='type,sub')throw Error('privacy');
 if(!resText(T[i]).includes(resultUrl()))throw Error('share text');
}
for(const s of ['?type=99&sub=01','?type=01&sub=01','?type=01','?type=<script>&sub=02','?type=01&type=02&sub=03'])if(!parseShared(s).invalid)throw Error('invalid ID');
st.ans=testData.examples[0].slice();const original=compute();
for(let timing=1;timing<=5;timing++)for(let concern=1;concern<=5;concern++){
 st.ans[36]=timing;st.ans[37]=concern;const r=compute();
 if(r.type.n!==original.type.n||r.sub.n!==original.sub.n)throw Error('service answers influence animal');
 const html=actionHTML(r);if((timing<=2)!==html.includes('結婚相談所という選択肢'))throw Error('marriage targeting');
}
st.birth={date:'1980-01-01',time:'12:34',noTime:false};if(compute().type.n!==original.type.n||!compute().sh.day)throw Error('birthday affects animal');
st.ans[37]=1;const a=compute();st.ans[37]=3;const b=compute();if(a.type.n!==b.type.n||a.recommendation.main===b.recommendation.main)throw Error('personal advice');
if(safeHttps('javascript:alert(1)')||safeHttps('http://example.com'))throw Error('unsafe config URL');
if(!consultationHTML().includes('disabled')||!officialLineHTML().includes('disabled'))throw Error('missing URL handling');
`,c);
fs.writeFileSync(__dirname+'/examples.json',JSON.stringify(c.testData.examples));console.log('PASS: date/leap-year checks; all 12 types reachable; share URLs/privacy/invalid IDs; 25 service combinations independent from types; birth independence; personalized advice; missing and unsafe configuration URLs.');
