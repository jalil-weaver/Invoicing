# Architecture Overview

## High-level components

1. **Frontend (`apps/web`)** – Next.js 14 (App Router) + Tailwind. Talks to Supabase/PostgREST + third-party APIs.
2. **Backend data layer (`supabase/`)** – schema, RLS policies, triggers and edge functions. Supabase CLI migrations will live here.
3. **Shared services (`packages/shared/`)** – pure TypeScript helpers that can be consumed by builders (e.g., currency formatting, recurrence calculators, PennyLane adapters).
4. **Docs & playbooks (`docs/`, `logs/`)** – contract for AI agents, service catalogs, time tracking.

## Conventions

- **TypeScript everywhere.** No JS files in new code.
- **Absolute imports** use `@/*` alias (already configured in the Next.js app).
- **Styling**: Tailwind + shared component primitives (to be added under `apps/web/src/components/ui`).
- **State/data**: React Server Components for data fetching when possible; client components should use React Query / SWR (TBD) for mutations.
- **Supabase**: store SQL migrations under `supabase/migrations/<timestamp>_<name>.sql`. Policies & seeds belong in `supabase/seed.sql` or dedicated directories.

## Build pipeline (future CI outline)

1. `npm install`
2. `npm run lint`
3. `npm run build`
4. Supabase schema diff (once migrations exist)

## Pending work

- Define Supabase schema for Prévisionnel, Clients, Projets, Charges.
- Add shared UI kit + design tokens.
- Hook up CI (GitHub Actions) for lint/build + optional Supabase checks.

Keep this file up to date every time we add a new subsystem or convention.
