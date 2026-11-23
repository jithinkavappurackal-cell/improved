/* ====== CONFIG — edit these ====== */
const CONFIG = {
  name: "Aleena",
  passcode: "0201",
  // Set this to the next birthday date/time in local time (YYYY-MM-DDTHH:MM:SS).
  birthdayDate: "2027-01-02T00:00:00",
  // Add your own MP3 at music/birthday-song.mp3, or change this path.
  musicPath: "music/Aaraadhike.mp3.mpeg",
  photos: ["img/aleena.22.jpeg","img/aleena26.png","img/aleena.23.jpeg","img/aleena.26.jpeg","img/aleena7.jpeg","img/aleena5.jpeg","img/aleena1.jpeg","img/aleena2.jpeg","img/aleena3.jpeg","img/aleena4.jpeg","img/aleena6.jpeg","img/aleena8.jpeg","img/aleena9.jpeg","img/aleena10.jpeg","img/aleena11.jpeg","img/aleena12.jpeg","img/aleena13.jpeg","img/aleena14.jpeg","img/aleena15.jpeg","img/aleena16.jpeg","img/aleena17.jpeg","img/aleena18.jpeg","img/aleena.19.jpeg","img/aleena.20.jpeg","img/aleena.21.jpeg"],  // e.g. ["img/1.jpg","img/2.jpg"] — empty shows blank polaroids like the video
  caption: "Happy Birthday! 🎂",
  letter: `Dear vincent,

Happy Birthday to someone truly special 🎂

You are my Fake Friend, Kind Heart, Always There, and I'm so grateful to have you in my life.

You bring so much warmth and sweetness into my life. Every moment with you is precious.

On your special day, I wish you all the happiness, love, and joy that you deserve. May this year bring you countless beautiful moments and wonderful memories.

Here's to celebrating you today and always! 🎉

With love and best wishes,
Your Special Someone 🧡`,
  words: ["You", "are", "so", "special"],
  /* final page */
  finalWish: "Happy Birthday, Vincent! 🎂\nNtha parayende onnum parayan illa.\nAunty lot ulla distance aduth aduth verunn,rejection kelkkanam enn ind but choyikkunnillah njn, ni ayit parayunn ind enkil mathy,njn ayit shaliyam akkunnilah,hope continues.\n Happy Janicha Divasam",
  finalSign: "Forever yours ♥",
  slideMs: 3500
};
/* ================================= */
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const show = id => { $$(".screen").forEach(s => s.classList.remove("active")); $("#" + id).classList.add("active");
  document.body.classList.toggle("pinkbg", id === "s-lock"); if (id === "s-balloon") initBalloons();
  if (id === "s-candle") initCandle(); if (id === "s-photo") initPhotos(); if (id === "s-final") initFinal(); };

/* New additions: countdown, music, wishes, universe, reasons and finale */
initCountdown();
initMusic();
initUniverse();
initReasons();
initWishScreen();
initFinale();
$$(".name").forEach(e => e.textContent = CONFIG.name);
$("#s-candle .title").textContent = "Blow the candle, " + CONFIG.name;
document.body.classList.add("pinkbg");
$$("[data-next]").forEach(b => b.onclick = () => show(b.dataset.next));

/* floating hearts */
for (let i = 0; i < 14; i++) { const h = document.createElement("span"); h.textContent = "♥";
  h.style.cssText = `left:${Math.random()*100}%;font-size:${12+Math.random()*22}px;animation-duration:${10+Math.random()*12}s;animation-delay:${-Math.random()*20}s`;
  $("#hearts").appendChild(h); }

/* confetti */
const cv = $("#confetti"), cx = cv.getContext("2d"); let bits = [];
const fit = () => { cv.width = innerWidth; cv.height = innerHeight; }; fit(); addEventListener("resize", fit);
function burst(n = 140, x = innerWidth / 2, y = innerHeight / 3) {
  const cols = ["#ff7b9c", "#ffd166", "#7bd88f", "#6ec1ff", "#b48cff", "#ff9a5a"];
  for (let i = 0; i < n; i++) bits.push({ x, y, vx: (Math.random() - .5) * 12, vy: Math.random() * -10 - 2, w: 5 + Math.random() * 6, h: 4 + Math.random() * 5,
    c: cols[i % cols.length], r: Math.random() * 6, vr: (Math.random() - .5) * .3, life: 260 });
  if (bits.length === n) loop();
}
function loop() { cx.clearRect(0, 0, cv.width, cv.height);
  bits = bits.filter(b => b.life-- > 0 && b.y < cv.height + 20);
  bits.forEach(b => { b.vy += .22; b.vx *= .99; b.x += b.vx; b.y += b.vy; b.r += b.vr;
    cx.save(); cx.translate(b.x, b.y); cx.rotate(b.r); cx.fillStyle = b.c; cx.globalAlpha = Math.min(1, b.life / 60); cx.fillRect(-b.w / 2, -b.h / 2, b.w, b.h); cx.restore(); });
  if (bits.length) requestAnimationFrame(loop); }

/* 1. passcode */
let code = "";
const pad = $("#pad");
["1","2","3","4","5","6","7","8","9","0","×"].forEach(k => { const b = document.createElement("button");
  b.textContent = k; if (k === "0") b.className = "z"; b.onclick = () => key(k); pad.appendChild(b); });
function key(k) { if (k === "×") code = code.slice(0, -1); else if (code.length < 4) code += k;
  $$("#boxes i").forEach((b, i) => { b.textContent = code[i] || ""; b.classList.toggle("on", !!code[i]); });
  if (code.length === 4) setTimeout(() => {
    if (code === CONFIG.passcode) { burst(); show("s-hello"); }
    else { $("#boxes").classList.add("shake"); $("#lockMsg").textContent = "Oops, try again 💗";
      setTimeout(() => { $("#boxes").classList.remove("shake"); key("×"); code = ""; key("×"); }, 450); } }, 250); }
addEventListener("keydown", e => { if ($("#s-lock").classList.contains("active")) { if (/\d/.test(e.key)) key(e.key); if (e.key === "Backspace") key("×"); } });

/* 2. "No" button runs away */
const no = $("#no"); const dodge = () => { no.style.position = "relative"; no.style.left = (Math.random() * 120 - 60) + "px"; no.style.top = (Math.random() * 60 - 30) + "px"; };
no.onmouseenter = dodge; no.onclick = dodge;

/* 3. balloons */
function initBalloons() {
  const st = $("#balloonStage"); if (st.dataset.done) return; st.dataset.done = 1;
  const cols = ["#f4b7c5", "#a8e0b8", "#b8b4ee", "#f6d58e"], pos = [[62, 22], [20, 62], [68, 60], [38, 40]], wp = [[18, 28], [60, 20], [14, 78], [62, 82]];
  let popped = 0;
  CONFIG.words.forEach((w, i) => {
    const wd = document.createElement("div"); wd.className = "word"; wd.textContent = w; wd.style.left = wp[i][0] + "%"; wd.style.top = wp[i][1] + "%"; st.appendChild(wd);
    const b = document.createElement("div"); b.className = "balloon"; b.style.cssText = `--c:${cols[i]};left:${pos[i][0]}%;top:${pos[i][1]}%;animation-delay:${i*.4}s`;
    b.onclick = () => { b.classList.add("pop"); wd.classList.add("show"); const r = b.getBoundingClientRect(); burst(30, r.x + 30, r.y + 40);
      setTimeout(() => b.remove(), 300); if (++popped === 4) setTimeout(() => show("s-candle"), 2200); };
    st.appendChild(b); });
}

/* 4. candle */
function initCandle() {
  const c = $("#candle"); c.onclick = () => { if ($("#flame").classList.contains("out")) return;
    $("#flame").classList.add("out"); $("#candleHint").style.opacity = 0; $("#wish").classList.add("show"); burst(90);
    setTimeout(() => show("s-wish"), 1800); }; }

/* 5. photos */
function initPhotos() {
  const box = $("#polaroids"); if (box.dataset.done) return; box.dataset.done = 1;
  const n = Math.max(CONFIG.photos.length, 3);
  for (let i = n - 1; i >= 0; i--) { const p = document.createElement("div"); p.className = "pol"; p.style.transform = `rotate(${(i % 2 ? 1 : -1) * i * 2}deg)`;
    p.innerHTML = `<div class="img" style="${CONFIG.photos[i] ? `background-image:url('${CONFIG.photos[i]}')` : ""}"></div><p>${CONFIG.caption}</p>`;
    p.onclick = () => { p.classList.add("gone"); setTimeout(() => p.remove(), 600); }; box.appendChild(p); } }

/* 6. letter */
$("#envelope").onclick = () => {
  $("#envelope").classList.add("open"); $("#tapHint").style.display = $("#tapBottom").style.display = "none";
  setTimeout(() => { $("#envelope").style.display = "none"; $("#letter").classList.add("show"); type(); }, 500); };
function type() { const t = $("#letterText"); let i = 0;
  (function tick() { t.textContent = CONFIG.letter.slice(0, ++i); t.scrollTop = t.scrollHeight;
    if (i < CONFIG.letter.length) setTimeout(tick, 38); else $("#lastBtn").classList.remove("hidden"); })(); }
$("#lastBtn").onclick = () => show("s-final");


/* ===== NEW FEATURE 1: RECURRING BIRTHDAY COUNTDOWN ===== */
function initCountdown() {
  const target = new Date(CONFIG.birthdayDate);
  const els = {
    days: $("#cdDays"), hours: $("#cdHours"),
    minutes: $("#cdMinutes"), seconds: $("#cdSeconds")
  };
  const heading = $("#countdownHeading");
  if (!Number.isFinite(target.getTime())) {
    $("#countdownCard").style.display = "none";
    return;
  }
  function update() {
    const now = new Date();
    let next = new Date(target);
    // If configured date has passed, roll forward to the next year.
    if (next.getTime() <= now.getTime()) next.setFullYear(now.getFullYear() + 1);
    let diff = Math.max(0, next.getTime() - now.getTime());
    const d = Math.floor(diff / 86400000); diff %= 86400000;
    const h = Math.floor(diff / 3600000); diff %= 3600000;
    const m = Math.floor(diff / 60000); const s = Math.floor((diff % 60000) / 1000);
    els.days.textContent = String(d).padStart(2, "0");
    els.hours.textContent = String(h).padStart(2, "0");
    els.minutes.textContent = String(m).padStart(2, "0");
    els.seconds.textContent = String(s).padStart(2, "0");
    heading.textContent = d === 0 && h === 0 && m === 0 && s < 60
      ? "Your special moment is here! ♥" : "Counting down to your special day";
  }
  update();
  setInterval(update, 1000);
}

/* ===== NEW FEATURE 2: BACKGROUND MUSIC ===== */
function initMusic() {
  const audio = $("#bgMusic"), btn = $("#musicToggle"), label = $("#musicLabel");
  audio.src = CONFIG.musicPath || "music/Aaraadhike.mp3.mpeg";
  let playing = false;
  async function toggleMusic() {
    if (!playing) {
      try {
        await audio.play();
        playing = true; btn.classList.add("playing");
        btn.setAttribute("aria-label", "Pause background music");
        btn.title = "Pause music"; label.textContent = "Pause our song";
      } catch (err) {
        label.textContent = "Add your music file";
      }
    } else {
      audio.pause(); playing = false; btn.classList.remove("playing");
      btn.setAttribute("aria-label", "Play background music");
      btn.title = "Play music"; label.textContent = "Play our song";
    }
  }
  btn.addEventListener("click", toggleMusic);
  audio.addEventListener("error", () => {
    if (!playing) label.textContent = "Add your music file";
  });
}

/* ===== NEW FEATURE 3: WISH-MAKING SCREEN ===== */
function initWishScreen() {
  const input = $("#wishInput"), send = $("#sendWish"), response = $("#wishResponse");
  send.addEventListener("click", () => {
    const wish = input.value.trim();
    if (!wish) {
      response.textContent = "Write a little wish first, lovely ♥";
      input.focus(); return;
    }
    const star = $("#shootingStar");
    star.classList.remove("shoot");
    void star.offsetWidth;
    star.classList.add("shoot");
    response.textContent = "Your wish is sent to the stars. May it find its way to you! ✨";
    send.disabled = true;
    setTimeout(() => { send.disabled = false; }, 1400);
    burst(70, innerWidth / 2, innerHeight / 2);
  });
  $("#wishContinue").addEventListener("click", () => show("s-photo"));
}

/* ===== NEW FEATURE 4: OUR LITTLE UNIVERSE ===== */
function initUniverse() {
  $$(".memory-star").forEach(star => {
    star.addEventListener("click", () => {
      $("#memoryReveal").textContent = star.dataset.memory;
      $$(".memory-star").forEach(s => s.classList.remove("selected"));
      star.classList.add("selected");
      burst(18, innerWidth / 2, innerHeight / 2);
    });
  });
}

/* ===== NEW FEATURE 5: TEN FLIP CARDS ===== */
function initReasons() {
  const reasons = [
    "Budhi illayima",
    "Mandatheram",
    "Chiri",
    "Yenne motor akki vidal",
    "Ninte kannu",
    "Varthanam",
    "Kudumbhasree Varthanam",
    "Fake Friend",
    "Small small adi",
    "Simply because you're you ♥"
  ];
  const grid = $("#reasonsGrid");
  reasons.forEach((reason, i) => {
    const card = document.createElement("button");
    card.className = "reason-card";
    card.type = "button";
    card.setAttribute("aria-label", "Reveal reason " + (i + 1));
    card.innerHTML = `<span class="reason-front"><b>${String(i + 1).padStart(2, "0")}</b><small>Tap to reveal</small></span><span class="reason-back">${reason}</span>`;
    card.addEventListener("click", () => {
      card.classList.toggle("flipped");
      card.setAttribute("aria-label", card.classList.contains("flipped") ? reason : "Reveal reason " + (i + 1));
    });
    grid.appendChild(card);
  });
}

/* ===== NEW FEATURE 6: GRAND FINALE ===== */
function initFinale() {
  $("#fHeartBtn").addEventListener("click", () => {
    bloomTulips(18); floatHearts(16);
    const overlay = $("#finaleOverlay");
    overlay.classList.add("show");
    overlay.setAttribute("aria-hidden", "false");
    finaleBurst();
  });
  $("#closeFinale").addEventListener("click", () => {
    $("#finaleOverlay").classList.remove("show");
    $("#finaleOverlay").setAttribute("aria-hidden", "true");
  });
}
function finaleBurst() {
  const host = $("#finaleFireworks");
  host.innerHTML = "";
  for (let j = 0; j < 5; j++) {
    const f = document.createElement("span");
    f.className = "firework";
    f.style.left = (12 + Math.random() * 76) + "%";
    f.style.top = (12 + Math.random() * 55) + "%";
    f.style.animationDelay = (j * .22) + "s";
    host.appendChild(f);
  }
  burst(220);
}

/* 7. final page */
let finalReady = false;
function initFinal() {
  if (finalReady) return; finalReady = true;
  burst(160);
  const photos = CONFIG.photos.filter(Boolean);
  const track = $("#fTrack"), dotsEl = $("#fDots"), slider = $("#fSlider");
  let index = 0, timer = null;

  if (!photos.length) { slider.style.display = "none"; }
  photos.forEach((src, i) => {
    const sl = document.createElement("div"); sl.className = "f-slide";
    const img = document.createElement("img");
    img.alt = "Photo " + (i + 1); img.draggable = false; img.loading = i ? "lazy" : "eager"; img.src = src;
    sl.appendChild(img); track.appendChild(sl);
    const d = document.createElement("button"); d.className = "f-dot"; d.setAttribute("aria-label", "Go to photo " + (i + 1));
    d.onclick = () => { go(i); restart(); }; dotsEl.appendChild(d);
  });
  function go(i) {
    index = (i + photos.length) % photos.length;
    track.style.transform = "translateX(" + (-index * 100) + "%)";
    [...dotsEl.children].forEach((d, k) => d.classList.toggle("on", k === index));
  }
  function restart() { clearInterval(timer); if (photos.length > 1) timer = setInterval(() => go(index + 1), CONFIG.slideMs); }
  $("#fNext").onclick = () => { go(index + 1); restart(); };
  $("#fPrev").onclick = () => { go(index - 1); restart(); };
  let x0 = null;
  slider.addEventListener("touchstart", e => { x0 = e.touches[0].clientX; clearInterval(timer); }, { passive: true });
  slider.addEventListener("touchend", e => {
    if (x0 !== null) { const dx = e.changedTouches[0].clientX - x0; if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1)); }
    x0 = null; restart(); });
  go(0); restart();

  /* typewriter wish */
  const wish = CONFIG.finalWish.replace("{name}", CONFIG.name), wEl = $("#fWishText"); let n = 0;
  (function tick() { wEl.textContent = wish.slice(0, ++n);
    if (n < wish.length) setTimeout(tick, 38); else $("#fSign").textContent = CONFIG.finalSign; })();

  /* hearts + tulips */
  floatHearts(10);
  $("#fHeartBtn").onclick = () => { bloomTulips(18); floatHearts(10); };
  bloomTulips(10);
}
function floatHearts(n) {
  const host = $("#s-final");
  for (let i = 0; i < n; i++) {
    const h = document.createElement("div"); h.className = "f-heart";
    h.textContent = ["♥", "💗", "💖", "🧸"][Math.floor(Math.random() * 4)];
    h.style.left = Math.random() * 100 + "vw"; h.style.fontSize = (16 + Math.random() * 18) + "px";
    h.style.animationDuration = (4 + Math.random() * 3) + "s";
    host.appendChild(h); setTimeout(() => h.remove(), 7500);
  }
}
function makeTulip() {
  const tilt = (Math.random() * 14 - 7).toFixed(1), flip = Math.random() > .5 ? -1 : 1, leafH = 0.8 + Math.random() * 0.25;
  return `<svg viewBox="0 0 80 200" xmlns="http://www.w3.org/2000/svg">
  <g class="stem">
    <g transform="translate(40 200) scale(${flip} ${leafH}) translate(-40 -200)">
      <path d="M38 196 C16 172 2 132 12 92 C16 124 32 156 41 196Z" fill="url(#gLeaf)"/>
      <path d="M39 194 C27 164 17 130 12 96" stroke="#3f7a47" stroke-opacity=".45" stroke-width="1" fill="none"/>
      <path d="M42 196 C58 178 70 146 66 112 C56 138 46 162 40 196Z" fill="url(#gLeaf)" opacity=".92"/>
      <path d="M41 194 C52 170 60 142 66 116" stroke="#3f7a47" stroke-opacity=".4" stroke-width="1" fill="none"/>
    </g>
    <path d="M40 200 C38 160 43 122 40 82" stroke="url(#gStem)" stroke-width="5" fill="none" stroke-linecap="round"/>
    <path d="M41.5 198 C40 160 45 122 41.5 84" stroke="#b7dcae" stroke-opacity=".55" stroke-width="1.2" fill="none" stroke-linecap="round"/>
  </g>
  <g class="head"><g transform="translate(40 0) scale(${flip} 1) translate(-40 0) rotate(${tilt} 40 84)">
    <ellipse cx="40" cy="83" rx="9" ry="3.5" fill="#cfd9c3" opacity=".8"/>
    <path d="M40 84 C18 82 9 56 13 29 C14 20 19 17 22 23 C27 33 34 41 40 47Z" fill="url(#gPetalB)" stroke="#d3c8cd" stroke-width=".7"/>
    <path d="M40 84 C62 82 71 56 67 29 C66 20 61 17 58 23 C53 33 46 41 40 47Z" fill="url(#gPetalB)" stroke="#d3c8cd" stroke-width=".7"/>
    <g class="pl"><path d="M40 86 C24 83 19 56 27 31 C30 21 36 14 41 10 C37 34 36 62 40 86Z" fill="url(#gPetalL)" stroke="#e0d6db" stroke-width=".8"/>
      <path d="M31 62 C27 50 28 40 32 28" stroke="#fff" stroke-width="1.6" stroke-linecap="round" fill="none" opacity=".9"/></g>
    <g class="pr"><path d="M40 86 C56 83 61 56 53 31 C50 21 44 14 41 10 C43 34 44 62 40 86Z" fill="url(#gPetalR)" stroke="#d9cfd5" stroke-width=".8"/>
      <path d="M50 60 C53 50 52 40 49 30" stroke="#fff" stroke-width="1.2" stroke-linecap="round" fill="none" opacity=".6"/></g>
  </g></g>
</svg>`;
}
function bloomTulips(n) {
  const g = $("#fGarden");
  for (let i = 0; i < n; i++) {
    const t = document.createElement("div"), w = 50 + Math.random() * 60;
    t.className = "tulip" + (Math.random() > .4 ? " sway" : "");
    t.style.width = w + "px"; t.style.left = (Math.random() * 96) + "vw"; t.style.bottom = (-Math.random() * 16) + "px";
    t.style.setProperty("--d", (Math.random() * 1.6).toFixed(2) + "s"); t.style.zIndex = Math.round(w);
    t.innerHTML = makeTulip(); g.appendChild(t);
  }
  while (g.children.length > 80) g.children[0].remove();
}
