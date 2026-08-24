"use client";

import { useState, useRef } from "react";
import { ObjectId } from "mongodb";
import { CheckCircle2, Loader2, Trash2, Upload, X, ImageIcon, Pencil } from "@/components/ui/icons";

interface GalleryPhoto {
  _id: ObjectId;
  imageUrl: string;
  title: string;
  caption: string;
  createdAt: Date;
}

export default function GalleryManager({ photos }: { photos: GalleryPhoto[] }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadTitle, setUploadTitle] = useState("");
  const [uploadCaption, setUploadCaption] = useState("");
  const [seeding, setSeeding] = useState(false);
  const [clearing, setClearing] = useState(false);

  const handleClearAll = async () => {
    if (!confirm("Delete ALL gallery photos? This cannot be undone.")) return;
    setClearing(true);
    setError("");
    try {
      const res = await fetch("/api/admin/gallery?all=true", { method: "DELETE" });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Clear failed");
      setSuccessMsg(`Cleared ${json.deleted} photos`);
      window.location.reload();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setClearing(false);
    }
  };

  const handleSeed = async () => {
    setSeeding(true);
    setError("");
    try {
      const res = await fetch("/api/admin/gallery/seed", { method: "POST" });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Seed failed");
      setSuccessMsg(`Loaded ${json.seeded} existing photos (${json.skipped} already existed)`);
      window.location.reload();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSeeding(false);
    }
  };

  const handleUpload = async (file: File) => {
    setUploading(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("file", file);
      if (uploadTitle) formData.append("title", uploadTitle);
      if (uploadCaption) formData.append("caption", uploadCaption);
      const res = await fetch("/api/admin/gallery", { method: "POST", body: formData });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Upload failed");
      setSuccessMsg("Photo uploaded!");
      setUploadTitle("");
      setUploadCaption("");
      window.location.reload();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/gallery?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      setDeleteConfirm(null);
      setSuccessMsg("Photo deleted!");
      window.location.reload();
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const handleUpdate = async (id: string, title: string, caption: string) => {
    try {
      const res = await fetch("/api/admin/gallery", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, title, caption }),
      });
      if (!res.ok) throw new Error("Update failed");
      setEditingId(null);
      setSuccessMsg("Updated!");
      window.location.reload();
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <div className="space-y-6">
      {successMsg && (
        <div className="rounded-xl bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-700">
          {successMsg}
        </div>
      )}
      {error && (
        <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Upload Zone */}
      <div className="rounded-2xl border-2 border-dashed border-[var(--color-border)] bg-white p-6 hover:border-[var(--color-primary)] transition-colors">
        <h3 className="text-sm font-bold text-[var(--color-text)] mb-4">Upload New Photo</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-4">
          <div>
            <label className="mb-1 block text-[11px] font-bold uppercase tracking-widest text-[var(--color-text-light)]">
              Title
            </label>
            <input
              type="text"
              value={uploadTitle}
              onChange={(e) => setUploadTitle(e.target.value)}
              placeholder="e.g. Community Outreach in Bo"
              className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-2.5 text-sm focus:border-[var(--color-primary)] focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block text-[11px] font-bold uppercase tracking-widest text-[var(--color-text-light)]">
              Caption / Description
            </label>
            <input
              type="text"
              value={uploadCaption}
              onChange={(e) => setUploadCaption(e.target.value)}
              placeholder="e.g. Health education session with young women"
              className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-2.5 text-sm focus:border-[var(--color-primary)] focus:outline-none"
            />
          </div>
        </div>
        <div className="text-center">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => {
              Array.from(e.target.files || []).forEach((file) => handleUpload(file));
              e.target.value = "";
            }}
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-white disabled:opacity-60"
            style={{ backgroundColor: "var(--color-primary)" }}
          >
            {uploading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Upload size={16} />
            )}
            {uploading ? "Uploading…" : "Select Photos to Upload"}
          </button>
          <p className="mt-3 text-xs text-[var(--color-text-muted)]">
            JPG, PNG, WebP, GIF — max 5MB each. Select multiple files at once.
          </p>
          <div className="mt-4 pt-4 border-t border-[var(--color-border)]">
            <p className="text-xs text-[var(--color-text-muted)] mb-2">
              Reset gallery to match the site&apos;s default photos:
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <button
                onClick={handleClearAll}
                disabled={clearing || seeding}
                className="inline-flex items-center gap-2 rounded-xl border border-red-300 bg-red-50 px-5 py-2 text-xs font-bold text-red-600 hover:bg-red-100 disabled:opacity-60"
              >
                {clearing ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                {clearing ? "Clearing…" : "1. Clear All Photos"}
              </button>
              <button
                onClick={handleSeed}
                disabled={seeding || clearing}
                className="inline-flex items-center gap-2 rounded-xl border border-[var(--color-primary)]/30 bg-[var(--color-primary)]/5 px-5 py-2 text-xs font-bold text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10 disabled:opacity-60"
              >
                {seeding ? <Loader2 size={14} className="animate-spin" /> : <ImageIcon size={14} />}
                {seeding ? "Reloading…" : "2. Reload Site Photos"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Photo Grid */}
      {photos.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[var(--color-border)] bg-white px-8 py-16 text-center">
          <ImageIcon size={40} className="mx-auto mb-4 text-[var(--color-text-light)]" />
          <p className="text-sm text-[var(--color-text-muted)]">
            No gallery photos yet. Upload your first photo above.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {photos.map((photo) => (
            <PhotoCard
              key={String(photo._id)}
              photo={photo}
              isEditing={editingId === String(photo._id)}
              onEdit={() => setEditingId(editingId === String(photo._id) ? null : String(photo._id))}
              onUpdate={(title, caption) => handleUpdate(String(photo._id), title, caption)}
              showDeleteConfirm={deleteConfirm === String(photo._id)}
              onConfirmDelete={() => handleDelete(String(photo._id))}
              onCancelDelete={() => setDeleteConfirm(null)}
              onPreview={() => setPreviewUrl(photo.imageUrl)}
            />
          ))}
        </div>
      )}

      {/* Lightbox Preview */}
      {previewUrl && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setPreviewUrl(null)}
        >
          <button
            onClick={() => setPreviewUrl(null)}
            className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/30"
          >
            <X size={20} />
          </button>
          <img
            src={previewUrl}
            alt="Preview"
            className="max-h-[85vh] max-w-[90vw] rounded-lg object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}

function PhotoCard({
  photo,
  isEditing,
  onEdit,
  onUpdate,
  showDeleteConfirm,
  onConfirmDelete,
  onCancelDelete,
  onPreview,
}: {
  photo: GalleryPhoto;
  isEditing: boolean;
  onEdit: () => void;
  onUpdate: (title: string, caption: string) => void;
  showDeleteConfirm: boolean;
  onConfirmDelete: () => void;
  onCancelDelete: () => void;
  onPreview: () => void;
}) {
  const [titleDraft, setTitleDraft] = useState(photo.title || "");
  const [captionDraft, setCaptionDraft] = useState(photo.caption || "");

  if (isEditing) {
    return (
      <div className="rounded-2xl border border-[var(--color-primary)]/30 bg-[var(--color-primary)]/5 p-3 space-y-2">
        <img
          src={photo.imageUrl}
          alt={photo.title || "Gallery photo"}
          className="h-40 w-full rounded-lg object-cover cursor-pointer"
          onClick={onPreview}
        />
        <input
          type="text"
          value={titleDraft}
          onChange={(e) => setTitleDraft(e.target.value)}
          placeholder="Title"
          className="w-full rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 text-xs font-semibold focus:border-[var(--color-primary)] focus:outline-none"
        />
        <textarea
          value={captionDraft}
          onChange={(e) => setCaptionDraft(e.target.value)}
          placeholder="Caption / description…"
          rows={2}
          className="w-full rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 text-xs focus:border-[var(--color-primary)] focus:outline-none resize-none"
        />
        <div className="flex gap-2">
          <button
            onClick={() => onUpdate(titleDraft, captionDraft)}
            className="flex-1 rounded-lg px-3 py-1.5 text-xs font-bold text-white"
            style={{ backgroundColor: "var(--color-primary)" }}
          >
            Save
          </button>
          <button
            onClick={onEdit}
            className="rounded-lg border border-[var(--color-border)] px-3 py-1.5 text-xs font-bold text-[var(--color-text-muted)]"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="group relative rounded-2xl border border-[var(--color-border)] bg-white overflow-hidden shadow-sm hover:shadow-md transition-all">
      <img
        src={photo.imageUrl}
        alt={photo.title || "Gallery photo"}
        className="h-48 w-full object-cover cursor-pointer"
        onClick={onPreview}
      />

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
        <button
          onClick={onEdit}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-[var(--color-text)] hover:bg-white"
          title="Edit title & caption"
        >
          <Pencil size={14} />
        </button>
        <button
          onClick={onPreview}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-[var(--color-text)] hover:bg-white"
          title="Preview"
        >
          <ImageIcon size={14} />
        </button>
        <button
          onClick={() => onConfirmDelete()}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500/90 text-white hover:bg-red-600"
          title="Delete photo"
        >
          <Trash2 size={14} />
        </button>
      </div>

      {/* Title + Caption + delete */}
      <div className="p-3">
        {photo.title ? (
          <p className="text-xs font-bold text-[var(--color-text)] truncate">{photo.title}</p>
        ) : (
          <p className="text-xs text-[var(--color-text-light)] italic">No title</p>
        )}
        {photo.caption && (
          <p className="mt-1 text-[11px] text-[var(--color-text-muted)] truncate">{photo.caption}</p>
        )}

        {showDeleteConfirm ? (
          <div className="mt-2 flex gap-2">
            <button
              onClick={onConfirmDelete}
              className="flex-1 rounded-lg border border-red-300 bg-red-50 px-2 py-1 text-[10px] font-bold text-red-600 hover:bg-red-100"
            >
              Confirm Delete
            </button>
            <button
              onClick={onCancelDelete}
              className="rounded-lg border border-[var(--color-border)] px-2 py-1 text-[10px] font-bold text-[var(--color-text-muted)]"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => onConfirmDelete()}
            className="mt-2 w-full rounded-lg border border-red-200 px-2 py-1 text-[10px] font-bold text-red-500 hover:bg-red-50 transition-colors"
          >
            <Trash2 size={10} className="inline mr-1" /> Delete
          </button>
        )}
      </div>
    </div>
  );
}
