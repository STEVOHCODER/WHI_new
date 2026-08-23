import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongo";
import { put } from "@vercel/blob";
import { revalidatePath } from "next/cache";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const projectId = (formData.get("projectId") as string) || null;
    const isThumbnail = formData.get("isThumbnail") === "true";

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: "File must be under 5MB" }, { status: 400 });
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: "Only JPG, PNG, WebP, GIF allowed" }, { status: 400 });
    }

    const blob = await put(`whi-sl/projects/${projectId ? `${projectId}/` : ""}${Date.now()}-${file.name}`, file, {
      access: "public",
      contentType: file.type,
    });

    const db = await getDb();
    const update: Record<string, unknown> = {};

    if (projectId) {
      if (isThumbnail) {
        update.imageUrl = blob.url;
      } else {
        // Append to gallery
        const project = await db.collection("projects").findOne({ _id: new (await import("mongodb")).ObjectId(projectId) });
        if (project) {
          const gallery = (project.gallery as string[]) || [];
          gallery.push(blob.url);
          update.gallery = gallery;
        }
      }
      await db.collection("projects").updateOne(
        { _id: new (await import("mongodb")).ObjectId(projectId) },
        { $set: { ...update, updatedAt: new Date() } },
      );
      revalidatePath("/admin/projects");
      revalidatePath("/projects");
    }

    return NextResponse.json({ url: blob.url, isThumbnail });
  } catch (error) {
    console.error("[api/admin/projects/upload] error:", error);
    return NextResponse.json({ error: "Upload failed", details: (error as Error).message }, { status: 500 });
  }
}
