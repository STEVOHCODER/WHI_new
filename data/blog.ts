import type { StaticImageData } from "next/image";
import {
  communityOutreach,
  healthAdvocacy,
  launchCrowd,
  officeAdmin,
  officeDesk,
  sportMatch,
  teamBanner,
} from "@/data/photo-assets";

export interface BlogPost {
  title: string;
  excerpt: string;
  category: string;
  image: StaticImageData;
  imageAlt: string;
  frameClass: string;
}

export const blogPosts: BlogPost[] = [
  {
    title: "Launch day energy in Bo City",
    excerpt:
      "The organisation launches its work with people at the center, turning a community gathering into shared momentum.",
    category: "Launches",
    image: launchCrowd,
    imageAlt: "WHI-SL community crowd at the Entertain for Health Project launch",
    frameClass: "aspect-[16/10]",
  },
  {
    title: "Community outreach in familiar spaces",
    excerpt:
      "Street and market outreach helps WHI-SL meet people where conversations are already happening.",
    category: "Outreach",
    image: communityOutreach,
    imageAlt: "WHI-SL community outreach session in a market setting",
    frameClass: "aspect-[16/10]",
  },
  {
    title: "Health advocacy in public view",
    excerpt:
      "Sensitisation work becomes visible, local, and practical when it is carried into everyday community spaces.",
    category: "Health",
    image: healthAdvocacy,
    imageAlt: "WHI-SL health advocacy and community sensitisation moment",
    frameClass: "aspect-[4/5]",
  },
  {
    title: "Sport as a bridge to conversation",
    excerpt:
      "Matches and tournaments create a relaxed space for confidence-building, learning, and connection.",
    category: "Sport",
    image: sportMatch,
    imageAlt: "Community sports activity used for engagement",
    frameClass: "aspect-[16/10]",
  },
  {
    title: "Planning behind the scenes",
    excerpt:
      "The office side of the organisation captures documentation, scheduling, and the quiet work that keeps projects moving.",
    category: "Operations",
    image: officeDesk,
    imageAlt: "WHI-SL staff member at a desk working with documents and a laptop",
    frameClass: "aspect-[4/5]",
  },
  {
    title: "A shared launch portrait",
    excerpt:
      "The launch group photo gives the story a human face and shows how collective effort shapes WHI-SL's work.",
    category: "Launches",
    image: teamBanner,
    imageAlt: "WHI-SL participants gathered for a shared launch moment",
    frameClass: "aspect-[4/5]",
  },
  {
    title: "Organised support behind the scenes",
    excerpt:
      "Administrative follow-up and documentation help the organisation turn activity into consistent, reliable service.",
    category: "Administration",
    image: officeAdmin,
    imageAlt: "WHI-SL staff handling administrative work and documentation",
    frameClass: "aspect-[4/5]",
  },
];
