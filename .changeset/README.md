# Changesets

Versioning for the publishable packages in this monorepo
(`@matters/design-system-tokens` and `@matters/design-system-react`).

## When you make a change that affects either package

1. Run `pnpm changeset` (after committing your code)
2. Pick which packages changed
3. Pick the bump level: **patch** (fix), **minor** (new feature, backwards-compatible), **major** (breaking change)
4. Write a one-line summary — this becomes the changelog entry
5. Commit the new file under `.changeset/`

That's it. The release workflow handles the rest.

## When the changesets bot opens "Version Packages" PR

This PR aggregates all pending changesets into version bumps + CHANGELOG.md
updates. Review the diff, make sure the changelog reads well, then merge.

Merging the Version PR triggers the release workflow → publishes to npm.

## What's "linked"

`tokens` and `react` are linked: they always share the same major.minor
version. Patch versions can drift independently. This avoids the trap of
"do I need a tokens 0.4.1 to ship a react 0.5.0?" — they stay in lockstep
on the headline number.

## Phase 5 init note

The first publish is `0.1.0`. Pre-1.0 means breaking changes can land in
minor bumps; we'll switch to strict semver once the API has been validated
by 1+ Matters product surface.
