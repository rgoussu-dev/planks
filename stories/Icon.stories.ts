import '../src/components/icon/icon';

export default {
  title: 'Layout/Icon',
  tags: ['autodocs'],
  argTypes: {
    space: { control: 'text', description: 'Space between icon and label text' },
    label: { control: 'text', description: 'Accessible label (sets aria-label)' },
  },
  args: { space: 'var(--s-1)', label: '' },
};

const starSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
</svg>`;

export const WithText = {
  render: (args: Record<string, string>) => `
    <p style="font-size:1.25rem">
      <icon-pk space="${args['space']}" ${args['label'] ? `label="${args['label']}"` : ''}>
        ${starSvg}
      </icon-pk>
      Starred repository
    </p>
  `,
};

export const IconOnly = {
  args: { label: 'Star' },
  render: (args: Record<string, string>) => `
    <icon-pk label="${args['label']}" style="font-size:2rem">
      ${starSvg}
    </icon-pk>
  `,
};
