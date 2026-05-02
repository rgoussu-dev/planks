import '../src/components/switcher/switcher';
import { plate, cell, caption } from './_demo';

const description = `
\`<switcher-pk>\` lays its children out **horizontally until a threshold, then vertically**. Unlike
a media query, the threshold is the *available container width* — so the same component can sit
in a sidebar (stacked) and in a wide main column (rowed) without any extra rules.

### When to use

- Form rows that should stack on narrow screens (label + input + action).
- Two- or three-column hero sections that collapse on mobile.
- Anywhere you'd reach for \`@media (max-width: …)\` to flip a row to a column.

### Anatomy

| Attribute | Default | What it does |
|---|---|---|
| \`threshold\` | \`var(--measure)\` | Width at which children stop sharing a row and stack. |
| \`space\` | \`var(--s1)\` | Gap between items. |
| \`limit\` | unset | Cap how many children may stay on one row before all stack. |

### How it works

The trick is a famously clever flex calculation:

\`\`\`css
flex-basis: calc((var(--threshold) - 100%) * 999);
\`\`\`

When the container is wider than the threshold, the basis becomes hugely negative and items lay
out side-by-side. When narrower, it becomes hugely positive and each item claims a full row.

### Reference

After *every-layout*'s [Switcher](https://every-layout.dev/layouts/switcher/) primitive.
`;

export default {
  title: 'Layout/Switcher',
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: description } },
  },
  argTypes: {
    threshold: { control: 'text', description: 'Width at which children stack.' },
    space: { control: 'text', description: 'Gap between items.' },
    limit: { control: 'number', description: 'Maximum items per row before all stack.' },
  },
  args: { threshold: 'var(--measure)', space: 'var(--s1)', limit: 4 },
};

export const Playground = {
  parameters: {
    docs: {
      description: {
        story:
          'Resize the canvas across the threshold to see the row collapse to a column. The transition happens *based on the container width*, not the viewport.',
      },
    },
  },
  render: ({ threshold, space, limit }: { threshold: string; space: string; limit: number }) =>
    plate({
      no: '01',
      title: 'Interactive specimen',
      foot: `threshold: <code style="font-family:var(--font-mono)">${threshold}</code>`,
      body: `
        <switcher-pk threshold="${threshold}" space="${space}" limit="${limit}">
          ${cell('Alpha', { tone: 'cream', height: '4rem' })}
          ${cell('Beta', { tone: 'wash', height: '4rem' })}
          ${cell('Gamma', { tone: 'cream', height: '4rem' })}
        </switcher-pk>
      `,
    }),
};

export const ThresholdComparison = {
  name: 'Threshold · narrow vs wide',
  parameters: {
    docs: {
      description: {
        story:
          'Two switchers side by side — one with a small threshold (rarely stacks) and one with a large threshold (stacks easily). Useful for getting a feel for how the calculation responds.',
      },
    },
  },
  render: () =>
    plate({
      no: '02',
      title: 'threshold · 20rem vs 60rem',
      body: `
        <div style="display:flex;flex-direction:column;gap:1.25rem">
          <div>
            ${caption('threshold · 20rem · stays in a row most of the time')}
            <switcher-pk threshold="20rem" space="var(--s-1)" style="margin-top:0.5rem">
              ${cell('A', { tone: 'cream' })}${cell('B', { tone: 'wash' })}${cell('C', { tone: 'cream' })}
            </switcher-pk>
          </div>
          <div>
            ${caption('threshold · 60rem · stacks early')}
            <switcher-pk threshold="60rem" space="var(--s-1)" style="margin-top:0.5rem">
              ${cell('A', { tone: 'cream' })}${cell('B', { tone: 'wash' })}${cell('C', { tone: 'cream' })}
            </switcher-pk>
          </div>
        </div>
      `,
    }),
};

export const Limit = {
  name: 'limit · enforce stacking past N',
  parameters: {
    docs: {
      description: {
        story:
          'When more than `limit` children are present, all of them stack — even if they would fit in a row. Useful when you want a binary "row when 3 fit / column otherwise" behaviour.',
      },
    },
  },
  render: () =>
    plate({
      no: '03',
      title: 'limit · 3 children',
      foot: 'Same threshold; the 4th item triggers a stack.',
      body: `
        <div style="display:flex;flex-direction:column;gap:1.25rem">
          <div>
            ${caption('three children · row')}
            <switcher-pk threshold="20rem" limit="3" style="margin-top:0.5rem">
              ${cell('A', { tone: 'cream' })}${cell('B', { tone: 'wash' })}${cell('C', { tone: 'cream' })}
            </switcher-pk>
          </div>
          <div>
            ${caption('four children · stacks (limit reached)')}
            <switcher-pk threshold="20rem" limit="3" style="margin-top:0.5rem">
              ${cell('A', { tone: 'cream' })}${cell('B', { tone: 'wash' })}${cell('C', { tone: 'cream' })}${cell('D', { tone: 'wash' })}
            </switcher-pk>
          </div>
        </div>
      `,
    }),
};
