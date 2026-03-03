import { describe, it, expect, beforeAll, beforeEach, afterAll, vi, type Mock } from "vitest";

import { mount } from "@vue/test-utils";
import { setActivePinia, createPinia } from "pinia";
import NotificationToaster from "./UiNotificationToaster.vue";
import NotificationToast from "./UiNotificationToast.vue";
import { TransitionGroup } from "vue";
import { useToastStore } from "../../stores/toasts/toastStore.ts";

const options = {
   components: [NotificationToast, TransitionGroup],
};

describe("<NotificationToaster />", () => {
   // we mock the showPopover function here because vitest doesn't think it's a function
   // should periodically check this after updates, as it's a new web api it may be added
   let originalShowPopover: Mock | (() => void) = vi.fn();
   let showPopoverMock: Mock | (() => void) = vi.fn();

   beforeAll(() => {
      // Save the original showPopover method
      originalShowPopover = global.HTMLElement.prototype.showPopover;
      // Mock the showPopover function
      showPopoverMock = vi.fn();
      global.HTMLElement.prototype.showPopover = showPopoverMock;
   });

   beforeEach(() => {
      // creates a fresh pinia and makes it active
      // so it's automatically picked up by any useStore() call
      // without having to pass it to it: `useStore(pinia)`
      setActivePinia(createPinia());
   });

   afterAll(() => {
      // Restore the original showPopover method
      global.HTMLElement.prototype.showPopover = originalShowPopover;
   });

   it("renders the component", () => {
      // shallow to stub out the toast ui
      const wrapper = mount(NotificationToaster, {
         shallow: true,
      });
      expect(wrapper.exists()).toBe(true);
   });

   it("is empty when there are no toasts", () => {
      const wrapper = mount(NotificationToaster, options);

      // no toasts
      expect(wrapper.find("[data-test=toast]").exists()).toBe(false);
   });

   it("contains toasts after a toast is created", async () => {
      const wrapper = mount(NotificationToaster, options);

      // call a toast
      const toast = useToastStore();
      toast.info("toast content");

      await wrapper.vm.$nextTick(); // wait for Vue to update with new toast
      expect(wrapper.find("[data-test=toast]")).toBeTruthy();
      expect(wrapper.find("[data-test=toast]").text()).toBe("toast content");
   });

   it("can display multiple toasts", async () => {
      const wrapper = mount(NotificationToaster, options);

      // call a toast
      const toast = useToastStore();
      toast.info("toast content");
      toast.info("toast content 2");
      toast.info("toast content 3");

      await wrapper.vm.$nextTick(); // wait for Vue to update with new toasts
      expect(wrapper.findAllBy("toast")).toHaveLength(3);
   });
});
