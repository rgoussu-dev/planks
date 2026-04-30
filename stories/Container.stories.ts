import '../src/components/container/container';

export default {
  title: 'Layout/Container',
  tags: ['autodocs'],
  argTypes: {
    name: { control: 'text', description: 'CSS container name for @container queries' },
  },
  args: { name: 'card' },
};

export const Default = {
  render: (args: Record<string, string>) => `
    <container-pk name="${args['name']}">
      <div style="padding:var(--s1);background:#f5f0eb;border-radius:4px">
        <p style="margin:0">This content lives inside a CSS Container Query context named <code>${args['name']}</code>.</p>
        <p style="margin:var(--s-1) 0 0;font-size:0.875rem">Use <code>@container ${args['name']} (min-width: 400px) { … }</code> in your CSS.</p>
      </div>
    </container-pk>
  `,
};
