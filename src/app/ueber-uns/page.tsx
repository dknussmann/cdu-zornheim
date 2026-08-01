import { StickyHero } from "@/components/StickyHero";
import { isAdmin } from "@/lib/admin";

export const dynamic = "force-dynamic";

export default async function UeberUnsPage() {
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
            Über uns
          </h1>
          <p className="text-lg text-[color:var(--cdu-blue)]/80">
            Die CDU Zornheim stellt sich vor – engagiert für unsere Gemeinde.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-display text-2xl text-[color:var(--cdu-blue)]">
            CDU Zornheim stellt sich vor
          </h2>
          <div className="space-y-3 text-[color:var(--cdu-blue)]/90">
            <p>
              Die CDU Zornheim ist der Ortsverband der Christlich Demokratischen Union
              in unserer Gemeinde. Wir setzen uns für die Belange unserer Bürgerinnen
              und Bürger ein und gestalten die Zukunft Zornheims aktiv mit.
            </p>
            <p>
              Mit einem engagierten Team arbeiten wir daran, unsere Gemeinde
              lebenswert zu erhalten und weiterzuentwickeln. Dabei stehen christliche
              Werte, Bürgernähe und praktische Lösungen im Mittelpunkt unserer Arbeit.
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="font-display text-2xl text-[color:var(--cdu-blue)]">
            Vorstand
          </h2>
          <div className="space-y-3 text-[color:var(--cdu-blue)]/90">
            <p>
              Unser Vorstand setzt sich aus engagierten Mitgliedern zusammen, die
              sich für die Belange unserer Gemeinde einsetzen. Die Vorstandsmitglieder
              koordinieren die Arbeit des Ortsverbands und sind Ansprechpartner für
              alle Bürgerinnen und Bürger.
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="font-display text-2xl text-[color:var(--cdu-blue)]">
            Bürgermeister
          </h2>
          <div className="space-y-3 text-[color:var(--cdu-blue)]/90">
            <p>
              Die CDU Zornheim arbeitet eng mit der Gemeindeverwaltung zusammen,
              um die bestmöglichen Ergebnisse für unsere Bürgerinnen und Bürger
              zu erzielen.
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="font-display text-2xl text-[color:var(--cdu-blue)]">
            Fraktion im Gemeinderat
          </h2>
          <div className="space-y-3 text-[color:var(--cdu-blue)]/90">
            <p>
              Unsere Fraktion im Gemeinderat vertritt die Interessen der Bürgerinnen
              und Bürger Zornheims. Mit sachkundigen Entscheidungen und konstruktiven
              Vorschlägen gestalten wir die kommunalpolitische Arbeit aktiv mit.
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="font-display text-2xl text-[color:var(--cdu-blue)]">
            Mitgliedschaft
          </h2>
          <div className="space-y-3 text-[color:var(--cdu-blue)]/90">
            <p>
              Sie möchten sich engagieren und Teil unserer Gemeinschaft werden?
              Wir freuen uns über jedes neue Mitglied, das mit uns die Zukunft
              Zornheims gestalten möchte.
            </p>
            <div className="pt-2">
              <a
                href="/kontakt"
                className="inline-flex min-h-11 items-center justify-center rounded-lg bg-[color:var(--cdu-blue)] px-5 font-semibold text-white hover:bg-[color:var(--cdu-blue)]/90"
              >
                Kontakt aufnehmen
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
