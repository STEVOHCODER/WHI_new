import type { TeamMember } from "@/types";
import { User } from "@/components/ui/icons";

interface PersonCardProps {
  member: TeamMember;
}

export default function PersonCard({ member }: PersonCardProps) {
  return (
    <div className="flex h-full flex-col items-center rounded-[1.75rem] border border-[var(--color-border)] bg-white p-6 text-center shadow-[0_16px_50px_rgba(14,24,20,0.06)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_22px_65px_rgba(14,24,20,0.1)]">
      <div
        className="w-20 h-20 rounded-[1.5rem] flex items-center justify-center mb-4 flex-shrink-0 border border-[var(--color-border)]"
        style={{
          background:
            "linear-gradient(135deg, rgba(21,108,74,0.14), rgba(229,107,47,0.12))",
        }}
        aria-hidden="true"
      >
        <User size={32} strokeWidth={1.5} className="text-[var(--color-primary)]" />
      </div>

      <div className="space-y-1">
        <p
          className="inline-flex rounded-full bg-[var(--color-bg-section)] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--color-primary)] mb-3"
        >
          {member.department}
        </p>
        {member.name ? (
          <h3 className="text-lg font-black text-[var(--color-text)]">{member.name}</h3>
        ) : (
          <h3 className="text-lg font-black text-[var(--color-text)]">{member.role}</h3>
        )}
        {member.name && (
          <p className="text-sm text-[var(--color-text-muted)]">{member.role}</p>
        )}
        {member.bio && (
          <p className="text-xs text-[var(--color-text-light)] mt-3 leading-relaxed">
            {member.bio}
          </p>
        )}
      </div>
    </div>
  );
}
