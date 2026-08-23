import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongo";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const db = await getDb();
    const count = await db.collection("projects").countDocuments();
    return NextResponse.json({ ok: true, db: db.databaseName, projects: count });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: (error as Error).message, code: (error as Error).constructor.name },
      { status: 500 },
    );
  }
}
