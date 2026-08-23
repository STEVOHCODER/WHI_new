import type { Metadata } from "next";
import { getDbSafe } from "@/lib/mongo";
import { ObjectId } from "mongodb";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export const metadata: Metadata = {
  title: "Admin — Vacancies",
  robots: "noindex, nofollow",
};

async function getVacancies() {
  const safe = await getDbSafe();
  if (safe.error) {
    console.error("[admin vacancies] mongo error:", safe.error.message);
    return [];
  }
  const db = safe.db!;
  return (await db
    .collection("vacancies")
    .find({})
    .sort({ createdAt: -1 })
    .toArray()) as Array<{
    _id: ObjectId;
    title: string;
    department: string;
    location: string;
    type: string;
    deadline: string;
    href: string | null;
    isActive: boolean;
    createdAt: Date;
  }>;
}

export default async function AdminVacanciesPage() {
  const vacancies = await getVacancies();

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      <div className="container-wide py-12">
        <div className="mb-10">
          <h1 className="text-3xl font-black text-[var(--color-text)]">Vacancies</h1>
          <p className="mt-1 text-sm text-[var(--color-text-muted)]">
            {vacancies.length} vacancy{vacancies.length !== 1 ? "s" : ""}
          </p>
        </div>

        <AddVacancyModal />

        <div className="mt-6 space-y-4">
          {vacancies.map((vacancy) => (
            <VacancyRow key={String(vacancy._id)} vacancy={vacancy} />
          ))}
          {vacancies.length === 0 && (
            <div className="rounded-2xl border border-dashed border-[var(--color-border)] bg-white px-8 py-16 text-center">
              <p className="text-sm text-[var(--color-text-muted)]">
                No vacancies yet. Click &quot;+ Add New Vacancy&quot; to create one.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function AddVacancyModal() {
  return (
    <details className="rounded-2xl border border-[var(--color-border)] bg-white p-6">
      <summary className="cursor-pointer font-bold text-[var(--color-primary)]">
        + Add New Vacancy
      </summary>
      <form action="/api/admin/vacancies" method="POST" className="mt-6 space-y-4">
        <input name="title" placeholder="Job title (e.g. Community Health Worker)" required
          className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3 text-sm focus:border-[var(--color-primary)] focus:outline-none"
        />
        <div className="grid grid-cols-2 gap-4">
          <input name="department" placeholder="Department (e.g. Health)" required
            className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3 text-sm focus:border-[var(--color-primary)] focus:outline-none"
          />
          <input name="location" placeholder="Location (e.g. Bo District)" required
            className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3 text-sm focus:border-[var(--color-primary)] focus:outline-none"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <select name="type"
            className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3 text-sm focus:border-[var(--color-primary)] focus:outline-none"
          >
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Volunteer">Volunteer</option>
            <option value="Internship">Internship</option>
            <option value="Contract">Contract</option>
          </select>
          <input name="deadline" placeholder="Application deadline" required type="date"
            className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3 text-sm focus:border-[var(--color-primary)] focus:outline-none"
          />
        </div>
        <input name="href" placeholder="Apply URL (optional, e.g. /contact)"
          className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3 text-sm focus:border-[var(--color-primary)] focus:outline-none"
        />
        <button
          type="submit"
          className="w-full rounded-xl py-3 font-bold text-white transition-all hover:opacity-90"
          style={{ backgroundColor: "var(--color-primary)" }}
        >
          Create Vacancy
        </button>
      </form>
    </details>
  );
}

async function VacancyRow({
  vacancy,
}: {
  vacancy: {
    _id: ObjectId;
    title: string;
    department: string;
    location: string;
    type: string;
    deadline: string;
    href: string | null;
    isActive: boolean;
    createdAt: Date;
  };
}) {
  return (
    <div
      className={`rounded-2xl border bg-white p-6 transition-all ${
        vacancy.isActive
          ? "border-[var(--color-border)] shadow-sm"
          : "border-dashed border-[var(--color-border)] opacity-60"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 flex-wrap">
            <h3 className="text-base font-black text-[var(--color-text)]">
              {vacancy.title}
            </h3>
            <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
              vacancy.type === "Full-time" ? "bg-emerald-100 text-emerald-700" :
              vacancy.type === "Part-time" ? "bg-sky-100 text-sky-700" :
              vacancy.type === "Volunteer" ? "bg-fuchsia-100 text-fuchsia-700" :
              vacancy.type === "Internship" ? "bg-amber-100 text-amber-700" :
              "bg-slate-100 text-slate-700"
            }`}>
              {vacancy.type}
            </span>
            {!vacancy.isActive && (
              <span className="rounded-full bg-gray-200 px-2.5 py-0.5 text-[10px] font-bold uppercase text-gray-500">
                Inactive
              </span>
            )}
          </div>
          <div className="mt-2 flex flex-wrap gap-4 text-[11px] text-[var(--color-text-light)]">
            <span>📂 {vacancy.department}</span>
            <span>📍 {vacancy.location}</span>
            <span>📅 Deadline: {vacancy.deadline}</span>
          </div>
          {vacancy.href && (
            <a href={vacancy.href} target="_blank" rel="noopener noreferrer"
              className="mt-2 text-xs text-[var(--color-primary)] hover:underline"
            >
              {vacancy.href} →
            </a>
          )}
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <EditVacancyForm vacancy={vacancy} />
          <DeleteVacancyButton vacancyId={String(vacancy._id)} />
        </div>
      </div>
    </div>
  );
}

function EditVacancyForm({
  vacancy,
}: {
  vacancy: { _id: ObjectId; title: string; department: string; location: string; type: string; deadline: string; href: string | null; isActive: boolean };
}) {
  return (
    <details className="rounded-xl border border-[var(--color-border)]">
      <summary className="cursor-pointer px-3 py-2 text-xs font-bold text-[var(--color-text-muted)] hover:text-[var(--color-primary)]">
        Edit
      </summary>
      <form action={`/api/admin/vacancies/${String(vacancy._id)}`} method="POST" className="p-4 space-y-3 border-t border-[var(--color-border)]">
        <input type="hidden" name="_method" value="PUT" />
        <input name="title" defaultValue={vacancy.title} placeholder="Title" required
          className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-sm"
        />
        <div className="grid grid-cols-2 gap-3">
          <input name="department" defaultValue={vacancy.department} placeholder="Department"
            className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-sm"
          />
          <input name="location" defaultValue={vacancy.location} placeholder="Location"
            className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-sm"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <select name="type" defaultValue={vacancy.type}
            className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-sm"
          >
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Volunteer">Volunteer</option>
            <option value="Internship">Internship</option>
            <option value="Contract">Contract</option>
          </select>
          <input name="deadline" defaultValue={vacancy.deadline} placeholder="Deadline" required type="date"
            className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-sm"
          />
        </div>
        <input name="href" defaultValue={vacancy.href ?? ""} placeholder="Apply URL (optional)"
          className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-sm"
        />
        <label className="flex items-center gap-2 text-sm">
          <input name="isActive" type="checkbox" defaultChecked={vacancy.isActive}
            className="h-4 w-4 rounded border-[var(--color-border)]"
          />
          Visible on website
        </label>
        <button
          type="submit"
          className="w-full rounded-lg py-2 text-sm font-bold text-white"
          style={{ backgroundColor: "var(--color-primary)" }}
        >
          Save Changes
        </button>
      </form>
    </details>
  );
}

function DeleteVacancyButton({ vacancyId }: { vacancyId: string }) {
  return (
    <form action={`/api/admin/vacancies/${vacancyId}`} method="POST" className="inline">
      <input type="hidden" name="_method" value="DELETE" />
      <button
        type="submit"
        className="rounded-xl border border-red-200 px-3 py-2 text-xs font-bold text-red-500 hover:bg-red-50 transition-colors"
      >
        Delete
      </button>
    </form>
  );
}
