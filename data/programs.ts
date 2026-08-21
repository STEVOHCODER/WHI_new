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
    tagline: "Using sports, entertainments, and community services to improve public health and social wellbeing.",
    description:
      "The Health and Social Empowerment Program helps vulnerable young people and adolescents make smart choices for sustainable development. WHI-SL uses health education, outreach, screening, counselling, and practical support to address public health and social issues in Sierra Leone.",
    challenge:
      "Unsafe sexual practices, alcoholism, drug abuse, mental health challenges, unwanted pregnancies, youth unemployment, and poverty continue to affect vulnerable young people, women, girls, and men in Bo District and beyond.",
    focusAreas: [
      "Sexual reproductive health education",
      "Mental health awareness, screening, and services",
      "Public health screening, testing, and treatment services at the community level",
      "Water, hygiene, and sanitation",
      "Rural and city development",
      "Biodiversity and conservation",
      "Fight against illiteracy in community",
      "Promotion of sciences and technology in Sierra Leone",
      "Micro projects creation",
      "Project small business planning and education",
      "Promotion of youth talents for development",
      "Other related activities",
    ],
    activities: [
      "Organization of capacity building trainings",
      "Organization of workshops, debates",
      "Organization of teaching sessions",
      "Organization of mobilisation campaigns",
      "Creation of clubs",
      "Screening services",
      "Organization of competitions",
      "Counselling services",
      "Outreach services",
      "Health support services",
      "Material and technical support",
      "Sensitizations and other related activities",
    ],
    outcomes: [
      "Reduced death due to public health diseases",
      "Reduced transmission of HIV/AIDS",
      "Improved services for sexual reproductive health",
      "Improved services for diseases prevention",
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
    tagline: "Supporting women and girls through awareness, safety, and economic development.",
    description:
      "The Gender Empowerment Program supports women and girls to live safer, healthier, and more self-determined lives. WHI-SL delivers awareness campaigns, advocacy, survivor support, family conflict resolution, and economic development activities that strengthen communities over time.",
    challenge:
      "Gender-based violence, domestic violence, social discrimination, and economic exclusion continue to limit the health, safety, and potential of women and girls in Sierra Leone.",
    focusAreas: [
      "Awareness of the community on gender",
      "Advocacy for abolition of domestic violence and gender-based violence",
      "Gender and family conflict resolution",
      "Support of victim of gender-based violence",
      "Women empowerment",
      "Economical development for women and girls",
    ],
    activities: [
      "Organization of capacity building trainings",
      "Organization of workshops, debates",
      "Material and technical support",
      "Community gender awareness campaigns",
      "Advocacy and policy engagement",
      "Conflict mediation and family support",
    ],
    outcomes: [
      "Improved health of women and girls in Sierra Leone",
      "Empowered women and girls in the community",
      "Respected gender equality in the community",
      "Reduced gender-based violence at the community level in Sierra Leone",
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
      "Vulnerable populations in Sierra Leone, including street children, people with disabilities, sex workers, widows and widowers, and survivors of trafficking, often experience exclusion from legal protection and social support.",
    focusAreas: [
      "Policies implementation and advocacy",
      "Gender advocacy",
      "Conflict resolutions and peace",
      "Human rights for particular vulnerable people",
      "Other related activities",
    ],
    activities: [
      "Organization of capacity building trainings",
      "Organization of workshops, debates",
      "Material and technical support",
      "Community-level human rights education",
      "Advocacy campaigns and stakeholder engagement",
      "Conflict mediation and community dialogue",
      "Policy monitoring and reporting",
    ],
    outcomes: [
      "Improved human rights in Sierra Leone",
      "Reduced human rights violation in Sierra Leone",
      "Reduced human trafficking and death due to violation of human rights",
      "Improved services of human rights in Sierra Leone",
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
      "Without reliable local health data, communities and organisations cannot design interventions that truly meet people's needs.",
    focusAreas: [
      "Surveys and evaluation",
      "Health studies and researches",
      "Evidence-based innovation",
      "Research partnerships",
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
