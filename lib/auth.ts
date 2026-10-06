import bcrypt from "bcryptjs";
import type { ObjectId } from "mongodb";

interface AdminDoc {
  _id: ObjectId;
  email?: string;
  passwordHash?: string;
}

export function getAdminCredentials(): { email: string; password: string } | null {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !password) return null;
  return { email, password };
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function createInitialAdmin(email: string, password: string) {
  const { getDb } = await import("@/lib/mongo");
  const db = await getDb();
  const existing = await db.collection("admins").findOne({ email });
  if (existing) return { created: false };
  const hash = await hashPassword(password);
  await db.collection("admins").insertOne({ email, passwordHash: hash, createdAt: new Date() });
  return { created: true };
}

/**
 * Creates or rotates the admin account from ADMIN_EMAIL / ADMIN_PASSWORD.
 * Never returns or logs the password.
 */
export async function seedDefaultAdmin(): Promise<
  { seeded: boolean; created: boolean; changed: boolean; reason?: undefined } | { reason: string }
> {
  const credentials = getAdminCredentials();
  if (!credentials) {
    return { reason: "missing-env" };
  }
  const { email, password } = credentials;
  const { getDb } = await import("@/lib/mongo");
  const db = await getDb();
  const existing = await db.collection("admins").findOne<AdminDoc>({});
  if (existing) {
    const emailMatches = existing.email === email;
    const passwordMatches = existing.passwordHash
      ? await bcrypt.compare(password, existing.passwordHash)
      : false;
    if (emailMatches && passwordMatches) {
      return { seeded: true, created: false, changed: false };
    }
    const hash = await hashPassword(password);
    await db.collection("admins").updateOne(
      { _id: existing._id },
      { $set: { email, passwordHash: hash, updatedAt: new Date() } },
    );
    return { seeded: true, created: false, changed: true };
  }
  const hash = await hashPassword(password);
  await db.collection("admins").insertOne({ email, passwordHash: hash, createdAt: new Date() });
  console.log("[auth] Seeded admin account from ADMIN_EMAIL");
  return { seeded: true, created: true, changed: false };
}
