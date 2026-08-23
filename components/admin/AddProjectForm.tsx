"use client";

import { useState } from "react";
import { Loader2, Upload, X } from "@/components/ui/icons";

export default function AddProjectForm() {
  const [open, setOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [galleryUrls, setGalleryUrls] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const uploadFile = async (file: File, isThumbnail: boolean) => {
    setUploading(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("file", file);
      if (isThumbnail) formData.append("isThumbnail", "true");
      const res = await fetch("/api/admin/projects/upload", {
        method: "POST",
        body: formData,
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Upload failed");
      if (isThumbnail) {
        setThumbnailUrl(json.url);
      } else {
        setGalleryUrls((prev) => [...prev, json.url]);
      }
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    const form = e.currentTarget;
    const formData = new FormData(form);
    if (thumbnailUrl) formData.append("imageUrl", thumbnailUrl);
    if (galleryUrls.length > 0) formData.append("gallery", JSON.stringify(galleryUrls));

    const res = await fetch("/api/admin/projects", {
      method: "POST",
      body: formData,
    });
    const json = await res.json();
    if (!res.ok) {
      setError(json.error || "Failed to create project");
      return;
    }
    setSuccess(true);
    form.reset();
    setThumbnailUrl("");
    setGalleryUrls([]);
    setTimeout(() => setOpen(false), 800);
  };

  return (
    <details open={open} onToggle={(e) => setOpen((e.target as HTMLDetailsElement).open)}>
      <summary className="cursor-pointer rounded-2xl border-2 border-dashed border-[var(--color-border)] bg-white px-5 py-3 text-sm font-bold text-[var(--color-primary)] hover:border-[var(--color-primary)] transition-colors">
        + Add New Project
      </summary>
      <div className="mt-4 rounded-2xl border border-[var(--color-border)] bg-white p-6">
        {success ? (
          <div className="rounded-xl bg-green-50 p-4 text-center">
            <p className="text-sm font-bold text-green-700">✓ Project created successfully!</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Project Title *" id="title">
                <input name="title" required placeholder="e.g. Youth Digital Skills Academy"
                  className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3 text-sm focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20"
                />
              </Field>
              <Field label="Category *" id="category">
                <input name="category" required placeholder="e.g. Education, Health"
                  className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3 text-sm focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20"
                />
              </Field>
            </div>

            <Field label="Short Excerpt *" id="excerpt">
              <textarea name="excerpt" required rows={2} placeholder="Brief description shown on project cards…"
                className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3 text-sm focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20"
              />
            </Field>

            <Field label="Full Content (HTML)" id="content">
              <textarea name="content" rows={5} placeholder="<p>Full project description with HTML support…</p>"
                className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3 text-sm focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 font-mono"
              />
            </Field>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Location" id="location">
                <input name="location" placeholder="e.g. Bo District, Sierra Leone"
                  className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3 text-sm focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20"
                />
              </Field>
              <Field label="Status" id="status">
                <select name="status" defaultValue="active"
                  className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3 text-sm focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20"
                >
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                  <option value="archived">Archived</option>
                </select>
              </Field>
            </div>

            <Field label="Tags (comma-separated)" id="tags">
              <input name="tags" placeholder="youth, education, Bo District"
                className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3 text-sm focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20"
              />
            </Field>

            {/* Thumbnail Upload */}
            <div className="rounded-xl border border-[var(--color-border)] p-4">
              <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[var(--color-text-light)]">
                Thumbnail Image
              </p>
              {thumbnailUrl ? (
                <div className="relative inline-block">
                  <img src={thumbnailUrl} alt="Thumbnail preview" className="h-32 w-48 object-cover rounded-lg border" />
                  <button
                    type="button"
                    onClick={() => setThumbnailUrl("")}
                    className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600"
                  >
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <label className="flex cursor-pointer flex-col items-center gap-2 rounded-xl border-2 border-dashed border-[var(--color-border)] px-6 py-6 transition-colors hover:border-[var(--color-primary)]">
                  <Upload size={24} className="text-[var(--color-text-light)]" />
                  <span className="text-sm text-[var(--color-text-muted)]">
                    {uploading ? "Uploading…" : "Click to upload thumbnail (JPG, PNG, WebP)"}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) uploadFile(file, true);
                    }}
                    disabled={uploading}
                  />
                </label>
              )}
            </div>

            {/* Gallery Upload */}
            <div className="rounded-xl border border-[var(--color-border)] p-4">
              <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[var(--color-text-light)]">
                Project Gallery
              </p>
              {galleryUrls.length > 0 && (
                <div className="mb-3 flex flex-wrap gap-2">
                  {galleryUrls.map((url, i) => (
                    <div key={i} className="relative">
                      <img src={url} alt={`Gallery ${i + 1}`} className="h-20 w-28 object-cover rounded-lg border" />
                      <button
                        type="button"
                        onClick={() => setGalleryUrls((prev) => prev.filter((_, idx) => idx !== i))}
                        className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <label className="flex cursor-pointer flex-col items-center gap-2 rounded-xl border-2 border-dashed border-[var(--color-border)] px-6 py-4 transition-colors hover:border-[var(--color-primary)]">
                <Upload size={20} className="text-[var(--color-text-light)]" />
                <span className="text-sm text-[var(--color-text-muted)]">
                  {uploading ? "Uploading…" : "Add gallery photos"}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  multiple
                  onChange={(e) => {
                    Array.from(e.target.files || []).forEach((file) => uploadFile(file, false));
                    e.target.value = "";
                  }}
                  disabled={uploading}
                />
              </label>
            </div>

            {error && (
              <p className="text-sm text-red-600" role="alert">{error}</p>
            )}

            <button
              type="submit"
              disabled={uploading}
              className="w-full rounded-xl py-3 font-bold text-white transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
              style={{ backgroundColor: "var(--color-primary)" }}
            >
              {uploading ? (
                <span className="inline-flex items-center gap-2">
                  <Loader2 size={16} className="animate-spin" />
                  Uploading…
                </span>
              ) : (
                "Create Project"
              )}
            </button>
          </form>
        )}
      </div>
    </details>
  );
}

function Field({
  label,
  id,
  children,
}: {
  label: string;
  id: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--color-text-light)]">
        {label}
      </label>
      {children}
    </div>
  );
}
