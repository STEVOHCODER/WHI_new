import type { Metadata } from "next";
import { getDbSafe } from "@/lib/mongo";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  robots: "noindex, nofollow",
};

async function getAdminEmail() {
  return null;
}

export default async function AdminPage() {
  const safe = await getDbSafe();
  const projectCount = safe.db
    ? await safe.db.collection("projects").countDocuments()
    : 0;
  const partnerCount = safe.db
    ? await safe.db.collection("partners").countDocuments()
    : 0;
  const contactCount = safe.db
    ? await safe.db.collection("contacts").countDocuments()
    : 0;
  const vacancyCount = safe.db
    ? await safe.db.collection("vacancies").countDocuments()
    : 0;
  const partnershipCount = safe.db
    ? await safe.db.collection("partnerships").countDocuments()
    : 0;

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      <div className="container-wide py-12">
        <div className="mb-10">
          <h1 className="text-3xl font-black text-[var(--color-text)]">
            Admin Dashboard
          </h1>
          <p className="mt-2 text-sm text-[var(--color-text-muted)]">
            Manage your site content — projects, partners, vacancies, and form submissions.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          <DashboardCard href="/admin/projects" title="Projects" count={projectCount} color="emerald" />
          <DashboardCard href="/admin/partners" title="Partners" count={partnerCount} color="rose" />
          <DashboardCard href="/admin/vacancies" title="Vacancies" count={vacancyCount} color="blue" />
          <DashboardCard href="/admin/contacts" title="Contacts" count={contactCount} color="amber" />
          <DashboardCard href="/admin/partnerships" title="Enquiries" count={partnershipCount} color="purple" />
          <DashboardCard href="/admin/settings" title="Settings" count={0} color="slate" />
          <DashboardCard href="/" title="View Site" count={0} color="indigo" external />
        </div>
      </div>
    </div>
  );
}

function DashboardCard({
  href,
  title,
  count,
  color,
  external,
}: {
  href: string;
  title: string;
  count: number;
  color: string;
  external?: boolean;
}) {
  const colorMap: Record<string, string> = {
    emerald: "from-emerald-500 to-teal-600",
    rose: "from-rose-500 to-pink-600",
    blue: "from-blue-500 to-indigo-600",
    amber: "from-amber-500 to-orange-600",
    purple: "from-purple-500 to-violet-600",
    slate: "from-slate-500 to-gray-600",
    indigo: "from-indigo-500 to-blue-600",
  };

  const iconMap: Record<string, string> = {
    emerald: "📁",
    rose: "💝",
    blue: "💼",
    amber: "✉️",
    purple: "🤝",
    slate: "⚙️",
    indigo: "🌐",
  };

  const Icon = iconMap[color] || "📁";
  const gradient = colorMap[color] || colorMap.emerald;

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group block rounded-2xl border border-[var(--color-border)] bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
      >
        <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl text-xl bg-gradient-to-br ${gradient} text-white shadow-md`}>
          {Icon}
        </div>
        <h2 className="mt-3 text-sm font-black text-[var(--color-text)] group-hover:text-[var(--color-primary)] transition-colors">
          {title}
        </h2>
        <p className="mt-1 text-xs text-[var(--color-text-muted)]">Open in new tab</p>
      </a>
    );
  }

  return (
    <a
      href={href}
      className="group block rounded-2xl border border-[var(--color-border)] bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="flex items-center justify-between">
        <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl text-xl bg-gradient-to-br ${gradient} text-white shadow-md`}>
          {Icon}
        </div>
        {count > 0 && (
          <span className="rounded-full bg-[var(--color-bg-section)] px-2 py-0.5 text-xs font-bold text-[var(--color-text-muted)]">
            {count}
          </span>
        )}
      </div>
      <h2 className="mt-3 text-sm font-black text-[var(--color-text)] group-hover:text-[var(--color-primary)] transition-colors">
        {title}
      </h2>
      <p className="mt-1 text-xs text-[var(--color-text-muted)]">
        {count > 0 ? `${count} item${count !== 1 ? "s" : ""}` : "Manage"}
      </p>
    </a>
  );
}
