import '../src/components/cluster/cluster';

export default {
  title: 'Layout/Cluster',
  tags: ['autodocs'],
  argTypes: {
    space: { control: 'text', description: 'Gap between items' },
    justify: { control: 'select', options: ['flex-start', 'flex-end', 'center', 'space-between', 'space-around'], description: 'Horizontal alignment' },
    align: { control: 'select', options: ['flex-start', 'flex-end', 'center', 'stretch'], description: 'Vertical alignment' },
  },
  args: { space: 'var(--s1)', justify: 'flex-start', align: 'flex-start' },
};

const tag = (label: string) =>
  `<span style="background:#f5f0eb;padding:0.25em 0.75em;border-radius:999px;font-size:0.875rem">${label}</span>`;

export const Tags = {
  render: (args: Record<string, string>) => `
    <cluster-pk space="${args['space']}" justify="${args['justify']}" align="${args['align']}">
      ${['Design', 'Web Components', 'CSS', 'Layout', 'Open Source'].map(tag).join('')}
    </cluster-pk>
  `,
};

export const Buttons = {
  args: { justify: 'flex-end' },
  render: (args: Record<string, string>) => `
    <cluster-pk space="${args['space']}" justify="${args['justify']}">
      <button style="padding:0.5em 1em">Cancel</button>
      <button style="padding:0.5em 1em;background:#333;color:#fff;border:none;cursor:pointer">Confirm</button>
    </cluster-pk>
  `,
};
