<template>
  <li>
    <RouterLink
      class="flex items-center px-5 py-2 lg:px-10 lg:hover:text-gray"
      :to="url"
    >
      <BaseIcon
        :name="icon"
        class="mr-6 h-6 w-6"
      />
      <span>{{ label }}</span>
    </RouterLink>
  </li>
</template>

<script setup lang="ts">
import BaseIcon from "../BaseUI/BaseIcon.vue";
defineProps({
  label: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
});
</script>
