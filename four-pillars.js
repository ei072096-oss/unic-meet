/* Browser-local Four Pillars. Solar terms from lunar-javascript 1.7.7 (MIT).
   Year/month: exact jie instants in UTC+08 library convention, converted from birth zone.
   Day: local civil midnight; hour: local standard/civil clock, not true solar time.
   No birth data is transmitted or persisted. */
(function(root,factory){const api=factory(typeof module==='object'&&module.exports?require('./vendor/lunar-1.7.7.js'):root);if(typeof module==='object'&&module.exports)module.exports=api;else root.UnicPillars=api;})(typeof globalThis!=='undefined'?globalThis:this,function(lib){
 const G='甲乙丙丁戊己庚辛壬癸',B='子丑寅卯辰巳午未申酉戌亥',ELEMENTS=['木','木','火','火','土','土','金','金','水','水'];
 const formats=new Map();
 function parts(ms,zone){if(!formats.has(zone))formats.set(zone,new Intl.DateTimeFormat('en-CA',{timeZone:zone,calendar:'iso8601',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit',hourCycle:'h23'}));return Object.fromEntries(formats.get(zone).formatToParts(new Date(ms)).filter(p=>p.type!=='literal').map(p=>[p.type,Number(p.value)]));}
 function civilMs(p){return Date.UTC(p.year,p.month-1,p.day,p.hour||0,p.minute||0,p.second||0);}
 function instants(date,time,zone){
  const [year,month,day]=date.split('-').map(Number),[hour,minute]=time.split(':').map(Number),want={year,month,day,hour,minute,second:0},base=civilMs(want),offsets=new Set();
  for(const hours of [-36,-24,-12,0,12,24,36]){const probe=base+hours*3600000;offsets.add(civilMs(parts(probe,zone))-probe);}
  return [...offsets].map(offset=>base-offset).filter(ms=>Object.entries(want).every(([k,v])=>parts(ms,zone)[k]===v)).sort((a,b)=>a-b);
 }
 function atInstant(ms){const d=new Date(ms+8*3600000);return lib.Solar.fromYmdHms(d.getUTCFullYear(),d.getUTCMonth()+1,d.getUTCDate(),d.getUTCHours(),d.getUTCMinutes(),d.getUTCSeconds()).getLunar();}
 function pair(ms){const l=atInstant(ms);return{year:l.getYearInGanZhiExact(),month:l.getMonthInGanZhiExact()};}
 function day(date){const [y,m,d]=date.split('-').map(Number);return lib.Solar.fromYmd(y,m,d).getLunar().getDayInGanZhiExact2();}
 function hour(date,time){const dg=G.indexOf(day(date)[0]),[h]=time.split(':').map(Number),branch=Math.floor((h+1)%24/2);return G[(dg%5*2+branch)%10]+B[branch];}
 function calculate(birth){
  if(!birth||!/^\d{4}-\d{2}-\d{2}$/.test(birth.date))throw Error('生年月日を確認してください。');
  const [y,m,d]=birth.date.split('-').map(Number),check=new Date(Date.UTC(y,m-1,d));
  if(y<1900||y>2099||check.getUTCFullYear()!==y||check.getUTCMonth()+1!==m||check.getUTCDate()!==d)throw Error('四柱推命の対応範囲は1900〜2099年の実在する日付です。');
  const zone=birth.zone||'Asia/Tokyo';parts(Date.UTC(y,m-1,d),zone);
  const known=!!birth.time&&!birth.noTime;if(known&&!/^([01]\d|2[0-3]):[0-5]\d$/.test(birth.time))throw Error('出生時刻をご確認ください。');
  const dateDay=day(birth.date);let candidates=[];
  if(known){const times=instants(birth.date,birth.time,zone);if(!times.length)throw Error('夏時間の切り替えなどで存在しない時刻です。出生時刻とタイムゾーンをご確認ください。');candidates=times.map(pair);}
  else{
   let start=[],end=[];
   for(let h=0;h<24&&!start.length;h++)start=instants(birth.date,String(h).padStart(2,'0')+':00',zone);
   for(let h=23;h>=0&&!end.length;h--)end=instants(birth.date,String(h).padStart(2,'0')+':59',zone);
   if(!start.length||!end.length)throw Error('この出生地では存在しない日付です。タイムゾーンをご確認ください。');
   candidates=[pair(start[0]),pair(end.at(-1))];
  }
  candidates=candidates.filter((p,i,a)=>a.findIndex(q=>p.year===q.year&&p.month===q.month)===i);
  return{day:dateDay,stem:dateDay[0],element:ELEMENTS[G.indexOf(dateDay[0])],zone,known,hour:known?hour(birth.date,birth.time):null,candidates,ambiguous:candidates.length>1,convention:'出生地の時計の時刻・日柱は0時切替・真太陽時補正なし'};
 }
 return {calculate,instants,day,hour};
});
