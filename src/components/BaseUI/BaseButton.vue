<template>
  <button
    type="button"
    class="rounded-md bg-blue px-3 text-sm font-medium tracking-wider text-white hover:opacity-50 focus:outline-none"
    :class="[
      $attrs.class,
      disabled ? 'cursor-not-allowed opacity-50' : 'opacity-100',
    ]"
    :disabled="disabled"
    @click="onClick"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    disabled: boolean;
  }>(),
  { disabled: false }
);
const emit = defineEmits(["click"]);
const onClick = (e: MouseEvent) => {
  if (props.disabled) {
    e.stopPropagation();
    return;
  }
  emit("click", e);
};
</script>
