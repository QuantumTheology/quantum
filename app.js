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
  var BOOKS = "1 Corinthians|2 Corinthians|1 Timothy|2 Timothy|1 Peter|2 Peter|1 John|Genesis|Gen|Exodus|Leviticus|Deuteronomy|Psalms?|Isaiah|Daniel|Micah|Matthew|Mark|Luke|John|Acts|Romans|Galatians|Ephesians|Philippians|Colossians|Titus|Hebrews|Revelation";
  var SEP = "(?:,\\s(?:and\\s)?|\\sand\\s)";
  var LINK_RX = new RegExp(
    "\\b(" + BOOKS + ")\\s(\\d+(?::\\d+(?:[–-]\\d+)?|[–-]\\d+)?(?:,\\s\\d+:\\d+(?:[–-]\\d+)?)*)" +
    "|\\bSurah\\s(\\d+(?::\\d+(?:[–-]\\d+)?)?(?:" + SEP + "\\d+:\\d+(?:[–-]\\d+)?)*)" +
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
  function linkify(html) {
    return html.replace(LINK_RX, function (m, book, brefs, qrefs, bukhari, dawud, yoma, axWord, axrefs) {
      if (book) return linkEach(brefs, /\d+(?::\d+(?:[–-]\d+)?|[–-]\d+)?/g, function (r, first) {
        var ref = book + " " + r;
        return ext(bibleUrl(ref), first ? ref : r, ' data-verse="bible" data-ref="' + ref + '"');
      });
      if (qrefs) return linkEach(qrefs, /\d+(?::\d+(?:[–-]\d+)?)?/g, function (r, first) {
        return ext(quranUrl(r), first ? "Surah " + r : r, ' data-verse="quran" data-ref="' + r + '"');
      });
      if (bukhari) return ext("https://sunnah.com/bukhari:" + bukhari, m);
      if (dawud) return ext("https://sunnah.com/abudawud:" + dawud, m);
      if (yoma) return ext("https://www.sefaria.org/Yoma.39b", m);
      if (axrefs) return linkEach(axrefs, /\d+(?:[–-]\d+)?/g, function (r, first) {
        return '<a class="axlink" href="#axiom-' + parseInt(r, 10) + '">' + (first ? axWord + r : r) + "</a>";
      });
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

  safe("linkify", function () {
    $$("[data-link]").forEach(function (e) { e.innerHTML = linkify(e.innerHTML); });
  });

  /* ---------- 3. Tap-to-define: underline glossary terms inside cards ---------- */
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
    $$("main .card").forEach(function (card) {
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
    });
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
  function stripLead(s) { return s.replace(/^(Evidence|Rebuttals?|Receipts|Fallac(?:y|ies)):\s*/, ""); }
  var SIGN = "— QuantumTheology (S-GUOT)";
  function copyTextFor(card) {
    if (card.classList.contains("axiom")) {
      return [plainText($(".label", card)).toUpperCase() + " — " + plainText($("h3", card)), plainText($(".evidence", card)), plainText($(".receipts", card)), SIGN].join("\n\n");
    }
    if (card.classList.contains("qa")) {
      var note = $(".q-note", card);
      return ["Q: " + plainText($("h3", card)) + (note ? " (" + plainText(note) + ")" : ""), plainText($(".fallacy", card)), plainText($(".evidence", card)), SIGN].join("\n\n");
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
    return fetchJSON("https://bible-api.com/" + encodeURIComponent(q) + "?translation=web").then(function (d) {
      if (!d || !d.verses || !d.verses.length) throw new Error("no verses");
      return { verses: d.verses.map(function (v) { return { n: v.verse, t: v.text }; }), note: "World English Bible (public domain)" };
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
      body.appendChild(linkOut(href, isQ ? "Open on Quran.com ↗" : "Read it in context on Bible Gateway ↗"));
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
      return { kicker: plainText($(".label", card)) + " · " + plainText($(".tag", card)), title: plainText($("h3", card)), body: stripLead(plainText($(".evidence", card))), foot: stripLead(plainText($(".receipts", card))), footLabel: "RECEIPTS", footColor: "#fbbf77", accent: accent };
    }
    if (card.classList.contains("qa")) {
      return { kicker: "Objection · " + plainText($(".label", card)), title: plainText($("h3", card)), body: stripLead(plainText($(".evidence", card))), foot: stripLead(plainText($(".fallacy", card))), footLabel: "FALLACY", footColor: "#fb7185", accent: "#a78bfa" };
    }
    if (card.classList.contains("wv")) {
      var win = card.classList.contains("win");
      return { kicker: win ? "Left standing" : "Eliminated", title: plainText($("h3", card)), body: plainText($(".body", card)), foot: "Tested against the 20 S-GUOT axioms", accent: win ? "#6ee7b7" : "#fb7185" };
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
  function openShare(card) {
    var d = shareDataFor(card);
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
  safe("card buttons", function () {
    function makeBtn(label, cls) {
      var b = el("button", "copy-btn" + (cls ? " " + cls : ""));
      b.type = "button";
      b.textContent = label;
      return b;
    }
    $$(".axiom, .qa, .wv, .point").forEach(function (card) {
      var copy = makeBtn("Copy"), share = makeBtn("Share", "share-btn");
      copy.setAttribute("aria-label", "Copy " + plainText($("h3", card)));
      share.setAttribute("aria-label", "Make a share card for " + plainText($("h3", card)));
      copy.addEventListener("click", function () {
        copyToClipboard(copyTextFor(card)).then(function (ok) { flashButton(copy, ok, "Copied ✓", "Copy"); });
      });
      share.addEventListener("click", function () { openShare(card); });
      var top = $(".card-top", card);
      if (top) {
        var row = el("div", "btn-row");
        row.appendChild(copy); row.appendChild(share);
        top.appendChild(row);
      } else {
        var actions = el("div", "card-actions");
        actions.appendChild(copy); actions.appendChild(share);
        (card.classList.contains("wv") ? $(":scope > div", card) || card : card).appendChild(actions);
      }
    });
  });

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
  function jumpTo(target) {
    if (!target) return;
    if (target.hidden) {
      if (target.classList.contains("axiom") && axiomFilter) axiomFilter.reset();
      if (target.classList.contains("qa") && qaFilter) qaFilter.reset();
      if (target.classList.contains("gloss-item") && glossSearch) { glossSearch.value = ""; filterGloss(); }
    }
    target.scrollIntoView({ behavior: scrollMode, block: "start" });
    if (target.id && history.replaceState) history.replaceState(null, "", "#" + target.id);
    flash(target);
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
    islam: { name: "Islam", color: "#fbbf77" }, glossary: { name: "Glossary", color: "#67e8f9" }
  };
  function addEntry(type, target, title, body, keys, snippet) {
    index.push({ type: type, el: target, title: title, strong: tokens(title + " " + (keys || "")), weak: tokens(body), phrase: norm(title + " " + (keys || "")), snippet: snippet });
  }
  safe("finder index", function () {
    $$(".qa").forEach(function (c) {
      var note = $(".q-note", c);
      addEntry("qa", c, plainText($("h3", c)) + (note ? " (" + plainText(note) + ")" : ""), plainText($(".fallacy", c)) + " " + plainText($(".evidence", c)), c.getAttribute("data-keys"), stripLead(plainText($(".evidence", c))));
    });
    $$(".axiom").forEach(function (c) {
      addEntry("axiom", c, plainText($(".label", c)) + ": " + plainText($("h3", c)), plainText($(".evidence", c)) + " " + plainText($(".receipts", c)), plainText($(".tag", c)), stripLead(plainText($(".evidence", c))));
    });
    $$(".wv").forEach(function (c) {
      addEntry("wv", c, plainText($("h3", c)), plainText($(".body", c)), plainText($(".wv-cat", c)), plainText($(".body", c)));
    });
    $$(".point").forEach(function (c) {
      addEntry("islam", c, plainText($("h3", c)), plainText($(".body", c)), "islam muslim quran muhammad allah", plainText($(".body", c)));
    });
    gloss.forEach(function (g) { addEntry("glossary", $("#g-" + g.slug), g.term, g.def, g.aliases.join(" "), g.def); });
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
      if (e.type !== "glossary") {
        var cp = el("button", "copy-btn");
        cp.type = "button";
        cp.textContent = "Copy";
        cp.addEventListener("click", function () {
          copyToClipboard(copyTextFor(e.el)).then(function (ok) { flashButton(cp, ok, "Copied ✓", "Copy"); });
        });
        actions.appendChild(cp);
      }
      box.appendChild(type); box.appendChild(h); box.appendChild(p); box.appendChild(actions);
      finderResults.appendChild(box);
    });
  }
  var finderTimer;
  function openFinder() {
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

  /* ---------- 11. Practice mode (flashcards) ---------- */
  safe("practice", function () {
    var card = $("#flashcard");
    if (!card) return;
    var CAT = { science: "Science", god: "God & Logic", morality: "Morality & Evil", bible: "Bible & History", jesus: "Jesus", religions: "Other Religions" };
    var deck = $$(".qa").map(function (c) {
      var note = $(".q-note", c);
      return { q: plainText($("h3", c)) + (note ? " (" + plainText(note) + ")" : ""), cat: CAT[c.getAttribute("data-cat")] || "", src: c };
    });
    if (!deck.length) return;
    var order = deck.map(function (_, i) { return i; }), pos = 0, swapTimer;
    var fcQ = $("#fcQ"), fcA = $("#fcA"), fcCount = $("#fcCount"), fcCat = $("#fcCat");
    function fill() {
      var d = deck[order[pos]];
      fcQ.textContent = d.q;
      fcCat.textContent = d.cat;
      fcCount.textContent = (pos + 1) + " / " + deck.length;
      fcA.innerHTML = "";
      fcA.appendChild($(".fallacy", d.src).cloneNode(true));
      fcA.appendChild($(".evidence", d.src).cloneNode(true));
    }
    function go(delta) {
      pos = (pos + delta + order.length) % order.length;
      clearTimeout(swapTimer);
      if (card.classList.contains("flipped")) {
        card.classList.remove("flipped");
        swapTimer = setTimeout(fill, reduceMotion ? 0 : 320);
      } else {
        fill();
      }
    }
    function flip() { card.classList.toggle("flipped"); }
    card.addEventListener("click", function (e) {
      if (e.target.closest("a, button")) return;
      flip();
    });
    $("#fcFlip").addEventListener("click", flip);
    $("#fcNext").addEventListener("click", function () { go(1); });
    $("#fcPrev").addEventListener("click", function () { go(-1); });
    $("#fcShuffle").addEventListener("click", function () {
      for (var i = order.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = order[i]; order[i] = order[j]; order[j] = t; }
      pos = 0;
      card.classList.remove("flipped");
      clearTimeout(swapTimer);
      swapTimer = setTimeout(fill, reduceMotion ? 0 : 320);
    });
    $(".practice").addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") { go(1); e.preventDefault(); }
      if (e.key === "ArrowLeft") { go(-1); e.preventDefault(); }
    });
    var sx = 0, sy = 0;
    card.addEventListener("touchstart", function (e) { sx = e.touches[0].clientX; sy = e.touches[0].clientY; }, { passive: true });
    card.addEventListener("touchend", function (e) {
      var t = e.changedTouches[0], dx = t.clientX - sx, dy = t.clientY - sy;
      if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.4) go(dx < 0 ? 1 : -1);
    }, { passive: true });
    fill();
  });

  /* ---------- 12. One click handler for links, terms, and verses ---------- */
  document.addEventListener("click", function (e) {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    var t = e.target;
    if (!t.closest) return;
    var term = t.closest(".term");
    if (term) { e.preventDefault(); openTerm(term.getAttribute("data-term")); return; }
    var verse = t.closest("a.ref[data-verse]");
    if (verse) { e.preventDefault(); openVerse(verse); return; }
    var ax = t.closest('a[href^="#axiom-"]');
    if (ax) {
      var target = document.getElementById(ax.getAttribute("href").slice(1));
      if (target) { e.preventDefault(); closeSheet(); jumpTo(target); }
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
  safe("hash", function () {
    if (!location.hash || location.hash.length < 2) return;
    var landed = document.getElementById(location.hash.slice(1));
    if (landed && (landed.classList.contains("card") || landed.classList.contains("gloss-item"))) flash(landed);
  });
})();
