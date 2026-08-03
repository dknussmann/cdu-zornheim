import Link from "next/link";
import {
  currentZornheimerBote,
  zornheimerBoteHistory,
  type ZornheimerBoteIssue,
} from "@/data/zornheimer-bote";

function PdfLink({ issue }: { issue: ZornheimerBoteIssue }) {
  return (
    <a
      href={issue.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${issue.title} (PDF, öffnet in neuem Fenster)`}
      className="flex min-h-11 items-center justify-between gap-3 border-b border-[color:var(--cdu-blue)]/10 py-3 text-sm font-semibold text-[color:var(--cdu-blue)] last:border-b-0 hover:text-[color:var(--cdu-teal)]"
    >
      <span aria-hidden="true">{issue.title}</span>
      <span
        className="text-xs font-bold uppercase tracking-wide text-[color:var(--cdu-teal)]"
        aria-hidden="true"
      >
        PDF
      </span>
    </a>
  );
}

type ZornheimerBoteProps = {
  /** Homepage: compact history; Archiv: full list */
  variant?: "home" | "archive";
};

/**
 * One CI-safe block: Cadenabbia title plate + flush white archive panel,
 * joined by a continuous Schwarz–Rot–Gold Bogen (allowed — layout, not logo).
 */
export function ZornheimerBote({ variant = "home" }: ZornheimerBoteProps) {
  const history =
    variant === "home" ? zornheimerBoteHistory.slice(0, 5) : zornheimerBoteHistory;
  const hasMore = variant === "home" && zornheimerBoteHistory.length > 5;
  const current = currentZornheimerBote;

  return (
    <div className="relative overflow-hidden bg-white">
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-1.5 sm:w-2"
        style={{
          background:
            "linear-gradient(to bottom, var(--cdu-ink) 0 33%, var(--cdu-red) 33% 66%, var(--cdu-gold) 66% 100%)",
        }}
        aria-hidden="true"
      />

      <div className="bg-[color:var(--cdu-teal)] px-4 py-5 text-[color:var(--cdu-ink)] sm:px-5 sm:py-6">
        <p className="section-kicker mb-2 !text-[color:var(--cdu-ink)]">
          Gemeindezeitung
        </p>
        <h2
          id="bote-heading"
          className="font-headline text-3xl tracking-tight sm:text-4xl"
        >
          Zornheimer Bote
        </h2>
        <p className="mt-2 max-w-2xl font-display text-base text-[color:var(--cdu-ink)]/85">
          Unsere Gemeindezeitung informiert Sie über lokale Themen und
          Entwicklungen.
        </p>
        <div className="mt-4">
          <a
            href={current.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${current.title} (PDF, öffnet in neuem Fenster)`}
            className="btn-accent"
          >
            {current.title} lesen
          </a>
        </div>
      </div>

      <div className="border border-t-0 border-[color:var(--cdu-blue)]/10 px-4 py-5 sm:px-5 sm:py-6">
        <h3 className="font-headline text-lg text-[color:var(--cdu-blue)]">
          Frühere Ausgaben
        </h3>
        <p className="mt-1 text-sm text-[color:var(--cdu-blue)]/75">
          Verfügbare Ausgaben zum Nachlesen (Auswahl; ältere Dateien können
          fehlen).
        </p>
        <ul
          className="mt-3"
          aria-label="Frühere Ausgaben des Zornheimer Boten"
        >
          {history.map((issue) => (
            <li key={issue.id}>
              <PdfLink issue={issue} />
            </li>
          ))}
        </ul>
        {hasMore ? (
          <div className="mt-4">
            <Link href="/archiv#zornheimer-bote" className="btn-outline">
              Weitere Ausgaben im Archiv
            </Link>
          </div>
        ) : null}
        <p className="mt-4 text-xs text-[color:var(--cdu-blue)]/60">
          PDFs werden von der CDU VG Nieder-Olm bereitgestellt (
          <a
            href="https://cdu-vg-nieder-olm.de"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-[color:var(--cdu-teal)]"
          >
            cdu-vg-nieder-olm.de
          </a>
          ).
        </p>
      </div>
    </div>
  );
}
