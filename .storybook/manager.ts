import { addons } from 'storybook/manager-api';
import theme from './PlanksTheme';

addons.setConfig({
  theme,
  sidebar: {
    showRoots: true,
  },
});
