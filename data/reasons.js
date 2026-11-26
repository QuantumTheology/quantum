/* Numbered reasons each worldview fails, tied to axioms. [title, detail, axioms]. Keyed by exact worldview name. */
(function () {
  var Q = window.QT = window.QT || {};
  var R = Q.reasons = {};
  function r(name, list) { R[name] = list; }

  r("Materialism / Atheism", [
    ["Can't explain why anything exists", "A contingent universe needs an explanation outside itself, and matter can't be its own.", "1"],
    ["Can't explain the beginning", "Space, time and matter began, so their cause isn't made of them.", "2"],
    ["Can't explain the tuning or the code of life", "Finely set constants and an error-resistant genetic code are what design predicts.", "3, 5, 24, 25"],
    ["Undercuts its own reasoning and choices", "If minds are survival machines with no real choice, trust in reason and responsibility collapses.", "7, 28"],
    ["Can't ground right, wrong or human worth", "Most philosophers accept objective morals, but blind matter can't make anything binding.", "9, 29, 30"]
  ]);
  r("Agnosticism", [
    ["Neutral in theory, decided in practice", "Everyone lives as if God exists or doesn't. Not deciding is still a decision.", "33"],
    ["The evidence isn't missing", "A beginning, fine-tuning and the resurrection facts are all on the table.", "2, 3, 17"],
    ["“Unknowable” claims too much", "Saying God can't be known is itself a claim to know something about God.", "8"],
    ["Longing and experience point somewhere", "Universal desire for the transcendent and widespread experience of God are data, not noise.", "31, 34"]
  ]);
  r("Secular Humanism", [
    ["Borrows a dignity it can't ground", "Equal human worth came from the Image of God, and naturalism can't supply it.", "9, 30"],
    ["Trusts a reason it can't justify", "Unguided evolution and uniform laws are assumed, not explained.", "7, 21"],
    ["Optimism about human nature clashes with history", "The bloodiest regimes in history were secular utopian projects.", "20"],
    ["No answer to guilt or death", "It has no forgiveness for real guilt and no hope past the grave.", "10, 33"]
  ]);
  r("Nihilism", [
    ["Refutes itself", "“Nothing matters” is offered as if it matters to be right.", "8"],
    ["Unlivable", "No one can consistently live as if nothing is valuable.", "33"],
    ["Denies moral facts almost everyone sees", "Most people, and most philosophers, accept that some things are really wrong.", "29"],
    ["Can't explain why there's anything to be meaningless", "The existence of a universe still needs an explanation.", "1"]
  ]);
  r("Simulation Theory", [
    ["Moves the question up a level", "The simulators' world began or didn't, and needs explaining too.", "1, 2"],
    ["Concedes design", "It admits our world's order came from a mind, then hides the mind.", "3, 5"],
    ["Untestable", "No evidence could confirm it, so it can't compete with evidence-based answers.", "50"],
    ["Still needs a first Mind", "Every chain of designers ends in an uncaused, personal source.", "11, 48"]
  ]);
  r("Pantheism / Advaita Hinduism", [
    ["An unchanging God can't be a changing universe", "The universe began and decays; the ultimate reality can't.", "2, 11"],
    ["If all is one, who is deceived?", "Illusion needs someone mistaken, which a perfect Brahman can't be.", "8"],
    ["Evil becomes part of God", "If everything is divine, so is cruelty.", "12, 49"],
    ["Persons can't come from an impersonal Absolute", "Minds and love need a personal source.", "48"],
    ["Karma has no judge", "Impersonal cause and effect can't weigh motives or forgive.", "10"]
  ]);
  r("New Age / “Spiritual but not religious”", [
    ["“My truth” refutes itself", "Relativism claims to be true for everyone.", "8, 45"],
    ["Energy isn't a person", "An impersonal force can't hear, love or guide.", "48"],
    ["Feelings need testing", "A spiritual experience shows what it felt like, not what is true.", "34"],
    ["No historical revelation", "It offers no checkable event, unlike the resurrection.", "15, 17"]
  ]);
  r("Taoism", [
    ["An impersonal Way can't explain a beginning", "Something that began needs a cause, not a pattern.", "1, 2"],
    ["Can't ground objective morality", "A Way that can't command can't make anything truly wrong.", "9"],
    ["Makes evil necessary", "Yin and yang make evil a permanent part of reality.", "12, 49"],
    ["Persons from the impersonal", "Minds don't come from what has no mind.", "48"]
  ]);
  r("Buddhism", [
    ["No answer to why anything exists", "Setting the question aside doesn't answer it.", "1"],
    ["An endless past of rebirths", "An infinite chain of past events can't be completed.", "2"],
    ["Karma has no judge", "Cause and effect alone can't make anything moral.", "9, 10"],
    ["Salvation by self-effort", "Effort can't pay off a moral debt.", "47"],
    ["Its founder stayed dead", "The Buddha's followers record his death with no resurrection.", "46"]
  ]);
  r("Jainism", [
    ["An eternal universe meets a beginning", "Entropy and the BGV theorem point to a start.", "2"],
    ["Liberation by extreme self-effort", "The strictest ladder still can't pay a debt.", "47"],
    ["Karma as a substance", "Physical particles can't carry moral weight or intention.", "9, 48"],
    ["No Creator to ground the moral law", "A law with no Lawgiver can't bind anyone.", "9"]
  ]);
  r("Confucianism", [
    ["Ethics with no Lawgiver", "It commands virtue but can't say why virtue binds.", "9"],
    ["Silent on origins", "It doesn't explain why there is a universe.", "1, 2"],
    ["No forgiveness for failure", "It sets the standard and offers no grace when you miss it.", "10, 47"],
    ["Society can't be the standard", "Societies have approved terrible things.", "29"]
  ]);
  r("Polytheism / Paganism (Greek, Norse, folk spirits)", [
    ["Finite gods need a Creator", "Gods inside the universe are creatures, not its cause.", "1, 11"],
    ["Many can't all be ultimate", "Rival ultimates limit each other.", "11, 14"],
    ["Myths, not history", "No early, independent sources show these events happened.", "41, 44"],
    ["Gods who behave badly can't ground morality", "A standard has to come from a perfectly good source.", "9"]
  ]);
  r("Shinto", [
    ["Spirits within nature can't create nature", "Kami are part of the world, not its origin.", "1, 11"],
    ["Silent on the beginning", "It doesn't explain why the world began.", "2"],
    ["No moral Lawgiver", "Purity rituals don't make anything truly right or wrong.", "9"],
    ["No historical revelation", "It offers nothing comparable to the early, public resurrection evidence.", "44"]
  ]);
  r("Wicca &amp; Witchcraft", [
    ["Recent origin presented as ancient", "The documented movement dates to the 1950s.", "44"],
    ["Finite deities can't create or command", "A god and goddess inside nature can't ground the universe or morality.", "9, 11"],
    ["“Harm none” needs a source", "A moral rule needs someone with the authority to make it binding.", "9"],
    ["Experience isn't verification", "Spells and spiritual feelings haven't passed controlled tests.", "34"]
  ]);
  r("Mormonism (LDS)", [
    ["A God who became God needs a God", "An exalted man isn't the uncaused Creator.", "1, 11"],
    ["Jesus becomes a created being", "The Bible's Jesus made all things (John 1:3).", "16"],
    ["No archaeological confirmation", "Nephite cities and wars have left no confirmed trace.", "15, 38"],
    ["Copies the King James Bible", "An ancient record shouldn't contain a 1611 translation's wording.", "15, 44"],
    ["Grace “after all we can do”", "Grace that waits on your effort can't pay the debt.", "20, 47"]
  ]);
  r("Zoroastrianism", [
    ["Evil isn't an equal power", "Evil is a corruption of good, not a rival god.", "12"],
    ["A limited God isn't the Creator", "A God in a contest isn't the unlimited source of all.", "11, 14"],
    ["Late, hard-to-date texts", "Its scriptures can't match the early sources behind the New Testament.", "44"],
    ["Its founder stayed dead", "No resurrection is claimed for Zoroaster.", "46"]
  ]);
  r("Islam", [
    ["Denies the best-attested fact about Jesus", "Every early source and nearly every historian affirms the crucifixion that Qur'an 4:157 denies.", "17, 44"],
    ["Affirms a Bible that contradicts it", "The Qur'an points Christians to the Gospel (5:47), whose text predates Muhammad.", "15"],
    ["Misdescribes the Trinity", "It argues against God, Jesus and Mary as a trinity, which no Christian teaches (5:116).", "14"],
    ["No assurance, and works can't pay", "Deeds are weighed (21:47), and good deeds can't erase a debt.", "20, 47"],
    ["Arrives six centuries late", "A later source can't overturn earlier, closer ones.", "44"]
  ]);
  r("Rabbinic Judaism", [
    ["Isaiah 53's suffering Servant", "An innocent Servant suffers for “my people,” which fits the Messiah.", "19"],
    ["The Messiah's deadline before AD 70", "Daniel 9:26 places the Anointed One before the Temple's fall.", "19"],
    ["No Temple, no blood atonement", "The Torah's system has been impossible for nearly 2,000 years.", "20"],
    ["Has to explain the empty tomb", "Even the earliest Jewish reply concedes the tomb was empty.", "17, 42"]
  ]);
  r("Jehovah's Witnesses", [
    ["John 1:1 mistranslated", "“A god” makes a second god, against Isaiah 43:10.", "16"],
    ["The Creator can't be created", "All things were made through the Son (Colossians 1:16).", "16"],
    ["Failed predictions", "Specific expectations for 1914, 1925 and 1975 didn't come true.", "15"],
    ["The Spirit is a person", "The Spirit can be lied to, grieved, and speaks (Acts 5:3–4).", "14"]
  ]);
  r("Deism", [
    ["A personal Creator who never speaks", "A God who made persons is likely to reveal Himself.", "11"],
    ["Miracles aren't impossible for a Creator", "The Lawgiver acting isn't a broken law.", "17"],
    ["Has to explain the resurrection", "The early Easter facts need an explanation deism doesn't have.", "17, 50"],
    ["Morality with no voice", "A silent God leaves moral law without a Lawgiver who speaks.", "9"]
  ]);
  r("Sikhism", [
    ["Karma and grace in tension", "An impersonal cycle and personal grace pull against each other.", "10, 47"],
    ["Paths that contradict", "Founding a distinct path admits paths differ.", "45"],
    ["Doesn't explain the resurrection", "The best-attested founder claim goes unaddressed.", "17, 46"],
    ["Grace without justice satisfied", "Forgiveness with no payment means wrongs just vanish.", "20"]
  ]);
  r("Religious Pluralism (“all paths lead to God”)", [
    ["Contradictions can't all be true", "Crucified or not, Creator or not: both can't be right.", "45"],
    ["“All paths are true” is exclusive", "It says every exclusive religion is wrong.", "8"],
    ["Skips the evidence test", "It treats all claims as equal instead of checking them.", "17, 44"],
    ["The elephant parable assumes a God's-eye view", "Only someone who sees the whole elephant can tell the story.", "8"]
  ]);
  r("Bahá'í Faith", [
    ["Progressive revelation that contradicts", "Later revelation can add, but not contradict.", "45"],
    ["Later than the sources it contradicts", "Nineteenth-century claims can't overturn first-century evidence.", "44"],
    ["Sidelines the resurrection", "The best-attested founder event is treated as symbolic.", "17, 46"],
    ["Unity by redefinition", "Uniting religions by denying what each teaches isn't unity.", "45"]
  ]);
  r("Scientology", [
    ["No evidence for its cosmology", "Its story of the universe has no historical or scientific support.", "41, 44"],
    ["Paid salvation", "Buying levels of progress is the opposite of grace.", "47"],
    ["Founded recently by a science-fiction writer", "It began in the 1950s, with no early witnesses to test.", "44"],
    ["Its founder stayed dead", "No resurrection is claimed for L. Ron Hubbard.", "46"]
  ]);
  r("Biblical Trinitarian Christianity", [
    ["Explains why the universe exists and began", "A necessary, personal Creator beyond space and time.", "1–3, 21–24"],
    ["Explains the code of life", "Information and an error-resistant code come from a Mind.", "4–5, 25–27"],
    ["Grounds mind, reason, choice and morality", "Persons made in the image of a rational, good God.", "6–10, 28–35"],
    ["Answers evil with the Cross", "Evil is real, judged, and borne by God Himself.", "12, 49"],
    ["Rests on a public, tested event", "The resurrection, attested early, by enemies and by many sources.", "15–20, 36–46, 50"]
  ]);
})();
