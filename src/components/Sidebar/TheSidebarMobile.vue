<template>
  <transition
    enter-active-class="transition-opacity ease-linear duration-200"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-opacity ease-linear duration-200"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <TheSidebarMobileOverlay @click="$emit('close')" v-show="props.isOpen" />
  </transition>
  <transition
    enter-active-class="transition ease-in-out duration-200 transform"
    enter-from-class="-translate-x-full"
    enter-to-class="translate-x-0"
    leave-active-class="transition ease-in-out duration-200 transform"
    leave-from-class="translate-x-0"
    leave-to-class="-translate-x-full"
  >
    <aside
      v-show="props.isOpen"
      ref="mobileSidebar"
      @keydown.esc="$emit('close')"
      tabindex="-1"
      class="w-64 h-screen overflow-auto bg-white fixed z-40 outline-none"
    >
      <section class="flex items-center py-5 px-5 lg:px-10 sticky top-0 bg-blue text-white">
        <button @click="$emit('close')" class="mr-6 focus:outline-none">
          <BaseIcon name="menu" />
        </button>
      </section>
      <SidebarContent />
    </aside>
  </transition>
</template>

<script setup>
import { ref, nextTick, watchEffect } from "vue";
import BaseIcon from "../BaseUI/BaseIcon.vue";
import TheSidebarMobileOverlay from "./TheSidebarMobileOverlay.vue";
import SidebarContent from "./SidebarContent.vue";
const props = defineProps({
  isOpen: Boolean,
});
const mobileSidebar = ref(null);

defineEmits(["close"]);

watchEffect(() => {
  if (props.isOpen) {
    nextTick(() => props.isOpen && mobileSidebar.value.focus());
  }
});
</script>
