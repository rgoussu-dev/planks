import '../src/components/frame/frame';

export default {
  title: 'Layout/Frame',
  tags: ['autodocs'],
  argTypes: {
    ratio: { control: 'select', options: ['16:9', '4:3', '1:1', '3:2', '21:9'], description: 'Aspect ratio (width:height)' },
  },
  args: { ratio: '16:9' },
};

export const WithImage = {
  render: (args: Record<string, string>) => `
    <frame-pk ratio="${args['ratio']}" style="max-width:600px">
      <img src="https://picsum.photos/800/450" alt="Demo image" />
    </frame-pk>
  `,
};

export const Square = {
  args: { ratio: '1:1' },
  render: (args: Record<string, string>) => `
    <frame-pk ratio="${args['ratio']}" style="max-width:300px">
      <img src="https://picsum.photos/400/400" alt="Square demo" />
    </frame-pk>
  `,
};
