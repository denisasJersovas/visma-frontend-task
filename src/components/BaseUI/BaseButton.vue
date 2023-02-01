<template>
  <button
    class="bg-blue hover:opacity-50 rounded-md text-white text-sm font-medium tracking-wider px-3 focus:outline-none"
    :class="[$attrs.class, disabled ? 'opacity-50 cursor-not-allowed' : 'opacity-100']"
    :disabled="disabled"
    @click="emit('click')"
  >
    <slot />
  </button>
</template>

<script setup>
defineProps({
  disabled: {
    type: Boolean,
    required: false,
  },
});
const emit = defineEmits(["click"]);
</script>
