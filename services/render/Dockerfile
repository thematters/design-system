# syntax=docker/dockerfile:1.7
#
# matters-render — HTTP wrapper around the Phase 6 Playwright renderer.
#
# The base image already ships Chromium + system deps, so we don't pay
# `playwright install` cost at runtime.
#
# Build context: the monorepo ROOT (so we can reach templates/, packages/,
# pnpm-workspace.yaml).
#
#   docker build -f services/render/Dockerfile -t matters-render .

# ---------- builder: install + compile TS ----------
FROM mcr.microsoft.com/playwright:v1.48.0-jammy AS builder

ENV PNPM_HOME=/root/.local/share/pnpm
ENV PATH=$PNPM_HOME:$PATH

RUN corepack enable && corepack prepare pnpm@9.15.0 --activate

WORKDIR /app

# Workspace manifests first for better layer caching
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml tsconfig.base.json ./
COPY services/render/package.json ./services/render/
# Workspace siblings — pnpm needs their manifests to resolve the graph,
# even though the service doesn't depend on them at runtime.
COPY packages/tokens/package.json ./packages/tokens/
COPY packages/react/package.json ./packages/react/

RUN pnpm install --frozen-lockfile --filter @matters/design-system-render-service...

# Source for the service + the templates it renders + the renderer's
# relative repo-root anchor (this image runs from /app so REPO_ROOT
# resolves correctly).
COPY services/render ./services/render
COPY templates ./templates
COPY packages/tokens ./packages/tokens

RUN pnpm --filter @matters/design-system-render-service build

# ---------- runtime ----------
FROM mcr.microsoft.com/playwright:v1.48.0-jammy AS runtime

ENV NODE_ENV=production
ENV PORT=3000
ENV PNPM_HOME=/root/.local/share/pnpm
ENV PATH=$PNPM_HOME:$PATH

RUN corepack enable && corepack prepare pnpm@9.15.0 --activate

WORKDIR /app

# Copy the built service + everything renderTemplate() reads at runtime
# (templates/, the bundled tokens CSS the templates <link> to).
COPY --from=builder /app/package.json /app/pnpm-lock.yaml /app/pnpm-workspace.yaml /app/tsconfig.base.json ./
COPY --from=builder /app/services/render ./services/render
COPY --from=builder /app/templates ./templates
COPY --from=builder /app/packages ./packages
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000

WORKDIR /app/services/render
CMD ["node", "dist/index.js"]
