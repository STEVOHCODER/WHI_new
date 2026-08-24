import type { ImpactStat, Story } from "@/types";
import {
  communityOutreach,
  healthAdvocacy,
  sportMatch,
} from "@/data/photo-assets";

export interface ProjectAchievement {
  value: string;
  label: string;
  title: string;
  description: string;
  accent: string;
}

export const impactStats: ImpactStat[] = [
  {
    value: "2010",
    label: "Founded",
    description: "Established in Bo City, Sierra Leone",
  },
  {
    value: "15",
    label: "Staff Members",
    description: "Experienced staff working across the organisation",
  },
  {
    value: "25",
    label: "Active Volunteers",
    description: "Community members supporting the work",
  },
  {
    value: "4",
    label: "Core Programs",
    description: "Health, gender, rights, and research",
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
    title: "Sports and entertainment for public health change",
    excerpt:
      "WHI-SL uses sports and entertainments as innovative approaches to address public health and social issues in communities.",
    program: "Health & Social Empowerment",
    programSlug: "health-social-empowerment",
    image: healthAdvocacy,
    imageAlt: "WHI-SL health advocacy and community sensitisation scene",
    date: "2010-01-01",
  },
  {
    id: "story-2",
    title: "Women and girls strengthening their voice",
    excerpt:
      "The Gender Empowerment Program promotes awareness, advocacy, conflict resolution, and economic development for women and girls.",
    program: "Gender Empowerment",
    programSlug: "gender-empowerment",
    image: communityOutreach,
    imageAlt: "WHI-SL community outreach session with residents in Bo District",
    date: "2018-01-01",
  },
  {
    id: "story-3",
    title: "Rights education for vulnerable people",
    excerpt:
      "WHI-SL works with vulnerable groups to promote human rights, peace, policy implementation, and awareness of trafficking and violations.",
    program: "Human Rights",
    programSlug: "human-rights",
    image: sportMatch,
    imageAlt: "Community sports activity used to gather people for awareness work",
    date: "2020-01-01",
  },
];

export const projectAchievements: ProjectAchievement[] = [
  {
    value: "50",
    label: "Peer Educators Trained",
    title: "Young peer educators led the outreach",
    description:
      "A total of 50 young community peer educators were trained and helped deliver community-based mental health screening, counselling, and referrals across Bo District.",
    accent: "#a83a62",
  },
  {
    value: "50%",
    label: "Knowledge Gain",
    title: "Knowledge and skills improved",
    description:
      "Young people showed an estimated 50% improvement in mental health knowledge and skills, supported by monthly sports and entertainment competitions in public spaces and playgrounds.",
    accent: "#d46c23",
  },
  {
    value: "Monthly",
    label: "Screening Sessions",
    title: "Regular screening and referrals",
    description:
      "Monthly mental health and substance-use screening sessions helped identify young people needing additional support and refer them to nearby health facilities or rehabilitation centers.",
    accent: "#1d7ac6",
  },
  {
    value: "Reduced",
    label: "Stigma & Harm",
    title: "Stigma and harmful substance use declined",
    description:
      "Through individual and group counselling, psychosocial support, and community engagement, young people demonstrated improved attitudes toward mental health and substance-use prevention.",
    accent: "#d7a32b",
  },
  {
    value: "Improved",
    label: "Well-being",
    title: "Mental health and help-seeking improved",
    description:
      "The project contributed to better mental health, psychosocial well-being, awareness, and help-seeking behaviour among young people in Bo District.",
    accent: "#257456",
  },
];
