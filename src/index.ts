import "./assets/styles/main.scss";

//ui
import UiIcon, { type Icon, type IconSizes } from "./ui/UiIcon/UiIcon.vue";
import UiIconContainer, {
   type IconContainerTheme,
   type IconContainerShape,
} from "./ui/UiIconContainer/UiIconContainer.vue";
import SnNotificationToaster from "./ui/UiNotificationToaster/UiNotificationToaster.vue";
import UiAlert from "./ui/UiAlert/UiAlert.vue";
import UiCollapsibleSection from "./ui/UiCollapsibleSection/UiCollapsibleSection.vue";
import UiDraggable from "./ui/UiDraggable/UiDraggable.vue";
import UiButton from "./ui/Buttons/UiButton/UiButton.vue";
import UiLinkButton from "./ui/Buttons/UiLinkButton/UiLinkButton.vue";
import UiDropdownWrapper from "./ui/UiDropdownWrapper/UiDropdownWrapper.vue";
import UiPill, { type Sizes as PillSize, type PillTheme, type DotTheme } from "./ui/UiPill/UiPill.vue";

// widgets
import UiCopyToClipboard from "./widgets/UiCopyToClipboard/UiCopyToClipboard.vue";

// stores
import { useToastStore } from "./stores/toasts/toastStore.ts";

// types
import { type ButtonTheme, type ButtonVariant, type ButtonSize } from "./ui/Buttons/buttons.type.ts";
import { DocumentFileTypes } from "./types/document-file-types.ts";

// theming
import { COLOUR_THEME_VALUES, COLOUR_THEMES, type ColourTheme } from "./types/themes.type.ts";

export {
   COLOUR_THEMES,
   type ColourTheme,
   COLOUR_THEME_VALUES,
   DocumentFileTypes,
   UiIcon,
   type Icon,
   type IconSizes,
   UiIconContainer,
   type IconContainerTheme,
   type IconContainerShape,
   SnNotificationToaster,
   useToastStore,
   UiAlert,
   UiPill,
   type PillSize,
   type PillTheme,
   type DotTheme,
   UiCollapsibleSection,
   UiDraggable,
   UiDropdownWrapper,
   // widgets
   UiCopyToClipboard,
   // buttons
   UiButton,
   UiLinkButton,
   type ButtonTheme,
   type ButtonVariant,
   type ButtonSize,
};
