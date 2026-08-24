"use client";

import { useState } from "react";
import { ObjectId } from "mongodb";
import { CheckCircle2, Loader2, Pencil, Trash2, Upload, X, ImageIcon } from "@/components/ui/icons";

interface Project {
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
  imageUrl: string | null;
  location: string | null;
  content: string | null;
  gallery: string[];
  createdAt: Date;
}

export default function ProjectList({ projects }: { projects: Project[] }) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [uploadingId, setUploadingId] = useState<string | null>(null);
  const [uploadingThumbnail, setUploadingThumbnail] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const handleThumbnailUpload = async (projectId: string, file: File) => {
    setUploadingThumbnail(projectId);
    setUploadError("");
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("projectId", projectId);
      formData.append("isThumbnail", "true");
      const res = await fetch("/api/admin/projects/upload", { method: "POST", body: formData });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Upload failed");
      setSuccessMsg("Thumbnail updated!");
      window.location.reload();
    } catch (err) {
      setUploadError((err as Error).message);
    } finally {
      setUploadingThumbnail(null);
    }
  };

  const handleGalleryUpload = async (projectId: string, file: File) => {
    setUploadingId(projectId);
    setUploadError("");
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("projectId", projectId);
      formData.append("isThumbnail", "false");
      const res = await fetch("/api/admin/projects/upload", { method: "POST", body: formData });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Upload failed");
      setSuccessMsg("Photo added to gallery!");
      window.location.reload();
    } catch (err) {
      setUploadError((err as Error).message);
    } finally {
      setUploadingId(null);
    }
  };

  const handleGalleryDelete = async (projectId: string, imageUrl: string) => {
    try {
      const res = await fetch(
        `/api/admin/projects/gallery?projectId=${encodeURIComponent(projectId)}&imageUrl=${encodeURIComponent(imageUrl)}`,
        { method: "DELETE" },
      );
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to remove image");
      setSuccessMsg("Image removed from gallery!");
      window.location.reload();
    } catch (err) {
      setUploadError((err as Error).message);
    }
  };

  const handleDelete = async (projectId: string) => {
    const res = await fetch(`/api/admin/projects/${projectId}`, { method: "DELETE" });
    if (res.ok) {
      setDeleteConfirm(null);
      window.location.reload();
    }
  };

  return (
    <div className="space-y-4">
      {successMsg && (
        <div className="rounded-xl bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-700">
          {successMsg}
        </div>
      )}
      {uploadError && (
        <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
          {uploadError}
        </div>
      )}

      {projects.map((project) => (
        <ProjectRow
          key={String(project._id)}
          project={project}
          isEditing={editingId === String(project._id)}
          onEdit={() => setEditingId(editingId === String(project._id) ? null : String(project._id))}
          onCancelEdit={() => setEditingId(null)}
          uploadingId={uploadingId}
          uploadingThumbnail={uploadingThumbnail}
          onThumbnailUpload={(file) => handleThumbnailUpload(String(project._id), file)}
          onGalleryUpload={(file) => handleGalleryUpload(String(project._id), file)}
          onGalleryDelete={(imageUrl) => handleGalleryDelete(String(project._id), imageUrl)}
          showDeleteConfirm={deleteConfirm === String(project._id)}
          onConfirmDelete={() => handleDelete(String(project._id))}
          onCancelDelete={() => setDeleteConfirm(null)}
          onSetDeleteConfirm={(id) => setDeleteConfirm(id)}
        />
      ))}
    </div>
  );
}

function ProjectRow({
  project,
  isEditing,
  onEdit,
  onCancelEdit,
  uploadingId,
  uploadingThumbnail,
  onThumbnailUpload,
  onGalleryUpload,
  onGalleryDelete,
  onConfirmDelete,
  onCancelDelete,
  showDeleteConfirm,
  onSetDeleteConfirm,
}: {
  project: Project;
  isEditing: boolean;
  onEdit: () => void;
  onCancelEdit: () => void;
  uploadingId: string | null;
  uploadingThumbnail: string | null;
  onThumbnailUpload: (file: File) => void;
  onGalleryUpload: (file: File) => void;
  onGalleryDelete: (imageUrl: string) => void;
  onConfirmDelete: () => void;
  onCancelDelete: () => void;
  showDeleteConfirm: boolean;
  onSetDeleteConfirm: (id: string) => void;
}) {
  const startYear = project.startDate ? new Date(project.startDate).getFullYear() : "—";
  const endYear = project.endDate ? new Date(project.endDate).getFullYear() : "—";
  const beneficiaries = project.impact?.beneficiaries
    ? Number(project.impact.beneficiaries).toLocaleString()
    : "—";
  const [deletingGalleryUrl, setDeletingGalleryUrl] = useState<string | null>(null);

  if (isEditing) {
    return (
      <EditProjectForm
        project={project}
        onCancel={onCancelEdit}
      />
    );
  }

  return (
    <div className={`rounded-2xl border bg-white p-6 transition-all ${
      project.isActive
        ? "border-[var(--color-border)] shadow-sm"
        : "border-dashed border-[var(--color-border)] opacity-60"
    }`}>
      <div className="flex gap-5">
        {/* Thumbnail with upload overlay */}
        <div className="relative h-24 w-32 shrink-0 overflow-hidden rounded-xl">
          {project.imageUrl ? (
            <>
              <img src={project.imageUrl} alt={project.title} className="h-full w-full object-cover" />
              <label
                className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/40 opacity-0 transition-opacity hover:opacity-100"
                title="Change thumbnail"
              >
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) onThumbnailUpload(file);
                  }}
                  disabled={uploadingThumbnail === String(project._id)}
                />
                {uploadingThumbnail === String(project._id) ? (
                  <Loader2 size={20} className="animate-spin text-white" />
                ) : (
                  <Upload size={20} className="text-white" />
                )}
              </label>
            </>
          ) : (
            <label className="flex h-full w-full cursor-pointer flex-col items-center justify-center gap-1 bg-[var(--color-bg-section)] border border-[var(--color-border)]" title="Upload thumbnail">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) onThumbnailUpload(file);
                }}
                disabled={uploadingThumbnail === String(project._id)}
              />
              {uploadingThumbnail === String(project._id) ? (
                <Loader2 size={18} className="animate-spin text-[var(--color-text-light)]" />
              ) : (
                <>
                  <ImageIcon size={18} className="text-[var(--color-text-light)]" />
                  <span className="text-[9px] text-[var(--color-text-light)]">Upload</span>
                </>
              )}
            </label>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 flex-wrap">
            <h3 className="text-base font-black text-[var(--color-text)]">{project.title}</h3>
            <StatusBadge status={project.status} />
            {!project.isActive && (
              <span className="rounded-full bg-gray-200 px-2.5 py-0.5 text-[10px] font-bold uppercase text-gray-500">
                Inactive
              </span>
            )}
          </div>
          <p className="mt-1 text-sm text-[var(--color-text-muted)] line-clamp-1">{project.excerpt}</p>
          <div className="mt-3 flex flex-wrap items-center gap-4 text-[11px] text-[var(--color-text-light)]">
            <span>📂 {project.category}</span>
            <span>📅 {startYear}–{endYear}</span>
            <span>👥 {beneficiaries} beneficiaries</span>
            {project.tags && project.tags.length > 0 && (
              <span className="flex flex-wrap gap-1">
                {project.tags.slice(0, 3).map((t) => (
                  <span key={t} className="rounded-full bg-[var(--color-bg-section)] px-2 py-0.5">{t}</span>
                ))}
              </span>
            )}
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <button
            onClick={onEdit}
            className="rounded-xl border border-[var(--color-border)] px-3 py-2 text-xs font-bold text-[var(--color-text-muted)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors"
          >
            <Pencil size={14} className="inline mr-1" /> Edit
          </button>
          {showDeleteConfirm ? (
            <div className="flex gap-2">
              <button
                onClick={onConfirmDelete}
                className="rounded-xl border border-red-300 bg-red-50 px-3 py-2 text-xs font-bold text-red-600 hover:bg-red-100"
              >
                Confirm
              </button>
              <button
                onClick={onCancelDelete}
                className="rounded-xl border border-[var(--color-border)] px-3 py-2 text-xs font-bold text-[var(--color-text-muted)]"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => onSetDeleteConfirm(String(project._id))}
              className="rounded-xl border border-red-200 px-3 py-2 text-xs font-bold text-red-500 hover:bg-red-50 transition-colors"
            >
              <Trash2 size={14} className="inline mr-1" /> Delete
            </button>
          )}
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

      {/* Gallery section */}
      <div className="mt-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[11px] font-bold uppercase tracking-widest text-[var(--color-text-light)]">
            Gallery ({project.gallery?.length || 0})
          </span>
        </div>

        {project.gallery && project.gallery.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {project.gallery.map((url, i) => (
              <div key={i} className="group relative">
                <img src={url} alt="" className="h-20 w-28 rounded-lg object-cover border border-[var(--color-border)]" />
                <button
                  onClick={() => {
                    setDeletingGalleryUrl(url);
                    onGalleryDelete(url);
                  }}
                  className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white opacity-0 transition-opacity group-hover:opacity-100 hover:bg-red-600"
                  title="Remove from gallery"
                >
                  {deletingGalleryUrl === url ? (
                    <Loader2 size={10} className="animate-spin" />
                  ) : (
                    <X size={10} />
                  )}
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-[var(--color-text-muted)] mb-2">No gallery images yet.</p>
        )}

        {/* Add gallery image */}
        <label className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-dashed border-[var(--color-border)] px-3 py-1.5 text-[11px] text-[var(--color-text-light)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors mt-2">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) onGalleryUpload(file);
              e.target.value = "";
            }}
            disabled={uploadingId === String(project._id)}
          />
          {uploadingId === String(project._id) ? (
            <Loader2 size={12} className="animate-spin" />
          ) : (
            <Upload size={12} />
          )}
          {uploadingId === String(project._id) ? "Uploading…" : "Add Photo"}
        </label>
      </div>
    </div>
  );
}

function EditProjectForm({
  project,
  onCancel,
}: {
  project: Project;
  onCancel: () => void;
}) {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    const form = e.currentTarget;
    const formData = new FormData(form);
    const res = await fetch(`/api/admin/projects/${String(project._id)}`, {
      method: "PUT",
      body: formData,
    });
    const json = await res.json();
    if (!res.ok) {
      setError(json.error || "Failed to update");
    } else {
      setSuccess(true);
      setTimeout(onCancel, 600);
    }
    setSaving(false);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 rounded-xl border border-[var(--color-primary)]/30 bg-[var(--color-primary)]/5 p-5 space-y-3">
      {success ? (
        <div className="flex items-center gap-2 text-sm text-green-700">
          <CheckCircle2 size={16} /> Project updated!
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Field label="Title">
              <input name="title" defaultValue={project.title} required
                className="w-full rounded-lg border border-[var(--color-border)] bg-white px-3 py-2.5 text-sm focus:border-[var(--color-primary)] focus:outline-none"
              />
            </Field>
            <Field label="Category">
              <input name="category" defaultValue={project.category} required
                className="w-full rounded-lg border border-[var(--color-border)] bg-white px-3 py-2.5 text-sm focus:border-[var(--color-primary)] focus:outline-none"
              />
            </Field>
          </div>
          <Field label="Excerpt">
            <textarea name="excerpt" defaultValue={project.excerpt} required rows={2}
              className="w-full rounded-lg border border-[var(--color-border)] bg-white px-3 py-2.5 text-sm focus:border-[var(--color-primary)] focus:outline-none"
            />
          </Field>
          <Field label="Full Content (HTML)">
            <textarea name="content" defaultValue={project.content || ""} rows={3}
              className="w-full rounded-lg border border-[var(--color-border)] bg-white px-3 py-2.5 text-sm font-mono focus:border-[var(--color-primary)] focus:outline-none"
            />
          </Field>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Field label="Status">
              <select name="status" defaultValue={project.status}
                className="w-full rounded-lg border border-[var(--color-border)] bg-white px-3 py-2.5 text-sm focus:border-[var(--color-primary)] focus:outline-none"
              >
                <option value="active">Active</option>
                <option value="completed">Completed</option>
                <option value="archived">Archived</option>
              </select>
            </Field>
            <Field label="Location">
              <input name="location" defaultValue={project.location || ""} placeholder="e.g. Bo District"
                className="w-full rounded-lg border border-[var(--color-border)] bg-white px-3 py-2.5 text-sm focus:border-[var(--color-primary)] focus:outline-none"
              />
            </Field>
          </div>
          <Field label="Tags (comma-separated)">
            <input name="tags" defaultValue={project.tags?.join(", ")} placeholder="health, youth, Bo District"
              className="w-full rounded-lg border border-[var(--color-border)] bg-white px-3 py-2.5 text-sm focus:border-[var(--color-primary)] focus:outline-none"
            />
          </Field>
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 text-sm">
              <input name="isActive" type="checkbox" defaultChecked={project.isActive}
                className="h-4 w-4 rounded border-[var(--color-border)]"
              />
              Visible on website
            </label>
            <button
              type="submit"
              disabled={saving}
              className="rounded-lg px-5 py-2 text-sm font-bold text-white disabled:opacity-60"
              style={{ backgroundColor: "var(--color-primary)" }}
            >
              {saving ? <span className="inline-flex items-center gap-2"><Loader2 size={14} className="animate-spin" /> Saving…</span> : "Save Changes"}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
            >
              Cancel
            </button>
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
        </>
      )}
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1 block text-[11px] font-bold uppercase tracking-widest text-[var(--color-text-light)]">{label}</label>
      {children}
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
