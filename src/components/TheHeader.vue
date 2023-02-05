<template>
  <header
    class="flex w-full justify-between bg-blue py-5 px-5 text-white lg:px-10"
  >
    <div class="flex w-full items-center justify-between">
      <button
        class="mr-3 focus:outline-none sm:mr-6"
        @click="$emit('toggleSidebar')"
      >
        <BaseIcon name="menu" />
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import BaseIcon from "./BaseUI/BaseIcon.vue";
const isSmallScreen = ref(false);

defineEmits(["toggleSidebar"]);

onMounted(() => {
  onResize();
  window.addEventListener("resize", onResize);
});

function onResize() {
  if (window.innerWidth < 640) {
    isSmallScreen.value = true;
    return;
  }
  isSmallScreen.value = false;
}
</script>
