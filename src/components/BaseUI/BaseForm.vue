<template>
  <form
    ref="form"
    @submit.prevent
  >
    <slot />
  </form>
</template>

<script setup lang="ts">
import { onMounted, onUpdated, ref } from "vue";
const errorsCount = ref(0);
const form = ref();
const emit = defineEmits(["errors"]);
function formValidate() {
  errorsCount.value = 0;
  if (form.value) {
    form.value.querySelectorAll(".error").forEach((element: any) => {
      if (element) {
        errorsCount.value++;
      }
    });
  }
  errorsCount.value > 0 ? emit("errors", true) : emit("errors", false);
}
onMounted(() => {
  setTimeout(() => {
    formValidate();
  }, 100);
});
onUpdated(() => {
  formValidate();
});
</script>
