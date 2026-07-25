# Quality Harness PR Checklist

Use this checklist in the PR description for any user-visible Twirlmate Mobile change.

## Acceptance Checklist

- [ ] Happy-path flow is covered by an automated app-driving test.
- [ ] Relevant alternate state is covered when the feature has one.
- [ ] Fresh recording command is listed.
- [ ] Recording artifact path is listed.
- [ ] Review-paced recording command is listed for human feedback.
- [ ] Review-paced artifact path is listed.
- [ ] Visual design checkpoint artifact is linked for user-visible features.
- [ ] Screenshots are attached when the PR changes visual layout or styling.
- [ ] `npm run release:check` was run under Node 22, or the exact blocker is stated.
- [ ] Architecture rationale is stated in 2-4 lines, including why the change stayed small and where selectors/modules were added.

## Evidence Map

Fill this section in the PR body.

| Requirement | Test file / command | Evidence artifact |
| --- | --- | --- |
| Happy path | `tests/e2e/...` | `artifacts/quality-harness/...` |
| Alternate state | `tests/e2e/...` | `artifacts/quality-harness/...` |
| Human review recording | `npm run test:e2e:review` | `artifacts/quality-harness/review-...` |
| Visual checkpoint | `docs/...` | linked markdown artifact |
| Release gate | `npm run release:check` | terminal output |
| Architecture rationale | short prose | PR description |

## Recording Snippet

```text
Recorded flow:
- Command:
- Scenario:
- Video:
- HTML report:
```

```text
Review-paced flow:
- Command:
- Pause settings:
- Video:
- HTML report:
- Visual checkpoint:
```
