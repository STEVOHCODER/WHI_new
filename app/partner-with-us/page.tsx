import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/sections/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedSection from "@/components/ui/AnimatedSection";
import PartnershipForm from "@/components/forms/PartnershipForm";
import {
  communityOutreach,
  healthAdvocacy,
  launchCrowd,
  officeAdmin,
  officeDesk,
  officeRoom,
  outreachSpeaker,
  sportMatch,
  sports1,
  sports2,
  sports3,
  teamBanner,
  teamImage,
} from "@/data/photo-assets";

export const metadata: Metadata = {
  title: "Partner With Us",
  description:
    "Partner with WHI-SL through government, health, education, law-enforcement, transport, media, and international collaboration.",
};

const galleryPhotos = [
  {
    src: launchCrowd,
    alt: "WHI-SL community crowd at the Entertain for Health Project launch",
    title: "Project Launch Crowd",
    text: "A lively community gathering showing the launch energy behind WHI-SL's outreach work.",
    frameClass: "aspect-[16/10]",
  },
  {
    src: teamBanner,
    alt: "WHI-SL participants gathered for a shared launch moment",
    title: "Launch Group Photo",
    text: "Staff and participants gather together to mark the event and show shared commitment.",
    frameClass: "aspect-[4/5]",
  },
  {
    src: teamImage,
    alt: "WHI-SL team photo",
    title: "WHI-SL Team",
    text: "The organisation's team, presented cleanly as a strong institutional portrait.",
    frameClass: "aspect-[16/10]",
  },
  {
    src: sports1,
    alt: "WHI-SL sports team photo",
    title: "Sports Team",
    text: "Sport is part of the organisation's community-engagement approach and youth connection strategy.",
    frameClass: "aspect-[16/10]",
  },
  {
    src: sports2,
    alt: "WHI-SL football match on a community ground",
    title: "Community Match",
    text: "A match day image that shows how WHI-SL uses sport to bring people together in public spaces.",
    frameClass: "aspect-[4/5]",
  },
  {
    src: sports3,
    alt: "Young girl celebrating a tournament win",
    title: "Youth Victory",
    text: "Celebration and confidence are part of the story when young people are encouraged through sport.",
    frameClass: "aspect-[4/5]",
  },
  {
    src: healthAdvocacy,
    alt: "WHI-SL health advocacy and community sensitisation moment",
    title: "Health Advocacy",
    text: "Street-level advocacy extends WHI-SL's message to people in their everyday environments.",
    frameClass: "aspect-[4/5]",
  },
  {
    src: communityOutreach,
    alt: "WHI-SL community outreach session in a market setting",
    title: "Community Outreach",
    text: "Direct outreach helps the organisation meet people where they already gather and talk.",
    frameClass: "aspect-[16/10]",
  },
  {
    src: outreachSpeaker,
    alt: "Community speaker addressing residents during outreach",
    title: "Community Speaker",
    text: "A speaker and crowd moment that shows how WHI-SL keeps information public, local, and conversational.",
    frameClass: "aspect-[4/5]",
  },
  {
    src: sportMatch,
    alt: "Community sports activity used for engagement",
    title: "Sports and Dialogue",
    text: "Sports moments often become community dialogue moments for WHI-SL.",
    frameClass: "aspect-[16/10]",
  },
  {
    src: officeAdmin,
    alt: "WHI-SL staff handling administrative work and documentation",
    title: "Office Administration",
    text: "Behind the scenes, the team documents, plans, and keeps the work organised.",
    frameClass: "aspect-[4/5]",
  },
  {
    src: officeDesk,
    alt: "WHI-SL staff member at a desk working with documents and a laptop",
    title: "Planning Desk",
    text: "A planning desk scene that shows the quieter operational side of the organisation.",
    frameClass: "aspect-[4/5]",
  },
  {
    src: officeRoom,
    alt: "Indoor planning room with equipment and a staff member at work",
    title: "Meeting Room",
    text: "A working room and equipment setup that highlights coordination and administration.",
    frameClass: "aspect-[16/10]",
  },
] as const;

export default function PartnerWithUsPage() {
  return (
    <>
      <PageHero
        image={launchCrowd}
        imageAlt="WHI-SL community crowd at the launch event"
        eyebrow="Partnerships"
        title="Partner With Us"
        subtitle="Build a partnership that strengthens health, rights, and opportunity for communities in Sierra Leone."
      />

      <section className="section-padding surface-sand section-panel">
        <div className="container-wide">
          <AnimatedSection>
            <SectionHeading
              eyebrow="Photo Gallery"
              title="The launch moments shown in the document"
              subtitle="These photos come directly from the attached WHI-SL gallery and capture the team, partners, outreach, sport, and advocacy moments around the launch."
            />
          </AnimatedSection>

          <div className="mt-12 columns-1 gap-5 md:columns-2 xl:columns-3">
            {galleryPhotos.map((photo, index) => (
              <AnimatedSection key={photo.title} delay={index * 45} className="mb-5 break-inside-avoid">
                <article className="group overflow-hidden rounded-[2rem] border border-[var(--color-border)] bg-white shadow-[0_16px_50px_rgba(14,24,20,0.08)]">
                  <div className={`relative overflow-hidden ${photo.frameClass}`}>
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent"
                      aria-hidden="true"
                    />
                    <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/70">
                        From the gallery
                      </p>
                      <h3 className="mt-2 text-lg font-bold leading-tight">{photo.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-white/80">{photo.text}</p>
                    </div>
                  </div>
                </article>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding surface-white">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <AnimatedSection>
              <SectionHeading
                eyebrow="Inquiry"
                title="Start a partnership conversation"
                subtitle="Tell us about your organisation and the type of collaboration you are interested in."
                align="left"
              />
            </AnimatedSection>
            <AnimatedSection>
              <div className="rounded-[1.75rem] border border-[var(--color-border)] bg-white p-8 shadow-[0_16px_50px_rgba(14,24,20,0.06)]">
                <PartnershipForm />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  );
}
