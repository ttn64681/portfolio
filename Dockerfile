## DEPENDENCIES IMAGE (purely to install dependencies; files like package.json aren't needed)
# Use Node.js 24-alpine as base image (Linux & Node.js v24 installed)
FROM node:24-alpine AS deps
# set work dir; every command after this will be executed in ts dir (/app)
WORKDIR /app
# copy packages into curr dir (/app)
COPY package.json package-lock.json ./
# cherrypick-installs dependencies (ci more convenient, cleaner, and faster than install)
RUN npm ci

## BUILDER IMAGE (files like node_modules aren't needed)
FROM node:24-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
# single . at beginning -> your project folder
# second ./ -> curr dir (/app)
COPY . ./
# disable telemetry (next.js collects usage data by default)
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

## PRODUCTION IMAGE (the final image only contains these)
FROM node:24-alpine AS runner
WORKDIR /app
# by default, Next.js listens on localhost; this makes it listen on all interfaces
# so app is accessible from other containers on the same network
ENV HOSTNAME=0.0.0.0
# tells Node.js and Next.js to optimize performance and turn off dev features
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
# by default, Docker containers run as root; this creates non-root user and group
# --system creates "system user/group" which tells Linux ts is just a background service
RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nextjs
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs
# 'sticky note' for devs (3000 is default for Next.js apps)
EXPOSE 3000
# "server.js" is entry point for Next.js app in standalone mode
CMD ["node", "server.js"]