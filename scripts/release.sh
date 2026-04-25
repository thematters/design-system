#!/usr/bin/env bash
# Release script invoked by changesets/action@v1's `publish` step.
#
# Two-phase logic:
#   1. Always build the publishable packages (so the local artifacts
#      match the version that was just bumped).
#   2. Only run `changeset publish` if NPM_TOKEN is set. Without a token
#      we'd hit npm with `ENEEDAUTH` and the whole job goes red — that
#      noise hides real failures, so we skip cleanly instead.
#
# When the token does land later, just re-run the workflow:
#   Actions → Release → Run workflow
set -euo pipefail

pnpm -r --filter './packages/*' build

if [ -z "${NPM_TOKEN:-}" ]; then
  echo "::warning::NPM_TOKEN is not set — skipping npm publish."
  echo "Add the secret in repo Settings → Secrets and variables → Actions,"
  echo "then re-run this workflow to publish."
  exit 0
fi

pnpm changeset publish
