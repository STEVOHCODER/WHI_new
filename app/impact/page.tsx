import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/sections/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedSection from "@/components/ui/AnimatedSection";
import StoryCard from "@/components/cards/StoryCard";
import CTASection from "@/components/sections/CTASection";
import Button from "@/components/ui/Button";
import {
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
