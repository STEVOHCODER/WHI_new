"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { CheckCircle2, Loader2 } from "@/components/ui/icons";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState("");

  const validate = (data: FormData) => {
    const errs: Record<string, string> = {};
    if (!data.get("name")) errs.name = "Name is required.";
    const email = data.get("email") as string;
    if (!email) errs.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = "Please enter a valid email address.";
    }
    if (!data.get("subject")) errs.subject = "Subject is required.";
    if (!data.get("message")) errs.message = "Message is required.";
    return errs;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const errs = validate(data);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setServerError("");
    setSending(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: data,
      });
      const json = await res.json();
      if (!res.ok) {
        setServerError(json.error || "Something went wrong. Please try again.");
        return;
      }
      setSubmitted(true);
    } catch {
      setServerError("Network error. Please check your connection and try again.");
    } finally {
      setSending(false);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-[1.75rem] border border-green-200 bg-green-50/80 p-8 text-center shadow-[0_16px_50px_rgba(14,24,20,0.06)]">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-green-600 shadow-[0_10px_24px_rgba(14,24,20,0.06)]">
          <CheckCircle2 size={26} strokeWidth={2.2} />
        </div>
        <h3 className="mb-2 text-lg font-black text-[var(--color-text)]">
          Message received
        </h3>
        <p className="text-sm text-[var(--color-text-muted)]">
          Thank you for reaching out. We&apos;ll follow up as soon as possible.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-5 text-xs font-semibold text-[var(--color-primary)] hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4" aria-label="Contact form">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Full Name" id="name" error={errors.name}>
          <input
            type="text"
            id="name"
            name="name"
            autoComplete="name"
            className={inputClass(!!errors.name)}
            placeholder="Your full name"
          />
        </Field>
        <Field label="Email Address" id="email" error={errors.email} required>
          <input
            type="email"
            id="email"
            name="email"
            autoComplete="email"
            className={inputClass(!!errors.email)}
            placeholder="your@email.com"
          />
        </Field>
      </div>
      <Field label="Organisation (optional)" id="organisation">
        <input
          type="text"
          id="organisation"
          name="organisation"
          className={inputClass(false)}
          placeholder="Your organisation"
        />
      </Field>
      <Field label="Subject" id="subject" error={errors.subject}>
        <input
          type="text"
          id="subject"
          name="subject"
          className={inputClass(!!errors.subject)}
          placeholder="What is this about?"
        />
      </Field>
      <Field label="Message" id="message" error={errors.message}>
        <textarea
          id="message"
          name="message"
          rows={6}
          className={`${inputClass(!!errors.message)} resize-none`}
          placeholder="Write your message here..."
          disabled={sending}
        />
      </Field>

      {serverError && (
        <p className="text-sm text-red-600" role="alert">{serverError}</p>
      )}

      <button
        type="submit"
        disabled={sending}
        className="w-full rounded-full px-6 py-3.5 font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-70"
        style={{ backgroundColor: "var(--color-primary)" }}
      >
        {sending ? (
          <span className="inline-flex items-center gap-2">
            <Loader2 size={16} className="animate-spin" />
            Sending…
          </span>
        ) : (
          "Send Message"
        )}
      </button>
    </form>
  );
}

function inputClass(hasError: boolean) {
  return `w-full rounded-2xl border px-4 py-3.5 text-sm transition-all duration-200 focus:outline-none focus:ring-2 ${
    hasError
      ? "border-red-400 bg-red-50 focus:ring-red-300"
      : "border-[var(--color-border)] bg-[var(--color-bg-section)]/35 focus:border-[var(--color-primary)] focus:bg-white focus:ring-[var(--color-primary)]"
  }`;
}

function Field({
  label,
  id,
  error,
  required,
  children,
}: {
  label: string;
  id: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--color-text-light)]"
      >
        {label}
        {required && <span className="ml-1 text-red-500" aria-hidden="true">*</span>}
      </label>
      {children}
      {error && (
        <p className="mt-1 text-xs text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
