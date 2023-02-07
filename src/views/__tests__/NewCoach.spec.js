import { beforeEach, afterEach, describe, expect, it } from "vitest";
import { shallowMount } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import { useCoachStore } from "@/stores/coach";

import router from "@/router";

import NewCoach from "../NewCoach.vue";
describe("CoachTree", () => {
  let wrapper;

  const createWrapper = () => {
    wrapper = shallowMount(NewCoach, {
      global: {
        plugins: [router, createTestingPinia()],
      },
    });
  };
  beforeEach(() => {
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
    expect(push).toHaveBeenCalledWith("/coaches-view");
  });
  it.each`
    length  | calledTimes
    ${10}   | ${1}
    ${2000} | ${0}
  `(
    "when coaching tree view length is $length function is called $calledTimes",
    async ({ length, calledTimes }) => {
      const store = useCoachStore();
      const arr = Array.from({ length: length - 1 }, (_, i) => i.toString());
      store.coachList = [...store.coachList, ...arr];
      const push = vi.spyOn(router, "push");
      wrapper.vm.createCoach({
        fullName: "Test",
        email: "test@gmail.com",
        coachName: "Penelope Randi",
      });
      expect(push).toHaveBeenCalledTimes(calledTimes);
    }
  );
});
