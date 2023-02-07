<template>
  <div :class="attrsClass || 'mb-6'">
    <component
      :is="field"
      :model-value="modelValue"
      :type="type"
      :label="label"
      :options="options"
      :readonly="readonly"
      @update:model-value="check"
    />
    <span
      v-if="errorMessage"
      class="error absolute text-sm text-red"
    >
      {{ errorMessage }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
type InputData = boolean | string | number | (string | number)[] | DataTransfer;
type InputDataFormatted = string | (string | number)[];

interface Props {
  field: {};
  type?: string;
  modelValue?: string | number | [] | boolean | object;
  label?: string;
  required?: boolean;
  options?: string[] | number[] | { value: string | number; name: string }[];
  email?: boolean;
  numeric?: boolean;
  minLength?: number;
  maxLength?: number;
  unique?: string[];
  readonly?: boolean;
  onlyLetters?: boolean;
  wordsAllowed?: number;
  allWordsUppercase?: boolean;
  attrsClass?: string;
}
const props = withDefaults(defineProps<Props>(), {
  type: "text",
  modelValue: "",
});

const emailRegexp =
  /* eslint-disable-next-line */
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\]))$/;
const numericRegexp = /^([0-9]\d*)$/;
const allowedCharacters = /^(?!!#$%&'*\+-\/=?^_`{|"(),:;<>@\[\]\/)[a-zA-Z\s]+$/;
const error = ref(false);
const errorMessage = ref("");

const rules = {
  required: {
    check(data: InputDataFormatted, required?: boolean): boolean {
      return required && !data.length ? true : false;
    },
    message: "Please fill this field",
  },
  minLength: {
    check(data: InputDataFormatted, minLength?: number): boolean {
      if (minLength) {
        return data.length < minLength && data.length ? true : false;
      } else {
        return false;
      }
    },
    message: "Too less characters",
  },
  maxLength: {
    check(data: InputDataFormatted, maxLength?: number): boolean {
      if (maxLength) {
        return data.length > maxLength && data.length ? true : false;
      } else {
        return false;
      }
    },
    message: "Too many characters",
  },
  email: {
    check(data: InputDataFormatted, email?: boolean): boolean {
      return data.length &&
        email &&
        !emailRegexp.test(String(data).toLowerCase())
        ? true
        : false;
    },
    message: "Invalid email format",
  },
  numeric: {
    check(data: InputDataFormatted, numeric?: boolean): boolean {
      return data.length && numeric && !numericRegexp.test(String(data))
        ? true
        : false;
    },
    message: "Only number allowed",
  },
  unique: {
    check(data: InputDataFormatted, unique?: string[]): boolean {
      return data &&
        unique &&
        unique.find(
          (x) =>
            x.toLowerCase() === (typeof data === "string" && data.toLowerCase())
        )
        ? true
        : false;
    },
    message: "Should be unique",
  },
  wordsAllowed: {
    check(data: InputDataFormatted, wordsAllowed?: Number) {
      return data &&
        wordsAllowed &&
        (data as string).split(" ").length > wordsAllowed
        ? true
        : false;
    },
    message: `Only ${props.wordsAllowed} words allowed`,
  },
  allWordsUppercase: {
    check(data: InputDataFormatted, allWordsUppercase?: boolean) {
      return (
        allWordsUppercase &&
        (data as string).split(" ").some((_, i, arr) => /[a-z]/.test(arr[i][0]))
      );
    },
    message: "First letter of word should starts from uppercase",
  },
  onlyLetters: {
    check(data: InputDataFormatted, onlyLetters?: boolean) {
      return data && onlyLetters && !allowedCharacters.test(String(data))
        ? true
        : false;
    },
    message: "Only letters allowed",
  },
};

const emit = defineEmits(["update:modelValue"]);
function check(data: InputData): void {
  let dataFormatted = data as InputDataFormatted;
  if (typeof data === "number") {
    dataFormatted = data.toString();
  } else if (typeof data === "string") {
    dataFormatted = data.replace(/\s+/g, " ").trim();
  } else if (typeof data === "boolean") {
    dataFormatted = data === false ? "" : data.toString();
  }
  error.value =
    rules.required.check(dataFormatted, props.required) ||
    rules.minLength.check(dataFormatted, props.minLength) ||
    rules.maxLength.check(dataFormatted, props.maxLength) ||
    rules.email.check(dataFormatted, props.email) ||
    rules.numeric.check(dataFormatted, props.numeric) ||
    rules.unique.check(dataFormatted, props.unique) ||
    rules.wordsAllowed.check(dataFormatted, props.wordsAllowed) ||
    rules.allWordsUppercase.check(dataFormatted, props.allWordsUppercase) ||
    rules.onlyLetters.check(dataFormatted, props.onlyLetters);

  if (rules.required.check(dataFormatted, props.required)) {
    errorMessage.value = rules.required.message;
  } else if (rules.minLength.check(dataFormatted, props.minLength)) {
    errorMessage.value = rules.minLength.message;
  } else if (rules.maxLength.check(dataFormatted, props.maxLength)) {
    errorMessage.value = rules.maxLength.message;
  } else if (rules.email.check(dataFormatted, props.email)) {
    errorMessage.value = rules.email.message;
  } else if (rules.numeric.check(dataFormatted, props.numeric)) {
    errorMessage.value = rules.numeric.message;
  } else if (rules.unique.check(dataFormatted, props.unique)) {
    errorMessage.value = rules.unique.message;
  } else if (rules.wordsAllowed.check(dataFormatted, props.wordsAllowed)) {
    errorMessage.value = rules.wordsAllowed.message;
  } else if (
    rules.allWordsUppercase.check(dataFormatted, props.allWordsUppercase)
  ) {
    errorMessage.value = rules.allWordsUppercase.message;
  } else if (rules.onlyLetters.check(dataFormatted, props.onlyLetters)) {
    errorMessage.value = rules.onlyLetters.message;
  } else {
    errorMessage.value = "";
  }
  emit("update:modelValue", data);
}
</script>
