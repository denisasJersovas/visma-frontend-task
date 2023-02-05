import { beforeEach, describe, expect, it } from "vitest";
import { shallowMount } from "@vue/test-utils";
import BaseButton from "./BaseButton.vue";
describe("BaseButton", () => {
  let wrapper;
  const createWrapper = ({ props, slots } = {}) => {
    wrapper = shallowMount(BaseButton, {
      propsData: { ...props },
      slots,
    });
  };
  beforeEach(() => {
    createWrapper();
  });
  it("check if BaseButton.vue component exists", () => {
    expect(wrapper.findComponent(BaseButton).exists()).toBe(true);
  });
  it("get button", () => {
    wrapper.get("button");
  });
  it("render slot", () => {
    createWrapper({ slots: { default: "Create" } });
    expect(wrapper.html()).toContain("Create");
  });
});
