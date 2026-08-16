import type { Metadata } from "next";
import { PageBanner } from "@/components/PageBanner";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { cduLegal } from "@/lib/legal";
import { isAdmin } from "@/lib/admin";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Impressum",
};

export default async function ImpressumPage() {
  const admin = await isAdmin();

  return (
    <>
      <SiteHeader isSignedIn={admin} />
      <PageBanner
        id="inhalt"
        title="Impressum"
        lead="Anbieterkennzeichnung nach § 5 DDG."
      />
      <main className="mx-auto w-full max-w-2xl flex-1 space-y-10 px-4 py-10 sm:px-6">
        <section className="space-y-3 text-[color:var(--cdu-blue)]/90">
          <h2 className="font-headline text-2xl text-[color:var(--cdu-blue)]">
            Angaben gemäß § 5 DDG
          </h2>
          <p>
            {cduLegal.name}
            <br />
            {cduLegal.place}
          </p>
          <p>
            Eine ladungsfähige Straßenanschrift des Ortsverbands ist uns noch
            nicht mitgeteilt (das Rathaus der Ortsgemeinde ist nicht die
            Anschrift des Ortsverbands). Bis zur Ergänzung erreichen Sie uns
            per E-Mail.
          </p>
        </section>
        <section className="space-y-3 text-[color:var(--cdu-blue)]/90">
          <h2 className="font-headline text-2xl text-[color:var(--cdu-blue)]">
            Kontakt
          </h2>
          <p>
            E-Mail:{" "}
            <a
              className="font-semibold underline underline-offset-2 hover:text-[color:var(--cdu-teal)]"
              href={`mailto:${cduLegal.email}`}
            >
              {cduLegal.email}
            </a>
          </p>
        </section>
        <section className="space-y-3 text-[color:var(--cdu-blue)]/90">
          <h2 className="font-headline text-2xl text-[color:var(--cdu-blue)]">
            Verantwortlich für den Inhalt
          </h2>
          <p>
            Der Vorstand des {cduLegal.name}. Eine namentliche Angabe der
            oder des Vorsitzenden folgt, sobald sie uns vorliegt — wir setzen
            hier niemanden ein, der nicht bestätigt ist.
          </p>
          <p className="text-sm">
            Journalistisch-redaktionelle Beiträge (Neuigkeiten, Termine) auf
            dieser Website unterliegen § 18 Abs. 2 MStV.
          </p>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
