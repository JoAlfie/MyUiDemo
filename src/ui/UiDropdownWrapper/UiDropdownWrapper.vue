<template>
   <div class="sn-dropdown" :class="styleType" ref="dropdownWrapper">
      <slot name="before" />

      <!-- Button to open the dropdown -->
      <button
         :id="triggerId"
         :class="[
            { 'trigger-btn': styleType !== dropdownStyle.NONE },
            styleType,
            { 'has-selection': highlightTrigger },
         ]"
         type="button"
         :disabled="disabled"
         :aria-expanded="isOpen"
         :aria-controls="groupId"
         :aria-describedby="describedById"
         @click.stop="toggleDropdown()"
         @keydown.shift.tab="toggleDropdown('close')"
         @keydown.down.prevent="toggleDropdown('open')"
         data-test="trigger-btn"
         ref="triggerBtn"
      >
         <UiIcon v-if="icon" :name="icon" size="small" class="display-icon" data-test="display-icon" />
         <div class="trigger-btn-content">
            <slot name="trigger" />
         </div>
         <UiIcon
            v-if="showCaret && !disabled"
            name="chevron-down"
            size="small"
            class="chevron-icon"
            :class="{ open: isOpen }"
            data-test="dropdown-trigger-caret"
         />
      </button>

      <!-- Dropdown panel -->
      <div
         v-if="isOpen"
         :id="groupId"
         role="group"
         :aria-labelledby="triggerId"
         class="group"
         :class="[groupClass, { open: isOpenAndStyled, 'auto-size': autoSize }]"
         :style="[`--static-width: ${initialWidth}; max-height: ${maxHeight}`]"
         data-test="group"
         ref="group"
         @keydown.esc="handleEscapeKey"
      >
         <slot name="panel" />
      </div>
   </div>
</template>
<script lang="ts">
// Type definitions
import type { Placement, Strategy } from "@floating-ui/dom";

export const dropdownStyle = {
   BUTTON: "button",
   FORM_CONTROL: "form-control",
   NONE: "custom",
} as const;

export type DropDownStyle = (typeof dropdownStyle)[keyof typeof dropdownStyle];

export interface DropdownProps {
   id: string;
   triggerId: string;
   icon?: Icon;
   styleType?: DropDownStyle;
   groupClass?: string | Record<string, boolean> | (string | Record<string, boolean>)[];
   highlightTrigger?: boolean;
   showCaret?: boolean;
   autoSize?: boolean; // automatically resize the dropdown to fit the viewport
   placement?: Placement; // top, bottom, left, right
   distance?: number; // distance from trigger element (px)
   strategy?: Strategy; // positioning strategy (absolute or fixed)
   flip?: boolean; // flip the dropdown to the opposite side if it doesn't fit
   maxWidth?: number; // max width of the dropdown (px) - will autosize to available width if not set
   width?: number; // static width of the dropdown (px)
   maxHeight?: number; // max height of the dropdown (px) - will scroll if content exceeds this height
   disabled?: boolean; // disable the dropdown
   describedById?: string; // when used in conjunction with a label & description, pass the id(s) of description elements
}

export type DropdownToggleAction = "close" | "open" | undefined;
</script>
<script setup lang="ts">
import { computed, nextTick, ref, useTemplateRef } from "vue";
import { onClickOutside } from "@vueuse/core";
import UiIcon, { type Icon } from "../UiIcon/UiIcon.vue";
import {
   computePosition,
   autoUpdate,
   flip as flipMiddlware,
   shift,
   offset,
   hide,
   size,
   type Middleware,
} from "@floating-ui/dom";

// Declarations
// ----------------------------------------------------------------------------
const groupRef = useTemplateRef("group");
const triggerBtnRef = useTemplateRef("triggerBtn");
const componentRef = useTemplateRef("dropdownWrapper");
const cleanupAutoUpdate = ref<(() => void) | null>(null); // wrapper to clean up autoUpdate

const isOpen = ref<boolean>(false);
const isOpenAndStyled = ref<boolean>(false);
const initialWidth = ref<string>("max-content");

// Props
const props = withDefaults(defineProps<DropdownProps>(), {
   styleType: "button",
   showCaret: true,
   autoSize: true,
   distance: 8,
   placement: "bottom",
   flip: true,
   disabled: false,
});

// Emits
// ----------------------------------------------------------------------------
const emit = defineEmits(["dropdown-blur"]);

// Computed
// ----------------------------------------------------------------------------
const groupId = computed(() => `${props.id}-group`);

// Lifecycle Hooks
// ----------------------------------------------------------------------------
onClickOutside(componentRef, () => {
   isOpen.value = false;
   emit("dropdown-blur");
});

// Methods
// ----------------------------------------------------------------------------
async function toggleDropdown(action?: DropdownToggleAction) {
   if (action === "close") {
      isOpen.value = false;
      // focus the trigger button (otherwise focus moves to body)
      triggerBtnRef.value?.focus();
   } else if (action === "open") {
      isOpen.value = true;
   } else {
      isOpen.value = !isOpen.value;
   }

   // wait for Vue update
   await nextTick();
   // handle styling rendering calculation
   if (isOpen.value) {
      await nextTick();
      // Set width
      initialWidth.value = returnGroupWidth();
      // Apply positioning
      await updatePosition();
      setupAutoUpdate();
      // Set as open and styled
      isOpenAndStyled.value = true;
   } else {
      isOpenAndStyled.value = false;
      emit("dropdown-blur");
   }
}

function handleEscapeKey() {
   isOpen.value = false;
   emit("dropdown-blur");
   triggerBtnRef.value?.focus();
}

// Set up automatic update of position
const setupAutoUpdate = () => {
   if (!triggerBtnRef.value || !groupRef.value || cleanupAutoUpdate.value) return;
   cleanupAutoUpdate.value = autoUpdate(triggerBtnRef.value, groupRef.value, updatePosition);
};

// Position the tooltip using Floating UI
const updatePosition = async () => {
   if (!triggerBtnRef.value || !groupRef.value) return;

   const middlewares: Middleware[] = [];

   // Add offset middleware
   middlewares.push(offset(props.distance));

   // Add shift & flip middleware
   if (props.flip) middlewares.push(flipMiddlware({ padding: 8 }));
   middlewares.push(shift({ padding: 8 }));

   // Hide the tooltip if the trigger is no longer visible
   middlewares.push(hide());

   if (props.autoSize) {
      middlewares.push(
         size({
            padding: 8,
            apply({ availableHeight, availableWidth, elements }) {
               const maxWidthGreaterThanAvailable = props.maxWidth && props.maxWidth > availableWidth;
               const minWidth = props.maxWidth || props.width ? 0 : "100%";

               // Only apply availableHeight if it's less than the maxHeight prop
               const effectiveMaxHeight = props.maxHeight
                  ? Math.min(props.maxHeight, Math.max(0, availableHeight))
                  : Math.max(0, availableHeight);

               // Apply height to occupy available space
               Object.assign(elements.floating.style, {
                  maxHeight: `${effectiveMaxHeight}px`,
                  width: `${props.width}px`,
                  maxWidth: `${Math.max(0, maxWidthGreaterThanAvailable ? availableWidth : props.maxWidth || availableWidth)}px`,
                  minWidth: minWidth,
               });
            },
         })
      );
   }

   // Compute the position
   const { x, y, placement } = await computePosition(triggerBtnRef.value, groupRef.value, {
      placement: props.placement, // Use placement with alignment
      strategy: props.strategy,
      middleware: middlewares,
   });

   // Apply the position to the tooltip
   if (groupRef.value)
      Object.assign(groupRef.value.style, {
         left: `${x}px`,
         top: `${y}px`,
      });

   // Set the data attribute for CSS styling
   if (groupRef.value) groupRef.value.setAttribute("data-placement", placement);
};

function returnGroupWidth(): string {
   if (props.maxWidth) return `${props.maxWidth}px`;
   const group = groupRef.value;
   if (!group) return "max-content";

   return `${group.offsetWidth}px`;
}

// Allow dropdown to be toggled from parent component
defineExpose({ toggleDropdown });
</script>

<style lang="scss" scoped>
.sn-dropdown {
   --group-spacing: var(--size-base-10);

   position: relative;
   display: inline-block;
   max-width: 100%;

   &.form-control {
      position: relative;
      display: block;
      width: 100%;
   }
}

.chevron-icon {
   margin-inline-start: auto;
   color: var(--grey-60);

   &.open {
      transform: rotate(180deg);
   }
}

.trigger-btn {
   display: flex;
   gap: var(--size-base-8);
   align-items: center;
   width: 100%;
   min-height: var(--size-base-40);
   padding: var(--size-base-2) var(--size-base-16);
   font-family: var(--base-font-family);
   font-size: var(--size-text-small);
   font-weight: var(--weight-light);
   color: var(--selects-accessible-gray);
   text-align: left;
   white-space: nowrap;
   cursor: pointer;
   background-color: var(--selects-light-background);
   border: var(--border-width-base) solid var(--selects-border);
   border-radius: var(--border-radius-8);

   &:hover {
      border-color: var(--selects-border-hover);
   }

   &:active {
      border-color: var(--selects-border-active);
   }

   &.button.has-selection {
      color: var(--selects-primary);
      background-color: var(--selects-primary-background);
      border-color: var(--selects-primary);

      .display-icon,
      .chevron-icon {
         color: var(--selects-primary);
      }
   }

   &:disabled {
      cursor: default;
      border-color: var(--selects-border);
   }
}

// override styling for using a custom component as the button content
.custom {
   padding: 0;
   cursor: pointer;
   background-color: transparent;
   border: none;

   &:disabled {
      cursor: default;
   }
}

.trigger-btn-content {
   display: flex;
   flex-grow: 1;
   flex-wrap: wrap;
   gap: var(--size-base-8);
   align-items: center;
   overflow: hidden;
}

// default content is inside slot in multi/single select dropdowns
:deep(.trigger-btn-text) {
   flex-grow: 1;
   overflow: hidden;
   text-overflow: ellipsis;
   white-space: nowrap;
}

.group {
   position: absolute;
   z-index: 1000;
   width: max-content;
   min-width: 100%;
   padding: var(--group-spacing);
   overflow-y: visible;
   font-family: var(--base-font-family);
   font-size: var(--size-text-small);
   font-weight: var(--weight-light);
   background-color: var(--selects-light-background);
   border: var(--border-width-base) solid var(--selects-border);
   border-radius: var(--border-radius-8);
   box-shadow: var(--box-shadow-base);
   opacity: 0; // starting opacity 0 to prevent jump if has to move alignment

   .form-control & {
      right: 0;
      left: 0;
   }

   &.open {
      opacity: 1;
   }

   &.auto-size {
      overflow-y: auto;
   }

   &.static-width {
      max-width: var(--static-width);
   }
}
</style>
