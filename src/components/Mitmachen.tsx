export function Mitmachen() {
  return (
    <section
      aria-labelledby="mitmachen-heading"
      className="relative overflow-hidden bg-[color:var(--cdu-teal)] px-5 py-8 text-[color:var(--cdu-ink)] sm:px-7 sm:py-10"
    >
      <div
        className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 opacity-30"
        aria-hidden="true"
      >
        <span className="cdu-bogen h-full w-full block scale-150" />
      </div>
      <p className="section-kicker !text-[color:var(--cdu-ink)]">Engagement</p>
      <h2
        id="mitmachen-heading"
        className="font-headline mt-2 text-3xl tracking-tight text-[color:var(--cdu-ink)] sm:text-4xl"
      >
        Mitmachen
      </h2>
      <p className="mt-3 max-w-2xl font-display text-[color:var(--cdu-ink)]/85">
        Ob Mitgliedschaft, ehrenamtliches Engagement oder einfach ein Gespräch
        vor Ort – im Ortsverband Zornheim sind Sie willkommen.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <a
          href="https://www.cdu.de/mitmachen"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
        >
          Mitglied werden
        </a>
        <a
          href="mailto:vorstand@cdu-zornheim.de"
          className="inline-flex min-h-11 items-center justify-center rounded border-2 border-[color:var(--cdu-ink)]/25 bg-white/40 px-5 font-bold text-[color:var(--cdu-ink)] hover:bg-white/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--cdu-gold)]"
        >
          Kontakt aufnehmen
        </a>
      </div>
    </section>
  );
}
