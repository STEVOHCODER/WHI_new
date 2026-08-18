import type { Metadata } from "next";
import Image from "next/image";
import AnimatedSection from "@/components/ui/AnimatedSection";
import ContactForm from "@/components/forms/ContactForm";
import { Clock, MapPin, MessageCircle, Users } from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact WHI-SL for partnerships, program enquiries, volunteering, and general information.",
};

const contactPoints = [
  {
    icon: MapPin,
    title: "Location",
    text: "Bo City, Bo District, Sierra Leone",
    accent: "var(--color-primary)",
    tint: "#eef7f2",
  },
  {
    icon: Clock,
    title: "Office Hours",
    text: "Monday to Friday, 8:30 AM to 5:00 PM",
    accent: "var(--color-accent)",
    tint: "#fff4e8",
  },
  {
    icon: MessageCircle,
    title: "Direct Enquiries",
    text: "Use the form below for a reply.",
    accent: "var(--color-gold)",
    tint: "#fbf4e4",
  },
];

const audiencePills = [
  "Partnerships",
  "Programs",
  "Volunteering",
  "Media",
];

export default function ContactPage() {
  return (
    <>
      <section
        className="section-panel surface-hero relative overflow-hidden"
        aria-label="Contact WHI-SL hero"
      >
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(37,116,86,0.16),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(242,167,53,0.18),transparent_32%)]"
          aria-hidden="true"
        />
        <div className="relative container-wide py-14 md:py-16 lg:py-20">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <AnimatedSection direction="left">
              <div className="relative overflow-hidden rounded-[2.4rem] border border-white/18 bg-[rgba(255,255,255,0.88)] px-6 py-7 shadow-[0_20px_70px_rgba(14,24,20,0.12)] backdrop-blur-[3px] md:px-8 md:py-9">
                <div
                  className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[var(--color-gold)]/18 blur-3xl"
                  aria-hidden="true"
                />
                <div
                  className="absolute -bottom-10 left-6 h-24 w-24 rounded-[2rem] bg-[var(--color-accent)]/12 blur-2xl"
                  aria-hidden="true"
                />
                <div className="relative max-w-xl">
                  <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-white px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.24em] text-[var(--color-primary)] shadow-[0_10px_24px_rgba(14,24,20,0.04)]">
                    <span className="h-2 w-2 rounded-full bg-[var(--color-accent)]" aria-hidden="true" />
                    <span>Get in Touch</span>
                  </div>

                  <h1 className="mt-5 text-balance text-4xl font-black leading-[0.95] tracking-tight text-[var(--color-text)] md:text-5xl lg:text-6xl">
                    Contact WHI-SL
                  </h1>

                  <p className="mt-5 max-w-lg text-base leading-relaxed text-[var(--color-text-muted)] md:text-lg">
                    Reach out for partnerships, programs, volunteering, or general information.
                  </p>

                  <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
                    {contactPoints.map((point, index) => {
                      const Icon = point.icon;

                      return (
                        <AnimatedSection key={point.title} delay={index * 60}>
                          <div
                            className="rounded-[1.5rem] border border-[var(--color-border)] bg-white p-4 shadow-[0_12px_30px_rgba(14,24,20,0.05)]"
                            style={{ backgroundColor: point.tint }}
                          >
                            <div
                              className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white shadow-[0_10px_24px_rgba(14,24,20,0.06)]"
                              style={{
                                color: point.accent,
                                border: `1px solid ${point.accent}22`,
                              }}
                            >
                              <Icon size={18} strokeWidth={2} />
                            </div>
                            <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--color-text-light)]">
                              {point.title}
                            </p>
                            <p className="mt-2 text-sm leading-relaxed text-[var(--color-text)]">
                              {point.text}
                            </p>
                          </div>
                        </AnimatedSection>
                      );
                    })}
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <div className="relative lg:pl-4">
                <div
                  className="absolute -left-6 top-10 h-28 w-28 rounded-[2rem] bg-[var(--color-primary)]/10 blur-3xl"
                  aria-hidden="true"
                />
                <div
                  className="absolute -right-4 bottom-8 h-24 w-24 rounded-full bg-[var(--color-gold)]/12 blur-2xl"
                  aria-hidden="true"
                />
                <div className="relative overflow-hidden rounded-[2.5rem] border border-[var(--color-border)] bg-white shadow-[0_26px_84px_rgba(14,24,20,0.14)]">
                  <div className="relative aspect-[16/11]">
                    <Image
                      src="/images/whi-photo-gallery/image2.jpg"
                      alt="WHI-SL team gathered at an event in Sierra Leone"
                      fill
                      priority
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 52vw"
                    />
                  </div>
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-black/24 via-transparent to-white/8"
                    aria-hidden="true"
                  />
                  <div className="absolute bottom-5 left-5 rounded-full border border-white/18 bg-black/22 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.24em] text-white/86 backdrop-blur-sm">
                    Bo City, Sierra Leone
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {audiencePills.map((pill) => (
                    <span
                      key={pill}
                      className="inline-flex items-center rounded-full border border-[var(--color-border)] bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-text-light)] shadow-[0_10px_24px_rgba(14,24,20,0.04)]"
                    >
                      {pill}
                    </span>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="section-padding surface-white">
        <div className="container-wide">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.04fr_0.96fr] lg:items-start">
            <AnimatedSection direction="left">
              <div className="rounded-[2.25rem] border border-[var(--color-border)] bg-white p-6 shadow-[0_20px_60px_rgba(14,24,20,0.08)] md:p-8">
                <div className="mb-6">
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--color-primary)]">
                    Send a Message
                  </p>
                  <h2 className="mt-3 text-3xl font-black leading-[0.95] tracking-tight text-[var(--color-text)] md:text-4xl">
                    A short message is enough.
                  </h2>
                  <p className="mt-3 max-w-xl text-sm leading-relaxed text-[var(--color-text-muted)] md:text-base">
                    Tell us what you need and how you would like us to follow up.
                  </p>
                </div>
                <ContactForm />
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <div className="space-y-4">
                <SupportCard
                  icon={Users}
                  title="Best for"
                  accent="var(--color-primary)"
                  tint="#eef7f2"
                  items={[
                    "Partnership and donor enquiries",
                    "Program and research collaboration",
                    "Volunteer and internship questions",
                    "Media or general information requests",
                  ]}
                />
                <SupportCard
                  icon={MapPin}
                  title="Visit"
                  accent="var(--color-accent)"
                  tint="#fff4e8"
                  items={["Bo City", "Bo District", "Sierra Leone"]}
                />
                <SupportCard
                  icon={Clock}
                  title="Open"
                  accent="var(--color-gold)"
                  tint="#fbf4e4"
                  items={["Monday to Friday", "8:30 AM to 5:00 PM"]}
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  );
}

function SupportCard({
  icon: Icon,
  title,
  accent,
  tint,
  items,
}: {
  icon: typeof MapPin;
  title: string;
  accent: string;
  tint: string;
  items: string[];
}) {
  return (
    <div
      className="overflow-hidden rounded-[2rem] border border-[var(--color-border)] bg-white p-6 shadow-[0_16px_50px_rgba(14,24,20,0.06)]"
      style={{ backgroundColor: tint }}
    >
      <div className="flex items-start justify-between gap-4">
        <div
          className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-[0_10px_24px_rgba(14,24,20,0.06)]"
          style={{ color: accent, border: `1px solid ${accent}22` }}
        >
          <Icon size={20} strokeWidth={2} />
        </div>
        <p className="text-4xl font-black leading-none tracking-tight text-[var(--color-text)]/10">
          {String(items.length).padStart(2, "0")}
        </p>
      </div>

      <p className="mt-5 text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--color-text-light)]">
        {title}
      </p>
      <div className="mt-4 space-y-2">
        {items.map((item) => (
          <p key={item} className="text-sm leading-relaxed text-[var(--color-text)]">
            {item}
          </p>
        ))}
      </div>
    </div>
  );
}
