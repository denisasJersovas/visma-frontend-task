<template>
  <div
    class="flex items-center rounded-md border border-light-gray bg-white px-3 py-2 text-gray shadow-sm hover:border-gray"
    :class="[
      $attrs.class || 'mb-6 h-12',
      { 'bg-gray-200 pointer-events-none': items && items.length === 0 },
    ]"
  >
    <div class="relative w-full">
      <p class="flex cursor-pointer justify-between text-sm">
        <span class="mr-1"> {{ itemInitialValue }}</span>
        <span>
          <span
            v-if="typeof item === 'string' ? item.length > 0 : item"
            class="mr-3 text-black"
          >
            {{ item }}
          </span>
          <span
            class="up mb-1 inline-block h-2 w-2 border-r-2 border-b-2 border-gray"
            :class="{ down: !isOpen, up: isOpen }"
          />
        </span>
      </p>

      <ul
        v-if="isOpen"
        class="absolute -inset-x-[13px] z-50 max-h-[300px] overflow-auto rounded-md rounded-t-none border border-t-0 border-gray bg-white py-1 pt-2 shadow-sm"
      >
        <li
          v-for="i in items"
          :key="(i as any)"
          class="flex items-center justify-between text-sm hover:bg-light"
          :class="{ 'text-black ': item === i }"
        >
          <span
            class="w-full cursor-pointer pl-3"
            @click="$emit('choose-item', i)"
            >{{ i }}</span
          >
          <span
            v-if="item === i"
            class="inline-block pr-3 text-xs hover:cursor-pointer"
            @click="$emit('choose-item', '')"
            >&#10006;</span
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
defineEmits(["choose-item"]);
defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  item: {
    type: [String, Number],
    required: true,
  },
  items: {
    type: Array,
    required: true,
  },
  itemInitialValue: {
    type: String,
    required: true,
  },
});
</script>
