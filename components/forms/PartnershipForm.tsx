"use client";

import { useState, type FormEvent, type ReactNode } from "react";

const partnershipTypes = [
  "Government Partnership",
  "NGO / CBO Partnership",
  "Development Partner",
  "Research Partnership",
  "Private Sector Collaboration",
  "Donor / Funder",
  "International Partnership",
  "Other",
];

export default function PartnershipForm() {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState("");

  const validate = (data: FormData) => {
    const errs: Record<string, string> = {};
    if (!data.get("name")) errs.name = "Name is required.";
    if (!data.get("organisation")) errs.organisation = "Organisation is required.";
    const email = data.get("email") as string;
    if (!email) errs.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = "Enter a valid email.";
    }
    if (!data.get("partnershipType")) errs.partnershipType = "Please select a partnership type.";
    if (!data.get("message")) errs.message = "Please tell us about your interest.";
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
    setSubmitted(false);

    try {
      const body = Object.fromEntries(data.entries());
      const res = await fetch("/api/partnership", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const json = await res.json();
      if (!res.ok) {
        setServerError(json.error || "Something went wrong. Please try again.");
        return;
      }
      if (!json.delivered && json.emailError) {
        setServerError(`Enquiry saved but email notification failed: ${json.emailError}`);
      }
      setSubmitted(true);
    } catch {
      setServerError("Network error. Please check your connection and try again.");
    }
  };

  if (submitted) {
    return (
      <div className="rounded-2xl border border-green-200 bg-green-50 p-8 text-center">
        <div className="mb-3 text-3xl">✓</div>
        <h3 className="mb-2 text-lg font-bold text-[var(--color-text)]">
          Enquiry submitted
        </h3>
        <p className="text-sm text-[var(--color-text-muted)]">
          Thank you for your interest in partnering with WHI-SL. Our team will review your enquiry and be in touch.
        </p>
        <p className="mt-3 text-xs text-[var(--color-text-light)]">
          Thank you! Our team will review your enquiry and be in touch.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5" aria-label="Partnership enquiry form">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Full Name" id="name" error={errors.name}>
          <input
            type="text"
            id="name"
            name="name"
            className={inputClass(!!errors.name)}
            placeholder="Your full name"
          />
        </Field>
        <Field label="Organisation" id="organisation" error={errors.organisation}>
          <input
            type="text"
            id="organisation"
            name="organisation"
            className={inputClass(!!errors.organisation)}
            placeholder="Your organisation"
          />
        </Field>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Email Address" id="email" error={errors.email}>
          <input
            type="email"
            id="email"
            name="email"
            className={inputClass(!!errors.email)}
            placeholder="your@email.com"
          />
        </Field>
        <Field label="Phone (optional)" id="phone">
          <input
            type="tel"
            id="phone"
            name="phone"
            className={inputClass(false)}
            placeholder="+232 XX XXX XXXX"
          />
        </Field>
      </div>
      <Field label="Partnership Type" id="partnershipType" error={errors.partnershipType}>
        <select
          id="partnershipType"
          name="partnershipType"
          className={inputClass(!!errors.partnershipType)}
        >
          <option value="">Select a type...</option>
          {partnershipTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </Field>
      <Field label="Message" id="message" error={errors.message}>
        <textarea
          id="message"
          name="message"
          rows={5}
          className={`${inputClass(!!errors.message)} resize-none`}
          placeholder="Tell us about your organisation and how you'd like to partner with WHI-SL..."
        />
      </Field>
      <button
        type="submit"
        className="w-full rounded-full px-6 py-3 font-semibold text-white transition-all duration-200 hover:opacity-90"
        style={{ backgroundColor: "var(--color-primary)" }}
      >
        Submit Partnership Enquiry
      </button>
      {serverError && (
        <p className="text-sm text-red-600" role="alert">{serverError}</p>
      )}
    </form>
  );
}

function inputClass(hasError: boolean) {
  return `w-full rounded-xl border px-4 py-3 text-sm transition-colors focus:outline-none focus:ring-2 ${
    hasError
      ? "border-red-400 bg-red-50 focus:ring-red-300"
      : "border-[var(--color-border)] bg-white focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)]"
  }`;
}

function Field({
  label,
  id,
  error,
  children,
}: {
  label: string;
  id: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-[var(--color-text)]">
        {label}
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
