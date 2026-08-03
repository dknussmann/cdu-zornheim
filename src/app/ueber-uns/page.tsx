import Image from "next/image";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import {
  beigeordnete,
  cduFraktion,
  gemeinde,
  ortsbuergermeister,
  ratsverteilung,
} from "@/data/zornheim";
import { isAdmin } from "@/lib/admin";

export const dynamic = "force-dynamic";

function Figure({
  src,
  alt,
  caption,
  priority = false,
}: {
  src: string;
  alt: string;
  caption: string;
  priority?: boolean;
}) {
  return (
    <figure className="overflow-hidden">
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[color:var(--cdu-blue)]/5">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          className="object-cover"
          sizes="(max-width: 672px) 100vw, 672px"
        />
      </div>
      <figcaption className="mt-2 text-xs leading-relaxed text-[color:var(--cdu-blue)]/60">
        {caption}
      </figcaption>
    </figure>
  );
}

export default async function UeberUnsPage() {
  const admin = await isAdmin();

  return (
    <>
      <a href="#inhalt" className="skip-link">
        Zum Inhalt springen
      </a>

      <SiteHeader isSignedIn={admin} />

      <main id="inhalt" className="mx-auto w-full max-w-2xl flex-1 space-y-12 px-4 py-10 sm:px-6">
        <section className="space-y-5">
          <div className="space-y-4">
            <h1 className="font-headline text-4xl text-[color:var(--cdu-blue)]">
              Über uns
            </h1>
            <p className="text-lg text-[color:var(--cdu-blue)]/80">
              Die CDU Zornheim stellt sich vor – engagiert für unsere Gemeinde in
              der Verbandsgemeinde {gemeinde.verbandsgemeinde}.
            </p>
          </div>
          <Figure
            src="/images/ueber-uns/ortschaft.jpg"
            alt="Straßenansicht in Zornheim an der Kreuzung Raiffeisenstraße / Nieder-Olmer Straße"
            caption="Zornheim im Ortskern – Foto: ManuelB701 (CC0), Wikimedia Commons"
            priority
          />
        </section>

        <section className="space-y-5">
          <h2 className="font-headline text-2xl text-[color:var(--cdu-blue)]">
            CDU Zornheim stellt sich vor
          </h2>
          <Figure
            src="/images/ueber-uns/gemeinschaft.jpg"
            alt="Gruppe von Menschen, Arm in Arm, blickt auf eine Landschaft im Sonnenlicht"
            caption="Gemeinschaft und Zusammenhalt – Bild AI-hochskaliert (Real-ESRGAN) für die Webdarstellung"
          />
          <div className="space-y-3 text-[color:var(--cdu-blue)]/90">
            <p>
              Die CDU Zornheim ist der Ortsverband der Christlich Demokratischen
              Union in der Ortsgemeinde Zornheim ({gemeinde.inhabitants},
              Landkreis {gemeinde.landkreis}). Wir gestalten Kommunalpolitik vor
              Ort – nah an den Menschen, mit christlich-demokratischen Werten und
              pragmatischen Lösungen für Wohnen, Infrastruktur, Familie und
              Zusammenleben.
            </p>
            <p>
              Bei der Kommunalwahl {ratsverteilung.electionYear} hat die CDU{" "}
              {ratsverteilung.cdu} von {ratsverteilung.total} Sitzen im
              Ortsgemeinderat gewonnen und stellt damit weiterhin die stärkste
              Fraktion (SPD {ratsverteilung.spd}, FWG {ratsverteilung.fwg}).
            </p>
          </div>
        </section>

        <section className="space-y-5">
          <h2 className="font-headline text-2xl text-[color:var(--cdu-blue)]">
            Ortsbürgermeister
          </h2>
          <Figure
            src="/images/ueber-uns/rathaus.jpg"
            alt="Rathaus Zornheim im barocken Fachwerkhaus"
            caption="Rathaus Zornheim – Foto: Rudolf Stricker, Wikimedia Commons"
          />
          <div className="space-y-3 text-[color:var(--cdu-blue)]/90">
            <p>
              <span className="font-semibold">{ortsbuergermeister.name}</span>{" "}
              ({ortsbuergermeister.party}) ist seit{" "}
              {ortsbuergermeister.tookOfficeOn} Ortsbürgermeister von Zornheim.
              Bei der Direktwahl am {ortsbuergermeister.electedOn} wurde er mit{" "}
              {ortsbuergermeister.voteShare} der Stimmen gewählt.
            </p>
            <p>
              Er setzt die CDU-Kontinuität im Rathaus fort: Vor ihm amtierten{" "}
              {ortsbuergermeister.predecessors
                .map((p) => `${p.name} (${p.party}, ${p.note})`)
                .join(" und ")}
              .
            </p>
            <p className="text-sm text-[color:var(--cdu-blue)]/70">
              Rathaus: {gemeinde.address.street}, {gemeinde.address.zip}{" "}
              {gemeinde.address.city} · Tel. {gemeinde.address.phone}
            </p>
          </div>
        </section>

        <section className="space-y-5">
          <h2 className="font-headline text-2xl text-[color:var(--cdu-blue)]">
            Beigeordnete
          </h2>
          <Figure
            src="/images/ueber-uns/rathaus-detail.jpg"
            alt="Detailansicht des barocken Rathauses mit Zierfachwerk in Zornheim"
            caption="Gemeindeverwaltung im historischen Fachwerk – Foto: Nixnubix (CC BY-SA 4.0)"
          />
          <ul className="space-y-3 text-[color:var(--cdu-blue)]/90">
            {beigeordnete.map((person) => (
              <li key={person.name}>
                <span className="font-semibold">{person.name}</span>
                <span className="text-[color:var(--cdu-blue)]/70">
                  {" "}
                  – {person.role}
                  {person.portfolio ? `, ${person.portfolio}` : ""}
                </span>
                {"note" in person && person.note ? (
                  <span className="block text-sm text-[color:var(--cdu-blue)]/65">
                    {person.note}
                  </span>
                ) : null}
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-5">
          <h2 className="font-headline text-2xl text-[color:var(--cdu-blue)]">
            CDU-Fraktion im Gemeinderat
          </h2>
          <Figure
            src="/images/ueber-uns/fachwerkhaus.jpg"
            alt="Historisches Fachwerkhaus in der Oberen Pfortenstraße in Zornheim"
            caption="Ortsbild Zornheim – Foto: Suitbert (CC BY-SA 3.0), Wikimedia Commons"
          />
          <div className="space-y-3 text-[color:var(--cdu-blue)]/90">
            <p>
              Unsere Fraktion vertritt mit {cduFraktion.length} Mandaten die
              Interessen der Bürgerinnen und Bürger im Ortsgemeinderat
              (Wahlperiode ab {ratsverteilung.electionYear}):
            </p>
            <ul className="grid gap-2 sm:grid-cols-2">
              {cduFraktion.map((name) => (
                <li key={name} className="font-medium">
                  {name}
                </li>
              ))}
            </ul>
            <p className="text-sm text-[color:var(--cdu-blue)]/70">
              Quelle:{" "}
              <a
                href={gemeinde.sources.gemeindeorgane}
                className="underline underline-offset-2 hover:text-[color:var(--cdu-blue)]"
                target="_blank"
                rel="noopener noreferrer"
              >
                Gemeindeorgane der Ortsgemeinde Zornheim
              </a>
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="font-headline text-2xl text-[color:var(--cdu-blue)]">
            Vorstand des Ortsverbands
          </h2>
          <div className="space-y-3 text-[color:var(--cdu-blue)]/90">
            <p>
              Der Vorstand des CDU-Ortsverbands Zornheim koordiniert die
              Parteiarbeit vor Ort – Mitgliederversammlung, Wahlkampf,
              Veranstaltungen und den Austausch mit der Fraktion. Eine
              aktuelle, öffentlich gepflegte Vorstandsliste liegt online noch
              nicht vor.
            </p>
            <p>
              Sie möchten wissen, wer derzeit im Vorstand aktiv ist, oder selbst
              mitarbeiten? Melden Sie sich gerne über unser Kontaktformular –
              wir bringen Sie mit dem Ortsverband zusammen.
            </p>
            <div className="pt-2">
              <Link
                href="/kontakt"
                className="btn-solid"
              >
                Vorstand kontaktieren
              </Link>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="font-headline text-2xl text-[color:var(--cdu-blue)]">
            Mitgliedschaft
          </h2>
          <div className="space-y-3 text-[color:var(--cdu-blue)]/90">
            <p>
              Sie möchten sich für Zornheim engagieren und Teil unserer
              Gemeinschaft werden? Ob als Mitglied, Helferin oder Helfer bei
              Aktionen oder mit Ideen für die Gemeinde – wir freuen uns über
              Verstärkung.
            </p>
            <div className="pt-2">
              <Link
                href="/kontakt"
                className="btn-outline"
              >
                Mitglied werden / Kontakt
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
