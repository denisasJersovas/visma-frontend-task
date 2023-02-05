import { beforeEach, describe, expect, it, vi } from "vitest";
import { shallowMount } from "@vue/test-utils";
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
    createWrapper();
  });
  it("check if App.vue component exists", () => {
    expect(wrapper.findComponent(App).exists()).toBe(true);
  });
  it("toggleSidebar method", async () => {
    await wrapper.vm.toggleSidebar();
  });
});
