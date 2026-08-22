import { partners } from "@/data/partners";
import { programs } from "@/data/programs";
import { teamMembers } from "@/data/team";
import { values } from "@/data/values";
import { internshipAreas, volunteerRoles, vacancies } from "@/data/vacancies";
import type { KnowledgeDocument } from "@/types/knowledge";

const programDocuments: KnowledgeDocument[] = programs.map((program) => ({
  id: `program-${program.slug}`,
  title: program.fullName,
  category: "Programs",
  documentType: "program profile",
  sourceType: "website",
  sourceUrl: `/programs/${program.slug}`,
  program: program.shortLabel,
  content: [
    `${program.fullName} is one of WHI-SL's four core programs.`,
    `Tagline: ${program.tagline}`,
    `Overview: ${program.description}`,
    `Challenge addressed: ${program.challenge}`,
    `Focus areas: ${program.focusAreas.join("; ")}.`,
    `Activities: ${program.activities.join("; ")}.`,
    `Outcomes: ${program.outcomes.join("; ")}.`,
  ].join(" "),
}));

export const knowledgeDocuments: KnowledgeDocument[] = [
  {
    id: "organization-profile",
    title: "WHI-SL Organization Profile",
    category: "About WHI-SL",
    documentType: "organization profile",
    sourceType: "website",
    sourceUrl: "/",
    content: [
      "Women Health Initiative (WHI) is a community-based organisation dedicated to empowering vulnerable young people to make smart choices and decisions for sustainable development.",
      "WHI was founded in Bo City, Sierra Leone in 2010 and registered by Bo Council in 2018.",
      "The organisation was founded to respond to social and health community issues.",
      "WHI uses innovative approaches, including sports and entertainments, to address public health and social issues in Sierra Leone.",
      "The organisation currently has 15 staff and 25 volunteers.",
      "WHI has implemented several public health projects and has achieved consistent changes for vulnerable people in Bo District and the Southern Province of Sierra Leone.",
    ].join(" "),
    keywords: ["about", "history", "founded", "registration", "Bo City", "staff", "volunteers"],
  },
  {
    id: "mission-vision-values",
    title: "WHI-SL Mission Vision and Values",
    category: "About WHI-SL",
    documentType: "mission vision values",
    sourceType: "website",
    sourceUrl: "/who-we-are",
    content: [
      "Vision: WHI strives for equal and equitable rights and opportunities for vulnerable people in Sierra Leone by addressing social determinants of health.",
      "WHI wants a Sierra Leone free of inequalities, inequities, injustices, and social discrimination.",
      "Mission: Women Health Initiative is dedicated to empower vulnerable people in Sierra Leone to make smart choices and decisions in their lives for sustainable development.",
      "WHI is dedicated to improve knowledge, confidence, and services for vulnerable people in Sierra Leone in order to make the best choices for their lives.",
      `Values: ${values.map((value) => value.label).join(", ")}.`,
    ].join(" "),
    keywords: ["mission", "vision", "values", "accountability", "transparency", "equity", "equality"],
  },
  {
    id: "target-populations",
    title: "WHI-SL Target Populations and Approach",
    category: "About WHI-SL",
    documentType: "audience and approach",
    sourceType: "website",
    sourceUrl: "/",
    content: [
      "WHI-SL serves vulnerable young people and adolescents, vulnerable women and girls, street children, orphans, sex workers, widows and widowers, people living with disabilities, and people living with HIV/AIDS.",
      "Its approach combines sports, entertainments, capacity building, mentorship, community-based comprehensive services, information and technology based health services, and evidence-based innovation.",
      "The organisation focuses on identifying youth potentials and talents for holistic development.",
    ].join(" "),
    keywords: ["young people", "women", "girls", "children", "disability", "HIV", "approach"],
  },
  {
    id: "programs-overview",
    title: "WHI-SL Programs Overview",
    category: "Programs",
    documentType: "program overview",
    sourceType: "website",
    sourceUrl: "/programs",
    content: [
      "WHI-SL works through four connected programs: Health and Social Empowerment, Gender Empowerment, Human Rights, and Health Research.",
      "The programs are designed to reinforce one another so the organisation can respond to the full picture of community needs.",
      "Health and Social Empowerment focuses on sexual reproductive health education, mental health awareness, screening, public health services, water, hygiene, sanitation, rural and city development, biodiversity, illiteracy reduction, science and technology promotion, micro projects, small business planning, and youth talent development.",
      "Gender Empowerment supports women and girls through gender awareness, advocacy against domestic violence and gender-based violence, family conflict resolution, survivor support, women empowerment, and economic development.",
      "Human Rights promotes policy implementation, gender advocacy, conflict resolution, peace, and human rights for vulnerable people.",
      "Health Research builds evidence through surveys, evaluation, health studies, research partnerships, and dissemination of findings.",
    ].join(" "),
  },
  ...programDocuments,
  {
    id: "governance-and-team",
    title: "WHI-SL Governance and Team Roles",
    category: "Organisation",
    documentType: "governance and team",
    sourceType: "website",
    sourceUrl: "/who-we-are",
    content: [
      "WHI-SL has a General Assembly of 35 members, a Board of Directors of 5 members, and an Executive Board.",
      "The Board of Directors includes a chair or president, co-chair, general secretary, and two board members representing the organisation, partners, local leaders, beneficiaries, and trustees or alumni.",
      "The Executive Board includes the Executive Director, CEO, General Secretary, Accountant or Treasurer, Directors of programs, Monitoring and Evaluation Officer, Internal Auditor, Procurement Officer, and Director of Fundraising and Resource Mobilization.",
      `Team roles listed on the website include: ${teamMembers.map((member) => member.role).join("; ")}.`,
      "The organisation also includes project coordinators, supervising council leadership, and logistic support roles.",
    ].join(" "),
    keywords: ["governance", "board", "team", "leadership", "structure", "roles"],
  },
  {
    id: "partners",
    title: "WHI-SL Partners",
    category: "Partnerships",
    documentType: "partner profile",
    sourceType: "website",
    sourceUrl: "/partner-with-us",
    content: [
      `WHI-SL's document highlights partners such as ${partners.map((partner) => partner.name).join("; ")}.`,
      "The organisation welcomes any partners and donors who want to support community change.",
      "The launch photos show WHI-SL staff alongside government, health, community, and media stakeholders.",
    ].join(" "),
    keywords: ["partners", "partnership", "government", "health", "education", "media", "collaboration", "gallery"],
  },
  {
    id: "work-with-us",
    title: "WHI-SL Careers Volunteering and Internships",
    category: "Opportunities",
    documentType: "careers volunteering",
    sourceType: "website",
    sourceUrl: "/work-with-us",
    content: [
      vacancies.length > 0
        ? `Open vacancies currently listed: ${vacancies.map((vacancy) => vacancy.title).join("; ")}.`
        : "The website currently shows no open positions.",
      `Volunteer roles include: ${volunteerRoles.map((role) => role.title).join("; ")}.`,
      `Internship areas include: ${internshipAreas.join("; ")}.`,
      "Volunteer and internship opportunities are connected to public health, gender empowerment, human rights, health research, mobilisation, fundraising, and community support work.",
    ].join(" "),
    keywords: ["jobs", "careers", "volunteer", "internship", "work with us"],
  },
  {
    id: "contact",
    title: "WHI-SL Contact Information",
    category: "Contact",
    documentType: "contact information",
    sourceType: "website",
    sourceUrl: "/contact",
    content: [
      "WHI-SL is based in Bo City, Bo District, Sierra Leone.",
      "The website uses a contact form for enquiries and does not list a public phone number or direct public email address.",
      "Office hours shown on the website are Monday to Friday, 8:30 AM to 5:00 PM.",
      "The contact page is best for partnership and donor enquiries, program and research collaboration, volunteer and internship questions, and media or general information requests.",
    ].join(" "),
    keywords: ["contact", "email", "office hours", "location", "partnership enquiry"],
  },
  {
    id: "impact-and-learning",
    title: "WHI-SL Impact and Learning",
    category: "Impact",
    documentType: "impact summary",
    sourceType: "website",
    sourceUrl: "/impact",
    content: [
      "The website highlights impact signals such as founding in 2010, 15 staff members, 25 active volunteers, four core programs, and a 35-member General Assembly.",
      "Featured stories emphasize sports and entertainment for public health change, women and girls strengthening their voice, and rights education for vulnerable people.",
      "The organisation says it records impact through program delivery, participation, and learning, while continuing to strengthen its evidence base.",
    ].join(" "),
  },
];
