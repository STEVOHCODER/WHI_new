import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

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
    where.OR = [
      { title: { contains: search, mode: "insensitive" as const } },
      { excerpt: { contains: search, mode: "insensitive" as const } },
      { tags: { path: "$", contains: search } },
    ];
  }

  const projects = await prisma.project.findMany({
    where,
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      slug: true,
      excerpt: true,
      imageUrl: true,
      status: true,
      category: true,
      location: true,
      startDate: true,
      endDate: true,
      impact: true,
      partners: true,
      tags: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return NextResponse.json({ projects });
}
