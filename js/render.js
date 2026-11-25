/* Builds the data-driven sections (axioms, worldviews, Islam, timeline, Q&A) before app.js enhances the page. */
(function () {
  "use strict";
  var Q = window.QT;
  if (!Q) return;
  function $(s, r) { return (r || document).querySelector(s); }
  function el(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html !== undefined) e.innerHTML = html;
    return e;
  }
  function attr(s) { return String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;"); }
  function pad(n, w) { n = String(n); while (n.length < w) n = "0" + n; return n; }

  /* ---------- Comebacks: "They'll say… / You say…" ---------- */
  Q.backHtml = function (pairs, tactics) {
    pairs = pairs || []; tactics = tactics || [];
    if (!pairs.length && !tactics.length) return "";
    return '<ul class="back-list" data-link>' +
      pairs.map(function (p) {
        return '<li><p class="back-say"><b>They\'ll say:</b> “' + p[0] + '”</p><p class="back-ans"><b>You say:</b> ' + p[1] + "</p></li>";
      }).join("") +
      tactics.map(function (t) {
        return '<li class="back-do"><p class="back-say"><b>What they\'ll do:</b> ' + t[0] + '</p><p class="back-ans"><b>Your move:</b> ' + t[1] + "</p></li>";
      }).join("") + "</ul>";
  };
  function backBox(pairs, tactics, label) {
    var n = (pairs || []).length + (tactics || []).length;
    if (!n) return "";
    return '<details class="more back-box"><summary>' + label + " (" + n + ")</summary>" + Q.backHtml(pairs, tactics) + "</details>";
  }

  /* ---------- Concessions ("admitted by the other side") ---------- */
  function admitsFor(n) { return (Q.concessions || []).filter(function (c) { return c.ax === n; }); }
  function quoteHtml(c) { return c.q ? "“" + c.text + "”" : c.text; }
  function admitsBlock(n) {
    var list = admitsFor(n);
    if (!list.length) return "";
    return '<div class="admits"><span class="admits-k">Even the other side admits</span><ul>' + list.map(function (c) {
      return '<li><p class="admits-q' + (c.q ? "" : " para") + '">' + quoteHtml(c) + '</p><span class="admits-who"><b>' + c.who + "</b> · " + c.role + " · <i>" + c.src + "</i></span></li>";
    }).join("") + "</ul></div>";
  }
  Q.admitsFor = admitsFor;
  function renderAdmitted() {
    var m = $("#admitMount");
    if (!m || !Q.concessions) return;
    var byAx = {};
    Q.axioms.forEach(function (a) { byAx[a.n] = a; });
    Q.concessions.forEach(function (c, i) {
      var a = byAx[c.ax] || { b: "jesus", title: "" };
      var card = el("article", "card admit");
      card.id = "admit-" + (i + 1);
      card.setAttribute("data-bucket", a.b);
      card.innerHTML =
        '<div class="card-top"><span class="label">Supports Axiom ' + c.ax + "</span></div>" +
        '<blockquote class="admit-q' + (c.q ? "" : " para") + '">' + quoteHtml(c) + "</blockquote>" +
        "<h3>" + c.who + "</h3>" +
        '<p class="admit-role">' + c.role + " · <i>" + c.src + "</i>" + (c.q ? "" : ' · <span class="para-tag">paraphrase</span>') + "</p>" +
        '<p class="body admit-use" data-link><strong>Use it:</strong> ' + c.use + ' <a class="axlink" href="#axiom-' + c.ax + '">Axiom ' + c.ax + "</a></p>";
      m.appendChild(card);
    });
    var chips = $("#admitChips");
    if (chips) {
      var buckets = [["all", "All"], ["cosmos", "Cosmos"], ["code", "Code"], ["mind", "Mind & Morals"], ["trinity", "Creator & Evil"], ["jesus", "Jesus & History"]];
      chips.innerHTML = buckets.map(function (b, i) {
        return '<button class="chip" type="button" data-filter="' + b[0] + '" aria-pressed="' + (i === 0) + '">' + b[1] + "</button>";
      }).join("");
      chips.addEventListener("click", function (e) {
        var b = e.target.closest("[data-filter]");
        if (!b) return;
        var v = b.getAttribute("data-filter");
        Array.prototype.forEach.call(chips.children, function (x) { x.setAttribute("aria-pressed", String(x === b)); });
        Array.prototype.forEach.call(m.children, function (card) { card.hidden = v !== "all" && card.getAttribute("data-bucket") !== v; });
      });
    }
  }

  /* ---------- Axioms ---------- */
  function renderAxioms() {
    var mount = $("#axiomMount");
    if (!mount || !Q.axioms) return;
    Q.stages.forEach(function (name, si) {
      var group = el("div", "stage-group");
      group.appendChild(el("h3", "stage", name));
      Q.axioms.filter(function (a) { return a.stage === si; }).forEach(function (a) {
        var card = el("article", "card axiom");
        card.id = "axiom-" + a.n;
        card.setAttribute("data-bucket", a.b);
        card.innerHTML =
          '<div class="card-top"><span class="label">Axiom ' + a.n + '</span></div>' +
          '<h3>' + a.title + '</h3>' +
          '<p><span class="tag">' + a.tag + '</span><span class="tag st">' + a.st + '</span></p>' +
          '<p class="claim" data-link>' + a.claim + '</p>' +
          '<ol class="prem" data-link>' + a.prem.map(function (p) { return "<li>" + p + "</li>"; }).join("") + '</ol>' +
          '<div class="receipts" data-link><strong>Receipts:</strong> ' + a.receipts + '</div>' +
          admitsBlock(a.n) +
          '<details class="more stress-box"><summary>Stress test: best objection, your answer, cost of escape</summary>' +
          '<div class="objection" data-link><strong>Best objection:</strong> ' + a.obj + '</div>' +
          '<div class="evidence" data-link><strong>Your answer:</strong> ' + a.ans + '</div>' +
          '<div class="fallacy" data-link><strong>Cost of escape:</strong> ' + a.cost + '</div></details>' +
          '<p class="roast">' + a.roast + '</p>';
        group.appendChild(card);
      });
      mount.appendChild(group);
    });

    var log = $("#fixList");
    if (log && Q.fixes) {
      log.innerHTML = Q.fixes.map(function (f) { return '<li data-link><strong>' + f[0] + ':</strong> ' + f[1] + '</li>'; }).join("");
    }
  }

  /* ---------- Gates + worldviews ---------- */
  function renderWorldviews() {
    var gm = $("#gateMount");
    if (gm && Q.gates) {
      Q.gates.forEach(function (g) {
        var c = el("article", "card step");
        c.id = "gate-" + g.n;
        c.innerHTML = '<span class="step-n">' + g.n + '</span><div><h3>' + g.q + '</h3><p class="body">' + g.out + '</p><p class="sub-note" data-link>' + g.why + '</p></div>';
        gm.appendChild(c);
      });
    }
    var wm = $("#wvMount");
    if (!wm || !Q.worldviews) return;
    var n = 0;
    Q.worldviews.forEach(function (w) {
      if (w.win) {
        var winCard = el("article", "card wv win");
        winCard.id = "wv-win";
        winCard.innerHTML = '<span class="wv-num">✓</span><div><span class="tag wv-cat">The truth</span><h3>' + w.name + '</h3><span class="badge win">✓ Left standing</span><p class="body" data-link>' + w.text + '</p></div>';
        wm.parentNode.appendChild(winCard);
        return;
      }
      n++;
      var c = el("article", "card wv");
      c.id = "wv-" + n;
      c.innerHTML = '<span class="wv-num">' + n + '</span><div>' +
        '<span class="tag wv-cat">' + w.cat + '</span><span class="tag wv-cat gate-tag">Gate ' + w.g + '</span>' +
        '<h3>' + w.name + '</h3><span class="badge elim">✕ Eliminated</span>' +
        '<p class="body" data-link>' + w.text + ' <span class="axnote">(Axioms ' + w.ax + ')</span></p>' +
        '<p class="reply" data-link><strong>Their best reply:</strong> ' + w.reply + '</p>' +
        (Q.comebacks && Q.comebacks[w.name] ? backBox(Q.comebacks[w.name].b, Q.comebacks[w.name].t, "What they'll say and do, and your answers") : "") +
        '</div>';
      wm.appendChild(c);
    });
  }

  /* ---------- Islam ---------- */
  function renderIslam() {
    var m = $("#islamMount");
    if (!m || !Q.islam) return;
    var label = { strong: "Lead with this", medium: "Good support", contested: "Handle with care" };
    Q.islam.forEach(function (p) {
      var c = el("article", "card point");
      c.id = "islam-" + p.n;
      c.innerHTML = '<div class="card-top"><span class="label">Point ' + p.n + '</span><span class="str str-' + p.st + '">' + label[p.st] + '</span></div>' +
        '<h3>' + p.title + '</h3>' +
        '<p class="body" data-link>' + p.text + '</p>' +
        '<p class="reply" data-link><strong>Their reply and yours:</strong> ' + p.reply + '</p>' +
        (Q.islamBack && Q.islamBack[p.n] ? backBox(Q.islamBack[p.n], [], "More comebacks and your answers") : "");
      m.appendChild(c);
    });
  }

  /* ---------- Timeline ---------- */
  var tl = { kind: "all", q: "" };
  Q.renderTimeline = function () {
    var track = $("#timelineTrack");
    if (!track) return;
    Array.prototype.slice.call(track.querySelectorAll(".tl-item")).forEach(function (n) { n.parentNode.removeChild(n); });
    var q = tl.q.trim().toLowerCase();
    var rows = Q.timeline.slice().sort(function (a, b) { return a[0] - b[0]; }).filter(function (r) {
      if (tl.kind !== "all" && r[2] !== tl.kind) return false;
      if (q && (r[1] + " " + r[4] + " " + r[5] + " " + r[6]).toLowerCase().indexOf(q) === -1) return false;
      return true;
    });
    var cnt = $("#tlCount");
    if (cnt) cnt.textContent = "Showing " + rows.length + " of " + Q.timeline.length + " events";
    var empty = $("#tlEmpty");
    if (empty) empty.hidden = rows.length !== 0;
    rows.forEach(function (r, i) {
      var item = el("div", "tl-item");
      item.setAttribute("data-kind", r[2]);
      item.setAttribute("data-year", r[0]);
      item.innerHTML =
        '<article class="card tl-card bloomed">' +
        '<span class="tl-date">' + r[1] + '</span> <span class="cert cert-' + r[3] + '">' + Q.tlCert[r[3]] + '</span>' +
        '<h3>' + r[4] + '</h3><p class="body" data-link>' + r[5] + '</p>' +
        '<p class="src">Source: ' + r[6] + '</p></article><span class="tl-dot" aria-hidden="true"></span>';
      track.appendChild(item);
    });
    if (Q.enhance) Q.enhance(track);
  };
  function renderTimelineControls() {
    var chips = $("#tlChips");
    if (!chips) return;
    var kinds = [["all", "All"]].concat(Object.keys(Q.tlKinds).map(function (k) { return [k, Q.tlKinds[k]]; }));
    chips.innerHTML = kinds.map(function (k, i) {
      return '<button class="chip tlchip" type="button" data-tl="' + k[0] + '" data-kind="' + (k[0] === "all" ? "" : k[0]) + '" aria-pressed="' + (i === 0) + '">' + k[1] + '</button>';
    }).join("");
    chips.addEventListener("click", function (e) {
      var b = e.target.closest(".tlchip");
      if (!b) return;
      tl.kind = b.getAttribute("data-tl");
      Array.prototype.slice.call(chips.querySelectorAll(".tlchip")).forEach(function (c) { c.setAttribute("aria-pressed", String(c === b)); });
      Q.renderTimeline();
    });
    var s = $("#tlSearch");
    if (s) s.addEventListener("input", function () { tl.q = s.value; Q.renderTimeline(); });

    /* gap calculator */
    var a = $("#gapA"), b2 = $("#gapB"), out = $("#gapOut");
    if (a && b2 && out) {
      var rows = Q.timeline.slice().sort(function (x, y) { return x[0] - y[0]; });
      var opts = rows.map(function (r, i) { return '<option value="' + i + '">' + r[1] + " · " + r[4].replace(/<[^>]+>/g, "") + "</option>"; }).join("");
      a.innerHTML = opts; b2.innerHTML = opts;
      function find(label) { for (var i = 0; i < rows.length; i++) if (rows[i][4].indexOf(label) === 0) return i; return 0; }
      a.value = find("Jesus is crucified");
      b2.value = find("Uthman standardizes");
      function gap() {
        var r1 = rows[+a.value], r2 = rows[+b2.value];
        var y1 = Math.floor(r1[0]), y2 = Math.floor(r2[0]);
        var d = Math.abs(y2 - y1);
        var dir = y2 >= y1 ? "after" : "before";
        var t1 = r1[4].replace(/<[^>]+>/g, ""), t2 = r2[4].replace(/<[^>]+>/g, "");
        out.innerHTML = '<strong>' + (d === 0 ? "Same year" : d + " year" + (d === 1 ? "" : "s")) + '</strong> ' + (d === 0 ? "" : '<span>(“' + t2 + '” is ' + dir + ' “' + t1 + '”)</span>') +
          '<small>Dates are approximate where the label says so. Year counts use the first year listed.</small>';
      }
      a.addEventListener("change", gap); b2.addEventListener("change", gap); gap();
    }
  }

  /* ---------- Q&A ---------- */
  Q.qaCats = [["all", "All"], ["sci", "Science"], ["god", "God & Logic"], ["mor", "Morality & Evil"], ["bib", "Bible & History"],
    ["con", "Bible Contradictions"], ["jes", "Jesus & Resurrection"], ["isl", "Islam"], ["rel", "Other Religions"], ["chu", "Catholic & Church"]];
  var catName = {};
  Q.qaCats.forEach(function (c) { catName[c[0]] = c[1]; });
  Q.catName = catName;
  function renderQA() {
    var m = $("#qaMount");
    if (!m || !Q.qa) return;
    var chips = $("#qaChips");
    if (chips) {
      chips.innerHTML = Q.qaCats.map(function (c, i) {
        return '<button class="chip qchip" type="button" data-q="' + c[0] + '" aria-pressed="' + (i === 0) + '">' + c[1] + '</button>';
      }).join("");
    }
    Q.qa.forEach(function (x, i) {
      var c = el("article", "card qa");
      c.id = "q-" + (i + 1);
      c.setAttribute("data-cat", x.c);
      c.setAttribute("data-keys", x.k);
      if (x.x) c.setAttribute("data-ax", x.x);
      c.innerHTML =
        '<div class="card-top"><span class="label">Question ' + pad(i + 1, 3) + ' · ' + catName[x.c] + '</span></div>' +
        '<h3>' + x.q + '</h3>' +
        '<div class="fallacy" data-link><strong>Fallacy:</strong> ' + x.f + '</div>' +
        '<div class="evidence quick" data-link><strong>Quick answer:</strong> ' + x.a + '</div>' +
        '<details class="more"><summary>Full breakdown</summary>' +
        '<div class="evidence full" data-link><strong>Rebuttal:</strong> ' + x.b + (x.x ? ' (Axiom ' + x.x + ')' : '') + '</div></details>';
      m.appendChild(c);
    });
  }

  /* ---------- live numbers ---------- */
  function setCounts() {
    var elim = Q.worldviews ? Q.worldviews.filter(function (w) { return !w.win; }).length : 0;
    var map = { axioms: Q.axioms ? Q.axioms.length : 20, worlds: elim, qa: Q.qa ? Q.qa.length : 0, events: Q.timeline ? Q.timeline.length : 0, admits: Q.concessions ? Q.concessions.length : 0 };
    Array.prototype.slice.call(document.querySelectorAll("[data-qt]")).forEach(function (n) {
      var k = n.getAttribute("data-qt");
      if (map[k] !== undefined) {
        if (n.hasAttribute("data-count")) n.setAttribute("data-count", map[k]);
        n.textContent = map[k];
      }
    });
    Array.prototype.slice.call(document.querySelectorAll("[data-qt-text]")).forEach(function (n) {
      var k = n.getAttribute("data-qt-text");
      if (map[k] !== undefined) n.textContent = map[k];
    });
  }

  try { renderAxioms(); } catch (e) { console.error("render axioms", e); }
  try { renderAdmitted(); } catch (e) { console.error("render admitted", e); }
  try { renderWorldviews(); } catch (e) { console.error("render worldviews", e); }
  try { renderIslam(); } catch (e) { console.error("render islam", e); }
  try { renderTimelineControls(); Q.renderTimeline(); } catch (e) { console.error("render timeline", e); }
  try { renderQA(); } catch (e) { console.error("render qa", e); }
  try { setCounts(); } catch (e) { console.error("counts", e); }
})();
