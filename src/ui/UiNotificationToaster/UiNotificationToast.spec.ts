import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import NotificationToast from "./UiNotificationToast.vue";
import UiIcon from "../UiIcon/UiIcon.vue";
import { type Toast } from "../../stores/toasts/toastStore.ts";

const requiredProps = {
   theme: "info",
   text: "Toast content",
   id: "toastId",
} as Toast;

describe("<NotificationToast />", () => {
   it("renders the component", () => {
      const wrapper = mount(NotificationToast, { props: requiredProps });
      expect(wrapper.exists()).toBe(true);
   });

   it("displays the text content", () => {
      const wrapper = mount(NotificationToast, { props: requiredProps });
      expect(wrapper.text()).toBe(requiredProps.text);
   });

   it("sets the class based on the theme", () => {
      const wrapper = mount(NotificationToast, { props: requiredProps });
      expect(wrapper.classes(requiredProps.theme)).toBe(true);
   });

   it("displays an icon based on theme", () => {
      const wrapper = mount(NotificationToast, { props: requiredProps, components: { UiIcon } });
      const icon = wrapper.findComponent(UiIcon);
      expect(icon).toBeTruthy();
      expect(icon.props("name")).toBe("info-circle-filled");
   });
});
