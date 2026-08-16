import { Mitmachen } from "@/components/Mitmachen";
import { PageBanner } from "@/components/PageBanner";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { isAdmin } from "@/lib/admin";

export const dynamic = "force-dynamic";

export default async function KontaktPage() {
  const admin = await isAdmin();

  return (
    <>
      <SiteHeader isSignedIn={admin} />

      <PageBanner
        id="inhalt"
        title="Kontakt"
        lead="Nehmen Sie Kontakt mit uns auf – wir freuen uns auf Ihre Nachricht."
      />

      <main className="mx-auto w-full max-w-2xl flex-1 space-y-12 px-4 py-10 sm:px-6">
        <section className="space-y-4">
          <h2 className="font-headline text-2xl text-[color:var(--cdu-blue)]">
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
          <h2 className="font-headline text-2xl text-[color:var(--cdu-blue)]">
            CDU Ortsverband Zornheim
          </h2>
          <div className="space-y-3 text-[color:var(--cdu-blue)]/90">
            <p>
              <strong>E-Mail:</strong>{" "}
              <a
                href="mailto:info@cdu-zornheim.de"
                className="font-semibold underline underline-offset-2 hover:text-[color:var(--cdu-teal)]"
              >
                info@cdu-zornheim.de
              </a>
            </p>
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
              Für Anliegen an den Ortsverband schreiben Sie uns an{" "}
              <a
                href="mailto:info@cdu-zornheim.de"
                className="font-semibold underline underline-offset-2 hover:text-[color:var(--cdu-teal)]"
              >
                info@cdu-zornheim.de
              </a>
              . Das Rathaus der Ortsgemeinde ist nicht die Anschrift des
              Ortsverbands. Termine und Neuigkeiten finden Sie auf der
              Startseite.
            </p>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
