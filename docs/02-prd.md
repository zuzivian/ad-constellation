# 02 — PRD

## The rule

**Every requirement below is falsifiable by looking at the screen.** If you
can't verify it by pointing at the app, it isn't a requirement — it's a
feeling, and it belongs in the aesthetic rules in `CLAUDE.md`.

Compare:

- ✗ "Navigation should feel intuitive and immersive."
- ✓ "Clicking any node moves the camera so that node is centered and its direct
  neighbors are in frame, in under 1.5s, and a detail panel appears containing
  the node's name, type, location, and one paragraph of context."

The second one the model can build, and you can check. The first one produces
four rounds of "hmm, not quite."

---

## P0 — without these there is no product

| # | Requirement | How you verify it |
|---|---|---|
| 1 | All nodes from the dataset render as spheres in 3D space, positioned by force layout | Count the nodes on screen against the dataset length |
| 2 | Node color encodes type; node size encodes category weight | Six distinct colors; capability nodes visibly largest |
| 3 | Drag orbits the camera, scroll zooms | Do it |
| 4 | Hovering a node shows a tooltip with name + type + HQ | Hover three nodes |
| 5 | Hovering a node dims every node and edge not directly connected to it | Hover "Anduril"; only its neighbors stay lit |
| 6 | Clicking a node flies the camera to it in <1.5s and opens a detail panel | Click five nodes, watch the clock |
| 7 | The detail panel lists the node's capabilities, capital, and buyers, each as a clickable chip that navigates to that node | Click through three chips |
| 8 | A legend lists all six types with counts, and clicking a type hides/shows it | Toggle each of the six |
| 9 | Typing a name and pressing Enter flies the camera to the match | Search "Saronic" |
| 10 | Clicking empty space clears selection and highlighting | Click the void |
| 11 | Opens by double-clicking the HTML file, no server, no install | Double-click it on a machine that has never seen the project |

## P1 — makes it feel finished

| # | Requirement | How you verify it |
|---|---|---|
| 12 | An animated starfield sits behind the graph, independent of the graph camera | Look; it should twinkle and not rotate with the graph |
| 13 | A "Tour" mode flies cluster to cluster every ~4s and can be stopped | Press T, then T again |
| 14 | Keyboard: `/` focuses search, `T` tours, `Esc` resets | Press each |
| 15 | Highlighted edges show directional particles indicating flow direction | Hover an investor |
| 16 | No layout breakage at 1280×720 through 2560×1440 | Resize the window |
| 17 | Every fact in the detail panel traces to a `source` URL in the dataset | Spot-check five rows against `prototype/data.js` |

## P0 — value chain view (`valuechain.html`)

| # | Requirement | How you verify it |
|---|---|---|
| V1 | All ten segments render left to right in raw-input-to-capability order, each with a ten-tick coverage gauge and a risk chip | Count them; check the order matches `docs/09` |
| V2 | Three lenses recolour the spine: supply risk, domestic coverage, binding constraint. Each produces a visibly different pattern | Switch all three and compare; if two look the same, one of them is decoration |
| V3 | The binding-constraint lens shows a key, since its colours are categorical rather than ordered | Switch to it; the key appears |
| V4 | Clicking a segment shows what happens there, why it matters, what actually binds, and a verdict | Click all ten |
| V5 | Each segment has three tabs: chokepoints, players, and what else could be done | Click through all 30 combinations |
| V6 | Chokepoints are filterable by risk level, and sort worst-first by default | Filter raw materials to Critical; expect 9 of 29 |
| V7 | Every chokepoint row shows its source line | Spot-check ten rows |
| V8 | The page states, in plain language, that coverage and risk scores are judgement rather than published statistics | Read the callout under the spine |
| V9 | Player names that exist in the constellation deep-link to it, centred on that organisation | Click "MP Materials" in segment 1; the constellation opens and flies to it |
| V10 | Both views link to each other in a persistent top bar | Switch back and forth |
| V11 | Opens by double-clicking the file, no server, no install, and works with no network | Turn off wifi and open `valuechain.html` |

> V11 holds for the value chain view and **not** for the constellation, which
> pulls a library from a CDN. That asymmetry is deliberate and worth knowing
> before you demo on conference wifi.

## P2 — only after five users have touched it

| # | Requirement |
|---|---|
| 18 | Filter by node attribute (stage, HQ region) |
| 19 | Shortest-path highlight between two selected nodes |
| 20 | Deep link: a URL that opens with a given node selected |
| 21 | A GSB-alumni overlay, if we can source it without violating directory terms |

Anything not on this page is not in v1. Additions require deleting something
of equal size.

### The trade we actually made

Adding the value chain view cost 20 hours. Per the rule above, that required
deleting 20 hours of equal size, and we did:

- the entire P2 list above (~8 hrs)
- tour mode and keyboard shortcuts in the constellation (~3 hrs)
- growing the materials table past 29 rows, in favour of sourcing the 29 we
  have properly (~6 hrs)

**This is what holding an anti-scope list looks like in practice.** Not
refusing the new thing — pricing it, then paying for it by cutting something.
A team that says yes without deleting ends week five with three half-built
views and nothing to show.

---

## Explicit non-requirements

- Does not need to work offline after first load.
- Does not need to support >500 nodes. At 65 nodes we are ~30× under the
  library's comfortable limit; do not optimize for scale we don't have.
- Does not need to be accessible via screen reader in v1 — but log this in the
  decision log as a known, deliberate debt, not an oversight.
