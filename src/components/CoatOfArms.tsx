"use client";

import Image from "next/image";

export function CoatOfArms({
  className = "",
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <span
      className={`coat-of-arms inline-block ${compact ? "coat-compact" : "coat-swing"} ${className}`}
    >
      <Image
        src="/images/wappen-zornheim.png"
        alt="Wappen der Gemeinde Zornheim"
        width={1676}
        height={1952}
        className="h-auto w-full"
        priority
        sizes={compact ? "40px" : "(max-width: 768px) 58vw, 280px"}
      />
    </span>
  );
}
