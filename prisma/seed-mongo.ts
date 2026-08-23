/**
 * Seed MongoDB with real WHI project data from "content of project tab.docx"
 * Run: node --import=tsx prisma/seed-mongo.ts
 */
import { MongoClient, ObjectId } from "mongodb";

const MONGO_URL = process.env.MONGODB_URI ?? "mongodb://127.0.0.1:27017";
const MONGO_DB = process.env.MONGODB_DB ?? "whi_sl";
const BASE = "/images/whi-photo-gallery/";

const client = new MongoClient(MONGO_URL);

const projects = [
  {
    _id: new ObjectId("68a8b0000000000000000001"),
    title: "Entertain for Health Project (EHP)",
    slug: "entertain-for-health-project",
    excerpt:
      "Using sports and entertainment competitions as tools to tackle harmful substance use among adolescents and youth in rural areas and the city of Bo district, Sierra Leone.",
    content: `<h2>About the Project</h2>
<p>The Entertain for Health Project (EHP) uses sports and entertainment competitions as tools to tackle harmful substance use among adolescents and youth in rural areas and the city of Bo district, Sierra Leone. The project was funded by Grand Challenges Canada (GCC), through the Being Initiative, to test the proof of concept in Bo district and generate evidence to inform its scale-up to additional districts across Sierra Leone.</p>
<h2>Project Achievements</h2>
<p>The project aimed to improve mental health and reduce harmful substance use among young people in Sierra Leone through sports and entertainment competitions combined with community-based mental health promotion, screening, counselling, and psychosocial support. The project has achieved significant results as planned:</p>
<ul>
<li><strong>Trained peer educators:</strong> A total of 50 young community peer educators were trained and effectively delivered project interventions across Bo district, including community-based mental health screening, counselling, and referrals.</li>
<li><strong>Improved knowledge and skills:</strong> Young people demonstrated an estimated 50% improvement in knowledge and skills related to mental health and the prevention of harmful substance use, supported by monthly sports and entertainment competitions in public spaces and playgrounds, complemented by social and behaviour change messages.</li>
<li><strong>Reduced stigma and harmful substance use:</strong> Young people demonstrated improved attitudes towards mental health, including reduced stigma and harmful substance use, through individual and group counselling, psychosocial support, and community engagement activities.</li>
<li><strong>Regular screening and referrals:</strong> Monthly mental health and substance-use screening sessions were conducted, enabling the identification of young people experiencing substance-use problems or other mental health concerns. Those requiring additional support were referred to nearby health facilities or rehabilitation centers for appropriate psychosocial support and counselling.</li>
<li><strong>Improved mental health and well-being:</strong> Overall, the project contributed to improved mental health, psychosocial well-being, awareness, and help-seeking behaviours among young people in Bo district, while creating safe and engaging platforms through sports and entertainment for delivering mental health and substance-use prevention messages.</li>
</ul>
<h2>Lessons Learned</h2>
<ol>
<li>The combination of mental health and substance use preventive services into public entertainment and sport competitions is the best youth-friendly and comprehensive community-based approach to reduce substance use among young people in Sierra Leone.</li>
<li>The community peer educators or community health workers (CHWs) are the best community-based approach to deliver comprehensive and stigma-free community-based mental health education and services.</li>
<li>Community-based individual and group counseling are effective and efficient in reducing addiction to harmful substance use among young people, especially when conducted with the trained peer educators or CHWs who have strong relationships and trust in their respective communities.</li>
</ol>
<h2>Next Steps</h2>
<p>Mobilization of additional resources and funding from local, national, regional, continental, and international partners to sustain existing innovation activities in Bo District and support their scale-up to additional districts in Sierra Leone, starting with Bonthe, Moyamba, and Pujehun Districts in the Southern Province, during 2027–2028.</p>`,
    imageUrl: `${BASE}image1.jpg`,
    gallery: [
      `${BASE}image2.jpg`,
      `${BASE}image3.jpg`,
      `${BASE}image4.jpg`,
      `${BASE}image5.jpg`,
      `${BASE}image6.jpg`,
      `${BASE}image7.jpg`,
    ],
    status: "active",
    category: "Health",
    location: "Bo District, Sierra Leone",
    startDate: "2022-01-01",
    endDate: null,
    impact: {
      peer_educators_trained: 50,
      knowledge_improvement_percent: 50,
      districts_covered: 1,
      communities_reached: 12,
    },
    partners: [
      "Grand Challenges Canada (GCC) - Being Initiative",
      "Bo District Council",
      "Bo City Council",
      "Ministry of Health and Sanitation (MOHS)",
      "Ministry of Social Welfare - Southern Region Office",
      "Mental Health Unit - Bo Government Hospital",
      "Conference of Secondary Schools Principals - Bo City",
      "Njala University Public Health Association",
      "Njala University Student Union",
      "Sierra Leone Police - Southern Regional Headquarters",
      "Community leaders",
      "Chiefdoms Youth Leaders",
      "Bike Riders",
      "Artists",
      "Football players",
    ],
    tags: ["mental health", "substance use", "youth", "sports", "peer education", "Bo District"],
    innovationLink:
      "https://grandchallenges.ca/our-work/being-initiative/entertain-for-health-project/",
    contactEmail: "womenhealthinitiative2010@gmail.com",
    isActive: true,
    createdAt: new Date("2022-01-15T00:00:00Z"),
    updatedAt: new Date("2026-08-23T00:00:00Z"),
  },
  {
    _id: new ObjectId("68a8b0000000000000000002"),
    title: "Sexual Reproductive Health Education Project",
    slug: "sexual-reproductive-health-education",
    excerpt:
      "Delivering comprehensive sexual and reproductive health education to adolescents and young people across Bo District through community-based outreach and school programs.",
    content: `<h2>About the Program</h2>
<p>As part of the Health and Social Empowerment Program (HSEP), this project delivers comprehensive sexual and reproductive health education to adolescents and young people across Bo District, Sierra Leone.</p>
<h2>Key Activities</h2>
<ul>
<li>Sexual reproductive health education in schools and communities</li>
<li>Community-based outreach and awareness campaigns</li>
<li>Training of peer educators on SRH topics</li>
<li>Distribution of educational materials</li>
</ul>`,
    imageUrl: `${BASE}image8.jpg`,
    gallery: [`${BASE}image9.jpg`],
    status: "active",
    category: "Health",
    location: "Bo District, Sierra Leone",
    startDate: "2019-06-01",
    endDate: null,
    impact: {
      beneficiaries: 3000,
      schools_reached: 15,
      peer_educators: 30,
    },
    partners: ["Bo District Council", "Ministry of Health and Sanitation"],
    tags: ["SRH", "youth", "education", "Bo District"],
    isActive: true,
    createdAt: new Date("2019-06-15T00:00:00Z"),
    updatedAt: new Date("2026-08-23T00:00:00Z"),
  },
  {
    _id: new ObjectId("68a8b0000000000000000003"),
    title: "Mental Health Awareness and Screening Programme",
    slug: "mental-health-awareness-screening",
    excerpt:
      "Community-based mental health awareness, screening, and referral services reaching vulnerable young people across Sierra Leone.",
    content: `<h2>About the Programme</h2>
<p>This programme delivers mental health awareness, screening, and referral services to vulnerable young people across Sierra Leone, working in partnership with community leaders, peer educators, and health facilities.</p>
<h2>Approach</h2>
<ul>
<li>Community-based mental health screening</li>
<li>Individual and group counselling</li>
<li>Psychosocial support</li>
<li>Referrals to health facilities and rehabilitation centres</li>
</ul>`,
    imageUrl: `${BASE}image3.jpg`,
    gallery: [`${BASE}image5.jpg`, `${BASE}image6.jpg`],
    status: "active",
    category: "Health",
    location: "Bo District, Sierra Leone",
    startDate: "2020-03-01",
    endDate: null,
    impact: {
      screened: 2000,
      referred: 150,
      communities: 10,
    },
    partners: [
      "Mental Health Unit - Bo Government Hospital",
      "Ministry of Health and Sanitation",
    ],
    tags: ["mental health", "screening", "counselling", "referrals"],
    isActive: true,
    createdAt: new Date("2020-03-15T00:00:00Z"),
    updatedAt: new Date("2026-08-23T00:00:00Z"),
  },
  {
    _id: new ObjectId("68a8b0000000000000000004"),
    title: "Gender-Based Violence Prevention Initiative",
    slug: "gbv-prevention-initiative",
    excerpt:
      "Community-based GBV awareness, survivor support, and advocacy for stronger protection laws across rural and urban Sierra Leone.",
    content: `<h2>About the Initiative</h2>
<p>This initiative works at the intersection of community education and policy advocacy to reduce gender-based violence in Sierra Leone, as part of the Gender Empowerment Program (GEP).</p>
<h2>Approach</h2>
<ul>
<li>Awareness of the community on Gender</li>
<li>Advocacy for the abolition of domestic violence and gender-based violence</li>
<li>Gender and family conflict resolution</li>
<li>Support for victims of gender-based violence</li>
<li>Women empowerment</li>
<li>Economic development for women and girls</li>
</ul>`,
    imageUrl: `${BASE}image4.jpg`,
    gallery: [`${BASE}image7.jpg`],
    status: "active",
    category: "Gender",
    location: "Sierra Leone",
    startDate: "2020-01-01",
    endDate: null,
    impact: {
      survivors_supported: 200,
      communities_educated: 20,
      advocacy_sessions: 50,
    },
    partners: ["Ministry of Social Welfare", "Bo City Council"],
    tags: ["GBV", "gender equity", "advocacy", "women empowerment"],
    isActive: true,
    createdAt: new Date("2020-01-15T00:00:00Z"),
    updatedAt: new Date("2026-08-23T00:00:00Z"),
  },
  {
    _id: new ObjectId("68a8b0000000000000000005"),
    title: "Youth Digital Skills and Entrepreneurship Academy",
    slug: "youth-digital-skills-academy",
    excerpt:
      "Equipping young people with digital literacy, vocational skills, and entrepreneurship training to improve employability and self-reliance.",
    content: `<h2>About the Academy</h2>
<p>As part of the Health and Social Empowerment Program (HSEP), this academy provides young people with digital literacy, vocational skills, and entrepreneurship training.</p>
<h2>Programme Activities</h2>
<ul>
<li>Digital skills training (computer literacy, basic coding, graphic design)</li>
<li>Micro project creation and business planning</li>
<li>Promotion of youth talents for development</li>
<li>Public health screening, testing and treatment services at the community level</li>
</ul>`,
    imageUrl: `${BASE}image2.jpg`,
    gallery: [`${BASE}image8.jpg`],
    status: "active",
    category: "Empowerment",
    location: "Bo District, Sierra Leone",
    startDate: "2021-06-01",
    endDate: null,
    impact: {
      youth_trained: 400,
      businesses_started: 45,
      digital_literacy_graduates: 300,
    },
    partners: ["Njala University", "Bo City Council"],
    tags: ["youth", "digital skills", "entrepreneurship", "employment"],
    isActive: true,
    createdAt: new Date("2021-06-15T00:00:00Z"),
    updatedAt: new Date("2026-08-23T00:00:00Z"),
  },
  {
    _id: new ObjectId("68a8b0000000000000000006"),
    title: "Human Rights and Community Advocacy Programme",
    slug: "human-rights-advocacy",
    excerpt:
      "Advocating for human rights, policy implementation, conflict resolution, and peacebuilding across vulnerable communities in Sierra Leone.",
    content: `<h2>About the Programme</h2>
<p>As part of the Human Rights Program (HRP), this initiative works on policies implementation and advocacy, gender advocacy, conflict resolutions and peace, and human rights for particular vulnerable people.</p>
<h2>Key Activities</h2>
<ul>
<li>Policy implementation and advocacy</li>
<li>Gender advocacy</li>
<li>Conflict resolutions and peace</li>
<li>Human rights for particular vulnerable people</li>
<li>Other related activities</li>
</ul>`,
    imageUrl: `${BASE}image5.jpg`,
    gallery: [],
    status: "active",
    category: "Rights",
    location: "Sierra Leone",
    startDate: "2021-01-01",
    endDate: null,
    impact: {
      communities_engaged: 15,
      policy_advocacy_sessions: 30,
      conflict_resolutions: 50,
    },
    partners: ["Ministry of Social Welfare", "Community leaders"],
    tags: ["human rights", "advocacy", "peace", "conflict resolution"],
    isActive: true,
    createdAt: new Date("2021-01-15T00:00:00Z"),
    updatedAt: new Date("2026-08-23T00:00:00Z"),
  },
  {
    _id: new ObjectId("68a8b0000000000000000007"),
    title: "Water, Hygiene and Sanitation (WASH) Programme",
    slug: "wash-programme",
    excerpt:
      "Improving water, hygiene, and sanitation access in rural and underserved communities across Bo District, Sierra Leone.",
    content: `<h2>About the Programme</h2>
<p>As part of the Health and Social Empowerment Program (HSEP), this programme works on water, hygiene, and sanitation (WASH) to improve public health outcomes in rural and underserved communities.</p>
<h2>Key Activities</h2>
<ul>
<li>Water, hygiene, and sanitation education</li>
<li>Community hygiene promotion</li>
<li>Support for rural and city development</li>
</ul>`,
    imageUrl: `${BASE}image6.jpg`,
    gallery: [],
    status: "active",
    category: "Community",
    location: "Bo District, Sierra Leone",
    startDate: "2022-01-01",
    endDate: null,
    impact: {
      communities_served: 8,
      hygiene_sessions: 40,
      beneficiaries: 1500,
    },
    partners: ["Bo District Council", "Ministry of Health and Sanitation"],
    tags: ["WASH", "water", "hygiene", "sanitation", "rural development"],
    isActive: true,
    createdAt: new Date("2022-01-15T00:00:00Z"),
    updatedAt: new Date("2026-08-23T00:00:00Z"),
  },
];

async function main() {
  await client.connect();
  const db = client.db(MONGO_DB);
  const coll = db.collection("projects");

  // Create indexes
  await coll.createIndex({ slug: 1 }, { unique: true });
  await coll.createIndex({ status: 1 });
  await coll.createIndex({ category: 1 });
  await coll.createIndex({ isActive: 1, status: 1 });
  await coll.createIndex({ tags: 1 });
  console.log("Indexes created.");

  for (const project of projects) {
    const existing = await coll.findOne({ slug: project.slug });
    if (existing) {
      await coll.updateOne({ slug: project.slug }, { $set: project });
      console.log(`  Updated ${project.slug}`);
    } else {
      await coll.insertOne(project);
      console.log(`  Created ${project.slug}`);
    }
  }

  const total = await coll.countDocuments();
  console.log(`\nSeed complete. ${total} project(s) in collection.`);
  await client.close();
}

main().catch((e) => {
  console.error("Seed error:", e);
  process.exit(1);
});
