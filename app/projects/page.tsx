import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getDb, getDbSafe } from "@/lib/mongo";
import PageHero from "@/components/sections/PageHero";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { ArrowRight } from "@/components/ui/icons";

function isDataUrl(url: unknown): boolean {
  return typeof url === "string" && url.startsWith("data:image/");
}

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export const metadata: Metadata = {
  title: "Our Projects",
  description:
    "Explore WHI-SL projects making real impact across Sierra Leone — from health outreach to climate resilience and youth empowerment.",
};

const CATEGORIES = ["All", "Health", "Gender", "Empowerment", "Community", "Environment", "Rights"];

async function getProjects() {
  const safe = await getDbSafe();
  if (safe.error) {
    console.error("[projects] mongo error:", safe.error.message);
    return [];
  }
  const db = safe.db!;
  const projects = await db
    .collection("projects")
    .find({ isActive: true })
    .sort({ createdAt: -1 })
    .toArray();
  return projects as Array<{
    _id: import("mongodb").ObjectId;
    title: string;
    slug: string;
    excerpt: string;
    imageUrl: string | null;
    status: string;
    category: string;
    location: string | null;
    startDate: string | null;
    endDate: string | null;
    impact: Record<string, unknown> | null;
    tags: string[] | null;
  }>;
}

export default async function ProjectsPage() {
  const allProjects = await getProjects();

  return (
    <>
      <PageHero
        image="/images/hero-projects.jpg"
        imageAlt="Projects hero"
        eyebrow="Our Work"
        title="Projects"
        subtitle="Real change, grounded in community. Explore the projects that are transforming lives across Sierra Leone."
      />

      <section className="section-padding surface-white">
        <div className="container-wide">
          {/* Category filters */}
          <div className="flex flex-wrap gap-2 mb-10" role="group" aria-label="Filter projects">
            {CATEGORIES.map((cat) => (
              <FilterChip key={cat} label={cat} />
            ))}
          </div>

          {/* Projects grid */}
          {allProjects.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-[var(--color-border)] bg-[var(--color-bg-section)] px-8 py-16 text-center">
              <p className="text-sm text-[var(--color-text-muted)]">
                No projects yet. Check back soon.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {allProjects.map((project, i) => (
                <AnimatedSection key={String(project._id)} delay={i * 80}>
                  <ProjectCard project={project} />
                </AnimatedSection>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function FilterChip({ label }: { label: string }) {
  return (
    <button
      type="button"
      className="rounded-full border border-[var(--color-border)] bg-white px-5 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-text-muted)] transition-all hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
    >
      {label}
    </button>
  );
}

function ProjectCard({
  project,
}: {
  project: {
    _id: import("mongodb").ObjectId;
    title: string;
    slug: string;
    excerpt: string;
    imageUrl: string | null;
    status: string;
    category: string;
    location: string | null;
    startDate: string | null;
    endDate: string | null;
    impact: Record<string, unknown> | null;
    tags: string[] | null;
  };
}) {
  const statusColor =
    project.status === "active"
      ? "bg-green-600"
      : project.status === "completed"
        ? "bg-blue-600"
        : "bg-gray-400";

  const startYear = project.startDate ? new Date(project.startDate).getFullYear() : null;
  const endYear = project.endDate ? new Date(project.endDate).getFullYear() : null;
  const dateRange = startYear ? (endYear ? `${startYear}–${endYear}` : `${startYear}–present`) : "";

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block rounded-2xl overflow-hidden bg-white border border-[var(--color-border)] hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
    >
      <div className="relative h-52 overflow-hidden">
        {project.imageUrl ? (
          isDataUrl(project.imageUrl) ? (
            <img
              src={project.imageUrl}
              alt={project.title}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              draggable={false}
            />
          ) : (
            <Image
              src={project.imageUrl}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width:768px) 100vw, (max-width:1024px) 50vw, 33vw"
              draggable={false}
            />
          )
        ) : (
          <div
            className="h-full w-full flex items-center justify-center"
            style={{ backgroundColor: "var(--color-bg-section)" }}
          >
            <span className="text-5xl opacity-20">📁</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white ${statusColor}`}>
          {project.status}
        </span>
        <span className="absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white bg-black/40 backdrop-blur-sm">
          {project.category}
        </span>
      </div>

      <div className="p-6">
        <h2 className="text-base font-black text-[var(--color-text)] leading-tight group-hover:text-[var(--color-primary)] transition-colors line-clamp-2">
          {project.title}
        </h2>
        <p className="mt-2 text-sm text-[var(--color-text-muted)] leading-relaxed line-clamp-3">
          {project.excerpt}
        </p>

        <div className="mt-4 flex items-center gap-3 text-[11px] text-[var(--color-text-light)]">
          {project.location && (
            <span className="flex items-center gap-1">📍 {project.location}</span>
          )}
          {dateRange && <span>📅 {dateRange}</span>}
        </div>

        {project.tags && project.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-[var(--color-bg-section)] px-2.5 py-0.5 text-[10px] font-semibold text-[var(--color-text-light)]"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-[var(--color-primary)] group-hover:gap-3 transition-all">
          <span>View Project</span>
          <ArrowRight size={14} />
        </div>
      </div>
    </Link>
  );
}
