import type { Metadata } from "next";
import Link from "next/link";
import { PageBanner } from "@/components/PageBanner";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { isAdmin } from "@/lib/admin";
import { cduLegal } from "@/lib/legal";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Datenschutz",
};

export default async function DatenschutzPage() {
  const admin = await isAdmin();

  return (
    <>
      <SiteHeader isSignedIn={admin} />
      <PageBanner
        id="inhalt"
        title="Datenschutz"
        lead="Welche Daten diese Website verarbeitet — und welche nicht."
      />
      <main className="mx-auto w-full max-w-2xl flex-1 space-y-10 px-4 py-10 text-[color:var(--cdu-blue)]/90 sm:px-6">
        <section className="space-y-3">
          <h2 className="font-headline text-2xl text-[color:var(--cdu-blue)]">
            1. Verantwortlicher
          </h2>
          <p>
            {cduLegal.name}, {cduLegal.place}, E-Mail:{" "}
            <a
              className="font-semibold underline underline-offset-2 hover:text-[color:var(--cdu-teal)]"
              href={`mailto:${cduLegal.email}`}
            >
              {cduLegal.email}
            </a>
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-headline text-2xl text-[color:var(--cdu-blue)]">
            2. Hosting
          </h2>
          <p>
            Die Website wird bei Vercel Inc. (USA) gehostet. Beim Aufruf
            entstehen technisch notwendige Server-Logs (IP-Adresse, Zeitpunkt,
            aufgerufene Ressource). Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO.
            Übermittlung in die USA über Standardvertragsklauseln.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-headline text-2xl text-[color:var(--cdu-blue)]">
            3. Kontakt
          </h2>
          <p>
            Es gibt kein Kontaktformular. Schreiben Sie an {cduLegal.email} —
            dann gelten die üblichen E-Mail-Verarbeitungen auf beiden Seiten
            (Art. 6 Abs. 1 lit. f DSGVO, politisches Engagement / Anfragen).
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-headline text-2xl text-[color:var(--cdu-blue)]">
            4. Anmeldung für Redaktion
          </h2>
          <p>
            Der Bereich zum Veröffentlichen von Beiträgen ist auf wenige
            Adressen beschränkt. Ohne Clerk nutzen wir einen Magic-Link und ein
            Session-Cookie <code>cdu_admin_session</code> (technisch notwendig,
            § 25 Abs. 2 TDDDG). Ist Clerk konfiguriert, verarbeitet Clerk
            (USA) Anmeldedaten und kann eigene Cookies setzen — dann nur für
            den Login, nicht für Reichweitenmessung.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-headline text-2xl text-[color:var(--cdu-blue)]">
            5. Spenden
          </h2>
          <p>
            Auf der Spendenseite gibt es keine Online-Zahlung. Bankdaten oder
            Spendenbescheinigungen werden nicht über diese Website erhoben.
            BFSG und Shop-Pflichten greifen hier nicht.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-headline text-2xl text-[color:var(--cdu-blue)]">
            6. Cookies und Tracker
          </h2>
          <p>
            Kein Analytics, kein Marketing-Pixel, kein Cookie-Banner für
            Besucherinnen und Besucher. Schriften über next/font. Externe
            PDF-Links (Zornheimer Bote) führen auf cdu-vg-nieder-olm.de — beim
            Klick gelten die dortigen Hinweise.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-headline text-2xl text-[color:var(--cdu-blue)]">
            7. Ihre Rechte
          </h2>
          <p>
            Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit,
            Widerspruch und Beschwerde bei{" "}
            <a
              className="underline underline-offset-2 hover:text-[color:var(--cdu-teal)]"
              href={cduLegal.supervisoryAuthority.url}
              target="_blank"
              rel="noreferrer"
            >
              {cduLegal.supervisoryAuthority.name}
            </a>
            .
          </p>
        </section>

        <p>
          <Link
            href="/impressum"
            className="font-semibold underline underline-offset-2 hover:text-[color:var(--cdu-teal)]"
          >
            Impressum
          </Link>
        </p>
      </main>
      <SiteFooter />
    </>
  );
}
