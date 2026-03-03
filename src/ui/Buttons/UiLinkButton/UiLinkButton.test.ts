import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { h, defineComponent } from "vue";
import { RouterLink, createRouter, createMemoryHistory, type RouteRecordRaw } from "vue-router";

import UiLinkButton, { type Props } from "./UiLinkButton.vue";
import { THEMES as themeTypes } from "../../../types/themes.type.ts";

describe("<UiLinkButton />", () => {
   // Mock router to support RouterLink
   const routes: RouteRecordRaw[] = [
      {
         path: "/",
         component: defineComponent({
            render() {
               return h("div", "Test");
            },
         }),
      },
   ];
   const mockRouter = createRouter({
      history: createMemoryHistory(),
      routes,
   });

   function mountComponent(testProps?: Partial<Props>) {
      return mount(UiLinkButton, {
         props: {
            to: "/",
            ...testProps,
         },
         slots: {
            default: "Test content",
         },
         components: { RouterLink },
         global: {
            plugins: [mockRouter],
            stubs: { UiIcon: true },
         },
      });
   }

   it("renders the component with defaults", () => {
      const wrapper = mountComponent();
      expect(wrapper.exists()).toBe(true);

      // default props
      expect(wrapper.props("theme")).toBe("brand");
      expect(wrapper.props("variant")).toBe("filled");
      expect(wrapper.props("size")).toBe("medium");
   });

   it("applies class based on variant prop", () => {
      const wrapper = mountComponent({ variant: "outline" });
      expect(wrapper.classes("outline")).toBe(true);
      expect(wrapper.classes("filled")).toBe(false);
   });

   it("applies class based on theme prop", () => {
      const wrapper = mountComponent({ theme: themeTypes.DANGER });
      expect(wrapper.classes("danger")).toBe(true);
      expect(wrapper.classes("brand")).toBe(false);
   });

   it("applies class based on size prop", () => {
      const wrapper = mountComponent({ size: "large" });
      expect(wrapper.classes("large")).toBe(true);
      expect(wrapper.classes("medium")).toBe(false);
   });

   it("applies rounded class if prop is present", async () => {
      const wrapper = mountComponent();

      expect(wrapper.classes("rounded")).toBe(false);

      await wrapper.setProps({ rounded: true });

      expect(wrapper.classes("rounded")).toBe(true);
   });

   it("applies icon-only class if prop is present", async () => {
      const wrapper = mountComponent();

      expect(wrapper.classes("icon-only")).toBe(false);

      await wrapper.setProps({ isIconOnly: true });

      expect(wrapper.classes("icon-only")).toBe(true);
   });

   it("renders the content of the slot", () => {
      const wrapper = mountComponent();
      expect(wrapper.html()).toContain("Test content");
   });

   it("renders optional icon before slot content", async () => {
      const wrapper = mountComponent();

      expect(wrapper.findby("icon-before").exists()).toBe(false);
      expect(wrapper.findby("icon-after").exists()).toBe(false);

      await wrapper.setProps({ iconBefore: "sparkle" });

      expect(wrapper.findby("icon-before").exists()).toBe(true);
      expect(wrapper.findby("icon-after").exists()).toBe(false);
      expect(wrapper.findby("icon-before").attributes("name")).toBe("sparkle");
   });

   it("renders optional icon after slot content", async () => {
      const wrapper = mountComponent();

      expect(wrapper.findby("icon-before").exists()).toBe(false);
      expect(wrapper.findby("icon-after").exists()).toBe(false);

      await wrapper.setProps({ iconAfter: "sparkle" });

      expect(wrapper.findby("icon-before").exists()).toBe(false);
      expect(wrapper.findby("icon-after").exists()).toBe(true);
      expect(wrapper.findby("icon-after").attributes("name")).toBe("sparkle");
   });

   it("renders optional icon before and after slot content", async () => {
      const wrapper = mountComponent();

      expect(wrapper.findby("icon-before").exists()).toBe(false);
      expect(wrapper.findby("icon-after").exists()).toBe(false);

      await wrapper.setProps({ iconBefore: "link", iconAfter: "sparkle" });

      expect(wrapper.findby("icon-before").exists()).toBe(true);
      expect(wrapper.findby("icon-before").attributes("name")).toBe("link");
      expect(wrapper.findby("icon-after").exists()).toBe(true);
      expect(wrapper.findby("icon-after").attributes("name")).toBe("sparkle");
   });

   it("Renders a router link if `to` is not an external link", () => {
      const wrapper = mountComponent();
      const routerLink = wrapper.findComponent(RouterLink);
      const anchorLink = wrapper.findby("external-link");

      expect(anchorLink.exists()).toBe(false);
      expect(routerLink.exists()).toBe(true);
      expect(routerLink.props("to")).toBe("/");
      expect(routerLink.attributes("href")).toBe("/");
      expect(routerLink.attributes("target")).toBe(undefined);
      expect(routerLink.attributes("rel")).toBe(undefined);
   });

   it("Renders an anchor tag if `to` is an external link", () => {
      const externalLink = "https://google.com";
      const wrapper = mountComponent({ to: externalLink });
      const routerLink = wrapper.findComponent(RouterLink);
      const anchorLink = wrapper.findby("external-link");

      expect(routerLink.exists()).toBe(false);
      expect(anchorLink.exists()).toBe(true);
      expect(anchorLink.attributes("href")).toBe(externalLink);
      expect(anchorLink.attributes("target")).toBe("_blank");
      expect(anchorLink.attributes("rel")).toBe("noopener noreferrer");
      expect(anchorLink.attributes("to")).toBe(undefined);
   });

   it("Allows for target attribute that overrides default target", () => {
      const wrapper = mountComponent({ target: "_blank" });
      const routerLink = wrapper.findComponent(RouterLink);
      const anchorLink = wrapper.findby("internal-link");

      expect(anchorLink.exists()).toBe(true);
      expect(routerLink.exists()).toBe(false);
      expect(anchorLink.attributes("target")).toBe("_blank");
      expect(anchorLink.attributes("rel")).toBe("noopener noreferrer");
   });
});
