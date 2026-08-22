import { PrismaClient, type ProjectStatus } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const adapter = new PrismaBetterSqlite3({ url: "file:./dev.db" });
const prisma = new PrismaClient({ adapter });

const projects = [
  {
    title: "Bo District Maternal Health Outreach",
    slug: "bo-maternal-health-outreach",
    excerpt:
      "Delivering prenatal care, health education, and safe delivery support to expectant mothers across Bo District communities.",
    content: `
      <p>The Bo District Maternal Health Outreach program has been serving vulnerable communities since 2019, providing essential maternal and child health services where they are needed most.</p>
      <h3>What We Do</h3>
      <p>Our trained community health workers conduct regular outreach visits to remote villages, offering prenatal screenings, health education sessions, and referrals for high-risk pregnancies. We also distribute hygiene kits and provide nutrition guidance to expectant mothers.</p>
      <h3>Impact</h3>
      <p>Over 2,500 mothers have received direct support through this program, with a significant reduction in maternal complications reported in participating communities.</p>
    `,
    imageUrl: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&q=80",
      "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=400&q=80",
    ],
    status: "active" as ProjectStatus,
    category: "Health",
    location: "Bo District, Sierra Leone",
    startDate: "2019-03-15",
    endDate: null,
    impact: {
      beneficiaries: 2500,
      communities: 18,
      partners: ["Ministry of Health", "UNICEF Sierra Leone"],
    },
    partners: ["Ministry of Health Sierra Leone", "UNICEF", "WHO"],
    tags: ["maternal health", "outreach", "Bo District"],
    isActive: true,
  },
  {
    title: "Gender-Based Violence Prevention Initiative",
    slug: "gbv-prevention-initiative",
    excerpt:
      "Community-based GBV awareness, survivor support, and advocacy for stronger protection laws across rural and urban Sierra Leone.",
    content: `
      <p>This initiative works at the intersection of community education and policy advocacy to reduce gender-based violence in Sierra Leone.</p>
      <h3>Approach</h3>
      <p>We conduct community dialogues, train traditional and religious leaders as advocates, and run school-based awareness programs. Our survivor support pathway connects affected individuals with legal aid, counselling, and medical care.</p>
    `,
    imageUrl: "https://images.unsplash.com/photo-1594802394801-86083440ae57?w=800&q=80",
    status: "active" as ProjectStatus,
    category: "Gender",
    location: "Sierra Leone",
    startDate: "2020-06-01",
    endDate: null,
    impact: {
      beneficiaries: 5000,
      communities: 32,
      survivors_supported: 340,
    },
    partners: ["UN Women", "African Minds"],
    tags: ["GBV", "gender equity", "advocacy"],
    isActive: true,
  },
  {
    title: "Youth Digital Skills Academy",
    slug: "youth-digital-skills-academy",
    excerpt:
      "Equipping young people with digital literacy and vocational skills to improve employability and entrepreneurship opportunities.",
    content: `
      <p>The Digital Skills Academy provides free training in computer literacy, basic coding, graphic design, and digital marketing to young people aged 16–30 across Sierra Leone.</p>
      <h3>Programme Structure</h3>
      <p>Training is delivered in 12-week cohorts, with a mix of classroom instruction and hands-on projects. Graduates receive a certificate and mentorship support for the first three months of employment or business setup.</p>
    `,
    imageUrl: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80",
    status: "completed" as ProjectStatus,
    category: "Empowerment",
    location: "Freetown & Bo, Sierra Leone",
    startDate: "2021-01-10",
    endDate: "2023-12-15",
    impact: {
      beneficiaries: 600,
      graduated: 450,
      employed_or_self_employed: 310,
    },
    partners: ["Sierra Leone Information Communication Technology Agency"],
    tags: ["youth", "digital skills", "employment"],
    isActive: false,
  },
  {
    title: "Clean Water & Sanitation for Rural Schools",
    slug: "clean-water-rural-schools",
    excerpt:
      "Installing water purification systems and building sanitation facilities in underserved rural schools to improve attendance and health.",
    content: `
      <p>Over 40% of rural schools in Sierra Leone lack access to clean drinking water. This project addresses that gap by installing purification systems and constructing gender-separated latrines.</p>
      <h3>Results</h3>
      <p>Schools with improved WASH facilities have seen a 30% increase in attendance, particularly among adolescent girls.</p>
    `,
    imageUrl: "https://images.unsplash.com/photo-1541252260730-0412e8e2108e?w=800&q=80",
    status: "active" as ProjectStatus,
    category: "Community",
    location: "Northern & Eastern Regions, Sierra Leone",
    startDate: "2022-09-01",
    endDate: null,
    impact: {
      beneficiaries: 3200,
      schools: 14,
      communities: 14,
    },
    partners: ["WaterAid", "Sierra Leone Education Sector"],
    tags: ["WASH", "water", "sanitation", "schools"],
    isActive: true,
  },
  {
    title: "Community Health Worker Training Programme",
    slug: "chwt-programme",
    excerpt:
      "Training and deploying community health workers to deliver basic healthcare in remote areas with limited medical infrastructure.",
    content: `
      <p>This programme trains local community members as certified health workers, equipping them with the skills to provide basic healthcare, health education, and referrals in their own communities.</p>
    `,
    imageUrl: "https://images.unsplash.com/photo-1581056771107-24ca5f033842?w=800&q=80",
    status: "completed" as ProjectStatus,
    category: "Health",
    location: "Sierra Leone",
    startDate: "2018-04-01",
    endDate: "2022-03-31",
    impact: {
      beneficiaries: 8000,
      health_workers_trained: 120,
      communities_covered: 45,
    },
    tags: ["health workers", "training", "rural health"],
    isActive: false,
  },
  {
    title: "Climate Resilience & Reforestation Project",
    slug: "climate-resilience-reforestation",
    excerpt:
      "Restoring degraded forest land and building community climate resilience through sustainable agriculture and tree planting.",
    content: `
      <p>Deforestation and climate change threaten livelihoods across Sierra Leone. This project combines tree planting, sustainable farming training, and climate education to build long-term resilience.</p>
    `,
    imageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80",
    status: "active" as ProjectStatus,
    category: "Environment",
    location: "Kenema District, Sierra Leone",
    startDate: "2023-02-01",
    endDate: null,
    impact: {
      trees_planted: 15000,
      beneficiaries: 1200,
      communities: 8,
    },
    tags: ["climate", "reforestation", "sustainability"],
    isActive: true,
  },
];

async function main() {
  console.log("Seeding projects...");
  for (const project of projects) {
    const existing = await prisma.project.findUnique({ where: { slug: project.slug } });
    if (existing) {
      console.log(`  Skipped ${project.slug} (already exists)`);
      continue;
    }
    await prisma.project.create({ data: project });
    console.log(`  Created ${project.slug}`);
  }
  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => await prisma.$disconnect());
