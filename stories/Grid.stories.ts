import '../src/components/grid/grid';

export default {
  title: 'Layout/Grid',
  tags: ['autodocs'],
  argTypes: {
    min: { control: 'text', description: 'Minimum column width before wrapping' },
    space: { control: 'text', description: 'Gap between grid cells' },
    align: { control: 'select', options: ['stretch', 'start', 'end', 'center'], description: 'Vertical alignment' },
    justify: { control: 'select', options: ['stretch', 'start', 'end', 'center', 'space-between'], description: 'Horizontal justification' },
  },
  args: { min: '200px', space: 'var(--s1)', align: 'stretch', justify: 'stretch' },
};

const cell = (n: number) =>
  `<div style="background:#f5f0eb;padding:var(--s1);border-radius:4px;text-align:center">Cell ${n}</div>`;

export const Default = {
  render: (args: Record<string, string>) => `
    <grid-pk min="${args['min']}" space="${args['space']}" align="${args['align']}" justify="${args['justify']}">
      ${[1, 2, 3, 4, 5, 6].map(cell).join('')}
    </grid-pk>
  `,
};

export const Narrow = {
  args: { min: '120px' },
  render: (args: Record<string, string>) => `
    <grid-pk min="${args['min']}" space="${args['space']}">
      ${[1, 2, 3, 4, 5, 6, 7, 8].map(cell).join('')}
    </grid-pk>
  `,
};
