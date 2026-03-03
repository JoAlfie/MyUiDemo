import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import UiAlert from "./UiAlert.vue";

describe("<UiAlert />", () => {
   it("Renders the alert component", () => {
      const wrapper = mount(UiAlert, {
         props: { message: "This is an alert" },
      });
      const alert = wrapper.find('[data-test="sn-alert"]');
      expect(alert.exists()).toBe(true);
   });

   it("Renders specified size", () => {
      const wrapper = mount(UiAlert, {
         props: { message: "Example alert message", size: "large" },
      });
      const alert = wrapper.find('[data-test="sn-alert"]');
      expect(alert.classes()).toContain("large");
   });

   it("Renders with specified icon", () => {
      const wrapper = mount(UiAlert, {
         props: { message: "Example alert message", size: "large", icon: "cube" },
      });
      const icon = wrapper.find('[data-test="icon-cube"]');
      expect(icon.exists()).toBe(true);
   });

   it("Renders specified theme", () => {
      const wrapper = mount(UiAlert, {
         props: { message: "Example alert message", theme: "info" },
      });
      const alert = wrapper.find('[data-test="sn-alert"]');
      expect(alert.classes()).toContain("info");
   });

   it("Renders slot content instead of message if provided", () => {
      const wrapper = mount(UiAlert, {
         props: { message: "This will be replaced" },
         slots: {
            default: "<div data-test='slot-content'>Slot content</div>",
         },
      });
      const slotContent = wrapper.findby("slot-content");
      expect(slotContent.exists()).toBe(true);

      expect(wrapper.text()).not.toContain("This will be replaced");
   });
});
