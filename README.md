# Weaver Invoicing Platform

Modern invoicing console for Prévisionnel, Clients, Projets et Charges. This repo hosts everything needed to iterate fast with multiple AI builders: Next.js frontend, Supabase backend assets, shared services, and playbooks/docs.

## Structure

```
apps/
  web/               # Next.js 14 + Tailwind app (App Router)
docs/
  architecture.md    # System design + conventions
  services/          # Service-specific references
logs/
  timesheet.md       # Chrono log for every agent turn
packages/
  shared/            # Future shared libraries/helpers
supabase/            # Database schema, policies, seeds
```

## Requirements

- Node.js 20+
- npm 10+
- Supabase CLI (optional but recommended)

Install deps once:

```bash
npm install
```

### Useful scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start `apps/web` in dev mode |
| `npm run lint` | Run ESLint (Next.js config) |
| `npm run build` | Create production build |
| `npm run start` | Run compiled app |

Supabase workflows will live under `supabase/` (migrations, seeds). For now it only contains placeholders.

## Time tracking protocol

Every builder/maintainer/QA agent **must** log their task chronos inside [`logs/timesheet.md`](logs/timesheet.md):

1. Start a timer when you begin a unit of work (story, sub-task, review).
2. Stop it when you’re done *or* hand it off.
3. Append an entry with: timestamp, agent name, task/story ID, duration, tool cost if available, short note.

This is required to benchmark “story points per IA-hour”.

## Contributing & workflow

1. Create a feature branch from `main` (`feature/US23-timeline`).
2. Do your work inside the relevant workspace (`apps/web`, `supabase/`, `packages/shared`).
3. Ensure docs/tests are updated (especially service docs under `docs/services/`).
4. Run `npm run lint` before opening a PR.
5. Submit PRs for review; the maintainer bot merges only when CI is green.

Detailed rules live in [`CONTRIBUTING.md`](CONTRIBUTING.md).
