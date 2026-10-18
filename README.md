# US Drones — an open inquiry

A research-driven inquiry into US drones and counter-drone, built on a
three-view explorer of the wider US aerospace & defense ecosystem. It started
as a recruiting map for Stanford GSB first-years; on 2026-10-18 it was
re-oriented into an investigation tool for the desk-research phase of a
Research Driven Inspiration (RDI) inquiry.

| View | Question it answers |
|---|---|
| [`prototype/index.html`](prototype/index.html) | *What should I go ask, and of whom?* — the inquiry: flag, forces of change, sub-spaces, hypotheses with evidence for and against, who to learn from, interview questions, watering holes, vocabulary, a dated log. |
| [`prototype/constellation.html`](prototype/constellation.html) | *Who else works on this problem?* — a 3D constellation. Opens on the drone clusters; "All A&D" shows the full map. |
| [`prototype/valuechain.html`](prototype/valuechain.html) | *Where are the gaps?* — the A&D value chain from raw materials to fielded capability. A drone-specific chain is next. |

One question per view. See [`CLAUDE.md`](CLAUDE.md) for the standing brief and
[`docs/`](docs/) for the product and data thinking behind it
(start with [`docs/12-inquiry-view.md`](docs/12-inquiry-view.md)).

## Run it locally

Double-click `prototype/index.html` (the inquiry). That's it — no build, no server, no npm.

All data lives in `prototype/data.js` and is loaded by all three views with a
`<script src>` tag, which is what makes `file://` work (`fetch()` is
CORS-blocked there). There is exactly one copy of the data; do not add a second.

## Stack

Plain HTML + CSS + vanilla JS. The constellation view uses `3d-force-graph@1.80.0`,
vendored in `prototype/vendor/` with its MIT license; the value chain view has no
dependencies at all. The site makes no third-party requests and works offline. Node logos are local SVGs in `prototype/logos/`
(each with a source in `LOGOS`), so nothing is fetched from a logo service.
Total payload is about 2080 KB (the 3D library is ~1.3 MB of that, gzipped in transit).

## Data honesty

Every row carries a `source` URL, and every investor and buyer edge carries its
own evidence URL (`EDGE_SRC`) — an edge without one is not drawn. Chokepoint **facts** have a `src` field and
were checked against a named public source. `domestic` percentages and `risk`
ratings are **analyst judgement**, and the UI says so wherever it shows them.
Unverified relationships are left out rather than guessed.

The site currently ships `noindex` in three places (`robots.txt`, the
`X-Robots-Tag` header in `vercel.json`, and a meta tag in both HTML files)
because it is a working draft carrying estimates. See
[`DEPLOY.md`](DEPLOY.md#when-youre-ready-to-make-it-public) before lifting that.

## Deploy

Static hosting, no server. See [`DEPLOY.md`](DEPLOY.md) — the GitHub → Vercel
import needs no build settings; the root `vercel.json` serves `prototype/` and
sets the headers.
