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
        <section id="neuigkeiten" aria-labelledby="feed-heading" className="scroll-mt-20 space-y-5">
          <div>
            <h2 id="feed-heading" className="font-display text-3xl text-[color:var(--cdu-blue)]">
              Neuigkeiten
            </h2>
            <p className="mt-1 text-[color:var(--cdu-blue)]/80">
              Aktuelle Beiträge aus dem Ortsverband – mobil und übersichtlich.
            </p>
          </div>

          {admin ? <PostComposer /> : null}
          <PostFeed posts={allPosts} />
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
