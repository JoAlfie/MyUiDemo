import { mount } from "@vue/test-utils";
import { describe, it, vi, expect } from "vitest";
import { nextTick } from "vue";

import UiDropdownWrapper, { dropdownStyle } from "./UiDropdownWrapper.vue";

// Mock the Floating UI functions
vi.mock("@floating-ui/dom", () => ({
   computePosition: vi.fn().mockResolvedValue({
      x: 0,
      y: 0,
      placement: "bottom",
      middlewareData: {
         arrow: { x: 0, y: 0 },
         hide: { referenceHidden: false },
      },
   }),
   autoUpdate: vi.fn().mockReturnValue(() => {}),
   flip: vi.fn().mockReturnValue({}),
   shift: vi.fn().mockReturnValue({}),
   offset: vi.fn().mockReturnValue({}),
   hide: vi.fn().mockReturnValue({}),
   size: vi.fn().mockReturnValue({}),
}));

describe("<UiDropdownWrapper />", () => {
   const defaultProps = {
      id: "dropdown-wrapper",
      triggerId: "dropdown-trigger",
   };

   function mountComponent(props = {}, beforeContent = "", triggerContent = "", panelContent = "") {
      return mount(UiDropdownWrapper, {
         props: { ...defaultProps, ...props },
         attachTo: document.body,
         slots: {
            before: beforeContent,
            trigger: triggerContent,
            panel: panelContent,
         },
      });
   }

   it("renders initial elements", () => {
      const wrapper = mountComponent();
      expect(wrapper.findby("trigger-btn").exists()).toBe(true);
      expect(wrapper.findby("group").exists()).toBe(false);
   });

   it("renders before slot content", () => {
      const wrapper = mountComponent({}, "before content");
      expect(wrapper.text()).toBe("before content");
   });

   it("renders trigger slot content", () => {
      const wrapper = mountComponent({}, "", "button text");
      expect(wrapper.findby("trigger-btn").text()).toBe("button text");
   });

   it("renders optional display icon when provided", async () => {
      const wrapper = mountComponent();
      expect(wrapper.findby("display-icon").exists()).toBe(false);

      await wrapper.setProps({ icon: "filter-funnel" });

      expect(wrapper.findby("display-icon").exists()).toBe(true);
   });

   it("hides caret depending on prop value", async () => {
      const wrapper = mountComponent();
      expect(wrapper.findby("dropdown-trigger-caret").exists()).toBe(true);

      await wrapper.setProps({ showCaret: false });

      expect(wrapper.findby("dropdown-trigger-caret").exists()).toBe(false);
   });

   it("applies aria attribues to trigger", () => {
      const wrapper = mountComponent({ describedById: "description-id" });

      const triggerBtn = wrapper.findby("trigger-btn");
      expect(triggerBtn.attributes("aria-describedby")).toBe("description-id");
      expect(triggerBtn.attributes("aria-controls")).toBe("dropdown-wrapper-group");
   });

   it("shows the dropdown when the trigger is clicked and renders panel slot content", async () => {
      const wrapper = mountComponent({}, "", "button text", "panel content");
      const triggerBtn = wrapper.findby("trigger-btn");
      expect(triggerBtn.attributes("aria-expanded")).toBe("false");

      await triggerBtn.trigger("click");
      expect(triggerBtn.attributes("aria-expanded")).toBe("true");
      expect(wrapper.findby("group").exists()).toBe(true);
      expect(wrapper.findby("group").text()).toBe("panel content");
   });

   it("toggles the dropdown when the trigger is clicked again", async () => {
      const wrapper = mountComponent();
      const triggerBtn = wrapper.findby("trigger-btn");

      await triggerBtn.trigger("click"); // Open
      expect(wrapper.findby("group").exists()).toBe(true);

      await triggerBtn.trigger("click"); // Close
      expect(wrapper.findby("group").exists()).toBe(false);
      expect(wrapper.emitted("dropdown-blur")).toBeTruthy();
   });

   it("closes dropdown when clicking outside", async () => {
      const wrapper = mount({
         components: { UiDropdownWrapper },
         attachTo: document.body,
         template: `<div>
               <div>there is content outside the dropdown</div>
               <UiDropdownWrapper id="test-dropdown" triggerId="test-trigger" />
               </div>`,
      });

      const button = wrapper.findby("trigger-btn");

      expect(wrapper.findby("group").exists()).toBe(false);

      // Open dropdown
      await button.trigger("click");
      expect(wrapper.findby("group").exists()).toBe(true);

      // Simulate click outside
      await window.dispatchEvent(new Event("click"));
      await nextTick();

      // Dropdown is closed
      expect(wrapper.findby("group").exists()).toBe(false);
      // blur has been called
      expect(wrapper.findComponent(UiDropdownWrapper).emitted("dropdown-blur")).toBeTruthy();
   });

   it("keeps dropdown open when clicking inside", async () => {
      const wrapper = mountComponent();

      const button = wrapper.findby("trigger-btn");

      // Open dropdown
      await button.trigger("click");
      await nextTick();
      expect(wrapper.findby("group").exists()).toBe(true);

      // Click inside dropdown
      await wrapper.findby("group").trigger("click");

      // Ensure dropdown is still open
      expect(wrapper.findby("group").exists()).toBe(true);
      // blur has not been called
      expect(wrapper.emitted("dropdown-blur")).toBeFalsy();
   });

   it("closes the dropdown when escape is pressed", async () => {
      const wrapper = mountComponent();

      const button = wrapper.findby("trigger-btn");

      // Open dropdown
      await button.trigger("click");
      await nextTick();
      expect(wrapper.findby("group").exists()).toBe(true);

      // trigger esc
      await wrapper.findby("group").trigger("keydown", { key: "Escape" });

      // Dropdown closed
      expect(wrapper.findby("group").exists()).toBe(false);
      // focus is returned to button
      expect(document.activeElement).toBe(button.element);
   });

   it("renders the button style by default", () => {
      const wrapper = mountComponent();
      expect(wrapper.classes("form-control")).toBeFalsy();
      expect(wrapper.classes("button")).toBeTruthy();
      expect(wrapper.classes("custom")).toBeFalsy();
   });

   it("renders the form control style", () => {
      const wrapper = mountComponent({ styleType: dropdownStyle.FORM_CONTROL });
      expect(wrapper.classes("form-control")).toBeTruthy();
      expect(wrapper.classes("button")).toBeFalsy();
      expect(wrapper.classes("custom")).toBeFalsy();
   });

   it("renders the 'use inner' style for custom component in the trigger slot", () => {
      const wrapper = mountComponent({ styleType: dropdownStyle.NONE });
      expect(wrapper.classes("form-control")).toBeFalsy();
      expect(wrapper.classes("button")).toBeFalsy();
      expect(wrapper.classes("custom")).toBeTruthy();
   });

   it("Applies positioning logic", async () => {
      const wrapper = mountComponent();

      const button = wrapper.findby("trigger-btn");

      // Open dropdown
      await button.trigger("click");
      await nextTick();

      const dropdownGroup = wrapper.findby("group");
      expect(dropdownGroup.isVisible()).toBe(true);

      // Check if the dropdown has data-placement applied by positioning logic
      expect(dropdownGroup.element.getAttribute("data-placement")).toBe("bottom");
   });
});
