import { auth, currentUser } from "@clerk/nextjs/server";
import { getSessionEmail } from "@/lib/session";

const hasClerk = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);

export async function requireAdmin() {
  // Prefer Clerk when configured
  if (hasClerk) {
    const session = await auth();
    if (!session.userId) {
      return { ok: false as const, reason: "not_signed_in" as const };
    }

    const user = await currentUser();
    const email =
      user?.primaryEmailAddress?.emailAddress ??
      user?.emailAddresses?.[0]?.emailAddress ??
      null;

    if (!email) {
      return { ok: false as const, reason: "no_email" as const };
    }

    const allowed = (process.env.ADMIN_EMAILS ?? "")
      .split(",")
      .map((e) => e.trim().toLowerCase())
      .filter(Boolean);

    if (allowed.length > 0 && !allowed.includes(email.toLowerCase())) {
      return { ok: false as const, reason: "forbidden" as const, email };
    }

    return { ok: true as const, email, userId: session.userId };
  }

  const email = await getSessionEmail();
  if (!email) {
    return { ok: false as const, reason: "not_signed_in" as const };
  }
  return { ok: true as const, email, userId: email };
}

export async function isAdmin() {
  const result = await requireAdmin();
  return result.ok;
}
