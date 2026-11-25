/* QuantumTheology core: storage, XP and badges. Loads before everything else. */
(function () {
  "use strict";
  var Q = window.QT = window.QT || {};

  /* ---------- storage (never throws) ---------- */
  Q.store = {
    get: function (k, d) {
      try { var v = localStorage.getItem("qt_" + k); return v === null ? d : JSON.parse(v); } catch (e) { return d; }
    },
    set: function (k, v) {
      try { localStorage.setItem("qt_" + k, JSON.stringify(v)); return true; } catch (e) { return false; }
    }
  };

  /* ---------- XP, levels, streaks, badges ---------- */
  var BADGES = [
    ["first", "First Blood", "Earn your first 10 XP.", function (s) { return s.xp >= 10; }],
    ["fallacy", "Fallacy Hunter", "Spot 15 fallacies correctly.", function (s) { return (s.c.fallacy || 0) >= 15; }],
    ["accuracy", "Receipts Only", "Pass 15 accuracy checks.", function (s) { return (s.c.accuracy || 0) >= 15; }],
    ["boss1", "Boss Slayer", "Beat any boss battle.", function (s) { return (s.c.boss || 0) >= 1; }],
    ["boss4", "All Four Bosses", "Beat all four bosses.", function (s) { return Object.keys(s.bosses || {}).length >= 4; }],
    ["streak3", "On Fire", "Keep a 3-day streak.", function (s) { return s.best >= 3; }],
    ["streak7", "Unstoppable", "Keep a 7-day streak.", function (s) { return s.best >= 7; }],
    ["cards", "Deck Master", "Review 50 flashcards.", function (s) { return (s.c.card || 0) >= 50; }],
    ["verses", "Hidden in My Heart", "Complete 10 memory verses.", function (s) { return (s.c.verse || 0) >= 10; }],
    ["duel", "Time Lord", "Win 10 timeline duels.", function (s) { return (s.c.duel || 0) >= 10; }],
    ["lv5", "Level 5", "Reach level 5.", function (s) { return Q.level(s.xp) >= 5; }],
    ["lv10", "Level 10", "Reach level 10.", function (s) { return Q.level(s.xp) >= 10; }]
  ];
  Q.badges = BADGES;
  Q.level = function (xp) { return Math.floor(Math.sqrt(xp / 40)) + 1; };
  Q.levelFloor = function (lv) { return Math.pow(lv - 1, 2) * 40; };
  function today() { var d = new Date(); return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate(); }
  function blank() { return { xp: 0, c: {}, streak: 0, best: 0, last: "", badges: {}, bosses: {} }; }
  Q.prog = function () {
    var s = Q.store.get("progress", null) || blank();
    s.c = s.c || {}; s.badges = s.badges || {}; s.bosses = s.bosses || {};
    return s;
  };
  function toast(msg, kind) {
    var box = document.getElementById("toasts");
    if (!box) return;
    var t = document.createElement("div");
    t.className = "toast" + (kind ? " " + kind : "");
    t.textContent = msg;
    box.appendChild(t);
    setTimeout(function () { t.classList.add("out"); }, 2600);
    setTimeout(function () { if (t.parentNode) t.parentNode.removeChild(t); }, 3200);
  }
  Q.toast = toast;
  Q.award = function (n, kind) {
    var s = Q.prog(), before = Q.level(s.xp), d = today();
    if (s.last !== d) {
      var y = new Date(); y.setDate(y.getDate() - 1);
      var yd = y.getFullYear() + "-" + (y.getMonth() + 1) + "-" + y.getDate();
      s.streak = s.last === yd ? s.streak + 1 : 1;
      s.best = Math.max(s.best || 0, s.streak);
      s.last = d;
    }
    s.xp += n;
    if (kind) s.c[kind] = (s.c[kind] || 0) + 1;
    BADGES.forEach(function (b) {
      if (!s.badges[b[0]] && b[3](s)) { s.badges[b[0]] = d; toast("Badge unlocked: " + b[1], "badge"); }
    });
    Q.store.set("progress", s);
    if (Q.level(s.xp) > before) toast("Level up! You're level " + Q.level(s.xp), "badge");
    Q.paintXP();
    return s;
  };
  Q.paintXP = function () {
    var s = Q.prog(), el = document.getElementById("xpChip");
    if (!el) return;
    el.querySelector(".xp-lv").textContent = "Lv " + Q.level(s.xp);
    el.querySelector(".xp-n").textContent = s.xp + " XP";
    var st = el.querySelector(".xp-streak");
    if (st) st.textContent = s.streak > 1 ? s.streak + "-day streak" : "";
  };
})();
