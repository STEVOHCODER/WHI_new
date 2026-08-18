import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/sections/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedSection from "@/components/ui/AnimatedSection";
import CTASection from "@/components/sections/CTASection";
import { programs } from "@/data/programs";
import { ArrowRight } from "@/components/ui/icons";
import { sportMatch } from "@/data/photo-assets";

export const metadata: Metadata = {
  title: "Our Programs",
  description:
    "Explore WHI-SL's four core programs: Health and Social Empowerment, Gender Empowerment, Human Rights, and Health Research.",
};

export default function ProgramsPage() {
  return (
    <>
      <PageHero
        image={sportMatch}
        imageAlt="WHI-SL sports-based community engagement activity"
        eyebrow="What We Do"
        title="Our Programs"
        subtitle="Four interconnected programs working together to build healthier, more equitable communities in Sierra Leone."
      />

      <section className="section-padding surface-white">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {programs.map((program, i) => (
              <AnimatedSection key={program.id} delay={i * 100}>
                <Link
                  href={`/programs/${program.slug}`}
                  className="group block rounded-2xl overflow-hidden bg-white border border-[var(--color-border)] hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="relative h-64 overflow-hidden img-reveal">
                    <Image
                      src={program.image}
                      alt={program.imageAlt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width:768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <span
                        className="px-3 py-1 rounded-full text-xs font-semibold text-white"
                        style={{ backgroundColor: program.color }}
                      >
                        {program.shortLabel}
                      </span>
                    </div>
                  </div>
                  <div className="p-7">
                    <h2 className="text-xl font-black text-[var(--color-text)] mb-2 group-hover:text-[var(--color-primary)] transition-colors">
                      {program.fullName}
                    </h2>
                    <p className="text-sm text-[var(--color-text-muted)] leading-relaxed mb-5">
                      {program.tagline}
                    </p>
                    <div className="flex items-center gap-2 text-sm font-semibold text-[var(--color-primary)] group-hover:gap-4 transition-all">
                      <span>Explore Program</span>
                      <ArrowRight size={14} />
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding surface-sand section-panel">
        <div className="container-wide">
          <AnimatedSection>
            <SectionHeading
              eyebrow="Our Approach"
              title="How the programs reinforce one another"
              subtitle="Our four programs are designed to work as one system. Evidence informs health work, gender empowerment strengthens rights advocacy, and rights-based practice improves the quality of everything we deliver."
              align="center"
            />
          </AnimatedSection>
          <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-4">
            {programs.map((program, i) => (
              <AnimatedSection key={program.id} delay={i * 80}>
                <div
                  className="rounded-xl p-6 text-center"
                  style={{
                    backgroundColor: `${program.color}15`,
                    border: `1px solid ${program.color}30`,
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-full mx-auto mb-3 flex items-center justify-center text-white text-xs font-bold"
                    style={{ backgroundColor: program.color }}
                  >
                    {i + 1}
                  </div>
                  <p className="text-sm font-bold text-[var(--color-text)] leading-tight">
                    {program.shortLabel}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Want to support our programs?"
        subtitle="Partner with us or contact our team to learn how you can contribute to healthier communities in Sierra Leone."
        primaryCta={{ label: "Partner With Us", href: "/partner-with-us" }}
        secondaryCta={{ label: "Contact Us", href: "/contact" }}
        dark
      />
    </>
  );
}
