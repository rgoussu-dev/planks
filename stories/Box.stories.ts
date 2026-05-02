import '../src/components/box/box';
import { plate, specimens, sampleGrid, caption } from './_demo';

const description = `
\`<box-pk>\` is the **atomic surface** of the Planks system: a rectangle that takes padding, an optional
border, a radius, a colour, and a shadow. Anything you'd reach for an unstyled \`<div>\` for — a card,
a callout, a button frame, a section background — should start as a \`box-pk\` so it inherits the
modular spacing scale by default.

### When to use

- Wrap content that needs **padding** (\`var(--s1)\` by default — the modular scale, not arbitrary rems).
- Define a **card / panel** by combining \`borderRadius\`, \`borderWidth\`, and \`backgroundColor\`.
- Apply a **filled or outlined surface treatment** without writing custom CSS.

### Anatomy

| Attribute | Default | What it does |
|---|---|---|
| \`padding\` | \`var(--s1)\` | Inset on every side. Accepts any CSS length or token. |
| \`borderWidth\` | \`none\` | Border thickness. Pass \`"none"\` to remove. |
| \`borderColor\` | \`transparent\` | Border colour. |
| \`borderRadius\` | \`0\` | Corner radius. |
| \`backgroundColor\` | \`transparent\` | Surface colour. |
| \`color\` | \`inherit\` | Text colour inside the box. |
| \`shadow\` | \`none\` | Any valid \`box-shadow\`. |

### Notes

- \`<box-pk>\` is \`display: inline-block\`. Wrap it in a \`<stack-pk>\` or \`<grid-pk>\` to lay several
  out vertically or in a grid; or set \`display: block\` from a consumer stylesheet.
- Every attribute is also reachable as a CSS custom property: \`--box-padding\`,
  \`--box-bg-color\`, etc. Override from a parent rule if you'd rather skip the attribute.

### Reference

Inspired by *every-layout*'s [Box](https://every-layout.dev/layouts/box/) primitive.
`;

export default {
  title: 'Layout/Box',
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: description } },
  },
  argTypes: {
    padding: { control: 'text', description: 'Inner padding (any CSS length).' },
    borderWidth: { control: 'text', description: 'Border width, e.g. `1px`. Pass `none` to remove.' },
    borderColor: { control: 'color', description: 'Border colour.' },
    borderRadius: { control: 'text', description: 'Corner radius.' },
    backgroundColor: { control: 'color', description: 'Background colour.' },
    color: { control: 'color', description: 'Text colour.' },
    shadow: { control: 'text', description: 'Any valid CSS `box-shadow` value.' },
  },
  args: {
    padding: 'var(--s2)',
    borderWidth: 'none',
    borderColor: '#1a1816',
    borderRadius: '0',
    backgroundColor: '#fbf8f3',
    color: 'inherit',
    shadow: 'none',
  },
};

const sampleProse = `
  <h4 style="margin:0 0 0.4rem;font-family:var(--font-display);font-weight:500;font-size:1.05rem;letter-spacing:-0.01em">A box, in plain HTML.</h4>
  <p style="margin:0;font-family:var(--font-family);font-size:0.9rem;line-height:1.55">
    Padding from the modular scale, hairline border, and serif body copy. The look is set by attributes
    — there's no shadow DOM, so consumer CSS can override anything.
  </p>
`;

export const Playground = {
  parameters: {
    docs: {
      description: {
        story:
          'Tweak padding, border, radius, colour, and shadow live. Every change writes a CSS custom property on the element\'s `style` — the structural sheet is static.',
      },
    },
  },
  render: (args: Record<string, string>) =>
    plate({
      no: '01',
      title: 'Interactive specimen',
      foot: 'Args → inline custom properties → cascade.',
      body: `
        <box-pk
          padding="${args['padding']}"
          borderWidth="${args['borderWidth']}"
          borderColor="${args['borderColor']}"
          borderRadius="${args['borderRadius']}"
          backgroundColor="${args['backgroundColor']}"
          color="${args['color']}"
          shadow="${args['shadow']}"
          style="display:block;max-width:36rem"
        >
          ${sampleProse}
        </box-pk>
      `,
    }),
};

export const Surfaces = {
  parameters: {
    docs: {
      description: {
        story:
          'Four common surface treatments — outlined, soft-filled, elevated, and high-contrast — composed by toggling a couple of attributes each.',
      },
    },
  },
  render: () =>
    plate({
      no: '02',
      title: 'Common surface treatments',
      body: sampleGrid([
        `<box-pk padding="var(--s2)" borderWidth="1px" borderColor="rgba(26,24,22,0.18)" borderRadius="2px" backgroundColor="#fbf8f3" style="display:block;height:100%">
          ${caption('Outlined')}
          <p style="margin:0.5rem 0 0;font-family:var(--font-family);font-size:0.95rem">Hairline border on paper. Honest, quiet.</p>
        </box-pk>`,
        `<box-pk padding="var(--s2)" backgroundColor="#ede4d3" borderRadius="4px" style="display:block;height:100%">
          ${caption('Filled')}
          <p style="margin:0.5rem 0 0;font-family:var(--font-family);font-size:0.95rem">A soft wash colour, no border.</p>
        </box-pk>`,
        `<box-pk padding="var(--s2)" backgroundColor="#fbf8f3" borderRadius="4px" shadow="0 12px 32px -16px rgba(26,24,22,0.35)" style="display:block;height:100%">
          ${caption('Elevated')}
          <p style="margin:0.5rem 0 0;font-family:var(--font-family);font-size:0.95rem">Long, soft shadow — feels like a paper card.</p>
        </box-pk>`,
        `<box-pk padding="var(--s2)" backgroundColor="#1a1816" color="#fbf8f3" borderRadius="0" style="display:block;height:100%">
          ${caption('Inverted')}
          <p style="margin:0.5rem 0 0;font-family:var(--font-family);font-size:0.95rem;color:#fbf8f3">High contrast, sharp corners.</p>
        </box-pk>`,
      ]),
      foot: 'Each tile is one box-pk with two or three attributes set.',
    }),
};

export const PaddingScale = {
  name: 'Padding · modular scale',
  parameters: {
    docs: {
      description: {
        story:
          'Reach for `var(--s-1)` … `var(--s3)` instead of arbitrary rems. The proportional jumps keep dense and roomy boxes looking related.',
      },
    },
  },
  render: () =>
    plate({
      no: '03',
      title: 'Padding tokens · --s-1 → --s3',
      body: specimens(
        [
          ['--s-1', 'var(--s-1)'],
          ['--s0', 'var(--s0)'],
          ['--s1', 'var(--s1)'],
          ['--s2', 'var(--s2)'],
          ['--s3', 'var(--s3)'],
        ].map(
          ([label, val]) => `
            <box-pk padding="${val}" backgroundColor="#ede4d3" style="display:block">
              <span class="pk-mono">padding · ${label}</span>
            </box-pk>
          `,
        ),
        '0.6rem',
      ),
    }),
};

export const RadiusAndShadow = {
  name: 'Radius & shadow',
  parameters: {
    docs: {
      description: {
        story:
          'Compose elevation by combining `borderRadius` with `shadow`. The shadow attribute accepts any valid `box-shadow` string — multi-layer shadows included.',
      },
    },
  },
  render: () =>
    plate({
      no: '04',
      title: 'Combining radius and shadow',
      body: sampleGrid(
        [
          ['0', 'none'],
          ['4px', '0 6px 16px -10px rgba(26,24,22,0.4)'],
          ['12px', '0 18px 36px -22px rgba(26,24,22,0.5)'],
          ['999px', '0 4px 14px -8px rgba(200,54,45,0.6)'],
        ].map(
          ([radius, shadow]) => `
            <box-pk
              padding="var(--s2)"
              backgroundColor="#fbf8f3"
              borderRadius="${radius}"
              shadow="${shadow}"
              style="display:block;height:100%"
            >
              <span class="pk-mono">radius ${radius}</span>
            </box-pk>
          `,
        ),
        '180px',
      ),
    }),
};
