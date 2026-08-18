"use client";

import { useEffect, useRef, useState } from "react";

type ImpactNumber = {
  value: number;
  label: string;
  description?: string;
  accent: string;
};

function useCountUp(target: number, active: boolean) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;

    let raf = 0;
    const start = performance.now();
    const duration = 1200;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target]);

  return value;
}

function CountBlock({
  item,
  active,
}: {
  item: ImpactNumber;
  active: boolean;
}) {
  const value = useCountUp(item.value, active);
  return (
    <div
      className="relative px-5 py-6 md:px-6 md:py-8"
      style={{
        borderLeft: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div
        className="absolute left-0 top-0 h-full w-1 rounded-full opacity-90"
        style={{ backgroundColor: item.accent }}
        aria-hidden="true"
      />
      <div className="text-5xl font-black leading-none tracking-tight md:text-6xl" style={{ color: item.accent }}>
        {value}
      </div>
      <p className="mt-4 text-sm font-bold uppercase tracking-[0.22em] text-white/82">
        {item.label}
      </p>
      {item.description ? (
        <p className="mt-2 max-w-[18rem] text-sm leading-relaxed text-white/62">
          {item.description}
        </p>
      ) : null}
    </div>
  );
}

export default function HomeImpactNumbers({ items }: { items: ImpactNumber[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-sm">
      <div className="grid grid-cols-1 divide-y divide-white/8 md:grid-cols-5 md:divide-x md:divide-y-0">
        {items.map((item) => (
          <div key={item.label} className="group">
            <CountBlock item={item} active={active} />
          </div>
        ))}
      </div>
    </div>
  );
}
