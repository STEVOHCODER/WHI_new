import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const COOKIE_NAME = "whi_admin_session";

export async function POST() {
  const res = NextResponse.json({ ok: true });
  res.headers.set("set-cookie", `${COOKIE_NAME}=; Path=/; HttpOnly; Max-Age=0`);
  return res;
}
