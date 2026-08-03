import Link from "next/link";
import { CoatOfArms } from "@/components/CoatOfArms";
import { SiteHeaderNav } from "@/components/SiteHeaderNav";

type SiteHeaderProps = {
  isSignedIn: boolean;
};

/** Compact sticky header with Wappen — for all pages except the homepage hero. */
export function SiteHeader({ isSignedIn }: SiteHeaderProps) {
  return (
    <header
      data-sticky-bar
      data-compact="true"
      className="sticky-bar sticky top-0 z-50"
      style={{ ["--header-progress" as string]: "1" }}
    >
      <div className="mx-auto flex w-full max-w-5xl items-center gap-3 px-4 py-2.5 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="relative flex h-11 w-9 shrink-0 items-center justify-center sm:h-12 sm:w-10"
          aria-label="Zur Startseite"
        >
          <CoatOfArms compact className="h-full w-full" />
        </Link>
        <div className="min-w-0 flex-1">
          <SiteHeaderNav isSignedIn={isSignedIn} compact />
        </div>
      </div>
    </header>
  );
}
