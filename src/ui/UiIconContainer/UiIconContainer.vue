<template>
   <span class="icon-container" :class="[theme, size, shape, borderClass]"><UiIcon :name="icon" :size="size" /></span>
</template>

<script lang="ts">
import { type Icon, type IconSizes } from "../UiIcon/UiIcon.vue";
import { COLOUR_THEMES as colours, type ColourTheme } from "../../types/themes.type.ts";

export const ICON_CONTAINER_THEMES = Object.values(colours);
export type IconContainerTheme = ColourTheme | "purple-reversed";

export const ICON_CONTAINER_SHAPES = ["circle", "square"] as const;
export type IconContainerShape = (typeof ICON_CONTAINER_SHAPES)[number];

export const ICON_CONTAINER_BORDERS = ["none", "dashed", "solid"] as const;
export type IconContainerBorder = (typeof ICON_CONTAINER_BORDERS)[number];

export interface UiIconContainerProps {
   icon: Icon;
   theme?: IconContainerTheme;
   size?: IconSizes;
   shape?: IconContainerShape;
   border?: IconContainerBorder;
}
</script>

<script setup lang="ts">
import { computed } from "vue";
import UiIcon from "../UiIcon/UiIcon.vue";

const props = withDefaults(defineProps<UiIconContainerProps>(), {
   theme: colours.NEUTRAL,
   size: "medium",
   shape: "circle",
   border: "none",
});

const borderClass = computed<string>(() => (props.border === "none" ? "" : props.border));
</script>

<style lang="scss" scoped>
.icon-container {
   display: inline-flex;
   align-items: center;
   justify-content: center;
   padding: var(--size-base-16);
   color: var(--icon-container-foreground);
   background-color: var(--icon-container-background);

   // Shape variants
   &.circle {
      border-radius: var(--border-radius-full);
   }

   &.square {
      border-radius: var(--border-radius-4);
   }

   // Size themes
   &.x-small {
      padding: var(--size-base-8);
   }

   &.small {
      padding: var(--size-base-10);
   }

   &.medium {
      padding: var(--size-base-12);
   }

   &.large {
      padding: var(--size-base-16);
   }

   &.x-large {
      padding: var(--size-base-20);
   }

   // Border options
   &.dashed {
      border: 1px dashed currentcolor;
   }

   &.solid {
      border: 1px solid currentcolor;
   }

   // Colour themes
   &.green {
      --icon-container-foreground: var(--green-60);
      --icon-container-background: var(--green-10);
   }

   &.red {
      --icon-container-foreground: var(--red-60);
      --icon-container-background: var(--red-10);
   }

   &.brand {
      --icon-container-foreground: var(--brand-60);
      --icon-container-background: var(--brand-10);
   }

   &.blue {
      --icon-container-foreground: var(--blue-80);
      --icon-container-background: var(--blue-20);
   }

   &.orange {
      --icon-container-foreground: var(--yellow-80);
      --icon-container-background: var(--yellow-20);
   }

   &.purple {
      --icon-container-foreground: var(--purple-60);
      --icon-container-background: var(--purple-10);
   }

   &.purple-reversed {
      --icon-container-foreground: var(--purple-10);
      --icon-container-background: var(--purple-80);
   }

   &.pink {
      --icon-container-foreground: var(--pink-70);
      --icon-container-background: var(--pink-10);
   }

   &.sand {
      --icon-container-foreground: var(--sand-70);
      --icon-container-background: var(--sand-10);
   }

   &.neutral {
      --icon-container-foreground: var(--purple-80);
      --icon-container-background: var(--grey-10);
   }

   &.tan {
      --icon-container-foreground: var(--tan-70);
      --icon-container-background: var(--tan-10);
   }
}
</style>
