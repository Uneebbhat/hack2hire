# syntax=docker/dockerfile:1.7
ARG NODE_VERSION=22

FROM node:${NODE_VERSION}-bookworm-slim AS base
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
RUN apt-get update && apt-get install -y --no-install-recommends ca-certificates openssl \
  && rm -rf /var/lib/apt/lists/*

FROM base AS dependencies
COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm npm ci

FROM base AS development
ENV NODE_ENV=development
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]

FROM base AS builder
ENV NODE_ENV=production
# Build-time placeholders only, never real secrets. Prisma and NextAuth read these
# at import time, so `next build` fails without them — actual values are injected
# at deploy time via Vercel Environment Variables, not baked into this image.

# --- PRISMA related environment variables and commands commented out for UI-only build ---
# ENV DATABASE_URL="postgresql://hack2hire:hack2hire@postgres:5432/hack2hire?schema=public" \
#   DIRECT_URL="postgresql://hack2hire:hack2hire@postgres:5432/hack2hire?schema=public" \
#   NEXTAUTH_SECRET="build-time-placeholder-not-a-real-secret" \
#   NEXTAUTH_URL="http://localhost:3000"

ENV NEXTAUTH_SECRET="build-time-placeholder-not-a-real-secret" \
  NEXTAUTH_URL="http://localhost:3000"

COPY --from=dependencies /app/node_modules ./node_modules
COPY . .
# RUN npx prisma generate   # <-- Commented out for UI-only build
RUN --mount=type=cache,target=/app/.next/cache npm run build

FROM node:${NODE_VERSION}-bookworm-slim AS runner
WORKDIR /app
ENV NODE_ENV=production \
  NEXT_TELEMETRY_DISABLED=1 \
  PORT=3000 \
  HOSTNAME=0.0.0.0
RUN apt-get update && apt-get install -y --no-install-recommends ca-certificates openssl \
  && rm -rf /var/lib/apt/lists/* \
  && groupadd --system --gid 1001 nodejs \
  && useradd --system --uid 1001 --gid nodejs nextjs
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
RUN mkdir -p .next/cache && chown -R nextjs:nodejs .next
USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]