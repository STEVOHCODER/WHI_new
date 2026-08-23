import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongo";
import { revalidatePath } from "next/cache";
import { ObjectId } from "mongodb";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/**
 * POST /api/admin/projects
 */
export async function POST(request: NextRequest) {
  try {
    const form = await request.formData();
    const title = form.get("title") as string;
    const excerpt = form.get("excerpt") as string;
    const category = form.get("category") as string;
    const status = (form.get("status") as "active" | "completed" | "archived") || "active";
    const location = (form.get("location") as string) || null;
    const imageUrl = (form.get("imageUrl") as string) || null;
    const content = (form.get("content") as string) || null;
    const tagsRaw = form.get("tags") as string;

    if (!title || !excerpt || !category) {
      return NextResponse.json({ error: "Title, excerpt, and category are required" }, { status: 400 });
    }

    const tags = tagsRaw
      ? tagsRaw.split(",").map((t: string) => t.trim()).filter(Boolean)
      : [];

    const now = new Date();
    const db = await getDb();
    const result = await db.collection("projects").insertOne({
      _id: new ObjectId(),
      title,
      slug: slugify(title),
      excerpt,
      category,
      status,
      location,
      imageUrl,
      content,
      gallery: [],
      impact: {},
      partners: [],
      tags,
      isActive: true,
      createdAt: now,
      updatedAt: now,
    });

    revalidatePath("/projects");
    revalidatePath("/admin/projects");
    return NextResponse.json({ project: { id: result.insertedId, title } }, { status: 201 });
  } catch (error) {
    console.error("[api/admin/projects] POST error:", error);
    return NextResponse.json({ error: "Failed to create project", details: (error as Error).message }, { status: 500 });
  }
}
