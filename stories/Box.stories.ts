import '../src/components/box/box';

export default {
  title: 'Layout/Box',
  tags: ['autodocs'],
  argTypes: {
    padding: { control: 'text', description: 'Inner padding' },
    borderWidth: { control: 'text', description: 'Border width (e.g. 2px) or "none"' },
    borderColor: { control: 'color', description: 'Border color' },
    borderRadius: { control: 'text', description: 'Border radius' },
    backgroundColor: { control: 'color', description: 'Background color' },
    color: { control: 'color', description: 'Text color' },
  },
  args: {
    padding: 'var(--s2)',
    borderWidth: 'none',
    borderColor: '#333',
    borderRadius: '0',
    backgroundColor: '#f5f0eb',
    color: 'inherit',
  },
};

export const Default = {
  render: (args: Record<string, string>) => `
    <box-pk
      padding="${args['padding']}"
      borderWidth="${args['borderWidth']}"
      borderColor="${args['borderColor']}"
      borderRadius="${args['borderRadius']}"
      backgroundColor="${args['backgroundColor']}"
      color="${args['color']}"
    >
      Content inside a box
    </box-pk>
  `,
};

export const Card = {
  args: {
    padding: 'var(--s2)',
    borderWidth: '1px',
    borderColor: '#ddd',
    borderRadius: '8px',
    backgroundColor: '#fff',
  },
  render: (args: Record<string, string>) => `
    <box-pk
      padding="${args['padding']}"
      borderWidth="${args['borderWidth']}"
      borderColor="${args['borderColor']}"
      borderRadius="${args['borderRadius']}"
      backgroundColor="${args['backgroundColor']}"
    >
      <p style="margin:0">A card-style box with border and rounded corners.</p>
    </box-pk>
  `,
};
