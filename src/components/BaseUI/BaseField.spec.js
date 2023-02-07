import { beforeEach, afterEach, describe, expect, it } from "vitest";
import { shallowMount } from "@vue/test-utils";

import BaseField from "./BaseField.vue";
import BaseInput from "./BaseInput.vue";
import BaseSelect from "./BaseSelect.vue";

describe("BaseField", () => {
  let wrapper;
  const createWrapper = ({ props } = {}) => {
    wrapper = shallowMount(BaseField, {
      propsData: { field: {}, ...props },
    });
  };
  beforeEach(() => {
    createWrapper();
  });
  afterEach(() => {
    wrapper.unmount();
  });

  it("check if BaseField.vue component exists", () => {
    expect(wrapper.findComponent(BaseField).exists()).toBe(true);
  });
  it("renders BaseInput", () => {
    createWrapper({ props: { field: BaseInput } });
    const baseInputStub =
      '<base-input-stub modelvalue="" type="text" label="" disabled="false"></base-input-stub>';

    expect(wrapper.html()).toContain(baseInputStub);
  });
  it("renders BaseSelect", () => {
    createWrapper({ props: { field: BaseSelect, options: ["1,2,3"] } });
    const baseSelectStub =
      '<base-select-stub modelvalue="" options="1,2,3" type="text"></base-select-stub>';
    expect(wrapper.html()).toContain(baseSelectStub);
  });
  it.each`
    modelValue  | unique      | result
    ${"fdghfd"} | ${["Test"]} | ${""}
    ${"Test"}   | ${["Test"]} | ${"Should be unique"}
  `(
    "check uniquq rule when modelValue props is $modelValue unique prop is $unique result should be ",
    ({ modelValue, unique, result }) => {
      createWrapper({
        props: {
          field: BaseInput,
          modelValue,
          unique,
        },
      });
      wrapper.vm.check(modelValue);
      expect(wrapper.vm.errorMessage).toBe(result);
    }
  );
  it.each`
    modelValue | minLength | result
    ${"aasd"}  | ${3}      | ${""}
    ${"sasa"}  | ${10}     | ${"Too less characters"}
  `(
    `check max length rule when modalValue prop is $modelValue and minLength prop is $minLength result should be $result`,
    ({ modelValue, minLength, result }) => {
      createWrapper({
        props: {
          field: BaseInput,
          modelValue,
          minLength,
        },
      });
      wrapper.vm.check(modelValue);
      expect(wrapper.vm.errorMessage).toBe(result);
    }
  );
  it.each`
    modelValue                                                             | maxLength | result
    ${"aasd"}                                                              | ${3}      | ${"Too many characters"}
    ${"aaa"}                                                               | ${10}     | ${""}
    ${"aaasadaadsadsadsadsadasdgfasdasdsadffggffffffffddddffsdddadsadsad"} | ${64}     | ${"Too many characters"}
    ${"aaasadaadsadsadsadsadasdgfasdasdsadffggffffffffddddffsdddadsadad"}  | ${64}     | ${""}
  `(
    `check max length rule when modalValue prop is $modelValue and maxLength prop is $maxLength result should be $result`,
    ({ modelValue, maxLength, result }) => {
      createWrapper({
        props: {
          field: BaseInput,
          modelValue,
          maxLength,
        },
      });
      wrapper.vm.check(modelValue);
      expect(wrapper.vm.errorMessage).toBe(result);
    }
  );
  it.each`
    modelValue                             | onlyLetters | result
    ${`!#$%&'*+-/=?^_ \`{| "(),:;<>@[\\]`} | ${false}    | ${""}
    ${"!"}                                 | ${true}     | ${"Only letters allowed"}
    ${"#"}                                 | ${true}     | ${"Only letters allowed"}
    ${"$"}                                 | ${true}     | ${"Only letters allowed"}
    ${"%"}                                 | ${true}     | ${"Only letters allowed"}
    ${"&"}                                 | ${true}     | ${"Only letters allowed"}
    ${"'"}                                 | ${true}     | ${"Only letters allowed"}
    ${"*"}                                 | ${true}     | ${"Only letters allowed"}
    ${"+"}                                 | ${true}     | ${"Only letters allowed"}
    ${"-"}                                 | ${true}     | ${"Only letters allowed"}
    ${"/"}                                 | ${true}     | ${"Only letters allowed"}
    ${"="}                                 | ${true}     | ${"Only letters allowed"}
    ${"?"}                                 | ${true}     | ${"Only letters allowed"}
    ${"^"}                                 | ${true}     | ${"Only letters allowed"}
    ${"_"}                                 | ${true}     | ${"Only letters allowed"}
    ${"`"}                                 | ${true}     | ${"Only letters allowed"}
    ${"{"}                                 | ${true}     | ${"Only letters allowed"}
    ${"|"}                                 | ${true}     | ${"Only letters allowed"}
    ${`"`}                                 | ${true}     | ${"Only letters allowed"}
    ${"("}                                 | ${true}     | ${"Only letters allowed"}
    ${")"}                                 | ${true}     | ${"Only letters allowed"}
    ${","}                                 | ${true}     | ${"Only letters allowed"}
    ${":"}                                 | ${true}     | ${"Only letters allowed"}
    ${";"}                                 | ${true}     | ${"Only letters allowed"}
    ${"<"}                                 | ${true}     | ${"Only letters allowed"}
    ${">"}                                 | ${true}     | ${"Only letters allowed"}
    ${"@"}                                 | ${true}     | ${"Only letters allowed"}
    ${"["}                                 | ${true}     | ${"Only letters allowed"}
    ${"[]"}                                | ${true}     | ${"Only letters allowed"}
    ${"aaas"}                              | ${true}     | ${""}
  `(
    `check max length rule when modalValue prop is $modelValue and onlyLetters prop is $onlyLetters result should be $result`,
    ({ modelValue, onlyLetters, result }) => {
      createWrapper({
        props: {
          field: BaseInput,
          modelValue,
          onlyLetters,
        },
      });
      wrapper.vm.check(modelValue);
      expect(wrapper.vm.errorMessage).toBe(result);
    }
  );
  it.each`
    modelValue                              | wordsAllowed | result
    ${"fdghfd asdad sadsad asdsa"}          | ${4}         | ${""}
    ${"asdsad asdsad asdasd"}               | ${2}         | ${`Only 2 words allowed`}
    ${"asdsad asdsad asdasd asdsad asdsad"} | ${4}         | ${`Only 4 words allowed`}
  `(
    "check wordsAllowed rule when modelValue props is $modelValue wordsAllowed prop is $wordsAllowed result should be ",
    ({ modelValue, wordsAllowed, result }) => {
      createWrapper({
        props: {
          field: BaseInput,
          modelValue,
          wordsAllowed,
        },
      });
      wrapper.vm.check(modelValue);
      expect(wrapper.vm.errorMessage).toBe(result);
    }
  );
});
