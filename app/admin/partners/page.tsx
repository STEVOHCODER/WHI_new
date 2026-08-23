import type { Metadata } from "next";
import { getDbSafe } from "@/lib/mongo";
import PartnersManager from "@/components/admin/PartnersManager";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export const metadata: Metadata = {
  title: "Admin — Partners & Sponsors",
  robots: "noindex, nofollow",
};

async function getPartners() {
  const safe = await getDbSafe();
  if (safe.error) {
    console.error("[admin partners] mongo error:", safe.error.message);
    return [];
  }
  const db = safe.db!;
  return (await db
    .collection("partners")
    .find({})
    .sort({ createdAt: -1 })
    .toArray()) as Array<{
    _id: import("mongodb").ObjectId;
    name: string;
    category: string;
    logoUrl: string | null;
    website: string | null;
    isActive: boolean;
    createdAt: Date;
  }>;
}

export default async function AdminPartnersPage() {
  const partners = await getPartners();

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      <div className="container-wide py-12">
        <div className="mb-10">
          <a href="/admin" className="text-sm text-[var(--color-primary)] hover:underline">
            ← Back to dashboard
          </a>
          <h1 className="mt-2 text-3xl font-black text-[var(--color-text)]">
            Partners & Sponsors
          </h1>
          <p className="mt-1 text-sm text-[var(--color-text-muted)]">
            {partners.length} partner{partners.length !== 1 ? "s" : ""} managed
          </p>
        </div>

        <PartnersManager partners={partners} />
      </div>
    </div>
  );
}
