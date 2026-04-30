import '../src/components/imposter/imposter';

export default {
  title: 'Layout/Imposter',
  tags: ['autodocs'],
  argTypes: {
    margin: { control: 'text', description: 'Minimum margin from container edges' },
    breakout: { control: 'boolean', description: 'Allow overflow past container bounds' },
    fixed: { control: 'boolean', description: 'Use fixed positioning (relative to viewport)' },
  },
  args: { margin: '0', breakout: false, fixed: false },
};

export const Default = {
  render: (args: Record<string, string>) => `
    <div style="position:relative;background:#eee;height:300px;width:100%">
      <p style="padding:var(--s1)">Container (position: relative)</p>
      <imposter-pk margin="${args['margin']}" ${args['breakout'] === 'true' ? 'breakout' : ''}>
        <div style="background:#f5f0eb;padding:var(--s2);border:1px solid #ccc;border-radius:4px">
          Centered overlay
        </div>
      </imposter-pk>
    </div>
  `,
};
