/* Instagramはブラウザから自動投稿しません。生成後のユーザー操作で保存・OS共有。 */
let storyObjectURL='';
async function makeStory(){
  const output=document.getElementById('story-output');if(!output||!st.res)return;
  output.textContent='ストーリーズ用画像を作成しています…';
  const type=T[st.res.type.n],canvas=document.createElement('canvas');canvas.width=1080;canvas.height=1920;
  const ctx=canvas.getContext('2d');if(!ctx)throw Error('Canvas unavailable');
  if(document.fonts)await document.fonts.ready;
  const img=new Image();img.src=IMGS[type.id];await img.decode();
  ctx.fillStyle='#FFF8F1';ctx.fillRect(0,0,1080,1920);
  ctx.fillStyle=type.c;ctx.globalAlpha=.2;ctx.beginPath();ctx.arc(970,80,420,0,Math.PI*2);ctx.fill();ctx.beginPath();ctx.arc(50,1750,360,0,Math.PI*2);ctx.fill();ctx.globalAlpha=1;
  ctx.fillStyle='#2B2430';ctx.textAlign='center';ctx.font='bold 74px sans-serif';ctx.fillText('unic MEET',540,170);
  ctx.font='bold 32px sans-serif';ctx.fillText('LOVE TYPE 12',540,232);
  ctx.fillStyle='#fff';ctx.beginPath();ctx.roundRect(90,300,900,1030,64);ctx.fill();
  // Draw the full, individually generated 1254px illustration without cropping.
  const ratio=Math.min(640/img.naturalWidth,670/img.naturalHeight),w=img.naturalWidth*ratio,h=img.naturalHeight*ratio;
  ctx.drawImage(img,(1080-w)/2,345,w,h);
  ctx.fillStyle='#fffdf4';ctx.fillRect(340,1010,400,50);ctx.fillStyle='#2B2430';ctx.font='bold 32px sans-serif';ctx.fillText('unic MEET',540,1045);
  function wrapped(text,y,size,maxWidth,lineHeight){ctx.font=`bold ${size}px sans-serif`;let line='';for(const char of text){if(ctx.measureText(line+char).width>maxWidth){ctx.fillText(line,540,y);y+=lineHeight;line='';}line+=char;}if(line)ctx.fillText(line,540,y);return y+lineHeight;}
  const end=wrapped(type.nm,1110,52,790,72);wrapped(type.catch,end+25,32,780,48);
  ctx.fillStyle='#2B2430';ctx.font='bold 65px sans-serif';ctx.fillText('あなたは何タイプ？',540,1470);
  ctx.fillStyle='#FF5C86';ctx.beginPath();ctx.roundRect(135,1540,810,130,36);ctx.fill();ctx.fillStyle='#fff';ctx.font='bold 48px sans-serif';ctx.fillText('unic MEETで無料診断',540,1623);
  ctx.fillStyle='#6F6577';ctx.font='28px sans-serif';ctx.fillText('恋をもっと、あなたらしく。',540,1755);
  const blob=await new Promise((resolve,reject)=>canvas.toBlob(b=>b?resolve(b):reject(Error('PNG unavailable')),'image/png'));
  if(!output.isConnected)return;
  if(storyObjectURL)URL.revokeObjectURL(storyObjectURL);storyObjectURL=URL.createObjectURL(blob);
  output.replaceChildren();
  const preview=document.createElement('img');preview.src=storyObjectURL;preview.alt=type.nm+' Instagramストーリーズ用画像';preview.width=1080;preview.height=1920;
  const download=document.createElement('a');download.className='btn ghost small';download.href=storyObjectURL;download.download=`unic-meet-${type.id}-story.png`;download.textContent='画像を保存する';
  const note=document.createElement('p');note.className='soft';note.textContent='1080×1920px。画像を保存してInstagramストーリーズから選んでください。iPhoneでは画像の長押しから保存できる場合もあります。共有先の選択肢は端末によって異なります。';
  output.append(preview,download);
  const file=new File([blob],download.download,{type:'image/png'});
  let canShare=false;try{canShare=!!navigator.canShare&&navigator.canShare({files:[file]});}catch{}
  if(canShare){const share=document.createElement('button');share.className='btn ghost small';share.textContent='スマートフォンの共有機能を使う';share.addEventListener('click',async()=>{try{await navigator.share({files:[file],title:'unic MEET 恋愛タイプ診断'});}catch(e){if(e.name!=='AbortError')toast('共有できませんでした。画像の保存をご利用ください。');}});output.append(share);}
  output.append(note);
}
