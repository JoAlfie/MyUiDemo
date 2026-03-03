// @vite-ignore
import type { Meta, StoryObj } from "@storybook/vue3";
import UiPill from "./UiPill.vue";
import UiIcon from "../UiIcon/UiIcon.vue";

/**
 * The Pill component is a simple component that displays a coloured pill with text inside.
 *
 *
 * Use a `theme` prop to set the text and background colour of the pill.
 *
 * ```html
 * <UiPill theme="blue" text="Blue" />
 * ```
 *
 *
 * Alternatively, you can use the `class` prop to set the text and background colour of the pill, however it's more likely that you'll want to add a new theme property.
 *
 * **Example:**
 *
 * ```html
 * <UiPill class="krazy-fuchsia" text="Blue" />
 * ```
 *
 * **CSS Example:**
 *
 * ```css
 * .krazy-fuchsia {
 *    --pill-background-colour: var(--colour-info-background);
 *    --pill-text-colour: var(--colour-info-text);
 * }
 * ```
 */
const meta: Meta = {
   title: "UI/UiPill",
   component: UiPill,
   tags: ["autodocs"],
} satisfies Meta<typeof UiPill>;

export default meta;

type Story = StoryObj<typeof meta>;

export const PillMedium: Story = {
   args: {
      text: "Medium",
      theme: "red",
   },
};

export const PillSmall: Story = {
   args: {
      text: "Small",
      theme: "blue",
      size: "small",
   },
};

export const PillWithSlot: Story = {
   args: {
      text: "You don't see me",
      theme: "blue",
   },
   render: (args) => ({
      components: { UiIcon, UiPill },
      setup() {
         return { args };
      },
      template: `
      <UiPill v-bind="args">
         <span style="display: flex; align-items: center; gap: var(--size-base-4)"><UiIcon name="rocket" /> We have liftoff</span>
      </UiPill>
      `,
   }),
};

export const RoundedFull: Story = {
   args: {
      text: "Rounded Full",
      rounded: "full",
   },
};

export const RoundedMedium: Story = {
   args: {
      text: "Rounded Medium",
      rounded: "medium",
   },
};

export const RoundedSmall: Story = {
   args: {
      text: "Rounded Small",
      rounded: "small",
   },
};
export const PillGreen: Story = {
   args: {
      text: "Green",
      theme: "green",
   },
};

export const PillRed: Story = {
   args: {
      text: "Red",
      theme: "red",
   },
};

export const PillBlue: Story = {
   args: {
      text: "Blue",
      theme: "blue",
   },
};

export const PillBrand: Story = {
   args: {
      text: "Brand",
      theme: "brand",
   },
};

export const PillBrandReversed: Story = {
   args: {
      text: "Brand Reversed",
      theme: "brand-reversed",
   },
};

export const PillOrange: Story = {
   args: {
      text: "Orange",
      theme: "orange",
   },
};

export const PillPurple: Story = {
   args: {
      text: "Purple",
      theme: "purple",
   },
};

export const PillPurpleReversed: Story = {
   args: {
      text: "Purple Reversed",
      theme: "purple-reversed",
   },
};

export const PillPink: Story = {
   args: {
      text: "Pink",
      theme: "pink",
   },
};

export const PillSand: Story = {
   args: {
      text: "Sand",
      theme: "sand",
   },
};

export const PillNeutral: Story = {
   args: {
      text: "Neutral",
      theme: "neutral",
   },
};

export const PillTan: Story = {
   args: {
      text: "Tan",
      theme: "tan",
   },
};

export const PillGreenDot: Story = {
   args: {
      text: "Green",
      dotTheme: "green",
   },
};

export const PillRedDot: Story = {
   args: {
      text: "Red",
      dotTheme: "red",
   },
};

export const PillBlueDot: Story = {
   args: {
      text: "Blue",
      dotTheme: "blue",
   },
};

export const PillBrandDot: Story = {
   args: {
      text: "Brand",
      dotTheme: "brand",
   },
};

export const PillOrangeDot: Story = {
   args: {
      text: "Orange",
      dotTheme: "orange",
   },
};

export const PillPurpleDot: Story = {
   args: {
      text: "Purple",
      dotTheme: "purple",
   },
};

export const PillPinkDot: Story = {
   args: {
      text: "Pink",
      dotTheme: "pink",
   },
};

export const PillSandDot: Story = {
   args: {
      text: "Sand",
      dotTheme: "sand",
   },
};

export const PillNeutralDot: Story = {
   args: {
      text: "Neutral",
      dotTheme: "neutral",
   },
};

export const PillTanDot: Story = {
   args: {
      text: "Tan",
      dotTheme: "tan",
   },
};

export const CombinedDotAndPillTheme: Story = {
   args: {
      text: "Any combination is possible",
      dotTheme: "blue",
      theme: "pink",
   },
};
