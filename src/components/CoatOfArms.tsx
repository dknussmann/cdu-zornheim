"use client";

import Image from "next/image";

export function CoatOfArms({ className = "" }: { className?: string }) {
  return (
    <span className={`coat-of-arms coat-swing inline-block ${className}`}>
      <Image
        src="/images/wappen-zornheim.png"
        alt="Wappen der Gemeinde Zornheim"
        width={1676}
        height={1952}
        className="h-auto w-full"
        priority
        sizes="(max-width: 768px) 58vw, 280px"
      />
    </span>
  );
}
