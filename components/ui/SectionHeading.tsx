interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  light = false,
  className = "",
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";
  const textColor = light ? "text-white" : "text-[var(--color-text)]";
  const subtitleColor = light ? "text-white/65" : "text-[var(--color-text-muted)]";

  return (
    <div className={`max-w-3xl ${alignClass} ${className}`}>
      {eyebrow && (
        <div className={`mb-4 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-bold uppercase tracking-[0.24em] ${
          light
            ? "border-white/15 bg-white/8 text-white/75"
            : "border-[var(--color-border)] bg-white text-[var(--color-primary)]"
        }`}>
          <span className="h-2 w-2 rounded-full bg-[var(--color-primary)]" aria-hidden="true" />
          <span>{eyebrow}</span>
        </div>
      )}
      <h2 className={`text-3xl md:text-4xl lg:text-5xl font-black leading-[0.96] tracking-tight ${textColor}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 text-base md:text-lg leading-relaxed ${subtitleColor}`}>
          {subtitle}
        </p>
      )}
      <div
        className={`mt-5 h-1.5 w-20 rounded-full ${
          light ? "bg-gradient-to-r from-white/60 via-white/30 to-transparent" : "bar-shimmer"
        } ${align === "center" ? "mx-auto" : ""}`}
        aria-hidden="true"
      />
    </div>
  );
}
