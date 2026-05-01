# @rgoussu.dev/planks

Fundamental layout web components — a small set of every-layout-style primitives shipped as native custom elements.

- **No framework.** Plain custom elements that work in any HTML page.
- **No shadow DOM.** Light-DOM only, so your global tokens and resets cascade in.
- **Tag-scoped CSS.** One structural stylesheet per element type, injected once into `document.head`.
- **Per-instance state via inline custom properties.** Override anything from the outside.

[**Storybook (live demos)**](https://rgoussu-dev.github.io/planks/) · [Changelog](./CHANGELOG.md)

## Install

```bash
pnpm add @rgoussu.dev/planks
# or
npm install @rgoussu.dev/planks
```

## Usage

A single side-effect import registers every custom element (`<box-pk>`, `<stack-pk>`, `<cluster-pk>`, …):

```ts
import '@rgoussu.dev/planks';
import '@rgoussu.dev/planks/tokens';   // CSS custom properties (modular scale, --measure, etc.)
import '@rgoussu.dev/planks/styles';   // global resets (optional)
```

```html
<stack-pk space="var(--s2)">
  <box-pk padding="var(--s1)" borderWidth="1px" borderColor="#000">
    <typography-pk variant="heading">Hello</typography-pk>
    <typography-pk>Layout primitives, no framework.</typography-pk>
  </box-pk>
  <cluster-pk space="var(--s0)">
    <button>One</button>
    <button>Two</button>
  </cluster-pk>
</stack-pk>
```

## Components

| Element | Purpose |
|---|---|
| `<box-pk>` | Padded container with optional border, radius, color, shadow. |
| `<center-pk>` | Horizontally center content with a max measure. |
| `<cluster-pk>` | Wrapping inline cluster with consistent spacing. |
| `<container-pk>` | Constrained content container. |
| `<cover-pk>` | Cover layout with a centered child and top/bottom regions. |
| `<frame-pk>` | Aspect-ratio media frame. |
| `<grid-pk>` | Auto-fit grid with min column size. |
| `<icon-pk>` | Inline icon with consistent sizing. |
| `<imposter-pk>` | Absolutely-centered overlay. |
| `<reel-pk>` | Horizontal scrolling rail. |
| `<sidebar-pk>` | Sidebar + content with intrinsic sidebar width. |
| `<stack-pk>` | Vertical stack with consistent spacing. |
| `<switcher-pk>` | Switches between row/column at a content breakpoint. |
| `<typography-pk>` | Typographic primitive with variant scale. |

### `<cover-pk>` — marking the centered child

Cover places one designated child in the vertical center, with optional siblings flowing to the top and bottom. Mark the centered child with the canonical `data-pk-centered` attribute:

```html
<cover-pk minHeight="100vh">
  <header>…</header>
  <main data-pk-centered>Hero content</main>
  <footer>…</footer>
</cover-pk>
```

For consistency with shadow-DOM components elsewhere, `slot="centered"` is also accepted as an alias:

```html
<cover-pk>
  <main slot="centered">Hero content</main>
</cover-pk>
```

## Architecture

Planks runs in the **light DOM**. The first time a `<box-pk>` (etc.) connects to the page, its class appends a single `<style data-pk-component="box-pk">` element to `document.head` whose selectors are tag-scoped:

```css
box-pk {
  display: inline-block;
  padding: var(--box-padding, var(--s1));
  /* … */
}
```

Per-instance state is then applied as inline custom properties on the element itself (e.g. `--box-padding: 2rem` set via `el.style.setProperty`), so the structural sheet stays static and cache-friendly.

### Overriding structural CSS

Because the elements are light-DOM and selectors are tag-scoped, overriding from a consumer stylesheet is just CSS specificity:

```css
/* in your app's stylesheet, loaded after the structural sheets */
stack-pk {
  --stack-space: 2rem;       /* prefer the documented custom property */
}

stack-pk[data-variant="tight"] > * + * {
  margin-block-start: 0.25rem;   /* or override the structural rule directly */
}
```

There is **no shadow boundary** — global resets, design tokens, and inherited typography all cascade in normally.

## TypeScript

Planks ships full type definitions, including a `HTMLElementTagNameMap` augmentation. Side-effect importing the package is enough for the DOM APIs to be properly typed:

```ts
import '@rgoussu.dev/planks';

const stack = document.querySelector('stack-pk');   // -> Stack | null
stack?.setAttribute('space', 'var(--s2)');

const box = document.createElement('box-pk');       // -> Box
box.padding = 'var(--s1)';
```

You can also import classes directly:

```ts
import type { Box, Stack } from '@rgoussu.dev/planks';
```

A consolidated declaration file is published as `dist/planks.d.ts` for tooling that prefers a single global lib reference.

## Design tokens

`tokens.css` exposes a modular scale (`--s-10` … `--s10`, ratio 1.5, base `1rem`), a `--measure` (60ch), and base font/color tokens. Components consume them as defaults but every value is overridable via attributes.

## Development

```bash
pnpm install
pnpm storybook        # Storybook on :6006
pnpm build            # vite lib build + .d.ts + tokens/styles
pnpm type-check
```

## License

MIT
