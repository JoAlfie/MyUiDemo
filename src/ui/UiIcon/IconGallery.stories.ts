// @vite-ignore
import type { Meta, StoryObj } from "@storybook/vue3";
import UiIcon from "./UiIcon.vue";
import { iconList, type Icon } from "./UiIcon.vue";

/**
 * Preview of all available icons.
 */
const meta: Meta = {
   title: "UI/UiIcon/Gallery",
   component: UiIcon,
} satisfies Meta<typeof UiIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const IconGallery: Story = {
   render: () => ({
      components: { UiIcon },
      setup() {
         // List of all icons
         const icons: readonly Icon[] = iconList;
         return { icons };
      },
      template: `
         <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr)); gap: 1rem; margin: 1.5rem;">
            <div v-for="icon in icons" :key="icon" style="display: flex; flex-direction: column; align-items: center;">
               <UiIcon :name="icon" size="medium" />
               <p>{{ icon }}</p>
            </div>
         </div>
      `,
   }),
   parameters: {
      layout: "fullscreen", // Optional for full-screen layout
   },
};
