import { mount } from "@vue/test-utils";
import { createStore } from "vuex";
import router from "@/router";
import state from "@/store/state";
import NotFound from "../../../src/views/NotFound.vue";

describe("Given a Home view", () => {
  const store = createStore({
    state() {
      return state;
    },
  });

  describe("When it is rendered", () => {
    test("Then it renders", () => {
      mount(NotFound, {
        global: {
          plugins: [router, store],
        },
        stubs: ["router-view"],
      });
    });
    test("Then it has a heading", () => {
      const wrapper = mount(NotFound, {
        global: {
          plugins: [router, store],
        },
        stubs: ["router-view"],
      });

      const heading = wrapper.find("h1");

      expect(heading.exists).toBeTruthy();
    });
    test("Then the heading has text '404 Not found'", () => {
      const wrapper = mount(NotFound, {
        global: {
          plugins: [router, store],
        },
        stubs: ["router-view"],
      });

      const heading = wrapper.find("h1");

      expect(heading.text()).toBe("404 Not found");
    });
  });
});
