import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import { COLOUR_THEMES } from "../../types/themes.type.ts";
import UiCollapsibleSection from "./UiCollapsibleSection.vue";

describe("<UiCollapsibleSection />", () => {
   it("Renders the component with a title and default props", () => {
      const wrapper = mount(UiCollapsibleSection, {
         props: {
            title: "Title",
         },
      });

      expect(wrapper.exists()).toBe(true);
      expect(wrapper.classes("bordered")).toBe(false);

      expect(wrapper.findby("button").exists()).toBe(true);

      // title exists and is the correct element type
      expect(wrapper.findby("title").exists()).toBe(true);
      expect(wrapper.findby("title").text()).toBe("Title");
      expect(wrapper.find("h3[data-test=title]").exists()).toBe(true);
   });

   it("Displays correct heading element based on prop", async () => {
      const wrapper = mount(UiCollapsibleSection, {
         props: {
            title: "Title",
            headingLevel: "h2",
         },
      });

      expect(wrapper.find("h2[data-test=title]").exists()).toBe(true);
      expect(wrapper.find("h3[data-test=title]").exists()).toBe(false);
      expect(wrapper.find("h4[data-test=title]").exists()).toBe(false);

      await wrapper.setProps({ headingLevel: "h3" });
      expect(wrapper.find("h2[data-test=title]").exists()).toBe(false);
      expect(wrapper.find("h3[data-test=title]").exists()).toBe(true);
      expect(wrapper.find("h4[data-test=title]").exists()).toBe(false);

      await wrapper.setProps({ headingLevel: "h4" });
      expect(wrapper.find("h2[data-test=title]").exists()).toBe(false);
      expect(wrapper.find("h3[data-test=title]").exists()).toBe(false);
      expect(wrapper.find("h4[data-test=title]").exists()).toBe(true);
   });

   it("Displays content in slots", () => {
      const wrapper = mount(UiCollapsibleSection, {
         props: { title: "Title" },
         slots: { icon: "<span>icon</span>", "after-title": "<span>pill</span>", default: "<p>Test content</p>" },
      });

      // icon & post-title slot is rendered in button
      expect(wrapper.findby("button").html()).toContain("<span>icon</span>");
      expect(wrapper.findby("button").html()).toContain("<span>pill</span>");

      // content is rendered in content
      expect(wrapper.findby("content").html()).toContain("<p>Test content</p>");
   });

   it("Hides content on button click and updates aria-expanded", async () => {
      const wrapper = mount(UiCollapsibleSection, {
         props: { title: "Title" },
         slots: { content: "<p>Test content</p>" },
         attachTo: document.body, // isVisible() only works if the wrapper is attached to the DOM
      });

      const content = wrapper.findby("content");

      // Content should be visible on default
      expect(content.isVisible()).toBe(true);

      // // Initial state check
      const button = wrapper.findby("button");
      expect(button.attributes("aria-expanded")).toBe("true");
      expect(button.attributes("id")).toBe(`collapsible-section-title-heading`);
      expect(button.attributes("aria-controls")).toBe(`collapsible-section-title-content`);

      // // Simulate click to toggle
      await button.trigger("click");

      // // Content should not be visible after clicking
      expect(wrapper.findby("content").isVisible()).toBe(false);

      // // Check updated aria-expanded after clicking
      expect(button.attributes("aria-expanded")).toBe("false");

      // // Click again to check it toggles back
      await button.trigger("click");
      expect(content.isVisible()).toBe(true);
      expect(button.attributes("aria-expanded")).toBe("true");
   });

   it("Can be closed by default based on prop", () => {
      const wrapper = mount(UiCollapsibleSection, {
         props: { title: "Title", openByDefault: false },
         slots: { default: "<p>Test content</p>" },
         attachTo: document.body, // isVisible() only works if the wrapper is attached to the DOM
      });

      const content = wrapper.findby("content");

      // Content should not be visible
      expect(content.isVisible()).toBe(false);

      // // Initial state check
      const button = wrapper.findby("button");
      expect(button.attributes("aria-expanded")).toBe("false");
   });

   it("Can have a border based on prop", async () => {
      const wrapper = mount(UiCollapsibleSection, {
         props: { title: "Title", bordered: true },
      });

      expect(wrapper.classes("bordered")).toBe(true);

      await wrapper.setProps({ bordered: false });

      expect(wrapper.classes("bordered")).toBe(false);
   });

   describe("Theming and Dark Mode", () => {
      it("Applies backgroundColor data attribute when provided", () => {
         const colorThemes = Object.values(COLOUR_THEMES);

         colorThemes.forEach((theme) => {
            const wrapper = mount(UiCollapsibleSection, {
               props: {
                  title: `${theme} Section`,
                  theme: theme,
               },
            });

            expect(wrapper.attributes("data-theme")).toBe(theme);
         });
      });

      it("Applies dark class when darkMode is true", () => {
         const wrapper = mount(UiCollapsibleSection, {
            props: {
               title: "Dark Section",
               darkMode: true,
            },
         });

         expect(wrapper.classes("dark")).toBe(true);
      });

      it("Does not apply dark class when darkMode is false", () => {
         const wrapper = mount(UiCollapsibleSection, {
            props: {
               title: "Light Section",
               darkMode: false,
            },
         });

         expect(wrapper.classes("dark")).toBe(false);
      });

      it("Combines backgroundColor and darkMode correctly", () => {
         const wrapper = mount(UiCollapsibleSection, {
            props: {
               title: "Themed Dark Section",
               theme: COLOUR_THEMES.PURPLE,
               darkMode: true,
            },
         });

         expect(wrapper.attributes("data-theme")).toBe(COLOUR_THEMES.PURPLE);
         expect(wrapper.classes("dark")).toBe(true);
      });

      it("Handles undefined backgroundColor gracefully", () => {
         const wrapper = mount(UiCollapsibleSection, {
            props: {
               title: "Default Section",
               theme: undefined,
            },
         });

         expect(wrapper.attributes("data-theme")).toBeUndefined();
         expect(wrapper.classes("dark")).toBe(false);
      });
   });

   describe("Smooth Transition", () => {
      it("Applies smooth transition styles when smoothTransition is true", async () => {
         const wrapper = mount(UiCollapsibleSection, {
            props: {
               title: "Smooth Section",
               smoothTransition: true,
               openByDefault: false,
            },
            slots: { default: "<p>Test content</p>" },
            attachTo: document.body,
         });

         const content = wrapper.findby("content");
         const button = wrapper.findby("button");

         // When smoothTransition is true, content is visible even when closed
         // This is because v-show="isOpen || smoothTransition"
         expect(content.isVisible()).toBe(true);
         expect(button.attributes("aria-expanded")).toBe("false");

         // Click to open
         await button.trigger("click");

         // Content should still be visible and have transition styles
         expect(content.isVisible()).toBe(true);
         expect(button.attributes("aria-expanded")).toBe("true");
         expect(content.attributes("style")).toContain("height:");
      });

      it("Does not apply smooth transition styles when smoothTransition is false", async () => {
         const wrapper = mount(UiCollapsibleSection, {
            props: {
               title: "Non-smooth Section",
               smoothTransition: false,
               openByDefault: false,
            },
            slots: { default: "<p>Test content</p>" },
            attachTo: document.body,
         });

         const content = wrapper.findby("content");

         // Initially closed
         expect(content.isVisible()).toBe(false);
         expect(content.attributes("style")).toContain("height: auto");

         // Click to open
         await wrapper.findby("button").trigger("click");

         // Content should be visible with auto height
         expect(content.isVisible()).toBe(true);
         expect(content.attributes("style")).toContain("height: auto");
      });

      it("Respects smoothTransition prop changes", async () => {
         const wrapper = mount(UiCollapsibleSection, {
            props: {
               title: "Dynamic Section",
               smoothTransition: false,
               openByDefault: true,
            },
            slots: { default: "<p>Test content</p>" },
            attachTo: document.body,
         });

         const content = wrapper.findby("content");

         // Initially with smoothTransition: false
         expect(content.attributes("style")).toContain("height: auto");

         // Change to smoothTransition: true
         await wrapper.setProps({ smoothTransition: true });

         // Should now have transition styles
         expect(content.attributes("style")).toContain("height:");
      });

      it("Maintains smooth transition behavior during toggle", async () => {
         const wrapper = mount(UiCollapsibleSection, {
            props: {
               title: "Toggle Test Section",
               smoothTransition: true,
               openByDefault: false,
            },
            slots: { default: "<p>Test content</p>" },
            attachTo: document.body,
         });

         const content = wrapper.findby("content");
         const button = wrapper.findby("button");

         // Initially closed but visible due to smoothTransition
         expect(content.isVisible()).toBe(true);
         expect(button.attributes("aria-expanded")).toBe("false");

         // Open
         await button.trigger("click");
         expect(content.isVisible()).toBe(true);
         expect(button.attributes("aria-expanded")).toBe("true");

         // Close
         await button.trigger("click");
         expect(content.isVisible()).toBe(true); // Still visible due to smoothTransition
         expect(button.attributes("aria-expanded")).toBe("false");

         // Open again
         await button.trigger("click");
         expect(content.isVisible()).toBe(true);
         expect(button.attributes("aria-expanded")).toBe("true");
      });
   });

   describe("Combined Props", () => {
      it("Works with all props combined", () => {
         const wrapper = mount(UiCollapsibleSection, {
            props: {
               title: "Complete Section",
               headingLevel: "h2",
               bordered: true,
               openByDefault: false,
               smoothTransition: true,
               theme: COLOUR_THEMES.GREEN,
               darkMode: true,
            },
            slots: { default: "<p>Complete test content</p>" },
            attachTo: document.body,
         });

         // Check all props are applied
         expect(wrapper.find("h2[data-test=title]").exists()).toBe(true);
         expect(wrapper.classes("bordered")).toBe(true);
         expect(wrapper.classes("dark")).toBe(true);
         expect(wrapper.attributes("data-theme")).toBe(COLOUR_THEMES.GREEN);
         // Content is visible due to smoothTransition being true
         expect(wrapper.findby("content").isVisible()).toBe(true);
         expect(wrapper.findby("button").attributes("aria-expanded")).toBe("false");
      });
   });
});
