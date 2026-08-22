"use client";

import { useEffect, useRef, useState } from "react";
import type { ImpactStat } from "@/types";

interface ImpactStatCardProps {
  stat: ImpactStat;
  light?: boolean;
}

export default function ImpactStatCard({ stat, light = false }: ImpactStatCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden rounded-[1.75rem] px-5 py-8 text-center ${
        light
          ? "bg-white/8 border border-white/10"
          : "bg-white border border-[var(--color-border)] shadow-[0_16px_50px_rgba(14,24,20,0.08)]"
      }`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(18px)",
        transition: "opacity 0.65s ease, transform 0.65s ease",
      }}
    >
      <div
        className={`absolute inset-x-0 top-0 h-1 ${
          light
            ? "bg-gradient-to-r from-[var(--color-gold)] via-[var(--color-accent)] to-[var(--color-blue)]"
            : "bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-accent)] to-[var(--color-gold)]"
        }`}
        aria-hidden="true"
      />
      <div
        className={`text-5xl md:text-6xl font-black tracking-tight mb-2 ${
          light ? "text-white" : "text-[var(--color-primary)]"
        }`}
      >
        {stat.value}
      </div>
      <div
        className={`text-sm font-bold uppercase tracking-[0.22em] mb-2 ${
          light ? "text-white" : "text-[var(--color-text)]"
        }`}
      >
        {stat.label}
      </div>
      {stat.description && (
        <div
          className={`text-xs leading-relaxed ${
            light ? "text-white/60" : "text-[var(--color-text-muted)]"
          }`}
        >
          {stat.description}
        </div>
      )}
    </div>
  );
}
