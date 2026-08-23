import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongo";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const { slug } = await params;
    const db = await getDb();
    const project = await db.collection("projects").findOne({ slug, isActive: true });

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({ project });
  } catch (error) {
    console.error("[api/projects/[slug]] error:", error);
    return NextResponse.json(
      { error: "Failed to load project", details: (error as Error).message },
      { status: 500 },
    );
  }
}
