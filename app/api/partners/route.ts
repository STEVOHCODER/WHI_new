import { NextResponse } from "next/server";
import { getDbSafe } from "@/lib/mongo";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * GET /api/partners — public list of active partners
 */
export async function GET() {
  try {
    const safe = await getDbSafe();
    if (safe.error) {
      console.error("[api/partners] mongo error:", safe.error.message);
      return NextResponse.json([]);
    }
    const db = safe.db!;
    const partners = await db.collection("partners")
      .find({ isActive: true })
      .sort({ createdAt: 1 })
      .toArray();
    return NextResponse.json(partners);
  } catch (error) {
    console.error("[api/partners] error:", error);
    return NextResponse.json({ error: "Failed to fetch partners" }, { status: 500 });
  }
}
