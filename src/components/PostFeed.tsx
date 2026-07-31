import Image from "next/image";
import type { Post } from "@/db/schema";

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("de-DE", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export function PostFeed({ posts }: { posts: Post[] }) {
  if (posts.length === 0) {
    return (
      <p className="border border-dashed border-[color:var(--cdu-blue)]/25 bg-white/80 p-6 text-[color:var(--cdu-blue)]">
        Noch keine Beiträge – bald gibt es hier Neuigkeiten aus dem Ortsverband.
      </p>
    );
  }

  return (
    <ol className="space-y-6" aria-label="Beitragsverlauf">
      {posts.map((post) => (
        <li key={post.id} className="overflow-hidden bg-white">
          <article aria-labelledby={`post-${post.id}-title`}>
            <header className="flex items-center gap-3 border-b border-[color:var(--cdu-teal)]/25 px-4 py-3 sm:px-5">
              <div
                className="flex h-10 w-10 items-center justify-center bg-[color:var(--cdu-teal)] font-headline text-xs tracking-tight text-white"
                aria-hidden="true"
              >
                CDU
              </div>
              <div className="min-w-0 flex-1">
                <h3
                  id={`post-${post.id}-title`}
                  className="font-bold text-[color:var(--cdu-blue)]"
                >
                  CDU Zornheim
                </h3>
                <p className="text-sm text-[color:var(--cdu-blue)]/70">
                  <time dateTime={new Date(post.createdAt).toISOString()}>
                    {formatDate(new Date(post.createdAt))}
                  </time>
                </p>
              </div>
            </header>

            <div className="space-y-3 px-4 py-4 sm:px-5">
              <p className="whitespace-pre-wrap text-base leading-relaxed text-[color:var(--cdu-ink)]">
                {post.body}
              </p>
              {post.imageUrl ? (
                <figure className="overflow-hidden bg-[color:var(--cdu-surface)]">
                  <Image
                    src={post.imageUrl}
                    alt={post.imageAlt || "Beitragsbild"}
                    width={1200}
                    height={800}
                    className="h-auto w-full object-cover"
                    sizes="(max-width: 768px) 100vw, 680px"
                  />
                </figure>
              ) : null}
            </div>
          </article>
        </li>
      ))}
    </ol>
  );
}
