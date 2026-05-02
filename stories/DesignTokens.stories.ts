import '../src/components/index';
import { caption, dimension, plate, specimens } from './_demo';

const overview = `
Planks ships a tiny set of CSS custom properties on \`:root\`. Components fall back to these tokens
when their own \`--<tag>-*\` properties aren't set, so changing a token once cascades everywhere.

| Token | Default | Purpose |
|---|---|---|
| \`--ratio\` | \`1.5\` | Modular scale ratio. |
| \`--s-10\` … \`--s10\` | \`1rem * ratio^n\` | Modular spacing/sizing scale. \`--s0\` is \`1rem\`. |
| \`--measure\` | \`60ch\` | Comfortable line length. Used by \`<center-pk>\` and \`<switcher-pk>\`. |
| \`--font-family\` | \`system-ui, sans-serif\` | Default UI font. |
| \`--font-size-base\` | \`1rem\` | Default body font size. |
| \`--font-size-big\` | \`1.75rem\` | Large display size. |
| \`--font-size-biggish\` | \`2.25rem\` | Largest display size. |
| \`--border-thin\` | \`1px\` | Hairline border width. |
| \`--color-light\` | \`#fff\` | Light surface color. |
| \`--color-dark\` | \`#000\` | Dark text/border color. |

### Override

Tokens are plain CSS properties on \`:root\`. Override them in any consumer stylesheet:

\`\`\`css
:root {
  --ratio: 1.6;
  --measure: 70ch;
  --font-family: 'Inter', system-ui, sans-serif;
}
\`\`\`

You can also override per-subtree: setting \`--s1: 0.75rem\` on a section makes every Planks
component inside that section use the smaller spacing wherever they reference \`var(--s1)\`.
`;

export default {
  title: 'Foundations/Design tokens',
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: overview } },
    options: { showPanel: false },
  },
};

const scaleRow = (name: string, expr: string, ratioPower: number): string => {
  // Visual width: clamp the very large/small values so the diagram stays readable.
  const visual = Math.min(Math.max(0.25, Math.pow(1.5, ratioPower) * 1.5), 32);
  return `
    <div style="display:grid;grid-template-columns:5rem 8rem 1fr;align-items:center;gap:1rem">
      <span style="font-family:var(--font-mono);font-size:0.78rem;color:var(--pk-ink)">${name}</span>
      <span style="font-family:var(--font-mono);font-size:0.7rem;color:var(--pk-graphite)">${expr}</span>
      <span style="display:block;height:0.55rem;background:var(--pk-ink);width:${visual}rem;max-width:100%"></span>
    </div>
  `;
};

export const SpacingScale = {
  name: 'Spacing scale',
  render: () =>
    plate({
      no: '01',
      title: 'Modular scale · 1rem × 1.5ⁿ',
      foot: 'Use the scale, not arbitrary rems.',
      body: `
        <div style="display:flex;flex-direction:column;gap:0.6rem">
          ${[
            ['--s-2', '~0.44rem', -2],
            ['--s-1', '~0.67rem', -1],
            ['--s0', '1rem', 0],
            ['--s1', '1.5rem', 1],
            ['--s2', '2.25rem', 2],
            ['--s3', '3.375rem', 3],
            ['--s4', '5.06rem', 4],
            ['--s5', '7.59rem', 5],
          ]
            .map(([name, expr, p]) => scaleRow(name as string, expr as string, p as number))
            .join('')}
        </div>
      `,
    }),
  parameters: {
    docs: {
      description: {
        story:
          'A modular scale is a finite set of sizes whose ratios feel proportional. Reach for these instead of one-off rems — your components will agree with each other without effort.',
      },
    },
  },
};

export const Palette = {
  name: 'Surface palette (workshop)',
  render: () =>
    plate({
      no: '02',
      title: 'Storybook chrome only — not exported tokens',
      body: `
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:0.75rem">
          ${[
            ['Paper', 'var(--pk-paper)', 'var(--pk-ink)'],
            ['Cream', 'var(--pk-cream)', 'var(--pk-ink)'],
            ['Wash', 'var(--pk-wash)', 'var(--pk-ink)'],
            ['Ink', 'var(--pk-ink)', 'var(--pk-paper)'],
            ['Graphite', 'var(--pk-graphite)', 'var(--pk-paper)'],
            ['Vermillion', 'var(--pk-vermillion)', 'var(--pk-paper)'],
          ]
            .map(
              ([name, bg, fg]) => `
            <div style="background:${bg};color:${fg};border:1px solid var(--pk-rule);padding:1rem;display:flex;flex-direction:column;gap:0.5rem">
              <span class="pk-mono" style="color:${fg};opacity:0.7">${name}</span>
              <span style="font-family:var(--font-mono);font-size:0.7rem">${bg}</span>
            </div>
          `,
            )
            .join('')}
        </div>
      `,
      foot: 'These swatches power the Storybook UI; consumer apps bring their own palette.',
    }),
  parameters: {
    docs: {
      description: {
        story:
          'These colours decorate this Storybook only. The library itself ships only \`--color-light\` and \`--color-dark\` — a deliberate minimum so apps can layer on whatever palette they like.',
      },
    },
  },
};

export const Type = {
  name: 'Type scale',
  render: () =>
    specimens([
      plate({
        no: '03',
        title: 'Display · Fraunces',
        body: `
          <div style="display:flex;flex-direction:column;gap:0.5rem">
            ${caption('Storybook display font — paired with Lora')}
            <div style="font-family:var(--font-display);font-size:3.5rem;line-height:1;letter-spacing:-0.025em;color:var(--pk-ink)">Layout, in plain HTML.</div>
          </div>
        `,
      }),
      plate({
        no: '04',
        title: 'Body · Lora',
        body: `
          <p class="pk-prose" style="margin:0;font-size:1.05rem;max-width:60ch">
            Type at body size. Planks doesn't ship a font — your global font cascades into the light
            DOM untouched. <code style="font-family:var(--font-mono);font-size:0.9em">var(--font-family)</code>
            is the single token components consult.
          </p>
        `,
      }),
      plate({
        no: '05',
        title: 'Mono · JetBrains Mono',
        body: `
          <pre style="margin:0;font-family:var(--font-mono);font-size:0.85rem;line-height:1.55;color:var(--pk-ink)"><code>:root {
  --ratio: 1.5;
  --measure: 60ch;
  --font-family: system-ui, sans-serif;
}</code></pre>
        `,
        foot: 'Used in this workshop for code, captions, and dimensions.',
      }),
    ]),
  parameters: {
    docs: {
      description: {
        story:
          'The fonts on this page are workshop choices for legibility. In production your `--font-family` token decides everything.',
      },
    },
  },
};

export const Measure = {
  name: 'Measure',
  render: () =>
    plate({
      no: '06',
      title: '--measure · 60ch',
      foot: 'Center, Switcher, and the global resets all consult --measure.',
      body: `
        <div style="display:flex;flex-direction:column;gap:1rem">
          ${dimension('--measure', '60ch')}
          <div style="background:var(--pk-cream);border:1px solid var(--pk-rule);padding:1rem;max-width:60ch">
            <p class="pk-prose" style="margin:0">
              A line of body copy capped at <strong>60 characters</strong>. The measure is the most
              under-rated token in any design system: it sets a pleasant reading rhythm, defines the
              breakpoint at which <code>switcher-pk</code> stacks, and acts as a sane default for
              anything <code>center-pk</code>-shaped.
            </p>
          </div>
        </div>
      `,
    }),
  parameters: {
    docs: {
      description: {
        story:
          'Every component that wants a "natural reading width" reaches for `--measure`. Override it once on `:root` and the cascade does the rest.',
      },
    },
  },
};
