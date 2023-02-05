<template>
  <ul class="flex items-center px-10 py-2">
    <p class="border">
      <span class="mr-5">{{ node.coach.fullName }}</span>
      <span class="mr-5">{{ node.coach.email }} </span>
      {{ parent }}
    </p>
    <BaseIcon
      v-if="owner.child.length > 0"
      class="mx-2 h-5 w-5 cursor-pointer"
      name="x"
      @click.stop="$emit('open-delete-modal', node.coach.fullName)"
    />
    <BaseIcon
      v-if="
        parent === owner.coach.fullName &&
        currentIndex === 0 &&
        maxIndex &&
        maxIndex >= 1
      "
      class="mr-2 h-5 w-5 cursor-pointer"
      name="arrowDown"
      @click.stop="
        $emit('change-position', {
          fullName: node.coach.fullName,
          index: currentIndex,
          goTo: currentIndex + 1,
        })
      "
    />
    <BaseIcon
      v-if="
        parent === owner.coach.fullName &&
        currentIndex > 0 &&
        maxIndex &&
        currentIndex < maxIndex
      "
      class="mr-2 h-5 w-5 cursor-pointer"
      name="arrowDown"
      @click.stop="
        $emit('change-position', {
          fullName: node.coach.fullName,
          index: currentIndex,
          goTo: currentIndex + 1,
        })
      "
    />
    <BaseIcon
      v-if="
        parent === owner.coach.fullName &&
        currentIndex > 0 &&
        maxIndex &&
        currentIndex < maxIndex
      "
      class="h-5 w-5 cursor-pointer"
      name="arrowUp"
      @click.stop="
        $emit('change-position', {
          fullName: node.coach.fullName,
          index: currentIndex,
          goTo: currentIndex - 1,
        })
      "
    />

    <BaseIcon
      v-if="
        parent === owner.coach.fullName &&
        currentIndex === maxIndex &&
        maxIndex >= 1
      "
      class="h-5 w-5 cursor-pointer"
      name="arrowUp"
      @click.stop="
        $emit('change-position', {
          fullName: node.coach.fullName,
          index: currentIndex,
          goTo: currentIndex - 1,
        })
      "
    />
  </ul>
  <template v-if="hasChild">
    <ul
      v-for="(c, index) in node.child"
      :key="c.coach.fullName"
      class="ml-20 pl-20"
    >
      <li>
        <CoachTree
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

<script setup lang="ts">
import { computed } from "vue";
import BaseIcon from "@/components/BaseUI/BaseIcon.vue";
interface CoachTree {
  node: CoachTreeNode;
  owner: CoachTreeNode;
  parent?: string;
  currentIndex: number;
  maxIndex?: number;
}
interface CoachTreeNode {
  coach: Coach;
  child: any;
}
interface Coach {
  fullName: string;
  email: string;
}
const props = defineProps<CoachTree>();
const hasChild = computed(
  () => props.node.child && props.node.child.length > 0
);
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>
