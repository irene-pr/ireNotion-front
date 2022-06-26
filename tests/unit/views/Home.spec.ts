import { mount, shallowMount } from "@vue/test-utils";
import { createStore } from "vuex";
import Home from "../../../src/views/Home.vue";
import NavHome from "../../../src/components/Home/NavHome.vue";
import state from "@/store/state";
import router from "@/router";

describe("Given a Home view", () => {
  let checkTokenMock = jest.fn();
  let redirectToUserBoardMock = jest.fn();
  let store = createStore({});

  beforeEach(() => {
    checkTokenMock = jest.fn();
    redirectToUserBoardMock = jest.fn();
    store = createStore({
      getters: {
        redirectToUserBoard: redirectToUserBoardMock,
      },
      modules: {
        user: {
          namespaced: true,
          state() {
            return state;
          },
          actions: {
            checkToken: checkTokenMock,
          },
        },
      },
    });
  });

  describe("When it is rendered", () => {
    test("Then it renders", () => {
      mount(Home, {
        global: {
          plugins: [router, store],
        },
        stubs: ["router-view"],
      });
    });
    test("Then the it matches the snapshot", () => {
      const wrapper = mount(Home, {
        global: {
          plugins: [router, store],
        },
        stubs: ["router-view"],
      });
      expect(wrapper.element).toMatchSnapshot();
    });
    test("Then the action checkToken should be called", () => {
      mount(Home, {
        global: {
          plugins: [router, store],
        },
        stubs: ["router-view"],
      });

      expect(checkTokenMock).toHaveBeenCalled();
    });
    test("Then the getter redirectToUserBoard should not be called", () => {
      mount(Home, {
        global: {
          plugins: [router, store],
        },
        stubs: ["router-view"],
      });

      expect(redirectToUserBoardMock).not.toHaveBeenCalled();
    });
    test("it renders the component NavHome", () => {
      const wrapper = mount(Home, {
        global: {
          plugins: [router, store],
        },
        stubs: ["router-view"],
      });

      wrapper.getComponent(NavHome);
    });
  });
  describe("When the isLoggedIn state is true", () => {
    test("Then it calls the getter redirectToUserBoard", () => {
      state.isLoggedIn = true;

      mount(Home, {
        global: {
          plugins: [router, store],
        },
        stubs: ["router-link", "router-view"],
      });
      expect(redirectToUserBoardMock).toHaveBeenCalled();
    });
    test("Then it redirects to /userBoard", () => {
      state.isLoggedIn = true;
      const $route = { path: "/userBoard" };

      const wrapper = mount(Home, {
        global: {
          plugins: [router, store],
          mocks: {
            $route,
          },
        },
        stubs: ["router-link", "router-view"],
      });
      expect(wrapper.vm.$route.path).toContain($route.path);
    });
  });
});
