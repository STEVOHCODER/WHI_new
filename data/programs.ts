import type { Program } from "@/types";
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
  teamBanner,
} from "@/data/photo-assets";

export const programs: Program[] = [
  {
    id: "health-social",
    slug: "health-social-empowerment",
    shortLabel: "Health & Social Empowerment",
    fullName: "Health and Social Empowerment Program",
    tagline: "Using health education, outreach, and innovation to support vulnerable communities.",
    description:
      "The Health and Social Empowerment Program helps vulnerable young people, women, girls, and other community members make informed choices. WHI-SL uses health education, community mobilisation, screening, counselling, and practical support to address the social determinants of health and build sustainable development from the ground up.",
    challenge:
      "Communities in Sierra Leone continue to face unsafe sexual practices, alcoholism and drug abuse, mental health challenges, unwanted pregnancies, youth unemployment, poverty, and limited access to reproductive health services and basic public-health support.",
    focusAreas: [
      "Sexual and reproductive health education",
      "Mental health awareness and screening",
      "Community public-health screening, testing, and treatment support",
      "Water, hygiene, and sanitation",
      "Rural and city development",
      "Biodiversity and conservation",
      "Community literacy and education",
      "Science and technology promotion",
      "Micro-project creation and small business planning",
      "Youth talent development",
    ],
    activities: [
      "Capacity-building trainings, workshops, and debates",
      "Teaching sessions, clubs, and mobilisation campaigns",
      "Screening, counselling, and outreach services",
      "Health support services in the community",
      "Technical and material support for local initiatives",
      "Competitions, sensitisation, and youth talent development activities",
    ],
    outcomes: [
      "Reduced deaths from preventable public-health diseases",
      "Reduced HIV/AIDS transmission rates",
      "Improved sexual and reproductive health services",
      "Improved disease-prevention knowledge and practice",
    ],
    image: communityOutreach,
    imageAlt:
      "WHI-SL community outreach session in a market setting",
    challengeImage: sports1,
    challengeImageAlt:
      "WHI-SL sports activity used for community health messaging",
    storyImage: launchCrowd,
    storyImageAlt:
      "WHI-SL outreach crowd during a community health event",
    color: "#1a6b4a",
  },
  {
    id: "gender",
    slug: "gender-empowerment",
    shortLabel: "Gender Empowerment",
    fullName: "Gender Empowerment Program",
    tagline: "Supporting women and girls through advocacy, safety, and economic opportunity.",
    description:
      "The Gender Empowerment Program supports women and girls to live safer, healthier, and more self-determined lives. WHI-SL delivers awareness campaigns, advocacy, survivor support, family conflict resolution, and economic empowerment activities that strengthen communities over time.",
    challenge:
      "Gender-based violence, domestic violence, social discrimination, and economic exclusion continue to limit the health, safety, and potential of women and girls in Sierra Leone. Survivors often have limited access to support, justice, or recovery pathways.",
    focusAreas: [
      "Gender awareness and education",
      "Advocacy against domestic and gender-based violence",
      "Gender and family conflict resolution",
      "Support for survivors of gender-based violence",
      "Women's empowerment and leadership",
      "Economic development for women and girls",
    ],
    activities: [
      "Community gender-awareness campaigns",
      "Survivor support groups and safe spaces",
      "Advocacy and policy engagement",
      "Women's economic skills and enterprise training",
      "Conflict mediation and family support",
      "Youth gender education in schools",
    ],
    outcomes: [
      "Improved health and wellbeing of women and girls",
      "Greater economic independence for women",
      "Respected gender equality within communities",
      "Reduced incidents of gender-based violence",
    ],
    image: healthAdvocacy,
    imageAlt: "WHI-SL health advocacy and community sensitisation moment",
    challengeImage: outreachSpeaker,
    challengeImageAlt:
      "Community speaker addressing residents during outreach",
    storyImage: teamBanner,
    storyImageAlt:
      "WHI-SL participants gathered in a group moment",
    color: "#7b3f91",
  },
  {
    id: "human-rights",
    slug: "human-rights",
    shortLabel: "Human Rights",
    fullName: "Human Rights Program",
    tagline: "Advocating for justice, dignity, peace, and equal rights for all.",
    description:
      "The Human Rights Program promotes the rights of Sierra Leone's most marginalised populations through policy implementation support, advocacy, conflict resolution, and peacebuilding. WHI-SL works to ensure that vulnerable communities are protected, heard, and supported in claiming their rights.",
    challenge:
      "Vulnerable populations in Sierra Leone, including street children, people with disabilities, sex workers, widows and widowers, and survivors of trafficking, often experience exclusion from legal protection and social support. Weak policy implementation and limited awareness leave many without recourse.",
    focusAreas: [
      "Policy implementation support and monitoring",
      "Human rights advocacy",
      "Gender and social advocacy",
      "Conflict resolution and peacebuilding",
      "Human rights education for vulnerable populations",
      "Reduction of human trafficking",
      "Reduction of human rights violations",
    ],
    activities: [
      "Community-level human rights education",
      "Advocacy campaigns and stakeholder engagement",
      "Conflict mediation and community dialogue",
      "Policy monitoring and reporting",
      "Partnerships with legal aid organisations",
      "Anti-trafficking awareness programmes",
    ],
    outcomes: [
      "Improved human rights awareness among vulnerable groups",
      "Reduced human rights violations",
      "Reduced human trafficking and deaths due to rights violations",
      "Improved human-rights services in Sierra Leone",
    ],
    image: launchCrowd,
    imageAlt: "WHI-SL community crowd at an awareness event",
    challengeImage: sportMatch,
    challengeImageAlt:
      "Sports match used as a platform for community engagement",
    storyImage: outreachSpeaker,
    storyImageAlt:
      "A speaker addressing community members during an outreach session",
    color: "#c0392b",
  },
  {
    id: "health-research",
    slug: "health-research",
    shortLabel: "Health Research",
    fullName: "Health Research Program",
    tagline: "Using surveys, evaluations, and studies to support evidence-based action.",
    description:
      "The Health Research Program generates the knowledge and evidence that drives WHI-SL's work. Through surveys, evaluations, health studies, and research partnerships, we build the evidence base for locally relevant health interventions in Sierra Leone.",
    challenge:
      "Without reliable local health data, communities and organisations cannot design interventions that truly meet people's needs. Sierra Leone still has a gap in community-level health research, which limits evidence-based decision-making.",
    focusAreas: [
      "Community health surveys and needs assessments",
      "Programme evaluation and learning",
      "Health studies and epidemiological research",
      "Evidence-based health innovation",
      "Research partnerships with academic and development institutions",
    ],
    activities: [
      "Community health surveys and data collection",
      "Programme monitoring and evaluation",
      "Collaboration with research institutions",
      "Publication and dissemination of findings",
      "Evidence briefs and policy recommendations",
    ],
    outcomes: [
      "Stronger evidence base for community health programming",
      "Improved programme effectiveness through evaluation",
      "Contributions to national and regional health knowledge",
      "Informed policy and decision-making processes",
    ],
    image: officeAdmin,
    imageAlt: "WHI-SL staff handling administrative work and documentation",
    challengeImage: officeRoom,
    challengeImageAlt:
      "Indoor meeting and equipment space used for planning",
    storyImage: officeDesk,
    storyImageAlt:
      "WHI-SL staff member at a desk working with documents and a laptop",
    color: "#1a5276",
  },
];

export function getProgramBySlug(slug: string): Program | undefined {
  return programs.find((program) => program.slug === slug);
}
