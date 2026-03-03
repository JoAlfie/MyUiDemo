import type { Meta, StoryObj } from "@storybook/vue3";
import UiIconContainer, {
   type UiIconContainerProps,
   ICON_CONTAINER_THEMES,
   ICON_CONTAINER_SHAPES,
   ICON_CONTAINER_BORDERS,
} from "./UiIconContainer.vue";
import { iconList, ICON_SIZES } from "../UiIcon/UiIcon.vue";

const meta: Meta<UiIconContainerProps> = {
   title: "UI/UiIcon/UiIconContainer",
   component: UiIconContainer,
   tags: ["autodocs"],
   argTypes: {
      icon: {
         control: "select",
         options: iconList,
      },
      theme: {
         control: "select",
         options: ICON_CONTAINER_THEMES,
      },
      size: {
         control: "select",
         options: ICON_SIZES,
         description: "The size of the icon container",
      },
      shape: {
         control: "select",
         options: ICON_CONTAINER_SHAPES,
      },
      border: {
         control: "select",
         options: ICON_CONTAINER_BORDERS,
      },
   },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Circle: Story = {
   args: {
      icon: "check",
      theme: "green",
      size: "medium",
      shape: "circle",
   },
};

export const Square: Story = {
   args: {
      icon: "check",
      theme: "green",
      size: "medium",
      shape: "square",
   },
};

export const AllThemes: Story = {
   args: {
      icon: "check",
      theme: "green",
      size: "medium",
      shape: "circle",
   },
   render: (args) => ({
      components: { UiIconContainer },
      setup() {
         return { args };
      },
      template: `
         <div style="display: flex; gap: 16px; flex-wrap: wrap;">
            <UiIconContainer icon="check" theme="green" shape="circle" />
            <UiIconContainer icon="check" theme="red" shape="circle" />
            <UiIconContainer icon="check" theme="blue" shape="circle" />
            <UiIconContainer icon="check" theme="brand" shape="circle" />
            <UiIconContainer icon="check" theme="orange" shape="circle" />
            <UiIconContainer icon="check" theme="purple" shape="circle" />
            <UiIconContainer icon="check" theme="neutral" shape="circle" />
            <UiIconContainer icon="check" theme="pink" shape="circle" />
            <UiIconContainer icon="check" theme="sand" shape="circle" />
            <UiIconContainer icon="check" theme="tan" shape="circle" />
         </div>
      `,
   }),
};

export const AllSizes: Story = {
   args: {
      icon: "check",
      theme: "green",
      size: "medium",
      shape: "circle",
   },
   render: (args) => ({
      components: { UiIconContainer },
      setup() {
         return { args };
      },
      template: `
         <div style="display: flex; gap: 16px; align-items: center;">
            <UiIconContainer icon="check" theme="green" size="small" shape="circle" />
            <UiIconContainer icon="check" theme="green" size="medium" shape="circle" />
         </div>
      `,
   }),
};

export const Borders: Story = {
   args: {
      icon: "check",
      theme: "green",
      size: "medium",
      shape: "circle",
   },
   render: (args) => ({
      components: { UiIconContainer },
      setup() {
         return { args };
      },
      template: `
         <div style="display: flex; gap: 16px; align-items: center;">
            <UiIconContainer icon="check" theme="green" size="medium" shape="circle" border="solid" />
            <UiIconContainer icon="check" theme="green" size="medium" shape="circle" border="dashed" />
         </div>
      `,
   }),
};
