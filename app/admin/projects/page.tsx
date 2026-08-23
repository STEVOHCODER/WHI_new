import type { Metadata } from "next";
import { getDb } from "@/lib/mongo";
import { ObjectId } from "mongodb";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export const metadata: Metadata = {
  title: "Admin — Projects",
  robots: "noindex, nofollow",
};

async function getProjects() {
  const db = await getDb();
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
    createdAt: Date;
  }>;
}

export default async function AdminProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      <div className="container-wide py-12">
        <div className="flex items-center justify-between mb-10">
          <div>
            <a href="/" className="text-sm text-[var(--color-primary)] hover:underline">
              ← Back to site
            </a>
            <h1 className="mt-2 text-3xl font-black text-[var(--color-text)]">
              Projects Admin
            </h1>
            <p className="mt-1 text-sm text-[var(--color-text-muted)]">
              {projects.length} project{projects.length !== 1 ? "s" : ""}
            </p>
          </div>
          <AddProjectModal />
        </div>

        {projects.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-[var(--color-border)] bg-white px-8 py-16 text-center">
            <p className="text-sm text-[var(--color-text-muted)]">
              No projects yet. Click &quot;Add Project&quot; to get started.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {projects.map((project) => (
              <ProjectRow key={String(project._id)} project={project} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function AddProjectModal() {
  return (
    <details className="rounded-2xl border border-[var(--color-border)] bg-white p-6">
      <summary className="cursor-pointer font-bold text-[var(--color-primary)]">
        + Add New Project
      </summary>
      <form action="/api/admin/projects" method="POST" className="mt-6 space-y-4">
        <input name="title" placeholder="Project title" required
          className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3 text-sm focus:border-[var(--color-primary)] focus:outline-none"
        />
        <textarea name="excerpt" placeholder="Short excerpt (shown in cards)" required rows={2}
          className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3 text-sm focus:border-[var(--color-primary)] focus:outline-none"
        />
        <div className="grid grid-cols-2 gap-4">
          <input name="category" placeholder="Category (e.g. Health)" required
            className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3 text-sm focus:border-[var(--color-primary)] focus:outline-none"
          />
          <select name="status"
            className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3 text-sm focus:border-[var(--color-primary)] focus:outline-none"
          >
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="archived">Archived</option>
          </select>
        </div>
        <input name="location" placeholder="Location (e.g. Bo District, Sierra Leone)"
          className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3 text-sm focus:border-[var(--color-primary)] focus:outline-none"
        />
        <input name="imageUrl" placeholder="Hero image URL (e.g. /images/whi-photo-gallery/image1.jpg)"
          className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3 text-sm focus:border-[var(--color-primary)] focus:outline-none"
        />
        <textarea name="content" placeholder="Full content (HTML supported)" rows={5}
          className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3 text-sm focus:border-[var(--color-primary)] focus:outline-none"
        />
        <input name="tags" placeholder="Tags (comma-separated, e.g. health, youth, Bo District)"
          className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3 text-sm focus:border-[var(--color-primary)] focus:outline-none"
        />
        <button
          type="submit"
          className="w-full rounded-xl py-3 font-bold text-white transition-all hover:opacity-90"
          style={{ backgroundColor: "var(--color-primary)" }}
        >
          Create Project
        </button>
      </form>
    </details>
  );
}

async function ProjectRow({
  project,
}: {
  project: {
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
    createdAt: Date;
  };
}) {
  const startYear = project.startDate ? new Date(project.startDate).getFullYear() : "—";
  const endYear = project.endDate ? new Date(project.endDate).getFullYear() : "—";

  const impact = project.impact as Record<string, unknown> | null;
  const beneficiaries = impact?.beneficiaries ? Number(impact.beneficiaries).toLocaleString() : "—";

  return (
    <div
      className={`rounded-2xl border bg-white p-6 transition-all ${
        project.isActive
          ? "border-[var(--color-border)] shadow-sm"
          : "border-dashed border-[var(--color-border)] opacity-60"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 flex-wrap">
            <h3 className="text-base font-black text-[var(--color-text)]">
              {project.title}
            </h3>
            <StatusBadge status={project.status} />
            {!project.isActive && (
              <span className="rounded-full bg-gray-200 px-2.5 py-0.5 text-[10px] font-bold uppercase text-gray-500">
                Inactive
              </span>
            )}
          </div>
          <p className="mt-1 text-sm text-[var(--color-text-muted)] line-clamp-1">
            {project.excerpt}
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-4 text-[11px] text-[var(--color-text-light)]">
            <span>📂 {project.category}</span>
            <span>📅 {startYear}–{endYear}</span>
            <span>👥 {beneficiaries} beneficiaries</span>
            {project.tags && project.tags.length > 0 && (
              <span className="flex flex-wrap gap-1">
                {project.tags.slice(0, 3).map((t) => (
                  <span key={t} className="rounded-full bg-[var(--color-bg-section)] px-2 py-0.5">
                    {t}
                  </span>
                ))}
              </span>
            )}
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <EditProjectForm project={project} />
          <DeleteProjectButton projectId={String(project._id)} />
          <a
            href={`/projects/${project.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border border-[var(--color-border)] px-3 py-2 text-xs font-bold text-[var(--color-text-muted)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors"
          >
            View
          </a>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    active: "bg-green-100 text-green-700",
    completed: "bg-blue-100 text-blue-700",
    archived: "bg-gray-100 text-gray-500",
  };
  return (
    <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${styles[status] ?? styles.active}`}>
      {status}
    </span>
  );
}

function EditProjectForm({
  project,
}: {
  project: { _id: ObjectId; title: string; slug: string; excerpt: string; status: string; category: string; isActive: boolean };
}) {
  return (
    <details className="rounded-xl border border-[var(--color-border)]">
      <summary className="cursor-pointer px-3 py-2 text-xs font-bold text-[var(--color-text-muted)] hover:text-[var(--color-primary)]">
        Edit
      </summary>
      <form action={`/api/admin/projects/${String(project._id)}`} method="POST" className="p-4 space-y-3 border-t border-[var(--color-border)]">
        <input type="hidden" name="_method" value="PUT" />
        <input name="title" defaultValue={project.title} placeholder="Title" required
          className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-sm"
        />
        <input name="excerpt" defaultValue={project.excerpt} placeholder="Excerpt" required
          className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-sm"
        />
        <div className="grid grid-cols-2 gap-3">
          <input name="category" defaultValue={project.category} placeholder="Category"
            className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-sm"
          />
          <select name="status" defaultValue={project.status}
            className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-sm"
          >
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="archived">Archived</option>
          </select>
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input name="isActive" type="checkbox" defaultChecked={project.isActive}
            className="h-4 w-4 rounded border-[var(--color-border)]"
          />
          Visible on website
        </label>
        <button
          type="submit"
          className="w-full rounded-lg py-2 text-sm font-bold text-white"
          style={{ backgroundColor: "var(--color-primary)" }}
        >
          Save Changes
        </button>
      </form>
    </details>
  );
}

function DeleteProjectButton({ projectId }: { projectId: string }) {
  return (
    <form action={`/api/admin/projects/${projectId}`} method="POST" className="inline">
      <input type="hidden" name="_method" value="DELETE" />
      <button
        type="submit"
        className="rounded-xl border border-red-200 px-3 py-2 text-xs font-bold text-red-500 hover:bg-red-50 transition-colors"
      >
        Delete
      </button>
    </form>
  );
}
