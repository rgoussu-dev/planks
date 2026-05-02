import '../src/components/index';
import { caption } from './_demo';

const overview = `
**Planks** is a small set of every-layout-style primitives shipped as native custom elements.

These stories are the visual workshop for the library: each component has a documentation page
with prose, an interactive sandbox, and a series of *plates* — labelled specimens that demonstrate
one facet of the component at a time.

### Reading these docs

- **Plate number** (top-left, vermillion). A specimen index inside the page, e.g. \`Plate 02\`.
- **Plate title** (top-right, mono). The aspect being demonstrated.
- **Plate footer** (dashed line). Notes the controlling tokens or attributes for that specimen.
- **Controls panel**. The first story on each page is interactive; tweak its args to feel the API.

### What's in the sidebar

- **Foundations** — this page, plus the design tokens (spacing scale, type, colour) every component
  consumes by default.
- **Layout** — the fourteen primitives, ordered roughly from "atomic" (Box) to "compositional"
  (Cover, Reel, Imposter).

### Mental model

Every component is a tag-scoped custom element that:

1. Registers a single \`<style>\` tag in \`document.head\` the first time it mounts.
2. Reads its state from \`--<tag>-*\` custom properties.
3. Exposes high-level attributes (e.g. \`space\`, \`min\`, \`ratio\`) that map onto those properties.

Because everything lives in the **light DOM**, your global resets and design tokens cascade in normally,
and a consumer stylesheet can override any rule with regular CSS specificity.
`;

export default {
  title: 'Foundations/Introduction',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: { component: overview },
    },
    options: { showPanel: false },
  },
};

export const Welcome = {
  name: 'A guided tour',
  render: () => `
    <div style="
      max-width:64ch;display:flex;flex-direction:column;gap:1.5rem;
      background:var(--pk-paper);border:1px solid var(--pk-rule);
      padding:clamp(1.5rem,3vw,2.5rem);
    ">
      ${caption('Planks · Layout primitives · v0.2')}
      <h1 style="
        margin:0;font-family:var(--font-display);font-weight:400;
        font-size:clamp(2.5rem,5vw,4rem);line-height:1.05;letter-spacing:-0.025em;
        color:var(--pk-ink);
      ">
        <em style="font-style:italic;color:var(--pk-vermillion)">Fourteen</em> small,<br/>
        sturdy primitives<br/>
        for honest layout.
      </h1>
      <p class="pk-prose" style="font-size:1.05rem;max-width:54ch">
        Each story page in this workshop is laid out like a printer's plate — a numbered specimen
        with mono captions, dashed measurement lines, and serif body copy. The aim is to make the
        intent of each component <em>visible at a glance</em>, then back it up with prose you can
        read without context-switching to a wiki.
      </p>
      <hr class="pk-rule"/>
      <p class="pk-prose" style="font-size:0.92rem">
        Start with <strong>Box</strong>, <strong>Stack</strong>, and <strong>Cluster</strong> — those
        three cover ~80% of layout work. From there move outward to <strong>Grid</strong> /
        <strong>Switcher</strong> for repeating content, and to <strong>Sidebar</strong> /
        <strong>Cover</strong> for page chrome.
      </p>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story:
          'Open any story in the sidebar, then tweak the **Controls** panel below the canvas to see the component react in real time.',
      },
    },
  },
};
