import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongo";
import { revalidatePath } from "next/cache";
import { ObjectId } from "mongodb";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * PUT /api/admin/projects/[id]
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const form = await request.formData();

    const title = (form.get("title") as string) || undefined;
    const excerpt = (form.get("excerpt") as string) || undefined;
    const category = (form.get("category") as string) || undefined;
    const status = (form.get("status") as "active" | "completed" | "archived") || undefined;
    const location = (form.get("location") as string) || undefined;
    const imageUrl = (form.get("imageUrl") as string) || undefined;
    const content = (form.get("content") as string) || undefined;
    const tagsRaw = form.get("tags") as string;
    const isActiveVal = form.get("isActive") as string;

    const tags = tagsRaw
      ? tagsRaw.split(",").map((t: string) => t.trim()).filter(Boolean)
      : undefined;

    const update: Record<string, unknown> = { updatedAt: new Date() };
    if (title !== undefined) update.title = title;
    if (excerpt !== undefined) update.excerpt = excerpt;
    if (category !== undefined) update.category = category;
    if (status !== undefined) update.status = status;
    if (location !== undefined) update.location = location;
    if (imageUrl !== undefined) update.imageUrl = imageUrl;
    if (content !== undefined) update.content = content;
    if (tags !== undefined) update.tags = tags;
    if (isActiveVal !== undefined) update.isActive = isActiveVal === "on" || isActiveVal === "true";

    const db = await getDb();
    const result = await db.collection("projects").updateOne(
      { _id: new ObjectId(id) },
      { $set: update },
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    const project = await db.collection("projects").findOne({ _id: new ObjectId(id) });
    revalidatePath("/projects");
    revalidatePath("/admin/projects");
    if (project) revalidatePath(`/projects/${project.slug}`);
    return NextResponse.json({ project });
  } catch (error) {
    console.error("[api/admin/projects/[id]] PUT error:", error);
    return NextResponse.json({ error: "Failed to update project", details: (error as Error).message }, { status: 500 });
  }
}

/**
 * DELETE /api/admin/projects/[id]
 */
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const db = await getDb();
    const result = await db.collection("projects").deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    revalidatePath("/admin/projects");
    revalidatePath("/projects");
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[api/admin/projects/[id]] DELETE error:", error);
    return NextResponse.json({ error: "Failed to delete project", details: (error as Error).message }, { status: 500 });
  }
}
