/* Debate Q&A part 1: Science (sci) and God & Logic (god).
   q(cat, objection, fallacy, quick (paste-ready, 1-2 sentences), full, keywords, axiom#) */
(function () {
  var Q = window.QT = window.QT || {};
  Q.qa = Q.qa || [];
  function q(c, o, f, a, b, k, x) { Q.qa.push({ c: c, q: o, f: f, a: a, b: b, k: k || "", x: x || 0 }); }

  /* ---------- SCIENCE ---------- */
  q("sci", "How do thermodynamics and the BGV theorem point to God?",
    "Ignoratio Elenchi & Argument from Personal Incredulity",
    "An infinitely old universe would already be dead (2nd Law), and BGV shows expanding universes had a past boundary. So the cause is outside space and time.",
    "Two independent routes to a beginning: an eternal past would have already run down to heat death, and the BGV theorem (2003) shows any universe that has on average been expanding cannot be past-eternal. The cause of space, time and matter is therefore not made of them. Say “any universe with average expansion,” not “every possible universe.”",
    "thermodynamics bgv theorem beginning big bang heat death", 2);
  q("sci", "“Chemical elements made God.”",
    "Category Fallacy",
    "Elements didn't exist until after the Big Bang, so they can't be what made the one who made them. That's like saying LEGO bricks built the factory.",
    "Atoms formed in Big Bang nucleosynthesis and in stars, after space, time and energy began. A cause of the universe can't be made of the stuff it's the cause of. The claim confuses a thing inside the universe with its explanation.",
    "elements atoms chemicals created god", 2);
  q("sci", "“Energy can create itself.”",
    "Violation of the Law of Non-Contradiction",
    "To create itself, energy would have to exist before it existed. The 1st Law says energy is conserved, not created.",
    "Self-creation requires being and not-being at once. Physicists who talk about zero-total-energy universes still presuppose a quantum field with laws, which is not nothing. “Energy is conserved” is the observed law, not “energy popped into being.”",
    "energy create itself always existed matter eternal first law", 2);
  q("sci", "“Space and time have always existed.”",
    "Shifting the Burden of Proof",
    "Space and time are one fabric, and the BGV theorem says expanding spacetime has a past boundary. Also, you can't count down from an infinite past to reach today.",
    "General relativity fuses space, time and matter. BGV shows expanding spacetime has a boundary. And an actual infinite past of events can't be crossed to reach now (Hilbert's Hotel). If you claim eternal space, you carry that burden.",
    "space always existed eternal universe time beginning", 2);
  q("sci", "“The universe came from a quantum vacuum, from nothing.” (Krauss)",
    "Equivocation on “nothing”",
    "A quantum vacuum isn't nothing. It's a field with energy and laws. Calling it “nothing” is a bait-and-switch.",
    "Philosopher of physics David Albert made that point against Krauss's <i>A Universe from Nothing</i> (2012). The vacuum is a physical thing with properties, governed by law. Something still has to explain that field and its laws.",
    "quantum vacuum fluctuation nothing krauss universe from nothing", 1);
  q("sci", "“The universe is just here. We shouldn't ask why.”",
    "Special Pleading",
    "That's a brute fact. You'd never accept it for anything else, so why exempt the universe?",
    "Refusing to ask why is the opposite of the scientific attitude. The principle of sufficient reason is what drives every investigation. You don't accept “it just is” for a car engine, so exempting the universe is special pleading.",
    "brute fact just exists why anything exists universe", 1);
  q("sci", "“Because there's a law like gravity, the universe can create itself.” (Hawking)",
    "Reification Fallacy",
    "A law describes what happens. It isn't a thing that can create. The law needs a universe to describe.",
    "Hawking and Mlodinow wrote that “because there is a law such as gravity, the universe can and will create itself from nothing.” But gravity is a law of something. A law doesn't have the causal power to produce matter, any more than the rules of chess move the pieces.",
    "gravity law create universe hawking nothing grand design", 4);
  q("sci", "“Cause and effect breaks down in quantum physics. Radioactive decay has no cause.”",
    "Equivocation",
    "Quantum events happen inside a quantum field with laws. They're not something coming from nothing.",
    "“No deterministic cause” isn't “no cause.” Those events occur within a physical setting with specific probabilities. Whatever begins out of absolute nothing is the claim; no quantum experiment shows that.",
    "quantum cause effect radioactive decay uncaused virtual particles", 2);
  q("sci", "“The Big Bang wasn't a beginning. There may be no start to time.”",
    "Argument from Ignorance",
    "“We don't know” isn't a rebuttal. The models that dodge a beginning have each run into BGV, entropy or stability problems.",
    "The Big Bang model describes the expansion from an extremely hot, dense state. It may not describe the absolute origin, and we should be honest that physics there is unknown. But BGV, entropy, and Mithani &amp; Vilenkin (2012) find the proposed ways out unstable or incomplete, and Axiom 1 still stands if a beginning is avoided.",
    "big bang beginning time no start hartle hawking no boundary", 2);
  q("sci", "“The universe is cyclic and eternal (Penrose, bounce models).”",
    "Moving the Goalposts",
    "Each cycle adds entropy, so an infinite chain of cycles would already be dead. And BGV still applies to expanding phases.",
    "Cyclic models face the entropy accumulation problem (Tolman). Penrose's conformal cyclic cosmology is a speculative proposal without observational confirmation. Even if one survived, the universe would still be contingent (Axiom 1).",
    "cyclic universe bounce penrose eternal oscillating", 2);
  q("sci", "“There are infinite universes with infinite chances, so anything can happen.”",
    "Reification Fallacy",
    "Infinity isn't a real thing in nature, and an infinite number of other universes has never been observed. It's a promise, not evidence.",
    "Actual infinities lead to absurdities (Hilbert's Hotel). BGV shows an inflating multiverse still has a past boundary. And in some models Boltzmann Brains would outnumber real observers, which destroys trust in everything you observe, so invoking an infinite multiverse costs you your own reliability.",
    "infinite universe infinite chances multiverse probability", 3);
  q("sci", "“The multiverse explains fine-tuning.”",
    "Special Pleading",
    "A universe generator needs its own finely tuned laws, and nobody has ever observed one. You've swapped one Designer for an invisible factory.",
    "A multiverse mechanism (inflation, string landscape) must itself be set up in the right way and has never been observed. It's also untestable. Accepting an unobservable infinity of universes while refusing one Designer is special pleading.",
    "multiverse fine tuning string landscape many worlds", 3);
  q("sci", "“Fine-tuning is an illusion. Life adapted to the universe, like a puddle to its hole.”",
    "False Analogy",
    "A puddle fits the hole because it's liquid. A life-permitting universe needs the constants set before anything could adapt.",
    "Douglas Adams' puddle assumes there's already a hole. But adapting requires a universe where chemistry, stars and stable atoms are possible first. The constants fix what's possible at all. Be fair: some physicists dispute the probabilities, so present design as the best explanation.",
    "fine tuning puddle illusion adapted life universe", 3);
  q("sci", "“Anthropic principle: of course we observe a universe that allows observers.”",
    "Ignoratio Elenchi",
    "That explains what we see, not why it exists. If a firing squad all misses, “I'd be dead otherwise” doesn't explain why they all missed.",
    "John Leslie's firing-squad point: observer selection explains what you can observe, not why the improbable condition obtains. The anthropic principle is a true fact that answers a different question.",
    "anthropic principle observer selection effect", 3);
  q("sci", "“Evolution proves there's no God.”",
    "Non Sequitur",
    "Evolution describes how living things change. It says nothing about why there's a universe, laws, a first cell, or minds.",
    "Many scientists and Christians accept evolution. It can't address cosmic origins (Axioms 1–2), the laws (4), the first replicator (5) or consciousness (6). A process needs something to run on.",
    "evolution darwin natural selection apes monkeys", 5);
  q("sci", "“Science proves the earth is billions of years old, so Genesis is false.”",
    "Straw Man",
    "Christians have held several views of Genesis 1 (young earth, old earth, framework) since long before modern science. The gospel doesn't depend on one of them.",
    "Augustine (AD 400) already doubted that the days were 24-hour days. The Hebrew <i>yom</i> can mean a period. Scripture's main point in Genesis 1 is that God made everything and called it good. Examine the arguments, but don't fight your whole case over a point the gospel doesn't rest on.",
    "young earth old earth billions years genesis days creation", 11);
  q("sci", "“Adam and Eve contradict human genetics.”",
    "Hasty Generalization",
    "Population genetics gives estimates, not proof. Christians differ on how Adam fits the science, and the gospel needs a historical fall, not a specific model.",
    "Genetic estimates of ancestral population sizes depend on assumptions, and Christian scholars hold several views of Adam (a historical pair, a representative head, or a ‘first couple among others’). Paul's argument in Romans 5 requires a real first man. Don't claim the science disproves or proves it.",
    "adam eve genetics population historical", 20);
  q("sci", "“Miller–Urey showed life can arise from chemicals.”",
    "Non Sequitur",
    "It made a few simple amino acids, which are only bricks. Life needs the code and the machine that reads it.",
    "The 1953 experiment made some amino acids (using an atmosphere now thought unrealistic). But amino acids are not proteins, much less a self-copying cell with a genetic code. The hard part is information, not chemistry.",
    "miller urey amino acids primordial soup", 5);
  q("sci", "“The RNA world solves the origin of life.”",
    "Magic-Wand Hand-Waving",
    "RNA can do some tricks, but it still has to be made, kept alive in water, and connected to a code and a reader.",
    "RNA-world research is real. But making and keeping RNA stable faces hydrolysis, tar (“the asphalt paradox,” Benner), chirality, and concentration problems, and the first code-and-decoder system is still unexplained. “Under research” isn't “solved.”",
    "rna world origin of life abiogenesis ribozyme", 5);
  q("sci", "“Junk DNA proves there's no designer.”",
    "Argument from Ignorance",
    "“Junk” has shrunk with each decade. And the design argument is about the code, not about every letter being useful.",
    "Much non-coding DNA turns out to have regulatory roles, and scientists debate how much of the genome is functional (the ENCODE debate). Don't claim it's all functional. The argument for design rests on the existence of a code, not on whether every stretch of it is used.",
    "junk dna encode noncoding genome designer", 5);
  q("sci", "“Bad design (the laryngeal nerve, the blind spot) disproves a Designer.”",
    "Straw Man",
    "That assumes we know the designer's goals. Engineers trade off cost, reliability and function, and many “flaws” turned out to have reasons.",
    "A design critique needs the designer's purposes. The “backward” retina arrangement, for example, supports the high metabolic demand of photoreceptors. Even if some features are suboptimal, that shows imperfect design, not no design.",
    "bad design laryngeal nerve blind spot retina", 5);
  q("sci", "“Science is the only path to truth.”",
    "Scientism (Self-Refutation)",
    "“Only science gives truth” isn't a scientific finding. It refutes itself.",
    "Science can't prove logic, math, morals or the reliability of its own method. Those are assumed. The statement “only what science can measure is real” can't itself be measured, so by its own standard it fails.",
    "science only truth scientism empirical evidence", 8);
  q("sci", "“Science has disproved miracles. (Hume)”",
    "Begging the Question",
    "Hume assumed miracles are impossible in order to say the evidence is weak. If God exists, miracles aren't impossible.",
    "Hume's argument rests on our uniform experience against miracles, which assumes the conclusion. Philosophers like John Earman have criticized it. The question is the specific evidence for a specific event (the resurrection), not a general ban.",
    "hume miracles science disproved supernatural", 17);
  q("sci", "“God of the gaps: you're just plugging God into what science hasn't explained yet.”",
    "Strawman",
    "That would be true if we argued from what we don't know. We argue from what we do know: the beginning, the code, the tuning.",
    "The arguments are built on positive knowledge (heat death, BGV, codes only come from minds). Where a gap argument fails, we should drop it, so be honest: don't claim “science can never explain X.” Claim “the known evidence best fits a mind.”",
    "god of the gaps gaps science explain", 5);
  q("sci", "“Quantum mechanics proves consciousness creates reality.”",
    "Appeal to Authority (misused)",
    "Careful. Decoherence works without any conscious observer, so don't build a God argument on that. Argue from the lawfulness instead.",
    "This one cuts both ways: some Christians and many New Agers use the “observer effect” loosely. In physics, “observer” means any interaction, not a conscious mind. If you use quantum mechanics, use it for what it supports: the universe obeys exact mathematical laws.",
    "quantum observer effect consciousness creates reality copenhagen", 4);
  q("sci", "“The 2nd Law doesn't apply on Earth. It's an open system.”",
    "Straw Man",
    "True, so don't use the 2nd Law against evolution. Use it for the universe as a whole: an eternal past would already be in heat death.",
    "This is a case where the atheist is right about a bad argument. The Earth gets energy from the sun, so local order can rise. The valid use of thermodynamics is cosmic: the universe as a closed system would have reached equilibrium if it were infinitely old.",
    "second law open system earth evolution thermodynamics", 2);
  q("sci", "“Aliens seeded life on Earth (panspermia).”",
    "Infinite Regress",
    "That only moves the question back: who wrote the aliens' code? And Crick and Orgel's idea concedes life's information came from intelligence.",
    "Directed panspermia (Crick and Orgel, 1973) just relocates the origin of life elsewhere, where the same problem recurs. It also admits the information in life looks designed.",
    "aliens panspermia space seeded extraterrestrial", 5);
  q("sci", "“God is unfalsifiable, so it isn't science.”",
    "Category Error",
    "Nobody says God is a lab result. The argument is philosophical and historical, and the claims can be tested: show an eternal past, a self-writing code, or a body in the tomb.",
    "Falsifiability is a standard for scientific hypotheses, not for every claim. The arguments in S-GUOT make risky predictions (a beginning, a codes-need-minds rule, an empty tomb). Any of these could have been disproved.",
    "unfalsifiable popper testable not scientific", 8);
  q("sci", "“Dinosaurs prove the Bible is wrong.”",
    "Straw Man",
    "The Bible doesn't list every creature, and Christians hold several views about creation's timeline. Nothing in dinosaurs touches the gospel.",
    "Genesis 1 describes God creating land animals and sea creatures without a catalog. Whether you hold a young-earth or old-earth reading, dinosaurs aren't a theological problem. Don't let a side issue become your battlefield.",
    "dinosaurs bible fossils extinct", 11);
  q("sci", "“Mathematics is invented, not discovered.”",
    "False Dilemma",
    "If math is invented, why did it describe the cosmos long before humans existed? It's best explained by a rational mind behind both.",
    "Wigner's “unreasonable effectiveness” is the puzzle: abstract math that humans invented or discovered predicts physical results (like the Higgs boson) with astonishing accuracy. A mind behind both nature and our minds explains it.",
    "math invented discovered wigner platonism numbers", 4);

  /* ---------- GOD & LOGIC ---------- */
  q("god", "“Well, who created God?”",
    "Special Pleading & Category Error",
    "Only things that begin need a cause. God is the uncaused necessary being, so asking who made God is like asking who painted the square circle.",
    "The cosmological argument says whatever begins to exist has a cause, not “everything.” A necessary being has no beginning, so asking for its cause makes the same mistake as asking what's north of the North Pole. Your universe also needs an uncaused starting point; the question is which one.",
    "who created god who made god uncaused necessary being", 14);
  q("god", "“Where is God located in space?”",
    "Category Fallacy",
    "God made space and time, so He's outside them like a game developer is outside Minecraft, yet present everywhere at once.",
    "A cause of space can't be inside space. Scripture says God fills heaven and earth (Jeremiah 23:24) and is spirit (John 4:24). Presence isn't about a location.",
    "where is god located space heaven", 11);
  q("god", "“Can God make a rock so heavy He can't lift it?”",
    "Logical Contradiction",
    "Omnipotence means doing what's logically possible. A rock too heavy for the all-powerful is a square circle. It isn't a thing.",
    "God can do all that is coherent. “Make an immovable object that an unstoppable force can't move” describes nothing. And God cannot lie (Titus 1:2), which is perfection, not weakness.",
    "rock heavy lift omnipotent paradox all powerful", 8);
  q("god", "“If God is all-powerful, can He sin or lie?”",
    "Equivocation on “power”",
    "Sinning is a failure of goodness, not a measure of power. God's perfection means He won't, not that He's weak.",
    "Power to do evil would be a defect (Titus 1:2; James 1:13). A being with perfect goodness cannot act against its own nature. That's what “maximally great” means.",
    "can god sin lie evil omnipotence", 14);
  q("god", "“If God knows the future, we can't have free will.”",
    "Non Sequitur",
    "Knowing what you'll freely choose doesn't cause your choice. Knowing it happened doesn't cause it either.",
    "Foreknowledge isn't force. A person who saw tomorrow's game on video knew who'd win without making them win. Christians hold different models (Calvinist, Arminian, Molinist), but none says knowing = causing.",
    "foreknowledge free will omniscience predestination", 12);
  q("god", "“How can a timeless God act in time?”",
    "Equivocation",
    "God's decision is eternal, and its effect is in time. Like an author who writes a story: he's outside it and acts inside it.",
    "Timeless without creation and temporal with creation is one coherent view (William Lane Craig). The author-and-novel illustration shows an agent acting “in” a timeline without being bound by it.",
    "timeless god act in time eternal changeless", 11);
  q("god", "“Euthyphro: is something good because God says so, or does God say so because it's good?”",
    "False Dilemma",
    "Third option: goodness comes from God's own unchanging nature. He doesn't make it up, and He doesn't answer to something above Him.",
    "Neither “arbitrary command” nor “independent standard.” God's commands flow from His character, which is the standard. That's why “God could command cruelty” misfires: cruelty is contrary to His nature.",
    "euthyphro dilemma good god commands divine command theory", 9);
  q("god", "“If God exists, why doesn't He appear to everyone?”",
    "Loaded Question",
    "He has, in creation, conscience and in Jesus (the risen Christ appeared to 500 at once). The issue isn't lack of evidence but what people do with it.",
    "Romans 1:20 and 2:15 say creation and conscience speak to everyone. History gives specific appearances. Forcing recognition would override the free love God seeks (Axiom 12). Many skeptics changed their mind after reading the evidence (C.S. Lewis, Lee Strobel).",
    "divine hiddenness why doesn't god appear show himself", 12);
  q("god", "“The burden of proof is on you, not me.”",
    "Shifting the Burden of Proof",
    "Everyone with a worldview carries a burden. “The universe came from nothing” and “life arose by chance” are claims too.",
    "Atheism makes claims about the origin of the universe, life, mind and morals. If you hold a position, you defend it. Using “prove it” as a shield isn't an argument.",
    "burden of proof prove it evidence", 1);
  q("god", "“Atheism is just a lack of belief.”",
    "Equivocation (redefining the word)",
    "A rock lacks belief in God too. If you say the universe, life and minds exist without God, you hold a position that needs defending.",
    "Be gracious: some atheists use “lack of belief” sincerely. Then ask which they hold: the psychological state (no belief) or the claim (there is no God). The first is autobiography, and the second needs evidence.",
    "lack of belief atheism default position don't believe", 1);
  q("god", "“What about the Flying Spaghetti Monster or Russell's teapot?”",
    "False Equivalence",
    "A noodle monster isn't claimed to be a necessary, uncaused, timeless mind, and it has no historical evidence. These jokes dodge the actual arguments.",
    "The comparison fails because the arguments for God (beginning, laws, consciousness, morality, the resurrection) don't apply to teapots or spaghetti. If you can't tell the difference, it's the joke making the argument, not you.",
    "flying spaghetti monster russell teapot invisible", 11);
  q("god", "“God is just an imaginary sky daddy.”",
    "Ad Hominem (mockery) & Begging the Question",
    "Mockery isn't an argument. The case for God rests on the beginning, the tuning, the code and the resurrection.",
    "If the best you can do is ridicule, the arguments stand. “Nothing created everything” is the real fairy tale. Be kind: many people say it from hurt, and what they need is to be heard.",
    "sky daddy imaginary friend fairy tale", 1);
  q("god", "“Which God? There are thousands of gods.”",
    "False Equivalence",
    "The question isn't “is there a god” but “which worldview survives the evidence.” Finite gods like Zeus are creatures, not the First Cause.",
    "Run every option through the gates: Is it a Mind? One or many? Distinct from creation? Tri-Une? Revealed in history? The list gets short fast.",
    "which god thousands of gods zeus thor odin", 11);
  q("god", "“Faith means believing without evidence.”",
    "Equivocation",
    "Biblical faith (<i>pistis</i>) is trust based on evidence. Jesus gave “many convincing proofs” (Acts 1:3) and Luke investigated everything (Luke 1:1–4).",
    "Faith in the Bible is trust in a person you have reason to trust, like faith in a pilot. Believing the universe arose from nothing takes far more blind faith.",
    "faith blind belief without evidence", 15);
  q("god", "“You're only a Christian because of where you were born.”",
    "Genetic Fallacy",
    "How you got a belief doesn't decide if it's true. By that logic, atheists are atheists because of where they were born.",
    "Christianity grew up in Jerusalem as a hated minority and spread into every culture on evidence, not geography. Even if geography explains the origin of a belief, only evidence says whether it's true.",
    "born where raised parents culture geography country", 18);
  q("god", "“Extraordinary claims require extraordinary evidence.”",
    "Vague Standard",
    "What counts as “extraordinary”? We do offer it: a universe with a beginning, a code, tuning, and a risen Jesus attested within years.",
    "The slogan is a rule of thumb, not a law of logic. Bayesian reasoning says evidence should be proportioned to prior probability, and if God exists, the prior for a miracle isn't tiny. Ask what evidence would convince them.",
    "extraordinary claims extraordinary evidence sagan", 17);
  q("god", "“You can't prove a negative, so you can't disprove God.”",
    "Moving the Goalposts",
    "We're not asking you to disprove God. We're giving positive evidence for Him. And you can prove negatives: there's no married bachelor.",
    "The slogan is false in logic and math, and many negatives are proved. Anyway, the claim isn't about disproving God, it's about whether the positive case holds.",
    "prove a negative disprove god", 1);
  q("god", "“Occam's razor says no God is simpler.”",
    "Misapplied Principle",
    "Occam says don't multiply causes beyond what explains the facts. One Mind explains the beginning, laws, minds and morals, which a godless universe leaves unexplained.",
    "Simplicity isn't just “fewer things.” An explanation has to explain. A single necessary Mind is simpler than a multiverse generator, fine-tuned laws, accidental minds and moral facts as unexplained extras.",
    "occam razor simplest explanation no god", 11);
  q("god", "“Pascal's wager is just believing out of fear.”",
    "Straw Man",
    "We don't argue from fear. We argue from evidence, and the wager is only a nudge for people who say they're undecided.",
    "Don't lean on the wager. It's not a proof and doesn't produce real trust. Use the evidence, then invite people to follow Jesus because He's true and good, not just safe.",
    "pascal wager fear hell believe out of fear", 20);
  q("god", "“Prayer doesn't work. Studies prove it.”",
    "Category Error",
    "Prayer is talking to a person, not pulling a lever. A study that tests God like a drug misses the point.",
    "The STEP study (2006) found no effect from intercessory prayer on heart surgery patients, but it tested God like a lab variable, which the Bible says we shouldn't do (Deuteronomy 6:16). Prayer is relationship. Many testimonies are real, and science can't measure them.",
    "prayer doesn't work studies step answered prayer", 12);
  q("god", "“Why does an all-powerful God need to be worshipped? That's narcissistic.”",
    "Equivocation",
    "God doesn't need it. Worship is the right response to the one who is the highest good, and it's what we were made for.",
    "If God is the greatest good, then loving Him is the highest joy, like admiring the best music. He doesn't need us (Acts 17:25); He invites us. In the Trinity, the Persons have always given glory to each other (John 17:5, 24).",
    "worship narcissist ego god needs praise", 13);
  q("god", "“The Trinity is a contradiction: 1 + 1 + 1 = 3.”",
    "Strawman & Equivocation",
    "It's one What (one divine being) and three Whos (Father, Son, Spirit). “One” and “three” refer to different things.",
    "A contradiction needs the same thing, in the same sense, to be both one and not one. The Trinity says one essence and three persons. It's mysterious, not self-contradictory.",
    "trinity contradiction math three gods 1+1+1", 14);
  q("god", "“Isn't the Trinity just three modes of the same being (Modalism)?”",
    "Strawman",
    "Modalism is a heresy. At Jesus' baptism the Father speaks, the Son is baptized and the Spirit descends, all at once (Matthew 3:16–17).",
    "The Bible shows the three persons interacting at the same time (John 17; Matthew 3). The Son prays to the Father and the Father sends the Spirit. One essence, three distinct persons, no switching masks.",
    "modalism oneness trinity modes sabellius", 14);
  q("god", "“The ontological argument just defines God into existence.”",
    "Straw Man",
    "That's why we use it only as a supplement. The “possible” premise isn't assumed. It's backed by the other axioms.",
    "Kant's “existence isn't a predicate” targets a version of Anselm. Plantinga's modal version is more careful but depends on the possibility of a maximally great being. Say plainly it's a supporting argument.",
    "ontological argument existence predicate kant anselm", 14);
  q("god", "“Brain damage proves there's no soul. The mind is just the brain.”",
    "False Equivalence",
    "Damage to a radio changes the music without proving the music is created by the radio. Correlation isn't identity.",
    "Brain injuries affect how the mind expresses itself, which fits both views. The hard problem remains: no physical description explains first-person experience (Axiom 6). Near-death research is interesting but contested, so don't lean on it.",
    "brain damage soul mind brain dualism near death", 6);
  q("god", "“Religion is a crutch for weak people.”",
    "Ad Hominem & Genetic Fallacy",
    "Why someone believes doesn't decide if it's true. And the first Christians got prison and execution, not comfort.",
    "Atheism could be called a crutch too (no one to answer to). Psychology of belief doesn't touch truth. If Jesus rose, He isn't a crutch; He's the cure.",
    "crutch weak coping comfort psychological", 18);
  q("god", "“Every culture invented gods. It's all man-made.”",
    "Genetic Fallacy",
    "Everyone inventing explanations doesn't show nothing's there. Every culture wondered about the sun, too, and the sun is real.",
    "Universal religious intuition fits what Romans 1:19–20 says. Anthropologist Wilhelm Schmidt argued many cultures started with a high creator-god before the spirits were added. Origins don't settle truth.",
    "every culture invented gods man made religion anthropology", 18);
  q("god", "“Smart people and scientists don't believe in God.”",
    "Appeal to Popularity",
    "About half of US scientists believe in God or a higher power (Pew, 2009). And truth isn't decided by a poll.",
    "Pew (2009): 33% of US scientists believe in God and 18% in a universal spirit or higher power. Newton, Faraday, Maxwell, Lemaître and Collins were believers. Even if few believed, truth isn't a vote.",
    "scientists atheists smart intelligent believe pew", 11);
})();
