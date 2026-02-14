# Supabase Workspace

This folder will hold migrations, seeds, and policies for the invoicing platform.

## Usage

1. Install the Supabase CLI: `npm install -g supabase`.
2. Initialize once (already done locally):
   ```bash
   supabase init
   ```
3. Create migrations:
   ```bash
   supabase migration new add_clients_table
   ```
4. Apply locally:
   ```bash
   supabase db reset
   ```

Keep SQL files deterministic and reference them from the PR description whenever schema changes occur.
