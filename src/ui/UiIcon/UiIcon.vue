<template>
   <svg
      :class="['icon', size, className]"
      :role="ariaLabel ? 'img' : 'presentation'"
      :aria-label="ariaLabel"
      :data-test="`icon-${name}`"
   >
      <use :href="`${icons}#${name}`" />
   </svg>
</template>
<script lang="ts">
export const iconList = [
   // tech icons
   "git-branch",
   // edit icons
   "divider",
   // Status Icons
   "checkmark-filled",
   "warning-triangle",
   "warning-triangle-filled",
   "warning-circle",
   "warning-circle-filled",
   "error-circle-filled",
   "info-circle-filled",
   // General UI Icons
   "at-symbol",
   "archive",
   "annotation",
   "bar-chart",
   "beaker",
   "bolt",
   "bookmark",
   "bookmark-add",
   "bookmark-check",
   "building-01",
   "building-08",
   "check",
   "check-circle",
   "comment",
   "copy",
   "copy-07",
   "columns",
   "cursor",
   "desktop",
   "dots-grid",
   "dots-horizontal",
   "dots-vertical",
   "download",
   "edit",
   "edit-02",
   "group",
   "expand",
   "filter-funnel",
   "filter-lines",
   "flow-chart-horizontal",
   "help-circle",
   "home",
   "horizontal-lines",
   "inbox",
   "info-circle",
   "layout-top",
   "link",
   "link-broken",
   "link-external",
   "lock",
   "menu",
   "minimise",
   "mail",
   "message",
   "message-question",
   "passcode",
   "pen",
   "phone",
   "printer",
   "search",
   "settings",
   "send",
   "share",
   "share-03",
   "trash",
   "target",
   "upload",
   "x-close",
   "sign-plus",
   "signout",
   "spinner",
   "text",
   // Finance & eCommerce
   "tag",
   // Maps & Travel
   "planet",
   "flag",
   "globe",
   "map",
   "marker-pin",
   "rocket",
   "truck",
   // Arrows
   "arrow-left",
   "chevron-left",
   "chevron-right",
   "chevron-down",
   "refresh",
   "arrow-narrow-up-right",
   "switch-vertical",
   // Users
   "user",
   "user-circle",
   "users",
   "users-check",
   "users-plus",
   "users-x",
   // Shapes
   "circle",
   "circle-check",
   "cube",
   "cube-outline",
   "hexagon",
   "star",
   "sparkle",
   "layout-grid",
   "signal",
   // Files
   "file",
   "file-lines",
   "file-check",
   "file-lock",
   "file-plus",
   "file-question",
   "file-chart",
   "folder",
   "clipboard",
   "clipboard-check",
   "clipboard-plus",
   // Packages
   "package-check",
   "package-plus",
   "package-search",
   "package-x",
   // Time
   "calendar",
   "clock",
   // Science & Health
   "activity-line",
   "atom",
   "eye",
   "eye-off",
   "heart",
   "microscope",
   "virus",
   "lab-outline",
] as const;

export type Icon = (typeof iconList)[number];

export const ICON_SIZES = ["x-small", "small", "medium", "large", "x-large"] as const;
export type IconSizes = (typeof ICON_SIZES)[number];

export interface Props {
   name: Icon;
   size?: IconSizes;
   className?: string;
   ariaLabel?: string;
}
</script>
<script setup lang="ts">
import icons from "../../assets/icons.svg";

withDefaults(defineProps<Props>(), {
   size: "small",
   showToolTip: false,
});
</script>

<style lang="scss" scoped>
.icon {
   flex-shrink: 0;
   color: currentcolor;
   fill: none;

   &.x-small {
      width: var(--size-base-12);
      height: var(--size-base-12);
   }

   &.small {
      width: var(--size-base-16);
      height: var(--size-base-16);
   }

   &.medium {
      width: var(--size-base-20);
      height: var(--size-base-20);
   }

   &.large {
      width: var(--size-base-24);
      height: var(--size-base-24);
   }

   &.x-large {
      width: var(--size-base-32);
      height: var(--size-base-32);
   }
}
</style>
