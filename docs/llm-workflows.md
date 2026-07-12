# LLM Workflows

This file captures durable operating instructions for AI sessions working in this repository.

## Why This Exists

The goal is to reduce repeated manual coordination and make it easy for parallel LLM sessions to pick up work safely.

## Canonical Files

- [CLAUDE.md](/Users/njhmagyar/Documents/twirlmate/twirlmate-mobile/CLAUDE.md)
  Repo-level context and standing instructions for AI assistants.
- [docs/release-readiness.md](/Users/njhmagyar/Documents/twirlmate/twirlmate-mobile/docs/release-readiness.md)
  Concrete launch and release checklist.
- Future task trackers should usually live in `docs/` and follow the same pattern.

## Environment Baseline

- The repo is currently pinned to Node `22` via [package.json](/Users/njhmagyar/Documents/twirlmate/twirlmate-mobile/package.json), [.nvmrc](/Users/njhmagyar/Documents/twirlmate/twirlmate-mobile/.nvmrc), and [.node-version](/Users/njhmagyar/Documents/twirlmate/twirlmate-mobile/.node-version).
- If the Node baseline changes, update all three places together.
- When running local quality gates in a shell that is not already on Node 22, prefer `zsh -lc 'source ~/.nvm/nvm.sh >/dev/null 2>&1 && nvm use 22 >/dev/null && npm run release:check'`.

## Standard Workflow For Any Substantial Task

1. Read [CLAUDE.md](/Users/njhmagyar/Documents/twirlmate/twirlmate-mobile/CLAUDE.md) and the relevant tracker in `docs/`.
2. Check `git status` before editing.
3. Claim the task in the tracker by filling in `Status` and `Owner`.
4. Prefer one coherent workstream per session.
5. Verify changes with the strongest local checks available.
6. Update the tracker with what changed, what was verified, and what remains.

## Parallel Session Rules

- Do not assume another session is handling a task unless the tracker says so.
- If a task touches the same files as another in-progress task, either coordinate through the tracker or choose a different task.
- Favor file ownership by workstream:
  - release config
  - navigation/product surface
  - testing/quality gates
  - API/config refactors
- Add short handoff notes rather than relying on chat history.

## Optimization Rules

When a manual step repeats, convert it into repo knowledge.

Preferred order:

1. Add or improve an npm script.
2. Add or improve a tracker/checklist in `docs/`.
3. Add or improve a reusable utility or config module.
4. Add or improve a repo-level instruction in [CLAUDE.md](/Users/njhmagyar/Documents/twirlmate/twirlmate-mobile/CLAUDE.md).

Examples of changes that should usually be systematized:

- repeated release validation steps
- repeated environment setup steps
- repeated API base URL wiring
- repeated manual QA flows
- repeated explanations about what is launch-blocking

## Immediate Automation Opportunities

These are especially worth converting into reusable repo workflows:

- Maintain `npm run typecheck` as the baseline static check.
- Maintain `npm run release:check` as the standard local release gate.
- Keep the supported Node version pinned and documented consistently.
- Centralize API configuration instead of hard-coding URLs across screens.
- Add CI that runs the same checks future sessions are expected to use locally.

## Tracker Template For Future Workstreams

When creating a new tracker in `docs/`, prefer this shape:

- Purpose
- How to use the file
- Prioritized tasks
- For each task:
  - Status
  - Owner
  - Files
  - Definition of done
  - Verification
- Session handoff

## Session Handoff Template

- Date:
- Session:
- Task:
- Files changed:
- Checks run:
- Remaining risks:
- Recommended next step:
