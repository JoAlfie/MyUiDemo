<!-- <output> should handle screenreader announcements for most cases, voiceover for mac required role=alert -->
<template>
   <output :id="id" class="toast" :class="theme" role="alert">
      <UiIcon v-if="icon" :name="icon" data-test="icon" size="small" />
      {{ text }}
   </output>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { type Toast } from "../../stores/toasts/toastStore.ts";
import UiIcon, { type Icon } from "../UiIcon/UiIcon.vue";

const props = defineProps<Toast>();

const icon = computed<Icon | null>(() => {
   switch (props.theme) {
      case "info":
         return "info-circle-filled";
      case "success":
         return "checkmark-filled";
      case "danger":
         return "warning-circle-filled";
      case "warning":
         return "warning-triangle-filled";
      default:
         return null;
   }
});
</script>

<style scoped lang="scss">
.toast {
   display: flex;
   gap: var(--size-base-8);
   align-items: center;
   min-width: 20rem;
   padding: var(--size-base-24) var(--size-base-20);
   font-size: var(--size-text-base);
   line-height: 1;
   color: color-mix(in srgb, var(--notification-background-colour) 5%, white);
   background-color: var(--notification-background-colour);
   border-radius: var(--border-radius-8);
   box-shadow: var(--box-shadow-base);

   &.info {
      --notification-background-colour: var(--colour-info-default);
   }

   &.warning {
      --notification-background-colour: var(--colour-warning-default);
   }

   &.danger {
      --notification-background-colour: var(--colour-danger-default);
   }

   &.success {
      --notification-background-colour: var(--colour-success-default);
   }
}
</style>
