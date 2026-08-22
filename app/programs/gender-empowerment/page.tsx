import type { Metadata } from "next";
import { getProgramBySlug } from "@/data/programs";
import ProgramPageContent from "@/components/sections/ProgramPageContent";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Gender Empowerment Program",
  description: "WHI-SL's Gender Empowerment Program supports women and girls through advocacy, survivor support, economic empowerment and gender equality work in Sierra Leone.",
};

export default function GenderPage() {
  const program = getProgramBySlug("gender-empowerment");
  if (!program) notFound();
  return <ProgramPageContent program={program} />;
}
