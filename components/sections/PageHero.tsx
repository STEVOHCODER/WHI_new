import Image from "next/image";
import type { StaticImageData } from "next/image";

interface PageHeroProps {
  image: string | StaticImageData;
  imageAlt: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
}

export default function PageHero({
  image,
  imageAlt,
  eyebrow,
  title,
  subtitle,
}: PageHeroProps) {
  return (
    <section
      className="relative flex items-end min-h-[52vh] overflow-hidden pt-20 section-panel surface-hero hero-grid"
      aria-label={`${title} page hero`}
    >
      <Image
        src={image}
        alt={imageAlt}
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/10"
        aria-hidden="true"
      />
      <div className="absolute left-0 right-0 top-0 h-24 bg-gradient-to-b from-black/20 to-transparent" aria-hidden="true" />
      <div className="absolute -left-16 top-24 h-56 w-56 rounded-full bg-[var(--color-gold)]/20 blur-3xl" aria-hidden="true" />
      <div className="absolute bottom-10 right-10 h-24 w-24 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm" aria-hidden="true" />
      <div className="relative container-wide pb-12 md:pb-16">
        <div className="max-w-2xl rounded-[2rem] border border-white/12 bg-black/25 p-6 backdrop-blur-[2px] md:p-8">
          {eyebrow && (
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.22em] text-white/78">
              <span className="h-2 w-2 rounded-full bg-[var(--color-gold)]" aria-hidden="true" />
              <span>{eyebrow}</span>
            </div>
          )}
          <h1 className="text-balance text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[0.96] tracking-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-4 text-base md:text-lg text-white/78 leading-relaxed max-w-xl">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
