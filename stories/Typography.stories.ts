import '../src/components/typography/typography';

export default {
  title: 'Layout/Typography',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['', 'heading-1', 'heading-2', 'heading-3', 'body', 'caption', 'small'],
      description: 'Preset variant',
    },
    color: { control: 'color', description: 'Text color' },
    textAlign: { control: 'select', options: ['inherit', 'left', 'center', 'right'] },
  },
  args: { variant: 'body', color: 'inherit', textAlign: 'inherit' },
};

export const Variants = {
  render: () => `
    <stack-pk space="var(--s1)">
      ${(['heading-1', 'heading-2', 'heading-3', 'body', 'caption', 'small'] as const)
        .map(v => `<typography-pk variant="${v}">${v}: The quick brown fox jumps over the lazy dog</typography-pk>`)
        .join('')}
    </stack-pk>
  `,
};

export const Custom = {
  render: (args: Record<string, string>) => `
    <typography-pk variant="${args['variant']}" color="${args['color']}" textAlign="${args['textAlign']}">
      The quick brown fox jumps over the lazy dog
    </typography-pk>
  `,
};
