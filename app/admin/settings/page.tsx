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
        <div className="mb-10">
          <h1 className="text-3xl font-black text-[var(--color-text)]">Settings</h1>
          <p className="mt-1 text-sm text-[var(--color-text-muted)]">
            Configure site-wide settings and email preferences.
          </p>
        </div>

        <div className="rounded-2xl border border-[var(--color-border)] bg-white p-8 text-center">
          <p className="text-sm text-[var(--color-text-muted)]">
            Settings are managed via environment variables. See <code className="rounded bg-[var(--color-bg-section)] px-1 py-0.5 text-xs">.env.local</code> and <code className="rounded bg-[var(--color-bg-section)] px-1 py-0.5 text-xs">vercel.json</code>.
          </p>
        </div>
      </div>
    </div>
  );
}
