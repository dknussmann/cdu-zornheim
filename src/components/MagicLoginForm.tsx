"use client";

import { useActionState } from "react";
import { requestMagicLogin, type MagicLoginState } from "@/app/actions/auth";

const initial: MagicLoginState = { ok: false, message: "" };

export function MagicLoginForm() {
  const [state, action, pending] = useActionState(requestMagicLogin, initial);

  return (
    <form action={action} className="space-y-4 rounded-xl border border-[color:var(--cdu-blue)]/15 bg-white p-5 shadow-sm">
      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-[color:var(--cdu-blue)]">
          E-Mail-Adresse
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="mt-1 w-full rounded-lg border border-[color:var(--cdu-blue)]/25 px-3 py-2 outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--cdu-teal)]"
          placeholder="vorstand@beispiel.de"
        />
      </div>
      <button
        type="submit"
        disabled={pending}
        className="inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-[color:var(--cdu-blue)] px-4 font-semibold text-white disabled:opacity-60"
      >
        {pending ? "Link wird erstellt…" : "Anmeldelink per E-Mail anfordern"}
      </button>
      <p role="status" aria-live="polite" className="text-sm text-[color:var(--cdu-blue)]">
        {state.message}
      </p>
      {state.magicUrl ? (
        <p className="break-all rounded-lg bg-[color:var(--cdu-surface)] p-3 text-sm">
          <a
            href={state.magicUrl}
            className="font-semibold text-[color:var(--cdu-blue)] underline underline-offset-2"
          >
            Hier anmelden
          </a>
        </p>
      ) : null}
    </form>
  );
}
