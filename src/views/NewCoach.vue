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
      :unique="store.coachList"
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
      :options="store.coachList"
    />
    <BaseButton
      class="py-2.5"
      :disabled="
        formErrors ||
        fullName.length === 0 ||
        email.length === 0 ||
        coachName.length === 0
      "
      @click="
        createCoach({
          fullName,
          email,
          coachName,
        })
      "
    >
      Create
    </BaseButton>
  </BaseForm>
</template>
<script lang="ts" setup>
import { ref, computed } from "vue";
import BaseForm from "@/components/BaseUI/BaseForm.vue";
import BaseField from "@/components/BaseUI/BaseField.vue";
import BaseInput from "@/components/BaseUI/BaseInput.vue";
import BaseButton from "@/components/BaseUI/BaseButton.vue";
import BaseSelect from "@/components/BaseUI/BaseSelect.vue";
import { useCoachStore } from "@/stores/coach";
import { NewCoach } from "@/interfaces";
import router from "@/router";
const store = useCoachStore();
const formErrors = ref(false);
const fullName = ref("");
const coachName = ref("");

const convertFullNameToEmail = (name: string, email: string) =>
  name
    .trim()
    .split(" ")
    .map((el, index) =>
      index > 0 ? (el ? el.toLowerCase() : "") : el.toLowerCase()
    )
    .join(".") + `@${email}`;

const email = computed(() =>
  fullName.value.length >= 3
    ? convertFullNameToEmail(fullName.value, "example.com")
    : ""
);
function createCoach(formData: NewCoach) {
  const res = store.createCoach(formData);
  if (res) {
    router.push("/coaches-view");
  }
}
function formValidate(result: boolean) {
  formErrors.value = result;
}
</script>
