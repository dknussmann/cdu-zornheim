"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CduWordmark } from "@/components/CduWordmark";
import { CoatOfArms } from "@/components/CoatOfArms";
import { SiteHeaderNav } from "@/components/SiteHeaderNav";

type StickyHeroProps = {
  isSignedIn: boolean;
};

function clamp(n: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, n));
}

const ASPECT = 1952 / 1676;

export function StickyHero({ isSignedIn }: StickyHeroProps) {
  const heroRef = useRef<HTMLElement>(null);
  const startRef = useRef<HTMLDivElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const flyerRef = useRef<HTMLDivElement>(null);
  const originRef = useRef<{ x: number; y: number; size: number } | null>(null);
  const [snapped, setSnapped] = useState(false);
  const [ready, setReady] = useState(false);
  const reduceMotion = useRef(false);

  useEffect(() => {
    reduceMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let frame = 0;

    const captureOrigin = () => {
      const start = startRef.current;
      if (!start) return;
      const rect = start.getBoundingClientRect();
      originRef.current = {
        x: rect.left + window.scrollX + rect.width / 2,
        y: rect.top + window.scrollY + rect.height / 2,
        size: rect.width,
      };
    };

    const update = () => {
      const hero = heroRef.current;
      const end = endRef.current;
      const flyer = flyerRef.current;
      if (!hero || !end || !flyer) return;

      if (!originRef.current) captureOrigin();
      const origin = originRef.current;
      if (!origin) return;

      const heroRect = hero.getBoundingClientRect();
      const endRect = end.getBoundingClientRect();

      const travel = Math.max(hero.offsetHeight - 72, 1);
      const scrolled = Math.max(0, -heroRect.top);
      const progress = reduceMotion.current
        ? scrolled > travel * 0.35
          ? 1
          : 0
        : clamp(scrolled / travel);

      const endSize = endRect.width || 40;
      const size = origin.size + (endSize - origin.size) * progress;
      const height = size * ASPECT;

      const startCenterX = origin.x - window.scrollX;
      const startCenterY = origin.y;
      const endCenterX = endRect.left + endRect.width / 2;
      const endCenterY = endRect.top + endRect.height / 2;

      const centerX = startCenterX + (endCenterX - startCenterX) * progress;
      const centerY = startCenterY + (endCenterY - startCenterY) * progress;

      const flyerX = centerX - size / 2;
      const unclampedTop = centerY - height / 2;
      const flyerY = Math.max(0, unclampedTop);

      flyer.style.width = `${size}px`;
      flyer.style.height = `${height}px`;
      flyer.style.transform = `translate3d(${flyerX}px, ${flyerY}px, 0)`;
      flyer.style.opacity = "1";

      const isSnapped = progress >= 0.98;
      setSnapped(isSnapped);
      setReady(true);

      const bar = document.querySelector<HTMLElement>("[data-sticky-bar]");
      if (bar) {
        bar.dataset.compact = isSnapped || progress > 0.55 ? "true" : "false";
        bar.style.setProperty("--header-progress", String(progress));
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    const onResize = () => {
      if (window.scrollY < 8) captureOrigin();
      onScroll();
    };

    captureOrigin();
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <>
      <div
        data-sticky-bar
        data-compact="false"
        className="sticky-bar sticky top-0 z-50"
      >
        <div className="mx-auto flex w-full max-w-5xl items-center gap-3 px-4 py-2.5 sm:px-6 lg:px-8">
          <div
            ref={endRef}
            className="relative h-11 w-9 shrink-0 sm:h-12 sm:w-10"
            aria-hidden={!snapped}
          />
          <div className="min-w-0 flex-1">
            <SiteHeaderNav isSignedIn={isSignedIn} compact />
          </div>
        </div>
      </div>

      <header ref={heroRef} className="hero-shell -mt-[3.75rem] pt-[3.75rem]">
        <div className="hero-media" aria-hidden="true">
          <Image
            src="/images/cdu-gruppe.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_30%]"
          />
        </div>

        <div className="hero-content mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 pb-16 pt-4 sm:px-6 lg:px-8">
          <div className="flex flex-1 flex-col items-center justify-center gap-8 py-10 text-center sm:py-16">
            <div
              ref={startRef}
              className="hero-fade-in flex aspect-[1676/1952] h-auto w-[min(52vw,240px)] items-center justify-center"
              aria-hidden="true"
            />
            <div className="max-w-3xl">
              <div className="hero-fade-in-delay flex justify-center">
                <CduWordmark
                  variant="on-dark"
                  size="hero"
                  regional="Ortsverband Zornheim"
                  className="items-center text-center [&_.cdu-bogen]:bogen-reveal"
                />
              </div>
              <p className="hero-fade-in-delay-2 mx-auto mt-6 max-w-xl font-display text-lg text-white/95 sm:text-xl">
                Nah an Ort und Menschen – Neuigkeiten, Termine und Mitmachen für
                unsere Gemeinde.
              </p>
              <div className="hero-fade-in-delay-3 mt-8 flex flex-wrap items-center justify-center gap-3">
                <Link href="/#aktuelles" className="btn-primary">
                  Aktuelles lesen
                </Link>
                <Link href="/kontakt" className="btn-secondary">
                  Mitmachen
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div
        ref={flyerRef}
        className={`wappen-flyer ${ready ? "is-ready" : ""} ${snapped ? "is-snapped" : ""}`}
      >
        <CoatOfArms compact={snapped} />
      </div>
    </>
  );
}
