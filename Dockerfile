# --- Stage 1: Build Dilakukan di Laptop/CI ---
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# --- Stage 2: Runtime (Hasil akhir yang ringan untuk Server) ---
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3001
ENV HOSTNAME="0.0.0.0"

RUN addgroup --system --gid 1001 nodejs
RUN addgroup --system --gid 1002 nextjs
RUN adduser --system --uid 1001 --ingroup nodejs nextjs

# Menyalin hasil build mode standalone
COPY --chown=nextjs:nextjs --from=builder /app/.next/standalone ./
COPY --chown=nextjs:nextjs --from=builder /app/.next/static ./.next/static
COPY --chown=nextjs:nextjs --from=builder /app/public ./public

USER nextjs

EXPOSE 3001

CMD ["node", "server.js"]