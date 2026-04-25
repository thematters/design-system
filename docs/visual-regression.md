# Visual regression

Why our Storybook screenshots don't drift between releases.

## Stack

- **Playwright** runs Chromium against the built static Storybook
- Snapshots committed under `tests/visual/__snapshots__/`
- Linux-pinned baseline (CI is the source of truth — local macOS / Windows
  runs WILL produce diffs because of font + sub-pixel anti-aliasing)
- Tolerance: `maxDiffPixelRatio: 0.01` (~1% pixels can differ before the
  test fails — keeps the suite stable against minor render variation)

## When does it run?

| Trigger                                   | Action                                              |
| ----------------------------------------- | --------------------------------------------------- |
| Push to PR (changes in packages or tests) | Compares against committed baseline; fails on drift |
| `workflow_dispatch` with `update=true`    | Regenerates baseline; commits back to the branch    |
| Push to main without UI changes           | Skipped (path filter)                               |

## Adding a new story to coverage

Edit `tests/visual/components.spec.ts` and append to the `STORIES` array:

```ts
{ id: "components-mycomponent--default", name: "mycomponent-default" },
```

Story IDs follow Storybook's auto-generated kebab convention:
`title:"Components/MyComponent"` + export `Default` → `components-mycomponent--default`.

## Updating snapshots

You'll see a CI failure that says "Screenshot comparison failed". Two paths:

### If the change is intentional

1. Open the failing PR
2. Go to **Actions → Visual regression → Run workflow**
3. Pick your branch, set `update=true`, run
4. The workflow regenerates baselines and commits them to your branch
5. CI will go green next push

### If the change is NOT intentional

That's the bug the visual regression caught. Fix the underlying CSS / markup,
push again, baseline stays untouched.

## Why not Chromatic?

Chromatic is the easier ergonomics — better diff UI, smarter flake
handling. We picked Playwright because:

- No external service / SSO / billing relationship
- Snapshots live in the repo (greppable, branchable, reviewable in PRs)
- Same tooling that's already used elsewhere at Matters
- Free tier of Chromatic has rate limits we'd hit on a busy day

If the Playwright suite gets flaky enough to outweigh those, we can
revisit. Migration is just changing `tests/visual/` and the workflow.

## Local development

```bash
# One-time: install browsers
pnpm exec playwright install chromium

# Build Storybook
pnpm build:tokens
pnpm build:storybook

# Run the suite
pnpm test:visual
```

Local runs WILL fail snapshot comparisons against the Linux baseline. If
you want a clean local run, generate a separate macOS/Windows baseline:

```bash
pnpm test:visual:update
```

Don't commit those — `.gitignore` keeps non-Linux platforms out of the
baseline. The snapshot template at the bottom of `playwright.config.ts`
suffixes with `{platform}` so platforms don't overwrite each other.

## What the snapshots actually test

- Default render of each story at desktop viewport
- All variant matrices (Button×{primary,secondary,tertiary}×{large,medium,small} for example)
- Loading / error / placeholder states
- Compound layouts (ArticleCard with cover, without cover, placeholder)

What they DON'T test:

- Interaction states (hover, focus, active) — covered by Vitest tests
- Animations mid-flight — disabled via `animations: "disabled"`
- Mobile breakpoints — Phase 6+ if needed
