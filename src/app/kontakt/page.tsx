import { StickyHero } from "@/components/StickyHero";
import { Mitmachen } from "@/components/Mitmachen";
import { isAdmin } from "@/lib/admin";

export const dynamic = "force-dynamic";

export default async function KontaktPage() {
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
            Kontakt
          </h1>
          <p className="text-lg text-[color:var(--cdu-blue)]/80">
            Nehmen Sie Kontakt mit uns auf – wir freuen uns auf Ihre Nachricht.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-display text-2xl text-[color:var(--cdu-blue)]">
            Mitmachen und Kontakt aufnehmen
          </h2>
          <div className="space-y-3 text-[color:var(--cdu-blue)]/90">
            <p>
              Sie haben Fragen, Anregungen oder möchten sich in unserer Gemeinde
              engagieren? Nutzen Sie unser Kontaktformular, um mit uns in Verbindung
              zu treten.
            </p>
            <p>
              Wir freuen uns über jede Nachricht und melden uns zeitnah bei Ihnen
              zurück.
            </p>
          </div>
        </section>

        <section>
          <Mitmachen />
        </section>

        <section className="space-y-4">
          <h2 className="font-display text-2xl text-[color:var(--cdu-blue)]">
            CDU Ortsverband Zornheim
          </h2>
          <div className="space-y-3 text-[color:var(--cdu-blue)]/90">
            <p>
              <strong>Gemeindeverwaltung (Rathaus):</strong>
              <br />
              Kirschgartenstraße 2
              <br />
              55270 Zornheim
              <br />
              Tel. 06136 95294-0
            </p>
            <p>
              Für Anliegen an den Ortsverband nutzen Sie bitte das Formular oben.
              Termine und Neuigkeiten finden Sie auf der Startseite.
            </p>
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
