# Standing brief — A&D Constellation

Read this at the start of every session. It is the contract.

## What this is
A two-view explorer of the US aerospace & defense ecosystem, built for GSB
first-years figuring out where to recruit.

- **`prototype/index.html`** — a 3D "constellation". Nine capability clusters
  act as gravity wells; companies, investors and buyers orbit the problems they
  touch. Answers *"who else works on this problem?"*
- **`prototype/valuechain.html`** — the value chain, raw materials to fielded
  capability. Ten segments with coverage, chokepoints, players and unbuilt
  opportunities. Answers *"where are the gaps?"*

**One question per view.** Do not make either view answer the other's question.
If a new requirement fits neither, that is a signal it may want a third view —
raise it rather than cramming it in. See `docs/09-value-chain-view.md`.

## Who it's for
One person: a GSB first-year in October who knows they want defense tech and
cannot name twelve companies to email. Ninety seconds of use should surface
four companies they'd never heard of.

## Stack — do not change without updating docs/07-decision-log.md
- Plain HTML + CSS + vanilla JS. **No build step. No framework. No npm.**
- All data in `prototype/data.js`, loaded by both views via `<script src>`.
  A script tag works under `file://` where `fetch()` is CORS-blocked — that is
  the whole reason for this shape. **Never add a second copy of the data.**
- `index.html` uses `3d-force-graph@1.80.0` from jsDelivr (bundles its own three.js).
- `valuechain.html` uses **no libraries at all** — it is a layout problem, not a
  spatial one. Do not add three.js or a charting library to it because the other
  view has one.
- Static hosting (Cloudflare Pages). No server, no database, no auth.

## Hard constraints
- Must run by double-clicking the HTML file — **no local server**. This is why
  data is inlined rather than `fetch()`ed: `file://` blocks the fetch.
- Single file for the deliverable. Readability beats cleverness.
- Never load a second copy of three.js. The starfield is 2D canvas on purpose.
- Every data row needs a `source` URL. No source, no row.
- Do not invent facts about companies, funding, or contracts. Unverified edges
  are left out, not guessed. See the `INV_ID` comment in `prototype/data.js`.
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
