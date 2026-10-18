# Standing brief — Aerospace & Defense Constellation

Read this at the start of every session. It is the contract.

## What this is
An open, research-driven inquiry into US drones and counter-drone, built on a
three-view explorer of the wider US aerospace & defense ecosystem. Re-oriented
on 2026-10-18 from a recruiting map to an investigation tool for the ramp-up
(desk research) phase of a Research Driven Inspiration inquiry: get fluent,
form hypotheses, and earn the right to ask good questions before interviews.

- **`prototype/index.html`** — the inquiry (landing page). The flag, dated
  forces of change, sub-spaces, hypotheses with evidence for and against,
  who to learn from, interview questions, watering holes, vocabulary and a
  dated log. Answers *"what should I go ask, and of whom?"*
- **`prototype/constellation.html`** — a 3D "constellation". Capability
  clusters act as gravity wells; companies, investors and buyers orbit the
  problems they touch. Opens on the drone clusters; "All A&D" shows the rest.
  Answers *"who else works on this problem?"* (Was `index.html` until
  2026-10-18; old `index.html?focus=` links are forwarded.)
- **`prototype/valuechain.html`** — the value chain, raw materials to fielded
  capability. Ten A&D-wide segments with coverage, chokepoints, players and
  unbuilt opportunities. Answers *"where are the gaps?"* A drone-specific
  chain is the next slice; until then drone chokepoints live in the inquiry.

**One question per view.** Do not make any view answer another's question.
If a new requirement fits none, that is a signal it may want another view —
raise it rather than cramming it in. See `docs/09-value-chain-view.md` and
`docs/12-inquiry-view.md`.

## Who it's for
Someone running an RDI-style inquiry into drones (today: Nat), in the
ramp-up phase: before interviews, needing to become conversational, hold
hypotheses lightly, and build a target list across vantage points. The page
is also meant to be shared with the people interviewed, so it must stand up
to an insider's read. Not a recruiting tool any more, though it still works
as one.

## Stack — do not change without updating docs/07-decision-log.md
- Plain HTML + CSS + vanilla JS. **No build step. No framework. No npm.**
- All data in `prototype/data.js`, loaded by all three views via `<script src>`.
  A script tag works under `file://` where `fetch()` is CORS-blocked — that is
  the whole reason for this shape. **Never add a second copy of the data.**
- `constellation.html` uses `3d-force-graph@1.80.0`, vendored in `prototype/vendor/` (bundles its
  own three.js). No runtime CDN: the site makes zero third-party requests.
- `index.html` (inquiry) and `valuechain.html` use **no libraries at all** — they
  are layout problems, not spatial ones. Do not add three.js or a charting
  library to them because the constellation has one.
- Static hosting (Vercel; see `DEPLOY.md`). No server, no database, no auth.

## Hard constraints
- Must run by double-clicking the HTML file — **no local server**. This is why
  data is inlined rather than `fetch()`ed: `file://` blocks the fetch.
- Single file for the deliverable. Readability beats cleverness.
- Never load a second copy of three.js. The starfield is 2D canvas on purpose.
- Every data row needs a `source` URL. No source, no row.
- Do not invent facts about companies, funding, or contracts. Unverified edges
  are left out, not guessed. See the `INV_ID` comment in `prototype/data.js`.
- **Say how a fact was checked.** Rows from 2026-10-18 were read through search
  results, not opened (this cloud environment blocks page fetches); they carry
  that check date and the inquiry's method note says so. Upgrade a row to
  "checked" only after opening its page.
- **In the inquiry, judgement is always labelled.** `why` lines render as
  "our read"; hypothesis confidence is a word plus a "judgement" tag, never a
  number; every hypothesis lists evidence against, not only for.
- The RDI guide is © its authors and not for redistribution. Never copy its
  text into this repo or the site; describe the method in our own words.
- **Keep FACTS and SCORES visibly separate.** Chokepoint facts carry a `src`
  field and were checked against a named public source. `domestic` percentages
  and `risk` ratings are analyst judgement and the UI must keep saying so.
  Never let a judgement render as if it were a published statistic.
- Model risk on two axes. Something can be 100% domestic and maximum risk
  (ammonium perchlorate: one plant). A single import-reliance number lies.
- A lens or filter that does not differentiate is decoration — cut it or
  replace it. We already cut one for exactly this reason.

## Anti-scope — do not build these
No login. No database. No user accounts or saved state. No news feed. No
document search. No mobile-first layout (it should not break on mobile, but
desktop is the target). No AI chat interface inside the app.

## Aesthetic rules
- Metaphor: deep space. Near-black backgrounds, light emitted not reflected.
- Palette: six colors, each bound to one node type. Nothing else saturated.
- Type: uppercase + letterspaced for chrome, normal-case for content. Two sizes.
- Motion is the product. Camera easing, panel slide, neighbor dimming.
- Dim the un-selected rather than brighten the selected.
- Explicitly avoid: gradient heroes, emoji headers, rows of rounded cards,
  drop shadows, anything that reads as a generic AI-generated landing page.

## How to work with me
- Build one vertical slice per turn. Stop and let me look at it.
- If I've asked for the same fix three times, tell me my requirement is
  ambiguous and ask a specific question instead of trying a fourth variation.
- When you make a real tradeoff, append a line to `docs/07-decision-log.md`.
