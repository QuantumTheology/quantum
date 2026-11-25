/* Arena data: fallacy quiz, accuracy check, boss battles, memory verses. */
(function () {
  var Q = window.QT = window.QT || {};

  /* Fallacy Spotter: [what the opponent says, the fallacy, why] */
  Q.fallacyPool = [
    "Genetic Fallacy", "Straw Man", "Special Pleading", "Begging the Question", "Ad Hominem", "False Dilemma",
    "Equivocation", "Red Herring", "Self-Refutation", "Appeal to Popularity", "Argument from Ignorance",
    "Moving the Goalposts", "Category Error", "Hasty Generalization", "Appeal to Authority", "Tu Quoque",
    "Slippery Slope", "Post Hoc (False Cause)", "Non Sequitur", "Presentism", "Stolen Concept", "Scientism",
    "False Equivalence", "Invincible Ignorance", "Proof-Texting", "Guilt by Association", "Appeal to Ridicule",
    "Chronological Snobbery", "Argument from Personal Incredulity", "Burden-Shifting"
  ];
  Q.fallacyDefs = {
    "Genetic Fallacy": "Judging a claim by where it came from instead of whether it's true.",
    "Straw Man": "Attacking a distorted version of the other person's view.",
    "Special Pleading": "Applying a rule to others but exempting yourself without a good reason.",
    "Begging the Question": "Assuming the conclusion you're trying to prove.",
    "Ad Hominem": "Attacking the person instead of the argument.",
    "False Dilemma": "Pretending there are only two options when there are more.",
    "Equivocation": "Switching the meaning of a word in the middle of an argument.",
    "Red Herring": "Changing the subject to something irrelevant.",
    "Self-Refutation": "A claim that defeats itself, like “there is no truth.”",
    "Appeal to Popularity": "Saying something is true because many people believe it.",
    "Argument from Ignorance": "Saying something is true because it hasn't been disproved (or false because it hasn't been proved).",
    "Moving the Goalposts": "Changing the standard of proof after it has been met.",
    "Category Error": "Treating something as if it belonged to a category it doesn't.",
    "Hasty Generalization": "Drawing a broad conclusion from too few examples.",
    "Appeal to Authority": "Saying something is true only because an authority said it.",
    "Tu Quoque": "“You too!”: dodging a criticism by pointing at the critic.",
    "Slippery Slope": "Claiming a small step will inevitably lead to a terrible end, without showing why.",
    "Post Hoc (False Cause)": "Assuming that because B followed A, A caused B.",
    "Non Sequitur": "A conclusion that doesn't follow from the premises.",
    "Presentism": "Judging the past by modern standards without understanding its context.",
    "Stolen Concept": "Using an idea while denying what it depends on.",
    "Scientism": "The self-refuting claim that only science can tell us what's true.",
    "False Equivalence": "Treating two different things as the same.",
    "Invincible Ignorance": "Refusing to accept any evidence no matter how strong.",
    "Proof-Texting": "Quoting a verse out of its context to make it say something it doesn't.",
    "Guilt by Association": "Rejecting a claim because of who else believes it.",
    "Appeal to Ridicule": "Mocking a view instead of answering it.",
    "Chronological Snobbery": "Assuming something is wrong because it's old.",
    "Argument from Personal Incredulity": "“I can't imagine it, so it's false.”",
    "Burden-Shifting": "Making a claim and then demanding that others disprove it."
  };
  Q.fallacyQuiz = [
    ["“You only believe in God because your parents raised you that way.”", "Genetic Fallacy", "How you got a belief doesn't decide whether it's true. By that logic atheists are atheists because of how they were raised."],
    ["“Richard Dawkins says religion is a delusion, so it is.”", "Appeal to Authority", "An expert's opinion isn't an argument. What are his reasons, and are they good?"],
    ["“You can't prove God doesn't exist, so He must exist.”", "Argument from Ignorance", "Lack of disproof isn't proof. (Don't use this one yourself.)"],
    ["“Either God stops all evil, or He doesn't exist.”", "False Dilemma", "There's a third option: God has morally good reasons for allowing evil and has acted to defeat it."],
    ["“Christians are hypocrites, so Christianity is false.”", "Ad Hominem", "People failing their teacher doesn't show the teaching is wrong."],
    ["“If everything needs a cause, then God needs a cause.”", "Straw Man", "Nobody argued that everything needs a cause, only things that begin to exist."],
    ["“Hitler was a Christian, so look what Christianity produces.”", "Guilt by Association", "Even if a bad person used a label, that doesn't test the claim. And Hitler's actions contradict Jesus."],
    ["“I accept an invisible multiverse, but an invisible God? That's silly.”", "Special Pleading", "Both are unobserved. You can't accept one and reject the other with no consistent reason."],
    ["“I can't believe a good God would allow this, so there is no God.”", "Argument from Personal Incredulity", "Not being able to imagine a reason isn't proof there isn't one."],
    ["“Only what science can measure is real.”", "Scientism", "That claim can't be measured by science, so it defeats itself."],
    ["“There's no absolute truth.”", "Self-Refutation", "Is that statement absolutely true? If yes, it's false. If no, why believe it?"],
    ["“How can God be good when the Old Testament God killed people? (Also, there's no objective morality.)”", "Stolen Concept", "Using “evil” while denying the standard that makes something evil."],
    ["“The Bible says the earth is flat.”", "Straw Man", "Isaiah 40:22 says “circle of the earth,” and “four corners” is an idiom. That isn't what the Bible teaches."],
    ["“You don't believe in Zeus, so you're a hypocrite for believing in Jesus.”", "False Equivalence", "Zeus has no historical evidence or philosophical case. They aren't the same kind of claim."],
    ["“Most people in my country don't go to church, so Christianity must be false.”", "Appeal to Popularity", "Truth isn't decided by a poll, and the first Christians were a small minority."],
    ["“If prayer worked, hospitals would be empty.”", "Straw Man", "Christians don't claim prayer guarantees outcomes. It's a relationship with a Person, not a vending machine."],
    ["“Your argument is 2,000 years old, so it's wrong.”", "Chronological Snobbery", "Age doesn't determine truth, whether it's Euclid or the Gospels."],
    ["“I prayed once for something and nothing happened, so God isn't real.”", "Hasty Generalization", "One unanswered prayer isn't enough data to conclude anything."],
    ["“After the church grew, the Roman Empire fell. Christianity destroyed Rome.”", "Post Hoc (False Cause)", "Rome fell for many reasons, and happening later doesn't mean caused by."],
    ["“Science will explain the origin of life someday, so I don't need to explain it now.”", "Argument from Ignorance", "A promise of a future explanation isn't an explanation. It's a hope."],
    ["“The Gospels were written by Christians, so you can't trust them.”", "Genetic Fallacy", "Who wrote something doesn't decide whether it's true. Test the claims."],
    ["“You think God is real? Then so is the Flying Spaghetti Monster.”", "False Equivalence", "A noodle monster isn't claimed to be a necessary, uncaused mind, and nobody gives evidence for him."],
    ["“If God created everything, He created evil, so He's evil.”", "Equivocation", "Evil is a corruption of good, not a created thing. “Everything” means things, not privations."],
    ["“Why criticize atheists? Christians had the Crusades!”", "Tu Quoque", "Pointing out someone else's faults doesn't answer the argument."],
    ["“Atheism is just a lack of belief.” (while arguing that God is impossible)", "Moving the Goalposts", "When asked for evidence, the claim shrinks to “no belief.” When arguing, it's a position again."],
    ["“A little religion leads to extremism, then violence. Ban it all.”", "Slippery Slope", "You haven't shown that step A leads to step Z."],
    ["“Either accept evolution or believe the earth is 6,000 years old. Nothing else.”", "False Dilemma", "Christians hold many views of Genesis, and evolution isn't the only question."],
    ["“Even if you showed me evidence, I wouldn't believe it.”", "Invincible Ignorance", "A closed mind isn't a counter-argument."],
    ["“Your God is just a magic sky wizard.”", "Appeal to Ridicule", "Mockery isn't an answer. The case is the beginning, tuning, code and resurrection."],
    ["“Psalm 14:1 says ‘There is no God,’ so the Bible admits it.” (a skeptic's quote)", "Proof-Texting", "The verse says the fool says it in his heart."],
    ["“The Bible allows slavery, so I won't listen to it on morality.”", "Presentism", "Judge the text in its context, and look at what it actually regulates and what its message did."],
    ["“The burden of proof is on you, not me.”", "Burden-Shifting", "Anyone who claims “the universe is eternal” or “life came from non-life” has a burden too."],
    ["“Everything we know comes from the senses, and it's all unreliable. So Christianity is false.”", "Non Sequitur", "Even if true, it wouldn't single out Christianity."],
    ["You ask about the beginning of the universe. “But what about the Crusades?”", "Red Herring", "The Crusades are a separate topic. Come back to the question that was asked."],
    ["“God can't exist because I've never seen Him.”", "Argument from Personal Incredulity", "You haven't seen gravity or logic either. Not seeing isn't disproof."],
    ["“My honest doubts mean Christians are intellectually dishonest.”", "Ad Hominem", "Disagreeing doesn't make someone dishonest."],
    ["“The earliest copies of the Gospels aren't original, so we can't know anything.”", "Non Sequitur", "Not having the originals is true of all ancient history. We use many copies to recover the text."],
    ["“Richard Carrier says Jesus didn't exist, so he didn't.”", "Appeal to Authority", "One fringe authority isn't a consensus. Most historians, believers or not, say Jesus existed."]
  ];

  /* Accuracy check: [claim, verdict (safe|soften|wrong), why / how to say it] */
  Q.accuracy = [
    ["The BGV theorem shows any universe that has on average been expanding has a past boundary.", "safe", "Correct and precise. Say “average expansion” so no one can say you overreached."],
    ["The BGV theorem proves the universe came from nothing.", "wrong", "BGV says nothing about “from nothing.” It shows a past boundary for universes with average expansion."],
    ["The first living cell had 3.2 billion DNA letters.", "wrong", "That's the human genome. The smallest synthetic cell (JCVI-syn3.0) has about 531,000 letters and 473 genes."],
    ["The smallest synthetic cell needs about 531,000 letters of DNA and 473 genes.", "safe", "Correct (Hutchison et al., Science 2016)."],
    ["The 2nd Law of Thermodynamics disproves evolution.", "wrong", "Earth is an open system. Use the 2nd Law only for the universe as a whole (heat death in an eternal past)."],
    ["Bart Ehrman admits the tomb was empty.", "wrong", "He concedes the crucifixion, the disciples' belief that they saw Jesus, and the conversions of Paul and James. He doesn't concede the empty tomb."],
    ["Bart Ehrman accepts that Jesus was crucified and that the disciples sincerely believed they saw him alive.", "safe", "Correct. Both are in his own books."],
    ["All twelve apostles were martyred for their faith.", "soften", "Only a few deaths are well-attested (James, Peter, Paul; plus James the brother of Jesus). Say “several, including James and Peter and Paul.”"],
    ["Jesus fulfilled over 300 prophecies.", "soften", "That number is inflated. Use the 5–6 strongest: Isaiah 53, Psalm 22, Micah 5:2, Zechariah 12:10, Daniel 9."],
    ["The Dead Sea Scrolls prove the New Testament is reliable.", "wrong", "They contain Old Testament books, not the New Testament. They show how accurately Scripture was copied."],
    ["The Great Isaiah Scroll (about 125 BC) contains Isaiah 53.", "safe", "Correct. It predates Jesus by about a century."],
    ["Gödel's theorems prove God exists.", "wrong", "They show limits on formal systems. They don't prove God, so don't use them that way."],
    ["Fine-tuning proves God exists.", "soften", "Say “design is the best explanation of fine-tuning.” Some physicists dispute the probabilities."],
    ["Atheists can't be moral.", "wrong", "They can. The argument is about what grounds morality, not who can act well."],
    ["Atheism can't ground objective morality, even though atheists can be good people.", "safe", "That's the accurate version of Axiom 9."],
    ["Science has proven the universe had a beginning.", "soften", "Say “the best evidence and the BGV theorem point to a beginning.” Don't say “proven.”"],
    ["The Council of Nicaea decided which books are in the Bible.", "wrong", "Nicaea (AD 325) never discussed the canon."],
    ["Most scholars date the Gospel of Thomas to the second century.", "safe", "Correct. It's a Gnostic-era text, not an eyewitness one."],
    ["With 5,800 manuscripts, every verse in the New Testament is certain.", "soften", "The text is extremely well preserved, but Mark 16:9–20 and John 7:53–8:11 are disputed. Be upfront about them."],
    ["Hitler was an atheist.", "soften", "His private views were hostile to Christianity, but it's more accurate to say he used religious language politically and wasn't a Christian disciple."],
    ["Stalin and Mao killed millions, so atheism is false.", "wrong", "That's a Non Sequitur. Bad actors don't disprove a view. Show that the worldview can't ground morality instead."],
    ["Quantum mechanics proves consciousness creates reality.", "wrong", "“Observer” in physics means any interaction. Don't build your case on this."],
    ["Muhammad tried to commit suicide (Bukhari 6982).", "soften", "The report says he was despondent and thought of it, and Muslims note that part is a later addition by al-Zuhri. Present it carefully."],
    ["Most historians accept that Jesus was crucified under Pontius Pilate.", "safe", "Correct, including skeptics like Crossan and Ehrman."],
    ["Josephus' passage on Jesus (Antiquities 18.3.3) is completely authentic as written.", "soften", "Most scholars see an authentic core with some Christian additions. The James passage (20.9.1) is rarely disputed."],
    ["Science proves the earth is exactly 6,000 years old.", "wrong", "Science doesn't say that. Christians hold different views on Genesis' timeline."],
    ["The Septuagint's “parthenos” in Isaiah 7:14 predates Jesus.", "safe", "Correct. It was translated by Jews in the 2nd century BC or earlier."],
    ["The Dead Sea Scroll 4QPs-f contains “they pierced my hands and feet.”", "wrong", "The “pierced/dug” reading is found in the Nahal Hever Psalms scroll. Check before you cite."],
    ["The word “Easter” comes from the goddess Ishtar.", "wrong", "“Easter” is from Old English (Eostre, per Bede). “Ishtar” isn't the source, and the Greek name is Pascha (Passover)."],
    ["Only about 7% of wars in the Encyclopedia of Wars were mainly religious.", "safe", "Correct (Phillips and Axelrod, about 123 of 1,763)."],
    ["David Hume proved miracles are impossible.", "wrong", "His argument assumes the conclusion, and philosophers like John Earman have criticized it."],
    ["Plantinga's EAAN proves naturalism is false.", "soften", "Say “gives serious reason to doubt naturalism plus unguided evolution.” It's respected, not universally accepted."],
    ["Jesus, according to the Gospels, claimed God's name in John 8:58.", "safe", "Correct. He said “before Abraham was, I am,” and they tried to stone Him."],
    ["The New Testament was written centuries after Jesus.", "wrong", "Paul's letters are about 20–25 years after, and the earliest creed is within 3–5 years."],
    ["Evolution and Christianity can't both be true.", "soften", "Christians disagree. Many accept evolution as God's method. Don't make it a gospel issue."],
    ["The Qur'an affirms the Torah and Gospel as being with the Christians of Muhammad's day (5:47).", "safe", "Correct, and it's your strongest point in the Islamic dilemma."]
  ];

  /* Boss battles. s: 2 = strong answer, 1 = weak or incomplete, 0 = loses ground. */
  Q.bosses = [
    { id: "sci", name: "The Science Guy", sub: "Naturalist · knows physics", color: "#a78bfa",
      intro: "He's calm, smart, and he's heard every Christian slogan. Win with accuracy, not volume.",
      rounds: [
        { say: "“I don't need God. Science explains everything.”", opts: [
          { t: "Which experiment showed that only science gives truth? That claim isn't scientific, so it refutes itself.", s: 2, why: "Names the Scientism problem and asks a question instead of attacking." },
          { t: "Science is great, but it can't explain everything.", s: 1, why: "True but empty. You gave no argument for the limit." },
          { t: "Scientists are wrong about almost everything.", s: 0, why: "A Straw Man that costs you credibility." }] },
        { say: "“The universe could be eternal. No beginning, no God.”", opts: [
          { t: "Which model? An eternal past would already be in heat death, and BGV shows expanding universes have a past boundary. Name the model and we'll test it.", s: 2, why: "Specific, accurate, and invites him to name a model." },
          { t: "The Big Bang proves God created the universe.", s: 1, why: "Overclaims. The Big Bang doesn't say who or why." },
          { t: "The Bible says so, so it's true.", s: 0, why: "Circular. He doesn't accept the Bible yet." }] },
        { say: "“Evolution explains everything about life.”", opts: [
          { t: "I accept that it describes change in living things. It doesn't explain the first replicating cell and its code, which comes before selection can start.", s: 2, why: "Accurate and focused on origin of life, not evolution." },
          { t: "We don't know how life started, so God did it.", s: 1, why: "A gaps argument. Add the positive point that codes come from minds." },
          { t: "Evolution violates the 2nd Law.", s: 0, why: "Wrong. Earth is an open system, and he'll win that point." }] },
        { say: "“Morality is just evolved instinct. We don't need God for it.”", opts: [
          { t: "Evolution may explain why we feel moral pressure, not why anything is actually wrong. If it's just instinct, was the Holocaust wrong, or just unpopular?", s: 2, why: "Separates explanation from grounding and asks a hard question." },
          { t: "Atheists can't be moral.", s: 0, why: "False and it loses him. The argument is about grounding, not behavior." },
          { t: "So you think people have no worth?", s: 1, why: "Gets at the issue, but sounds like an accusation. Ask it gently." }] },
        { say: "“You can't prove God. Where's your evidence?”", opts: [
          { t: "Four lines: the universe began, it's fine-tuned, life runs on code, and the earliest creed of the resurrection is within five years. Which premise do you deny, and what does denying it cost?", s: 2, why: "Clear, short, and uses the Premise Challenge." },
          { t: "Faith doesn't need proof.", s: 0, why: "Biblical faith is trust based on evidence (Acts 1:3). You've conceded the point." },
          { t: "Prove that God doesn't exist.", s: 1, why: "Burden-Shifting. Give your positive case first." }] }
      ] },
    { id: "isl", name: "The Respectful Muslim Friend", sub: "Kind · knows the Qur'an", color: "#fbbf77",
      intro: "He's sincere and polite, and loves his faith. Stay gracious, and let the evidence do the work.",
      rounds: [
        { say: "“We both believe in one God. Why complicate it with a Trinity?”", opts: [
          { t: "We agree there's one God. Christians don't teach three gods, but one God in three persons. And the Qur'an's version (God, Jesus and Mary) isn't what Christians believe.", s: 2, why: "Gracious, accurate, and points out a misunderstanding." },
          { t: "God is love, so He needs three persons.", s: 1, why: "Part of the case, but starting there skips shared ground." },
          { t: "You worship a false god.", s: 0, why: "Ad hominem. It ends the conversation." }] },
        { say: "“The Bible has been corrupted.”", opts: [
          { t: "Your book tells people to believe the Gospel in their hands (5:47). Our manuscripts are centuries older than Muhammad. When was it corrupted?", s: 2, why: "Uses his own text and a clear timeline." },
          { t: "No, it wasn't.", s: 1, why: "A bare assertion with no reason." },
          { t: "Your Qur'an was corrupted too.", s: 0, why: "Tu Quoque. It sounds defensive." }] },
        { say: "“Jesus wasn't crucified. God wouldn't let a prophet die like that.”", opts: [
          { t: "That claim comes six centuries later. Tacitus, Josephus and Paul's creed say He was crucified, and skeptic historians agree. What's your source before Muhammad?", s: 2, why: "Strong historical case in one breath." },
          { t: "Jesus predicted it, so it must have happened.", s: 1, why: "He doesn't accept that source yet." },
          { t: "Muhammad was a false prophet.", s: 0, why: "Ad hominem, and it escalates." }] },
        { say: "“Jesus never said He was God.”", opts: [
          { t: "He forgave sins, used God's name in John 8:58, and accepted worship. The leaders tried to stone Him for it. They understood what He meant.", s: 2, why: "Shows how first-century Jews read it." },
          { t: "John 1:1 says the Word was God.", s: 1, why: "True, but he'll say John was corrupted." },
          { t: "Of course He did, just read it.", s: 0, why: "Bare assertion." }] },
        { say: "“Islam is simple: submit and you're safe. Where's your assurance?”", opts: [
          { t: "Mine isn't based on my works but on Christ's finished work (John 19:30; Romans 8:1). I'm not weighing my deeds against His, He paid.", s: 2, why: "Gospel clarity without attacking." },
          { t: "Islam gives no assurance.", s: 1, why: "Partly true, but he'll cite verses that say otherwise." },
          { t: "Islam is a violent religion.", s: 0, why: "Hasty Generalization and it ends the talk." }] }
      ] },
    { id: "ns", name: "The Spiritual Seeker", sub: "New Age · warm and curious", color: "#67e8f9",
      intro: "She's not hostile. She's curious, hurt by church, and fond of the universe. Ask good questions.",
      rounds: [
        { say: "“I'm spiritual, but not religious. I feel connected to the universe.”", opts: [
          { t: "That's real. Is the universe aware of you? If yes, that's a mind, and we should ask who. If not, what's it connecting with?", s: 2, why: "Respectful, and moves her from a feeling to a question." },
          { t: "Feelings can be misleading.", s: 1, why: "True, but cold, and no question." },
          { t: "That's witchcraft and you're going to hell.", s: 0, why: "Harsh and inaccurate. She'll walk away." }] },
        { say: "“All religions lead to the same place.”", opts: [
          { t: "They teach opposite things: one says Jesus is the only way, one says He wasn't crucified, one says there's no God. They can't all be true.", s: 2, why: "Clear, concrete contradiction." },
          { t: "No they don't.", s: 1, why: "No reason offered." },
          { t: "That's a stupid idea.", s: 0, why: "Ad hominem." }] },
        { say: "“My truth is my truth. You have yours.”", opts: [
          { t: "Is it objectively true that there's no objective truth? I'm not asking you to adopt my truth, just to test claims against evidence.", s: 2, why: "Gently exposes the self-refutation." },
          { t: "Truth is truth.", s: 1, why: "A slogan without an argument." },
          { t: "You're lost.", s: 0, why: "Judgmental." }] },
        { say: "“I manifest my reality. The universe responds to my energy.”", opts: [
          { t: "Would that mean people with cancer caused their own illness? Is there a way to test it?", s: 2, why: "Shows the cost of the claim and invites testing." },
          { t: "That's pseudoscience.", s: 1, why: "Correct, but a label isn't an argument." },
          { t: "That's demonic.", s: 0, why: "Overclaim, and it shuts her down." }] },
        { say: "“Why would I need Jesus?”", opts: [
          { t: "Because if there's a real moral law, we've broken it, and a good judge doesn't ignore wrong. Jesus paid for it Himself and rose. You receive it, you don't earn it.", s: 2, why: "Simple gospel with the logic." },
          { t: "Because you'll go to hell.", s: 1, why: "True in part, but it skips the good news." },
          { t: "Because the Bible says so.", s: 0, why: "She doesn't start from the Bible." }] }
      ] },
    { id: "cat", name: "The Catholic Apologist", sub: "Well-read · sincere believer", color: "#f0abfc",
      intro: "He loves Jesus and knows the Church Fathers. The fight is about the gospel and authority, so stay respectful.",
      rounds: [
        { say: "“Jesus founded one Church on Peter, the first pope.”", opts: [
          { t: "Matthew 16 names Peter's confession as the rock, and nothing says it passes to successors. Paul corrected Peter (Galatians 2:11), James led Acts 15, and Peter isn't greeted in Romans 16.", s: 2, why: "Uses Scripture and history together." },
          { t: "That's just Catholic tradition.", s: 1, why: "Dismissive with no argument." },
          { t: "The pope is the antichrist.", s: 0, why: "Inflammatory and unhelpful." }] },
        { say: "“Scripture alone is unbiblical. 2 Thessalonians 2:15 commands tradition.”", opts: [
          { t: "Paul means apostolic teaching, which is now in the New Testament. Jesus condemned traditions that cancel God's word (Mark 7:8). Which tradition can be tested against Scripture?", s: 2, why: "Defines the tradition and applies Jesus' standard." },
          { t: "Tradition is evil.", s: 1, why: "Overstated. Some traditions are good." },
          { t: "The church added things.", s: 0, why: "A vague accusation." }] },
        { say: "“James 2:24 says we're justified by works, not by faith alone.”", opts: [
          { t: "James is about showing faith before others. Paul says Abraham was justified in Genesis 15 before the work in Genesis 22 (Romans 4). Works prove faith, they don't earn it.", s: 2, why: "Harmonizes James and Paul." },
          { t: "Paul and James disagree, so I'll go with Paul.", s: 0, why: "It concedes a contradiction." },
          { t: "James isn't Scripture.", s: 0, why: "Wrong, and ends the talk." }] },
        { say: "“You reject the Church that gave you the Bible. Trent defines the gospel.”", opts: [
          { t: "The church recognized books God's people already used, it didn't create them. And Trent cursed justification by faith alone, which Paul preached (Galatians 1:8–9).", s: 2, why: "Answers the Genetic Fallacy and the Trent problem." },
          { t: "Trent was a Counter-Reformation overreaction.", s: 1, why: "A label, not an argument." },
          { t: "The Catholic Church is the whore of Babylon.", s: 0, why: "Unkind and unhelpful." }] },
        { say: "“Where does Scripture say we can't pray to Mary and the saints?”", opts: [
          { t: "1 Timothy 2:5 says one mediator, Hebrews 4:16 invites direct access, and Deuteronomy 18:11 forbids contacting the dead. No one in Scripture prays to Mary. Asking living believers to pray is biblical (James 5:16).", s: 2, why: "Positive, clear, and fair to the other side." },
          { t: "Mary was a sinner too.", s: 1, why: "Partly true, but unkind." },
          { t: "That's idolatry and you're all going to hell.", s: 0, why: "Unloving." }] }
      ] }
  ];

  /* Scripture memory: references fetched in KJV at runtime. */
  Q.memVerses = [
    "Genesis 1:1", "Genesis 1:27", "Deuteronomy 6:4", "Psalm 19:1", "Psalm 22:16", "Isaiah 43:10", "Isaiah 44:6", "Isaiah 53:5",
    "Micah 5:2", "Matthew 11:28", "Matthew 28:19", "Mark 2:5", "John 1:1", "John 1:14", "John 3:16", "John 8:58", "John 10:30",
    "John 14:6", "John 19:30", "John 20:28", "Acts 4:12", "Acts 17:11", "Romans 1:20", "Romans 3:23", "Romans 3:28", "Romans 5:8",
    "Romans 6:23", "Romans 8:1", "Romans 10:9", "1 Corinthians 15:3", "1 Corinthians 15:4", "Galatians 1:8", "Ephesians 2:8", "Ephesians 2:9",
    "Colossians 1:16", "Titus 2:13", "Hebrews 1:3", "Hebrews 10:10", "1 Timothy 2:5", "2 Timothy 3:16", "1 Peter 3:15", "2 Peter 1:21",
    "2 Peter 3:9", "1 John 4:8"
  ];
})();
