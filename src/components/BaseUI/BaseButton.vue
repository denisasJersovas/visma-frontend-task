<template>
  <button
    class="rounded-md bg-blue px-3 text-sm font-medium tracking-wider text-white hover:opacity-50 focus:outline-none"
    :class="[
      $attrs.class,
      disabled ? 'cursor-not-allowed opacity-50' : 'opacity-100',
    ]"
    :disabled="disabled"
    @click="emit('click')"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
defineProps({
  disabled: {
    type: Boolean,
    required: false,
  },
});
const emit = defineEmits(["click"]);
</script>
