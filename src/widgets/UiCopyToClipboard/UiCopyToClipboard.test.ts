import { mount } from "@vue/test-utils";
import { describe, expect, it, vi, afterEach, beforeEach } from "vitest";
import UiCopyToClipboard from "./UiCopyToClipboard.vue";
import UiIcon from "../../ui/UiIcon/UiIcon.vue";
import { nextTick } from "vue";

describe("<UiCopyToClipboard />", () => {
   const defaultProps = {
      ariaLabel: "Copy text to clipboard",
      copyValue: "Copy this text",
   };

   function mountComponent() {
      return mount(UiCopyToClipboard, {
         props: defaultProps,
         slots: {
            default: "Text copied to clipboard",
         },
         attachTo: document.body,
      });
   }

   beforeEach(() => vi.useFakeTimers());

   afterEach(() => {
      vi.restoreAllMocks();
      vi.useRealTimers();
   });

   it("renders the component in initial state", () => {
      const wrapper = mountComponent();

      expect(wrapper.exists()).toBe(true);

      // notification aria-live wrapper exists with no content
      const notificationWrapper = wrapper.findby("notification-wrapper");
      expect(notificationWrapper.exists()).toBe(true);
      expect(notificationWrapper.text()).toBe("");
      expect(notificationWrapper.attributes("aria-live")).toBe("polite");

      // button displayed with Icon
      const button = wrapper.findby("copy-button");
      expect(button.exists()).toBe(true);
      expect(button.attributes("aria-label")).toBe(defaultProps.ariaLabel);
      expect(button.findComponent(UiIcon).exists()).toBe(true);
   });

   it("copies the text to clipboard on button click", async () => {
      const writeTextMock = vi.fn().mockResolvedValue(undefined);
      Object.assign(navigator, {
         clipboard: {
            writeText: writeTextMock,
         },
      });

      const wrapper = mountComponent();
      const button = wrapper.findby("copy-button");

      await button.trigger("click");

      // correct text has been copied to clipboard
      expect(writeTextMock).toHaveBeenCalledOnce();
      expect(writeTextMock).toHaveBeenCalledWith(defaultProps.copyValue);

      // copied message is displayed
      const notificationWrapper = wrapper.findby("notification-wrapper");
      expect(notificationWrapper.text()).toContain("Text copied to clipboard");

      // button is not displayed
      expect(wrapper.findby("copy-button").exists()).toBe(false);

      // fast forward the timeout
      vi.runAllTimers();
      await nextTick();

      // initial state restored
      expect(wrapper.findby("copy-button").exists()).toBe(true);
      expect(wrapper.findby("notification-wrapper").text()).toBe("");
   });

   it("renders content in the button slot", () => {
      const wrapper = mount(UiCopyToClipboard, {
         props: defaultProps,
         slots: {
            default: "Text copied to clipboard",
            button: "Copy me!",
         },
         attachTo: document.body,
      });

      const button = wrapper.findby("copy-button");

      expect(button.findComponent(UiIcon).exists()).toBe(false);
      expect(button.text()).toContain("Copy me!");
      expect(button.attributes("aria-label")).toBe(undefined);
   });
});
