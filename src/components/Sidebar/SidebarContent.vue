<template>
  <SidebarSection>
    <ul
      v-for="li in ulList"
      :key="li.url"
    >
      <SidebarNavItem
        :label="li.label"
        :icon="li.icon"
        :url="li.url"
      />
    </ul>
  </SidebarSection>
</template>

<script setup lang="ts">
import SidebarSection from "./SidebarSection.vue";
import SidebarNavItem from "./SidebarNavItem.vue";

const ulList = [
  { label: "New coach", icon: "plus", url: "/new-coach" },
  { label: "Coaches", icon: "userCircle", url: "/coaches-view" },
];
</script>
