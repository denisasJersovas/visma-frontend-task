<template>
  <div class="flex overflow-x-auto">
    <ul v-if="store.state.coachNodeList.length > 0">
      <BaseTree
        v-for="(node, index) in store.state.coachNodeList"
        :key="node.coach.fullName"
        :node="node"
        :owner="store.state.coachNodeList[0]"
        :current-index="index"
        @open-delete-modal="openDeleteModal"
        @change-position="changePosition"
      />
    </ul>
    <BaseModal
      v-if="isDeleteModalOpen === true"
      @close="closeDeleteModal"
      withCloseButton
      class="max-w-[600px] flex justify-center items-center"
    >
      <p class="text-lg mb-3">Do you want to delete coach ?</p>
      <BaseButton class="py-2.5" @click="deleteCoach(currentFullName)"> Yes </BaseButton>
    </BaseModal>
  </div>
</template>

<script setup>
import { ref } from "vue";
import BaseTree from "@/components/BaseUI/BaseTree.vue";
import BaseModal from "@/components/BaseUI/BaseModal.vue";
import BaseButton from "@/components/BaseUI/BaseButton.vue";

import store from "@/composables/useStore";
import toast from "@/composables/useToast";
const isDeleteModalOpen = ref(false);
const currentFullName = ref("");
function removeRecursively(array, fullName) {
  for (const [i, e] of array.entries()) {
    if (e.coach.fullName === fullName) {
      if (e.child.length > 0) {
        e.child.forEach((_, index, childArr) => {
          if (index === 0) {
            for (let childInd = 1; childInd <= childArr.length - 1; childInd++) {
              e.child[index].child.push(childArr[childInd]);
            }
          }
        });
        array.splice(i, 1, e.child[0]);
      } else {
        array.splice(i, 1);
      }
    }
    if (e.child.length > 0) {
      removeRecursively(e.child, fullName);
    }
  }
  return array;
}
function openDeleteModal(fullName) {
  isDeleteModalOpen.value = true;
  currentFullName.value = fullName;
}
function closeDeleteModal() {
  isDeleteModalOpen.value = false;
  currentFullName.value = "";
}
function deleteCoach(fullName) {
  if (store.state.coachList.length > 1) {
    store.state.coachList = store.state.coachList.filter(x => x != fullName);
    localStorage.setItem("coachList", JSON.stringify(store.state.coachList));
    removeRecursively(store.state.coachNodeList, fullName);
    localStorage.setItem("coachNodeList", JSON.stringify(store.state.coachNodeList));
    isDeleteModalOpen.value = false;
    toast.success("Succesfully deleted");
  } else {
    toast.error("Parent elemenet should be provided");
  }
}
function changeRecursively(array, payload) {
  for (const [i, e] of array.entries()) {
    if (i === payload.index && e.coach.fullName === payload.fullName) {
      const element = array.splice(payload.index, 1)[0];
      array.splice(payload.goTo, 0, element);
    }
    if (e.child.length > 0) {
      changeRecursively(e.child, payload);
    }
  }

  return array;
}
function changePosition(payload) {
  changeRecursively(store.state.coachNodeList, payload);
  localStorage.setItem("coachNodeList", JSON.stringify(store.state.coachNodeList));
  toast.success("Position changed");
}
</script>
