/* =========================================================
   QuantumTheology · S-GUOT — app.js
   ========================================================= */
(function () {
  "use strict";

  /* ---------- Helpers ---------- */
  function mq(q) { return !!(window.matchMedia && window.matchMedia(q).matches); }
  var reduceMotion = mq("(prefers-reduced-motion: reduce)");
  var finePointer = mq("(hover: hover) and (pointer: fine)");
  var scrollMode = reduceMotion ? "auto" : "smooth";
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function el(tag, cls) { var e = document.createElement(tag); if (cls) e.className = cls; return e; }
  function safe(name, fn) { try { fn(); } catch (err) { if (window.console && console.error) console.error("[QuantumTheology] " + name, err); } }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function norm(s) { return String(s).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase(); }
  function slug(s) { return norm(s).replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""); }
  var Q = window.QT = window.QT || {};
  if (!Q.store) Q.store = { get: function (k, d) { return d; }, set: function () {} };

  /* ---------- 0. Bloom-in (runs first so content can never get stuck hidden) ---------- */
  try {
    var bloomEls = $$(".section-heading, .card, .chips, .search, .stage, .practice, .tl-legend, .sub-head, .gloss-grid");
    if (reduceMotion || !("IntersectionObserver" in window)) {
      bloomEls.forEach(function (e) { e.classList.add("bloomed"); });
    } else {
      var bloomIO = new IntersectionObserver(function (entries) {
        var n = 0;
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          en.target.style.setProperty("--d", Math.min(n, 6) * 90 + "ms");
          n++;
          en.target.classList.add("bloomed");
          bloomIO.unobserve(en.target);
        });
      }, { rootMargin: "0px 0px -5% 0px", threshold: 0.05 });
      bloomEls.forEach(function (e) { bloomIO.observe(e); });
    }
    window.__qtReady = true;
  } catch (err) {
    document.documentElement.classList.remove("js");
  }

  /* ---------- 1. Clickable receipts: Bible, Quran, hadith, Talmud, axiom cross-links ---------- */
  var BOOKS = "1 Corinthians|2 Corinthians|1 Thessalonians|2 Thessalonians|1 Timothy|2 Timothy|1 Samuel|2 Samuel|1 Kings|2 Kings|1 Chronicles|2 Chronicles|1 Peter|2 Peter|1 John|2 John|3 John|Genesis|Gen|Exodus|Leviticus|Numbers|Deuteronomy|Joshua|Judges|Ruth|Ezra|Nehemiah|Esther|Job|Psalms?|Proverbs|Ecclesiastes|Song of Solomon|Isaiah|Jeremiah|Lamentations|Ezekiel|Daniel|Hosea|Joel|Amos|Obadiah|Jonah|Micah|Nahum|Habakkuk|Zephaniah|Haggai|Zechariah|Malachi|Matthew|Mark|Luke|John|Acts|Romans|Galatians|Ephesians|Philippians|Colossians|Titus|Philemon|Hebrews|James|Jude|Revelation";
  var SEP = "(?:,\\s(?:and\\s)?|\\sand\\s)";
  var SEPQ = "(?:[,;]\\s(?:and\\s)?|\\sand\\s)";
  var VRS = "\\d+(?::\\d+(?:[–-]\\d+(?::\\d+)?)?|[–-]\\d+)?";
  var LINK_RX = new RegExp(
    "\\b(" + BOOKS + ")\\s(" + VRS + "(?:[,;]\\s\\d+:\\d+(?:[–-]\\d+)?)*)" +
    "|\\b(?:Surah|Qur['’]an|Quran|Koran)\\s(\\d+(?::\\d+(?:[–-]\\d+)?)?(?:" + SEPQ + "\\d+:\\d+(?:[–-]\\d+)?)*)" +
    "|\\b(?:Sahih\\s)?(?:al-)?Bukhari\\s(\\d+)" +
    "|\\bSunan Abi Dawud\\s(\\d+)" +
    "|\\b(Yoma 39b)" +
    "|\\b(Axioms?\\s)(\\d+(?:[–-]\\d+)?(?:" + SEP + "\\d+(?:[–-]\\d+)?)*)",
    "g"
  );
  function ext(href, text, attrs) { return '<a class="ref" href="' + href + '" target="_blank" rel="noopener"' + (attrs || "") + ">" + text + "</a>"; }
  function dash(s) { return s.replace(/–/g, "-"); }
  function bibleUrl(ref) { return "https://www.biblegateway.com/passage/?search=" + encodeURIComponent(dash(ref)) + "&version=ESV"; }
  function quranUrl(ref) { var p = dash(ref).split(":"); return "https://quran.com/" + p[0] + (p[1] ? "/" + p[1] : ""); }
  function linkEach(list, rx, make) {
    var first = true;
    return list.replace(rx, function (r) { var out = make(r, first); first = false; return out; });
  }
  var QURAN_HINT = /Qur['’]?an|Quran|Koran|Surah|Muslim|Islam|Allah|Muhammad/;
  function quranLink(r, label) {
    var s = parseInt(r, 10);
    if (!(s >= 1 && s <= 114)) return label;
    return ext(quranUrl(r), label, ' data-verse="quran" data-ref="' + r + '"');
  }
  function linkify(html, quranCtx) {
    var out = html.replace(LINK_RX, function (m, book, brefs, qrefs, bukhari, dawud, yoma, axWord, axrefs) {
      if (book) return linkEach(brefs, /\d+(?::\d+(?:[–-]\d+(?::\d+)?)?|[–-]\d+)?/g, function (r, first) {
        var ref = book + " " + r;
        return ext(bibleUrl(ref), first ? ref : r, ' data-verse="bible" data-ref="' + ref + '"');
      });
      if (qrefs) {
        var prefix = m.slice(0, m.indexOf(qrefs));
        return linkEach(qrefs, /\d+(?::\d+(?:[–-]\d+)?)?/g, function (r, first) { return quranLink(r, first ? prefix + r : r); });
      }
      if (bukhari) return ext("https://sunnah.com/bukhari:" + bukhari, m);
      if (dawud) return ext("https://sunnah.com/abudawud:" + dawud, m);
      if (yoma) return ext("https://www.sefaria.org/Yoma.39b", m);
      if (axrefs) return linkEach(axrefs, /\d+(?:[–-]\d+)?/g, function (r, first) {
        return '<a class="axlink" href="#axiom-' + parseInt(r, 10) + '">' + (first ? axWord + r : r) + "</a>";
      });
      return m;
    });
    return shortRefs(out, quranCtx ? "Q" : null);
  }
  /* Short refs like "(53:8)" take the last scripture named before them: a Bible book or the Qur'an. */
  var SHORT_RX = new RegExp(
    "(<a\\b[^>]*>[\\s\\S]*?</a>)" +
    "|(<[^>]+>)" +
    "|(\\d{1,3}:\\d{1,3}(?:[–-]\\d{1,3}(?::\\d{1,3})?)?)(?![\\d:])" +
    "|\\b(" + BOOKS + ")\\b" +
    "|\\b(Qur['’]?an|Quran|Koran|Surah)\\b",
    "g"
  );
  function shortRefs(html, start) {
    var last = start;
    return html.replace(SHORT_RX, function (m, anchor, tag, ref, book, quran, at, str) {
      if (anchor) {
        var dr = /data-ref="([^"]+)"/.exec(anchor), dv = /data-verse="(\w+)"/.exec(anchor);
        if (dv && dv[1] === "quran") last = "Q";
        else if (dr) { var bk = /^(.*?)\s\d/.exec(dr[1]); if (bk) last = bk[1]; }
        return m;
      }
      if (tag) return m;
      if (book) { last = book; return m; }
      if (quran) { last = "Q"; return m; }
      if (ref) {
        if (!last || (at > 0 && /[\d:]/.test(str.charAt(at - 1)))) return m;
        if (last === "Q") return quranLink(ref, ref);
        var full = last + " " + ref;
        return ext(bibleUrl(full), ref, ' data-verse="bible" data-ref="' + full + '"');
      }
      return m;
    });
  }

  /* ---------- 2. Glossary data ---------- */
  var GLOSS_GROUPS = ["Science & Cosmos", "Philosophy & Logic", "Theology", "Other Religions", "Bible & History", "Fallacies"];
  var GLOSSARY = [
    ["BGV Theorem", "BGV Theorem|BGV", 0, "A 2003 theorem by physicists Arvind Borde, Alan Guth, and Alexander Vilenkin: any universe that has, on average, been expanding cannot be infinite in the past—it must have a past boundary, a beginning."],
    ["Laws of Thermodynamics", "Laws of Thermodynamics|Thermodynamics", 0, "The 1st Law: energy can't be created or destroyed, only changed in form. The 2nd Law: in a closed system, usable energy runs down and disorder (entropy) increases over time."],
    ["Entropy", "entropy", 0, "A measure of disorder—how spread out and unusable energy has become. The 2nd Law says it always increases in a closed system."],
    ["Heat Death", "Heat Death", 0, "The predicted end of the universe, when all usable energy is evenly spread out and nothing more can happen."],
    ["Big Bang nucleosynthesis", "Big Bang nucleosynthesis", 0, "The formation of the first light elements (hydrogen, helium, lithium) in the first minutes after the Big Bang. Heavier elements were forged later inside stars."],
    ["Spacetime", "spacetime", 0, "Einstein's union of three dimensions of space and one of time into a single fabric that matter and energy bend."],
    ["Superposition", "superposition", 0, "In quantum mechanics, a system existing in a combination of possible states until it is measured or interacts with its environment."],
    ["Decoherence", "Decoherence", 0, "The process by which a quantum system's interactions with its environment make it lose its superposition and behave classically."],
    ["Measurement problem", "measurement problem", 0, "The unsolved question of how and why quantum possibilities become one definite outcome."],
    ["Hilbert space", "Hilbert space", 0, "The mathematical space used to describe every possible state of a quantum system."],
    ["Fine-tuning", "Fine-Tuning|fine-tuned", 0, "The observation that the constants and starting conditions of physics fall within extremely narrow ranges that allow life to exist."],
    ["Multiverse", "multiverse", 0, "The hypothesis that our universe is one of many—possibly infinitely many—universes. None has ever been observed."],
    ["Boltzmann Brain", "Boltzmann Brains|Boltzmann Brain", 0, "A hypothetical lone brain that randomly fluctuates into existence with false memories. Some multiverse models predict these should vastly outnumber real observers—which would destroy trust in our own minds."],
    ["String landscape", "String Theorists|string landscape", 0, "String theory's estimated 10^500 possible vacuum states, often used to prop up multiverse ideas—none of them observed."],
    ["Quantum vacuum", "quantum vacuum", 0, "The lowest-energy state of quantum fields. It isn't \"nothing\"—it's a sea of fields governed by physical laws."],
    ["Abiogenesis", "Abiogenesis", 0, "The idea that life arose naturally from non-living chemicals."],
    ["Specified information", "specified digital software|specified information", 0, "Information that is both complex and matches an independent functional pattern—like letters forming a sentence, or DNA bases coding for a working protein."],
    ["Panspermia", "panspermia", 0, "The idea that life or its building blocks came to Earth from space. \"Directed panspermia\" (Crick & Orgel, 1973) proposes aliens seeded it on purpose."],
    ["It from Bit", "It from Bit", 0, "Physicist John Wheeler's idea that every physical \"thing\" ultimately comes from information—yes-or-no answers."],
    ["Asphalt paradox", "asphalt paradox", 0, "Chemist Steven Benner's name for how prebiotic chemistry tends to produce useless tar instead of the precise molecules life needs."],
    ["Contingency", "Contingency|contingent", 1, "Something is contingent if it exists but didn't have to—it depends on something else. Everything contingent ultimately depends on something necessary."],
    ["Necessary Being", "Necessary Being", 1, "A being that cannot fail to exist. It depends on nothing else and explains everything else."],
    ["Kalam Cosmological Argument", "Kalam", 1, "Whatever begins to exist has a cause; the universe began to exist; therefore the universe has a cause."],
    ["Agent causation", "Agent Causation", 1, "The idea that a free personal agent can start a chain of effects by choice, not just through prior mechanical causes."],
    ["Law of Non-Contradiction", "Law of Non-Contradiction", 1, "Something can't be both true and not true at the same time and in the same sense."],
    ["Gödel's Incompleteness Theorems", "Incompleteness Theorems|Gödelian Incompleteness", 1, "Kurt Gödel's 1931 proofs: any consistent formal system powerful enough for arithmetic contains true statements it can't prove—and it can't prove its own consistency."],
    ["Mathematical Platonism", "Mathematical Platonism|Platonism", 1, "The view that mathematical truths are real, objective, and exist independently of human minds."],
    ["Hard Problem of Consciousness", "Hard Problem of Consciousness|Hard Problem", 1, "Philosopher David Chalmers' name for the puzzle of why physical brain processes come with subjective experience at all."],
    ["Qualia", "qualia", 1, "The subjective \"what it's like\" of experience—the redness of red, the taste of coffee."],
    ["EAAN", "EAAN|Evolutionary Argument Against Naturalism", 1, "Alvin Plantinga's Evolutionary Argument Against Naturalism: if naturalism and unguided evolution are both true, we'd have no good reason to trust that our beliefs are true—so believing both defeats itself."],
    ["Naturalism", "Naturalism", 1, "The view that nature is all there is—no God, no soul, nothing beyond the physical world."],
    ["Materialism", "Materialism", 1, "The view that only matter and energy exist."],
    ["Objective morality", "objective morality|objective moral", 1, "Moral truths that are true whether or not anyone believes them—like \"torturing children for fun is evil.\""],
    ["Moral anti-realism", "Moral Anti-Realism|moral realism", 1, "Moral realism says objective moral facts exist; anti-realism denies it, treating morality as opinion or feeling."],
    ["Axiology", "Axiological|axiology", 1, "The study of value—what is good, valuable, and worth pursuing."],
    ["Teleology", "Teleology|teleological", 1, "Purpose or goal-directedness—what something is for."],
    ["Intentionality", "Intentionality", 1, "The \"aboutness\" of thoughts—your thoughts are about things beyond themselves."],
    ["Final causality", "Final Causality", 1, "Aristotle's idea that things have a purpose or end they are directed toward."],
    ["Modal Ontological Argument", "Modal Ontological Proof|Modal Ontological", 1, "The argument that if a Maximally Great Being is even possible, it exists in every possible world—and therefore actually exists."],
    ["Maximally Great Being", "Maximally Great Being", 1, "A being with every perfection to the greatest possible degree—all-powerful, all-knowing, perfectly good, and necessary."],
    ["Divine Simplicity", "Divine Simplicity", 1, "The teaching that God isn't made of parts—His attributes are identical with His being."],
    ["Transcendental argument", "Transcendental", 1, "An argument that something (like God) must exist for logic, reason, or knowledge to be possible at all."],
    ["Disjunctive syllogism", "Disjunctive Syllogism", 1, "Either A or B; not A; therefore B. S-GUOT applies it to worldviews: eliminate the false options, and the one left standing is true."],
    ["Trilemma", "Trilemma|Liar, Lunatic, or Lord", 1, "C.S. Lewis' argument that, given Jesus' claims, He was either a liar, a lunatic, or Lord—not merely a good teacher."],
    ["Minimal Facts", "Minimal-Facts|Minimal Facts", 1, "Gary Habermas' method of arguing for the resurrection using only facts accepted by the vast majority of scholars, including skeptics."],
    ["Hilbert's Hotel", "Hilbert's Hotel", 1, "Mathematician David Hilbert's thought experiment about a hotel with infinitely many rooms, used to show the absurdities of an actual infinite."],
    ["Trinity", "Trinity|Tri-Une", 2, "One God eternally existing as three distinct persons—Father, Son, and Holy Spirit—who fully share the one divine nature."],
    ["Unitarianism", "unitarian", 2, "The belief that God is only one person, not three—held by Islam, Jehovah's Witnesses, and Oneness theology."],
    ["Incarnation", "incarnate", 2, "God the Son becoming fully human in Jesus while remaining fully God (John 1:14)."],
    ["Privatio boni", "Privatio Boni|privation", 2, "\"Privation of good\"—Augustine's teaching that evil isn't a created thing but a lack or corruption of good, like rust or a hole."],
    ["Theodicy", "Theodicy", 2, "A defense of God's goodness and justice in light of evil and suffering."],
    ["Libertarian free will", "Libertarian Free Will", 2, "The ability to genuinely choose between options, rather than just acting out prior causes."],
    ["Imago Dei", "Imago Dei", 2, "\"Image of God\"—the biblical teaching that every human being is made in God's image, giving each person inherent worth (Genesis 1:27)."],
    ["Sola Fide", "Sola Fide", 2, "\"Faith alone\"—salvation is received through faith in Christ, not earned by works (Ephesians 2:8–9)."],
    ["Sola Scriptura", "Sola Scriptura", 2, "\"Scripture alone\"—the Bible is the final, highest authority for faith and life."],
    ["Substitutionary atonement", "Substitutionary", 2, "Jesus died in our place, taking the penalty our sins deserve (2 Corinthians 5:21)."],
    ["Typology", "Typology", 2, "When Old Testament people, events, or rituals foreshadow Christ—like the Passover lamb."],
    ["Messianic prophecy", "Messianic prophecies|Messianic Prophecy", 2, "Old Testament predictions about the coming Messiah."],
    ["Caritas", "caritas", 2, "Latin for self-giving love—the love the Father, Son, and Spirit have shared eternally."],
    ["Raqia", "raqia", 2, "The Hebrew word in Genesis 1:6–8 translated \"firmament\" or \"expanse\"—something spread or stretched out."],
    ["Karma", "karma", 3, "In Hinduism, Buddhism, Jainism, and Sikhism, the moral law of cause and effect that shapes future rebirths."],
    ["Samsara", "Samsara", 3, "The endless cycle of birth, death, and rebirth in Indian religions."],
    ["Anatta", "Anatta", 3, "The Buddhist teaching of \"no-self\"—that there is no permanent, unchanging self."],
    ["Tawhid", "Tawhid", 3, "The Islamic doctrine of God's absolute oneness, which rejects the Trinity."],
    ["Surah", "Surah", 3, "A chapter of the Quran. There are 114."],
    ["Hadith", "hadith", 3, "Reports of Muhammad's words and actions. Sahih al-Bukhari is considered the most authentic collection in Sunni Islam."],
    ["Satanic Verses", "Satanic Verses", 3, "An incident recorded by early Muslim historians (al-Tabari, Ibn Sa'd) in which Muhammad recited verses praising pagan goddesses, later said to have come from Satan."],
    ["Tao", "Tao", 3, "In Taoism, the impersonal, nameless \"Way\" said to underlie all things."],
    ["Kami", "kami", 3, "Spirits or divine powers worshiped in Shinto—found in nature, places, and ancestors."],
    ["Exaltation", "exalted", 3, "In Mormon teaching, the process by which faithful humans can become gods, as God the Father is said to have done."],
    ["Textual criticism", "textual criticism", 4, "The science of comparing manuscripts to recover the original wording of a text."],
    ["Codex Sinaiticus & Vaticanus", "Codex Sinaiticus/Vaticanus|Codex Vaticanus|Codex Sinaiticus", 4, "Two of the oldest near-complete Bibles, written in Greek in the 300s AD."],
    ["Dead Sea Scrolls", "Dead Sea Scrolls", 4, "Ancient Jewish manuscripts discovered near Qumran beginning in 1947, including the oldest known copies of Old Testament books."],
    ["Great Isaiah Scroll", "Great Isaiah Scroll", 4, "A complete Dead Sea Scroll of Isaiah dated to about 125 BC—about 1,000 years older than the oldest copies known before it."],
    ["Koine Greek", "Koine Greek", 4, "The common Greek of the first-century Mediterranean world—the language of the New Testament."],
    ["Gnostic gospels", "Gnostic gospels", 4, "Writings like the Gospel of Judas, mostly from the second century and later, that claim secret knowledge—written long after the eyewitnesses."],
    ["P52", "P52", 4, "A papyrus fragment of John 18, often dated around AD 125–175—one of the oldest New Testament manuscripts."],
    ["Council of Nicaea", "Council of Nicaea", 4, "The AD 325 gathering of church leaders that formally affirmed Jesus is fully God, of the same nature as the Father."],
    ["Ignoratio Elenchi", "Ignoratio Elenchi", 5, "\"Missing the point\"—an argument that may be valid but proves a different conclusion than the one in question."],
    ["Argument from Personal Incredulity", "Argument from Personal Incredulity|Personal Incredulity", 5, "\"I can't imagine how that's true, so it must be false.\""],
    ["Category Error", "Category Fallacy|Category Error", 5, "Treating something as belonging to a category it doesn't belong to—like asking what color the number 7 is."],
    ["Bare Assertion", "Bare Assertion", 5, "Claiming something is true just because you said so (also called ipse dixit)."],
    ["Special Pleading", "Special Pleading", 5, "Applying a rule to others while exempting yourself without a good reason."],
    ["Shifting the Burden of Proof", "Shifting the Burden of Proof", 5, "Making a claim and then demanding that others disprove it."],
    ["Reification", "Reification", 5, "Treating an abstract idea, like \"infinity\" or \"chance,\" as if it were a real, concrete thing that can do something."],
    ["Equivocation", "Equivocation", 5, "Switching the meaning of a word partway through an argument."],
    ["Strawman", "Strawman", 5, "Attacking a distorted version of someone's view instead of what they actually believe."],
    ["Non Sequitur", "Non Sequitur", 5, "A conclusion that doesn't follow from the premises."],
    ["Invincible Ignorance", "Invincible Ignorance", 5, "Refusing to accept any evidence, no matter how strong."],
    ["Word-Concept Fallacy", "Word-Concept Fallacy", 5, "Assuming a word and the concept it names are the same thing, or that a word can only mean one thing."],
    ["Presentism", "Presentism", 5, "Judging the past by modern assumptions without understanding its context."],
    ["Stolen Concept", "Stolen Concept", 5, "Using a concept while denying the foundation it depends on—like condemning evil while denying objective morality."],
    ["Genetic Fallacy", "Genetic Fallacy", 5, "Judging a claim true or false based on where it came from instead of its merits."],
    ["God of the Gaps", "God-of-the-Gaps|God of the Gaps", 5, "Inserting God only where science hasn't explained something yet. S-GUOT reasons from what we know, not from gaps."],
    ["Ad Hominem", "Ad Hominem", 5, "Attacking the person instead of the argument."],
    ["Red Herring", "Red Herring", 5, "Distracting from the real issue with an irrelevant topic."],
    ["Tu Quoque", "Tu Quoque", 5, "\"You too\"—dismissing a criticism by accusing the critic of the same thing."],
    ["Ad Hoc Hypothesis", "Ad Hoc Hypothesis", 5, "An explanation invented just to rescue a theory from the evidence against it."],
    ["Parallelomania", "Parallelomania", 5, "Exaggerating surface-level similarities between religions to claim one copied the other."],
    ["Is–Ought Fallacy", "Is–Ought Fallacy|Is-Ought Fallacy", 5, "Jumping from what is to what ought to be, as if describing behavior makes it right."],
    ["False Equivalence", "False Equivalence", 5, "Treating two things as the same when they differ in the ways that matter."],
    ["False Analogy", "False Analogy", 5, "Comparing two things that aren't alike in the way the argument needs."],
    ["Begging the Question", "Begging the Question", 5, "Assuming the very conclusion you're trying to prove."],
    ["Appeal to Authority", "Appeal to Authority", 5, "Claiming something is true only because an authority said so, without the evidence."],
    ["Self-refutation", "Self-Refutation|self-refuting", 5, "A claim that defeats itself—like \"there is no truth.\""],
    ["Argument from Silence", "Argument from Silence", 5, "Concluding something is false just because a source doesn't say it in the exact words you expect."],
    ["Proof-Texting", "Proof-Texting", 5, "Pulling a verse out of its context to make it say something it doesn't."],
    ["False Dilemma", "False Dilemma", 5, "Pretending there are only two options when there are more."],
    ["Scientism", "Scientism", 5, "The self-refuting claim that only science can tell us what's true."],
    ["Infinite Regress", "Infinite Regress", 5, "An endless chain of causes or explanations that never gets started—like aliens made by aliens made by aliens."],
    ["Historical Revisionism", "Historical Revisionism", 5, "Rewriting history against the evidence to fit a theory."],
    ["Magic-Wand Hand-Waving", "Magic-Wand Hand-Waving", 5, "Waving away a real problem with a vague \"it just happened somehow.\""]
  ];
  if (window.QT && window.QT.glossExtra) GLOSSARY = GLOSSARY.concat(window.QT.glossExtra);
  var gloss = GLOSSARY.map(function (g) {
    return { term: g[0], aliases: g[1].split("|"), group: GLOSS_GROUPS[g[2]], def: g[3], slug: slug(g[0]) };
  });
  var glossBySlug = {};
  gloss.forEach(function (g) { glossBySlug[g.slug] = g; });

  safe("glossary", function () {
    var list = $("#glossaryList");
    if (!list) return;
    GLOSS_GROUPS.forEach(function (grp) {
      var h = el("h3", "gloss-group");
      h.textContent = grp;
      list.appendChild(h);
      gloss.filter(function (g) { return g.group === grp; })
        .sort(function (a, b) { return a.term.localeCompare(b.term); })
        .forEach(function (g) {
          var item = el("article", "gloss-item");
          item.id = "g-" + g.slug;
          var h4 = el("h4");
          h4.textContent = g.term;
          var p = el("p");
          p.innerHTML = linkify(esc(g.def));
          item.appendChild(h4);
          item.appendChild(p);
          list.appendChild(item);
        });
    });
  });

  function linkifyIn(root) {
    $$("[data-link], .qa > h3, .point > h3, .admit-q", root).forEach(function (e) {
      if (e.getAttribute("data-linked")) return;
      var card = e.closest(".card, .da-panel"), ctx = !!e.closest("#islam, [data-cat='isl']") || !!(card && QURAN_HINT.test(card.textContent));
      e.innerHTML = linkify(e.innerHTML, ctx);
      e.setAttribute("data-linked", "1");
    });
  }
  safe("linkify", function () { linkifyIn(document); });

  /* ---------- 3. Tap-to-define: underline glossary terms inside cards ---------- */
  var underlineIn = function () {};
  safe("terms", function () {
    var aliasMap = {};
    var aliases = [];
    gloss.forEach(function (g) {
      g.aliases.forEach(function (a) { aliasMap[a.toLowerCase()] = g.slug; aliases.push(a); });
    });
    aliases.sort(function (a, b) { return b.length - a.length; });
    var rx = new RegExp("\\b(?:" + aliases.map(function (a) { return a.replace(/[.*+?^${}()|[\]\\\/]/g, "\\$&"); }).join("|") + ")\\b", "gi");
    var SKIP = { A: 1, BUTTON: 1, H1: 1, H2: 1, H3: 1, H4: 1, SUP: 1, SUB: 1, SCRIPT: 1, STYLE: 1 };
    var SKIP_CLASS = ["term", "label", "tag", "badge", "tl-date", "wv-num", "step-n"];
    function skipNode(n, root) {
      var p = n.parentNode;
      while (p && p !== root.parentNode) {
        if (SKIP[p.nodeName]) return true;
        if (p.classList) for (var i = 0; i < SKIP_CLASS.length; i++) if (p.classList.contains(SKIP_CLASS[i])) return true;
        p = p.parentNode;
      }
      return false;
    }
    underlineIn = function (root) { $$(".card", root).forEach(function (card) {
      if (card.getAttribute("data-termed")) return;
      card.setAttribute("data-termed", "1");
      var used = {};
      var walker = document.createTreeWalker(card, NodeFilter.SHOW_TEXT, null);
      var nodes = [];
      while (walker.nextNode()) {
        var n = walker.currentNode;
        if (n.nodeValue && n.nodeValue.trim() && !skipNode(n, card)) nodes.push(n);
      }
      nodes.forEach(function (node) {
        var cur = node;
        while (cur) {
          rx.lastIndex = 0;
          var text = cur.nodeValue, m, found = null;
          while ((m = rx.exec(text))) {
            var key = aliasMap[m[0].toLowerCase()];
            if (key && !used[key]) { found = { i: m.index, len: m[0].length, key: key }; break; }
          }
          if (!found) break;
          used[found.key] = true;
          var mid = cur.splitText(found.i);
          var rest = mid.splitText(found.len);
          var btn = el("button", "term");
          btn.type = "button";
          btn.setAttribute("data-term", found.key);
          btn.textContent = mid.nodeValue;
          mid.parentNode.replaceChild(btn, mid);
          cur = rest;
        }
      });
    }); };
    underlineIn($("main"));
  });

  /* ---------- 4. Plain text for copying + share cards ---------- */
  function plainText(e) {
    if (!e) return "";
    var c = e.cloneNode(true);
    Array.prototype.slice.call(c.querySelectorAll("sup")).reverse().forEach(function (s) { s.replaceWith("^" + s.textContent); });
    c.querySelectorAll("sub").forEach(function (s) { s.replaceWith("_" + s.textContent); });
    c.querySelectorAll("li").forEach(function (li) { li.prepend("\uE000"); });
    return c.textContent.replace(/\s+/g, " ").replace(/\s*\uE000\s*/g, "\n• ").trim();
  }
  function stripLead(s) { return s.replace(/^(Evidence|Rebuttals?|Receipts|Fallac(?:y|ies)|Quick answer|Your answer|Cost of escape|Best objection|Their best reply|Their reply and yours):\s*/, ""); }
  var SIGN = "— QuantumTheology (S-GUOT)";
  function copyTextFor(card, mode) {
    if (card.classList.contains("axiom")) {
      return [plainText($(".label", card)).toUpperCase() + " — " + plainText($("h3", card)), plainText($(".claim", card)), plainText($(".prem", card)), "Receipts: " + stripLead(plainText($(".receipts", card))), SIGN].join("\n\n");
    }
    if (card.classList.contains("qa")) {
      var fal = stripLead(plainText($(".fallacy", card)));
      var quick = stripLead(plainText($(".evidence.quick", card)));
      if (mode === "quick") return (fal.length < 46 ? fal + ": " : "") + quick;
      var full = stripLead(plainText($(".evidence.full", card)));
      return ["Q: " + plainText($("h3", card)), "Fallacy: " + fal, quick, full, SIGN].join("\n\n");
    }
    if (card.classList.contains("tl-card")) {
      return [plainText($(".tl-date", card)) + ": " + plainText($("h3", card)), plainText($(".body", card)), plainText($(".src", card)), SIGN].join("\n\n");
    }
    return [plainText($("h3", card)), plainText($(".body", card)), SIGN].join("\n\n");
  }
  function legacyCopy(text) {
    try {
      var ta = el("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.top = "-1000px";
      document.body.appendChild(ta);
      ta.select();
      var ok = document.execCommand("copy");
      ta.remove();
      return ok;
    } catch (err) { return false; }
  }
  function copyToClipboard(text) {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        return navigator.clipboard.writeText(text).then(function () { return true; }, function () { return legacyCopy(text); });
      }
    } catch (err) { /* fall through */ }
    return Promise.resolve(legacyCopy(text));
  }
  function flashButton(btn, ok, okText, idleText) {
    btn.textContent = ok ? okText : "Couldn't copy";
    btn.classList.toggle("copied", ok);
    clearTimeout(btn._reset);
    btn._reset = setTimeout(function () { btn.textContent = idleText; btn.classList.remove("copied"); }, 1600);
  }

  /* ---------- 5. Pop-up sheet (verses, glossary terms, share cards) ---------- */
  var sheet = $("#sheet"), sheetKicker = $("#sheetKicker"), sheetTitle = $("#sheetTitle"), sheetBody = $("#sheetBody");
  var finder = $("#finder");
  var lastFocus = null, sheetBlobUrl = null;
  function lockScroll() {
    document.documentElement.classList.toggle("locked", !(sheet.hidden && finder.hidden));
  }
  function openSheet(o) {
    closeAxPop(false);
    if (sheet.hidden) lastFocus = document.activeElement;
    if (sheetBlobUrl) { URL.revokeObjectURL(sheetBlobUrl); sheetBlobUrl = null; }
    sheetKicker.textContent = o.kicker || "";
    sheetTitle.textContent = o.title || "";
    sheetBody.innerHTML = "";
    if (o.body) sheetBody.appendChild(o.body);
    sheet.hidden = false;
    lockScroll();
    var close = $(".icon-btn", sheet);
    if (close) close.focus({ preventScroll: true });
  }
  function closeSheet() {
    if (sheet.hidden) return;
    sheet.hidden = true;
    sheetBody.innerHTML = "";
    if (sheetBlobUrl) { URL.revokeObjectURL(sheetBlobUrl); sheetBlobUrl = null; }
    lockScroll();
    if (lastFocus && lastFocus.focus && finder.hidden) lastFocus.focus({ preventScroll: true });
  }
  function sheetShows(body) { return !sheet.hidden && sheetBody.firstChild === body; }
  function linkOut(href, text) {
    var a = el("a", "sheet-link");
    a.href = href;
    a.target = "_blank";
    a.rel = "noopener";
    a.textContent = text;
    return a;
  }
  $$("[data-close-sheet]").forEach(function (b) { b.addEventListener("click", closeSheet); });

  /* ----- Verse pop-ups ----- */
  var verseCache = {};
  function fetchJSON(url) {
    return fetch(url).then(function (r) { if (!r.ok) throw new Error("HTTP " + r.status); return r.json(); });
  }
  function loadBible(ref) {
    var q = dash(ref.replace(/^Gen /, "Genesis "));
    var tr = Q.store.get("tr", "kjv") === "web" ? "web" : "kjv";
    return fetchJSON("https://bible-api.com/" + encodeURIComponent(q) + "?translation=" + tr).then(function (d) {
      if (!d || !d.verses || !d.verses.length) throw new Error("no verses");
      return { verses: d.verses.map(function (v) { return { n: v.verse, t: v.text }; }), note: tr === "web" ? "World English Bible (public domain)" : "King James Version (public domain)" };
    });
  }
  function loadQuran(ref) {
    var p = dash(ref).split(":");
    var s = parseInt(p[0], 10);
    if (!p[1]) return Promise.reject(new Error("whole surah"));
    var r = p[1].split("-"), a = parseInt(r[0], 10), b = r[1] ? parseInt(r[1], 10) : a;
    if (!(s > 0 && a > 0 && b >= a && b - a < 15)) return Promise.reject(new Error("range"));
    var jobs = [];
    for (var i = a; i <= b; i++) {
      jobs.push(fetchJSON("https://api.alquran.cloud/v1/ayah/" + s + ":" + i + "/en.sahih").then(function (d) {
        if (!d || !d.data || !d.data.text) throw new Error("bad ayah");
        return { n: d.data.numberInSurah, t: d.data.text };
      }));
    }
    return Promise.all(jobs).then(function (verses) { return { verses: verses, note: "Saheeh International translation" }; });
  }
  function openVerse(a) {
    var kind = a.getAttribute("data-verse"), ref = a.getAttribute("data-ref"), href = a.href;
    var isQ = kind === "quran";
    var body = el("div");
    var wait = el("p", "sheet-note");
    wait.innerHTML = '<span class="loading"></span>Loading the text…';
    body.appendChild(wait);
    openSheet({ kicker: isQ ? "Quran" : "Bible", title: (isQ ? "Surah " : "") + ref, body: body });
    var key = kind + ":" + ref;
    var job = verseCache[key] || (verseCache[key] = isQ ? loadQuran(ref) : loadBible(ref));
    job.then(function (res) {
      if (!sheetShows(body)) return;
      body.innerHTML = "";
      var para = el("p", "verse-text");
      res.verses.forEach(function (v) {
        var sup = el("sup");
        sup.textContent = v.n;
        para.appendChild(sup);
        para.appendChild(document.createTextNode(String(v.t).replace(/\s+/g, " ").trim() + " "));
      });
      body.appendChild(para);
      var note = el("p", "sheet-note");
      note.textContent = res.note;
      body.appendChild(note);
      if (!isQ) {
        var rd = el("a", "sheet-link");
        rd.href = "#bible";
        rd.setAttribute("data-reader", ref);
        rd.textContent = "Open in the Bible reader →";
        body.appendChild(rd);
        body.appendChild(document.createTextNode("  "));
      }
      body.appendChild(linkOut(href, isQ ? "Open on Quran.com ↗" : "Bible Gateway (ESV, NIV) ↗"));
    }).catch(function () {
      delete verseCache[key];
      if (!sheetShows(body)) return;
      body.innerHTML = "";
      var msg = el("p", "sheet-note");
      msg.textContent = "Couldn't load the text here right now.";
      body.appendChild(msg);
      body.appendChild(linkOut(href, isQ ? "Open on Quran.com ↗" : "Open on Bible Gateway ↗"));
    });
  }

  /* ----- Glossary pop-ups ----- */
  function openTerm(slugKey) {
    var g = glossBySlug[slugKey];
    if (!g) return;
    var body = el("div");
    var p = el("p", "verse-text");
    p.innerHTML = linkify(esc(g.def));
    body.appendChild(p);
    var note = el("p", "sheet-note");
    note.textContent = g.group;
    body.appendChild(note);
    var more = el("a", "sheet-link");
    more.href = "#g-" + g.slug;
    more.textContent = "See the full glossary →";
    more.addEventListener("click", function (e) { e.preventDefault(); closeSheet(); jumpTo($("#g-" + g.slug)); });
    body.appendChild(more);
    openSheet({ kicker: "Glossary", title: g.term, body: body });
  }

  /* ---------- 6. Share cards (1080×1920 image for TikTok / Instagram stories) ---------- */
  function hexToRgba(hex, a) {
    var m = /^#?([0-9a-f]{6})$/i.exec(String(hex).trim());
    if (!m) return "rgba(167,139,250," + a + ")";
    var n = parseInt(m[1], 16);
    return "rgba(" + (n >> 16 & 255) + "," + (n >> 8 & 255) + "," + (n & 255) + "," + a + ")";
  }
  function roundRect(x, px, py, w, h, r) {
    x.beginPath();
    x.moveTo(px + r, py);
    x.arcTo(px + w, py, px + w, py + h, r);
    x.arcTo(px + w, py + h, px, py + h, r);
    x.arcTo(px, py + h, px, py, r);
    x.arcTo(px, py, px + w, py, r);
    x.closePath();
  }
  function wrapText(x, text, maxW) {
    var out = [];
    String(text).split("\n").forEach(function (para) {
      var words = para.split(/\s+/).filter(Boolean), line = "";
      words.forEach(function (w) {
        var test = line ? line + " " + w : w;
        if (line && x.measureText(test).width > maxW) { out.push(line); line = w; } else { line = test; }
      });
      if (line) out.push(line);
    });
    return out;
  }
  function fitText(x, text, font, maxW, maxH, maxSize, minSize, lh) {
    for (var s = maxSize; s >= minSize; s -= 2) {
      x.font = font.replace("{s}", s);
      var lines = wrapText(x, text, maxW);
      if (lines.length * s * lh <= maxH) return { size: s, lines: lines };
    }
    x.font = font.replace("{s}", minSize);
    var all = wrapText(x, text, maxW), fit = Math.max(1, Math.floor(maxH / (minSize * lh)));
    if (all.length > fit) { all = all.slice(0, fit); all[fit - 1] = all[fit - 1].replace(/\s*\S*$/, "") + "…"; }
    return { size: minSize, lines: all };
  }
  function setSpacing(x, v) { if ("letterSpacing" in x) x.letterSpacing = v; }
  function drawShareCard(d) {
    var W = 1080, H = 1920, c = el("canvas");
    c.width = W; c.height = H;
    var x = c.getContext("2d");
    var bg = x.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0, "#0e0a26"); bg.addColorStop(0.55, "#070815"); bg.addColorStop(1, "#04050c");
    x.fillStyle = bg; x.fillRect(0, 0, W, H);
    function glowAt(cx, cy, r, col) {
      var g = x.createRadialGradient(cx, cy, 0, cx, cy, r);
      g.addColorStop(0, col); g.addColorStop(1, "rgba(0,0,0,0)");
      x.fillStyle = g; x.fillRect(0, 0, W, H);
    }
    glowAt(160, 240, 760, "rgba(124,58,237,0.55)");
    glowAt(980, 820, 660, "rgba(14,165,233,0.38)");
    glowAt(240, 1700, 780, "rgba(217,70,239,0.28)");
    var seed = 11;
    function rnd() { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; }
    x.fillStyle = "#ffffff";
    for (var i = 0; i < 150; i++) {
      x.globalAlpha = 0.25 + rnd() * 0.75;
      x.beginPath(); x.arc(rnd() * W, rnd() * H, rnd() * 1.8 + 0.4, 0, 6.2832); x.fill();
    }
    x.globalAlpha = 1;
    x.font = "700 50px 'Space Grotesk', sans-serif";
    x.fillStyle = "#ffffff";
    x.fillText("QUANTUM", 90, 170);
    var qw = x.measureText("QUANTUM").width;
    var tg = x.createLinearGradient(90 + qw, 0, 90 + qw + 300, 0);
    tg.addColorStop(0, "#a78bfa"); tg.addColorStop(0.5, "#60a5fa"); tg.addColorStop(1, "#67e8f9");
    x.fillStyle = tg;
    x.fillText("THEOLOGY", 90 + qw, 170);
    var px = 70, py = 260, pw = W - 140, ph = 1440;
    x.save();
    x.shadowColor = d.accent; x.shadowBlur = 70;
    roundRect(x, px, py, pw, ph, 48);
    x.fillStyle = "rgba(16,18,36,0.88)"; x.fill();
    x.restore();
    x.save();
    roundRect(x, px, py, pw, ph, 48); x.clip();
    var ig = x.createRadialGradient(px, py, 0, px, py, 760);
    ig.addColorStop(0, hexToRgba(d.accent, 0.24)); ig.addColorStop(1, "rgba(0,0,0,0)");
    x.fillStyle = ig; x.fillRect(px, py, pw, ph);
    x.restore();
    roundRect(x, px, py, pw, ph, 48);
    var bgr = x.createLinearGradient(px, py, px + pw, py + ph);
    bgr.addColorStop(0, d.accent); bgr.addColorStop(1, "rgba(103,232,249,0.35)");
    x.lineWidth = 3; x.strokeStyle = bgr; x.stroke();
    var ix = px + 70, iw = pw - 140, y = py + 110;
    x.font = "800 30px 'DM Sans', sans-serif"; x.fillStyle = d.accent;
    setSpacing(x, "5px"); x.fillText(d.kicker.toUpperCase(), ix, y); setSpacing(x, "0px");
    y += 34;
    var t = fitText(x, d.title, "700 {s}px 'Space Grotesk', sans-serif", iw, 340, 72, 44, 1.18);
    x.font = "700 " + t.size + "px 'Space Grotesk', sans-serif"; x.fillStyle = "#ffffff";
    t.lines.forEach(function (ln) { y += t.size * 1.18; x.fillText(ln, ix, y); });
    y += 44;
    var dg = x.createLinearGradient(ix, 0, ix + iw, 0);
    dg.addColorStop(0, d.accent); dg.addColorStop(1, "rgba(103,232,249,0)");
    x.fillStyle = dg; x.fillRect(ix, y, iw, 3);
    y += 26;
    var f = null, footTop = py + ph - 80;
    if (d.foot) {
      f = fitText(x, d.foot, "500 {s}px 'DM Sans', sans-serif", iw, 220, 30, 24, 1.4);
      footTop -= f.lines.length * f.size * 1.4 + (d.footLabel ? 44 : 0);
    }
    var b = fitText(x, d.body, "500 {s}px 'DM Sans', sans-serif", iw, footTop - 36 - y, 46, 26, 1.42);
    x.font = "500 " + b.size + "px 'DM Sans', sans-serif"; x.fillStyle = "#e4e7f7";
    b.lines.forEach(function (ln) { y += b.size * 1.42; x.fillText(ln, ix, y); });
    if (f) {
      var fy = footTop;
      if (d.footLabel) {
        fy += 26;
        x.font = "800 24px 'DM Sans', sans-serif"; x.fillStyle = hexToRgba(d.footColor || "#fbbf77", 0.95);
        setSpacing(x, "4px"); x.fillText(d.footLabel, ix, fy); setSpacing(x, "0px");
        fy += 18;
      }
      x.font = "500 " + f.size + "px 'DM Sans', sans-serif"; x.fillStyle = "rgba(200,204,228,0.9)";
      f.lines.forEach(function (ln) { fy += f.size * 1.4; x.fillText(ln, ix, fy); });
    }
    x.textAlign = "center";
    x.font = "800 40px 'DM Sans', sans-serif"; x.fillStyle = "#67e8f9";
    x.fillText("@quantumtheology", W / 2, 1790);
    x.font = "500 30px 'DM Sans', sans-serif"; x.fillStyle = "rgba(200,204,228,0.85)";
    x.fillText("Every worldview fails except Jesus.", W / 2, 1845);
    x.textAlign = "left";
    return c;
  }
  function shareDataFor(card) {
    var accent = (getComputedStyle(card).getPropertyValue("--accent") || "").trim() || "#a78bfa";
    if (card.classList.contains("axiom")) {
      return { kicker: plainText($(".label", card)) + " · " + plainText($(".tag", card)), title: plainText($("h3", card)), body: plainText($(".claim", card)) + "\n\n" + stripLead(plainText($(".evidence", card))), foot: stripLead(plainText($(".receipts", card))), footLabel: "RECEIPTS", footColor: "#fbbf77", accent: accent };
    }
    if (card.classList.contains("qa")) {
      return { kicker: "Objection · " + plainText($(".label", card)).split(" · ")[0], title: plainText($("h3", card)), body: stripLead(plainText($(".evidence.quick", card))), foot: stripLead(plainText($(".fallacy", card))), footLabel: "FALLACY", footColor: "#fb7185", accent: "#a78bfa" };
    }
    if (card.classList.contains("wv")) {
      var win = card.classList.contains("win");
      return { kicker: win ? "Left standing" : "Eliminated", title: plainText($("h3", card)), body: plainText($(".body", card)), foot: "Tested against the six S-GUOT gates", accent: win ? "#6ee7b7" : "#fb7185" };
    }
    if (card.classList.contains("tl-card")) {
      var kc = (getComputedStyle(card).getPropertyValue("--k") || "").trim() || "#67e8f9";
      return { kicker: plainText($(".tl-date", card)), title: plainText($("h3", card)), body: plainText($(".body", card)), foot: plainText($(".src", card)), footLabel: "SOURCE", footColor: "#67e8f9", accent: kc };
    }
    return { kicker: "Islam · " + plainText($(".label", card)), title: plainText($("h3", card)), body: plainText($(".body", card)), foot: "", accent: "#fb7185" };
  }
  function fontsReady() {
    if (!document.fonts || !document.fonts.load) return Promise.resolve();
    var loads = Promise.all([
      document.fonts.load("700 72px 'Space Grotesk'"),
      document.fonts.load("500 46px 'DM Sans'"),
      document.fonts.load("800 30px 'DM Sans'")
    ]).catch(function () {});
    return Promise.race([loads, new Promise(function (r) { setTimeout(r, 1500); })]);
  }
  function fileName(t) { return (slug(t).slice(0, 48) || "quantumtheology") + ".png"; }
  function openShare(card) { openShareData(shareDataFor(card)); }
  function openShareData(d) {
    var body = el("div");
    var wait = el("p", "sheet-note");
    wait.innerHTML = '<span class="loading"></span>Making your share card…';
    body.appendChild(wait);
    openSheet({ kicker: "Share card", title: d.title.length > 80 ? d.title.slice(0, 77) + "…" : d.title, body: body });
    fontsReady().then(function () {
      var canvas = drawShareCard(d);
      canvas.toBlob(function (blob) {
        if (!blob || !sheetShows(body)) return;
        var url = URL.createObjectURL(blob);
        sheetBlobUrl = url;
        var file = null;
        try { file = new File([blob], fileName(d.title), { type: "image/png" }); } catch (err) { file = null; }
        body.innerHTML = "";
        var img = el("img", "share-preview");
        img.src = url;
        img.alt = "Share card preview";
        body.appendChild(img);
        var row = el("div", "sheet-actions");
        if (file && navigator.canShare && navigator.canShare({ files: [file] })) {
          var sb = el("button", "btn btn-primary");
          sb.type = "button";
          sb.textContent = "Share ↗";
          sb.addEventListener("click", function () { navigator.share({ files: [file], title: d.title }).catch(function () {}); });
          row.appendChild(sb);
        }
        var dl = el("a", "btn btn-secondary");
        dl.href = url;
        dl.download = fileName(d.title);
        dl.textContent = "Save image";
        row.appendChild(dl);
        body.appendChild(row);
        var tip = el("p", "sheet-note");
        tip.style.textAlign = "center";
        tip.textContent = "Sized for TikTok and Instagram stories (1080 × 1920).";
        body.appendChild(tip);
      }, "image/png");
    });
  }

  /* ---------- 7. Copy + Share buttons on cards ---------- */
  function makeBtn(label, cls) {
    var b = el("button", "copy-btn" + (cls ? " " + cls : ""));
    b.type = "button";
    b.textContent = label;
    return b;
  }
  /* ----- 1-click Copy Rebuttal + deep links ----- */
  function cardUrl(card) { return location.href.split("#")[0].split("?")[0] + "#" + card.id; }
  function cut(s, max) {
    s = String(s).replace(/\s+/g, " ").trim();
    if (s.length <= max) return s;
    var c = s.slice(0, max), i = Math.max(c.lastIndexOf(", "), c.lastIndexOf("; "), c.lastIndexOf(". "));
    return (i > max * 0.5 ? c.slice(0, i) : c.replace(/\s+\S*$/, "")) + "…";
  }
  function refsIn(text) {
    var seen = {}, out = [];
    String(text).replace(LINK_RX, function (m, book, brefs, qrefs, bukhari, dawud, yoma) {
      if (book || qrefs || bukhari || dawud || yoma) {
        var k = m.replace(/\s+/g, " ");
        if (!seen[k]) { seen[k] = 1; out.push(k); }
      }
      return m;
    });
    return out;
  }
  function rebuttalText(card) {
    var lines = [];
    if (card.classList.contains("axiom")) {
      lines.push("Axiom " + card.id.replace("axiom-", "") + ": " + plainText($("h3", card)));
      lines.push("Claim: " + plainText($(".claim", card)));
      lines.push("Receipt: " + cut(stripLead(plainText($(".receipts", card))), 170));
      var adm = Q.admitsFor ? Q.admitsFor(parseInt(card.id.replace("axiom-", ""), 10)) : [];
      if (adm.length) lines.push("Even " + adm[0].who + " (" + adm[0].role + ") admits: " + (adm[0].q ? "“" + adm[0].text + "”" : adm[0].text) + " (" + adm[0].src + ")");
    } else if (card.classList.contains("admit")) {
      lines.push(plainText($(".admit-q", card)));
      lines.push("— " + plainText($("h3", card)) + ", " + plainText($(".admit-role", card)));
      lines.push(stripLead(plainText($(".admit-use", card))).replace(/\s*Axiom \d+$/, ""));
    } else {
      var fal = stripLead(plainText($(".fallacy", card))), full = stripLead(plainText($(".evidence.full", card)));
      var refs = refsIn(full).slice(0, 3), receipt = refs.join("; ");
      if (!receipt) {
        var axCard = document.getElementById("axiom-" + card.getAttribute("data-ax"));
        receipt = axCard ? cut(stripLead(plainText($(".receipts", axCard))), 130) + " (Axiom " + card.getAttribute("data-ax") + ")" : cut(full, 150);
      }
      lines.push("Q: " + plainText($("h3", card)));
      lines.push("Rebuttal: " + stripLead(plainText($(".evidence.quick", card))));
      if (fal.length < 46) lines.push("Fallacy: " + fal);
      lines.push("Receipt: " + receipt);
    }
    lines.push("Link: " + cardUrl(card));
    lines.push("— QuantumTheology");
    return lines.join("\n");
  }
  function commentText(card) {
    var fal = stripLead(plainText($(".fallacy", card))).split(/[.(]/)[0].trim();
    var rebuttal = stripLead(plainText($(".evidence.quick", card)));
    var lines = ["Objection: " + plainText($("h3", card)), "Fallacy: " + fal, "Rebuttal: " + cut(rebuttal, 260), "Read more: " + cardUrl(card)];
    return lines.join("\n");
  }
  function pinHash(card) { try { if (history.replaceState && card.id) history.replaceState(null, "", "#" + card.id); } catch (e) { /* ignore */ } }
  function copyRebuttal(card, btn) {
    copyToClipboard(rebuttalText(card)).then(function (ok) {
      flashButton(btn, ok, "Copied!", "Copy Rebuttal");
      if (Q.toast) Q.toast(ok ? "Copied! Rebuttal and link are on your clipboard." : "Couldn't copy. Select the text and copy it by hand.");
      if (ok) { pinHash(card); if (Q.award) Q.award(1, "copy"); }
    });
  }
  function copyLink(card, btn) {
    copyToClipboard(cardUrl(card)).then(function (ok) {
      flashButton(btn, ok, "Copied!", "Link");
      if (Q.toast) Q.toast(ok ? "Link copied! It opens straight to this card." : "Couldn't copy the link.");
      if (ok) pinHash(card);
    });
  }
  function addButtons(card) {
    if (card.getAttribute("data-btns")) return;
    card.setAttribute("data-btns", "1");
    var title = plainText($("h3", card));
    var list = [];
    if (card.classList.contains("qa") || card.classList.contains("axiom")) {
      if (card.classList.contains("qa")) {
        var cm = makeBtn("💬", "cm-btn");
        cm.title = "Copy for comments";
        cm.setAttribute("aria-label", "Copy for comments: " + title);
        cm.addEventListener("click", function () {
          copyToClipboard(commentText(card)).then(function (ok) {
            flashButton(cm, ok, "Copied ✓", "💬");
            if (ok && Q.award) Q.award(1, "copy");
          });
        });
        list.push(cm);
        var quick = makeBtn("Quick");
        quick.title = "Copy the short, paste-ready answer";
        quick.setAttribute("aria-label", "Copy the quick answer to " + title);
        quick.addEventListener("click", function () {
          copyToClipboard(copyTextFor(card, "quick")).then(function (ok) { flashButton(quick, ok, "Copied!", "Quick"); if (ok && Q.award) Q.award(1, "copy"); });
        });
        list.push(quick);
      }
      var rebut = makeBtn("Copy Rebuttal", "cr-btn");
      rebut.title = "Copy a punchy summary: claim, receipts and a link to this card";
      rebut.setAttribute("aria-label", "Copy rebuttal for " + title);
      rebut.addEventListener("click", function () { copyRebuttal(card, rebut); });
      var lnk = makeBtn("Link", "link-btn");
      lnk.title = "Copy a link that opens straight to this card";
      lnk.setAttribute("aria-label", "Copy link to " + title);
      lnk.addEventListener("click", function () { copyLink(card, lnk); });
      list.push(rebut, lnk);
    } else if (card.classList.contains("admit")) {
      var cq = makeBtn("Copy quote", "cr-btn");
      cq.setAttribute("aria-label", "Copy the quote from " + title);
      cq.addEventListener("click", function () { copyRebuttal(card, cq); });
      list.push(cq);
    } else {
      var copy = makeBtn("Copy");
      copy.setAttribute("aria-label", "Copy " + title);
      copy.addEventListener("click", function () {
        copyToClipboard(copyTextFor(card)).then(function (ok) { flashButton(copy, ok, "Copied ✓", "Copy"); });
      });
      list.push(copy);
    }
    if (card.id && !card.classList.contains("tl-card")) {
      var save = makeBtn("☆", "save-btn");
      save.title = "Save to my debate kit";
      save.setAttribute("aria-label", "Save " + title + " to my kit");
      save.setAttribute("aria-pressed", "false");
      save.addEventListener("click", function () { kitToggleCard(card); });
      list.unshift(save);
    }
    if (!card.classList.contains("admit")) {
      var share = makeBtn("Share", "share-btn");
      share.setAttribute("aria-label", "Make a share card for " + title);
      share.addEventListener("click", function () { openShare(card); });
      list.push(share);
    }
    var top = $(".card-top", card);
    if (top) {
      var row = el("div", "btn-row");
      list.forEach(function (b) { row.appendChild(b); });
      top.appendChild(row);
    } else {
      var actions = el("div", "card-actions");
      list.forEach(function (b) { actions.appendChild(b); });
      (card.classList.contains("wv") ? $(":scope > div", card) || card : card).appendChild(actions);
    }
  }
  function buttonsIn(root) { $$(".axiom, .qa, .wv, .point, .tl-card, .admit", root).forEach(addButtons); }
  safe("card buttons", function () { buttonsIn(document); });

  /* ---------- 8. Search + filters ---------- */
  function textMap(cards) { var m = new Map(); cards.forEach(function (c) { m.set(c, norm(c.textContent)); }); return m; }
  function makeFilter(o) {
    var cards = $$(o.cards), text = textMap(cards), value = "all";
    function run() {
      var q = norm(o.search.value.trim()), shown = 0;
      cards.forEach(function (c) {
        var ok = (value === "all" || c.getAttribute(o.attr) === value) && (!q || text.get(c).indexOf(q) !== -1);
        c.hidden = !ok;
        if (ok) shown++;
      });
      if (o.groups) $$(o.groups).forEach(function (g) { g.hidden = !g.querySelector(o.cards + ":not([hidden])"); });
      o.count.textContent = "Showing " + shown + " of " + cards.length + " " + o.noun;
      o.empty.hidden = shown !== 0;
    }
    function set(v) {
      value = v;
      o.chips.forEach(function (c) { c.setAttribute("aria-pressed", String(c.getAttribute(o.chipAttr) === v)); });
      run();
    }
    o.chips.forEach(function (c) { c.addEventListener("click", function () { set(c.getAttribute(o.chipAttr)); }); });
    o.search.addEventListener("input", run);
    return { set: set, run: run, reset: function () { o.search.value = ""; set("all"); } };
  }
  var axiomFilter = null, qaFilter = null;
  safe("axiom filter", function () {
    axiomFilter = makeFilter({ cards: ".axiom", attr: "data-bucket", chips: $$("#axioms .chip"), chipAttr: "data-filter", search: $("#axiomSearch"), count: $("#axiomCount"), empty: $("#axiomEmpty"), groups: ".stage-group", noun: "axioms" });
    $$("[data-show-bucket]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        $("#axiomSearch").value = "";
        axiomFilter.set(btn.getAttribute("data-show-bucket"));
        $("#axioms").scrollIntoView({ behavior: scrollMode, block: "start" });
      });
    });
  });
  safe("qa filter", function () {
    qaFilter = makeFilter({ cards: ".qa", attr: "data-cat", chips: $$("#debate .chip"), chipAttr: "data-q", search: $("#qaSearch"), count: $("#qaCount"), empty: $("#qaEmpty"), noun: "questions" });
  });
  var glossSearch = $("#glossSearch");
  function filterGloss() {
    var q = norm(glossSearch.value.trim());
    $$(".gloss-item").forEach(function (it) { it.hidden = !!q && norm(it.textContent).indexOf(q) === -1; });
    $$(".gloss-group").forEach(function (h) {
      var n = h.nextElementSibling, any = false;
      while (n && !n.classList.contains("gloss-group")) { if (!n.hidden) any = true; n = n.nextElementSibling; }
      h.hidden = !any;
    });
  }
  if (glossSearch) glossSearch.addEventListener("input", filterGloss);

  /* ---------- 9. Jumping to cards (axiom links, finder results, glossary) ---------- */
  function flash(e) {
    e.classList.remove("flash");
    void e.offsetWidth;
    e.classList.add("flash");
    clearTimeout(e._flash);
    e._flash = setTimeout(function () { e.classList.remove("flash"); }, 2000);
  }
  function scrollToEl(t, instant) {
    var now = window.pageYOffset || document.documentElement.scrollTop;
    var y = Math.max(0, t.getBoundingClientRect().top + now - 90);
    if (Math.abs(y - now) > 5000) instant = true;
    try { window.scrollTo({ top: y, behavior: instant ? "instant" : scrollMode }); } catch (e) { window.scrollTo(0, y); }
  }
  function jumpTo(target, instant) {
    if (!target) return;
    if (target.hidden) {
      if (target.classList.contains("axiom") && axiomFilter) axiomFilter.reset();
      if (target.classList.contains("qa") && qaFilter) qaFilter.reset();
      if (target.classList.contains("gloss-item") && glossSearch) { glossSearch.value = ""; filterGloss(); }
    }
    target.classList.add("bloomed");
    if (target.classList.contains("qa")) { var more = $("details.more", target); if (more) more.open = true; }
    var bb = $("details.back-box", target);
    if (bb) bb.open = true;
    scrollToEl(target, instant);
    if (target.id && history.replaceState) { try { history.replaceState(null, "", "#" + target.id); } catch (e) { /* ignore */ } }
    flash(target);
    target.classList.add("deep-hit");
    clearTimeout(target._dh);
    target._dh = setTimeout(function () { target.classList.remove("deep-hit"); }, 3400);
  }

  /* ---------- 10. Rebuttal Finder ---------- */
  var STOP = {};
  ("a an the is are was were be been being am i you he she it we they me my your our their this that these those of to in on at by for with from as and or but if then so than too very just can could would should will shall do does did not no yes there here what which who whom whose why how when where all any some much many more most also only even about into out up down over under again once own same such both each few other its im dont doesnt didnt cant wont isnt arent wasnt werent thing things say says said really actually like").split(" ").forEach(function (w) { STOP[w] = 1; });
  var SYN = {
    made: ["create", "created"], make: ["create", "created"], makes: ["create"], created: ["made", "create"], create: ["made", "created"],
    alien: ["panspermia"], aliens: ["panspermia"], monkey: ["evolution"], monkeys: ["evolution"], apes: ["evolution"], darwin: ["evolution"],
    scripture: ["bible"], muslim: ["islam", "quran"], muslims: ["islam", "quran"], allah: ["islam", "quran"], koran: ["quran"],
    mormon: ["mormonism", "lds"], mormons: ["mormonism", "lds"], jw: ["jehovah"], jws: ["jehovah"], witnesses: ["jehovah"],
    pain: ["suffering", "evil"], bad: ["evil", "suffering"], suffer: ["suffering"], hurt: ["suffering"],
    bang: ["bgv", "beginning"], beginning: ["bgv", "began"], nothing: ["vacuum"], copy: ["copycat", "pagan"], copied: ["copycat", "pagan"],
    fake: ["myth", "existed"], real: ["existed", "historical"], prove: ["evidence", "proof"], proof: ["evidence"], dead: ["death", "resurrection"],
    rose: ["resurrection"], resurrected: ["resurrection"], contradiction: ["contradictions", "contradict"], corrupt: ["corrupted", "changed"],
    hell: ["punishment", "eternal"], genocide: ["canaanites"], atheist: ["atheism"], atheists: ["atheism"], religions: ["pluralism", "religion"],
    paths: ["pluralism"], reincarnation: ["rebirth", "samsara", "karma"], jewish: ["judaism"], jews: ["judaism"], buddha: ["buddhism"],
    hindu: ["hinduism", "pantheism"], universe: ["cosmos"], gay: ["morality"], science: ["scientific", "scientism"], forever: ["eternal", "infinite"]
  };
  function tokens(s) {
    return norm(s).replace(/[^a-z0-9+]+/g, " ").split(" ").filter(function (w) { return w.length > 1 && !STOP[w]; });
  }
  function hit(list, t) {
    for (var i = 0; i < list.length; i++) {
      var w = list[i];
      if (w === t) return true;
      if (t.length >= 4 && w.length >= 4 && (w.indexOf(t) === 0 || t.indexOf(w) === 0)) return true;
    }
    return false;
  }
  var index = [];
  var TYPE = {
    qa: { name: "Rebuttal", color: "#6ee7b7" }, axiom: { name: "Axiom", color: "#a78bfa" }, wv: { name: "Worldview", color: "#fb7185" },
    islam: { name: "Islam", color: "#fbbf77" }, glossary: { name: "Glossary", color: "#67e8f9" },
    cb: { name: "Comeback", color: "#fbbf77" }
  };
  function addEntry(type, target, title, body, keys, snippet) {
    index.push({ type: type, el: target, title: title, strong: tokens(title + " " + (keys || "")), weak: tokens(body), phrase: norm(title + " " + (keys || "")), snippet: snippet });
  }
  safe("finder index", function () {
    $$(".qa").forEach(function (c) {
      addEntry("qa", c, plainText($("h3", c)), plainText($(".fallacy", c)) + " " + plainText($(".evidence.quick", c)) + " " + plainText($(".evidence.full", c)), c.getAttribute("data-keys"), stripLead(plainText($(".evidence.quick", c))));
    });
    $$(".axiom").forEach(function (c) {
      addEntry("axiom", c, plainText($(".label", c)) + ": " + plainText($("h3", c)), plainText($(".claim", c)) + " " + plainText($(".evidence", c)) + " " + plainText($(".receipts", c)), plainText($(".tag", c)), plainText($(".claim", c)));
    });
    $$(".wv").forEach(function (c) {
      addEntry("wv", c, plainText($("h3", c)), plainText($(".body", c)) + " " + plainText($(".back-list", c)), plainText($(".wv-cat", c)), plainText($(".body", c)));
    });
    $$(".point").forEach(function (c) {
      addEntry("islam", c, plainText($("h3", c)), plainText($(".body", c)), "islam muslim quran muhammad allah", plainText($(".body", c)));
    });
    gloss.forEach(function (g) { addEntry("glossary", $("#g-" + g.slug), g.term, g.def, g.aliases.join(" "), g.def); });
    $$(".wv .back-list li, .point .back-list li").forEach(function (li) {
      var card = li.closest(".card"), who = plainText($("h3", card));
      var say = plainText($(".back-say", li)).replace(/^(They'll say|What they'll do):\s*/, "").replace(/^“|”$/g, "");
      var ans = plainText($(".back-ans", li)).replace(/^(You say|Your move):\s*/, "");
      addEntry("cb", card, say + " (" + who + ")", ans, who, ans);
      index[index.length - 1].text = "They say: " + say + "\nYou say: " + ans;
    });
  });
  function searchIndex(q) {
    var base = tokens(q);
    if (!base.length) return [];
    var qt = base.slice();
    base.forEach(function (t) { (SYN[t] || []).forEach(function (s) { if (qt.indexOf(s) === -1) qt.push(s); }); });
    var phrase = norm(q).replace(/[^a-z0-9+]+/g, " ").trim();
    return index.map(function (e) {
      var s = 0;
      qt.forEach(function (t) { if (hit(e.strong, t)) s += 3; else if (hit(e.weak, t)) s += 1; });
      if (phrase.length >= 5 && e.phrase.indexOf(phrase) !== -1) s += 6;
      if (e.type === "qa") s *= 1.25;
      return { e: e, s: s };
    }).filter(function (r) { return r.s >= 3; })
      .sort(function (a, b) { return b.s - a.s; })
      .slice(0, 6);
  }
  var finderInput = $("#finderInput"), finderResults = $("#finderResults"), finderSuggest = $("#finderSuggest");
  function renderFinder() {
    var q = finderInput.value.trim();
    finderResults.innerHTML = "";
    finderSuggest.hidden = !!q;
    if (!q) return;
    var res = searchIndex(q);
    if (!res.length) {
      var none = el("p", "f-empty");
      none.textContent = "No direct match yet—try different words, or browse the Debate Q&A.";
      finderResults.appendChild(none);
      return;
    }
    res.forEach(function (r, i) {
      var e = r.e, t = TYPE[e.type];
      var box = el("article", "f-result");
      box.style.animationDelay = i * 50 + "ms";
      var type = el("span", "f-type");
      type.style.setProperty("--c", t.color);
      type.textContent = t.name;
      var h = el("h4");
      h.textContent = e.title;
      var p = el("p");
      p.textContent = e.snippet.length > 220 ? e.snippet.slice(0, 217).replace(/\s+\S*$/, "") + "…" : e.snippet;
      var actions = el("div", "f-actions");
      var jump = el("button", "copy-btn");
      jump.type = "button";
      jump.textContent = "Jump to it →";
      jump.addEventListener("click", function () { closeFinder(true); jumpTo(e.el); });
      actions.appendChild(jump);
      if (e.type === "qa") {
        var cq = el("button", "copy-btn");
        cq.type = "button";
        cq.textContent = "Quick";
        cq.addEventListener("click", function () {
          copyToClipboard(copyTextFor(e.el, "quick")).then(function (ok) { flashButton(cq, ok, "Copied ✓", "Quick"); });
        });
        actions.appendChild(cq);
      }
      if (e.type !== "glossary") {
        var cp = el("button", "copy-btn");
        cp.type = "button";
        cp.textContent = e.type === "qa" ? "Full" : "Copy";
        cp.addEventListener("click", function () {
          copyToClipboard(e.text || copyTextFor(e.el)).then(function (ok) { flashButton(cp, ok, "Copied ✓", e.type === "qa" ? "Full" : "Copy"); });
        });
        actions.appendChild(cp);
      }
      box.appendChild(type); box.appendChild(h); box.appendChild(p); box.appendChild(actions);
      finderResults.appendChild(box);
    });
  }
  var finderTimer;
  function openFinder() {
    closeAxPop(false);
    if (!finder.hidden) { finderInput.focus(); return; }
    lastFocus = document.activeElement;
    finder.hidden = false;
    lockScroll();
    finderInput.value = "";
    renderFinder();
    finderInput.focus();
  }
  function closeFinder(skipFocus) {
    if (finder.hidden) return;
    finder.hidden = true;
    lockScroll();
    if (!skipFocus && lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
  }
  if (finder) {
    finderInput.addEventListener("input", function () { clearTimeout(finderTimer); finderTimer = setTimeout(renderFinder, 80); });
    $$("[data-suggest]", finder).forEach(function (b) {
      b.addEventListener("click", function () { finderInput.value = b.getAttribute("data-suggest"); renderFinder(); finderInput.focus(); });
    });
    $$("[data-close-finder]").forEach(function (b) { b.addEventListener("click", function () { closeFinder(); }); });
    $$("[data-open-finder]").forEach(function (b) { b.addEventListener("click", function (e) { e.stopPropagation(); setMenu(false); openFinder(); }); });
  }

  /* ---------- 11. Practice mode now lives in js/arena.js ---------- */

  /* ---------- 12. One click handler for links, terms, and verses ---------- */
  document.addEventListener("click", function (e) {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    var t = e.target;
    if (!t.closest) return;
    var term = t.closest(".term");
    if (term) { e.preventDefault(); openTerm(term.getAttribute("data-term")); return; }
    var go = t.closest("[data-goto]");
    if (go) { var dest = document.getElementById(go.getAttribute("data-goto")); if (dest) { e.preventDefault(); dest.scrollIntoView({ behavior: scrollMode, block: "start" }); } return; }
    var jmp = t.closest("a[data-jump]");
    if (jmp) {
      var jt = document.getElementById((jmp.getAttribute("href") || "").slice(1));
      if (jt) { e.preventDefault(); closeSheet(); jumpTo(jt); }
      return;
    }
    var rdr = t.closest("a[data-reader]");
    if (rdr) {
      e.preventDefault();
      closeSheet();
      if (Q.bibleGo) Q.bibleGo(rdr.getAttribute("data-reader"));
      var bs = document.getElementById("bible");
      if (bs) bs.scrollIntoView({ behavior: scrollMode, block: "start" });
      return;
    }
    var verse = t.closest("a.ref[data-verse]");
    if (verse) { e.preventDefault(); openVerse(verse); return; }
    var ax = t.closest('a[href^="#axiom-"]');
    if (ax) {
      e.preventDefault();
      if (ax.hasAttribute("data-ax-open")) {
        var target = document.getElementById(ax.getAttribute("href").slice(1));
        closeAxPop(false); closeSheet();
        if (target) jumpTo(target);
      } else {
        openAxPop(ax);
      }
    }
  });

  /* ---------- 13. Menu ---------- */
  var menuButton = $("#menuButton"), navLinks = $("#navLinks");
  function setMenu(open) {
    if (!navLinks) return;
    navLinks.classList.toggle("open", open);
    menuButton.setAttribute("aria-expanded", String(open));
  }
  if (menuButton) {
    menuButton.addEventListener("click", function (e) { e.stopPropagation(); setMenu(!navLinks.classList.contains("open")); });
    $$("a", navLinks).forEach(function (a) { a.addEventListener("click", function () { setMenu(false); }); });
    document.addEventListener("click", function (e) { if (navLinks.classList.contains("open") && !navLinks.contains(e.target)) setMenu(false); });
  }
  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    if (axPop && !axPop.hidden) { closeAxPop(true); return; }
    var kd = document.getElementById("kit");
    if (kd && !kd.hidden) { closeKit(); return; }
    if (!sheet.hidden) closeSheet();
    else if (finder && !finder.hidden) closeFinder();
    else setMenu(false);
  });

  /* ---------- 14. Scroll: progress bar, back-to-top, timeline glow ---------- */
  safe("scroll", function () {
    var bar = $("#progress"), toTop = $("#toTop"), track = $("#timelineTrack"), fillEl = $("#tlFill"), queued = false;
    function onScroll() {
      queued = false;
      var max = document.documentElement.scrollHeight - window.innerHeight;
      var p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      if (bar) bar.style.transform = "scaleX(" + p + ")";
      if (toTop) toTop.classList.toggle("show", window.scrollY > 900);
      if (track && fillEl) {
        var r = track.getBoundingClientRect();
        var tp = r.height > 0 ? (window.innerHeight * 0.65 - r.top) / r.height : 0;
        fillEl.style.transform = "scaleY(" + Math.min(1, Math.max(0, tp)) + ")";
      }
    }
    window.addEventListener("scroll", function () { if (!queued) { queued = true; requestAnimationFrame(onScroll); } }, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();
    if (toTop) toTop.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: scrollMode }); });
  });

  /* ---------- 15. Stats count up ---------- */
  safe("count", function () {
    $$("[data-count]").forEach(function (e) {
      var end = parseInt(e.getAttribute("data-count"), 10) || 0;
      if (reduceMotion) { e.textContent = end; return; }
      var delay = parseInt(e.getAttribute("data-delay"), 10) || 0;
      e.textContent = "0";
      setTimeout(function () {
        var start = null;
        function tick(now) {
          if (start === null) start = now;
          var p = Math.min(1, (now - start) / 1400);
          e.textContent = Math.round(end * (1 - Math.pow(1 - p, 3)));
          if (p < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      }, delay);
    });
  });

  /* ---------- 16. Twinkling starfield with depth ---------- */
  safe("stars", function () {
    var canvas = $("#stars");
    if (!canvas || !canvas.getContext) return;
    var ctx = canvas.getContext("2d");
    var W = 0, H = 0, stars = [], running = true;
    var colors = ["#ffffff", "#c4b5fd", "#a5f3fc", "#bfdbfe", "#f5d0fe"];
    function build() {
      var count = Math.round(Math.min(170, Math.max(60, (W * H) / 8500)));
      stars = [];
      for (var i = 0; i < count; i++) {
        var big = Math.random() < 0.08;
        stars.push({
          x: Math.random() * W, y: Math.random() * H,
          r: big ? Math.random() * 1.1 + 1.1 : Math.random() * 0.9 + 0.25,
          t: Math.random() * Math.PI * 2, tw: Math.random() * 0.025 + 0.006,
          v: Math.random() * 0.08 + 0.015, z: Math.random() * 0.6 + 0.2,
          c: colors[(Math.random() * colors.length) | 0]
        });
      }
    }
    function size() {
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      var nw = window.innerWidth, nh = window.innerHeight, rebuild = nw !== W || !stars.length;
      W = nw; H = nh;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (rebuild) build();
    }
    function draw() {
      ctx.clearRect(0, 0, W, H);
      var sy = window.scrollY || 0;
      for (var i = 0; i < stars.length; i++) {
        var s = stars[i];
        if (!reduceMotion) {
          s.t += s.tw;
          s.y -= s.v;
          if (s.y < -4) { s.y = H + 4; s.x = Math.random() * W; }
        }
        var y = ((s.y - sy * s.z * 0.12) % H + H) % H;
        var a = 0.25 + 0.75 * Math.abs(Math.sin(s.t));
        ctx.fillStyle = s.c;
        ctx.globalAlpha = a;
        ctx.beginPath(); ctx.arc(s.x, y, s.r, 0, 6.2832); ctx.fill();
        if (s.r > 1.1) {
          ctx.globalAlpha = a * 0.14;
          ctx.beginPath(); ctx.arc(s.x, y, s.r * 4.5, 0, 6.2832); ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
    }
    function loop() { if (running) draw(); requestAnimationFrame(loop); }
    size();
    var rt;
    window.addEventListener("resize", function () { clearTimeout(rt); rt = setTimeout(function () { size(); if (reduceMotion) draw(); }, 150); });
    document.addEventListener("visibilitychange", function () { running = !document.hidden; });
    if (reduceMotion) draw(); else requestAnimationFrame(loop);
  });

  /* ---------- 17. Cursor bloom + card spotlight (mouse only) ---------- */
  safe("cursor", function () {
    if (!finePointer || reduceMotion) return;
    var glow = $(".cursor-glow");
    var px = 0, py = 0, pt = null, queued = false;
    document.addEventListener("pointermove", function (e) {
      px = e.clientX; py = e.clientY; pt = e.target;
      if (queued) return;
      queued = true;
      requestAnimationFrame(function () {
        queued = false;
        glow.classList.add("on");
        glow.style.transform = "translate3d(" + px + "px," + py + "px,0)";
        var c = pt && pt.closest ? pt.closest(".card") : null;
        if (c) {
          var r = c.getBoundingClientRect();
          c.style.setProperty("--mx", (px - r.left) + "px");
          c.style.setProperty("--my", (py - r.top) + "px");
        }
      });
    }, { passive: true });
    document.addEventListener("mouseout", function (e) { if (!e.relatedTarget) glow.classList.remove("on"); });
  });

  /* ---------- 18. TikTok clips (load the embed only when you scroll near it) ---------- */
  safe("tiktok", function () {
    var clips = $("#clips");
    if (!clips) return;
    var loaded = false;
    function load() {
      if (loaded) return;
      loaded = true;
      var s = el("script");
      s.async = true;
      s.src = "https://www.tiktok.com/embed.js";
      document.body.appendChild(s);
    }
    if ("IntersectionObserver" in window) {
      var tio = new IntersectionObserver(function (entries) {
        if (entries.some(function (en) { return en.isIntersecting; })) { tio.disconnect(); load(); }
      }, { rootMargin: "700px 0px" });
      tio.observe(clips);
    } else {
      load();
    }
  });

  /* ---------- 19. Landing on a #link ---------- */
  function landOnHash() {
    var id = "";
    try { id = decodeURIComponent((location.hash || "").slice(1)); } catch (e) { id = (location.hash || "").slice(1); }
    if (!id) return;
    var m = /^stress-([a-z]+)$/.exec(id);
    if (m) { if (Q.openStress) Q.openStress(m[1], true); return; }
    var t = document.getElementById(id);
    if (t && (t.classList.contains("card") || t.classList.contains("gloss-item"))) {
      jumpTo(t, true);
      setTimeout(function () { if (Math.abs(t.getBoundingClientRect().top - 90) > 40) scrollToEl(t, true); }, 800);
    }
  }
  safe("hash", function () {
    if (location.hash && location.hash.length > 1) {
      var go = function () { setTimeout(landOnHash, 150); };
      if (document.readyState === "complete") go(); else window.addEventListener("load", go);
    }
    window.addEventListener("hashchange", landOnHash);
  });

  /* ---------- 20. Expand-all and exports for the arena + reader ---------- */
  safe("toggles", function () {
    var ex = $("#qaExpand");
    if (ex) {
      ex.addEventListener("click", function () {
        var on = ex.getAttribute("aria-pressed") !== "true";
        ex.setAttribute("aria-pressed", String(on));
        ex.textContent = on ? "Collapse all full breakdowns" : "Expand all full breakdowns";
        $$("#qaMount details.more").forEach(function (d) { d.open = on; });
      });
    }
    if (Q.paintXP) Q.paintXP();
  });

  /* ---------- 21. Test Your Worldview: interactive stress-test ----------
     Each worldview has a short walk (one step at a time) tied to specific axioms and Q&A cards.
     "q" entries are text fragments, matched against the Q&A questions at run time so links never go stale. */
  var STRESS = [
    { id: "atheism", name: "Atheism / Materialism", gate: 1, ax: [1, 2, 3, 5, 6, 7, 8, 9],
      intro: "You hold that only physical matter and energy exist. That's a position with claims to defend, and here are the places it gets tested.",
      steps: [
        { t: "Why is there anything at all?", ax: [1], q: ["just here", "who created God"], ask: "Would I accept “it just exists” as an explanation for anything else?",
          x: "If only physical things exist, the universe either explains itself or simply is. But the universe could have been otherwise, and what could have been otherwise needs an explanation outside itself (Axiom 1). “It's a brute fact” hands the universe a free pass you wouldn't give God. That's Special Pleading." },
        { t: "Did it have a beginning?", ax: [2], q: ["quantum vacuum", "Energy can create itself"], ask: "Which model of an eternal past would I defend, and how does it handle entropy?",
          x: "Three independent routes point to a beginning: an eternal past would already be in heat death, an actual infinite past can't be crossed, and the BGV theorem says an expanding universe has a past boundary. The escape routes (cyclic, emergent) each have unsolved problems, and Axiom 1 still stands even if one worked." },
        { t: "Tuned and coded", ax: [3, 5], q: ["multiverse explains", "RNA world solves"], ask: "What evidence would count for design, on my view?",
          x: "The constants sit in a razor-thin life-permitting range, and the first cell needed a code plus a machine to read it. A multiverse needs its own tuned generator, and no unguided path to a genetic code is known. This is the best explanation on the table, not a proof." },
        { t: "Can I trust my own mind?", ax: [6, 7, 8], q: ["Brain damage", "only path to truth"], ask: "On my view, why should I trust my reasoning about this very question?",
          x: "Consciousness, reliable reasoning and the laws of logic are hard to ground in mindless matter. If beliefs are shaped for survival rather than truth, the belief that naturalism is true loses its footing too (Plantinga's EAAN, serious but contested)." },
        { t: "Right, wrong and human worth", ax: [9], q: ["Morality comes from evolution", "just as moral"], ask: "What makes a human being valuable, on my view?",
          x: "Atheists can absolutely be good people. The question is grounding: why is cruelty actually wrong, and why is a person worth more than a pear? Secular moral realists posit brute abstract oughts, and that has a price too (Axiom 9)." }
      ],
      best: ["“Science will explain these eventually.”", "That's a promissory note, not an explanation. Name the premise you deny and what denying it costs you."],
      fair: "Be fair: secular philosophers have replies to each of these. This isn't a checkmate, it's a list of prices." },

    { id: "agnosticism", name: "Agnosticism", gate: 1, ax: [1, 2, 5, 16, 17],
      intro: "You're not sure whether God exists. That's an honest place to start, and it's a statement about what you know, not about what's true.",
      steps: [
        { t: "What “I don't know” really says", ax: [1], q: ["lack of belief", "burden of proof"], ask: "Can't know, or haven't looked?",
          x: "“Nobody can know” is itself a claim to know something about the limits of knowledge. “I haven't examined it yet” is a different, humbler statement. Which one is yours?" },
        { t: "What's on the table", ax: [2, 5], q: ["Space and time have always existed", "Extraordinary claims"], ask: "Which of these have I actually looked at?",
          x: "A beginning of the universe and the code in living cells are checkable facts, not feelings. If they're real, “no evidence either way” gets hard to maintain, and you can weigh them yourself." },
        { t: "The gates make neutrality expensive", ax: [1, 2], q: ["Which God"], ask: "If I had to bet, where would I land on Gate 1?",
          x: "The six gates are either/or questions. You can suspend judgment out loud, but you answer them in practice by how you live. Is ultimate reality a mind, or not? That's the first fork." },
        { t: "A test you can run with no prior belief", ax: [16, 17], q: ["hallucinated", "never even existed"], ask: "What best explains those facts?",
          x: "The resurrection case uses facts most historians accept, believers or not: the crucifixion, the disciples' sincere belief, and the conversions of Paul and James. You can examine it without assuming anything." }
      ],
      best: ["“There's not enough evidence either way.”", "Then which premise do you find weakest, and what would count as enough? Naming it is how you find out whether you're really undecided."],
      fair: "Honest agnosticism is a good start. The goal is to follow the evidence where it goes, not to pressure anyone." },

    { id: "islam", name: "Islam", gate: 5, ax: [11, 13, 15, 16, 17, 20],
      intro: "You believe in one Creator who is personal, just and merciful. That's real common ground. The differences start at Gates 4 and 5.",
      steps: [
        { t: "Where we agree", ax: [11], q: ["same God as the God of the Bible"], ask: "What would I need to see to take the Gospel's claim about Jesus seriously?",
          x: "Gates 1 to 3 are shared: a personal Creator who is one and distinct from the universe. Christians and Muslims both reject atheism and pantheism. What's left are the questions of who Jesus is and what He did." },
        { t: "The Bible-preservation dilemma", ax: [15], q: ["Bible has been corrupted", "Injil"], ask: "Is there a single manuscript of a different Gospel from before Muhammad?",
          x: "The Qur'an tells people to believe the Gospel (5:47; 10:94) and says God's words can't be changed (6:115). Our New Testament manuscripts are centuries older than Muhammad. So when, exactly, was it corrupted?" },
        { t: "The crucifixion", ax: [17], q: ["Jesus wasn't crucified"], ask: "What's the oldest source that says He wasn't crucified?",
          x: "Paul's creed (within 3 to 5 years), Tacitus, Josephus and nearly every historian, skeptics included, say Jesus was crucified. Qur'an 4:157 denies it six centuries later, with no earlier source." },
        { t: "What Christians actually teach", ax: [13, 14], q: ["Trinity is polytheism"], ask: "Is the Trinity I'm rejecting the one Christians actually hold?",
          x: "Qur'an 5:116 describes the Trinity as God, Jesus and Mary. No Christian teaches that. Christians believe in one God in three persons. The love argument for the Trinity (Axiom 13) is support only, because Muslims reply with God's eternal attributes." },
        { t: "Assurance and grace", ax: [20], q: ["Muslims honor Jesus"], ask: "How can I know I'm forgiven if my deeds are weighed?",
          x: "Islam weighs good deeds against bad with no guarantee (Qur'an 46:9; 21:47). The gospel says Christ's work is finished (John 19:30) and that there is no condemnation for those in Him (Romans 8:1)." }
      ],
      best: ["“The Gospel was corrupted. The real Injil is lost.”", "Qur'an 5:47 tells Christians of Muhammad's day to judge by the Gospel in their hands, which is our New Testament. No lost Injil has ever been found."],
      fair: "Be gracious: Muslims are people made in God's image first. Press the argument and keep the kindness." },

    { id: "pantheism", name: "Pantheism / New Age", gate: 3, ax: [1, 2, 8, 9, 10, 11, 17],
      intro: "You sense that reality is more than matter and that everything is connected. That's a real intuition worth taking seriously.",
      steps: [
        { t: "Where we agree", ax: [6], q: ["spiritual but not religious"], ask: "Is what I feel connected to aware of me?",
          x: "Gate 1 is shared: ultimate reality isn't just dead matter. The question is whether it's the universe itself, or a Mind behind the universe." },
        { t: "Is the universe God?", ax: [1, 2, 11], q: ["We are all God"], ask: "Can something that began and is decaying be the ultimate reality?",
          x: "The universe began, changes and runs down. A perfect, unchanging God can't be identical to that (Axioms 1, 2 and 11). If the universe is divine, so are its decay and its suffering." },
        { t: "If all is one, who's confused?", ax: [8], q: ["manifest my reality"], ask: "Who, exactly, is being fooled by the illusion?",
          x: "If you are God, why did you forget it? Advaita's own critics (Ramanuja) asked who Maya deceives. And “there is no objective truth” claims to be objectively true (Axiom 8)." },
        { t: "Karma with no judge", ax: [9, 10], q: ["Reincarnation explains"], ask: "Who or what keeps the books?",
          x: "An impersonal law can't read intentions, be wronged, or forgive. Karma that nobody remembers or administers isn't justice (Axioms 9 and 10)." },
        { t: "A relationship needs two", ax: [11, 17], q: ["Tarot, astrology", "only way is arrogant"], ask: "How would I know whether what I'm sensing is good?",
          x: "You can't connect with yourself. If there's something to connect with, it has a character, and without revelation you can't test whether it's good or deceiving you (1 John 4:1). The resurrection is the claim that God spoke and acted in history (Axiom 17)." }
      ],
      best: ["“It's beyond logic.”", "Then “beyond logic” is itself a logical claim, and logic is how we're having this conversation. Ask what the claim rules out."],
      fair: "A lot of New Age practice comes from sincere searching. Start with their questions, not their labels." },

    { id: "pluralism", name: "Pluralism (“all paths lead to God”)", gate: 5, ax: [8, 16, 17, 20],
      intro: "You believe all religions lead to the same God. That sounds generous, and it's worth testing against what they actually say.",
      steps: [
        { t: "What “all paths” claims", ax: [8], q: ["All religions teach"], ask: "Do I think the religions that claim to be the only way are mistaken?",
          x: "“All paths lead to God” is a claim about every religion at once, and it's an exclusive one: it says anyone who thinks their path is the only one is wrong." },
        { t: "Where the paths collide", ax: [16, 17], q: ["Muslims honor Jesus", "Buddhism needs no God"], ask: "Which of these can I accept without rejecting another?",
          x: "Jesus says He is the only way (John 14:6). Islam says He wasn't crucified. Buddhism says there is no Creator. Hinduism says all is one. These aren't different views of one thing, they're contradictions." },
        { t: "The elephant problem", ax: [8], q: ["blind men and the elephant"], ask: "On what basis do I see more than they do?",
          x: "The “blind men and the elephant” parable only works if the storyteller can see the whole elephant. That's a claim to a view above every religion." },
        { t: "Respect vs. truth", ax: [20], q: ["only way is arrogant"], ask: "Would I want a doctor who said all diagnoses are equally valid?",
          x: "Respecting people doesn't require agreeing with every belief. Every worldview says some things are false. Confidence in the evidence isn't arrogance, and refusing to examine claims isn't humility." },
        { t: "Test it by evidence", ax: [17], q: ["hallucinated", "Which God"], ask: "What would I conclude if the resurrection really happened?",
          x: "Instead of asking which religion feels right, ask which makes claims we can check. The resurrection is a public, datable event with early witnesses (Axiom 17). Check it." }
      ],
      best: ["“They all teach love and kindness.”", "They share some morals and disagree about God, sin and how anyone is saved. Those are the questions that matter most."],
      fair: "You don't have to be dismissive of other religions to say they can't all be right." },

    { id: "buddhism", name: "Buddhism", gate: 1, ax: [1, 2, 9, 10, 20],
      intro: "You value compassion, mindfulness and freedom from suffering. Those are good aims. Here's where the framework presses.",
      steps: [
        { t: "No Creator", ax: [1], q: ["Buddhism needs no God"], ask: "What explains the existence of the whole chain of causes?",
          x: "Buddhism sets aside the question of a Creator. But the question of why anything exists (Axiom 1) doesn't go away by being set aside. Cause and effect can't explain why there is a chain at all." },
        { t: "An endless past", ax: [2], q: ["Space and time have always existed"], ask: "How does an endless past get to today?",
          x: "An infinite chain of rebirths and cycles faces the same problems as an eternal universe: an actual infinite can't be crossed, and every cycle adds entropy (Axiom 2)." },
        { t: "Karma with no judge", ax: [9, 10], q: ["Reincarnation explains"], ask: "Who or what makes karma moral?",
          x: "If karma is impersonal cause and effect, it can't tell right from wrong, and no one is wronged or able to forgive. Moral law implies a lawgiver (Axioms 9 and 10)." },
        { t: "Desire to end desire", ax: [8], q: ["Suffering comes from desire"], ask: "Is the longing itself a clue?",
          x: "Wanting to end desire is itself a desire, while Christianity answers longing instead of erasing it (Psalm 16:11; John 6:35). Fair note: Buddhists have a reply on “no-self” and rebirth (a flowing stream), so the first-cause and no-judge points are the stronger ones." },
        { t: "Self-effort or grace?", ax: [20], q: ["only way is arrogant"], ask: "What if the problem is bigger than self-improvement can fix?",
          x: "The Eightfold Path is a ladder you climb. The gospel is a gift you receive (Ephesians 2:8–9): God came down because the debt couldn't be paid from below." }
      ],
      best: ["“Karma is just cause and effect.”", "Then it isn't moral: cause and effect can't tell right from wrong. Ask what makes anything deserve a result."],
      fair: "Be kind: many Buddhists are sincere seekers, and their compassion is a real moral intuition." },

    { id: "catholicism", name: "Roman Catholicism", gate: 6, ax: [15, 17, 20],
      intro: "You hold the Trinity, the deity of Christ and the resurrection. The disagreement is about the gospel itself and about authority, and that's a conversation between people who love Jesus.",
      steps: [
        { t: "Where we agree", ax: [17], q: ["Catholic Church gave you the Bible"], ask: "When church teaching and Scripture seem to differ, which is my final authority?",
          x: "Gates 1 to 5 are shared: one Tri-Une Creator, Jesus raised from the dead, the great creeds. The question is Gate 6: is the gospel by grace alone through faith alone, and is Scripture the final authority?" },
        { t: "The gospel itself", ax: [20], q: ["faith plus works"], ask: "Does my church's teaching match what Paul preached?",
          x: "Paul says we're justified by faith apart from works (Romans 3:28; Ephesians 2:8–9) and that any other gospel is cursed (Galatians 1:8–9). Trent (Session 6, canon 9) anathematizes the teaching of faith alone. James 2 is about faith shown before others, and Abraham was credited righteous in Genesis 15 before the work in Genesis 22." },
        { t: "Peter and the pope", ax: [15], q: ["first pope", "Pope is infallible"], ask: "Where does Scripture say the office continues?",
          x: "Matthew 16 names Peter's confession as the rock, and nothing says it passes to successors. Paul corrected Peter (Galatians 2:11), James led the council in Acts 15, and Pope Honorius I was condemned by a council in AD 680, which complicates infallibility (defined in 1870)." },
        { t: "Mary, the saints and purgatory", ax: [20], q: ["pray to Mary", "Purgatory"], ask: "Is there a New Testament example of praying to Mary?",
          x: "There is one mediator (1 Timothy 2:5), Christ's sacrifice was once for all (Hebrews 10:10–14), and Mary called God her Savior (Luke 1:47). Honor Mary as blessed without building doctrines on silence." },
        { t: "Scripture and tradition", ax: [15], q: ["Sacred Tradition", "Mass re-presents"], ask: "Which traditions can be tested against Scripture?",
          x: "Jesus condemned traditions that cancel God's word (Mark 7:8), and the Bereans tested even an apostle against Scripture (Acts 17:11). The church recognized the canon, it didn't create it." }
      ],
      best: ["“The Catholic Church gave you the Bible.”", "The church recognized books God's people already used. Recognizing a book doesn't make you its authority, just as discovering a law of physics doesn't create it."],
      fair: "Catholics are not enemies. Disagree about the gospel and authority, and stay respectful." },

    { id: "christianity", name: "Biblical Christianity", gate: 6, ax: [12, 13, 15, 16, 17, 19, 20],
      intro: "You hold Biblical Trinitarian Christianity. The framework applies the same tests to you, and being honest about them is what makes your case hard to knock down.",
      steps: [
        { t: "Know your own labels", ax: [13, 14, 19], q: ["ontological argument", "Daniel was written"], ask: "Which of my arguments would I lead with, and which would I hold back?",
          x: "Not every axiom is a proof. Axiom 13 (Tri-Une love) is a best-fit argument, Axiom 14's ontological piece is supplementary, and Axiom 19 (prophecy) is cumulative and partly debated. Say so before an opponent does." },
        { t: "Evil and hell", ax: [12, 20], q: ["why is there so much evil", "Hell is unfair"], ask: "What would I say to someone who is hurting, before I say anything philosophical?",
          x: "The logical problem of evil is answered. The emotional and evidential problem is harder, and the honest reply is humility plus the Cross. On hell, Christians differ on its nature, so don't overclaim." },
        { t: "Contradictions and copyists", ax: [15], q: ["contradictory creation accounts", "400,000 variants"], ask: "Can I explain the difference between a difference and a contradiction?",
          x: "Most alleged contradictions are differences in detail, viewpoint or idiom. A few numbers are likely copyist slips, which affect no doctrine. Be upfront about Mark 16:9–20 and John 7:53–8:11." },
        { t: "Everything hinges on the resurrection", ax: [16, 17], q: ["hallucinated", "stole the body"], ask: "Could I lay out the evidence in three minutes without overclaiming?",
          x: "Paul says that if Christ isn't raised, our faith is futile (1 Corinthians 15:17). That's a test you invited. Know the minimal facts, and don't claim Ehrman concedes the empty tomb." },
        { t: "Which Christianity?", ax: [20], q: ["faith plus works", "45,000 denominations"], ask: "How do I disagree about the gospel and still love the person?",
          x: "Gate 6 asks whether the gospel is grace alone through faith alone, with Scripture as the final authority. Your answer shapes how you treat Catholic, Orthodox and other believers: firm on the gospel, kind to the person." }
      ],
      best: ["“Faith is believing without evidence.”", "Biblical faith is trust based on evidence (Acts 1:3; Luke 1:1–4). Say that, then offer the evidence."],
      fair: "The strongest apologists are the most honest about their weak spots. Overclaiming is how debates are lost." }
  ];

  if (Q.stressExtra) {
    var christianIdx = STRESS.length - 1;
    STRESS = STRESS.slice(0, christianIdx).concat(Q.stressExtra, STRESS.slice(christianIdx));
  }
  if (Q.stressBack) STRESS.forEach(function (w) {
    var list = Q.stressBack[w.id];
    if (list) w.steps.forEach(function (s, i) { if (!s.back && list[i]) s.back = list[i]; });
  });
  safe("stress", function () {
    var mount = $("#stress");
    if (!mount) return;
    var picks = $("#stressPicks"), out = $("#stressOut");
    var cur = null, step = 0;
    function strip(h) { var d = document.createElement("div"); d.innerHTML = h; return d.textContent; }
    function qaIndex(frag) {
      var f = norm(frag), list = Q.qa || [];
      for (var i = 0; i < list.length; i++) if (norm(strip(list[i].q)).indexOf(f) !== -1) return i;
      return -1;
    }
    function qaLinks(frags) {
      var seen = {}, h = "";
      frags.forEach(function (f) {
        var i = qaIndex(f);
        if (i < 0 || seen[i]) return;
        seen[i] = 1;
        h += '<li><a href="#q-' + (i + 1) + '" data-jump>' + strip(Q.qa[i].q) + "</a></li>";
      });
      return h;
    }
    function markAxioms(all, now) {
      $$(".axiom").forEach(function (c) {
        var n = parseInt(c.id.replace("axiom-", ""), 10);
        c.classList.toggle("stress-hl", all.indexOf(n) !== -1);
        c.classList.toggle("stress-now", now.indexOf(n) !== -1);
      });
    }
    function axChips(list, now) {
      return list.map(function (a) { return '<a class="axlink sx-axchip' + (now.indexOf(a) !== -1 ? " now" : "") + '" href="#axiom-' + a + '">Axiom ' + a + "</a>"; }).join("");
    }
    function summaryText() {
      var w = cur;
      var lines = ["Worldview stress-test: " + w.name, "Tested at Gate " + w.gate + " by Axioms " + w.ax.join(", ") + ".",
        "Tensions: " + w.steps.map(function (s) { return s.t; }).join(" > "), "Strongest reply: " + w.best[0].replace(/[“”]/g, "") + " -> " + w.best[1]];
      if (!rb) lines.push("Test yours: " + location.href.split("#")[0] + "#stress-" + w.id);
      lines.push("— QuantumTheology");
      return lines.join("\n");
    }
    function render() {
      var w = cur, n = w.steps.length, verdict = step >= n, s = verdict ? null : w.steps[step];
      var now = s ? s.ax : [];
      markAxioms(w.ax, now);
      var h = '<div class="sx-head"><h4>You picked: <span>' + w.name + '</span></h4><span class="tag gate-tag">Tested at Gate ' + w.gate + "</span></div>" +
        '<p class="sx-intro">' + w.intro + "</p>" +
        '<div class="sx-ax"><span class="mini-label">Axioms that test it (tap to read)</span><div class="sx-axrow">' + axChips(w.ax, now) + "</div></div>" +
        '<div class="sx-dots" role="group" aria-label="Walkthrough progress">' + w.steps.map(function (st, i) {
          return '<button type="button" class="sx-dot' + (i === step ? " on" : i < step ? " done" : "") + '" data-step="' + i + '" aria-label="Step ' + (i + 1) + ": " + st.t.replace(/"/g, "") + '"' + (i === step ? ' aria-current="step"' : "") + ">" + (i + 1) + "</button>";
        }).join("") + '<button type="button" class="sx-dot sx-dot-v' + (verdict ? " on" : "") + '" data-step="' + n + '" aria-label="Verdict">✓</button></div>';
      if (!verdict) {
        h += '<div class="sx-step"><span class="label">Step ' + (step + 1) + " of " + n + '</span><h4>' + s.t + '</h4><p class="sx-text" data-link>' + s.x + '</p>' +
          '<p class="sx-ask"><strong>Ask yourself:</strong> ' + s.ask + "</p>" +
          (s.back && Q.backHtml ? '<div class="sx-back"><span class="mini-label">If they push back</span>' + Q.backHtml(s.back) + "</div>" : "") +
          (s.q && qaLinks(s.q) ? '<div class="sx-read"><span class="mini-label">Read the rebuttals</span><ul class="sx-qa">' + qaLinks(s.q) + "</ul></div>" : "") + "</div>" +
          '<div class="sx-nav"><button type="button" class="fc-btn" data-nav="-1"' + (step === 0 ? " disabled" : "") + '>← Back</button><button type="button" class="fc-btn fc-flip" data-nav="1">' + (step === n - 1 ? "See the verdict" : "Next step →") + "</button></div>";
      } else {
        var all = [];
        w.steps.forEach(function (st) { (st.q || []).forEach(function (f) { all.push(f); }); });
        h += '<div class="sx-step sx-verdict"><span class="label">Verdict</span><h4>You haven\'t been told what to believe. You\'ve seen where the weight sits.</h4>' +
          '<p class="sx-text">Pick the one tension that bothers you most. If you reject its premise, ask what that costs you. That is the whole method: <strong>name the premise you deny and what denying it costs.</strong></p>' +
          '<p class="reply" data-link><strong>The reply you\'ll probably reach for:</strong> ' + w.best[0] + '<br><strong>The answer:</strong> ' + w.best[1] + "</p>" +
          '<p class="sx-fair">' + w.fair + "</p>" +
          '<div class="sx-read"><span class="mini-label">Every rebuttal for this worldview</span><ul class="sx-qa">' + qaLinks(all) + "</ul></div>" +
          '<div class="sx-actions"><button type="button" class="fc-btn fc-flip" id="sxCopy">Copy my stress-test</button><button type="button" class="fc-btn" id="sxLink">Copy link</button><button type="button" class="fc-btn" id="sxReset">Test another worldview</button></div></div>' +
          '<div class="sx-nav"><button type="button" class="fc-btn" data-nav="-1">← Back to the steps</button></div>';
      }
      out.innerHTML = h;
      out.hidden = false;
      linkifyIn(out);
    }
    function open(id, scroll) {
      var w = STRESS.filter(function (x) { return x.id === id; })[0];
      if (!w) return;
      cur = w; step = 0;
      mount.classList.add("bloomed");
      $$(".sx-pick", picks).forEach(function (b) { b.setAttribute("aria-pressed", String(b.getAttribute("data-sx") === id)); });
      render();
      try { history.replaceState(null, "", "#stress-" + id); } catch (e) { /* ignore */ }
      scrollToEl(scroll ? mount : out, scroll);
      if (Q.award) Q.award(1, "stress");
    }
    function reset() {
      cur = null; step = 0; out.hidden = true; out.innerHTML = "";
      $$(".sx-pick", picks).forEach(function (b) { b.setAttribute("aria-pressed", "false"); });
      markAxioms([], []);
      try { history.replaceState(null, "", location.pathname + location.search + "#stress"); } catch (e) { /* ignore */ }
      mount.scrollIntoView({ behavior: scrollMode, block: "start" });
    }
    picks.innerHTML = STRESS.map(function (w) { return '<button type="button" class="sx-pick" data-sx="' + w.id + '" aria-pressed="false">' + w.name + "</button>"; }).join("");
    picks.addEventListener("click", function (e) { var b = e.target.closest("[data-sx]"); if (b) open(b.getAttribute("data-sx"), false); });
    out.addEventListener("click", function (e) {
      var t = e.target;
      var nav = t.closest("[data-nav]");
      if (nav && cur) {
        step = Math.max(0, Math.min(cur.steps.length, step + parseInt(nav.getAttribute("data-nav"), 10)));
        render();
        out.scrollIntoView({ behavior: scrollMode, block: "start" });
        return;
      }
      var dot = t.closest("[data-step]");
      if (dot && cur) { step = parseInt(dot.getAttribute("data-step"), 10); render(); return; }
      if (t.closest("#sxCopy")) {
        var b1 = t.closest("#sxCopy");
        copyToClipboard(summaryText()).then(function (ok) { flashButton(b1, ok, "Copied!", "Copy my stress-test"); if (Q.toast) Q.toast(ok ? "Copied! Your stress-test summary is on your clipboard." : "Couldn't copy."); });
      } else if (t.closest("#sxLink")) {
        var b2 = t.closest("#sxLink");
        copyToClipboard(location.href.split("#")[0] + "#stress-" + cur.id).then(function (ok) { flashButton(b2, ok, "Copied!", "Copy link"); if (Q.toast) Q.toast(ok ? "Link copied! Anyone who opens it lands on this stress-test." : "Couldn't copy the link."); });
      } else if (t.closest("#sxReset")) { reset(); }
    });
    Q.openStress = open;
  });

  /* ---------- Hot debate chips: open the Finder pre-filled with the topic ---------- */
  safe("hot debates", function () {
    var track = $(".hot-track");
    if (!track) return;
    track.addEventListener("click", function (e) {
      var b = e.target.closest("[data-hot]");
      if (!b) return;
      var topic = b.getAttribute("data-hot");
      openFinder();
      var input = document.getElementById("finderInput");
      input.value = topic;
      renderFinder();
      input.focus();
      Array.prototype.forEach.call(track.querySelectorAll(".hot-pill"), function (p) { p.classList.toggle("flash-on", p === b); });
    });
  });

  /* ---------- 22. Axiom popovers: one reused node, no scroll or hash change ---------- */
  var axPop = null, axAnchor = null;
  function closeAxPop(restore) {
    if (!axPop || axPop.hidden) return;
    axPop.hidden = true;
    if (axAnchor) {
      axAnchor.setAttribute("aria-expanded", "false");
      if (restore && axAnchor.isConnected && axAnchor.focus) axAnchor.focus({ preventScroll: true });
    }
    axAnchor = null;
  }
  function placeAxPop(a) {
    if (!a || !a.isConnected) { closeAxPop(false); return; }
    var vw = document.documentElement.clientWidth, vh = window.innerHeight;
    var docked = vw <= 640;
    axPop.classList.toggle("docked", docked);
    if (docked) { axPop.style.left = ""; axPop.style.top = ""; return; }
    var r = a.getBoundingClientRect(), w = axPop.offsetWidth, h = axPop.offsetHeight;
    var left = Math.min(Math.max(12, r.left + r.width / 2 - w / 2), vw - w - 12);
    var below = vh - r.bottom, above = below < h + 18 && r.top > below;
    var top = above ? r.top - h - 12 : r.bottom + 12;
    axPop.classList.toggle("above", above);
    axPop.style.setProperty("--arrow", Math.round(Math.min(Math.max(r.left + r.width / 2 - left, 18), w - 18)) + "px");
    axPop.style.left = Math.round(left + window.pageXOffset) + "px";
    axPop.style.top = Math.round(top + window.pageYOffset) + "px";
  }
  function buildAxPop() {
    axPop = el("div", "axpop");
    axPop.id = "axPop";
    axPop.hidden = true;
    axPop.setAttribute("role", "dialog");
    axPop.setAttribute("tabindex", "-1");
    document.body.appendChild(axPop);
    axPop.addEventListener("click", function (e) {
      if (e.target.closest("[data-axclose]")) { closeAxPop(true); return; }
      var cp = e.target.closest("[data-axcopy]");
      if (cp) {
        var card = document.getElementById("axiom-" + cp.getAttribute("data-axcopy"));
        if (card) copyToClipboard(rebuttalText(card)).then(function (ok) { flashButton(cp, ok, "Copied!", "Copy"); if (Q.toast && ok) Q.toast("Copied! Axiom summary and link are on your clipboard."); });
      }
    });
    document.addEventListener("pointerdown", function (e) {
      if (axPop.hidden || axPop.contains(e.target)) return;
      if (e.target.closest && e.target.closest('a[href^="#axiom-"]')) return;
      closeAxPop(false);
    }, true);
    var rq = 0;
    window.addEventListener("resize", function () {
      if (axPop.hidden) return;
      cancelAnimationFrame(rq);
      rq = requestAnimationFrame(function () { placeAxPop(axAnchor); });
    });
  }
  function openAxPop(a) {
    var n = parseInt((a.getAttribute("href") || "").replace("#axiom-", ""), 10);
    var ax = (Q.axioms || []).filter(function (x) { return x.n === n; })[0];
    if (!ax) { var fallback = document.getElementById("axiom-" + n); if (fallback) jumpTo(fallback); return; }
    if (!axPop) buildAxPop();
    if (axAnchor === a && !axPop.hidden) { closeAxPop(true); return; }
    if (axAnchor) axAnchor.setAttribute("aria-expanded", "false");
    axAnchor = a;
    a.setAttribute("aria-expanded", "true");
    a.setAttribute("aria-controls", "axPop");
    axPop.setAttribute("data-bucket", ax.b);
    axPop.setAttribute("aria-label", "Axiom " + n + " preview");
    axPop.innerHTML =
      '<div class="axpop-in">' +
      '<div class="axp-top"><span class="label">Axiom ' + n + " · " + ax.tag + '</span><button class="icon-btn axp-x" type="button" data-axclose aria-label="Close preview">✕</button></div>' +
      "<h4>" + ax.title + '</h4><span class="tag st">' + ax.st + "</span>" +
      '<p class="axp-claim">' + linkify(ax.claim) + "</p>" +
      '<div class="axp-sec"><span class="axp-mini">Evidence</span><ol>' + ax.prem.map(function (p) { return "<li>" + linkify(p) + "</li>"; }).join("") + "</ol></div>" +
      '<div class="receipts"><strong>Receipts:</strong> ' + linkify(ax.receipts) + "</div>" +
      (Q.admitsFor && Q.admitsFor(n).length ? '<div class="axp-sec axp-admits"><span class="axp-mini">Even the other side admits</span>' + Q.admitsFor(n).map(function (c) {
        return "<p>" + (c.q ? "“" + c.text + "”" : c.text) + " <b>— " + c.who + "</b>, <i>" + c.role + "</i></p>";
      }).join("") + "</div>" : "") +
      '<div class="axp-actions"><a class="copy-btn" href="#axiom-' + n + '" data-ax-open>Open full axiom →</a><button class="copy-btn" type="button" data-axcopy="' + n + '">Copy</button></div>' +
      "</div>";
    axPop.hidden = false;
    axPop.querySelector(".axpop-in").scrollTop = 0;
    placeAxPop(a);
    axPop.focus({ preventScroll: true });
  }

  /* ---------- 23. Debate Arena: two modes, one state object, one render, one delegated listener ---------- */
  safe("debate arena", function () {
    var root = $("#daRoot"), live = $("#daLive");
    if (!root || !Q.qa || !Q.qa.length) return;
    var ROUND = 12, TIME = 25, HEARTS = 3;
    var RANKS = [[0, "Novice"], [500, "Contender"], [1200, "Defender"], [2200, "Apologist"], [3400, "Elite Apologist"], [4800, "S-GUOT Master"]];
    var WEAK = [
      ["You just have to have faith. Some things can't be argued.", "That concedes the argument. Biblical faith is trust based on evidence (Acts 1:3; Luke 1:1–4), not a way out of a question."],
      ["The Bible says so, end of discussion.", "Circular for someone who doesn't accept the Bible yet. Give a reason they can check."],
      ["You only say that because you hate God.", "Ad Hominem. Guessing their motives answers nothing."],
      ["Well, you can't prove God doesn't exist.", "Burden-Shifting and an Argument from Ignorance. Give positive evidence instead."],
      ["Scientists have been wrong before, so I don't trust them.", "Hasty Generalization. It throws out good evidence along with bad."],
      ["Most people in the world believe in God, so you're outnumbered.", "Appeal to Popularity. Truth isn't decided by a vote."],
      ["That's honestly a stupid question.", "Appeal to Ridicule. Mocking a question is how you lose the audience."],
      ["Atheists can't be moral, so why should I listen to you?", "False and Ad Hominem. The argument is about what grounds morality, not who behaves well."]
    ];
    var WV = {
      atheist: { name: "Atheist", stress: "atheism", qs: [
        { ax: 1, q: "Why is there a universe at all, rather than nothing?", o: [
          { t: "It's a brute fact. It just exists, no reason needed.", d: 0, n: "Consistent with materialism. The price: you've accepted “no reason” for the biggest question there is, so demanding reasons elsewhere becomes Special Pleading (Axiom 1)." },
          { t: "Science will explain it eventually.", d: 10, n: "That's a promissory note, not an explanation. Science studies things inside the universe, and a beginning of all matter, space and time needs a cause outside them (Axioms 1 and 2)." },
          { t: "Everything that exists has an explanation, including the universe.", d: 30, n: "That's the Principle of Sufficient Reason. Applied to the whole universe, it points to a necessary ground beyond matter (Axiom 1). You've adopted the contingency argument's key premise." }] },
        { ax: 9, q: "Is torturing a child for fun objectively wrong, even if every human approved of it?", o: [
          { t: "Yes, it's objectively wrong no matter what anyone thinks.", d: 25, n: "Most people agree, and that's the problem for materialism: you've affirmed a moral fact that binds everyone regardless of opinion. What physical thing is that fact made of? (Axiom 9)" },
          { t: "It's wrong because humans evolved to avoid causing suffering.", d: 15, n: "Evolution can explain why we feel it's wrong, not why it is wrong. Going from how we evolved to how we ought to act is the Is–Ought gap." },
          { t: "No. Morality is strongly felt human preference.", d: 0, n: "Consistent. The price: “evil” now means “what we strongly dislike,” so calling God or anything else evil becomes a Stolen Concept." }] },
        { ax: 7, q: "Unguided evolution built your brain for survival. Do you trust it to find the truth about questions like this one?", o: [
          { t: "Yes, completely.", d: 20, n: "Selection rewards survival behavior, not true beliefs. On naturalism plus unguided evolution, why the high confidence? (Axiom 7, Plantinga's argument, which is serious but contested.)" },
          { t: "Yes, because true beliefs help you survive.", d: 10, n: "A real reply. The pushback: a false belief paired with the right behavior survives just as well, so truth isn't what selection checks. Philosophers still debate this." },
          { t: "Not fully. My reasoning might be unreliable.", d: 15, n: "Consistent, but it cuts both ways: you've also lowered your confidence in the reasoning that led you to atheism." }] },
        { ax: 6, q: "Is your conscious experience (what it's like to see red or feel pain) nothing but neurons firing?", o: [
          { t: "Yes, experience is identical to brain activity.", d: 5, n: "Consistent. The price: nobody has shown how physical facts produce what-it's-like, the Hard Problem (Axiom 6). Correlation isn't identity." },
          { t: "Consciousness is an illusion.", d: 25, n: "An illusion needs someone to experience it. If the experience is an illusion, who's being fooled? That's Self-Refutation." },
          { t: "It's something more than physical.", d: 35, n: "That's a step out of materialism. If mind is more than matter, Gate 1 is already open (Axiom 6)." }] },
        { ax: 8, q: "Were the laws of logic (nothing can be true and false at once) true before any humans existed?", o: [
          { t: "Yes, they're true everywhere and always.", d: 20, n: "Then something immaterial, universal and necessary exists that isn't matter. What grounds it? (Axiom 8)" },
          { t: "No, logic is a human convention.", d: 25, n: "Then non-contradiction could have been otherwise, and you can't even say that without using it. Self-Refutation." },
          { t: "They just describe how matter behaves.", d: 10, n: "Closer, but a description of our universe doesn't explain why logic holds in every possible world, or why it binds your reasoning." }] }
      ] },
      agnostic: { name: "Agnostic", stress: "agnosticism", qs: [
        { ax: 1, q: "Can anyone know whether God exists?", o: [
          { t: "No one can ever know.", d: 20, n: "That's a strong claim to know the limits of all human knowledge, which is more than an agnostic usually claims. It undercuts itself." },
          { t: "I don't know, and I haven't looked closely.", d: 0, n: "Honest and consistent. The obvious next step is to look." },
          { t: "Probably not, but I'm open.", d: 5, n: "Fair. Being open means the evidence gets a real hearing. Start with Axioms 1 and 2." }] },
        { ax: 2, q: "Did the universe have a beginning?", o: [
          { t: "Probably. That's where the evidence points.", d: 10, n: "Then something caused space, time and matter, which is already more than “no evidence either way” (Axiom 2)." },
          { t: "I don't know.", d: 0, n: "Consistent. Worth knowing: the BGV theorem, thermodynamics and the problem of an infinite past all point the same way." },
          { t: "No, it's eternal.", d: 10, n: "That's taking a side, and it runs into the entropy and BGV problems. Not very agnostic." }] },
        { ax: 9, q: "Is torturing a child for fun objectively wrong?", o: [
          { t: "Yes, objectively.", d: 15, n: "Then you hold at least one objective moral fact, and what grounds it is exactly the God question. “I don't know about God” becomes “I don't know what grounds my strongest belief” (Axiom 9)." },
          { t: "I'm not sure.", d: 20, n: "Almost everyone finds this one obvious. Doubting it to stay neutral is a high price." },
          { t: "No, it's a matter of preference.", d: 5, n: "Consistent with neutrality about God, but you're now leaning materialist, not neutral." }] },
        { ax: 17, q: "Most historians agree Jesus was crucified and his followers sincerely believed they saw him alive. Have you weighed an explanation?", o: [
          { t: "Yes, and a natural explanation convinces me.", d: 5, n: "Fair. Which one? Test it against the Q&A answers on hallucination, theft and legend." },
          { t: "No, it doesn't matter to me.", d: 20, n: "If it happened, it's the most important event in history. Saying it doesn't matter isn't neutral, it's a decision." },
          { t: "Yes, and I can't explain it naturally.", d: 15, n: "Then your own judgment is putting pressure on agnosticism. Follow it (Axiom 17)." }] },
        { ax: 1, q: "Day to day, do you live as if God exists or as if He doesn't?", o: [
          { t: "As if He doesn't.", d: 15, n: "Then you're a practical atheist: neutral in theory, decided in practice." },
          { t: "As if He might.", d: 0, n: "Consistent. That's a seeker's posture, and a good one." },
          { t: "I don't think about it.", d: 10, n: "Not thinking about it is also a choice, with the highest stakes there are." }] }
      ] },
      muslim: { name: "Muslim", stress: "islam", qs: [
        { ax: 15, q: "The Qur'an says God revealed the Gospel and tells Christians to judge by it (5:47). Is the New Testament Christians have today reliable?", o: [
          { t: "Yes.", d: 25, n: "Then its account of Jesus' death and resurrection stands, and that contradicts Qur'an 4:157 (Axiom 15)." },
          { t: "No, it was corrupted.", d: 20, n: "Before or after Muhammad? Our manuscripts are centuries older than him, and Qur'an 6:115 says no one can change God's words." },
          { t: "The true Injil was lost.", d: 15, n: "Then 5:47 told Christians to judge by a book they didn't have. No copy of a different Injil has ever been found." }] },
        { ax: 17, q: "Was Jesus crucified?", o: [
          { t: "I trust the Qur'an over the historians.", d: 10, n: "Consistent with Islam. The price: you're preferring a source written six centuries later over every earlier source (Axiom 17)." },
          { t: "No, someone else was made to look like him.", d: 20, n: "Then the eyewitnesses, his mother included, were deceived, and Christianity began from a mistake God allowed. Paul's creed, Tacitus and Josephus all say he died." },
          { t: "It only appeared that way to people.", d: 25, n: "That idea also shows up in second-century docetism. It means God let the earliest witnesses believe something false." }] },
        { ax: 13, q: "Was God loving in His very nature before He created anything?", o: [
          { t: "Yes, love is eternal in God.", d: 15, n: "Love is other-directed. Who did a single-person God love before creation? (Axiom 13. Fair note: Muslims reply that love is an eternal attribute, so this is support, not a knockout.)" },
          { t: "God's love was expressed once creatures existed.", d: 5, n: "Consistent. The price: love becomes a potential in God, not who He is." },
          { t: "God loves Himself.", d: 10, n: "Then His love is self-directed, which is different from the self-giving love Islam also honors." }] },
        { ax: 20, q: "Can you know for sure you'll be forgiven on Judgment Day?", o: [
          { t: "Yes, I'm sure.", d: 15, n: "On what basis? Qur'an 46:9 has Muhammad saying he doesn't know what will be done with him." },
          { t: "No, it depends on my deeds and God's will.", d: 0, n: "Consistent with Islam. The price: no assurance. The gospel offers it because Christ's work is finished (Romans 8:1; John 19:30)." },
          { t: "God is merciful, so probably.", d: 5, n: "A hope, not an assurance. The real question is what satisfies justice, and that's where the Cross comes in (Axiom 20)." }] },
        { ax: 14, q: "The Qur'an rejects a Trinity of God, Jesus and Mary (5:116). Is that what Christians believe?", o: [
          { t: "Yes.", d: 20, n: "No Christian teaches that Mary is part of the Trinity. The Qur'an argues against a view Christians don't hold (Axiom 14)." },
          { t: "No, but the real Trinity is wrong too.", d: 5, n: "Consistent, and fair. Now the debate is about the real doctrine: one God in three persons." },
          { t: "I'm not sure what Christians believe.", d: 10, n: "Worth finding out before rejecting it: one essence, three persons, never three gods." }] }
      ] },
      pantheist: { name: "Pantheist / New Age", stress: "pantheism", qs: [
        { ax: 11, q: "Is the universe God?", o: [
          { t: "Yes, all is God.", d: 20, n: "The universe began and is running down. Is God beginning and decaying too? (Axioms 2 and 11)" },
          { t: "God is the universe's deeper consciousness.", d: 10, n: "Then God is a mind distinct from matter, which is a step toward theism." },
          { t: "The universe is in God, but God is more.", d: 5, n: "Consistent (that's panentheism). Next question: is that “more” personal?" }] },
        { ax: 8, q: "Are you God?", o: [
          { t: "Yes, we all are.", d: 25, n: "Then why did you have to learn it? An all-knowing God can't be ignorant or need enlightenment." },
          { t: "I'm a part of God.", d: 10, n: "Then God has parts that are confused, suffering and dying. Is that ultimate reality?" },
          { t: "No, but I'm connected to something bigger.", d: 0, n: "Consistent. The key question is what that something is, and whether it's good." }] },
        { ax: 10, q: "Is karma fair, even though nobody remembers their past lives?", o: [
          { t: "Yes, karma is perfect justice.", d: 20, n: "Justice needs a judge who knows intentions. Punishment for what you can't remember can't correct or teach (Axiom 10)." },
          { t: "Karma is just cause and effect, not moral.", d: 5, n: "Consistent. The price: then it can't make anything right or wrong (Axiom 9)." },
          { t: "I don't believe in karma.", d: 0, n: "Consistent. Then what handles justice in your view?" }] },
        { ax: 8, q: "Is everything ultimately one, with all distinctions an illusion?", o: [
          { t: "Yes, distinction is illusion.", d: 20, n: "Then who is deceived? (Ramanuja's question.) And the difference between truth and illusion is itself a distinction (Axiom 8)." },
          { t: "Distinctions are real, but everything is connected.", d: 0, n: "Consistent, and Christians agree everything is connected, through its Creator." },
          { t: "It's beyond logic.", d: 25, n: "“Beyond logic” is a logical claim, and you used logic to say it. Self-Refutation." }] },
        { ax: 11, q: "When you manifest, pray or set intentions, does the universe hear you?", o: [
          { t: "Yes, it hears me.", d: 15, n: "Then it's a mind, a person. You need to know who it is and whether it's good (1 John 4:1)." },
          { t: "No, it's energy, not a person.", d: 10, n: "Then nothing is there to connect with. Connection needs someone on the other end." },
          { t: "Thoughts shape reality by attraction.", d: 20, n: "No controlled evidence supports it, and it implies sick people caused their own illness." }] }
      ] },
      pluralist: { name: "Pluralist", stress: "pluralism", qs: [
        { ax: 8, q: "Are all religions true?", o: [
          { t: "Yes, all paths lead to God.", d: 25, n: "They contradict each other: Jesus crucified or not, a Creator or none. Contradictions can't all be true (Axiom 8)." },
          { t: "They're all partly true.", d: 10, n: "Fair, but which parts, and by what standard? You need a test that sits above all of them." },
          { t: "None is fully true. They're human attempts.", d: 5, n: "Consistent, but that's a specific worldview making its own exclusive claim." }] },
        { ax: 8, q: "Are religions that claim to be the only way wrong?", o: [
          { t: "Yes, exclusive claims are wrong.", d: 20, n: "That's exclusive too: it says your view about religion is right and theirs is wrong." },
          { t: "They're right for the people who believe them.", d: 15, n: "That's relativism. A religion is a claim about reality, not a favorite ice cream flavor." },
          { t: "Maybe one of them is right.", d: 0, n: "Consistent with openness, though now you're a seeker more than a pluralist. Good place to be." }] },
        { ax: 17, q: "Was Jesus crucified?", o: [
          { t: "Yes.", d: 10, n: "Then Islam is wrong on that point (Qur'an 4:157), and not every path is right." },
          { t: "No.", d: 15, n: "Then Christianity, and nearly every historian, is wrong (Axiom 17)." },
          { t: "It doesn't matter.", d: 15, n: "It's the center of the world's largest religion and denied by the second-largest. It matters to them." }] },
        { ax: 8, q: "Does the parable of the blind men and the elephant show each religion sees part of the truth?", o: [
          { t: "Yes.", d: 15, n: "The story only works if the narrator sees the whole elephant. That's a claim to a view above every religion." },
          { t: "No, the parable assumes too much.", d: 0, n: "Consistent. Then the real work is comparing claims against evidence." },
          { t: "It shows no one can know.", d: 15, n: "Then the narrator can't know either, including that it's an elephant." }] },
        { ax: 20, q: "Is it arrogant to believe your religion is true and others are false?", o: [
          { t: "Yes.", d: 15, n: "You believe your view about religion is true and theirs is false. By that standard you're arrogant too." },
          { t: "Not if there's evidence.", d: 0, n: "Exactly. Then weigh the evidence (Axioms 15–17)." },
          { t: "It's unkind.", d: 10, n: "Truth and kindness aren't opposites. Disagreeing with someone isn't hating them." }] }
      ] }
    };
    var WV_ORDER = ["atheist", "agnostic", "muslim", "pantheist", "pluralist"];
    if (Q.wvExtra) Object.keys(Q.wvExtra).forEach(function (k) { if (!WV[k]) { WV[k] = Q.wvExtra[k]; WV_ORDER.push(k); } });

    var S = { phase: "lobby", cat: "all", mode: null };
    var tick = null, paused = false, inView = true;
    var tplEl = document.createElement("template");
    function strip(h) { tplEl.innerHTML = String(h); return tplEl.content.textContent.replace(/\s+/g, " ").trim(); }
    function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
    function fmt(n) { return Number(n).toLocaleString("en-US"); }
    function say(msg) { if (live) live.textContent = msg; }
    function mult(s) { return s >= 8 ? 3 : s >= 5 ? 2 : s >= 3 ? 1.5 : 1; }
    function rankFor(score) {
      var i = 0;
      for (var k = 0; k < RANKS.length; k++) if (score >= RANKS[k][0]) i = k;
      return { i: i, name: RANKS[i][1], next: RANKS[i + 1] ? RANKS[i + 1][0] : null, nextName: RANKS[i + 1] ? RANKS[i + 1][1] : null };
    }
    function tierFor(v) {
      if (v >= 85) return { name: "Holding together", c: "ok", acc: "#6ee7b7", d: "Your answers hang together. The real conversation is the price you paid to stay consistent, listed below." };
      if (v >= 60) return { name: "Under strain", c: "meh", acc: "#67e8f9", d: "Mostly consistent, with a few answers that borrow something your worldview has trouble supplying." };
      if (v >= 35) return { name: "Cracking", c: "meh", acc: "#fbbf77", d: "Several answers pull against each other. Pick the tension that bothers you most and follow it." };
      return { name: "Collapsing", c: "no", acc: "#fb7185", d: "Most answers relied on something your worldview can't ground. That's worth sitting with." };
    }
    function catName(c) { return (Q.catName && Q.catName[c]) || ""; }

    /* ----- timer: exactly one interval, cleared on every transition, paused off-screen or hidden ----- */
    function stopTimer() { if (tick) { clearInterval(tick); tick = null; } }
    function timed() { return S.phase === "d-rebut" || S.phase === "d-fallacy"; }
    function runTimer() {
      stopTimer();
      if (!timed()) return;
      if (document.hidden || !inView) { paused = true; paintTimer(); return; }
      paused = false;
      var end = Date.now() + S.left * 1000;
      tick = setInterval(function () {
        S.left = Math.max(0, (end - Date.now()) / 1000);
        paintTimer();
        if (S.left <= 0) { stopTimer(); onTimeout(); }
      }, 100);
    }
    function paintTimer() {
      var bar = root.querySelector(".da-timer");
      if (bar) { bar.firstChild.style.width = (S.left / TIME * 100) + "%"; bar.classList.toggle("low", S.left <= 6); }
      var n = root.querySelector(".da-time");
      if (n) n.textContent = paused ? "Paused" : Math.ceil(S.left) + "s";
    }
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) { if (tick) { stopTimer(); paused = true; paintTimer(); } }
      else if (paused && timed()) runTimer();
    });
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (en) {
        inView = en[0].isIntersecting;
        if (!inView && tick) { stopTimer(); paused = true; paintTimer(); }
        else if (inView && paused && timed() && !document.hidden) runTimer();
      }, { threshold: 0.15 }).observe(root);
    }

    /* ----- Defend the Faith: build choices once per question ----- */
    function atoms(s) {
      return norm(s).split(/&|,|\(|\)|\/|\band\b/).map(function (a) { return a.replace(/[^a-z]/g, ""); }).filter(function (a) { return a.length >= 5; });
    }
    function clash(a, b) {
      var A = atoms(a), B = atoms(b);
      for (var i = 0; i < A.length; i++) for (var j = 0; j < B.length; j++) {
        if (A[i].indexOf(B[j]) !== -1 || B[j].indexOf(A[i]) !== -1 || A[i].slice(0, 7) === B[j].slice(0, 7)) return true;
      }
      return false;
    }
    function fallacyPool() {
      if (Q.fallacyPool && Q.fallacyPool.length) return Q.fallacyPool;
      var seen = {}, out = [];
      Q.qa.forEach(function (x) { var f = strip(x.f); if (!seen[f]) { seen[f] = 1; out.push(f); } });
      return out;
    }
    function defOf(name) {
      var defs = Q.fallacyDefs || {};
      if (defs[name]) return defs[name];
      for (var k in defs) if (Object.prototype.hasOwnProperty.call(defs, k) && clash(k, name)) return defs[k];
      for (var g = 0; g < gloss.length; g++) {
        if (gloss[g].group !== "Fallacies") continue;
        var terms = [gloss[g].term].concat(gloss[g].aliases);
        for (var t = 0; t < terms.length; t++) if (clash(terms[t], name)) return gloss[g].def;
      }
      return "";
    }
    function buildRebut(i) {
      var x = Q.qa[i], ans = strip(x.a);
      var idx = Q.qa.map(function (_, j) { return j; });
      var near = shuffle(idx.filter(function (j) { return j !== i && Q.qa[j].c === x.c && strip(Q.qa[j].a) !== ans; }));
      if (near.length < 2) near = near.concat(shuffle(idx.filter(function (j) { return j !== i && near.indexOf(j) === -1; })));
      var w = WEAK[Math.floor(Math.random() * WEAK.length)];
      var list = [{ t: ans, ok: true }].concat(near.slice(0, 2).map(function (j) {
        return { t: strip(Q.qa[j].a), ok: false, why: "A real answer, but to a different objection: " + strip(Q.qa[j].q) };
      }), [{ t: w[0], ok: false, why: w[1] }]);
      return shuffle(list);
    }
    function buildFal(i) {
      var f = strip(Q.qa[i].f), picks = [];
      shuffle(fallacyPool()).forEach(function (p) {
        if (picks.length < 3 && !clash(p, f) && picks.every(function (q) { return !clash(q, p); })) picks.push(p);
      });
      return shuffle([{ t: f, ok: true }].concat(picks.map(function (p) { return { t: p, ok: false }; })));
    }

    /* ----- transitions ----- */
    function go(phase) { stopTimer(); paused = false; S.phase = phase; render(); }
    function startDefend() {
      var pool = Q.qa.map(function (_, i) { return i; }).filter(function (i) { return S.cat === "all" || Q.qa[i].c === S.cat; });
      S.mode = "defend"; S.deck = shuffle(pool).slice(0, ROUND); S.n = 0; S.score = 0; S.streak = 0; S.best = 0;
      S.hearts = HEARTS; S.rOk = 0; S.fOk = 0; S.hist = []; S.rankI = 0; S.newBest = false;
      nextQ();
    }
    function nextQ() {
      if (S.n >= S.deck.length || S.hearts <= 0) return overDefend();
      var i = S.deck[S.n];
      S.q = { i: i, rebut: buildRebut(i), fal: buildFal(i), r: null, f: null, gain: 0, m: 1 };
      S.left = TIME;
      go("d-rebut");
      runTimer();
      say("Objection " + (S.n + 1) + ": " + strip(Q.qa[i].q));
    }
    function pickRebut(k) {
      if (S.phase !== "d-rebut" || !S.q.rebut[k]) return;
      S.q.r = k;
      var ok = S.q.rebut[k].ok;
      if (ok) S.rOk++; else { S.hearts--; S.streak = 0; }
      S.phase = "d-fallacy";
      render();
      say(ok ? "Strong rebuttal. Now name the fallacy." : "Not the strongest rebuttal. You lost a heart. Now name the fallacy.");
    }
    function pickFal(k) {
      if (S.phase !== "d-fallacy" || !S.q.fal[k]) return;
      stopTimer();
      S.q.f = k;
      finishQ();
    }
    function onTimeout() {
      if (S.phase === "d-rebut") { S.q.r = -1; S.q.f = -1; S.hearts--; S.streak = 0; finishQ(); }
      else if (S.phase === "d-fallacy") { S.q.f = -1; finishQ(); }
    }
    function finishQ() {
      var q = S.q, rOk = q.r >= 0 && q.rebut[q.r].ok, fOk = q.f >= 0 && q.fal[q.f].ok;
      if (fOk) S.fOk++;
      if (rOk && fOk) { S.streak++; S.best = Math.max(S.best, S.streak); } else S.streak = 0;
      var m = mult(S.streak), base = (rOk ? 100 : 0) + (fOk ? 50 : 0), bonus = rOk && fOk ? Math.round(S.left * 4) : 0;
      q.m = m; q.gain = Math.round((base + bonus) * m);
      S.score += q.gain;
      S.hist.push({ i: q.i, rOk: rOk, fOk: fOk });
      var r = rankFor(S.score);
      if (r.i > S.rankI) { S.rankI = r.i; if (Q.toast) Q.toast("Rank up: " + r.name + "!", "badge"); }
      go("d-feedback");
      say((rOk && fOk ? "Direct hit. " : "") + "Plus " + q.gain + " points. Score " + S.score + ".");
    }
    function overDefend() {
      var r = rankFor(S.score), best = Q.store.get("da_best", null);
      if (!best || S.score > best.score) { Q.store.set("da_best", { score: S.score, rank: r.name, streak: S.best }); S.newBest = !!S.score; }
      if (Q.award) Q.award(5 + Math.round(S.score / 150), "debate");
      go("d-over");
      say("Round over. Rank " + r.name + ", score " + S.score + ".");
    }
    function startWV(id) {
      if (!WV[id]) return;
      S.mode = "wv"; S.w = id; S.k = 0; S.meter = 100; S.prev = 100; S.log = [];
      nextW();
    }
    function nextW() {
      if (S.k >= WV[S.w].qs.length) return overWV();
      S.order = shuffle(WV[S.w].qs[S.k].o.map(function (_, i) { return i; }));
      go("w-q");
      say("Question " + (S.k + 1) + ": " + WV[S.w].qs[S.k].q);
    }
    function pickW(k) {
      if (S.phase !== "w-q" || S.order[k] === undefined) return;
      var item = WV[S.w].qs[S.k], o = item.o[S.order[k]];
      S.prev = S.meter;
      S.meter = Math.max(0, S.meter - o.d);
      S.log.push({ q: item.q, a: o.t, d: o.d, n: o.n, ax: item.ax });
      go("w-fb");
      say(o.d ? "Integrity down " + o.d + ". Now " + S.meter + " percent." : "Consistent. Integrity holds at " + S.meter + " percent.");
    }
    function overWV() {
      if (Q.award) Q.award(8, "worldview");
      go("w-over");
    }

    /* ----- views ----- */
    function hud() {
      var r = rankFor(S.score), h = "";
      for (var i = 0; i < HEARTS; i++) h += '<span class="' + (i < S.hearts ? "on" : "") + '">♥</span>';
      return '<div class="da-hud">' +
        '<div class="da-hearts" role="img" aria-label="' + S.hearts + ' of ' + HEARTS + ' hearts left">' + h + "</div>" +
        '<div class="da-stat"><b>' + fmt(S.score) + "</b><span>score</span></div>" +
        '<div class="da-stat"><b>' + S.streak + "</b><span>streak</span></div>" +
        '<div class="da-stat da-mult' + (mult(S.streak) > 1 ? " hot" : "") + '"><b>×' + mult(S.streak) + "</b><span>multiplier</span></div>" +
        '<div class="da-stat da-rank"><b>' + esc(r.name) + "</b><span>rank</span></div></div>";
    }
    function quitBtn() { return '<button type="button" class="da-quit" data-act="go" data-v="lobby" aria-label="Quit this round">Quit</button>'; }
    function skeptic(who, text) {
      return '<div class="da-skeptic"><span class="da-av" aria-hidden="true">?</span><div class="da-bubble"><span class="da-who">' + who + "</span><p>" + linkify(text, S.mode === "wv" && S.w === "muslim") + "</p></div></div>";
    }
    function optBtns(list, act, mark) {
      return '<div class="opts da-opts">' + list.map(function (o, k) {
        var cls = "opt da-opt" + (mark ? (o.ok ? " good" : mark === k ? " bad" : "") : "");
        return '<button type="button" class="' + cls + '" data-act="' + act + '" data-i="' + k + '"' + (mark !== undefined ? " disabled" : "") + '><span class="da-key">' + (k + 1) + "</span><span>" + esc(o.t) + "</span></button>";
      }).join("") + "</div>";
    }
    function scoreCard(o) {
      return '<div class="da-score" style="--acc:' + o.acc + '"><span class="da-score-k">' + o.kicker + '</span><div class="da-score-big">' + o.big + '</div><div class="da-score-sub">' + o.sub + "</div>" +
        '<div class="da-score-grid" data-cols="' + o.stats.length + '">' + o.stats.map(function (s) { return "<div><b>" + s[1] + "</b><span>" + s[0] + "</span></div>"; }).join("") + "</div>" +
        '<div class="da-score-brand">QUANTUMTHEOLOGY · S-GUOT DEBATE ARENA</div></div>';
    }
    function endActions() {
      return '<div class="da-actions"><button type="button" class="fc-btn fc-flip" data-act="copy" data-autofocus>Copy Score to Share</button><button type="button" class="fc-btn" data-act="img">Save image</button><button type="button" class="fc-btn" data-act="again">Play again</button><button type="button" class="fc-btn" data-act="go" data-v="lobby">Switch mode</button></div>';
    }
    function vLobby() {
      var best = Q.store.get("da_best", null);
      return '<div class="card da-panel bloomed"><div class="da-modes">' +
        '<button type="button" class="da-mode" data-act="go" data-v="d-setup"><span class="da-mode-k">Mode 1</span><strong>Defend the Faith</strong><span>A skeptic fires ' + ROUND + " rapid objections from the " + Q.qa.length + "-question bank. Pick the strongest rebuttal, name the fallacy, build a streak and climb the ranks.</span><em>Novice → Apologist → S-GUOT Master</em></button>" +
        '<button type="button" class="da-mode" data-act="go" data-v="w-pick"><span class="da-mode-k">Mode 2</span><strong>Test Your Worldview</strong><span>Pick one of ' + WV_ORDER.length + ' worldviews and answer 5 consistency questions drawn from the axioms. The Worldview Integrity Meter reacts to every answer.</span><em>For skeptics, seekers and the curious</em></button>' +
        "</div>" + (best ? '<p class="da-best">Your best: <strong>' + fmt(best.score) + "</strong> points · " + esc(best.rank) + " · best streak " + best.streak + "</p>" : "") + "</div>";
    }
    function vSetup() {
      var cats = (Q.qaCats || [["all", "All"]]).map(function (c) {
        return '<button type="button" class="chip" data-act="cat" data-v="' + c[0] + '" aria-pressed="' + (S.cat === c[0]) + '">' + c[1] + "</button>";
      }).join("");
      return '<div class="card da-panel bloomed"><span class="label">Defend the Faith</span><h3>Pick your battlefield</h3><div class="chips da-cats">' + cats + "</div>" +
        '<ul class="sub-list body da-rules"><li><strong>' + TIME + " seconds</strong> per objection for both picks. The timer pauses if you scroll away.</li>" +
        "<li>Strongest rebuttal <strong>+100</strong>. Right fallacy <strong>+50</strong>. Both right adds a time bonus and grows your streak.</li>" +
        "<li>Streak 3 = <strong>×1.5</strong>, 5 = <strong>×2</strong>, 8 = <strong>×3</strong>.</li>" +
        "<li>A weak rebuttal or running out of time costs a <strong>heart</strong>. Lose all 3 and the round ends.</li>" +
        "<li>On a keyboard, press <strong>1–4</strong> to answer.</li></ul>" +
        '<div class="da-actions"><button type="button" class="fc-btn fc-flip" data-act="start" data-autofocus>Start the round</button><button type="button" class="fc-btn" data-act="go" data-v="lobby">Back</button></div></div>';
    }
    function vDefendQ() {
      var x = Q.qa[S.q.i], h = '<div class="card da-panel bloomed">' + hud() +
        '<div class="da-timer' + (S.left <= 6 ? " low" : "") + '"><span style="width:' + (S.left / TIME * 100) + '%"></span></div>' +
        '<div class="da-meta"><span>Objection ' + (S.n + 1) + " of " + S.deck.length + " · " + catName(x.c) + '</span><span class="da-meta-r"><span class="da-time">' + (paused ? "Paused" : Math.ceil(S.left) + "s") + "</span>" + quitBtn() + "</span></div>" +
        skeptic("The Skeptic", x.q);
      if (S.phase === "d-rebut") {
        h += '<p class="da-step"><b>1</b> Pick the strongest rebuttal</p>' + optBtns(S.q.rebut, "rebut");
      } else {
        var ok = S.q.rebut[S.q.r].ok;
        h += '<p class="da-done ' + (ok ? "ok" : "no") + '">' + (ok ? "✓ Strong rebuttal" : "✕ Not the strongest rebuttal (−1 heart)") + "</p>" +
          '<p class="da-step"><b>2</b> Name the skeptic\'s fallacy</p>' + optBtns(S.q.fal, "fal");
      }
      return h + "</div>";
    }
    function vDefendFb() {
      var q = S.q, x = Q.qa[q.i], rOk = q.r >= 0 && q.rebut[q.r].ok, fOk = q.f >= 0 && q.fal[q.f].ok;
      var head = q.r === -1 ? "Time's up. The skeptic scored that one." : rOk && fOk ? "Direct hit!" : rOk ? "Good rebuttal. You missed the fallacy." : fOk ? "Right fallacy, weaker rebuttal." : "The skeptic scored that one.";
      var cls = rOk && fOk ? "ok" : rOk || fOk ? "meh" : "no";
      var fd = defOf(strip(x.f));
      var h = '<div class="card da-panel bloomed">' + hud() +
        '<div class="da-meta"><span>Objection ' + (S.n + 1) + " of " + S.deck.length + " · " + catName(x.c) + '</span><span class="da-meta-r">' + quitBtn() + "</span></div>" +
        skeptic("The Skeptic", x.q) +
        '<p class="verdict ' + cls + '">' + head + "</p>" +
        '<div class="evidence quick"><strong>Strongest rebuttal:</strong> ' + linkify(x.a) + "</div>";
      if (q.r >= 0 && !rOk) h += '<p class="da-why"><strong>Your pick:</strong> ' + esc(q.rebut[q.r].why) + "</p>";
      h += '<div class="fallacy"><strong>Fallacy:</strong> ' + x.f + (fd ? " · " + esc(fd) : "") + "</div>";
      if (q.f >= 0 && !fOk) { var wd = defOf(q.fal[q.f].t); h += '<p class="da-why"><strong>You picked ' + esc(q.fal[q.f].t) + ":</strong> " + esc(wd || "a different fallacy.") + "</p>"; }
      h += '<p class="da-gain">+' + fmt(q.gain) + " points" + (q.m > 1 ? " <span>(×" + q.m + " streak multiplier)</span>" : "") + "</p>" +
        '<div class="da-links"><a href="#q-' + (q.i + 1) + '" data-jump>Read the full rebuttal →</a>' + (x.x ? '<a class="axlink" href="#axiom-' + x.x + '">Axiom ' + x.x + "</a>" : "") + "</div>" +
        '<div class="da-actions"><button type="button" class="fc-btn fc-flip" data-act="next" data-autofocus>' +
        (S.hearts <= 0 ? "Out of hearts: see your score" : S.n + 1 >= S.deck.length ? "Finish the round" : "Next objection →") + "</button></div></div>";
      return h;
    }
    function vDefendOver() {
      var r = rankFor(S.score), total = S.hist.length;
      var missed = S.hist.filter(function (h) { return !h.rOk || !h.fOk; });
      return '<div class="card da-panel bloomed">' +
        scoreCard({ kicker: "Defend the Faith", big: esc(r.name), sub: fmt(S.score) + " points", acc: "#a78bfa",
          stats: [["Rebuttals", S.rOk + "/" + total], ["Fallacies", S.fOk + "/" + total], ["Best streak", S.best], ["Hearts left", Math.max(0, S.hearts)]] }) +
        (S.newBest ? '<p class="da-newbest">New personal best!</p>' : "") +
        '<p class="da-next">' + (r.next !== null ? fmt(r.next - S.score) + " more points to reach <strong>" + r.nextName + "</strong>." : "Top rank reached. Nothing left but to defend it.") + "</p>" +
        endActions() +
        (missed.length ? '<div class="sx-read"><span class="mini-label">Review what you missed</span><ul class="sx-qa">' + missed.map(function (m) {
          return '<li><a href="#q-' + (m.i + 1) + '" data-jump>' + strip(Q.qa[m.i].q) + "</a></li>";
        }).join("") + "</ul></div>" : '<p class="da-next">Perfect round. Every rebuttal and every fallacy.</p>') + "</div>";
    }
    function vWVPick() {
      return '<div class="card da-panel bloomed"><span class="label">Test Your Worldview</span><h3>What do you believe right now?</h3>' +
        '<p class="body">Five questions, each drawn from an axiom. There are no trick answers and no “right” answers. The meter only drops when an answer pulls against your own worldview.</p>' +
        '<div class="sx-picks">' + WV_ORDER.map(function (id) { return '<button type="button" class="sx-pick" data-act="wv" data-v="' + id + '">' + WV[id].name + "</button>"; }).join("") + "</div>" +
        '<p class="sx-fair">This measures internal consistency, not truth. Christianity should pass the same kind of test, and the Biblical Christianity walkthrough above runs it.</p>' +
        '<div class="da-actions"><button type="button" class="fc-btn" data-act="go" data-v="lobby">Back</button></div></div>';
    }
    function meter(v, from) {
      var t = tierFor(v);
      return '<div class="da-meter da-' + t.c + '" role="meter" aria-label="Worldview Integrity Meter" aria-valuemin="0" aria-valuemax="100" aria-valuenow="' + v + '">' +
        '<div class="da-meter-top"><span>Worldview Integrity</span><b>' + v + "%</b></div>" +
        '<div class="da-meter-bar"><span style="width:' + from + '%"></span></div><small>' + t.name + "</small></div>";
    }
    function vWVQ() {
      var w = WV[S.w], item = w.qs[S.k];
      var opts = S.order.map(function (oi) { return { t: item.o[oi].t }; });
      return '<div class="card da-panel bloomed">' + meter(S.meter, S.meter) +
        '<div class="da-meta"><span>Question ' + (S.k + 1) + " of " + w.qs.length + " · " + w.name + '</span><span class="da-meta-r"><a class="axlink" href="#axiom-' + item.ax + '">Axiom ' + item.ax + "</a>" + quitBtn() + "</span></div>" +
        skeptic("The Questioner", esc(item.q)) +
        '<p class="da-step"><b>?</b> Pick the answer closest to what you actually think</p>' + optBtns(opts, "wans") + "</div>";
    }
    function vWVFb() {
      var w = WV[S.w], last = S.log[S.log.length - 1];
      var cls = last.d === 0 ? "ok" : last.d < 15 ? "meh" : "no";
      return '<div class="card da-panel bloomed">' + meter(S.meter, S.prev) +
        '<div class="da-meta"><span>Question ' + (S.k + 1) + " of " + w.qs.length + " · " + w.name + '</span><span class="da-meta-r"><a class="axlink" href="#axiom-' + last.ax + '">Axiom ' + last.ax + "</a>" + quitBtn() + "</span></div>" +
        '<p class="da-yours"><strong>You said:</strong> ' + esc(last.a) + "</p>" +
        '<p class="verdict ' + cls + '">' + (last.d === 0 ? "Consistent. Integrity holds." : "Tension hit: −" + last.d + " integrity") + "</p>" +
        '<p class="da-note">' + linkify(esc(last.n)) + "</p>" +
        '<div class="da-actions"><button type="button" class="fc-btn fc-flip" data-act="next" data-autofocus>' + (S.k + 1 >= w.qs.length ? "See your result" : "Next question →") + "</button></div></div>";
    }
    function vWVOver() {
      var w = WV[S.w], t = tierFor(S.meter);
      var tens = S.log.filter(function (l) { return l.d >= 10; }), clean = S.log.filter(function (l) { return l.d === 0; }).length;
      var maxD = S.log.reduce(function (m, l) { return Math.max(m, l.d); }, 0);
      return '<div class="card da-panel bloomed">' + meter(S.meter, S.meter) +
        scoreCard({ kicker: "Test Your Worldview · " + w.name, big: S.meter + "%", sub: t.name, acc: t.acc,
          stats: [["Tensions hit", tens.length + "/" + S.log.length], ["Clean answers", clean + "/" + S.log.length], ["Biggest drop", maxD ? "−" + maxD : "0"]] }) +
        '<p class="da-next">' + t.d + "</p>" + endActions() +
        '<div class="sx-read"><span class="mini-label">Your answers</span><ol class="da-log">' + S.log.map(function (l) {
          return "<li><strong>" + esc(l.q) + "</strong><span>" + esc(l.a) + ' <em class="' + (l.d ? "no" : "ok") + '">' + (l.d ? "−" + l.d : "consistent") + "</em></span><small>" + linkify(esc(l.n)) + "</small></li>";
        }).join("") + "</ol></div>" +
        '<div class="sx-read"><span class="mini-label">Go deeper</span><ul class="sx-qa"><li><a href="#stress-' + w.stress + '">Walk through the ' + w.name + " stress-test step by step</a></li></ul></div>" +
        '<p class="sx-fair">Integrity measures consistency, not whether you\'re right. A high score that took big bullets to reach is still worth a second look.</p></div>';
    }
    function render() {
      var had = root.contains(document.activeElement) || S.focus;
      var v = { lobby: vLobby, "d-setup": vSetup, "d-rebut": vDefendQ, "d-fallacy": vDefendQ, "d-feedback": vDefendFb, "d-over": vDefendOver, "w-pick": vWVPick, "w-q": vWVQ, "w-fb": vWVFb, "w-over": vWVOver }[S.phase] || vLobby;
      root.innerHTML = v();
      if (S.phase === "w-fb") {
        var bar = root.querySelector(".da-meter-bar span");
        requestAnimationFrame(function () { requestAnimationFrame(function () { if (bar.isConnected) bar.style.width = S.meter + "%"; }); });
      }
      if (had) {
        var f = root.querySelector("[data-autofocus]") || root.querySelector(".opt:not(:disabled)") || root.querySelector("[data-act]");
        if (f) f.focus({ preventScroll: true });
      }
      S.focus = false;
    }
    function keepInView() {
      var r = root.getBoundingClientRect();
      if (r.top < 60 || r.top > window.innerHeight * 0.6) scrollToEl(root, false);
    }

    /* ----- share ----- */
    function shareText() {
      var lines, url = location.href.split("#")[0].split("?")[0] + "#debate-arena";
      if (S.mode === "defend") {
        var r = rankFor(S.score), total = S.hist.length;
        lines = ["Debate Arena: Defend the Faith", "Rank: " + r.name + " · Score: " + fmt(S.score),
          "Rebuttals " + S.rOk + "/" + total + " · Fallacies " + S.fOk + "/" + total + " · Best streak " + S.best];
      } else {
        var t = tierFor(S.meter), tens = S.log.filter(function (l) { return l.d >= 10; }).length;
        lines = ["Debate Arena: Test Your Worldview", "Worldview: " + WV[S.w].name + " · Integrity " + S.meter + "% (" + t.name + ")", "Tensions hit: " + tens + " of " + S.log.length];
      }
      lines.push((S.mode === "defend" ? "Think you can beat it? " : "Test yours: ") + url);
      lines.push("— QuantumTheology");
      return lines.join("\n");
    }
    function copyScore(btn) {
      copyToClipboard(shareText()).then(function (ok) {
        flashButton(btn, ok, "Copied!", "Copy Score to Share");
        if (Q.toast) Q.toast(ok ? "Score copied! Paste it in the comments." : "Couldn't copy. Try again.");
      });
    }
    function saveImage() {
      if (S.mode === "defend") {
        var r = rankFor(S.score), total = S.hist.length;
        openShareData({ kicker: "Debate Arena · Defend the Faith", title: r.name + " · " + fmt(S.score) + " points", accent: "#a78bfa",
          body: "Rebuttals: " + S.rOk + " of " + total + "\nFallacies named: " + S.fOk + " of " + total + "\nBest streak: " + S.best + "\nHearts left: " + Math.max(0, S.hearts),
          foot: "Can you beat it? Play the Debate Arena at QuantumTheology.", footLabel: "YOUR TURN", footColor: "#67e8f9" });
      } else {
        var t = tierFor(S.meter);
        openShareData({ kicker: "Debate Arena · Test Your Worldview", title: WV[S.w].name + ": " + S.meter + "% integrity", accent: t.acc,
          body: t.name + ".\n" + S.log.map(function (l, i) { return (i + 1) + ". " + l.a + (l.d ? " (−" + l.d + ")" : " (consistent)"); }).join("\n"),
          foot: "Consistency, not truth. Test yours at QuantumTheology.", footLabel: "YOUR TURN", footColor: "#67e8f9" });
      }
    }

    /* ----- input: one delegated click listener + number keys ----- */
    root.addEventListener("click", function (e) {
      var b = e.target.closest("[data-act]");
      if (!b || !root.contains(b) || b.disabled) return;
      var act = b.getAttribute("data-act"), v = b.getAttribute("data-v"), i = parseInt(b.getAttribute("data-i"), 10);
      if (act === "go") { S.focus = true; go(v); }
      else if (act === "cat") { S.cat = v; render(); }
      else if (act === "start") { S.focus = true; startDefend(); keepInView(); }
      else if (act === "rebut") pickRebut(i);
      else if (act === "fal") pickFal(i);
      else if (act === "next") { S.focus = true; if (S.mode === "defend") { S.n++; nextQ(); } else { S.k++; nextW(); } keepInView(); }
      else if (act === "wv") { S.focus = true; startWV(v); keepInView(); }
      else if (act === "wans") pickW(i);
      else if (act === "copy") copyScore(b);
      else if (act === "img") saveImage();
      else if (act === "again") { S.focus = true; if (S.mode === "defend") startDefend(); else startWV(S.w); keepInView(); }
    });
    document.addEventListener("keydown", function (e) {
      if (e.altKey || e.ctrlKey || e.metaKey || !/^[1-4]$/.test(e.key)) return;
      if (e.target.closest && e.target.closest("input, textarea, select, [contenteditable]")) return;
      var act = S.phase === "d-rebut" ? "rebut" : S.phase === "d-fallacy" ? "fal" : S.phase === "w-q" ? "wans" : null;
      if (!act || !inView) return;
      var btn = root.querySelector('[data-act="' + act + '"][data-i="' + (+e.key - 1) + '"]');
      if (btn && !btn.disabled) { e.preventDefault(); btn.click(); }
    });

    render();
    Q.debateArena = { state: function () { return S; } };
  });

  /* ---------- 24. My Kit: saved cards and speeches ---------- */
  var kitEl = $("#kit"), kitList = $("#kitList");
  function kitGet() { var k = Q.store.get("kit", []); return Array.isArray(k) ? k : []; }
  function kitSet(k) { Q.store.set("kit", k); paintKit(); }
  function kitText(card) {
    if (card.classList.contains("qa") || card.classList.contains("axiom") || card.classList.contains("admit")) return rebuttalText(card);
    return copyTextFor(card);
  }
  function kitToggleCard(card) {
    var k = kitGet(), at = -1;
    k.forEach(function (x, j) { if (x.id === card.id) at = j; });
    if (at >= 0) { k.splice(at, 1); if (Q.toast) Q.toast("Removed from your kit."); }
    else { k.unshift({ id: card.id, t: plainText($("h3", card)), x: kitText(card) }); if (Q.toast) Q.toast("Saved to your kit ★"); }
    kitSet(k);
  }
  function kitAdd(item) {
    var k = kitGet().filter(function (x) { return x.id !== item.id; });
    k.unshift(item);
    kitSet(k);
    if (Q.toast) Q.toast("Saved to your kit ★");
  }
  function paintKit() {
    var k = kitGet(), ids = {};
    k.forEach(function (x) { ids[x.id] = 1; });
    $$(".kit-n").forEach(function (b) { b.hidden = !k.length; b.textContent = k.length; });
    $$(".save-btn").forEach(function (b) {
      var c = b.closest(".card"), on = !!(c && ids[c.id]);
      b.classList.toggle("on", on);
      b.textContent = on ? "★" : "☆";
      b.setAttribute("aria-pressed", String(on));
    });
    if (kitEl && !kitEl.hidden) renderKit();
  }
  function renderKit() {
    var k = kitGet();
    if (!k.length) { kitList.innerHTML = '<p class="kit-empty">Nothing saved yet. Tap ☆ on any axiom, Q&amp;A or admission card, or save a speech from the Opening Statement Builder.</p>'; return; }
    kitList.innerHTML = k.map(function (x, i) {
      var has = !!document.getElementById(x.id);
      return '<article class="kit-item"><h4>' + esc(x.t) + '</h4><p>' + esc(cut(x.x, 180)) + '</p><div class="kit-row">' +
        (has ? '<button class="copy-btn" type="button" data-kit-go="' + esc(x.id) + '">Go to card →</button>' : "") +
        '<button class="copy-btn" type="button" data-kit-copy="' + i + '">Copy</button><button class="copy-btn" type="button" data-kit-del="' + i + '">Remove</button></div></article>';
    }).join("");
  }
  function openKit() {
    if (!kitEl) return;
    closeAxPop(false); setMenu(false);
    renderKit();
    kitEl.hidden = false;
    document.documentElement.classList.add("locked");
    var c = $(".icon-btn", kitEl);
    if (c) c.focus({ preventScroll: true });
  }
  function closeKit() {
    if (!kitEl || kitEl.hidden) return;
    kitEl.hidden = true;
    if (sheet.hidden && finder.hidden) document.documentElement.classList.remove("locked");
  }
  safe("kit", function () {
    if (!kitEl) return;
    document.addEventListener("click", function (e) {
      if (e.target.closest("[data-open-kit]")) { e.preventDefault(); openKit(); return; }
      if (e.target.closest("[data-close-kit]")) { closeKit(); return; }
    });
    kitList.addEventListener("click", function (e) {
      var go = e.target.closest("[data-kit-go]"), cp = e.target.closest("[data-kit-copy]"), del = e.target.closest("[data-kit-del]");
      var k = kitGet();
      if (go) { var t = document.getElementById(go.getAttribute("data-kit-go")); closeKit(); if (t) jumpTo(t); }
      else if (cp) { var it = k[+cp.getAttribute("data-kit-copy")]; if (it) copyToClipboard(it.x).then(function (ok) { flashButton(cp, ok, "Copied ✓", "Copy"); }); }
      else if (del) { k.splice(+del.getAttribute("data-kit-del"), 1); kitSet(k); }
    });
    $("#kitCopy").addEventListener("click", function () {
      var b = this, k = kitGet();
      if (!k.length) return;
      copyToClipboard(k.map(function (x) { return x.x; }).join("\n\n———\n\n")).then(function (ok) { flashButton(b, ok, "Copied ✓", "Copy all"); });
    });
    $("#kitClear").addEventListener("click", function () {
      if (kitGet().length && window.confirm("Remove everything from your kit?")) kitSet([]);
    });
    paintKit();
  });

  /* ---------- 25. Opening Statement Builder ---------- */
  safe("opening builder", function () {
    var whoBox = $("#osWho"), lenBox = $("#osLen"), out = $("#osOut"), timeEl = $("#osTime");
    if (!whoBox || !Q.axioms) return;
    var OPP = [
      { id: "general", name: "General audience", ax: [2, 3, 9, 17],
        open: "Every worldview has to answer four questions: why there's a universe at all, why it's tuned for life, why right and wrong are real, and what happened to Jesus. Tonight I'll show you that only one worldview answers all four, and I'll do it using what the other side already admits." },
      { id: "atheist", name: "Atheist", ax: [2, 3, 5, 9, 17],
        open: "I'm not going to ask you to take anything on faith tonight. Every point I make is backed by something atheist and agnostic experts have already admitted. At the end, I'll ask you one question: which premise do you deny, and what does denying it cost you?" },
      { id: "agnostic", name: "Agnostic", ax: [2, 3, 6, 17],
        open: "You've said you don't know whether God exists. That's an honest place to start. So let's not start with what we don't know. Let's start with what we do, and see where it points." },
      { id: "muslim", name: "Muslim", ax: [15, 17, 16, 11],
        open: "We agree on a lot: there is one Creator, personal, just and merciful. Tonight the question is narrower and more important: who is Jesus, and what happened to Him? On that, history has a lot to say." },
      { id: "pantheist", name: "Pantheist / New Age", ax: [2, 6, 9, 17],
        open: "You're right that reality is more than dead matter. I agree with that. The question is whether the universe itself is God, or whether a Mind stands behind it. The evidence answers that." },
      { id: "pluralist", name: "Pluralist", ax: [8, 17, 16],
        open: "I respect the wish to say every path leads to God. But the paths don't just differ, they contradict. One says Jesus was crucified, one says He wasn't. Both can't be true, so let's look at the evidence." }
    ];
    var LENS = [["short", "60 seconds", 3], ["full", "3 minutes", 9]];
    var who = OPP[0], len = LENS[1], text = "";
    var tpl = document.createElement("template");
    function strip(h) { tpl.innerHTML = String(h); return tpl.content.textContent.replace(/\s+/g, " ").trim(); }
    function axById(n) { return Q.axioms.filter(function (a) { return a.n === n; })[0]; }
    function build() {
      var parts = [who.open], picks = who.ax.slice(0, len[2]);
      picks.forEach(function (n, i) {
        var a = axById(n);
        if (!a) return;
        var adm = Q.admitsFor ? Q.admitsFor(n)[0] : null;
        var line = (len[0] === "short" ? "" : (i === 0 ? "First" : i === picks.length - 1 ? "Finally" : ["Second", "Third", "Fourth", "Fifth"][i - 1]) + ": ") + strip(a.claim);
        if (adm) line += " Don't take my word for it. " + adm.who + ", " + adm.role.toLowerCase().replace(/,.*$/, "") + ", " + (adm.q ? "wrote: “" + adm.text + "”" : "conceded this: " + adm.text.charAt(0).toLowerCase() + adm.text.slice(1));
        if (len[0] === "full") line += " " + strip(a.roast);
        parts.push(line);
      });
      parts.push("So here's my challenge. Pick the premise you deny, and tell everyone what denying it costs you. Because if Jesus really rose from the dead, this isn't just a debate. He's a Person you can know.");
      text = parts.join("\n\n");
      out.innerHTML = parts.map(function (p, i) { return '<p class="' + (i === 0 ? "os-open" : i === parts.length - 1 ? "os-close" : "os-pt") + '">' + linkify(esc(p), who.id === "muslim") + "</p>"; }).join("");
      var words = text.split(/\s+/).length, secs = Math.round(words / 150 * 60);
      timeEl.textContent = words + " words · about " + Math.floor(secs / 60) + ":" + ("0" + secs % 60).slice(-2) + " spoken";
    }
    function chips(box, list, cur, key) {
      box.innerHTML = list.map(function (x) { var id = key(x); return '<button class="chip" type="button" data-v="' + id + '" aria-pressed="' + (id === key(cur)) + '">' + (x.name || x[1]) + "</button>"; }).join("");
    }
    chips(whoBox, OPP, who, function (x) { return x.id; });
    chips(lenBox, LENS, len, function (x) { return x[0]; });
    whoBox.addEventListener("click", function (e) {
      var b = e.target.closest("[data-v]"); if (!b) return;
      who = OPP.filter(function (o) { return o.id === b.getAttribute("data-v"); })[0];
      chips(whoBox, OPP, who, function (x) { return x.id; }); build();
    });
    lenBox.addEventListener("click", function (e) {
      var b = e.target.closest("[data-v]"); if (!b) return;
      len = LENS.filter(function (l) { return l[0] === b.getAttribute("data-v"); })[0];
      chips(lenBox, LENS, len, function (x) { return x[0]; }); build();
    });
    $("#osCopy").addEventListener("click", function () {
      var b = this;
      copyToClipboard(text + "\n\n— built with QuantumTheology").then(function (ok) { flashButton(b, ok, "Copied ✓", "Copy the speech"); if (Q.toast && ok) Q.toast("Speech copied. Practice it out loud twice."); });
    });
    $("#osSave").addEventListener("click", function () {
      kitAdd({ id: "speech-" + who.id + "-" + len[0], t: "Opening vs " + who.name + " (" + len[1] + ")", x: text });
    });
    build();
  });

  /* ---------- 26. Section rail (desktop), bottom bar (phones), and keyboard shortcuts ---------- */
  safe("navigation", function () {
    var SECTIONS = [["home", "Top"], ["axioms", "Axioms"], ["admitted", "Admitted"], ["syllogism", "Gates"], ["timeline", "Timeline"], ["debate", "Q&A"],
      ["debate-arena", "Play"], ["opening", "Speech"], ["arena", "Arena"], ["bible", "Bible"], ["islam", "Islam"], ["what-now", "What now"]];
    var GROUP = { axioms: ["map", "axioms", "admitted"], debate: ["debate"], "debate-arena": ["debate-arena", "opening", "arena"] };
    var rail = $("#rail"), bot = $("#botnav");
    var els = SECTIONS.map(function (s) { return s[0] === "home" ? $(".hero") : document.getElementById(s[0]); });
    if (rail) rail.innerHTML = SECTIONS.map(function (s, i) {
      return els[i] ? '<a href="#' + s[0] + '" data-rail="' + s[0] + '"><span class="rail-l">' + esc(s[1]) + '</span><i aria-hidden="true"></i></a>' : "";
    }).join("");
    var all = ["map", "about"].map(function (id) { return document.getElementById(id); });
    var cur = "", q = false;
    function spy() {
      q = false;
      var y = 140, act = "home";
      SECTIONS.forEach(function (s, i) { if (els[i] && els[i].getBoundingClientRect().top <= y) act = s[0]; });
      var mapEl = all[0];
      var fine = act;
      if (mapEl && mapEl.getBoundingClientRect().top <= y && (!els[1] || els[1].getBoundingClientRect().top > y)) fine = "map";
      if (fine === cur) return;
      cur = fine;
      if (rail) $$("a", rail).forEach(function (a) { a.classList.toggle("on", a.getAttribute("data-rail") === act); });
      if (bot) $$("[data-bn]", bot).forEach(function (a) { a.classList.toggle("on", (GROUP[a.getAttribute("data-bn")] || []).indexOf(fine) !== -1); });
    }
    window.addEventListener("scroll", function () { if (!q) { q = true; requestAnimationFrame(spy); } }, { passive: true });
    spy();
    document.addEventListener("keydown", function (e) {
      if (e.target.closest && e.target.closest("input, textarea, select, [contenteditable]")) return;
      if ((e.key === "k" || e.key === "K") && (e.ctrlKey || e.metaKey)) { e.preventDefault(); openFinder(); }
      else if (e.key === "/" && !e.ctrlKey && !e.metaKey && !e.altKey) { e.preventDefault(); openFinder(); }
    });
  });

  Q.enhance = function (root) {
    root = root || document;
    safe("enhance", function () { linkifyIn(root); underlineIn(root); buttonsIn(root); });
  };
  Q.openSheet = openSheet; Q.closeSheet = closeSheet; Q.sheetShows = sheetShows;
  Q.copy = copyToClipboard; Q.flashButton = flashButton;
  Q.plain = plainText; Q.esc = esc; Q.el = el; Q.$ = $; Q.$$ = $$;
  Q.jumpTo = jumpTo; Q.linkify = linkify; Q.norm = norm;
  Q.reduceMotion = reduceMotion; Q.scrollMode = scrollMode;
  Q.renderTimeline && Q.renderTimeline();
})();
