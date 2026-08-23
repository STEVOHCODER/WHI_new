import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongo";
import { comparePassword } from "@/lib/auth";
import { createSession } from "@/lib/session";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }
    const db = await getDb();
    const admin = await db.collection("admins").findOne({ email });
    if (!admin) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }
    const valid = await comparePassword(password, (admin as unknown as { passwordHash: string }).passwordHash);
    if (!valid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }
    const { cookie } = await createSession(email);
    const res = NextResponse.json({ ok: true, email });
    res.headers.set("set-cookie", cookie);
    return res;
  } catch (error) {
    console.error("[admin/login] error:", error);
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}
