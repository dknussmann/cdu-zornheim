import Link from "next/link";
import { CduLogo } from "@/components/CduLogo";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-[color:var(--cdu-blue)]/10 bg-[color:var(--cdu-blue)] text-white">
      <div className="mx-auto flex max-w-2xl flex-col gap-4 px-4 py-10 sm:px-6">
        <div className="cdu-bogen-bar" aria-hidden="true" />
        <Link href="/" aria-label="CDU Zornheim – Startseite">
          <CduLogo
            variant="on-dark"
            size="md"
            regional="Ortsverband Zornheim"
          />
        </Link>
        <p className="font-display text-sm text-white/80">
          Ortsverband der Christlich Demokratischen Union Deutschlands
        </p>
        <p className="text-sm text-white/65">
          © {new Date().getFullYear()} CDU Ortsverband Zornheim
        </p>
      </div>
    </footer>
  );
}
