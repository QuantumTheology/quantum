/* Comebacks: for every argument against a worldview, what they'll say (their strongest real reply) and what you say.
   b = [theySay, youSay] pairs. t = [whatTheyDo, yourMove] tactics. Keyed by the worldview's exact name in worldviews.js. */
(function () {
  var Q = window.QT = window.QT || {};
  var C = Q.comebacks = {};
  function w(name, b, t) { C[name] = { b: b, t: t || [] }; }

  w("Materialism / Atheism", [
    ["Atheism isn't a claim. It's just a lack of belief.", "Then you aren't arguing anything, so you can't say theism is false. The moment you say the universe, life and mind exist without God, that's a claim and it needs support."],
    ["Then who created God?", "Only things that begin need a cause. A necessary, beginningless cause is exactly what the argument concludes, and your view needs an uncaused starting point too (Axiom 1)."],
    ["Science will explain it someday.", "That's a promise, not evidence. Science explains processes inside the universe; it can't explain why there's a universe or laws at all (Axioms 1 and 4)."]
  ], [["Gish gallop: ten objections in one minute so you can't answer any.", "Name it, pick their strongest one, answer it fully, then ask them to defend one premise of their own."]]);

  w("Agnosticism", [
    ["I just don't know, so I don't have to prove anything.", "Fair. But “I don't know” is a reason to investigate, not to stop. Which axiom's premise do you find weakest?"],
    ["The evidence is equal on both sides.", "Then name the evidence on the other side that matches a beginning, fine-tuning and the resurrection appearances (Axioms 2, 3, 17)."],
    ["God is unknowable by nature.", "That's a claim to know something about God, which agnosticism says can't be known. It undercuts itself."]
  ], [["Agreeing with every point but never landing anywhere.", "Ask: “If this were true, what would change for you?” That shows whether it's doubt or avoidance."]]);

  w("Secular Humanism", [
    ["Human dignity is obvious. We don't need God for it.", "Obvious, yes. Grounded, no. On naturalism, why is a human worth more than any other arrangement of atoms? (Axiom 9)"],
    ["Morality is about wellbeing (Sam Harris).", "Why ought we pursue wellbeing? That's assumed, not derived. You still need a source for “ought.”"],
    ["Religion has caused so much harm.", "So has every movement made of humans, including officially atheist regimes. The question is whether the claims are true."]
  ], [["Moral outrage at religion while denying objective morality.", "Agree the outrage is right, then ask what makes it objectively right on their view. That's the Stolen Concept."]]);

  w("Nihilism", [
    ["Nothing matters, so your arguments don't either.", "Then neither does that sentence. If you think it's worth saying, you think something matters."],
    ["I'm just being honest about reality.", "Honesty is a value. A nihilist who values honesty has already left nihilism."],
    ["We create our own meaning.", "That's existentialism, not nihilism, and meaning you invent can be uninvented by anyone. Is that enough to live on?"]
  ], [["Shrugging off every argument with “who cares.”", "Ask what they'd do if someone hurt a person they love. Nobody lives nihilism."]]);

  w("Simulation Theory", [
    ["We're probably in a simulation (Bostrom).", "Bostrom's argument is a three-way possibility, not a proof, and the base reality still needs explaining (Axioms 1 and 2)."],
    ["The simulators could be aliens, not God.", "Then their universe began or didn't, and the question repeats. Eventually you need a necessary first cause."],
    ["It explains fine-tuning without God.", "It concedes fine-tuning needs a mind. You've granted design and only moved the designer."]
  ], [["Using sci-fi to dodge the question.", "Take it seriously, then go one level up: what grounds the simulator's reality?"]]);

  w("Pantheism / Advaita Hinduism", [
    ["Brahman is beyond logic, so contradictions don't apply.", "Then nothing can be said about Brahman, including that it's beyond logic. Words assume logic (Axiom 8)."],
    ["The world is maya, an illusion.", "Then who is deceived? If only Brahman exists, Brahman is deceived, and a perfect being can't be ignorant. That's Ramanuja's objection, from inside Hinduism."],
    ["All paths lead to the same Brahman.", "Then the Christian claim that they don't is a path that's wrong. Pluralism can't avoid choosing."]
  ], [["Quoting experiences of oneness in meditation.", "An experience shows what it feels like, not what's true. Ask how they'd tell a true experience from a mistaken one."]]);

  w("New Age / “Spiritual but not religious”", [
    ["Everyone has their own truth.", "Is that true for everyone? Then it's an objective truth, and the view refutes itself."],
    ["I feel the universe's energy.", "The feeling is real, but it doesn't tell you what's on the other end. Is it a person? Is it good? (1 John 4:1)"],
    ["Jesus was an enlightened master like the Buddha.", "That isn't the Jesus of the earliest sources, who forgave sins and claimed to be the only way (Mark 2:5–7; John 14:6)."]
  ], [["Mixing and matching beliefs as they go.", "Kindly ask which belief they'd drop if two contradicted. That reveals their real standard."]]);

  w("Taoism", [
    ["The Tao can't be named or explained.", "Calling it the source of everything is already a description. Something about it is being claimed."],
    ["Yin and yang show good and evil are both needed.", "Then evil is permanent and necessary. Christianity says evil is a corruption that will end (Axiom 12)."],
    ["It's a way of living, not a theory of origins.", "Then it doesn't answer where everything came from, and something else has to."]
  ], [["Answering hard questions with paradoxes.", "Appreciate the poetry, then ask a plain yes-or-no: did the universe begin?"]]);

  w("Buddhism", [
    ["There's no self, so rebirth is like a flame passed between candles.", "That's their real reply, and it's fair. So press the stronger points: what started the chain (Axiom 1), and what makes karma moral (Axiom 9)?"],
    ["The Buddha said the origin question isn't useful.", "Not asking a question doesn't answer it. The question is still there."],
    ["Karma is just natural cause and effect.", "Then it isn't moral. Cause and effect can't tell right from wrong, or forgive."]
  ], [["Pointing to the benefits of meditation.", "Grant the benefits. Useful isn't the same as true, so ask what is ultimately real."]]);

  w("Jainism", [
    ["The universe is eternal and uncreated.", "An eternal past runs into entropy, the infinite-regress problem and BGV for expanding universes (Axiom 2)."],
    ["We reach liberation by our own discipline.", "Then everyone who falls short is lost. Grace exists because no one climbs high enough (Axiom 20)."],
    ["Non-violence makes us the most ethical religion.", "Non-violence is admirable. Ethics still needs grounding, and it doesn't settle what happened to Jesus."]
  ], [["Pointing to extreme discipline as proof of sincerity.", "Sincerity isn't evidence. Ask which claims they'd be willing to test."]]);

  w("Confucianism", [
    ["It's an ethic, not a religion.", "Then it doesn't answer the big questions, and something else has to."],
    ["Heaven (Tian) gives the moral order.", "If Heaven is personal, that's a step toward theism. If impersonal, it can't command anyone."],
    ["Society shows what works.", "That shows what's useful, not what's right. Societies have approved terrible things."]
  ], [["Shifting to cultural heritage.", "Respect the heritage, then come back to whether the claims are true."]]);

  w("Polytheism / Paganism (Greek, Norse, folk spirits)", [
    ["The gods are powerful beings, not the Creator.", "Then they're creatures too, and the question of the Creator is still open (Axiom 11)."],
    ["Many cultures had gods, so the gods are real.", "Those cultures had different gods with contradictory traits. That shows a human search, not which gods exist."],
    ["Monotheism is just one god short of atheism.", "The argument isn't about counting gods. It's about what explains everything: a single, necessary, uncaused cause."]
  ], [["Using mythology as cultural pride.", "Separate heritage from history: is there evidence these events happened?"]]);

  w("Shinto", [
    ["Kami aren't gods in your sense, just spirits.", "Then they're part of the world, and the question of the world's origin remains."],
    ["Shinto is about gratitude and practice, not belief.", "Then it doesn't make claims about origins, and doesn't compete with an answer to that question."],
    ["Japan's traditions prove its value.", "Value isn't truth. Ask what's true about how the world began."]
  ], [["Answering with ritual instead of reasons.", "Respect the practice, then ask what's real."]]);

  w("Wicca &amp; Witchcraft", [
    ["Wicca is an ancient pre-Christian religion.", "The documented movement starts with Gerald Gardner in the 1950s, drawing on earlier occult writers. Claims of unbroken ancient roots are disputed by historians."],
    ["Magic works. I've seen the results.", "Personal results can be coincidence or confirmation bias. Controlled tests haven't shown it."],
    ["We harm none, so it's good.", "“Harm none” is a moral rule. What makes it binding? (Axiom 9) And Scripture warns against seeking spiritual power apart from God (Deuteronomy 18:10–12)."]
  ], [["Framing any criticism as persecution.", "Make clear you respect the person. You're testing claims, not attacking them."]]);

  w("Mormonism (LDS)", [
    ["We believe in Jesus Christ too.", "LDS teaching makes Jesus a spirit child of heavenly parents and brother of Lucifer. The Bible's Jesus made all things and is eternal (John 1:1–3). Same name, different person."],
    ["The Bible was corrupted, so we need modern revelation.", "The manuscripts show careful transmission (Axiom 15), and the Book of Mormon quotes the King James Bible, including its translation choices."],
    ["Pray about it and you'll feel the burning in the bosom.", "Feelings can be mistaken. Scripture says to test claims (Acts 17:11; 1 John 4:1), and the Book of Mormon's history can be tested."]
  ], [["Polite missionaries leading with family and feelings.", "Be kind, then ask about God once being a man (King Follett Discourse) and Isaiah 43:10."]]);

  w("Zoroastrianism", [
    ["Ahura Mazda defeats evil in the end.", "Then evil isn't an equal power, which is the point. One ultimate, good God is what's left."],
    ["Zoroastrianism influenced Judaism and Christianity.", "Those influence claims are debated and the texts are hard to date. Even shared ideas wouldn't make them false (Genetic Fallacy)."],
    ["Two powers explains evil better.", "Two eternal powers makes evil a real thing forever. Privation explains evil without making it eternal (Axiom 12)."]
  ], [["Pointing to its age.", "Old isn't true. Ask for evidence the revelation happened."]]);

  w("Islam", [
    ["The Bible was corrupted.", "When? Before Muhammad contradicts Qur'an 5:47, and our manuscripts predate him. After contradicts the manuscripts (Axiom 15)."],
    ["Jesus wasn't crucified (4:157).", "Every early source and nearly every historian says he was. A denial written 600 years later has no earlier source (Axiom 17)."],
    ["The Qur'an is perfectly preserved, unlike the Bible.", "Islamic sources record Uthman standardizing it and burning other copies, and early manuscripts show variants. Both books have histories, so compare them fairly."]
  ], [["Reading long lists of Bible “contradictions” (Deedat style).", "Pick one, answer it fully in context, and show a difference isn't a contradiction. Then ask about 4:157."]]);

  w("Rabbinic Judaism", [
    ["Isaiah 53 is about Israel.", "The Servant suffers for “my people” (53:8) and is innocent (53:9). The ancient Targum Jonathan applies the passage to the Messiah."],
    ["Jesus didn't bring world peace or rebuild the Temple.", "The Scriptures describe a suffering Messiah and a reigning one: two roles, two comings. Daniel 9:26 places the Anointed One before the Temple's fall."],
    ["God is one, not a Trinity (Deuteronomy 6:4).", "Christians confess the Shema too. “Echad” can describe a compound unity (Genesis 2:24, “one flesh”). The Trinity is one God, never three."]
  ], [["Pointing to centuries of Christian persecution of Jews.", "Acknowledge it was evil and against Jesus' teaching. Then return to the Messiah question."]]);

  w("Jehovah's Witnesses", [
    ["John 1:1 says “a god” because there's no article.", "The NWT doesn't apply that rule consistently (see John 1:6, 18), and “a god” makes a second god, against Isaiah 43:10. Thomas calls Jesus “my Lord and my God” (John 20:28)."],
    ["The Trinity isn't in the Bible.", "The word isn't. The teaching is: one God (Deuteronomy 6:4), and the Father, the Son (John 1:1) and the Spirit (Acts 5:3–4) are each called God."],
    ["The dates weren't false prophecy, just misunderstanding.", "Watchtower publications tied specific expectations to 1914, 1925 and 1975. Deuteronomy 18:22 is the test for a messenger whose words fail."]
  ], [["Coming with Watchtower literature and avoiding the Greek.", "Ask to read the passage straight from a Bible together, slowly, in context."]]);

  w("Deism", [
    ["God created but doesn't intervene.", "Why would a God who made persons never speak to them? Deism still has to explain the resurrection evidence (Axiom 17)."],
    ["Miracles would break natural laws.", "Laws describe what happens when nothing else acts. The Lawgiver acting isn't a broken law."],
    ["Revelations contradict, so none is trustworthy.", "Contradiction means not all are right, not that none is. Test them: the resurrection is checkable."]
  ], [["Using the Creator argument but stopping there.", "Agree on Gates 1 to 3, then ask why they stop before Gate 5."]]);

  w("Sikhism", [
    ["God's grace forgives us.", "Then how is justice satisfied? Grace with no payment means wrongs just vanish. The Cross is grace that keeps justice (Axiom 20)."],
    ["All religions are paths to one God.", "Then why did Guru Nanak found a distinct path? And paths that contradict can't all be true."],
    ["Rebirth gives everyone more chances.", "Without a judge, karma can't be moral (Axiom 10), and more lifetimes don't pay a debt."]
  ], [["Stressing shared values like service (seva).", "Honor the service, then ask the forgiveness question."]]);

  w("Religious Pluralism (“all paths lead to God”)", [
    ["All religions teach love.", "They share some ethics but contradict on God, sin and salvation, which are the core claims."],
    ["Who are you to say others are wrong?", "The same person who says exclusive religions are wrong. Everyone makes truth claims. The question is evidence."],
    ["God is too big for one religion.", "How do you know that? It's a specific claim about God, which pluralism says nobody can make."]
  ], [["Calling disagreement intolerant.", "Tolerance means respecting people you disagree with, which requires actually disagreeing."]]);

  w("Bahá'í Faith", [
    ["Revelation is progressive.", "Progress adds, it doesn't contradict. Jesus' crucifixion can't be true in one revelation and false in another."],
    ["Bahá'u'lláh fulfilled prophecies.", "Which ones, read in context? Jesus warned of later claimants (Matthew 24:24)."],
    ["The goal is the unity of all religions.", "Unity built on denying what each religion actually teaches isn't unity."]
  ], [["Leading with peace and unity.", "Agree peace is good, then ask whether Jesus died and rose."]]);

  w("Scientology", [
    ["It's based on science (Dianetics).", "Dianetics' claims haven't been confirmed by medical science, and the Xenu cosmology has no evidence."],
    ["It helped me personally.", "Benefits aren't truth. Ask what the evidence for its claims is."],
    ["Other religions ask for money too.", "The gospel is free (Ephesians 2:8–9). Paid levels toward salvation are the opposite of grace."]
  ], [["Avoiding the upper-level (OT) teachings.", "Ask directly what the upper levels teach, and why they're kept hidden."]]);

  /* Islam section: extra comebacks per point */
  Q.islamBack = {
    1: [["Tahrif means misinterpretation, not changing the text.", "Then the text is reliable, and the Gospel's account of Jesus' death and deity stands."],
        ["The Qur'an is the guardian (muhaymin) over earlier books (5:48).", "A guardian over books assumes they're available to check, which supports the dilemma."]],
    2: [["God rescued Jesus, like He rescued other prophets.", "Rescued from what? The earliest sources say He died and rose. God's rescue was resurrection, not a substitute."],
        ["Paul invented the crucifixion story.", "Tacitus and Josephus are non-Christian sources, and Paul's creed came from the Jerusalem eyewitnesses."]],
    3: [["5:116 isn't defining the Trinity, only condemning Mary-worship.", "Then the Qur'an never engages the actual Trinity, and 4:171's “say not three” misses it too."],
        ["Some sects did worship Mary (the Collyridians).", "A tiny fringe group isn't Christianity, and the Qur'an addresses Christians in general."]],
    4: [["Al-Wadud means God's love is eternal.", "An eternal capacity needs an eternal object to be actual love. Only relationship within God gives that."],
        ["God needs nothing, including someone to love.", "Exactly. The Trinity is how God is love without needing creation."]],
    5: [["46:9 only means he didn't know the details of the future.", "Then assurance still rests on deeds being weighed (21:47), while the gospel rests on Christ's finished work."],
        ["Martyrs are guaranteed paradise.", "Assurance through dying in battle is a terrible price. The gospel offers it as a gift."]],
    6: [["The suicide detail is al-Zuhri's later addition.", "Fair, it's disputed, so don't lean on it. The fear at Hira isn't disputed. Test the message by its content."],
        ["Biblical prophets felt fear too.", "True. So set this aside and focus on the evidence for the message."]],
    7: [["“Sister of Aaron” is an honorific, like “daughter of Levi.”", "Possible. Then ask why the Qur'an also names her father Imran (66:12), the name of Moses and Aaron's father."],
        ["These verses are metaphors, not science.", "Then don't claim scientific miracles from the same book."]],
    8: [["The Gospel authors are anonymous.", "The titles are uniform across the manuscripts, and early writers like Papias and Irenaeus named the authors."],
        ["The Gospels were written too late.", "Within the lifetime of eyewitnesses, and Paul's creed dates to within a few years of the cross."]]
  };
})();
