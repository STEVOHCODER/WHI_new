import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 10;
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

function getClientIp(request: NextRequest) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "anonymous"
  );
}

function checkRateLimit(ip: string) {
  const now = Date.now();
  const current = rateLimitStore.get(ip);

  if (!current || current.resetAt <= now) {
    rateLimitStore.set(ip, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });
    return { allowed: true, remaining: RATE_LIMIT_MAX_REQUESTS - 1 };
  }

  if (current.count >= RATE_LIMIT_MAX_REQUESTS) {
    return { allowed: false, remaining: 0 };
  }

  current.count += 1;
  return { allowed: true, remaining: RATE_LIMIT_MAX_REQUESTS - current.count };
}

function sanitize(value: string | null | undefined) {
  if (!value) return "";
  return value.replace(/[<>]/g, "").trim();
}

/**
 * Returns a proxy URL only when the host is a private/local IP.
 * Vercel and other serverless platforms have direct internet — proxying
 * through a local hotspot (192.168.x.x) would fail in production.
 */
function getProxyUrl(): string | undefined {
  const raw =
    process.env.HTTP_PROXY ||
    process.env.HTTPS_PROXY ||
    process.env.ALL_PROXY;
  if (!raw) return undefined;
  try {
    const { hostname } = new URL(raw);
    // Only use proxy for private/local addresses
    const isPrivate =
      hostname === "localhost" ||
      hostname.startsWith("127.") ||
      hostname.startsWith("192.168.") ||
      hostname.startsWith("10.") ||
      hostname.startsWith("172.") ||
      hostname.startsWith("fe80") ||
      hostname.startsWith("::1");
    return isPrivate ? raw : undefined;
  } catch {
    return undefined;
  }
}

async function sendEmailViaSMTP(data: {
  name: string;
  email: string;
  organisation: string;
  subject: string;
  message: string;
}) {
  const nodemailer = await import("nodemailer");

  const proxyUrl = getProxyUrl();

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    ...(proxyUrl ? { proxy: proxyUrl } : {}),
  });

  const html = `
    <h2>New Contact Form Submission</h2>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    <p><strong>Organisation:</strong> ${data.organisation || "—"}</p>
    <p><strong>Subject:</strong> ${data.subject}</p>
    <p><strong>Message:</strong></p>
    <p style="white-space:pre-wrap">${data.message}</p>
  `;

  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: process.env.CONTACT_EMAIL || "info@whi-sl.org",
    subject: `[WHI-SL Contact] ${data.subject}`,
    html,
  });

  return { delivered: true };
}

async function sendEmailViaResend(data: {
  name: string;
  email: string;
  organisation: string;
  subject: string;
  message: string;
}) {
  const { Resend } = await import("resend");
  const resend = new Resend(process.env.RESEND_API_KEY);

  const { data: result, error } = await resend.emails.send({
    from: "WHI-SL Contact <noreply@whi-sl.org>",
    to: process.env.CONTACT_EMAIL || "info@whi-sl.org",
    subject: `[WHI-SL Contact] ${data.subject}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Organisation:</strong> ${data.organisation || "—"}</p>
      <p><strong>Subject:</strong> ${data.subject}</p>
      <p><strong>Message:</strong></p>
      <p style="white-space:pre-wrap">${data.message}</p>
    `,
  });

  if (error) throw error;
  return { delivered: true, messageId: result?.id };
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  const rateLimit = checkRateLimit(ip);

  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a moment and try again." },
      { status: 429 },
    );
  }

  const formData = await request.formData();
  const name = sanitize(formData.get("name") as string);
  const email = sanitize(formData.get("email") as string);
  const organisation = sanitize(formData.get("organisation") as string);
  const subject = sanitize(formData.get("subject") as string);
  const message = sanitize(formData.get("message") as string);

  if (!name || !email || !subject || !message) {
    return NextResponse.json(
      { error: "Please fill in all required fields." },
      { status: 400 },
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  try {
    if (process.env.RESEND_API_KEY) {
      await sendEmailViaResend({ name, email, organisation, subject, message });
    } else if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      await sendEmailViaSMTP({ name, email, organisation, subject, message });
    } else {
      console.log("[WHI-SL] Contact form submission (no email configured):", { name, email, subject, message });
      return NextResponse.json({ ok: true, delivered: false, message: "Form submitted — no email configuration found, but submission recorded." });
    }

    return NextResponse.json({ ok: true, delivered: true, message: "Message sent successfully." });
  } catch (error: unknown) {
    const err = error as { code?: string; responseCode?: number; message?: string; response?: string };
    console.error("[WHI-SL] Contact form email error:", {
      code: err.code,
      responseCode: err.responseCode,
      message: err.message,
      response: err.response,
    });
    return NextResponse.json(
      { error: "Failed to send message. Please try again or email us directly." },
      { status: 500 },
    );
  }
}
