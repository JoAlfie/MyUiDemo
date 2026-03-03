import type { StorybookConfig } from "@storybook/vue3-vite";
import remarkGfm from "remark-gfm";

const config: StorybookConfig = {
   stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
   addons: [
      "@storybook/addon-links",
      "@storybook/addon-essentials",
      "@chromatic-com/storybook",
      "@storybook/addon-interactions",
      "@storybook/addon-a11y",
      "storybook-theme-switch-addon",
      { name: "storybook-design-token", options: { preserveCSSVars: true } },
      {
         name: "@storybook/addon-docs",
         options: {
            mdxPluginOptions: {
               mdxCompileOptions: {
                  remarkPlugins: [remarkGfm],
               },
            },
         },
      },
   ],
   framework: {
      name: "@storybook/vue3-vite",
      options: {
         docgen: {
            plugin: "vue-component-meta",
            tsconfig: "tsconfig.app.json",
         },
      },
   },
};
export default config;
