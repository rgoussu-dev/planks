import '../src/components/cluster/cluster';
import { plate, tag, button, caption } from './_demo';

const description = `
\`<cluster-pk>\` lays out an arbitrary number of children **inline with consistent gaps**, wrapping
when they run out of room. Tag lists, action bars, social-icon strips, breadcrumb-style
navigations — anything that's "a row of things, however many fit".

### When to use

- A horizontal row of items that should wrap on narrow screens.
- Justify groups of buttons left, right, or split across the row (\`justify="space-between"\`).
- Any list of small components where neither *Stack* (vertical) nor *Switcher* (responsive
  row→column) is what you want.

### Anatomy

| Attribute | Default | What it does |
|---|---|---|
| \`space\` | \`var(--s1)\` | Gap between items (used by \`gap\`, so it applies to wrapped rows too). |
| \`justify\` | \`flex-start\` | \`flex-start\` · \`flex-end\` · \`center\` · \`space-between\` · \`space-around\`. |
| \`align\` | \`flex-start\` | Vertical alignment of items in a row. |

### Notes

- Items keep their natural width — they don't stretch the way Switcher's children do.
- Built on \`flex-wrap\`; rows don't tear, items just push to a new line.

### Reference

Modeled on *every-layout*'s [Cluster](https://every-layout.dev/layouts/cluster/) primitive.
`;

export default {
  title: 'Layout/Cluster',
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: description } },
  },
  argTypes: {
    space: { control: 'text', description: 'Gap between items.' },
    justify: {
      control: 'select',
      options: ['flex-start', 'flex-end', 'center', 'space-between', 'space-around'],
      description: 'Horizontal distribution.',
    },
    align: {
      control: 'select',
      options: ['flex-start', 'flex-end', 'center', 'stretch'],
      description: 'Vertical alignment within each row.',
    },
  },
  args: { space: 'var(--s1)', justify: 'flex-start', align: 'flex-start' },
};

const tags = ['Layout', 'Web Components', 'CSS', 'No framework', 'Light DOM', 'TypeScript', 'Storybook'];

export const Playground = {
  parameters: {
    docs: {
      description: {
        story:
          'Resize the canvas — items wrap when there is not enough horizontal room. The gap applies between rows, too.',
      },
    },
  },
  render: ({ space, justify, align }: { space: string; justify: string; align: string }) =>
    plate({
      no: '01',
      title: 'Interactive specimen',
      foot: `Justify: ${justify} · Align: ${align}`,
      body: `<cluster-pk space="${space}" justify="${justify}" align="${align}">${tags.map((t) => tag(t)).join('')}</cluster-pk>`,
    }),
};

export const Tags = {
  name: 'Tag list',
  parameters: {
    docs: {
      description: {
        story:
          'Probably the canonical use: a list of tags, categories, or filter chips that wraps naturally.',
      },
    },
  },
  render: () =>
    plate({
      no: '02',
      title: 'Wrapping tag list',
      body: `<cluster-pk space="var(--s-1)">${tags.map((t) => tag(t)).join('')}</cluster-pk>`,
    }),
};

export const ActionBar = {
  name: 'Action bar · split',
  parameters: {
    docs: {
      description: {
        story:
          'A common header pattern: a title on the left, a group of actions on the right. Achieved with `justify="space-between"` on the outer cluster and a nested cluster for the right-hand group.',
      },
    },
  },
  render: () =>
    plate({
      no: '03',
      title: 'justify="space-between"',
      body: `
        <cluster-pk space="var(--s1)" justify="space-between" align="center" style="width:100%">
          <div style="display:flex;flex-direction:column;gap:0.2rem">
            ${caption('Section · 04')}
            <h3 style="margin:0;font-family:var(--font-display);font-weight:500;font-size:1.3rem;letter-spacing:-0.015em">Drafts</h3>
          </div>
          <cluster-pk space="var(--s-1)">
            ${button('Discard')}
            ${button('Publish', { variant: 'solid' })}
          </cluster-pk>
        </cluster-pk>
      `,
    }),
};

export const JustifyVariants = {
  name: 'Justify variants',
  parameters: {
    docs: {
      description: {
        story: 'Side-by-side comparison of every `justify` option.',
      },
    },
  },
  render: () =>
    plate({
      no: '04',
      title: 'flex-start · center · flex-end · space-between',
      body: `
        <div style="display:flex;flex-direction:column;gap:0.85rem">
          ${(['flex-start', 'center', 'flex-end', 'space-between'] as const)
            .map(
              (j) => `
              <div>
                ${caption(`justify · ${j}`)}
                <div style="margin-top:0.3rem;border:1px dashed var(--pk-rule);padding:0.6rem">
                  <cluster-pk space="var(--s-1)" justify="${j}">
                    ${tag('one')}${tag('two')}${tag('three')}
                  </cluster-pk>
                </div>
              </div>
            `,
            )
            .join('')}
        </div>
      `,
    }),
};
