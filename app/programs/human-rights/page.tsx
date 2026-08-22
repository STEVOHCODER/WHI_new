import type { Metadata } from "next";
import { getProgramBySlug } from "@/data/programs";
import ProgramPageContent from "@/components/sections/ProgramPageContent";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Human Rights Program",
  description: "WHI-SL's Human Rights Program advocates for justice, peace, and the rights of marginalised populations in Sierra Leone.",
};

export default function HumanRightsPage() {
  const program = getProgramBySlug("human-rights");
  if (!program) notFound();
  return <ProgramPageContent program={program} />;
}
