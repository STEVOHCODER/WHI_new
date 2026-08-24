import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedSection from "@/components/ui/AnimatedSection";
import PartnersSliderSection from "./partners-slider-section";
import { programs } from "@/data/programs";
import { values } from "@/data/values";
import {
  communityOutreach,
  healthAdvocacy,
  sports1,
  sports2,
  sports3,
  launchCrowd,
  teamBanner,
  outreachSpeaker,
  sportMatch,
  officeDesk,
  officeAdmin,
  officeRoom,
} from "@/data/photo-assets";
import {
  ArrowRight,
  BookOpen,
  HandHeart,
  Heart,
  Microscope,
  ShieldCheck,
  Users,
} from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "Women's Health Initiative (WHI-SL) | Sierra Leone",
  description:
    "Women Health Initiative (WHI) is a community-based organisation in Bo City, Sierra Leone, working to empower vulnerable young people through health, gender empowerment, human rights, and research.",
};

const heroHighlights = [
  {
    label: "Health & Social Empowerment",
    icon: Heart,
  },
  {
    label: "Gender Empowerment",
    icon: HandHeart,
  },
  {
    label: "Human Rights",
    icon: ShieldCheck,
  },
  {
    label: "Research & Evidence",
    icon: Microscope,
  },
  {
    label: "Community Support",
    icon: Users,
  },
];

const purposeCards = [
  {
    title: "Vision",
    text: "WHI strives for equal and equitable rights and opportunities for vulnerable people in Sierra Leone by addressing social determinants of health. We need Sierra Leone free of inequalities, inequities, injustices, and social discrimination.",
  },
  {
    title: "Mission",
    text: "Women Health Initiative is dedicated to empower vulnerable people in Sierra Leone to make smart choices and decisions in their lives for sustainable development.",
  },
  {
    title: "History",
    text: "Founded in Bo City in 2010, WHI began with a group of 15 young volunteers from different student organisations who wanted to respond to community health and social issues.",
  },
];

const chooseCards = [
  {
    icon: BookOpen,
    title: "Sports and entertainment",
    text: "Sports, entertainments, and arts help us connect with communities in practical ways.",
  },
  {
    icon: Users,
    title: "Capacity building",
    text: "Training, workshops, debates, and mentorship strengthen skills and confidence for youth and women.",
  },
  {
    icon: ShieldCheck,
    title: "Community services",
    text: "We deliver community-based comprehensive services where people already live and gather.",
  },
  {
    icon: Microscope,
    title: "Evidence-based innovation",
    text: "Research, information, and technology help us keep the work useful and grounded.",
  },
];

export default async function HomePage() {
  const galleryPhotos = [
    { src: communityOutreach, title: "Community Outreach", caption: "WHI-SL community outreach activity engaging with residents in Bo District" },
    { src: healthAdvocacy, title: "Health Advocacy", caption: "Community health education and sensitisation session for young people" },
    { src: sports1, title: "Sports for Health", caption: "Young people gathered for a community sports and health activity" },
    { src: sports2, title: "Mental Health Awareness", caption: "A sports session used to share mental health awareness messages" },
    { src: sports3, title: "Youth Outreach Event", caption: "Young people taking part in an outreach sports and entertainment event" },
    { src: "/images/team-image.png" as string, title: "WHI Team", caption: "The WHI-SL team working together for community development" },
    { src: launchCrowd, title: "Launch Event Crowd", caption: "Community crowd at a WHI-SL outreach and celebration event" },
    { src: teamBanner, title: "Team Banner", caption: "WHI-SL team banner at a public event in Bo City" },
    { src: outreachSpeaker, title: "Outreach Speaker", caption: "Community outreach speaker addressing participants at an event" },
    { src: sportMatch, title: "Sports Match", caption: "Community sports match used for health awareness campaigns" },
    { src: officeDesk, title: "Office Workspace", caption: "WHI-SL office workspace where planning and coordination happens" },
    { src: officeAdmin, title: "Admin Team", caption: "WHI-SL administrative team supporting daily operations" },
    { src: officeRoom, title: "Meeting Room", caption: "WHI-SL meeting room for team discussions and partner engagements" },
  ];

  return (
    <>
      <section
        className="section-panel surface-hero relative overflow-hidden pt-20 hero-grid"
        aria-label="Hero"
      >
        <Image
          src={launchCrowd}
          alt="WHI-SL community crowd at an outreach event in Bo"
          fill
          priority
          className="object-cover opacity-55"
          sizes="100vw"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-black/78 via-black/56 to-black/18"
          aria-hidden="true"
        />
        <div
          className="absolute -left-16 top-24 h-56 w-56 rounded-full bg-[var(--color-primary-light)]/25 blur-3xl animate-pulse-glow"
          aria-hidden="true"
        />
        <div
          className="absolute right-8 top-28 hidden h-24 w-24 rounded-[1.75rem] border border-white/18 bg-white/10 backdrop-blur-sm animate-float-soft lg:block"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-16 left-1/3 hidden h-40 w-40 rounded-full bg-[var(--color-gold)]/16 blur-3xl animate-float md:block"
          aria-hidden="true"
        />

        <div className="relative container-wide pb-10 pt-10 md:pb-14 md:pt-14 lg:pb-16">
          <div className="grid min-h-[78svh] items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
            <AnimatedSection>
              <div className="max-w-2xl">
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.22em] text-white/78">
                  <span className="h-2 w-2 rounded-full bg-[var(--color-gold)]" aria-hidden="true" />
                  <span>Sierra Leone | Est. 2010</span>
                </div>
                <h1 className="text-balance text-3xl font-black leading-[0.94] tracking-tight text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.38)] md:text-4xl lg:text-5xl">
                  <span className="block">Empowering communities.</span>
                  <span className="block">Improving health.</span>
                  <span className="gradient-text block">Creating opportunities.</span>
                </h1>
                <p className="mt-5 max-w-lg text-sm leading-relaxed text-white/88 drop-shadow-[0_2px_12px_rgba(0,0,0,0.28)] md:text-base lg:text-lg">
                  Women Health Initiative is a community-based organisation in Bo City, Sierra Leone, helping vulnerable young people make smart choices and decisions for sustainable development through health, advocacy, and research.
                </p>
                <blockquote className="mt-5 max-w-lg border-l-2 border-white/20 pl-4 text-sm leading-relaxed text-white/76 drop-shadow-[0_2px_12px_rgba(0,0,0,0.22)]">
                  &ldquo;Empowering vulnerable people to make smart choices and decisions for sustainable development.&rdquo;
                </blockquote>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Button href="/who-we-are" variant="primary" size="md" arrow>
                    Learn More
                  </Button>
                  <Button href="/contact" variant="outline" size="md">
                    Contact Us
                  </Button>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <div className="relative mx-auto max-w-xl">
                <div
                  className="absolute -left-4 top-10 h-32 w-32 rounded-[2rem] bg-[var(--color-gold)]/18 blur-xl"
                  aria-hidden="true"
                />
                <div
                  className="absolute -right-3 bottom-8 h-28 w-28 rounded-[2rem] bg-white/10 blur-xl"
                  aria-hidden="true"
                />
                <div className="pill-stagger space-y-4">
                  {heroHighlights.map((item, index) => {
                    const Icon = item.icon;

                    return (
                      <div key={item.label} className="flex items-center gap-4" style={{ animationDelay: `${index * 110}ms` }}>
                        <div className="hero-pill-icon flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full border-[6px] border-white/20 bg-white/18 text-white shadow-[0_14px_30px_rgba(0,0,0,0.2)] md:h-16 md:w-16">
                          <Icon size={22} strokeWidth={2.2} />
                        </div>
                        <a
                          href="#programs"
                          className="hero-pill flex-1 rounded-full px-6 py-3.5 text-center text-xs font-bold uppercase tracking-[0.16em] text-white md:py-4 md:text-sm"
                        >
                          {item.label}
                        </a>
                      </div>
                    );
                  })}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="section-padding surface-white section-panel">
        <div className="container-wide">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <AnimatedSection direction="left">
              <div className="relative overflow-hidden rounded-[2.25rem] border border-[var(--color-border)] bg-white shadow-[0_22px_70px_rgba(14,24,20,0.1)]">
                <div className="relative aspect-[4/5] md:aspect-[5/4]">
                  <Image
                    src={communityOutreach}
                    alt="WHI-SL community outreach in a market setting"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 46vw"
                  />
                </div>
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/38 via-black/8 to-transparent"
                  aria-hidden="true"
                />
                <div className="absolute left-5 top-5 rounded-full bg-white/12 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.22em] text-white/90 backdrop-blur-sm">
                  Founded in 2010
                </div>
                <div className="absolute bottom-5 left-5 max-w-sm rounded-[1.5rem] border border-white/12 bg-black/24 p-4 text-white backdrop-blur-[2px]">
                  <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/72">
                    Bo City, Sierra Leone
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-white/84">
                    WHI was founded in 2010 and registered by Bo Council in 2018.
                  </p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <div className="pt-2">
                <div className="inline-flex rounded-full border border-[var(--color-border)] bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-[var(--color-primary)]">
                  About Us
                </div>
                <h2 className="mt-6 text-3xl font-black leading-[0.96] tracking-tight text-[var(--color-text)] md:text-4xl lg:text-5xl">
                  Welcome message from WHI
                </h2>
                <p className="mt-5 max-w-xl text-base leading-relaxed text-[var(--color-text-muted)] md:text-lg">
                  We use sports, entertainments, capacity building, mentorship, community-based services, and evidence-based innovation to address community health and social issues.
                </p>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-[var(--color-text-muted)] md:text-lg">
                  Our work is built around vulnerable young people, women, girls, children, people living with disabilities, people living with HIV/AIDS, and other community members.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Button href="/who-we-are" variant="secondary" arrow>
                    More About Us
                  </Button>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="section-padding surface-cream section-panel">
        <div className="container-wide">
          <AnimatedSection>
            <SectionHeading
              eyebrow="Our Guiding Purpose"
              title="Vision, mission, and history"
              subtitle="The organisation is guided by equal rights, practical support, and sustainable development for vulnerable people in Sierra Leone."
              align="center"
            />
          </AnimatedSection>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {purposeCards.map((card, index) => (
              <AnimatedSection key={card.title} delay={index * 60}>
                <article className="card-hover h-full rounded-[1.75rem] border border-[var(--color-border)] bg-white p-6 shadow-[0_16px_44px_rgba(14,24,20,0.06)]">
                  <div className="inline-flex rounded-full bg-[var(--color-bg-section)] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--color-primary)]">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <h3 className="mt-5 text-2xl font-black leading-tight text-[var(--color-text)]">
                    {card.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-[var(--color-text-muted)] md:text-base">
                    {card.text}
                  </p>
                </article>
              </AnimatedSection>
            ))}
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <AnimatedSection>
              <article className="rounded-[1.75rem] border border-[var(--color-border)] bg-white p-6 shadow-[0_16px_44px_rgba(14,24,20,0.06)]">
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--color-primary)]">
                  Values
                </p>
                <ul className="mt-4 grid grid-cols-2 gap-3 text-sm font-semibold text-[var(--color-text)]">
                  {values.map((value) => (
                    <li
                      key={value.id}
                      className="chip cursor-default rounded-full border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-2 text-center"
                    >
                      {value.label}
                    </li>
                  ))}
                </ul>
              </article>
            </AnimatedSection>

            <AnimatedSection>
              <article className="rounded-[1.75rem] border border-[var(--color-border)] bg-white p-6 shadow-[0_16px_44px_rgba(14,24,20,0.06)]">
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--color-primary)]">
                  Community Focus
                </p>
                <p className="mt-4 text-sm leading-relaxed text-[var(--color-text-muted)] md:text-base">
                  WHI keeps its work grounded in outreach, education, advocacy, research, and community participation so the organisation remains practical and responsive.
                </p>
              </article>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="section-padding surface-white section-panel">
        <div className="container-wide">
          <AnimatedSection>
            <SectionHeading
              eyebrow="Programs"
              title="Our core areas of work"
              subtitle="WHI works through four connected programs: Health and Social Empowerment, Gender Empowerment, Human Rights, and Health Research."
              align="center"
            />
          </AnimatedSection>

          <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            {programs.map((program, index) => (
              <AnimatedSection key={program.id} delay={index * 60}>
                <article className="card-hover group overflow-hidden rounded-[1.75rem] border border-[var(--color-border)] bg-white shadow-[0_16px_44px_rgba(14,24,20,0.06)]">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={program.image}
                      alt={program.imageAlt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 1280px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/52 via-black/12 to-transparent" />
                    <div
                      className="absolute left-4 top-4 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white"
                      style={{ backgroundColor: `${program.color}E6` }}
                    >
                      {program.shortLabel}
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-black leading-tight text-[var(--color-text)]">
                      {program.fullName}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-muted)]">
                      {program.tagline}
                    </p>
                    <Link
                      href={`/programs/${program.slug}`}
                      className="link-underline mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-primary)] transition-colors duration-200 hover:text-[var(--color-primary-dark)] group-hover:gap-4"
                    >
                      Explore Program
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </article>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding surface-sand section-panel">
        <div className="container-wide">
          <AnimatedSection>
            <SectionHeading
              eyebrow="Why Communities Choose Us"
              title="Innovation at the center of change"
              subtitle="Sports, entertainments, capacity building, community-based services, information and technology, and evidence-based innovation guide the organisation's approach."
              align="center"
            />
          </AnimatedSection>

          <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            {chooseCards.map((card, index) => {
              const Icon = card.icon;

              return (
                <AnimatedSection key={card.title} delay={index * 55}>
                  <article className="card-hover group h-full rounded-[1.75rem] border border-[var(--color-border)] bg-white p-6 shadow-[0_16px_44px_rgba(14,24,20,0.06)]">
                    <div className="icon-tile flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--color-bg-section)] text-[var(--color-primary)]">
                      <Icon size={22} strokeWidth={2} />
                    </div>
                    <h3 className="mt-5 text-xl font-black leading-tight text-[var(--color-text)]">
                      {card.title}
                    </h3>
                    <p className="mt-4 text-sm leading-relaxed text-[var(--color-text-muted)]">
                      {card.text}
                    </p>
                  </article>
                </AnimatedSection>
              );
            })}
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <AnimatedSection>
              <div className="relative overflow-hidden rounded-[2rem] border border-[var(--color-border)] bg-white shadow-[0_18px_52px_rgba(14,24,20,0.08)]">
                <div className="relative aspect-[16/10]">
                  <Image
                    src={healthAdvocacy}
                    alt="WHI-SL health advocacy and community sensitisation moment"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
                <div className="absolute left-5 top-5 rounded-full bg-white/12 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-white backdrop-blur-sm">
                  Community in Action
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {galleryPhotos.slice(0, 6).map((photo, index) => (
                  <article
                    key={`gallery-${index}`}
                    className="overflow-hidden rounded-[1.5rem] border border-[var(--color-border)] bg-white shadow-[0_12px_34px_rgba(14,24,20,0.06)]"
                  >
                    <div className="relative aspect-[4/3]">
                      <Image
                        src={photo.src}
                        alt={photo.title || "WHI-SL gallery image"}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 50vw, 25vw"
                      />
                    </div>
                    {(photo.title || photo.caption) && (
                      <div className="p-3">
                        {photo.title && (
                          <p className="text-xs font-bold text-[var(--color-text)]">{photo.title}</p>
                        )}
                        {photo.caption && (
                          <p className="mt-1 text-[11px] text-[var(--color-text-muted)]">{photo.caption}</p>
                        )}
                      </div>
                    )}
                  </article>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <PartnersSliderSection />

      <section
        className="section-padding surface-dark section-panel animate-gradient-pan"
        style={{
          background: "linear-gradient(135deg, #171114 0%, #2a1520 45%, #6e2340 85%, #a83a62 130%)",
        }}
      >
        <div className="container-wide">
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/6 px-6 py-12 shadow-[0_26px_90px_rgba(0,0,0,0.24)] md:px-10 md:py-16">
            <div
              className="absolute -left-10 top-6 h-32 w-32 rounded-full bg-[var(--color-gold)]/18 blur-2xl animate-pulse-glow"
              aria-hidden="true"
            />
            <div
              className="absolute bottom-6 right-0 h-28 w-28 rounded-[1.5rem] bg-[var(--color-primary-light)]/22 blur-xl animate-float-soft"
              aria-hidden="true"
            />
            <div className="relative mx-auto max-w-3xl text-center">
              <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.24em] text-white/72">
                Final Call to Action
              </p>
              <h2 className="text-balance text-3xl font-black leading-[0.96] text-white md:text-4xl lg:text-5xl">
                Together, we can create healthier and more equitable communities in Sierra Leone.
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/75 md:text-lg">
                Join WHI as a partner, donor, volunteer, or advocate and help us build a Sierra Leone free from inequalities, inequities, injustices, and social discrimination.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Button href="/contact" variant="primary" size="lg" arrow>
                  Contact WHI
                </Button>
                <Button href="/who-we-are" variant="outline" size="lg">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
