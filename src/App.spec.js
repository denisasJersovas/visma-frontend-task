import { beforeEach, describe, expect, it, vi } from "vitest";
import { shallowMount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import router from "@/router";
import App from "@/App.vue";

describe("App", () => {
  let wrapper;
  const mountOptions = {
    global: {
      mocks: {
        $route: "home",
        $router: {
          push: vi.fn(),
        },
      },
      plugins: [router],
    },
  };
  const createWrapper = () => {
    wrapper = shallowMount(App, mountOptions);
  };
  beforeEach(() => {
    setActivePinia(createPinia());
    createWrapper();
  });
  it("check if App.vue component exists", () => {
    expect(wrapper.findComponent(App).exists()).toBe(true);
  });
});
