import { mount } from "@vue/test-utils";
import { createStore } from "vuex";
import NavHome from "@/components/Home/NavHome.vue";
import state from "@/store/state";
import router from "@/router";

describe("Given a NavHome component", () => {
  const store = createStore({
    state() {
      return state;
    },
  });

  describe("When it is rendered", () => {
    test("it renders", () => {
      mount(NavHome, {
        global: {
          plugins: [router, store],
        },
        stubs: ["router-view"],
      });
    });
    test("it renders two buttons", () => {
      const wrapper = mount(NavHome, {
        global: {
          plugins: [router, store],
        },
        stubs: ["router-view"],
      });

      const buttons = wrapper.findAll("button");

      expect(buttons).toHaveLength(2);
    });
    test("it renders the login button", () => {
      const wrapper = mount(NavHome, {
        global: {
          plugins: [router, store],
        },
        stubs: ["router-view"],
      });

      const button = wrapper.find("button.nav__button--login");

      expect(button.text()).toContain("LOG IN");
    });
    test("it renders the signup button", () => {
      const wrapper = mount(NavHome, {
        global: {
          plugins: [router, store],
        },
        stubs: ["router-view"],
      });

      const button = wrapper.find("button.nav__button--signup");

      expect(button.text()).toContain("SIGN UP");
    });
  });
});
