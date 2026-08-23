import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongo";
import { revalidatePath } from "next/cache";
import { ObjectId } from "mongodb";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * POST /api/admin/vacancies
 */
export async function POST(request: NextRequest) {
  try {
    const form = await request.formData();
    const title = form.get("title") as string;
    const department = form.get("department") as string;
    const location = form.get("location") as string;
    const type = form.get("type") as string;
    const deadline = form.get("deadline") as string;
    const href = (form.get("href") as string) || null;

    if (!title || !department || !location || !type || !deadline) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const db = await getDb();
    const result = await db.collection("vacancies").insertOne({
      _id: new ObjectId(),
      title,
      department,
      location,
      type,
      deadline,
      href,
      isActive: true,
      createdAt: new Date(),
    });

    revalidatePath("/work-with-us");
    revalidatePath("/admin/vacancies");
    return NextResponse.json({ vacancy: { id: result.insertedId, title } }, { status: 201 });
  } catch (error) {
    console.error("[api/admin/vacancies] POST error:", error);
    return NextResponse.json({ error: "Failed to create vacancy", details: (error as Error).message }, { status: 500 });
  }
}
