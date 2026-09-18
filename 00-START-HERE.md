# Zero to One: the actual process

You are three GSB students who are not engineers. You have an idea, a laptop,
and an AI that writes code. This folder is the process for turning that into a
deployed thing, and the set of documents that makes the process repeatable.

Read this file once, top to bottom. Then work the phases in order.

---

## The one idea that matters

**Vibe coding fails on ambiguity, not on difficulty.**

The model will happily build anything you describe. What it cannot do is decide
what you meant. Every hour you spend making a decision *explicit and written
down* buys back three hours of the model building the wrong thing beautifully.

That is also the entire job of a product manager. So the PM work and the
vibe-coding work are the same work. This folder is arranged around that.

The practical version:

| You write | The model does |
|---|---|
| What we're building and for whom (`docs/01`) | — |
| What it must do, in testable statements (`docs/02`) | — |
| What the data looks like (`docs/04`) | — |
| — | Picks libraries, writes code, fixes bugs |
| What "good" looks like, and what's wrong with v1 | Rewrites until it matches |

Notice you never write code and the model never decides scope.

---

## The seven phases

Work them in order. Do not skip Phase 0 — it is the one people skip and the
one that causes every later problem.

| # | Phase | What comes out | Hours |
|---|---|---|---|
| 0 | **Frame** | `docs/01-product-brief.md` | 5–7 |
| 1 | **Spike** | a throwaway prototype that answers "is this possible" | 4–6 |
| 2 | **Spec** | `docs/02-prd.md`, `docs/03-tech-spec.md` | 6–9 |
| 3 | **Data** | `prototype/data.js`, filled and sourced | 12–20 |
| 4 | **Build** | working app, ugly but complete | 16–24 |
| 5 | **Polish** | the app you'd actually show someone | 10–14 |
| 6 | **Ship & learn** | live URL, 5 user sessions, a v2 list | 10–15 |

**Total: 63–95 hours.** For a team of three at ~7 hrs/person/week, that's
4–5 weeks. Full detail and a week-by-week plan in `docs/05-roadmap-hours.md`.

---

## Phase 0 — Frame (5–7 hrs, zero code)

Sit in a room. No laptops open to an editor. Answer four questions and write
the answers in `docs/01-product-brief.md`:

1. **Who is the one person this is for?** Not "GSB students." One person:
   *"a GSB first-year in October who knows they want defense tech and has no
   idea which twelve companies to email."* If you can't name them, stop.
2. **What do they do today instead?** (Read a16z blog posts, ask a second-year,
   open 40 tabs.) This is your competition, not other apps.
3. **What is the single moment of value?** One sentence, present tense:
   *"In ninety seconds they find four companies they'd never heard of that
   sit on the capability they care about."* Everything that doesn't serve that
   sentence is out of scope.
4. **How will you know it worked?** Pick one number you can actually observe.
   *"Four of five test users name a company they'd email that they didn't know
   before."* Not pageviews.

Then write the **anti-scope list** — the things you are explicitly not
building. This list is the most valuable page in the folder. Ours:
no login, no database, no user-generated content, no mobile-first, no search
over documents, no news feed.

> **PM reps:** this is the muscle. Most PMs can write a feature list. Few can
> write a crisp anti-scope list and hold it for four weeks.

---

## Phase 1 — Spike (4–6 hrs)

A spike is a prototype you have already agreed to throw away. Its only job is
to kill the riskiest unknown before you plan around it.

Your riskiest unknown was: *can you even navigate an ecosystem in 3D space, or
is that a six-month engineering project?*

**That spike is already done — open `prototype/index.html` in a browser.**

What it proves: the 3D constellation navigation is roughly **6–10 hours of
work**, not six months, because [`3d-force-graph`](https://github.com/vasturiano/3d-force-graph)
does the hard part. Force layout, camera fly-to, hover picking, particle flows
on edges — all library features. The custom code is the starfield, the detail
panel, and the styling.

What it also proves, and this is the real finding: **the visualization is the
cheap part. The data is the expensive part.** Look at `prototype/index.html`
— the visual engine is ~150 lines. The dataset is ~120 lines of hand-typed
facts covering 65 nodes and 233 edges, and it took longer than the engine. Scaling to 300
verified, sourced nodes is 12–20 hours. That reallocation of the roadmap is
what the spike bought you.

**Run your own spike this way:** give the model the single scariest
requirement, alone, with no context about the rest of the product. "Show me
whether I can fly a camera through a 3D network graph of 60 nodes in a browser,
using an off-the-shelf library, in one HTML file." Then judge the result and
throw it away.

---

## Phase 2 — Spec (6–9 hrs)

Now write `docs/02-prd.md` and `docs/03-tech-spec.md`. Templates are already
in those files, filled in for this project as a worked example.

The PRD rule that makes vibe coding work: **every requirement must be
falsifiable by looking at the screen.**

- Bad: "navigation should feel intuitive"
- Good: "clicking any node moves the camera so that node is centered and its
  direct neighbors are visible, within 1.5 seconds, and a panel appears with
  that node's name, type, and one paragraph"

The second one, the model can build and you can verify. The first one produces
four rounds of "hmm, not quite."

---

## Phase 3 — Data (12–20 hrs) — start this in week 1

The mistake every first-time team makes is treating data as a later step. It
is the longest step, it is the one AI helps least with, and everything else
blocks on its shape.

Decide the schema first (`docs/04-data-plan.md` has ours), then fill it.

**Free, legitimate sources for this project:**

| Source | What it gives you | Cost |
|---|---|---|
| [USAspending.gov API](https://api.usaspending.gov/) | Every federal contract award, by company | Free |
| [SAM.gov](https://sam.gov/) | Registered contractors, NAICS codes | Free |
| [SEC EDGAR full-text search](https://efts.sec.gov/LATEST/search-index?q=) | Public-company filings | Free |
| [SBIR.gov award data](https://www.sbir.gov/api) | Early-stage defense awards — the best startup signal | Free |
| Company sites, a16z American Dynamism, fund portfolio pages | Positioning, funding, team | Free |
| GSB Alumni Database / Handshake | Who from GSB is actually there | Included |

Paid options (Crunchbase, PitchBook, Govini) run $500–$25k/yr. **Skip them.**
For 200–300 nodes, hand-curation from free sources is cheaper, more accurate,
and the research *is* the recruiting prep. You are not building a data
business; you are building a map.

**Divide it:** one person per node type (companies / investors / buyers). Same
JSON schema, one file each, merged at the end. Every row gets a `source` URL.
No source, no row.

---

## Phase 4 — Build (16–24 hrs)

Now you vibe code. The method:

1. **One vertical slice at a time.** Not "build the app." Rather: "render the
   nodes from `data.js` as colored spheres, no interaction." Ship
   it. Then: "add hover highlighting of direct neighbors." Ship it.
2. **Keep `CLAUDE.md` current** (in this folder's root). It's the standing
   brief the model reads every session — stack, constraints, style, what not
   to touch. It is the difference between session two starting cold and
   starting where session one ended.
3. **After every slice, you look at it and write down what's wrong** in
   specific, visual language. "The investor nodes are too bright and pull the
   eye away from the companies" is an actionable note. "Make it nicer" is not.
4. **When the model is going in circles, stop and re-spec.** Three failed
   attempts at one thing means your requirement is ambiguous, not that the
   model is weak. Go back to the PRD line and rewrite it.
5. **Log every real decision** in `docs/07-decision-log.md`. One line: what,
   why, what we rejected. Four weeks from now you will not remember why you
   chose a static JSON file over a database, and someone will re-litigate it.

---

## Phase 5 — Polish (10–14 hrs)

This is where "AI slop" gets avoided, and it is a taste exercise, not a
technical one. Slop looks like: purple-to-blue gradients, emoji section
headers, four rounded cards in a row, a hero with a vague verb. The reason it
looks like that is nobody made a single specific aesthetic decision, so the
model reached for the average of the internet.

Make three specific decisions and hold them everywhere:

- **One structural metaphor.** Ours: deep space. It dictates near-black
  backgrounds, light emitted rather than reflected, and a twinkling starfield
  behind the graph rather than a flat fill.
- **One typographic rule.** Ours: uppercase letterspaced labels for chrome,
  normal-case for content. Two sizes only.
- **A restricted palette with meaning.** Ours: six colors, each bound to a node
  type, and nothing else on screen is allowed to be saturated.

Then spend the hours on the transitions — camera easing, the panel sliding in,
neighbors dimming rather than the selection brightening. Motion quality is what
separates something that feels designed from something that feels generated.

---

## Phase 6 — Ship & learn (10–15 hrs)

> **Already prepared for you:** `DEPLOY.md` at the project root has the exact
> Vercel commands, the post-deploy checklist, and how the feedback widget works.
> `docs/10-feedback-plan.md` has the announcement drafts and how to run the five
> sessions — including why the link alone is the weaker half of Phase 6.

**Deploy (2 hrs, $0).** It's a static site, so:

- **Cloudflare Pages** or **Netlify** — drag the folder onto the dashboard,
  get a URL. Genuinely that simple, free tier is more than enough.
- **Vercel** if you later want a framework. Same free tier.
- **GitHub Pages** if you want the repo to be the source of truth.
- Custom domain: ~$12/yr at Cloudflare or Namecheap.

**Then the part that matters (8–13 hrs).** Sit next to five first-years. Give
them no instructions. Watch where they hesitate. Do not explain. Do not defend.
Write down every hesitation. That list is your v2 backlog, and it will not
match the backlog you would have written yourselves.

---

## Total cost

| Item | Cost |
|---|---|
| Hosting (Cloudflare Pages / Netlify free tier) | **$0** |
| Domain | **$12/yr** |
| Data | **$0** (free federal sources + hand curation) |
| AI coding tool, per person | **$20–100/mo** |
| Analytics (Plausible, optional) | **$9/mo** |
| **Project total, 3 people, 5 weeks** | **≈ $90–400** |

The entire monetary cost is your AI subscriptions. If you later add a database
and auth, Supabase free tier covers a few thousand users at $0, then $25/mo.

---

## What's in this folder

```
ad-constellation/
├── 00-START-HERE.md          ← you are here
├── CLAUDE.md                 ← standing brief the AI reads every session
├── prototype/
│   ├── data.js               ← ONE dataset, read by both views
│   ├── index.html            ← view 1: 3D constellation. Open this.
│   └── valuechain.html       ← view 2: value chain coverage & gaps
├── data/
│   └── SCHEMA.md             ← the shape everything must fit
└── docs/
    ├── 01-product-brief.md   ← Phase 0 output
    ├── 02-prd.md             ← Phase 2: what it must do, testably
    ├── 03-tech-spec.md       ← Phase 2: stack, and the options we rejected
    ├── 04-data-plan.md       ← Phase 3: sources, schema, division of labor
    ├── 05-roadmap-hours.md   ← week-by-week, with hour estimates
    ├── 06-cost-model.md      ← every line item, and the scale-up scenarios
    ├── 07-decision-log.md    ← append one line per real decision
    ├── 08-prompt-playbook.md ← the prompts that work, and why
    ├── 09-value-chain-view.md← the second view: why it exists, what it found
    └── 10-feedback-plan.md   ← Phase 6: announcement drafts, how to run sessions
DEPLOY.md                     ← (root) exact Vercel steps + post-deploy checklist
```

Start with `docs/01-product-brief.md`. Replace our answers with yours.

---

## A note on the second view

There are now two views over one dataset. `docs/09-value-chain-view.md` explains
why that was the right call over modifying the first view or starting again, and
it is worth reading as a worked example of the most common product decision you
will face: **one question per view; shared entities in a shared data layer.**

It also carries the substantive finding — that only two of ten segments are
actually gated by foreign control, and that four of the five best opportunities
in the chain are not manufacturing businesses at all.
