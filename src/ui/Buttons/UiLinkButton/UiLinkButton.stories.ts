// @vite-ignore
import type { Meta, StoryObj } from "@storybook/vue3";
import UiLinkButton from "./UiLinkButton.vue";
import UiIcon from "../../UiIcon/UiIcon.vue";
import { vueRouter } from "storybook-vue3-router";
import { THEMES } from "@/types/themes.type.ts";

const meta: Meta = {
   title: "UI/Buttons/UiLinkButton",
   component: UiLinkButton,
   tags: ["autodocs"],
   argTypes: {
      theme: {
         control: "select",
         options: Object.values(THEMES).filter((theme) => theme !== "warning"),
      },
   },
   args: { theme: "brand", to: "/", variant: "filled", default: "Link button text" },
   decorators: [vueRouter()],
} satisfies Meta<typeof UiLinkButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const IconBefore: Story = {
   args: { iconBefore: "filter-funnel" },
};

export const IconAfter: Story = {
   args: { iconAfter: "chevron-right" },
};

export const IconBeforeAndAfter: Story = {
   args: { iconBefore: "sparkle", iconAfter: "sparkle" },
};

/** When using IconOnly, do not use the IconBefore / IconAfter props, rather pass an UiIcon with appropriate ariaLabel prop into the slot */
export const IconOnly: Story = {
   args: { isIconOnly: true },
   render: (args) => ({
      components: { UiLinkButton, UiIcon },
      setup() {
         return { args };
      },
      template: `
         <UiLinkButton v-bind="args"><UiIcon name="x-close" ariaLabel="close" /></UiLinkButton>
      `,
   }),
};

export const Small: Story = {
   args: { size: "small" },
};

export const Medium: Story = {
   args: { size: "medium" },
};

export const Large: Story = {
   args: { size: "large" },
};

export const Rounded: Story = {
   args: { rounded: true },
};

export const BrandFilled: Story = {};

export const BrandOutline: Story = {
   args: { variant: "outline" },
};

export const BrandOutlineWhite: Story = {
   args: { theme: "brand", variant: "outline-white" },
   render: (args) => ({
      components: { UiLinkButton },
      setup() {
         return { args };
      },
      template: `<div style="background-color: var(--grey-40); padding: 1rem;">
         <UiLinkButton v-bind="args">Link button text</UiLinkButton>
      </div>`,
   }),
};

export const BrandOutlineFilled: Story = {
   args: { theme: "brand", variant: "outline-filled" },
};

export const InfoFilled: Story = {
   args: { theme: "info" },
};

export const InfoOutline: Story = {
   args: { theme: "info", variant: "outline" },
};

export const InfoOutlineWhite: Story = {
   args: { theme: "info", variant: "outline-white" },
   render: (args) => ({
      components: { UiLinkButton },
      setup() {
         return { args };
      },
      template: `<div style="background-color: var(--grey-40); padding: 1rem;">
         <UiLinkButton v-bind="args">Link button text</UiLinkButton>
      </div>`,
   }),
};

export const InfoOutlineFilled: Story = {
   args: { theme: "info", variant: "outline-filled" },
};

export const DangerFilled: Story = {
   args: { theme: "danger" },
};

export const DangerOutline: Story = {
   args: { theme: "danger", variant: "outline" },
};

export const DangerOutlineWhite: Story = {
   args: { theme: "danger", variant: "outline-white" },
   render: (args) => ({
      components: { UiLinkButton },
      setup() {
         return { args };
      },
      template: `<div style="background-color: var(--grey-40); padding: 1rem;">
         <UiLinkButton v-bind="args">Link button text</UiLinkButton>
      </div>`,
   }),
};

export const DangerOutlineFilled: Story = {
   args: { theme: "danger", variant: "outline-filled" },
};

export const SuccessFilled: Story = {
   args: { theme: "success" },
};

export const SuccessOutline: Story = {
   args: { theme: "success", variant: "outline" },
};

export const SuccessOutlineWhite: Story = {
   args: { theme: "success", variant: "outline-white" },
   render: (args) => ({
      components: { UiLinkButton },
      setup() {
         return { args };
      },
      template: `<div style="background-color: var(--grey-40); padding: 1rem;">
         <UiLinkButton v-bind="args">Link button text</UiLinkButton>
      </div>`,
   }),
};

export const SuccessOutlineFilled: Story = {
   args: { theme: "success", variant: "outline-filled" },
};

export const GreyFilled: Story = {
   args: { theme: "grey" },
};

export const GreyOutline: Story = {
   args: { theme: "grey", variant: "outline" },
};

export const GreyOutlineWhite: Story = {
   args: { theme: "grey", variant: "outline-white" },
   render: (args) => ({
      components: { UiLinkButton },
      setup() {
         return { args };
      },
      template: `<div style="background-color: var(--colour-brand-default); padding: 1rem;">
         <UiLinkButton v-bind="args">Link button text</UiLinkButton>
      </div>`,
   }),
};

export const GreyOutlineFilled: Story = {
   args: { theme: "grey", variant: "outline-filled" },
};

export const NeutralFilled: Story = {
   args: { theme: "neutral" },
   render: (args) => ({
      components: { UiLinkButton },
      setup() {
         return { args };
      },
      template: `<div style="background-color: var(--colour-brand-default); padding: 1rem;">
         <UiLinkButton v-bind="args">Link button text</UiLinkButton>
      </div>`,
   }),
};

export const NeutralOutline: Story = {
   args: { theme: "neutral", variant: "outline" },
   render: (args) => ({
      components: { UiLinkButton },
      setup() {
         return { args };
      },
      template: `<div style="background-color: var(--colour-brand-default); padding: 1rem;">
         <UiLinkButton v-bind="args">Link button text</UiLinkButton>
      </div>`,
   }),
};

export const NeutralOutlineWhite: Story = {
   args: { theme: "neutral", variant: "outline-white" },
   render: (args) => ({
      components: { UiLinkButton },
      setup() {
         return { args };
      },
      template: `<div style="background-color: var(--grey-40); padding: 1rem;">
         <UiLinkButton v-bind="args">Link button text</UiLinkButton>
      </div>`,
   }),
};

/**
 * Note that text doesn't take a theme prop, it's just grey
 */
export const Text: Story = {
   args: { variant: "text" },
};
