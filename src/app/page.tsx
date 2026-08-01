import { desc } from "drizzle-orm";
import { FeatureFlaggedCalendar } from "@/components/FeatureFlaggedCalendar";
import { Mitmachen } from "@/components/Mitmachen";
import { PostComposer } from "@/components/PostComposer";
import { PostFeed } from "@/components/PostFeed";
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

      <main id="inhalt" className="mx-auto w-full max-w-2xl flex-1 space-y-10 px-4 py-10 sm:px-6">
        <section id="aktuelles" aria-labelledby="highlights-heading" className="scroll-mt-20 space-y-5">
          <div>
            <h2 id="highlights-heading" className="font-display text-3xl text-[color:var(--cdu-blue)]">
              Aktuelles
            </h2>
            <p className="mt-1 text-[color:var(--cdu-blue)]/80">
              Die wichtigsten Neuigkeiten auf einen Blick.
            </p>
          </div>

          {admin ? <PostComposer /> : null}
          <PostFeed posts={allPosts.slice(0, 3)} />
          
          {allPosts.length > 3 && (
            <div className="flex justify-center pt-2">
              <a
                href="/archiv"
                className="inline-flex min-h-11 items-center justify-center rounded-lg border border-[color:var(--cdu-blue)]/30 px-5 font-semibold text-[color:var(--cdu-blue)] hover:bg-[color:var(--cdu-blue)]/5"
              >
                Alle Neuigkeiten anzeigen
              </a>
            </div>
          )}
        </section>

        <section id="zornheimer-bote" className="scroll-mt-20 space-y-5">
          <div>
            <h2 className="font-display text-3xl text-[color:var(--cdu-blue)]">
              Zornheimer Bote
            </h2>
            <p className="mt-1 text-[color:var(--cdu-blue)]/80">
              Unsere Gemeindezeitung informiert Sie über lokale Themen und Entwicklungen.
            </p>
          </div>
          <div className="rounded-xl border border-[color:var(--cdu-blue)]/10 bg-white/70 p-6">
            <p className="text-[color:var(--cdu-blue)]/90">
              Hier finden Sie alle Ausgaben des Zornheimer Boten mit wichtigen
              Informationen aus unserer Gemeinde, Berichten über Veranstaltungen
              und Einblicken in die kommunalpolitische Arbeit.
            </p>
            <div className="mt-4 flex gap-3">
              <a
                href="/archiv#zornheimer-bote"
                className="inline-flex min-h-11 items-center justify-center rounded-lg bg-[color:var(--cdu-blue)] px-5 font-semibold text-white hover:bg-[color:var(--cdu-blue)]/90"
              >
                Zum Archiv
              </a>
            </div>
          </div>
        </section>

        <FeatureFlaggedCalendar events={allEvents} />

        <div id="mitmachen" className="scroll-mt-24">
          <Mitmachen />
        </div>
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
