import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/sections/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedSection from "@/components/ui/AnimatedSection";
import ImpactStatCard from "@/components/cards/ImpactStatCard";
import StoryCard from "@/components/cards/StoryCard";
import CTASection from "@/components/sections/CTASection";
import Button from "@/components/ui/Button";
import {
  impactStats,
  featuredStories,
  projectAchievements,
} from "@/data/impact";
import { programs } from "@/data/programs";
import {
  communityOutreach,
  healthAdvocacy,
  launchCrowd,
  sports1,
  sports2,
  sports3,
} from "@/data/photo-assets";
import {
  CheckCircle2,
  Clock,
  Heart,
  ShieldCheck,
  Trophy,
  Users,
} from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "Our Impact",
  description:
    "Discover WHI's impact across Sierra Leone through organisational milestones, program areas, and community snapshots.",
};

const programHighlights: Record<string, string> = {
  "health-social-empowerment":
    "Community outreach, health education, and screening support that strengthen everyday wellbeing.",
  "gender-empowerment":
    "Safe spaces, skills-building, and advocacy that help women and girls lead with confidence.",
  "human-rights":
    "Awareness, mediation, and advocacy work that protects dignity and participation.",
  "health-research":
    "Evidence gathering and learning that help WHI-SL refine its programs and partnerships.",
};

const achievementIcons = [Users, Trophy, Clock, ShieldCheck, Heart];

const achievementImages = [
  {
    image: sports1,
    alt: "Young people gathered for a community sports activity in Bo District",
  },
  {
    image: sports2,
    alt: "A sports session used to share mental health awareness messages",
  },
  {
    image: sports3,
    alt: "Young people taking part in an outreach sports and entertainment event",
  },
  {
    image: healthAdvocacy,
    alt: "Community health advocacy and counselling session",
  },
  {
    image: communityOutreach,
    alt: "WHI-SL community outreach activity with young people",
  },
];

export default function ImpactPage() {
  return (
    <>
      <PageHero
        image={launchCrowd}
        imageAlt="WHI-SL community crowd at an outreach and celebration event"
        eyebrow="Making a Difference"
        title="Our Impact"
        subtitle="The results of WHI&apos;s work show up in the confidence, knowledge, and resilience of the communities we serve."
      />

      <section className="py-16 md:py-20 surface-dark section-panel" aria-label="Impact statistics">
        <div className="container-wide">
          <div className="grid grid-cols-2 divide-x divide-white/10 md:grid-cols-3 lg:grid-cols-5">
            {impactStats.map((stat) => (
              <ImpactStatCard key={stat.label} stat={stat} light />
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding surface-white">
        <div className="container-wide">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
            <AnimatedSection direction="left">
              <div className="relative overflow-hidden rounded-[2.25rem] bg-[var(--color-primary)] px-6 py-8 text-white shadow-[0_24px_80px_rgba(14,24,20,0.18)] md:px-8 md:py-10">
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[var(--color-gold)]/20 blur-3xl" aria-hidden="true" />
                <div className="absolute -bottom-10 left-8 h-24 w-24 rounded-[2rem] bg-[var(--color-accent)]/15 blur-2xl" aria-hidden="true" />
                <div className="relative max-w-2xl">
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/16 bg-white/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-white/86">
                    <span className="h-2 w-2 rounded-full bg-[var(--color-gold)]" aria-hidden="true" />
                    <span>Since 2010</span>
                  </div>
                  <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/68">
                    Building community trust
                  </p>
                  <h2 className="mt-6 max-w-2xl text-xl font-black leading-[1.08] tracking-tight text-balance md:text-2xl lg:text-3xl">
                    Since 2010, WHI has been building trust in Bo District and beyond through outreach, advocacy, learning, and long-term community relationships.
                  </h2>
                  <div className="mt-7 h-1.5 w-24 rounded-full bg-gradient-to-r from-[var(--color-gold)] via-[var(--color-accent)] to-transparent" />

                  <div className="mt-8 max-w-xl rounded-[1.75rem] border border-white/12 bg-white/8 p-6 backdrop-blur-[2px] md:p-7">
                  <h3 className="text-lg font-black leading-[1] md:text-xl">
                    Impact is more than numbers.
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-white/78 md:text-sm">
                    WHI records its impact through program delivery, participation, and learning. The organisation continues to strengthen its evidence base while keeping the focus on people rather than numbers alone.
                  </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <div className="relative lg:pl-6">
                <div className="absolute -left-4 top-10 h-28 w-28 rounded-[2rem] bg-[var(--color-accent)]/14 blur-3xl" aria-hidden="true" />
                <div className="absolute -right-3 bottom-10 h-24 w-24 rounded-full bg-[var(--color-gold)]/14 blur-2xl" aria-hidden="true" />

                <div className="relative overflow-hidden rounded-[2.25rem] border border-[var(--color-border)] bg-white shadow-[0_24px_80px_rgba(14,24,20,0.14)]">
                  <div className="aspect-[4/3] overflow-hidden">
                    <Image
                      src={featuredStories[0].image}
                      alt={featuredStories[0].imageAlt}
                      width={900}
                      height={700}
                      className="h-full w-full object-cover"
                      sizes="(max-width:1024px) 100vw, 48vw"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/42 via-black/8 to-transparent" aria-hidden="true" />
                </div>

                <div className="mt-5 flex justify-end">
                  <div className="inline-flex items-center gap-3 rounded-full border border-[var(--color-border)] bg-white px-4 py-2.5 shadow-[0_12px_30px_rgba(14,24,20,0.08)]">
                    <span className="h-3 w-3 rounded-full bg-[var(--color-accent)]" aria-hidden="true" />
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--color-primary)]">
                        Since 2010
                      </p>
                      <p className="text-sm font-semibold text-[var(--color-text)]">
                        Building community trust
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="section-padding surface-sand section-panel">
        <div className="container-wide">
          <AnimatedSection>
            <SectionHeading
              eyebrow="Programs"
              title="Impact across all four programs"
              subtitle="Each program contributes a different piece of the same goal: healthier, more equitable communities in Sierra Leone."
              align="center"
            />
          </AnimatedSection>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
            {programs.map((program, i) => (
              <AnimatedSection key={program.id} delay={i * 80}>
                <div className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white transition-shadow hover:shadow-md">
                  <div className="h-2 w-full" style={{ backgroundColor: program.color }} />
                  <div className="p-6">
                    <h3 className="mb-2 text-lg font-black text-[var(--color-text)]">
                      {program.shortLabel}
                    </h3>
                    <p className="mb-4 text-sm leading-relaxed text-[var(--color-text-muted)]">
                      {program.tagline}
                    </p>
                    <div
                      className="rounded-xl p-4"
                      style={{ backgroundColor: `${program.color}10` }}
                    >
                      <p className="text-sm font-semibold" style={{ color: program.color }}>
                        {programHighlights[program.slug]}
                      </p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding surface-white section-panel">
        <div className="container-wide">
          <AnimatedSection>
            <SectionHeading
              eyebrow="Project Achievements"
              title="Mental health and substance-use results"
              subtitle="The Entertain for Health project combined sports, entertainment, screening, counselling, and psychosocial support to help young people build healthier habits and stronger coping skills."
              align="center"
            />
          </AnimatedSection>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {projectAchievements.map((achievement, index) => {
              const Icon = achievementIcons[index] ?? CheckCircle2;
              const media = achievementImages[index] ?? achievementImages[0];

              return (
                <AnimatedSection key={achievement.label} delay={index * 60} className="h-full">
                  <article
                    className="group relative flex h-full min-h-[560px] flex-col overflow-hidden rounded-[2rem] border border-[var(--color-border)] bg-white shadow-[0_18px_60px_rgba(14,24,20,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_26px_80px_rgba(14,24,20,0.14)]"
                    style={{
                      backgroundImage: `linear-gradient(180deg, ${achievement.accent}12 0%, #ffffff 36%, ${achievement.accent}08 100%)`,
                    }}
                  >
                    <div
                      className="absolute inset-x-0 top-0 h-1.5"
                      style={{ backgroundColor: achievement.accent }}
                      aria-hidden="true"
                    />

                    <div className="relative h-[190px] overflow-hidden">
                      <Image
                        src={media.image}
                        alt={media.alt}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" aria-hidden="true" />
                      <div className="absolute left-5 top-5 inline-flex rounded-full bg-white/92 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--color-text)] shadow-[0_10px_24px_rgba(14,24,20,0.12)]">
                        Project Result
                      </div>
                    </div>

                    <div className="relative flex flex-1 flex-col p-6 md:p-7">
                      <div className="flex items-start justify-between gap-4">
                        <div
                          className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-[1.25rem] border bg-white shadow-[0_10px_24px_rgba(14,24,20,0.08)]"
                          style={{
                            color: achievement.accent,
                            borderColor: `${achievement.accent}22`,
                          }}
                        >
                          <Icon size={24} strokeWidth={2} />
                        </div>
                        <div className="text-right">
                          <p className="text-[2.55rem] font-black leading-none tracking-tight text-[var(--color-text)] md:text-[2.9rem]">
                            {achievement.value}
                          </p>
                          <p
                            className="mt-2 text-[10px] font-bold uppercase tracking-[0.22em]"
                            style={{ color: achievement.accent }}
                          >
                            {achievement.label}
                          </p>
                        </div>
                      </div>

                      <div className="mt-7 flex flex-1 flex-col">
                        <h3 className="text-2xl font-black leading-[1.02] tracking-tight text-[var(--color-text)] md:text-[2.05rem]">
                          {achievement.title}
                        </h3>
                        <p className="mt-5 text-sm leading-relaxed text-[var(--color-text-muted)] md:text-[15px]">
                          {achievement.description}
                        </p>
                        <div className="mt-auto pt-6">
                          <div
                            className="h-1.5 w-24 rounded-full"
                            style={{ backgroundColor: achievement.accent }}
                            aria-hidden="true"
                          />
                        </div>
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
            <SectionHeading
              eyebrow="Snapshots"
              title="From the communities we serve"
              subtitle="These snapshots reflect the kinds of moments WHI documents through its community work."
              align="center"
            />
          </AnimatedSection>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {featuredStories.map((story, i) => (
              <AnimatedSection key={story.id} delay={i * 80}>
                <StoryCard story={story} />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding surface-cream section-panel">
        <div className="container-wide">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-start">
            <AnimatedSection>
            <SectionHeading
              eyebrow="Publications"
              title="Reports and research"
              subtitle="WHI publishes program evaluations, field learning, and research findings as they are finalised."
              align="left"
            />
            </AnimatedSection>
            <AnimatedSection>
              <div className="rounded-2xl border border-[var(--color-border)] bg-white p-8">
                <ul className="space-y-4 text-sm text-[var(--color-text-muted)]">
                  <li>Annual program summaries and internal learning notes</li>
                  <li>Health research outputs and community survey findings</li>
                  <li>Partner briefs and shared project updates</li>
                </ul>
                <div className="mt-6">
                  <Button href="/contact" variant="secondary" arrow>
                    Request a Report
                  </Button>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <CTASection
        title="Help us expand our impact"
        subtitle="Partner with WHI-SL to reach more communities and create deeper, lasting change in Sierra Leone."
        primaryCta={{ label: "Partner With Us", href: "/partner-with-us" }}
        secondaryCta={{ label: "Contact Us", href: "/contact" }}
        dark
      />
    </>
  );
}
