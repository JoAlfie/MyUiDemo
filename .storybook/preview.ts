import { type Preview, setup } from "@storybook/vue3";
import { createPinia } from "pinia";
import { type App } from "vue";

import "../src/assets/styles/lib-base/lib-base.scss";
import "../src/assets/styles/main.scss";

const pinia = createPinia();

setup((app: App) => {
   app.use(pinia);
});

const preview: Preview = {
   parameters: {
      controls: {
         matchers: {
            color: /(background|color)$/i,
            date: /Date$/i,
         },
      },
      designToken: {
         disable: true,
      },
      options: {
         storySort: {
            order: [
               "MyUi",
               "Design System",
               ["Style Guide", "Design Token Styling", "*", "Other"],
               "UI",
               "Widgets",
               "Components",
            ],
         },
      },
   },
};

export default preview;
