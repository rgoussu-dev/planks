import '../src/components/cover/cover';

export default {
  title: 'Layout/Cover',
  tags: ['autodocs'],
  argTypes: {
    minHeight: { control: 'text', description: 'Minimum block-size of the cover' },
    space: { control: 'text', description: 'Vertical spacing between non-centered items' },
    noPad: { control: 'boolean', description: 'Remove padding' },
  },
  args: { minHeight: '400px', space: 'var(--s1)', noPad: false },
};

export const Default = {
  render: (args: Record<string, string>) => `
    <cover-pk minHeight="${args['minHeight']}" space="${args['space']}" ${args['noPad'] === 'true' ? 'noPad' : ''} style="background:#f5f0eb">
      <div>Header (top)</div>
      <div slot="centered" style="text-align:center;padding:var(--s2)">
        <p style="font-size:var(--s2);margin:0">Centered content</p>
        <p style="margin:var(--s0) 0 0">Vertically and horizontally centered</p>
      </div>
      <div>Footer (bottom)</div>
    </cover-pk>
  `,
};
