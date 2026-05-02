import '../src/components/imposter/imposter';
import { plate, caption, button } from './_demo';

const description = `
\`<imposter-pk>\` **absolutely centers** its content inside its nearest positioned ancestor (or the
viewport, with \`fixed\`). It's the building block for modal dialogs, overlay loaders, "press
play" buttons over a video, callouts pinned to a hero, and any other "centred over" treatment.

### When to use

- Modal / dialog content centred over the viewport (\`fixed\`).
- A pinned overlay inside a positioned card (default \`absolute\`).
- A play-button or info marker over a media frame.

### Anatomy

| Attribute | Default | What it does |
|---|---|---|
| \`margin\` | \`0\` | Minimum margin from the container edges (subtracted from max width/height). |
| \`fixed\` | \`false\` | Position relative to the viewport instead of the nearest positioned ancestor. |
| \`breakout\` | \`false\` | Allow the imposter to overflow its parent (skips the max-size clamp). |

### Important

The default \`absolute\` positioning means the imposter centres relative to its nearest
**positioned** ancestor. Make sure the parent has \`position: relative\` (or any non-static value),
or it'll fall back further up the DOM than you expect.

### Reference

After *every-layout*'s [Imposter](https://every-layout.dev/layouts/imposter/) primitive.
`;

export default {
  title: 'Layout/Imposter',
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: description } },
  },
  argTypes: {
    margin: { control: 'text', description: 'Minimum distance from container edges.' },
    breakout: { control: 'boolean', description: 'Allow overflow past the parent.' },
    fixed: { control: 'boolean', description: 'Position relative to the viewport.' },
  },
  args: { margin: '1rem', breakout: false, fixed: false },
};

const stage = (body: string, h = '320px') => `
  <div style="position:relative;background:linear-gradient(135deg,var(--pk-wash),var(--pk-cream));border:1px dashed var(--pk-rule);height:${h};overflow:hidden">
    <div style="padding:1rem">${caption('Stage · position: relative')}</div>
    ${body}
  </div>
`;

export const Playground = {
  parameters: {
    docs: {
      description: {
        story:
          'A centred panel inside a relatively-positioned stage. Tweak `margin` to feel the safety inset; toggle `breakout` to allow overflow.',
      },
    },
  },
  render: ({ margin, breakout, fixed }: { margin: string; breakout: boolean; fixed: boolean }) =>
    plate({
      no: '01',
      title: 'Interactive specimen',
      bare: true,
      foot: `margin: ${margin} · ${breakout ? 'breakout · ' : ''}${fixed ? 'fixed' : 'absolute'}`,
      body: stage(`
        <imposter-pk margin="${margin}" ${breakout ? 'breakout' : ''} ${fixed ? 'fixed' : ''}>
          <div style="background:var(--pk-paper);border:1px solid var(--pk-rule);padding:1.25rem;display:flex;flex-direction:column;gap:0.5rem;min-width:14rem">
            ${caption('Imposter')}
            <h4 style="margin:0;font-family:var(--font-display);font-weight:500;font-size:1.1rem">Centred above</h4>
            <p style="margin:0;font-family:var(--font-family);font-size:0.9rem">Pinned at 50% / 50%, with translate.</p>
          </div>
        </imposter-pk>
      `),
    }),
};

export const Modal = {
  name: 'Modal-style dialog',
  parameters: {
    docs: {
      description: {
        story:
          'A simulated modal: dim sheet over the stage, with a centred dialog card. In production the outer overlay would also be a positioned element, often the document body via `fixed`.',
      },
    },
  },
  render: () =>
    plate({
      no: '02',
      title: 'Imposter · modal',
      bare: true,
      body: stage(
        `
        <div style="position:absolute;inset:0;background:rgba(26,24,22,0.45)"></div>
        <imposter-pk margin="1rem">
          <div style="background:var(--pk-paper);border:1px solid var(--pk-rule);padding:1.5rem;display:flex;flex-direction:column;gap:0.75rem;min-width:18rem;max-width:24rem">
            ${caption('Confirm action')}
            <h4 style="margin:0;font-family:var(--font-display);font-weight:500;font-size:1.25rem">Discard draft?</h4>
            <p style="margin:0;font-family:var(--font-family);font-size:0.95rem;line-height:1.55">This is permanent. The draft has not been published anywhere.</p>
            <div style="display:flex;gap:0.5rem;justify-content:flex-end;margin-top:0.5rem">
              ${button('Cancel')}
              ${button('Discard', { variant: 'solid' })}
            </div>
          </div>
        </imposter-pk>
      `,
        '380px',
      ),
    }),
};

export const PlayButton = {
  name: 'Pinned play button',
  parameters: {
    docs: {
      description: {
        story:
          'Combine `imposter-pk` with `frame-pk` to centre a play button (or any marker) over a media surface.',
      },
    },
  },
  render: () =>
    plate({
      no: '03',
      title: 'Marker over a frame',
      body: `
        <div style="position:relative;width:min(100%,420px);aspect-ratio:16/9;background:url('https://picsum.photos/seed/imposter-play/640/360') center/cover;border:1px solid var(--pk-rule)">
          <imposter-pk>
            <button style="background:var(--pk-vermillion);color:var(--pk-paper);border:none;padding:1rem 1.4rem;font-family:var(--font-mono);font-size:0.78rem;letter-spacing:0.18em;text-transform:uppercase;cursor:pointer">▶ Play</button>
          </imposter-pk>
        </div>
      `,
    }),
};
