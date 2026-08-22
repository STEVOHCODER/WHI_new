import Image from "next/image";
import type { Program } from "@/types";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Button from "@/components/ui/Button";
import PartnersSection from "@/components/sections/PartnersSection";
import CTASection from "@/components/sections/CTASection";
import {
  BookOpen,
  CheckCircle2,
  HandHeart,
  Hospital,
  Laptop,
  Trophy,
  Users,
} from "@/components/ui/icons";

export default function ProgramPageContent({ program }: { program: Program }) {
  return (
    <>
      <section className="relative min-h-[68vh] overflow-hidden pt-20 surface-hero section-panel hero-grid">
        <Image
          src={program.image}
          alt={program.imageAlt}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/72 via-black/48 to-black/18" />
        <div className="absolute -left-20 top-24 h-56 w-56 rounded-full bg-white/10 blur-3xl" aria-hidden="true" />
        <div className="absolute bottom-8 right-8 h-28 w-28 rounded-[1.5rem] border border-white/15 bg-white/10 backdrop-blur-sm" aria-hidden="true" />
        <div className="relative container-wide pb-14 pt-32 md:pb-20">
          <div className="max-w-2xl rounded-[2rem] border border-white/12 bg-black/25 p-6 text-white backdrop-blur-[3px] md:p-8">
            <div className="mb-4 inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.22em] text-white/78">
              WHI-SL Program
            </div>
            <h1 className="text-balance text-4xl font-black leading-[0.96] text-white md:text-5xl lg:text-6xl">
              {program.fullName}
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-white/82">
              {program.tagline}
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding surface-white">
        <div className="container-wide max-w-4xl">
          <AnimatedSection>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[var(--color-primary)]">
              Overview
            </p>
            <p className="text-lg leading-relaxed text-[var(--color-text-muted)]">
              {program.description}
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="section-padding surface-sand section-panel">
        <div className="container-wide">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <AnimatedSection direction="left">
              <SectionHeading eyebrow="The Challenge" title="Why this program matters" align="left" />
              <p className="mt-5 leading-relaxed text-[var(--color-text-muted)]">
                {program.challenge}
              </p>
            </AnimatedSection>
            <AnimatedSection direction="right">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-[0_22px_70px_rgba(14,24,20,0.14)]">
                <Image
                  src={program.challengeImage}
                  alt={program.challengeImageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width:1024px) 100vw, 50vw"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"
                  aria-hidden="true"
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="section-padding surface-white">
        <div className="container-wide">
          <AnimatedSection>
            <SectionHeading eyebrow="What We Do" title="Key Focus Areas" align="center" />
          </AnimatedSection>
          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {program.focusAreas.map((area, i) => (
              <AnimatedSection key={area} delay={i * 50}>
                <article
                  className="group relative h-full overflow-hidden rounded-[1.75rem] border border-[var(--color-border)] bg-white p-6 shadow-[0_14px_40px_rgba(14,24,20,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_60px_rgba(14,24,20,0.1)]"
                  style={{ boxShadow: `0 18px 60px ${program.color}12` }}
                >
                  <div
                    className="absolute inset-x-0 top-0 h-1.5"
                    style={{ backgroundColor: program.color }}
                    aria-hidden="true"
                  />
                  <div className="relative flex items-start gap-4">
                    <div
                      className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-[1.25rem] bg-white shadow-[0_10px_24px_rgba(14,24,20,0.06)]"
                      style={{ color: program.color, border: `1px solid ${program.color}22` }}
                    >
                      <CheckCircle2 size={28} strokeWidth={1.8} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div
                        className="inline-flex rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-white"
                        style={{ backgroundColor: program.color }}
                      >
                        Focus Area {String(i + 1).padStart(2, "0")}
                      </div>
                      <h3 className="mt-3 text-2xl font-black leading-[1.02] tracking-tight text-[var(--color-text)]">
                        {area}
                      </h3>
                      <p className="mt-3 max-w-md text-sm leading-relaxed text-[var(--color-text-muted)] md:text-[0.98rem]">
                        {getFocusAreaSummary(area, program.shortLabel)}
                      </p>
                    </div>
                  </div>
                </article>
                </AnimatedSection>
              ))}
          </div>
        </div>
      </section>

      <section className="section-padding surface-cream section-panel">
        <div className="container-wide max-w-6xl mx-auto">
          <AnimatedSection>
            <SectionHeading eyebrow="How We Work" title="Activities" align="center" />
          </AnimatedSection>
          <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-2">
            {program.activities.map((activity, i) => {
              const card = getActivityCard(activity, i);
              const ActivityIcon = card.icon;

              return (
                <AnimatedSection key={activity} delay={i * 60}>
                <article
                  className="group relative h-full overflow-hidden rounded-[1.75rem] border border-[var(--color-border)] bg-white p-6 shadow-[0_14px_38px_rgba(14,24,20,0.06)] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_18px_48px_rgba(14,24,20,0.1)] md:p-7"
                  style={{ boxShadow: `0 16px 50px ${card.accent}14` }}
                >
                  <div
                    className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{ backgroundColor: card.tint }}
                    aria-hidden="true"
                  />
                  <div
                    className="absolute inset-x-0 top-0 h-1.5 opacity-80 transition-opacity duration-300 group-hover:opacity-100"
                    style={{ backgroundColor: card.accent }}
                    aria-hidden="true"
                  />
                  <div className="relative flex items-start gap-4">
                    <div
                      className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-[1.25rem] border bg-white shadow-[0_10px_24px_rgba(14,24,20,0.06)] transition-transform duration-300 group-hover:scale-[1.04]"
                      style={{ color: card.accent, borderColor: `${card.accent}28` }}
                    >
                      <ActivityIcon size={28} strokeWidth={1.8} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div
                        className="inline-flex rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-white"
                        style={{ backgroundColor: card.accent }}
                      >
                        {card.badge}
                      </div>
                      <h3 className="mt-3 text-2xl font-black leading-[1.02] tracking-tight text-[var(--color-text)]">
                        {card.title}
                      </h3>
                      <p className="mt-3 max-w-xl text-sm leading-relaxed text-[var(--color-text-muted)] md:text-[0.98rem]">
                        {card.description}
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

      <section className="section-padding surface-white">
        <div className="container-wide">
          <AnimatedSection>
            <SectionHeading eyebrow="Expected Results" title="Intended Outcomes" align="center" />
          </AnimatedSection>
          <div className="mx-auto mt-10 grid max-w-3xl grid-cols-1 gap-5 sm:grid-cols-2">
            {program.outcomes.map((outcome, i) => (
              <AnimatedSection key={outcome} delay={i * 70}>
                <div
                  className="rounded-[1.5rem] p-6 text-white shadow-[0_14px_40px_rgba(14,24,20,0.12)]"
                  style={{
                    background:
                      i % 2 === 0
                        ? `linear-gradient(135deg, ${program.color}, rgba(15, 27, 24, 0.92))`
                        : `linear-gradient(135deg, rgba(15,27,24,0.92), ${program.color})`,
                  }}
                >
                  <p className="text-sm font-semibold leading-relaxed">{outcome}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding surface-sand section-panel">
        <div className="container-wide">
          <div className="grid grid-cols-1 gap-8 overflow-hidden rounded-[2rem] lg:grid-cols-[1.1fr_0.9fr]">
            <div className="relative min-h-[22rem]">
              <Image
                src={program.storyImage}
                alt={program.storyImageAlt}
                fill
                className="object-cover"
                sizes="(max-width:1024px) 100vw, 50vw"
              />
            </div>
            <div className="flex items-center surface-dark p-8 text-white md:p-10">
              <div>
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-white/70">
                  Field Notes
                </p>
                <h3 className="max-w-md text-2xl font-black leading-snug text-white md:text-3xl">
                  Stories, lessons, and reflections from {program.shortLabel.toLowerCase()} work.
                </h3>
                <p className="mt-5 max-w-md text-sm leading-relaxed text-white/70">
                  This space is used to document what WHI-SL learns in community meetings, outreach sessions, and follow-up support so the program stays practical and grounded.
                </p>
                <div className="mt-8">
                  <Button href="/impact" variant="outline" arrow>
                    View Our Impact
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PartnersSection />

      <CTASection
        title={`Support the ${program.shortLabel} Program`}
        subtitle="Your partnership or donation helps WHI-SL reach more people and create deeper community impact."
        primaryCta={{ label: "Partner With Us", href: "/partner-with-us" }}
        secondaryCta={{ label: "Contact Us", href: "/contact" }}
        dark
      />
    </>
  );
}

type ActivityCard = {
  title: string;
  badge: string;
  description: string;
  accent: string;
  tint: string;
  icon: typeof BookOpen;
};

const activityThemes: Array<{
  match: RegExp;
  title: string;
  badge: string;
  description: string;
  accent: string;
  tint: string;
  icon: typeof BookOpen;
}> = [
  {
    match: /capacity-building trainings/i,
    title: "Capacity Building",
    badge: "Training",
    description: "Capacity-building trainings, workshops, and debates that strengthen skills and shared learning.",
    accent: "var(--color-primary)",
    tint: "rgba(21,108,74,0.06)",
    icon: BookOpen,
  },
  {
    match: /teaching sessions/i,
    title: "Community Education",
    badge: "Outreach",
    description: "Teaching sessions, clubs, and mobilisation campaigns that spread knowledge and spark participation.",
    accent: "var(--color-blue)",
    tint: "rgba(29,122,198,0.06)",
    icon: Users,
  },
  {
    match: /screening, counselling/i,
    title: "Screening & Counselling",
    badge: "Support",
    description: "Screening, counselling, and outreach services delivered close to the communities that need them.",
    accent: "var(--color-accent)",
    tint: "rgba(229,107,47,0.06)",
    icon: Hospital,
  },
  {
    match: /health support services/i,
    title: "Community Health Support",
    badge: "Care",
    description: "Health support services in the community that help people access care and practical guidance.",
    accent: "var(--color-rose)",
    tint: "rgba(207,59,108,0.06)",
    icon: HandHeart,
  },
  {
    match: /technical and material support/i,
    title: "Technical Support",
    badge: "Systems",
    description: "Technical and material support for local initiatives that strengthen community-led action.",
    accent: "var(--color-gold)",
    tint: "rgba(240,180,41,0.08)",
    icon: Laptop,
  },
  {
    match: /competitions, sensitisation/i,
    title: "Youth Development",
    badge: "Youth",
    description: "Competitions, sensitisation, and youth talent development activities that create positive opportunities.",
    accent: "var(--color-purple)",
    tint: "rgba(109,70,200,0.06)",
    icon: Trophy,
  },
];

function getActivityCard(activity: string, index: number): ActivityCard {
  const theme = activityThemes.find(({ match }) => match.test(activity));

  if (theme) return theme;

  const fallbackTitles = [
    "Capacity Building",
    "Community Education",
    "Screening & Counselling",
    "Community Health Support",
    "Technical Support",
    "Youth Development",
  ];

  return {
    title: fallbackTitles[index] ?? "Activity",
    badge: "Program",
    description: activity,
    accent: "var(--color-primary)",
    tint: "rgba(21,108,74,0.06)",
    icon: BookOpen,
  };
}

function getFocusAreaSummary(area: string, programLabel: string) {
  const normalized = area.toLowerCase();

  if (normalized.includes("sexual and reproductive health")) {
    return "Delivers practical education and support that help people make informed choices about health and wellbeing.";
  }
  if (normalized.includes("mental health")) {
    return "Builds awareness and early support around mental wellbeing, screening, and referral pathways.";
  }
  if (normalized.includes("community public-health")) {
    return "Brings screening, testing, and treatment support closer to communities that need it most.";
  }
  if (normalized.includes("water, hygiene, and sanitation")) {
    return "Supports healthier daily living through clean water, better hygiene, and safer sanitation practices.";
  }
  if (normalized.includes("rural and city development")) {
    return "Connects development action to the needs of both rural and urban communities.";
  }
  if (normalized.includes("biodiversity and conservation")) {
    return "Encourages environmental stewardship as part of long-term community wellbeing.";
  }
  if (normalized.includes("community literacy and education")) {
    return "Strengthens knowledge, confidence, and learning opportunities across communities.";
  }
  if (normalized.includes("science and technology promotion")) {
    return "Uses innovation and practical tools to make outreach and learning more effective.";
  }
  if (normalized.includes("micro-project creation")) {
    return "Helps young people and communities turn ideas into small, sustainable livelihood projects.";
  }
  if (normalized.includes("youth talent development")) {
    return "Creates positive pathways for young people through creativity, skills, and confidence-building.";
  }
  if (normalized.includes("gender awareness")) {
    return "Promotes respect, equality, and informed dialogue around gender rights and responsibilities.";
  }
  if (normalized.includes("advocacy against domestic and gender-based violence")) {
    return "Supports prevention, response, and awareness around violence affecting women and girls.";
  }
  if (normalized.includes("gender and family conflict resolution")) {
    return "Encourages peaceful dialogue and practical support within families and communities.";
  }
  if (normalized.includes("support for survivors")) {
    return "Offers compassionate support and referral pathways for survivors of abuse and violence.";
  }
  if (normalized.includes("women's empowerment")) {
    return "Builds leadership, voice, and opportunity for women and girls.";
  }
  if (normalized.includes("economic development")) {
    return "Creates pathways for greater financial independence and local opportunity.";
  }
  if (normalized.includes("policy implementation support")) {
    return "Turns policy into practice through monitoring, engagement, and accountability.";
  }
  if (normalized.includes("human rights advocacy")) {
    return "Raises awareness and strengthens protections for vulnerable and marginalised groups.";
  }
  if (normalized.includes("conflict resolution")) {
    return "Helps communities resolve disputes peacefully and build stronger local trust.";
  }
  if (normalized.includes("peacebuilding")) {
    return "Supports dialogue and cooperation that strengthen peace and social cohesion.";
  }
  if (normalized.includes("human rights education")) {
    return "Builds understanding of rights, responsibilities, and available support services.";
  }
  if (normalized.includes("reduction of human trafficking")) {
    return "Promotes prevention, reporting, and community awareness against exploitation.";
  }
  if (normalized.includes("reduction of human rights violations")) {
    return "Works to protect dignity, safety, and justice in everyday community life.";
  }
  if (normalized.includes("health and social inequalities")) {
    return "Focuses on closing the gaps that leave some people behind in access and opportunity.";
  }

  return `A core area of WHI-SL's ${programLabel.toLowerCase()} work.`;
}
