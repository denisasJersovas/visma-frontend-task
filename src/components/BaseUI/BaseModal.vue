<template>
  <div
    ref="modal"
    class="fixed inset-0 z-50 focus:outline-none flex justify-center items-start mx-auto"
    tabindex="-1"
    @keydown.esc="close"
  >
    <transition
      appear
      enter-active-class="ease-out duration-200"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="ease-in duration-100"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <BaseModalOverlay v-if="isOpen" @click="close" />
    </transition>
    <div
      v-if="isOpen"
      class="relative bg-white w-full sm:w-2/3 m-8 flex flex-col"
      style="max-height: calc(100vh - 64px)"
    >
      <div v-if="withCloseButton" class="p-2 text-right">
        <BaseModalButtonClose @click="close" />
      </div>
      <div class="p-6 overflow-auto">
        <slot />
      </div>
      <div v-if="$slots.footer" class="flex border-t border-light-gray p-2">
        <slot name="footer" :close="close" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import BaseModalOverlay from "./BaseModalOverlay.vue";
import BaseModalButtonClose from "./BaseModalButtonClose.vue";
const isOpen = ref(true);
const modal = ref(null);
defineProps({
  withCloseButton: Boolean,
});
const emit = defineEmits(["close"]);
onMounted(() => modal.value.focus());
function close() {
  isOpen.value = false;
  setTimeout(() => emit("close"), 100);
}
</script>
