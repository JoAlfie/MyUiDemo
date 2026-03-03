<template>
   <div class="sn-alert" data-test="sn-alert" aria-live="polite" :class="[theme, size]">
      <UiIcon v-if="icon" :name="icon" :size="size" class="icon" />
      <div>
         <slot
            ><span>{{ message }}</span>
         </slot>
      </div>
   </div>
</template>

<script setup lang="ts">
import UiIcon, { type Icon } from "../UiIcon/UiIcon.vue";
import { THEMES as themeTypes, type Theme } from "../../types/themes.type.ts";

interface Props {
   message?: string;
   theme?: Theme;
   icon?: Icon;
   size?: "small" | "medium" | "large";
}

withDefaults(defineProps<Props>(), {
   theme: themeTypes.BRAND,
   size: "medium",
});
</script>

<style scoped lang="scss">
.sn-alert {
   display: flex;
   gap: var(--size-base-16);
   align-items: start;
   padding: var(--size-base-12) var(--size-base-20);
   text-align: start;
   border-radius: var(--border-radius-base);

   .icon {
      margin-top: var(--size-base-2);
   }

   &.small {
      gap: var(--size-base-16);
      padding: var(--size-base-8) var(--size-base-16);
      font-size: var(--size-text-small);
      line-height: var(--size-base-18);
   }

   &.large {
      gap: var(--size-base-24);
      padding: var(--size-base-16) var(--size-base-24);
      font-size: var(--size-heading-3);
      line-height: var(--size-base-28);
   }

   &.brand {
      color: var(--colour-brand-text);
      background-color: var(--colour-brand-background);
   }

   &.neutral {
      color: var(--colour-grey-text);
      background-color: var(--white);
      border: var(--border-width-base) solid var(--colour-border-accent);
   }

   &.info {
      color: var(--colour-info-text);
      background-color: var(--colour-info-background);
   }

   &.danger {
      color: var(--colour-danger-text);
      background-color: var(--colour-danger-background);
   }

   &.success {
      color: var(--colour-success-text);
      background-color: var(--colour-success-background);
   }

   &.warning {
      color: var(--colour-warning-text);
      background-color: var(--colour-warning-background);
   }

   :deep(.sn-icon) {
      display: flex;
   }
}
</style>
