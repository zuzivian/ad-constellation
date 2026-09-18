# 07 — Decision log

One line per real decision. What, why, what we rejected, date. Append only.

Why this file exists: in week four someone will ask "why aren't we using a
database?" and nobody will remember. Ten seconds of writing now prevents an
hour of re-litigation later. It is also, not incidentally, the single most
useful artifact you'll have when someone asks you to explain your product
judgment in an interview.

---

| Date | Decision | Why | Rejected |
|---|---|---|---|
| 2026-09-17 | Model the ecosystem as a graph, not a list or table | The useful question is "who else works on this problem," which is a graph traversal. Lists force you to already know the name. | Sortable table; category-grouped directory |
| 2026-09-17 | 3D, not 2D | Nine capability clusters overlap heavily; in 2D the cross-cluster edges become hairball. 3D separates them, and the depth cue makes cluster membership legible at a glance. | Sigma.js 2D — kept as fallback if users struggle to navigate |
| 2026-09-17 | `3d-force-graph` over raw three.js | Every P0 interaction is a config option. Raw three.js means re-implementing picking, force layout and camera easing: ~40h vs ~8h. | three.js from scratch; deck.gl; Cosmograph |
| 2026-09-17 | No build step, no npm, no framework | Team has no engineering background. A build pipeline adds a failure mode that nobody on the team can debug. Cost: no module system. Worth it. | React + Vite; react-force-graph |
| 2026-09-17 | Starfield as 2D canvas, not `THREE.Points` | Adding to the graph's scene needs a global THREE → second copy of three.js → silent `instanceof` failures and a blank screen. Modern three.js also dropped its UMD build. | three.js Points layer |
| 2026-09-17 | Inline the dataset into the HTML | P0 requires opening by double-click; `fetch()` fails under `file://` CORS. | `fetch()` + local server; embedded as base64 |
| 2026-09-18 | **Superseded the above:** dataset moved to `prototype/data.js`, loaded by both views via `<script src>` | A script tag dodges the same CORS rule `fetch` hits, so we get double-click opening AND one source of truth. Inlining would have meant two copies once a second view existed. | Inlining per file; a build step; a dev server |
| 2026-09-17 | Defensive constructor (`new ForceGraph3D` with fallback) | Library changed constructor style mid-life; most online examples show the old form. A CDN bump shouldn't blank the page. | Pinning version only |
| 2026-09-17 | Free federal data sources; no Crunchbase/PitchBook | 300 rows doesn't justify $500–20k. USAspending + SBIR + EDGAR cover awards and financials. Hand curation is more accurate at this scale. | Crunchbase Pro; PitchBook |
| 2026-09-17 | Every row needs a `source` URL and `verified` date | AI generates plausible-but-wrong funding and contract facts that are undetectable by reading. Publishing those to alumni is worse than shipping nothing. | Trusting model-generated data; spot-checking only |
| 2026-09-17 | Leave unverified investor edges OUT rather than guess | A hole in the graph is honest; an invented edge is a false claim about a real company. See the `INV_ID` comment in the prototype. | Filling gaps with plausible investors |
| 2026-09-17 | No screen-reader support in v1 | Deliberate debt, logged so it's a decision and not an oversight. A 3D force graph has no good non-visual equivalent; a companion table is the v2 answer. | Accessible-first; ARIA on canvas (doesn't work) |
| 2026-09-17 | Success metric is qualitative (4 of 5 users find an unknown company) | A tool that answers in 40 seconds and gets closed is a success. Engagement metrics would punish exactly the behavior we want. | Pageviews; time on site; return rate |
| 2026-09-18 | **Add a second VIEW rather than modifying the first or starting over** | The two views answer different questions over the same entities. Constellation: "who else works on this problem." Value chain: "where are the gaps." Modifying the graph to do both would serve neither; starting over would discard a working artifact. | Rebuilding the constellation as a value chain; a third separate app |
| 2026-09-18 | Lift all data into `prototype/data.js`, loaded by both views | Two views over one dataset must not have two copies of it. A plain `<script src>` works under `file://` where `fetch()` is CORS-blocked — so we keep "opens by double-click" AND one source of truth. | Duplicating org data in each file; a build step to inline; a local dev server |
| 2026-09-18 | Value chain view uses **no WebGL and no libraries at all** | It is a layout-and-typography problem, not a spatial one. 10 segments in a row does not need a physics engine. Using three.js here because the other view does would be cargo-culting. | Reusing 3d-force-graph as a Sankey; D3 Sankey; Chart.js |
| 2026-09-18 | Separate `src`-backed FACTS from unsourced SCORES, visibly, in the UI | Coverage percentages and risk ratings are analyst judgement. Publishing them as if they were USGS statistics is the exact reputational failure `docs/06` warns about. Every chokepoint row shows its source line; the page states in plain language which numbers are judgement. | Presenting scores unqualified; omitting scores entirely |
| 2026-09-18 | Replaced the "open opportunity" lens with "binding constraint" | The first lens scored opportunity density and coloured 9 of 10 segments identically — it was measuring how much we had written, not the world. The replacement is categorical (foreign control / single supplier / process capacity / institutional) and splits 2/4/3/1. **A lens that does not differentiate is decoration.** | Keeping it with rescaled thresholds; dropping the third lens |
| 2026-09-18 | Model risk on two axes, not one | Ammonium perchlorate is 100% domestic and the highest-risk input in the chain, because there is one plant. US launch is ~95% domestic with heavy single-firm concentration. A single "import reliance" number would have scored both as safe. | A single risk score; import share alone |
| 2026-09-18 | Deploy `prototype/` directly to Vercel rather than building a `deploy/` copy | A second copy of the site is the same mistake as a second copy of the data — and we had already been bitten by that once in this project. | A separate build/deploy folder; a bundler |
| 2026-09-18 | Ship `noindex` in three places (robots.txt, HTTP header, meta tag) | The page carries analyst-judgement scores under two named students, aimed at an audience that includes people who work at these companies. Unlisted-and-shared-by-link invites correction; indexed-and-public invites attack. Three places is deliberate friction so it can't be lifted by accident. | Public and indexed; not deploying at all |
| 2026-09-18 | Visible "working draft — these are estimates" ribbon, dismissible | Cheapest possible insurance against the reputational cost line in `docs/06`. Saying it before someone finds it costs nothing; saying it after costs credibility. | A quiet footnote; no disclaimer |
| 2026-09-18 | Feedback by email (mailto) rather than a form service | Zero setup, no third-party account, works the minute the site is live, and at 30 respondents hand-collation is cheaper than integration. Upgrade path to a Google Form is one config line, documented. | Google Form now; Formspree; Tally; a serverless function |
| 2026-09-18 | Widget auto-attaches view + segment context to every response | "It's confusing" is unactionable. "It's confusing, from segment 4, bind lens, players tab" is a bug report. | Free-text only |
| 2026-09-18 | Dropped `cleanUrls` from `vercel.json` | It rewrites `/valuechain.html` to `/valuechain`, so the deployed site would behave subtly differently from the same files opened locally. Debuggability beats pretty URLs on a prototype. | cleanUrls: true |
| 2026-09-17 | `vercel.json` lives at the repo root with `outputDirectory: "prototype"`, not inside `prototype/` | Vercel only reads a root `vercel.json`, so a copy inside `prototype/` is silently ignored on a GitHub-connected deploy — and two copies of the header policy drift. Putting it at the root also means the Vercel import screen needs nothing changed, which removes the step most likely to be got wrong. | Keep it in `prototype/` and set Root Directory in the dashboard; move the site files to the repo root |

---

## Open questions — decide, then move up

| Question | Decide by | Owner |
|---|---|---|
| Do we publish GSB alumni affiliations, aggregate counts, or nothing? Needs a read of the directory terms of use. | End of Phase 3 | |
| Is the capability taxonomy nine clusters, or does user testing show it should be five? | Phase 6 | |
| Does the deployed version stay unlisted (shared by link) or go public? | Before Phase 6 | |
| The value chain scores are judgement. Do we publish them at all, or only publish the sourced facts and let readers form their own view? | Before any public URL | |
| Nine of ten segments were authored with roughly equal opportunity depth. Is that real, or an artefact of us writing evenly? Needs an outside expert read. | Phase 6 | |
| Should the two views share a selection, so clicking a segment filters the constellation to its players? | After user testing | |
| The constellation needs jsDelivr at runtime; the value chain needs nothing. Do we vendor the library so the whole site works offline and on locked-down networks? | If anyone reports a blank graph | |
| Which view should `/` land on? The constellation is the better hook; the value chain is the more useful artefact. Worth A/B-ing across the two announcement channels. | During the feedback round | |
