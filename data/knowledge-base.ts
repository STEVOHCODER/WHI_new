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
      "Women's Health Initiative Sierra Leone (WHI-SL) is a community-based organisation based in Bo City, Sierra Leone.",
      "WHI-SL began in 2010 with a small group of 15 young volunteers from student organisations who wanted to respond to local health and social challenges.",
      "The organisation works alongside vulnerable young people, women, girls, children, people living with disabilities, people living with HIV/AIDS, and other community members.",
      "WHI-SL addresses the social determinants of health through health education, advocacy, outreach, mentorship, and research-informed programming.",
      "The organisation was registered with Bo Council in 2018.",
      "Current organisational scale highlighted on the website includes 15 staff members, 25 active volunteers, and a 35-member General Assembly.",
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
      "Mission: Empowering vulnerable people to make smart choices and decisions for sustainable development.",
      "Vision: A Sierra Leone free from inequality, inequity, injustice, and social discrimination.",
      `WHI-SL's values are ${values.map((value) => value.label.toLowerCase()).join(", ")}.`,
      "The organisation wants equal and equitable rights and opportunities for vulnerable people in Sierra Leone.",
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
      "WHI-SL serves young people and adolescents, women and girls, children and orphans, people living with disabilities, people living with HIV/AIDS, and other vulnerable communities.",
      "Its approach combines community outreach, health education, mentorship, advocacy, research and learning, and capacity building.",
      "The organisation focuses on meeting people where they are and keeping the work grounded in local realities.",
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
      "Health and Social Empowerment focuses on health education, outreach, screening, counselling, sanitation, community literacy, youth talent development, biodiversity, micro-projects, and technology promotion.",
      "Gender Empowerment supports women and girls through awareness, advocacy, survivor support, family conflict resolution, leadership, and economic empowerment.",
      "Human Rights promotes dignity, justice, peace, policy implementation, conflict resolution, anti-trafficking awareness, and rights education for vulnerable groups.",
      "Health Research builds evidence through surveys, evaluations, studies, partnerships, and publication or dissemination of findings.",
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
      "WHI-SL is governed by a 35-member General Assembly.",
      "The Board of Directors includes five members, including the chair, co-chair, secretary, and representatives of partners, local leaders, beneficiaries, and trustees or alumni.",
      "The Executive Board includes the Executive Director, CEO, General Secretary, Finance Officer, program directors, Monitoring and Evaluation Officer, Internal Auditor, Procurement Officer, and Fundraising and Partnerships lead.",
      `Team roles listed on the website include: ${teamMembers.map((member) => member.role).join("; ")}.`,
      "The organisation also includes project coordinators and logistics support roles.",
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
      `WHI-SL's gallery document highlights partners such as ${partners.map((partner) => partner.name).join("; ")}.`,
      "The launch photos show WHI-SL staff alongside government, health, law-enforcement, education, transport, community, and media stakeholders.",
      "The Entertain for Health Project launch brought together ministries, district health teams, police, school leaders, university students, transport unions, and media representatives.",
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
      "Volunteer and internship opportunities are connected to community health, gender empowerment, research, communications, and mobilisation work.",
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
      "The contact page directs visitors to use the contact form for enquiries and does not list a public phone number or direct public email address there.",
      "Office hours shown on the website are Monday to Friday, 8:30 AM to 5:00 PM.",
      "The contact page says it is best for partnership and donor enquiries, program and research collaboration, volunteer and internship questions, and media or general information requests.",
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
      `Key impact indicators on the site include ${["Founded", "Staff Members", "Active Volunteers", "Core Programs", "General Assembly"]
        .map((label, index) => `${label.toLowerCase()}: ${["2010", "15", "25", "4", "35"][index]}`)
        .join(", ")}.`,
      `Featured stories emphasize health education with young people, confidence-building for women and girls, and rights education for vulnerable groups.`,
      "The organisation says it records impact through program delivery, participation, and learning, while continuing to strengthen its evidence base.",
    ].join(" "),
  },
];
