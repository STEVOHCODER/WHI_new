import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongo";
import { revalidatePath } from "next/cache";
import { ObjectId } from "mongodb";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * PUT /api/admin/partners/[id]
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const form = await request.formData();

    const name = (form.get("name") as string) || undefined;
    const category = (form.get("category") as string) || undefined;
    const website = (form.get("website") as string) || undefined;
    const isActiveVal = form.get("isActive") as string;

    const update: Record<string, unknown> = { updatedAt: new Date() };
    if (name !== undefined) update.name = name;
    if (category !== undefined) update.category = category;
    if (website !== undefined) update.website = website;
    if (isActiveVal !== undefined) update.isActive = isActiveVal === "on" || isActiveVal === "true";

    const db = await getDb();
    const result = await db.collection("partners").updateOne(
      { _id: new ObjectId(id) },
      { $set: update },
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Partner not found" }, { status: 404 });
    }

    revalidatePath("/");
    revalidatePath("/admin/partners");
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[api/admin/partners/[id]] PUT error:", error);
    return NextResponse.json({ error: "Failed to update partner", details: (error as Error).message }, { status: 500 });
  }
}

/**
 * DELETE /api/admin/partners/[id]
 */
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const db = await getDb();
    const result = await db.collection("partners").deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Partner not found" }, { status: 404 });
    }

    revalidatePath("/");
    revalidatePath("/admin/partners");
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[api/admin/partners/[id]] DELETE error:", error);
    return NextResponse.json({ error: "Failed to delete partner", details: (error as Error).message }, { status: 500 });
  }
}
