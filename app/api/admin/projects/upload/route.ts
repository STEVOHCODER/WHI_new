import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongo";
import { revalidatePath } from "next/cache";
import { ObjectId } from "mongodb";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
];
const MAX_SIZE = 5 * 1024 * 1024;

async function uploadFile(file: File, prefix: string): Promise<string> {
  const blobToken = process.env.BLOB_READ_WRITE_TOKEN;
  if (blobToken) {
    const { put } = await import("@vercel/blob");
    const blob = await put(`${prefix}/${Date.now()}-${file.name}`, file, {
      access: "public",
      contentType: file.type,
    });
    return blob.url;
  }
  const buffer = Buffer.from(await file.arrayBuffer());
  const base64 = buffer.toString("base64");
  return `data:${file.type};base64,${base64}`;
}

/**
 * POST /api/admin/projects/upload
 * Accepts multipart form data with a file.
 * - If projectId is provided, updates the project's thumbnail or gallery.
 * - If no projectId, returns the uploaded URL for use in project creation.
 */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const projectId = (formData.get("projectId") as string) || null;
    const isThumbnail = formData.get("isThumbnail") === "true";

    if (!file || file.size === 0) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: "File must be under 5MB" }, { status: 400 });
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "Only JPG, PNG, WebP, GIF, SVG allowed" },
        { status: 400 },
      );
    }

    const url = await uploadFile(file, "whi-sl/projects");

    if (projectId) {
      const db = await getDb();
      const update: Record<string, unknown> = {};

      if (isThumbnail) {
        update.imageUrl = url;
      } else {
        const project = await db
          .collection("projects")
          .findOne({ _id: new ObjectId(projectId) });
        if (!project) {
          return NextResponse.json({ error: "Project not found" }, { status: 404 });
        }
        const gallery = (project.gallery as string[]) || [];
        gallery.push(url);
        update.gallery = gallery;
      }

      await db
        .collection("projects")
        .updateOne({ _id: new ObjectId(projectId) }, {
          $set: { ...update, updatedAt: new Date() },
        });
      revalidatePath("/admin/projects");
      revalidatePath("/projects");
    }

    return NextResponse.json({ url, isThumbnail });
  } catch (error) {
    console.error("[api/admin/projects/upload] error:", error);
    return NextResponse.json(
      { error: "Upload failed", details: (error as Error).message },
      { status: 500 },
    );
  }
}
