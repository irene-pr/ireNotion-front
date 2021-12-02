import { mount } from "@vue/test-utils";
import App from "@/App.vue";

describe("Given an App component", () => {
  describe("When it renders", () => {
    test("Then it renders", () => {
      mount(App);
    });
  });
});
