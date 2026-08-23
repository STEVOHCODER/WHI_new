import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export const metadata: Metadata = {
  title: "Admin — Settings",
  robots: "noindex, nofollow",
};

export default function AdminSettingsPage() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      <div className="container-wide py-12">
        <a href="/admin" className="text-sm text-[var(--color-primary)] hover:underline">
          ← Back to dashboard
        </a>
        <h1 className="mt-3 text-3xl font-black text-[var(--color-text)]">
          Settings
        </h1>
        <p className="mt-2 text-sm text-[var(--color-text-muted)]">
          Environment configuration is managed through the Vercel dashboard.
        </p>

        <div className="mt-10 space-y-6">
          <SettingsSection
            title="Email Configuration"
            description="Configure email delivery for contact and partnership forms."
            envVars={[
              { name: "SMTP_HOST", value: "smtp.gmail.com", note: "Gmail SMTP server" },
              { name: "SMTP_PORT", value: "587", note: "TLS port for Gmail" },
              { name: "SMTP_USER", value: "mayintake351@gmail.com", note: "Gmail account email" },
              { name: "SMTP_PASS", value: "••••••••••••", note: "Gmail App Password (16 chars)" },
              { name: "CONTACT_EMAIL", value: "mayintake351@gmail.com", note: "Where form submissions are sent" },
            ]}
            editUrl="https://vercel.com/wihi-new/settings/environment-variables"
          />

          <SettingsSection
            title="Database"
            description="MongoDB Atlas connection for projects, vacancies, and form submissions."
            envVars={[
              { name: "MONGODB_URI", value: "mongodb+srv://…", note: "Atlas connection string" },
              { name: "MONGODB_DB", value: "whi_sl", note: "Database name" },
            ]}
            editUrl="https://vercel.com/wihi-new/settings/environment-variables"
          />
        </div>

        <div className="mt-10 rounded-2xl border border-dashed border-[var(--color-border)] bg-white p-6">
          <h2 className="text-base font-black text-[var(--color-text)]">Quick Links</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            <a
              href="https://vercel.com/wihi-new/settings/environment-variables"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-[var(--color-border)] px-4 py-2 text-sm font-bold text-[var(--color-primary)] hover:bg-[var(--color-bg-section)] transition-colors"
            >
              Edit Env Vars →
            </a>
            <a
              href="https://cloud.mongodb.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-[var(--color-border)] px-4 py-2 text-sm font-bold text-[var(--color-text-muted)] hover:bg-[var(--color-bg-section)] transition-colors"
            >
              MongoDB Atlas →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function SettingsSection({
  title,
  description,
  envVars,
  editUrl,
}: {
  title: string;
  description: string;
  envVars: { name: string; value: string; note: string }[];
  editUrl: string;
}) {
  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-white p-6">
      <h2 className="text-base font-black text-[var(--color-text)]">{title}</h2>
      <p className="mt-1 text-sm text-[var(--color-text-muted)]">{description}</p>
      <div className="mt-5 space-y-3">
        {envVars.map((env) => (
          <div key={env.name} className="flex items-start justify-between gap-4 rounded-xl bg-[var(--color-bg-section)] px-4 py-3">
            <div>
              <span className="text-sm font-mono font-bold text-[var(--color-text)]">{env.name}</span>
              <span className="ml-3 text-sm text-[var(--color-text-muted)]">{env.note}</span>
            </div>
            <span className="text-sm font-mono text-[var(--color-text-muted)] shrink-0">{env.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
