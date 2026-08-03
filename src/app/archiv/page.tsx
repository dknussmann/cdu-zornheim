import { desc, lt } from "drizzle-orm";
import { PageBanner } from "@/components/PageBanner";
import { PostFeed } from "@/components/PostFeed";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { ZornheimerBote } from "@/components/ZornheimerBote";
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
      <SiteHeader isSignedIn={admin} />

      <PageBanner
        id="inhalt"
        title="Archiv"
        lead="Alle Neuigkeiten und Ereignisse auf einen Blick."
      />

      <main className="mx-auto w-full max-w-2xl flex-1 space-y-12 px-4 py-10 sm:px-6">
        <section
          id="zornheimer-bote"
          aria-labelledby="bote-heading"
          className="scroll-mt-20"
        >
          <ZornheimerBote variant="archive" />
        </section>

        <section id="neuigkeiten" className="space-y-5">
          <div>
            <h2 className="font-headline text-2xl text-[color:var(--cdu-blue)]">
              Neuigkeiten
            </h2>
            <p className="mt-1 text-[color:var(--cdu-blue)]/80">
              Alle Beiträge aus dem Ortsverband.
            </p>
          </div>
          <PostFeed posts={allPosts} />
        </section>

        {pastEvents.length > 0 && (
          <section id="vergangene-events" className="space-y-5">
            <div>
              <h2 className="font-headline text-2xl text-[color:var(--cdu-blue)]">
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
                  className="border border-[color:var(--cdu-blue)]/10 bg-white/70 p-5"
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

      <SiteFooter />
    </>
  );
}
