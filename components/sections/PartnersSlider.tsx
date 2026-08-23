"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

interface Partner {
  _id: string;
  name: string;
  category: string;
  logoUrl: string | null;
  website: string | null;
}

export default function PartnersSlider({ partners }: { partners: Partner[] }) {
  const [offset, setOffset] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const speed = 0.5; // pixels per frame

  useEffect(() => {
    if (partners.length < 2) return;

    const el = containerRef.current;
    if (!el) return;

    const totalWidth = el.scrollWidth / 2; // duplicated set
    let frame = 0;
    let raf: number;

    const animate = () => {
      frame++;
      setOffset((prev) => {
        const next = prev + speed;
        if (next >= totalWidth) return 0;
        return next;
      });
      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [partners.length]);

  if (partners.length === 0) return null;

  // Duplicate the list for seamless looping
  const displayPartners = [...partners, ...partners];

  return (
    <section className="section-padding surface-white">
      <div className="container-wide">
        <div className="text-center mb-10">
          <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[var(--color-text-light)]">
            Our Partners & Sponsors
          </p>
          <h2 className="mt-3 text-3xl font-black text-[var(--color-text)] md:text-4xl">
            Trusted By Leading Organisations
          </h2>
        </div>

        <div className="relative overflow-hidden" ref={containerRef}>
          {/* Fade edges */}
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-white to-transparent" aria-hidden="true" />
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-white to-transparent" aria-hidden="true" />

          <div
            className="flex items-center gap-10"
            style={{ transform: `translateX(-${offset}px)` }}
          >
            {displayPartners.map((partner, i) => (
              <a
                key={`${partner._id}-${i}`}
                href={partner.website || "#"}
                target={partner.website ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="flex shrink-0 flex-col items-center gap-3 group"
              >
                <div className="flex h-20 w-28 items-center justify-center rounded-2xl border border-[var(--color-border)] bg-white p-3 transition-all duration-200 group-hover:border-[var(--color-primary)] group-hover:shadow-md">
                  {partner.logoUrl ? (
                    <img
                      src={partner.logoUrl}
                      alt={partner.name}
                      className="max-h-12 max-w-full object-contain"
                    />
                  ) : (
                    <span className="text-xs font-bold text-[var(--color-text-light)] text-center leading-tight">
                      {partner.name.split(" ").slice(0, 2).join(" ")}
                    </span>
                  )}
                </div>
                <span className="hidden text-[11px] font-semibold text-[var(--color-text-muted)] transition-colors group-hover:text-[var(--color-primary)] sm:block">
                  {partner.name}
                </span>
              </a>
            ))}
          </div>
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/partner-with-us"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-primary)] hover:gap-4 transition-all duration-200"
          >
            Become a Partner →
          </Link>
        </div>
      </div>
    </section>
  );
}
