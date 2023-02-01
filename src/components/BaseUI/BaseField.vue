<template>
  <div :class="attrsClass || 'mb-6'">
    <component
      :is="field"
      :modelValue="modelValue"
      @update:modelValue="check"
      :type="type"
      :label="label"
      :readonly="readonly"
    />
    <span class="error text-sm absolute bottom text-red" v-if="errorMessage">{{ errorMessage }}</span>
  </div>
</template>

<script setup>
import { ref } from "vue";

const emailRegexp =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\]))$/;
const numericRegexp = /^([0-9]\d*)$/;
const allowedCharacters = /^(?!!#$%&'*\+-\/=?^_`{|"(),:;<>@\[\]\/)[a-zA-Z\s]+$/;
const error = ref(false);
const errorMessage = ref("");
const rules = {
  required: {
    check(data, required) {
      return required && !data.length ? true : false;
    },
    message: "Please fill this field",
  },
  minLength: {
    check(data, minLength) {
      if (minLength) {
        return data.length < minLength && data.length ? true : false;
      } else {
        return false;
      }
    },
    message: "Too less characters",
  },
  maxLength: {
    check(data, maxLength) {
      if (maxLength) {
        return data.length > maxLength && data.length ? true : false;
      } else {
        return false;
      }
    },
    message: "Too many characters",
  },
  email: {
    check(data, email) {
      return data.length && email && !emailRegexp.test(String(data).toLowerCase()) ? true : false;
    },
    message: "Invalid email format",
  },
  numeric: {
    check(data, numeric) {
      return data.length && numeric && !numericRegexp.test(String(data)) ? true : false;
    },
    message: "Only number allowed",
  },
  unique: {
    check(data, unique) {
      return data && unique.includes(data) ? true : false;
    },
    message: "Should be unique",
  },
  wordsAllowed: {
    check(data, wordsAllowed) {
      return data && data.split(" ").length > wordsAllowed ? true : false;
    },
    message: `Only ${props.wordsAllowed} words allowed`,
  },
  allWordsStartsFromUppercase: {
    check(data) {
      return data.split(" ").some((_, i, arr) => /[a-z]/.test(arr[i][0]));
    },
    message: "First letter of word should starts from uppercase",
  },
  onlyLetters: {
    check(data, onlyLetters) {
      return data && onlyLetters && !allowedCharacters.test(String(data)) ? true : false;
    },
    message: "Only letters allowed",
  },
};

const props = defineProps({
  field: {
    type: Object,
    default: {},
  },
  type: {
    type: String,
    required: false,
  },
  modelValue: {
    type: [String, Number, Array, Boolean, Object],
    required: false,
  },
  label: {
    type: String,
    required: false,
  },
  required: {
    type: Boolean,
    required: false,
  },
  email: {
    type: Boolean,
    required: false,
  },
  numeric: {
    type: Boolean,
    required: false,
  },
  minLength: {
    type: Number,
    default: 0,
    required: false,
  },
  maxLength: {
    type: Number,
    default: 0,
    required: false,
  },
  unique: {
    type: Array,
    default: [],
  },
  readonly: {
    type: Boolean,
    required: false,
  },
  onlyLetters: {
    type: Boolean,
    default: false,
  },
  wordsAllowed: {
    type: Number,
    required: false,
  },
  attrsClass: {
    type: String,
    required: false,
  },
});
const emit = defineEmits(["update:modelValue"]);
function check(data) {
  let dataFormatted = data.replace(/\s+/g, " ").trim();
  if (typeof data === "number") {
    dataFormatted = data.toString();
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
    (rules.wordsAllowed.check(dataFormatted, props.wordsAllowed) &&
      rules.allWordsStartsFromUppercase.check(dataFormatted, props.wordsAllowed)) ||
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
  } else if (rules.allWordsStartsFromUppercase.check(dataFormatted, props.wordsAllowed)) {
    errorMessage.value = rules.allWordsStartsFromUppercase.message;
  } else if (rules.onlyLetters.check(dataFormatted, props.onlyLetters)) {
    errorMessage.value = rules.onlyLetters.message;
  } else {
    errorMessage.value = "";
  }
  emit("update:modelValue", data);
}
</script>
