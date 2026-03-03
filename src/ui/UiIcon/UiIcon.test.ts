import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import UiIcon from "./UiIcon.vue";

describe("<UiIcon />", () => {
   it("Renders the component with only required name prop", () => {
      const wrapper = mount(UiIcon, {
         props: {
            name: "arrow-left",
         },
      });
      expect(wrapper.exists()).toBe(true);

      const icon = wrapper.findby("icon-arrow-left");
      expect(icon.attributes("aria-label")).toBe(undefined);
      expect(icon.attributes("role")).toBe("presentation");
   });

   it("Uses the name prop to display the svg", () => {
      const wrapper = mount(UiIcon, {
         props: {
            name: "arrow-left",
         },
      });

      const label = wrapper.findby("icon-arrow-left");
      const useElement = label.find("use");
      expect(useElement.attributes("href")).toContain(`#arrow-left`);
   });

   it("Applies aria-label", () => {
      const wrapper = mount(UiIcon, {
         props: {
            name: "arrow-left",
            ariaLabel: "Go back",
         },
      });

      const icon = wrapper.findby("icon-arrow-left");
      expect(icon.attributes("aria-label")).toBe("Go back");
      expect(icon.attributes("role")).toBe("img");
   });

   it("Applies size classes", async () => {
      const wrapper = mount(UiIcon, {
         props: {
            name: "arrow-left",
         },
      });

      const icon = wrapper.findby("icon-arrow-left");
      expect(icon.classes()).toStrictEqual(["icon", "small"]);

      await wrapper.setProps({ size: "large" });
      expect(icon.classes()).toStrictEqual(["icon", "large"]);
   });

   it("Applies additional classes", () => {
      const wrapper = mount(UiIcon, {
         props: {
            name: "arrow-left",
            className: "additional-class",
         },
      });

      const icon = wrapper.findby("icon-arrow-left");
      expect(icon.classes()).toContain("additional-class");
   });
});
