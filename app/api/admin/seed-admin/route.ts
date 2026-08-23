import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MONGO_URL = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017";
const MONGO_DB = process.env.MONGODB_DB || "whi_sl";
const client = new MongoClient(MONGO_URL, { tls: true, serverApi: { version: "1" as const } });

export async function POST() {
  try {
    await client.connect();
    const db = client.db(MONGO_DB);
    const existing = await db.collection("admins").findOne({});
    if (existing) {
      return NextResponse.json({ seeded: false, message: "Admin already exists" });
    }
    const bcrypt = await import("bcryptjs");
    const hash = await bcrypt.hash("admin@whi-sl.org", 12);
    await db.collection("admins").insertOne({
      email: "admin@whi-sl.org",
      passwordHash: hash,
      createdAt: new Date(),
    });
    return NextResponse.json({ seeded: true, email: "admin@whi-sl.org", password: "admin@whi-sl.org" });
  } catch (error) {
    console.error("[api/admin/seed-admin] error:", error);
    return NextResponse.json({ error: "Failed to seed admin" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await client.connect();
    const db = client.db(MONGO_DB);
    const count = await db.collection("admins").countDocuments();
    return NextResponse.json({ exists: count > 0 });
  } catch {
    return NextResponse.json({ exists: false });
  }
}
