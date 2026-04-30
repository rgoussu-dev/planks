import '../src/components/sidebar/sidebar';

export default {
  title: 'Layout/Sidebar',
  tags: ['autodocs'],
  argTypes: {
    side: { control: 'radio', options: ['left', 'right'], description: 'Which child is the sidebar' },
    sideWidth: { control: 'text', description: 'Width of the sidebar child' },
    space: { control: 'text', description: 'Gap between sidebar and content' },
    noStretch: { control: 'boolean', description: 'Disable height stretching' },
  },
  args: { side: 'left', sideWidth: '200px', space: 'var(--s2)', noStretch: false },
};

const panel = (label: string, bg = '#f5f0eb') =>
  `<div style="background:${bg};padding:var(--s1);min-height:120px">${label}</div>`;

export const Default = {
  render: (args: Record<string, string>) => `
    <sidebar-pk side="${args['side']}" sideWidth="${args['sideWidth']}" space="${args['space']}" ${args['noStretch'] === 'true' ? 'noStretch' : ''}>
      ${panel('Sidebar', '#e8e0d8')}
      ${panel('Main content — grows to fill remaining space')}
    </sidebar-pk>
  `,
};

export const RightSidebar = {
  args: { side: 'right', sideWidth: '240px' },
  render: (args: Record<string, string>) => `
    <sidebar-pk side="${args['side']}" sideWidth="${args['sideWidth']}" space="${args['space']}">
      ${panel('Main content — grows to fill remaining space')}
      ${panel('Sidebar on right', '#e8e0d8')}
    </sidebar-pk>
  `,
};
