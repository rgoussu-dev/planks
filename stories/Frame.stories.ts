import '../src/components/frame/frame';
import { plate, caption } from './_demo';

const description = `
\`<frame-pk>\` is a **media wrapper that locks an aspect ratio**. Drop an \`<img>\` or \`<video>\`
inside and it'll be cropped to \`object-fit: cover\` at the requested ratio — useful for galleries,
hero images, video thumbnails, and avatars.

### When to use

- Any image that should occupy a known shape (16:9, 1:1, 21:9 …) regardless of its native size.
- Video thumbnails and embeds where you don't yet know the source dimensions.
- Avatar circles (paired with \`border-radius: 999px\`).

### Anatomy

| Attribute | Default | What it does |
|---|---|---|
| \`ratio\` | \`16:9\` | Aspect ratio in \`n:d\` form. |

The component sets \`aspect-ratio: var(--frame-n) / var(--frame-d)\` and clips overflow.
The \`<img>\` / \`<video>\` inside is sized to fill the frame at \`object-fit: cover\`.

### Reference

After *every-layout*'s [Frame](https://every-layout.dev/layouts/frame/) primitive.
`;

export default {
  title: 'Layout/Frame',
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: description } },
  },
  argTypes: {
    ratio: {
      control: 'select',
      options: ['16:9', '4:3', '3:2', '1:1', '21:9', '9:16'],
      description: 'Aspect ratio (`width:height`).',
    },
  },
  args: { ratio: '16:9' },
};

const seedSrc = (seed: string, w = 800, h = 450) => `https://picsum.photos/seed/${seed}/${w}/${h}`;

export const Playground = {
  parameters: {
    docs: {
      description: {
        story: 'Pick a ratio and watch the frame snap to it. The image is cropped via `object-fit: cover`.',
      },
    },
  },
  render: ({ ratio }: { ratio: string }) =>
    plate({
      no: '01',
      title: `Interactive specimen · ${ratio}`,
      foot: 'Image is cropped, not stretched.',
      body: `
        <frame-pk ratio="${ratio}" style="display:block;max-width:36rem;background:var(--pk-wash)">
          <img src="${seedSrc('planks-' + ratio.replace(':', '-'))}" alt="Demo image" />
        </frame-pk>
      `,
    }),
};

export const RatioGallery = {
  name: 'Ratio gallery',
  parameters: {
    docs: {
      description: {
        story:
          'A common set of ratios laid out side by side. Useful for picking the right shape for a project.',
      },
    },
  },
  render: () =>
    plate({
      no: '02',
      title: 'Common ratios',
      body: `
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:1rem">
          ${(['16:9', '4:3', '3:2', '1:1', '21:9', '9:16'] as const)
            .map(
              (r) => `
              <div>
                ${caption(`ratio · ${r}`)}
                <frame-pk ratio="${r}" style="display:block;margin-top:0.4rem;background:var(--pk-wash)">
                  <img src="${seedSrc(r.replace(':', '-'))}" alt="${r} ratio sample" />
                </frame-pk>
              </div>
            `,
            )
            .join('')}
        </div>
      `,
    }),
};

export const Avatar = {
  name: 'Avatar (1:1 + radius)',
  parameters: {
    docs: {
      description: {
        story:
          'Pair a 1:1 frame with a circular border-radius for the canonical avatar pattern. The image is cropped to the centre.',
      },
    },
  },
  render: () =>
    plate({
      no: '03',
      title: '1:1 + border-radius: 999px',
      body: `
        <div style="display:flex;gap:0.75rem;align-items:center">
          ${[64, 96, 128, 160]
            .map(
              (size, i) => `
              <frame-pk ratio="1:1" style="display:block;width:${size}px;border-radius:999px;background:var(--pk-wash)">
                <img src="${seedSrc('avatar-' + i, 320, 320)}" alt="Avatar ${i + 1}" />
              </frame-pk>
            `,
            )
            .join('')}
        </div>
      `,
    }),
};
