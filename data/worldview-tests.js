/* Worldview tests: comebacks for each stress-test step, 7 new stress-test walkthroughs, and 7 new Debate Arena worldviews. */
(function () {
  var Q = window.QT = window.QT || {};

  /* Step-by-step comebacks for the original 8 stress tests (one list per step, in step order). */
  Q.stressBack = {
    atheism: [
      [["The universe just exists, like you say God does.", "God is defined as necessary and beginningless. The universe is contingent and began. They aren't parallel (Axioms 1 and 2)."]],
      [["Quantum events happen with no cause.", "They happen inside a quantum field governed by laws. That isn't nothing."]],
      [["With enough universes, anything happens.", "An unobserved infinity of universes is a bigger leap than one Designer, and the universe-generator still needs tuning."]],
      [["Evolution favors true beliefs.", "Often it favors useful ones. And you're using reason to vouch for reason."]],
      [["Morality evolved to help us cooperate.", "That explains the feeling, not why cruelty is actually wrong."]]
    ],
    agnosticism: [
      [["I'm just not convinced.", "Fair. By what, exactly? Name the strongest piece of evidence you've looked at."]],
      [["Scientists disagree about the beginning.", "They debate models, but the main ones point to a beginning, and Axiom 1 stands either way."]],
      [["Staying neutral is the safest place.", "With stakes this high, not deciding is still a decision."]],
      [["You can't test a resurrection claim.", "Historians test it like any ancient event: by sources, dates and rival explanations."]]
    ],
    islam: [
      [["We're closer than you think.", "Agreed, and that's exactly why who Jesus is matters so much."]],
      [["Tahrif means misreading the text, not changing it.", "Then the text is reliable, and its account of Jesus stands."]],
      [["Allah can make someone look like Jesus.", "God being able to doesn't show it happened. Every early source says it didn't."]],
      [["Three persons means three gods.", "One essence, three persons. Not three beings, not three gods."]],
      [["Allah is merciful, so He'll forgive.", "Then how is justice satisfied? The Cross answers that."]]
    ],
    pantheism: [
      [["Everything is energy.", "Energy is physical and began with the universe. It isn't a mind."]],
      [["God is in everything.", "Being present in everything isn't the same as being everything."]],
      [["The self is an illusion; only awareness is real.", "Then whose awareness is mistaken?"]],
      [["Karma is the universe balancing itself.", "Balancing needs a standard of right. Where does it come from?"]],
      [["I don't need a relationship, just alignment.", "Alignment with what? If it's personal, that is a relationship."]]
    ],
    pluralism: [
      [["I'm not saying all religions are true, just valid.", "Valid for what? If their claims contradict, at most one can be true."]],
      [["The contradictions are only on the surface.", "Was Jesus crucified or not? That isn't surface-level."]],
      [["The elephant parable is only a metaphor.", "Metaphors make claims too. This one claims a view above every religion."]],
      [["Confidence about truth leads to violence.", "Jesus commanded love for enemies. Believing something is true doesn't require violence."]],
      [["Every religion has miracle claims.", "Then compare evidence: early sources, eyewitnesses and enemies' admissions."]]
    ],
    buddhism: [
      [["The Buddha refused to speculate about origins.", "Refusing to answer doesn't make the question go away."]],
      [["Time is cyclical, not linear.", "Cycles add entropy and still need a starting point (Axiom 2)."]],
      [["Karma is a natural law, like gravity.", "Gravity isn't moral. Karma claims to be."]],
      [["Wanting nirvana is a different kind of desire.", "Fair point. The stronger Christian point is that our longing is answered, not erased."]],
      [["Buddhism is about practice, not belief.", "The practice still assumes beliefs about suffering, self and rebirth."]]
    ],
    catholicism: [
      [["Scripture and Tradition go together.", "Then when they differ, which wins? Jesus judged tradition by Scripture (Mark 7:8)."]],
      [["James 2:24 says “not by faith alone.”", "James means faith shown before people. Paul means justified before God (Romans 4:2–3)."]],
      [["The keys passed to Peter's successors.", "Scripture never says the office passes on, and Gregory the Great rejected the title “universal bishop.”"]],
      [["We honor Mary, we don't worship her.", "Then why pray to her? Scripture gives one mediator (1 Timothy 2:5)."]],
      [["The Church gave you the Bible.", "It recognized books already in use. Recognizing isn't creating."]]
    ],
    christianity: [
      [["Our arguments are airtight.", "Strong, not airtight. Saying that is what keeps you credible."]],
      [["Hell isn't fair.", "Christians differ on its nature. All agree God paid so no one has to go."]],
      [["The Bible is full of contradictions.", "Mostly differences in detail. Know the top five answers cold."]],
      [["Faith shouldn't need evidence.", "Biblical faith rests on evidence (1 Corinthians 15:3–8; Acts 1:3)."]],
      [["Other Christians are the enemy.", "Be firm on the gospel and kind to the person."]]
    ]
  };

  /* 7 new stress-test walkthroughs */
  function step(t, ax, q, ask, x, back) { return { t: t, ax: ax, q: q, ask: ask, x: x, back: back }; }
  Q.stressExtra = [
    { id: "judaism", name: "Judaism", gate: 5, ax: [11, 14, 17, 19, 20],
      intro: "You worship the God of Abraham and hold the Hebrew Scriptures. Christians share all of that. The question is the Messiah.",
      steps: [
        step("Shared ground", [11, 14], ["Torah is eternal"], "What would the Messiah have to do to convince me?",
          "Gates 1 to 3 are shared: one personal Creator, distinct from creation. Christians believe the Messiah promised in the Hebrew Scriptures has already come.",
          [["Christians worship three gods.", "Christians confess the Shema (Deuteronomy 6:4) too. One God in three persons, never three gods."]]),
        step("The suffering Servant", [19], ["Isaiah 53 is about Israel"], "Who is the innocent one who suffers for “my people”?",
          "Isaiah 53 describes an innocent Servant who bears others' sins and is “cut off.” The ancient Targum Jonathan reads Isaiah 52:13 as the Messiah.",
          [["Rashi read it as Israel.", "Rashi is medieval. Earlier Jewish readings, and the text's own distinction between the Servant and “my people” (53:8), point to an individual."]]),
        step("The timing", [19], ["Jesus can't be the Messiah"], "If the Messiah had to come before AD 70, who fits?",
          "Daniel 9:26 says the Anointed One is cut off, then the city and sanctuary are destroyed. The Temple fell in AD 70. Daniel's dating and reading are debated, so treat this as support.",
          [["Daniel 9 isn't about the Messiah.", "Many readers, Jewish and Christian, have read it that way. At minimum, ask who was “cut off” before AD 70."]]),
        step("Atonement without a Temple", [20], ["Torah is eternal"], "How is sin atoned for today?",
          "Leviticus 17:11 ties atonement to blood, and there has been no altar since AD 70. The Talmud records the Temple signs ceasing 40 years earlier (Yoma 39b). Hebrews says the final sacrifice has been made.",
          [["Prayer and repentance replaced sacrifice (Hosea 14:2).", "Repentance matters in both faiths. But the Torah's own system required a sacrifice, and Christians say it was fulfilled, not discarded."]])
      ],
      best: ["“Jesus didn't fulfill the Messianic prophecies.”", "He fulfilled the suffering ones (Isaiah 53, Daniel 9:26) in His first coming, and Christians expect the reigning ones when He returns."],
      fair: "Be gentle. Christians have a painful history with the Jewish people, and Jesus, the apostles and the first church were all Jewish." },

    { id: "jw", name: "Jehovah's Witnesses", gate: 4, ax: [14, 15, 16],
      intro: "You honor the Bible and Jesus, and you reject the Trinity. Let's look at the text together.",
      steps: [
        step("John 1:1", [16], ["the Word was a god"], "If Jesus is “a god,” how many gods are there?",
          "The New World Translation's “a god” is rejected by Greek scholars and makes Jesus a second god, against Isaiah 43:10 (“before me no god was formed”).",
          [["There's no article before theos, so it's “a god.”", "The NWT doesn't apply that rule consistently (John 1:6, 18). A predicate noun without the article often describes nature, not “a” one of many."]]),
        step("Creator, not created", [16], ["firstborn of all creation"], "Can the one who made all things be one of the things made?",
          "Colossians 1:16–17 says all things were created through Him and He is before all things. The NWT adds the word “other” (“all other things”), which isn't in the Greek.",
          [["“Firstborn” means created first.", "In Scripture it's a title of rank (Psalm 89:27, where David is “firstborn”), and verse 16 rules out Him being created."]]),
        step("Who gets worship?", [16], ["Jesus never said ‘I am God.’"], "Who may receive worship in Scripture?",
          "Only God may be worshiped (Matthew 4:10), yet the Son is worshiped (Hebrews 1:6; John 20:28). The NWT translates the same Greek word as “obeisance” for Jesus and “worship” for the Father.",
          [["Proskyneō can mean bowing to a king.", "It can. But Thomas's “my Lord and my God” and Revelation 5:13 put the Lamb beside God on the throne."]]),
        step("Failed dates", [15], ["the Word was a god"], "How did the Watchtower handle 1914, 1925 and 1975?",
          "Watchtower publications tied specific expectations to 1914, 1925 and 1975. Deuteronomy 18:22 gives the test for a messenger whose words fail.",
          [["We never claimed to be prophets.", "The organization presents itself as God's appointed channel. A channel whose predictions fail is the issue."]])
      ],
      best: ["“The Trinity isn't in the Bible.”", "The word isn't. The teaching is: one God, and the Father, Son and Spirit each called God (John 1:1; Acts 5:3–4)."],
      fair: "Witnesses are often sincere and courageous. Reading the Bible together slowly is what changes minds." },

    { id: "mormonism", name: "Latter-day Saints (LDS)", gate: 2, ax: [11, 15, 16],
      intro: "You follow Jesus Christ and value family deeply. The differences are about who God is and which scriptures are reliable.",
      steps: [
        step("Was God once a man?", [11], ["Mormons believe in deification"], "Did the Creator have a beginning?",
          "Joseph Smith taught that God was once a man (King Follett Discourse, 1844). A God who became God needs an explanation, and Isaiah 43:10 says no god was formed before or after Him.",
          [["That teaching isn't emphasized today.", "It's still in LDS sources and Lorenzo Snow's couplet. Ask whether the church has ever rejected it."]]),
        step("Which Jesus?", [16], ["Book of Mormon is another testament"], "Is Jesus the eternal Creator, or a spirit child of heavenly parents?",
          "In the Bible, all things were made through Jesus (John 1:3) and He is eternal. LDS teaching makes Him a spirit child and brother of Lucifer. Same name, different person.",
          [["We just mean we're all God's children.", "The question is whether Jesus was created. John 1:3 says nothing that was made was made without Him."]]),
        step("The Book of Mormon's history", [15], ["Book of Mormon is another testament"], "Where is the archaeology of the Nephites?",
          "The Book of Mormon describes large civilizations in the ancient Americas with horses, steel and wheat. Mainstream archaeology and DNA studies haven't confirmed them, while the Bible's places and people keep turning up.",
          [["Absence of evidence isn't evidence of absence.", "For whole cities and centuries of war, some evidence should exist."]]),
        step("Testing a burning in the bosom", [15], ["spiritual but not religious"], "How would I know if a feeling was wrong?",
          "Feelings are real but fallible. Scripture says to test the spirits (1 John 4:1) and examine claims (Acts 17:11). Historical claims should be checked historically.",
          [["The Holy Ghost confirmed it to me.", "People in other faiths report the same certainty about claims that contradict yours. Something beyond feeling has to decide."]])
      ],
      best: ["“The Bible was corrupted, so we need modern revelation.”", "The manuscripts show careful transmission (Axiom 15), and the Book of Mormon quotes the King James Bible, including its translation choices."],
      fair: "Latter-day Saints are often kind and moral people. Start with Jesus, never with mockery." },

    { id: "hinduism", name: "Hinduism", gate: 2, ax: [8, 10, 11, 16, 20],
      intro: "Hinduism is many traditions. Some see all as one (Advaita), others worship a personal God such as Vishnu or Krishna. Both meet the same questions.",
      steps: [
        step("One or many?", [11], ["Which God"], "Are the many gods real beings or faces of one?",
          "If they're real beings, they're finite and need a Creator. If they're faces of one reality, you're closer to one God, and the question becomes who that God is.",
          [["Brahman is beyond one and many.", "Then nothing can be said of it, including that it's beyond. Language needs distinctions (Axiom 8)."]]),
        step("Karma and rebirth", [10], ["Reincarnation explains"], "Who keeps karma fair?",
          "Karma claims moral cause and effect, but an impersonal law can't weigh intentions or forgive, and punishing forgotten past lives teaches nothing.",
          [["Ishvara, God, administers karma.", "Then justice comes from a personal God, and the question is how that God forgives. The gospel answers it."]]),
        step("Avatars and the Incarnation", [16], ["copy of Horus, Mithras"], "Which incarnation is anchored in history?",
          "Krishna's stories come from the Mahabharata and Puranas, with no historical anchor like Jesus' crucifixion under Pilate. Jesus' life sits in datable history (Axioms 16 and 17).",
          [["Jesus was one avatar among many.", "Jesus claimed to be the only way (John 14:6). An avatar who denies the others can't be one of them."]]),
        step("Earned or given?", [20], ["All religions teach"], "Can I pay my own debt?",
          "The paths of works, knowledge and devotion all ask you to reach liberation. The gospel says God reached down and paid it (Ephesians 2:8–9). Bhakti's grace is the closest point, and a great bridge.",
          [["Bhakti already teaches grace.", "Yes, and that's real common ground. The difference is grace with justice satisfied, at the Cross."]])
      ],
      best: ["“All paths lead to the same God.”", "Then Jesus, who said He is the only way, was wrong, and the paths can't all be right."],
      fair: "Hindu traditions are very diverse. Ask which one the person holds before you argue." },

    { id: "deism", name: "Deism", gate: 5, ax: [1, 2, 3, 9, 17],
      intro: "You see a Creator behind the universe but doubt He has ever spoken or acted. You've already passed Gates 1 to 3.",
      steps: [
        step("Shared ground", [1, 2, 3], ["Science has disproved miracles"], "If God made the universe, why couldn't He act in it?",
          "A God able to create space, time and matter can act within them. Miracles aren't broken laws; they're the Lawgiver acting.",
          [["Intervening would mean God made a mistake.", "Not if He made persons and wants to be known. Speaking isn't fixing a mistake."]]),
        step("A silent Creator?", [11], ["why doesn't God appear"], "Would a personal Creator stay silent forever?",
          "A Creator who made minds that seek Him and never speaks is strange. A personal God is likely to reveal Himself, so check the claims that He has.",
          [["Nature is His only revelation.", "Nature shows power and design (Romans 1:20). It doesn't tell you His name or how to be forgiven."]]),
        step("The test case", [17], ["hallucinated", "stole the body"], "What best explains the earliest Easter facts?",
          "The crucifixion, the disciples' sincere appearance experiences, and the conversions of Paul and James. Deism has to explain all of these naturally.",
          [["Miracles are improbable by definition.", "Improbable on naturalism. On theism, which you already hold, God raising Jesus isn't strange."]]),
        step("Morals with no voice", [9], ["Morality comes from evolution"], "Does a silent God give commands?",
          "If God never speaks, morality has a source but no voice. The gospel claims God spoke and showed His character in Jesus.",
          [["Reason is enough for ethics.", "Reason helps, but it needs grounding too, and you've already placed that ground in God."]])
      ],
      best: ["“A perfect God wouldn't need to intervene.”", "He wouldn't need to. He might want to, if He loves the persons He made."],
      fair: "Deists are halfway home. Start from what you agree on." },

    { id: "humanism", name: "Secular Humanism", gate: 1, ax: [6, 7, 9, 20],
      intro: "You value reason, compassion and human dignity. Those are good values. The question is what grounds them.",
      steps: [
        step("Where dignity comes from", [9], ["just as moral"], "Why is a human worth more than any other arrangement of atoms?",
          "Humanists affirm equal dignity, but on naturalism it's hard to say why humans have it. The Image of God grounds it (Genesis 1:27).",
          [["Dignity is something we grant each other.", "Then whoever holds power can withdraw it, and history shows they do."]]),
        step("Trusting reason", [7], ["only path to truth"], "Why trust reason built for survival?",
          "Humanism honors reason, but unguided evolution selects for survival, not truth (Axiom 7, a serious but contested argument).",
          [["Reason works, so it's reliable.", "That it works is what needs explaining. Theism explains it; naturalism assumes it."]]),
        step("Progress and its limits", [20], ["Religion causes most wars"], "Do humans get better without grace?",
          "Secular utopias of the 20th century produced terrible suffering. The Bible's view of humans as both glorious and fallen fits history better.",
          [["Those were dictatorships, not humanism.", "Agreed. The point is human nature, not the label. Without a check on pride, ideals turn cruel."]]),
        step("Meaning", [6], ["Morality comes from evolution"], "Is meaning invented or discovered?",
          "If meaning is invented, it's as fragile as the inventor. If it's discovered, it points beyond nature.",
          [["Meaning is what we make together.", "Then it's a group decision, and groups have decided terrible things."]])
      ],
      best: ["“We can be good without God.”", "Yes, and many humanists are. The question is what makes good real, and why people have the worth you defend."],
      fair: "Humanists often care deeply about justice. Affirm that, then ask about its foundation." },

    { id: "sikhism", name: "Sikhism", gate: 5, ax: [10, 11, 17, 20],
      intro: "You believe in one Creator (Ik Onkar), devotion and service. That's a lot of shared ground.",
      steps: [
        step("One Creator", [11], ["Which God"], "Is God personal, someone I can know?",
          "Sikhism affirms one Creator beyond time, which covers Gates 1 to 3. The question is how that God reveals Himself and forgives.",
          [["God is beyond description.", "Then how do the Gurus describe Him as gracious? Some knowledge is possible, and that's what revelation claims."]]),
        step("Karma and rebirth", [10], ["Reincarnation explains"], "Who makes karma just?",
          "An impersonal cycle can't weigh motives or forgive, and more rebirths don't pay a debt.",
          [["God's grace breaks the cycle.", "Then the question is how that grace is just. The Cross shows a God who pays the debt Himself."]]),
        step("The historical Jesus", [17], ["hallucinated"], "What do I make of the resurrection evidence?",
          "Sikh teaching honors many teachers but doesn't explain the resurrection facts most historians accept.",
          [["Jesus was a holy teacher.", "He claimed far more (Mark 14:62), and His tomb was empty."]]),
        step("Grace that keeps justice", [20], ["All religions teach"], "How is forgiveness both free and just?",
          "Sikhism teaches grace (nadar). The gospel says grace is free because God paid the debt in full.",
          [["We don't need a sacrifice.", "Then wrongs are simply dismissed, and justice isn't done."]])
      ],
      best: ["“All religions lead to the One.”", "Guru Nanak still founded a distinct path, which suggests the paths differ. Test them by evidence."],
      fair: "Sikhs value equality and service. Honor that." }
  ];

  /* 7 new Debate Arena "Test Your Worldview" options */
  function o(t, d, n) { return { t: t, d: d, n: n }; }
  Q.wvExtra = {
    buddhist: { name: "Buddhist", stress: "buddhism", qs: [
      { ax: 1, q: "Why does the cycle of existence exist at all?", o: [
        o("It's beginningless. There's no first cause.", 5, "Consistent with Buddhism. The price: an infinite past runs into the regress and entropy problems (Axioms 1 and 2)."),
        o("The Buddha said that question isn't useful.", 10, "Maybe not useful for practice, but not asking a question doesn't answer it."),
        o("Something must have started it.", 30, "That points to a first cause, which Buddhism generally rejects (Axiom 1).")] },
      { ax: 9, q: "Is karma moral, or just cause and effect?", o: [
        o("Moral: it rewards good and punishes evil.", 20, "Then it needs a standard of good and something that weighs intention (Axiom 9)."),
        o("Just cause and effect, like physics.", 5, "Consistent. The price: then it can't make anything truly right or wrong."),
        o("Somehow both.", 15, "An impersonal law can't be moral without explaining where its morality comes from.")] },
      { ax: 6, q: "Is there a self that gets reborn?", o: [
        o("No self, just a continuing stream.", 0, "Consistent with anatta. The question that remains: who is responsible for past karma? Buddhists answer with the stream, and it's a real debate."),
        o("Yes, my true self is reborn.", 25, "That contradicts anatta, a core Buddhist teaching."),
        o("I'm not sure.", 10, "An honest answer, but rebirth depends on it.")] },
      { ax: 20, q: "Can I reach enlightenment by my own effort?", o: [
        o("Yes, through the Eightfold Path.", 5, "Consistent. The price: those who fail stay bound. The gospel offers grace (Ephesians 2:8–9)."),
        o("Only with help from buddhas and bodhisattvas.", 10, "Then grace matters, which is a step toward the gospel. Pure Land Buddhism goes furthest here."),
        o("Enlightenment isn't really reachable.", 20, "Then the path has no real goal.")] },
      { ax: 17, q: "Did the Buddha rise from the dead?", o: [
        o("No, he entered parinirvana.", 0, "Consistent. The contrast: Jesus' followers claimed He rose, and early sources back that claim (Axiom 17)."),
        o("Resurrection doesn't matter.", 10, "If it happened, it changes everything. Saying it doesn't matter is a decision."),
        o("All teachers' deaths are equal.", 15, "Historically, only one founder's followers proclaimed an empty tomb and appearances in the city where he died.")] }
    ] },
    hindu: { name: "Hindu", stress: "hinduism", qs: [
      { ax: 11, q: "Are the many gods distinct beings, or faces of one reality?", o: [
        o("Distinct beings.", 20, "Then they're finite and need a Creator (Axiom 11)."),
        o("Faces of one Brahman.", 5, "Consistent with Vedanta. The next question: is Brahman personal?"),
        o("Both.", 15, "They can't be distinct beings and the same being in the same sense.")] },
      { ax: 8, q: "Is the world an illusion (maya)?", o: [
        o("Yes, ultimately unreal.", 20, "Then who is deceived? That's Ramanuja's question, from inside Hinduism (Axiom 8)."),
        o("Real, but dependent on God.", 0, "Consistent with Vishishtadvaita, and close to the Christian view of creation."),
        o("It's beyond true and false.", 25, "Saying so uses the distinction between true and false.")] },
      { ax: 10, q: "Is karma fair if no one remembers their past lives?", o: [
        o("Yes, it's perfectly fair.", 20, "Justice needs knowledge of the wrong. Punishment no one understands can't correct (Axiom 10)."),
        o("God (Ishvara) administers it.", 5, "Consistent. Then the question is how God forgives."),
        o("Fairness isn't the point.", 15, "Then karma isn't moral justice.")] },
      { ax: 16, q: "Was Krishna a historical person in the way Jesus was?", o: [
        o("Yes, historically.", 15, "The sources (Mahabharata, Puranas) aren't datable history like the Gospels and the Roman and Jewish sources."),
        o("It doesn't matter whether it's history.", 5, "Consistent with a symbolic reading. The contrast: Jesus' claims rest on history you can check."),
        o("Jesus was another avatar.", 20, "Jesus claimed to be the only way (John 14:6). An avatar can't deny all the others.")] },
      { ax: 20, q: "Is liberation earned or given?", o: [
        o("Earned through works, knowledge or devotion.", 10, "Then those who fall short stay bound."),
        o("Given by God's grace (bhakti).", 0, "Consistent with bhakti, and real common ground. The question is how grace satisfies justice."),
        o("Both equally.", 5, "Then grace isn't fully grace.")] }
    ] },
    jewish: { name: "Jewish", stress: "judaism", qs: [
      { ax: 19, q: "Who is the suffering Servant of Isaiah 53?", o: [
        o("Israel as a nation.", 15, "The Servant suffers for “my people” (53:8) and is innocent (53:9), which is hard to apply to the nation. The ancient Targum Jonathan applied it to the Messiah."),
        o("An individual, perhaps the Messiah.", 5, "Consistent with the Targum. Then the question is who fits."),
        o("I'm not sure.", 5, "Worth a close reading of Isaiah 52:13–53:12.")] },
      { ax: 20, q: "How is sin atoned for without a Temple?", o: [
        o("Prayer and repentance replace sacrifice.", 10, "A real reply (Hosea 14:2). But Leviticus 17:11 ties atonement to blood."),
        o("Atonement will return with a Third Temple.", 10, "Then nearly 2,000 years have passed with no Torah atonement."),
        o("Blood atonement is still required.", 25, "Then what sacrifice has been offered since AD 70?")] },
      { ax: 19, q: "Did the Messiah have to come before the Second Temple fell (Daniel 9:26)?", o: [
        o("Yes.", 20, "Then the Messiah came before AD 70."),
        o("No, Daniel 9 isn't about the Messiah.", 5, "Consistent with many rabbinic readings. The dating and reading of Daniel 9 are debated."),
        o("I don't know.", 5, "Worth studying, because it's a time-stamped claim.")] },
      { ax: 17, q: "What happened to Jesus' body?", o: [
        o("His disciples stole it.", 15, "That earliest reply (Matthew 28:11–15) concedes the tomb was empty, and people don't die for what they know is a lie."),
        o("He was never buried in a known tomb.", 10, "The burial by Joseph of Arimathea is early and multiply attested."),
        o("I haven't looked into it.", 5, "Worth a look, because it's the center of the question.")] },
      { ax: 14, q: "Can God be one with some plurality within God?", o: [
        o("No, God is absolutely one.", 10, "Consistent. But Genesis 1:26 (“let us”) and “echad” as a compound unity (Genesis 2:24) suggest more."),
        o("The Shekhinah and the Word show God's presence in forms.", 0, "Consistent with strands of Jewish thought, and a bridge to John 1."),
        o("I've never thought about it.", 5, "A good place to start: Genesis 18 and Isaiah 48:16.")] }
    ] },
    jw: { name: "Jehovah's Witness", stress: "jw", qs: [
      { ax: 16, q: "Is Jesus “a god” (John 1:1, New World Translation)?", o: [
        o("Yes, a mighty god, not Almighty God.", 20, "Then there are two gods, against Isaiah 43:10."),
        o("He's God's first creation.", 10, "Consistent with Watchtower teaching, but John 1:3 says nothing was made without Him."),
        o("The verse is hard to translate.", 5, "Then check the Greek with scholars outside the Watchtower.")] },
      { ax: 16, q: "Who may receive worship?", o: [
        o("Only Jehovah.", 20, "Then why do the angels worship the Son in Hebrews 1:6?"),
        o("Jesus receives obeisance, not worship.", 5, "Consistent with the NWT, though the same Greek word is used for worshiping God."),
        o("Both the Father and the Son.", 25, "That's the Christian view, outside Watchtower teaching.")] },
      { ax: 15, q: "Did the Watchtower's expectations for 1914, 1925 and 1975 fail?", o: [
        o("No, they were misunderstood.", 10, "Their own publications made specific claims. Read them."),
        o("Yes, but they weren't prophecies.", 10, "Then why trust the organization as God's channel?"),
        o("Yes, and that matters.", 20, "Deuteronomy 18:22 is the test.")] },
      { ax: 14, q: "Is the Holy Spirit a person?", o: [
        o("No, it's God's active force.", 10, "But the Spirit can be lied to (Acts 5:3–4), grieved (Ephesians 4:30) and speaks (Acts 13:2)."),
        o("It's unclear.", 5, "Read Acts 5:3–4 and 13:2 and decide."),
        o("Yes.", 25, "Then you're close to the Trinity.")] },
      { ax: 20, q: "Can you be sure you'll be saved?", o: [
        o("Only if I stay faithful to the organization.", 5, "Consistent. The price: no assurance (compare John 10:28; Romans 8:1)."),
        o("Yes, by faith in Christ.", 20, "That's the Christian gospel, beyond Watchtower teaching."),
        o("Only 144,000 go to heaven anyway.", 5, "Consistent. Revelation 7:9 also shows a great multitude before the throne.")] }
    ] },
    lds: { name: "Latter-day Saint", stress: "mormonism", qs: [
      { ax: 11, q: "Was God the Father once a man?", o: [
        o("Yes, He progressed to godhood.", 20, "Then He needed a God before Him (Axiom 11), and Isaiah 43:10 says none was formed before Him."),
        o("We don't know much about that.", 5, "The teaching is in LDS sources (King Follett Discourse, Lorenzo Snow). Worth checking."),
        o("No, He is eternally God.", 25, "That's the biblical view, against Joseph Smith's King Follett Discourse.")] },
      { ax: 16, q: "Is Jesus the Creator of all things?", o: [
        o("Yes, under the Father.", 10, "Then He's uncreated (John 1:3), not a spirit child."),
        o("He's our elder brother, a spirit child.", 10, "Consistent with LDS teaching, but John 1:3 says nothing made was made without Him."),
        o("He's the eternal God.", 20, "That's the biblical view, beyond LDS teaching.")] },
      { ax: 15, q: "Is there archaeological evidence for the Nephite civilization?", o: [
        o("Yes.", 15, "Mainstream archaeology hasn't confirmed it. Name a site."),
        o("Not yet, but faith comes first.", 5, "Consistent. The price: the Bible's history is checkable in ways this isn't."),
        o("It doesn't matter.", 10, "If it's history, it matters.")] },
      { ax: 15, q: "Why does the Book of Mormon quote the King James Bible, translation choices and all?", o: [
        o("God used familiar language.", 10, "Then why does it copy KJV wording that comes from later manuscripts and translators?"),
        o("I didn't know that.", 5, "Compare 2 Nephi 12–24 with Isaiah 2–14 in the KJV."),
        o("Joseph Smith borrowed it.", 25, "That undercuts the claim of translating an ancient record.")] },
      { ax: 20, q: "Are we saved by grace “after all we can do” (2 Nephi 25:23)?", o: [
        o("Yes, grace after our effort.", 5, "Consistent. The price: you never know if you've done “all you can.”"),
        o("By grace alone, through faith.", 20, "That's Ephesians 2:8–9, which differs from 2 Nephi 25:23."),
        o("Mostly by works.", 15, "Then grace becomes a bonus, not the foundation.")] }
    ] },
    deist: { name: "Deist", stress: "deism", qs: [
      { ax: 1, q: "Did a Creator make the universe?", o: [
        o("Yes.", 0, "Consistent, and shared with Christians (Axioms 1 and 2)."),
        o("Maybe. I'm not sure.", 10, "Then you're closer to agnosticism than deism."),
        o("No.", 40, "Then you're not a deist.")] },
      { ax: 11, q: "Could the Creator act in the world if He wanted to?", o: [
        o("Yes, but He chooses not to.", 10, "How do you know His choice? That's a claim about a God you say never speaks."),
        o("No, that would break natural laws.", 20, "He made the laws. Acting isn't breaking them."),
        o("Yes, and He might have.", 5, "Consistent. Then check the claims that He did.")] },
      { ax: 17, q: "Is the resurrection impossible?", o: [
        o("Yes, miracles don't happen.", 25, "On deism a Creator exists, so miracles aren't impossible."),
        o("Unlikely, but possible.", 5, "Consistent. Then weigh the evidence (Axiom 17)."),
        o("I haven't looked into it.", 5, "Worth it: it's the test case between deism and Christianity.")] },
      { ax: 9, q: "Is morality grounded in the Creator?", o: [
        o("Yes.", 5, "Consistent. Then a moral God who never communicates is strange."),
        o("No, in reason alone.", 15, "Reason needs grounding too, which you've placed in God."),
        o("Morality is human convention.", 20, "That's a materialist view, not a deist one.")] },
      { ax: 11, q: "Would a good Creator speak to the persons He made?", o: [
        o("No, nature is enough.", 10, "Nature shows power, not His name or how to be forgiven."),
        o("Probably, yes.", 15, "Then deism is under strain."),
        o("He did, through reason.", 5, "Consistent. Revelation claims He also spoke in history.")] }
    ] },
    humanist: { name: "Secular Humanist", stress: "humanism", qs: [
      { ax: 9, q: "Do all humans have equal, objective worth?", o: [
        o("Yes, objectively.", 20, "On naturalism, where does objective worth come from? (Axiom 9)"),
        o("Worth is something we agree to give.", 10, "Consistent. The price: whoever holds power can take it away."),
        o("Worth comes from capacities like reason.", 15, "Then people with fewer capacities have less worth, which humanism rejects.")] },
      { ax: 7, q: "Is human reason reliable for finding truth?", o: [
        o("Yes, completely.", 20, "Unguided evolution selects for survival, not truth (Axiom 7)."),
        o("Reliable enough, and science checks it.", 10, "Science also runs on reason. Something still has to ground it."),
        o("Not fully.", 15, "Then humanism's confidence in reason is weaker than it sounds.")] },
      { ax: 9, q: "Is it objectively wrong to oppress the weak?", o: [
        o("Yes.", 20, "Then you hold an objective moral fact. What grounds it?"),
        o("It harms wellbeing, so it's wrong.", 10, "Why is wellbeing the standard? That's assumed, not shown."),
        o("It's wrong by our shared values.", 5, "Consistent. The price: another society's values could approve it.")] },
      { ax: 20, q: "Is humanity getting morally better on its own?", o: [
        o("Yes, progress is steady.", 15, "The 20th century produced the bloodiest regimes in history."),
        o("Sometimes, with setbacks.", 0, "Consistent, and it fits the Christian view of humans as glorious and broken."),
        o("No.", 10, "Then humanist hope needs another source.")] },
      { ax: 6, q: "Is consciousness just brain activity?", o: [
        o("Yes.", 5, "Consistent. The price: the Hard Problem (Axiom 6)."),
        o("We don't know yet.", 5, "Consistent and honest."),
        o("It's more than physical.", 25, "That steps beyond naturalism.")] }
    ] }
  };
})();
