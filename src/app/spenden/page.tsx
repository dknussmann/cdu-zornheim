import { StickyHero } from "@/components/StickyHero";
import { isAdmin } from "@/lib/admin";

export const dynamic = "force-dynamic";

export default async function SpendenPage() {
  const admin = await isAdmin();

  return (
    <>
      <a href="#inhalt" className="skip-link">
        Zum Inhalt springen
      </a>

      <StickyHero isSignedIn={admin} />

      <main id="inhalt" className="mx-auto w-full max-w-2xl flex-1 space-y-12 px-4 py-10 sm:px-6">
        <section className="space-y-4">
          <h1 className="font-display text-4xl text-[color:var(--cdu-blue)]">
            Spenden
          </h1>
          <p className="text-lg text-[color:var(--cdu-blue)]/80">
            Unterstützen Sie unsere Arbeit für Zornheim.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-display text-2xl text-[color:var(--cdu-blue)]">
            Ihre Unterstützung zählt
          </h2>
          <div className="space-y-3 text-[color:var(--cdu-blue)]/90">
            <p>
              Als Ortsverband der CDU sind wir auf die Unterstützung engagierter
              Bürgerinnen und Bürger angewiesen. Mit Ihrer Spende helfen Sie uns,
              unsere politische Arbeit für Zornheim fortzuführen und auszubauen.
            </p>
            <p>
              Ihre Zuwendung ermöglicht es uns, Veranstaltungen zu organisieren,
              Informationsmaterial zu erstellen und die demokratische Teilhabe in
              unserer Gemeinde zu fördern.
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="font-display text-2xl text-[color:var(--cdu-blue)]">
            Steuerliche Absetzbarkeit
          </h2>
          <div className="space-y-3 text-[color:var(--cdu-blue)]/90">
            <p>
              Spenden an politische Parteien sind steuerlich absetzbar. Bis zu einem
              Betrag von 1.650 Euro für Ledige bzw. 3.300 Euro für Verheiratete werden
              50% der Spende direkt von der Steuerschuld abgezogen. Darüber hinausgehende
              Beträge können als Sonderausgaben geltend gemacht werden.
            </p>
            <p>
              Sie erhalten von uns selbstverständlich eine Spendenbescheinigung für
              Ihre Steuererklärung.
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="font-display text-2xl text-[color:var(--cdu-blue)]">
            Kontakt
          </h2>
          <div className="space-y-3 text-[color:var(--cdu-blue)]/90">
            <p>
              Für weitere Informationen zur Unterstützung unserer Arbeit wenden Sie
              sich gerne an uns. Wir informieren Sie persönlich über die verschiedenen
              Möglichkeiten, die CDU Zornheim zu unterstützen.
            </p>
            <div className="pt-2">
              <a
                href="/kontakt"
                className="inline-flex min-h-11 items-center justify-center rounded-lg bg-[color:var(--cdu-blue)] px-5 font-semibold text-white hover:bg-[color:var(--cdu-blue)]/90"
              >
                Kontaktformular
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="mt-auto border-t border-[color:var(--cdu-blue)]/10 bg-white/70">
        <div className="mx-auto flex max-w-2xl flex-col gap-2 px-4 py-8 text-sm text-[color:var(--cdu-blue)] sm:px-6">
          <p className="font-semibold">CDU Ortsverband Zornheim</p>
          <p>© {new Date().getFullYear()} CDU Zornheim</p>
        </div>
      </footer>
    </>
  );
}
