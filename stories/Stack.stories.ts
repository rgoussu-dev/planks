import '../src/components/stack/stack';

export default {
  title: 'Layout/Stack',
  tags: ['autodocs'],
  argTypes: {
    space: { control: 'text', description: 'Gap between stacked items (any CSS value)' },
    recursive: { control: 'boolean', description: 'Apply spacing recursively to all nested items' },
    splitAfter: { control: 'number', description: 'Push all items after nth child to the bottom' },
  },
  args: { space: 'var(--s1)', recursive: false },
};

const item = (label: string) =>
  `<div style="background:#f5f0eb;padding:var(--s0);border-radius:4px;font-family:var(--font-family)">${label}</div>`;

export const Default = {
  render: ({ space }: { space: string }) => `
    <stack-pk space="${space}">
      ${item('First item')}
      ${item('Second item')}
      ${item('Third item')}
    </stack-pk>
  `,
};

export const WithSplitAfter = {
  args: { splitAfter: 1 },
  render: ({ space, splitAfter }: { space: string; splitAfter: number }) => `
    <stack-pk space="${space}" splitAfter="${splitAfter}" style="min-height:300px;background:#faf8f5;padding:var(--s1)">
      ${item('Header (pinned)')}
      ${item('Main content')}
      ${item('Footer (pushed down)')}
    </stack-pk>
  `,
};
