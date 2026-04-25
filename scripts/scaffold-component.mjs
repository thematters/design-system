#!/usr/bin/env node
// scaffold-component — Phase 1 stub.
//
// Goal: support the "shadcn-style" copy-and-own consumption mode in
// parallel with the npm-package mode. From a consumer repo, you'll be
// able to run something like:
//
//   pnpm dlx @matters/design-system-cli add Button --to ./src/components
//
// which copies Button.tsx + Button.module.css into the consumer's repo
// (no runtime dep on the package). Useful when the consumer wants to
// own and modify the source.
//
// Phase 1 just prints the plan. Phase 2 will implement the copy logic
// after we have ≥2 components shipping.

import { argv, exit } from "node:process";

const args = argv.slice(2);
const [name] = args;

console.log(`
  Matters Design System — scaffold-component
  ------------------------------------------

  Phase 1 STATUS: stub. The CLI surface is reserved but the implementation
  ships in Phase 2.

  Planned usage (Phase 2+):
    node scripts/scaffold-component.mjs <ComponentName> --to <path>
    pnpm dlx @matters/design-system-cli add <ComponentName>

  What it will do:
    1. Copy packages/react/src/components/<Name>/{tsx, module.css, index.ts}
       into the consumer repo at <path>/<Name>/.
    2. Rewrite token CSS-var references so they resolve from the consumer's
       imported tokens.css (no path rewrites needed; CSS vars are global).
    3. Drop the runtime dep on @matters/design-system-react in favour of
       a build-time copy. Consumer owns the source thereafter.

  Why both modes:
    - npm package    → low maintenance, automatic updates, good for prod apps
    - copy-and-own   → full customisation, no version coupling, good for
                       landing pages / one-off marketing sites

  Today: ${name ? `requested "${name}", but` : "no component requested,"} the CLI is not yet wired.
  Track progress at PR for Phase 2.
`);

exit(0);
