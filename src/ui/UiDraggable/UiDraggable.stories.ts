import type { Meta, StoryObj } from "@storybook/vue3";
import { ref } from "vue";
import UiDraggable from "./UiDraggable.vue";
import SnIcon from "../UiIcon/UiIcon.vue";

const meta: Meta<typeof UiDraggable> = {
   title: "UI/UiDraggable",
   component: UiDraggable,
   parameters: {
      docs: {
         description: {
            component:
               "A draggable list component that supports both mouse and keyboard interactions for reordering items.",
         },
      },
   },
   argTypes: {
      modelValue: {
         description: "Array of items to be displayed and reordered",
         control: { type: "object" },
      },
      disabled: {
         description: "Whether dragging is disabled",
         control: { type: "boolean" },
      },
      containerClass: {
         description: "Additional CSS classes for the container",
         control: { type: "text" },
      },
      itemKey: {
         description: "Property name or function to generate unique keys for items",
         control: { type: "text" },
      },
      getItemLabel: {
         description: "Function to get display label for an item",
         control: false,
      },

      dragHandleLabel: {
         description: "Accessibility label for the drag handle",
         control: { type: "text" },
      },
   },
   args: {
      modelValue: [
         { id: 1, name: "Item 1", description: "First item in the list" },
         { id: 2, name: "Item 2", description: "Second item in the list" },
         { id: 3, name: "Item 3", description: "Third item in the list" },
         { id: 4, name: "Item 4", description: "Fourth item in the list" },
         { id: 5, name: "Item 5", description: "Fifth item in the list" },
      ],
      disabled: false,
      containerClass: "",
      itemKey: "id",
      dragHandleLabel: "Use the up/down arrows to change order",
   },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
   args: {},
   render: (args) => ({
      components: { UiDraggable },
      setup() {
         return { args };
      },
      template: `
         <div style="padding: var(--size-base-16);">
            <h3>Draggable List</h3>
            <UiDraggable
               v-model="args.modelValue"
               v-bind="args"
               style="display: flex; flex-direction: column; gap: var(--size-base-8);"
            >
            </UiDraggable>
         </div>
      `,
   }),
};

// Basic draggable list
export const WithSlotContent: Story = {
   args: {},
   render: (args) => ({
      components: { UiDraggable },
      setup() {
         return { args };
      },
      template: `
         <div style="padding: var(--size-base-16);">
            <h3>Draggable List</h3>
            <UiDraggable
               v-model="args.modelValue"
               v-bind="args"
               style="display: flex; flex-direction: column; gap: var(--size-base-8);"
            >
               <template #content="{ item, index }">
                  <div style="flex: 1;">
                     <div>{{ item.name }}</div>
                     <div>{{ item.description }}</div>
                  </div>
                  <div>#{{ index + 1 }}</div>
               </template>
            </UiDraggable>
         </div>
      `,
   }),
};

export const WithCustomDragHandle: Story = {
   args: {},
   render: (args) => ({
      components: { UiDraggable, SnIcon },
      setup() {
         return { args };
      },
      template: `
         <div style="padding: var(--size-base-16);">
            <h3>Draggable List with Custom Drag Handle</h3>
            <UiDraggable
               v-model="args.modelValue"
               v-bind="args"
            >
               <template #drag-handle>
                  <SnIcon name="atom" />
               </template>
            </UiDraggable>
         </div>
      `,
   }),
};

// Disabled state
export const Disabled: Story = {
   args: {
      disabled: true,
   },
   render: (args) => ({
      components: { UiDraggable },
      setup() {
         return { args };
      },
      template: `
         <div style="padding: var(--size-base-16);">
            <h3>Disabled Draggable List</h3>
            <UiDraggable
               v-model="args.modelValue"
               v-bind="args"
               style="display: flex; flex-direction: column; gap: var(--size-base-8);"
            >
               <template #content="{ item, index }">
                  <div style="flex: 1;">
                     <div>{{ item.name }}</div>
                     <div>{{ item.description }}</div>
                  </div>
                  <div>#{{ index + 1 }}</div>
               </template>
            </UiDraggable>
         </div>
      `,
   }),
};

// With form inputs
export const WithFormInputs: Story = {
   render: () => ({
      components: { UiDraggable },
      setup() {
         const localItems = ref([
            { id: 1, name: "Item 1" },
            { id: 2, name: "Item 2" },
            { id: 3, name: "Item 3" },
            { id: 4, name: "Item 4" },
            { id: 5, name: "Item 5" },
         ]);

         return { localItems };
      },
      template: `
         <div style="padding: var(--size-base-16);">
            <h3>Draggable List with Text Inputs</h3>
            <p style="margin-bottom: var(--size-base-16); color: var(--colour-text-secondary);">
               You can edit the text inputs and still drag items to reorder them.
            </p>
            <UiDraggable
               v-model="localItems"
               v-bind="args"
            >
               <template #content="{ item, index }">
                  <div style="flex: 1;">
                     <input
                        type="text"
                        :value="item.name"
                        @input="localItems[index].name = $event.target.value"
                        placeholder="Enter item name"
                        style="width: 100%; padding: var(--size-base-4); border: 1px solid var(--colour-border-base); border-radius: var(--border-radius-4);"
                     />
                  </div>
               </template>
            </UiDraggable>
            
            <div style="margin-top: var(--size-base-16); padding: var(--size-base-12); background-color: var(--white); border-radius: var(--border-radius-8);">
               <h4 style="margin-top: 0;">Current Data:</h4>
               <pre style="margin: 0; font-size: var(--size-text-sm); overflow-x: auto;">{{ JSON.stringify(localItems, null, 2) }}</pre>
            </div>
         </div>
      `,
   }),
};
