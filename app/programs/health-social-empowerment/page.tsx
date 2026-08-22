import type { Metadata } from "next";
import { getProgramBySlug } from "@/data/programs";
import ProgramPageContent from "@/components/sections/ProgramPageContent";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Health & Social Empowerment Program",
  description: "WHI-SL's Health and Social Empowerment Program addresses public health, reproductive health, mental health, water and sanitation, and community development in Sierra Leone.",
};

export default function HealthSocialPage() {
  const program = getProgramBySlug("health-social-empowerment");
  if (!program) notFound();
  return <ProgramPageContent program={program} />;
}
