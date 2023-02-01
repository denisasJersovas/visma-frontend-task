<template>
  <ul class="flex items-center px-10 py-2">
    <p class="border">
      <span class="mr-5">{{ node.coach.fullName }}</span> <span class="mr-5">{{ node.coach.email }} </span>
      {{ parent }}
    </p>
    <BaseIcon
      class="cursor-pointer h-5 w-5 mx-2"
      v-if="owner.child.length > 0"
      @click.stop="$emit('open-delete-modal', node.coach.fullName)"
      name="x"
    />
    <BaseIcon
      class="cursor-pointer h-5 w-5 mr-2"
      v-if="parent === owner.coach.fullName && currentIndex === 0 && maxIndex >= 1"
      @click.stop="
        $emit('change-position', { fullName: node.coach.fullName, index: currentIndex, goTo: currentIndex + 1 })
      "
      name="arrowDown"
    />
    <BaseIcon
      v-if="parent === owner.coach.fullName && currentIndex > 0 && currentIndex < maxIndex"
      class="cursor-pointer h-5 w-5 mr-2"
      @click.stop="
        $emit('change-position', { fullName: node.coach.fullName, index: currentIndex, goTo: currentIndex + 1 })
      "
      name="arrowDown"
    />
    <BaseIcon
      v-if="parent === owner.coach.fullName && currentIndex > 0 && currentIndex < maxIndex"
      class="cursor-pointer h-5 w-5"
      @click.stop="
        $emit('change-position', { fullName: node.coach.fullName, index: currentIndex, goTo: currentIndex - 1 })
      "
      name="arrowUp"
    />

    <BaseIcon
      class="cursor-pointer h-5 w-5"
      v-if="parent === owner.coach.fullName && currentIndex === maxIndex && maxIndex >= 1"
      @click.stop="
        $emit('change-position', { fullName: node.coach.fullName, index: currentIndex, goTo: currentIndex - 1 })
      "
      name="arrowUp"
    />
  </ul>
  <template v-if="hasChild">
    <ul class="ml-20 pl-20" v-for="(c, index) in node.child" :key="c.coach.fullName">
      <li>
        <BaseTree
          :node="c"
          :parent="node.coach.fullName"
          v-bind="$attrs"
          :owner="owner"
          :current-index="index"
          :max-index="node.child.length - 1"
        />
      </li>
    </ul>
  </template>
</template>

<script setup>
import { computed } from "vue";
import BaseIcon from "./BaseIcon.vue";
const props = defineProps({
  node: {
    type: Object,
    required: true,
  },
  parent: {
    type: String,
  },
  owner: {
    type: Object,
  },
  currentIndex: {
    type: Number,
  },
  maxIndex: {
    type: Number,
  },
});
const hasChild = computed(() => props.node.child && props.node.child.length > 0);
</script>

<script>
export default {
  inheritAttrs: false,
};
</script>
