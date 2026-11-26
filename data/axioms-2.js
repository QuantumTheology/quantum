/* S-GUOT axioms 21–50. Same shape as axioms.js. st = honest strength label. */
(function () {
  var Q = window.QT = window.QT || {};
  Q.stages = (Q.stages || []).concat([
    "Stage V · Nature, Life & the Laws (deeper)",
    "Stage VI · Mind, Meaning & Morals (deeper)",
    "Stage VII · Scripture & History (deeper)",
    "Stage VIII · Why Every Rival Falls Short"
  ]);
  var T = { cosmos: "Cosmos", code: "Code", mind: "Mind &amp; Morals", trinity: "Creator &amp; Evil", jesus: "Jesus &amp; History" };
  function a(n, stage, b, st, title, claim, prem, receipts, obj, ans, cost, roast) {
    Q.axioms.push({ n: n, stage: stage, b: b, tag: T[b], st: st, title: title, claim: claim, prem: prem, receipts: receipts, obj: obj, ans: ans, cost: cost, roast: roast });
  }

  /* ---------- Stage V · Nature, Life & the Laws ---------- */
  a(21, 4, "cosmos", "Transcendental (contested)",
    "Science needs a lawful, uniform universe",
    "Every scientific prediction assumes nature will behave tomorrow as it did today. Theism explains why; naturalism has to assume it.",
    ["Science depends on induction: inferring that observed regularities will continue.",
     "Hume showed induction can't be justified from experience alone without arguing in a circle.",
     "A rational Creator who upholds a lawful world (Hebrews 1:3; Colossians 1:17) grounds the expectation that nature stays uniform."],
    "David Hume (<i>An Enquiry Concerning Human Understanding</i>, 1748), Bertrand Russell (<i>The Problems of Philosophy</i>, 1912, the chicken fed every day until it wasn't), Hebrews 1:3, Colossians 1:17.",
    "“Induction has always worked, so it will keep working.”",
    "That uses induction to justify induction, the exact circle Hume pointed out. Fair note: philosophers offer other answers, such as pragmatic justifications, so present this as theism explaining what naturalism has to assume.",
    "Begging the Question (justifying induction by induction).",
    "Russell's chicken trusted the pattern too, right up until the farmer came.");

  a(22, 4, "cosmos", "Historical (supporting)",
    "Modern science grew from faith in a rational Creator",
    "The founders of modern science expected nature to be orderly because they believed a rational God made it.",
    ["Kepler, Galileo, Boyle, Newton, Faraday and Maxwell saw nature as the lawful work of a rational Creator.",
     "That belief drove the search for mathematical laws: an orderly Mind made an orderly world, and gave us minds able to read it.",
     "Science's success fits that expectation, which naturalism inherits without explaining."],
    "Robert Boyle (<i>The Christian Virtuoso</i>, 1690), Isaac Newton (<i>Principia</i>, General Scholium, 1713), Johannes Kepler (commonly quoted as “thinking God's thoughts after Him”), Alfred North Whitehead (<i>Science and the Modern World</i>, 1925), Ronald Numbers, ed. (<i>Galileo Goes to Jail and Other Myths about Science and Religion</i>, 2009).",
    "“Science and religion have always been at war. Look at Galileo.”",
    "Historians of science, including non-Christians, have largely dropped the “warfare” story (Numbers, 2009). Galileo's case mixed politics, personality and Aristotelian science. Be honest: this is historical support, not a proof that God exists.",
    "Hasty Generalization (one case standing in for all of history) and Chronological Snobbery.",
    "The people who invented the lab were praying in it.");

  a(23, 4, "cosmos", "Supporting (debated)",
    "Earth's life-friendly conditions are rare",
    "Complex life needs a long list of conditions at once: the right star, orbit, moon, plate tectonics, magnetic field and more. That stack is hard to get by chance.",
    ["Complex life needs many conditions together: a stable star, an orbit in the habitable zone, a large moon steadying Earth's tilt, plate tectonics, a magnetic field, and giant planets that shield against impacts.",
     "Each is uncommon, and together they may be very rare.",
     "That fits a world prepared for life, and it adds to the fine-tuning of the laws themselves (Axiom 3)."],
    "Peter Ward &amp; Donald Brownlee (<i>Rare Earth: Why Complex Life Is Uncommon in the Universe</i>, 2000; neither argues for God), Guillermo Gonzalez &amp; Jay Richards (<i>The Privileged Planet</i>, 2004).",
    "“There are billions of planets. Some will be like Earth by chance.”",
    "Fair: with enough planets some will be suitable, and the rarity estimates are debated. That's why this is supporting evidence. The deeper point stands: the laws that make any habitable planet possible are themselves fine-tuned (Axiom 3).",
    "Ignoratio Elenchi (answering the local tuning while ignoring the tuning of the laws).",
    "Lots of lottery tickets explains one winner. It doesn't explain who printed the tickets.");

  a(24, 4, "cosmos", "Strong (part of fine-tuning)",
    "The carbon in your body depends on a finely placed resonance",
    "Stars make carbon only because a nuclear energy level sits right where it needs to. Hoyle predicted it before it was found.",
    ["Carbon forms in stars when three helium nuclei combine (the triple-alpha process).",
     "That only works efficiently because carbon-12 has an energy level, the Hoyle state at about 7.65 MeV, right where it's needed.",
     "Hoyle predicted it in 1953 from the fact that carbon-based life exists, and experiment confirmed it. Shift the forces slightly and the universe runs short of carbon."],
    "Fred Hoyle (1953 prediction, confirmed by Ward Whaling's team at Caltech the same year), Epelbaum et al. (<i>Physical Review Letters</i>, 2013, on how sensitive it is to the light quark masses), Fred Hoyle (<i>Engineering and Science</i>, 1981).",
    "“The Hoyle state isn't as finely tuned as people claim.”",
    "Studies disagree on exactly how sensitive it is, so don't overstate the number. But Hoyle, an atheist at the time, said the facts suggested a superintellect had monkeyed with physics. Use it as a concrete example inside Axiom 3.",
    "Moving the Goalposts if every example of tuning is dismissed one at a time.",
    "Even the atheist who found it said it looked rigged.");

  a(25, 4, "code", "Supporting",
    "The genetic code is built to resist errors",
    "Of the many possible genetic codes, ours is one of the best at limiting the damage from copying mistakes.",
    ["The genetic code maps 64 codons to 20 amino acids and stop signals.",
     "Compared with random alternative codes, ours ranks near the top at minimizing the harm of mutations: about one in a million, by Freeland and Hurst's measure.",
     "Error-resistant coding is the kind of optimization we associate with engineering."],
    "Stephen Freeland &amp; Laurence Hurst (“The Genetic Code Is One in a Million,” <i>Journal of Molecular Evolution</i>, 1998), Francis Crick (the “frozen accident” hypothesis, 1968).",
    "“The code evolved toward optimality through natural selection.”",
    "That's a real proposal, and researchers debate it. But selection needs a working replicating system first (Axiom 5), and changing a code in use scrambles everything already written in it, which is why Crick called the code a “frozen accident.”",
    "Magic-Wand Hand-Waving (evolving a code without explaining how life survived the change).",
    "One in a million isn't luck. It's craftsmanship.");

  a(26, 4, "code", "Contested",
    "Working proteins are rare among possible sequences",
    "Most possible amino acid sequences don't fold into anything useful, which makes finding new functional proteins by blind search very hard.",
    ["A protein is a chain of amino acids that must fold into a precise shape to work.",
     "Douglas Axe estimated that about 1 in 10^77 sequences of a 150-residue domain would fold into a working form (2004).",
     "If that's even roughly right, blind search is hopeless, and an intelligent source is the better explanation."],
    "Douglas Axe (<i>Journal of Molecular Biology</i>, 2004), Anthony Keefe &amp; Jack Szostak (<i>Nature</i>, 2001: about 1 in 10^11 random sequences bound ATP).",
    "“Keefe and Szostak found functional proteins at about 1 in 10^11, far more common than Axe says.”",
    "Be upfront: the estimates differ enormously and depend on what counts as “functional.” Binding ATP isn't the same as a folded working enzyme. This is a live scientific dispute, so use it as support, never as your lead.",
    "Cherry-Picking, if either side quotes only the number it likes.",
    "Random typing gets you a word now and then. A working chapter is another story.");

  a(27, 4, "code", "Strong inference (open research)",
    "Life has only ever been observed to come from life",
    "Every living thing ever observed came from a living parent. Spontaneous generation was tested and failed.",
    ["Pasteur's swan-neck flask experiments (1859–1862) showed life doesn't arise spontaneously in sterile broth.",
     "No experiment since has produced a living cell from non-living chemicals.",
     "A first origin of life outside all observed experience needs a cause adequate to it, and a mind is a known cause of coded systems (Axiom 5)."],
    "Louis Pasteur (Sorbonne lecture, 1864: spontaneous generation would never recover from “the mortal blow of this simple experiment”), Rudolf Virchow (“omnis cellula e cellula,” every cell from a cell, 1855).",
    "“Pasteur only showed life doesn't arise quickly in broth. Origin-of-life research is about millions of years in special conditions.”",
    "That's fair, so don't claim Pasteur disproved abiogenesis. The honest claim is narrower: every observation shows life from life, and the research hasn't produced a cell. The burden is on the claim that has never been observed.",
    "Argument from Ignorance in reverse (treating an unobserved process as established).",
    "Every cell you've ever met had a parent.");

  /* ---------- Stage VI · Mind, Meaning & Morals ---------- */
  a(28, 5, "mind", "Strong inference (contested)",
    "Real choice and responsibility need more than physics",
    "We can't live without believing our choices are real, and naturalism struggles to make room for them.",
    ["If everything we do is fixed by physical causes outside our control, we never could have done otherwise.",
     "Moral responsibility, praise, blame and rational deliberation all assume we could have.",
     "Theism, with minds as real agents made in God's image (Deuteronomy 30:19), makes room for genuine choice."],
    "Sam Harris (<i>Free Will</i>, 2012, argues free will is an illusion), Peter van Inwagen (<i>An Essay on Free Will</i>, 1983, the Consequence Argument), C.S. Lewis (<i>Miracles</i>, 1947), Deuteronomy 30:19.",
    "“Compatibilism: free will just means acting on your own desires, even if those desires are determined.”",
    "Many philosophers hold compatibilism, so be fair. But if your desires are themselves fixed by prior causes you never chose, it's hard to see how you deserve blame. Even Sam Harris concludes free will is an illusion on naturalism.",
    "Equivocation on “free” (redefining the word to keep it).",
    "Nobody argues with a vending machine for being wrong.");

  a(29, 5, "mind", "Supporting",
    "Most professional philosophers accept objective morality",
    "Objective moral facts aren't a fringe religious idea. Most philosophers accept them, which supports the first premise of Axiom 9.",
    ["The 2020 PhilPapers survey found about 62% of philosophers accept moral realism.",
     "So “there are objective moral facts” is the mainstream view, not special pleading.",
     "The remaining question is what grounds those facts, which is where Axiom 9 does its work."],
    "David Bourget &amp; David Chalmers (“Philosophers on Philosophy: The 2020 PhilPapers Survey,” <i>Philosophers' Imprint</i>, 2023).",
    "“Most of those realists are atheists, so realism doesn't need God.”",
    "True, many are secular realists. That's why Axiom 9 is about grounding, not about whether atheists believe in morals. They accept the facts; theism explains them.",
    "Ignoratio Elenchi (switching from what grounds morals to who believes in them).",
    "Even the experts agree some things are really wrong. The question is who wrote the rule.");

  a(30, 5, "mind", "Historical",
    "Human rights grew from the Bible's view of persons",
    "The idea that every human has equal, inviolable worth came into the West largely through Jewish and Christian teaching.",
    ["Genesis 1:27 says every human is made in God's image, and Galatians 3:28 says all are one in Christ.",
     "Historians trace natural rights and equal dignity through medieval Christian canon law and theology.",
     "Secular thinkers acknowledge the debt: Habermas called egalitarian universalism a direct legacy of the Judaic ethic of justice and the Christian ethic of love."],
    "Brian Tierney (<i>The Idea of Natural Rights</i>, 1997), Tom Holland (<i>Dominion</i>, 2019), Larry Siedentop (<i>Inventing the Individual</i>, 2014), Jürgen Habermas (<i>Time of Transitions</i>, 2006).",
    "“Christians also defended slavery and oppression.”",
    "Some did, to their shame, and other Christians led abolition (Wilberforce, Frederick Douglass). The point is where the idea of equal worth came from, not whether everyone lived up to it.",
    "Genetic Fallacy in reverse (judging an idea by the people who betrayed it).",
    "You can't borrow the Bible's idea of human worth and then call the Bible its enemy.");

  a(31, 5, "mind", "Supporting",
    "We long for something nothing in this world satisfies",
    "Our natural desires match real objects. A desire nothing earthly can satisfy points beyond the earthly.",
    ["Natural desires correspond to real things: hunger to food, thirst to water, loneliness to friendship.",
     "People everywhere show a longing for meaning, permanence and perfect love that nothing in this world fully meets (Ecclesiastes 3:11).",
     "That longing is best explained if we were made for something, or Someone, beyond this world."],
    "C.S. Lewis (<i>Mere Christianity</i>, Book 3, ch. 10: “If I find in myself a desire which no experience in this world can satisfy, the most probable explanation is that I was made for another world.”), Augustine (<i>Confessions</i> I.1), Ecclesiastes 3:11.",
    "“Wanting something doesn't make it exist. I want a million dollars.”",
    "Right, specific wishes don't prove their objects. The argument is about natural, universal desires, which in every other case have real objects. Present it as a pointer, not a proof.",
    "Straw Man (treating a natural longing like a random wish).",
    "You're never hungry for a food that doesn't exist.");

  a(32, 5, "mind", "Supporting (contested)",
    "You are one subject, not a pile of parts",
    "Your experience is unified: one “I” sees, hears and thinks at once. Matter divides into parts; your self doesn't divide that way.",
    ["Your brain is billions of separate cells, but your experience is one field from one point of view.",
     "How separate physical parts produce one subject of experience (the “binding problem”) remains unsolved.",
     "A mind or soul that is more than its parts explains the unity better (Axiom 6)."],
    "Immanuel Kant (the unity of apperception), Richard Swinburne (<i>Mind, Brain, and Free Will</i>, 2013), J.P. Moreland (<i>The Soul</i>, 2014).",
    "“Split-brain cases show the self can be divided.”",
    "Split-brain research is complex and its interpretation is debated, and even there each side reports a unified experience. Be honest that this is contested and use it as support for Axiom 6.",
    "Hasty Generalization from rare surgical cases.",
    "A thousand musicians aren't one person hearing the song.");

  a(33, 5, "mind", "Existential (supporting)",
    "No one can live as if nothing matters",
    "If there's no God, life has no objective meaning, yet nobody can actually live that way.",
    ["On atheism the universe has no purpose and ends in heat death (Axiom 2).",
     "Atheist thinkers admit it: Camus called suicide the one truly serious philosophical problem, and Russell said a life could only be built on “the firm foundation of unyielding despair.”",
     "Humans can't consistently live with that conclusion, which suggests it isn't the truth about us (Ecclesiastes 1–2)."],
    "Albert Camus (<i>The Myth of Sisyphus</i>, 1942), Bertrand Russell (“A Free Man's Worship,” 1903), William Lane Craig (<i>Reasonable Faith</i>, “The Absurdity of Life without God”), Ecclesiastes 1–2.",
    "“That's an appeal to consequences. A meaningless life would be sad, not false.”",
    "Fair, a sad conclusion isn't automatically false. The point is that a worldview nobody can consistently live is one its own holders don't believe in practice. That's evidence, not proof.",
    "Performative contradiction (living as if meaning is real while denying it).",
    "Everybody's a nihilist until someone steals their phone.");

  a(34, 5, "mind", "Supporting",
    "Billions report encountering God",
    "Experience of the divine shows up in every culture and era. Unless there's good reason to doubt it, that testimony counts as evidence.",
    ["Religious experience is found across cultures and history (Romans 1:19–20).",
     "We normally trust experience unless we have a specific reason not to (Swinburne's principle of credulity).",
     "So widespread experience of God is evidence God exists, though every experience must still be tested (1 John 4:1)."],
    "William James (<i>The Varieties of Religious Experience</i>, 1902), Richard Swinburne (<i>The Existence of God</i>, 2nd ed. 2004), William Alston (<i>Perceiving God</i>, 1991).",
    "“People experience contradictory gods, so experience proves nothing.”",
    "Good point, and that's why experience is supporting evidence and why its content has to be tested against reason and history. A sense of the divine fits theism; which God is settled by Axioms 15–20.",
    "Hasty Generalization (because some experiences are mistaken, all must be).",
    "Some people misread the map. That doesn't mean there's no city.");

  a(35, 5, "mind", "Supporting",
    "Beauty is real, and it goes far beyond survival",
    "Mathematical elegance, music and natural beauty go far beyond what survival needs, and fit a world made by an Artist.",
    ["We experience beauty as real: some things are truly beautiful, not just preferred.",
     "Much of it, like the elegance of physical laws or a Bach fugue, does nothing for survival.",
     "Beauty is expected if the world comes from a Mind who delights in it (Psalm 19:1)."],
    "Roger Scruton (<i>Beauty</i>, 2009), Paul Dirac (argued it's more important for equations to be beautiful than to fit experiment, <i>Scientific American</i>, 1963), G.H. Hardy (<i>A Mathematician's Apology</i>, 1940: “Beauty is the first test”), Psalm 19:1.",
    "“Beauty is just evolved preference: fertile landscapes, healthy faces.”",
    "Some preferences fit that story. It doesn't explain why the deepest laws of physics are beautiful, or why physicists use beauty as a guide to truth.",
    "Genetic Fallacy (explaining where a perception came from isn't showing it's false).",
    "Survival needs food. It doesn't need Bach.");

  /* ---------- Stage VII · Scripture & History ---------- */
  a(36, 6, "jesus", "Historical (strong)",
    "The Gospels include details no one would invent",
    "The Gospels record things that embarrassed the early church. Historians treat that as a strong sign the events really happened.",
    ["Historians use the criterion of embarrassment: authors don't invent details that hurt their own cause.",
     "The Gospels report women as the first witnesses of the empty tomb when women's testimony carried little legal weight, Peter's denial, the disciples' cowardice, Jesus' family thinking He was out of His mind (Mark 3:21), and His crucifixion, a death under God's curse (Deuteronomy 21:23).",
     "These are best explained by writers reporting what actually happened."],
    "John P. Meier (<i>A Marginal Jew</i>, vol. 1, 1991), Bart Ehrman (<i>Jesus: Apocalyptic Prophet of the New Millennium</i>, 1999), Josephus (<i>Antiquities</i> 4.219 on women's testimony), 1 Corinthians 1:23.",
    "“Mark invented the women to explain why nobody heard about the empty tomb earlier.”",
    "Then why make women, whose testimony was discounted, the key witnesses, and name them? An inventor would choose Peter or John. Skeptical scholars use this criterion too.",
    "Ad Hoc Hypothesis (inventing a motive with no evidence).",
    "If you're making it up, you don't make your heroes look like cowards.");

  a(37, 6, "jesus", "Historical",
    "The names in the Gospels fit the exact time and place",
    "The personal names in the Gospels match the name frequencies of Jewish Palestine at the time, which is hard to fake from far away.",
    ["Tal Ilan compiled a lexicon of about 3,000 Jewish names from Palestine between 330 BC and AD 200.",
     "The Gospels match its frequencies: Simon and Joseph most common, then names like Lazarus, Judas and John. The writers add qualifiers to common names (“Simon Peter,” “Simon the Zealot”) exactly where they'd be needed.",
     "Later writers inventing stories far away wouldn't get this right, and the later apocryphal gospels don't show the same fit."],
    "Tal Ilan (<i>Lexicon of Jewish Names in Late Antiquity, Part I</i>, 2002), Richard Bauckham (<i>Jesus and the Eyewitnesses</i>, 2006; 2nd ed. 2017).",
    "“Writers just used common names, so this proves nothing.”",
    "Getting the frequencies, and the need for qualifiers, right for one region and century is what you'd expect from sources close to the events, and what later fiction tends to miss.",
    "Hasty Generalization (assuming accurate details are easy to fake).",
    "Fake stories get the names wrong. These got the statistics right.");

  a(38, 6, "jesus", "Historical",
    "Luke gets the small details right",
    "Acts names officials, titles, places and routes that archaeology has confirmed. A careless or late writer wouldn't.",
    ["Acts uses the correct local titles: “politarchs” in Thessalonica (Acts 17:6), a proconsul in Cyprus (Sergius Paulus, Acts 13:7) and in Achaia (Gallio, Acts 18:12).",
     "Colin Hemer catalogued 84 details in Acts 13–28 confirmed by historical and archaeological research.",
     "Someone that careful with small details is likely careful with big ones (Luke 1:1–4)."],
    "Colin Hemer (<i>The Book of Acts in the Setting of Hellenistic History</i>, 1989), William Ramsay (<i>St. Paul the Traveller and the Roman Citizen</i>, 1895), the Delphi (Gallio) inscription, the Thessalonica politarch inscriptions.",
    "“Accurate geography doesn't make miracles true. Novels have real places in them.”",
    "True, so don't overclaim. It shows Luke was a careful historian close to the events, which raises the credibility of what he reports, including the eyewitness claims.",
    "Moving the Goalposts if every confirmed detail is waved off as irrelevant.",
    "A historian who gets 84 small details right earns a hearing on the big one.");

  a(39, 6, "jesus", "Supporting",
    "The Gospels interlock like independent witnesses",
    "One Gospel often explains a detail in another without seeming to mean to, which is what you'd expect from true accounts told independently.",
    ["Example: in John 6:5 Jesus asks Philip where to buy bread for the crowd. Why Philip? John 1:44 and 12:21 show Philip was from Bethsaida, and Luke 9:10 places the feeding near Bethsaida.",
     "Dozens of small fits like this run across the Gospels and Acts.",
     "They're hard to fake, and best explained by writers drawing on real events."],
    "J.J. Blunt (<i>Undesigned Coincidences in the Writings Both of the Old and New Testament</i>, 1847), Lydia McGrew (<i>Hidden in Plain View</i>, 2017).",
    "“You can find patterns in anything if you look hard enough.”",
    "Some proposed examples are weak, so pick the strongest. The best cases are specific, unforced, and only make sense together.",
    "Hasty Generalization (dismissing every case because some are weak).",
    "Liars rehearse their stories. Witnesses fill in each other's gaps without trying.");

  a(40, 6, "jesus", "Historical",
    "The Old Testament was copied with remarkable care",
    "The Dead Sea Scrolls let us compare copies made about 1,000 years apart. The text stayed remarkably stable.",
    ["Before 1947, the oldest complete Hebrew Bible manuscripts dated to about AD 1000 (the Masoretic Text).",
     "The Great Isaiah Scroll (about 125 BC) is about 1,000 years older and matches the later text very closely, with differences mostly in spelling.",
     "That shows careful scribal transmission, and supports the reliability of the Scriptures Jesus quoted."],
    "The Great Isaiah Scroll (1QIsa-a), the Leningrad Codex (AD 1008), Emanuel Tov (<i>Textual Criticism of the Hebrew Bible</i>), Millar Burrows (<i>The Dead Sea Scrolls</i>, 1955).",
    "“Other Dead Sea Scrolls show different versions of books like Jeremiah.”",
    "True, and say so: some books circulated in more than one edition, and Jeremiah has a shorter form. Isaiah shows how faithfully the text was usually copied, and no variant changes core teaching.",
    "Cherry-Picking (focusing on variants while ignoring overall stability).",
    "A thousand years of copying, and the spelling changed more than the message.");

  a(41, 6, "jesus", "Historical",
    "Jesus is reported by many independent sources",
    "Jesus' life and death are attested by several independent streams, which is more than most ancient figures get.",
    ["Christian sources: Paul's letters (AD 50s), Mark, material unique to Matthew and to Luke, the shared sayings tradition, and John.",
     "Non-Christian sources: Josephus (about AD 93), Pliny (about AD 112), Tacitus (about AD 116), and a hostile reference in the Babylonian Talmud (Sanhedrin 43a).",
     "Historians treat multiple independent attestation as a strong sign of authenticity."],
    "Bart Ehrman (<i>Did Jesus Exist?</i>, 2012), Robert Van Voorst (<i>Jesus Outside the New Testament</i>, 2000), Josephus (<i>Antiquities</i> 18.3.3; 20.9.1), Tacitus (<i>Annals</i> 15.44).",
    "“The Christian sources are biased, and the others are late.”",
    "Every ancient source has a viewpoint. The Christian sources are early, and the hostile ones confirm the outline. Alexander the Great's earliest surviving biographies were written centuries after him, and historians still use them.",
    "Special Pleading (holding Jesus to a standard no other ancient figure meets).",
    "Throw out Jesus and you have to throw out most of ancient history with Him.");

  a(42, 6, "jesus", "Historical",
    "No first-century Jew would invent a crucified Messiah",
    "A crucified Messiah contradicted Jewish expectation and embarrassed Romans. The movement only makes sense if something convinced its followers He was vindicated.",
    ["Jews expected a triumphant Messiah, and Deuteronomy 21:23 said anyone hung on a tree was under God's curse.",
     "Paul admits the message was “a stumbling block to Jews and folly to Gentiles” (1 Corinthians 1:23).",
     "Yet the church proclaimed exactly that, in Jerusalem, within weeks. Something had to explain the reversal: the resurrection (Axiom 17)."],
    "N.T. Wright (<i>The Resurrection of the Son of God</i>, 2003), Martin Hengel (<i>Crucifixion</i>, 1977), the Alexamenos graffito (Rome, about AD 200, mocking a Christian for worshiping a crucified figure).",
    "“They reinterpreted Scripture to cope with their leader's death.”",
    "Other first-century messianic movements simply ended when their leader was killed, and Josephus records several. Only this one claimed its leader rose bodily, and it grew because of that claim.",
    "Ad Hoc Hypothesis (a coping story with no parallel among the other movements).",
    "Nobody markets a hero by saying the government nailed him to a cross. Unless he got up.");

  a(43, 6, "jesus", "Historical",
    "Paul's letters are early, and even skeptics accept them",
    "Seven of Paul's letters are accepted as genuine by nearly all scholars, and they were written within about 20–25 years of the cross.",
    ["Romans, 1 and 2 Corinthians, Galatians, Philippians, 1 Thessalonians and Philemon are accepted as authentic across the field.",
     "They date to about AD 48–57 and already call Jesus Lord, describe His death and resurrection, and quote earlier creeds and hymns (1 Corinthians 15:3–7; Philippians 2:6–11).",
     "So the core of Christian belief is documented within living memory of the events."],
    "Bart Ehrman (<i>The New Testament: A Historical Introduction to the Early Christian Writings</i>), James D.G. Dunn (<i>The Theology of Paul the Apostle</i>, 1998), Larry Hurtado (<i>Lord Jesus Christ</i>, 2003).",
    "“Paul never met the earthly Jesus.”",
    "True, and he says so. But he met Peter and James, the eyewitnesses (Galatians 1:18–19), and passed on what he received from them.",
    "Genetic Fallacy (dismissing testimony by its route instead of its content).",
    "Twenty years after the cross, the creed was already being recited. That's not a legend, that's a memo.");

  /* ---------- Stage VIII · Why Every Rival Falls Short ---------- */
  a(44, 7, "jesus", "Historical method",
    "Earlier evidence beats later claims",
    "When a later source contradicts earlier, closer ones, historians side with the earlier sources unless there's strong reason not to.",
    ["Historians weigh sources by how close they are to the events, in time and place.",
     "The Qur'an (7th century), the Book of Mormon (1830), the Bahá'í writings (19th century) and the Gnostic gospels (2nd century onward) all contradict first-century sources about Jesus.",
     "So their claims about Jesus carry less weight than the early sources they contradict."],
    "Standard historical method (see Bart Ehrman, <i>The New Testament: A Historical Introduction</i>), Qur'an 4:157, 1 Corinthians 15:3–7, Tacitus (<i>Annals</i> 15.44).",
    "“Our revelation came straight from God, so it doesn't need early sources.”",
    "Then it's a claim of revelation against the historical evidence, and the historical evidence is all on one side. A revelation that contradicts the earliest facts has to explain why God let the first witnesses be wrong.",
    "Special Pleading (exempting your source from rules applied to every other source).",
    "Six hundred years later isn't a fresh take. It's a rumor with a long delay.");

  a(45, 7, "mind", "Deductive",
    "Contradictory religions can't all be true",
    "Religions make claims that directly contradict each other, so at most one of each pair can be true.",
    ["The law of non-contradiction: a claim and its denial can't both be true in the same sense.",
     "Religions contradict on core facts: Jesus was crucified (Christianity and historians) or wasn't (Qur'an 4:157); there is a personal Creator (Christianity, Islam, Judaism) or not (Buddhism, Jainism); salvation comes by grace or by works.",
     "So religious pluralism fails, and the real question is which claims the evidence supports."],
    "Aristotle (<i>Metaphysics</i> IV), Harold Netland (<i>Dissonant Voices</i>, 1991), John 14:6, Qur'an 4:157.",
    "“Religions are poetry, not literal claims, so they don't really contradict.”",
    "Their own followers don't treat them that way: Muslims really deny the crucifixion, and Christians really affirm it. Reducing every religion to poetry is itself a new worldview that contradicts them all.",
    "Equivocation (redefining religious claims so they can't conflict).",
    "“He died” and “he didn't die” can't both be true. That isn't intolerance, it's arithmetic.");

  a(46, 7, "jesus", "Historical comparison",
    "Only one founder's followers claimed He rose, and backed it up",
    "The founders of the major religions died and stayed dead, by their followers' own accounts. Only Jesus' followers proclaimed a bodily resurrection, with early, public evidence.",
    ["The deaths of Muhammad, the Buddha, Confucius and Joseph Smith are recorded by their own followers with no resurrection claimed.",
     "Jesus' followers proclaimed His resurrection in Jerusalem within weeks, naming witnesses (1 Corinthians 15:3–8).",
     "If the resurrection happened, Jesus' claims carry an authority no other founder's do (Romans 1:4)."],
    "Ibn Ishaq (<i>Sirat Rasul Allah</i>, on Muhammad's death in Medina), the Mahaparinibbana Sutta (on the Buddha's death), Gary Habermas &amp; Michael Licona (<i>The Case for the Resurrection of Jesus</i>, 2004).",
    "“Other religions never claimed a resurrection, so it isn't their standard.”",
    "Fair. The point isn't that they failed a test they never set. It's that Christianity set itself the hardest possible test (1 Corinthians 15:14), and the evidence fits.",
    "Ignoratio Elenchi (answering a comparison that wasn't the argument).",
    "Every other founder's followers tell you where he lies. Jesus' followers tell you where He isn't.");

  a(47, 7, "trinity", "Moral reasoning",
    "Good works can't erase a moral debt",
    "Doing good tomorrow doesn't undo wrong done today. Every works-based system leaves the debt unpaid.",
    ["You already owe good behavior every day, so it can't also pay off past wrongs, the way a speeding driver can't cancel a ticket by driving legally afterward.",
     "Islam (Qur'an 21:47), karma-based faiths, and LDS teaching (“after all we can do,” 2 Nephi 25:23) ask you to outweigh or work off your wrongs.",
     "Only a substitute who pays the debt satisfies justice and gives grace (Romans 3:26; Axiom 20)."],
    "Anselm (<i>Cur Deus Homo</i>, 1098), Romans 3:20–26, Galatians 2:16, Ephesians 2:8–9.",
    "“A merciful God can just forgive whoever He likes.”",
    "Then justice is ignored, and wrongs simply don't matter. A good judge doesn't dismiss crimes because he likes the defendant. The Cross is mercy that doesn't cancel justice.",
    "False Dilemma (justice or mercy, when the Cross gives both).",
    "You can't pay last month's rent with this month's rent.");

  a(48, 7, "trinity", "Strong inference",
    "Persons don't come from something impersonal",
    "If ultimate reality is an impersonal force (the Tao, Brahman, energy, “the universe”), it can't explain why persons, minds and love exist.",
    ["Effects need adequate causes: a cause can't give what it doesn't have.",
     "Persons have minds, wills, moral awareness and love.",
     "An impersonal ultimate can't account for them, while a personal Creator can (Axioms 6 and 11; Genesis 1:26–27)."],
    "Thomas Aquinas (<i>Summa Theologiae</i> I, q.4, a.2: the perfections of effects pre-exist in their cause), Francis Schaeffer (<i>He Is There and He Is Not Silent</i>, 1972), Genesis 1:26–27.",
    "“Emergence: new properties arise from simpler parts all the time. Water is wet; hydrogen isn't.”",
    "Wetness is a physical property built from physical parts. Consciousness and moral obligation are different in kind, and “emergence” names the gap without filling it (Axiom 6).",
    "Equivocation on “emergence.”",
    "Static doesn't compose symphonies, and a force doesn't fall in love.");

  a(49, 7, "trinity", "Comparative",
    "Every rival handles evil worse",
    "Evil is hard for every worldview. Christianity is the only one where evil is real, judged, and personally suffered by God Himself.",
    ["Atheism can't call anything objectively evil (Axiom 9).",
     "Karma-based religions imply suffering is deserved from past lives, which blames victims, and pantheism makes evil part of God.",
     "Christianity says evil is real, opposed by God, and defeated by God suffering on the Cross and promising to end it (Revelation 21:4)."],
    "Augustine (<i>Confessions</i> VII), John Stott (<i>The Cross of Christ</i>, 1986), Alvin Plantinga (<i>God, Freedom, and Evil</i>, 1974), Revelation 21:4.",
    "“Christianity's God still allowed evil. That's worse.”",
    "He allowed freedom, then entered the suffering Himself. Compare the alternatives: no God at all (no justice), karma (you deserved it), or a God who never suffers. Which is better news for someone in pain?",
    "Tu Quoque, if they ignore their own worldview's answer to evil.",
    "Atheism says pain means nothing. Karma says you earned it. Jesus says, “I'll carry it with you.”");

  a(50, 7, "jesus", "Coherence + historical",
    "Christianity can be falsified, and it hasn't been",
    "Christianity stakes everything on one public, historical event. If it didn't happen, the faith collapses. That's the opposite of an untestable myth.",
    ["Paul writes: “if Christ has not been raised, your faith is futile” (1 Corinthians 15:17).",
     "The resurrection was proclaimed in the city where Jesus was buried, while His enemies could check, and the evidence still points to it (Axioms 17, 18 and 42).",
     "A faith that invites the test and survives it stands on firmer ground than one that can't be tested."],
    "1 Corinthians 15:12–19, Karl Popper (falsifiability, <i>The Logic of Scientific Discovery</i>, 1959), Gary Habermas (minimal-facts research), N.T. Wright (<i>The Resurrection of the Son of God</i>, 2003).",
    "“You can't falsify an event from 2,000 years ago.”",
    "Historians test ancient events all the time. Produce the body, show the witnesses never made the claim, or offer a better explanation of the facts. Two thousand years of critics haven't.",
    "Moving the Goalposts (demanding a standard of proof no history could meet).",
    "Christianity put its neck on the block. Two thousand years later, the neck's still there.");

  /* Admissions from the other side for the new axioms */
  function c(ax, who, role, q, text, src, use) { (Q.concessions = Q.concessions || []).push({ ax: ax, who: who, role: role, q: q, text: text, src: src, use: use }); }
  c(25, "Stephen Freeland &amp; Laurence Hurst", "Evolutionary biologists", false,
    "Found that the standard genetic code minimizes errors better than all but about one in a million random alternative codes. They attribute it to natural selection.",
    "Journal of Molecular Evolution (1998)",
    "Grant their explanation is selection. The optimization itself is the admitted fact.");
  c(28, "Sam Harris", "Neuroscientist, atheist", false,
    "Argues that free will is an illusion, because our thoughts and choices arise from prior causes we don't control.",
    "Free Will (2012)",
    "On atheism, even its champions concede real choice disappears.");
  c(30, "Jürgen Habermas", "Philosopher, secular", false,
    "Described egalitarian universalism, the root of modern ideas of freedom and solidarity, as the direct legacy of the Judaic ethic of justice and the Christian ethic of love.",
    "Time of Transitions (2006)",
    "One of the most influential secular philosophers credits the Bible for human rights.");
  c(33, "Bertrand Russell", "Philosopher, atheist", true,
    "Only on the firm foundation of unyielding despair, can the soul's habitation henceforth be safely built.",
    "“A Free Man's Worship” (1903)",
    "An honest atheist admits where atheism leads. Ask if they can live there.");
})();
