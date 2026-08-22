import { defineConfig } from "prisma/config";

export default defineConfig({
  datasource: {
    url: "file:./dev.db",
  },
  migrations: {
    seed: "node --import=tsx prisma/seed.ts",
  },
});
