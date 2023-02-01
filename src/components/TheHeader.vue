<template>
  <header class="flex justify-between w-full bg-blue text-white py-5 px-5 lg:px-10">
    <div class="flex items-center justify-between w-full">
      <button @click="$emit('toggleSidebar')" class="mr-3 sm:mr-6 focus:outline-none">
        <BaseIcon name="menu" />
      </button>
    </div>
  </header>
</template>

<script setup>
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
