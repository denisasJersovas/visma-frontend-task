<!-- eslint-disable vue/no-v-html -->
<template>
  <svg
    :class="$attrs.class || 'h-6 w-6'"
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
    data-testid="base-icon"
    v-html="path"
  ></svg>
</template>

<script setup lang="ts">
import { ref } from "vue";
import icons from "@/icons";
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
});

// @ts-ignore: Unreachable code error
const path = ref(icons[props.name]);
</script>
