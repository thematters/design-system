#!/usr/bin/env node
// Backward-compat forwarder.
// Source moved to packages/tokens/. This entry point still works so that
// existing CI / scripts / vendored-copy users invoking
// `node tokens/build.mjs` keep functioning.
//
// Phase 1 monorepo migration: see docs/architecture.md.

import "../packages/tokens/build.mjs";
