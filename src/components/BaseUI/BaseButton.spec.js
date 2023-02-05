import { beforeEach, describe, expect, it, vi } from "vitest";
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
  it("has root element 'button'", () => {
    expect(wrapper.element.tagName).toBe("BUTTON");
  });
  it("has attribute type='button'", () => {
    expect(wrapper.attributes("type")).toBe("button");
  });
  it("does not have attribute 'disabled' by default", () => {
    expect(wrapper.attributes("disabled")).toBeUndefined();
  });
  it("has attribute 'disabled' when props 'disabled' is set", () => {
    createWrapper({ props: { disabled: true } });
    expect(wrapper.attributes("disabled")).toBeDefined();
  });
  it("has 'cursor-not-allowed opacity-50' classes when props 'disabled' is set", () => {
    createWrapper({ props: { disabled: true } });
    expect(wrapper.classes()).toContain("cursor-not-allowed");
    expect(wrapper.classes()).toContain("opacity-50");
  });
  it("has 'opacity-100' by default", () => {
    expect(wrapper.classes()).toContain("opacity-100");
  });
  it("render slot", () => {
    createWrapper({ slots: { default: "Create" } });
    expect(wrapper.text()).toContain("Create");
  });
  it("should emit 'click' event when clicked", async () => {
    let event;
    const spy = vi.fn((e) => {
      event = e;
    });
    createWrapper({
      props: { onClick: spy },
      slots: {
        default: "Create",
      },
    });
    expect(spy).not.toHaveBeenCalled();
    const btn = wrapper.find("button");
    expect(btn).toBeDefined();
    await btn.trigger("click");
    expect(spy).toHaveBeenCalled();
    expect(spy.mock.calls.length).toBe(1);
    expect(event).toBeInstanceOf(MouseEvent);
  });
  it("should not emit 'click' event when disabled and clicked", async () => {
    const spy = vi.fn();
    createWrapper({
      props: {
        disabled: true,
        onClick: spy,
      },
      slots: {
        default: "Create",
      },
    });
    expect(spy).not.toHaveBeenCalled();
    const btn = wrapper.find("button");
    expect(btn).toBeDefined();
    await btn.trigger("click");
    expect(spy).not.toHaveBeenCalled();
  });
});
