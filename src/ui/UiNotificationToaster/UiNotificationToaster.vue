<template>
   <div ref="popover" popover="manual" class="toaster">
      <TransitionGroup name="fade">
         <SnNotificationToast
            v-for="toast in toastStore.toasts"
            :id="toast.id"
            :key="toast.id"
            :text="toast.text"
            :theme="toast.theme"
            data-test="toast"
         />
      </TransitionGroup>
   </div>
</template>

<script setup lang="ts">
import SnNotificationToast from "./UiNotificationToast.vue";
import { useToastStore } from "../../stores/toasts/toastStore.ts";
import { ref, computed, watch } from "vue";

const toastStore = useToastStore();

const popover = ref<HTMLElement | null>(null);
const hasToasts = computed<boolean>(() => toastStore.toasts.length > 0);

watch(hasToasts, (nowHasToasts) => {
   if (nowHasToasts) {
      popover.value?.showPopover();
   } else {
      popover.value?.hidePopover();
   }
});
</script>

<style scoped lang="scss">
@use "../../assets/styles/breakpoints";

// includes reset for default [popover] styles
.toaster {
   position: fixed;
   inset: unset;
   inset-block-end: var(--size-base-16);
   inset-inline-end: var(--size-base-16);
   display: grid;
   grid-template-columns: 1fr;
   gap: var(--size-base-16);
   align-content: baseline;
   justify-items: end;
   padding: 0;
   overflow: visible;
   pointer-events: none;
   list-style: none;
   background-color: transparent;
   border: none;

   @include breakpoints.above(breakpoints.$breakpoint-medium) {
      inset-block-end: var(--size-base-24);
      inset-inline-end: var(--size-base-24);
   }
}

// Transition
.fade-move,
.fade-enter-active,
.fade-leave-active {
   transition: all 0.5s var(--easing-base);

   @media (prefers-reduced-motion) {
      transition: opacity 0.5s var(--easing-base);
   }
}

.fade-enter-from,
.fade-leave-to {
   opacity: 0;
   transform: translate(50px, 0);

   @media (prefers-reduced-motion) {
      transform: none;
   }
}
</style>
