import type { Meta, StoryObj } from "@storybook/vue3";
import NotificationToaster from "./UiNotificationToaster.vue";
import { useToastStore } from "../../stores/toasts/toastStore.ts";

function sleep(ms: number) {
   return new Promise((resolve) => setTimeout(resolve, ms));
}

const meta: Meta = {
   title: "UI/Toasts/NotificationToaster",
   component: NotificationToaster,
   tags: ["!autodocs"],
   decorators: [
      () => ({
         template: `
         <div>
            <p>Toaster is a wrapper for toasts in the toast store which lives in the root of the App. <a href="/?path=/docs/ui-toasts-toasts--docs">See the docs for usage instructions</a></p>
            <story/>
         </div>`,
      }),
   ],
} satisfies Meta<typeof NotificationToaster>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Toaster: Story = {
   play: async () => {
      const toast = useToastStore();

      toast.info("Info toast");
      await sleep(2000);

      toast.success("Success toast");
      await sleep(2000);

      toast.error("Error toast");
      await sleep(2000);

      toast.warning("Warning toast");
      await sleep(2000);
   },
};
