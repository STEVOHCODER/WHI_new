import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDbSafe } from "@/lib/mongo";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { RotateCcw } from "@/components/ui/icons";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getProject(slug: string) {
  const safe = getDbSafe();
  if (safe.error) {
    console.error("[project slug] mongo error:", safe.error.message);
    return null;
  }
  const db = safe.db!;
  const project = await db.collection("projects").findOne({ slug, isActive: true });
  return project;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.title} | WHI-SL Projects`,
    description: project.excerpt,
    openGraph: {
      title: project.title,
      description: project.excerpt,
      images: project.imageUrl ? [{ url: project.imageUrl, width: 800, height: 600 }] : [],
    },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) notFound();

  const startYear = project.startDate ? new Date(project.startDate).getFullYear() : null;
  const endYear = project.endDate ? new Date(project.endDate).getFullYear() : null;
  const dateRange = startYear ? (endYear ? `${startYear}–${endYear}` : `${startYear}–present`) : "Ongoing";

  const statusColor =
    project.status === "active"
      ? "bg-green-600"
      : project.status === "completed"
        ? "bg-blue-600"
        : "bg-gray-400";

  const impact = project.impact as Record<string, unknown> | null;
  const partners = project.partners as string[] | null;
  const tags = project.tags as string[] | null;
  const gallery = project.gallery as string[] | null;
  const innovationLink = project.innovationLink as string | null;
  const contactEmail = project.contactEmail as string | null;

  return (
    <>
      {/* Hero */}
      <div className="relative h-[50vh] min-h-[320px] max-h-[560px] overflow-hidden">
        {project.imageUrl ? (
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            className="object-cover"
            sizes="100vw"
            priority
            draggable={false}
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center" style={{ backgroundColor: "var(--color-bg-section)" }}>
            <span className="text-7xl opacity-20">📁</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 container-wide pb-10">
          <AnimatedSection>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-sm font-semibold text-white/80 hover:text-white mb-4 transition-colors"
            >
              <RotateCcw size={16} /> Back to Projects
            </Link>
            <div className="flex flex-wrap items-center gap-3 mt-2">
              <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white ${statusColor}`}>
                {project.status}
              </span>
              <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white bg-black/40 backdrop-blur-sm">
                {project.category}
              </span>
              {project.location && (
                <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white bg-black/40 backdrop-blur-sm">
                  📍 {project.location}
                </span>
              )}
            </div>
            <h1 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight max-w-3xl">
              {project.title}
            </h1>
          </AnimatedSection>
        </div>
      </div>

      {/* Content */}
      <section className="section-padding surface-white">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.6fr] gap-12">
            {/* Main content */}
            <AnimatedSection>
              <div
                className="prose prose-lg max-w-none text-[var(--color-text)]"
                dangerouslySetInnerHTML={{ __html: project.content || project.excerpt }}
              />

              {/* Innovation link */}
              {innovationLink && (
                <div className="mt-6 p-4 rounded-xl bg-[var(--color-bg-section)] border border-[var(--color-border)]">
                  <p className="text-sm font-semibold text-[var(--color-text)] mb-1">Innovation Link</p>
                  <a
                    href={innovationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[var(--color-primary)] hover:underline"
                  >
                    {innovationLink}
                  </a>
                </div>
              )}

              {/* Tags */}
              {tags && tags.length > 0 && (
                <div className="mt-8 flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-[var(--color-bg-section)] px-3 py-1 text-xs font-semibold text-[var(--color-text-light)]"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </AnimatedSection>

            {/* Sidebar */}
            <AnimatedSection delay={100}>
              <div className="space-y-6">
                {/* Key facts */}
                <div className="rounded-2xl border border-[var(--color-border)] bg-white p-6 shadow-[0_12px_40px_rgba(14,24,20,0.06)]">
                  <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-text-light)] mb-5">
                    Key Facts
                  </h3>
                  <dl className="space-y-4">
                    {project.location && (
                      <div>
                        <dt className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-light)]">Location</dt>
                        <dd className="mt-1 text-sm font-semibold text-[var(--color-text)]">{project.location}</dd>
                      </div>
                    )}
                    <div>
                      <dt className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-light)]">Timeline</dt>
                      <dd className="mt-1 text-sm font-semibold text-[var(--color-text)]">{dateRange}</dd>
                    </div>
                    <div>
                      <dt className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-light)]">Category</dt>
                      <dd className="mt-1 text-sm font-semibold text-[var(--color-text)]">{project.category}</dd>
                    </div>
                  </dl>
                </div>

                {/* Impact metrics */}
                {impact && Object.keys(impact).length > 0 && (
                  <div className="rounded-2xl border border-[var(--color-border)] bg-white p-6 shadow-[0_12px_40px_rgba(14,24,20,0.06)]">
                    <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-text-light)] mb-5">
                      Impact
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      {Object.entries(impact).map(([key, value]) => (
                        <div key={key}>
                          <dt className="text-2xl font-black text-[var(--color-primary)]">
                            {typeof value === "number" ? value.toLocaleString() : String(value)}
                          </dt>
                          <dd className="mt-1 text-[11px] font-bold uppercase tracking-wider text-[var(--color-text-light)]">
                            {key.replace(/_/g, " ")}
                          </dd>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Partners */}
                {partners && partners.length > 0 && (
                  <div className="rounded-2xl border border-[var(--color-border)] bg-white p-6 shadow-[0_12px_40px_rgba(14,24,20,0.06)]">
                    <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-text-light)] mb-4">
                      Partners
                    </h3>
                    <ul className="space-y-2">
                      {partners.map((p) => (
                        <li key={p} className="text-sm text-[var(--color-text)] flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-primary)]" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Contact */}
                {contactEmail && (
                  <div className="rounded-2xl border border-[var(--color-border)] bg-white p-6 shadow-[0_12px_40px_rgba(14,24,20,0.06)]">
                    <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-text-light)] mb-3">
                      Contact
                    </h3>
                    <a
                      href={`mailto:${contactEmail}`}
                      className="text-sm text-[var(--color-primary)] hover:underline"
                    >
                      {contactEmail}
                    </a>
                  </div>
                )}

                {/* CTA */}
                <Link
                  href="/contact"
                  className="block rounded-2xl p-6 text-center font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg"
                  style={{ backgroundColor: "var(--color-primary)" }}
                >
                  Interested in this project?
                  <div className="mt-1 text-sm font-normal opacity-80">Get in touch →</div>
                </Link>
              </div>
            </AnimatedSection>
          </div>

          {/* Gallery */}
          {gallery && gallery.length > 0 && (
            <div className="mt-16">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-text-light)] mb-6">
                Gallery
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {gallery.map((img, i) => (
                  <div key={i} className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                    <Image
                      src={img}
                      alt={`${project.title} gallery image ${i + 1}`}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-105"
                      sizes="(max-width:768px) 50vw, 33vw"
                      draggable={false}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
