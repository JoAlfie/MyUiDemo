// @vite-ignore
import type { Meta, StoryObj } from "@storybook/vue3";
import UiIcon from "./UiIcon.vue";

/**
 *  Icon presentation component. To add a new icon, add it to `icons.svg` and add its id to the type list
 * */
const meta: Meta = {
   title: "UI/UiIcon",
   component: UiIcon,
   tags: ["autodocs"],
   argTypes: {
      size: {
         control: "select",
      },
      name: {
         control: "select",
      },
   },
   args: { name: "checkmark-filled", size: "large" },
} satisfies Meta<typeof UiIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Icon: Story = {};
