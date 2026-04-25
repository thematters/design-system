# Releasing

How `@matters/design-system-tokens` and `@matters/design-system-react` get
to npm.

## TL;DR daily flow

1. Land your component / token / fix in a feature PR
2. Run `pnpm changeset` before opening the PR — picks bump level + writes
   a changelog entry
3. Merge the PR
4. The release workflow opens (or updates) a single rolling **"chore(release): version packages"** PR
5. When ready to ship, merge the version PR — this auto-publishes to npm
   and creates a git tag

You only "release" by merging the version PR. There's no manual
`npm publish` step.

## One-time setup (Phase 5 owner action)

### 1. Confirm the `@matters` npm scope

```bash
npm org ls matters    # are we members? Are publish rights configured?
```

If the scope doesn't exist yet, the org owner needs to:

1. Sign in at npmjs.com → Profile → "Add organization"
2. Create the `matters` scope as **Free / Public packages**
3. Invite team members with publish access

### 2. Generate an npm automation token

The release workflow needs a token to publish:

1. npmjs.com → Profile → **Access Tokens → Generate New Token → Granular**
2. Name: `design-system-ci`
3. Scope:
   - **Packages and scopes**: `@matters/*`
   - **Permissions**: Read and write
4. Expiration: 1 year (set a calendar reminder to rotate)
5. Copy the token value

### 3. Add as repo secret

GitHub repo Settings → Secrets and variables → Actions → New repository secret:

- Name: `NPM_TOKEN`
- Value: the token from step 2

That's all the workflow needs. `GITHUB_TOKEN` is provided automatically.

### 4. (Optional) Two-factor on publish

If you want the OTP-on-publish protection, add `--otp` flag handling — but
this defeats automated publishing. We've chosen automation tokens (which
bypass OTP) as a deliberate trade-off; protect them with the granular
scope and rotation discipline.

## Adding a changeset

```bash
# After committing your code change, before opening the PR:
pnpm changeset
```

CLI prompts:

- Which packages bumped? (space to toggle, enter to confirm)
- What kind of bump? **patch** / **minor** / **major**
- Summary line — becomes the changelog entry

Output: a new file under `.changeset/` describing the bump. Commit it
alongside your code.

### Bump levels

We're pre-1.0. Until we cut 1.0:

- **patch** — bug fix, doc-only, no surface change
- **minor** — new component, new prop, anything additive
- **major** — DON'T. We don't bump 0.x major; breaking changes ship as minor pre-1.0 with a clear changelog entry. After we cut 1.0, breaking changes become major.

### What "linked" means

`@matters/design-system-tokens` and `@matters/design-system-react` are
declared `linked` in `.changeset/config.json`. They share the same
major.minor — when one bumps minor, the other gets at least minor too.
This avoids "do I need a tokens 0.5.1 to ship a react 0.6.0?" confusion.

## Cutting 1.0

We'll cut 1.0 when:

- At least one Matters product surface is using `@matters/design-system-react` in production
- The component API has held stable for ≥ 1 month
- We have a story for breaking-change communication (probably codemods + migration guide)

At that point, change `.changeset/config.json` if needed and bump major.

## Manual emergency publish (last resort)

If the workflow is broken and you need to ship NOW:

```bash
# Be on main, fully synced
git checkout main && git pull

# Build everything
pnpm install --frozen-lockfile
pnpm -r --filter './packages/*' build

# Publish (will prompt for OTP)
pnpm changeset publish
```

Tag and push manually if `changeset publish` couldn't (no GitHub token).
This should be rare; fix the workflow afterwards.

## Where to read changelogs

- npm package page (auto-rendered from CHANGELOG.md)
- `packages/<name>/CHANGELOG.md` (committed in the version PR)
- GitHub Releases (auto-created by `changesets/action@v1`)
