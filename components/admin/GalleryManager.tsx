"use client";

import { useState, useRef } from "react";
import { ObjectId } from "mongodb";
import { CheckCircle2, Loader2, Trash2, Upload, X, ImageIcon, Pencil } from "@/components/ui/icons";

interface GalleryPhoto {
  _id: ObjectId;
  imageUrl: string;
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

  const handleUpload = async (file: File, caption?: string) => {
    setUploading(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("file", file);
      if (caption) formData.append("caption", caption);
      const res = await fetch("/api/admin/gallery", { method: "POST", body: formData });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Upload failed");
      setSuccessMsg("Photo uploaded!");
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

  const handleCaptionUpdate = async (id: string, caption: string) => {
    try {
      const res = await fetch("/api/admin/gallery", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, caption }),
      });
      if (!res.ok) throw new Error("Update failed");
      setEditingId(null);
      setSuccessMsg("Caption updated!");
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
      <div className="rounded-2xl border-2 border-dashed border-[var(--color-border)] bg-white p-8 text-center hover:border-[var(--color-primary)] transition-colors">
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
          {uploading ? "Uploading…" : "Upload Photos"}
        </button>
        <p className="mt-3 text-xs text-[var(--color-text-muted)]">
          JPG, PNG, WebP, GIF — max 5MB each. Select multiple files at once.
        </p>
      </div>

      {/* Photo Grid */}
      {photos.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[var(--color-border)] bg-white px-8 py-16 text-center">
          <ImageIcon size={40} className="mx-auto mb-4 text-[var(--color-text-light)]" />
          <p className="text-sm text-[var(--color-text-muted)]">
            No gallery photos yet. Click &quot;Upload Photos&quot; to get started.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {photos.map((photo) => (
            <PhotoCard
              key={String(photo._id)}
              photo={photo}
              isEditing={editingId === String(photo._id)}
              onEdit={() => setEditingId(editingId === String(photo._id) ? null : String(photo._id))}
              onCaptionSave={(caption) => handleCaptionUpdate(String(photo._id), caption)}
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
  onCaptionSave,
  showDeleteConfirm,
  onConfirmDelete,
  onCancelDelete,
  onPreview,
}: {
  photo: GalleryPhoto;
  isEditing: boolean;
  onEdit: () => void;
  onCaptionSave: (caption: string) => void;
  showDeleteConfirm: boolean;
  onConfirmDelete: () => void;
  onCancelDelete: () => void;
  onPreview: () => void;
}) {
  const [captionDraft, setCaptionDraft] = useState(photo.caption);

  if (isEditing) {
    return (
      <div className="rounded-2xl border border-[var(--color-primary)]/30 bg-[var(--color-primary)]/5 p-3 space-y-2">
        <img
          src={photo.imageUrl}
          alt={photo.caption || "Gallery photo"}
          className="h-32 w-full rounded-lg object-cover cursor-pointer"
          onClick={onPreview}
        />
        <input
          type="text"
          value={captionDraft}
          onChange={(e) => setCaptionDraft(e.target.value)}
          placeholder="Add a caption…"
          className="w-full rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 text-xs focus:border-[var(--color-primary)] focus:outline-none"
        />
        <div className="flex gap-2">
          <button
            onClick={() => onCaptionSave(captionDraft)}
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
        alt={photo.caption || "Gallery photo"}
        className="h-36 w-full object-cover cursor-pointer"
        onClick={onPreview}
      />

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
        <button
          onClick={onEdit}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-[var(--color-text)] hover:bg-white"
          title="Edit caption"
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
      </div>

      {/* Caption + delete */}
      <div className="p-3">
        {photo.caption ? (
          <p className="text-xs text-[var(--color-text-muted)] truncate">{photo.caption}</p>
        ) : (
          <p className="text-xs text-[var(--color-text-light)] italic">No caption</p>
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
