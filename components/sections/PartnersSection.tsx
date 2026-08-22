import Link from "next/link";
import { partners } from "@/data/partners";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedSection from "@/components/ui/AnimatedSection";
import {
  Building2,
  Globe2,
  Hospital,
  Landmark,
  Newspaper,
  School2,
  ShieldCheck,
  Users,
} from "@/components/ui/icons";

const partnerIcons = {
  "International Funder": Globe2,
  Government: Landmark,
  Health: Hospital,
  "Law Enforcement": ShieldCheck,
  Education: School2,
  Community: Users,
  Media: Newspaper,
} as const;

export default function PartnersSection() {
  return (
    <section className="section-padding surface-white">
      <div className="container-wide">
        <AnimatedSection>
          <SectionHeading
            eyebrow="Partners"
            title="Working Together for Change"
            subtitle="WHI-SL collaborates with ministries, health teams, schools, police, transport groups, media, and international partners highlighted in the launch gallery."
            align="center"
          />
        </AnimatedSection>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {partners.map((partner, i) => {
            const Icon = partnerIcons[partner.category as keyof typeof partnerIcons] ?? Building2;

            return (
              <AnimatedSection key={partner.id} delay={i * 50}>
                <div className="card-surface rounded-[1.5rem] px-6 py-5 flex items-center justify-between gap-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--color-primary)]">
                  <div>
                    <p className="text-sm font-semibold text-[var(--color-text)] leading-snug">
                      {partner.name}
                    </p>
                    <p className="text-xs text-[var(--color-text-light)] mt-0.5">
                      {partner.category}
                    </p>
                  </div>
                  <div
                    className="w-10 h-10 rounded-2xl flex-shrink-0 flex items-center justify-center bg-[var(--color-bg-section)] text-[var(--color-primary)]"
                    aria-hidden="true"
                  >
                    <Icon size={18} strokeWidth={2} />
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/partner-with-us"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-primary)] hover:gap-4 transition-all duration-200"
          >
            Become a Partner →
          </Link>
        </div>
      </div>
    </section>
  );
}
