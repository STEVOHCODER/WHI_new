import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/mongo";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const status = searchParams.get("status");
  const search = searchParams.get("search");

  const where: Record<string, unknown> = { isActive: true };
  if (category) where.category = category;
  if (status) where.status = status;
  if (search) {
    where.$or = [
      { title: { $regex: search, $options: "i" } },
      { excerpt: { $regex: search, $options: "i" } },
      { tags: { $in: [new RegExp(search, "i")] } },
    ];
  }

  const projects = await db
    .collection("projects")
    .find(where)
    .sort({ createdAt: -1 })
    .toArray();

  return NextResponse.json({ projects });
}
