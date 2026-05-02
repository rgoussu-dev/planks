import '../src/components/grid/grid';
import { plate, cell, card, caption } from './_demo';

const description = `
\`<grid-pk>\` is an **auto-fit responsive grid**: you set a minimum column width, and the grid
arranges as many equal columns as fit at that minimum. No breakpoints, no media queries —
the layout reflows continuously as the available space changes.

### When to use

- Any **gallery** of equally-weighted items: cards, tiles, image thumbnails, product previews.
- A **logo wall** or **icon strip** that should adapt to any container width.
- Pretty much wherever you'd otherwise reach for a CSS framework's "12-col responsive grid".

### Anatomy

| Attribute | Default | What it does |
|---|---|---|
| \`min\` | \`250px\` | Minimum column width before wrapping. |
| \`space\` | \`var(--s1)\` | Gap between rows and columns. |
| \`align\` | \`stretch\` | Vertical alignment of cells in their tracks. |
| \`justify\` | \`stretch\` | Horizontal justification. |

### How it works

The structural rule is the venerable [RAM (Repeat, Auto, Minmax)](https://web.dev/articles/one-line-layouts) one-liner:

\`\`\`css
grid-template-columns: repeat(auto-fit, minmax(min(250px, 100%), 1fr));
\`\`\`

The inner \`min(..., 100%)\` guarantees that on very narrow containers a single cell stays inside
its parent — no horizontal overflow.

### Reference

After *every-layout*'s [Grid](https://every-layout.dev/layouts/grid/) primitive.
`;

export default {
  title: 'Layout/Grid',
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: description } },
  },
  argTypes: {
    min: { control: 'text', description: 'Minimum column width before wrapping.' },
    space: { control: 'text', description: 'Gap between cells.' },
    align: {
      control: 'select',
      options: ['stretch', 'start', 'end', 'center'],
      description: 'Vertical alignment of cells.',
    },
    justify: {
      control: 'select',
      options: ['stretch', 'start', 'end', 'center', 'space-between'],
      description: 'Horizontal justification.',
    },
  },
  args: { min: '220px', space: 'var(--s1)', align: 'stretch', justify: 'stretch' },
};

const cardSamples = [
  card({ eyebrow: 'No. 01', title: 'Honest layout', body: 'A grid that adapts without breakpoints.' }),
  card({ eyebrow: 'No. 02', title: 'Light DOM only', body: 'Your global resets cascade in untouched.' }),
  card({ eyebrow: 'No. 03', title: 'Tag-scoped CSS', body: 'One stylesheet per element, registered once.' }),
  card({ eyebrow: 'No. 04', title: 'Token-driven', body: 'Override --grid-min and the layout reflows.' }),
  card({ eyebrow: 'No. 05', title: 'No framework', body: 'Plain custom elements. Drop into any page.', accent: true }),
  card({ eyebrow: 'No. 06', title: 'Type-safe', body: 'Ships full TypeScript declarations.' }),
];

export const Playground = {
  parameters: {
    docs: {
      description: {
        story:
          'Resize the canvas to see auto-fit at work. Reduce `min` to pack more columns; raise it to force a single column sooner.',
      },
    },
  },
  render: ({ min, space, align, justify }: { min: string; space: string; align: string; justify: string }) =>
    plate({
      no: '01',
      title: 'Interactive specimen',
      foot: `min: ${min} · space: ${space}`,
      body: `<grid-pk min="${min}" space="${space}" align="${align}" justify="${justify}">${cardSamples.join('')}</grid-pk>`,
    }),
};

export const MinComparison = {
  name: 'Min · 140 / 220 / 320',
  parameters: {
    docs: {
      description: {
        story:
          'Three grids of the same items at three different `min` values, demonstrating how the auto-fit threshold changes column count.',
      },
    },
  },
  render: () =>
    plate({
      no: '02',
      title: 'min = 140px · 220px · 320px',
      body: `
        <div style="display:flex;flex-direction:column;gap:1.25rem">
          ${(['140px', '220px', '320px'] as const)
            .map(
              (m) => `
              <div>
                ${caption(`min · ${m}`)}
                <grid-pk min="${m}" space="var(--s-1)" style="margin-top:0.5rem">
                  ${[1, 2, 3, 4, 5, 6, 7, 8].map((n) => cell(`Cell · ${String(n).padStart(2, '0')}`, { tone: 'cream' })).join('')}
                </grid-pk>
              </div>
            `,
            )
            .join('')}
        </div>
      `,
    }),
};

export const TileWall = {
  name: 'Tile wall · narrow min',
  parameters: {
    docs: {
      description: {
        story:
          'A dense logo / icon strip pattern. With a tiny `min`, lots of items fit per row; the grid still gracefully reflows on the narrowest containers.',
      },
    },
  },
  render: () =>
    plate({
      no: '03',
      title: 'min · 110px',
      body: `
        <grid-pk min="110px" space="var(--s-1)">
          ${Array.from({ length: 18 })
            .map((_, i) =>
              cell(`#${String(i + 1).padStart(2, '0')}`, { tone: i % 4 === 0 ? 'ink' : i % 4 === 1 ? 'wash' : 'cream', height: '4rem' }),
            )
            .join('')}
        </grid-pk>
      `,
    }),
};
