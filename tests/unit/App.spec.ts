import { mount } from "@vue/test-utils";
import { createStore } from "vuex";
import App from "@/App.vue";
import state from "@/store/state";
import router from "@/router";

describe("Given an App component", () => {
  const store = createStore({
    state() {
      return state;
    },
  });
  describe("When it renders", () => {
    test("Then it renders", () => {
      mount(App, {
        global: {
          plugins: [router, store],
        },
        stubs: ["router-view"],
      });
    });
  });
});
