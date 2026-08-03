import { desc, lt } from "drizzle-orm";
import { StickyHero } from "@/components/StickyHero";
import { PostFeed } from "@/components/PostFeed";
import { db } from "@/db";
import { posts, events } from "@/db/schema";
import { isAdmin } from "@/lib/admin";

export const dynamic = "force-dynamic";

export default async function ArchivPage() {
  const now = new Date();
  const [allPosts, pastEvents, admin] = await Promise.all([
    db.select().from(posts).orderBy(desc(posts.createdAt)),
    db
      .select()
      .from(events)
      .where(lt(events.startsAt, now))
      .orderBy(desc(events.startsAt)),
    isAdmin(),
  ]);

  return (
    <>
      <a href="#inhalt" className="skip-link">
        Zum Inhalt springen
      </a>

      <StickyHero isSignedIn={admin} />

      <main id="inhalt" className="mx-auto w-full max-w-2xl flex-1 space-y-12 px-4 py-10 sm:px-6">
        <section className="space-y-4">
          <h1 className="font-display text-4xl text-[color:var(--cdu-blue)]">
            Archiv
          </h1>
          <p className="text-lg text-[color:var(--cdu-blue)]/80">
            Alle Neuigkeiten und Ereignisse auf einen Blick.
          </p>
        </section>

        <section id="zornheimer-bote" className="space-y-5">
          <div>
            <h2 className="font-display text-2xl text-[color:var(--cdu-blue)]">
              Zornheimer Bote
            </h2>
            <p className="mt-1 text-[color:var(--cdu-blue)]/80">
              Alle Ausgaben unserer Gemeindezeitung im Überblick.
            </p>
          </div>
          <PostFeed posts={allPosts} />
        </section>

        {pastEvents.length > 0 && (
          <section id="vergangene-events" className="space-y-5">
            <div>
              <h2 className="font-display text-2xl text-[color:var(--cdu-blue)]">
                Vergangene Veranstaltungen
              </h2>
              <p className="mt-1 text-[color:var(--cdu-blue)]/80">
                Ein Rückblick auf unsere Termine und Events.
              </p>
            </div>
            <div className="space-y-4">
              {pastEvents.map((event) => (
                <article
                  key={event.id}
                  className="rounded-xl border border-[color:var(--cdu-blue)]/10 bg-white/70 p-5"
                >
                  <h3 className="font-semibold text-[color:var(--cdu-blue)]">
                    {event.title}
                  </h3>
                  {event.description && (
                    <p className="mt-2 text-sm text-[color:var(--cdu-blue)]/80">
                      {event.description}
                    </p>
                  )}
                  <p className="mt-2 text-xs text-[color:var(--cdu-blue)]/60">
                    {new Date(event.startsAt).toLocaleDateString("de-DE", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </article>
              ))}
            </div>
          </section>
        )}
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
