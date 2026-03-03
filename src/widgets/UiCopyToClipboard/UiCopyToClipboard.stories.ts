import type { Meta, StoryObj } from "@storybook/vue3";
import UiCopyToClipboard from "./UiCopyToClipboard.vue";
import UiIcon from "../../ui/UiIcon/UiIcon.vue";

/**
 * Button which copies a specified string to the users' clipboard.
 * The button can be passed an additional class for styling.
 *
 * ```vue
 * <UiCopyToClipboard
 *    :ariaLabel="Copy text to clipboard"
 *    :copyValue="copy this text">
 *    Copied text to clipboard
 * </UiCopyToClipboard>
 * ```
 *
 * ## Slots
 * ### Default
 * A message to tell the user the copy action has happened is passed in via a slot to allow for usecase specific styling and localisation.
 *
 * ### Button (optional)
 * If the button slot is populated, this is rendered as the button content.
 *
 * <b>Important note:</b>
 * For accessibility, the aria label is not used on the button if the button slot is used - the button content must provide suitable content.
 * This is to avoid the aria label having different content to the button causing confusion.
 */
const meta: Meta = {
   title: "Widgets/UiCopyToClipboard",
   component: UiCopyToClipboard,
   tags: ["autodocs"],
   args: {
      ariaLabel: "Copy text to clipboard",
      copyValue: "Copy this text",
   },
} satisfies Meta<typeof UiCopyToClipboard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const CopyToClipboard: Story = {
   render: (args) => ({
      setup() {
         return { args };
      },
      components: { UiCopyToClipboard, UiIcon },
      template: `
         <UiCopyToClipboard v-bind="args">Copied text to clipboard</UiCopyToClipboard>
      `,
   }),
};

export const CopyToClipboardWithButtonSlot: Story = {
   args: { buttonClass: "button-addtl" },
   render: (args) => ({
      setup() {
         return { args };
      },
      components: { UiCopyToClipboard, UiIcon },
      template: `
         <UiCopyToClipboard v-bind="args">
            <template #default>Copied text to clipboard</template>
            <template #button>Copy me to your clipboard <UiIcon name="copy-07" /></template>
         </UiCopyToClipboard>
      `,
   }),
};

// Add styles globally
const style = document.createElement("style");
style.innerHTML = `
   .button-addtl {
      display: flex;
      align-items: center;
      gap: var(--size-base-8);
   }
`;
document.head.appendChild(style);
