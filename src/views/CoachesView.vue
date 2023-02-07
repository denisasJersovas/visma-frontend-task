<template>
  <div class="flex overflow-x-auto">
    <ul v-if="store.coachNodeList.length > 0">
      <CoachTree
        v-for="(node, index) in store.coachNodeList"
        :key="node.coach.fullName"
        :node="node"
        :owner="store.coachNodeList[0]"
        :current-index="index"
        @open-delete-modal="openDeleteModal"
        @change-position="changeCoachPosition"
      />
    </ul>
    <BaseModal
      v-if="isDeleteModalOpen === true"
      with-close-button
      class="flex max-w-[600px] items-center justify-center"
      @close="closeDeleteModal"
    >
      <p class="mb-3 text-lg">Do you want to delete coach ?</p>
      <BaseButton
        class="py-2.5"
        @click="deleteCoach(currentFullName)"
      >
        Yes
      </BaseButton>
    </BaseModal>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import CoachTree from "@/components/CoachTree.vue";
import BaseModal from "@/components/BaseUI/BaseModal.vue";
import BaseButton from "@/components/BaseUI/BaseButton.vue";
import { useCoachStore } from "@/stores/coach";
import toast from "@/composables/useToast";

const store = useCoachStore();

const isDeleteModalOpen = ref(false);
const currentFullName = ref("");

function openDeleteModal(fullName: any) {
  isDeleteModalOpen.value = true;
  currentFullName.value = fullName;
}
function closeDeleteModal() {
  isDeleteModalOpen.value = false;
  currentFullName.value = "";
}
function deleteCoach(fullName: string) {
  if (store.coachList.length > 1) {
    store.deleteCoach(fullName);
    isDeleteModalOpen.value = false;
    toast.success("Succesfully deleted");
  } else {
    toast.error("Parent elemenet should be provided");
  }
}

function changeCoachPosition(payload: any) {
  store.changeCoachPosition(payload);
  toast.success("Position changed");
}
</script>
