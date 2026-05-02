import '../src/components/icon/icon';
import { plate, caption } from './_demo';

const description = `
\`<icon-pk>\` is a thin **inline icon wrapper** that solves the eternally annoying problem of
sizing an SVG to match its accompanying text. It uses the \`cap\` unit (with an \`em\` fallback) so
the icon is exactly cap-height tall — visually aligned with the text x-height.

### When to use

- Inline icons next to text (link arrows, chevrons, status dots).
- Icon-only buttons where the icon should be visually balanced with sibling labels elsewhere.
- Anywhere you'd otherwise hard-code \`width: 1em; height: 1em\` on a child SVG.

### Anatomy

| Attribute | Default | What it does |
|---|---|---|
| \`space\` | unset | Margin between the icon and a following text node. |
| \`label\` | unset | Sets \`role="img"\` and \`aria-label\` for accessibility. Use when the icon stands alone. |

### Notes

- The wrapped \`<svg>\` should set \`fill="currentColor"\` (or \`stroke="currentColor"\`) so it inherits
  the parent's text colour.
- For decorative icons next to text, *omit* \`label\` — the icon is decorative; screen readers will
  ignore it and read the adjacent text.

### Reference

After *every-layout*'s [Icon](https://every-layout.dev/layouts/icon/) primitive.
`;

export default {
  title: 'Layout/Icon',
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: description } },
  },
  argTypes: {
    space: { control: 'text', description: 'Margin between icon and label text.' },
    label: { control: 'text', description: 'Accessible label (sets `aria-label`).' },
  },
  args: { space: 'var(--s-1)', label: '' },
};

const star = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
</svg>`;

const arrow = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
  <path d="M5 12h14M13 5l7 7-7 7"/>
</svg>`;

const sparkle = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
  <path d="M12 2l1.6 5.4L19 9l-5.4 1.6L12 16l-1.6-5.4L5 9l5.4-1.6z"/>
</svg>`;

const heart = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
  <path d="M12 21s-7-4.6-9.3-9.4C1.2 8.5 3.4 5 6.6 5c1.9 0 3.6 1 4.4 2.7C12 6 13.7 5 15.6 5c3.2 0 5.4 3.5 3.9 6.6C19 16.4 12 21 12 21z"/>
</svg>`;

export const Playground = {
  parameters: {
    docs: {
      description: {
        story:
          'Tweak `space` to control the gap between icon and label. The icon is sized to one cap-height — it scales with the surrounding font.',
      },
    },
  },
  render: ({ space, label }: { space: string; label?: string }) =>
    plate({
      no: '01',
      title: 'Interactive specimen',
      body: `
        <p style="font-size:1.5rem;margin:0;font-family:var(--font-family)">
          <icon-pk space="${space}" ${label ? `label="${label}"` : ''}>${star}</icon-pk>
          Starred this repository
        </p>
      `,
    }),
};

export const InlineWithText = {
  name: 'Inline with text · scales with size',
  parameters: {
    docs: {
      description: {
        story:
          'The same icon paired with text at three font sizes. Note that the icon scales with the text — it stays cap-height tall in every case.',
      },
    },
  },
  render: () =>
    plate({
      no: '02',
      title: 'cap-height · 0.9rem · 1.25rem · 2rem',
      body: `
        <div style="display:flex;flex-direction:column;gap:0.85rem">
          ${[
            ['0.9rem', star, 'Small heading badge'],
            ['1.25rem', arrow, 'Medium link cue'],
            ['2rem', sparkle, 'Large feature tag'],
          ]
            .map(
              ([size, svg, label]) => `
              <p style="margin:0;font-size:${size};font-family:var(--font-family);color:var(--pk-ink)">
                <icon-pk space="var(--s-1)">${svg}</icon-pk>
                ${label}
              </p>
            `,
            )
            .join('')}
        </div>
      `,
    }),
};

export const Standalone = {
  name: 'Icon-only · with label',
  parameters: {
    docs: {
      description: {
        story:
          'When the icon stands alone (without text), pass `label` so screen readers announce its meaning.',
      },
    },
  },
  render: () =>
    plate({
      no: '03',
      title: 'icon-pk[label] · accessible',
      body: `
        <div style="display:flex;gap:1.25rem;align-items:center">
          ${caption('aria-label set')}
          <icon-pk label="Star" style="font-size:2rem;color:var(--pk-vermillion)">${star}</icon-pk>
          <icon-pk label="Heart" style="font-size:2rem;color:var(--pk-vermillion)">${heart}</icon-pk>
          <icon-pk label="Forward" style="font-size:2rem;color:var(--pk-ink)">${arrow}</icon-pk>
        </div>
      `,
    }),
};

export const InsideButton = {
  name: 'Inside a button',
  parameters: {
    docs: {
      description: {
        story:
          'A common pattern: an icon to the left of a button label. The icon inherits the button\'s `currentColor`.',
      },
    },
  },
  render: () =>
    plate({
      no: '04',
      title: 'cta · icon + label',
      body: `
        <div style="display:flex;gap:0.75rem;flex-wrap:wrap">
          <button style="display:inline-flex;align-items:center;background:var(--pk-ink);color:var(--pk-paper);border:none;padding:0.7em 1.2em;font-family:var(--font-mono);font-size:0.78rem;letter-spacing:0.16em;text-transform:uppercase;cursor:pointer">
            <icon-pk space="0.6em">${sparkle}</icon-pk> Generate
          </button>
          <button style="display:inline-flex;align-items:center;background:transparent;color:var(--pk-ink);border:1px solid var(--pk-ink);padding:0.7em 1.2em;font-family:var(--font-mono);font-size:0.78rem;letter-spacing:0.16em;text-transform:uppercase;cursor:pointer">
            Continue <icon-pk space="0">${arrow}</icon-pk>
          </button>
        </div>
      `,
    }),
};
