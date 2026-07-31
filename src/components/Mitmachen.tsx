export function Mitmachen() {
  return (
    <section
      aria-labelledby="mitmachen-heading"
      className="rounded-xl border border-[color:var(--cdu-blue)]/10 bg-white p-4 shadow-sm sm:p-6"
    >
      <h2 id="mitmachen-heading" className="font-display text-2xl text-[color:var(--cdu-blue)]">
        Mitmachen
      </h2>
      <p className="mt-2 max-w-2xl text-[color:var(--cdu-blue)]/85">
        Ob Mitgliedschaft, ehrenamtliches Engagement oder einfach ein Gespräch vor Ort –
        im Ortsverband Zornheim sind Sie willkommen.
      </p>
      <div className="mt-5 flex flex-wrap gap-3">
        <a
          href="https://www.cdu.de/mitmachen"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center justify-center rounded-lg bg-[color:var(--cdu-blue)] px-5 font-semibold text-white hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--cdu-gold)]"
        >
          Mitglied werden
        </a>
        <a
          href="mailto:vorstand@cdu-zornheim.de"
          className="inline-flex min-h-11 items-center justify-center rounded-lg border border-[color:var(--cdu-blue)]/25 px-5 font-semibold text-[color:var(--cdu-blue)] hover:bg-[color:var(--cdu-surface)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--cdu-gold)]"
        >
          Kontakt aufnehmen
        </a>
      </div>
    </section>
  );
}
