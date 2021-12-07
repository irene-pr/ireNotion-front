import { mount } from "@vue/test-utils";
import { createStore } from "vuex";
import NavHome from "@/components/Home/NavHome.vue";
import state from "@/store/state";
import router from "@/router";

describe("Given a NavHome component", () => {
  const redirectToLoginMock = jest.fn();
  const redirectToRegisterMock = jest.fn();
  const store = createStore({
    state() {
      return state;
    },
    getters: {
      redirectToLogin: redirectToLoginMock,
      redirectToRegister: redirectToRegisterMock,
    },
  });

  describe("When it is rendered", () => {
    test("Then it renders", () => {
      mount(NavHome, {
        global: {
          plugins: [router, store],
        },
        stubs: ["router-view"],
      });
    });
    test("Then the it matches the snapshot", () => {
      const wrapper = mount(NavHome, {
        global: {
          plugins: [router, store],
        },
        stubs: ["router-view"],
      });
      expect(wrapper.element).toMatchSnapshot();
    });
    test("Then it renders two buttons", () => {
      const wrapper = mount(NavHome, {
        global: {
          plugins: [router, store],
        },
        stubs: ["router-view"],
      });

      const buttons = wrapper.findAll("button");

      expect(buttons).toHaveLength(2);
    });
    test("Then it renders the login button", () => {
      const wrapper = mount(NavHome, {
        global: {
          plugins: [router, store],
        },
        stubs: ["router-view"],
      });

      const button = wrapper.find("button.nav__button--login");

      expect(button.text()).toContain("LOG IN");
    });
    test("Then it renders the signup button", () => {
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
  describe("When you click on the login button", () => {
    test("Then the redirectToLogin getter is called", async () => {
      const wrapper = mount(NavHome, {
        global: {
          plugins: [router, store],
        },
        stubs: ["router-view"],
      });

      const button = wrapper.find("button.nav__button--login");
      button.trigger("click");

      expect(redirectToLoginMock).toHaveBeenCalled();
    });
  });
  describe("When you click on the signup button", () => {
    test("Then the redirectToRegister getter is called", async () => {
      const wrapper = mount(NavHome, {
        global: {
          plugins: [router, store],
        },
        stubs: ["router-view"],
      });

      const button = wrapper.find("button.nav__button--signup");
      button.trigger("click");

      expect(redirectToRegisterMock).toHaveBeenCalled();
    });
  });
});
