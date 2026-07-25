# Quality Harness

This document defines the first small, reviewable quality-harness slice for Twirlmate Mobile.

## Decision

Use `@playwright/test` against the Expo web target, backed by a local deterministic fixture server.

Why this is the cleanest first slice:

- It exercises the real Expo Router app already shipped in this repo instead of a mockup.
- It works with the current stack (`expo`, `expo-router`, `react-native-web`) without adding a native simulator or dev-client requirement to every PR.
- It can emit recorded videos, HTML reports, screenshots on failure, and traces in a form that is usable both locally and in CI.
- It lets the app run against committed fixture data so recorded evidence stays stable and reviewable.

Tradeoffs and limits:

- This validates the React Native Web rendering path, not a native iOS or Android dev build.
- It is a deliberate first harness slice for repeatable product-flow evidence. Native device automation can be added later if the app starts depending on native-only behavior.

## Compatibility Verification

Verified on July 25, 2026:

- Node `22.18.0`
- npm `10.9.3`
- `npm install -D @playwright/test` completed successfully in this repo

The harness should not be treated as accepted until at least one recorded run succeeds locally.

## In-Repo Layout

- Harness config: [playwright.config.ts](/Users/njhmagyar/.codex/worktrees/3eb7/twirlmate-mobile/playwright.config.ts)
- Runner and fixture server:
  - [scripts/quality-harness/run-quality-harness.mjs](/Users/njhmagyar/.codex/worktrees/3eb7/twirlmate-mobile/scripts/quality-harness/run-quality-harness.mjs)
  - [scripts/quality-harness/mock-server.mjs](/Users/njhmagyar/.codex/worktrees/3eb7/twirlmate-mobile/scripts/quality-harness/mock-server.mjs)
  - [scripts/quality-harness/fixture-data.mjs](/Users/njhmagyar/.codex/worktrees/3eb7/twirlmate-mobile/scripts/quality-harness/fixture-data.mjs)
- Representative tests: [tests/e2e/discovery-harness.spec.ts](/Users/njhmagyar/.codex/worktrees/3eb7/twirlmate-mobile/tests/e2e/discovery-harness.spec.ts)
- Shared selectors: [constants/testIds.ts](/Users/njhmagyar/.codex/worktrees/3eb7/twirlmate-mobile/constants/testIds.ts)
- PR evidence template: [docs/quality-harness-pr-template.md](/Users/njhmagyar/.codex/worktrees/3eb7/twirlmate-mobile/docs/quality-harness-pr-template.md)

Generated artifacts live here and should stay out of commits:

- `artifacts/quality-harness/test-results/`
- `artifacts/quality-harness/playwright-report/`
- `artifacts/quality-harness/review-test-results/`
- `artifacts/quality-harness/review-playwright-report/`

## Commands

Use Node 22 for every harness command.

```bash
zsh -lc 'source ~/.nvm/nvm.sh >/dev/null 2>&1 && nvm use 22 >/dev/null && npm run test:e2e:install'
zsh -lc 'source ~/.nvm/nvm.sh >/dev/null 2>&1 && nvm use 22 >/dev/null && npm run test:e2e'
zsh -lc 'source ~/.nvm/nvm.sh >/dev/null 2>&1 && nvm use 22 >/dev/null && npm run test:e2e:record'
zsh -lc 'source ~/.nvm/nvm.sh >/dev/null 2>&1 && nvm use 22 >/dev/null && npm run test:e2e:review'
```

`npm run test:e2e` is the default harness check.

`npm run test:e2e:record` forces video capture for the representative flow so a PR author can attach a fresh recording.

`npm run test:e2e:review` keeps the same assertions but adds deliberate pauses and slower typing for human review recordings. It writes to the review-specific artifact folders so normal CI evidence stays fast and separate.

Optional tuning:

- `QUALITY_HARNESS_REVIEW_PAUSE_MS=1500 npm run test:e2e:review`
- `QUALITY_HARNESS_REVIEW_TYPE_DELAY_MS=160 npm run test:e2e:review`

## Current Coverage

The first harness slice covers:

- Events discovery to event detail
- People discovery to person detail
- Groups search, state filtering, state drill-down, and group detail
- Empty groups search recovery
- A retryable groups API failure and recovery path

## Human Review Recording Mode

Review-paced mode intentionally slows the browser timeline at meaningful moments instead of only increasing test timeouts:

- initial screen load
- typed search input
- state filter selection
- applied results
- detail arrival
- empty result
- retry and recovery

This keeps CI fast while producing recordings a human can actually review.

## Visual Feature Protocol

For future user-visible work:

- Before implementation, create a concise visual design checkpoint with the intended journey, key states, and a low-fidelity flow or wireframe.
- Pause for user feedback before building once that checkpoint exists.
- During implementation, report meaningful visual milestones with review-paced recordings or screenshots, not only at final handoff.

## Review Standard For Future PRs

For every user-visible feature:

- Add or extend an automated flow that drives the real app surface.
- Record at least one representative run of the changed happy path.
- Cover at least one meaningful alternate state when the change introduces or depends on one.
- Keep route files thin and selectors centralized instead of scattering ad hoc test strings.
