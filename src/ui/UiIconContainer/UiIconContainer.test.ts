import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import UiIconContainer from "./UiIconContainer.vue";

describe("<UiIconContainer />", () => {
   it("renders with default props", () => {
      const wrapper = mount(UiIconContainer, {
         props: {
            icon: "check",
         },
      });

      expect(wrapper.classes()).toContain("icon-container");
      expect(wrapper.classes()).toContain("neutral");
      expect(wrapper.classes()).toContain("medium");
      expect(wrapper.classes()).toContain("circle");
   });

   it("renders with custom theme", () => {
      const wrapper = mount(UiIconContainer, {
         props: {
            icon: "check",
            theme: "green",
         },
      });

      expect(wrapper.classes()).toContain("green");
   });

   it("renders with custom size", () => {
      const wrapper = mount(UiIconContainer, {
         props: {
            icon: "check",
            size: "small",
         },
      });

      expect(wrapper.classes()).toContain("small");
   });

   it("renders with custom shape", () => {
      const wrapper = mount(UiIconContainer, {
         props: {
            icon: "check",
            shape: "square",
         },
      });

      expect(wrapper.classes()).toContain("square");
   });

   it("renders with custom border", () => {
      const wrapper = mount(UiIconContainer, {
         props: {
            icon: "check",
            border: "dashed",
         },
      });

      expect(wrapper.classes()).toContain("dashed");
   });

   it("passes icon prop to UiIcon component", () => {
      const wrapper = mount(UiIconContainer, {
         props: {
            icon: "check",
         },
      });

      const iconComponent = wrapper.findComponent({ name: "UiIcon" });
      expect(iconComponent.props("name")).toBe("check");
   });

   it("passes size prop to UiIcon component", () => {
      const wrapper = mount(UiIconContainer, {
         props: {
            icon: "check",
            size: "small",
         },
      });

      const iconComponent = wrapper.findComponent({ name: "UiIcon" });
      expect(iconComponent.props("size")).toBe("small");
   });
});
