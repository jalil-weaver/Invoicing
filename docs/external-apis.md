# External Providers & Access Checklist

| Provider | Purpose | Current Status | What the Tech Lead must provide |
| --- | --- | --- | --- |
| **Supabase** | Primary data platform (Postgres, Auth, storage). | Project not yet created (local scaffolding ready). | - `SUPABASE_URL` (project REST URL)<br>- `SUPABASE_ANON_KEY` (public client)<br>- `SUPABASE_SERVICE_ROLE_KEY` (for migrations/Edge)<br>- Optional: database password if we use direct Postgres access. |
| **PennyLane** | Accounting sync (clients, invoices, charges). | Account not set up. | - Workspace credentials (email/password or API token)<br>- API base URL (sandbox/prod)<br>- Any webhook secret if needed. |
| **Email/Notification provider** (e.g., SendGrid, Postmark, etc.) | Transactional emails (invoice reminders, onboarding). | Not selected. | - Chosen provider + API key<br>- Sender/domain details. |
| **Auth/SSO (if applicable)** | Future-proofing (Magic Link, SSO). | TBD. | - Provider name (Auth0, Clerk, etc.)<br>- Client IDs/secrets. |
| **Analytics/Monitoring** (e.g., Logtail, Sentry) | Error tracking + metrics. | Not configured. | - Project DSNs / API tokens. |

## Process
1. Tech Lead supplies the secrets/credentials listed above (via secure channel you prefer).
2. I store them in the right place:
   - GitHub Secrets for CI/CD
   - `.env.local` template entries (`.env.example`)
   - Supabase config if required
3. Builders consume only the environment variables; no direct access to dashboards unless you grant it.

Let me know as soon as you have any of these credentials and I’ll wire them up. 