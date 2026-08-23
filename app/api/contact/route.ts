import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongo";
import { revalidatePath } from "next/cache";
import { ObjectId } from "mongodb";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function sanitize(value: string | null | undefined) {
  if (!value) return "";
  return value.replace(/[<>]/g, "").trim();
}

async function sendEmail(data: { name: string; email: string; organisation: string; subject: string; message: string }) {
  // Try Resend first, fallback to SMTP
  if (process.env.RESEND_API_KEY) {
    const { Resend } = await import("resend");
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: "WHI-SL Contact <noreply@whi-sl.org>",
      to: process.env.CONTACT_EMAIL || "mayintake351@gmail.com",
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
    return { delivered: true };
  }

  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    try {
      const nodemailer = await import("nodemailer");
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: Number(process.env.SMTP_PORT) === 465,
        auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
      });
      await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: process.env.CONTACT_EMAIL || "mayintake351@gmail.com",
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
      return { delivered: true };
    } catch (smtpErr) {
      console.error("[api/contact] SMTP error:", smtpErr);
      return { delivered: false, error: (smtpErr as Error).message };
    }
  }

  // No email config — just log
  console.log("[WHI-SL] Contact form (no email config):", { name: data.name, email: data.email, subject: data.subject });
  return { delivered: false };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const name = sanitize(body.name);
    const email = sanitize(body.email);
    const organisation = sanitize(body.organisation);
    const subject = sanitize(body.subject);
    const message = sanitize(body.message);

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    // Store in MongoDB
    const db = await getDb();
    await db.collection("contacts").insertOne({
      _id: new ObjectId(),
      name,
      email,
      organisation,
      subject,
      message,
      read: false,
      createdAt: new Date(),
    });
    revalidatePath("/admin/contacts");

    // Send email (best-effort — form is still saved even if email fails)
    let emailResult: { delivered: boolean; error?: string } = { delivered: false };
    try {
      emailResult = await sendEmail({ name, email, organisation, subject, message });
    } catch (emailErr) {
      console.error("[api/contact] Email delivery failed:", emailErr);
    }

    return NextResponse.json({
      ok: true,
      stored: true,
      delivered: emailResult.delivered,
      emailError: emailResult.error || null,
    });
  } catch (error) {
    console.error("[api/contact] POST error:", error);
    return NextResponse.json(
      { error: "Failed to process submission", details: (error as Error).message },
      { status: 500 },
    );
  }
}
