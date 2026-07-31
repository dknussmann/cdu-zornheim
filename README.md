# CDU Zornheim

Website des CDU Ortsverbands Zornheim – Neuigkeiten, Termine und Mitmachen.

**Live:** https://cdu-zornheim.vercel.app

## Stack

- Next.js (App Router) + Tailwind
- Neon Postgres + Drizzle
- Admin-Login (Magic Link; optional Clerk)
- Vercel Blob (Beitragsbilder)
- LaunchDarkly Flag `show-event-calendar`

## Lokal starten

```bash
npm install
cp .env.example .env.local
# Werte setzen – in Production: ADMIN_SESSION_SECRET und ADMIN_EMAILS
npm run db:push
npm run db:seed
npm run dev
```

## Admin-Login

1. `/sign-in` öffnen
2. E-Mail eingeben (in Production via `ADMIN_EMAILS` einschränken)
3. Anmeldelink öffnen – Composer erscheint oben im Feed

Mit Clerk: Marketplace-Integration in Vercel hinzufügen, Env pullen und neu deployen. Clerk ersetzt den Magic-Link-Flow automatisch.

## LaunchDarkly

```bash
LD_API_TOKEN=... npx tsx scripts/setup-launchdarkly.ts
```

`NEXT_PUBLIC_LAUNCHDARKLY_CLIENT_SIDE_ID` in Vercel (Production + Preview) setzen. Ohne Client-ID bleibt der Kalender sichtbar.
