import '../src/components/reel/reel';
import { plate, card, caption } from './_demo';

const description = `
\`<reel-pk>\` is a **horizontal scrolling rail** with consistent gaps and an optional custom
scrollbar. Image carousels, story strips, content rows, "browse more" sections — anywhere you
have more items than fit, but they shouldn't wrap to a new row.

### When to use

- Photo / video carousels.
- "Featured" or "Recently viewed" rails on a homepage.
- Long horizontal lists where wrapping would obscure the sequence.

### Anatomy

| Attribute | Default | What it does |
|---|---|---|
| \`itemWidth\` | \`auto\` | Fixed width for each item (\`flex-basis\`). |
| \`space\` | \`var(--s0)\` | Gap between items. |
| \`height\` | \`auto\` | Reel block-size. |
| \`noBar\` | \`false\` | Hide the scrollbar. |

### Notes

- Internally observes resize and child mutations to toggle a \`.overflowing\` class. When the reel
  isn't actually overflowing, the bar's reserved padding is removed.
- The default scrollbar is intentionally chunky (1rem) and high-contrast — the reel is meant to
  *look scrollable*. Pass \`noBar\` for a cleaner finish; users can still drag-scroll on touch.

### Reference

After *every-layout*'s [Reel](https://every-layout.dev/layouts/reel/) primitive.
`;

export default {
  title: 'Layout/Reel',
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: description } },
  },
  argTypes: {
    itemWidth: { control: 'text', description: 'Fixed width per item.' },
    space: { control: 'text', description: 'Gap between items.' },
    height: { control: 'text', description: 'Block-size of the reel.' },
    noBar: { control: 'boolean', description: 'Hide the scrollbar.' },
  },
  args: { itemWidth: '240px', space: 'var(--s1)', height: 'auto', noBar: false },
};

const reelCard = (n: number) => `
  <div style="background:var(--pk-paper);border:1px solid var(--pk-rule);padding:1rem;display:flex;flex-direction:column;gap:0.5rem">
    <div style="aspect-ratio:4/3;background:linear-gradient(135deg,var(--pk-wash),var(--pk-cream));border:1px dashed var(--pk-rule)"></div>
    <span class="pk-mono">No. ${String(n).padStart(2, '0')}</span>
    <h4 style="margin:0;font-family:var(--font-display);font-weight:500;font-size:1rem;letter-spacing:-0.01em">A reel item</h4>
  </div>
`;

export const Playground = {
  parameters: {
    docs: {
      description: {
        story:
          'Drag or scroll horizontally. Toggle `noBar` to swap the chunky default scrollbar for a clean overflow-hidden look.',
      },
    },
  },
  render: ({ itemWidth, space, height, noBar }: { itemWidth: string; space: string; height: string; noBar: boolean }) =>
    plate({
      no: '01',
      title: 'Interactive specimen',
      foot: `itemWidth: ${itemWidth} · space: ${space}`,
      body: `
        <reel-pk itemWidth="${itemWidth}" space="${space}" height="${height}" ${noBar ? 'noBar' : ''} style="background:var(--pk-cream);padding:0.75rem;border:1px dashed var(--pk-rule)">
          ${[1, 2, 3, 4, 5, 6, 7, 8].map(reelCard).join('')}
        </reel-pk>
      `,
    }),
};

export const ImageGallery = {
  name: 'Image gallery',
  parameters: {
    docs: {
      description: {
        story:
          'A row of fixed-width images. Useful for thumbnail strips. The reel observes mutations, so adding/removing items at runtime updates the overflow state automatically.',
      },
    },
  },
  render: () =>
    plate({
      no: '02',
      title: 'Photo strip · itemWidth 200px',
      body: `
        <reel-pk itemWidth="200px" space="var(--s-1)">
          ${Array.from({ length: 10 })
            .map(
              (_, i) => `
              <img src="https://picsum.photos/seed/reel-${i}/400/300" alt="Reel image ${i + 1}" style="height:140px;width:200px;object-fit:cover;border:1px solid var(--pk-rule)" />
            `,
            )
            .join('')}
        </reel-pk>
      `,
    }),
};

export const NoBar = {
  name: 'noBar · clean finish',
  parameters: {
    docs: {
      description: {
        story:
          'When the scrollbar would feel out of place — e.g. on a marketing page — `noBar` hides it across browsers. Touch / trackpad scrolling still works.',
      },
    },
  },
  render: () =>
    plate({
      no: '03',
      title: 'noBar · cards rail',
      body: `
        ${caption('Drag horizontally — bar is hidden.')}
        <div style="margin-top:0.5rem">
          <reel-pk itemWidth="220px" space="var(--s1)" noBar>
            ${[1, 2, 3, 4, 5, 6].map((n) => card({ eyebrow: `No. ${n}`, title: 'Quiet rail', body: 'No scrollbar — gestures only.' })).join('')}
          </reel-pk>
        </div>
      `,
    }),
};
