<template>
   <section class="collapsible-section" :class="{ bordered: bordered, dark: darkMode }" :data-theme="theme">
      <button
         :id="`${id}-heading`"
         class="collapsible-section-toggle"
         :aria-expanded="isOpen"
         :aria-controls="`${id}-content`"
         data-test="button"
         @click="toggleCollapse"
      >
         <!-- Space for Icon -->
         <slot name="icon" />

         <!-- Title -->
         <component :is="headingLevel" class="section-title" data-test="title">{{ title }}</component>

         <!-- Space for e.g. pill after title -->
         <slot name="after-title"></slot>

         <!-- Chevron -->
         <UiIcon name="chevron-down" class="chevron" :class="{ open: isOpen }" size="large" />
      </button>

      <!-- Content -->
      <div
         v-show="isOpen || smoothTransition"
         ref="contentRef"
         :id="`${id}-content`"
         data-test="content"
         class="collapsible-section-content"
         aria-role="region"
         :aria-labelledby="`${id}-heading`"
         :style="{
            height: smoothTransition ? contentHeight : 'auto',
         }"
      >
         <div class="collapsible-section-content-inner">
            <slot />
         </div>
      </div>
   </section>
</template>
<script setup lang="ts">
import UiIcon from "../UiIcon/UiIcon.vue";
import { ref, computed, nextTick } from "vue";
import { type ColourTheme } from "../../types/themes.type.ts";

// Declarations
// ------------------------------

export interface Props {
   title: string;
   /** HTML element the container will be rendered as */
   headingLevel?: "h2" | "h3" | "h4";
   bordered?: boolean;
   openByDefault?: boolean;
   smoothTransition?: boolean;
   /** Background color theme for rich text theming */
   theme?: ColourTheme;
   /** Dark mode variant */
   darkMode?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
   headingLevel: "h3",
   bordered: false,
   openByDefault: true,
   smoothTransition: false,
});

// State
const isOpen = ref<boolean>(props.openByDefault);
const contentHeight = ref<string>(props.openByDefault ? "auto" : "0px");
const contentRef = ref<HTMLElement | null>(null);

// Computed
// ------------------------------
const id = computed<string>(() => `collapsible-section-${props.title.toLowerCase().replace(/\s/g, "-")}`);

const theme = computed<ColourTheme | undefined>(() => {
   return props.theme || undefined;
});

// Methods
// ------------------------------
async function toggleCollapse() {
   if (!contentRef.value) return;
   isOpen.value = !isOpen.value;
   if (!props.smoothTransition) return;

   await nextTick();

   // Get the natural height of the content
   const naturalHeight = contentRef.value.scrollHeight;

   // If opening
   if (isOpen.value) {
      // Animate from 0px to natural height
      contentHeight.value = "0px";

      await nextTick();

      // Force reflow
      void contentRef.value.offsetHeight;
      contentHeight.value = `${naturalHeight}px`;

      // After height is reached, then set height:auto for auto-sizing
      setTimeout(() => {
         contentHeight.value = "auto";
      }, 300); // This matches the css transition duration
   } else {
      // If closing, set current height to animate from
      contentHeight.value = `${naturalHeight}px`;

      await nextTick();

      // Force reflow
      void contentRef.value.offsetHeight;

      // Animate the height to 0px
      contentHeight.value = "0px";
   }
}
</script>

<style lang="scss" scoped>
@use "../../assets/styles/theme-mixins.scss" as theme;

.collapsible-section {
   background-color: var(--white);
   border-radius: var(--border-radius-16);

   &.bordered {
      border: 1px solid var(--colour-border-accent);
   }

   // Apply rich text theming
   @include theme.generate-theme-styles("&");
}

.collapsible-section-toggle {
   display: flex;
   gap: var(--size-base-16);
   align-items: center;
   width: 100%;
   padding: var(--size-base-24);
   color: inherit;
   text-align: left;
   appearance: none;
   cursor: pointer;
   background-color: transparent;
   border: none;

   & > * {
      pointer-events: none;
   }
}

.collapsible-section-content {
   overflow: hidden;
   transition: height 0.3s ease-in-out;

   // Inner div for padding without affecting the transition
   .collapsible-section-content-inner {
      padding: var(--size-base-24);
      padding-block-start: 0;
   }
}

.chevron {
   margin-inline-start: auto;
   transition: transform 0.3s ease-in-out;

   &.open {
      transform: rotate(180deg);
   }
}

.section-title {
   margin: 0;
   font-size: var(--size-heading-3);
   line-height: 1.75rem;
}
</style>
