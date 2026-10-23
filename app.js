/* LINGOVERSE v2 — استبدل محتوى app.js كاملًا بهذا الملف.
   الصور في نفس مجلد index.html: station.png, alex-pico.png, cafe.png,
   forest.png, castle.png, treasure-island.png, خريطة العالم.png
*/
const STORY={title:"The Missing Bag",titleAr:"الحقيبة المفقودة",scenes:[
{en:"Alex is at the train station. He is waiting for his train.",ar:"أليكس في محطة القطار. إنه ينتظر قطاره.",vocab:[{en:"station",ar:"محطة"},{en:"train",ar:"قطار"},{en:"waiting",ar:"ينتظر"}],ch:{type:"match",q:"طابق كل كلمة بمعناها:",pairs:[["station","محطة"],["train","قطار"],["waiting","ينتظر"]],hint:"فكّر في المشهد: محطة، قطار، وانتظار."}},
{en:"He sees a small blue bag under the bench.",ar:"يرى حقيبة زرقاء صغيرة تحت المقعد.",vocab:[{en:"bag",ar:"حقيبة"},{en:"bench",ar:"مقعد"},{en:"under",ar:"تحت"}],ch:{type:"choice",q:"Where is the bag?",opts:["On the train","Under the bench","In the cafe"],ans:1,hint:"الحقيبة تحت المقعد: under the bench."}},
{en:"A woman is near the bench. ‘Is this your bag?’",ar:"امرأة قريبة من المقعد. يسأل أليكس: هل هذه حقيبتك؟",vocab:[{en:"woman",ar:"امرأة"},{en:"near",ar:"قريب من"},{en:"your",ar:"ـك (ملكك)"}],ch:{type:"order",q:"رتّب الكلمات لتكوّن سؤال أليكس:",words:["bag?","your","this","Is"],ans:"Is this your bag?",hint:"السؤال يبدأ بـ Is، ثم this، ثم your، ثم bag."}},
{en:"The woman looks at the bag. ‘Yes! It is my bag. Thank you!’",ar:"تنظر المرأة إلى الحقيبة: نعم! إنها حقيبتي. شكراً لك!",vocab:[{en:"my",ar:"ـي (ملكي)"},{en:"Thank you",ar:"شكراً لك"},{en:"You're welcome",ar:"عفواً"}],ch:{type:"listen",say:"You're welcome.",q:"استمع ثم اختر ما سمعته:",opts:["Good morning.","You're welcome.","I am a train."],ans:1,hint:"You're welcome هي ردّ على Thank you."}},
{en:"She smiles. ‘Have a nice day, Alex!’ Alex goes to his train.",ar:"تبتسم: أتمنى لك يوماً جميلاً يا أليكس! ويذهب أليكس إلى قطاره.",vocab:[{en:"smile",ar:"يبتسم / ابتسامة"},{en:"nice",ar:"جميل / لطيف"},{en:"day",ar:"يوم"}],ch:{type:"choice",q:"Have a nice ___!",opts:["day","bag","train"],ans:0,hint:"Have a nice day تعني: أتمنى لك يوماً جميلاً."}}
]};
const KEY='lingoverse_v1',LEVELS=[0,40,100,180,280,400],SCENE_XP=10,STORY_XP=20;
const ISLANDS=[
{name:'محطة البداية',en:'Starting Station',img:'station.png',desc:'التحيات، المحطة والأسئلة البسيطة',open:true},
{name:'جزيرة الكنز',en:'Treasure Island',img:'treasure-island.png',desc:'الاتجاهات والأفعال والألغاز'},
{name:'جزيرة المقهى',en:'The Cafe',img:'cafe.png',desc:'الطلبات والأرقام والأسعار'},
{name:'جزيرة الغابة',en:'The Forest',img:'forest.png',desc:'الحيوانات والألوان والطعام'},
{name:'القلعة',en:'The Castle',img:'castle.png',desc:'مغامرة هروب وألغاز ممتعة'}
];
function defaults(){return{xp:0,done:[],cur:0,finished:false,sound:true,sfx:true}}
function load(){try{let s=JSON.parse(localStorage.getItem(KEY));if(s&&typeof s.xp==='number'&&Array.isArray(s.done)&&Number.isInteger(s.cur)&&s.cur>=0&&s.cur<STORY.scenes.length)return Object.assign(defaults(),s)}catch(e){}return defaults()}
let S=load(),view='home',answered=false,picked=[],wrong=[],fb='',fbOk=false,mSel=null,mDone=[],mOrder=[],fresh=true,AC;
const app=document.getElementById('app');

const css=document.createElement('style');
css.textContent=`
:root{--bg:#fdf6e3;--card:#fffaf0;--ink:#3b2f2f;--sub:#7a6a5a;--main:#d9722b;--ok:#2e8b57;--bad:#c0392b;--line:#eadfc8}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--ink);font-family:system-ui,sans-serif;line-height:1.6}
button{font-family:inherit}
#app{max-width:520px;margin:auto;padding:14px 14px 38px}
.top{display:flex;justify-content:space-between;gap:8px}
.badge{background:var(--card);border:1px solid var(--line);border-radius:20px;padding:5px 12px;font-weight:800}
.bar{height:9px;background:var(--line);border-radius:8px;overflow:hidden;margin:7px 0}
.bar i{display:block;height:100%;background:var(--main);transition:width .4s}
.small{font-size:.85rem;color:var(--sub)}
.brand{text-align:center;margin:10px}
.brand h1{font-size:2rem;color:#a94d1b;margin:0}
.tagline{direction:ltr;font-size:.85rem;color:var(--sub)}
.hero{background:linear-gradient(145deg,#ffe9c7,#f7c98b);border-radius:22px;padding:14px;text-align:center;margin:12px 0}
.hero img{width:100%;max-height:210px;object-fit:contain}
.hero h2{font-size:1.2rem;margin:5px}
.btn{display:block;width:100%;min-height:50px;border:0;border-radius:15px;background:var(--main);color:#fff;font-size:1.08rem;font-weight:800;padding:11px;margin:10px 0;cursor:pointer}
.btn.ghost{background:var(--card);color:var(--ink);border:1px solid var(--line)}
.btn:disabled{opacity:.45}
.card{background:var(--card);border:1px solid var(--line);border-radius:17px;padding:13px;margin:11px 0}
.art{border-radius:18px;overflow:hidden;border:1px solid var(--line);margin:10px 0;background:#dcebf0}
.art img{width:100%;height:auto;max-height:260px;object-fit:cover;display:block}
.island-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:10px 0}
.island{border:1px solid var(--line);border-radius:15px;overflow:hidden;background:var(--card)}
.island img{display:block;width:100%;height:105px;object-fit:cover;background:#e8eee9}
.inside{padding:8px}
.inside b{display:block}
.enname{direction:ltr;text-align:right;font-size:.72rem;color:var(--sub)}
.desc{font-size:.78rem;color:var(--sub);line-height:1.4}
.status{display:inline-block;background:#e3f4e8;color:#267543;border-radius:12px;padding:2px 7px;font-size:.72rem;margin-top:5px;font-weight:700}
.soon{background:#f4ead7;color:#93601c}
.section-title{font-weight:850;margin:16px 2px 5px}
.en{direction:ltr;text-align:left;font-size:1.1rem;font-weight:650}
.ar{color:var(--sub);margin-top:6px}
.v{display:flex;justify-content:space-between;align-items:center;gap:8px;padding:7px 0;border-bottom:1px dashed var(--line)}
.v:last-child{border:0}
.icon{border:0;background:transparent;font-size:1.2rem;min-width:42px;min-height:42px}
.dots{display:flex;justify-content:center;gap:7px;margin:10px}
.dot{width:11px;height:11px;border-radius:50%;background:var(--line)}
.dot.on{background:var(--ok)}
.dot.cur{outline:2px solid var(--main);outline-offset:2px}
.opt{display:block;width:100%;min-height:48px;text-align:left;direction:ltr;background:white;border:2px solid var(--line);border-radius:12px;padding:10px;margin:8px 0;font-size:1rem}
.opt.right{border-color:var(--ok);background:#e6f6ec}
.opt.wrong{border-color:var(--bad);background:#fdecea}
.words{display:flex;flex-wrap:wrap;gap:8px;direction:ltr;min-height:46px;margin:8px 0}
.w{border:2px solid var(--line);background:white;border-radius:12px;padding:9px 12px;font-size:1rem;min-height:42px}
.slot{border:2px dashed var(--line);border-radius:12px;padding:8px}
.match{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:10px 0}
.col{display:flex;flex-direction:column;gap:8px}
.mb{min-height:46px;border:2px solid var(--line);background:white;border-radius:12px;padding:7px 3px}
.mb.sel{border-color:var(--main);background:#fff1e2}
.mb.ok{border-color:var(--ok);background:#e6f6ec}
.fb{padding:12px;border-radius:13px;margin:10px 0;font-weight:650}
.fb.ok{background:#e6f6ec;color:var(--ok)}
.fb.no{background:#fdecea;color:var(--bad)}
.fx{position:fixed;bottom:25%;font-size:1.5rem;pointer-events:none;animation:floatup 1.3s forwards}
@keyframes floatup{to{transform:translateY(-230px);opacity:0}}
@media(max-width:360px){#app{padding:10px}.island img{height:85px}}
@media(prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}}
`;
document.head.appendChild(css);

function save(){try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}}
function tone(f,t,d,type,v){
 if(!S.sfx)return;
 try{
  AC=AC||(window.AudioContext||window.webkitAudioContext)&&new(window.AudioContext||window.webkitAudioContext)();
  if(!AC)return;
  if(AC.state==='suspended')AC.resume();
  let o=AC.createOscillator(),g=AC.createGain();
  o.type=type||'sine';o.frequency.value=f;o.connect(g);g.connect(AC.destination);
  let n=AC.currentTime+t;g.gain.setValueAtTime(v||.12,n);
  g.gain.exponentialRampToValueAtTime(.001,n+d);o.start(n);o.stop(n+d+.02);
 }catch(e){}
}
const sfx={
 tap(){tone(520,0,.05,'square',.04)},
 ok(){tone(660,0,.15);tone(880,.12,.25)},
 bad(){tone(220,0,.22,'triangle',.1)},
 win(){[523,659,784,1047].forEach((f,i)=>tone(f,i*.12,.25))}
};
function burst(){
 ['⭐','✨','🎉'].forEach(x=>{
  for(let i=0;i<4;i++){
   let e=document.createElement('span');e.className='fx';e.textContent=x;
   e.style.left=(10+Math.random()*78)+'%';
   e.style.animationDelay=(Math.random()*.2)+'s';
   document.body.appendChild(e);setTimeout(()=>e.remove(),1500);
  }
 });
}
function levelOf(x){let l=1;LEVELS.forEach((t,i)=>{if(x>=t)l=i+1});return l}
function levelInfo(x){let l=levelOf(x),lo=LEVELS[l-1],hi=LEVELS[l];return{l,pct:hi===undefined?100:Math.round((x-lo)/(hi-lo)*100),left:hi===undefined?0:hi-x}}
function learned(){return S.done.reduce((n,i)=>n+(STORY.scenes[i]?.vocab.length||0),0)}
function speak(t){
 if(!S.sound||!('speechSynthesis'in window))return;
 try{speechSynthesis.cancel();let u=new SpeechSynthesisUtterance(t);u.lang='en-US';u.rate=.85;speechSynthesis.speak(u)}catch(e){}
}
function speakScene(){speak(STORY.scenes[S.cur].en)}
function speakWord(i){speak(STORY.scenes[S.cur].vocab[i].en)}
function speakListen(){speak(STORY.scenes[S.cur].ch.say)}
function toggleSound(){S.sound=!S.sound;save();render()}
function toggleSfx(){S.sfx=!S.sfx;save();render()}
function topBar(){
 let l=levelInfo(S.xp);
 return `<div class="top"><span class="badge">⭐ المستوى ${l.l}</span><span class="badge">${S.xp} XP</span></div>
 <div class="bar"><i style="width:${l.pct}%"></i></div>
 <div class="small">${l.left?'تبقّى '+l.left+' XP للمستوى التالي':'وصلت لأعلى مستوى حالياً'}</div>`;
}
function image(src,alt){
 return `<img src="${src}" alt="${alt}" loading="lazy" onerror="this.onerror=null;this.style.display='none'">`;
}
function renderHome(){
 let label=S.finished?'اقرأ القصة مرة أخرى':S.done.length?'تابع المغامرة':'ابدأ المغامرة';
 let cards=ISLANDS.map(x=>`<div class="island">${image(x.img,x.name)}
 <div class="inside"><b>${x.name}</b><div class="enname">${x.en}</div>
 <div class="desc">${x.desc}</div>
 <span class="status ${x.open?'':'soon'}">${x.open?'متاحة الآن':'🔒 قريباً'}</span></div></div>`).join('');
 app.innerHTML=`${topBar()}
 <div class="brand"><h1>LINGOVERSE</h1><div class="tagline">Learn English • Explore • Grow</div></div>
 <div class="hero">${image('alex-pico.png','أليكس وبيكو')}
 <h2>مغامرتك لتعلّم الإنجليزية تبدأ هنا!</h2>
 <div class="small">رافق أليكس ورفيقه بيكو، وتعلّم كلمات جديدة وافتح عوالم أخرى.</div></div>
 <div class="card"><b>🎒 ${STORY.titleAr}</b> <span class="small" dir="ltr">(${STORY.title})</span>
 <div class="small">المشاهد المكتملة: ${S.done.length} / ${STORY.scenes.length} · الكلمات المتعلَّمة: ${learned()}</div>
 <button class="btn" onclick="startStory()">${label} ▶</button></div>
 <div class="section-title">🗺️ خريطة عالم LINGOVERSE</div>
 <div class="art">${image('خريطة%20العالم.png','خريطة عالم لينغوفيرس')}</div>
 <div class="section-title">🏝️ جزر المغامرة</div><div class="island-grid">${cards}</div>
 <div class="card small">💡 استمع للجمل الإنجليزية وحاول الإجابة عن التحديات لتحصل على نقاط XP.</div>
 <button class="btn ghost" onclick="toggleSound()">${S.sound?'🔊 نطق الإنجليزية: مفعّل':'🔇 نطق الإنجليزية: متوقف'}</button>
 <button class="btn ghost" onclick="toggleSfx()">${S.sfx?'🎵 المؤثرات الصوتية: مفعّلة':'🔕 المؤثرات الصوتية: متوقفة'}</button>
 <button class="btn ghost" onclick="resetAll()">إعادة ضبط التقدم</button>`;
}
function resetScene(){
 answered=false;picked=[];wrong=[];fb='';fbOk=false;mSel=null;mDone=[];
 fresh=true;let c=STORY.scenes[S.cur].ch;mOrder=c.pairs?shuffle(c.pairs.length):[];
}
function shuffle(n){
 let a=[...Array(n).keys()];
 for(let i=n-1;i>0;i--){let j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}
 return a;
}
function startStory(){if(S.finished)S.cur=0;resetScene();view='scene';save();sfx.tap();render(true)}
function resetAll(){
 if(confirm('هل تريد حذف كل التقدم؟')){
  let a=S.sound,b=S.sfx;S=defaults();S.sound=a;S.sfx=b;save();view='home';render(true);
 }
}
function renderScene(){
 let sc=STORY.scenes[S.cur],ch=sc.ch;
 let dots=STORY.scenes.map((_,i)=>`<span class="dot ${S.done.includes(i)?'on':''} ${i===S.cur?'cur':''}"></span>`).join('');
 let vocab=sc.vocab.map((v,i)=>`<div class="v"><span><b>${v.en}</b> — ${v.ar}</span><button class="icon" onclick="speakWord(${i})">🔊</button></div>`).join('');
 let challenge='';
 const opts=()=>ch.opts.map((o,i)=>`<button class="opt ${answered&&i===ch.ans?'right':wrong.includes(i)?'wrong':''}" onclick="pick(${i})" ${answered||wrong.includes(i)?'disabled':''}>${o}</button>`).join('');
 if(ch.type==='choice')challenge=`<div class="en">${ch.q}</div>${opts()}`;
 else if(ch.type==='listen')challenge=`<div>${ch.q}</div><button class="btn ghost" onclick="speakListen()">▶ استمع</button>${opts()}`;
 else if(ch.type==='match'){
  let a=ch.pairs.map((p,i)=>`<button class="mb ${mDone.includes(i)?'ok':mSel===i?'sel':''}" dir="ltr" onclick="mLeft(${i})" ${mDone.includes(i)||answered?'disabled':''}>${p[0]}</button>`).join('');
  let b=mOrder.map(j=>`<button class="mb ${mDone.includes(j)?'ok':''}" onclick="mRight(${j})" ${mDone.includes(j)||answered?'disabled':''}>${ch.pairs[j][1]}</button>`).join('');
  challenge=`${ch.q}<div class="match"><div class="col">${a}</div><div class="col">${b}</div></div>`;
 }else{
  let a=picked.map(i=>`<button class="w" onclick="unpick(${i})">${ch.words[i]}</button>`).join('');
  let b=ch.words.map((w,i)=>picked.includes(i)?'':`<button class="w" onclick="addWord(${i})">${w}</button>`).join('');
  challenge=`${ch.q}<div class="words slot">${a||'&nbsp;'}</div><div class="words">${b}</div><button class="btn" onclick="checkOrder()" ${picked.length===ch.words.length?'':'disabled'}>تحقّق</button>`;
 }
 let imageName=S.cur===0?'station.png':'alex-pico.png';
 app.innerHTML=`${topBar()}<div class="dots">${dots}</div>
 <div class="art">${image(imageName,'مشهد من مغامرة أليكس')}</div>
 <div class="card"><div class="en">${sc.en} <button class="icon" onclick="speakScene()">🔊</button></div><div class="ar">${sc.ar}</div></div>
 <div class="card"><b>📘 كلمات مهمة</b>${vocab}</div>
 <div class="card"><b>🧩 تحدٍّ صغير</b>${challenge}</div>
 ${fb?`<div class="fb ${fbOk?'ok':'no'}">${fb}</div>`:''}
 ${answered?`<button class="btn" onclick="next()">${S.cur<STORY.scenes.length-1?'المشهد التالي ←':'إنهاء القصة 🎉'}</button>`:''}
 <button class="btn ghost" onclick="goHome()">العودة إلى الخريطة الرئيسية</button>`;
}
function mLeft(i){if(answered||mDone.includes(i))return;mSel=i;render()}
function mRight(j){
 if(answered||mSel===null||mDone.includes(j))return;
 let c=STORY.scenes[S.cur].ch;
 if(mSel===j){mDone.push(j);mSel=null;fb='';if(mDone.length===c.pairs.length)correct();else{sfx.ok();render()}}
 else{mSel=null;sfx.bad();fb='ليس تماماً 🙂 '+c.hint+' جرّب مرة أخرى.';fbOk=false;render()}
}
function pick(i){
 if(answered)return;let c=STORY.scenes[S.cur].ch;
 if(i===c.ans)correct();
 else{wrong.push(i);sfx.bad();fb='ليس تماماً 🙂 '+c.hint+' جرّب مرة أخرى.';fbOk=false;render()}
}
function addWord(i){if(!answered&&!picked.includes(i)){picked.push(i);fb='';render()}}
function unpick(i){if(!answered){picked=picked.filter(x=>x!==i);render()}}
function checkOrder(){
 let c=STORY.scenes[S.cur].ch;
 if(picked.map(i=>c.words[i]).join(' ')===c.ans)correct();
 else{picked=[];sfx.bad();fb='ليس تماماً 🙂 '+c.hint+' جرّب مرة أخرى.';fbOk=false;render()}
}
function correct(){
 answered=true;let before=levelOf(S.xp),msg='أحسنت! إجابة صحيحة ✅';
 if(!S.done.includes(S.cur)){S.done.push(S.cur);S.xp+=SCENE_XP;msg+=' (+'+SCENE_XP+' XP)'}
 else msg+=' (أنجزت هذا المشهد سابقاً، بدون XP إضافي)';
if(levelOf(S.xp)>before)msg+=' 🎉 ارتقيت إلى المستوى '+levelOf(S.xp)+'!';
fb=msg;fbOk=true;save();
if(levelOf(S.xp)>before)sfx.up();else sfx.ok();
if(typeof burst==='function')burst();
render();
}
function next(){
if(S.cur<STORY.scenes.length-1){S.cur++;resetScene();save();render(true);return}
if(!S.finished){S.finished=true;S.xp+=(typeof STORY_XP!=='undefined'?STORY_XP:20)}
S.cur=0;view='home';save();if(sfx.win)sfx.win();render(true);
}
render(true);
