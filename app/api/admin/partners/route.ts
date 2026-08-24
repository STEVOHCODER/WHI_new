import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongo";
import { revalidatePath } from "next/cache";
import { ObjectId } from "mongodb";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * GET /api/admin/partners — list all partners
 */
export async function GET() {
  try {
    const db = await getDb();
    const partners = await db.collection("partners")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();
    return NextResponse.json(partners);
  } catch (error) {
    console.error("[api/admin/partners] GET error:", error);
    return NextResponse.json({ error: "Failed to fetch partners" }, { status: 500 });
  }
}

/**
 * POST /api/admin/partners — create a new partner
 */
export async function POST(request: NextRequest) {
  try {
    const form = await request.formData();
    const name = (form.get("name") as string) || "";
    const category = (form.get("category") as string) || "Partner";
    const website = (form.get("website") as string) || null;
    const logoFile = form.get("logo") as File | null;

    if (!name) {
      return NextResponse.json({ error: "Partner name is required" }, { status: 400 });
    }

    const db = await getDb();
    let logoUrl: string | null = null;

    if (logoFile && logoFile.size > 0) {
      const blobToken = process.env.BLOB_READ_WRITE_TOKEN;
      if (blobToken) {
        const { put } = await import("@vercel/blob");
        const blob = await put(`whi-sl/partners/${Date.now()}-${logoFile.name}`, logoFile, {
          access: "public",
          contentType: logoFile.type,
        });
        logoUrl = blob.url;
      } else {
        const buffer = Buffer.from(await logoFile.arrayBuffer());
        const base64 = buffer.toString("base64");
        logoUrl = `data:${logoFile.type};base64,${base64}`;
      }
    }

    const now = new Date();
    const result = await db.collection("partners").insertOne({
      _id: new ObjectId(),
      name,
      category,
      logoUrl,
      website,
      isActive: true,
      createdAt: now,
      updatedAt: now,
    });

    revalidatePath("/");
    revalidatePath("/admin/partners");
    return NextResponse.json({ id: result.insertedId, name }, { status: 201 });
  } catch (error) {
    console.error("[api/admin/partners] POST error:", error);
    return NextResponse.json({ error: "Failed to create partner", details: (error as Error).message }, { status: 500 });
  }
}
