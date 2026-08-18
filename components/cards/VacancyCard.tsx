import Link from "next/link";
import type { Vacancy } from "@/types";
import { ArrowRight, Calendar, Clock, MapPin } from "@/components/ui/icons";

interface VacancyCardProps {
  vacancy: Vacancy;
}

export default function VacancyCard({ vacancy }: VacancyCardProps) {
  const typeColors: Record<string, string> = {
    "Full-time": "bg-emerald-50 text-emerald-700",
    "Part-time": "bg-sky-50 text-sky-700",
    "Volunteer": "bg-fuchsia-50 text-fuchsia-700",
    "Internship": "bg-amber-50 text-amber-700",
    "Contract": "bg-slate-50 text-slate-700",
  };

  return (
    <div className="rounded-[1.5rem] border border-[var(--color-border)] bg-white p-6 shadow-[0_16px_50px_rgba(14,24,20,0.06)] transition-all duration-200 hover:-translate-y-1 hover:border-[var(--color-primary)] hover:shadow-[0_22px_65px_rgba(14,24,20,0.1)]">
      <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
        <div>
          <h3 className="mb-1 text-lg font-black text-[var(--color-text)]">
            {vacancy.title}
          </h3>
          <p className="text-sm text-[var(--color-text-muted)]">{vacancy.department}</p>
        </div>
        <span
          className={`flex-shrink-0 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] ${
            typeColors[vacancy.type] ?? "bg-gray-50 text-gray-700"
          }`}
        >
          {vacancy.type}
        </span>
      </div>

      <div className="flex flex-wrap gap-4 mb-5">
        <div className="flex items-center gap-1.5 text-xs text-[var(--color-text-muted)]">
          <MapPin size={13} />
          {vacancy.location}
        </div>
        <div className="flex items-center gap-1.5 text-xs text-[var(--color-text-muted)]">
          <Clock size={13} />
          {vacancy.type}
        </div>
        <div className="flex items-center gap-1.5 text-xs text-[var(--color-text-muted)]">
          <Calendar size={13} />
          Deadline: {vacancy.deadline}
        </div>
      </div>

      {vacancy.href ? (
        <Link
          href={vacancy.href}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-primary)] hover:gap-3 transition-all duration-200"
        >
          View Position <ArrowRight size={14} />
        </Link>
      ) : (
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-primary)] hover:gap-3 transition-all duration-200"
        >
          Apply via Contact <ArrowRight size={14} />
        </Link>
      )}
    </div>
  );
}
