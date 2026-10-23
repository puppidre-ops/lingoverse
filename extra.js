LEVELS[4] = 250; LEVELS[5] = 330;

STORIES.forest = { id: "forest", title: "A Walk in the Forest", titleAr: "نزهة في الغابة", img: "forest.png", scenes: [
  { en: "Alex and Pico are in the forest. The trees are tall and green.", ar: "أليكس وبيكو في الغابة. الأشجار طويلة وخضراء.",
    vocab: [{ en: "forest", ar: "غابة" }, { en: "tree", ar: "شجرة" }, { en: "green", ar: "أخضر" }],
    ch: { type: "match", q: "طابق كل كلمة بمعناها:", pairs: [["forest", "غابة"], ["tree", "شجرة"], ["green", "أخضر"]], hint: "الغابة فيها أشجار خضراء." } },
  { en: "Alex sees a small rabbit. It is brown.", ar: "يرى أليكس أرنباً صغيراً. لونه بني.",
    vocab: [{ en: "rabbit", ar: "أرنب" }, { en: "small", ar: "صغير" }, { en: "brown", ar: "بني" }],
    ch: { type: "choice", q: "What color is the rabbit?", opts: ["Brown", "Blue", "Pink"], ans: 0, hint: "اقرأ الجملة مرة أخرى: It is brown، أي لونه بني." } },
  { en: "Alex asks, “What is this animal?” Pico says, “It is a rabbit.”", ar: "يسأل أليكس: ما هذا الحيوان؟ يقول بيكو: إنه أرنب.",
    vocab: [{ en: "animal", ar: "حيوان" }, { en: "this", ar: "هذا" }, { en: "What", ar: "ما / ماذا" }],
    ch: { type: "order", q: "رتّب الكلمات لتسأل: ما هذا الحيوان؟", words: ["animal?", "this", "is", "What"], ans: "What is this animal?", hint: "نبدأ بـ What، ثم is، ثم this، ثم animal." } },
  { en: "They hear water. “Look! A waterfall!” says Pico. “It is beautiful!”", ar: "يسمعان صوت ماء. يقول بيكو: انظر! شلال! إنه جميل!",
    vocab: [{ en: "waterfall", ar: "شلال" }, { en: "look", ar: "انظر" }, { en: "beautiful", ar: "جميل" }],
    ch: { type: "listen", say: "It is beautiful.", q: "اضغط ▶ واستمع، ثم اختر ما سمعته:", opts: ["It is beautiful.", "It is a bag.", "It is a train."], ans: 0, hint: "الجملة المسموعة هي It is beautiful، أي إنه جميل." } }
] };

STORIES.treasure = { id: "treasure", title: "The Treasure Map", titleAr: "خريطة الكنز", img: "treasure-island.png", scenes: [
  { en: "Alex finds an old map on the beach. “A treasure map!” he says.", ar: "يجد أليكس خريطة قديمة على الشاطئ. يقول: خريطة كنز!",
    vocab: [{ en: "map", ar: "خريطة" }, { en: "beach", ar: "شاطئ" }, { en: "treasure", ar: "كنز" }],
    ch: { type: "match", q: "طابق كل كلمة بمعناها:", pairs: [["map", "خريطة"], ["beach", "شاطئ"], ["treasure", "كنز"]], hint: "وجد خريطة كنز على الشاطئ." } },
  { en: "The map says: “Go left. Then go straight.”", ar: "تقول الخريطة: اذهب يساراً. ثم اذهب إلى الأمام.",
    vocab: [{ en: "left", ar: "يسار" }, { en: "straight", ar: "إلى الأمام" }, { en: "go", ar: "اذهب" }],
    ch: { type: "choice", q: "The map says “Go left.” Alex goes:", opts: ["To the left", "To the right", "Up a tree"], ans: 0, hint: "left تعني يسار، فيذهب إلى اليسار." } },
  { en: "At the big rock, turn right. The cave is near the rock.", ar: "عند الصخرة الكبيرة انعطف يميناً. الكهف قريب من الصخرة.",
    vocab: [{ en: "turn", ar: "انعطف" }, { en: "rock", ar: "صخرة" }, { en: "cave", ar: "كهف" }],
    ch: { type: "order", q: "رتّب الجملة: انعطف يميناً عند الصخرة", words: ["rock.", "the", "at", "right", "Turn"], ans: "Turn right at the rock.", hint: "نبدأ بـ Turn right، ثم at the rock." } },
  { en: "In the cave, Alex sees a big box. “Is it open?” asks Pico. “No, it is closed,” says Alex.", ar: "في الكهف يرى أليكس صندوقاً كبيراً. يسأل بيكو: هل هو مفتوح؟ يقول أليكس: لا، إنه مغلق.",
    vocab: [{ en: "box", ar: "صندوق" }, { en: "open", ar: "مفتوح" }, { en: "closed", ar: "مغلق" }],
    ch: { type: "choice", q: "The box is not open. It is ___ .", opts: ["closed", "open", "happy"], ans: 0, hint: "ضد open هو closed، أي مغلق." } },
  { en: "Alex opens the box. It has gold coins! “We are rich!” says Pico.", ar: "يفتح أليكس الصندوق. فيه عملات ذهبية! يقول بيكو: نحن أغنياء!",
    vocab: [{ en: "gold", ar: "ذهب" }, { en: "coin", ar: "عملة معدنية" }, { en: "rich", ar: "غني" }],
    ch: { type: "listen", say: "We are rich.", q: "اضغط ▶ واستمع، ثم اختر ما سمعته:", opts: ["We are rich.", "We are late.", "We are cold."], ans: 0, hint: "الجملة المسموعة هي We are rich، أي نحن أغنياء." } }
] };

STORIES.castle = { id: "castle", title: "The Castle Door", titleAr: "باب القلعة", img: "castle.png", scenes: [
  { en: "The castle is big and old. A guard stands at the door.", ar: "القلعة كبيرة وقديمة. يقف حارس عند الباب.",
    vocab: [{ en: "castle", ar: "قلعة" }, { en: "guard", ar: "حارس" }, { en: "door", ar: "باب" }],
    ch: { type: "match", q: "طابق كل كلمة بمعناها:", pairs: [["castle", "قلعة"], ["guard", "حارس"], ["door", "باب"]], hint: "حارس يقف عند باب القلعة." } },
  { en: "The guard says, “Stop! Who are you?” Alex says, “I am Alex. I am a friend.”", ar: "يقول الحارس: قف! من أنت؟ يقول أليكس: أنا أليكس. أنا صديق.",
    vocab: [{ en: "stop", ar: "قف" }, { en: "who", ar: "من" }, { en: "friend", ar: "صديق" }],
    ch: { type: "choice", q: "The guard asks: “Who are you?” Alex says:", opts: ["I am Alex.", "It is a door.", "Go left."], ans: 0, hint: "السؤال عن اسمه، فيجيب: I am Alex." } },
  { en: "“Please open the door,” says Alex. The guard smiles and says, “Come in!”", ar: "يقول أليكس: من فضلك افتح الباب. يبتسم الحارس ويقول: تفضّل بالدخول!",
    vocab: [{ en: "please", ar: "من فضلك" }, { en: "open", ar: "يفتح" }, { en: "come in", ar: "تفضّل بالدخول" }],
    ch: { type: "order", q: "رتّب الجملة: من فضلك افتح الباب", words: ["door.", "the", "open", "Please"], ans: "Please open the door.", hint: "نبدأ بـ Please، ثم open، ثم the door." } },
  { en: "Inside, the hall is dark. Pico says, “We need a light!”", ar: "في الداخل القاعة مظلمة. يقول بيكو: نحتاج إلى ضوء!",
    vocab: [{ en: "inside", ar: "في الداخل" }, { en: "dark", ar: "مظلم" }, { en: "light", ar: "ضوء" }],
    ch: { type: "choice", q: "The room is dark. We need a ___ .", opts: ["light", "bag", "train"], ans: 0, hint: "المكان مظلم، فنحتاج إلى light أي ضوء." } },
  { en: "On the table there is a golden key. “Take the key!” says Alex.", ar: "على الطاولة مفتاح ذهبي. يقول أليكس: خذ المفتاح!",
    vocab: [{ en: "table", ar: "طاولة" }, { en: "key", ar: "مفتاح" }, { en: "take", ar: "خذ" }],
    ch: { type: "listen", say: "Take the key.", q: "اضغط ▶ واستمع، ثم اختر ما سمعته:", opts: ["Take the key.", "Close the door.", "Sit down."], ans: 0, hint: "الجملة المسموعة هي Take the key، أي خذ المفتاح." } }
] };

[["forest", "forest"], ["treasure", "treasure"], ["castle", "castle"]].forEach(function (a) {
  const o = ISLANDS.find(function (x) { return x.id === a[0]; }); if (o) o.story = a[1];
});

/* صورة المشهد حسب القصة */
const PICS = { forest: "forest.png", treasure: "treasure-island.png", castle: "castle.png" };
const _rScene = rScene;
rScene = function () {
  const h = _rScene(), p = PICS[sid];
  return p ? h.replace(/(<div class="art"><img src=")[^"]+/, "$1" + p) : h;
};

/* الخريطة التفاعلية */
const POS = { station: [19, 64], cafe: [39, 42], forest: [62, 37], treasure: [59, 84], castle: [87, 53] };
function mapPins() {
  const c = contInfo();
  return ISLANDS.map(function (i) {
    const s = islSt(i), p = POS[i.id]; if (!p) return "";
    const cur = c && i.story === c.id;
    const ic = s === "done" ? "✅" : s === "locked" ? "🔒" : cur ? "▶" : "📖";
    return '<button class="pin ' + s + (cur ? " cur" : "") + '" style="left:' + p[0] + '%;top:' + p[1] + '%" onclick="go(\'island\',\'' + i.id + '\')"><b>' + ic + "</b><span>" + i.name + "</span></button>";
  }).join("");
}
rMap = function () {
  const cards = ISLANDS.map(function (i) {
    const s = islSt(i);
    return '<button class="isl ' + s + '" onclick="go(\'island\',\'' + i.id + '\')">' + img(i.img, i.name) + '<div class="in"><b>' + i.name + '</b><div class="en2">' + i.en + '</div><span class="chip2 ' + s + '">' + chipTxt(i, s) + "</span></div></button>";
  }).join("");
  return hdr() + '<h3 class="st">🗺️ خريطة العالم</h3><div class="mapc" style="cursor:default">' + img("world-map.png", "خريطة العالم") +
    '<i class="cl"></i><i class="cl c2"></i><span class="boat">⛵</span>' + mapPins() + '</div><div class="small" style="text-align:center">اضغط على جزيرة لفتحها · ▶ جزيرتك الحالية</div>' +
    '<h3 class="st">🏝️ الجزر</h3><div class="ig">' + cards + "</div>";
};

/* حركات + تحسين قصّ الصور */
const x = document.createElement("style");
x.textContent = `
.heroc{min-height:0;aspect-ratio:16/10}
.heroc img{object-position:15% 20%}
.mapc img{max-height:none;aspect-ratio:16/10;object-fit:cover}
.heroc img,.mapc img{animation:kb 20s ease-in-out infinite alternate}
@keyframes kb{from{transform:scale(1)}to{transform:scale(1.06)}}
.cl{position:absolute;top:10%;left:-120px;width:100px;height:34px;border-radius:50px;background:rgba(255,255,255,.55);filter:blur(7px);animation:drift 28s linear infinite;pointer-events:none}
.cl.c2{top:58%;width:130px;animation-duration:38s;animation-delay:-14s}
@keyframes drift{to{transform:translateX(720px)}}
.boat{position:absolute;bottom:14%;left:12%;font-size:1.5rem;animation:sail 16s ease-in-out infinite alternate;pointer-events:none}
@keyframes sail{from{transform:translateX(0) rotate(-3deg)}to{transform:translateX(150px) rotate(3deg)}}
.pin{position:absolute;transform:translate(-50%,-50%);display:flex;align-items:center;gap:4px;background:rgba(18,38,74,.9);color:#fff;border:0;border-radius:14px;padding:5px 9px;font-size:.75rem;font-weight:700;min-height:36px;cursor:pointer;white-space:nowrap}
.pin.locked{opacity:.85}.pin.done{background:rgba(46,139,87,.92)}
.pin.cur{background:var(--main);animation:pulse 1.6s ease-in-out infinite}
@keyframes pulse{0%,100%{transform:translate(-50%,-50%) scale(1)}50%{transform:translate(-50%,-50%) scale(1.12)}}
@media (prefers-reduced-motion:reduce){.heroc img,.mapc img,.cl,.boat,.pin.cur{animation:none}.cl,.boat{display:none}}
`;
document.head.appendChild(x);

render(true);
/* END */
