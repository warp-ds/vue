/** @type { import('@storybook/vue3-vite').StorybookConfig } */
const config = {
  stories: [
    "../components/**/*.stories.[tj]s",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/vue3-vite",
    options: {},
  },
  docs: {
    autodocs: "false",
  },
};
export default config;
