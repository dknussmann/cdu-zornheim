"use client";

import Link from "next/link";
import { Show, SignInButton, SignOutButton, UserButton } from "@clerk/nextjs";
import { logoutAction } from "@/app/actions/auth";

const hasClerk = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);

export function SiteHeaderNav({
  isSignedIn,
  compact = false,
}: {
  isSignedIn: boolean;
  compact?: boolean;
}) {
  return (
    <nav
      aria-label="Hauptnavigation"
      className="flex items-center justify-between gap-3"
    >
      <p
        className={`font-display tracking-wide text-white ${
          compact ? "text-base sm:text-lg" : "text-lg sm:text-xl"
        }`}
      >
        CDU Zornheim
      </p>
      <div className="flex items-center gap-2 sm:gap-3">
        <Link
          href="/"
          className="hidden min-h-11 items-center rounded-lg px-3 text-sm font-semibold text-white/95 underline-offset-4 hover:underline sm:inline-flex"
        >
          Startseite
        </Link>
        <Link
          href="/ueber-uns"
          className="hidden min-h-11 items-center rounded-lg px-3 text-sm font-semibold text-white/95 underline-offset-4 hover:underline sm:inline-flex"
        >
          Über uns
        </Link>
        <Link
          href="/archiv"
          className="hidden min-h-11 items-center rounded-lg px-3 text-sm font-semibold text-white/95 underline-offset-4 hover:underline sm:inline-flex"
        >
          Archiv
        </Link>
        <Link
          href="/spenden"
          className="hidden min-h-11 items-center rounded-lg px-3 text-sm font-semibold text-white/95 underline-offset-4 hover:underline sm:inline-flex"
        >
          Spenden
        </Link>
        <Link
          href="/kontakt"
          className="hidden min-h-11 items-center rounded-lg px-3 text-sm font-semibold text-white/95 underline-offset-4 hover:underline sm:inline-flex"
        >
          Kontakt
        </Link>
        {hasClerk ? (
          <>
            <Show when="signed-out">
              <SignInButton mode="modal">
                <button
                  type="button"
                  className="min-h-11 rounded-lg bg-white px-4 text-sm font-semibold text-[color:var(--cdu-blue)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--cdu-gold)]"
                >
                  Anmelden
                </button>
              </SignInButton>
            </Show>
            <Show when="signed-in">
              <div className="flex items-center gap-2">
                <UserButton />
                <SignOutButton>
                  <button
                    type="button"
                    className="min-h-11 rounded-lg border border-white/40 px-3 text-sm font-semibold text-white"
                  >
                    Abmelden
                  </button>
                </SignOutButton>
              </div>
            </Show>
          </>
        ) : isSignedIn ? (
          <form action={logoutAction}>
            <button
              type="submit"
              className="min-h-11 rounded-lg border border-white/40 px-3 text-sm font-semibold text-white"
            >
              Abmelden
            </button>
          </form>
        ) : (
          <Link
            href="/sign-in"
            className="min-h-11 inline-flex items-center rounded-lg bg-white px-4 text-sm font-semibold text-[color:var(--cdu-blue)]"
          >
            Anmelden
          </Link>
        )}
      </div>
    </nav>
  );
}
