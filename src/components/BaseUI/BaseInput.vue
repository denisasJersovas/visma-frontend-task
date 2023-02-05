<template>
  <div class="relative w-full">
    <label class="absolute left-0 top-0.5 px-3 text-xs text-gray">
      {{ modelValue || focused ? label : "" }}
    </label>
    <input
      class="flex h-12 w-full rounded-md border border-light-gray px-3 pt-1 text-sm hover:border-gray"
      :class="
        ($attrs.class, { 'placeholder-transparent': modelValue || focused })
      "
      :value="modelValue"
      :type="type"
      :placeholder="label"
      :readonly="readonly ? true : false"
      :disabled="disabled"
      @input="emitValue(($event.target as HTMLInputElement).value)"
      @blur="setFocus(false)"
      @focus="setFocus(true)"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const focused = ref(false);

defineProps({
  modelValue: {
    type: [String, Number],
    default: "",
    required: false,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: "text",
    required: false,
  },
  label: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
    required: false,
  },
});

const emit = defineEmits(["update:modelValue", "change-state"]);
function emitValue(inputValue: string): void {
  emit("update:modelValue", inputValue);
}

function setFocus(payload: boolean) {
  focused.value = payload;
}
const fieldType = "BaseInput";
defineExpose({ fieldType });
</script>
