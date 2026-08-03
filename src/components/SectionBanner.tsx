type SectionBannerProps = {
  kicker?: string;
  title: string;
  titleId?: string;
  children?: React.ReactNode;
  /** CTA or extra controls under the lead text */
  action?: React.ReactNode;
  /** RLP-style dark title plate */
  tone?: "dark" | "teal" | "plain";
};

/**
 * Section title treatment inspired by CDU RLP:
 * solid Rhöndorf / Cadenabbia plate + Inter ExtraBold headline.
 */
export function SectionBanner({
  kicker,
  title,
  titleId,
  children,
  action,
  tone = "plain",
}: SectionBannerProps) {
  if (tone === "plain") {
    return (
      <div>
        {kicker ? <p className="section-kicker">{kicker}</p> : null}
        <h2
          id={titleId}
          className="font-headline mt-2 text-3xl text-[color:var(--cdu-blue)] sm:text-4xl"
        >
          {title}
        </h2>
        {children ? (
          <div className="mt-2 font-display text-[color:var(--cdu-blue)]/80">
            {children}
          </div>
        ) : null}
        {action ? <div className="mt-4">{action}</div> : null}
      </div>
    );
  }

  const plate =
    tone === "teal"
      ? "bg-[color:var(--cdu-teal)] text-[color:var(--cdu-ink)]"
      : "bg-[color:var(--cdu-blue)] text-white";

  return (
    <div className={`relative overflow-hidden ${plate}`}>
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-1.5 sm:w-2"
        style={{
          background:
            "linear-gradient(to bottom, var(--cdu-ink) 0 33%, var(--cdu-red) 33% 66%, var(--cdu-gold) 66% 100%)",
        }}
        aria-hidden="true"
      />
      <div className="px-4 py-4 sm:px-5 sm:py-5">
        {kicker ? (
          <p
            className={`section-kicker mb-2 ${
              tone === "teal"
                ? "!text-[color:var(--cdu-ink)]"
                : "!text-[color:var(--cdu-teal)]"
            }`}
          >
            {kicker}
          </p>
        ) : null}
        <h2
          id={titleId}
          className="font-headline text-3xl tracking-tight sm:text-4xl"
        >
          {title}
        </h2>
        {children ? (
          <div
            className={`mt-2 max-w-2xl font-display text-base ${
              tone === "teal" ? "text-[color:var(--cdu-ink)]/85" : "text-white/85"
            }`}
          >
            {children}
          </div>
        ) : null}
        {action ? <div className="mt-4">{action}</div> : null}
      </div>
    </div>
  );
}
