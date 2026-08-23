import { NextRequest, NextResponse } from "next/server";
import { parseSession } from "@/lib/session";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const session = await parseSession(request.headers.get("cookie"));
  if (session) {
    return NextResponse.json({ authenticated: true, email: session.email });
  }
  return NextResponse.json({ authenticated: false });
}
