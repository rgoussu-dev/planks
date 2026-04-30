import '../src/components/center/center';

export default {
  title: 'Layout/Center',
  tags: ['autodocs'],
  argTypes: {
    maxWidth: { control: 'text', description: 'Maximum inline size' },
    gutters: { control: 'text', description: 'Horizontal padding on either side' },
    alignText: { control: 'boolean', description: 'Center-align text content' },
    intrinsic: { control: 'boolean', description: 'Center children based on their own widths' },
  },
  args: { maxWidth: 'var(--measure)', gutters: 'var(--s1)', alignText: false, intrinsic: false },
};

export const Default = {
  render: (args: Record<string, string>) => `
    <div style="background:#eee;padding:var(--s1)">
      <center-pk maxWidth="${args['maxWidth']}" gutters="${args['gutters']}" ${args['alignText'] === 'true' ? 'alignText' : ''} ${args['intrinsic'] === 'true' ? 'intrinsic' : ''}>
        <p style="margin:0">This content is centered with a max-width of <code>${args['maxWidth']}</code>. Resize the window to see it constrain.</p>
      </center-pk>
    </div>
  `,
};
