---
name: harden-gh-actions
description: 'Harden GitHub Actions workflows against supply-chain risk by pinning every `uses:` reference to a full commit SHA (with a version comment), and optionally bump runtime versions (Node, etc.). Use when the user asks to harden CI, pin actions, or upgrade workflow dependencies.'
---

# Harden GitHub Actions

**Goal:** Replace mutable tag references (`@v4`, `@main`) in `.github/workflows/*.yml` with full commit SHAs, and optionally bump runtime/action major versions. Tag-based references can be moved by the action's owner to point at malicious code; commit SHAs cannot.


## EXECUTION

### Step 1: Inventory the workflows

- Read every file under `.github/workflows/` (any `*.yml` / `*.yaml`).
- Extract every `uses: <owner>/<repo>@<ref>` reference and any `node-version`, `python-version`, etc. runtime declarations.
- Note which references are already SHA-pinned (40-hex string) — leave those alone unless the user asked for a version bump.

### Step 2: Confirm the scope with the user (only if ambiguous)

Two orthogonal axes:
- **SHA pinning**: always do this when asked to harden.
- **Version bump**: only do this if the user asks. Default is "pin to the latest tag *in the major series the workflow already uses*" — no major-version bumps without explicit consent.
- **Runtime versions** (Node / Python / etc.): only change if the user asks. State the target explicitly back to the user before editing.

If the request is unambiguous (e.g. "pin everything to SHA, bump Node to 24"), skip the confirmation and proceed.

### Step 3: Resolve each tag to a commit SHA

For each `uses:` reference, use the GitHub CLI (`gh`) — never hand-curate SHAs from training data, they go stale and you cannot guess them.

**Pin to current major (default):**
```bash
gh api "repos/<owner>/<repo>/tags?per_page=100" \
  --jq '[.[] | select(.name | startswith("v4."))] | .[0] | {name, sha: .commit.sha}'
```

**Bump to latest release:**
```bash
gh api "repos/<owner>/<repo>/releases/latest" --jq '.tag_name'
# then resolve the tag:
gh api "repos/<owner>/<repo>/git/refs/tags/<tag>" --jq '{type: .object.type, sha: .object.sha}'
```

**Annotated tags require a second hop.** If `type` is `tag` (not `commit`), the SHA you got is the *tag object*, not the commit:
```bash
gh api "repos/<owner>/<repo>/git/tags/<tag-object-sha>" --jq '.object.sha'
```

Batch the lookups in a single Bash call with a `for` loop — one call per action wastes tokens.

### Step 4: Rewrite the workflow files

Replace `@<ref>` with `@<full-40-char-sha> # <tag>`. Keep the version comment — it is what humans and Dependabot/Renovate read; the SHA is what the runner consumes.

```yaml
# before
- uses: actions/checkout@v4

# after
- uses: actions/checkout@de0fac2e4500dabe0009e67214ff5f5447ce83dd # v6.0.2
```

If updating runtime versions, change them in the same pass:
```yaml
- uses: actions/setup-node@<sha> # v6.4.0
  with:
    node-version: '24'   # was '20'
```

### Step 5: Flag breaking changes back to the user

After the edits, surface anything the user should validate:
- Major version bumps that change runtime requirements (e.g. `actions/checkout` v5 dropped Node 20 from the runner).
- Default-behavior changes (e.g. `persist-credentials`, `fetch-depth`).
- Runtime version jumps that may break local-vs-CI parity (`engines` in `package.json`, `.nvmrc`, Dockerfiles).

Suggest a CI run on a branch before merging.


## OUTPUT FORMAT

A short summary listing, per workflow file, what changed. Group by action so the diff is auditable:

```
- actions/checkout v4.3.1 → v6.0.2 (de0fac2…)
- actions/setup-node v4.4.0 → v6.4.0 (48b55a0…)
- node-version 20 → 24 (ci.yml, docs.yml, publish.yml)
```


## HALT CONDITIONS

- HALT if `gh auth status` fails — the user must authenticate before SHAs can be resolved.
- HALT if no `.github/workflows/` directory exists — confirm with the user that this is a GitHub Actions project (e.g. it might be GitLab CI).
- HALT if any `uses:` reference points to a fork or private repo the token cannot read — surface to the user, do not guess.


## VALIDATION

- Every `uses:` reference must be a full 40-char hex SHA, not a short SHA, branch, or tag.
- Every pinned reference must keep an inline `# vX.Y.Z` comment matching the resolved tag.
- Do not pin re-usable workflow calls (`uses: ./.github/workflows/foo.yml`) — those are local file refs, not external actions.
- Do not pin Docker action references (`uses: docker://image:tag`) — those are pulled by the runner with its own pinning semantics; flag them to the user instead.
- After editing, grep the workflow files for `@v[0-9]` and `@main` / `@master` to confirm nothing was missed.