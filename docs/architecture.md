# Architecture Overview

## High-level components

1. **Frontend (`apps/web`)** – Next.js 14 (App Router) + Tailwind. Talks to Supabase/PostgREST + third-party APIs.
2. **Backend data layer (`supabase/`)** – schema, RLS policies, triggers and edge functions. Supabase CLI migrations will live here.
3. **Shared services (`packages/shared/`)** – pure TypeScript helpers that can be consumed by builders (e.g., currency formatting, recurrence calculators, PennyLane adapters).
4. **Docs & playbooks (`docs/`, `logs/`)** – contract for AI agents, service catalogs, time tracking.

## Recent schema additions
- `clients` table (US01) with unique name, billing/contact info, currency, PO number, timestamps + trigger for `updated_at`.
- RLS enabled (service-role inserts via server actions pour l’instant).

## Conventions

- **TypeScript partout.**
- **Imports absolus** via `@/*`.
- **UI**: Tailwind + composants partagés.
- **Data layer**: React Server Components + server actions pour les écritures (ex: création client) ; `@supabase/supabase-js` côté serveur avec service role.
- **Supabase**: migrations dans `supabase/migrations/<timestamp>_<name>.sql`, `supabase db push` pour synchroniser le cloud.

## Build pipeline (CI GitHub Actions)
1. `npm install`
2. `npm run lint`
3. `npm run build`

## À faire
- Définir le schéma Projets/Charges/Milestones.
- Ajouter UI kit commun.
- Tests E2E/preview Supabase une fois les migrations multiples en place.
