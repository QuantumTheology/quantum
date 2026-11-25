/* Bible reader: KJV + WEB built in (public domain, no key). ESV + NIV load from their official free APIs with your own key. */
(function () {
  "use strict";
  var Q = window.QT;
  var root = document.getElementById("bibleApp");
  if (!Q || !root || !Q.books) return;

  function el(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html !== undefined) e.innerHTML = html; return e; }
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }

  var TR = {};
  Q.translations.forEach(function (t) { TR[t.id] = t; });
  var NOTE = {
    kjv: "King James Version (1611). Public domain.",
    web: "World English Bible. Public domain.",
    esv: "Scripture quotations are from the ESV® Bible (The Holy Bible, English Standard Version®), © 2001 by Crossway, a publishing ministry of Good News Publishers. Used under the ESV API terms.",
    niv: "Holy Bible, New International Version®, NIV® Copyright © 1973, 1978, 1984, 2011 by Biblica, Inc.® Used with permission. All rights reserved worldwide."
  };
  var S = {
    tr: Q.store.get("tr", "kjv"), cmp: "", ch: 1, book: Q.books[Q.books.findIndex(function (b) { return b.n === "John"; })],
    sel: {}, hl: Q.store.get("hl", {}), size: Q.store.get("bsize", 19), hi: null
  };
  if (!TR[S.tr]) S.tr = "kjv";
  var pos = Q.store.get("bpos", null);
  if (pos) {
    var pb = Q.books.filter(function (b) { return b.id === pos.b; })[0];
    if (pb) { S.book = pb; S.ch = Math.min(Math.max(1, pos.c || 1), pb.ch); }
  }
  var cache = {};

  /* ---------- UI ---------- */
  root.innerHTML =
    '<article class="card bible-card bloomed">' +
    '<div class="bible-bar">' +
    '<label class="bfield"><span>Translation</span><select id="bTr"></select></label>' +
    '<label class="bfield bwide"><span>Book</span><select id="bBook"></select></label>' +
    '<label class="bfield bnarrow"><span>Chapter</span><select id="bCh"></select></label>' +
    '<div class="bnav"><button class="icon-btn" id="bPrev" type="button" aria-label="Previous chapter">←</button><button class="icon-btn" id="bNext" type="button" aria-label="Next chapter">→</button></div>' +
    '</div>' +
    '<div class="bible-bar bible-bar2">' +
    '<form class="bgo" id="bGoForm"><input id="bGo" type="text" placeholder="Go to… John 3:16-18" aria-label="Go to a reference" autocomplete="off"><button class="copy-btn" type="submit">Go</button></form>' +
    '<label class="bfield"><span>Compare with</span><select id="bCmp"></select></label>' +
    '<div class="bsize"><button class="icon-btn" id="bSmall" type="button" aria-label="Smaller text">A−</button><button class="icon-btn" id="bBig" type="button" aria-label="Larger text">A+</button></div>' +
    '</div>' +
    '<div class="bible-keys" id="bKeys" hidden></div>' +
    '<div class="bible-chips" id="bChips"></div>' +
    '<div class="bible-sel" id="bSel" hidden></div>' +
    '<h3 class="bible-title" id="bTitle"></h3>' +
    '<div class="bible-text" id="bText" aria-live="polite"></div>' +
    '<p class="sheet-note" id="bNote"></p>' +
    '<div class="bible-notes"><label for="bMyNote" class="mini-label">My notes for this chapter (saved in this browser)</label><textarea id="bMyNote" rows="3" placeholder="Write what you noticed, questions, or a verse to use in a debate…"></textarea></div>' +
    '</article>';

  var bTr = $("#bTr"), bBook = $("#bBook"), bCh = $("#bCh"), bCmp = $("#bCmp"), bText = $("#bText"), bTitle = $("#bTitle");
  var bNote = $("#bNote"), bKeys = $("#bKeys"), bSel = $("#bSel"), bMyNote = $("#bMyNote");

  bTr.innerHTML = Q.translations.map(function (t) { return '<option value="' + t.id + '">' + t.name + (t.free ? "" : " · needs key") + "</option>"; }).join("");
  bCmp.innerHTML = '<option value="">None</option>' + Q.translations.map(function (t) { return '<option value="' + t.id + '">' + t.id.toUpperCase() + "</option>"; }).join("");
  bBook.innerHTML = ["OT", "NT"].map(function (t) {
    return '<optgroup label="' + (t === "OT" ? "Old Testament" : "New Testament") + '">' + Q.books.filter(function (b) { return b.t === t; }).map(function (b) { return '<option value="' + b.id + '">' + b.n + "</option>"; }).join("") + "</optgroup>";
  }).join("");
  $("#bChips").innerHTML = '<span class="mini-label">Debate passages</span>' + Q.keyPassages.map(function (k) {
    return '<button class="chip" type="button" data-ref="' + k[0] + '" title="' + esc(k[1]) + '">' + k[0] + "</button>";
  }).join("");

  function fillChapters() {
    var h = "";
    for (var i = 1; i <= S.book.ch; i++) h += '<option value="' + i + '">' + i + "</option>";
    bCh.innerHTML = h;
  }
  function syncControls() {
    bTr.value = S.tr; bBook.value = S.book.id; fillChapters(); bCh.value = S.ch; bCmp.value = S.cmp;
    bText.style.fontSize = S.size + "px";
  }

  /* ---------- fetching ---------- */
  function getJSON(url, headers) {
    return fetch(url, headers ? { headers: headers } : undefined).then(function (r) {
      if (!r.ok) { var e = new Error("HTTP " + r.status); e.status = r.status; throw e; }
      return r.json();
    });
  }
  function parseMarked(text) {
    var parts = String(text).split(/\[(\d+)\]/), out = [];
    for (var i = 1; i < parts.length; i += 2) out.push({ n: +parts[i], t: String(parts[i + 1] || "").replace(/\s+/g, " ").trim() });
    if (!out.length && String(text).trim()) out.push({ n: 1, t: String(text).replace(/\s+/g, " ").trim() });
    return out;
  }
  function fetchFree(tr, book, ch) {
    var name = book.n === "Psalms" ? "Psalms" : book.n;
    return getJSON("https://bible-api.com/" + encodeURIComponent(name + " " + ch) + "?translation=" + tr).then(function (d) {
      if (!d || !d.verses || !d.verses.length) throw new Error("empty");
      return d.verses.map(function (v) { return { n: v.verse, t: String(v.text).replace(/\s+/g, " ").trim() }; });
    });
  }
  function fetchESV(book, ch) {
    var key = Q.store.get("key_esv", "");
    if (!key) { var e = new Error("nokey"); e.nokey = true; return Promise.reject(e); }
    var q = encodeURIComponent(book.n + " " + ch);
    var url = "https://api.esv.org/v3/passage/text/?q=" + q + "&include-headings=false&include-footnotes=false&include-footnote-body=false&include-short-copyright=false&include-copyright=false&include-passage-references=false&include-verse-numbers=true&include-first-verse-numbers=true&indent-poetry=false&indent-paragraphs=0&include-selahs=false";
    return getJSON(url, { Authorization: "Token " + key }).then(function (d) {
      if (!d || !d.passages || !d.passages[0]) throw new Error("empty");
      return parseMarked(d.passages[0]);
    });
  }
  function fetchNIV(book, ch) {
    var key = Q.store.get("key_niv", "");
    if (!key) { var e = new Error("nokey"); e.nokey = true; return Promise.reject(e); }
    var h = { "api-key": key };
    var idP = Q.store.get("niv_id", "") ? Promise.resolve(Q.store.get("niv_id", "")) :
      getJSON("https://api.scripture.api.bible/v1/bibles?abbreviation=NIV&language=eng", h).then(function (d) {
        var list = (d && d.data) || [];
        var b = list.filter(function (x) { return /^NIV$/i.test(x.abbreviation || x.abbreviationLocal || ""); })[0] || list[0];
        if (!b) { var er = new Error("noniv"); er.noniv = true; throw er; }
        Q.store.set("niv_id", b.id);
        return b.id;
      });
    return idP.then(function (id) {
      var url = "https://api.scripture.api.bible/v1/bibles/" + id + "/chapters/" + book.id + "." + ch + "?content-type=text&include-notes=false&include-titles=false&include-chapter-numbers=false&include-verse-numbers=true&include-verse-spans=false";
      return getJSON(url, h);
    }).then(function (d) {
      if (!d || !d.data || !d.data.content) throw new Error("empty");
      return parseMarked(d.data.content);
    });
  }
  function fetchChapter(tr, book, ch) {
    var key = tr + ":" + book.id + ":" + ch;
    if (cache[key]) return Promise.resolve(cache[key]);
    var saved = TR[tr].free ? Q.store.get("bc:" + key, null) : null;
    if (saved) { cache[key] = saved; return Promise.resolve(saved); }
    var job = tr === "esv" ? fetchESV(book, ch) : tr === "niv" ? fetchNIV(book, ch) : fetchFree(tr, book, ch);
    return job.then(function (v) {
      cache[key] = v;
      if (TR[tr].free) Q.store.set("bc:" + key, v);
      return v;
    });
  }
  function gatewayUrl(tr) {
    var v = { esv: "ESV", niv: "NIV", kjv: "KJV", web: "WEB" }[tr] || "ESV";
    return "https://www.biblegateway.com/passage/?search=" + encodeURIComponent(S.book.n + " " + S.ch) + "&version=" + v;
  }

  /* ---------- rendering ---------- */
  function refText(nums) {
    nums = nums.slice().sort(function (a, b) { return a - b; });
    var parts = [], i = 0;
    while (i < nums.length) {
      var j = i;
      while (j + 1 < nums.length && nums[j + 1] === nums[j] + 1) j++;
      parts.push(i === j ? nums[i] : nums[i] + "-" + nums[j]);
      i = j + 1;
    }
    return S.book.n + " " + S.ch + ":" + parts.join(",");
  }
  function hlKey(n) { return S.book.id + "." + S.ch + "." + n; }
  function renderKeys(tr, err) {
    if (TR[tr].free) { bKeys.hidden = true; return; }
    var have = !!Q.store.get("key_" + tr, "");
    bKeys.hidden = false;
    var name = tr.toUpperCase();
    var help = tr === "esv"
      ? 'Get a free key at <a href="https://api.esv.org/" target="_blank" rel="noopener">api.esv.org</a> (free for personal use), paste it here, and the ESV loads right in this page.'
      : 'Get a free key at <a href="https://scripture.api.bible/" target="_blank" rel="noopener">scripture.api.bible</a>. NIV access needs approval from Biblica through that service.';
    bKeys.innerHTML =
      '<p class="body"><strong>' + name + ' is copyrighted</strong>, so it can\'t be bundled into this page. ' + help + '</p>' +
      '<form class="bkeyform" id="bKeyForm"><input type="password" id="bKeyIn" placeholder="' + name + ' API key" autocomplete="off" value="' + (have ? "••••••••" : "") + '" aria-label="' + name + ' API key"><button class="copy-btn" type="submit">Save key</button>' + (have ? '<button class="copy-btn" type="button" id="bKeyClear">Remove key</button>' : "") + '</form>' +
      '<p class="sheet-note">Your key stays in this browser only and is sent only to ' + (tr === "esv" ? "api.esv.org" : "scripture.api.bible") + '. ' +
      (err ? '<strong>' + esc(err) + '</strong> ' : "") +
      '<a href="' + gatewayUrl(tr) + '" target="_blank" rel="noopener">Read this chapter in the ' + name + ' on Bible Gateway ↗</a></p>';
    var f = $("#bKeyForm", bKeys);
    f.addEventListener("submit", function (e) {
      e.preventDefault();
      var v = $("#bKeyIn", bKeys).value.trim();
      if (v && v.indexOf("•") === -1) { Q.store.set("key_" + tr, v); Q.store.set("niv_id", ""); load(); }
    });
    var clr = $("#bKeyClear", bKeys);
    if (clr) clr.addEventListener("click", function () { Q.store.set("key_" + tr, ""); Q.store.set("niv_id", ""); load(); });
  }
  function selToolbar() {
    var nums = Object.keys(S.sel).map(Number);
    if (!nums.length) { bSel.hidden = true; bSel.innerHTML = ""; return; }
    bSel.hidden = false;
    var allHl = nums.every(function (n) { return S.hl[hlKey(n)]; });
    bSel.innerHTML = '<strong>' + refText(nums) + '</strong> selected ' +
      '<button class="copy-btn" id="selCopy" type="button">Copy with reference</button>' +
      '<button class="copy-btn" id="selHl" type="button">' + (allHl ? "Remove highlight" : "Highlight") + '</button>' +
      '<button class="copy-btn" id="selClear" type="button">Clear</button>';
    $("#selCopy", bSel).addEventListener("click", function () {
      var rows = $$(".vrow", bText).filter(function (r) { return S.sel[r.getAttribute("data-n")]; });
      var txt = rows.map(function (r) { return r.querySelector(".t1").textContent; }).join(" ");
      var out = "“" + txt + "” (" + refText(nums) + ", " + S.tr.toUpperCase() + ")";
      Q.copy(out).then(function (ok) { Q.flashButton($("#selCopy", bSel), ok, "Copied ✓", "Copy with reference"); });
    });
    $("#selHl", bSel).addEventListener("click", function () {
      nums.forEach(function (n) { if (allHl) delete S.hl[hlKey(n)]; else S.hl[hlKey(n)] = 1; });
      Q.store.set("hl", S.hl); paintRows(); selToolbar();
    });
    $("#selClear", bSel).addEventListener("click", function () { S.sel = {}; paintRows(); selToolbar(); });
  }
  function paintRows() {
    $$(".vrow", bText).forEach(function (r) {
      var n = r.getAttribute("data-n");
      r.classList.toggle("sel", !!S.sel[n]);
      r.classList.toggle("hl", !!S.hl[hlKey(n)]);
      r.classList.toggle("target", !!(S.hi && S.hi[n]));
    });
  }
  function render(main, other) {
    bTitle.textContent = S.book.n + " " + S.ch + " · " + S.tr.toUpperCase() + (S.cmp ? " + " + S.cmp.toUpperCase() : "");
    bText.className = "bible-text" + (other ? " two" : "");
    var map2 = {};
    if (other) other.forEach(function (v) { map2[v.n] = v.t; });
    var nums = {};
    main.forEach(function (v) { nums[v.n] = 1; });
    if (other) other.forEach(function (v) { nums[v.n] = 1; });
    var m1 = {};
    main.forEach(function (v) { m1[v.n] = v.t; });
    bText.innerHTML = Object.keys(nums).map(Number).sort(function (a, b) { return a - b; }).map(function (n) {
      return '<div class="vrow" data-n="' + n + '" tabindex="0" role="button" aria-label="Verse ' + n + '"><div class="vcell"><sup>' + n + '</sup><span class="t1">' + esc(m1[n] || "") + '</span></div>' +
        (other ? '<div class="vcell vcell2"><sup>' + n + '</sup><span class="t2">' + esc(map2[n] || "") + "</span></div>" : "") + "</div>";
    }).join("");
    bNote.textContent = NOTE[S.tr] + (S.cmp ? " " + NOTE[S.cmp] : "");
    bMyNote.value = Q.store.get("note:" + S.book.id + "." + S.ch, "");
    paintRows();
    selToolbar();
    if (S.hi) {
      var first = Object.keys(S.hi).map(Number).sort(function (a, b) { return a - b; })[0];
      var t = first && bText.querySelector('.vrow[data-n="' + first + '"]');
      if (t) t.scrollIntoView({ behavior: Q.scrollMode || "auto", block: "center" });
    }
  }
  function failMsg(e, tr) {
    if (e && e.nokey) return "";
    if (e && e.noniv) return "Your key can't see the NIV. Ask API.Bible for NIV access, or use Bible Gateway.";
    if (e && (e.status === 401 || e.status === 403)) return "That key was rejected (" + e.status + ").";
    return "Couldn't load that right now. Try again, or open it on Bible Gateway.";
  }
  var loadToken = 0;
  function load() {
    var token = ++loadToken;
    Q.store.set("tr", S.tr);
    Q.store.set("bpos", { b: S.book.id, c: S.ch });
    syncControls();
    renderKeys(S.tr);
    bText.innerHTML = '<p class="sheet-note"><span class="loading"></span>Loading ' + S.book.n + " " + S.ch + "…</p>";
    var jobs = [fetchChapter(S.tr, S.book, S.ch)];
    if (S.cmp) jobs.push(fetchChapter(S.cmp, S.book, S.ch).catch(function () { return null; }));
    Promise.all(jobs).then(function (res) {
      if (token !== loadToken) return;
      render(res[0], res[1] || null);
      if (S.cmp && !res[1]) bNote.textContent += " (The comparison translation didn't load; add its key above or check your connection.)";
    }).catch(function (e) {
      if (token !== loadToken) return;
      bTitle.textContent = S.book.n + " " + S.ch + " · " + S.tr.toUpperCase();
      var msg = failMsg(e, S.tr);
      renderKeys(S.tr, msg);
      bText.innerHTML = '<p class="body">' + (e && e.nokey ? "Add your " + S.tr.toUpperCase() + " key above to read it here." : esc(msg)) + ' <a href="' + gatewayUrl(S.tr) + '" target="_blank" rel="noopener">Open on Bible Gateway ↗</a></p>' +
        (TR[S.tr].free ? '<p class="sheet-note">Tip: the free reader allows about 15 loads every 30 seconds. Wait a moment and press → again.</p>' : "");
      bNote.textContent = "";
      selToolbar();
    });
  }

  /* ---------- reference parsing ---------- */
  var ABBR = { gn: "genesis", ge: "genesis", ex: "exodus", exo: "exodus", lv: "leviticus", nm: "numbers", nu: "numbers", dt: "deuteronomy", deut: "deuteronomy", jos: "joshua", jdg: "judges", jg: "judges",
    ps: "psalms", psa: "psalms", psalm: "psalms", pr: "proverbs", prov: "proverbs", ecc: "ecclesiastes", eccl: "ecclesiastes", song: "song of solomon", sos: "song of solomon", is: "isaiah", isa: "isaiah",
    jer: "jeremiah", lam: "lamentations", eze: "ezekiel", ezek: "ezekiel", dan: "daniel", hos: "hosea", mic: "micah", zech: "zechariah", zec: "zechariah", mal: "malachi",
    mt: "matthew", matt: "matthew", mk: "mark", mr: "mark", lk: "luke", jn: "john", joh: "john", ac: "acts", rom: "romans", ro: "romans", gal: "galatians", eph: "ephesians", php: "philippians", phil: "philippians",
    col: "colossians", heb: "hebrews", jas: "james", jam: "james", rev: "revelation", re: "revelation" };
  function findBook(raw) {
    var s = raw.toLowerCase().replace(/\./g, "").replace(/\s+/g, " ").trim();
    var m = /^([123])\s*(.+)$/.exec(s), pre = "", rest = s;
    if (m) { pre = m[1] + " "; rest = m[2]; }
    var key = pre + (ABBR[rest] || rest);
    var list = Q.books;
    for (var i = 0; i < list.length; i++) if (list[i].n.toLowerCase() === key) return list[i];
    for (var j = 0; j < list.length; j++) if (list[j].n.toLowerCase().indexOf(key) === 0) return list[j];
    return null;
  }
  function parseRef(s) {
    var m = /^\s*((?:[123]\s*)?[A-Za-z][A-Za-z .]*?)\s*(\d+)?(?::(\d+)(?:\s*[-–]\s*(\d+))?)?\s*$/.exec(String(s));
    if (!m) return null;
    var b = findBook(m[1]);
    if (!b) return null;
    var c = Math.min(Math.max(1, +m[2] || 1), b.ch);
    var hi = null;
    if (m[3]) { hi = {}; var a = +m[3], z = +(m[4] || m[3]); for (var i = a; i <= z && i - a < 60; i++) hi[i] = 1; }
    return { b: b, c: c, hi: hi };
  }
  Q.bibleGo = function (ref) {
    var r = parseRef(ref);
    if (!r) { if (Q.toast) Q.toast("Couldn't find “" + ref + "”."); return false; }
    S.book = r.b; S.ch = r.c; S.sel = {}; S.hi = r.hi;
    load();
    return true;
  };

  /* ---------- events ---------- */
  bTr.addEventListener("change", function () { S.tr = bTr.value; S.sel = {}; load(); });
  bCmp.addEventListener("change", function () { S.cmp = bCmp.value === S.tr ? "" : bCmp.value; S.sel = {}; load(); });
  bBook.addEventListener("change", function () {
    S.book = Q.books.filter(function (b) { return b.id === bBook.value; })[0]; S.ch = 1; S.sel = {}; S.hi = null; load();
  });
  bCh.addEventListener("change", function () { S.ch = +bCh.value; S.sel = {}; S.hi = null; load(); });
  function step(d) {
    var i = Q.books.indexOf(S.book), c = S.ch + d;
    if (c < 1) { if (i === 0) return; i--; S.book = Q.books[i]; c = S.book.ch; }
    else if (c > S.book.ch) { if (i === Q.books.length - 1) return; i++; S.book = Q.books[i]; c = 1; }
    S.ch = c; S.sel = {}; S.hi = null; load();
  }
  $("#bPrev").addEventListener("click", function () { step(-1); });
  $("#bNext").addEventListener("click", function () { step(1); });
  $("#bSmall").addEventListener("click", function () { S.size = Math.max(14, S.size - 1); Q.store.set("bsize", S.size); bText.style.fontSize = S.size + "px"; });
  $("#bBig").addEventListener("click", function () { S.size = Math.min(30, S.size + 1); Q.store.set("bsize", S.size); bText.style.fontSize = S.size + "px"; });
  $("#bGoForm").addEventListener("submit", function (e) { e.preventDefault(); Q.bibleGo($("#bGo").value); });
  $("#bChips").addEventListener("click", function (e) { var b = e.target.closest("[data-ref]"); if (b) Q.bibleGo(b.getAttribute("data-ref")); });
  function toggleVerse(row) {
    var n = row.getAttribute("data-n");
    if (S.sel[n]) delete S.sel[n]; else S.sel[n] = 1;
    paintRows(); selToolbar();
  }
  bText.addEventListener("click", function (e) { var r = e.target.closest(".vrow"); if (r) toggleVerse(r); });
  bText.addEventListener("keydown", function (e) { if ((e.key === "Enter" || e.key === " ") && e.target.classList.contains("vrow")) { e.preventDefault(); toggleVerse(e.target); } });
  var noteTimer;
  bMyNote.addEventListener("input", function () {
    clearTimeout(noteTimer);
    noteTimer = setTimeout(function () { Q.store.set("note:" + S.book.id + "." + S.ch, bMyNote.value); }, 400);
  });

  syncControls();
  load();
})();
