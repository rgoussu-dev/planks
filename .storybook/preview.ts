import type { Preview } from '@storybook/html-vite';
import '../src/styles/tokens.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
      },
    },
    a11y: { test: 'todo' },
  },
};

export default preview;
