# @rgoussu-dev/planks

Fundamental layout web components — a small set of every-layout-style primitives shipped as native custom elements with shadow DOM.

## Install

```bash
pnpm add @rgoussu-dev/planks
# or
npm install @rgoussu-dev/planks
```

## Usage

Side-effect import registers every custom element (`<box-pk>`, `<stack-pk>`, `<cluster-pk>`, …):

```ts
import '@rgoussu-dev/planks';
import '@rgoussu-dev/planks/tokens';   // CSS custom properties (modular scale, --measure, etc.)
import '@rgoussu-dev/planks/styles';   // global resets (optional)
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

All elements extend `LayoutShadowElementPk` (in `element/`), which provides shared shadow DOM setup, adopted-stylesheet caching, and template caching.

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
