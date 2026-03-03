// @vite-ignore
import type { Meta, StoryObj } from "@storybook/vue3";
import UiAlert from "./UiAlert.vue";

const meta: Meta = {
   title: "UI/UiAlert",
   component: UiAlert,
   tags: ["autodocs"],
   args: {
      theme: "brand",
      size: "medium",
      message: "This is an alert message.",
   },
   argTypes: {
      theme: {
         control: "select",
      },
      size: {
         control: "select",
      },
   },
} satisfies Meta<typeof UiAlert>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Brand: Story = {};

export const Neutral: Story = {
   args: { theme: "neutral", icon: "info-circle" },
};

export const Info: Story = {
   args: { theme: "info", icon: "info-circle-filled" },
};

export const Danger: Story = {
   args: { theme: "danger", icon: "warning-triangle-filled" },
};

export const Success: Story = {
   args: { theme: "success", icon: "checkmark-filled" },
};

export const Warning: Story = {
   args: { theme: "warning", icon: "warning-triangle" },
};

export const SlotContent: Story = {
   args: {
      icon: "info-circle", // Add this line to include an icon
   },
   render: (args) => ({
      components: { UiAlert },
      setup() {
         return { args };
      },
      template: `
         <UiAlert v-bind="args">Slot content with a list:
            <ul>
               <li>Slot content list item 1</li>
               <li>Slot content list item 2</li>
               <li>Slot content list item 3</li>
            </ul>
         </UiAlert>
      `,
   }),
};

export const LongDanger: Story = {
   args: {
      theme: "danger",
      icon: "warning-triangle-filled",
      message:
         "Changing matching criteria means that some participants who were previously matched may no longer meet the new criteria. Those participants will automatically change status to ‘Unmatched’.",
   },
};
