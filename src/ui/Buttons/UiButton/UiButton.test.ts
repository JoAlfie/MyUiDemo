import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import UiButton from "./UiButton.vue";
import { THEMES as themeTypes } from "../../../types/themes.type.ts";

describe("<UiButton />", () => {
   it("renders the component with defaults", () => {
      const wrapper = mount(UiButton);
      expect(wrapper.exists()).toBe(true);

      // default props
      expect(wrapper.props("theme")).toBe("brand");
      expect(wrapper.props("variant")).toBe("filled");
      expect(wrapper.props("size")).toBe("medium");
      expect(wrapper.props("type")).toBe("button");

      // props are applied
      expect(wrapper.classes("brand")).toBe(true);
      expect(wrapper.classes("filled")).toBe(true);
      expect(wrapper.classes("medium")).toBe(true);
      expect(wrapper.attributes("type")).toBe("button");
   });

   it("applies class based on variant prop", () => {
      const wrapper = mount(UiButton, { props: { variant: "outline" } });
      expect(wrapper.classes("outline")).toBe(true);
      expect(wrapper.classes("filled")).toBe(false);
   });

   it("applies class based on theme prop", () => {
      const wrapper = mount(UiButton, { props: { theme: themeTypes.DANGER } });
      expect(wrapper.classes("danger")).toBe(true);
      expect(wrapper.classes("brand")).toBe(false);
   });

   it("applies class based on size prop", () => {
      const wrapper = mount(UiButton, { props: { size: "large" } });
      expect(wrapper.classes("large")).toBe(true);
      expect(wrapper.classes("medium")).toBe(false);
   });

   it("applies rounded class if prop is present", async () => {
      const wrapper = mount(UiButton);

      expect(wrapper.classes("rounded")).toBe(false);

      await wrapper.setProps({ rounded: true });

      expect(wrapper.classes("rounded")).toBe(true);
   });

   it("applies icon-only class if prop is present", async () => {
      const wrapper = mount(UiButton);

      expect(wrapper.classes("icon-only")).toBe(false);

      await wrapper.setProps({ isIconOnly: true });

      expect(wrapper.classes("icon-only")).toBe(true);
   });

   it("applies disabled attribure if prop is present", async () => {
      const wrapper = mount(UiButton);

      expect(wrapper.attributes().disabled).toBe(undefined);

      await wrapper.setProps({ disabled: true });

      expect(wrapper.attributes().disabled).toBe("");
   });

   it("applies type attribute based on prop", () => {
      const wrapper = mount(UiButton, { props: { type: "submit" } });
      expect(wrapper.attributes().type).toBe("submit");
   });

   it("renders the content of the slot", () => {
      const wrapper = mount(UiButton, {
         slots: {
            default: "Test content",
         },
      });
      expect(wrapper.html()).toContain("Test content");
   });

   it("renders optional icon before slot content", async () => {
      const wrapper = mount(UiButton, {
         slots: {
            default: "Test content",
         },
         global: {
            stubs: {
               UiIcon: true,
            },
         },
      });

      expect(wrapper.findby("icon-before").exists()).toBe(false);
      expect(wrapper.findby("icon-after").exists()).toBe(false);

      await wrapper.setProps({ iconBefore: "sparkle" });

      expect(wrapper.findby("icon-before").exists()).toBe(true);
      expect(wrapper.findby("icon-after").exists()).toBe(false);
      expect(wrapper.findby("icon-before").attributes("name")).toBe("sparkle");
   });

   it("renders optional icon after slot content", async () => {
      const wrapper = mount(UiButton, {
         slots: {
            default: "Test content",
         },
         global: {
            stubs: {
               UiIcon: true,
            },
         },
      });

      expect(wrapper.findby("icon-before").exists()).toBe(false);
      expect(wrapper.findby("icon-after").exists()).toBe(false);

      await wrapper.setProps({ iconAfter: "sparkle" });

      expect(wrapper.findby("icon-before").exists()).toBe(false);
      expect(wrapper.findby("icon-after").exists()).toBe(true);
      expect(wrapper.findby("icon-after").attributes("name")).toBe("sparkle");
   });

   it("renders optional icon before and after slot content", async () => {
      const wrapper = mount(UiButton, {
         slots: {
            default: "Test content",
         },
         global: {
            stubs: {
               UiIcon: true,
            },
         },
      });

      expect(wrapper.findby("icon-before").exists()).toBe(false);
      expect(wrapper.findby("icon-after").exists()).toBe(false);

      await wrapper.setProps({ iconBefore: "link", iconAfter: "sparkle" });

      expect(wrapper.findby("icon-before").exists()).toBe(true);
      expect(wrapper.findby("icon-before").attributes("name")).toBe("link");
      expect(wrapper.findby("icon-after").exists()).toBe(true);
      expect(wrapper.findby("icon-after").attributes("name")).toBe("sparkle");
   });

   it("emits a click event", () => {
      const wrapper = mount(UiButton);
      wrapper.trigger("click");
      expect(wrapper.emitted()).toHaveProperty("click");
   });

   it("doesn't emit a click event when disabled", () => {
      const wrapper = mount(UiButton, { props: { disabled: true } });
      wrapper.trigger("click");
      expect(wrapper.emitted()).not.toHaveProperty("click");
   });
});
