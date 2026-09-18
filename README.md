# A&D Constellation

A two-view explorer of the US aerospace & defense ecosystem, built for Stanford
GSB first-years figuring out where to recruit.

| View | Question it answers |
|---|---|
| [`prototype/index.html`](prototype/index.html) | *Who else works on this problem?* — a 3D constellation. Nine capability clusters act as gravity wells; companies, investors and buyers orbit the problems they touch. |
| [`prototype/valuechain.html`](prototype/valuechain.html) | *Where are the gaps?* — the value chain from raw materials to fielded capability. Ten segments with coverage, chokepoints, players and unbuilt opportunities. |

One question per view. See [`CLAUDE.md`](CLAUDE.md) for the standing brief and
[`docs/`](docs/) for the product and data thinking behind it.

## Run it locally

Double-click `prototype/index.html`. That's it — no build, no server, no npm.

All data lives in `prototype/data.js` and is loaded by both views with a
`<script src>` tag, which is what makes `file://` work (`fetch()` is
CORS-blocked there). There is exactly one copy of the data; do not add a second.

## Stack

Plain HTML + CSS + vanilla JS. The constellation view loads
`3d-force-graph@1.80.0` from jsDelivr; the value chain view has no dependencies
at all and works offline. Total payload is about 135 KB.

## Data honesty

Every row carries a `source` URL. Chokepoint **facts** have a `src` field and
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
