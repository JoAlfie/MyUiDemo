<template>
   <span class="pill" :class="[size, `rounded-${rounded}`, { capitalise: capitaliseValue }, theme]">
      <slot>
         <span v-if="dotTheme" :class="`dot-${dotTheme}`" data-test="pill-dot">{{ text }}</span>
         <template v-else>{{ text }}</template>
      </slot>
   </span>
</template>

<script setup lang="ts">
import { COLOUR_THEMES as colours, type ColourTheme } from "../../types/themes.type.ts";
export type Sizes = "small" | "medium";
export type PillTheme = ColourTheme | "purple-reversed" | "brand-reversed";
export type DotTheme = ColourTheme;
export type PillRounding = "small" | "medium" | "full";

interface Props {
   text?: string;
   size?: Sizes;
   capitaliseValue?: boolean;
   theme?: PillTheme;
   dotTheme?: DotTheme;
   rounded?: PillRounding;
}

withDefaults(defineProps<Props>(), {
   size: "medium",
   theme: colours.NEUTRAL,
   rounded: "full",
});
</script>
