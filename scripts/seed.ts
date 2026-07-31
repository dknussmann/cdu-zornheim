import { config } from "dotenv";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { events, posts } from "../src/db/schema";

config({ path: ".env.local" });
config({ path: ".env" });

async function seed() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL fehlt");
  }

  const sql = neon(url);
  const db = drizzle(sql);

  await sql`CREATE TABLE IF NOT EXISTS posts (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    body text NOT NULL,
    image_url text,
    image_alt text,
    author_email varchar(320) NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now()
  )`;

  await sql`CREATE TABLE IF NOT EXISTS events (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    title varchar(200) NOT NULL,
    description text,
    location varchar(200),
    starts_at timestamptz NOT NULL,
    ends_at timestamptz
  )`;

  await sql`CREATE TABLE IF NOT EXISTS login_tokens (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    email varchar(320) NOT NULL,
    token_hash text NOT NULL,
    expires_at timestamptz NOT NULL,
    consumed_at timestamptz,
    created_at timestamptz NOT NULL DEFAULT now()
  )`;

  const existing = await sql`SELECT id FROM posts LIMIT 1`;
  if (existing.length === 0) {
    await db.insert(posts).values({
      body: "CDU Sommerfest am 8.8.26",
      imageUrl: "/images/cdu-gruppe.jpg",
      imageAlt:
        "Gruppenfoto einer CDU-Veranstaltung – Symbolbild für das Sommerfest des Ortsverbands Zornheim",
      authorEmail: "vorstand@cdu-zornheim.de",
    });
    console.log("Seed-Post angelegt.");
  } else {
    console.log("Posts vorhanden – kein erneuter Seed.");
  }

  const existingEvents = await sql`SELECT id FROM events LIMIT 1`;
  if (existingEvents.length === 0) {
    await db.insert(events).values({
      title: "CDU Sommerfest",
      description:
        "Gemeinsames Sommerfest des CDU Ortsverbands Zornheim. Alle Bürgerinnen und Bürger sind herzlich willkommen.",
      location: "Zornheim",
      startsAt: new Date("2026-08-08T16:00:00+02:00"),
      endsAt: new Date("2026-08-08T22:00:00+02:00"),
    });
    console.log("Seed-Event angelegt.");
  } else {
    console.log("Events vorhanden – kein erneuter Seed.");
  }
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
