import '../src/components/reel/reel';

export default {
  title: 'Layout/Reel',
  tags: ['autodocs'],
  argTypes: {
    itemWidth: { control: 'text', description: 'Fixed width of each item' },
    space: { control: 'text', description: 'Gap between items' },
    height: { control: 'text', description: 'Block-size of the reel' },
    noBar: { control: 'boolean', description: 'Hide scrollbar' },
  },
  args: { itemWidth: '200px', space: 'var(--s1)', height: 'auto', noBar: false },
};

const card = (n: number) =>
  `<div style="background:#f5f0eb;padding:var(--s1);border-radius:4px;flex-shrink:0">Item ${n}</div>`;

export const Default = {
  render: (args: Record<string, string>) => `
    <reel-pk itemWidth="${args['itemWidth']}" space="${args['space']}" height="${args['height']}" ${args['noBar'] === 'true' ? 'noBar' : ''} style="max-width:500px;border:1px solid #ddd;padding:var(--s1)">
      ${[1, 2, 3, 4, 5, 6, 7].map(card).join('')}
    </reel-pk>
  `,
};
