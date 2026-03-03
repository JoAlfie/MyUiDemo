<template>
   <button
      :class="[
         'button',
         props.variant,
         props.theme,
         props.size,
         { rounded: props.rounded, 'icon-only': props.isIconOnly },
      ]"
      :disabled="disabled"
      :type="type"
      @click="onClick"
   >
      <UiIcon v-if="iconBefore" :name="iconBefore" size="x-small" data-test="icon-before" />
      <slot />
      <UiIcon v-if="iconAfter" :name="iconAfter" size="x-small" data-test="icon-after" />
   </button>
</template>

<script setup lang="ts">
import UiIcon from "../../UiIcon/UiIcon.vue";
import { THEMES as themeTypes } from "../../../types/themes.type.ts";
import type { ButtonProps } from "../buttons.type.ts";
type ButtonType = "button" | "submit" | "reset";

// Props
interface Props extends ButtonProps {
   /** Button type attr */
   type?: ButtonType;
   disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
   variant: "filled",
   theme: themeTypes.BRAND,
   size: "medium",
   type: "button",
   isLoading: false,
   loadingStyle: "dna",
   disabled: false,
});

// Emits
interface Emits {
   /** Click event */
   (e: "click"): void;
}

const emit = defineEmits<Emits>();

// Methods
function onClick() {
   emit("click");
}
</script>

<style scoped lang="scss">
@forward "../styles/buttons";
</style>
