"use client";

import { useState } from "react";
import { ObjectId } from "mongodb";
import { CheckCircle2, ImageIcon, Loader2, Pencil, Trash2, Upload, X } from "@/components/ui/icons";

interface Partner {
  _id: ObjectId;
  name: string;
  category: string;
  logoUrl: string | null;
  website: string | null;
  isActive: boolean;
  createdAt: Date;
}

export default function PartnersManager({ partners }: { partners: Partner[] }) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [uploadingId, setUploadingId] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const handleUpload = async (partnerId: string, file: File) => {
    setUploadingId(partnerId);
    setUploadError("");
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("partnerId", partnerId);
      const res = await fetch("/api/admin/partners/upload", { method: "POST", body: formData });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Upload failed");
      setSuccessMsg("Logo uploaded!");
      window.location.reload();
    } catch (err) {
      setUploadError((err as Error).message);
    } finally {
      setUploadingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    const res = await fetch(`/api/admin/partners/${id}`, { method: "DELETE" });
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

      <button
        onClick={() => setShowAddForm(!showAddForm)}
        className="rounded-2xl border-2 border-dashed border-[var(--color-border)] bg-white px-5 py-3 text-sm font-bold text-[var(--color-primary)] hover:border-[var(--color-primary)] transition-colors"
      >
        + Add Partner / Sponsor
      </button>

      {showAddForm && <AddPartnerForm onAdded={() => { setShowAddForm(false); window.location.reload(); }} />}

      {partners.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[var(--color-border)] bg-white px-8 py-16 text-center">
          <p className="text-sm text-[var(--color-text-muted)]">No partners yet. Click &quot;Add Partner&quot; to get started.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {partners.map((partner) => (
            <PartnerRow
              key={String(partner._id)}
              partner={partner}
              isEditing={editingId === String(partner._id)}
              onEdit={() => setEditingId(editingId === String(partner._id) ? null : String(partner._id))}
              onCancelEdit={() => setEditingId(null)}
              onUpload={(file) => handleUpload(String(partner._id), file)}
              uploadingId={uploadingId}
              showDeleteConfirm={deleteConfirm === String(partner._id)}
              onSetDeleteConfirm={() => setDeleteConfirm(String(partner._id))}
              onConfirmDelete={() => handleDelete(String(partner._id))}
              onCancelDelete={() => setDeleteConfirm(null)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function AddPartnerForm({ onAdded }: { onAdded: () => void }) {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    const form = e.currentTarget;
    const formData = new FormData(form);
    const res = await fetch("/api/admin/partners", { method: "POST", body: formData });
    const json = await res.json();
    if (!res.ok) setError(json.error || "Failed to create partner");
    else onAdded();
    setSaving(false);
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-[var(--color-primary)]/30 bg-[var(--color-primary)]/5 p-6 space-y-4">
      <h3 className="text-sm font-bold text-[var(--color-primary)] uppercase tracking-widest">Add New Partner</h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Partner Name *">
          <input name="name" required placeholder="e.g. Grand Challenges Canada"
            className="w-full rounded-xl border border-[var(--color-border)] bg-white px-4 py-2.5 text-sm focus:border-[var(--color-primary)] focus:outline-none"
          />
        </Field>
        <Field label="Category *">
          <select name="category" required defaultValue=""
            className="w-full rounded-xl border border-[var(--color-border)] bg-white px-4 py-2.5 text-sm focus:border-[var(--color-primary)] focus:outline-none"
          >
            <option value="" disabled>Select category</option>
            <option value="International Funder">International Funder</option>
            <option value="Government">Government</option>
            <option value="Health">Health</option>
            <option value="Education">Education</option>
            <option value="Community">Community</option>
            <option value="Media">Media</option>
            <option value="Sponsor">Sponsor</option>
            <option value="Partner">Partner</option>
          </select>
        </Field>
      </div>
      <Field label="Website URL">
        <input name="website" placeholder="https://example.com"
          className="w-full rounded-xl border border-[var(--color-border)] bg-white px-4 py-2.5 text-sm focus:border-[var(--color-primary)] focus:outline-none"
        />
      </Field>
      <Field label="Logo Image">
        <label className="flex cursor-pointer flex-col items-center gap-2 rounded-xl border-2 border-dashed border-[var(--color-border)] px-6 py-4 transition-colors hover:border-[var(--color-primary)]">
          <ImageIcon size={24} className="text-[var(--color-text-light)]" />
          <span className="text-sm text-[var(--color-text-muted)]">Click to upload logo (JPG, PNG, WebP)</span>
          <input type="file" accept="image/*" name="logo" className="hidden" />
        </label>
      </Field>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <div className="flex gap-3">
        <button type="submit" disabled={saving} className="rounded-xl px-5 py-2.5 text-sm font-bold text-white disabled:opacity-60" style={{ backgroundColor: "var(--color-primary)" }}>
          {saving ? <span className="inline-flex items-center gap-2"><Loader2 size={14} className="animate-spin" /> Saving…</span> : "Create Partner"}
        </button>
      </div>
    </form>
  );
}

function PartnerRow({
  partner,
  isEditing,
  onEdit,
  onCancelEdit,
  onUpload,
  uploadingId,
  showDeleteConfirm,
  onSetDeleteConfirm,
  onConfirmDelete,
  onCancelDelete,
}: {
  partner: Partner;
  isEditing: boolean;
  onEdit: () => void;
  onCancelEdit: () => void;
  onUpload: (file: File) => void;
  uploadingId: string | null;
  showDeleteConfirm: boolean;
  onSetDeleteConfirm: () => void;
  onConfirmDelete: () => void;
  onCancelDelete: () => void;
}) {
  if (isEditing) {
    return <EditPartnerForm partner={partner} onCancel={onCancelEdit} />;
  }

  return (
    <div className={`rounded-2xl border bg-white p-5 transition-all ${
      partner.isActive ? "border-[var(--color-border)] shadow-sm" : "border-dashed border-[var(--color-border)] opacity-60"
    }`}>
      <div className="flex items-center gap-5">
        {/* Logo */}
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-[var(--color-bg-section)] flex items-center justify-center border border-[var(--color-border)]">
          {partner.logoUrl ? (
            <>
              <img src={partner.logoUrl} alt={partner.name} className="h-full w-full object-contain p-1" />
              <label
                className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/40 opacity-0 transition-opacity hover:opacity-100"
                title="Change logo"
              >
                <input type="file" accept="image/*" className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) onUpload(file);
                  }}
                  disabled={uploadingId === String(partner._id)}
                />
                {uploadingId === String(partner._id) ? (
                  <Loader2 size={18} className="animate-spin text-white" />
                ) : (
                  <Upload size={18} className="text-white" />
                )}
              </label>
            </>
          ) : (
            <label className="flex cursor-pointer flex-col items-center gap-1 p-2" title="Upload logo">
              <input type="file" accept="image/*" className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) onUpload(file);
                }}
                disabled={uploadingId === String(partner._id)}
              />
              <ImageIcon size={22} className="text-[var(--color-text-light)]" />
              <span className="text-[9px] text-[var(--color-text-light)]">Upload</span>
            </label>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 flex-wrap">
            <h3 className="text-base font-black text-[var(--color-text)]">{partner.name}</h3>
            <span className="rounded-full bg-[var(--color-bg-section)] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-light)]">
              {partner.category}
            </span>
            {!partner.isActive && (
              <span className="rounded-full bg-gray-200 px-2.5 py-0.5 text-[10px] font-bold uppercase text-gray-500">Inactive</span>
            )}
          </div>
          {partner.website && (
            <a href={partner.website} target="_blank" rel="noopener noreferrer"
              className="mt-1 text-xs text-[var(--color-primary)] hover:underline"
            >
              {partner.website} →
            </a>
          )}
        </div>

        {/* Actions */}
        <div className="flex shrink-0 items-center gap-2">
          <button onClick={onEdit}
            className="rounded-xl border border-[var(--color-border)] px-3 py-2 text-xs font-bold text-[var(--color-text-muted)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors"
          >
            <Pencil size={14} className="inline mr-1" /> Edit
          </button>
          {showDeleteConfirm ? (
            <div className="flex gap-2">
              <button onClick={onConfirmDelete}
                className="rounded-xl border border-red-300 bg-red-50 px-3 py-2 text-xs font-bold text-red-600 hover:bg-red-100"
              >Confirm</button>
              <button onClick={onCancelDelete}
                className="rounded-xl border border-[var(--color-border)] px-3 py-2 text-xs font-bold text-[var(--color-text-muted)]"
              >Cancel</button>
            </div>
          ) : (
            <button onClick={onSetDeleteConfirm}
              className="rounded-xl border border-red-200 px-3 py-2 text-xs font-bold text-red-500 hover:bg-red-50 transition-colors"
            >
              <Trash2 size={14} className="inline mr-1" /> Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function EditPartnerForm({
  partner,
  onCancel,
}: {
  partner: Partner;
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
    const res = await fetch(`/api/admin/partners/${String(partner._id)}`, { method: "PUT", body: formData });
    const json = await res.json();
    if (!res.ok) setError(json.error || "Failed to update");
    else setSuccess(true);
    setSaving(false);
    if (success) setTimeout(onCancel, 600);
  };

  if (success) {
    return (
      <div className="rounded-xl bg-green-50 border border-green-200 p-4 text-sm text-green-700 flex items-center gap-2">
        <CheckCircle2 size={16} /> Partner updated!
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 rounded-xl border border-[var(--color-primary)]/30 bg-[var(--color-primary)]/5 p-5 space-y-3">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Field label="Name">
          <input name="name" defaultValue={partner.name} required
            className="w-full rounded-lg border border-[var(--color-border)] bg-white px-3 py-2.5 text-sm focus:border-[var(--color-primary)] focus:outline-none"
          />
        </Field>
        <Field label="Category">
          <select name="category" defaultValue={partner.category}
            className="w-full rounded-lg border border-[var(--color-border)] bg-white px-3 py-2.5 text-sm focus:border-[var(--color-primary)] focus:outline-none"
          >
            <option value="International Funder">International Funder</option>
            <option value="Government">Government</option>
            <option value="Health">Health</option>
            <option value="Education">Education</option>
            <option value="Community">Community</option>
            <option value="Media">Media</option>
            <option value="Sponsor">Sponsor</option>
            <option value="Partner">Partner</option>
          </select>
        </Field>
      </div>
      <Field label="Website">
        <input name="website" defaultValue={partner.website || ""} placeholder="https://…"
          className="w-full rounded-lg border border-[var(--color-border)] bg-white px-3 py-2.5 text-sm focus:border-[var(--color-primary)] focus:outline-none"
        />
      </Field>
      <div className="flex items-center gap-6">
        <label className="flex items-center gap-2 text-sm">
          <input name="isActive" type="checkbox" defaultChecked={partner.isActive}
            className="h-4 w-4 rounded border-[var(--color-border)]"
          />
          Visible on website
        </label>
        <button type="submit" disabled={saving}
          className="rounded-lg px-5 py-2 text-sm font-bold text-white disabled:opacity-60"
          style={{ backgroundColor: "var(--color-primary)" }}
        >
          {saving ? <span className="inline-flex items-center gap-2"><Loader2 size={14} className="animate-spin" /> Saving…</span> : "Save Changes"}
        </button>
        <button type="button" onClick={onCancel} className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)]">Cancel</button>
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
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
