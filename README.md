# QuantumTheology · S-GUOT 2.0

Static site, no build step. Open `index.html` through any local server:

```
python -m http.server 5173
```

## What's inside

- **20 hardened axioms** with strength labels, best objection, answer, and cost of escape (`data/axioms.js`)
- **Six gates + 24 worldviews** (`data/worldviews.js`), plus the ranked Islam section and the hardening log
- **81-event sourced timeline** with certainty labels and a gap calculator (`data/timeline.js`)
- **260 debate answers** in six files (`data/qa-1.js` to `data/qa-6.js`), each with fallacy, quick answer, full breakdown
- **Training Arena** with 10 activities, XP, streaks and badges (`js/arena.js`, `data/arena.js`)
- **Bible reader**: KJV and WEB built in (public domain). ESV and NIV load through their official free APIs with your own key, or open on Bible Gateway (`js/bible.js`)

## Editing content

Everything is data. Add a Q&A with one line in the right `data/qa-*.js` file:

```js
q("sci", "The objection", "Fallacy name", "Quick answer (1-2 sentences)", "Full breakdown with refs", "search keywords", axiomNumber);
```

Categories: `sci god mor bib con jes isl rel chu`.

## Bible reader keys

- ESV: free key at https://api.esv.org/ (personal use)
- NIV: free key at https://scripture.api.bible/ (NIV needs approval from Biblica through that service)

Keys are stored only in your browser's local storage and sent only to those two services.
