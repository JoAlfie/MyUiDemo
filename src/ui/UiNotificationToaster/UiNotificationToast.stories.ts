import type { Meta, StoryObj } from "@storybook/vue3";
import NotificationToast from "./UiNotificationToast.vue";

const meta: Meta = {
   title: "UI/Toasts/NotificationToast",
   component: NotificationToast,
   tags: ["autodocs"],
   argTypes: {
      theme: { control: "select" },
   },
   args: {
      theme: "info",
      text: "Notification toast",
      id: "generatedId",
   },
} satisfies Meta<typeof NotificationToast>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Info: Story = {};

export const Success: Story = {
   args: {
      theme: "success",
   },
};

export const Error: Story = {
   args: {
      theme: "danger",
   },
};

export const Warning: Story = {
   args: {
      theme: "warning",
   },
};
