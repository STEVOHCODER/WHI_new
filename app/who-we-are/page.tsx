import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/sections/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedSection from "@/components/ui/AnimatedSection";
import ValueCard from "@/components/cards/ValueCard";
import CTASection from "@/components/sections/CTASection";
import { Building2, Landmark, Users, Clock, Target } from "@/components/ui/icons";
import { values } from "@/data/values";
import { communityOutreach, teamBanner } from "@/data/photo-assets";

export const metadata: Metadata = {
  title: "Who We Are",
  description:
    "Learn about WHI-SL, our story, mission, vision, values, and approach to community health in Sierra Leone.",
};

const challengePanels = [
  {
    eyebrow: "Who it is for",
    title: "Communities at the centre",
    description:
      "Young people, women and girls, street children, orphans, sex workers, widows and widowers, people living with disabilities, and people living with HIV/AIDS.",
    accent: "var(--color-primary)",
  },
  {
    eyebrow: "What it covers",
    title: "Interconnected health pressures",
    description:
      "Unsafe sexual practices, drug abuse, mental health challenges, unwanted pregnancies, youth unemployment, poverty, gender-based violence, trafficking, and social exclusion.",
    accent: "var(--color-accent)",
  },
  {
    eyebrow: "Why it matters",
    title: "Health is shaped by context",
    description:
      "When these pressures go unaddressed, vulnerable people lose access to safety, dignity, and opportunity. WHI-SL responds by addressing the social determinants of health.",
    accent: "var(--color-gold)",
  },
];

const orgStructure = [
  {
    level: "General Assembly",
    desc: "35 members forming the highest governing body of WHI-SL.",
    badge: "Assembly",
    icon: Landmark,
    accent: "var(--color-primary)",
  },
  {
    level: "Board of Directors",
    desc: "Five members including the chair, co-chair, secretary, and representatives of partners, local leaders, beneficiaries, and trustees or alumni.",
    badge: "Directors",
    icon: Users,
    accent: "var(--color-accent)",
  },
  {
    level: "Executive Board",
    desc: "Executive Director, CEO, General Secretary, Finance Officer, program directors, Monitoring and Evaluation Officer, Internal Auditor, Procurement Officer, and Fundraising & Partnerships lead.",
    badge: "Leadership",
    icon: Building2,
    accent: "var(--color-gold)",
  },
  {
    level: "Executive Committee",
    desc: "Supports cross-cutting coordination and day-to-day decisions across the organisation.",
    badge: "Coordination",
    icon: Clock,
    accent: "var(--color-rose)",
  },
  {
    level: "Programs and Operations",
    desc: "Health, Gender, Rights, Research, Finance, Procurement, Logistics, M&E, and Partnerships.",
    badge: "Operations",
    icon: Target,
    accent: "var(--color-blue)",
  },
];

export default function WhoWeArePage() {
  return (
    <>
      <PageHero
        image={communityOutreach}
        imageAlt="WHI-SL community outreach in Bo, Sierra Leone"
        eyebrow="About WHI-SL"
        title="Who We Are"
        subtitle="A Bo-based organisation helping vulnerable young people make smart choices for sustainable development through health, rights, and community action."
      />

      <section className="section-padding surface-white">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <AnimatedSection direction="left">
              <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-primary)] mb-3">
                Our Story
              </p>
              <h2 className="text-3xl md:text-4xl font-black text-[var(--color-text)] leading-tight mb-5">
                Born from community, built for community.
              </h2>
              <p className="text-[var(--color-text-muted)] leading-relaxed mb-4">
                WHI-SL began in 2010 in Bo City, founded by 15 young volunteers from student organisations who saw the health and social challenges around them and decided to act.
              </p>
              <p className="text-[var(--color-text-muted)] leading-relaxed mb-4">
                Their goal was straightforward: address the social determinants of health and create a space where vulnerable people could access knowledge, services, and support to make better choices for their lives.
              </p>
              <p className="text-[var(--color-text-muted)] leading-relaxed">
                Registered with Bo Council in 2018, WHI-SL has grown into a professional community-based organisation with 15 staff, 25 volunteers, and a 35-member General Assembly.
              </p>
            </AnimatedSection>
            <AnimatedSection direction="right">
                <div className="relative overflow-hidden rounded-[2rem] aspect-[4/3] img-reveal shadow-[0_22px_70px_rgba(14,24,20,0.14)]">
                  <Image
                    src={teamBanner}
                    alt="WHI-SL participants gathered for a launch moment"
                    fill
                    className="object-cover"
                    sizes="(max-width:1024px) 100vw, 50vw"
                  />
                </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="section-padding surface-cream section-panel">
        <div className="container-wide">
          <AnimatedSection>
            <SectionHeading eyebrow="Purpose" title="Mission and Vision" align="center" />
          </AnimatedSection>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatedSection delay={100}>
              <div className="h-full rounded-[2rem] p-8 text-white surface-hero section-panel">
                <p className="text-xs font-semibold uppercase tracking-widest text-white/70 mb-4">
                  Our Mission
                </p>
                <h3 className="text-2xl font-black text-white mb-4 leading-snug">
                  Empowering vulnerable people to make smart choices and decisions for sustainable development.
                </h3>
                <p className="text-white/75 leading-relaxed text-sm">
                  WHI-SL improves knowledge, confidence, and access to services so that vulnerable people in Sierra Leone can make better choices for their lives.
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={200}>
              <div className="h-full rounded-[2rem] border border-[var(--color-border)] bg-white p-8 shadow-[0_16px_50px_rgba(14,24,20,0.08)]">
                <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-primary)] mb-4">
                  Our Vision
                </p>
                <h3 className="text-2xl font-black text-[var(--color-text)] mb-4 leading-snug">
                  A Sierra Leone free from inequality, inequity, injustice, and social discrimination.
                </h3>
                <p className="text-[var(--color-text-muted)] leading-relaxed text-sm">
                  We strive for equal and equitable rights and opportunities for vulnerable people in Sierra Leone by addressing the social determinants of health.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="section-padding surface-white">
        <div className="container-wide">
          <AnimatedSection>
            <SectionHeading
              eyebrow="Values"
              title="What guides us"
              subtitle="Six principles that shape every decision we make and every program we deliver."
              align="center"
            />
          </AnimatedSection>
          <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {values.map((value, i) => (
              <AnimatedSection key={value.id} delay={i * 60}>
                <ValueCard value={value} />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding surface-sand section-panel">
        <div className="container-wide">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_0.92fr] lg:gap-12 lg:items-start">
            <AnimatedSection className="lg:sticky lg:top-28">
              <div className="max-w-xl">
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-primary)]">
                  The Context
                </p>
                <h2 className="text-4xl font-black leading-[0.95] tracking-tight text-[var(--color-text)] md:text-5xl lg:text-6xl">
                  Challenges we
                  <br />
                  respond to.
                </h2>
                <p className="mt-6 max-w-lg text-lg leading-relaxed text-[var(--color-text-muted)] md:text-xl">
                  Sierra Leone&apos;s communities face a range of connected health and social pressures. WHI-SL works with the people most affected, turning complex challenges into focused community action.
                </p>
                <p className="mt-6 max-w-lg text-base leading-relaxed text-[var(--color-text-muted)]">
                  Instead of treating these issues as separate problems, we address the conditions around them so people can access safety, dignity, and better opportunities.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  {[
                    "Community-first",
                    "Youth-focused",
                    "Rights-based",
                    "Health-centered",
                  ].map((item) => (
                    <span
                      key={item}
                      className="inline-flex items-center rounded-full border border-[var(--color-border)] bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-text-light)] shadow-[0_10px_24px_rgba(14,24,20,0.04)]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={100}>
              <div className="space-y-4">
                {challengePanels.map((panel, index) => (
                  <article
                    key={panel.eyebrow}
                    className="relative overflow-hidden rounded-[2rem] border border-[var(--color-border)] bg-white p-7 shadow-[0_16px_50px_rgba(14,24,20,0.08)] transition-transform duration-300 hover:-translate-y-1"
                    style={{
                      boxShadow: `0 18px 60px ${panel.accent}14`,
                      borderLeftColor: panel.accent,
                      borderLeftWidth: "4px",
                    }}
                  >
                    <div
                      className="absolute -right-10 -top-10 h-28 w-28 rounded-full opacity-15 blur-3xl"
                      style={{ backgroundColor: panel.accent }}
                      aria-hidden="true"
                    />
                    <div className="relative flex items-start gap-4">
                      <div
                        className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl text-sm font-black text-white shadow-sm"
                        style={{ backgroundColor: panel.accent }}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[var(--color-text-light)]">
                          {panel.eyebrow}
                        </p>
                        <h3 className="mt-2 text-2xl font-black leading-[0.98] tracking-tight text-[var(--color-text)]">
                          {panel.title}
                        </h3>
                        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--color-text-muted)] md:text-[0.98rem]">
                          {panel.description}
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="section-padding surface-white">
        <div className="container-wide">
          <AnimatedSection>
            <div className="mx-auto max-w-4xl text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-white px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.24em] text-[var(--color-primary)] shadow-[0_10px_24px_rgba(14,24,20,0.04)]">
                <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-accent)]" aria-hidden="true" />
                <span>Governance</span>
              </div>
              <h2 className="text-balance text-4xl font-black leading-[0.95] tracking-tight text-[var(--color-text)] md:text-5xl lg:text-6xl">
                Organisational Structure
              </h2>
              <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-[var(--color-text-muted)] md:text-lg">
                WHI-SL is governed by a General Assembly and supported by an experienced leadership and operations team.
              </p>
              <div className="mx-auto mt-7 h-1.5 w-24 rounded-full bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-accent)] to-[var(--color-gold)]" />
            </div>
          </AnimatedSection>

          <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {orgStructure.map((item, i) => {
              const Icon = item.icon;
              return (
                <AnimatedSection key={item.level} delay={i * 70}>
                  <article
                    className="group relative flex h-full overflow-hidden rounded-[1.75rem] border border-[var(--color-border)] bg-white p-6 shadow-[0_14px_40px_rgba(14,24,20,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_60px_rgba(14,24,20,0.1)]"
                    style={{ boxShadow: `0 18px 60px ${item.accent}12` }}
                  >
                    <div
                      className="absolute inset-x-0 top-0 h-1.5"
                      style={{ backgroundColor: item.accent }}
                      aria-hidden="true"
                    />
                    <div className="relative flex w-full gap-4">
                      <div
                        className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-[1.25rem] bg-white shadow-[0_10px_24px_rgba(14,24,20,0.06)]"
                        style={{ color: item.accent, border: `1px solid ${item.accent}24` }}
                      >
                        <Icon size={28} strokeWidth={1.8} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div
                          className="inline-flex rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-white"
                          style={{ backgroundColor: item.accent }}
                        >
                          {item.badge}
                        </div>
                        <h3 className="mt-3 text-2xl font-black leading-[1.02] tracking-tight text-[var(--color-text)]">
                          {item.level}
                        </h3>
                        <p className="mt-3 max-w-md text-sm leading-relaxed text-[var(--color-text-muted)] md:text-[0.98rem]">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </article>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      <CTASection
        title="Want to work with us or support our mission?"
        primaryCta={{ label: "Partner With Us", href: "/partner-with-us" }}
        secondaryCta={{ label: "Work With Us", href: "/work-with-us" }}
        dark
      />
    </>
  );
}
