/* The Training Arena: ten activities, XP, streaks and badges. */
(function () {
  "use strict";
  var Q = window.QT;
  var stage = document.getElementById("arenaStage"), tabs = document.getElementById("arenaTabs"), stats = document.getElementById("arenaStats");
  if (!Q || !stage || !tabs || !Q.qa) return;

  function el(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html !== undefined) e.innerHTML = html; return e; }
  function $(s, r) { return (r || document).querySelector(s); }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function plain(h) { var d = document.createElement("div"); d.innerHTML = h; return d.textContent; }
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function pick(a, n) { return shuffle(a).slice(0, n); }
  function seedRand(str) {
    var h = 1779033703 ^ str.length;
    for (var i = 0; i < str.length; i++) { h = Math.imul(h ^ str.charCodeAt(i), 3432918353); h = (h << 13) | (h >>> 19); }
    return function () {
      h = Math.imul(h ^ (h >>> 16), 2246822507); h = Math.imul(h ^ (h >>> 13), 3266489909); h ^= h >>> 16;
      return (h >>> 0) / 4294967296;
    };
  }
  function today() { var d = new Date(); return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate(); }
  function award(n, k) { return Q.award ? Q.award(n, k) : null; }
  var timers = [];
  function clearTimers() { timers.forEach(function (t) { clearInterval(t); clearTimeout(t); }); timers = []; }
  function panel(html) { var c = el("article", "card arena-card bloomed", html); return c; }
  function enhance(node) { if (Q.enhance) Q.enhance(node); }

  /* ---------- progress card ---------- */
  function paintStats() {
    var s = Q.prog(), lv = Q.level(s.xp), lo = Q.levelFloor(lv), hi = Q.levelFloor(lv + 1);
    var pct = Math.max(0, Math.min(100, Math.round((s.xp - lo) / (hi - lo) * 100)));
    stats.innerHTML =
      '<div class="as-top"><div><span class="label">Your progress</span><h3>Level ' + lv + '</h3></div>' +
      '<div class="as-nums"><strong>' + s.xp + '</strong> XP · <strong>' + s.streak + '</strong>-day streak · best <strong>' + (s.best || 0) + '</strong></div></div>' +
      '<div class="bar" role="progressbar" aria-valuenow="' + pct + '" aria-valuemin="0" aria-valuemax="100"><span style="width:' + pct + '%"></span></div>' +
      '<p class="sheet-note">' + (hi - s.xp) + ' XP to level ' + (lv + 1) + '. Saved in this browser only.</p>' +
      '<div class="badges">' + Q.badges.map(function (b) {
        var on = !!s.badges[b[0]];
        return '<span class="bdg ' + (on ? "on" : "") + '" title="' + esc(b[2]) + '"><b>' + esc(b[1]) + '</b><i>' + (on ? "Unlocked" : esc(b[2])) + '</i></span>';
      }).join("") + '</div>' +
      '<button class="copy-btn" id="resetProg" type="button">Reset progress</button>';
    var r = $("#resetProg", stats);
    if (r) r.addEventListener("click", function () {
      if (window.confirm("Reset all XP, streaks and badges? This can't be undone.")) { Q.store.set("progress", null); Q.store.set("fc", {}); Q.paintXP(); }
    });
  }
  var origPaint = Q.paintXP;
  Q.paintXP = function () { if (origPaint) origPaint(); paintStats(); };

  /* ---------- shared quiz engine ---------- */
  function runQuiz(box, cfg) {
    var items = cfg.items, i = 0, right = 0;
    function show() {
      if (i >= items.length) return done();
      var q = cfg.build(items[i]);
      box.innerHTML = "";
      var c = panel('<div class="card-top"><span class="label">' + cfg.name + ' · ' + (i + 1) + ' of ' + items.length + '</span><span class="qscore">' + right + ' correct</span></div>' +
        '<h3 class="qprompt">' + q.prompt + '</h3>' + (q.sub ? '<p class="sheet-note">' + q.sub + "</p>" : "") + '<div class="opts"></div><div class="reveal" hidden></div>');
      var opts = $(".opts", c), reveal = $(".reveal", c), done1 = false;
      q.choices.forEach(function (ch) {
        var b = el("button", "opt", ch.label);
        b.type = "button";
        b.addEventListener("click", function () {
          if (done1) return;
          done1 = true;
          var all = opts.querySelectorAll(".opt");
          Array.prototype.forEach.call(all, function (x, idx) {
            x.disabled = true;
            if (q.choices[idx].ok) x.classList.add("good");
          });
          if (ch.ok) { right++; award(cfg.xp, cfg.kind); } else b.classList.add("bad");
          reveal.hidden = false;
          reveal.innerHTML = '<p class="verdict ' + (ch.ok ? "ok" : "no") + '">' + (ch.ok ? "Correct." : "Not quite.") + '</p><p class="body">' + q.explain + '</p>' +
            '<button class="fc-btn fc-flip nxt" type="button">' + (i + 1 >= items.length ? "See results" : "Next →") + '</button>';
          $(".nxt", reveal).addEventListener("click", function () { i++; show(); });
          $(".nxt", reveal).focus();
        });
        opts.appendChild(b);
      });
      box.appendChild(c);
      enhance(c);
    }
    function done() {
      var perfect = right === items.length;
      if (perfect) { award(5, null); }
      box.innerHTML = "";
      var c = panel('<span class="label">' + cfg.name + ' · results</span><h3>' + right + ' of ' + items.length + (perfect ? " · Perfect!" : "") + '</h3>' +
        '<p class="body">' + (perfect ? "Flawless. +5 bonus XP." : right >= items.length * 0.7 ? "Solid round. A few more and you'll be airtight." : "Good practice. Read the explanations and go again.") + '</p>' +
        '<button class="fc-btn fc-flip" id="again" type="button">Play again</button>');
      box.appendChild(c);
      $("#again", c).addEventListener("click", function () { cfg.again(); });
    }
    show();
  }

  /* ---------- 1. Rebuttal Cards ---------- */
  function cards(box) {
    var fc = Q.store.get("fc", {}), cat = "all", mode = "all", order = [], pos = 0, seen = 0;
    function build() {
      order = [];
      Q.qa.forEach(function (x, i) {
        if (cat !== "all" && x.c !== cat) return;
        if (mode === "missed" && fc[i] !== 1) return;
        order.push(i);
      });
      order = shuffle(order); pos = 0;
    }
    var c = panel(
      '<div class="chips fc-cats" id="fcCats"></div>' +
      '<div class="fc-mode"><button class="tgl" id="fcAll" type="button" aria-pressed="true">All cards</button><button class="tgl" id="fcMissed" type="button" aria-pressed="false">Only ones I missed</button></div>' +
      '<div class="practice"><div class="fc-meta"><span id="fcCount"></span><span class="fc-cat" id="fcCat"></span></div>' +
      '<div class="flashcard" id="flashcard"><div class="fc-inner"><div class="fc-face fc-front"><span class="label">Objection</span><h3 id="fcQ"></h3><span class="fc-hint">Say your answer out loud, then tap to flip ↻</span></div><div class="fc-face fc-back" id="fcA"></div></div></div>' +
      '<div class="fc-controls"><button class="fc-btn" id="fcPrev" type="button" aria-label="Previous card">←</button><button class="fc-btn fc-flip" id="fcFlip" type="button">Flip ↻</button><button class="fc-btn" id="fcNext" type="button" aria-label="Next card">→</button></div>' +
      '<div class="fc-controls fc-grade" id="fcGrade" hidden><button class="fc-btn good" id="fcGot" type="button">I had it</button><button class="fc-btn bad" id="fcMiss" type="button">I missed it</button></div></div>');
    box.appendChild(c);
    $("#fcCats", c).innerHTML = Q.qaCats.map(function (k, i) { return '<button class="chip" type="button" data-cat="' + k[0] + '" aria-pressed="' + (i === 0) + '">' + k[1] + "</button>"; }).join("");
    var card = $("#flashcard", c), flipped = false;
    function fill() {
      var fcA = $("#fcA", c);
      if (!order.length) {
        $("#fcQ", c).textContent = mode === "missed" ? "No missed cards here yet. Nice." : "No cards.";
        fcA.innerHTML = ""; $("#fcCount", c).textContent = "0 / 0"; $("#fcCat", c).textContent = ""; $("#fcGrade", c).hidden = true;
        card.classList.remove("flipped"); return;
      }
      var i = order[pos], x = Q.qa[i];
      $("#fcQ", c).innerHTML = x.q;
      $("#fcCat", c).textContent = Q.catName[x.c];
      $("#fcCount", c).textContent = (pos + 1) + " / " + order.length;
      fcA.innerHTML = '<div class="fallacy"><strong>Fallacy:</strong> ' + x.f + '</div><div class="evidence" data-link><strong>Quick answer:</strong> ' + x.a + '</div><div class="evidence" data-link><strong>Full:</strong> ' + x.b + '</div>';
      enhance(fcA);
      $("#fcGrade", c).hidden = true;
    }
    function go(d) {
      if (!order.length) return;
      pos = (pos + d + order.length) % order.length;
      if (flipped) { card.classList.remove("flipped"); flipped = false; setTimeout(fill, Q.reduceMotion ? 0 : 300); } else fill();
    }
    function flip() {
      if (!order.length) return;
      flipped = !flipped; card.classList.toggle("flipped", flipped);
      $("#fcGrade", c).hidden = !flipped;
    }
    function grade(ok) {
      var i = order[pos]; fc[i] = ok ? 2 : 1; Q.store.set("fc", fc); award(1, "card");
      if (mode === "missed" && ok) { order.splice(pos, 1); if (pos >= order.length) pos = 0; }
      else pos = (pos + 1) % Math.max(1, order.length);
      card.classList.remove("flipped"); flipped = false; setTimeout(fill, Q.reduceMotion ? 0 : 300);
    }
    card.addEventListener("click", function (e) { if (e.target.closest("a, button")) return; flip(); });
    $("#fcFlip", c).addEventListener("click", flip);
    $("#fcNext", c).addEventListener("click", function () { go(1); });
    $("#fcPrev", c).addEventListener("click", function () { go(-1); });
    $("#fcGot", c).addEventListener("click", function () { grade(true); });
    $("#fcMiss", c).addEventListener("click", function () { grade(false); });
    $("#fcCats", c).addEventListener("click", function (e) {
      var b = e.target.closest("[data-cat]"); if (!b) return;
      cat = b.getAttribute("data-cat");
      Array.prototype.forEach.call($("#fcCats", c).children, function (n) { n.setAttribute("aria-pressed", String(n === b)); });
      build(); card.classList.remove("flipped"); flipped = false; fill();
    });
    function setMode(m) { mode = m; $("#fcAll", c).setAttribute("aria-pressed", String(m === "all")); $("#fcMissed", c).setAttribute("aria-pressed", String(m === "missed")); build(); card.classList.remove("flipped"); flipped = false; fill(); }
    $("#fcAll", c).addEventListener("click", function () { setMode("all"); });
    $("#fcMissed", c).addEventListener("click", function () { setMode("missed"); });
    c.querySelector(".practice").addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") { go(1); e.preventDefault(); }
      if (e.key === "ArrowLeft") { go(-1); e.preventDefault(); }
    });
    var sx = 0, sy = 0;
    card.addEventListener("touchstart", function (e) { sx = e.touches[0].clientX; sy = e.touches[0].clientY; }, { passive: true });
    card.addEventListener("touchend", function (e) {
      var t = e.changedTouches[0], dx = t.clientX - sx, dy = t.clientY - sy;
      if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.4) go(dx < 0 ? 1 : -1);
    }, { passive: true });
    build(); fill();
  }

  /* ---------- 2. Fallacy Spotter ---------- */
  function fallacy(box) {
    function play() {
      var items = pick(Q.fallacyQuiz, 10);
      runQuiz(box, {
        name: "Fallacy Spotter", kind: "fallacy", xp: 3, items: items, again: play,
        build: function (it) {
          var others = shuffle(Q.fallacyPool.filter(function (f) { return f !== it[1]; })).slice(0, 3);
          var choices = shuffle([it[1]].concat(others)).map(function (f) { return { label: f, ok: f === it[1] }; });
          return { prompt: it[0], sub: "Which fallacy is this?", choices: choices, explain: "<strong>" + it[1] + ":</strong> " + (Q.fallacyDefs[it[1]] || "") + " " + it[2] };
        }
      });
    }
    play();
  }

  /* ---------- 3. Accuracy Check ---------- */
  function accuracy(box) {
    var LABEL = { safe: "Safe to say", soften: "Overclaim: soften it", wrong: "Wrong: don't say it" };
    function play() {
      runQuiz(box, {
        name: "Accuracy Check", kind: "accuracy", xp: 3, items: pick(Q.accuracy, 10), again: play,
        build: function (it) {
          return {
            prompt: "“" + it[0] + "”", sub: "Could an informed opponent catch you saying this?",
            choices: ["safe", "soften", "wrong"].map(function (v) { return { label: LABEL[v], ok: v === it[1] }; }),
            explain: "<strong>" + LABEL[it[1]] + ".</strong> " + it[2]
          };
        }
      });
    }
    play();
  }

  /* ---------- 4. Boss Battles ---------- */
  function boss(box) {
    function menu() {
      var prog = Q.prog();
      box.innerHTML = "";
      var c = panel('<span class="label">Boss Battles</span><h3>Pick your opponent</h3><p class="body">Five rounds each. Strong answers hurt the boss. Weak answers do nothing. Bad ones cost you credibility. Win with 7 of 10 points or more.</p><div class="bosses"></div>');
      Q.bosses.forEach(function (b) {
        var best = prog.bosses[b.id];
        var card = el("button", "boss-card", '<span class="boss-dot" style="background:' + b.color + '"></span><strong>' + esc(b.name) + '</strong><em>' + esc(b.sub) + '</em><span class="boss-best">' + (best !== undefined ? "Best: " + best + " / 10" : "Not beaten yet") + "</span>");
        card.type = "button";
        card.addEventListener("click", function () { fight(b); });
        $(".bosses", c).appendChild(card);
      });
      box.appendChild(c);
    }
    function fight(b) {
      var i = 0, total = 0, cred = 100;
      function round() {
        if (i >= b.rounds.length) return end();
        var r = b.rounds[i], bossHp = Math.max(0, 100 - total * 10);
        box.innerHTML = "";
        var c = panel('<div class="card-top"><span class="label" style="color:' + b.color + '">' + esc(b.name) + ' · round ' + (i + 1) + ' of ' + b.rounds.length + '</span></div>' +
          '<div class="hp"><div><small>Boss</small><div class="bar boss"><span style="width:' + bossHp + '%"></span></div></div><div><small>Your credibility</small><div class="bar you"><span style="width:' + cred + '%"></span></div></div></div>' +
          '<blockquote class="say">' + r.say + '</blockquote><p class="sheet-note">Your reply:</p><div class="opts"></div><div class="reveal" hidden></div>');
        var opts = $(".opts", c), reveal = $(".reveal", c), locked = false;
        var order = shuffle(r.opts);
        order.forEach(function (o) {
          var bt = el("button", "opt", o.t); bt.type = "button";
          bt.addEventListener("click", function () {
            if (locked) return; locked = true;
            total += o.s; if (o.s === 0) cred = Math.max(0, cred - 25);
            Array.prototype.forEach.call(opts.children, function (x, idx) { x.disabled = true; if (order[idx].s === 2) x.classList.add("good"); });
            bt.classList.add(o.s === 2 ? "good" : o.s === 1 ? "meh" : "bad");
            reveal.hidden = false;
            reveal.innerHTML = '<p class="verdict ' + (o.s === 2 ? "ok" : o.s === 1 ? "meh" : "no") + '">' + (o.s === 2 ? "Direct hit! +2" : o.s === 1 ? "A glancing blow. +1" : "That cost you. +0") + '</p><p class="body">' + o.why + '</p><button class="fc-btn fc-flip nxt" type="button">' + (i + 1 >= b.rounds.length ? "Finish" : "Next round →") + "</button>";
            $(".nxt", reveal).addEventListener("click", function () { i++; round(); });
            $(".nxt", reveal).focus();
          });
          opts.appendChild(bt);
        });
        box.appendChild(c);
        enhance(c);
      }
      function end() {
        var win = total >= 7 && cred > 0, prog = Q.prog(), first = win && prog.bosses[b.id] === undefined;
        var best = Math.max(total, prog.bosses[b.id] || 0);
        if (win) { var s = Q.prog(); s.bosses[b.id] = best; Q.store.set("progress", s); }
        award(5 + total * 3 + (first ? 15 : 0), win ? "boss" : null);
        box.innerHTML = "";
        var c = panel('<span class="label" style="color:' + b.color + '">' + esc(b.name) + '</span><h3>' + (total === 10 ? "Flawless victory" : win ? "Victory" : "Defeated, for now") + ' · ' + total + ' / 10</h3>' +
          '<p class="body">' + (win ? (total === 10 ? "Every answer landed. That's debate-ready." : "You held the line. Replay to turn the weaker answers into direct hits.") : "You didn't lose. You learned where to sharpen. Read the explanations and run it again.") + (first ? " First win: +15 bonus XP." : "") + '</p>' +
          '<div class="fc-controls"><button class="fc-btn fc-flip" id="rematch" type="button">Rematch</button><button class="fc-btn" id="menuBtn" type="button">All bosses</button></div>');
        box.appendChild(c);
        $("#rematch", c).addEventListener("click", function () { fight(b); });
        $("#menuBtn", c).addEventListener("click", menu);
      }
      box.innerHTML = "";
      var intro = panel('<span class="label" style="color:' + b.color + '">' + esc(b.sub) + '</span><h3>' + esc(b.name) + '</h3><p class="body">' + esc(b.intro) + '</p><button class="fc-btn fc-flip" id="startFight" type="button">Start the debate</button>');
      box.appendChild(intro);
      $("#startFight", intro).addEventListener("click", round);
    }
    menu();
  }

  /* ---------- 5. Live Panel ---------- */
  function panelSim(box) {
    var secs = 20, cat = "all";
    function intro() {
      box.innerHTML = "";
      var c = panel('<span class="label">Live Panel Simulator</span><h3>Five objections. Twenty seconds each.</h3><p class="body">Answer out loud in one or two sentences, like you would on a TikTok panel. Then reveal the quick answer and grade yourself honestly.</p>' +
        '<div class="chips" id="lpCats"></div><div class="fc-controls"><button class="fc-btn" id="lpFast" type="button" aria-pressed="false">Speed mode: 12 seconds</button><button class="fc-btn fc-flip" id="lpGo" type="button">Start</button></div>');
      box.appendChild(c);
      $("#lpCats", c).innerHTML = Q.qaCats.map(function (k, i) { return '<button class="chip" type="button" data-cat="' + k[0] + '" aria-pressed="' + (i === 0) + '">' + k[1] + "</button>"; }).join("");
      $("#lpCats", c).addEventListener("click", function (e) {
        var b = e.target.closest("[data-cat]"); if (!b) return; cat = b.getAttribute("data-cat");
        Array.prototype.forEach.call($("#lpCats", c).children, function (n) { n.setAttribute("aria-pressed", String(n === b)); });
      });
      $("#lpFast", c).addEventListener("click", function () { secs = secs === 20 ? 12 : 20; this.textContent = secs === 12 ? "Speed mode: ON (12 seconds)" : "Speed mode: 12 seconds"; });
      $("#lpGo", c).addEventListener("click", function () {
        var pool = Q.qa.filter(function (x) { return cat === "all" || x.c === cat; });
        run(pick(pool, 5));
      });
    }
    function run(list) {
      var i = 0, nailed = 0;
      function next() {
        clearTimers();
        if (i >= list.length) return fin();
        var x = list[i], left = secs;
        box.innerHTML = "";
        var c = panel('<div class="card-top"><span class="label">Objection ' + (i + 1) + ' of ' + list.length + '</span><span class="timer" id="lpT">' + left + 's</span></div><div class="bar timerbar"><span id="lpBar" style="width:100%"></span></div>' +
          '<h3 class="qprompt">' + x.q + '</h3><div class="fc-controls"><button class="fc-btn fc-flip" id="lpShow" type="button">Reveal the answer</button></div><div class="reveal" hidden></div>');
        box.appendChild(c);
        var t = setInterval(function () {
          left--; $("#lpT", c).textContent = Math.max(0, left) + "s"; $("#lpBar", c).style.width = Math.max(0, left / secs * 100) + "%";
          if (left <= 0) { clearInterval(t); reveal(); }
        }, 1000);
        timers.push(t);
        var shown = false;
        function reveal() {
          if (shown) return; shown = true; clearInterval(t);
          $("#lpShow", c).hidden = true;
          var r = $(".reveal", c); r.hidden = false;
          r.innerHTML = '<div class="fallacy"><strong>Fallacy:</strong> ' + x.f + '</div><div class="evidence" data-link><strong>Quick answer:</strong> ' + x.a + '</div>' +
            '<div class="fc-controls"><button class="fc-btn good" id="lpOk" type="button">Nailed it</button><button class="fc-btn bad" id="lpNo" type="button">Missed it</button></div>';
          enhance(r);
          function grade(ok) { if (ok) { nailed++; award(3, "panel"); } else award(1, null); i++; next(); }
          $("#lpOk", r).addEventListener("click", function () { grade(true); });
          $("#lpNo", r).addEventListener("click", function () { grade(false); });
        }
        $("#lpShow", c).addEventListener("click", reveal);
      }
      function fin() {
        box.innerHTML = "";
        var c = panel('<span class="label">Panel over</span><h3>' + nailed + ' of ' + list.length + ' answered cleanly</h3><p class="body">' + (nailed >= 4 ? "You're panel-ready." : "Run it again. Speed comes from repetition.") + '</p><button class="fc-btn fc-flip" id="lpAgain" type="button">New round</button>');
        box.appendChild(c);
        $("#lpAgain", c).addEventListener("click", intro);
      }
      next();
    }
    intro();
  }

  /* ---------- 6. Gate Explorer ---------- */
  function gates(box) {
    var worlds = Q.worldviews.filter(function (w) { return !w.win; });
    var short = ["A mind?", "One or many?", "Distinct from creation?", "One person or Tri-Une?", "Jesus in history?", "Gospel by grace alone?"];
    var c = panel('<span class="label">Gate Explorer</span><h3>Follow a worldview through the gates</h3><p class="body">Pick a worldview and see which gate stops it, and why.</p>' +
      '<label class="bfield"><span>Worldview</span><select id="gxSel"></select></label><div id="gxOut"></div>' +
      '<hr class="sep"><span class="label">Quiz</span><h3>Which gate stops it?</h3><div id="gxQuiz"></div>');
    box.appendChild(c);
    $("#gxSel", c).innerHTML = worlds.map(function (w, i) { return '<option value="' + i + '">' + plain(w.name) + "</option>"; }).join("");
    function show() {
      var w = worlds[+$("#gxSel", c).value], h = "";
      for (var g = 1; g <= 6; g++) {
        var cls = g < w.g ? "pass" : g === w.g ? "stop" : "dim";
        h += '<div class="gx ' + cls + '"><b>Gate ' + g + '</b><span>' + short[g - 1] + '</span><em>' + (g < w.g ? "Passes" : g === w.g ? "Stopped here" : "Never reached") + "</em></div>";
      }
      $("#gxOut", c).innerHTML = '<div class="gx-row">' + h + '</div><p class="body" data-link>' + w.text + ' <span class="axnote">(Axioms ' + w.ax + ')</span></p><p class="reply" data-link><strong>Their best reply:</strong> ' + w.reply + '</p>';
      enhance($("#gxOut", c));
    }
    $("#gxSel", c).addEventListener("change", show); show();
    var qbox = $("#gxQuiz", c), score = 0, asked = 0;
    function ask() {
      var w = pick(worlds, 1)[0];
      qbox.innerHTML = '<p class="qprompt">' + plain(w.name) + '</p><div class="opts gxopts"></div><div class="reveal" hidden></div><p class="sheet-note">' + score + ' of ' + asked + ' correct</p>';
      var opts = $(".gxopts", qbox);
      for (var g = 1; g <= 6; g++) (function (g) {
        var b = el("button", "opt", "Gate " + g + ": " + short[g - 1]); b.type = "button";
        b.addEventListener("click", function () {
          if (qbox.querySelector(".opt:disabled")) return;
          Array.prototype.forEach.call(opts.children, function (x) { x.disabled = true; });
          asked++; var ok = g === w.g; if (ok) { score++; award(2, "gate"); b.classList.add("good"); } else { b.classList.add("bad"); opts.children[w.g - 1].classList.add("good"); }
          var r = $(".reveal", qbox); r.hidden = false;
          r.innerHTML = '<p class="verdict ' + (ok ? "ok" : "no") + '">' + (ok ? "Correct." : "It's Gate " + w.g + ".") + '</p><p class="body">' + w.text + '</p><button class="fc-btn fc-flip nxt" type="button">Next →</button>';
          $(".nxt", r).addEventListener("click", ask);
        });
        opts.appendChild(b);
      })(g);
    }
    ask();
  }

  /* ---------- 7. Timeline Duel ---------- */
  function duel(box) {
    var rows = Q.timeline.filter(function (r) { return r[3] !== "debated"; });
    var streak = 0, best = 0;
    function round() {
      var a, b, tries = 0;
      do { var p = pick(rows, 2); a = p[0]; b = p[1]; tries++; } while (Math.abs(a[0] - b[0]) < 8 && tries < 40);
      box.innerHTML = "";
      var c = panel('<div class="card-top"><span class="label">Timeline Duel</span><span class="qscore">Streak ' + streak + ' · best ' + best + '</span></div><h3 class="qprompt">Which happened first?</h3><div class="opts duelopts"></div><div class="reveal" hidden></div>');
      var first = a[0] < b[0] ? a : b, opts = $(".opts", c);
      [a, b].forEach(function (r) {
        var bt = el("button", "opt", '<strong>' + r[4] + '</strong>'); bt.type = "button";
        bt.addEventListener("click", function () {
          if (opts.querySelector(":disabled")) return;
          var ok = r === first;
          Array.prototype.forEach.call(opts.children, function (x, idx) { x.disabled = true; var rr = idx === 0 ? a : b; x.innerHTML += '<small>' + rr[1] + "</small>"; if (rr === first) x.classList.add("good"); });
          if (ok) { streak++; best = Math.max(best, streak); award(2, "duel"); } else { streak = 0; bt.classList.add("bad"); }
          var rv = $(".reveal", c); rv.hidden = false;
          var gap = Math.abs(Math.floor(a[0]) - Math.floor(b[0]));
          rv.innerHTML = '<p class="verdict ' + (ok ? "ok" : "no") + '">' + (ok ? "Correct." : "Not that one.") + '</p><p class="body">' + gap + ' years apart. ' + first[5] + '</p><button class="fc-btn fc-flip nxt" type="button">Next pair →</button>';
          $(".nxt", rv).addEventListener("click", round);
        });
        opts.appendChild(bt);
      });
      box.appendChild(c);
    }
    round();
  }

  /* ---------- 8. Memory Verses ---------- */
  function verses(box) {
    var ref = "";
    function load() {
      ref = pick(Q.memVerses, 1)[0];
      box.innerHTML = "";
      var c = panel('<span class="label">Memory Verses · KJV</span><h3 id="mvRef">' + ref + '</h3><div id="mvBody"><p class="sheet-note"><span class="loading"></span>Loading…</p></div>');
      box.appendChild(c);
      fetch("https://bible-api.com/" + encodeURIComponent(ref) + "?translation=kjv").then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); }).then(function (d) {
        var text = (d.verses || []).map(function (v) { return v.text; }).join(" ").replace(/\s+/g, " ").trim();
        if (!text) throw new Error("empty");
        build(c, text);
      }).catch(function () {
        $("#mvBody", c).innerHTML = '<p class="body">Couldn\'t load that verse right now (the free reader allows about 15 loads per 30 seconds, and it needs a connection).</p><button class="fc-btn fc-flip" id="mvRetry" type="button">Try another</button>';
        $("#mvRetry", c).addEventListener("click", load);
      });
    }
    function build(c, text) {
      var words = text.split(" "), cand = [];
      words.forEach(function (w, i) { var clean = w.replace(/[^A-Za-z']/g, ""); if (i > 0 && clean.length >= 5) cand.push(i); });
      var blanks = {};
      shuffle(cand).slice(0, Math.min(4, cand.length)).forEach(function (i) { blanks[i] = words[i].replace(/[^A-Za-z']/g, ""); });
      var html = words.map(function (w, i) {
        if (blanks[i] === undefined) return esc(w);
        var lead = w.match(/^[^A-Za-z']*/)[0], tail = w.match(/[^A-Za-z']*$/)[0];
        return esc(lead) + '<input class="blank" data-a="' + esc(blanks[i].toLowerCase()) + '" size="' + (blanks[i].length + 1) + '" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="Missing word">' + esc(tail);
      }).join(" ");
      $("#mvBody", c).innerHTML = '<p class="verse-text mv">' + html + '</p><div class="fc-controls"><button class="fc-btn fc-flip" id="mvCheck" type="button">Check</button><button class="fc-btn" id="mvShow" type="button">Show answers</button><button class="fc-btn" id="mvNew" type="button">New verse</button></div><p class="sheet-note" id="mvMsg"></p>';
      var inputs = c.querySelectorAll(".blank"), done = false;
      $("#mvCheck", c).addEventListener("click", function () {
        var ok = 0;
        Array.prototype.forEach.call(inputs, function (inp) {
          var good = inp.value.trim().toLowerCase() === inp.getAttribute("data-a");
          inp.classList.toggle("good", good); inp.classList.toggle("bad", !good && !!inp.value); if (good) ok++;
        });
        $("#mvMsg", c).textContent = ok + " of " + inputs.length + " correct.";
        if (ok === inputs.length && !done) { done = true; award(5, "verse"); $("#mvMsg", c).textContent += " +5 XP."; }
      });
      $("#mvShow", c).addEventListener("click", function () { Array.prototype.forEach.call(inputs, function (inp) { inp.value = inp.getAttribute("data-a"); inp.classList.add("good"); }); });
      $("#mvNew", c).addEventListener("click", load);
    }
    load();
  }

  /* ---------- 9. Reply Builder ---------- */
  function builder(box) {
    var asks = ["What would change your mind?", "Which premise of that argument do you deny, and what does denying it cost you?", "What's your evidence for that?", "Can I ask what you think grounds that?"];
    var c = panel('<span class="label">Reply Builder</span><h3>Build a paste-ready reply</h3><p class="body">Search the objection, choose a length, and copy.</p>' +
      '<input class="search" id="rbSearch" type="search" placeholder="What did they say? (try “Judas” or “multiverse”)" aria-label="Search objections">' +
      '<select id="rbList" size="7" class="rb-list" aria-label="Matching objections"></select>' +
      '<div class="fc-mode"><button class="tgl" data-len="ultra" type="button" aria-pressed="true">Ultra-short</button><button class="tgl" data-len="short" type="button" aria-pressed="false">Short + fallacy</button><button class="tgl" data-len="full" type="button" aria-pressed="false">Full</button><button class="tgl" id="rbAsk" type="button" aria-pressed="false">+ question back</button></div>' +
      '<textarea id="rbOut" class="rb-out" rows="7" readonly aria-label="Your reply"></textarea><div class="fc-controls"><button class="fc-btn fc-flip" id="rbCopy" type="button">Copy reply</button></div>');
    box.appendChild(c);
    var list = $("#rbList", c), out = $("#rbOut", c), len = "ultra", ask = false, cur = null;
    function fillList() {
      var q = Q.norm($("#rbSearch", c).value.trim()), n = 0, h = "";
      Q.qa.forEach(function (x, i) {
        if (n >= 60) return;
        var hay = Q.norm(plain(x.q) + " " + x.k);
        if (q && hay.indexOf(q) === -1) return;
        h += '<option value="' + i + '">' + esc(plain(x.q).slice(0, 110)) + "</option>"; n++;
      });
      list.innerHTML = h || "<option disabled>No match</option>";
      if (n && cur === null) { list.selectedIndex = 0; cur = +list.value; }
      compose();
    }
    function compose() {
      if (cur === null || !Q.qa[cur]) { out.value = ""; return; }
      var x = Q.qa[cur], fal = plain(x.f), quick = plain(x.a), full = plain(x.b), t;
      if (len === "ultra") t = quick;
      else if (len === "short") t = fal + ".\n" + quick;
      else t = "Q: " + plain(x.q) + "\nFallacy: " + fal + "\n" + quick + "\n" + full;
      if (ask) t += "\n" + asks[Math.floor(Math.random() * asks.length)];
      out.value = t;
    }
    $("#rbSearch", c).addEventListener("input", function () { cur = null; fillList(); });
    list.addEventListener("change", function () { cur = +list.value; compose(); });
    c.querySelectorAll("[data-len]").forEach(function (b) {
      b.addEventListener("click", function () { len = b.getAttribute("data-len"); c.querySelectorAll("[data-len]").forEach(function (o) { o.setAttribute("aria-pressed", String(o === b)); }); compose(); });
    });
    $("#rbAsk", c).addEventListener("click", function () { ask = !ask; this.setAttribute("aria-pressed", String(ask)); compose(); });
    $("#rbCopy", c).addEventListener("click", function () {
      var btn = this;
      Q.copy(out.value).then(function (ok) { Q.flashButton(btn, ok, "Copied ✓", "Copy reply"); if (ok) award(1, "copy"); });
    });
    fillList();
  }

  /* ---------- 11. Daily Challenge ---------- */
  function daily(box) {
    var d = today(), rnd = seedRand(d), doneToday = Q.store.get("daily", "") === d;
    var qa = Q.qa[Math.floor(rnd() * Q.qa.length)], fq = Q.fallacyQuiz[Math.floor(rnd() * Q.fallacyQuiz.length)], ac = Q.accuracy[Math.floor(rnd() * Q.accuracy.length)];
    var step = 0, right = 0;
    var LABEL = { safe: "Safe to say", soften: "Overclaim: soften it", wrong: "Wrong: don't say it" };
    function show() {
      box.innerHTML = "";
      if (step === 0) {
        var c0 = panel('<span class="label">Daily Challenge · ' + d + '</span><h3>Today\'s objection</h3><p class="qprompt">' + qa.q + '</p><p class="sheet-note">Say your answer out loud, then reveal.</p><div class="fc-controls"><button class="fc-btn fc-flip" id="dcShow" type="button">Reveal</button></div><div class="reveal" hidden></div>');
        box.appendChild(c0);
        $("#dcShow", c0).addEventListener("click", function () {
          this.hidden = true; var r = $(".reveal", c0); r.hidden = false;
          r.innerHTML = '<div class="fallacy"><strong>Fallacy:</strong> ' + qa.f + '</div><div class="evidence" data-link><strong>Quick answer:</strong> ' + qa.a + '</div><div class="fc-controls"><button class="fc-btn good" id="dcOk" type="button">I had it</button><button class="fc-btn bad" id="dcNo" type="button">I missed it</button></div>';
          enhance(r);
          $("#dcOk", r).addEventListener("click", function () { right++; step++; show(); });
          $("#dcNo", r).addEventListener("click", function () { step++; show(); });
        });
        return;
      }
      var cfg = step === 1 ?
        { name: "Spot the fallacy", prompt: fq[0], sub: "Which fallacy is this?", choices: shuffle([fq[1]].concat(shuffle(Q.fallacyPool.filter(function (f) { return f !== fq[1]; })).slice(0, 3))).map(function (f) { return { label: f, ok: f === fq[1] }; }), explain: "<strong>" + fq[1] + ":</strong> " + (Q.fallacyDefs[fq[1]] || "") + " " + fq[2] } :
        { name: "Accuracy check", prompt: "“" + ac[0] + "”", sub: "Could an informed opponent catch you saying this?", choices: ["safe", "soften", "wrong"].map(function (v) { return { label: LABEL[v], ok: v === ac[1] }; }), explain: "<strong>" + LABEL[ac[1]] + ".</strong> " + ac[2] };
      var c = panel('<span class="label">Daily Challenge · ' + cfg.name + '</span><h3 class="qprompt">' + cfg.prompt + '</h3><p class="sheet-note">' + cfg.sub + '</p><div class="opts"></div><div class="reveal" hidden></div>');
      var opts = $(".opts", c), locked = false;
      cfg.choices.forEach(function (ch) {
        var b = el("button", "opt", ch.label); b.type = "button";
        b.addEventListener("click", function () {
          if (locked) return; locked = true;
          Array.prototype.forEach.call(opts.children, function (x, idx) { x.disabled = true; if (cfg.choices[idx].ok) x.classList.add("good"); });
          if (ch.ok) right++; else b.classList.add("bad");
          var r = $(".reveal", c); r.hidden = false;
          r.innerHTML = '<p class="verdict ' + (ch.ok ? "ok" : "no") + '">' + (ch.ok ? "Correct." : "Not quite.") + '</p><p class="body">' + cfg.explain + '</p><button class="fc-btn fc-flip nxt" type="button">' + (step === 2 ? "Finish" : "Next →") + '</button>';
          $(".nxt", r).addEventListener("click", function () { step++; if (step > 2) finish(); else show(); });
        });
        opts.appendChild(b);
      });
      box.appendChild(c);
    }
    function finish() {
      var fresh = !doneToday;
      if (fresh) { Q.store.set("daily", d); award(10 + right * 2, "daily"); }
      box.innerHTML = "";
      var c = panel('<span class="label">Daily Challenge</span><h3>' + right + ' of 3 today</h3><p class="body">' + (fresh ? "Daily bonus earned. Come back tomorrow to keep your streak alive." : "Already counted today, so no extra XP. Practice is still practice.") + '</p>');
      box.appendChild(c);
    }
    if (doneToday) {
      var info = panel('<span class="label">Daily Challenge · ' + d + '</span><h3>You\'ve done today\'s challenge</h3><p class="body">Come back tomorrow for a new one, or play it again for practice (no extra XP).</p><button class="fc-btn fc-flip" id="dcAgain" type="button">Play again</button>');
      box.appendChild(info);
      $("#dcAgain", info).addEventListener("click", show);
    } else show();
  }

  /* ---------- tabs ---------- */
  var GAMES = [
    { id: "cards", name: "Rebuttal Cards", fn: cards }, { id: "fallacy", name: "Fallacy Spotter", fn: fallacy },
    { id: "accuracy", name: "Accuracy Check", fn: accuracy }, { id: "boss", name: "Boss Battles", fn: boss },
    { id: "panel", name: "Live Panel", fn: panelSim }, { id: "gates", name: "Gate Explorer", fn: gates },
    { id: "duel", name: "Timeline Duel", fn: duel }, { id: "verses", name: "Memory Verses", fn: verses },
    { id: "builder", name: "Reply Builder", fn: builder },
    { id: "daily", name: "Daily Challenge", fn: daily }
  ];
  tabs.innerHTML = GAMES.map(function (g) { return '<button class="chip" type="button" role="tab" data-game="' + g.id + '" aria-pressed="false">' + g.name + "</button>"; }).join("");
  function open(id) {
    var g = GAMES.filter(function (x) { return x.id === id; })[0] || GAMES[0];
    clearTimers();
    Array.prototype.forEach.call(tabs.children, function (b) { b.setAttribute("aria-pressed", String(b.getAttribute("data-game") === g.id)); });
    stage.innerHTML = "";
    try { g.fn(stage); } catch (e) { stage.appendChild(panel('<p class="body">Something went wrong loading this activity.</p>')); if (window.console) console.error(e); }
    Q.store.set("arenaTab", g.id);
  }
  tabs.addEventListener("click", function (e) { var b = e.target.closest("[data-game]"); if (b) open(b.getAttribute("data-game")); });
  Q.openArena = open;
  paintStats();
  open(Q.store.get("arenaTab", "cards"));
  if (Q.paintXP) Q.paintXP();
})();
