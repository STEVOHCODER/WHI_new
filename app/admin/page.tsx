import type { Metadata } from "next";
import Link from "next/link";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  robots: "noindex, nofollow",
};

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      <div className="container-wide py-16">
        <a href="/" className="text-sm text-[var(--color-primary)] hover:underline">
          ← Back to site
        </a>
        <h1 className="mt-3 text-3xl font-black text-[var(--color-text)]">
          Admin Dashboard
        </h1>
        <p className="mt-2 text-sm text-[var(--color-text-muted)]">
          Manage your site content — projects, vacancies, and form submissions.
        </p>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AdminCard
            href="/admin/projects"
            title="Projects"
            description="Add, edit, or remove projects. Manage status, images, and content."
            icon="📁"
            color="from-emerald-500 to-teal-600"
          />
          <AdminCard
            href="/admin/vacancies"
            title="Vacancies"
            description="Manage open positions, volunteer roles, and internship listings."
            icon="💼"
            color="from-blue-500 to-indigo-600"
          />
          <AdminCard
            href="/admin/contacts"
            title="Contact Submissions"
            description="View and manage contact form submissions from visitors."
            icon="✉️"
            color="from-amber-500 to-orange-600"
          />
          <AdminCard
            href="/admin/partnerships"
            title="Partnership Enquiries"
            description="Review partnership and collaboration requests."
            icon="🤝"
            color="from-rose-500 to-pink-600"
          />
          <AdminCard
            href="/admin/settings"
            title="Settings"
            description="Configure site-wide settings and email preferences."
            icon="⚙️"
            color="from-slate-500 to-gray-600"
          />
          <AdminCard
            href="/"
            title="View Site"
            description="Preview your site as visitors see it."
            icon="🌐"
            color="from-purple-500 to-violet-600"
          />
        </div>
      </div>
    </div>
  );
}

function AdminCard({
  href,
  title,
  description,
  icon,
  color,
}: {
  href: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}) {
  return (
    <Link
      href={href}
      className="group block rounded-2xl border border-[var(--color-border)] bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
    >
      <div
        className={`inline-flex h-12 w-12 items-center justify-center rounded-xl text-2xl bg-gradient-to-br ${color} text-white shadow-md`}
      >
        {icon}
      </div>
      <h2 className="mt-4 text-lg font-black text-[var(--color-text)] group-hover:text-[var(--color-primary)] transition-colors">
        {title}
      </h2>
      <p className="mt-2 text-sm text-[var(--color-text-muted)] leading-relaxed">
        {description}
      </p>
      <div className="mt-4 text-sm font-bold text-[var(--color-primary)] opacity-0 group-hover:opacity-100 transition-opacity">
        Manage →
      </div>
    </Link>
  );
}
