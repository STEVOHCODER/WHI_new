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

/**
 * POST /api/admin/partners/upload — upload logo for a partner
 * Requires: file (File), partnerId (string)
 * Stores image in Vercel Blob and updates the partner document in MongoDB.
 */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const partnerId = formData.get("partnerId") as string | null;

    if (!file || file.size === 0) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (!partnerId) {
      return NextResponse.json({ error: "partnerId is required" }, { status: 400 });
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

    const blobToken = process.env.BLOB_READ_WRITE_TOKEN;
    let logoUrl: string;

    if (blobToken) {
      const { put } = await import("@vercel/blob");
      const blob = await put(
        `whi-sl/partners/${Date.now()}-${file.name}`,
        file,
        { access: "public", contentType: file.type },
      );
      logoUrl = blob.url;
    } else {
      const buffer = Buffer.from(await file.arrayBuffer());
      const base64 = buffer.toString("base64");
      logoUrl = `data:${file.type};base64,${base64}`;
    }

    const db = await getDb();
    const result = await db.collection("partners").updateOne(
      { _id: new ObjectId(partnerId) },
      { $set: { logoUrl, updatedAt: new Date() } },
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Partner not found" }, { status: 404 });
    }

    revalidatePath("/");
    revalidatePath("/admin/partners");
    return NextResponse.json({ url: logoUrl });
  } catch (error) {
    console.error("[api/admin/partners/upload] error:", error);
    return NextResponse.json(
      { error: "Upload failed", details: (error as Error).message },
      { status: 500 },
    );
  }
}
