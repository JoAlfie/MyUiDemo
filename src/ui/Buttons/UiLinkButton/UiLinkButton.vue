<template>
   <component
      :is="componentType"
      v-bind="componentProps"
      :class="[
         'button',
         props.variant,
         props.theme,
         props.size,
         { rounded: props.rounded, 'icon-only': props.isIconOnly },
      ]"
      :data-test="dataTest"
   >
      <UiIcon v-if="iconBefore" :name="iconBefore" size="x-small" data-test="icon-before" />
      <slot />
      <UiIcon v-if="iconAfter" :name="iconAfter" size="x-small" data-test="icon-after" />
   </component>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { RouterLink, useRouter } from "vue-router";
import UiIcon from "../../UiIcon/UiIcon.vue";
import { THEMES as themeTypes } from "../../../types/themes.type.ts";
import type { ButtonProps } from "../buttons.type.ts";

export interface Props extends ButtonProps {
   /** Router location or external link */
   to: string;
   target?: "_blank" | "_self" | "_parent" | "_top";
}

const props = withDefaults(defineProps<Props>(), {
   variant: "filled",
   theme: themeTypes.BRAND,
   size: "medium",
});

const router = useRouter();

const isExternal = computed(() => {
   return typeof props.to === "string" && /^(https?:|\/\/)/.test(props.to);
});

const isNewTab = computed(() => props.target === "_blank");

const componentType = computed(() => {
   // Always use <a> for external or new tab, otherwise RouterLink
   // The reason is router link not respecting the target attribute
   return isExternal.value || isNewTab.value ? "a" : RouterLink;
});

const resolvedHref = computed(() => {
   if (isExternal.value) return props.to;
   return router.resolve(props.to).href;
});

const componentProps = computed(() => {
   if (componentType.value === "a") {
      return {
         href: resolvedHref.value,
         target: props.target || "_blank",
         rel: !props.target || props.target === "_blank" ? "noopener noreferrer" : undefined,
      };
   } else {
      return {
         to: props.to,
      };
   }
});

const dataTest = computed(() => {
   if (isExternal.value) return "external-link";
   if (isNewTab.value) return "internal-link";
   return "router-link";
});
</script>

<style scoped lang="scss">
@forward "../styles/buttons";
</style>
