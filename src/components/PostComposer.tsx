"use client";

import { useActionState, useEffect, useRef } from "react";
import { createPost, type CreatePostState } from "@/app/actions/posts";

const initial: CreatePostState = { ok: false, message: "" };

export function PostComposer() {
  const [state, formAction, pending] = useActionState(createPost, initial);
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (state.message && statusRef.current) {
      statusRef.current.focus();
    }
    if (state.ok) {
      formRef.current?.reset();
    }
  }, [state]);

  return (
    <section
      aria-labelledby="composer-heading"
      className="border border-[color:var(--cdu-blue)]/15 bg-white p-4 sm:p-5"
    >
      <h2 id="composer-heading" className="font-headline text-xl text-[color:var(--cdu-blue)]">
        Neuen Beitrag verfassen
      </h2>
      <p className="mt-1 font-display text-sm text-[color:var(--cdu-blue)]/80">
        Teilen Sie Neuigkeiten mit Bild und Text – sichtbar für alle Besucherinnen und Besucher.
      </p>

      <form ref={formRef} action={formAction} className="mt-4 space-y-4">
        <div>
          <label htmlFor="post-body" className="block text-sm font-bold text-[color:var(--cdu-blue)]">
            Beitragstext
          </label>
          <textarea
            id="post-body"
            name="body"
            required
            rows={4}
            maxLength={2000}
            className="mt-1 w-full rounded border border-[color:var(--cdu-blue)]/25 bg-[color:var(--cdu-surface)] px-3 py-2 text-[color:var(--cdu-ink)] outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--cdu-teal)]"
            placeholder="Was gibt es Neues in Zornheim?"
          />
        </div>

        <div>
          <label htmlFor="post-image" className="block text-sm font-bold text-[color:var(--cdu-blue)]">
            Bild (optional)
          </label>
          <input
            id="post-image"
            name="image"
            type="file"
            accept="image/*"
            className="mt-1 block w-full text-sm file:mr-3 file:rounded file:border-0 file:bg-[color:var(--cdu-teal)] file:px-3 file:py-2 file:font-bold file:text-[color:var(--cdu-ink)] hover:file:brightness-95"
          />
        </div>

        <div>
          <label htmlFor="post-image-alt" className="block text-sm font-bold text-[color:var(--cdu-blue)]">
            Bildbeschreibung (für Barrierefreiheit)
          </label>
          <input
            id="post-image-alt"
            name="imageAlt"
            type="text"
            className="mt-1 w-full rounded border border-[color:var(--cdu-blue)]/25 bg-[color:var(--cdu-surface)] px-3 py-2 outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--cdu-teal)]"
            placeholder="Kurz beschreiben, was auf dem Bild zu sehen ist"
          />
        </div>

        <button
          type="submit"
          disabled={pending}
          className="btn-solid disabled:opacity-60"
        >
          {pending ? "Wird veröffentlicht…" : "Veröffentlichen"}
        </button>

        <p
          ref={statusRef}
          tabIndex={-1}
          role="status"
          aria-live="polite"
          className={`text-sm ${state.ok ? "text-green-800" : state.message ? "text-[color:var(--cdu-red)]" : "sr-only"}`}
        >
          {state.message || "Bereit zum Veröffentlichen"}
        </p>
      </form>
    </section>
  );
}
