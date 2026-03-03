// @vite-ignore
import type { Meta, StoryObj } from "@storybook/vue3";
import UiDropdownWrapper, { dropdownStyle } from "./UiDropdownWrapper.vue";

/**
 * Dropdown wrapper component that manages the dropdown state
 *
 * ## Using a custom container
 * You can pass a custom container element to constrain the dropdown to a specific area.
 * This must be a ref to the container element.
 */

const meta: Meta = {
   title: "UI/UiDropdownWrapper",
   component: UiDropdownWrapper,
   tags: ["autodocs"],
   args: {
      id: "dropdownId",
      triggerId: "dropdownTriggerId",
   },
} satisfies Meta<typeof UiDropdownWrapper>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
   render: (args) => ({
      components: { UiDropdownWrapper },
      setup() {
         return { args };
      },
      template: `
         <UiDropdownWrapper v-bind="args">
            <template #before>I am before the trigger button</template>
            <template #trigger>Click me to dropdown</template>
            <template #panel>I am in the panel! <br> Now you see me!</template>
         </UiDropdownWrapper>
      `,
   }),
};

export const FormControlStyle: Story = {
   args: { styleType: dropdownStyle.FORM_CONTROL },
   render: (args) => ({
      components: { UiDropdownWrapper },
      setup() {
         return { args };
      },
      template: `
         <UiDropdownWrapper v-bind="args">
            <template #before>I am before the trigger button</template>
            <template #trigger>Click me to dropdown</template>
            <template #panel>I am in the panel!</template>
         </UiDropdownWrapper>
      `,
   }),
};

export const NoStyleButtonSlotUsage: Story = {
   args: { styleType: dropdownStyle.NONE, showCaret: false },
   render: (args) => ({
      components: { UiDropdownWrapper },
      setup() {
         return { args };
      },
      template: `
         <UiDropdownWrapper v-bind="args">
            <template #before>I am before the trigger button</template>
            <template #trigger><div style="margin-inline-start: 1rem; height: 50px; background-color: coral; color: white; display: flex; align-items: center; padding-inline: 5px">a custom button</div></template>
            <template #panel>I am in the panel!</template>
         </UiDropdownWrapper>
      `,
   }),
};
