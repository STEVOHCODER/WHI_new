import Image from "next/image";
import Button from "@/components/ui/Button";

interface HeroSectionProps {
  image: string;
  imageAlt: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  overlay?: "light" | "medium" | "dark";
  height?: "full" | "large" | "medium";
  align?: "left" | "center";
}

export default function HeroSection({
  image,
  imageAlt,
  eyebrow,
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  overlay = "medium",
  height = "large",
  align = "left",
}: HeroSectionProps) {
  const heightClass = {
    full: "min-h-screen",
    large: "min-h-[80vh]",
    medium: "min-h-[55vh]",
  }[height];

  const overlayClass = {
    light: "from-black/30 to-black/10",
    medium: "from-black/65 via-black/30 to-transparent",
    dark: "from-black/80 via-black/50 to-black/20",
  }[overlay];

  const alignClass = align === "center" ? "items-center text-center mx-auto" : "items-start";

  return (
    <section
      className={`relative flex items-end ${heightClass} overflow-hidden pt-20 section-panel surface-hero hero-grid`}
      aria-label={`${title} hero section`}
    >
      {/* Background image */}
      <Image
        src={image}
        alt={imageAlt}
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />

      {/* Overlay */}
      <div
        className={`absolute inset-0 bg-gradient-to-t ${overlayClass}`}
        aria-hidden="true"
      />

      <div className="absolute -left-20 top-28 h-64 w-64 rounded-full bg-white/8 blur-3xl" aria-hidden="true" />
      <div className="absolute bottom-10 right-8 h-40 w-40 rounded-[2rem] border border-white/20 bg-white/8 backdrop-blur-sm" aria-hidden="true" />

      {/* Content */}
      <div className="relative container-wide pb-16 md:pb-24">
        <div className={`flex flex-col gap-6 max-w-3xl ${alignClass}`}>
          {eyebrow && (
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.22em] text-white/80 backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-[var(--color-gold)]" aria-hidden="true" />
              <span>{eyebrow}</span>
            </div>
          )}
          <h1 className="text-balance text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[0.96] tracking-tight max-w-2xl">
            {title}
          </h1>
          {subtitle && (
            <p className="text-base md:text-lg text-white/82 leading-relaxed max-w-xl">
              {subtitle}
            </p>
          )}
          {(primaryCta || secondaryCta) && (
            <div className="flex flex-wrap gap-3 mt-2">
              {primaryCta && (
                <Button href={primaryCta.href} variant="primary" size="lg" arrow>
                  {primaryCta.label}
                </Button>
              )}
              {secondaryCta && (
                <Button href={secondaryCta.href} variant="outline" size="lg">
                  {secondaryCta.label}
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
