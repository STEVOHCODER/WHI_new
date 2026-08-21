import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import BlogSection from "@/components/sections/BlogSection";
import { launchCrowd } from "@/data/photo-assets";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "A visual gallery of WHI launches, outreach moments, team scenes, and behind-the-scenes work.",
};

export default function BlogPage() {
  return (
    <>
      <PageHero
        image={launchCrowd}
        imageAlt="WHI-SL community crowd at the launch event"
        eyebrow="Gallery"
        title="Gallery & Updates"
        subtitle="A visual journal of the organisation's activities, people, and community moments."
      />

      <BlogSection />
    </>
  );
}
