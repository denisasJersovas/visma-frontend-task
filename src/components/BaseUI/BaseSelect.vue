<template>
  <div>
    <div
      class="flex h-12 w-full cursor-pointer items-center justify-between overflow-hidden rounded-md border border-light-gray bg-white px-3"
      tabindex="0"
      :class="{ 'border-gray': isShowOptions }"
      @click.stop="toggleOptions"
      @keydown.space="toggleOptions"
      @keydown.esc="hideOptions"
    >
      <div class="text-sm text-gray">
        {{ currentOption.name || label }}
      </div>
      <span
        class="up inline-block h-2 w-2 border-r-2 border-b-2 border-gray"
        :class="{ down: !isShowOptions, up: isShowOptions }"
      />
    </div>

    <ul
      v-show="isShowOptions"
      class="mt-2 rounded-md bg-white px-2 py-2"
    >
      <li
        v-for="(option, index) in optionsComputed"
        :key="`option${index}`"
        :ref="setOptionElementRef"
        class="flex cursor-pointer justify-between text-sm"
        :class="{
          'font-bold': option.name === currentOption.name,
        }"
        tabindex="0"
        @click="setOption(option)"
        @mouseover="focusAt(index)"
        @keydown.up="focusUp(index)"
        @keydown.down="focusDown(index)"
        @keydown.enter="setOption(option)"
        @keydown.esc="hideOptions"
      >
        <span class="mb-1">{{ option.name }}</span>
        <BaseIcon
          v-if="option.name === currentOption.name"
          class="h-4 w-4 cursor-pointer text-gray"
          name="x"
          @click.stop="removeOption"
        />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import {
  ref,
  computed,
  watch,
  onMounted,
  onBeforeUpdate,
  onBeforeUnmount,
} from "vue";
import BaseIcon from "@/components/BaseUI/BaseIcon.vue";
interface Option {
  value: string | number;
  name: string;
}
type OptionValue = string | number;
const isShowOptions = ref(false);
const currentOption = ref<Option>({ value: "", name: "" });
const optionElements = ref<HTMLElement[]>();
const props = defineProps<{
  modelValue: OptionValue;
  options: Option[] | OptionValue[];
  label?: string;
}>();
const emit = defineEmits(["update:modelValue"]);
const optionsComputed = computed(() => {
  return props.options.map((option: OptionValue | Option) => {
    if (typeof option === "string" || typeof option === "number")
      return { value: option, name: option.toString() };
    else return option;
  });
});
watch(currentOption, () => {
  if (currentOption.value) emit("update:modelValue", currentOption.value.value);
});
function hideOptions(): void {
  isShowOptions.value = false;
}
function toggleOptions(): void {
  isShowOptions.value = !isShowOptions.value;
  focusOnFirstOptionElement();
}
function setOption(option: Option): void {
  currentOption.value = option;
  hideOptions();
}
function removeOption(): void {
  currentOption.value = { value: "", name: "" };
  hideOptions();
}
function focusOnFirstOptionElement(): void {
  setTimeout(() => {
    if (optionElements.value?.length) optionElements.value[0].focus();
  }, 100);
}
function focusAt(index: number): void {
  if (optionElements.value) optionElements.value[index].focus();
}
function focusUp(index: number): void {
  if (index !== 0 && optionElements.value)
    optionElements.value[index - 1].focus();
}
function focusDown(index: number): void {
  if (optionElements.value && index !== optionElements.value.length - 1) {
    if (optionElements.value) optionElements.value[index + 1].focus();
  }
}
function setOptionElementRef(el: any) {
  if (optionElements.value && el) optionElements.value.push(el);
}
onBeforeUpdate(() => {
  optionElements.value = [];
});
onMounted(() => {
  setTimeout(() => {
    if (props.modelValue || props.modelValue === 0) {
      if (
        typeof props.options[0] === "string" ||
        typeof props.options[0] === "number"
      ) {
        currentOption.value = {
          value: props.modelValue,
          name: props.modelValue.toString(),
        };
      }
      if (typeof props.options[0] === "object") {
        currentOption.value = (props.options as Option[]).find(
          (option) => option.value === props.modelValue
        ) as Option;
      }
    }
  }, 100);
  document.addEventListener("click", hideOptions);
});
onBeforeUnmount(() => {
  document.removeEventListener("click", hideOptions);
});
const fieldType = "BaseSelect";
defineExpose({ fieldType });
</script>
