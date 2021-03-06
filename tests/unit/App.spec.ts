import { mount } from "@vue/test-utils";
import { createStore } from "vuex";
import App from "@/App.vue";
import Loading from "@/components/Others/Loading.vue";
import state from "@/store/state";
import router from "@/router";

function mockStore(isLoading = false) {
  return createStore({
    state() {
      return { isLoading };
    },
    modules: {
      user: {
        namespaced: true,
        state() {
          return { isLoading };
        },
        actions: {
          checkToken: jest.fn(),
        },
      },
    },
  });
}

describe("Given an App component", () => {
  describe("When it renders", () => {
    test("Then it renders", () => {
      mount(App, {
        global: {
          plugins: [router, mockStore()],
        },
        stubs: ["router-view"],
      });
    });
    test("Then the it matches the snapshot", () => {
      const wrapper = mount(App, {
        global: {
          plugins: [router, mockStore()],
        },
        stubs: ["router-view"],
      });
      expect(wrapper.element).toMatchSnapshot();
    });
  });
  describe("When with the initial state", () => {
    test("Then it doesn't render the Loading component", () => {
      const wrapper = mount(App, {
        global: {
          plugins: [router, mockStore()],
        },
        stubs: ["router-view"],
      });

      expect(wrapper.findComponent(Loading).exists()).toBeFalsy();
    });
  });
  describe("When with the state isLoading set as true", () => {
    test("Then it renders the Loading component", () => {
      state.isLoading = true;

      const wrapper = mount(App, {
        global: {
          plugins: [router, mockStore(true)],
        },
        stubs: ["router-view"],
      });

      expect(wrapper.findComponent(Loading).exists()).toBeTruthy();
    });
  });
});
