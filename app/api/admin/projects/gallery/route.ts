import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongo";
import { revalidatePath } from "next/cache";
import { ObjectId } from "mongodb";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * DELETE /api/admin/projects/gallery?projectId=xxx&imageUrl=xxx
 * Removes a single image from a project's gallery array.
 */
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get("projectId");
    const imageUrl = searchParams.get("imageUrl");

    if (!projectId || !imageUrl) {
      return NextResponse.json(
        { error: "projectId and imageUrl are required" },
        { status: 400 },
      );
    }

    const db = await getDb();
    const result = await db.collection("projects").updateOne(
      { _id: new ObjectId(projectId) },
      { $pull: { gallery: imageUrl } as any, $set: { updatedAt: new Date() } },
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    revalidatePath("/admin/projects");
    revalidatePath("/projects");
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[api/admin/projects/gallery] DELETE error:", error);
    return NextResponse.json(
      { error: "Failed to remove image", details: (error as Error).message },
      { status: 500 },
    );
  }
}

/**
 * PUT /api/admin/projects/gallery
 * Reorders gallery images for a project.
 * Body: { projectId: string, gallery: string[] }
 */
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { projectId, gallery } = body;

    if (!projectId || !Array.isArray(gallery)) {
      return NextResponse.json(
        { error: "projectId and gallery array are required" },
        { status: 400 },
      );
    }

    const db = await getDb();
    const result = await db.collection("projects").updateOne(
      { _id: new ObjectId(projectId) },
      { $set: { gallery, updatedAt: new Date() } },
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    revalidatePath("/admin/projects");
    revalidatePath("/projects");
    return NextResponse.json({ ok: true, gallery });
  } catch (error) {
    console.error("[api/admin/projects/gallery] PUT error:", error);
    return NextResponse.json(
      { error: "Failed to update gallery", details: (error as Error).message },
      { status: 500 },
    );
  }
}
