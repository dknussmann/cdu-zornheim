import Image from "next/image";

type CduLogoProps = {
  /** Dark surfaces need the white Gesamtlogo */
  variant?: "on-dark" | "on-light";
  size?: "sm" | "md" | "lg" | "hero";
  regional?: string;
  className?: string;
  priority?: boolean;
};

const widthFor = {
  sm: 120,
  md: 160,
  lg: 240,
  hero: 420,
} as const;

/**
 * Official CDU-Gesamtlogo (CI Portal) with optional regional line.
 * Asset: public/images/brand/cdu-logo(-white).png
 */
export function CduLogo({
  variant = "on-dark",
  size = "md",
  regional,
  className = "",
  priority = false,
}: CduLogoProps) {
  const width = widthFor[size];
  const height = Math.round(width * (861 / 3907));
  const src =
    variant === "on-light"
      ? "/images/brand/cdu-logo.png"
      : "/images/brand/cdu-logo-white.png";

  return (
    <div className={`inline-flex flex-col items-start gap-1 ${className}`}>
      <Image
        src={src}
        alt="CDU"
        width={width}
        height={height}
        priority={priority}
        className="h-auto w-auto"
        sizes={`${width}px`}
      />
      {regional ? (
        <span
          className={`font-sans font-medium uppercase tracking-[0.14em] ${
            variant === "on-light"
              ? "text-[color:var(--cdu-ink)]"
              : "text-white/90"
          } ${
            size === "hero"
              ? "text-sm sm:text-base"
              : size === "lg"
                ? "text-xs sm:text-sm"
                : size === "md"
                  ? "text-[0.65rem] sm:text-xs"
                  : "text-[0.6rem]"
          }`}
        >
          {regional}
        </span>
      ) : null}
    </div>
  );
}
