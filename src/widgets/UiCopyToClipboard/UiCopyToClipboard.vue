<template>
   <div class="wrapper">
      <span aria-live="polite" data-test="notification-wrapper">
         <slot v-if="showCopyNotification" />
      </span>
      <button
         v-if="!showCopyNotification"
         @click.stop="copyToClipboard"
         :class="['copy-button', buttonClass]"
         data-test="copy-button"
         :aria-label="$slots.button ? undefined : ariaLabel"
      >
         <slot name="button">
            <UiIcon name="copy-07" />
         </slot>
      </button>
   </div>
</template>

<script setup lang="ts">
import UiIcon from "../../ui/UiIcon/UiIcon.vue";
import { ref } from "vue";

interface Props {
   ariaLabel: string;
   copyValue: string;
   buttonClass?: string;
}

const props = defineProps<Props>();

const showCopyNotification = ref<boolean>(false);

function copyToClipboard() {
   showCopyNotification.value = true;

   navigator.clipboard.writeText(props.copyValue).then(() => {
      setTimeout(() => {
         showCopyNotification.value = false;
      }, 3000);
   });
}
</script>

<style lang="scss" scoped>
.wrapper {
   display: flex;
   align-items: center;
   justify-content: center;
   width: max-content;
}

.copy-button {
   padding: 0;
   font-family: inherit;
   font-size: inherit;
   cursor: pointer;
   background-color: transparent;
   border: none;
}
</style>
