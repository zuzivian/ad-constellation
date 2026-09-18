# 01 — Product brief  (Phase 0 output)

Two pages, no code, written before anything else. Replace our answers with
yours; keep the five headings.

---

## 1. The one person

A Stanford GSB first-year, six weeks into the fall quarter. They have decided
they're interested in defense and space, mostly from podcasts and one a16z
essay. They can name SpaceX, Anduril, Palantir, and maybe Lockheed. They have
a Career Management Center meeting in ten days and nothing to say in it.

They are not a "user segment." They are the four people in our study group.

## 2. What they do today

- Open 40 browser tabs from a Slack thread and close 38 of them.
- Ask a second-year, who names the same four companies.
- Read fund portfolio pages, which are alphabetical lists with no structure.
- Search the GSB alumni database by employer — which only works if you already
  know the employer's name. This is the core failure.

**Competition is the 40-tab workflow, not another app.** We only have to be
better than tabs.

## 3. The moment of value

> In ninety seconds, they find four companies they had never heard of that sit
> on the capability they actually care about, and they can see who funds those
> companies and who buys from them.

Everything in the PRD has to serve that sentence. If a feature doesn't, it
goes in anti-scope.

The structural insight behind it: the ecosystem is not a list of companies, it
is a *bipartite graph of capabilities and organizations*. Nobody publishes it
that way. That's the gap, and it's why a graph — not a table — is the right
form.

## 4. How we'll know it worked

**Primary:** 4 of 5 test users name at least one company they'd email that they
did not know before using it. Measured by sitting next to them.

**Secondary:** median time-to-first-useful-discovery under 90 seconds.

**Explicitly not metrics:** pageviews, time on site, shares. A tool that
answers your question in 40 seconds and gets closed is a success.

## 5. Anti-scope

We are not building:

- Authentication or user accounts
- A database or any server-side code
- User-submitted companies or edits
- A news / funding-announcement feed
- Full-text search over filings or documents
- Mobile-first layout
- Job listings or an application tracker
- Any kind of "ask the AI about this company" chat

Each of these is a reasonable product. None is this product. Revisit this list
only at the end of Phase 6, with user evidence.

---

## The risk we were most wrong about

We assumed the 3D visualization was the risky, expensive part. The Phase 1
spike showed it's roughly 6–10 hours because the library does it. The
expensive part is 200–300 rows of verified, sourced ecosystem data — 12–20
hours of human research that AI cannot shortcut without fabricating.

That single finding moved ~15 hours from engineering to research in the
roadmap, in week one. That is what a spike is for.
