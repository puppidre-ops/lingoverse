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
let mSel = null, mDone = [], mOrder = [], fresh = true;
const app = document.getElementById("app");

/* ---------- styles ---------- */
const st = document.createElement("style");
st.textContent = `
.art{border-radius:20px;overflow:hidden;border:1px solid var(--line);box-shadow:0 6px 18px rgba(90,60,20,.15);margin:10px 0}
.art svg{display:block;width:100%;height:auto}
.bob{animation:bob 2.2s ease-in-out infinite}
@keyframes bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-2px)}}
.cloud{animation:drift 14s ease-in-out infinite alternate}
@keyframes drift{to{transform:translateX(40px)}}
.tw{animation:tw 1.3s ease-in-out infinite alternate}
@keyframes tw{from{opacity:.25}to{opacity:1}}
.train.in{animation:tin 2.4s ease-out both}
.train.out{animation:tout 3s ease-in .4s both}
.train.gone{display:none}
@keyframes tin{from{transform:translateX(-340px)}to{transform:translateX(0)}}
@keyframes tout{from{transform:translateX(0)}to{transform:translateX(340px)}}
.fx{position:fixed;bottom:25%;font-size:1.7rem;pointer-events:none;animation:floatup 1.4s ease-out forwards;z-index:9}
@keyframes floatup{to{transform:translateY(-280px) rotate(40deg);opacity:0}}
.match{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:10px 0}
.match .col{display:flex;flex-direction:column;gap:8px}
.mb{min-height:48px;border:2px solid var(--line);background:#fff;border-radius:12px;font-size:1.05rem;padding:8px;cursor:pointer}
.mb.sel{border-color:var(--main);background:#fff1e2}
.mb.ok{border-color:var(--ok);background:#e6f6ec;opacity:.75}
.listen{min-height:56px}
@media (prefers-reduced-motion:reduce){.bob,.cloud,.tw,.train.in,.train.out,.fx{animation:none}.train.out{display:none}}
`;
document.head.appendChild(st);

/* ---------- sound effects (synthesized, no files) ---------- */
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

/* ---------- illustrations (SVG drawn in code) ---------- */
function bg(c1, c2, sun) {
  return `<defs><linearGradient id="sk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient></defs>
<rect width="320" height="180" fill="url(#sk)"/>
<circle cx="${sun[0]}" cy="${sun[1]}" r="18" fill="${sun[2]}" opacity=".9"/>
<g class="cloud" fill="#fff" opacity=".8"><ellipse cx="60" cy="30" rx="22" ry="8"/><ellipse cx="78" cy="26" rx="14" ry="7"/><ellipse cx="230" cy="22" rx="18" ry="6"/></g>
<path d="M0 110 Q60 80 120 105 T240 100 T320 108 V140 H0Z" fill="#8fbf8a"/>
<rect x="190" y="60" width="110" height="60" fill="#c8734a"/><path d="M182 62 L245 38 L308 62Z" fill="#7a3f2b"/>
<rect x="206" y="82" width="16" height="20" fill="#ffe9a8"/><rect x="268" y="82" width="16" height="20" fill="#ffe9a8"/><rect x="237" y="92" width="18" height="28" fill="#5b3425"/>
<rect x="218" y="64" width="54" height="11" rx="3" fill="#fff6dd"/>
<text x="245" y="72.5" font-size="7" text-anchor="middle" fill="#5b3425" font-family="sans-serif" font-weight="700">STATION</text>
<rect y="138" width="320" height="42" fill="#b9a88e"/><rect y="138" width="320" height="4" fill="#8c7b62"/>
<rect y="160" width="320" height="4" fill="#6b6b73"/><rect y="170" width="320" height="4" fill="#6b6b73"/>`;
}
function bench(x) {
  return `<g><rect x="${x}" y="106" width="46" height="5" rx="2" fill="#8a5a36"/><rect x="${x}" y="118" width="46" height="6" rx="2" fill="#7a4b2a"/><rect x="${x + 3}" y="124" width="4" height="14" fill="#4d2f1a"/><rect x="${x + 39}" y="124" width="4" height="14" fill="#4d2f1a"/></g>`;
}
function P(x, shirt, hair, woman) {
  const body = woman
    ? `<path d="M-12 -20 L12 -20 L8 -44 L-8 -44Z" fill="${shirt}"/>`
    : `<rect x="-10" y="-46" width="20" height="26" rx="6" fill="${shirt}"/>`;
  return `<g transform="translate(${x} 140)"><g class="bob">
<rect x="-7" y="-22" width="5" height="22" rx="2" fill="#3a3a4a"/><rect x="2" y="-22" width="5" height="22" rx="2" fill="#3a3a4a"/>
${woman ? `<rect x="-11" y="-64" width="22" height="22" rx="8" fill="${hair}"/>` : ""}
${body}
<circle cx="0" cy="-56" r="10" fill="#f3c9a0"/>
<path d="M-10.5 -57 Q0 -73 10.5 -57 Q0 -62 -10.5 -57Z" fill="${hair}"/>
<circle cx="-3.5" cy="-55" r="1.3" fill="#333"/><circle cx="3.5" cy="-55" r="1.3" fill="#333"/>
<path d="M-3 -51 Q0 -48.5 3 -51" stroke="#8a4b3a" stroke-width="1" fill="none"/>
</g></g>`;
}
function bubble(x, y, t) {
  return `<g class="bob"><rect x="${x - 15}" y="${y - 13}" width="30" height="24" rx="9" fill="#fff" opacity=".95"/><text x="${x}" y="${y + 5}" font-size="14" text-anchor="middle">${t}</text></g>`;
}
function bag(x, y) {
  return `<g><rect x="${x}" y="${y}" width="16" height="11" rx="3" fill="#2a6fd6"/><path d="M${x + 4} ${y} q4 -7 8 0" stroke="#1b4a96" fill="none" stroke-width="2"/></g>`;
}
function train(cls) {
  let w = "";
  for (let k = 0; k < 5; k++) w += `<rect x="${-8 + k * 48}" y="150" width="30" height="11" rx="3" fill="#cfeaff"/>`;
  return `<g class="train ${cls}"><rect x="-20" y="146" width="250" height="24" rx="5" fill="#2f6fb3"/><rect x="-20" y="163" width="250" height="4" fill="#1f4e86"/>${w}
<circle cx="20" cy="171" r="4" fill="#333"/><circle cx="110" cy="171" r="4" fill="#333"/><circle cx="200" cy="171" r="4" fill="#333"/></g>`;
}
function art(i, anim) {
  const sky = [
    ["#a8d8f0", "#fdf0d0", [40, 40, "#ffd35a"]],
    ["#b5dcf0", "#fde6bd", [50, 38, "#ffd35a"]],
    ["#c4dcf0", "#fcdcae", [60, 45, "#ffc94a"]],
    ["#ffcf9e", "#fff0d6", [70, 62, "#ffb347"]],
    ["#f58f6b", "#ffd29a", [80, 100, "#fff0b0"]]
  ][i] || ["#a8d8f0", "#fdf0d0", [40, 40, "#ffd35a"]];
  let s = bg(sky[0], sky[1], sky[2]);
  const ALEX = ["#e8a33d", "#4a2c1a"], WOM = ["#c0457a", "#2b1a12"];
  if (i === 0) {
    s += bench(30) + P(130, ALEX[0], ALEX[1]) + bubble(130, 46, "⏰") + train(anim ? "in" : "");
  } else if (i === 1) {
    s += bench(110) + bag(126, 128) + `<text class="tw" x="146" y="126" font-size="11">✨</text>` +
      P(62, ALEX[0], ALEX[1]) + bubble(62, 46, "❗") + train("gone");
  } else if (i === 2) {
    s += bench(30) + P(120, ALEX[0], ALEX[1]) + bag(128, 112) + bubble(120, 40, "❓") +
      P(180, WOM[0], WOM[1], 1) + train("gone");
  } else if (i === 3) {
    s += bench(30) + P(105, ALEX[0], ALEX[1]) + P(170, WOM[0], WOM[1], 1) + bag(178, 112) +
      `<text class="tw" x="160" y="52" font-size="18">💛</text>` + train("gone");
  } else {
    s += bench(30) + P(125, ALEX[0], ALEX[1]) + P(185, WOM[0], WOM[1], 1) +
      `<text class="tw" x="138" y="62" font-size="16">👋</text>` + train(anim ? "out" : "gone");
  }
  return `<svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="scene">${s}</svg>`;
}

/* ---------- logic ---------- */
function levelOf(xp) { let l = 1; LEVELS.forEach((t, i) => { if (xp >= t) l = i + 1; }); return l; }
function levelInfo(xp) {
  const l = levelOf(xp), lo = LEVELS[l - 1], hi = LEVELS[l];
  const pct = hi === undefined ? 100 : Math.round(((xp - lo) / (hi - lo)) * 100);
  return { l, pct, left: hi === undefined ? 0 : hi - xp };
}
function wordsLearned() { return S.done.reduce((n, i) => n + (STORY.scenes[i] ? STORY.scenes[i].vocab.length : 0), 0); }

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

function shuffleIdx(n) {
  const a = [...Array(n).keys()];
  for (let t = 0; t < 10; t++) {
    for (let i = n - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    if (n < 2 || a.some((v, i) => v !== i)) break;
  }
  return a;
}
function resetScene() {
  answered = false; picked = []; wrong = []; fb = ""; fbOk = false;
  mSel = null; mDone = []; fresh = true;
  const ch = STORY.scenes[S.cur].ch;
  mOrder = ch.pairs ? shuffleIdx(ch.pairs.length) : [];
}

function render(top) {
  if (top) window.scrollTo(0, 0);
  if (view === "home") renderHome();
  else if (view === "scene") renderScene();
  else renderEnd();
}

function topBar() {
  const li = levelInfo(S.xp);
  return `<div class="top"><span class="badge">⭐ المستوى ${li.l}</span><span class="badge">${S.xp} XP</span></div>
  <div class="bar"><i style="width:${li.pct}%"></i></div>
  <div class="small">${li.left ? "تبقّى " + li.left + " XP للمستوى التالي" : "وصلت لأعلى مستوى حالياً"}</div>`;
}

function renderHome() {
  const label = S.finished ? "اقرأ القصة مرة أخرى" : (S.done.length === 0 ? "ابدأ القصة" : "تابع القصة");
  app.innerHTML = `${topBar()}
  <div class="art">${art(0, false)}</div>
  <h1 style="text-align:center;margin:10px 0 0">LINGOVERSE</h1>
  <div class="small" style="text-align:center" dir="ltr">Learn English. Live the Story.</div>
  <div class="card"><b>🚉 ${STORY.titleAr}</b> <span class="small" dir="ltr">(${STORY.title})</span>
  <div class="small">المشاهد المكتملة: ${S.done.length} / ${STORY.scenes.length} · الكلمات المتعلَّمة: ${wordsLearned()}</div></div>
  <button class="btn" onclick="startStory()">${label} ▶</button>
  <div class="card small">🔒 المقهى · 🔒 المخبز — قصص جديدة بعوالم مختلفة قادمة قريباً</div>
  <button class="btn ghost" onclick="toggleSound()">${S.sound ? "🔊 نطق الإنجليزية: مفعّل" : "🔇 نطق الإنجليزية: متوقف"}</button>
  <button class="btn ghost" onclick="toggleSfx()">${S.sfx ? "🎵 المؤثرات الصوتية: مفعّلة" : "🔕 المؤثرات الصوتية: متوقفة"}</button>
  <button class="btn ghost" onclick="resetAll()">إعادة ضبط التقدم</button>`;
}

function startStory() {
  if (S.finished) S.cur = 0;
  sfx.tap(); resetScene(); view = "scene"; save(); render(true);
}
function resetAll() {
  if (confirm("هل تريد حذف كل التقدم؟")) { const snd = S.sound, fx = S.sfx; S = defaults(); S.sound = snd; S.sfx = fx; save(); view = "home"; render(true); }
}

function renderScene() {
  const sc = STORY.scenes[S.cur], ch = sc.ch;
  const anim = fresh; fresh = false;
  const dots = STORY.scenes.map((_, i) => `<span class="dot ${S.done.includes(i) ? "on" : ""} ${i === S.cur ? "cur" : ""}"></span>`).join("");
  const vocab = sc.vocab.map((v, i) => `<div class="v"><span><b>${v.en}</b> — ${v.ar}</span><button class="icon" onclick="speakWord(${i})" aria-label="نطق">🔊</button></div>`).join("");
  let challenge = "";
  const opts = () => ch.opts.map((o, i) => {
    const cls = answered && i === ch.ans ? "right" : (wrong.includes(i) ? "wrong" : "");
    return `<button class="opt ${cls}" onclick="pick(${i})" ${answered || wrong.includes(i) ? "disabled" : ""}>${o}</button>`;
  }).join("");
  if (ch.type === "choice") {
    challenge = `<div class="en" style="font-size:1.1rem">${ch.q}</div>` + opts();
  } else if (ch.type === "listen") {
    const can = "speechSynthesis" in window && S.sound;
    challenge = `<div>${ch.q}</div>` +
      (can ? `<button class="btn ghost listen" onclick="speakListen()">▶ استمع</button>`
           : `<div class="card small">الصوت غير متاح (متوقف أو غير مدعوم). الجملة: <b dir="ltr">${ch.say}</b></div>`) + opts();
  } else if (ch.type === "match") {
    const L = ch.pairs.map((p, i) => `<button class="mb ${mDone.includes(i) ? "ok" : (mSel === i ? "sel" : "")}" dir="ltr" onclick="mLeft(${i})" ${mDone.includes(i) || answered ? "disabled" : ""}>${p[0]}</button>`).join("");
    const R = mOrder.map(j => `<button class="mb ${mDone.includes(j) ? "ok" : ""}" onclick="mRight(${j})" ${mDone.includes(j) || answered ? "disabled" : ""}>${ch.pairs[j][1]}</button>`).join("");
    challenge = `<div>${ch.q}</div><div class="match"><div class="col">${L}</div><div class="col">${R}</div></div>`;
  } else {
    const slot = picked.map(i => `<button class="w" onclick="unpick(${i})">${ch.words[i]}</button>`).join("");
    const pool = ch.words.map((w, i) => picked.includes(i) ? "" : `<button class="w" onclick="addWord(${i})">${w}</button>`).join("");
    challenge = `<div>${ch.q}</div><div class="words slot">${slot || "&nbsp;"}</div><div class="words">${pool}</div>` +
      (answered ? "" : `<button class="btn" onclick="checkOrder()" ${picked.length === ch.words.length ? "" : "disabled style='opacity:.5'"}>تحقّق</button>`);
  }
  const fbHtml = fb ? `<div class="fb ${fbOk ? "ok pop" : "no"}">${fb}</div>` : "";
  const nextBtn = answered ? `<button class="btn pop nextb" onclick="next()">${S.cur + 1 < STORY.scenes.length ? "المشهد التالي ←" : "إنهاء القصة 🎉"}</button>` : "";
  app.innerHTML = `${topBar()}<div class="dots">${dots}</div>
  <div class="art">${art(S.cur, anim)}</div>
  <div class="card"><div class="en">${sc.en} <button class="icon" onclick="speakScene()" aria-label="نطق">🔊</button></div><div class="ar">${sc.ar}</div></div>
  <div class="card"><b>كلمات مهمة</b>${vocab}</div>
  <div class="card"><b>تحدٍّ صغير</b>${challenge}</div>${fbHtml}${nextBtn}
  <button class="btn ghost" onclick="goHome()">الرئيسية</button>`;
}

function goHome() { view = "home"; render(true); }

function mLeft(i) { if (answered || mDone.includes(i)) return; mSel = i; sfx.tap(); render(); }
function mRight(j) {
  if (answered || mSel === null || mDone.includes(j)) return;
  const ch = STORY.scenes[S.cur].ch;
  if (mSel === j) {
    mDone.push(j); mSel = null; fb = "";
    if (mDone.length === ch.pairs.length) correct(); else { sfx.ok(); render(); }
  } else {
    mSel = null; sfx.bad(); fb = "ليس تماماً 🙂 " + ch.hint + " جرّب مرة أخرى."; fbOk = false; render();
  }
}
function pick(i) {
  if (answered) return;
  const ch = STORY.scenes[S.cur].ch;
  if (i === ch.ans) correct();
  else { wrong.push(i); sfx.bad(); fb = "ليس تماماً 🙂 " + ch.hint + " جرّب مرة أخرى."; fbOk = false; render(); }
}
function addWord(i) { if (!answered && !picked.includes(i)) { picked.push(i); fb = ""; sfx.tap(); render(); } }
function unpick(i) { if (!answered) { picked = picked.filter(x => x !== i); render(); } }
function checkOrder() {
  const ch = STORY.scenes[S.cur].ch;
  const sentence = picked.map(i => ch.words[i]).join(" ");
  if (sentence === ch.ans) correct();
  else { picked = []; sfx.bad(); fb = "ليس تماماً 🙂 " + ch.hint + " جرّب مرة أخرى."; fbOk = false; render(); }
}

function correct() {
  answered = true;
  const before = levelOf(S.xp);
  let msg = "أحسنت! إجابة صحيحة ✅";
  if (!S.done.includes(S.cur)) {
    S.done.push(S.cur); S.xp += SCENE_XP; msg += " (+" + SCENE_XP + " XP)";
  } else { msg += " (أنجزت هذا المشهد سابقاً، بدون XP إضافي)"; }
  const up = levelOf(S.xp) > before;
  if (up) msg += " 🎉 ارتقيت إلى المستوى " + levelOf(S.xp) + "!";
  fb = msg; fbOk = true; save();
  if (up) sfx.up(); else sfx.ok();
  burst(); render();
  const b = document.querySelector(".nextb");
  if (b) setTimeout(() => b.scrollIntoView({ behavior: "smooth", block: "center" }), 80);
}

function next() {
  if (S.cur + 1 < STORY.scenes.length) { S.cur++; resetScene(); save(); render(true); return; }
  if (!S.finished) { S.xp += STORY_XP; S.finished = true; S.justFinished = true; } else { S.justFinished = false; }
  S.cur = 0; view = "end"; save(); sfx.win(); burst(); render(true);
}

function renderEnd() {
  const bonus = S.justFinished ? `<div class="fb ok pop">+${STORY_XP} XP لإتمام القصة لأول مرة 🏆</div>` : "";
  S.justFinished = false; save();
  app.innerHTML = `${topBar()}
  <div class="hero"><div class="big">🎒</div><h1>انتهت القصة!</h1><div>${STORY.titleAr}</div></div>
  ${bonus}
  <div class="card">الكلمات المتعلَّمة: <b>${wordsLearned()}</b><br>المجموع: <b>${S.xp} XP</b></div>
  <button class="btn" onclick="goHome()">العودة للرئيسية</button>`;
}

render(true);
