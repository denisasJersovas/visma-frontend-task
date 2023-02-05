<template>
  <BaseForm
    class="w-full px-5 pt-5 sm:w-[600px] lg:px-10"
    @errors="formValidate"
  >
    <BaseField
      v-model="fullName"
      :field="BaseInput"
      label="Full Name"
      required
      :unique="store.state.coachList"
      only-letters
      :words-allowed="4"
      all-words-uppercase
      :min-length="3"
      :max-length="64"
    />
    <BaseField
      v-model="email"
      :field="BaseInput"
      readonly
      label="Email"
    />

    <BaseField
      v-model="coachName"
      :field="BaseSelect"
      label="Select Coach"
      required
      :options="store.state.coachList"
    />

    <BaseButton
      class="py-2.5"
      :disabled="disabled"
      @click="sendData"
    >
      Create
    </BaseButton>
  </BaseForm>
</template>
<script lang="ts" setup>
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

const email = computed(() => {
  if (fullName.value.length >= 3) {
    const arrFullName = fullName.value.split(" ");
    let result = "";
    arrFullName.forEach((element, index) =>
      index > 0
        ? (result += element ? `.${element.toLowerCase()}` : "")
        : (result = element.toLowerCase())
    );
    return `${result}@example.com`;
  } else return "";
});
const disabled = computed(
  () =>
    formErrors.value ||
    fullName.value?.length === 0 ||
    email.value?.length === 0 ||
    coachName.value?.length === 0
);
function createCoach(array: any, obj: any) {
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  for (const [__, e] of array.entries()) {
    if (e.coach.fullName === obj.coachName) {
      e.child.push({
        coach: { fullName: obj.fullName, email: obj.email },
        child: [],
      });
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
    localStorage.setItem(
      "coachNodeList",
      JSON.stringify(store.state.coachNodeList)
    );
    router.push(`/coaches-view`);
  } else {
    toast.error("Max coach number is 2000");
  }
}
function formValidate(result: any) {
  formErrors.value = result;
}
</script>
