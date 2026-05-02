import type { Preview } from '@storybook/html-vite';
import theme from './PlanksTheme';
import '../src/styles/styles.css';

const preview: Preview = {
  parameters: {
    options: {
      storySort: {
        order: [
          'Foundations',
          ['Introduction', 'Design tokens'],
          'Layout',
          [
            'Box',
            'Stack',
            'Cluster',
            'Center',
            'Container',
            'Grid',
            'Switcher',
            'Sidebar',
            'Cover',
            'Frame',
            'Reel',
            'Imposter',
            'Icon',
            'Typography',
          ],
        ],
      },
    },
    docs: {
      theme,
      toc: { headingSelector: 'h2, h3' },
    },
    backgrounds: {
      options: {
        paper: { name: 'paper', value: '#f5efe6' },
        ink: { name: 'ink', value: '#1a1816' },
        plain: { name: 'plain white', value: '#ffffff' },
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
      },
    },
    a11y: { test: 'todo' },
  },
  initialGlobals: {
    backgrounds: { value: 'paper' },
  },
};

export default preview;
