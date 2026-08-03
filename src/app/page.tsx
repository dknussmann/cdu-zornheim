import Link from "next/link";
import { desc } from "drizzle-orm";
import { FeatureFlaggedCalendar } from "@/components/FeatureFlaggedCalendar";
import { Mitmachen } from "@/components/Mitmachen";
import { PostComposer } from "@/components/PostComposer";
import { PostFeed } from "@/components/PostFeed";
import { SiteFooter } from "@/components/SiteFooter";
import { StickyHero } from "@/components/StickyHero";
import { db } from "@/db";
import { events, posts } from "@/db/schema";
import { isAdmin } from "@/lib/admin";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [allPosts, allEvents, admin] = await Promise.all([
    db.select().from(posts).orderBy(desc(posts.createdAt)),
    db.select().from(events).orderBy(events.startsAt),
    isAdmin(),
  ]);

  return (
    <>
      <a href="#inhalt" className="skip-link">
        Zum Inhalt springen
      </a>

      <StickyHero isSignedIn={admin} />

      <main
        id="inhalt"
        className="mx-auto w-full max-w-2xl flex-1 space-y-14 px-4 py-12 sm:px-6"
      >
        <section
          id="aktuelles"
          aria-labelledby="highlights-heading"
          className="scroll-mt-20 space-y-5"
        >
          <div>
            <p className="section-kicker">Aktuelles</p>
            <h2
              id="highlights-heading"
              className="font-headline mt-2 text-3xl text-[color:var(--cdu-blue)] sm:text-4xl"
            >
              Neuigkeiten
            </h2>
            <p className="mt-2 font-display text-[color:var(--cdu-blue)]/80">
              Die wichtigsten Beiträge aus dem Ortsverband auf einen Blick.
            </p>
          </div>

          {admin ? <PostComposer /> : null}
          <PostFeed posts={allPosts.slice(0, 3)} />

          {allPosts.length > 3 && (
            <div className="flex justify-center pt-2">
              <Link href="/archiv" className="btn-outline">
                Alle Neuigkeiten anzeigen
              </Link>
            </div>
          )}
        </section>

        <section id="zornheimer-bote" className="scroll-mt-20 space-y-5">
          <div>
            <p className="section-kicker">Gemeindezeitung</p>
            <h2 className="font-headline mt-2 text-3xl text-[color:var(--cdu-blue)] sm:text-4xl">
              Zornheimer Bote
            </h2>
            <p className="mt-2 font-display text-[color:var(--cdu-blue)]/80">
              Unsere Gemeindezeitung informiert Sie über lokale Themen und
              Entwicklungen.
            </p>
          </div>
          <div className="border border-[color:var(--cdu-blue)]/10 bg-white p-6">
            <p className="text-[color:var(--cdu-blue)]/90">
              Hier finden Sie alle Ausgaben des Zornheimer Boten mit wichtigen
              Informationen aus unserer Gemeinde, Berichten über Veranstaltungen
              und Einblicken in die kommunalpolitische Arbeit.
            </p>
            <div className="mt-4">
              <Link href="/archiv#zornheimer-bote" className="btn-solid">
                Zum Archiv
              </Link>
            </div>
          </div>
        </section>

        <FeatureFlaggedCalendar events={allEvents} />

        <div id="mitmachen" className="scroll-mt-24">
          <Mitmachen />
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
