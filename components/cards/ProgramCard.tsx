import Image from "next/image";
import Link from "next/link";
import type { Program } from "@/types";
import { ArrowRight } from "@/components/ui/icons";

interface ProgramCardProps {
  program: Program;
}

export default function ProgramCard({ program }: ProgramCardProps) {
  return (
    <Link
      href={`/programs/${program.slug}`}
      className="group block overflow-hidden rounded-[1.75rem] border border-[var(--color-border)] bg-white shadow-[0_16px_50px_rgba(14,24,20,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_26px_70px_rgba(14,24,20,0.12)]"
      aria-label={`Learn about ${program.shortLabel}`}
    >
      <div className="h-2 w-full" style={{ backgroundColor: program.color }} />
      <div className="relative overflow-hidden h-60">
        <Image
          src={program.image}
          alt={program.imageAlt}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/18 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5">
          <div className="max-w-[70%]">
            <div className="mb-2 inline-flex items-center rounded-full bg-white/15 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-white/90 backdrop-blur-sm">
              {program.shortLabel}
            </div>
            <p className="text-sm font-medium text-white/80 line-clamp-2">
              {program.tagline}
            </p>
          </div>
          <div
            className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[var(--color-text)] shadow-lg"
            style={{ color: program.color }}
            aria-hidden="true"
          >
            <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-0.5" />
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="mb-3 flex items-center gap-2">
          <span
            className="h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: program.color }}
            aria-hidden="true"
          />
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-text-light)]">
            Program
          </span>
        </div>
        <h3 className="text-xl font-black text-[var(--color-text)] mb-3 leading-tight transition-colors group-hover:text-[var(--color-primary)]">
          {program.shortLabel}
        </h3>
        <p className="text-sm text-[var(--color-text-muted)] leading-relaxed mb-4 line-clamp-3">
          {program.tagline}
        </p>
        <div className="flex items-center gap-1.5 text-sm font-semibold text-[var(--color-primary)] group-hover:gap-3 transition-all duration-200">
          <span>Explore</span>
          <ArrowRight size={14} />
        </div>
      </div>
    </Link>
  );
}
