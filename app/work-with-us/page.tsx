import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedSection from "@/components/ui/AnimatedSection";
import VacancyCard from "@/components/cards/VacancyCard";
import Button from "@/components/ui/Button";
import {
  FlaskConical,
  HandHeart,
  MessageCircle,
  Users,
} from "@/components/ui/icons";
import { vacancies, volunteerRoles, internshipAreas } from "@/data/vacancies";

export const metadata: Metadata = {
  title: "Work With Us",
  description:
    "Explore careers, volunteer opportunities, and internships with WHI-SL.",
};

const volunteerThemes = [
  {
    id: "vol-health",
    icon: HandHeart,
    accent: "var(--color-primary)",
    tint: "#eef7f2",
    label: "Community care",
  },
  {
    id: "vol-gender",
    icon: Users,
    accent: "var(--color-rose)",
    tint: "#fbf0f0",
    label: "Gender action",
  },
  {
    id: "vol-research",
    icon: FlaskConical,
    accent: "var(--color-accent)",
    tint: "#fff4e8",
    label: "Evidence work",
  },
  {
    id: "vol-communications",
    icon: MessageCircle,
    accent: "var(--color-gold)",
    tint: "#fbf4e4",
    label: "Storytelling",
  },
];

export default function WorkWithUsPage() {
  return (
    <>
      <PageHero
        image="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1400&q=80"
        imageAlt="Team meeting in a nonprofit setting"
        eyebrow="Join WHI-SL"
        title="Work With Us"
        subtitle="Build your career, volunteer time, or learn through an internship with a community-driven organisation in Sierra Leone."
      />

      <section className="section-padding surface-white">
        <div className="container-wide">
          <AnimatedSection>
            <SectionHeading
              eyebrow="Careers"
              title="Current Opportunities"
              subtitle="If a vacancy is available, it will appear below. Otherwise, we will show our current status clearly."
              align="center"
            />
          </AnimatedSection>

          <div className="mt-10">
            {vacancies.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {vacancies.map((vacancy, index) => (
                  <AnimatedSection key={vacancy.id} delay={index * 80}>
                    <VacancyCard vacancy={vacancy} />
                  </AnimatedSection>
                ))}
              </div>
            ) : (
              <div className="rounded-[1.75rem] border border-[var(--color-border)] bg-white p-8 text-center shadow-[0_16px_50px_rgba(14,24,20,0.06)]">
                <h2 className="text-2xl font-black text-[var(--color-text)]">
                  There are currently no open positions.
                </h2>
                <p className="mt-3 text-sm text-[var(--color-text-muted)] max-w-2xl mx-auto">
                  We appreciate your interest in WHI-SL. Check back soon for future opportunities or send us a message if you would like to stay in touch.
                </p>
                <div className="mt-6">
                  <Button href="/contact" variant="secondary" arrow>
                    Contact WHI-SL
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="section-padding surface-sand section-panel">
        <div className="container-wide">
          <AnimatedSection>
            <SectionHeading
              eyebrow="Volunteer"
              title="Volunteer opportunities"
              subtitle="Volunteer roles help WHI-SL reach more communities and strengthen our visibility, data, and outreach."
              align="center"
            />
          </AnimatedSection>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
            {volunteerRoles.map((role, index) => (
              (() => {
                const theme = volunteerThemes.find((item) => item.id === role.id);
                const Icon = theme?.icon ?? HandHeart;

                return (
                  <AnimatedSection key={role.id} delay={index * 70}>
                    <article
                      className="group relative h-full overflow-hidden rounded-[1.75rem] border border-[var(--color-border)] bg-white p-6 shadow-[0_16px_50px_rgba(14,24,20,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(14,24,20,0.12)]"
                      style={{ backgroundColor: theme?.tint ?? "#ffffff" }}
                    >
                      <div
                        className="absolute inset-x-0 top-0 h-1.5"
                        style={{ backgroundColor: theme?.accent ?? "var(--color-primary)" }}
                        aria-hidden="true"
                      />
                      <div
                        className="absolute -right-10 -top-10 h-28 w-28 rounded-full blur-3xl"
                        style={{ backgroundColor: theme?.accent ?? "var(--color-primary)", opacity: 0.08 }}
                        aria-hidden="true"
                      />
                      <div className="relative flex h-full flex-col">
                        <div className="flex items-start justify-between gap-4">
                          <div
                            className="flex h-14 w-14 items-center justify-center rounded-[1.25rem] bg-white shadow-[0_10px_24px_rgba(14,24,20,0.06)] transition-transform duration-300 group-hover:scale-105"
                            style={{
                              color: theme?.accent ?? "var(--color-primary)",
                              border: `1px solid ${theme?.accent ?? "var(--color-primary)"}22`,
                            }}
                          >
                            <Icon size={24} strokeWidth={2} />
                          </div>
                          <span
                            className="text-5xl font-black leading-none tracking-tight"
                            style={{
                              color: theme?.accent ?? "var(--color-primary)",
                              opacity: 0.16,
                            }}
                          >
                            0{index + 1}
                          </span>
                        </div>

                        <div className="mt-6 inline-flex w-fit items-center rounded-full border border-[var(--color-border)] bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--color-text-light)] shadow-[0_8px_22px_rgba(14,24,20,0.04)]">
                          {theme?.label ?? "Volunteer Role"}
                        </div>

                        <h3 className="mt-4 text-2xl font-black leading-[1.02] tracking-tight text-[var(--color-text)]">
                          {role.title}
                        </h3>

                        <div className="mt-5 h-px w-16 bg-gradient-to-r from-black/10 via-black/20 to-transparent" />

                        <p className="mt-4 text-sm leading-relaxed text-[var(--color-text-muted)]">
                          {role.description}
                        </p>
                      </div>
                    </article>
                  </AnimatedSection>
                );
              })()
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding surface-white">
        <div className="container-wide">
          <AnimatedSection>
            <SectionHeading
              eyebrow="Internships"
              title="Internship areas"
              subtitle="Internships provide practical experience across WHI-SL's core work areas."
              align="center"
            />
          </AnimatedSection>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {internshipAreas.map((area, index) => (
              <AnimatedSection key={area} delay={index * 40}>
                <span className="inline-flex items-center rounded-full border border-[var(--color-border)] bg-white px-4 py-2 text-sm text-[var(--color-text-muted)] shadow-[0_12px_36px_rgba(14,24,20,0.05)]">
                  {area}
                </span>
              </AnimatedSection>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button href="/contact" variant="primary" arrow>
              Express Interest
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
