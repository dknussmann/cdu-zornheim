# CDU Zornheim

Website of the CDU Ortsverband Zornheim (news, events, get involved).

## Stack

- Next.js 16 App Router + Tailwind 4 + TypeScript
- Neon Postgres via Drizzle ORM (`src/db/`)
- Admin auth: magic-link session by default; Clerk when Clerk env vars are set
- Vercel Blob for post images
- LaunchDarkly flag `show-event-calendar`

## Commands

```bash
npm ci                 # install (preferred in CI / cloud)
npm run dev            # http://localhost:3000
npm run build          # production build
npm run lint           # ESLint
npm run db:push        # push Drizzle schema to Neon (needs DATABASE_URL)
npm run db:seed        # seed sample data (needs DATABASE_URL)
```

## Layout

- `src/app/` – App Router pages and server actions
- `src/components/` – UI (feed, composer, calendar, hero)
- `src/db/` – Drizzle schema and client
- `src/lib/` – session / admin helpers
- `scripts/` – seed and LaunchDarkly setup

## Auth notes

- Magic link: `/sign-in` → email → verify link. Optional allowlist: `ADMIN_EMAILS`.
- Clerk: if `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY` are set, Clerk replaces magic-link.

## Cursor Cloud specific instructions

### Environment

- Dependencies: `npm ci` (already in `.cursor/environment.json` `install`).
- Dev server: started via the configured terminal (`npm run dev` on port 3000).
- Do not put secrets in the repo. Use Cursor Dashboard → Cloud Agents → Secrets (mirror `.env.example`).
- Prefer writing `.env.local` from those secrets only when a tool requires a file (e.g. some Drizzle flows); otherwise rely on process env.

### Required secrets for full loops

| Secret | Needed for |
| --- | --- |
| `DATABASE_URL` | `db:push`, `db:seed`, reading/writing posts |
| `ADMIN_SESSION_SECRET` | Magic-link admin sessions |
| `BLOB_READ_WRITE_TOKEN` | Uploading post images |
| `ADMIN_EMAILS` | Restrict who can post (optional but recommended) |
| `NEXT_PUBLIC_SITE_URL` | Absolute URLs / links |
| Clerk keys | Only if testing Clerk login |
| `NEXT_PUBLIC_LAUNCHDARKLY_CLIENT_SIDE_ID` | Calendar feature flag (without it, calendar stays visible) |

### Provisioning a dev database

A Neon project named `cdu-zornheim` already exists in the connected Neon org. For autonomous work, create/use an **isolated branch** off it (do not run `db:push`/`db:seed`/writes against the parent/production branch) and point `DATABASE_URL` at that branch in `.env.local`. `src/db/index.ts` instantiates the client at import and throws if `DATABASE_URL` is unset, so the app cannot render without a reachable Postgres. A branch copies existing schema + data, so `db:push` may report "No changes" and `db:seed` may skip (data already present) — that is expected, not an error.

### Known caveats (current code, unmerged fixes aside)

- `npm run lint` currently fails on a clean checkout with 2 pre-existing errors (`FeatureFlaggedCalendar.tsx` set-state-in-effect, `SiteHeaderNav.tsx` html-link-for-pages). Not an environment problem.
- **Magic-link admin login is broken on this Next.js version.** `/sign-in/verify` is a Server Component that sets the session cookie during render, which throws `Cookies can only be modified in a Server Action or Route Handler` (`src/lib/session.ts` `consumeMagicToken`). Also, `getSessionEmail` splits the cookie on `.`, so sessions for emails containing a dot never validate. To exercise admin-only UI (the "Neuen Beitrag verfassen" composer / posting) in dev without editing code, inject a valid `cdu_admin_session` cookie: value is `` `${email}|${Date.now()}.${sig}` `` where `sig = sha256(`${email}|${ts}.${ADMIN_SESSION_SECRET}`)` hex, first 32 chars; use a dot-free email such as `admin@localhost`. The composer → `createPost` server action → Neon insert → feed render path works once that cookie is set.

### Verify changes

1. `npm run lint`
2. `npm run build` when touching routing, server actions, or env-dependent code
3. Exercise the UI on `http://localhost:3000` when possible (feed, composer if admin session works, calendar)
4. After schema changes: `npm run db:push` (only with a non-production / branch database URL)

### Do not

- Commit `.env.local` or real credentials
- Run destructive DB operations against production without an explicit ask
- Change LaunchDarkly production flags unless asked (`LD_API_TOKEN` + `scripts/setup-launchdarkly.ts`)
