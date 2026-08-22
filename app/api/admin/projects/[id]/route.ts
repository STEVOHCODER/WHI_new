import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const form = await request.formData();

  const data: Record<string, unknown> = {};
  for (const [key, value] of form.entries()) {
    if (value !== "") data[key] = value;
  }

  // Toggle isActive as boolean
  if (data.isActive === "on") data.isActive = true;
  else if (data.isActive === "off" || data.isActive === "") data.isActive = false;

  const project = await prisma.project.update({
    where: { id },
    data,
  });

  revalidatePath("/projects");
  revalidatePath(`/projects/${project.slug}`);
  return NextResponse.json({ project });
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  await prisma.project.delete({ where: { id } });
  revalidatePath("/admin/projects");
  revalidatePath("/projects");
  return NextResponse.json({ ok: true });
}
