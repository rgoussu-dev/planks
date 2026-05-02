import '../src/components/typography/typography';
import '../src/components/stack/stack';
import { plate, caption } from './_demo';

const description = `
\`<typography-pk>\` is a **text element with a variant scale**. Pick a variant
(\`heading-1\`, \`heading-2\`, \`heading-3\`, \`body\`, \`caption\`, \`small\`) and the component sets
size, weight, and line-height from the modular scale. Override any individual property as needed.

### When to use

- Long-form content with predictable headings and body styles.
- Anywhere you want consistent typographic rhythm without writing component-specific CSS for
  every heading level.
- As a quick way to apply text-transform / letter-spacing / colour without inline styles.

### Variant scale

| Variant | Size | Weight | Line-height |
|---|---|---|---|
| \`heading-1\` | \`var(--s4)\` (~5rem) | 700 | 1.1 |
| \`heading-2\` | \`var(--s3)\` (~3.4rem) | 700 | 1.2 |
| \`heading-3\` | \`var(--s2)\` (~2.25rem) | 600 | 1.3 |
| \`body\` | \`var(--s0)\` (1rem) | normal | 1.6 |
| \`caption\` | \`var(--s-1)\` (~0.67rem) | normal | 1.4 |
| \`small\` | \`var(--s-2)\` (~0.44rem) | normal | 1.3 |

### Anatomy

| Attribute | Maps to |
|---|---|
| \`variant\` | A preset from the scale above. |
| \`fontFamily\` · \`fontSize\` · \`fontWeight\` · \`fontStyle\` | Standard CSS font properties. |
| \`lineHeight\` · \`letterSpacing\` | Spacing properties. |
| \`textAlign\` · \`textTransform\` · \`textDecoration\` | Decoration properties. |
| \`color\` | Text colour. |

Setting a property always wins over the variant — the variant is just a default. Useful for one-off
overrides ("body, but italic" → \`variant="body" fontStyle="italic"\`).
`;

export default {
  title: 'Layout/Typography',
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: description } },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['', 'heading-1', 'heading-2', 'heading-3', 'body', 'caption', 'small'],
      description: 'Preset from the variant scale.',
    },
    color: { control: 'color', description: 'Text colour.' },
    textAlign: {
      control: 'select',
      options: ['inherit', 'left', 'center', 'right'],
      description: 'Horizontal alignment.',
    },
    textTransform: {
      control: 'select',
      options: ['none', 'uppercase', 'lowercase', 'capitalize'],
    },
    fontStyle: { control: 'select', options: ['normal', 'italic'] },
    fontWeight: { control: 'text' },
    letterSpacing: { control: 'text' },
  },
  args: {
    variant: 'body',
    color: 'inherit',
    textAlign: 'inherit',
    textTransform: 'none',
    fontStyle: 'normal',
    fontWeight: '',
    letterSpacing: '',
  },
};

export const Playground = {
  parameters: {
    docs: {
      description: {
        story:
          'A live typography sandbox. Pick a variant and then override individual properties to feel how the cascade resolves.',
      },
    },
  },
  render: (args: Record<string, string>) =>
    plate({
      no: '01',
      title: 'Interactive specimen',
      body: `
        <typography-pk
          variant="${args['variant']}"
          color="${args['color']}"
          textAlign="${args['textAlign']}"
          textTransform="${args['textTransform']}"
          fontStyle="${args['fontStyle']}"
          ${args['fontWeight'] ? `fontWeight="${args['fontWeight']}"` : ''}
          ${args['letterSpacing'] ? `letterSpacing="${args['letterSpacing']}"` : ''}
        >
          The quick brown fox jumps over the lazy dog.
        </typography-pk>
      `,
    }),
};

export const VariantScale = {
  name: 'Variant scale',
  parameters: {
    docs: {
      description: {
        story:
          'Every preset in the variant scale, from `heading-1` down to `small`. The proportions follow the modular scale (`--s4 → --s-2`).',
      },
    },
  },
  render: () =>
    plate({
      no: '02',
      title: 'heading-1 · heading-2 · heading-3 · body · caption · small',
      body: `
        <stack-pk space="var(--s1)" style="display:block">
          ${(
            [
              ['heading-1', 'Layout, in plain HTML.'],
              ['heading-2', 'Honest primitives.'],
              ['heading-3', 'Tag-scoped CSS.'],
              ['body', 'A line of body copy at 1rem with comfortable line-height.'],
              ['caption', 'A small caption, typically used below figures.'],
              ['small', 'Fine print and footnotes go here.'],
            ] as const
          )
            .map(
              ([v, text]) => `
              <div>
                ${caption(v)}
                <typography-pk variant="${v}" style="margin-top:0.25rem">${text}</typography-pk>
              </div>
            `,
            )
            .join('')}
        </stack-pk>
      `,
    }),
};

export const ProseSample = {
  name: 'Prose sample',
  parameters: {
    docs: {
      description: {
        story:
          'A short article composed entirely of `<typography-pk>` elements. The variants are the only thing setting size and rhythm.',
      },
    },
  },
  render: () =>
    plate({
      no: '03',
      title: 'Composing an article',
      body: `
        <stack-pk space="var(--s1)" style="display:block;max-width:60ch">
          <typography-pk variant="caption" style="color:var(--pk-vermillion);text-transform:uppercase;letter-spacing:0.18em">Essay · 02</typography-pk>
          <typography-pk variant="heading-2" style="font-family:var(--font-display);font-weight:500">A modest scale, well-applied</typography-pk>
          <typography-pk variant="body">
            Pick a few variants. Use them everywhere. The whole site will start agreeing with itself in
            a way that's hard to name and impossible to miss.
          </typography-pk>
          <typography-pk variant="heading-3" style="font-family:var(--font-display);font-weight:500">Why a scale?</typography-pk>
          <typography-pk variant="body">
            Because every type relationship in the system becomes a multiple of one ratio. The spaces
            between sizes feel correct without you having to defend them.
          </typography-pk>
          <typography-pk variant="caption">
            Aside — the same logic powers the spacing tokens (<code>--s-2</code> through <code>--s10</code>).
          </typography-pk>
        </stack-pk>
      `,
    }),
};

export const Override = {
  name: 'Variant + override',
  parameters: {
    docs: {
      description: {
        story:
          'Variants are just defaults — every individual property still wins. Useful for "body, but italic" or "heading, but in vermillion".',
      },
    },
  },
  render: () =>
    plate({
      no: '04',
      title: 'variant="heading-2" + color + fontStyle',
      body: `
        <typography-pk
          variant="heading-2"
          color="var(--pk-vermillion)"
          fontStyle="italic"
          style="font-family:var(--font-display);font-weight:400"
        >
          Honest defaults, polite overrides.
        </typography-pk>
      `,
    }),
};
