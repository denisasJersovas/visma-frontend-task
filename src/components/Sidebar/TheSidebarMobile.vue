<template>
  <transition
    enter-active-class="transition-opacity ease-linear duration-200"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-opacity ease-linear duration-200"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <TheSidebarMobileOverlay
      v-show="props.isOpen"
      @click="$emit('close')"
    />
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
      tabindex="-1"
      class="fixed z-40 h-screen w-64 overflow-auto bg-white outline-none"
      @keydown.esc="$emit('close')"
    >
      <section
        class="sticky top-0 flex items-center bg-blue py-5 px-5 text-white lg:px-10"
      >
        <button
          class="mr-6 focus:outline-none"
          @click="$emit('close')"
        >
          <BaseIcon name="menu" />
        </button>
      </section>
      <SidebarContent />
    </aside>
  </transition>
</template>

<script setup lang="ts">
import { ref, nextTick, watchEffect } from "vue";
import BaseIcon from "../BaseUI/BaseIcon.vue";
import TheSidebarMobileOverlay from "./TheSidebarMobileOverlay.vue";
import SidebarContent from "./SidebarContent.vue";
const props = defineProps({
  isOpen: Boolean,
});
const mobileSidebar = ref(null) as any;

defineEmits(["close"]);

watchEffect(() => {
  if (props.isOpen) {
    nextTick(() => props.isOpen && mobileSidebar.value.focus());
  }
});
</script>
