import { createHash, randomBytes } from "crypto";
import { cookies } from "next/headers";
import { and, eq, gt, isNull } from "drizzle-orm";
import { db } from "@/db";
import { loginTokens } from "@/db/schema";

const SESSION_COOKIE = "cdu_admin_session";
const SESSION_DAYS = 14;

function sessionSecret() {
  return (
    process.env.ADMIN_SESSION_SECRET ||
    process.env.CLERK_SECRET_KEY ||
    process.env.BLOB_READ_WRITE_TOKEN ||
    "dev-only-change-me"
  );
}

function sign(value: string) {
  return createHash("sha256")
    .update(`${value}.${sessionSecret()}`)
    .digest("hex")
    .slice(0, 32);
}

export function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

export function isEmailAllowed(email: string) {
  const allowed = (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  if (allowed.length === 0) return true;
  return allowed.includes(email.toLowerCase());
}

export async function createMagicLogin(email: string) {
  const normalized = email.trim().toLowerCase();
  if (!normalized.includes("@")) {
    return { ok: false as const, message: "Bitte eine gültige E-Mail eingeben." };
  }
  if (!isEmailAllowed(normalized)) {
    return { ok: false as const, message: "Diese E-Mail ist nicht als Admin freigeschaltet." };
  }

  const token = randomBytes(24).toString("hex");
  const expiresAt = new Date(Date.now() + 20 * 60 * 1000);

  await db.insert(loginTokens).values({
    email: normalized,
    tokenHash: hashToken(token),
    expiresAt,
  });

  const base =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000");

  const magicUrl = `${base}/sign-in/verify?token=${token}`;
  return { ok: true as const, magicUrl, email: normalized };
}

export async function consumeMagicToken(token: string) {
  const tokenHash = hashToken(token);
  const rows = await db
    .select()
    .from(loginTokens)
    .where(
      and(
        eq(loginTokens.tokenHash, tokenHash),
        isNull(loginTokens.consumedAt),
        gt(loginTokens.expiresAt, new Date()),
      ),
    )
    .limit(1);

  const row = rows[0];
  if (!row) {
    return { ok: false as const, message: "Link ungültig oder abgelaufen." };
  }

  await db
    .update(loginTokens)
    .set({ consumedAt: new Date() })
    .where(eq(loginTokens.id, row.id));

  const payload = `${row.email}|${Date.now()}`;
  const cookieValue = `${payload}.${sign(payload)}`;
  const jar = await cookies();
  jar.set(SESSION_COOKIE, cookieValue, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DAYS * 24 * 60 * 60,
  });

  return { ok: true as const, email: row.email };
}

export async function getSessionEmail() {
  const jar = await cookies();
  const raw = jar.get(SESSION_COOKIE)?.value;
  if (!raw) return null;
  const [payload, sig] = raw.split(".");
  if (!payload || !sig || sign(payload) !== sig) return null;
  const [email, ts] = payload.split("|");
  if (!email || !ts) return null;
  const age = Date.now() - Number(ts);
  if (Number.isNaN(age) || age > SESSION_DAYS * 24 * 60 * 60 * 1000) return null;
  if (!isEmailAllowed(email)) return null;
  return email;
}

export async function clearSession() {
  const jar = await cookies();
  jar.delete(SESSION_COOKIE);
}
