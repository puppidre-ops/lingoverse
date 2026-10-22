const STORY = {
  title: "The Missing Bag",
  titleAr: "الحقيبة المفقودة",
  scenes: [
    {
      emoji: "🚉",
      en: "Alex is at the train station. He is waiting for his train.",
      ar: "أليكس في محطة القطار. إنه ينتظر قطاره.",
      vocab: [
        { en: "station", ar: "محطة" },
        { en: "train", ar: "قطار" },
        { en: "waiting", ar: "ينتظر" }
      ],
      ch: { type: "choice", q: "What does “station” mean?", opts: ["مدرسة", "محطة", "مطعم"], ans: 1,
            hint: "كلمة station تعني المكان الذي ينتظر فيه الناس القطار." }
    },
    {
      emoji: "👜",
      en: "He sees a small blue bag under the bench.",
      ar: "يرى حقيبة زرقاء صغيرة تحت المقعد.",
      vocab: [
        { en: "bag", ar: "حقيبة" },
        { en: "bench", ar: "مقعد (في الأماكن العامة)" },
        { en: "under", ar: "تحت" }
      ],
      ch: { type: "choice", q: "Where is the bag?", opts: ["On the train", "Under the bench", "In the cafe"], ans: 1,
            hint: "اقرأ الجملة مرة أخرى: the bag is under the bench، أي تحت المقعد." }
    },
    {
      emoji: "🧑‍🤝‍🧑",
      en: "A woman is near the bench. Alex asks, “Is this your bag?”",
      ar: "امرأة قريبة من المقعد. يسأل أليكس: هل هذه حقيبتك؟",
      vocab: [
        { en: "woman", ar: "امرأة" },
        { en: "near", ar: "قريب من" },
        { en: "your", ar: "ـك (ملكك)" }
      ],
      ch: { type: "order", q: "رتّب الكلمات لتكوّن سؤال أليكس:", words: ["bag?", "your", "this", "Is"], ans: "Is this your bag?",
            hint: "السؤال يبدأ بـ Is، ثم this، ثم your، ثم bag." }
    },
    {
      emoji: "😊",
      en: "The woman looks at the bag. “Yes! It is my bag. Thank you!”",
      ar: "تنظر المرأة إلى الحقيبة: نعم! إنها حقيبتي. شكراً لك!",
      vocab: [
        { en: "my", ar: "ـي (ملكي)" },
        { en: "Thank you", ar: "شكراً لك" },
        { en: "You're welcome", ar: "عفواً / على الرحب" }
      ],
      ch: { type: "choice", q: "She says: “Thank you!” What does Alex say?", opts: ["Good morning.", "You're welcome.", "I am a train."], ans: 1,
            hint: "عندما يقول لك أحدهم Thank you نرد بـ You're welcome." }
    }
  ]
};

const KEY = "lingoverse_v1";
const LEVELS = [0, 40, 100, 180, 280, 400];
const SCENE_XP = 10, STORY_XP = 20;

function defaults() { return { xp: 0, done: [], cur: 0, finished: false, sound: true }; }
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
const app = document.getElementById("app");

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
function toggleSound() { S.sound = !S.sound; save(); render(); }

function render(anim) {
  window.scrollTo(0, 0);
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
  <div class="hero"><div class="big">🚉</div><h1>LINGOVERSE</h1><div class="small">Learn English. Live the Story.</div></div>
  <div class="card"><b>${STORY.titleAr}</b> <span class="small" dir="ltr">(${STORY.title})</span>
  <div class="small">المشاهد المكتملة: ${S.done.length} / ${STORY.scenes.length} · الكلمات المتعلَّمة: ${wordsLearned()}</div></div>
  <button class="btn" onclick="startStory()">${label} ▶</button>
  <button class="btn ghost" onclick="toggleSound()">${S.sound ? "🔊 النطق: مفعّل" : "🔇 النطق: متوقف"}</button>
  <button class="btn ghost" onclick="resetAll()">إعادة ضبط التقدم</button>`;
}

function startStory() {
  if (S.finished) S.cur = 0;
  resetScene(); view = "scene"; save(); render();
}
function resetScene() { answered = false; picked = []; wrong = []; fb = ""; fbOk = false; }
function resetAll() {
  if (confirm("هل تريد حذف كل التقدم؟")) { S = defaults(); save(); view = "home"; render(); }
}

function renderScene() {
  const sc = STORY.scenes[S.cur], ch = sc.ch;
  const dots = STORY.scenes.map((_, i) => `<span class="dot ${S.done.includes(i) ? "on" : ""} ${i === S.cur ? "cur" : ""}"></span>`).join("");
  const vocab = sc.vocab.map((v, i) => `<div class="v"><span><b>${v.en}</b> — ${v.ar}</span><button class="icon" onclick="speakWord(${i})" aria-label="نطق">🔊</button></div>`).join("");
  let challenge = "";
  if (ch.type === "choice") {
    challenge = `<div class="en" style="font-size:1.1rem">${ch.q}</div>` +
      ch.opts.map((o, i) => {
        const cls = answered && i === ch.ans ? "right" : (wrong.includes(i) ? "wrong" : "");
        return `<button class="opt ${cls}" onclick="pick(${i})" ${answered || wrong.includes(i) ? "disabled" : ""}>${o}</button>`;
      }).join("");
  } else {
    const slot = picked.map(i => `<button class="w" onclick="unpick(${i})">${ch.words[i]}</button>`).join("");
    const pool = ch.words.map((w, i) => picked.includes(i) ? "" : `<button class="w" onclick="addWord(${i})">${w}</button>`).join("");
    challenge = `<div>${ch.q}</div><div class="words slot">${slot || "&nbsp;"}</div><div class="words">${pool}</div>` +
      (answered ? "" : `<button class="btn" onclick="checkOrder()" ${picked.length === ch.words.length ? "" : "disabled style='opacity:.5'"}>تحقّق</button>`);
  }
  const fbHtml = fb ? `<div class="fb ${fbOk ? "ok pop" : "no"}">${fb}</div>` : "";
  const nextBtn = answered ? `<button class="btn pop" onclick="next()">${S.cur + 1 < STORY.scenes.length ? "المشهد التالي ←" : "إنهاء القصة 🎉"}</button>` : "";
  app.innerHTML = `${topBar()}<div class="dots">${dots}</div>
  <div class="scene">${sc.emoji}</div>
  <div class="card"><div class="en">${sc.en} <button class="icon" onclick="speakScene()" aria-label="نطق">🔊</button></div><div class="ar">${sc.ar}</div></div>
  <div class="card"><b>كلمات مهمة</b>${vocab}</div>
  <div class="card"><b>تحدٍّ صغير</b>${challenge}</div>${fbHtml}${nextBtn}
  <button class="btn ghost" onclick="goHome()">الرئيسية</button>`;
}

function goHome() { view = "home"; render(); }

function pick(i) {
  if (answered) return;
  const ch = STORY.scenes[S.cur].ch;
  if (i === ch.ans) correct(); else { wrong.push(i); fb = "ليس تماماً 🙂 " + ch.hint + " جرّب مرة أخرى."; fbOk = false; render(); }
}
function addWord(i) { if (!answered && !picked.includes(i)) { picked.push(i); fb = ""; render(); } }
function unpick(i) { if (!answered) { picked = picked.filter(x => x !== i); render(); } }
function checkOrder() {
  const ch = STORY.scenes[S.cur].ch;
  const sentence = picked.map(i => ch.words[i]).join(" ");
  if (sentence === ch.ans) correct();
  else { picked = []; fb = "ليس تماماً 🙂 " + ch.hint + " جرّب مرة أخرى."; fbOk = false; render(); }
}

function correct() {
  answered = true;
  const before = levelOf(S.xp);
  let msg = "أحسنت! إجابة صحيحة ✅";
  if (!S.done.includes(S.cur)) {
    S.done.push(S.cur); S.xp += SCENE_XP; msg += " (+" + SCENE_XP + " XP)";
  } else { msg += " (أنجزت هذا المشهد سابقاً، بدون XP إضافي)"; }
  if (levelOf(S.xp) > before) msg += " 🎉 ارتقيت إلى المستوى " + levelOf(S.xp) + "!";
  fb = msg; fbOk = true; save(); render();
}

function next() {
  if (S.cur + 1 < STORY.scenes.length) { S.cur++; resetScene(); save(); render(); return; }
  if (!S.finished) { S.xp += STORY_XP; S.finished = true; S.justFinished = true; } else { S.justFinished = false; }
  S.cur = 0; view = "end"; save(); render();
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

render();
