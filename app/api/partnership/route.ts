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

async function sendEmail(data: { name: string; email: string; organisation: string; phone: string; partnershipType: string; message: string }) {
  // Try Resend first, fallback to SMTP
  if (process.env.RESEND_API_KEY) {
    const { Resend } = await import("resend");
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: "WHI-SL Partnerships <noreply@whi-sl.org>",
      to: process.env.CONTACT_EMAIL || "mayintake351@gmail.com",
      subject: `[WHI-SL Partnership] ${data.partnershipType}`,
      html: `
        <h2>New Partnership Enquiry</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Organisation:</strong> ${data.organisation}</p>
        <p><strong>Phone:</strong> ${data.phone || "—"}</p>
        <p><strong>Partnership Type:</strong> ${data.partnershipType}</p>
        <p><strong>Message:</strong></p>
        <p style="white-space:pre-wrap">${data.message}</p>
      `,
    });
    if (error) throw error;
    return { delivered: true };
  }

  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
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
      subject: `[WHI-SL Partnership] ${data.partnershipType}`,
      html: `
        <h2>New Partnership Enquiry</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Organisation:</strong> ${data.organisation}</p>
        <p><strong>Phone:</strong> ${data.phone || "—"}</p>
        <p><strong>Partnership Type:</strong> ${data.partnershipType}</p>
        <p><strong>Message:</strong></p>
        <p style="white-space:pre-wrap">${data.message}</p>
      `,
    });
    return { delivered: true };
  }

  console.log("[WHI-SL] Partnership form (no email config):", { name: data.name, email: data.email, partnershipType: data.partnershipType });
  return { delivered: false };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const name = sanitize(body.name);
    const email = sanitize(body.email);
    const organisation = sanitize(body.organisation);
    const phone = sanitize(body.phone);
    const partnershipType = sanitize(body.partnershipType);
    const message = sanitize(body.message);

    if (!name || !organisation || !email || !partnershipType || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    // Store in MongoDB
    const db = await getDb();
    await db.collection("partnerships").insertOne({
      _id: new ObjectId(),
      name,
      email,
      organisation,
      phone,
      partnershipType,
      message,
      read: false,
      createdAt: new Date(),
    });
    revalidatePath("/admin/partnerships");

    // Send email
    const emailResult = await sendEmail({ name, email, organisation, phone, partnershipType, message });

    return NextResponse.json({ ok: true, delivered: emailResult.delivered });
  } catch (error) {
    console.error("[api/partnership] POST error:", error);
    return NextResponse.json({ error: "Failed to send enquiry" }, { status: 500 });
  }
}
