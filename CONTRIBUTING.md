# Contributing Playbook

This document is the contract for every builder/QA/maintainer agent working on the Weaver Invoicing platform.

## Branching & PRs

1. **Never push to `main`.** Create a branch per ticket: `feature/US23-timeline`, `fix/schema-rules`, etc.
2. Keep branches focused on a single story/sub-task.
3. Open a PR as soon as the slice is reviewable; don’t wait for perfection.
4. CI (lint/build/tests) must pass before merge. Maintainer bot will block otherwise.

## Mandatory files to touch

| Scenario | Required updates |
| --- | --- |
| New/updated service/helper | Update `docs/services/<service>.md`, add or adjust tests. |
| Schema/migration change    | Place SQL/CLI files under `supabase/` and document in `docs/architecture.md`. |
| UI component work          | Include screenshot or storybook link in the PR description. |
| Any task > 5 minutes       | Log start/stop in `logs/timesheet.md`. |

## Services & shared helpers

- **Search before coding.** Reuse modules from `packages/shared` or documented services.
- When a new generic helper is needed, add it under `packages/shared/` and document the API.
- Do not break existing function signatures; extend them with optional params instead.

## Documentation

- `docs/architecture.md` describes the system. Update it when flows, infra, or conventions change.
- Each service or module used across features must have an entry inside `docs/services/`.
- Link PRs to the doc lines you touched when relevant.

## Testing & quality

- `npm run lint` must pass before you request review.
- Add unit/integration tests whenever a service or hook gains logic.
- Snapshots (if any) belong next to their components.

## Timesheet discipline

Every agent is responsible for updating `logs/timesheet.md` with: date, start time, end time, duration, story/subtask ID, tool cost (if available), result. This is how we’ll calibrate “story points per IA”. Missing logs = rework.

## Maintainer responsibilities

- Validate PR scope vs. story points.
- Resolve git conflicts while preserving both contributions.
- Reject PRs that skip docs/tests/timesheet.
- Keep `main` deployable at all times.

Follow these rules and CI + maintainer bot will take care of the rest. Deviate and your PR will be bounced.
