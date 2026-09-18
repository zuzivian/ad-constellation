# Data contract

**Canonical dataset: `prototype/data.js`.** Both views read it via a plain
`<script src>`, which works under `file://` where `fetch()` is CORS-blocked.

`data/ecosystem.json` is **deprecated and safe to delete**. It was a second copy
of the dataset and had already drifted (65 orgs vs 78) within a day — a second
copy is the thing `CLAUDE.md` most explicitly forbids. If you want JSON for
another tool, generate it from `data.js` at the point of use rather than
checking a copy back in.

That drift happening inside 24 hours, on a project with a written rule against
it, is worth noticing. Duplicated state does not desynchronise because someone
was careless. It desynchronises because it can.

This file is the *contract* — the shape `data.js` must satisfy.

## Node

```jsonc
{
  "id": "Anduril",                 // string, unique, used as display name
  "type": "dtech",                 // enum below
  "capabilities": ["autonomy"],    // capability keys; [] for capability/investor nodes
  "investors": ["a16z", "fp"],     // investor keys
  "buyers": ["socom", "diu"],      // gov keys
  "hq": "Costa Mesa, CA",          // string, "" allowed
  "stage": "Late",                 // enum below
  "note": "…",                     // 1 paragraph. MUST say something MBA-specific.
  "source": "https://…",           // REQUIRED. No source, no row.
  "verified": "2026-09-17"         // REQUIRED. ISO date a human checked it.
}
```

### `type`
`prime` · `dtech` · `space` · `investor` · `gov` · `capability`

### `stage`
`Early` · `Growth` · `Late` · `Public` · `Fund` · `Strategic` · `Service` ·
`DoD` · `IC` · `Civil`

### Capability keys
`autonomy` · `launch` · `space` · `c2` · `ew` · `hyper` · `cuas` · `maritime`
· `mfg`

## Edges

Derived, never stored. Three kinds:

| Kind | From → To | Source field |
|---|---|---|
| `capability` | org → capability cluster | `capabilities` |
| `investment` | investor → org | `investors` |
| `sells to` | org → gov buyer | `buyers` |

## Validation gate

Run before Phase 4. All must pass:

- [ ] every node has `source` and `verified`
- [ ] every key in `capabilities` / `investors` / `buyers` resolves to a node
- [ ] no orphan nodes (zero edges)
- [ ] no duplicate `id`
- [ ] every `note` is non-empty and mentions an MBA-relevant detail
- [ ] random 10-row re-verification: ≤1 error, else fix the process

## Segment (value chain view)

```jsonc
{ "id":"energetics", "n":3, "name":"…", "short":"…",
  "domestic":45, "risk":"Critical",          // SCORES — judgement
  "bind":"Single supplier", "bindWhy":"…",   // SCORE + prose
  "what":"…", "why":"…", "verdict":"…",
  "players":{ "incumbents":[], "challengers":[], "capital":[], "gov":[] },
  "chokepoints":[{ "k":"…","use":"…","risk":"…","domestic":0,
                   "control":"…","note":"…","src":"…" }],   // src REQUIRED
  "whitespace":[{ "t":"…","heat":"Hot|Contrarian|Early","kind":"…","d":"…" }] }
```

`bind` is one of: `Foreign control` · `Single supplier` · `Process capacity` ·
`Institutional`.

### Facts vs scores — the load-bearing rule

- `control`, `note`, and anything carrying a `src` are **FACTS**, checked
  against a named public source on a stated date. Quote these.
- `domestic`, `risk`, `bind` are **SCORES** — analyst judgement. Never render
  one as if it were a published statistic.

Upgrade scores to facts wherever a real statistic exists. USGS publishes actual
*net import reliance* per mineral — a free download that converts most of
segment 1 from judgement to citation. That is the highest-value hour in Phase 3.

### Two-axis risk

Do not collapse risk to one number. Ammonium perchlorate is 100% domestic and
the highest-risk input in the chain, because there is one plant. US launch is
~95% domestic with heavy single-firm concentration. A one-dimensional import
share scores both as safe, which is worse than having no score at all.

### Validation gate — value chain

- [ ] every segment has a valid `bind` and a `bindWhy`
- [ ] every chokepoint has a `src`
- [ ] every `domestic` is 0–100; every `risk` is one of the four levels
- [ ] no segment has an empty player list
- [ ] each of the three lenses produces a visibly different pattern across the
      ten segments. **A lens that does not differentiate is decoration** — we
      already deleted one for failing this check
- [ ] every numeric claim in prose is recomputed from the data, not typed

## Known gaps in the seed data

The prototype's inlined dataset is **illustrative, not verified**. Specifically:

- Org-level `source` and `verified` are absent throughout — the first thing
  Phase 3 fixes. (Value chain chokepoints DO all carry `src`.)
- Value chain `domestic` and `risk` scores are judgement, not measurement.
- All ten segments came out with exactly 5 opportunities each, which is
  suspiciously uniform and probably reflects how we wrote rather than how the
  world is. Logged in the decision log's open questions; needs an expert read.
- Several space companies carry an `ex` investor key that is deliberately
  unmapped, marking "there is a lead investor here and we haven't confirmed
  who." Those edges are dropped rather than guessed.
- Buyer relationships reflect general public positioning, not specific
  verified contract awards. USAspending.gov is how you replace them with
  real ones.
