import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/**
 * POST /api/admin/projects
 * Body (multipart for the form in admin page):
 *   title, excerpt, category, status, location, imageUrl, content
 */
export async function POST(request: NextRequest) {
  const form = await request.formData();
  const title = form.get("title") as string;
  const excerpt = form.get("excerpt") as string;
  const category = form.get("category") as string;
  const status = (form.get("status") as "active" | "completed" | "archived") || "active";
  const location = form.get("location") as string || null;
  const imageUrl = form.get("imageUrl") as string || null;
  const content = form.get("content") as string || null;

  if (!title || !excerpt || !category) {
    return NextResponse.json({ error: "Title, excerpt, and category are required" }, { status: 400 });
  }

  const project = await prisma.project.create({
    data: {
      title,
      slug: slugify(title),
      excerpt,
      category,
      status,
      location,
      imageUrl,
      content,
      isActive: true,
      tags: "[]",
    },
  });

  revalidatePath("/projects");
  return NextResponse.json({ project }, { status: 201 });
}
