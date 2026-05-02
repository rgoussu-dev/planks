import { create } from 'storybook/theming/create';

// "Architectural draftsman's plate" — paper, ink, draftsman vermillion.
export default create({
  base: 'light',

  brandTitle: 'Planks — Layout Primitives',
  brandUrl: 'https://github.com/rgoussu-dev/planks',
  brandTarget: '_blank',

  colorPrimary: '#c8362d',
  colorSecondary: '#1a1816',

  appBg: '#ede4d3',
  appContentBg: '#fbf8f3',
  appPreviewBg: '#f5efe6',
  appBorderColor: 'rgba(26, 24, 22, 0.14)',
  appBorderRadius: 0,

  fontBase: '"Lora", Georgia, "Times New Roman", serif',
  fontCode: '"JetBrains Mono", ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace',

  textColor: '#1a1816',
  textInverseColor: '#fbf8f3',
  textMutedColor: '#6b655c',

  barTextColor: '#6b655c',
  barSelectedColor: '#c8362d',
  barHoverColor: '#1a1816',
  barBg: '#fbf8f3',

  buttonBg: '#fbf8f3',
  buttonBorder: 'rgba(26, 24, 22, 0.18)',
  booleanBg: '#ede4d3',
  booleanSelectedBg: '#c8362d',

  inputBg: '#fbf8f3',
  inputBorder: 'rgba(26, 24, 22, 0.32)',
  inputTextColor: '#1a1816',
  inputBorderRadius: 0,
});
