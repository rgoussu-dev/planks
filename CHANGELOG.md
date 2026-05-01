# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [v0.2.1] - 2026-05-01

### Changed

- Publish workflow now uses **npm trusted publishing** (OIDC) instead of a
  long-lived `NPM_TOKEN` secret. The workflow requests an ephemeral identity
  token from GitHub Actions (`id-token: write`) and runs
  `npm publish --provenance --access public`, which also attaches a
  build-provenance attestation to the released package.
- Requires the package to have a configured trusted publisher on npmjs.com
  (Settings → Publishing access → Trusted publisher) pointing at this repo
  and the `publish.yml` workflow.

### Added

- `package.json` now declares `repository`, `homepage`, and `bugs`. The
  `repository` field is required by `npm publish --provenance` to anchor
  the build attestation to the source repo.
- README: per-component reference of all overridable CSS custom properties
  (`--box-padding`, `--stack-space`, `--cluster-gap`, …) and their attribute
  mappings, plus a table of the `tokens.css` globals (`--ratio`, `--s-10`
  … `--s10`, `--measure`, font/color tokens).

### Removed

- `NODE_AUTH_TOKEN` env var and the `NPM_TOKEN` repository secret are no
  longer used by the publish workflow. The secret can now be deleted from
  the repository settings.

## [v0.2.0] - 2026-05-01

### Added

- `CHANGELOG.md` following the Keep a Changelog convention.
- Per-component and consolidated `.d.ts` type definitions that augment
  `HTMLElementTagNameMap`, so `document.createElement` /
  `document.querySelector` return the correct component class.
- Publish workflow now creates a GitHub Release for each `v*` tag, using the
  matching section of `CHANGELOG.md` as the release notes.
- README: light-DOM architecture section, `<cover-pk>` API note
  (`data-pk-centered` is canonical, `slot="centered"` accepted), TypeScript
  usage, and a Storybook link.

### Fixed

- README package name (`@rgoussu-dev/planks` → `@rgoussu.dev/planks`) and the
  outdated "shadow DOM" / `LayoutShadowElementPk` references left over from
  the 0.2.0 light-DOM refactor.

## [0.2.0] - 2026-05-01

### Changed

- **BREAKING:** Dropped shadow DOM in favour of light-DOM stylesheet
  injection. Component styles are now applied to the host document via a
  single `<style>` tag per element type, allowing global tokens and consumer
  CSS to cascade naturally.
- Hardened CI/publish workflows: actions pinned to SHAs, Node 24, pnpm setup
  via `pnpm/action-setup`.

## [0.1.0] - 2026-05-01

### Added

- Initial extraction of layout web components from `eclipse-second-dawn`:
  `<box-pk>`, `<center-pk>`, `<cluster-pk>`, `<container-pk>`, `<cover-pk>`,
  `<frame-pk>`, `<grid-pk>`, `<icon-pk>`, `<imposter-pk>`, `<reel-pk>`,
  `<sidebar-pk>`, `<stack-pk>`, `<switcher-pk>`, `<typography-pk>`.
- Design tokens (`tokens.css`) exposing a modular scale, `--measure`, and
  base font/color tokens.
- Optional global resets in `styles.css`.

### Fixed

- Missing global styles when consuming the package without the resets entry.

[Unreleased]: https://github.com/rgoussu-dev/planks/compare/v0.2.1...HEAD
[v0.2.1]: https://github.com/rgoussu-dev/planks/compare/v0.2.0...v0.2.1
[v0.2.0]: https://github.com/rgoussu-dev/planks/compare/v0.1.0...v0.2.0
[0.2.0]: https://github.com/rgoussu-dev/planks/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/rgoussu-dev/planks/releases/tag/v0.1.0
