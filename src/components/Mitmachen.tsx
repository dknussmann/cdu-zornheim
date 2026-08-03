import Image from "next/image";

export function Mitmachen() {
  return (
    <section
      aria-labelledby="mitmachen-heading"
      className="relative overflow-hidden bg-[color:var(--cdu-teal)] px-5 py-8 text-[color:var(--cdu-ink)] sm:px-7 sm:py-10"
    >
      <div
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-[38%] opacity-25 sm:block"
        aria-hidden="true"
      >
        <Image
          src="/images/brand/cdu-bogen.png"
          alt=""
          fill
          className="object-contain object-right-bottom"
          sizes="30vw"
        />
      </div>
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-1.5 sm:w-2"
        style={{
          background:
            "linear-gradient(to bottom, var(--cdu-ink) 0 33%, var(--cdu-red) 33% 66%, var(--cdu-gold) 66% 100%)",
        }}
        aria-hidden="true"
      />
      <div className="relative">
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
            className="btn-accent"
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
      </div>
    </section>
  );
}
