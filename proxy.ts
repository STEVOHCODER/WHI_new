import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const SECRET = process.env.ADMIN_SESSION_SECRET || "whi-sl-admin-session-secret-change-in-production";
const COOKIE_NAME = "whi_admin_session";

async function parseSession(cookieHeader: string | null): Promise<{ email: string } | null> {
  if (!cookieHeader) return null;
  const match = cookieHeader.split("; ").find((c) => c.startsWith(`${COOKIE_NAME}=`));
  if (!match) return null;
  const value = match.split("=")[1];
  const dotIndex = value.lastIndexOf(".");
  if (dotIndex === -1) return null;
  const email = value.substring(0, dotIndex);
  const signature = value.substring(dotIndex + 1);
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey("raw", encoder.encode(SECRET), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const signatureBuffer = await crypto.subtle.sign("HMAC", key, encoder.encode(email));
  const expectedSig = Array.from(new Uint8Array(signatureBuffer)).map((b) => b.toString(16).padStart(2, "0")).join("");
  if (signature !== expectedSig) return null;
  return { email };
}

export async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isAdminRoute = path.startsWith("/admin");
  const isLoginRoute = path === "/login";
  const isApiAdmin = path.startsWith("/api/admin");

  const session = await parseSession(request.headers.get("cookie"));

  if (isAdminRoute && !isApiAdmin) {
    if (!session) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    const response = NextResponse.next();
    response.headers.set("x-admin-email", session.email);
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/login", "/api/admin/:path*"],
};
