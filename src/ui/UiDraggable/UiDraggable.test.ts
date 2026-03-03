import { flushPromises, mount } from "@vue/test-utils";
import { describe, it, expect, afterEach } from "vitest";

import UiDraggable from "./UiDraggable.vue";

describe("<UiDraggable />", () => {
   const defaultItems = [
      { id: 1, name: "Item 1", description: "First item" },
      { id: 2, name: "Item 2", description: "Second item" },
      { id: 3, name: "Item 3", description: "Third item" },
   ];

   function returnDefaultProps() {
      return {
         modelValue: [...defaultItems],
         disabled: false,
         containerClass: "",
         itemKey: "id",
         dragHandleLabel: "Use the up/down arrows to change order",
         untitledLabel: "Untitled",
         itemLabel: "Item",
         cannotMoveMessage: "Cannot move item outside the list bounds",
         movedToPositionMessage: "moved to position",
      };
   }

   function mountComponent(props = {}) {
      return mount(UiDraggable, {
         props: { ...returnDefaultProps(), ...props },
         attachTo: document.body,
      });
   }

   afterEach(() => {
      document.body.innerHTML = "";
   });

   describe("Rendering", () => {
      it("renders all items", () => {
         const wrapper = mountComponent();
         const items = wrapper.findAllBy("drag-handle");
         expect(items).toHaveLength(3);
      });

      it("renders with custom content slot", () => {
         const wrapper = mountComponent();
         const contentSlots = wrapper.findAll("[data-draggable-item]");
         expect(contentSlots).toHaveLength(3);

         // Check default content is rendered
         expect(wrapper.text()).toContain("Item 1");
         expect(wrapper.text()).toContain("Item 2");
         expect(wrapper.text()).toContain("Item 3");
      });

      it("renders with custom drag handle slot", () => {
         const wrapper = mountComponent();
         const dragHandles = wrapper.findAllBy("drag-handle");
         expect(dragHandles).toHaveLength(3);

         // Check drag handles have correct attributes
         dragHandles.forEach((handle, index) => {
            expect(handle.attributes("data-test")).toBe("drag-handle");
            expect(handle.attributes("data-drag-handle-id")).toBe(String(index + 1));
         });
      });

      it("renders with custom drag handle slot content", () => {
         // Mount with custom drag handle slot
         const customWrapper = mount(UiDraggable, {
            props: returnDefaultProps(),
            attachTo: document.body,
            global: {
               stubs: {
                  UiIcon: {
                     template: "<span>⋮⋮</span>",
                     props: ["name"],
                  },
               },
            },
            slots: {
               "drag-handle": `
                     <span class="custom-drag-handle-content">
                        Custom Handle
                     </span>
               `,
            },
         });

         // Check that custom content is rendered inside the buttons
         const customContent = customWrapper.findAll(".custom-drag-handle-content");
         expect(customContent).toHaveLength(3);

         // Check custom content
         customContent.forEach((content) => {
            expect(content.text()).toContain("Custom Handle");
         });

         // Check that the buttons still have the correct attributes
         const dragHandles = customWrapper.findAllBy("drag-handle");
         dragHandles.forEach((handle, index) => {
            expect(handle.attributes("data-drag-handle-id")).toBe(String(index + 1));
         });

         customWrapper.unmount();
      });

      it("applies container class", () => {
         const wrapper = mountComponent({ containerClass: "custom-class" });
         const list = wrapper.find("[data-draggable-list]");
         expect(list.classes()).toContain("custom-class");
      });
   });

   describe("Disabled state", () => {
      it("disables drag handles when disabled", () => {
         const wrapper = mountComponent({ disabled: true });
         const dragHandles = wrapper.findAllBy("drag-handle");

         dragHandles.forEach((handle) => {
            expect(handle.attributes("disabled")).toBeDefined();
         });
      });

      it("prevents keyboard navigation when disabled", async () => {
         const wrapper = mountComponent({ disabled: true });
         const firstHandle = wrapper.findby("drag-handle");

         await firstHandle.trigger("keyup", { key: "ArrowUp" });

         // Should not emit any events
         expect(wrapper.emitted("update:modelValue")).toBeFalsy();
         expect(wrapper.emitted("keyboard-move")).toBeFalsy();
      });
   });

   describe("Keyboard navigation", () => {
      it("moves item up with ArrowUp", async () => {
         const wrapper = mountComponent();
         const dragHandles = wrapper.findAllBy("drag-handle");

         // Focus first handle and press ArrowUp (should not move)
         await dragHandles[0].trigger("keyup", { key: "ArrowUp" });
         await flushPromises();

         // Should not emit because it's already at the top
         expect(wrapper.emitted("update:modelValue")).toBeFalsy();

         // Focus second handle and press ArrowUp
         await dragHandles[1].trigger("keyup", { key: "ArrowUp" });
         await flushPromises();

         // Should emit the reordered array
         expect(wrapper.emitted("update:modelValue")).toBeTruthy();
         const emittedValue = wrapper.emitted("update:modelValue")![0][0] as any[];
         expect(emittedValue[0].id).toBe(2); // Second item moved to first
         expect(emittedValue[1].id).toBe(1); // First item moved to second
      });

      it("moves item down with ArrowDown", async () => {
         const wrapper = mountComponent();
         const dragHandles = wrapper.findAllBy("drag-handle");

         // Focus first handle and press ArrowDown
         await dragHandles[0].trigger("keyup", { key: "ArrowDown" });
         await flushPromises();

         // Should emit the reordered array
         expect(wrapper.emitted("update:modelValue")).toBeTruthy();
         const emittedValue = wrapper.emitted("update:modelValue")![0][0] as any[];
         expect(emittedValue[0].id).toBe(2); // Second item moved to first
         expect(emittedValue[1].id).toBe(1); // First item moved to second
      });

      it("prevents moving beyond boundaries", async () => {
         const wrapper = mountComponent();
         const dragHandles = wrapper.findAllBy("drag-handle");

         // Try to move first item up (beyond top)
         await dragHandles[0].trigger("keyup", { key: "ArrowUp" });
         await flushPromises();

         // Should not emit because it's invalid
         expect(wrapper.emitted("update:modelValue")).toBeFalsy();

         // Try to move last item down (beyond bottom)
         await dragHandles[2].trigger("keyup", { key: "ArrowDown" });
         await flushPromises();

         // Should not emit because it's invalid
         expect(wrapper.emitted("update:modelValue")).toBeFalsy();
      });

      it("ignores non-arrow keys", async () => {
         const wrapper = mountComponent();
         const dragHandles = wrapper.findAllBy("drag-handle");

         await dragHandles[0].trigger("keyup", { key: "Enter" });
         await flushPromises();

         expect(wrapper.emitted("update:modelValue")).toBeFalsy();
         expect(wrapper.emitted("keyboard-move")).toBeFalsy();
      });
   });

   describe("Mouse drag and drop", () => {
      it("emits change event on drag", async () => {
         const wrapper = mountComponent();

         // Simulate drag change event
         const changeEvent = {
            draggedContext: {
               element: defaultItems[0],
               index: 0,
               futureIndex: 1,
            },
         };

         await (wrapper.vm as any).handleDragChange(changeEvent);

         expect(wrapper.emitted("change")).toBeTruthy();
         expect(wrapper.emitted("change")![0][0]).toEqual(changeEvent);
      });

      it("updates status message on drag", async () => {
         const wrapper = mountComponent();

         const changeEvent = {
            draggedContext: {
               element: defaultItems[0],
               index: 0,
               futureIndex: 1,
            },
         };

         await (wrapper.vm as any).handleDragChange(changeEvent);

         // Status message should be updated
         expect(wrapper.vm.statusMessage).toContain("moved to position");
      });
   });

   describe("Accessibility", () => {
      it("has proper ARIA labels on drag handles", () => {
         const wrapper = mountComponent();
         const dragHandles = wrapper.findAllBy("drag-handle");

         dragHandles.forEach((handle, index) => {
            const expectedLabel = `Item ${index + 1}: Use the up/down arrows to change order`;
            expect(handle.attributes("aria-label")).toBe(expectedLabel);
         });
      });

      it("has proper focus management", async () => {
         const wrapper = mountComponent();
         const dragHandles = wrapper.findAllBy("drag-handle");

         // Focus should be maintained after keyboard move
         await dragHandles[0].trigger("keyup", { key: "ArrowDown" });
         await flushPromises();

         // The focus should be on the moved element
         expect(document.activeElement).toBeTruthy();
      });
   });

   describe("Props and customization", () => {
      it("uses custom item key function", () => {
         const customKeyFn = (item: any) => `custom-${item.id}`;
         const wrapper = mountComponent({ itemKey: customKeyFn });

         const dragHandles = wrapper.findAllBy("drag-handle");
         expect(dragHandles[0].attributes("data-drag-handle-id")).toBe("custom-1");
      });

      it("uses custom item key string", () => {
         const items = [
            { customId: "a", name: "Item A" },
            { customId: "b", name: "Item B" },
         ];
         const wrapper = mountComponent({
            modelValue: items,
            itemKey: "customId",
         });

         const dragHandles = wrapper.findAllBy("drag-handle");
         expect(dragHandles[0].attributes("data-drag-handle-id")).toBe("a");
      });

      it("uses custom getItemLabel function", () => {
         const customLabelFn = (item: any) => `Custom ${item.name}`;
         const wrapper = mountComponent({ getItemLabel: customLabelFn });

         const dragHandles = wrapper.findAllBy("drag-handle");
         expect(dragHandles[0].attributes("aria-label")).toContain("Custom Item 1");
      });
   });

   describe("Exposed methods", () => {
      it("exposes handleKeyboardMove method", () => {
         const wrapper = mountComponent();
         expect(typeof wrapper.vm.handleKeyboardMove).toBe("function");
      });

      it("exposes getItemKey method", () => {
         const wrapper = mountComponent();
         expect(typeof wrapper.vm.getItemKey).toBe("function");
      });

      it("exposes updateStatusMessage method", () => {
         const wrapper = mountComponent();
         expect(typeof wrapper.vm.updateStatusMessage).toBe("function");
      });

      it("exposes statusMessage and isDragging", () => {
         const wrapper = mountComponent();
         expect(wrapper.vm.statusMessage).toBe("");
         expect(wrapper.vm.isDragging).toBe(false);
      });
   });

   describe("Form inputs integration", () => {
      it("works with text inputs in content slot", async () => {
         const items = [
            { id: 1, name: "Item 1" },
            { id: 2, name: "Item 2" },
            { id: 3, name: "Item 3" },
         ];

         const wrapper = mount(UiDraggable, {
            props: {
               modelValue: items,
               disabled: false,
            },
            slots: {
               content: `
                  <div style="flex: 1;">
                     <input
                        type="text"
                        :value="item.name"
                        @input="item.name = $event.target.value"
                        placeholder="Enter item name"
                        data-test="item-input"
                     />
                  </div>
               `,
            },
            attachTo: document.body,
         });

         // Check that inputs are rendered
         const inputs = wrapper.findAllBy("item-input");
         expect(inputs).toHaveLength(3);

         // Check initial values
         expect((inputs[0].element as HTMLInputElement).value).toBe("Item 1");
         expect((inputs[1].element as HTMLInputElement).value).toBe("Item 2");
         expect((inputs[2].element as HTMLInputElement).value).toBe("Item 3");

         // Test editing an input by triggering the input event
         await inputs[0].setValue("Updated Item 1");
         await inputs[0].trigger("input");
         expect((inputs[0].element as HTMLInputElement).value).toBe("Updated Item 1");

         // Update the second input value by triggering the input event
         await inputs[1].setValue("Updated Item 2");
         await inputs[1].trigger("input");
         expect((inputs[1].element as HTMLInputElement).value).toBe("Updated Item 2");

         // Test keyboard navigation still works
         const dragHandles = wrapper.findAllBy("drag-handle");
         await dragHandles[0].trigger("keyup", { key: "ArrowDown" });
         await flushPromises();

         // Should emit the reordered array
         expect(wrapper.emitted("update:modelValue")).toBeTruthy();
         const emittedValue = wrapper.emitted("update:modelValue")![0][0] as any[];
         expect(emittedValue[0].id).toBe(2); // Second item moved to first
         expect(emittedValue[1].id).toBe(1); // First item moved to second

         // After reordering, the updated values should still be visible in the correct positions
         const inputsAfterReorder = wrapper.findAllBy("item-input");

         // The first input (now the second item) should show "Updated Item 2"
         expect((inputsAfterReorder[0].element as HTMLInputElement).value).toBe("Updated Item 2");

         // The second input (now the first item) should show "Updated Item 1"
         expect((inputsAfterReorder[1].element as HTMLInputElement).value).toBe("Updated Item 1");

         // The third input should still show "Item 3"
         expect((inputsAfterReorder[2].element as HTMLInputElement).value).toBe("Item 3");

         wrapper.unmount();
      });
   });
});
