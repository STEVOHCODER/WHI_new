import Button from "@/components/ui/Button";

interface CTASectionProps {
  title: string;
  subtitle?: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  dark?: boolean;
}

export default function CTASection({
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  dark = true,
}: CTASectionProps) {
  if (dark) {
    return (
      <section
        className="py-20 md:py-28 surface-dark section-panel"
      >
        <div className="container-wide text-center relative">
          <div className="mx-auto max-w-4xl rounded-[2rem] border border-white/10 bg-white/5 px-6 py-10 backdrop-blur-sm md:px-10 md:py-14">
            <h2 className="text-balance text-3xl md:text-4xl lg:text-5xl font-black text-white leading-[0.98] max-w-2xl mx-auto">
              {title}
            </h2>
            {subtitle && (
              <p className="mt-4 text-base md:text-lg text-white/72 max-w-xl mx-auto leading-relaxed">
                {subtitle}
              </p>
            )}
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button href={primaryCta.href} variant="accent" size="lg" arrow>
                {primaryCta.label}
              </Button>
              {secondaryCta && (
                <Button href={secondaryCta.href} variant="outline" size="lg">
                  {secondaryCta.label}
                </Button>
              )}
            </div>
          </div>
          <div className="absolute left-8 top-8 h-16 w-16 rounded-full bg-[var(--color-gold)]/30 blur-2xl" aria-hidden="true" />
          <div className="absolute bottom-8 right-10 h-24 w-24 rounded-[1.5rem] bg-[var(--color-blue)]/20 blur-xl" aria-hidden="true" />
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 md:py-28 surface-sand section-panel">
      <div className="container-wide text-center">
        <div className="mx-auto max-w-4xl rounded-[2rem] border border-[var(--color-border)] bg-white px-6 py-10 shadow-[0_20px_60px_rgba(14,24,20,0.08)] md:px-10 md:py-14">
          <h2 className="text-balance text-3xl md:text-4xl lg:text-5xl font-black text-[var(--color-text)] leading-[0.98] max-w-2xl mx-auto">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-4 text-base md:text-lg text-[var(--color-text-muted)] max-w-xl mx-auto leading-relaxed">
              {subtitle}
            </p>
          )}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button href={primaryCta.href} variant="primary" size="lg" arrow>
              {primaryCta.label}
            </Button>
            {secondaryCta && (
              <Button href={secondaryCta.href} variant="secondary" size="lg">
                {secondaryCta.label}
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
