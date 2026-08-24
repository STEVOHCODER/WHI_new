import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongo";
import { revalidatePath } from "next/cache";
import { ObjectId } from "mongodb";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"];
const MAX_SIZE = 5 * 1024 * 1024;

/**
 * GET /api/admin/gallery — list all gallery photos
 */
export async function GET() {
  try {
    const db = await getDb();
    const photos = await db
      .collection("gallery")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();
    return NextResponse.json(photos);
  } catch (error) {
    console.error("[api/admin/gallery] GET error:", error);
    return NextResponse.json({ error: "Failed to fetch gallery" }, { status: 500 });
  }
}

/**
 * POST /api/admin/gallery — upload a new gallery photo
 * Body: multipart/form-data with "file", optional "title", optional "caption"
 */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const title = (formData.get("title") as string) || "";
    const caption = (formData.get("caption") as string) || "";

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

    let imageUrl: string;
    const blobToken = process.env.BLOB_READ_WRITE_TOKEN;
    if (blobToken) {
      const { put } = await import("@vercel/blob");
      const blob = await put(`whi-sl/gallery/${Date.now()}-${file.name}`, file, {
        access: "public",
        contentType: file.type,
      });
      imageUrl = blob.url;
    } else {
      const buffer = Buffer.from(await file.arrayBuffer());
      const base64 = buffer.toString("base64");
      imageUrl = `data:${file.type};base64,${base64}`;
    }

    const db = await getDb();
    const now = new Date();
    const result = await db.collection("gallery").insertOne({
      _id: new ObjectId(),
      imageUrl,
      title,
      caption,
      createdAt: now,
      updatedAt: now,
    });

    revalidatePath("/admin/gallery");
    return NextResponse.json({ id: result.insertedId, imageUrl, title, caption }, { status: 201 });
  } catch (error) {
    console.error("[api/admin/gallery] POST error:", error);
    return NextResponse.json(
      { error: "Upload failed", details: (error as Error).message },
      { status: 500 },
    );
  }
}

/**
 * PATCH /api/admin/gallery — update title/caption
 * Body: { id: string, title?: string, caption?: string }
 */
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, title, caption } = body;

    if (!id) {
      return NextResponse.json({ error: "id is required" }, { status: 400 });
    }

    const update: Record<string, unknown> = { updatedAt: new Date() };
    if (title !== undefined) update.title = title;
    if (caption !== undefined) update.caption = caption;

    const db = await getDb();
    const result = await db.collection("gallery").updateOne(
      { _id: new ObjectId(id) },
      { $set: update },
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Photo not found" }, { status: 404 });
    }

    revalidatePath("/admin/gallery");
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[api/admin/gallery] PATCH error:", error);
    return NextResponse.json(
      { error: "Failed to update", details: (error as Error).message },
      { status: 500 },
    );
  }
}

/**
 * DELETE /api/admin/gallery?id=xxx — delete a gallery photo
 * DELETE /api/admin/gallery?all=true — delete ALL gallery photos
 */
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const deleteAll = searchParams.get("all") === "true";

    const db = await getDb();

    if (deleteAll) {
      const result = await db.collection("gallery").deleteMany({});
      revalidatePath("/admin/gallery");
      return NextResponse.json({ ok: true, deleted: result.deletedCount });
    }

    if (!id) {
      return NextResponse.json({ error: "id is required" }, { status: 400 });
    }

    const result = await db.collection("gallery").deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Photo not found" }, { status: 404 });
    }

    revalidatePath("/admin/gallery");
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[api/admin/gallery] DELETE error:", error);
    return NextResponse.json(
      { error: "Failed to delete photo", details: (error as Error).message },
      { status: 500 },
    );
  }
}
