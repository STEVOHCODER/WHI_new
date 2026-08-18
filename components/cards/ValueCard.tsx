import type { ComponentType } from "react";
import type { Value } from "@/types";
import { type IconProps, Eye, Scale, ShieldCheck, Target, Users, Zap } from "@/components/ui/icons";

const iconMap: Record<string, ComponentType<IconProps>> = {
  "shield-check": ShieldCheck,
  "eye": Eye,
  "target": Target,
  "zap": Zap,
  "scale": Scale,
  "users": Users,
};

const toneMap: Record<string, { bg: string; accent: string }> = {
  accountability: { bg: "rgba(21,108,74,0.10)", accent: "var(--color-primary)" },
  transparency: { bg: "rgba(29,122,198,0.10)", accent: "var(--color-blue)" },
  effectiveness: { bg: "rgba(229,107,47,0.10)", accent: "var(--color-accent)" },
  efficiency: { bg: "rgba(109,70,200,0.10)", accent: "var(--color-purple)" },
  equity: { bg: "rgba(240,180,41,0.12)", accent: "var(--color-gold)" },
  equality: { bg: "rgba(207,59,108,0.10)", accent: "var(--color-rose)" },
};

interface ValueCardProps {
  value: Value;
}

export default function ValueCard({ value }: ValueCardProps) {
  const Icon = iconMap[value.icon] ?? ShieldCheck;
  const tone = toneMap[value.id] ?? {
    bg: "rgba(21,108,74,0.10)",
    accent: "var(--color-primary)",
  };

  return (
    <div className="group flex h-full flex-col items-center rounded-[1.5rem] border border-[var(--color-border)] bg-white p-6 text-center shadow-[0_14px_40px_rgba(14,24,20,0.06)] transition-all duration-200 hover:-translate-y-1 hover:border-[var(--color-primary)] hover:shadow-[0_22px_60px_rgba(14,24,20,0.1)]">
      <div
        className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border transition-colors duration-200"
        style={{ backgroundColor: tone.bg, borderColor: tone.accent }}
      >
        <Icon
          size={24}
          strokeWidth={1.5}
          className="transition-transform duration-200 group-hover:scale-110"
          style={{ color: tone.accent }}
        />
      </div>
      <h3 className="mb-2 text-lg font-black text-[var(--color-text)]">{value.label}</h3>
      <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
        {value.description}
      </p>
    </div>
  );
}
