import { defineConfig } from "prisma/config";
import { PrismaPg } from "@prisma/adapter-pg";

// Local dev: SQLite (file:./prisma/dev.db)
// Vercel production: PostgreSQL (DATABASE_URL from Vercel dashboard)
const isVercel = process.env.VERCEL === "1";

export default defineConfig({
  datasource: {
    url: isVercel
      ? process.env.DATABASE_URL ?? "placeholder"
      : "file:./prisma/dev.db",
  },
  migrations: {
    seed: "node --import=tsx prisma/seed.ts",
  },
  // Adapter for prisma migrate/dev commands on Vercel
  ...(isVercel && process.env.DATABASE_URL
    ? { adapter: new PrismaPg(process.env.DATABASE_URL) }
    : {}),
});
