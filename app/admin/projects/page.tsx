import type { Metadata } from "next";
import { getDbSafe } from "@/lib/mongo";
import { ObjectId } from "mongodb";
import AddProjectForm from "@/components/admin/AddProjectForm";
import ProjectList from "@/components/admin/ProjectList";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export const metadata: Metadata = {
  title: "Admin — Projects",
  robots: "noindex, nofollow",
};

async function getProjects() {
  const safe = await getDbSafe();
  if (safe.error) {
    console.error("[admin projects] mongo error:", safe.error.message);
    return [];
  }
  const db = safe.db!;
  return (await db.collection("projects").find({}).sort({ createdAt: -1 }).toArray()) as Array<{
    _id: ObjectId;
    title: string;
    slug: string;
    excerpt: string;
    status: string;
    category: string;
    isActive: boolean;
    startDate: string | null;
    endDate: string | null;
    impact: Record<string, unknown> | null;
    tags: string[] | null;
    imageUrl: string | null;
    location: string | null;
    content: string | null;
    gallery: string[];
    createdAt: Date;
  }>;
}

export default async function AdminProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      <div className="container-wide py-12">
        <div className="mb-10">
          <h1 className="text-3xl font-black text-[var(--color-text)]">Projects</h1>
          <p className="mt-1 text-sm text-[var(--color-text-muted)]">
            {projects.length} project{projects.length !== 1 ? "s" : ""}
          </p>
        </div>

        <div className="mb-8">
          <AddProjectForm />
        </div>

        {projects.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-[var(--color-border)] bg-white px-8 py-16 text-center">
            <p className="text-sm text-[var(--color-text-muted)]">
              No projects yet. Click &quot;Add New Project&quot; to get started.
            </p>
          </div>
        ) : (
          <ProjectList projects={projects} />
        )}
      </div>
    </div>
  );
}
