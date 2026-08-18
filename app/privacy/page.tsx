import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionHeading from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy notice for the WHI-SL website.",
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        image="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1400&q=80"
        imageAlt="Privacy and document handling"
        eyebrow="Legal"
        title="Privacy Policy"
        subtitle="A short privacy notice for how WHI-SL handles website enquiries and future updates."
      />

      <section className="section-padding surface-white">
        <div className="container-wide max-w-4xl mx-auto">
          <AnimatedSection>
            <SectionHeading
              eyebrow="Summary"
              title="What we collect"
              subtitle="At the moment, this website only collects information you enter into the contact and partnership forms. Those forms are designed to capture enquiries for follow-up when a live submission workflow is connected."
              align="center"
            />
          </AnimatedSection>

          <div className="mt-10 space-y-5 rounded-[1.75rem] border border-[var(--color-border)] bg-white p-8 text-sm leading-relaxed text-[var(--color-text-muted)] shadow-[0_16px_50px_rgba(14,24,20,0.06)]">
            <p>
              We do not currently publish analytics, tracking, or third-party advertising tools on this site.
            </p>
            <p>
              If WHI-SL adds a live backend, inbox service, or analytics platform later, this notice should be updated to explain what is collected, why it is collected, how long it is kept, and who can access it.
            </p>
            <p>
              For now, the website is intentionally simple and focused on sharing WHI-SL&apos;s programs, impact, and contact routes.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
