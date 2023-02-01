<template>
  <div class="relative w-full">
    <label class="absolute text-xs left-0 top-0.5 px-3 text-gray">
      {{ modelValue || focused ? label : "" }}
    </label>
    <input
      class="w-full text-sm h-12 px-3 pt-1 rounded-md border border-light-gray flex hover:border-gray"
      :class="($attrs.class, { 'placeholder-transparent': modelValue || focused })"
      :value="modelValue"
      :type="type"
      @input="emitValue($event.target.value)"
      :placeholder="label"
      :readonly="readonly ? true : false"
      ref="input"
      @blur="setFocus(false)"
      @focus="setFocus(true)"
      :disabled="disabled"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
const input = ref();
const focused = ref(false);

const props = defineProps({
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
    required: false,
  },
  disabled: {
    type: Boolean,
    default: false,
    required: false,
  },
});

const emit = defineEmits(["update:modelValue", "change-state"]);
function emitValue(inputValue) {
  emit("update:modelValue", inputValue);
}

function setFocus(payload) {
  focused.value = payload;
}
const fieldType = "BaseInput";
defineExpose({ fieldType });
</script>
