import '../src/components/stack/stack';
import { plate, specimens, cell, caption, button } from './_demo';

const description = `
\`<stack-pk>\` puts **vertical rhythm** between its children. It's the workhorse of any layout —
forms, articles, sidebars, dialog bodies — anywhere you'd otherwise scatter \`margin-block-start\`
declarations across a dozen child selectors.

### When to use

- Any time more than one element should sit on top of another with consistent spacing.
- Wherever you currently have ad-hoc \`margin-bottom\` rules; replace them with one \`stack-pk\`.

### Anatomy

| Attribute | Default | What it does |
|---|---|---|
| \`space\` | \`var(--s1)\` | Gap between adjacent children. |
| \`recursive\` | \`false\` | Apply the rule to every descendant — useful for prose/article roots. |
| \`splitAfter\` | unset | Push everything **after** the *N*th child to the bottom. The stack must have a known block-size for this to take effect. |

### How it works

The structural CSS is the classic *owl* selector:

\`\`\`css
stack-pk > * + * { margin-block-start: var(--stack-space, var(--s1)); }
\`\`\`

There's no flexbox \`gap\`, so children behave normally — they collapse into the page flow,
respect inline-block siblings, and don't fight with margin collapsing the way flex children do.

### Reference

Adapted from *every-layout*'s [Stack](https://every-layout.dev/layouts/stack/) primitive.
`;

export default {
  title: 'Layout/Stack',
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: description } },
  },
  argTypes: {
    space: { control: 'text', description: 'Gap between stacked items (any CSS length).' },
    recursive: { control: 'boolean', description: 'Apply spacing recursively to all nested items.' },
    splitAfter: { control: 'number', description: 'Push every child after the *N*th to the bottom.' },
  },
  args: { space: 'var(--s1)', recursive: false, splitAfter: undefined },
};

export const Playground = {
  parameters: {
    docs: {
      description: {
        story: 'Live sandbox. Change `space` to feel the proportional jump between scale steps.',
      },
    },
  },
  render: ({ space, recursive, splitAfter }: { space: string; recursive: boolean; splitAfter?: number }) =>
    plate({
      no: '01',
      title: 'Interactive specimen',
      foot: `Space: <code style="font-family:var(--font-mono)">${space}</code>`,
      body: `
        <stack-pk space="${space}" ${recursive ? 'recursive' : ''} ${splitAfter ? `splitAfter="${splitAfter}"` : ''}>
          ${cell('Item · 01', { tone: 'cream' })}
          ${cell('Item · 02', { tone: 'wash' })}
          ${cell('Item · 03', { tone: 'cream' })}
          ${cell('Item · 04', { tone: 'wash' })}
        </stack-pk>
      `,
    }),
};

export const SpaceComparison = {
  name: 'Space · scale comparison',
  parameters: {
    docs: {
      description: {
        story:
          'Three stacks side by side using the modular scale tokens. The proportions stay coherent because every value is a power of `--ratio`.',
      },
    },
  },
  render: () =>
    plate({
      no: '02',
      title: '--s0 · --s1 · --s2',
      body: `
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:1.25rem">
          ${(['--s0', '--s1', '--s2'] as const)
            .map(
              (token) => `
              <div>
                ${caption(`space · ${token}`)}
                <stack-pk space="var(${token})" style="margin-top:0.5rem;display:block">
                  ${cell('A', { tone: 'cream' })}
                  ${cell('B', { tone: 'cream' })}
                  ${cell('C', { tone: 'cream' })}
                </stack-pk>
              </div>
            `,
            )
            .join('')}
        </div>
      `,
    }),
};

export const Article = {
  name: 'Real prose · recursive',
  parameters: {
    docs: {
      description: {
        story:
          'Toggle `recursive` to apply the stack rhythm to every descendant — perfect for an article root where headings, paragraphs, lists and code blocks all need consistent spacing.',
      },
    },
  },
  render: () =>
    plate({
      no: '03',
      title: 'recursive · article rhythm',
      body: `
        <stack-pk space="var(--s1)" recursive style="display:block;max-width:60ch">
          <h2 style="margin:0;font-family:var(--font-display);font-weight:500;font-size:1.6rem;letter-spacing:-0.015em">On stacking honestly</h2>
          <p class="pk-prose" style="margin:0">A stack is the easiest way to inject rhythm into an article. Headings, paragraphs, and code blocks all get the same vertical breathing room.</p>
          <p class="pk-prose" style="margin:0">When you turn on <code style="font-family:var(--font-mono);font-size:0.9em">recursive</code>, the rule applies to nested children too — so a list inside a paragraph still looks right.</p>
          <ul class="pk-prose" style="margin:0;padding-left:1.25rem">
            <li>One spacing token, applied everywhere.</li>
            <li>No more margin-bottom hunting.</li>
            <li>Override per-section by setting <code style="font-family:var(--font-mono);font-size:0.9em">--stack-space</code>.</li>
          </ul>
        </stack-pk>
      `,
    }),
};

export const SplitAfter = {
  name: 'splitAfter · pin to bottom',
  parameters: {
    docs: {
      description: {
        story:
          'Use `splitAfter="N"` to push everything after the *N*th child to the bottom. Common in dialogs (header, body, footer) or modal cards (title, content, primary action).',
      },
    },
  },
  render: () =>
    plate({
      no: '04',
      title: 'splitAfter="2" · pinned footer',
      foot: 'A min-height on the stack is required for the bottom-stick to take effect.',
      body: `
        <stack-pk space="var(--s1)" splitAfter="2" style="display:block;min-height:280px;background:var(--pk-cream);border:1px solid var(--pk-rule);padding:1.25rem">
          <header>
            <span class="pk-mono">Section · 01</span>
            <h3 style="margin:0.5rem 0 0;font-family:var(--font-display);font-weight:500;font-size:1.4rem;letter-spacing:-0.015em">A pinned footer</h3>
          </header>
          <p class="pk-prose" style="margin:0">Body content sits naturally in the middle. The stack's split-after rule pushes the actions row down to the bottom edge regardless of body size.</p>
          <div style="display:flex;justify-content:flex-end;gap:0.5rem">
            ${button('Cancel')}
            ${button('Save', { variant: 'solid' })}
          </div>
        </stack-pk>
      `,
    }),
};
