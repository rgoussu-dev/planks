# @rgoussu.dev/planks

Fundamental layout web components — a small set of [Every Layout](https://every-layout.dev/)-style primitives shipped as native custom elements (see [Credits](#credits)).

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
    <typography-pk variant="heading-2">Hello</typography-pk>
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

### Attribute casing

HTML stores attribute names lowercased, so `borderWidth="2px"`, `borderwidth="2px"`, and `el.setAttribute('borderWidth', …)` are all the same attribute. Planks observes the lowercase names internally; the camelCase spellings in this README (and in JSX) work as-is, both for initial render and for dynamic updates after the element is connected.

## Dynamic apps & SPAs

Planks components are stateless: state flows in through attributes (or the equivalent camelCase properties), layout behavior is pure CSS, and no events flow out. That makes them safe targets for any state-management approach — change an attribute and the element restyles; add or remove children and the CSS adapts on its own (`<cover-pk>`'s centered child, `<switcher-pk>`'s breakpoint, `<stack-pk>` spacing). `<reel-pk>` disconnects its internal observers when unmounted, so route-level mount/unmount churn doesn't leak.

One rule: **don't bind your framework's `style` object to a `-pk` element** (React's `style={{…}}`, Vue's `:style`). Planks stores per-instance state as inline custom properties on `element.style`, and a framework-managed style binding rewrites that attribute on re-render, wiping them. Configure instances via attributes, or set the documented custom properties from a stylesheet rule instead — both survive re-renders.

Framework notes:

- **React** — works out of the box. Every planks value is a string, so React ≤18's attribute-only handling of custom elements is sufficient; React 19's property support routes through the same setters.
- **Vue** — mark the tags as custom elements (`compilerOptions.isCustomElement: tag => tag.endsWith('-pk')`) and use them directly.
- **Svelte / Lit / vanilla** — custom elements are the native currency; nothing extra needed.

## SSR & static sites

Importing the package without a DOM (Node, SSR, prerender pipelines) is safe: registration is skipped and no browser global is touched at import time. Elements upgrade client-side when the same import runs in the browser.

Because structural CSS is normally injected on first client-side connect, server-rendered or static HTML would briefly render unstyled. To avoid that, link the prebuilt structural stylesheet — the exact CSS the runtime would inject, for all components:

```ts
import '@rgoussu.dev/planks/structural';  // or <link rel="stylesheet" href=".../structural.css">
```

Tag-scoped selectors apply before (and even without) JavaScript, so the page lays out correctly immediately; the runtime still injects each component's sheet once on first connect, but since it's the exact same CSS it is harmless alongside the link. Note that per-instance *attributes* (`padding="2rem"`) only take effect once JS runs — if a page must be correct with no JavaScript at all, set the custom properties directly (`style="--box-padding: 2rem"`). Value-dependent rules (`<switcher-pk limit>`, `<stack-pk splitAfter>`) are generated at runtime and always need JS.

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

`tokens.css` declares globals on `:root`. Every component falls back to these when its own variables aren't set, so changing them once cascades everywhere.

| Token | Default | Purpose |
|---|---|---|
| `--ratio` | `1.5` | Modular scale ratio. |
| `--s-10` … `--s10` | `1rem * ratio^n` | Modular spacing/sizing scale. `--s0` is `1rem`. |
| `--measure` | `60ch` | Comfortable line length, used by `<center-pk>` and `<switcher-pk>`. |
| `--font-family` | `system-ui, sans-serif` | Default UI font. |
| `--font-size-base` | `1rem` | Default body font size. |
| `--font-size-big` | `1.75rem` | Large display size. |
| `--font-size-biggish` | `2.25rem` | Largest display size. |
| `--border-thin` | `1px` | Hairline border width. |
| `--color-light` | `#fff` | Light surface color. |
| `--color-dark` | `#000` | Dark text/border color. |

## CSS custom properties (per component)

Every component reads its state from `--<component>-*` custom properties. The element's attributes simply set these on the element's own `style`, so you can override them just as effectively from a stylesheet, an inline `style="…"`, or in a parent rule.

Generic shape:

```css
/* via the element's own style attribute */
<box-pk style="--box-padding: 2rem; --box-bg-color: #f4f4f4">…</box-pk>

/* or from a consumer stylesheet */
.card-grid > box-pk {
  --box-padding: 2rem;
  --box-bg-color: #f4f4f4;
}
```

### `<box-pk>`

| Variable | Default | Maps to attribute |
|---|---|---|
| `--box-padding` | `var(--s1)` | `padding` |
| `--box-border-width` | `0` | `borderWidth` (`"none"` → `0`) |
| `--box-border-color` | `#000` | `borderColor` (invisible until `borderWidth` is set) |
| `--box-border-radius` | `0` | `borderRadius` |
| `--box-color` | `inherit` | `color` |
| `--box-bg-color` | `transparent` | `backgroundColor` |
| `--box-shadow` | `none` | `shadow` |

### `<center-pk>`

| Variable | Default | Maps to attribute |
|---|---|---|
| `--center-max-width` | `var(--measure)` | `maxWidth` |
| `--center-gutter` | `0` | `gutters` |

`<center-pk>` also reads the boolean attributes `intrinsic` (center via `align-items`, not `margin: auto`) and `alignText` (sets `text-align: center`).

### `<cluster-pk>`

| Variable | Default | Maps to attribute |
|---|---|---|
| `--cluster-gap` | `var(--s1)` | `space` |
| `--cluster-justify` | `flex-start` | `justify` |
| `--cluster-align` | `flex-start` | `align` |

### `<container-pk>`

`<container-pk>` is the only component without instance-level custom properties — it's a structural anchor for container queries. Its structural CSS sets `container-type: inline-size`, and the `name` attribute sets `container-name` on the instance, so descendants can target it:

```html
<container-pk name="card"> … </container-pk>
```

```css
@container card (max-width: 30rem) {
  .card-body { flex-direction: column; }
}
```

### `<cover-pk>`

| Variable | Default | Maps to attribute |
|---|---|---|
| `--cover-min-height` | `100vh` | `minHeight` |
| `--cover-space` | `var(--s0)` | `space` (also drives padding) |
| `--cover-padding` | `var(--s1)` | `space` (zeroed by `noPad`) |

### `<frame-pk>`

| Variable | Default | Maps to attribute |
|---|---|---|
| `--frame-n` | `16` | `ratio` (numerator of `n:d`) |
| `--frame-d` | `9` | `ratio` (denominator of `n:d`) |

### `<grid-pk>`

| Variable | Default | Maps to attribute |
|---|---|---|
| `--grid-space` | `var(--s1)` | `space` |
| `--grid-min` | `250px` | `min` (auto-fit minimum column width) |
| `--grid-align` | `stretch` | `align` |
| `--grid-justify` | `stretch` | `justify` |

### `<icon-pk>`

| Variable | Default | Maps to attribute |
|---|---|---|
| `--icon-space` | `0` | `space` (margin-inline-end when paired with text) |

The `label` attribute makes the icon meaningful to assistive technology: it sets `role="img"` and `aria-label` on the element. Omit it for purely decorative icons.

### `<imposter-pk>`

| Variable | Default | Maps to attribute |
|---|---|---|
| `--imposter-position` | `absolute` | `fixed` (boolean → switches to `fixed`) |
| `--imposter-margin` | `0` | `margin` (subtracted from max width/height) |

The `breakout` boolean attribute disables the max-size clamp.

### `<reel-pk>`

| Variable | Default | Maps to attribute |
|---|---|---|
| `--reel-height` | `auto` | `height` |
| `--reel-item-width` | `auto` | `itemWidth` |
| `--reel-space` | `var(--s0)` | `space` (gap between items) |

By default an overflowing reel shows a styled high-contrast scrollbar; the `noBar` boolean attribute hides the scrollbar entirely (the reel still scrolls).

While its content overflows, a reel makes itself keyboard-focusable (`tabindex="0"`) so keyboard users can scroll it; set your own `tabindex` to opt out — the reel never overrides one you provide. Give scrollable reels an accessible name (e.g. `aria-label="Photo gallery"`) so screen-reader users know what the region contains.

### `<sidebar-pk>`

| Variable | Default | Maps to attribute |
|---|---|---|
| `--sidebar-space` | `var(--s2)` | `space` (gap between sidebar and content) |
| `--sidebar-side-basis` | `250px` | `sideWidth` (intrinsic sidebar size) |
| `--sidebar-content-min` | `50%` | `contentWidth` (content's minimum) |

The `side` attribute (`"left"` | `"right"`) chooses which child is the sidebar; `noStretch` removes the equal-height behavior.

### `<stack-pk>`

| Variable | Default | Maps to attribute |
|---|---|---|
| `--stack-space` | `var(--s1)` | `space` |

`recursive` applies the stack rule to all descendants; `splitAfter="N"` splits the stack after the Nth child, pushing everything that follows to the bottom.

### `<switcher-pk>`

| Variable | Default | Maps to attribute |
|---|---|---|
| `--switcher-space` | `var(--s1)` | `space` |
| `--switcher-threshold` | `var(--measure)` | `threshold` (container-width breakpoint) |

The `limit` attribute caps how many children stay on a row before stacking.

### `<typography-pk>`

| Variable | Default | Maps to attribute |
|---|---|---|
| `--typo-font-family` | `inherit` | `fontFamily` |
| `--typo-font-size` | `inherit` | `fontSize` |
| `--typo-font-weight` | `normal` | `fontWeight` |
| `--typo-font-style` | `normal` | `fontStyle` |
| `--typo-line-height` | `inherit` | `lineHeight` |
| `--typo-letter-spacing` | `normal` | `letterSpacing` |
| `--typo-text-align` | `inherit` | `textAlign` |
| `--typo-text-transform` | `none` | `textTransform` |
| `--typo-text-decoration` | `none` | `textDecoration` |
| `--typo-color` | `inherit` | `color` |

The `variant` attribute (`"heading-1"`, `"heading-2"`, `"heading-3"`, `"body"`, `"caption"`, `"small"`) preconfigures these properties via tag-scoped rules; you can still override any of them.

## Development

```bash
pnpm install
pnpm storybook        # Storybook on :6006
pnpm build            # vite lib build + .d.ts + tokens/styles
pnpm test             # vitest (happy-dom)
pnpm type-check
```

## Credits

Planks is a web-components take on the layout primitives from [**Every Layout**](https://every-layout.dev/) by [**Heydon Pickering**](https://heydonworks.com/) and [**Andy Bell**](https://bell.bz/) — all credit for the layout concepts, the algorithmic-CSS approach, and the composition model belongs to them. The modular scale tokens (`--ratio`, `--s-10`…`--s10`), the `--measure` axiom applied in `styles.css`, and the high-contrast reel scrollbar styling also come straight from their work. If you want to understand *why* these layouts are built the way they are, [buy the book](https://every-layout.dev/) — it's excellent.

Each primitive and its original layout:

| Planks element | Every Layout primitive |
|---|---|
| `<stack-pk>` | [The Stack](https://every-layout.dev/layouts/stack/) |
| `<box-pk>` | [The Box](https://every-layout.dev/layouts/box/) |
| `<center-pk>` | [The Center](https://every-layout.dev/layouts/center/) |
| `<cluster-pk>` | [The Cluster](https://every-layout.dev/layouts/cluster/) |
| `<sidebar-pk>` | [The Sidebar](https://every-layout.dev/layouts/sidebar/) |
| `<switcher-pk>` | [The Switcher](https://every-layout.dev/layouts/switcher/) |
| `<cover-pk>` | [The Cover](https://every-layout.dev/layouts/cover/) |
| `<grid-pk>` | [The Grid](https://every-layout.dev/layouts/grid/) |
| `<frame-pk>` | [The Frame](https://every-layout.dev/layouts/frame/) |
| `<reel-pk>` | [The Reel](https://every-layout.dev/layouts/reel/) |
| `<imposter-pk>` | [The Imposter](https://every-layout.dev/layouts/imposter/) |
| `<icon-pk>` | [The Icon](https://every-layout.dev/layouts/icon/) |

`<container-pk>` and `<typography-pk>` are planks additions with no Every Layout counterpart.

Planks is an independent project and is not affiliated with or endorsed by the Every Layout authors.

## License

MIT
