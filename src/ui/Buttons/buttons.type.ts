import type { Theme } from "../../types/themes.type.ts";
import type { Icon } from "../UiIcon/UiIcon.vue";

export type ButtonVariant = "filled" | "outline" | "outline-white" | "outline-filled" | "transparent" | "text";
export type ButtonTheme = Exclude<Theme, "warning"> | "grey";
export type ButtonSize = "small" | "medium" | "large" | "medium-md" | "large-md";

export interface ButtonProps {
   /** Button style */
   variant?: ButtonVariant;
   /** Button colour theme */
   theme?: ButtonTheme;
   /** Button size */
   size?: ButtonSize;
   /** Border radius full */
   rounded?: boolean;
   /** Optional Icon - before button content */
   iconBefore?: Icon;
   /** Optional Icon - after button content */
   iconAfter?: Icon;
   /** Square button for icons - ensure icon has ariaLabel attribute! */
   isIconOnly?: boolean;
}
