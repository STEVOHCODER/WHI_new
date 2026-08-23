import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongo";
import { ObjectId } from "mongodb";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const SEED_DATA = [
  {
    title: "Community Health Worker",
    department: "Health",
    location: "Bo District",
    type: "Full-time",
    deadline: "2026-12-31",
    href: "/contact",
  },
  {
    title: "Gender Advocacy Officer",
    department: "Gender Empowerment",
    location: "Sierra Leone",
    type: "Full-time",
    deadline: "2026-12-31",
    href: "/contact",
  },
  {
    title: "Research Assistant",
    department: "Research",
    location: "Bo City",
    type: "Contract",
    deadline: "2026-10-31",
    href: "/contact",
  },
  {
    title: "Volunteer - Outreach",
    department: "Community Outreach",
    location: "Bo District",
    type: "Volunteer",
    deadline: "2026-12-31",
    href: "/contact",
  },
  {
    title: "Intern - Monitoring & Evaluation",
    department: "M&E",
    location: "Bo City",
    type: "Internship",
    deadline: "2026-09-30",
    href: "/contact",
  },
];

/**
 * POST /api/seed-vacancies — one-time seed endpoint
 */
export async function POST() {
  try {
    const db = await getDb();
    // Clear existing vacancies
    await db.collection("vacancies").deleteMany({});
    // Insert seed data
    const now = new Date();
    const docs = SEED_DATA.map((v) => ({
      ...v,
      _id: new ObjectId(),
      isActive: true,
      createdAt: now,
    }));
    await db.collection("vacancies").insertMany(docs);
    return NextResponse.json({ ok: true, inserted: docs.length });
  } catch (error) {
    console.error("[seed-vacancies] error:", error);
    return NextResponse.json({ error: "Failed to seed vacancies" }, { status: 500 });
  }
}
