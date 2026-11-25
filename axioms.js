/* S-GUOT 2.0 — the 20 hardened axioms.
   st = how strong the argument really is (so you never overclaim). */
(function () {
  var Q = window.QT = window.QT || {};
  Q.stages = [
    "Stage I · Cosmos, Law & Life",
    "Stage II · Mind, Reason & Morals",
    "Stage III · The Creator Is Personal, Good & Tri-Une",
    "Stage IV · Jesus, History & the Gospel"
  ];
  Q.axioms = [
    { n: 1, stage: 0, b: "cosmos", tag: "Cosmos", st: "Deductive",
      title: "Contingency: the universe needs a necessary ground",
      claim: "Whatever could have failed to exist needs an explanation, and the universe is exactly that kind of thing.",
      prem: [
        "Every contingent thing has an explanation, either in something else or in a being that exists by necessity (Leibniz's Principle of Sufficient Reason).",
        "The universe (all matter, energy, space and time) is contingent: it could have been otherwise, and nothing inside it must exist.",
        "So the universe's explanation lies outside it, in a necessary being that depends on nothing."
      ],
      receipts: "Leibniz (<i>On the Ultimate Origination of Things</i>, 1697), Ibn Sina (necessary vs. possible existence), Aquinas (the Third Way), Alexander Pruss (<i>The Principle of Sufficient Reason</i>, 2006).",
      obj: "“The universe is just a brute fact.” Or Hume and Rowe: “Every member of the universe having a cause doesn't mean the whole universe needs one.”",
      ans: "Rowe's complaint is aimed at an argument you aren't making. The point isn't that each part has a cause so the whole does. The point is that the whole is contingent by its own nature. And “brute fact” has a price: if anything can just exist for no reason, the explanation-seeking that all of science runs on loses its footing.",
      cost: "Special Pleading (the universe gets a free pass God is refused) and an Argument from Ignorance. Denying the principle also saws off the branch science sits on.",
      roast: "“It's just a brute fact” is “because I said so” with a lab coat on." },

    { n: 2, stage: 0, b: "cosmos", tag: "Cosmos", st: "Strong (three independent routes)",
      title: "The beginning: space, time and matter are not past-eternal",
      claim: "The best physics and philosophy say the universe began to exist, so its cause is not physical, spatial or temporal.",
      prem: [
        "Whatever begins to exist has a cause (the Kalam argument).",
        "The universe began to exist. Three routes: (a) the BGV theorem, any universe that has on average been expanding cannot be past-eternal; (b) thermodynamics, an infinitely old universe would already be in heat death; (c) an actual infinite number of past events cannot be completed (Hilbert's Hotel).",
        "So the universe has a cause beyond space, time and matter."
      ],
      receipts: "Borde-Guth-Vilenkin (<i>Physical Review Letters</i>, 2003), Mithani &amp; Vilenkin (2012, “Did the universe have a beginning?”), Clausius &amp; Boltzmann (thermodynamics), Al-Ghazali, William Lane Craig (<i>The Kalam Cosmological Argument</i>).",
      obj: "“BGV doesn't prove a beginning. Quantum gravity, cyclic models or Aguirre–Gratton could avoid it. And quantum events happen without causes.”",
      ans: "Say it precisely: BGV covers any universe with average expansion, and Vilenkin himself says it leaves cosmologists no escape from a beginning in those models. The popular escapes (emergent universe, cyclic) were analyzed by Mithani &amp; Vilenkin and found unstable or incomplete. Quantum events happen inside a quantum field with laws, not out of nothing. And even if physics found a way around a beginning, Axiom 1 still stands.",
      cost: "Argument from Ignorance (“physics will fix it someday”) and Equivocation on “nothing” (a quantum vacuum is not nothing).",
      roast: "“Physics might fix it someday” is a promissory note, not a rebuttal." },

    { n: 3, stage: 0, b: "cosmos", tag: "Cosmos", st: "Strong inference",
      title: "Fine-tuning: the universe is dialed to allow life",
      claim: "The constants and starting conditions of physics sit in a tiny life-permitting range, and design explains that better than chance or necessity.",
      prem: [
        "The constants and initial conditions fall in extremely narrow life-permitting ranges (the cosmological constant to about 1 part in 10^120; Penrose's initial entropy to about 1 in 10^(10^123)).",
        "The options are necessity, chance, or design. Physics gives no reason the constants had to be these values, and chance is vanishingly improbable.",
        "So design is the best explanation."
      ],
      receipts: "Roger Penrose (<i>The Emperor's New Mind</i>), Luke Barnes &amp; Geraint Lewis (<i>A Fortunate Universe</i>, 2016), Robin Collins, Steven Weinberg (cosmological constant), Sean Carroll (Boltzmann-brain problem, 2017).",
      obj: "“Multiverse.” “The anthropic principle.” “Life adapted to the universe, like a puddle fitting its hole.”",
      ans: "Observer selection explains why we see a life-friendly universe, not why one exists (the firing-squad point: surviving doesn't explain why they all missed). A multiverse needs a universe-generator with its own finely tuned laws, has never been observed, and in some models Boltzmann Brains may outnumber real observers, which wrecks trust in our own observations. Be honest that some physicists dispute the probabilities. Present design as the best explanation, not a proof.",
      cost: "Red Herring and Special Pleading (an unobserved infinity of universes accepted without evidence, an unobserved Designer refused).",
      roast: "A trillion invisible universes is still a bigger leap than one Designer." },

    { n: 4, stage: 0, b: "code", tag: "Code", st: "Strong inference",
      title: "Laws describe; they don't create",
      claim: "The laws of physics and mathematics are descriptions of order. Descriptions don't cause anything, so a lawful universe points beyond the laws.",
      prem: [
        "A law of nature describes a regularity. It has no causal power of its own.",
        "So “the laws of physics created the universe” is a category mistake: the laws presuppose a universe to describe.",
        "That the universe obeys elegant mathematics we can discover (Wigner's “unreasonable effectiveness”) is best explained by a rational mind behind both nature and our minds."
      ],
      receipts: "Eugene Wigner (<i>The Unreasonable Effectiveness of Mathematics</i>, 1960), Stephen Hawking (“What breathes fire into the equations?”), Galileo, Kepler and Newton (nature as ordered by a rational Creator), Kurt Gödel (limits of formal systems; do NOT cite Gödel as proof of God).",
      obj: "“Math is a human invention.” “The universe just is mathematical (Tegmark).” “Laws might be necessary.”",
      ans: "If math is only invented, why did it describe the cosmos before humans existed? If the universe is math (Tegmark), you've relocated the question: why this structure and not another, and why does an abstract structure ‘run’? Gödel shows formal systems can't ground themselves, but he doesn't prove God, so don't use him that way.",
      cost: "Reification (treating “the laws” like a person who acts) and Begging the Question.",
      roast: "The rules of Monopoly don't print the money." },

    { n: 5, stage: 0, b: "code", tag: "Code", st: "Strong inference (open research)",
      title: "The origin of life is the origin of information",
      claim: "The first cell required a coded, decoded, self-copying system. Codes of this kind are known to come from minds, and no unguided path is known.",
      prem: [
        "DNA is a code: the link between codons and amino acids is symbolic, not chemically forced. The smallest synthetic cell (JCVI-syn3.0) still needs about 531,000 letters and 473 genes.",
        "Reading the code takes machinery (ribosomes, tRNAs, enzymes) that the code itself builds, so each depends on the other.",
        "Natural selection can't operate until replication already works, so it can't explain the first replicator.",
        "Every known source of codes is a mind, so design is the best current explanation."
      ],
      receipts: "Watson &amp; Crick (1953), Claude Shannon (information theory), John Wheeler (“It from Bit”, 1989), Steven Benner (the “asphalt paradox”), Hutchison et al. (<i>Science</i>, 2016, JCVI-syn3.0), Stephen Meyer (<i>Signature in the Cell</i>).",
      obj: "“RNA world solves it.” “Evolution explains complexity.” “God of the gaps.”",
      ans: "Don't attack evolution. It describes change in living things and has nothing to say about the first replicator. RNA-world work is real and interesting, but it still faces unresolved problems (hydrolysis, tar, chirality, concentration, and the code-decoder circle). The argument isn't “we don't know.” It's a positive inference: every code we've traced comes from a mind. Say “best explanation today,” not “impossible.” NEVER quote 3.2 billion letters for the first cell. That's the human genome and you'll get caught.",
      cost: "Strawman (evolution wasn't the target) and a Magic-Wand Hand-Wave (“it just happened somehow”).",
      roast: "A tornado in a junkyard doesn't build a phone, and it doesn't write the code either." },

    { n: 6, stage: 1, b: "mind", tag: "Mind &amp; Morals", st: "Strong inference",
      title: "Consciousness and aboutness need a mind at the root",
      claim: "Inner experience and thoughts that are about things aren't what you'd expect from mindless matter, but are what you'd expect if ultimate reality is mind.",
      prem: [
        "Consciousness is first-person (what it's like to see red). No third-person physical description has ever derived it (Chalmers' Hard Problem; Nagel's “What Is It Like to Be a Bat?”).",
        "Thoughts have intentionality (aboutness). A chemical state is not intrinsically about anything (Brentano).",
        "Theism predicts minds and meaning; naturalism must treat them as unexplained arrivals."
      ],
      receipts: "David Chalmers (1995), Thomas Nagel (<i>Mind and Cosmos</i>, 2012), Franz Brentano (1874), Roger Scruton (<i>Beauty</i>), J.P. Moreland.",
      obj: "“Illusionism.” “Consciousness emerges from complexity.” “It's just brain activity.”",
      ans: "Illusionism says experience is an illusion, but an illusion needs a subject who is fooled, so the view undercuts itself. “Emergence” names the problem without solving it. Brain activity correlates with experience, but correlation isn't identity. Be fair: this is an argument to the best explanation, and materialists have replies. It's strong, not a proof.",
      cost: "Self-Refutation (illusionism) and Begging the Question (assuming matter must be the whole story).",
      roast: "“Consciousness is an illusion”: who exactly is being fooled?" },

    { n: 7, stage: 1, b: "mind", tag: "Mind &amp; Morals", st: "Strong (contested)",
      title: "Reason: why trust a mind evolution built for survival?",
      claim: "If naturalism and unguided evolution are both true, we lack good reason to trust our reasoning, including the reasoning that led to naturalism.",
      prem: [
        "On naturalism, beliefs are selected for the behavior they cause, not for being true.",
        "So the probability that our faculties are reliable, given naturalism plus evolution, is low or unknowable.",
        "Anyone who sees that has a defeater for all their beliefs, including naturalism itself."
      ],
      receipts: "Alvin Plantinga (<i>Warrant and Proper Function</i>, 1993; <i>Where the Conflict Really Lies</i>, 2011), C.S. Lewis (<i>Miracles</i>), Charles Darwin's own “Horrid doubt” letter (1881).",
      obj: "“Evolution favors true beliefs because true beliefs help you survive.” “That's circular.”",
      ans: "Often a false belief paired with the right behavior survives just fine (Paul Churchland's tiger example: it only matters that you run). Plantinga's point is that truth isn't what selection checks. The argument targets the combination of naturalism and unguided evolution, not evolution alone. Say honestly that philosophers contest it, and don't claim it's proven.",
      cost: "Begging the Question (using reason to assume reason is reliable) and Moving the Goalposts.",
      roast: "Using an accidental monkey brain to prove the brain is reliable is sawing off your own branch." },

    { n: 8, stage: 1, b: "mind", tag: "Mind &amp; Morals", st: "Transcendental (contested)",
      title: "Logic and truth are necessary, universal and not material",
      claim: "The laws of logic are universal, unchanging and immaterial, and that fits a necessary, rational mind far better than they fit blind matter.",
      prem: [
        "The laws of logic (non-contradiction, identity) hold everywhere and always, whether or not anyone thinks them.",
        "They aren't physical objects and aren't made by humans (they'd be true even if no one existed).",
        "Their best ground is a necessary rational mind."
      ],
      receipts: "Aristotle (<i>Metaphysics</i> Book IV), Gottlob Frege (anti-psychologism), Augustine (eternal truths in the divine mind), Greg Bahnsen &amp; Cornelius Van Til (transcendental argument).",
      obj: "“Logic is just a description or a human convention.” “You can't prove logic without using logic.”",
      ans: "A description of what? If of reality, reality's rational structure needs explaining. If a convention, it could be otherwise, but “A is not non-A” can't be. Everyone uses logic; the question is what explains why it applies. And “there's no absolute truth” is itself offered as an absolute truth.",
      cost: "Self-Refutation and Stolen Concept (using logic while denying its foundation).",
      roast: "“There's no absolute truth” is… an absolute truth claim. Gotcha." },

    { n: 9, stage: 1, b: "mind", tag: "Mind &amp; Morals", st: "Strong inference",
      title: "Objective morality: duties and human worth need a foundation",
      claim: "Some things are really wrong (gratuitous cruelty) and people have real worth. Theism grounds that better than naturalism does.",
      prem: [
        "Objective moral facts exist (it's wrong to torture a child for fun, whatever anyone thinks).",
        "Objective moral duties and equal human worth need a ground that is necessary, personal and good.",
        "God's nature is that ground. Blind matter and evolution are not."
      ],
      receipts: "C.S. Lewis (<i>Mere Christianity</i>, <i>The Abolition of Man</i>), Immanuel Kant, J.L. Mackie (argued objective values would be “queer” on atheism, so he denied them), Sharon Street (evolutionary debunking), Jacob Seibert (“Random Pear” illustration), Genesis 1:27 (Imago Dei).",
      obj: "“Atheists can be good.” “Euthyphro: is something good because God says so or does God say so because it's good?” “Secular moral realism exists.”",
      ans: "“Atheists can be good” confuses knowing morality with grounding it (Ignoratio Elenchi). Euthyphro is a False Dilemma: goodness flows from God's unchanging nature, so God neither invents it nor answers to something above Him. Secular realists are respectable, but they posit brute abstract oughts that can't command anyone, and can't say why a person is worth more than a pear. Say: theism explains both duty and worth.",
      cost: "Genetic Fallacy (explaining where moral feelings came from isn't showing they're false) and Stolen Concept when they then call God evil.",
      roast: "Without God you've got rearranged stardust, not rights." },

    { n: 10, stage: 1, b: "mind", tag: "Mind &amp; Morals", st: "Supporting",
      title: "Conscience, guilt and justice: the problem moral law creates",
      claim: "If there's a real moral law, we've all broken it, guilt is real, and justice can't be left unpaid.",
      prem: [
        "Humans everywhere sense a moral law and break it (Romans 2:15; Lewis's “Law of Human Nature”).",
        "If the law is objective, our guilt is objective, not just a feeling.",
        "Justice demands the wrong be dealt with, and either evil goes unpunished or someone must answer for it."
      ],
      receipts: "Immanuel Kant (<i>Critique of Practical Reason</i>, the moral postulate), Romans 2:15, C.S. Lewis (<i>The Abolition of Man</i>), Dostoevsky (<i>The Brothers Karamazov</i>).",
      obj: "“Guilt is just psychology.” “The wish for justice is wishful thinking.”",
      ans: "A wish doesn't prove a judge exists, and you shouldn't claim it does. The point is conditional: if moral law is objective (Axiom 9), then guilt is real and a dead-end universe leaves it unanswered. This axiom sets up the gospel; it isn't a standalone proof.",
      cost: "Genetic Fallacy (explaining guilt's origin isn't denying it) and Ad Hoc dismissal.",
      roast: "If death is lights-out, dictators and martyrs get the same prize: dirt." },

    { n: 11, stage: 2, b: "trinity", tag: "Creator", st: "Strong",
      title: "The Creator is one, personal and free",
      claim: "A timeless, spaceless, uncaused First Cause that produces a temporal universe is best understood as one personal agent who chose to create.",
      prem: [
        "The cause of space and time must be timeless, spaceless, immaterial and uncaused (Axiom 2).",
        "A timeless cause that is a mechanical force would produce its effect from eternity, so a universe that began requires a free choice (Al-Ghazali, Craig).",
        "The converging evidence of mind, morals and law (Axioms 4–10) points the same way.",
        "There's only one ultimate being: two would each be limited by the other, and finite gods are contingent and need their own cause."
      ],
      receipts: "Al-Ghazali (<i>The Incoherence of the Philosophers</i>), William Lane Craig, Aquinas (<i>Summa Contra Gentiles</i>, unity of God), Leibniz (identity of indiscernibles), Isaiah 44:6.",
      obj: "“A timeless being can't choose, since choosing needs time.” “Why one God and not many?”",
      ans: "God's choice isn't an event inside time. It's an eternal intention whose effect begins with time (logical priority, not temporal priority). On the many-gods point, any god who needs a Creator is a creature, so the ultimate cause is a single unconditioned reality. Polytheism isn't a rival Creator, it's a rival list of creatures.",
      cost: "Equivocation (importing “before” into a timeless setting) and a Category Error.",
      roast: "A god who needs a maker isn't the Maker." },

    { n: 12, stage: 2, b: "trinity", tag: "Trinity &amp; Evil", st: "Strong (logical problem answered)",
      title: "Evil and freedom: why a good God allows evil, and what He did about it",
      claim: "Evil doesn't disprove God. It needs God to be called evil, and the Cross is God's answer.",
      prem: [
        "Calling anything evil assumes an objective standard of good (Axiom 9).",
        "Evil is a privation, a corruption of good, like rust on a car or a hole in a shirt (Augustine).",
        "Real love needs real freedom, and a God who can't force free love can allow its abuse (Plantinga's Free Will Defense, which most philosophers, atheists included, now accept answers the logical problem).",
        "In the Cross, God doesn't watch suffering from the sky. He enters it and defeats it (Hebrews 2:14; Revelation 21:4)."
      ],
      receipts: "Augustine (<i>Enchiridion</i>), Alvin Plantinga (<i>God, Freedom, and Evil</i>, 1974), William Rowe (conceded the logical problem has been answered), C.S. Lewis (<i>The Problem of Pain</i>), Romans 8:18.",
      obj: "“What about natural evil, child suffering, animal pain? A good God wouldn't allow it.”",
      ans: "The logical problem is answered. The emotional and evidential problem is harder, and the honest reply is humility (we can't see every reason God has) plus the Cross, which shows God paid personally. Don't pretend there's a neat reason for every tragedy. Do say: no other worldview offers a God who suffers, forgives, and promises to end evil.",
      cost: "Stolen Concept (using “evil” while denying the standard) and Moving the Goalposts when the logical problem falls.",
      roast: "You can't call it evil if nothing's really wrong." },

    { n: 13, stage: 2, b: "trinity", tag: "Trinity &amp; Evil", st: "Best fit (not a deductive proof)",
      title: "Tri-Une love: God was love before He made anyone",
      claim: "If God is essentially loving, love must exist within God before creation, and that fits the Trinity better than a solitary God.",
      prem: [
        "Love is other-directed (the lover gives himself to a beloved).",
        "If God is essentially love (1 John 4:8) and not merely loving after He made creatures, then love existed in God eternally, so God is not a solitary person.",
        "Richard of St. Victor: perfect love isn't turned in on itself, so it shares its love with a third. The Father, Son and Spirit are the eternal society of love.",
        "The specific number three comes from revelation (Matthew 28:19; 2 Corinthians 13:14), and the history (Axioms 15–20) confirms that revelation."
      ],
      receipts: "Augustine (<i>De Trinitate</i>), Richard of St. Victor (<i>De Trinitate</i> Book III), Athanasius, Jonathan Edwards (<i>Dissertation on the End for Which God Created the World</i>), 1 John 4:8, John 17:24.",
      obj: "“God's love can be an eternal attribute without an object (Islam: Al-Wadud).” “Why three, not two or five?”",
      ans: "A capacity to love that waits for creatures to exercise it is a potential, not perfect love. For why three: say plainly that philosophy supports a relational God and revelation gives the number. That's honest and still strong.",
      cost: "Moving the Goalposts (love becomes a “potential” when pressed) and a Category Error (confusing an attribute with its exercise).",
      roast: "A lonely god had to make us to learn how to love. The Tri-Une God didn't." },

    { n: 14, stage: 2, b: "trinity", tag: "Trinity &amp; Evil", st: "Coherence + supplementary",
      title: "The Trinity is coherent, and God needs no maker",
      claim: "One divine being in three persons isn't a contradiction, and a necessary being is the kind of thing that has no cause.",
      prem: [
        "The Trinity is one What (one divine essence) and three Whos (Father, Son, Spirit). “One” and “three” refer to different things (essence and persons), so there's no contradiction. It was never “three gods in one god.”",
        "A necessary being exists in every possible world and so can't have a cause. “Who made God?” asks for a cause of a thing that never began.",
        "A modal ontological argument (Plantinga) adds support: if a maximally great being is possible, it exists. The “possible” premise is strengthened by Axioms 1–13."
      ],
      receipts: "Athanasius, Augustine, Gregory of Nyssa, Alvin Plantinga (<i>The Nature of Necessity</i>), Aquinas (<i>Summa</i> I q.3, divine simplicity), Matthew 28:19.",
      obj: "“Three persons, one God is nonsense.” “The ontological argument just defines God into existence.” “Everything needs a cause, so God does.”",
      ans: "Nobody says everything needs a cause. Things that begin need a cause. The ontological argument is not your strongest, so use it only as a supplement. On the Trinity, the claim is one essence, three persons, no mathematical trick. Anything “like” the Trinity in nature is only an illustration, and illustrations are imperfect.",
      cost: "Strawman (the Trinity isn't “three gods in one god”) and Equivocation on “one.”",
      roast: "“Who made God?” Only things that begin need a maker. That's the point." },

    { n: 15, stage: 3, b: "jesus", tag: "Jesus &amp; History", st: "Historical",
      title: "The New Testament text is reliably transmitted",
      claim: "We can reconstruct the New Testament text with very high confidence, and early copies from across the Mediterranean rule out a secret rewrite.",
      prem: [
        "5,800+ Greek manuscripts, 19,000+ early translations, and huge quotations from early Church writers survive, far more than any other ancient book.",
        "The earliest fragment (P52, John 18) is dated around AD 125 (range 100–175), and the Bodmer and Chester Beatty papyri (P46, P66, P75) are around AD 175–225, with complete Bibles (Vaticanus, Sinaiticus) in the 300s.",
        "Cross-checking these independent lines exposes any later change. Textual critics recover the text with very high confidence, and the differences that remain are mostly spelling and word order."
      ],
      receipts: "Bruce Metzger (<i>The Text of the New Testament</i>), Daniel Wallace (CSNTM), F.F. Bruce (<i>The New Testament Documents</i>), Dead Sea Scrolls (Great Isaiah Scroll, ~125 BC), Bart Ehrman (<i>Misquoting Jesus</i>: concedes the doctrines don't hang on variants).",
      obj: "“400,000 variants!” “It's a game of telephone.” “Mark 16:9–20 and John 7:53–8:11 were added.”",
      ans: "Be upfront: yes, those two passages are later additions, and your own study Bible footnotes say so. No central doctrine rests on them. Most variants are spelling. Telephone is a single whispered chain with no checking; manuscripts are hundreds of independent copies you can compare. And remember: this shows the text was copied accurately, not that it's true. Don't blur those.",
      cost: "False Analogy (telephone) and Cherry-Picking (the 1% of variants that matter, none of which touches core doctrine).",
      roast: "Telephone has one chain. We have 5,800 chains to cross-check." },

    { n: 16, stage: 3, b: "jesus", tag: "Jesus &amp; History", st: "Historical",
      title: "Who Jesus said He was (and when people started saying it)",
      claim: "Jesus claimed to be God in ways first-century Jews understood, and worship of Him as God began immediately, not at Nicaea.",
      prem: [
        "Jesus forgave sins (Mark 2:5–7), used God's name (John 8:58, Exodus 3:14), claimed to sit at God's right hand before the Sanhedrin (Mark 14:62), and accepted worship (Matthew 14:33; John 20:28).",
        "Earliest devotion: Paul's creed (1 Corinthians 15:3–7) comes within 3–5 years of the cross, “Maranatha” (1 Corinthians 16:22), and the Philippians 2 hymn put Jesus in the Shema (1 Corinthians 8:6).",
        "Pliny (AD 112) says Christians sang to Christ “as to a god.”",
        "So the Trilemma's other options (legend, nice teacher) don't fit the earliest evidence."
      ],
      receipts: "C.S. Lewis (<i>Mere Christianity</i>), Larry Hurtado (<i>Lord Jesus Christ</i>), Richard Bauckham (<i>Jesus and the Eyewitnesses</i>; <i>Jesus and the God of Israel</i>), Pliny the Younger (<i>Epistles</i> 10.96), Ignatius (<i>To the Ephesians</i> 18).",
      obj: "“Jesus never said ‘I am God.’” “Deity was invented at Nicaea.” “Lewis's Trilemma ignores ‘Legend.’”",
      ans: "Jesus said it the way a first-century Jew would: using God's name and claiming God's prerogatives, and His enemies picked up stones because they understood. Nicaea didn't vote Jesus into divinity (that was settled in worship long before), it answered Arius. And Legend is closed by the 3–5 year creed and eyewitness-era Gospels.",
      cost: "Argument from Silence (“he never used the exact words”) and Chronological Snobbery.",
      roast: "They picked up stones because they understood exactly what He meant." },

    { n: 17, stage: 3, b: "jesus", tag: "Jesus &amp; History", st: "Strong cumulative case",
      title: "The resurrection: what the data demands",
      claim: "A short list of facts accepted by most historians, even skeptics, is best explained by Jesus rising from the dead.",
      prem: [
        "Jesus was crucified and died (Tacitus, Josephus, Lucian; Crossan calls it as certain as anything in ancient history).",
        "His followers sincerely believed they saw Him alive (the creed in 1 Corinthians 15; Ehrman agrees they believed it).",
        "Paul, an enemy, and James, a skeptic, were transformed (Galatians 1; 1 Corinthians 15:7; Josephus on James).",
        "The tomb was empty (women as first witnesses, public proclamation in Jerusalem, and the enemies' ‘stolen body’ story in Matthew 28:11–15 all concede it).",
        "Rival theories (hallucination, theft, swoon, legend, wrong tomb) each fail at one or more of these facts. The resurrection explains all of them."
      ],
      receipts: "Gary Habermas &amp; Michael Licona (<i>The Case for the Resurrection of Jesus</i>), N.T. Wright (<i>The Resurrection of the Son of God</i>), Bart Ehrman (concedes crucifixion, the disciples' belief, Paul and James), Josephus (<i>Antiquities</i> 20.9.1), 1 Corinthians 15:3–8.",
      obj: "“Hallucination.” “They stole the body.” “Resurrection claims exist in every religion.” “Miracles are impossible (Hume).”",
      ans: "Hallucinations are private, and can't turn a skeptic like James or empty a tomb. Theft makes the disciples liars who died for what they knew was false. Other “resurrections” aren't bodily, aren't early, or aren't historically attested the same way. And Hume's argument assumes the answer: if God exists, miracles aren't impossible. Don't say Ehrman concedes the empty tomb. He doesn't. He concedes the first four and argues for alternatives on the fifth.",
      cost: "Ad Hoc Hypothesis (each rival theory needs extra add-ons to survive) and Begging the Question (Hume).",
      roast: "Liars make terrible martyrs." },

    { n: 18, stage: 3, b: "jesus", tag: "Jesus &amp; History", st: "Supporting (historical)",
      title: "Martyrs and a movement that shouldn't have survived",
      claim: "The first witnesses suffered and died for what they claimed to have personally seen, and the movement exploded inside the city where the execution happened.",
      prem: [
        "People die for false beliefs they were taught, but not for claims about what they saw themselves, if they know they're lying.",
        "Well-attested martyrs: James son of Zebedee (Acts 12:2), James the brother of Jesus (Josephus), Peter and Paul (1 Clement 5; Tacitus on Nero's persecution), Stephen (Acts 7).",
        "Fake messiahs fizzled when their leader died, but Christianity grew roughly 40% per decade (Rodney Stark) in a hostile empire."
      ],
      receipts: "Tacitus (<i>Annals</i> 15.44), Pliny (<i>Epistles</i> 10.96), 1 Clement 5, Josephus (<i>Antiquities</i> 20.9.1), Eusebius (<i>Ecclesiastical History</i>), Rodney Stark (<i>The Rise of Christianity</i>).",
      obj: "“People die for false beliefs all the time. 9/11 hijackers, Heaven's Gate.” “Martyr stories are legend.”",
      ans: "Distinguish secondhand belief from firsthand knowledge. The apostles were in the position to know whether they'd seen Jesus. And don't claim “all twelve apostles were martyred.” Only some deaths are well-attested; the rest is later tradition. Use the strong ones and say so.",
      cost: "False Equivalence (secondhand belief vs. firsthand witness) and Hasty Generalization.",
      roast: "You can die for a lie you believe. You can't die for a lie you made up." },

    { n: 19, stage: 3, b: "jesus", tag: "Jesus &amp; History", st: "Supporting (cumulative)",
      title: "Prophecy and the Temple: a story that points to one Person",
      claim: "A handful of Old Testament texts, copied centuries before Jesus, line up with Him, and the end of the sacrificial system in AD 70 fits what Hebrews says.",
      prem: [
        "The Great Isaiah Scroll (~125 BC) contains Isaiah 53, the Greek Septuagint (3rd–2nd century BC, translated by Jews) has Micah 5:2 and Psalm 22.",
        "Best texts: Isaiah 53 (a suffering Servant who bears sin), Psalm 22 (pierced hands and feet, dividing garments), Micah 5:2 (Bethlehem), Zechariah 12:10 (“they will look on Me whom they have pierced”), Daniel 9:26 (Messiah cut off before the Temple is destroyed).",
        "In AD 70 Rome destroyed the Temple and animal sacrifice ended; the Talmud (Yoma 39b) records the Temple signs ceasing 40 years earlier, and Hebrews 7–10 says Jesus' sacrifice is once for all."
      ],
      receipts: "Dead Sea Scrolls (1QIsa-a; Nahal Hever Psalms scroll for Psalm 22:16, verify the reading before you cite it), Septuagint, Targum Jonathan (reads Isaiah 52:13 as the Messiah), Josephus (<i>Jewish War</i>), Babylonian Talmud (Yoma 39b), Hebrews 7–10.",
      obj: "“Isaiah 53 is Israel.” “Gospel writers shaped the story to fit the prophecies.” “Daniel is dated late.”",
      ans: "Isaiah 53 distinguishes the Servant from “my people” who are healed by his wounds, and ancient Jewish tradition (Targum Jonathan) read it of the Messiah. Jesus can't control his birthplace or how Rome executed him. Don't use the claim of “300 prophecies”: that number is inflated. Use five or six strong ones. Daniel 9's dating is debated, so it's supporting, not a lead.",
      cost: "Special Pleading (rejecting Christian readings that earlier Jewish readers shared) and Moving the Goalposts.",
      roast: "He couldn't have picked his own birthplace or his own execution." },

    { n: 20, stage: 3, b: "jesus", tag: "Jesus &amp; History", st: "Coherence",
      title: "The human condition and the only Savior who fits it",
      claim: "People are both glorious and broken, forgiveness can't just ignore justice, and the gospel meets both needs: God Himself pays.",
      prem: [
        "Humans are made in God's image (worth) and fallen (rebellion). This matches history from Solzhenitsyn's Gulag to every failed utopia (Pascal; Chesterton called Original Sin the one empirically verifiable doctrine).",
        "A good judge doesn't simply wave away wrongdoing, and no creature has the merit to pay a debt against an infinitely holy God.",
        "So the Savior must be fully man (to stand in our place, Hebrews 2:14–17) and fully God (to bear it, John 1:1; 8:58; 10:30), and His resurrection confirms it.",
        "This is by grace through faith alone (Ephesians 2:8–9; Romans 3:28), not rituals, works or a priestly ladder."
      ],
      receipts: "Blaise Pascal (<i>Pensées</i>), G.K. Chesterton (<i>Orthodoxy</i>), Aleksandr Solzhenitsyn (<i>The Gulag Archipelago</i>), Anselm (<i>Cur Deus Homo</i>), Romans 3–5, Ephesians 2:8–9, Hebrews 2 and 10.",
      obj: "“God can just forgive. He doesn't need a sacrifice.” “That's cosmic child abuse.” “Why isn't good works enough?”",
      ans: "A judge who forgives by ignoring the crime is not good. Here the Judge takes the penalty Himself, and the Son went willingly (John 10:18), so “child abuse” misreads the Trinity. And no ladder of works works because the debt is already too big to pay.",
      cost: "Strawman (“divine child abuse”) and False Dilemma (justice or mercy, when the Cross gives both).",
      roast: "Every other religion says climb the ladder. Jesus climbed down." }
  ];
})();
