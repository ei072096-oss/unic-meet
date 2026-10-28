const assert=require('node:assert/strict'),p=require('../four-pillars');
const b=(date,time,noTime=false,zone='Asia/Tokyo')=>p.calculate({date,time,noTime,zone});
assert.deepEqual(b('2005-12-23','08:37',false,'Asia/Shanghai').candidates,[{year:'乙酉',month:'戊子'}]);assert.equal(b('2005-12-23','08:37',false,'Asia/Shanghai').day,'辛巳');assert.equal(b('2005-12-23','08:37',false,'Asia/Shanghai').hour,'壬辰');
assert.deepEqual(b('2024-02-04','17:26').candidates,[{year:'癸卯',month:'乙丑'}]);assert.deepEqual(b('2024-02-04','17:28').candidates,[{year:'甲辰',month:'丙寅'}]);assert.equal(b('2024-02-04','',true).candidates.length,2);assert.equal(b('2024-02-04','',true).hour,null);
assert.deepEqual(b('2024-03-05','11:21').candidates,[{year:'甲辰',month:'丙寅'}]);assert.deepEqual(b('2024-03-05','11:24').candidates,[{year:'甲辰',month:'丁卯'}]);
assert.deepEqual(b('2024-02-04','16:28',false,'Asia/Shanghai').candidates,b('2024-02-04','17:28').candidates);
assert.equal(p.instants('2024-03-10','02:30','America/New_York').length,0);assert.equal(p.instants('2024-11-03','01:30','America/New_York').length,2);
assert.throws(()=>b('2024-03-10','02:30',false,'America/New_York'));assert.throws(()=>b('2023-02-29','12:00'));assert.throws(()=>b('1899-12-31','12:00'));assert.throws(()=>b('2024-01-01','12:00',false,'Invalid/Zone'));
assert.equal(b('2000-01-07','12:00').day,'甲子');assert.equal(b('2000-01-07','23:59').day,'甲子');assert.equal(b('2000-01-08','00:00').day,'乙丑');assert.equal(b('2000-01-07','23:59').hour,'甲子');assert.equal(b('2000-01-08','00:00').hour,'丙子');
const G='甲乙丙丁戊己庚辛壬癸',B='子丑寅卯辰巳午未申酉戌亥';
for(let i=0;i<120;i++){const date=new Date(Date.UTC(1900+i, i%12, i%27+1)),str=date.toISOString().slice(0,10),jdn=Math.floor(date/86400000)+2440588,idx=((jdn+49)%60+60)%60;assert.equal(p.day(str),G[idx%10]+B[idx%12]);}
let passed=0;global.test=(name,fn)=>{fn();passed++;};global.expect=x=>({toBe:y=>assert.equal(x,y),toStrictEqual:y=>assert.deepEqual(x,y)});require('./upstream/EightChar.cjs');require('./upstream/JieQi.cjs');
console.log(`PASS: ${passed} upstream EightChar/JieQi tests; Japanese exact Lichun/Jingzhe boundaries; zone equivalence, DST gap/fold, civil-midnight convention, unknown-hour candidates, 120 independent JDN day fixtures.`);
const {Solar}=require('../vendor/lunar-1.7.7.js');const reference=require('./solar-reference.json');let largest=0;
for(const f of reference.fixtures){const t=Solar.fromYmd(f.year,6,1).getLunar().getJieQiTable()[f.name],time=Date.UTC(t.getYear(),t.getMonth()-1,t.getDay(),t.getHour()-8,t.getMinute(),t.getSecond()),error=Math.abs(time-Date.parse(f.referenceUTC))/1000;largest=Math.max(largest,error);assert(error<f.toleranceSeconds);}
console.log(`PASS: ${reference.fixtures.length} independent astronomical solar-term fixtures, maximum discrepancy ${largest.toFixed(3)} seconds.`);
