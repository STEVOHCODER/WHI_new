import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongo";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const status = searchParams.get("status");
    const search = searchParams.get("search");

    const where: Record<string, unknown> = { isActive: true };
    if (category) where.category = category;
    if (status) where.status = status;
    if (search) {
      where.$or = [
        { title: { $regex: search, $options: "i" } },
        { excerpt: { $regex: search, $options: "i" } },
        { tags: { $in: [new RegExp(search, "i")] } },
      ];
    }

    const db = await getDb();
    const projects = await db
      .collection("projects")
      .find(where)
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({ projects });
  } catch (error) {
    console.error("[api/projects] error:", error);
    return NextResponse.json(
      { error: "Failed to load projects", details: (error as Error).message },
      { status: 500 },
    );
  }
}
