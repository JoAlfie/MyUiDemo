import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import UiPill from "./UiPill.vue";

describe("<UiPill />", () => {
   it("Renders the component with text", () => {
      const wrapper = mount(UiPill, {
         props: {
            text: "red or blue",
         },
      });
      expect(wrapper.exists()).toBe(true);
      expect(wrapper.text()).toBe("red or blue");
   });

   it("Renders class based on size prop", async () => {
      const wrapper = mount(UiPill, {
         props: {
            text: "pill",
         },
      });

      // medium is default
      expect(wrapper.classes("medium")).toBe(true);
      expect(wrapper.classes("small")).toBe(false);

      // set small
      await wrapper.setProps({ size: "small" });
      expect(wrapper.classes("medium")).toBe(false);
      expect(wrapper.classes("small")).toBe(true);

      // set medium
      await wrapper.setProps({ size: "medium" });
      expect(wrapper.classes("medium")).toBe(true);
      expect(wrapper.classes("small")).toBe(false);
   });

   it("Renders class based on theme prop", async () => {
      const wrapper = mount(UiPill, {
         props: {
            text: "pill",
         },
      });

      // is neutral by default
      expect(wrapper.classes("neutral")).toBe(true);

      // change colour
      await wrapper.setProps({ theme: "blue" });

      expect(wrapper.classes("neutral")).toBe(false);
      expect(wrapper.classes("blue")).toBe(true);
   });

   it("Renders slot content", () => {
      const wrapper = mount(UiPill, {
         props: {
            text: "will not be rendered",
         },
         slots: {
            default: "slot content",
         },
      });

      expect(wrapper.text()).not.toContain("will not be rendered");
      expect(wrapper.text()).toContain("slot content");
   });

   it("Displays dot when dot theme is present", async () => {
      const wrapper = mount(UiPill, {
         props: {
            text: "with dot",
            dotTheme: "blue",
         },
      });

      const dotSpan = wrapper.findby("pill-dot");

      expect(dotSpan.exists()).toBe(true);
      expect(dotSpan.text()).toBe("with dot");
      expect(dotSpan.classes("dot-blue")).toBe(true);

      // change colour
      await wrapper.setProps({ dotTheme: "purple" });

      expect(dotSpan.classes("dot-blue")).toBe(false);
      expect(dotSpan.classes("dot-purple")).toBe(true);
   });

   it("Doesn't display dot when dot theme is not present", () => {
      const wrapper = mount(UiPill, {
         props: {
            text: "without dot",
            theme: "blue",
         },
      });

      const dotSpan = wrapper.findby("pill-dot");

      expect(dotSpan.exists()).toBe(false);
      expect(wrapper.text()).toBe("without dot");
   });
});
