<template>
   <div>
      <!-- Screen reader status updates -->
      <div role="status" aria-live="polite" class="visually-hidden">
         {{ statusMessage }}
      </div>

      <VueDraggableNext
         v-model="items"
         tag="ul"
         :disabled="disabled"
         handle="[data-drag-handle]"
         data-draggable-list
         :class="containerClass"
         @change="handleDragChange"
         @start="handleDragStart"
         @end="handleDragEnd"
      >
         <li v-for="(item, index) in items" :key="getItemKey(item, index)" data-draggable-item>
            <button
               data-drag-handle
               :disabled="disabled"
               :aria-label="`${props.getItemLabel(item)}: ${dragHandleLabel}`"
               data-test="drag-handle"
               :data-drag-handle-id="getItemKey(item, index)"
               @keyup="handleKeyup($event, item, index)"
            >
               <slot name="drag-handle"><UiIcon name="menu" /></slot>
            </button>

            <slot name="content" :item="item" :index="index">
               <div>{{ item.name || item.label || `${itemLabel} ${index + 1}` }}</div>
            </slot>
         </li>
      </VueDraggableNext>
   </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick } from "vue";
import { VueDraggableNext } from "vue-draggable-next";
import UiIcon from "../UiIcon/UiIcon.vue";

// Types
interface DragContext {
   draggedContext?: {
      element?: any;
      index: number;
      futureIndex: number;
   };
}

// Props
interface Props {
   disabled?: boolean;
   containerClass?: string;
   itemKey?: string | ((item: any, index: number) => string);
   getItemLabel?: (item: any) => string;
   dragHandleLabel?: string;
   untitledLabel?: string;
   itemLabel?: string;
   cannotMoveMessage?: string;
   movedToPositionMessage?: string;
}

const props = withDefaults(defineProps<Props>(), {
   disabled: false,
   containerClass: "",
   itemKey: "id",
   getItemLabel: (item: any) => item.label || item.name || "Item",
   dragHandleLabel: "Use the up/down arrows to change order",
   untitledLabel: "Untitled",
   itemLabel: "Item",
   cannotMoveMessage: "Cannot move item outside the list bounds",
   movedToPositionMessage: "moved to position",
});

// Define model
const items = defineModel<any[]>({ default: () => [] });

// Emits
const emit = defineEmits<{
   change: [context: DragContext];
   "keyboard-move": [context: DragContext];
}>();

// Reactive data
const isDragging = ref(false);
const statusMessage = ref("");

// Computed
const getItemKey = computed(() => {
   if (typeof props.itemKey === "function") {
      return props.itemKey;
   }
   return (item: any) => item[props.itemKey as string] || item.id;
});

// Methods
function handleDragChange(context: DragContext) {
   if (!context) {
      return;
   }
   emit("change", context);
   updateStatusMessage(context);
}

function handleDragStart() {
   isDragging.value = true;
}

function handleDragEnd() {
   isDragging.value = false;
}

function handleKeyboardMove(context: DragContext) {
   if (!context?.draggedContext) {
      return;
   }

   const { draggedContext } = context;
   const { index, futureIndex } = draggedContext;

   // Validate the move
   if (!isValidMove(index, futureIndex)) {
      statusMessage.value = props.cannotMoveMessage;
      return;
   }

   // Don't perform unnecessary operations if moving to same position
   if (index === futureIndex) {
      return;
   }

   // Perform the move
   const currentItems = [...items.value];
   const itemToMove = currentItems.splice(index, 1)[0];
   currentItems.splice(futureIndex, 0, itemToMove);
   items.value = currentItems;

   // Keep focus on the same element
   nextTick(() => {
      const itemKey = getItemKey.value(draggedContext.element, 0);
      const dragHandle = document.querySelector(`[data-drag-handle-id="${itemKey}"]`) as HTMLButtonElement;

      if (dragHandle) {
         dragHandle.focus();
      }
   });

   // Update status message
   const itemLabel = props.getItemLabel(draggedContext.element);
   statusMessage.value = `${itemLabel} ${props.movedToPositionMessage} ${futureIndex + 1}`;

   // Emit keyboard move event
   emit("keyboard-move", context);
}

function isValidMove(fromIndex: number, toIndex: number): boolean {
   return fromIndex >= 0 && fromIndex < items.value.length && toIndex >= 0 && toIndex < items.value.length;
}

function updateStatusMessage(context: DragContext) {
   if (!context?.draggedContext) {
      return;
   }

   const { draggedContext } = context;
   const element = draggedContext.element || items.value[draggedContext.index];

   if (!element) {
      return;
   }

   const itemLabel = props.getItemLabel(element);
   statusMessage.value = `${itemLabel} ${props.movedToPositionMessage} ${draggedContext.futureIndex + 1}`;
}

function handleKeyup(event: KeyboardEvent, item: any, index: number) {
   if (props.disabled) return;

   event.preventDefault();

   let futureIndex = index;
   if (event.key === "ArrowDown") {
      futureIndex = index + 1;
   } else if (event.key === "ArrowUp") {
      futureIndex = index - 1;
   } else {
      return;
   }

   handleKeyboardMove({
      draggedContext: {
         element: item,
         index,
         futureIndex,
      },
   });
}

// Expose methods for parent components
defineExpose({
   handleKeyboardMove,
   getItemKey,
   updateStatusMessage,
   statusMessage,
   isDragging,
});
</script>

<style scoped lang="scss">
[data-draggable-list] {
   display: flex;
   flex-direction: column;
   gap: var(--size-base-6);
   padding: 0;
   margin: 0;
   list-style: none;
}

[data-draggable-item] {
   display: flex;
   padding: var(--size-base-4);
   background-color: var(--colour-background-base);
   border-radius: var(--border-radius-8);
}

[data-drag-handle] {
   flex-shrink: 0;
   padding: var(--size-base-8);
   margin-inline-end: var(--size-base-8);
   cursor: grab;
   background: transparent;
   border: 0;
   border-radius: var(--border-radius-4);

   &:active {
      cursor: grabbing;
   }

   &:disabled {
      cursor: not-allowed;
      opacity: 0.8;
   }
}

/* Dragging states */
:deep(.sortable-ghost) {
   opacity: 0.5;
}

:deep(.sortable-chosen) {
   box-shadow: var(--box-shadow-base);
   transform: scale(1.05);
}

:deep(.sortable-drag) {
   box-shadow: var(--box-shadow-soft);
}
</style>
