# 05 — Roadmap and hours

Assumptions: **3 people, ~7 hrs each per week**, no prior coding experience,
using an AI coding assistant throughout. Estimates are for that profile — an
experienced engineer would be ~40% faster on build and identical on data.

## Totals

| Phase | Hours | Who | Calendar |
|---|---|---|---|
| 0 — Frame | 5–7 | all three, together | Week 1, day 1 |
| 1 — Spike | 4–6 | one person | Week 1 |
| 2 — Spec | 6–9 | one writes, all review | Week 1–2 |
| 3 — Data | 12–20 | all three, split | Week 1–3 (parallel) |
| 4 — Build | 16–24 | one primary, one pairing | Week 2–3 |
| 5 — Polish | 10–14 | one with taste + one reviewer | Week 4 |
| 6 — Ship & learn | 10–15 | all three | Week 4–5 |
| **Total** | **63–95** | | **5 weeks** |

Per person that's **21–32 hours** — about 4–6 hours a week. That fits around a
GSB course load. It does not fit around a GSB course load if you start Phase 3
in week 3.

## Week by week

### Week 1 — decide, and start the boring part
- **Mon (3h, together):** Phase 0. Product brief. The one person, the one
  moment of value, the anti-scope list. No laptops in editors.
- **Tue (4h, one person):** Phase 1 spike. Answer "is 3D possible." *Already
  done — see `prototype/index.html`. Read it instead and confirm the finding.*
- **Wed (3h, together):** Agree the data schema (`docs/04`). This unblocks
  everyone. Assign node types.
- **Thu–Sun (4h each):** Phase 3 begins. First 40 rows each. You will discover
  the schema is wrong in two places. Fix it now, cheaply.

> Week 1 exit test: can each of you state the one-sentence moment of value from
> memory, and is there a schema-valid JSON file with 100+ rows in it?

### Week 2 — spec and first slices
- **Mon (4h):** Phase 2. Write the PRD. Every line falsifiable on screen.
- **Tue (2h):** Tech spec. Mostly written for you in `docs/03` — your job is
  to disagree with it in writing if you want a different stack.
- **Wed–Thu (8h, build pair):** Phase 4 slices 1–3: render nodes from real
  data → color and size by type → orbit and zoom.
- **Fri–Sun (6h, data):** Rows 40–120 each.

> Week 2 exit test: your real dataset renders in 3D. It looks bad. That's fine.

### Week 3 — the build
- **Mon–Thu (14h, build pair):** Slices 4–8: hover highlighting → click to
  fly → detail panel → legend filters → search. One slice, look at it, write
  down what's wrong, next slice.
- **Throughout (6h, data):** Finish to target. Run the Phase 3 quality gate.

> Week 3 exit test: every P0 line in the PRD passes. Go down the list and
> check them off literally.

### Week 4 — make it not look generated
- **Mon (2h, together):** Aesthetic decisions. One metaphor, one type rule,
  one palette. Write them into `CLAUDE.md`.
- **Tue–Thu (10h):** Phase 5. Motion, easing, the starfield, the panel, the
  dimming. This is where the hours convert to "feels designed."
- **Fri (2h):** Deploy. Cloudflare Pages, custom domain. You'll have a live
  URL in under an hour; budget the rest for the DNS wait.

> Week 4 exit test: show it to one stranger for 60 seconds. Do they orbit the
> camera without being told?

### Week 5 — learn
- **Mon–Wed (9h):** Five user sessions, ~45 min each plus write-up. Give no
  instructions. Say nothing. Write down every hesitation.
- **Thu (3h, together):** Turn hesitations into a ranked v2 list. Revisit the
  anti-scope list *now*, with evidence — and probably keep most of it.
- **Fri (2h):** Retro. What did we spec badly? Where did the model go in
  circles, and what was ambiguous in the requirement that caused it? That
  question is the whole PM skill.

## Where this schedule actually breaks

Three failure modes, in order of likelihood:

1. **Data starts in week 3.** Then week 4 is data, week 5 is build, polish
   never happens, and you demo something with 30 nodes that looks thin.
   *Mitigation: the week 1 exit test.*
2. **Scope grows.** Someone says "what if it also showed job postings." The
   anti-scope list is the answer, and holding it is the job.
   *Mitigation: additions require deleting something of equal size.*
3. **Polish is treated as optional.** It's 10–14 hours and it's the difference
   between "cool, you made a thing" and "wait, can I use this?"
   *Mitigation: it's a phase with hours, not a nice-to-have.*

## If you only have a weekend (20 hrs)

Cut to: Phase 0 (2h) → skip the spike, use ours → 60 nodes of data, no
verification pass, clearly labeled as illustrative (8h) → build P0 items 1–7
only (8h) → deploy (2h). Skip search, legend filters, tour, and polish. You'll
have something real and honest about its limits.
