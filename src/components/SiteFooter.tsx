export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-[color:var(--cdu-blue)]/10 bg-[color:var(--cdu-blue)] text-white">
      <div className="mx-auto flex max-w-2xl flex-col gap-3 px-4 py-10 sm:px-6">
        <div className="cdu-bogen-bar" aria-hidden="true" />
        <p className="font-headline text-xl tracking-tight">CDU Zornheim</p>
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
