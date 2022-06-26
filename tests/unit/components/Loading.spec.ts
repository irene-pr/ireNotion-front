import { mount } from "@vue/test-utils";
import { createStore } from "vuex";
import Loading from "@/components/Others/Loading.vue";
import themeState from "@/store/theme/state";

describe("Given a Loading component", () => {
  const store = createStore({
    modules: {
      theme: {
        namespaced: true,
        state() {
          return themeState;
        },
      },
    },
  });

  describe("When it is rendered", () => {
    test("Then it renders", () => {
      mount(Loading, {
        global: {
          plugins: [store],
        },
      });
    });
    test("Then it renders with the day-mode CSS class", () => {
      const wrapper = mount(Loading, {
        global: {
          plugins: [store],
        },
      });

      const pageElement = wrapper.find("div.loading-page");

      expect(pageElement.classes()).toContain("loading-page--day-mode");
    });
  });
  describe("When it is rendered with the night-mode activated", () => {
    test("Then it renders", () => {
      themeState.themeSurfaces = "night-mode";
      const wrapper = mount(Loading, {
        global: {
          plugins: [store],
        },
      });

      const pageElement = wrapper.find("div.loading-page");

      expect(pageElement.classes()).toContain("loading-page--night-mode");
    });
  });
  describe("When in data there's num: 0", () => {
    test("Then it renders the circle animation", () => {
      const options = {
        data() {
          return {
            num: 0,
          };
        },

        global: {
          plugins: [store],
        },
      };
      const wrapper = mount(Loading, options);

      expect(wrapper.find("div.circle-animation").exists()).toBeTruthy();
    });
  });
  describe("When in data there's num: 1", () => {
    test("Then it renders the circle animation", () => {
      const options = {
        data() {
          return {
            num: 1,
          };
        },

        global: {
          plugins: [store],
        },
      };
      const wrapper = mount(Loading, options);

      expect(wrapper.find("div.grid-animation").exists()).toBeTruthy();
    });
  });
  describe("When in data there's num: 2", () => {
    test("Then it renders the spinner animation", () => {
      const options = {
        data() {
          return {
            num: 2,
          };
        },

        global: {
          plugins: [store],
        },
      };
      const wrapper = mount(Loading, options);

      expect(wrapper.find("div.spinner-animation").exists()).toBeTruthy();
    });
  });
});
