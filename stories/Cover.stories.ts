import '../src/components/cover/cover';
import { plate, caption } from './_demo';

const description = `
\`<cover-pk>\` is the **full-height hero** primitive: it pins one designated child to the vertical
center, with optional siblings flowing to the top and bottom. Think landing-page hero, splash
screen, or any "stretch this to the viewport, put the headline in the middle" layout.

### Marking the centered child

Mark the child you want centered with the canonical \`data-pk-centered\` attribute:

\`\`\`html
<cover-pk minHeight="100vh">
  <header>…</header>
  <main data-pk-centered>Hero content</main>
  <footer>…</footer>
</cover-pk>
\`\`\`

For consistency with shadow-DOM components elsewhere, \`slot="centered"\` is also accepted.

### Anatomy

| Attribute | Default | What it does |
|---|---|---|
| \`minHeight\` | \`100vh\` | Minimum block-size of the cover. |
| \`space\` | \`var(--s0)\` | Vertical spacing between non-centered items, and the cover's own padding. |
| \`noPad\` | \`false\` | Remove padding entirely. |

### Reference

After *every-layout*'s [Cover](https://every-layout.dev/layouts/cover/) primitive.
`;

export default {
  title: 'Layout/Cover',
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: description } },
  },
  argTypes: {
    minHeight: { control: 'text', description: 'Minimum block-size.' },
    space: { control: 'text', description: 'Spacing between non-centered items.' },
    noPad: { control: 'boolean', description: 'Remove padding.' },
  },
  args: { minHeight: '420px', space: 'var(--s1)', noPad: false },
};

const heroBody = `
  <div data-pk-centered style="text-align:center;display:flex;flex-direction:column;gap:0.85rem;align-items:center">
    <span class="pk-mono" style="color:var(--pk-vermillion)">Plate · centred</span>
    <h2 style="margin:0;font-family:var(--font-display);font-weight:400;font-size:clamp(2rem,4vw,3.4rem);line-height:1.05;letter-spacing:-0.025em;max-width:14ch">
      Layout, anchored to the <em style="font-style:italic;color:var(--pk-vermillion)">middle</em>.
    </h2>
    <p class="pk-prose" style="margin:0;max-width:42ch">A hero that fills its container, with the headline pinned vertically. Top and bottom flow naturally above and below.</p>
  </div>
`;

export const Playground = {
  parameters: {
    docs: {
      description: {
        story:
          'A complete hero with a header, a centred body, and a footer. Toggle `noPad` for an edge-to-edge look.',
      },
    },
  },
  render: ({ minHeight, space, noPad }: { minHeight: string; space: string; noPad: boolean }) =>
    plate({
      no: '01',
      title: 'Interactive specimen',
      bare: true,
      foot: `minHeight: ${minHeight}`,
      body: `
        <cover-pk minHeight="${minHeight}" space="${space}" ${noPad ? 'noPad' : ''} style="background:var(--pk-paper);display:flex">
          <header style="display:flex;justify-content:space-between;align-items:center;width:100%">
            <span class="pk-mono">Planks · v0.2</span>
            <span class="pk-mono">Live demo</span>
          </header>
          ${heroBody}
          <footer style="display:flex;justify-content:space-between;align-items:center;width:100%">
            <span class="pk-mono">© 2026</span>
            <span class="pk-mono">↓ scroll</span>
          </footer>
        </cover-pk>
      `,
    }),
};

export const CenteredOnly = {
  name: 'Centered child only',
  parameters: {
    docs: {
      description: {
        story:
          'When there is no header or footer, the centred child sits in the geometric centre. A clean splash / loading-state pattern.',
      },
    },
  },
  render: () =>
    plate({
      no: '02',
      title: 'No header / no footer',
      bare: true,
      body: `
        <cover-pk minHeight="320px" style="background:var(--pk-ink);color:var(--pk-paper);display:flex">
          <div data-pk-centered style="text-align:center">
            ${caption('Loading…').replace('var(--pk-graphite)', 'var(--pk-paper)')}
            <p style="margin:0.5rem 0 0;font-family:var(--font-display);font-size:1.6rem;color:var(--pk-paper)">Hold tight.</p>
          </div>
        </cover-pk>
      `,
    }),
};
