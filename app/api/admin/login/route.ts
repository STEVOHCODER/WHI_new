import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongo";
import { comparePassword } from "@/lib/auth";
import { createSession } from "@/lib/session";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function wantsRedirect(request: NextRequest): boolean {
  return (request.headers.get("content-type") || "").includes("application/x-www-form-urlencoded");
}

export async function POST(request: NextRequest) {
  let email: string | null = null;
  let password: string | null = null;

  const isForm = wantsRedirect(request);

  try {
    if (isForm) {
      const form = await request.formData();
      email = form.get("email") as string | null;
      password = form.get("password") as string | null;
    } else {
      const body = await request.json();
      email = body.email ?? null;
      password = body.password ?? null;
    }

    if (!email || !password) {
      if (isForm) {
        return NextResponse.redirect(new URL("/login?error=1", request.url), 303);
      }
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    const db = await getDb();
    const admin = await db.collection("admins").findOne({ email });
    const valid = admin
      ? await comparePassword(password, (admin as unknown as { passwordHash: string }).passwordHash)
      : false;

    if (!valid) {
      if (isForm) {
        return NextResponse.redirect(new URL("/login?error=1", request.url), 303);
      }
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const { cookie } = await createSession(email);

    if (isForm) {
      const res = NextResponse.redirect(new URL("/admin", request.url), 303);
      res.headers.set("set-cookie", cookie);
      return res;
    }

    const res = NextResponse.json({ ok: true, email });
    res.headers.set("set-cookie", cookie);
    return res;
  } catch (error) {
    console.error("[admin/login] error:", error);
    if (isForm) {
      return NextResponse.redirect(new URL("/login?error=1", request.url), 303);
    }
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}
