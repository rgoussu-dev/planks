import '../src/components/sidebar/sidebar';
import { plate, caption } from './_demo';

const description = `
\`<sidebar-pk>\` is the **classic two-column layout** — a fixed-width sidebar paired with a
flexible main column — done right. The sidebar has an *intrinsic width* (driven by its content
or by \`sideWidth\`) and the content greedily fills the rest. When there isn't enough room, both
collapse into a stack.

### When to use

- App chrome: navigation rail + main view.
- Article + table-of-contents.
- Form: label column + control column.
- Anywhere the sidebar should hug its content while the main column flexes.

### Anatomy

| Attribute | Default | What it does |
|---|---|---|
| \`side\` | \`left\` | \`left\` or \`right\` — picks which child is the sidebar. |
| \`sideWidth\` | \`250px\` | Intrinsic basis for the sidebar. |
| \`contentWidth\` | \`50%\` | Minimum width the **main** column will accept before wrapping. |
| \`space\` | \`var(--s2)\` | Gap between the two columns. |
| \`noStretch\` | \`false\` | When set, the columns don't stretch to equal heights. |

### How it works

A flexbox combo of \`flex-grow: 1\` (sidebar) + \`flex-grow: 999\` (content) means the content
always wins available space. The sidebar's \`flex-basis\` defaults to \`sideWidth\`, giving it a
preferred size. When \`(sidebar + content + space)\` exceeds the container, both wrap — the
sidebar drops below the main column.

### Reference

After *every-layout*'s [Sidebar](https://every-layout.dev/layouts/sidebar/) primitive.
`;

export default {
  title: 'Layout/Sidebar',
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: description } },
  },
  argTypes: {
    side: { control: 'radio', options: ['left', 'right'], description: 'Which child is the sidebar.' },
    sideWidth: { control: 'text', description: 'Intrinsic width of the sidebar child.' },
    contentWidth: { control: 'text', description: 'Minimum width of the content child.' },
    space: { control: 'text', description: 'Gap between the columns.' },
    noStretch: { control: 'boolean', description: 'Disable equal-height stretching.' },
  },
  args: { side: 'left', sideWidth: '220px', contentWidth: '50%', space: 'var(--s2)', noStretch: false },
};

const sidebarPanel = (label: string) => `
  <aside style="background:var(--pk-ink);color:var(--pk-paper);padding:1.25rem;display:flex;flex-direction:column;gap:0.5rem">
    <span class="pk-mono" style="color:var(--pk-paper);opacity:0.7">${label}</span>
    <h4 style="margin:0;font-family:var(--font-display);font-weight:500;font-size:1.05rem;letter-spacing:-0.01em">Navigation</h4>
    <nav style="display:flex;flex-direction:column;gap:0.4rem;font-family:var(--font-family);font-size:0.95rem">
      <a style="color:var(--pk-paper);text-decoration:none">Drafts</a>
      <a style="color:var(--pk-paper);text-decoration:none">Published</a>
      <a style="color:var(--pk-paper);text-decoration:none;color:var(--pk-vermillion)">→ Settings</a>
    </nav>
  </aside>
`;

const contentPanel = `
  <main style="background:var(--pk-paper);border:1px solid var(--pk-rule);padding:1.25rem;display:flex;flex-direction:column;gap:0.5rem">
    <span class="pk-mono">Main column · grows</span>
    <h3 style="margin:0;font-family:var(--font-display);font-weight:500;font-size:1.4rem;letter-spacing:-0.015em">A flexible counterpart</h3>
    <p class="pk-prose" style="margin:0">The main column stretches to fill whatever inline space the sidebar leaves behind. Resize the canvas — when the two can no longer fit side-by-side, the sidebar wraps below.</p>
  </main>
`;

export const Playground = {
  parameters: {
    docs: {
      description: {
        story:
          'Live two-column layout. Drop the canvas width below `sideWidth + contentWidth + space` to see the columns wrap into a stack.',
      },
    },
  },
  render: ({
    side,
    sideWidth,
    contentWidth,
    space,
    noStretch,
  }: {
    side: 'left' | 'right';
    sideWidth: string;
    contentWidth: string;
    space: string;
    noStretch: boolean;
  }) =>
    plate({
      no: '01',
      title: 'Interactive specimen',
      foot: `side: ${side} · sideWidth: ${sideWidth} · contentWidth: ${contentWidth}`,
      body: `
        <sidebar-pk side="${side}" sideWidth="${sideWidth}" contentWidth="${contentWidth}" space="${space}" ${noStretch ? 'noStretch' : ''}>
          ${side === 'left' ? sidebarPanel('Sidebar · left') + contentPanel : contentPanel + sidebarPanel('Sidebar · right')}
        </sidebar-pk>
      `,
    }),
};

export const LeftAndRight = {
  name: 'Left vs right',
  parameters: {
    docs: {
      description: {
        story:
          'Same component, two arrangements. The `side` attribute controls which child is the intrinsically-sized sidebar.',
      },
    },
  },
  render: () =>
    plate({
      no: '02',
      title: 'side="left" vs side="right"',
      body: `
        <div style="display:flex;flex-direction:column;gap:1.25rem">
          <div>
            ${caption('side · left')}
            <sidebar-pk side="left" sideWidth="200px" space="var(--s1)" style="margin-top:0.5rem">
              ${sidebarPanel('Sidebar')}
              ${contentPanel}
            </sidebar-pk>
          </div>
          <div>
            ${caption('side · right')}
            <sidebar-pk side="right" sideWidth="200px" space="var(--s1)" style="margin-top:0.5rem">
              ${contentPanel}
              ${sidebarPanel('Sidebar')}
            </sidebar-pk>
          </div>
        </div>
      `,
    }),
};

export const ContentMinimum = {
  name: 'contentWidth · trigger the wrap',
  parameters: {
    docs: {
      description: {
        story:
          'Setting `contentWidth` higher (say `60%`) makes the layout wrap into a stack sooner — the main column refuses to be squeezed below that threshold.',
      },
    },
  },
  render: () =>
    plate({
      no: '03',
      title: 'contentWidth: 70%',
      foot: 'A high contentWidth means the layout collapses earlier on narrow containers.',
      body: `
        <sidebar-pk side="left" sideWidth="240px" contentWidth="70%" space="var(--s1)">
          ${sidebarPanel('Sidebar')}
          ${contentPanel}
        </sidebar-pk>
      `,
    }),
};
