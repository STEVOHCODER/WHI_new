import { NextResponse } from "next/server";
import { getDbSafe } from "@/lib/mongo";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * GET /api/gallery — public endpoint to fetch gallery images for the frontend
 * Returns all active gallery photos sorted by creation date.
 */
export async function GET() {
  try {
    const safe = await getDbSafe();
    if (safe.error) {
      return NextResponse.json([], { status: 200 });
    }
    const db = safe.db!;
    const photos = await db
      .collection("gallery")
      .find({})
      .sort({ createdAt: 1 })
      .toArray();

    return NextResponse.json(photos);
  } catch (error) {
    console.error("[api/gallery] GET error:", error);
    return NextResponse.json([], { status: 200 });
  }
}
