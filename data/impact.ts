import type { ImpactStat, Story } from "@/types";
import {
  communityOutreach,
  healthAdvocacy,
  sportMatch,
} from "@/data/photo-assets";

export const impactStats: ImpactStat[] = [
  {
    value: "2010",
    label: "Founded",
    description: "Established in Bo City, Sierra Leone",
  },
  {
    value: "15",
    label: "Staff Members",
    description: "Dedicated professionals across our programs",
  },
  {
    value: "25",
    label: "Active Volunteers",
    description: "Community members driving change",
  },
  {
    value: "4",
    label: "Core Programs",
    description: "Addressing health, gender, rights, and research",
  },
  {
    value: "35",
    label: "General Assembly",
    description: "Members governing the organisation",
  },
];

export const featuredStories: Story[] = [
  {
    id: "story-1",
    title: "Health education with young people and adolescents",
    excerpt:
      "WHI-SL uses outreach sessions, clubs, and teaching moments to help young people ask better questions about sexual and reproductive health, prevention, and wellbeing.",
    program: "Health & Social Empowerment",
    programSlug: "health-social-empowerment",
    image: communityOutreach,
    imageAlt: "WHI-SL community outreach session with residents in Bo District",
    date: "2010-01-01",
  },
  {
    id: "story-2",
    title: "Women and girls building confidence together",
    excerpt:
      "The Gender Empowerment Program creates space for women and girls to share experiences, strengthen practical skills, and speak with more confidence in their homes and communities.",
    program: "Gender Empowerment",
    programSlug: "gender-empowerment",
    image: healthAdvocacy,
    imageAlt: "WHI-SL health advocacy and community sensitisation scene",
    date: "2018-01-01",
  },
  {
    id: "story-3",
    title: "Rights education that reaches vulnerable groups",
    excerpt:
      "WHI-SL works with community leaders and residents to make rights education practical, local, and useful for vulnerable groups such as street children, people with disabilities, and survivors of trafficking.",
    program: "Human Rights",
    programSlug: "human-rights",
    image: sportMatch,
    imageAlt: "Community sports activity used to gather people for awareness work",
    date: "2020-01-01",
  },
];
