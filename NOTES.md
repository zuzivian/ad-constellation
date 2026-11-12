# NOTES — running state

Short and current. The standing brief is `CLAUDE.md`. Decisions with reasons go in
`docs/07-decision-log.md`. Feedback, as it arrived, goes in `docs/11-feedback-log.md`.

## Checks
- `node scripts/check-data.js`: the data validation gate. Run it before any `data.js` change lands.
- `node scripts/test-gloss.js`: regression checks for glossary markup, including escaped text.
- `node scripts/check-static.js`: source-only guard for third-party requests, local fetches,
  library loading and local assets; it does not replace the browser smoke test.
- There's no browser test suite. A headless Chromium smoke test (both views, 1440 and 390 px, a
  `?focus=` deep link, no page errors, no horizontal scroll, no third-party requests) was run by
  hand on 2026-11-07. It isn't committed because adding Playwright to the repo would mean npm.

## Done

### 2026-11-12
- Kept focus on value-chain tabs and risk filters after redraws (#19).
- Made constellation legend filters and the Tour button keyboard-operable (#20).
- Added validation for US_PERSON quotes, source URLs and dates (#21).
- Added screen-reader new-tab hints to value-chain links (#22).
- Made search match full names and prefer exact matches (#23).
- Updated documented node, edge and payload counts (#24).
- Added sourced UAS / autonomy companies and buyer edges, plus MBA-role notes (#33).
- Validated CHECKED_ON dates, org stages, whitespace rows and segment numbering (#34).
- Added gloss() regression tests and support for terms in HTML-escaped text (#35).
- Aligned the data schema with Drones, stages, CHECKED_ON and whitespace kinds (#36).
- Labelled value-chain coverage and risk numbers as estimates where they render (#37).
- Added screen-reader new-tab hints to constellation detail-panel links (#38).
- Routed constellation selections through selectNode(), restoring filtered-out types (#39).
- Added a static check for third-party requests, fetch() and library loading (#40).

### 2026-11-11
- Added the Drones (UAS) cluster with 11 sourced drone and counter-drone orgs (#12).
- Added the Chinny runner: Codex CLI on GitHub Actions (#11).

### Earlier work
- 2026-11-10 (autopilot run 3): both views honour the OS "reduce motion" setting. Camera
  flights become cuts, the starfield holds still, particles are off (arrows on lit edges stay),
  and panels fade instead of sliding. The value chain drops smooth scroll. `docs/07` row.
- 2026-11-07 (autopilot run 2): companion list for the constellation (`List` button, `L`, or the
  skip link that is the first Tab stop). One table per cluster plus investors and buyers, built
  from the graph's own `nodes`/`links`. Picking a name closes it, flies there and focuses the
  detail panel. PRD requirement 18; `docs/07` row. Detail-panel chips are now buttons (Tab +
  Enter follows them), with the ↗ evidence link beside the button and a full accessible name.
- 2026-11-07 (autopilot): keyboard shortcuts no longer fire while you type in the feedback
  widget (both views). Fixed 12 px of horizontal overflow on the value chain at phone width.
  Value-chain segments are now keyboard-focusable. Search has an accessible name. Added
  `scripts/check-data.js`.

## Next
Take small, scoped quality passes from current issues; check Done and open PRs before
starting so merged fixes are not repeated. Product decisions remain under Needs Nat.

## Needs Nat
- Run 3: do instant camera cuts under OS "reduce motion" feel disorienting? A short fade is the
  fallback. (No in-app motion toggle, on purpose.)
- Feedback #2 (`docs/11`): four value-chain KPIs (build-to-print vs design-to-spec, capex
  intensity, fixed costs, mission criticality). Every value would be a judgement score, so
  it needs Nat or Lucas to decide whether to add scores at all. See the open question on
  publishing scores. It isn't safe to do unattended.
- The open questions at the bottom of `docs/07`. All of them are Nat or Lucas calls.

## Gotchas
- Reduced motion is read live from one `calm` MediaQueryList in `index.html`. To test it, start a
  fresh Playwright context with `reducedMotion: 'reduce'`. `page.emulateMedia()` mid-page
  doesn't reliably fire the `change` event in headless Chromium (one flip in three fired), so a
  live-flip test gives false failures. Real OS changes do fire it.
- `data.js` runs in a `vm` context in the check script and only touches `window.AD`. Keep it
  free of DOM calls at load time or the check breaks.
- Value-chain redraws replace DOM nodes. `pick()` restores segment focus only if the spine
  had focus; tabs and risk filters likewise restore their focused control. Preserve that
  conditional restoration so redraws do not steal focus from elsewhere.
- Use `selectNode()` for every constellation selection path. It restores a hidden node type
  and its legend button state before highlighting, flying and opening the detail panel.
- The companion list is built once at load and ignores legend filters on purpose (it is the
  whole map). If `data.js` ever changes at runtime it would need rebuilding; it doesn't today.
- `.sr` (visually hidden) spans inside the list's tables need a positioned ancestor (`.tw`),
  or they escape the table's sideways scroller and make the page scroll at phone width.
- The RDI drone-inquiry re-orientation was closed unmerged. Don't revive it
  without Nat asking.
