<template>
  <li>
    <RouterLink class="flex items-center px-5 lg:px-10 py-2 lg:hover:text-gray" :to="url">
      <BaseIcon :name="icon" class="w-6 h-6 mr-6" />
      <span>{{ label }}</span>
    </RouterLink>
  </li>
</template>

<script setup>
import BaseIcon from "../BaseUI/BaseIcon.vue";
defineProps({
  label: String,
  icon: String,
  url: String,
});
</script>
