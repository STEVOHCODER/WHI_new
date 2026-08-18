import type { Metadata } from "next";
import Image from "next/image";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionHeading from "@/components/ui/SectionHeading";
import CTASection from "@/components/sections/CTASection";
import {
  Building2,
  Calendar,
  HandHeart,
  BookOpen,
  Users,
} from "@/components/ui/icons";
import whiTeamImage from "../../newimages/WHI team.jpeg";

export const metadata: Metadata = {
  title: "Meet the Team",
  description:
    "Meet the WHI-SL team structure, including leadership, operations, and program roles.",
};

const heroDescription =
  "The people behind WHI-SL plan, coordinate, and deliver community-based interventions across health, rights, gender, and research.";

const teamStoryStats = [
  {
    label: "Founded",
    value: "2010",
    icon: Calendar,
    accent: "var(--color-primary)",
    tint: "#eef7f2",
  },
  {
    label: "Registered",
    value: "2018",
    icon: Building2,
    accent: "var(--color-accent)",
    tint: "#fff4e8",
  },
  {
    label: "Core programs",
    value: "4",
    icon: Users,
    accent: "var(--color-gold)",
    tint: "#fbf4e4",
  },
];

const cultureCards = [
  {
    number: "01",
    icon: BookOpen,
    text: "Community knowledge guides our decisions.",
    accent: "var(--color-primary)",
    tint: "#eef7f2",
  },
  {
    number: "02",
    icon: Building2,
    text: "Operational roles keep delivery reliable.",
    accent: "var(--color-accent)",
    tint: "#fff4e8",
  },
  {
    number: "03",
    icon: HandHeart,
    text: "Program teams stay close to the people they serve.",
    accent: "var(--color-rose)",
    tint: "#fbf0f0",
  },
];

const photoDetails = [
  "Shared uniform and posture reflecting unity",
  "Institutional pride and professionalism",
  "Collaboration across ministries, schools, and civil society",
  "Commitment to accountability, transparency, effectiveness, efficiency, equity, and equality",
];

function TeamStoryCard() {
  return (
    <div className="relative overflow-hidden rounded-[2.25rem] border border-[var(--color-border)] bg-white shadow-[0_24px_80px_rgba(14,24,20,0.12)]">
      <div className="relative aspect-[4/3] md:aspect-[5/4]">
          <Image
          src={whiTeamImage}
          alt="Women's Health Initiative Sierra Leone team photo"
          fill
          priority
          className="object-cover object-[center_32%]"
          sizes="(max-width: 1024px) 100vw, 46vw"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/12 to-transparent"
          aria-hidden="true"
        />
        <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/16 bg-black/24 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-white/86 backdrop-blur-sm">
          <span className="h-2 w-2 rounded-full bg-[var(--color-gold)]" aria-hidden="true" />
          <span>Team Story</span>
        </div>
        <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
          <div className="max-w-sm rounded-[1.5rem] border border-white/10 bg-black/28 p-4 text-white backdrop-blur-[2px]">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/72">
              Staff of WHI-SL
            </p>
            <p className="mt-2 text-sm leading-relaxed text-white/84">
              A unified team with shared purpose, identity, and pride.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TeamHeroCard() {
  return (
    <section
      className="section-panel surface-hero relative overflow-hidden"
      aria-label="Meet the Team hero"
    >
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(242,167,53,0.14),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(37,116,86,0.14),transparent_32%)]"
        aria-hidden="true"
      />
      <div className="relative container-wide py-14 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.84fr_1.16fr] lg:items-center">
          <AnimatedSection direction="left">
            <div className="relative overflow-hidden rounded-[2.25rem] border border-white/18 bg-[rgba(255,255,255,0.9)] px-6 py-7 shadow-[0_18px_60px_rgba(14,24,20,0.12)] backdrop-blur-[3px] md:px-8 md:py-9">
              <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[var(--color-gold)]/18 blur-3xl" aria-hidden="true" />
              <div className="absolute -bottom-10 left-6 h-24 w-24 rounded-[2rem] bg-[var(--color-accent)]/12 blur-2xl" aria-hidden="true" />
              <div className="relative max-w-xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-white px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.24em] text-[var(--color-primary)] shadow-[0_10px_24px_rgba(14,24,20,0.04)]">
                  <span className="h-2 w-2 rounded-full bg-[var(--color-accent)]" aria-hidden="true" />
                  <span>Our People</span>
                </div>
                <h1 className="mt-5 text-balance text-4xl font-black leading-[0.95] tracking-tight text-[var(--color-text)] md:text-5xl lg:text-6xl">
                  Meet the Team
                </h1>
                <p className="mt-5 max-w-lg text-base leading-relaxed text-[var(--color-text-muted)] md:text-lg">
                  {heroDescription}
                </p>
                <div className="mt-7 h-1.5 w-24 rounded-full bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-accent)] to-[var(--color-gold)]" />
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection direction="right">
            <div className="relative lg:pl-4">
              <div
                className="absolute -left-6 top-10 h-28 w-28 rounded-[2rem] bg-[var(--color-accent)]/12 blur-3xl"
                aria-hidden="true"
              />
              <div
                className="absolute -right-2 bottom-8 h-24 w-24 rounded-full bg-[var(--color-gold)]/12 blur-2xl"
                aria-hidden="true"
              />
              <div className="relative overflow-hidden rounded-[2.5rem] border border-[var(--color-border)] bg-white shadow-[0_26px_84px_rgba(14,24,20,0.16)]">
                <div className="relative aspect-[16/11]">
                  <Image
                    src={whiTeamImage}
                    alt="Women's Health Initiative Sierra Leone team photo"
                    fill
                    priority
                    className="object-cover object-[center_28%]"
                    sizes="(max-width: 1024px) 100vw, 54vw"
                  />
                </div>
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-white/6"
                  aria-hidden="true"
                />
                <div className="absolute bottom-5 left-5 rounded-full border border-white/18 bg-black/22 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.24em] text-white/86 backdrop-blur-sm">
                  WHI-SL Team
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

export default function TeamPage() {
  return (
    <>
      <TeamHeroCard />

      <section className="section-padding surface-white">
        <div className="container-wide">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.98fr_1.02fr] lg:items-center">
            <AnimatedSection direction="left">
              <TeamStoryCard />
            </AnimatedSection>

            <AnimatedSection direction="right">
              <div className="space-y-6">
                <SectionHeading
                  eyebrow="Team Story"
                  title="A collaborative team driving community change"
                  subtitle="The group of staff at Women&apos;s Health Initiative implemented the Entertain for Health Project using sports and entertainment competitions to address harmful substance use among adolescents and young people in Bo District."
                  align="left"
                />

                <div className="space-y-4 text-[var(--color-text-muted)] leading-relaxed">
                  <p>
                    This unified team photo reflects the collaborative spirit that drives the organisation&apos;s work across its four programs: Health and Social Empowerment, Health Research, Human Rights, and Gender Empowerment.
                  </p>
                  <p>
                    Founded in Bo City in 2010 and registered with the Bo City Council in 2018, Women&apos;s Health Initiative relies on experienced staff and dedicated volunteers to carry out its public health and social empowerment activities.
                  </p>
                  <p>
                    The team pictured here represents the people responsible for planning, coordinating, and implementing the organisation&apos;s community-based interventions, from sexual and reproductive health education to gender-based violence support and human rights advocacy.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {teamStoryStats.map((item, index) => {
                    const Icon = item.icon;

                    return (
                      <AnimatedSection key={item.label} delay={index * 60}>
                        <article
                          className="group relative overflow-hidden rounded-[1.5rem] border border-[var(--color-border)] bg-white p-5 shadow-[0_12px_36px_rgba(14,24,20,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_48px_rgba(14,24,20,0.12)]"
                          style={{ backgroundColor: item.tint }}
                        >
                          <div
                            className="absolute inset-x-0 top-0 h-1.5"
                            style={{ backgroundColor: item.accent }}
                            aria-hidden="true"
                          />
                          <div className="flex items-start justify-between gap-4">
                            <div
                              className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-white shadow-[0_10px_24px_rgba(14,24,20,0.06)] transition-transform duration-300 group-hover:scale-105"
                              style={{ color: item.accent, border: `1px solid ${item.accent}22` }}
                            >
                              <Icon size={20} strokeWidth={2} />
                            </div>
                          </div>
                          <div className="mt-6 space-y-2">
                            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--color-text-light)]">
                              {item.label}
                            </p>
                            <p className="text-3xl font-black leading-[0.95] tracking-tight text-[var(--color-text)]">
                              {item.value}
                            </p>
                          </div>
                        </article>
                      </AnimatedSection>
                    );
                  })}
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
              eyebrow="Team with Partners"
              title="A broad coalition around the work"
              subtitle="A large gathering of WHI-SL staff, volunteers, and external partners assembled for a group photograph following the launch of the Entertain for Health Project, reflecting the wide range of stakeholders engaged in the response to youth substance abuse in Bo District."
              align="center"
            />
          </AnimatedSection>

          <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-start">
            <AnimatedSection direction="left">
              <div className="relative overflow-hidden rounded-[2.25rem] border border-[var(--color-border)] bg-white shadow-[0_22px_70px_rgba(14,24,20,0.1)]">
                <div className="relative aspect-[4/3] md:aspect-[5/4]">
                  <Image
                    src={whiTeamImage}
                    alt="Women's Health Initiative Sierra Leone team photo"
                    fill
                    className="object-cover object-[center_38%]"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/42 via-black/6 to-transparent"
                  aria-hidden="true"
                />
                <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/16 bg-black/22 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-white/86 backdrop-blur-sm">
                  <span className="h-2 w-2 rounded-full bg-[var(--color-gold)]" aria-hidden="true" />
                  <span>Entertain for Health Project</span>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <div className="space-y-5">
                <div className="rounded-[2rem] border border-[var(--color-border)] bg-white p-7 shadow-[0_16px_50px_rgba(14,24,20,0.06)]">
                  <p className="text-sm leading-relaxed text-[var(--color-text-muted)]">
                    Coverage of the event noted invitees from the Ministry of Social Welfare, the National Drug Law Enforcement Agency, the Mental Health Secretariat, the Sierra Leone Police, the District Health Management Team, the Ministry of Basic and Senior Secondary Schools, student organisations from Njala University, principals from six secondary schools in Bo, transport unions, and media outlets.
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-[var(--color-text-muted)]">
                    The turnout exceeded the forty participants originally expected, showing strong institutional and community interest in tackling substance abuse through a multi-sector approach.
                  </p>
                </div>

                <div className="rounded-[2rem] border border-[var(--color-border)] bg-white p-7 shadow-[0_16px_50px_rgba(14,24,20,0.06)]">
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--color-primary)]">
                    What the photo shows
                  </p>
                  <ul className="mt-4 divide-y divide-[var(--color-border)] text-sm leading-relaxed text-[var(--color-text-muted)]">
                    {photoDetails.map((item) => (
                      <li key={item} className="py-3 first:pt-0 last:pb-0">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="section-padding surface-white">
        <div className="container-wide max-w-5xl mx-auto">
          <AnimatedSection>
            <SectionHeading
              eyebrow="Working Culture"
              title="We build with community, not for it"
              subtitle="WHI-SL combines governance, operations, and field work to keep the organisation accountable, responsive, and grounded in real needs."
              align="center"
            />
          </AnimatedSection>

          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
            {cultureCards.map((item, index) => {
              const Icon = item.icon;

              return (
                <AnimatedSection key={item.number} delay={index * 80}>
                  <article
                    className="group relative h-full overflow-hidden rounded-[1.75rem] border border-[var(--color-border)] bg-white p-6 shadow-[0_16px_48px_rgba(14,24,20,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_60px_rgba(14,24,20,0.12)]"
                    style={{ backgroundColor: item.tint }}
                  >
                    <div
                      className="absolute inset-x-0 top-0 h-1.5"
                      style={{ backgroundColor: item.accent }}
                      aria-hidden="true"
                    />
                    <div className="flex items-start justify-between gap-4">
                      <div
                        className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-[0_10px_24px_rgba(14,24,20,0.06)] transition-transform duration-300 group-hover:scale-105"
                        style={{ color: item.accent, border: `1px solid ${item.accent}22` }}
                      >
                        <Icon size={22} strokeWidth={2} />
                      </div>
                      <span
                        className="text-5xl font-black leading-none tracking-tight"
                        style={{ color: item.accent, opacity: 0.16 }}
                      >
                        {item.number}
                      </span>
                    </div>
                    <p className="mt-8 text-lg font-semibold leading-relaxed text-[var(--color-text)]">
                      {item.text}
                    </p>
                  </article>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      <CTASection
        title="Interested in working with WHI-SL?"
        subtitle="Explore our current opportunities, internships, and volunteer roles."
        primaryCta={{ label: "Work With Us", href: "/work-with-us" }}
        secondaryCta={{ label: "Contact Us", href: "/contact" }}
        dark
      />
    </>
  );
}
