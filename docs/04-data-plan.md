# 04 — Data plan

**This is the long pole. 12–20 hours. Start it in week 1, not week 3.**

Everything else in the project blocks on the *shape* of this data, and the
volume of it is what determines whether the finished thing is useful or a toy.

## Why AI can't do this for you

The model will produce a plausible 300-row dataset in four minutes. A
meaningful fraction of the funding rounds, contract awards, and investor
relationships will be wrong in ways you cannot detect by reading them — they'll
be *plausible*. You will then show it to a GSB alum who works at one of these
companies and be wrong out loud.

So: AI is excellent for **structuring** the data (turning a messy paragraph you
found into schema-shaped JSON) and useless for **sourcing** it. The rule in
`CLAUDE.md` exists for this reason: **no source URL, no row.**

## Schema

```jsonc
{
  "nodes": [
    {
      "id": "Anduril",              // unique, display name
      "type": "dtech",              // prime|dtech|space|investor|gov|capability
      "capabilities": ["autonomy", "cuas", "c2"],
      "investors": ["a16z", "fp"],  // keys into the investor node ids
      "buyers": ["socom", "diu"],   // keys into the gov node ids
      "hq": "Costa Mesa, CA",
      "stage": "Late",              // Early|Growth|Late|Public|Fund|Service
      "note": "One paragraph. What they do, and specifically what an MBA does there.",
      "source": "https://...",      // REQUIRED
      "verified": "2026-09-17"      // REQUIRED, date a human checked it
    }
  ]
}
```

Edges are derived from `capabilities` / `investors` / `buyers`, not stored
separately. One less thing to keep consistent.

### The `note` field is the actual product

Anyone can list companies. The reason a first-year would use this instead of a
fund's portfolio page is the sentence that says *"MBA entry here is usually
corporate strategy or the ventures team"* or *"few MBA-titled roles; entry is
finance or supply chain."* That is the differentiated content. Budget real time
for it — roughly 4 minutes per node, which is where a third of your 12–20
hours goes.

## Value chain schema (second view)

```jsonc
{
  "id": "energetics", "n": 3,
  "name": "Energetics & propellants", "short": "Energetics",
  "domestic": 45,                  // SCORE — judgement, 0-100
  "risk": "Critical",              // SCORE — Critical|High|Medium|Low
  "bind": "Single supplier",       // SCORE — Foreign control | Single supplier
                                   //         | Process capacity | Institutional
  "bindWhy": "…",                  // one paragraph
  "what": "…", "why": "…", "verdict": "…",
  "players": { "incumbents": [], "challengers": [], "capital": [], "gov": [] },
  "chokepoints": [ {
      "k": "Ammonium perchlorate", "use": "Solid rocket motor oxidiser",
      "risk": "Critical",          // SCORE
      "domestic": 100,             // SCORE
      "control": "One US plant (AMPAC, Cedar City UT)",   // FACT
      "note": "…",                                        // FACT
      "src": "Janes, 'US Army expanding AP sources'"       // REQUIRED
  } ],
  "whitespace": [ { "t": "…", "heat": "Hot|Contrarian|Early",
                    "kind": "Company|Policy|Research|Fintech", "d": "…" } ]
}
```

### The rule that matters most here: facts vs scores

Two different kinds of claim live in this data and they have different
reliability. Keep them visibly separate, in the data and in the UI:

- **FACTS** carry a `src` and were checked against a named public source on a
  stated date. Quote these. All 79 chokepoints have one.
- **SCORES** (`domestic`, `risk`, `bind`) are analyst judgement — a defensible
  reading of the sourced facts, not a published statistic.

If you blur the two, you will eventually tell an alum who works at one of these
companies that "the data says" something no data says. `docs/06-cost-model.md`
calls this the reputational cost line, and this is the mechanism by which you'd
pay it.

**Where to upgrade scores to facts:** USGS Mineral Commodity Summaries publish
real *net import reliance* percentages for most of the minerals in segment 1.
Replacing our judgement with that published figure is the single highest-value
hour of Phase 3 data work, and it is a free download.

### Two-axis risk

Do not collapse risk into one number. Ammonium perchlorate is 100% domestic and
the highest-risk input in the chain, because there is one plant. US launch is
~95% domestic with heavy single-firm concentration. A one-dimensional import
share scores both as safe and is therefore worse than no score.

## Sources — all free

| Source | Gives you | Notes |
|---|---|---|
| [USAspending.gov API](https://api.usaspending.gov/) | Every federal contract award by recipient, agency, amount, date | The single best free source. No key required. Query by recipient name. |
| [USGS Mineral Commodity Summaries](https://www.usgs.gov/centers/national-minerals-information-center/mineral-commodity-summaries) | **Net import reliance per mineral**, production, world share | The authority for segment 1. Published annually, free PDF and CSV. Use it to replace our judgement scores with real statistics. |
| [DoD Industrial Capabilities Report](https://www.businessdefense.gov/) | What the Pentagon itself says is broken | Names priority sectors. If you want to know where money will flow, read what IBAS funds. |
| [Federal Register / BIS Section 232](https://www.federalregister.gov/) | Trade investigations into specific inputs | The titanium sponge investigation is the model document for how a chokepoint gets formally recognised. |
| [SBIR.gov API](https://www.sbir.gov/api) | Phase I/II/III awards | Best early-signal for startups — who got their first government dollar and from whom. |
| [SAM.gov](https://sam.gov/) | Registered contractors, NAICS/PSC codes, CAGE codes | Use to confirm a company actually holds contracts. |
| [SEC EDGAR full-text search](https://www.sec.gov/edgar/search/) | Public-company segment reporting, risk factors | For the primes' revenue mix. |
| [DIU](https://www.diu.mil/), [AFWERX](https://afwerx.com/), [SDA](https://www.sda.mil/) | Program structure, transition partners | Read their press releases — they name their vendors. |
| a16z American Dynamism, Founders Fund, Lux, 8VC portfolio pages | Funding and positioning | Primary source for who funded whom. |
| Company careers pages | Which roles actually exist | Also tells you whether they hire MBAs at all. |
| GSB Alumni Database / Handshake | Who from GSB is there | Check the terms before republishing anything from it — see below. |

## Paid sources — and why to skip them

| Source | Approx cost | Verdict |
|---|---|---|
| Crunchbase Pro / API | ~$500–$6k/yr | Skip. You need 300 rows, not an API. |
| PitchBook | ~$20k+/yr seat | Skip. Check whether GSB's library already has a seat before ever paying. |
| Govini / Forecast International | $10k+ | Skip entirely at this scale. |

For a 300-node map, **hand curation from free sources is cheaper, more
accurate, and the research is itself your recruiting preparation.** You are
not building a data business.

## Division of labor

Three people, same schema, three files, merged at the end:

| Person | Owns | Target rows | Hours |
|---|---|---|---|
| A | Primes + government buyers | ~45 | 4–6 |
| B | Venture-backed defense tech | ~120 | 5–8 |
| C | Space + investors | ~100 | 5–7 |

Merge with a 20-line script. Conflicts on shared nodes (an investor appearing
in two files) resolve to whoever has the more recent `verified` date.

## Quality gate before Phase 4

Do not start the real build until all of these pass:

- [ ] Every row has `source` and `verified`
- [ ] No node has zero edges (an orphan means you mis-tagged capabilities)
- [ ] Every `investors` / `buyers` / `capabilities` key resolves to a real node
- [ ] Spot-check: pick 10 rows at random, re-verify from source. If more than
      1 is wrong, your process is broken — fix the process, not the row.
- [ ] Every `note` mentions something MBA-specific

## One legal note

Company names, HQs, contract awards and announced funding rounds are facts and
are fine to publish. **Scraped alumni directory data is a different category** —
check the GSB directory's terms of use before putting individual names or
employment histories on a public URL, and default to aggregate counts
("3 GSB alumni") rather than names. If in doubt, keep the alumni overlay in a
version you don't deploy publicly. This is a real constraint, not a
formality — and it's exactly the kind of thing a PM is supposed to catch before
launch rather than after.
