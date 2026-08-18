import type { Metadata } from "next";
import { getProgramBySlug } from "@/data/programs";
import ProgramPageContent from "@/components/sections/ProgramPageContent";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Health Research Program",
  description: "WHI-SL's Health Research Program generates evidence and knowledge to drive effective community health interventions in Sierra Leone.",
};

export default function HealthResearchPage() {
  const program = getProgramBySlug("health-research");
  if (!program) notFound();
  return <ProgramPageContent program={program} />;
}
