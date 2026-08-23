import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongo";
import { revalidatePath } from "next/cache";
import { ObjectId } from "mongodb";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * POST /api/admin/partnerships/[id]/read
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const form = await request.formData();
    const read = form.get("read") === "true";

    const db = await getDb();
    const result = await db.collection("partnerships").updateOne(
      { _id: new ObjectId(id) },
      { $set: { read } },
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Submission not found" }, { status: 404 });
    }

    revalidatePath("/admin/partnerships");
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[api/admin/partnerships/[id]/read] POST error:", error);
    return NextResponse.json({ error: "Failed to update read status" }, { status: 500 });
  }
}
