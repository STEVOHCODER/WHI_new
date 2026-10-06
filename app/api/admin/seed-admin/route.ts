import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongo";
import { seedDefaultAdmin } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function isAuthorized(request: NextRequest): boolean {
  const key = process.env.SEED_ADMIN_KEY;
  if (!key) return false;
  return request.headers.get("x-seed-key") === key;
}

export async function POST(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Not authorized" }, { status: 403 });
  }
  try {
    const result = await seedDefaultAdmin();
    if ("reason" in result) {
      return NextResponse.json(
        { error: "ADMIN_EMAIL and ADMIN_PASSWORD must be set" },
        { status: 500 },
      );
    }
    return NextResponse.json({ seeded: true, created: result.created, changed: result.changed });
  } catch (error) {
    console.error("[api/admin/seed-admin] error:", error);
    return NextResponse.json({ error: "Failed to seed admin" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Not authorized" }, { status: 403 });
  }
  try {
    const db = await getDb();
    const count = await db.collection("admins").countDocuments();
    return NextResponse.json({ exists: count > 0 });
  } catch {
    return NextResponse.json({ exists: false });
  }
}
