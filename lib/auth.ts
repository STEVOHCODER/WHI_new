import bcrypt from "bcryptjs";

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

export async function seedDefaultAdmin() {
  const { getDb } = await import("@/lib/mongo");
  const db = await getDb();
  const existing = await db.collection("admins").findOne({});
  if (existing) return;
  const hash = await hashPassword("admin@whi-sl.org");
  await db.collection("admins").insertOne({
    email: "admin@whi-sl.org",
    passwordHash: hash,
    createdAt: new Date(),
  });
  console.log("[auth] Seeded default admin: admin@whi-sl.org / admin@whi-sl.org");
}
