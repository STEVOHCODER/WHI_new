import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongo";
import { revalidatePath } from "next/cache";
import { ObjectId } from "mongodb";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * POST /api/partnership — stores submission in DB and sends email
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, organisation, phone, partnershipType, message } = body;

    if (!name || !email || !organisation || !partnershipType || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const db = await getDb();
    await db.collection("partnerships").insertOne({
      _id: new ObjectId(),
      name,
      email,
      organisation,
      phone: phone || "",
      partnershipType,
      message,
      read: false,
      createdAt: new Date(),
    });

    revalidatePath("/admin/partnerships");
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[api/partnership] POST error:", error);
    return NextResponse.json({ error: "Failed to save submission" }, { status: 500 });
  }
}
