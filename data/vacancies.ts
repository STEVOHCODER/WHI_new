import type { Vacancy } from "@/types";

// Set vacancies here when positions become available.
// When empty, the Work With Us page displays a "no open positions" message.
export const vacancies: Vacancy[] = [];

export const volunteerRoles = [
  {
    id: "vol-health",
    title: "Community Outreach Volunteer",
    description:
      "Support health education, mobilisation campaigns, screenings, counselling, and outreach services.",
  },
  {
    id: "vol-gender",
    title: "Gender Empowerment Volunteer",
    description:
      "Assist with gender awareness, advocacy against violence, conflict resolution, and support for women and girls.",
  },
  {
    id: "vol-research",
    title: "Research and Evaluation Volunteer",
    description:
      "Support surveys, evaluation, data collection, and evidence dissemination across WHI-SL programs.",
  },
  {
    id: "vol-communications",
    title: "Fundraising and Partnerships Volunteer",
    description:
      "Help connect the organisation with partners, donors, and community stakeholders.",
  },
];

export const internshipAreas = [
  "Public Health",
  "Gender Empowerment",
  "Human Rights",
  "Health Research",
  "Monitoring & Evaluation",
  "Fundraising and Partnerships",
];
