const STORY = {
  title: "The Missing Bag",
  titleAr: "الحقيبة المفقودة",
  scenes: [
    { en: "Alex is at the train station. He is waiting for his train.",
      ar: "أليكس في محطة القطار. إنه ينتظر قطاره.",
      vocab: [{ en: "station", ar: "محطة" }, { en: "train", ar: "قطار" }, { en: "waiting", ar: "ينتظر" }],
      ch: { type: "match", q: "طابق كل كلمة بمعناها:", pairs: [["station", "محطة"], ["train", "قطار"], ["waiting", "ينتظر"]],
            hint: "فكّر في المشهد: محطة، قطار، وانتظار." } },
    { en: "He sees a small blue bag under the bench.",
      ar: "يرى حقيبة زرقاء صغيرة تحت المقعد.",
      vocab: [{ en: "bag", ar: "حقيبة" }, { en: "bench", ar: "مقعد (في الأماكن العامة)" }, { en: "under", ar: "تحت" }],
      ch: { type: "choice", q: "Where is the bag?", opts: ["On the train", "Under the bench", "In the cafe"], ans: 1,
            hint: "اقرأ الجملة مرة أخرى: the bag is under the bench، أي تحت المقعد." } },
    { en: "A woman is near the bench. Alex asks, “Is this your bag?”",
      ar: "امرأة قريبة من المقعد. يسأل أليكس: هل هذه حقيبتك؟",
      vocab: [{ en: "woman", ar: "امرأة" }, { en: "near", ar: "قريب من" }, { en: "your", ar: "ـك (ملكك)" }],
      ch: { type: "order", q: "رتّب الكلمات لتكوّن سؤال أليكس:", words: ["bag?", "your", "this", "Is"], ans: "Is this your bag?",
            hint: "السؤال يبدأ بـ Is، ثم this، ثم your، ثم bag." } },
    { en: "The woman looks at the bag. “Yes! It is my bag. Thank you!”",
      ar: "تنظر المرأة إلى الحقيبة: نعم! إنها حقيبتي. شكراً لك!",
      vocab: [{ en: "my", ar: "ـي (ملكي)" }, { en: "Thank you", ar: "شكراً لك" }, { en: "You're welcome", ar: "عفواً / على الرحب" }],
      ch: { type: "listen", say: "You're welcome.", q: "اضغط ▶ واستمع، ثم اختر ما سمعته:", opts: ["Good morning.", "You're welcome.", "I am a train."], ans: 1,
            hint: "الجملة المسموعة هي You're welcome، وهي ردّ على Thank you." } },
    { en: "She smiles. “Have a nice day, Alex!” Alex goes to his train.",
      ar: "تبتسم: أتمنى لك يوماً جميلاً يا أليكس! ويذهب أليكس إلى قطاره.",
      vocab: [{ en: "smile", ar: "يبتسم / ابتسامة" }, { en: "nice", ar: "جميل / لطيف" }, { en: "day", ar: "يوم" }],
      ch: { type: "choice", q: "Have a nice ___ !", opts: ["day", "bag", "train"], ans: 0,
            hint: "Have a nice day تعني: أتمنى لك يوماً جميلاً." } }
  ]
};

const ISLANDS = [
  { name: "محطة البداية", en: "Start Station", img: "station.png", desc: "الحقيبة المفقودة: تحيات وأماكن وأسئلة بسيطة.", open: true },
  { name: "جزيرة المقهى", en: "Cafe Island", img: "cafe.png", desc: "اطلب قهوة وتعلّم الأرقام والأسعار.", open: false },
  { name: "جزيرة الكنز", en: "Treasure Island", img: "treasure-island.png", desc: "خريطة وكهف وكنز: الاتجاهات والأفعال.", open: false },
  { name: "جزيرة الغابة", en: "Forest Island", img: "forest.png", desc: "حيوانات وفواكه وألوان.", open: false },
  { name: "القلعة", en: "The Castle", img: "castle.png", desc: "مغامرة هروب بألغاز إنجليزية.", open: false }
];

const KEY = "lingoverse_v1";
const LEVELS = [0, 40, 100, 180, 280, 400];
const SCENE_XP = 10, STORY_XP = 20;

function defaults() { return { xp: 0, done: [], cur: 0, finished: false, sound: true, sfx: true }; }
function load() {
  try {
    const s = JSON.parse(localStorage.getItem(KEY));
    if (s && typeof s.xp === "number" && Array.isArray(s.done) &&
        Number.isInteger(s.cur) && s.cur >= 0 && s.cur < STORY.scenes.length) {
      return Object.assign(defaults(), s);
    }
  } catch (e) {}
  return defaults();
}
function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} }

let S = load();
let view = "home", answered = false, picked = [], wrong = [], fb = "", fbOk = false;
let mSel = null, mDone = [], mOrder = [];
const app = document.getElementById("app");

/* ---------- styles ---------- */
const st = document.createElement("style");
st.textContent = `
.art{border-radius:20px;overflow:hidden;border:1px solid var(--line);box-shadow:0 6px 18px rgba(90,60,20,.15);margin:10px 0;background:var(--card)}
.art img{display:block;width:100%;height:auto}
.brand{text-align:center;margin:8px 0}
.brand h1{margin:0;font-size:1.7rem}
.tagline{color:var(--sub);font-size:.9rem;direction:ltr}
.hero img{display:block;margin:0 auto;max-height:190px;width:auto;max-width:100%}
.hero h2{margin:10px 0 4px}
.section-title{font-weight:800;margin:18px 0 6px;font-size:1.1rem}
.island-grid{display:grid;grid-template-columns:1fr;gap:12px}
.island{border-radius:18px;overflow:hidden;border:1px solid var(--line);background:var(--card)}
.island.open{cursor:pointer;border-color:var(--main)}
.island img{display:block;width:100%;height:130px;object-fit:cover}
.island.locked img{filter:grayscale(.6) brightness(.85)}
.inside{padding:10px 12px}
.ename{direction:ltr;text-align:right;color:var(--sub);font-size:.85rem}
.desc{margin:4px 0;font-size:.95rem}
.status{display:inline-block;font-size:.8rem;padding:2px 10px;border-radius:12px;background:#e6f6ec;color:var(--ok)}
.status.soon{background:var(--line);color:var(--sub)}
.match{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:10px 0}
.match .col{display:flex;flex-direction:column;gap:8px}
.mb{min-height:48px;border:2px solid var(--line);background:#fff;border-radius:12px;font-size:1.05rem;padding:8px;cursor:pointer}
.mb.sel{border-color:var(--main);background:#fff1e2}
.mb.ok{border-color:var(--ok);background:#e6f6ec;opacity:.75}
.fx{position:fixed;bottom:25%;font-size:1.7rem;pointer-events:none;animation:floatup 1.4s ease-out forwards;z-index:9}
@keyframes floatup{to{transform:translateY(-280px) rotate(40deg);opacity:0}}
@media (prefers-reduced-motion:reduce){.fx{animation:none;display:none}}
`;
document.head.appendChild(st);

/* ---------- images (safe if a file is missing) ---------- */
function image(name, alt) {
  return `<img src="${name}" alt="${alt}" onerror="this.onerror=null;this.style.display='none'">`;
}

/* ---------- sound effects ---------- */
let AC;
function tone(f, t, d, type, v) {
  if (!S.sfx) return;
  try {
    AC = AC || new (window.AudioContext || window.webkitAudioContext)();
    if (AC.state === "suspended") AC.resume();
    const o = AC.createOscillator(), g = AC.createGain();
    o.type = type || "sine"; o.frequency.value = f;
    o.connect(g); g.connect(AC.destination);
    const n = AC.currentTime + t, vol = v || 0.15;
    g.gain.setValueAtTime(vol, n);
    g.gain.exponentialRampToValueAtTime(0.001, n + d);
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
    s.style.left = (8 + Math.random() * 80) + "%";
    s.style.animationDelay = (Math.random() * .25) + "s";
    document.body.appendChild(s);
    setTimeout(() => s.remove(), 1800);
  }
}

/* ---------- logic ---------- */
function levelOf(xp) { let l = 1; LEVELS.forEach((t, i) => { if (xp >= t) l = i + 1; }); return l; }
function levelInfo(xp) {
  const l = levelOf(xp), lo = LEVELS[l - 1], hi = LEVELS[l];
  const pct = hi === undefined ? 100 : Math.round(((xp - lo) / (hi - lo)) * 100);
  return { l, pct, left: hi === undefined ? 0 : hi - xp };
}
function learned() { return S.done.reduce((n, i) => n + (STORY.scenes[i] ? STORY.scenes[i].vocab.length : 0), 0); }

function speak(text) {
  if (!S.sound || !("speechSynthesis" in window)) return;
  try {
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "en-US"; u.rate = 0.85;
    speechSynthesis.speak(u);
  } catch (e) {}
}
function speakScene() { speak(STORY.scenes[S.cur].en.replace(/[“”]/g, "")); }
function speakWord(i) { speak(STORY.scenes[S.cur].vocab[i].en); }
function speakListen() { speak(STORY.scenes[S.cur].ch.say); }
function toggleSound() { S.sound = !S.sound; save(); render(); }
function toggleSfx() { S.sfx = !S.sfx; save(); sfx.tap(); render(); }

function shuffle(n) {
  const a = [...Array(n).keys()];
  for (let t = 0; t < 10; t++) {
    for (let i = n - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    if (n < 2 || a.some((v, i) => v !== i)) break;
  }
  return a;
}
function resetScene() {
  answered = false; picked = []; wrong = []; fb = ""; fbOk = false; mSel = null; mDone = [];
  const c = STORY.scenes[S.cur].ch;
  mOrder = c.pairs ? shuffle(c.pairs.length) : [];
}

function render(top) {
  if (top) window.scrollTo(0, 0);
  if (view === "scene") renderScene();
  else if (view === "end") renderEnd();
  else renderHome();
}

function topBar() {
  const li = levelInfo(S.xp);
  return `<div class="top"><span class="badge">⭐ المستوى ${li.l}</span><span class="badge">${S.xp} XP</span></div>
  <div class="bar"><i style="width:${li.pct}%"></i></div>
  <div class="small">${li.left ? "تبقّى " + li.left + " XP للمستوى التالي" : "وصلت لأعلى مستوى حالياً"}</div>`;
}

function renderHome() {
  const label = S.finished ? "اقرأ القصة مرة أخرى" : (S.done.length === 0 ? "ابدأ القصة" : "تابع القصة");
  const cards = ISLANDS.map(x => `<div class="island ${x.open ? "open" : "locked"}" ${x.open ? 'onclick="startStory()"' : ""}>${image(x.img, x.name)}
    <div class="inside"><b>${x.name}</b><div class="ename">${x.en}</div><div class="desc">${x.desc}</div>
    <span class="status ${x.open ? "" : "soon"}">${x.open ? "متاحة الآن" : "قريباً 🔒"}</span></div></div>`).join("");
  app.innerHTML = `${topBar()}
  <div class="brand"><h1>LINGOVERSE</h1><div class="tagline">Learn English • Explore • Grow</div></div>
  <div class="hero">${image("alex-pico.png", "أليكس")}<h2>مغامرتك لتعلّم الإنجليزية تبدأ هنا!</h2>
  <div class="small">رافق أليكس، وتعلّم كلمات جديدة وافتح عوالم أخرى.</div></div>
  <div class="card"><b>🎒 ${STORY.titleAr}</b> <span class="small" dir="ltr">(${STORY.title})</span>
  <div class="small">المشاهد المكتملة: ${S.done.length} / ${STORY.scenes.length} · الكلمات المتعلَّمة: ${learned()}</div>
  <button class="btn" onclick="startStory()">${label} ▶</button></div>
  <div class="section-title">🗺️ عالم LINGOVERSE</div>
  <div class="art">${image("world-map.png", "خريطة عالم LINGOVERSE")}</div>
  <div class="section-title">🏝️ جزر المغامرات</div><div class="island-grid">${cards}</div>
  <div class="card small">💡 استمع للجمل الإنجليزية وأجب عن التحديات لتجمع نقاط XP.</div>
  <button class="btn ghost" onclick="toggleSound()">${S.sound ? "🔊 نطق الإنجليزية: مفعّل" : "🔇 نطق الإنجليزية: متوقف"}</button>
  <button class="btn ghost" onclick="toggleSfx()">${S.sfx ? "🎵 المؤثرات الصوتية: مفعّلة" : "🔕 المؤثرات الصوتية: متوقفة"}</button>
  <button class="btn ghost" onclick="resetAll()">إعادة ضبط التقدم</button>`;
}

function startStory() {
  if (S.finished || S.cur >= STORY.scenes.length) S.cur = 0;
  sfx.tap(); resetScene(); view = "scene"; save(); render(true);
}
function resetAll() {
  if (confirm("هل تريد حذف كل التقدم؟")) {
    const a = S.sound, b = S.sfx; S = defaults(); S.sound = a; S.sfx = b; save(); view = "home"; render(true);
  }
}
function goHome() { view = "home"; render(true); }

function renderScene() {
  const sc = STORY.scenes[S.cur], ch = sc.ch;
  const dots = STORY.scenes.map((_, i) => `<span class="dot ${S.done.includes(i) ? "on" : ""} ${i === S.cur ? "cur" : ""}"></span>`).join("");
  const vocab = sc.vocab.map((v, i) => `<div class="v"><span><b>${v.en}</b> — ${v.ar}</span><button class="icon" onclick="speakWord(${i})" aria-label="نطق">🔊</button></div>`).join("");
  const opts = () => ch.opts.map((o, i) => {
    const cls = answered && i === ch.ans ? "right" : (wrong.includes(i) ? "wrong" : "");
    return `<button class="opt ${cls}" onclick="pick(${i})" ${answered || wrong.includes(i) ? "disabled" : ""}>${o}</button>`;
  }).join("");
  let challenge = "";
  if (ch.type === "choice") {
    challenge = `<div class="en" style="font-size:1.1rem">${ch.q}</div>${opts()}`;
  } else if (ch.type === "listen") {
    const can = "speechSynthesis" in window && S.sound;
    challenge = `<div>${ch.q}</div>` +
      (can ? `<button class="btn ghost" onclick="speakListen()">▶ استمع</button>`
           : `<div class="card small">الصوت غير متاح. الجملة: <b dir="ltr">${ch.say}</b></div>`) + opts();
  } else if (ch.type === "match") {
    const L = ch.pairs.map((p, i) => `<button class="mb ${mDone.includes(i) ? "ok" : (mSel === i ? "sel" : "")}" dir="ltr" onclick="mLeft(${i})" ${mDone.includes(i) || answered ? "disabled" : ""}>${p[0]}</button>`).join("");
    const R = mOrder.map(j => `<button class="mb ${mDone.includes(j) ? "ok" : ""}" onclick="mRight(${j})" ${mDone.includes(j) || answered ? "disabled" : ""}>${ch.pairs[j][1]}</button>`).join("");
    challenge = `<div>${ch.q}</div><div class="match"><div class="col">${L}</div><div class="col">${R}</div></div>`;
  } else {
    const slot = picked.map(i => `<button class="w" onclick="unpick(${i})">${ch.words[i]}</button>`).join("");
    const pool = ch.words.map((w, i) => picked.includes(i) ? "" : `<button class="w" onclick="addWord(${i})">${w}</button>`).join("");
    challenge = `<div>${ch.q}</div><div class="words slot">${slot || "&nbsp;"}</div><div class="words">${pool}</div>` +
      (answered ? "" : `<button class="btn" onclick="checkOrder()" ${picked.length === ch.words.length ? "" : 'disabled style="opacity:.5"'}>تحقّق</button>`);
  }
  const imageName = S.cur === 0 ? "station.png" : "alex-pico.png";
  const fbHtml = fb ? `<div class="fb ${fbOk ? "ok pop" : "no"}">${fb}</div>` : "";
  const nextBtn = answered ? `<button class="btn pop nextb" onclick="next()">${S.cur < STORY.scenes.length - 1 ? "المشهد التالي ←" : "إنهاء القصة 🎉"}</button>` : "";
  app.innerHTML = `${topBar()}<div class="dots">${dots}</div>
  <div class="art">${image(imageName, "مشهد من مغامرة أليكس")}</div>
  <div class="card"><div class="en">${sc.en} <button class="icon" onclick="speakScene()" aria-label="نطق">🔊</button></div><div class="ar">${sc.ar}</div></div>
  <div class="card"><b>📘 كلمات مهمة</b>${vocab}</div>
  <div class="card"><b>🧩 تحدٍّ صغير</b>${challenge}</div>${fbHtml}${nextBtn}
  <button class="btn ghost" onclick="goHome()">العودة إلى الخريطة</button>`;
}

function wrongMsg(c) { sfx.bad(); fb = "ليس تماماً 🙂 " + c.hint + " جرّب مرة أخرى."; fbOk = false; render(); }

function mLeft(i) { if (answered || mDone.includes(i)) return; mSel = i; sfx.tap(); render(); }
function mRight(j) {
  if (answered || mSel === null || mDone.includes(j)) return;
  const c = STORY.scenes[S.cur].ch;
  if (mSel === j) {
    mDone.push(j); mSel = null; fb = "";
    if (mDone.length === c.pairs.length) correct(); else { sfx.ok(); render(); }
  } else { mSel = null; wrongMsg(c); }
}
function pick(i) {
  if (answered) return;
  const c = STORY.scenes[S.cur].ch;
  if (i === c.ans) correct(); else { wrong.push(i); wrongMsg(c); }
}
function addWord(i) { if (!answered && !picked.includes(i)) { picked.push(i); fb = ""; sfx.tap(); render(); } }
function unpick(i) { if (!answered) { picked = picked.filter(x => x !== i); render(); } }
function checkOrder() {
  const c = STORY.scenes[S.cur].ch;
  if (picked.map(i => c.words[i]).join(" ") === c.ans) correct();
  else { picked = []; wrongMsg(c); }
}

function correct() {
  answered = true;
  const before = levelOf(S.xp);
  let msg = "أحسنت! إجابة صحيحة ✅";
  if (!S.done.includes(S.cur)) { S.done.push(S.cur); S.xp += SCENE_XP; msg += " (+" + SCENE_XP + " XP)"; }
  else { msg += " (أنجزت هذا المشهد سابقاً، بدون XP إضافي)"; }
  const up = levelOf(S.xp) > before;
  if (up) msg += " 🎉 ارتقيت إلى المستوى " + levelOf(S.xp) + "!";
  fb = msg; fbOk = true; save();
  if (up) sfx.up(); else sfx.ok();
  burst(); render();
  const b = document.querySelector(".nextb");
  if (b) setTimeout(() => b.scrollIntoView({ behavior: "smooth", block: "center" }), 80);
}

function next() {
  if (S.cur < STORY.scenes.length - 1) { S.cur++; resetScene(); save(); render(true); return; }
  if (!S.finished) { S.finished = true; S.xp += STORY_XP; S.justFinished = true; } else { S.justFinished = false; }
  S.cur = 0; view = "end"; save(); sfx.win(); burst(); render(true);
}

function renderEnd() {
  const bonus = S.justFinished ? `<div class="fb ok pop">+${STORY_XP} XP لإتمام القصة لأول مرة 🏆</div>` : "";
  S.justFinished = false; save();
  app.innerHTML = `${topBar()}
  <div class="hero">${image("alex-pico.png", "أليكس")}<h2>انتهت القصة!</h2><div>${STORY.titleAr}</div></div>
  ${bonus}
  <div class="card">الكلمات المتعلَّمة: <b>${learned()}</b><br>المجموع: <b>${S.xp} XP</b></div>
  <button class="btn" onclick="goHome()">العودة إلى الخريطة</button>`;
}

render(true);
/* END */
