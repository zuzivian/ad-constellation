# 09 — The value chain view

## Why this is a second view and not a modified first one

You asked whether to start from scratch, modify the constellation, or add a
view. The answer follows from a question a PM should ask before any of the
three: **what question does each artefact answer?**

| View | Question it answers | Right shape |
|---|---|---|
| Constellation | "Who else works on this problem?" | A graph. Traversal, no beginning or end. |
| Value chain | "Where are the gaps, and what's missing?" | An ordered sequence. Direction and position carry meaning. |

Those are different questions, so they want different shapes. Force-directing
a value chain destroys the thing that makes it a value chain — the left-to-right
order. And bolting coverage scores onto the constellation would have given you
one artefact that answered neither question well.

**But they share entities.** Anduril is a node in one and a challenger in the
other. That is what determines the architecture: two views, one dataset.

```
prototype/
├── data.js           ← 65 orgs + 10 segments + 79 chokepoints + 51 opportunities
├── index.html        ← constellation. Reads data.js. 3d-force-graph.
└── valuechain.html   ← value chain. Reads data.js. No libraries at all.
```

Both link to each other in the top bar. The value chain's player chips deep-link
into the constellation (`index.html?focus=MP%20Materials`) and fly the camera to
that organisation.

### The reusable lesson

The question "should I modify, extend, or restart" is almost always really the
question "how many different questions am I trying to answer?" One question per
view. Shared entities go in a shared data layer. This is the most portable PM
instinct in the whole project, and it applies to slide decks and org structures
as much as to software.

### Why this view uses no libraries

The constellation needs WebGL because it is genuinely spatial. Ten segments in a
row is a layout-and-typography problem. Reaching for three.js here — because the
other view uses it — would be cargo-culting the stack instead of choosing it.
The whole view is plain DOM and about 240 lines of JavaScript.

That is also why it will load instantly and work offline, which the constellation
will not, since it pulls a library from a CDN.

---

## What the view shows

**The spine.** Ten segments, raw inputs on the left to fielded capability on the
right. Each carries a ten-tick gauge of estimated domestic coverage.

**Three lenses** over the same tiles, because one colouring cannot answer three
questions:

1. **Supply risk** — the headline judgement.
2. **Domestic coverage** — how much of US demand US and allied sources can meet.
3. **Binding constraint** — *what kind of thing* is stopping this segment. This
   is the most decision-relevant of the three, because the four answers need
   four different responses.

**Per segment:** what happens there, why it matters, what actually binds, a
verdict, then three tabs — chokepoints (filterable by risk), players
(incumbents / challengers / capital / government), and *what else could be done*.

---

## What the data says

### Risk concentrates left; American advantage concentrates right

Segments 1–3 average **32%** domestic coverage. Segments 7–9 average **90%**.
The US is close to unbeatable at turning subsystems into fielded capability and
dependent on others for the atoms those systems are made of.

| # | Segment | Coverage | Risk | Binding constraint |
|---|---|---|---|---|
| 1 | Raw materials & critical minerals | 22% | Critical | Foreign control |
| 2 | Refining, separation & specialty alloys | 30% | Critical | Process capacity |
| 3 | Energetics & propellants | 45% | Critical | Single supplier |
| 4 | Microelectronics, RF & sensing | 40% | High | Foreign control |
| 5 | Forgings, castings & precision machining | 55% | High | Process capacity |
| 6 | Propulsion & rocket motors | 70% | High | Single supplier |
| 7 | Structures, platforms & integration | 85% | Low | Process capacity |
| 8 | Software, autonomy & C2 | 95% | Low | Institutional |
| 9 | Launch & on-orbit services | 90% | Low | Single supplier |
| 10 | Test, ranges & sustainment | 60% | High | Process capacity |

### "Domestic" and "secure" are different axes

The single most useful row in the dataset is **ammonium perchlorate**: the
oxidiser in every solid rocket motor. It is **100% domestic and the
highest-risk input in the chain**, because there is exactly one US plant
(AMPAC, Cedar City, Utah). Janes describes it as a single point of failure in
the missile supply chain.

US **launch** is the same shape: ~95% domestic, heavily concentrated in one
company.

A one-dimensional "import reliance" score would have rated both as safe. If you
take one analytical habit from this view, take that one.

### Only two of ten segments are actually limited by foreign control

Switch to the binding-constraint lens:

- **Foreign control (2):** raw materials, microelectronics feedstock.
- **Single supplier (3):** energetics, propulsion, launch.
- **Process capacity (4):** refining, forgings, platforms, test.
- **Institutional (1):** software and autonomy.

That reframes the whole policy conversation. Most of the chain is not gated by
China. It is gated by queues, permits, insurance, labour and — in the case of
autonomy — the absence of a certification method that nobody owns.

### Which raw materials are actually a problem

29 inputs, and the point of including the good news is that a map where
everything is red teaches nothing.

**Problem now (9 critical):** titanium sponge (**zero** US production in 2025,
100% import-reliant), ammonium perchlorate (single plant), samarium, TNT (no US
producer since 1986), dysprosium & terbium, gallium, germanium, antimony
(Chinese exports down ~97%), nitrocellulose.

**Watch (9 high):** NdPr, tungsten (only 15 Chinese firms whitelisted to export
for 2026–27), anode graphite, rhenium, cobalt, magnesium, HALEU, RDX/HMX, HTPB.

**Genuinely fine (3 low):** beryllium (Materion's Utah operation is a US
near-monopoly — worth studying as the counter-example), aluminium and Al-Li
plate, specialty steel and armour plate.

### The timing caveat that matters most

China **suspended** its export *bans* on gallium, germanium and antimony to the
US until **27 November 2026** — but the underlying **licence requirements
remain**. Shipments of gallium and germanium to Japan have run at roughly zero
through 2026 under licensing alone. Treat the suspension as a reprieve with a
date on it, not a resolution. If you present this work after November 2026,
re-check this first.

---

## The five ideas worth a second look

Of the 51 opportunities in the view, these are the ones where the gap looks
real, the timing looks right, and the incumbents are not trying:

1. **Sovereign offtake insurance, productised.** The MP Materials deal works
   because DoD guaranteed an NdPr price floor and took ~15% of the company. The
   binding constraint on Western mining is not geology, it is price risk —
   nobody finances a mine China can bankrupt by dumping. Turn that floor into a
   repeatable instrument across twenty materials. **It is a finance product, not
   a technology**, which is exactly why a GSB team should look at it and an
   engineering team would not.

2. **Continuous-flow energetics manufacturing.** Explosives are still made in
   batches, in large buildings, because that is how it was done in 1943.
   Microreactors hold milligrams in reaction instead of tonnes, which changes
   the hazard class — and therefore the siting, the insurance and the permit.
   Permitting and insurance, not chemistry, are what cap US munitions output.

3. **Autonomy assurance as a service.** The algorithms work. There is no
   accepted method to prove an autonomous system is safe enough to field, so
   capability sits in demos. Whoever produces evidence a program office will
   accept unlocks every stalled autonomy program at once. Requires taste in
   statistics and standards, not a foundry.

4. **Foundry roll-up plus automation.** Hadrian did this for machining. Nobody
   has done it for casting — which the Pentagon's own IBAS program names a
   priority sector, which GE expects to face 30%+ airfoil demand growth by 2030,
   and which is fragmented, capital-starved and full of retiring owners with no
   succession plan.

5. **Commercial hypersonic test-as-a-service.** ~40 ageing US ground facilities
   against a national hypersonics push. Kratos is building an arc jet in Odon,
   Indiana; DIU's HyCAT is buying airborne test beds; every service has FY2026
   money for tunnel construction or reactivation. Demand is proven, the
   government is signalling it will pay, and the asset is financeable
   infrastructure rather than a science project.

Note the pattern across all five: **four of them are not manufacturing
businesses.** They are financial instruments, permitting arbitrage, standards
bodies and infrastructure. That is what you get from looking at a value chain
instead of a company list, and it is the most useful thing this view does.

---

## Scope cost of adding this

| Work | Hours |
|---|---|
| Lift data into `data.js`, wire both views, deep links | 3 |
| Build the value chain view | 6 |
| Research and write 79 chokepoints + 51 opportunities, sourced | 9 |
| Verification pass | 2 |
| **Total** | **20** |

That takes the project from 63–95 hours to **83–115**, and per the rule in
`docs/02-prd.md`, an addition of this size means deleting something of equal
size. Candidates, in order:

1. **Cut the constellation's P2 list entirely** (shortest-path, attribute
   filters, alumni overlay). ~8 hrs. Do this one.
2. **Cut the tour mode and keyboard shortcuts.** ~3 hrs. Nice, not load-bearing.
3. **Cap the raw materials table at 29 rows** rather than growing it to 60, and
   spend the saved time on `src` and `verified` fields for the 29 you have.
   Depth of sourcing beats breadth of rows. ~6 hrs.

Do all three and you are back to roughly the original envelope with a
materially better product. **That trade — two focused views instead of one
broad view plus a wishlist — is the PM decision on this page.**

---

## Honest status

- **Verified statically, not visually.** No browser was available in this
  session. All 90 lens/segment/tab render paths execute without throwing, and
  every numeric claim in this document was recomputed from the data rather than
  typed. Nobody has looked at it yet. That is the first thing to do.
- **Facts are sourced; scores are not.** 79 of 79 chokepoints carry a `src`
  line. The coverage percentages and risk ratings are analyst judgement and the
  page says so in plain language. Phase 3 should replace what it can with USGS
  net-import-reliance figures, which are real published statistics.
- **Authored evenly, which may be a distortion.** Nine of ten segments came out
  with 5 opportunities each. That is suspiciously uniform and is probably an
  artefact of writing rather than a fact about the world. An outside expert read
  is in the open questions list.
