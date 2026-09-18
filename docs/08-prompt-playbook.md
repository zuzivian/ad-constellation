# 08 — Prompt playbook

The prompts that work, the ones that don't, and why. This is the "how to vibe
code" part, and it turns out to be mostly a writing skill.

---

## The four-part shape

Every good build prompt has these. Miss one and you get a plausible thing that
isn't what you wanted.

1. **Context** — what the project is and what the constraints are.
   *(This is what `CLAUDE.md` is for. Write it once, not every prompt.)*
2. **The one thing** — a single vertical slice, not a feature list.
3. **Done condition** — how you'll verify it, stated before it's built.
4. **The boundary** — what not to touch.

### Worked example

> **Bad:** "Make the graph interactive and add a nice detail panel."
>
> **Good:** "In `prototype/index.html`, add click-to-select. Clicking a node
> should (a) fly the camera so that node is centered with its direct neighbors
> in frame, easing over ~1.1s, and (b) open the existing `#detail` panel with
> that node's name, type, HQ and note. Clicking the background clears both.
> Don't change the hover behavior, the data, or any CSS outside `#detail`."

The good one names the file, the interaction, the timing, the verification, and
the blast radius. It will work the first time. The bad one will produce a
gradient card with a shadow.

---

## Prompts by phase

### Spike
> "I want to know whether X is feasible before I plan around it. Build the
> smallest possible thing that answers only that question, in one file, using
> an off-the-shelf library if one exists. Don't build anything else. At the
> end, tell me how long the real version would take and what the riskiest
> remaining unknown is."

The last sentence is the valuable half. You're asking for an estimate, not
just code.

### Choosing a stack
> "List the realistic library options for [thing], with a row each for what
> it's actually built for, the rough hour cost to get to my P0 list, and why
> I'd reject it. Include the boring low-tech option. Then recommend one and
> tell me what I'm giving up."

"Tell me what I'm giving up" prevents the model from selling you its pick.

### Building a slice
> "Next slice: [one sentence]. Done when [observable condition]. Don't touch
> [boundary]. If this requires a decision I haven't made, stop and ask me
> instead of choosing."

That last clause is the single highest-leverage sentence in this document.

### When it's not right
> "Three specific problems with what you just built: (1) the investor nodes
> are brighter than the companies, which pulls the eye to the wrong layer;
> (2) the camera overshoots and settles, it should ease out monotonically;
> (3) the panel appears before the camera stops, so it reads as two events.
> Fix these three. Change nothing else."

Numbered, specific, visual, bounded. Compare to "hmm, doesn't feel right yet,"
which produces a random walk.

### When it's stuck
> "That's the third attempt at this and none worked. Don't try a fourth. Tell
> me which part of my requirement is ambiguous, and ask me the question that
> would resolve it."

Three failures means your spec is wrong, not that the model is weak. This
prompt is how you find out where.

### Reviewing your own code (you can't read it, so ask)
> "Walk me through this file as if I'm a PM who can't code. What are the four
> or five things it does, in order? Then: what would break if I gave it 500
> nodes instead of 66, and what would break if two people opened it at once?"

You should be able to explain your own product's architecture out loud. This
is how you get there without learning to code.

---

## Anti-slop prompting

Generic AI output happens when you specify nothing aesthetic, so the model
returns the statistical average of the web. The fix is to over-specify, and to
name what you're ruling out:

> "Aesthetic direction: deep space. Near-black backgrounds. Light is emitted,
> not reflected — nodes glow, nothing has a drop shadow. Six colors total, each
> bound to one node type; nothing else on screen is saturated. Uppercase
> letterspaced labels for UI chrome, normal case for content, exactly two type
> sizes. Motion is the product: prefer dimming the unselected over brightening
> the selected.
>
> Explicitly avoid: gradient heroes, emoji in headings, rows of rounded cards,
> purple-to-blue anything, drop shadows, and any layout that reads as a generic
> AI-generated landing page."

The "explicitly avoid" list is doing most of the work.

---

## The five habits

1. **`CLAUDE.md` before code.** Context you write once beats context you
   re-type every session. Update it when a decision changes.
2. **One slice per turn.** Then stop and look. A ten-item prompt returns ten
   half-right things and you won't be able to tell which one broke.
3. **State the done condition before the build.** If you can't, you don't have
   a requirement yet — go back to the PRD.
4. **Name the blast radius.** "Don't change X" prevents the model from
   helpfully refactoring something that worked.
5. **Ambiguity over iteration.** When it's wrong twice, fix the spec, not the
   prompt. This is the entire PM lesson, expressed as a coding habit.
