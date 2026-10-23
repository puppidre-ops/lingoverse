const STORIES = {
  bag: { id: "bag", title: "The Missing Bag", titleAr: "الحقيبة المفقودة", img: "station.png", scenes: [
    { en: "Alex is at the train station. He is waiting for his train.", ar: "أليكس في محطة القطار. إنه ينتظر قطاره.",
      vocab: [{ en: "station", ar: "محطة" }, { en: "train", ar: "قطار" }, { en: "waiting", ar: "ينتظر" }],
      ch: { type: "match", q: "طابق كل كلمة بمعناها:", pairs: [["station", "محطة"], ["train", "قطار"], ["waiting", "ينتظر"]], hint: "فكّر في المشهد: محطة، قطار، وانتظار." } },
    { en: "He sees a small blue bag under the bench.", ar: "يرى حقيبة زرقاء صغيرة تحت المقعد.",
      vocab: [{ en: "bag", ar: "حقيبة" }, { en: "bench", ar: "مقعد (في الأماكن العامة)" }, { en: "under", ar: "تحت" }],
      ch: { type: "choice", q: "Where is the bag?", opts: ["On the train", "Under the bench", "In the cafe"], ans: 1, hint: "اقرأ الجملة مرة أخرى: the bag is under the bench، أي تحت المقعد." } },
    { en: "A woman is near the bench. Alex asks, “Is this your bag?”", ar: "امرأة قريبة من المقعد. يسأل أليكس: هل هذه حقيبتك؟",
      vocab: [{ en: "woman", ar: "امرأة" }, { en: "near", ar: "قريب من" }, { en: "your", ar: "ـك (ملكك)" }],
      ch: { type: "order", q: "رتّب الكلمات لتكوّن سؤال أليكس:", words: ["bag?", "your", "this", "Is"], ans: "Is this your bag?", hint: "السؤال يبدأ بـ Is، ثم this، ثم your، ثم bag." } },
    { en: "The woman looks at the bag. “Yes! It is my bag. Thank you!”", ar: "تنظر المرأة إلى الحقيبة: نعم! إنها حقيبتي. شكراً لك!",
      vocab: [{ en: "my", ar: "ـي (ملكي)" }, { en: "Thank you", ar: "شكراً لك" }, { en: "You're welcome", ar: "عفواً / على الرحب" }],
      ch: { type: "listen", say: "You're welcome.", q: "اضغط ▶ واستمع، ثم اختر ما سمعته:", opts: ["Good morning.", "You're welcome.", "I am a train."], ans: 1, hint: "الجملة المسموعة هي You're welcome، وهي ردّ على Thank you." } },
    { en: "She smiles. “Have a nice day, Alex!” Alex goes to his train.", ar: "تبتسم: أتمنى لك يوماً جميلاً يا أليكس! ويذهب أليكس إلى قطاره.",
      vocab: [{ en: "smile", ar: "يبتسم / ابتسامة" }, { en: "nice", ar: "جميل / لطيف" }, { en: "day", ar: "يوم" }],
      ch: { type: "choice", q: "Have a nice ___ !", opts: ["day", "bag", "train"], ans: 0, hint: "Have a nice day تعني: أتمنى لك يوماً جميلاً." } }
  ] },
  cafe: { id: "cafe", title: "A Coffee for Alex", titleAr: "قهوة لأليكس", img: "cafe.png", scenes: [
    { en: "Alex is at the cafe. He is thirsty. He looks at the menu.", ar: "أليكس في المقهى. إنه عطشان. ينظر إلى قائمة الطعام.",
      vocab: [{ en: "cafe", ar: "مقهى" }, { en: "thirsty", ar: "عطشان" }, { en: "menu", ar: "قائمة الطعام" }],
      ch: { type: "match", q: "طابق كل كلمة بمعناها:", pairs: [["cafe", "مقهى"], ["thirsty", "عطشان"], ["menu", "قائمة الطعام"]], hint: "أليكس في المقهى، وهو عطشان، وينظر إلى القائمة." } },
    { en: "The waiter asks, “What would you like?” Alex says, “A coffee, please.”", ar: "يسأل النادل: ماذا تريد؟ يقول أليكس: قهوة من فضلك.",
      vocab: [{ en: "waiter", ar: "نادل" }, { en: "coffee", ar: "قهوة" }, { en: "please", ar: "من فضلك" }],
      ch: { type: "choice", q: "The waiter asks: “What would you like?” Alex says:", opts: ["A coffee, please.", "I am a train.", "Under the bench."], ans: 0, hint: "السؤال عمّا يريده، فنجيب بما نطلبه: A coffee, please." } },
    { en: "“How much is it?” “It is three dollars.” Alex pays and says, “Thank you!”", ar: "كم ثمنها؟ ثمنها ثلاثة دولارات. يدفع أليكس ويقول: شكراً لك!",
      vocab: [{ en: "How much", ar: "كم الثمن" }, { en: "pay", ar: "يدفع" }, { en: "dollar", ar: "دولار" }],
      ch: { type: "order", q: "رتّب الكلمات لتسأل عن الثمن:", words: ["much", "How", "is", "it?"], ans: "How much is it?", hint: "نبدأ بـ How، ثم much، ثم is، ثم it." } }
  ] }
};

const ISLANDS = [
  { id: "station", name: "محطة البداية", en: "Start Station", img: "station.png", lvl: 1, story: "bag", desc: "تحيات وأماكن وأسئلة بسيطة." },
  { id: "cafe", name: "جزيرة المقهى", en: "Café Island", img: "cafe.png", lvl: 2, story: "cafe", desc: "اطلب قهوتك وتعلّم الأسعار." },
  { id: "forest", name: "الغابة", en: "The Forest", img: "forest.png", lvl: 3, desc: "حيوانات وألوان وطبيعة." },
  { id: "treasure", name: "جزيرة الكنز", en: "Treasure Island", img: "treasure-island.png", lvl: 4, desc: "اتجاهات وأفعال في رحلة البحث عن الكنز." },
  { id: "castle", name: "القلعة", en: "The Castle", img: "castle.png", lvl: 5, desc: "مغامرة هروب بألغاز إنجليزية." }
];

const KEY = "lingoverse_v1";
const LEVELS = [0, 40, 100, 180, 280, 400];
const SCENE_XP = 10, STORY_XP = 20;

function defaults() { return { xp: 0, prog: {}, last: "bag", sound: true, sfx: true, revCorrect: 0, rev: { d: "", w: [] } }; }
function load() {
  try {
    const s = JSON.parse(localStorage.getItem(KEY));
    if (s && typeof s.xp === "number") {
      const d = Object.assign(defaults(), s);
      if (!d.prog || typeof d.prog !== "object") d.prog = {};
      if (!d.prog.bag && Array.isArray(s.done)) {
        d.prog.bag = { done: s.done.filter(Number.isInteger), cur: Number.isInteger(s.cur) ? s.cur : 0, finished: !!s.finished };
      }
      return d;
    }
  } catch (e) {}
  return defaults();
}
function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} }

let S = load();
let view = "home", arg = "", sid = "bag", endInfo = null, qz = null;
let answered = false, picked = [], wrong = [], fb = "", fbOk = false, mSel = null, mDone = [], mOrder = [];
const app = document.getElementById("app");

/* ---------- styles ---------- */
const st = document.createElement("style");
st.textContent = `
:root{--navy:#12264a;--navy2:#1d3a6e;--gold:#f6b93b}
#app{max-width:560px!important;padding:12px 12px 100px!important}
button{font-family:inherit}
.hd{display:flex;align-items:center;gap:8px;margin-bottom:12px}
.logo{font-weight:900;font-size:1.45rem;line-height:1;color:var(--main);direction:ltr;text-shadow:0 2px 0 #7a3f1a;flex:none}
.logo small{display:block;font-size:.55rem;font-weight:700;color:var(--navy);text-shadow:none;margin-top:3px}
.xpp{flex:1;min-width:0;background:var(--navy);color:#fff;border-radius:18px;padding:7px 10px;display:flex;align-items:center;gap:8px}
.lvb{width:34px;height:38px;flex:none;background:var(--gold);color:var(--navy);font-weight:900;border-radius:9px 9px 17px 17px;display:flex;align-items:center;justify-content:center}
.xpp .m{flex:1;min-width:0}.xpp .t{font-size:.78rem;font-weight:700;direction:ltr;text-align:left}
.xpp .b{height:8px;background:#ffffff33;border-radius:6px;overflow:hidden;margin-top:4px}.xpp .b i{display:block;height:100%;background:var(--gold)}
.gear{border:0;background:var(--navy);color:#fff;width:42px;height:42px;border-radius:14px;font-size:1.2rem;cursor:pointer;flex:none}
.heroc{position:relative;border-radius:22px;overflow:hidden;min-height:200px;background:linear-gradient(135deg,#bfe3f7,#f7e0b0);margin-bottom:12px;box-shadow:0 6px 18px rgba(18,38,74,.2)}
.heroc img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:left center}
.heroc::after{content:"";position:absolute;inset:0;background:linear-gradient(270deg,rgba(18,38,74,.9) 0%,rgba(18,38,74,.6) 55%,rgba(18,38,74,0) 85%)}
.heroc .tx{position:relative;z-index:1;width:64%;padding:18px 16px;color:#fff}
.heroc h2{margin:0 0 8px;font-size:1.3rem;line-height:1.4}.heroc p{margin:0;font-size:.9rem;opacity:.95}
img{max-width:100%}
.mapc{position:relative;border-radius:20px;overflow:hidden;margin-bottom:12px;box-shadow:0 6px 18px rgba(18,38,74,.2);cursor:pointer;background:#bfe3f7}
.mapc img{display:block;width:100%;height:auto;max-height:300px;object-fit:cover}
.chip{position:absolute;top:10px;inset-inline-start:10px;background:var(--navy);color:#fff;border-radius:14px;padding:6px 12px;font-weight:700;font-size:.9rem}
.cont{background:var(--navy);color:#fff;border-radius:20px;padding:12px;display:flex;flex-wrap:wrap;gap:12px;margin-bottom:12px}
.cont img{width:92px;height:92px;border-radius:14px;object-fit:cover;flex:none}
.cont .ct{flex:1;min-width:0}.cont .nm{font-weight:800;font-size:1.05rem;text-align:left}
.sm{font-size:.82rem;opacity:.85;margin-top:3px}
.pb{height:8px;background:#ffffff33;border-radius:6px;overflow:hidden;margin:8px 0}.pb i{display:block;height:100%;background:var(--gold)}
.pn .pb{background:var(--line)}.pn .pb i{background:var(--main)}.pn .sm{color:var(--sub);opacity:1}
.go{width:100%;min-height:48px;border:0;border-radius:14px;background:var(--main);color:#fff;font-size:1.05rem;font-weight:800;cursor:pointer}
.tri{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:12px}
.tri button{background:var(--navy);color:#fff;border:0;border-radius:16px;padding:10px 8px;text-align:start;cursor:pointer;min-height:130px}
.tri b{font-size:1.6rem;display:block}.tri h4{margin:4px 0 2px;font-size:.9rem}.tri p{margin:0;font-size:.72rem;opacity:.8}.tri span{font-size:.75rem;font-weight:700;color:var(--gold)}
.st{margin:14px 0 8px;font-size:1.1rem}
.ig{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.isl{border:2px solid var(--line);background:var(--card);border-radius:18px;overflow:hidden;padding:0;text-align:start;cursor:pointer}
.isl.open,.isl.done{border-color:var(--main)}
.isl img{display:block;width:100%;height:110px;object-fit:cover}.isl.locked img{filter:grayscale(.7) brightness(.8)}
.isl .in{padding:8px 10px}.en2{direction:ltr;text-align:start;font-size:.78rem;color:var(--sub)}
.chip2{display:inline-block;margin-top:6px;font-size:.75rem;font-weight:700;padding:2px 10px;border-radius:12px;background:var(--line);color:var(--sub)}
.chip2.open{background:#fff1e2;color:var(--main2)}.chip2.done{background:#e6f6ec;color:var(--ok)}
.pn{background:var(--card);border:1px solid var(--line);border-radius:18px;padding:14px;margin:12px 0}.pn p{margin:6px 0}
.back{background:none;border:0;color:var(--navy);font-weight:800;font-size:1rem;padding:8px 0;cursor:pointer;min-height:44px}
.bigimg{display:block;width:100%;height:190px;object-fit:cover;border-radius:20px}
.row{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:10px 0;border-bottom:1px dashed var(--line)}.row:last-child{border:0}
.row .e{direction:ltr;font-weight:700}
.ach{opacity:.45}.ach.ok{opacity:1}
.stat{display:grid;grid-template-columns:1fr 1fr;gap:8px}.stat div{background:var(--navy);color:#fff;border-radius:14px;padding:10px;text-align:center}.stat b{display:block;font-size:1.3rem;color:var(--gold)}
.nav{position:fixed;bottom:0;left:50%;transform:translateX(-50%);width:100%;max-width:560px;background:var(--navy);display:flex;justify-content:space-around;padding:8px 6px calc(8px + env(safe-area-inset-bottom,0px));border-radius:20px 20px 0 0;z-index:20}
.nav button{background:none;border:0;color:#9fb0d0;display:flex;flex-direction:column;align-items:center;gap:2px;font-size:.78rem;min-width:64px;min-height:48px;cursor:pointer}
.nav button b{font-size:1.4rem;line-height:1}.nav button.on{color:var(--gold);font-weight:800}
.art{border-radius:20px;overflow:hidden;border:1px solid var(--line);margin:10px 0;background:var(--card)}.art img{display:block;width:100%;height:190px;object-fit:cover}
.match{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:10px 0}.match .col{display:flex;flex-direction:column;gap:8px}
.mb{min-height:48px;border:2px solid var(--line);background:#fff;border-radius:12px;font-size:1.05rem;padding:8px;cursor:pointer}
.mb.sel{border-color:var(--main);background:#fff1e2}.mb.ok{border-color:var(--ok);background:#e6f6ec;opacity:.75}
.opt.rtl{direction:rtl;text-align:center}
.fx{position:fixed;bottom:25%;font-size:1.7rem;pointer-events:none;animation:floatup 1.4s ease-out forwards;z-index:30}
@keyframes floatup{to{transform:translateY(-280px) rotate(40deg);opacity:0}}
@media (prefers-reduced-motion:reduce){.fx{display:none}}
`;
document.head.appendChild(st);

/* ---------- helpers ---------- */
function img(n, a) { return `<img src="${n}" alt="${a}" loading="lazy" decoding="async" onerror="this.onerror=null;this.style.visibility='hidden'">`; }
let AC;
function tone(f, t, d, type, v) {
  if (!S.sfx) return;
  try {
    AC = AC || new (window.AudioContext || window.webkitAudioContext)();
    if (AC.state === "suspended") AC.resume();
    const o = AC.createOscillator(), g = AC.createGain();
    o.type = type || "sine"; o.frequency.value = f; o.connect(g); g.connect(AC.destination);
    const n = AC.currentTime + t;
    g.gain.setValueAtTime(v || 0.15, n); g.gain.exponentialRampToValueAtTime(0.001, n + d);
    o.start(n); o.stop(n + d + 0.02);
  } catch (e) {}
}
const sfx = {
  ok() { tone(660, 0, .15); tone(880, .12, .3); },
  bad() { tone(220, 0, .25, "triangle", .12); },
  tap() { tone(520, 0, .06, "square", .04); },
  up() { [523, 659, 784, 1047].forEach((f, i) => tone(f, i * .12, .3)); },
  win() { [523, 659, 784, 659, 784, 1047].forEach((f, i) => tone(f, i * .14, .3)); }
};
function burst() {
  const e = ["⭐", "✨", "🎉"];
  for (let i = 0; i < 14; i++) {
    const s = document.createElement("span");
    s.className = "fx"; s.textContent = e[i % 3];
    s.style.left = (8 + Math.random() * 80) + "%"; s.style.animationDelay = (Math.random() * .25) + "s";
    document.body.appendChild(s); setTimeout(() => s.remove(), 1800);
  }
}
function say(t) {
  if (!S.sound || !("speechSynthesis" in window)) return;
  try { speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance(t); u.lang = "en-US"; u.rate = 0.85; speechSynthesis.speak(u); } catch (e) {}
}
function shuffle(n) {
  const a = [...Array(n).keys()];
  for (let t = 0; t < 10; t++) {
    for (let i = n - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    if (n < 2 || a.some((v, i) => v !== i)) break;
  }
  return a;
}

/* ---------- data logic ---------- */
function levelOf(xp) { let l = 1; LEVELS.forEach((t, i) => { if (xp >= t) l = i + 1; }); return l; }
function levelInfo(xp) {
  const l = levelOf(xp), lo = LEVELS[l - 1], hi = LEVELS[l];
  return { l, pct: hi === undefined ? 100 : Math.round(((xp - lo) / (hi - lo)) * 100) };
}
function P(id) {
  const n = STORIES[id].scenes.length; let p = S.prog[id];
  if (!p || !Array.isArray(p.done)) p = S.prog[id] = { done: [], cur: 0, finished: false };
  if (!Number.isInteger(p.cur) || p.cur < 0 || p.cur >= n) p.cur = 0;
  return p;
}
function learnedWords() {
  const out = [];
  Object.keys(STORIES).forEach(id => P(id).done.forEach(i => {
    const sc = STORIES[id].scenes[i];
    if (sc) sc.vocab.forEach(v => { if (!out.some(o => o.en === v.en)) out.push(v); });
  }));
  return out;
}
function totalWords() { return Object.keys(STORIES).reduce((n, k) => n + STORIES[k].scenes.reduce((m, s) => m + s.vocab.length, 0), 0); }
function revToday() {
  const t = new Date().toISOString().slice(0, 10);
  if (!S.rev || S.rev.d !== t || !Array.isArray(S.rev.w)) S.rev = { d: t, w: [] };
  return S.rev;
}
function storyOpen(id) { const i = ISLANDS.find(x => x.story === id); return !i || levelOf(S.xp) >= i.lvl; }
function islSt(i) {
  const ok = levelOf(S.xp) >= i.lvl;
  if (i.story) return P(i.story).finished ? "done" : (ok ? "open" : "locked");
  return ok ? "soon" : "locked";
}
function chipTxt(i, s) { return s === "done" ? "✓ اكتملت" : s === "open" ? "متاحة الآن" : s === "soon" ? "قريباً" : "🔒 المستوى " + i.lvl; }
function achievements() {
  const w = learnedWords().length, ids = Object.keys(STORIES);
  const sc = ids.reduce((n, k) => n + P(k).done.length, 0), fin = ids.filter(k => P(k).finished).length;
  return [
    { i: "🌱", t: "أول مشهد", d: "أنجز مشهداً واحداً", ok: sc >= 1 },
    { i: "📖", t: "أول قصة", d: "أنهِ قصة كاملة", ok: fin >= 1 },
    { i: "🔤", t: "10 كلمات", d: "تعلّم 10 كلمات", ok: w >= 10 },
    { i: "⭐", t: "المستوى 2", d: "اصل إلى المستوى 2", ok: levelOf(S.xp) >= 2 },
    { i: "🎯", t: "5 مراجعات ناجحة", d: "5 إجابات صحيحة في تحدي الكلمات", ok: S.revCorrect >= 5 },
    { i: "☕", t: "زائر المقهى", d: "أنهِ قصة المقهى", ok: P("cafe").finished }
  ];
}
function contInfo() {
  let id = STORIES[S.last] ? S.last : "bag";
  if (P(id).finished || !storyOpen(id)) {
    id = Object.keys(STORIES).find(k => !P(k).finished && storyOpen(k));
    if (!id) return null;
  }
  const st = STORIES[id], p = P(id), n = st.scenes.length;
  return { id, st, p, n, pct: Math.round(p.done.length / n * 100), xp: SCENE_XP * (n - p.done.length) + STORY_XP };
}

/* ---------- navigation ---------- */
function go(v, a) { view = v; if (a !== undefined) arg = a; sfx.tap(); render(true); }
function openCont() { const c = contInfo(); if (c) openStory(c.id); else go("map"); }
function openStory(id) {
  if (!STORIES[id] || !storyOpen(id)) return;
  sid = id; S.last = id; const p = P(id); if (p.finished) p.cur = 0;
  sfx.tap(); resetScene(); view = "scene"; save(); render(true);
}
function tabOf() {
  return { home: "home", end: "home", map: "map", island: "map", learn: "learn", words: "learn", quiz: "learn", ach: "learn", me: "me" }[view] || "home";
}
function nav() {
  const t = tabOf();
  const b = (id, ic, tx) => `<button class="${t === id ? "on" : ""}" onclick="go('${id}')"><b>${ic}</b>${tx}</button>`;
  return `<nav class="nav">${b("home", "🏠", "الرئيسية")}${b("map", "🗺️", "الخريطة")}${b("learn", "📖", "تعلّمي")}${b("me", "👤", "حسابي")}</nav>`;
}
function render(top) {
  if (top) window.scrollTo(0, 0);
  const V = { home: rHome, map: rMap, learn: rLearn, me: rMe, island: rIsland, scene: rScene, end: rEnd, words: rWords, quiz: rQuiz, ach: rAch };
  try {
    app.innerHTML = (V[view] || rHome)() + (view === "scene" ? "" : nav());
  } catch (e) {
    if (typeof showErr === "function") showErr("RENDER ERROR (" + view + "): " + e.message);
    view = "home";
  }
}

/* ---------- screens ---------- */
function hdr() {
  const li = levelInfo(S.xp), hi = LEVELS[li.l];
  return `<div class="hd"><div class="logo">LINGOVERSE<small>Learn English • Explore • Grow</small></div>
  <div class="xpp"><span class="lvb">${li.l}</span><span class="m"><div class="t">${S.xp}${hi !== undefined ? " / " + hi : ""} XP</div><div class="b"><i style="width:${li.pct}%"></i></div></span></div>
  <button class="gear" onclick="go('me')" aria-label="الإعدادات">⚙️</button></div>`;
}
function contCard() {
  const c = contInfo();
  if (!c) return `<div class="cont"><div class="ct"><b>🎉 أنهيت كل القصص المتاحة</b><div class="sm">افتح الخريطة لترى الجزر القادمة.</div></div><button class="go" onclick="go('map')">افتح الخريطة ›</button></div>`;
  return `<div class="cont">${img(c.st.img, c.st.titleAr)}<div class="ct"><b>📖 واصل التعلّم</b><div class="nm" dir="ltr">${c.st.title}</div>
  <div class="sm">${c.st.titleAr} · المشهد ${c.p.cur + 1} / ${c.n}</div><div class="pb"><i style="width:${c.pct}%"></i></div><div class="sm">نقاط ممكنة: +${c.xp} XP</div></div>
  <button class="go" onclick="openStory('${c.id}')">${c.p.done.length ? "تابع المغامرة" : "ابدأ المغامرة"} ›</button></div>`;
}
function tri() {
  const w = learnedWords().length, tw = totalWords(), a = achievements(), au = a.filter(x => x.ok).length, rv = revToday().w.length;
  return `<div class="tri">
  <button onclick="startQuiz()"><b>🎯</b><h4>تحدي الكلمات</h4><p>اختبر معرفتك</p><div class="pb"><i style="width:${Math.min(100, rv * 20)}%"></i></div><span>${rv} / 5 اليوم</span></button>
  <button onclick="go('words')"><b>📘</b><h4>كلماتي</h4><p>راجع كلماتك</p><div class="pb"><i style="width:${tw ? Math.round(w / tw * 100) : 0}%"></i></div><span>${w} / ${tw}</span></button>
  <button onclick="go('ach')"><b>🏆</b><h4>إنجازاتي</h4><p>شاهد تقدمك</p><div class="pb"><i style="width:${Math.round(au / a.length * 100)}%"></i></div><span>${au} / ${a.length}</span></button></div>`;
}
function rHome() {
  return hdr() + `<div class="heroc">${img("alex-pico.png", "أليكس وبيكو")}<div class="tx"><h2>مغامرتك لتعلّم الإنجليزية تبدأ هنا!</h2><p>رافق أليكس وبيكو، وتعلّم كلمات جديدة وافتح عوالم أخرى.</p></div></div>
  <div class="mapc" onclick="go('map')"><span class="chip">🧭 خريطة العالم</span>${img("world-map.png", "خريطة العالم")}</div>${contCard()}${tri()}`;
}
function rMap() {
  const cards = ISLANDS.map(i => { const s = islSt(i);
    return `<button class="isl ${s}" onclick="go('island','${i.id}')">${img(i.img, i.name)}<div class="in"><b>${i.name}</b><div class="en2">${i.en}</div><span class="chip2 ${s}">${chipTxt(i, s)}</span></div></button>`; }).join("");
  return hdr() + `<h3 class="st">🗺️ خريطة العالم</h3><div class="mapc" style="cursor:default">${img("world-map.png", "خريطة العالم")}</div><h3 class="st">🏝️ الجزر</h3><div class="ig">${cards}</div>`;
}
function rIsland() {
  const i = ISLANDS.find(x => x.id === arg) || ISLANDS[0], s = islSt(i); let body;
  if (i.story && s !== "locked") {
    const st = STORIES[i.story], p = P(i.story), n = st.scenes.length;
    body = `<div class="pn"><b>📖 ${st.titleAr}</b> <span class="sm" dir="ltr">(${st.title})</span><div class="pb"><i style="width:${Math.round(p.done.length / n * 100)}%"></i></div>
    <div class="sm">المشاهد المكتملة: ${p.done.length} / ${n}${p.finished ? " · القصة مكتملة 🏆" : ""}</div>
    <button class="btn" onclick="openStory('${st.id}')">${p.finished ? "اقرأ القصة مرة أخرى" : p.done.length ? "تابع القصة" : "ابدأ القصة"} ▶</button></div>`;
  } else if (s === "locked") {
    const need = Math.max(0, LEVELS[i.lvl - 1] - S.xp);
    body = `<div class="pn"><b>🔒 جزيرة مغلقة</b><p>تفتح عند المستوى ${i.lvl}. تحتاج إلى ${need} XP إضافية.</p><button class="btn" onclick="openCont()">واصل التعلّم لجمع النقاط</button></div>`;
  } else body = `<div class="pn"><b>🚧 قريباً</b><p>الجزيرة مفتوحة لك، لكن قصتها قيد الإعداد.</p></div>`;
  return `<button class="back" onclick="go('map')">→ رجوع إلى الخريطة</button>${img(i.img, i.name).replace("<img", '<img class="bigimg"')}
  <h2 style="margin:10px 0 0">${i.name}</h2><div class="en2">${i.en}</div><p>${i.desc}</p><span class="chip2 ${s}">${chipTxt(i, s)}</span>${body}`;
}
function rLearn() {
  const list = Object.keys(STORIES).map(id => { const st = STORIES[id], p = P(id), n = st.scenes.length, ok = storyOpen(id), isl = ISLANDS.find(x => x.story === id);
    return `<div class="pn"><b>${st.titleAr}</b> <span class="sm" dir="ltr">(${st.title})</span><div class="pb"><i style="width:${Math.round(p.done.length / n * 100)}%"></i></div>
    <div class="sm">${p.done.length} / ${n} مشاهد${p.finished ? " · مكتملة 🏆" : ""}</div>
    ${ok ? `<button class="btn" onclick="openStory('${id}')">${p.finished ? "اقرأ مرة أخرى" : p.done.length ? "تابع" : "ابدأ"} ▶</button>` : `<div class="sm">🔒 تفتح عند المستوى ${isl.lvl}</div>`}</div>`; }).join("");
  return hdr() + `<h3 class="st">📚 قصصي</h3>${list}<h3 class="st">🧩 تدرّب</h3>${tri()}`;
}
function rMe() {
  const li = levelInfo(S.xp), ids = Object.keys(STORIES);
  const sc = ids.reduce((n, k) => n + P(k).done.length, 0), fin = ids.filter(k => P(k).finished).length;
  return hdr() + `<h3 class="st">👤 حسابي</h3><div class="stat"><div><b>${li.l}</b>المستوى</div><div><b>${S.xp}</b>XP</div><div><b>${sc}</b>مشاهد مكتملة</div><div><b>${fin}</b>قصص مكتملة</div><div><b>${learnedWords().length}</b>كلمات متعلَّمة</div><div><b>${S.revCorrect}</b>مراجعات صحيحة</div></div>
  <h3 class="st">⚙️ الإعدادات</h3>
  <button class="btn ghost" onclick="toggle('sound')">${S.sound ? "🔊 نطق الإنجليزية: مفعّل" : "🔇 نطق الإنجليزية: متوقف"}</button>
  <button class="btn ghost" onclick="toggle('sfx')">${S.sfx ? "🎵 المؤثرات الصوتية: مفعّلة" : "🔕 المؤثرات الصوتية: متوقفة"}</button>
  <button class="btn ghost" onclick="go('ach')">🏆 إنجازاتي</button>
  <button class="btn ghost" onclick="resetAll()">إعادة ضبط التقدم</button>`;
}
function toggle(k) { S[k] = !S[k]; save(); if (k === "sfx") sfx.tap(); render(); }
function resetAll() {
  if (confirm("هل تريد حذف كل التقدم؟")) { const a = S.sound, b = S.sfx; S = defaults(); S.sound = a; S.sfx = b; save(); view = "home"; render(true); }
}
function rWords() {
  const ws = learnedWords();
  const rows = ws.length ? ws.map((w, i) => `<div class="row"><span><span class="e">${w.en}</span> — ${w.ar}</span><button class="icon" onclick="sayW(${i})" aria-label="نطق">🔊</button></div>`).join("")
    : `<p>لا توجد كلمات بعد. أنجز مشهداً من قصة لتظهر كلماته هنا.</p><button class="btn" onclick="openCont()">ابدأ التعلّم ▶</button>`;
  return `<button class="back" onclick="go('learn')">→ رجوع</button><h3 class="st">📘 كلماتي (${ws.length} / ${totalWords()})</h3><div class="pn">${rows}</div>`;
}
function sayW(i) { const w = learnedWords()[i]; if (w) say(w.en); }
function rAch() {
  const a = achievements();
  return `<button class="back" onclick="go('learn')">→ رجوع</button><h3 class="st">🏆 إنجازاتي (${a.filter(x => x.ok).length} / ${a.length})</h3>
  <div class="pn">${a.map(x => `<div class="row ach ${x.ok ? "ok" : ""}"><span>${x.i} <b>${x.t}</b><div class="sm">${x.d}</div></span><span>${x.ok ? "✅" : "🔒"}</span></div>`).join("")}</div>`;
}
function rEnd() {
  const st = STORIES[endInfo ? endInfo.sid : sid], c = contInfo();
  return hdr() + `<div class="heroc">${img("alex-pico.png", "أليكس وبيكو")}<div class="tx"><h2>🎉 انتهت القصة!</h2><p>${st.titleAr}</p></div></div>
  ${endInfo && endInfo.first ? `<div class="fb ok pop">+${STORY_XP} XP لإتمام القصة لأول مرة 🏆</div>` : ""}
  <div class="pn">الكلمات المتعلَّمة: <b>${learnedWords().length}</b><br>المجموع: <b>${S.xp} XP</b></div>
  ${c ? `<button class="btn" onclick="openStory('${c.id}')">القصة التالية: ${c.st.titleAr} ▶</button>` : ""}
  <button class="btn ghost" onclick="go('map')">العودة إلى الخريطة</button>`;
}

/* ---------- word challenge ---------- */
function startQuiz() {
  const ws = learnedWords(); view = "quiz"; qz = null;
  if (ws.length >= 3) {
    const pool = shuffle(ws.length).map(i => ws[i]).slice(0, 5);
    const list = pool.map(w => {
      const others = shuffle(ws.length).map(i => ws[i]).filter(o => o.ar !== w.ar).slice(0, 2);
      const opts = [w, ...others], ord = shuffle(opts.length);
      return { w, opts: ord.map(i => opts[i].ar), ans: ord.indexOf(0) };
    });
    qz = { list, i: 0, score: 0, xp: 0, picked: null };
  }
  sfx.tap(); render(true);
}
function quizPick(k) {
  if (!qz || qz.picked !== null) return;
  const q = qz.list[qz.i]; qz.picked = k;
  if (k === q.ans) {
    S.revCorrect++; qz.score++; sfx.ok();
    const r = revToday();
    if (!r.w.includes(q.w.en)) { r.w.push(q.w.en); S.xp += 2; qz.xp += 2; }
  } else sfx.bad();
  save(); render();
}
function quizNext() { qz.i++; qz.picked = null; if (qz.i >= qz.list.length) sfx.win(); render(true); }
function rQuiz() {
  let b;
  if (!qz) b = `<div class="pn"><b>🎯 تحدي الكلمات</b><p>تحتاج 3 كلمات على الأقل. أنجز بعض مشاهد القصة أولاً.</p><button class="btn" onclick="openCont()">ابدأ التعلّم ▶</button></div>`;
  else if (qz.i >= qz.list.length) b = `<div class="pn"><b>🏁 انتهى التحدي</b><p>النتيجة: ${qz.score} / ${qz.list.length}</p><p>${qz.xp ? "+" + qz.xp + " XP" : "لا نقاط إضافية: هذه الكلمات سبقت مراجعتها اليوم."}</p>
    <button class="btn" onclick="startQuiz()">تحدٍّ جديد</button><button class="btn ghost" onclick="go('learn')">رجوع</button></div>`;
  else {
    const q = qz.list[qz.i];
    const opts = q.opts.map((o, k) => `<button class="opt rtl ${qz.picked !== null && k === q.ans ? "right" : (qz.picked === k ? "wrong" : "")}" onclick="quizPick(${k})" ${qz.picked !== null ? "disabled" : ""}>${o}</button>`).join("");
    b = `<div class="pn"><div class="sm">السؤال ${qz.i + 1} / ${qz.list.length}</div><div class="en" style="font-size:1.4rem;text-align:center">${q.w.en} <button class="icon" onclick="say('${q.w.en.replace(/'/g, "\\'")}')" aria-label="نطق">🔊</button></div><p style="text-align:center">ما معنى هذه الكلمة؟</p>${opts}
    ${qz.picked !== null ? `<div class="fb ${qz.picked === q.ans ? "ok pop" : "no"}">${qz.picked === q.ans ? "أحسنت ✅" : "الجواب الصحيح: " + q.opts[q.ans]}</div><button class="btn" onclick="quizNext()">التالي ←</button>` : ""}</div>`;
  }
  return `<button class="back" onclick="go('learn')">→ رجوع</button><h3 class="st">🎯 تحدي الكلمات</h3>${b}`;
}

/* ---------- story scene ---------- */
function curSc() { return STORIES[sid].scenes[P(sid).cur]; }
function resetScene() {
  answered = false; picked = []; wrong = []; fb = ""; fbOk = false; mSel = null; mDone = [];
  const c = curSc().ch; mOrder = c.pairs ? shuffle(c.pairs.length) : [];
}
function speakScene() { say(curSc().en.replace(/[“”]/g, "")); }
function speakWord(i) { say(curSc().vocab[i].en); }
function speakListen() { say(curSc().ch.say); }
function rScene() {
  const story = STORIES[sid], p = P(sid), sc = curSc(), ch = sc.ch;
  const dots = story.scenes.map((_, i) => `<span class="dot ${p.done.includes(i) ? "on" : ""} ${i === p.cur ? "cur" : ""}"></span>`).join("");
  const vocab = sc.vocab.map((v, i) => `<div class="v"><span><b>${v.en}</b> — ${v.ar}</span><button class="icon" onclick="speakWord(${i})" aria-label="نطق">🔊</button></div>`).join("");
  const opts = () => ch.opts.map((o, i) => `<button class="opt ${answered && i === ch.ans ? "right" : (wrong.includes(i) ? "wrong" : "")}" onclick="pick(${i})" ${answered || wrong.includes(i) ? "disabled" : ""}>${o}</button>`).join("");
  let challenge;
  if (ch.type === "choice") challenge = `<div class="en" style="font-size:1.1rem">${ch.q}</div>${opts()}`;
  else if (ch.type === "listen") {
    const can = "speechSynthesis" in window && S.sound;
    challenge = `<div>${ch.q}</div>` + (can ? `<button class="btn ghost" onclick="speakListen()">▶ استمع</button>` : `<div class="card small">الصوت غير متاح. الجملة: <b dir="ltr">${ch.say}</b></div>`) + opts();
  } else if (ch.type === "match") {
    const L = ch.pairs.map((q, i) => `<button class="mb ${mDone.includes(i) ? "ok" : (mSel === i ? "sel" : "")}" dir="ltr" onclick="mLeft(${i})" ${mDone.includes(i) || answered ? "disabled" : ""}>${q[0]}</button>`).join("");
    const R = mOrder.map(j => `<button class="mb ${mDone.includes(j) ? "ok" : ""}" onclick="mRight(${j})" ${mDone.includes(j) || answered ? "disabled" : ""}>${ch.pairs[j][1]}</button>`).join("");
    challenge = `<div>${ch.q}</div><div class="match"><div class="col">${L}</div><div class="col">${R}</div></div>`;
  } else {
    const slot = picked.map(i => `<button class="w" onclick="unpick(${i})">${ch.words[i]}</button>`).join("");
    const pool = ch.words.map((w, i) => picked.includes(i) ? "" : `<button class="w" onclick="addWord(${i})">${w}</button>`).join("");
    challenge = `<div>${ch.q}</div><div class="words slot">${slot || "&nbsp;"}</div><div class="words">${pool}</div>` +
      (answered ? "" : `<button class="btn" onclick="checkOrder()" ${picked.length === ch.words.length ? "" : 'disabled style="opacity:.5"'}>تحقّق</button>`);
  }
  const pic = story.id === "cafe" ? "cafe.png" : (p.cur === 0 ? "station.png" : "alex-pico.png");
  return `<button class="back" onclick="go('home')">→ الرئيسية</button><div class="small">${story.titleAr} · المشهد ${p.cur + 1} / ${story.scenes.length}</div><div class="dots">${dots}</div>
  <div class="art">${img(pic, "مشهد من المغامرة")}</div>
  <div class="card"><div class="en">${sc.en} <button class="icon" onclick="speakScene()" aria-label="نطق">🔊</button></div><div class="ar">${sc.ar}</div></div>
  <div class="card"><b>📘 كلمات مهمة</b>${vocab}</div><div class="card"><b>🧩 تحدٍّ صغير</b>${challenge}</div>
  ${fb ? `<div class="fb ${fbOk ? "ok pop" : "no"}">${fb}</div>` : ""}
  ${answered ? `<button class="btn pop nextb" onclick="next()">${p.cur < story.scenes.length - 1 ? "المشهد التالي ←" : "إنهاء القصة 🎉"}</button>` : ""}`;
}
function wrongMsg(c) { sfx.bad(); fb = "ليس تماماً 🙂 " + c.hint + " جرّب مرة أخرى."; fbOk = false; render(); }
function mLeft(i) { if (answered || mDone.includes(i)) return; mSel = i; sfx.tap(); render(); }
function mRight(j) {
  if (answered || mSel === null || mDone.includes(j)) return;
  const c = curSc().ch;
  if (mSel === j) { mDone.push(j); mSel = null; fb = ""; if (mDone.length === c.pairs.length) correct(); else { sfx.ok(); render(); } }
  else { mSel = null; wrongMsg(c); }
}
function pick(i) {
  if (answered) return;
  const c = curSc().ch;
  if (i === c.ans) correct(); else { wrong.push(i); wrongMsg(c); }
}
function addWord(i) { if (!answered && !picked.includes(i)) { picked.push(i); fb = ""; sfx.tap(); render(); } }
function unpick(i) { if (!answered) { picked = picked.filter(x => x !== i); render(); } }
function checkOrder() {
  const c = curSc().ch;
  if (picked.map(i => c.words[i]).join(" ") === c.ans) correct(); else { picked = []; wrongMsg(c); }
}
function correct() {
  answered = true;
  const p = P(sid), before = levelOf(S.xp); let m = "أحسنت! إجابة صحيحة ✅";
  if (!p.done.includes(p.cur)) { p.done.push(p.cur); S.xp += SCENE_XP; m += " (+" + SCENE_XP + " XP)"; }
  else m += " (أنجزت هذا المشهد سابقاً، بدون XP إضافي)";
  const up = levelOf(S.xp) > before;
  if (up) m += " 🎉 ارتقيت إلى المستوى " + levelOf(S.xp) + "!";
  fb = m; fbOk = true; S.last = sid; save();
  if (up) sfx.up(); else sfx.ok();
  burst(); render();
  const b = document.querySelector(".nextb");
  if (b) setTimeout(() => b.scrollIntoView({ behavior: "smooth", block: "center" }), 80);
}
function next() {
  const p = P(sid), n = STORIES[sid].scenes.length;
  if (p.cur < n - 1) { p.cur++; resetScene(); save(); render(true); return; }
  let first = false;
  if (!p.finished) { p.finished = true; S.xp += STORY_XP; first = true; }
  endInfo = { sid, first }; p.cur = 0; S.last = sid; view = "end"; save(); sfx.win(); burst(); render(true);
}

render(true);
/* END */
