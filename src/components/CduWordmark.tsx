type CduWordmarkProps = {
  /** Visual surface the mark sits on */
  variant?: "on-dark" | "on-light" | "on-teal";
  size?: "sm" | "md" | "lg" | "hero";
  /** Ortsverbandsname under the mark */
  regional?: string;
  className?: string;
};

const sizeClass = {
  sm: "text-lg tracking-tight",
  md: "text-2xl tracking-tight",
  lg: "text-4xl tracking-tight sm:text-5xl",
  hero: "text-6xl tracking-tighter sm:text-8xl",
} as const;

const bogenSize = {
  sm: "h-1.5 w-8",
  md: "h-2 w-11",
  lg: "h-2.5 w-16",
  hero: "h-3.5 w-24 sm:h-4 sm:w-32",
} as const;

/**
 * Typographic CDU mark with Schwarz-Rot-Gold Bogen motif.
 * Not a reproduction of the official Gesamtlogo asset — use Inter Extrablack
 * styling and the three-stripe accent per digital CI applications.
 */
export function CduWordmark({
  variant = "on-dark",
  size = "md",
  regional,
  className = "",
}: CduWordmarkProps) {
  const ink =
    variant === "on-light"
      ? "text-[color:var(--cdu-ink)]"
      : variant === "on-teal"
        ? "text-white"
        : "text-white";

  return (
    <div className={`inline-flex flex-col items-start ${className}`}>
      <div className="flex items-end gap-2 sm:gap-3">
        <span
          className={`font-sans font-extrabold leading-none ${sizeClass[size]} ${ink}`}
        >
          CDU
        </span>
        <span
          className={`cdu-bogen mb-[0.12em] shrink-0 ${bogenSize[size]}`}
          aria-hidden="true"
        />
      </div>
      {regional ? (
        <span
          className={`mt-1.5 font-display leading-snug tracking-wide ${
            variant === "on-light"
              ? "text-[color:var(--cdu-blue)]"
              : "text-white/90"
          } ${
            size === "hero"
              ? "text-lg sm:text-2xl"
              : size === "lg"
                ? "text-base sm:text-lg"
                : size === "md"
                  ? "text-sm"
                  : "text-xs"
          }`}
        >
          {regional}
        </span>
      ) : null}
    </div>
  );
}
