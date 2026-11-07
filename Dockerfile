# syntax=docker/dockerfile:1

# ---- deps: install with build tooling available (native modules) ----
FROM node:22 AS deps
WORKDIR /app
COPY package.json package-lock.json ./
# `npm install` rather than `npm ci`: the lockfile is generated on Windows,
# so it omits the wasm32-only @emnapi/* entries that Linux @tailwindcss/oxide
# needs. npm ci rejects it as out of sync; npm install reconciles the tree.
RUN npm install --no-audit --no-fund

# ---- builder: produce the Next.js standalone bundle ----
FROM node:22 AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# ---- runner: minimal image, non-root ----
FROM node:22-slim AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN groupadd --system --gid 1001 nodejs \
 && useradd --system --uid 1001 --gid nodejs nextjs

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

RUN chown -R nextjs:nodejs /app
USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

CMD ["node", "server.js"]
