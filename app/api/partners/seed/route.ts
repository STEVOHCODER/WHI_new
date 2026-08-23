import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MONGO_URL = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017";
const MONGO_DB = process.env.MONGODB_DB || "whi_sl";
const client = new MongoClient(MONGO_URL, { tls: true, serverApi: { version: "1" as const } });

const SEED_PARTNERS = [
  { name: "Bo District Local Governance and Leaders", category: "Government", logoUrl: null, website: null },
  { name: "Local NGOs and Community-Based Organizations", category: "Community", logoUrl: null, website: null },
  { name: "Ministry of Health and Sanitation (MOHS)", category: "Health", logoUrl: null, website: null },
  { name: "Ministry of Social Welfare - Bo District", category: "Government", logoUrl: null, website: null },
  { name: "Bo City Council", category: "Government", logoUrl: null, website: null },
  { name: "Traditional Leaders", category: "Community", logoUrl: null, website: null },
  { name: "Grand Challenges Canada (GCC)", category: "International Funder", logoUrl: null, website: null },
];

export async function POST() {
  try {
    await client.connect();
    const db = client.db(MONGO_DB);
    const existing = await db.collection("partners").findOne({});
    if (existing) {
      return NextResponse.json({ seeded: false, message: "Partners already exist" });
    }
    await db.collection("partners").insertMany(
      SEED_PARTNERS.map((p) => ({ ...p, isActive: true, createdAt: new Date(), updatedAt: new Date() })),
    );
    return NextResponse.json({ seeded: true, count: SEED_PARTNERS.length });
  } catch (error) {
    console.error("[api/partners/seed] error:", error);
    return NextResponse.json({ error: "Failed to seed partners" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await client.connect();
    const db = client.db(MONGO_DB);
    const count = await db.collection("partners").countDocuments();
    return NextResponse.json({ exists: count > 0 });
  } catch {
    return NextResponse.json({ exists: false });
  }
}
