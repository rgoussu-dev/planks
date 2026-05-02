import '../src/components/center/center';
import { plate, caption } from './_demo';

const description = `
\`<center-pk>\` constrains its content to a comfortable **measure** and centers it horizontally.
This is the primitive you reach for when you want long-form prose to stop sprawling across a wide
viewport, or to set up a centered article column.

### When to use

- Any prose-heavy block that should respect a reading line length (default \`60ch\`).
- A page-level wrapper for a marketing/landing column.
- An "intrinsic" column where the children determine the inline size — useful for centered
  hero text where the *longest line* sets the column width.

### Anatomy

| Attribute | Default | What it does |
|---|---|---|
| \`maxWidth\` | \`var(--measure)\` | Cap on the inline size. |
| \`gutters\` | \`0\` | Inline padding on either side, useful at small viewports. |
| \`alignText\` | \`false\` | Adds \`text-align: center\`. |
| \`intrinsic\` | \`false\` | Centers each child by its own content width (uses \`align-items: center\` instead of \`margin: auto\`). |

### Reference

After *every-layout*'s [Center](https://every-layout.dev/layouts/center/) primitive.
`;

export default {
  title: 'Layout/Center',
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: description } },
  },
  argTypes: {
    maxWidth: { control: 'text', description: 'Maximum inline size.' },
    gutters: { control: 'text', description: 'Horizontal padding (left/right).' },
    alignText: { control: 'boolean', description: 'Center-align text.' },
    intrinsic: { control: 'boolean', description: 'Center children by their own width.' },
  },
  args: { maxWidth: 'var(--measure)', gutters: 'var(--s1)', alignText: false, intrinsic: false },
};

const articleBody = `
  <h2 style="margin:0;font-family:var(--font-display);font-weight:500;font-size:1.8rem;letter-spacing:-0.015em">A measure of restraint</h2>
  <p class="pk-prose" style="margin:0.75rem 0 0">
    A line of text wider than about 75 characters is hard to read — your eye loses the start of the next line. Capping the measure is the single highest-leverage typographic decision a designer can make. <em>Center</em> bakes that decision in.
  </p>
  <p class="pk-prose" style="margin:0.75rem 0 0">
    The default measure is <code style="font-family:var(--font-mono);font-size:0.9em">60ch</code>: a comfortable 60-character cap. Override it once on <code style="font-family:var(--font-mono);font-size:0.9em">:root</code> and every centered column on the site follows.
  </p>
`;

export const Playground = {
  parameters: {
    docs: {
      description: {
        story:
          'Resize the canvas to feel the cap kick in. Toggle `intrinsic` and watch the column width snap to the longest line of content.',
      },
    },
  },
  render: ({
    maxWidth,
    gutters,
    alignText,
    intrinsic,
  }: {
    maxWidth: string;
    gutters: string;
    alignText: boolean;
    intrinsic: boolean;
  }) =>
    plate({
      no: '01',
      title: 'Interactive specimen',
      foot: `maxWidth: <code style="font-family:var(--font-mono)">${maxWidth}</code>`,
      body: `
        <div style="background:var(--pk-cream);border:1px dashed var(--pk-rule);padding:0">
          <center-pk maxWidth="${maxWidth}" gutters="${gutters}" ${alignText ? 'alignText' : ''} ${intrinsic ? 'intrinsic' : ''}>
            ${articleBody}
          </center-pk>
        </div>
      `,
    }),
};

export const MeasureComparison = {
  name: 'Measure · 40ch · 60ch · 80ch',
  parameters: {
    docs: {
      description: {
        story:
          'Three centred columns at different measures. 40 characters reads almost like a poem; 80 characters approaches discomfort.',
      },
    },
  },
  render: () =>
    plate({
      no: '02',
      title: 'How wide should a column be?',
      body: `
        <div style="display:flex;flex-direction:column;gap:1.25rem">
          ${(['40ch', '60ch', '80ch'] as const)
            .map(
              (m) => `
              <div style="background:var(--pk-cream);padding:0.5rem;border:1px dashed var(--pk-rule)">
                ${caption(`measure · ${m}`)}
                <center-pk maxWidth="${m}" gutters="var(--s1)">
                  <p class="pk-prose" style="margin:0.5rem 0 0">A line of text capped at ${m}. Read it aloud. Where does your attention falter?</p>
                </center-pk>
              </div>
            `,
            )
            .join('')}
        </div>
      `,
    }),
};

export const Intrinsic = {
  name: 'Intrinsic centering',
  parameters: {
    docs: {
      description: {
        story:
          'With `intrinsic`, the column collapses to the width of its widest child. Useful for centred hero blocks where the *content* defines the column.',
      },
    },
  },
  render: () =>
    plate({
      no: '03',
      title: 'intrinsic · alignText',
      body: `
        <div style="background:var(--pk-cream);padding:1rem;border:1px dashed var(--pk-rule)">
          <center-pk intrinsic alignText gutters="var(--s1)">
            <h2 style="margin:0;font-family:var(--font-display);font-weight:400;font-size:2.5rem;line-height:1.05;letter-spacing:-0.025em">
              <em style="font-style:italic;color:var(--pk-vermillion)">Plain</em> HTML,<br/>refined.
            </h2>
            <p class="pk-prose" style="margin:0.75rem 0 0">A short tagline, centred by its own width.</p>
          </center-pk>
        </div>
      `,
    }),
};
