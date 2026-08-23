import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongo";
import { revalidatePath } from "next/cache";
import { ObjectId } from "mongodb";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Convert a File (from formData) to a base64 data URL.
 * Works in Node.js without FileReader.
 */
async function fileToDataUrl(file: File): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer());
  const base64 = buffer.toString("base64");
  return `data:${file.type};base64,${base64}`;
}

/**
 * POST /api/admin/partners/upload — upload logo for a partner
 */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const partnerId = (formData.get("partnerId") as string) || null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: "File must be under 5MB" }, { status: 400 });
    }

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/gif",
      "image/svg+xml",
    ];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Only JPG, PNG, WebP, GIF, SVG allowed" },
        { status: 400 },
      );
    }

    const dataUrl = await fileToDataUrl(file);

    if (partnerId) {
      const db = await getDb();
      await db.collection("partners").updateOne(
        { _id: new ObjectId(partnerId) },
        { $set: { logoUrl: dataUrl, updatedAt: new Date() } },
      );
      revalidatePath("/");
      revalidatePath("/admin/partners");
    }

    return NextResponse.json({ url: dataUrl });
  } catch (error) {
    console.error("[api/admin/partners/upload] error:", error);
    return NextResponse.json(
      { error: "Upload failed", details: (error as Error).message },
      { status: 500 },
    );
  }
}
