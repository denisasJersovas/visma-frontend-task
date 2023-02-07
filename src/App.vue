<template>
  <main class="bg-light">
    <TheHeader
      class="fixed z-30 w-full"
      @toggle-sidebar="toggleSidebar"
    />
    <TheSidebar v-if="isSidebarOpen" />
    <TheSidebarMobile
      :is-open="isMobileSidebarOpen"
      @close="closeMobileSidebar"
    />
    <div class="min-h-screen w-screen pt-20 pb-10">
      <RouterView :class="{ 'sm:ml-64': isSidebarOpen }" />
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted, watchEffect } from "vue";
import TheHeader from "@/components/TheHeader.vue";
import TheSidebar from "@/components/Sidebar/TheSidebar.vue";
import TheSidebarMobile from "@/components/Sidebar/TheSidebarMobile.vue";
import { useRoute } from "vue-router";

import { useCoachStore } from "@/stores/coach";
const store = useCoachStore();

const route = useRoute();
const isMobileSidebarOpen = ref(false);
const isSidebarOpen = ref(true);
watchEffect(() => {
  if (route?.path) {
    isMobileSidebarOpen.value = false;
  }
});
onMounted(() => {
  onResize();
  window.addEventListener("resize", onResize);
  const storageCoachList = localStorage.getItem("coachList");
  const storageCoachNodeList = localStorage.getItem("coachNodeList");

  storageCoachList
    ? (store.coachList = JSON.parse(storageCoachList))
    : localStorage.setItem("coachList", JSON.stringify(store.coachList));
  storageCoachNodeList
    ? (store.coachNodeList = JSON.parse(storageCoachNodeList))
    : localStorage.setItem(
        "coachNodeList",
        JSON.stringify(store.coachNodeList)
      );
});

function onResize() {
  if (window.innerWidth >= 1024) {
    isMobileSidebarOpen.value = false;
    isSidebarOpen.value = true;
  } else {
    isSidebarOpen.value = false;
  }
}
function toggleSidebar() {
  if (window.innerWidth >= 1024) {
    isSidebarOpen.value = !isSidebarOpen.value;
  } else {
    openMobileSidebar();
  }
}
function openMobileSidebar() {
  isMobileSidebarOpen.value = true;
}
function closeMobileSidebar() {
  isMobileSidebarOpen.value = false;
}
</script>
