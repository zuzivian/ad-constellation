# 10 — Getting feedback that's worth having

## First, the pushback

You asked to deploy so you can share the link and get feedback. Worth flagging
against what's already written down: **`docs/05-roadmap-hours.md` Phase 6 is
10–15 hours, and almost all of it is sitting next to five people while they use
it.** Sending a link is thirty minutes.

Those two things produce different data, and the cheap one is weaker:

| | Link + form | Sitting next to five people |
|---|---|---|
| You learn | What people say they want | Where they hesitate, what they never click, what they misread |
| Sample | 30 people, shallow | 5 people, deep |
| Bias | Only the motivated reply, and they're polite | You see the confusion they'd never bother to report |
| Cost | 30 min | 10–15 hrs |

The failure mode is that the link goes out, twelve people say "this is cool,"
nobody reports the real problem, and you conclude it works. **Do both.** Ship
the link this week for breadth, and book five 30-minute sessions for depth. The
sessions are where the v2 backlog actually comes from.

One concrete tell you should watch for in the sessions and cannot get from a
form: whether people orbit the 3D camera without being told. If they don't, the
constellation's whole interaction model is wrong, and no survey response will
say so.

---

## The one metric that matters

From `docs/01-product-brief.md`, written before any code existed:

> **4 of 5 test users name at least one company they'd email that they did not
> know before using it.**

That is why the widget's first question is *"Did this show you a company or a
supply-chain issue you didn't already know?"* and the second is *"Name one."*
Question two is the real measurement — question one is easy to answer
generously, but naming something is not.

**Read the results against that bar, not against how nice people were.** If
people enjoy it but can't name anything, the tool is entertaining and not
useful, and that's a finding worth having early.

Secondary, from the same brief: median time-to-first-useful-discovery under 90
seconds. You can only observe that in person.

Explicitly **not** metrics: pageviews, time on site, shares. A tool that answers
the question in 40 seconds and gets closed is a success.

---

## What the widget collects

Three questions plus optional name, and it automatically attaches which view and
which segment they were on. That context is the most useful field: if every
response comes from segment 1, the other nine segments aren't being found, which
is a navigation problem rather than a content problem.

---

## The announcement

### Slack — the interest group channel

> Lucas and I built a thing and we'd like you to break it.
>
> It's a map of the US aerospace & defense ecosystem in two views: a 3D
> constellation of who works on what, and a value chain from raw materials to
> fielded capability showing where the US is covered and where it isn't.
>
> <YOUR_URL>
>
> Two minutes is enough. The one thing we want to know: **did you find a company
> or a supply-chain issue you didn't already know about?** There's a Feedback
> button in the corner — even a one-line "no, nothing new" is useful to us.
>
> Fair warning: the coverage percentages are our estimates, not published
> statistics. The underlying facts are sourced and linked. If something looks
> wrong, please tell us — that's more helpful than being polite about it.

### Email — for anyone not in the channel

> **Subject:** A&D ecosystem map — 2 minutes, and we want you to poke holes in it
>
> Hi <name>,
>
> Lucas and I have been trying to answer a question we kept hitting in our own
> recruiting prep: which companies actually work on which problems in aerospace
> and defense, and where is the supply chain thin. The existing answer is forty
> browser tabs and a second-year who names the same four companies.
>
> So we built a map of it. Two views — a 3D constellation of the ecosystem, and a
> value chain from raw materials through to fielded capability showing what's
> well covered and what isn't:
>
> <YOUR_URL>
>
> It's a working draft. The coverage percentages and risk ratings are our
> estimates rather than published figures, though the facts underneath them are
> sourced and linked. If you see something wrong we'd genuinely rather hear it.
>
> Two minutes is plenty. The question we most want answered is whether you found
> a company or an issue you didn't already know about — there's a Feedback
> button in the bottom corner, and "no, nothing new" is a perfectly useful
> answer.
>
> Thanks,
> Nat

**Why these are written the way they are:** they ask for one specific thing
rather than "any thoughts," they pre-commit to the estimate caveat so nobody
feels misled, and they explicitly license negative answers. People default to
being nice about a friend's project, which produces useless data. Saying *"no,
nothing new is useful to us"* out loud is what makes the null result reportable.

Do not write "excited to share" or "would love your thoughts." Both invite
compliments instead of information.

---

## Running the five sessions

Thirty minutes each. The whole method:

1. Send the link. Say: *"Find a company you'd want to email. Talk out loud."*
2. **Then stop talking.** Do not explain the interface. Do not defend a choice.
   Do not answer "what does this do?" with anything but "what do you think it
   does?"
3. Write down every hesitation, every wrong click, every moment they scroll past
   something you thought was obvious.
4. At the end only: "What would you have wanted that isn't here?"

The silence is the hard part and it is the whole technique. Every word you say
to help them is a data point you destroyed.

---

## Deciding what to do with the answers

Expect requests you've already deliberately excluded — job listings, a login,
company news feeds. `docs/01-product-brief.md` has them in the anti-scope list.
**Being asked for something is not evidence you should build it.** The test is
whether it serves the one-sentence moment of value.

Sort responses into three buckets:

- **Confusion** — they couldn't do something the product already does. Fix
  immediately; it's cheap and it's your fault.
- **Missing content** — a company, a material, a segment that should be there.
  Cheap, additive, no scope risk. Do it.
- **Missing capability** — a new feature. Price it in hours, then find something
  of equal size to delete. This is where projects die.

And the response to watch hardest for: **a factual correction.** Someone who
works at one of these companies telling you a number is wrong is the single most
valuable message you'll get. Fix it that day, reply thanking them, and add the
source to `data.js`. That interaction is also, incidentally, a better networking
outcome than anything the map itself will produce.
