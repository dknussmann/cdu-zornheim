import Link from "next/link";
import { PageBanner } from "@/components/PageBanner";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { isAdmin } from "@/lib/admin";

export const dynamic = "force-dynamic";

export default async function SpendenPage() {
  const admin = await isAdmin();

  return (
    <>
      <SiteHeader isSignedIn={admin} />

      <PageBanner
        id="inhalt"
        title="Spenden"
        lead="Unterstützen Sie unsere Arbeit für Zornheim."
      />

      <main className="mx-auto w-full max-w-2xl flex-1 space-y-12 px-4 py-10 sm:px-6">
        <section className="space-y-4">
          <h2 className="font-headline text-2xl text-[color:var(--cdu-blue)]">
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
          <h2 className="font-headline text-2xl text-[color:var(--cdu-blue)]">
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
          <h2 className="font-headline text-2xl text-[color:var(--cdu-blue)]">
            Kontakt
          </h2>
          <div className="space-y-3 text-[color:var(--cdu-blue)]/90">
            <p>
              Für weitere Informationen zur Unterstützung unserer Arbeit wenden Sie
              sich gerne an uns. Wir informieren Sie persönlich über die verschiedenen
              Möglichkeiten, die CDU Zornheim zu unterstützen.
            </p>
            <div className="pt-2">
              <Link href="/kontakt" className="btn-solid">
                Kontakt
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
