import type { Metadata } from "next";
import { getDbSafe } from "@/lib/mongo";
import { ObjectId } from "mongodb";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export const metadata: Metadata = {
  title: "Admin — Partnership Enquiries",
  robots: "noindex, nofollow",
};

async function getSubmissions() {
  const safe = await getDbSafe();
  if (safe.error) {
    console.error("[admin partnerships] mongo error:", safe.error.message);
    return [];
  }
  const db = safe.db!;
  return (await db
    .collection("partnerships")
    .find({})
    .sort({ createdAt: -1 })
    .toArray()) as Array<{
    _id: ObjectId;
    name: string;
    email: string;
    organisation: string;
    phone: string;
    partnershipType: string;
    message: string;
    read: boolean;
    createdAt: Date;
  }>;
}

export default async function AdminPartnershipsPage() {
  const submissions = await getSubmissions();

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      <div className="container-wide py-12">
        <div className="flex items-center justify-between mb-10">
          <div>
            <a href="/admin" className="text-sm text-[var(--color-primary)] hover:underline">
              ← Back to dashboard
            </a>
            <h1 className="mt-2 text-3xl font-black text-[var(--color-text)]">
              Partnership Enquiries
            </h1>
            <p className="mt-1 text-sm text-[var(--color-text-muted)]">
              {submissions.length} enquiry{submissions.length !== 1 ? "s" : ""} received
            </p>
          </div>
        </div>

        {submissions.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-[var(--color-border)] bg-white px-8 py-16 text-center">
            <p className="text-sm text-[var(--color-text-muted)]">
              No partnership enquiries yet.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {submissions.map((sub) => (
              <SubmissionCard key={String(sub._id)} submission={sub} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function SubmissionCard({
  submission,
}: {
  submission: {
    _id: ObjectId;
    name: string;
    email: string;
    organisation: string;
    phone: string;
    partnershipType: string;
    message: string;
    read: boolean;
    createdAt: Date;
  };
}) {
  const date = new Date(submission.createdAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div
      className={`rounded-2xl border bg-white p-6 transition-all ${
        submission.read
          ? "border-[var(--color-border)]"
          : "border-[var(--color-primary)] shadow-sm"
      }`}
    >
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 flex-wrap">
            <h3 className="text-base font-black text-[var(--color-text)]">
              {submission.name}
            </h3>
            <span className="rounded-full bg-rose-100 text-rose-700 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider">
              {submission.partnershipType}
            </span>
            {!submission.read && (
              <span className="rounded-full bg-[var(--color-primary)]/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[var(--color-primary)]">
                New
              </span>
            )}
          </div>
          <p className="mt-1 text-sm text-[var(--color-text-muted)]">
            <span className="font-semibold text-[var(--color-text)]">{submission.organisation}</span> ·{" "}
            <a href={`mailto:${submission.email}`} className="text-[var(--color-primary)] hover:underline">
              {submission.email}
            </a>
            {submission.phone && (
              <span> · 📞 {submission.phone}</span>
            )}
          </p>
          <p className="mt-3 text-sm text-[var(--color-text)] leading-relaxed whitespace-pre-wrap">
            {submission.message}
          </p>
          <p className="mt-3 text-[11px] text-[var(--color-text-light)]">
            {date}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <a
            href={`mailto:${submission.email}?subject=Re: Partnership — ${submission.organisation}`}
            className="rounded-xl border border-[var(--color-border)] px-3 py-2 text-xs font-bold text-[var(--color-text-muted)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors"
          >
            Reply
          </a>
          <MarkReadForm submissionId={String(submission._id)} read={submission.read} />
        </div>
      </div>
    </div>
  );
}

function MarkReadForm({ submissionId, read }: { submissionId: string; read: boolean }) {
  return (
    <form action={`/api/admin/partnerships/${submissionId}/read`} method="POST" className="inline">
      <input type="hidden" name="read" value={String(!read)} />
      <button
        type="submit"
        className={`rounded-xl border px-3 py-2 text-xs font-bold transition-colors ${
          read
            ? "border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
            : "border-[var(--color-primary)]/30 bg-[var(--color-primary)]/5 text-[var(--color-primary)]"
        }`}
      >
        {read ? "Mark Unread" : "Mark Read"}
      </button>
    </form>
  );
}
