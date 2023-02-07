import { createPinia, setActivePinia } from "pinia";
import { beforeEach, afterEach, describe, expect, it /* vi */ } from "vitest";
import { mount } from "@vue/test-utils";
import router from "@/router";
// import { useCoachStore } from "@/stores/coach";

import NewCoach from "../NewCoach.vue";
describe("CoachTree", () => {
  let wrapper;

  const createWrapper = () => {
    wrapper = mount(NewCoach, {
      global: {
        plugins: [router],
      },
    });
  };
  beforeEach(() => {
    setActivePinia(createPinia());
    createWrapper();
  });
  afterEach(() => {
    wrapper.unmount();
  });
  it("check if CoachTree.vue component exists", () => {
    expect(wrapper.findComponent(NewCoach).exists()).toBe(true);
  });
  it.each`
    fullName         | email            | result
    ${"aaa aaa aaa"} | ${"example.com"} | ${"aaa.aaa.aaa@example.com"}
  `("check convertFullNameToEmail function", ({ fullName, email, result }) => {
    const res = wrapper.vm.convertFullNameToEmail(fullName, email);
    expect(res).toBe(result);
  });
  it("when press createCoach button links to coaches-view", async () => {
    const push = vi.spyOn(router, "push");
    wrapper.vm.createCoach({
      fullName: "Test",
      email: "test@gmail.com",
      coachName: "Penelope Randi",
    });
    expect(push).toHaveBeenCalledOnce();
    expect(push).toHaveBeenCalledWith("/coaches-view");
  });
});
