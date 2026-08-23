import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongo";
import { revalidatePath } from "next/cache";
import { ObjectId } from "mongodb";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * PUT /api/admin/vacancies/[id]
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const form = await request.formData();

    const title = (form.get("title") as string) || undefined;
    const department = (form.get("department") as string) || undefined;
    const location = (form.get("location") as string) || undefined;
    const type = (form.get("type") as string) || undefined;
    const deadline = (form.get("deadline") as string) || undefined;
    const href = (form.get("href") as string) || undefined;
    const isActiveVal = form.get("isActive") as string;

    const update: Record<string, unknown> = { updatedAt: new Date() };
    if (title !== undefined) update.title = title;
    if (department !== undefined) update.department = department;
    if (location !== undefined) update.location = location;
    if (type !== undefined) update.type = type;
    if (deadline !== undefined) update.deadline = deadline;
    if (href !== undefined) update.href = href;
    if (isActiveVal !== undefined) update.isActive = isActiveVal === "on" || isActiveVal === "true";

    const db = await getDb();
    const result = await db.collection("vacancies").updateOne(
      { _id: new ObjectId(id) },
      { $set: update },
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Vacancy not found" }, { status: 404 });
    }

    revalidatePath("/work-with-us");
    revalidatePath("/admin/vacancies");
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[api/admin/vacancies/[id]] PUT error:", error);
    return NextResponse.json({ error: "Failed to update vacancy", details: (error as Error).message }, { status: 500 });
  }
}

/**
 * DELETE /api/admin/vacancies/[id]
 */
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const db = await getDb();
    const result = await db.collection("vacancies").deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Vacancy not found" }, { status: 404 });
    }

    revalidatePath("/work-with-us");
    revalidatePath("/admin/vacancies");
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[api/admin/vacancies/[id]] DELETE error:", error);
    return NextResponse.json({ error: "Failed to delete vacancy", details: (error as Error).message }, { status: 500 });
  }
}
