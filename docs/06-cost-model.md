# 06 — Cost model

## v1 as specified

| Item | Cost | Notes |
|---|---|---|
| Hosting — Cloudflare Pages | **$0** | Static site. Free tier is unlimited requests. Netlify/Vercel/GitHub Pages equivalent. |
| Domain | **$12/yr** | Cloudflare Registrar at cost, or Namecheap. |
| SSL | **$0** | Included by every host above. |
| Libraries — 3d-force-graph, three.js | **$0** | MIT licensed, served from jsDelivr. |
| Data | **$0** | USAspending, SBIR, SAM, EDGAR are all free and unmetered. |
| AI coding assistant | **$20–100/mo per person** | The only meaningful line. One shared seat works if one person does the building. |
| Analytics — Plausible (optional) | **$9/mo** | Or nothing. You'll learn more from five user sessions than from any dashboard. |
| Design assets | **$0** | System fonts. No stock imagery — the palette and motion do the work. |

### Project total, 3 people over 5 weeks

| Scenario | Total |
|---|---|
| Lean — one shared AI seat, no analytics, no domain | **≈ $25** |
| Normal — one AI seat at $100/mo × 2 months, domain | **≈ $215** |
| Comfortable — three AI seats, domain, analytics | **≈ $400** |

**The entire monetary cost of this project is your AI subscriptions.** That's
the real headline. The binding constraint is your 63–95 hours, not dollars.

## What it costs if it works and you keep going

| Addition | Cost | When you'd need it |
|---|---|---|
| Supabase (Postgres + auth) | **$0** free tier → $25/mo | Only when users need saved state or you need to edit data without redeploying. Free tier covers a few thousand users. |
| Vercel Pro | $20/mo | Only if you add server-side rendering. A static site never needs this. |
| Custom email domain (Google Workspace) | $7/user/mo | If you're emailing companies as the project. |
| Crunchbase API | $500+/yr | Only if you go past ~500 nodes and refresh monthly. |
| PitchBook seat | ~$20k/yr | Never, as a student project. **Check whether the GSB library already has access.** |
| An actual engineer, contract | $80–200/hr | If you get traction and want a real backend. 40 hours = $3–8k. |

## The cost that isn't money

Be honest in your own planning about the two real costs:

**Opportunity cost.** 63–95 hours is roughly one elective's worth of effort. If
the goal is recruiting outcomes, compare against 80 hours of direct outreach —
that's ~160 cold emails. The map is only the better use of time if (a) the
research itself is the recruiting prep, which here it genuinely is, and (b) the
artifact becomes a conversation-opener with the people you're trying to reach.
Both are plausible here. Say so out loud rather than assuming it.

**Reputational cost of publishing wrong facts.** A public map with fabricated
funding rounds, shown to an alum who works at one of those companies, is worse
than no map. This is why `docs/04` requires a source URL per row. The cost of
that rule is ~4 minutes per node. Pay it.
