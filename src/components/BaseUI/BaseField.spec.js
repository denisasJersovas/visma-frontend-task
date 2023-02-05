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
  it("check if BaseInput", () => {
    createWrapper({ props: { field: BaseInput } });
    expect(wrapper.html()).toContain(
      '<base-input-stub modelvalue="" type="text" label="" disabled="false" options=""></base-input-stub>'
    );
  });
  it("check if BaseSelect", () => {
    createWrapper({ props: { field: BaseSelect } });
    expect(wrapper.html()).toContain(
      '<base-select-stub modelvalue="" options="" type="text"></base-select-stub>'
    );
  });
});
