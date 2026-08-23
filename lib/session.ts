const SECRET = process.env.ADMIN_SESSION_SECRET || "whi-sl-admin-session-secret-change-in-production";
const COOKIE_NAME = "whi_admin_session";

export interface SessionPayload {
  email: string;
}

export async function createSession(email: string): Promise<{ token: string; cookie: string }> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey("raw", encoder.encode(SECRET), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const signatureBuffer = await crypto.subtle.sign("HMAC", key, encoder.encode(email));
  const signature = Array.from(new Uint8Array(signatureBuffer)).map((b) => b.toString(16).padStart(2, "0")).join("");
  const value = `${email}.${signature}`;
  const cookie = `${COOKIE_NAME}=${value}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${60 * 60 * 24}; Secure`;
  return { token: value, cookie };
}

export async function parseSession(cookieHeader: string | null): Promise<SessionPayload | null> {
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

export function getAuthHeaders(cookieHeader: string | null): Headers {
  const headers = new Headers();
  // Note: parseSession is async, so this is a simplified sync version
  return headers;
}
