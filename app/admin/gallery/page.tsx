import type { Metadata } from "next";
import { getDbSafe } from "@/lib/mongo";
import GalleryManager from "@/components/admin/GalleryManager";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export const metadata: Metadata = {
  title: "Admin — Gallery",
  robots: "noindex, nofollow",
};

async function getGalleryPhotos() {
  const safe = await getDbSafe();
  if (safe.error) {
    console.error("[admin gallery] mongo error:", safe.error.message);
    return [];
  }
  const db = safe.db!;
  return (await db
    .collection("gallery")
    .find({})
    .sort({ createdAt: -1 })
    .toArray()) as Array<{
    _id: import("mongodb").ObjectId;
    imageUrl: string;
    caption: string;
    createdAt: Date;
  }>;
}

export default async function AdminGalleryPage() {
  const photos = await getGalleryPhotos();

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      <div className="container-wide py-12">
        <div className="mb-10">
          <a href="/admin" className="text-sm text-[var(--color-primary)] hover:underline">
            ← Back to dashboard
          </a>
          <h1 className="mt-2 text-3xl font-black text-[var(--color-text)]">
            Photo Gallery
          </h1>
          <p className="mt-1 text-sm text-[var(--color-text-muted)]">
            {photos.length} photo{photos.length !== 1 ? "s" : ""} — upload, caption, and manage your site gallery
          </p>
        </div>

        <GalleryManager photos={photos} />
      </div>
    </div>
  );
}
