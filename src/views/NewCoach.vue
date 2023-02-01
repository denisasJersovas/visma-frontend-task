<template>
  <BaseForm @errors="formValidate" class="w-full px-5 lg:px-10 pt-5 sm:w-[600px]">
    <BaseField
      :field="BaseInput"
      label="Full Name"
      v-model="fullName"
      required
      :unique="store.state.coachList"
      only-letters
      :words-allowed="4"
      :min-length="3"
      :max-length="64"
    />
    <BaseField :field="BaseInput" label="Email" v-model="email" email readonly />
    <BaseSelect
      v-if="isCoachExists"
      @click="coachSelectState = !coachSelectState"
      @mouseleave="coachSelectState = false"
      :isOpen="coachSelectState"
      :item="coachName"
      :items="store.state.coachList"
      itemInitialValue="Select coach"
      @choose-item="chooseCoach"
    />
    <BaseButton
      class="py-2.5"
      :disabled="formErrors || fullName?.length === 0 || email?.length === 0 || coachName?.length === 0"
      @click="sendData"
      >Create</BaseButton
    >
  </BaseForm>
</template>
<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import BaseForm from "@/components/BaseUI/BaseForm.vue";
import BaseField from "@/components/BaseUI/BaseField.vue";
import BaseInput from "@/components/BaseUI/BaseInput.vue";
import BaseButton from "@/components/BaseUI/BaseButton.vue";
import BaseSelect from "@/components/BaseUI/BaseSelect.vue";
import store from "@/composables/useStore";
import toast from "@/composables/useToast";

const router = useRouter();

const formErrors = ref(false);
const fullName = ref("");
const coachName = ref("");

const coachSelectState = ref(false);

const email = computed(() => {
  if (fullName.value.length >= 3) {
    const arrFullName = fullName.value.split(" ");
    let result = "";
    arrFullName.forEach((element, index) =>
      index > 0 ? (result += element ? `.${element.toLowerCase()}` : "") : (result = element.toLowerCase())
    );
    return `${result}@example.com`;
  }
});
const isCoachExists = computed(() => true);
function chooseCoach(coach) {
  coachName.value = coach;
}
function createCoach(array, obj) {
  for (const [i, e] of array.entries()) {
    if (e.coach.fullName === obj.coachName) {
      e.child.push({ coach: { fullName: obj.fullName, email: obj.email }, child: [] });
    }
    if (e.child.length > 0) {
      createCoach(e.child, obj);
    }
  }
}
function sendData() {
  if (store.state.coachList.length < 2000) {
    store.state.coachList.push(fullName.value);
    localStorage.setItem("coachList", JSON.stringify(store.state.coachList));
    createCoach(store.state.coachNodeList, {
      fullName: fullName.value,
      email: email.value,
      coachName: coachName.value,
    });
    localStorage.setItem("coachNodeList", JSON.stringify(store.state.coachNodeList));
    router.push(`/coaches`);
  } else {
    toast.error("Max coach number is 2000");
  }
}
function formValidate(result) {
  formErrors.value = result;
}
</script>
