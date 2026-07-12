# Release Readiness

This file is the canonical checklist for getting Twirlmate Mobile ready for app store submission.

## How To Use This File

- Update task status before and after substantial work.
- Add verification notes when a task is completed.
- If a task turns out to be larger than expected, split it into smaller follow-up items here.
- If multiple LLM sessions are working in parallel, each session should claim one or more tasks by name.

Status legend:

- `todo`
- `in-progress`
- `blocked`
- `done`

Recommended task fields:

- `Status`
- `Owner`
- `Files`
- `Definition of done`
- `Verification`

## Blockers

### 1. Fix build and typecheck failures

- Status: `done`
- Owner: `codex`
- Files:
  [app/_layout.tsx](/Users/njhmagyar/Documents/twirlmate/twirlmate-mobile/app/_layout.tsx)
  [app/events/[id].tsx](/Users/njhmagyar/Documents/twirlmate/twirlmate-mobile/app/events/[id].tsx)
  [app/(tabs)/events.tsx](/Users/njhmagyar/Documents/twirlmate/twirlmate-mobile/app/(tabs)/events.tsx)
  [app/(tabs)/people.tsx](/Users/njhmagyar/Documents/twirlmate/twirlmate-mobile/app/(tabs)/people.tsx)
- Definition of done:
  `npx tsc --noEmit` passes with no errors.
- Verification:
  `npm run typecheck` passes under Node 22 on 2026-07-11 after fixes in `app/_layout.tsx`, `app/events/[id].tsx`, `app/(tabs)/events.tsx`, and `app/(tabs)/people.tsx`.

### 2. Restore a reliable lint workflow

- Status: `done`
- Owner: `codex`
- Files:
  [package.json](/Users/njhmagyar/Documents/twirlmate/twirlmate-mobile/package.json)
- Definition of done:
  The repo has a documented supported Node version and `npm run lint` works locally and in CI.
- Verification:
  Added `engines.node`, `.nvmrc`, and `.node-version` on 2026-07-11. `npm run lint` succeeds locally under Node 22 with warnings only. CI is still a follow-up item for a separate workflow.

### 3. Fix broken navigation routes

- Status: `done`
- Owner: `codex`
- Files:
  [app/(tabs)/index.tsx](/Users/njhmagyar/Documents/twirlmate/twirlmate-mobile/app/(tabs)/index.tsx)
- Definition of done:
  Home-screen navigation points only to valid routes and is verified manually.
- Verification:
  Fixed the invalid home-screen coaches route to point to `/(tabs)/people` on 2026-07-11. Route typing was tightened in `app/(tabs)/index.tsx`.

### 4. Resolve incomplete v1 product surface

- Status: `done`
- Owner: `codex`
- Files:
  [app/(tabs)/groups.tsx](/Users/njhmagyar/Documents/twirlmate/twirlmate-mobile/app/(tabs)/groups.tsx)
  [app/groups/[id].tsx](/Users/njhmagyar/Documents/twirlmate/twirlmate-mobile/app/groups/[id].tsx)
  [app/groups/by-state/[state].tsx](/Users/njhmagyar/Documents/twirlmate/twirlmate-mobile/app/groups/by-state/[state].tsx)
  [components/GroupsList.tsx](/Users/njhmagyar/Documents/twirlmate/twirlmate-mobile/components/GroupsList.tsx)
  [app/(tabs)/_layout.tsx](/Users/njhmagyar/Documents/twirlmate/twirlmate-mobile/app/(tabs)/_layout.tsx)
  [app/(tabs)/index.tsx](/Users/njhmagyar/Documents/twirlmate/twirlmate-mobile/app/(tabs)/index.tsx)
- Definition of done:
  `Groups` is either implemented to a launchable baseline or removed from visible navigation and home actions.
- Verification:
  Added a live API-backed Groups list, matching detail route, and state drill-down routes on 2026-07-11, preserving the existing tab and home-screen entry points while replacing the placeholder screen.

### 5. Fix invalid or incomplete release assets/config

- Status: `done`
- Owner: `codex`
- Files:
  [app.json](/Users/njhmagyar/Documents/twirlmate/twirlmate-mobile/app.json)
  [assets/images](/Users/njhmagyar/Documents/twirlmate/twirlmate-mobile/assets/images)
- Definition of done:
  All referenced assets exist and release metadata includes valid bundle/package identifiers and versioning fields.
- Verification:
  Added splash asset plus `expo.ios.bundleIdentifier`, `expo.ios.buildNumber`, `expo.android.package`, and `expo.android.versionCode`. `npm run release:config` passes under Node 22 on 2026-07-11.

## Required Before Submission

### 6. Add release build configuration

- Status: `done`
- Owner: `codex`
- Files:
  [app.json](/Users/njhmagyar/Documents/twirlmate/twirlmate-mobile/app.json)
  [package.json](/Users/njhmagyar/Documents/twirlmate/twirlmate-mobile/package.json)
  [eas.json](/Users/njhmagyar/Documents/twirlmate/twirlmate-mobile/eas.json)
  [scripts/release-config-check.cjs](/Users/njhmagyar/Documents/twirlmate/twirlmate-mobile/scripts/release-config-check.cjs)
  [README.md](/Users/njhmagyar/Documents/twirlmate/twirlmate-mobile/README.md)
- Definition of done:
  The project has a documented release build path for iOS and Android, including `eas.json` if Expo Application Services will be used.
- Verification:
  Added `eas.json` production/store build profiles plus `release:build:*` and `release:submit:*` scripts on 2026-07-11. `npm run release:config` and `npm run release:check` both pass locally under Node 22 after validating the EAS config shape. Actual `eas build` execution still requires Expo login and store credentials.

### 7. Add explicit project quality gates

- Status: `done`
- Owner: `codex`
- Files:
  [package.json](/Users/njhmagyar/Documents/twirlmate/twirlmate-mobile/package.json)
  [.github/workflows/release-check.yml](/Users/njhmagyar/Documents/twirlmate/twirlmate-mobile/.github/workflows/release-check.yml)
- Definition of done:
  The repo exposes at least `lint`, `typecheck`, and one release-check command that future sessions can run consistently.
- Verification:
  Added `typecheck`, `release:config`, and `release:check` scripts plus a GitHub Actions workflow on 2026-07-11. `npm run release:check` passes locally under Node 22 and CI is configured to run the same command on pull requests and pushes to `main`.

### 8. Add automated test coverage for critical flows

- Status: `done`
- Owner: `codex`
- Files:
  [package.json](/Users/njhmagyar/Documents/twirlmate/twirlmate-mobile/package.json)
  [app](/Users/njhmagyar/Documents/twirlmate/twirlmate-mobile/app)
  [components](/Users/njhmagyar/Documents/twirlmate/twirlmate-mobile/components)
- Definition of done:
  At minimum, critical navigation and data formatting logic have automated coverage and a runnable test command.
- Verification:
  Added a built-in Node 22 `npm test` command on 2026-07-11, covered event date/registration formatting plus encoded detail-route helpers, and got `npm run release:check` passing locally with the existing lint warnings only.

### 9. Centralize API and environment configuration

- Status: `todo`
- Owner:
- Files:
  [app/(tabs)/events.tsx](/Users/njhmagyar/Documents/twirlmate/twirlmate-mobile/app/(tabs)/events.tsx)
  [app/(tabs)/events-search.tsx](/Users/njhmagyar/Documents/twirlmate/twirlmate-mobile/app/(tabs)/events-search.tsx)
  [app/(tabs)/people.tsx](/Users/njhmagyar/Documents/twirlmate/twirlmate-mobile/app/(tabs)/people.tsx)
  [components/EventsList.tsx](/Users/njhmagyar/Documents/twirlmate/twirlmate-mobile/components/EventsList.tsx)
  [components/CoachesList.tsx](/Users/njhmagyar/Documents/twirlmate/twirlmate-mobile/components/CoachesList.tsx)
- Definition of done:
  API base URLs and other runtime config are defined once and consumed everywhere else.
- Verification:

### 10. Replace debug behavior with production-grade error UX

- Status: `todo`
- Owner:
- Files:
  [app/(tabs)/events-search.tsx](/Users/njhmagyar/Documents/twirlmate/twirlmate-mobile/app/(tabs)/events-search.tsx)
  [app/(tabs)/events.tsx](/Users/njhmagyar/Documents/twirlmate/twirlmate-mobile/app/(tabs)/events.tsx)
  [app/(tabs)/people.tsx](/Users/njhmagyar/Documents/twirlmate/twirlmate-mobile/app/(tabs)/people.tsx)
  [app/events/[id].tsx](/Users/njhmagyar/Documents/twirlmate/twirlmate-mobile/app/events/[id].tsx)
  [app/people/[id].tsx](/Users/njhmagyar/Documents/twirlmate/twirlmate-mobile/app/people/[id].tsx)
- Definition of done:
  Debug `console.log` calls are removed and network failures have clear user-facing fallback behavior.
- Verification:

## Submission Operations

### 11. Create a manual QA checklist for physical devices

- Status: `todo`
- Owner:
- Files:
  [docs/release-readiness.md](/Users/njhmagyar/Documents/twirlmate/twirlmate-mobile/docs/release-readiness.md)
- Definition of done:
  There is a repeatable QA checklist covering navigation, loading states, deep links, dark mode, and external links on real devices.
- Verification:

### 12. Prepare App Store and Play Store metadata

- Status: `todo`
- Owner:
- Files:
  [docs/release-readiness.md](/Users/njhmagyar/Documents/twirlmate/twirlmate-mobile/docs/release-readiness.md)
- Definition of done:
  Store description, keywords, screenshots, support URL, privacy policy URL, and release notes are prepared.
- Verification:

### 13. Confirm privacy and policy readiness

- Status: `todo`
- Owner:
- Files:
  [app.json](/Users/njhmagyar/Documents/twirlmate/twirlmate-mobile/app.json)
- Definition of done:
  App permissions, external linking behavior, and any required privacy disclosures are reviewed before submission.
- Verification:

## Nice To Have

### 14. Clean up starter-template leftovers

- Status: `todo`
- Owner:
- Files:
  [README.md](/Users/njhmagyar/Documents/twirlmate/twirlmate-mobile/README.md)
  [package.json](/Users/njhmagyar/Documents/twirlmate/twirlmate-mobile/package.json)
- Definition of done:
  Starter Expo content and unused reset-project scaffolding are removed or replaced with project-specific docs.
- Verification:

### 15. Improve type definitions and remove `any`

- Status: `todo`
- Owner:
- Files:
  [types/api.ts](/Users/njhmagyar/Documents/twirlmate/twirlmate-mobile/types/api.ts)
  [components/EventCard.tsx](/Users/njhmagyar/Documents/twirlmate/twirlmate-mobile/components/EventCard.tsx)
  [components/CoachCard.tsx](/Users/njhmagyar/Documents/twirlmate/twirlmate-mobile/components/CoachCard.tsx)
- Definition of done:
  High-traffic code paths use specific types instead of `any` where feasible.
- Verification:

## Session Handoff

When finishing a task, add a short note here:

- Date:
- Session:
- Task:
- Outcome:
- Follow-ups:

- Date: `2026-07-11`
- Session: `codex`
- Task: `Systematize release validation workflow`
- Outcome: `Added Node version pinning, a release-config validator script, and package scripts for typecheck and release checks.`
- Follow-ups: `Run the new commands under Node 22+, then fix the known typecheck/lint/config blockers until release:check passes.`

- Date: `2026-07-11`
- Session: `codex`
- Task: `Get release:check green under Node 22`
- Outcome: `Fixed release config blockers, added the missing splash asset, resolved the TypeScript failures, and got npm run release:check passing locally under Node 22.`
- Follow-ups: `Triage the remaining lint warnings and add CI to run release:check automatically.`

- Date: `2026-07-11`
- Session: `codex`
- Task: `Resolve incomplete v1 product surface`
- Outcome: `Promoted Groups into the v1 surface with a live API-backed list screen, detail route, and state drill-down routes.`
- Follow-ups: `Add device QA coverage for the Groups flow and decide whether the empty by-type endpoint should drive a future category view once backend data is populated.`

- Task: `Add release build configuration`
- Outcome: `Checked in an EAS build/submit config, documented the release commands, and extended release-config validation to cover EAS production profiles.`
- Follow-ups: `Run a credentialed EAS build for both platforms and capture any account-level setup requirements that cannot live in repo config.`

- Date: `2026-07-11`
- Session: `codex`
- Task: `Add automated test coverage for critical flows`
- Outcome: `Added a Node 22 built-in test runner command and covered shared event-formatting, image URL normalization, and detail-route helper logic used by the event, people, and groups flows.`
- Follow-ups: `Decide whether to keep the Node test-runner module warnings as-is or switch to a dedicated test module format, and triage the remaining lint warnings when tackling the production cleanup items.`

- Date: `2026-07-11`
- Session: `codex`
- Task: `Configure CI for release checks`
- Outcome: `Added a GitHub Actions workflow that installs dependencies on Node 22 and runs npm run release:check for pull requests and pushes to main.`
- Follow-ups: `Watch the first CI run to confirm environment parity and decide later whether lint warnings should become CI-failing errors.`
