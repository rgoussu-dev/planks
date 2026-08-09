# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.3.0] - 2026-08-09

### Fixed

- `tokens.css`: `--s-10` was computed from `--s9` instead of `--s-9`, so the
  smallest step of the modular scale resolved to the same value as `--s8`
  (~410px instead of ~0.27px at default ratio).
- The named class exports documented in the README (`import type { Box, Stack }
  from '@rgoussu.dev/planks'`) now actually exist: each component's index
  re-exports its class by name, since `export *` skips default exports and the
  package root previously exposed only `LayoutElementPk`. A test guards the
  full export surface.
- `package.json` `exports`: the `types` condition now comes first, as
  TypeScript requires under `moduleResolution: bundler`/`node16` — previously
  some consumer configs would miss the declarations entirely.
- `<reel-pk>` rechecks overflow when `itemWidth`/`space`/`height` change:
  those alter `scrollWidth` without resizing the element, so neither the
  ResizeObserver nor the MutationObserver fired and the `overflowing` class
  went stale.
- **Dynamic attribute updates now restyle in real browsers.** `observedAttributes`
  listed camelCase names (`borderWidth`, `minHeight`, `itemWidth`, …), but HTML
  stores attribute names lowercased and browsers match `observedAttributes` by
  exact string — so changing any multi-word attribute (or its property setter)
  after connect never fired `attributeChangedCallback` and silently did nothing.
  Initial render was unaffected (styles apply on connect), which is why static
  pages never noticed. All observed names are now lowercase; a regression test
  guards the invariant, since happy-dom matches case-insensitively and hides
  this class of bug from the unit suite.
- **SSR-safe import.** The package crashed at import time without a DOM
  (`window is not defined` in the registration guards, `HTMLElement is not
  defined` in the base class). Registration is now guarded with
  `typeof window !== 'undefined'` and the base class falls back to a plain
  class outside the browser, so Node/SSR/prerender pipelines can import the
  package; elements register client-side as before.
- `styles.css`: the `max-inline-size: none` exemption list (`html`, `body`,
  `div`, …, `[data-role="layout"]`) is now wrapped in `:where()` so it has
  zero specificity. Previously the `[data-role="layout"]` attribute selector
  (specificity 0-1-0) outweighed components' own tag-scoped structural rules
  (0-0-1) — most visibly `center-pk`, whose
  `max-inline-size: var(--center-max-width, var(--measure))` never applied
  when `styles.css` was loaded, which also collapsed its auto margins and
  disabled centering entirely. The exemption still overrides the universal
  measure clamp above it via source order.

### Added

- While its content overflows, `<reel-pk>` makes itself keyboard-focusable
  (`tabindex="0"`) so keyboard users can scroll the region; an author-set
  `tabindex` is never overridden, and the managed one is removed when the
  overflow goes away. The README recommends an `aria-label` for scrollable
  reels.
- `LICENSE` file (MIT) — the license was declared in `package.json` but the
  text was missing from the repo and the published tarball.
- `@rgoussu.dev/planks/structural` — a build-generated `structural.css`
  containing every component's structural stylesheet, exactly as the runtime
  would inject it. SSR and static consumers link it so layout applies before
  (or without) JavaScript, eliminating the flash of unstyled layout.
- Dynamic-update unit tests (one attribute per assertion, set after connect)
  and a node-environment test asserting the package imports without a DOM.
- README: "Dynamic apps & SPAs" (reactivity model, the framework `style`-binding
  caveat, React/Vue/Svelte notes), "SSR & static sites", and attribute-casing
  documentation.

## [0.2.1] - 2026-05-01

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

## [0.2.0] - 2026-05-01

### Changed

- **BREAKING:** Dropped shadow DOM in favour of light-DOM stylesheet
  injection. Component styles are now applied to the host document via a
  single `<style>` tag per element type, allowing global tokens and consumer
  CSS to cascade naturally.
- Hardened CI/publish workflows: actions pinned to SHAs, Node 24, pnpm setup
  via `pnpm/action-setup`.

### Added

- `CHANGELOG.md` following the Keep a Changelog convention.
- Per-component and consolidated `.d.ts` type definitions that augment
  `HTMLElementTagNameMap`, so `document.createElement` /
  `document.querySelector` return the correct component class.
- Publish workflow creates a GitHub Release for each pushed tag, using the
  matching section of `CHANGELOG.md` as the release notes.
- README: light-DOM architecture section, `<cover-pk>` API note
  (`data-pk-centered` is canonical, `slot="centered"` accepted), TypeScript
  usage, and a Storybook link.

### Fixed

- README package name (`@rgoussu-dev/planks` → `@rgoussu.dev/planks`) and the
  outdated "shadow DOM" / `LayoutShadowElementPk` references left over from
  the 0.2.0 light-DOM refactor.

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

[Unreleased]: https://github.com/rgoussu-dev/planks/compare/0.2.1...HEAD
[0.2.1]: https://github.com/rgoussu-dev/planks/compare/0.2.0...0.2.1
[0.2.0]: https://github.com/rgoussu-dev/planks/releases/tag/0.2.0
