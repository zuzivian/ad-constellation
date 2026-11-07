# NOTES — running state

Short and current. The standing brief is `CLAUDE.md`. Decisions with reasons go in
`docs/07-decision-log.md`. Feedback, as it arrived, goes in `docs/11-feedback-log.md`.

## Checks
- `node scripts/check-data.js`: the data validation gate. Run it before any `data.js` change lands.
- There's no browser test suite. A headless Chromium smoke test (both views, 1440 and 390 px, a
  `?focus=` deep link, no page errors, no horizontal scroll, no third-party requests) was run by
  hand on 2026-11-07. It isn't committed because adding Playwright to the repo would mean npm.

## Done
- 2026-11-07 (autopilot): keyboard shortcuts no longer fire while you type in the feedback
  widget (both views). Fixed 12 px of horizontal overflow on the value chain at phone width.
  Value-chain segments are now keyboard-focusable. Search has an accessible name. Added
  `scripts/check-data.js`.

## Next
- Feedback #2 (`docs/11`): four value-chain KPIs (build-to-print vs design-to-spec, capex
  intensity, fixed costs, mission criticality). Every value would be a judgement score, so
  it needs Nat or Lucas to decide whether to add scores at all. See the open question on
  publishing scores. It isn't safe to do unattended.
- The open questions at the bottom of `docs/07`. All of them are Nat or Lucas calls.
- Companion table for the constellation: the v2 screen-reader answer, logged 2026-09-17.

## Gotchas
- `data.js` runs in a `vm` context in the check script and only touches `window.AD`. Keep it
  free of DOM calls at load time or the check breaks.
- The value-chain spine re-renders with `innerHTML` on every selection, so `pick()` puts
  focus back on the selected segment. Keep that if you change the redraw.
- PR #1 (the RDI drone-inquiry re-orientation) was closed unmerged. Don't revive it
  without Nat asking.
