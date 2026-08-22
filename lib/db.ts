import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// On Vercel (VERCEL=1): connect to PostgreSQL via DATABASE_URL
// On local dev: connect to SQLite via file:./prisma/dev.db
const isVercel = process.env.VERCEL === "1";

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    ...(isVercel
      ? { adapter: new PrismaPg(process.env.DATABASE_URL ?? "") }
      : { adapter: new PrismaBetterSqlite3({ url: "file:./prisma/dev.db" }) }),
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
