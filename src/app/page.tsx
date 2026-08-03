import Link from "next/link";
import { desc } from "drizzle-orm";
import { FeatureFlaggedCalendar } from "@/components/FeatureFlaggedCalendar";
import { Mitmachen } from "@/components/Mitmachen";
import { PostComposer } from "@/components/PostComposer";
import { PostFeed } from "@/components/PostFeed";
import { SectionBanner } from "@/components/SectionBanner";
import { SiteFooter } from "@/components/SiteFooter";
import { StickyHero } from "@/components/StickyHero";
import { ZornheimerBote } from "@/components/ZornheimerBote";
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
          <SectionBanner
            tone="dark"
            kicker="Aktuelles"
            title="Neuigkeiten"
            titleId="highlights-heading"
          >
            Die wichtigsten Beiträge aus dem Ortsverband auf einen Blick.
          </SectionBanner>

          {admin ? <PostComposer /> : null}
          <PostFeed posts={allPosts.slice(0, 3)} />

          {allPosts.length > 3 && (
            <div className="flex justify-center pt-2">
              <Link href="/archiv" className="btn-primary">
                Alle Neuigkeiten anzeigen
              </Link>
            </div>
          )}
        </section>

        <section
          id="zornheimer-bote"
          aria-labelledby="bote-heading"
          className="scroll-mt-20"
        >
          <ZornheimerBote variant="home" />
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
