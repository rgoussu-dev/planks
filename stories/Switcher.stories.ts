import '../src/components/switcher/switcher';

export default {
  title: 'Layout/Switcher',
  tags: ['autodocs'],
  argTypes: {
    threshold: { control: 'text', description: 'Width at which layout switches from horizontal to vertical' },
    space: { control: 'text', description: 'Gap between items' },
    limit: { control: 'number', description: 'Maximum number of items in a row before wrapping all' },
  },
  args: { threshold: 'var(--measure)', space: 'var(--s1)', limit: 4 },
};

const cell = (label: string) =>
  `<div style="background:#f5f0eb;padding:var(--s1);border-radius:4px">${label}</div>`;

export const Default = {
  render: (args: Record<string, string>) => `
    <switcher-pk threshold="${args['threshold']}" space="${args['space']}" limit="${args['limit']}">
      ${['Alpha', 'Beta', 'Gamma'].map(cell).join('')}
    </switcher-pk>
  `,
};
