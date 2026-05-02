import '../src/components/container/container';
import '../src/components/box/box';
import '../src/components/stack/stack';
import { plate, caption } from './_demo';

const description = `
\`<container-pk>\` is a **CSS container-query anchor**. Unlike the other Planks primitives, it
contributes no visual layout — its only job is to set \`container-type: inline-size\` and assign a
\`container-name\` so descendants can react to *their own context width* with \`@container\` rules.

### When to use

- A card that needs to switch from a vertical to horizontal layout *based on the card's own width*,
  not the viewport's.
- Any reusable region whose layout should respond to where it's dropped (sidebar, main, modal),
  not the page.

### Anatomy

| Attribute | Default | What it does |
|---|---|---|
| \`name\` | unset | The container name used to scope \`@container\` rules. |

### Usage

\`\`\`html
<container-pk name="card">
  <article class="card">…</article>
</container-pk>

<style>
  @container card (min-width: 480px) {
    .card { display: grid; grid-template-columns: 1fr 2fr; }
  }
</style>
\`\`\`

### Reference

CSS [\`@container\`](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/Container_queries)
specification. \`container-pk\` is a thin wrapper around \`container-type: inline-size\`.
`;

export default {
  title: 'Layout/Container',
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: description } },
  },
  argTypes: {
    name: { control: 'text', description: 'Name used in matching `@container <name>` rules.' },
  },
  args: { name: 'card' },
};

// Inject the container-query rule once per registered name. Defining it inline
// in each story works fine because @container queries are scoped by name.
const containerStyle = `
  <style>
    .pk-card-demo { display: flex; flex-direction: column; gap: 0.75rem; }
    @container card (min-width: 420px) {
      .pk-card-demo { flex-direction: row; align-items: center; }
      .pk-card-demo__image { flex: 0 0 8rem; }
    }
  </style>
`;

const cardMarkup = `
  <div class="pk-card-demo">
    <div class="pk-card-demo__image" style="aspect-ratio:1/1;background:var(--pk-vermillion)"></div>
    <div>
      <h4 style="margin:0;font-family:var(--font-display);font-weight:500;font-size:1.1rem;letter-spacing:-0.01em">A reactive card</h4>
      <p class="pk-prose" style="margin:0.4rem 0 0;font-size:0.9rem">Below 420px the image stacks above the text. Above 420px they sit side by side. Resize the canvas to see it switch.</p>
    </div>
  </div>
`;

export const Playground = {
  parameters: {
    docs: {
      description: {
        story:
          'A single card placed inside a `<container-pk>`. The card switches between a stacked and side-by-side layout based on its **own** width, not the viewport.',
      },
    },
  },
  render: ({ name }: { name: string }) =>
    plate({
      no: '01',
      title: 'Single card',
      foot: 'Resize the canvas to cross 420px.',
      body: `
        ${containerStyle}
        <container-pk name="${name}" style="display:block;border:1px dashed var(--pk-rule);padding:1rem;background:var(--pk-paper)">
          ${cardMarkup}
        </container-pk>
      `,
    }),
};

export const SideBySide = {
  name: 'Two contexts, one card',
  parameters: {
    docs: {
      description: {
        story:
          'The same card markup is dropped into two containers of very different widths. Each adapts to its own context — proof that container queries beat viewport queries for component-level layout.',
      },
    },
  },
  render: () =>
    plate({
      no: '02',
      title: 'Different widths · same component',
      body: `
        ${containerStyle}
        <div style="display:grid;grid-template-columns:1fr 2fr;gap:1.25rem">
          <div>
            ${caption('narrow context')}
            <container-pk name="card" style="display:block;margin-top:0.5rem;border:1px dashed var(--pk-rule);padding:1rem;background:var(--pk-paper)">
              ${cardMarkup}
            </container-pk>
          </div>
          <div>
            ${caption('wide context')}
            <container-pk name="card" style="display:block;margin-top:0.5rem;border:1px dashed var(--pk-rule);padding:1rem;background:var(--pk-paper)">
              ${cardMarkup}
            </container-pk>
          </div>
        </div>
      `,
      foot: 'Identical card markup — different layouts driven by container width.',
    }),
};
