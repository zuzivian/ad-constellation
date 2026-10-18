# 12 — The inquiry view (re-orientation, 2026-10-18)

## What changed and why

The site was a recruiting map: "which twelve companies should I email?" Nat
asked for it to become the basis of his Research Driven Inspiration (RDI)
investigation into aerospace, focused on drones, during the initial inquiry
phase. RDI's ramp-up phase is desk research with a specific job: become
conversational in a space, form hypotheses you hold lightly, and build a
target list across vantage points, so that the first interviews are worth the
other person's time.

Neither existing view answers that. The constellation answers "who works on
this problem?"; the value chain answers "where are the gaps?". The new
question is **"what should I go ask, and of whom?"**, so per the
one-question-per-view rule it got its own view, and that view is now the
landing page (`index.html`). The constellation moved to `constellation.html`
and old `index.html?focus=` links are forwarded.

## What the inquiry holds (all in `INQUIRY` in `prototype/data.js`)

| Section | What it is | Kind of claim |
|---|---|---|
| The flag | Scope and "why now", in and out of scope, four scope checks | Draft judgement, labelled "rewrite in your own words" |
| Forces of change | 43 dated events, each tagged internal or external and by category | Fact (`f`, sourced) + our read (`why`) |
| Sub-spaces | 7 segments, from components to delivery, each with players, what is moving, and the question a desk can't answer | Sourced "moving" line; the question is ours |
| Hypotheses | 8, each with evidence for and against, what would change our mind, who could test it, and a confidence word | Evidence sourced; confidence is judgement |
| Who to learn from | 52 organisations and people across established players, startups, investors, experts, government (academics: not yet researched) | Each row sourced; "what you'd learn" is ours |
| Questions | 23, grouped by interview lens, each tied to hypotheses and target groups | Ours |
| Where insiders talk | Reading, events, and public datasets to check a claim | Sourced links |
| Vocabulary | 47 terms, shared with the other views' hover glossary | Definitions |
| Log | Dated, append-only record of how the thinking moved | Ours |

## How far to trust it

- **Every fact has a URL.** The research ran as six parallel desk passes on
  2026-10-18 (policy, programs, companies, supply chain and counter-drone,
  ecosystem, commercial and capital).
- **The pages were not opened.** This cloud environment blocks direct page
  fetches, so claims were read from search summaries of the cited pages. Rows
  added that day say "checked via search results". A direct-fetch pass,
  opening each URL, is the obvious next step and should upgrade or correct
  rows.
- **Weak claims were dropped or worded "reported"**, naming the reporter.
  Conflicting figures appear as ranges (Gauntlet I order size, Reaper losses,
  DJI share by method).
- **The search budget ran out** (200 searches per turn, shared across agents).
  Not covered: academics and labs; allies (Taiwan, UK, Germany); 2027 event
  dates; counter-drone players D-Fend, Fortem detail, Hidden Level, CX2;
  compute, thermal cores, GNSS and airframe supply; public drone stocks.
  These are listed as gaps, not filled from memory.

## Not done, deliberately

- **No interviews are reflected.** Every confidence level is desk-only. The
  page says so.
- **No drone value chain yet.** Component evidence is uneven, and segment
  scores would be judgement on thin data. Next slice.
- **No personal context.** The inquiry is written for anyone running it. Visa,
  eligibility and recruiting specifics stay out of the repo.
- **RDI's text is not reproduced.** The guide is the authors' copyright; the
  structure is described in our own words.

## Next slices, in order

1. Direct-fetch verification pass on every 2026-10-18 URL (needs network
   access to the cited hosts, or a local machine).
2. Academics and Stanford programs (labs, most-cited work, spinouts).
3. The drone value chain in `valuechain.html` (magnets & motors → cells →
   compute & ESCs → sensors → links & navigation → airframes & assembly →
   autonomy software → certification & fielding).
4. After the first interviews: move evidence into the hypotheses with dates,
   change confidence, and add a log entry each time.
