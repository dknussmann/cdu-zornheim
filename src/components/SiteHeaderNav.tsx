"use client";

import Link from "next/link";
import { Show, SignInButton, SignOutButton, UserButton } from "@clerk/nextjs";
import { logoutAction } from "@/app/actions/auth";
import { CduWordmark } from "@/components/CduWordmark";

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
      <CduWordmark
        variant="on-dark"
        size={compact ? "sm" : "md"}
        regional="Zornheim"
        className="min-w-0"
      />
      <div className="flex items-center gap-1 sm:gap-2">
        <a
          href="#neuigkeiten"
          className="hidden min-h-11 items-center rounded px-3 text-sm font-semibold text-white/95 underline-offset-4 hover:underline sm:inline-flex"
        >
          Neuigkeiten
        </a>
        <a
          href="#termine"
          className="hidden min-h-11 items-center rounded px-3 text-sm font-semibold text-white/95 underline-offset-4 hover:underline sm:inline-flex"
        >
          Termine
        </a>
        {hasClerk ? (
          <>
            <Show when="signed-out">
              <SignInButton mode="modal">
                <button
                  type="button"
                  className="min-h-11 rounded bg-white px-4 text-sm font-bold text-[color:var(--cdu-ink)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--cdu-gold)]"
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
                    className="min-h-11 rounded border border-white/40 px-3 text-sm font-semibold text-white"
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
              className="min-h-11 rounded border border-white/40 px-3 text-sm font-semibold text-white"
            >
              Abmelden
            </button>
          </form>
        ) : (
          <Link
            href="/sign-in"
            className="min-h-11 inline-flex items-center rounded bg-white px-4 text-sm font-bold text-[color:var(--cdu-ink)]"
          >
            Anmelden
          </Link>
        )}
      </div>
    </nav>
  );
}
