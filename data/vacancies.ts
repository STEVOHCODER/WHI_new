import type { Vacancy } from "@/types";

// Set vacancies here when positions become available.
// When empty, the Work With Us page displays a "no open positions" message.
export const vacancies: Vacancy[] = [];

export const volunteerRoles = [
  {
    id: "vol-health",
    title: "Community Health Volunteer",
    description:
      "Support health outreach, community mobilisation, and health education activities in Bo District.",
  },
  {
    id: "vol-gender",
    title: "Gender Empowerment Volunteer",
    description:
      "Assist with gender awareness campaigns, survivor support activities, and community engagement.",
  },
  {
    id: "vol-research",
    title: "Research and Data Volunteer",
    description:
      "Support data collection, surveys, and research activities across WHI-SL programs.",
  },
  {
    id: "vol-communications",
    title: "Communications Volunteer",
    description:
      "Help document and communicate WHI-SL's work through photography, writing, and social media.",
  },
];

export const internshipAreas = [
  "Public Health",
  "Gender and Development",
  "Monitoring & Evaluation",
  "Fundraising & Communications",
  "Research and Documentation",
  "Community Mobilisation",
];
