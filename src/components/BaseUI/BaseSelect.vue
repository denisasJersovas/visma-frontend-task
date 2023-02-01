<template>
  <div
    class="border px-3 py-2 bg-white border-light-gray shadow-sm text-gray rounded-md flex items-center hover:border-gray"
    :class="[$attrs.class || 'h-12 mb-6', { 'bg-gray-200 pointer-events-none': items.length === 0 }]"
  >
    <div class="relative w-full">
      <p class="cursor-pointer flex justify-between text-sm">
        <span class="mr-1"> {{ itemInitialValue }}</span>
        <span>
          <span class="mr-3 text-black" v-if="typeof item === 'string' ? item.length > 0 : item">
            {{ item }}
          </span>
          <span
            class="inline-block border-gray border-r-2 border-b-2 mb-1 up w-2 h-2"
            :class="{ down: !isOpen, up: isOpen }"
          ></span>
        </span>
      </p>

      <ul
        class="pt-2 absolute -inset-x-[13px] bg-white py-1 max-h-[300px] overflow-auto z-50 shadow-sm border border-t-0 border-gray rounded-md rounded-t-none"
        v-if="isOpen"
      >
        <li
          v-for="i in items"
          :key="i"
          class="flex items-center justify-between hover:bg-light text-sm"
          :class="{ 'text-black ': item === i }"
        >
          <span class="cursor-pointer w-full pl-3" @click="$emit('choose-item', i)">{{ i }}</span>
          <span
            @click="$emit('choose-item', '')"
            class="inline-block text-xs hover:cursor-pointer pr-3"
            v-if="item === i"
            >&#10006;</span
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
defineProps({
  isOpen: Boolean,
  item: [String, Number],
  items: Array,
  itemInitialValue: String,
});
</script>
