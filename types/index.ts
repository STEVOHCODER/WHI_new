import type { StaticImageData } from "next/image";

export interface NavigationItem {
  label: string;
  href: string;
  children?: NavigationItem[];
}

export interface Program {
  id: string;
  slug: string;
  shortLabel: string;
  fullName: string;
  tagline: string;
  description: string;
  challenge: string;
  focusAreas: string[];
  activities: string[];
  outcomes: string[];
  image: string | StaticImageData;
  imageAlt: string;
  challengeImage: string | StaticImageData;
  challengeImageAlt: string;
  storyImage: string | StaticImageData;
  storyImageAlt: string;
  color: string;
}

export interface ImpactStat {
  value: string;
  label: string;
  description?: string;
}

export interface TeamMember {
  id: string;
  name: string | null;
  role: string;
  department: string;
  bio?: string;
  image?: string;
}

export interface Partner {
  id: string;
  name: string;
  category: string;
  logoUrl?: string;
  website?: string;
}

export interface Story {
  id: string;
  title: string;
  excerpt: string;
  program: string;
  programSlug: string;
  image: string | StaticImageData;
  imageAlt: string;
  date: string;
  isPlaceholder?: boolean;
}

export interface Vacancy {
  id: string;
  title: string;
  department: string;
  location: string;
  type: "Full-time" | "Part-time" | "Volunteer" | "Internship" | "Contract";
  deadline: string;
  href?: string;
}

export interface Value {
  id: string;
  label: string;
  description: string;
  icon: string;
}

export interface ApproachItem {
  id: string;
  label: string;
  icon: string;
  description: string;
}

export interface TargetGroup {
  id: string;
  label: string;
  image: string;
  imageAlt: string;
}
