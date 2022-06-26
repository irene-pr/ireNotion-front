import { mount } from "@vue/test-utils";
import { createStore } from "vuex";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import BoardEdit from "@/components/Modals/BoardEdit.vue";
import { IModalState, IThemeState, IUserState } from "@/types/store";
import themeState from "@/store/theme/state";
import userState from "@/store/user/state";
import modalState from "@/store/modal/state";

library.add(fas);

describe("Given a BoardEdit component", () => {
  let mockedThemeState: IThemeState;
  let mockedUserState: IUserState;
  let mockedModalState: IModalState;
  let editNameBoardMock = jest.fn();
  let setBoardEditModalMock = jest.fn();
  let setIdForModalMock = jest.fn();
  let onSubmitMock = jest.fn();
  let closeModalMock = jest.fn();
  let store = createStore({});
  let options = {};
  function getOptions() {
    return {
      data() {
        return {
          name: "",
        };
      },
      components: {
        "font-awesome-icon": FontAwesomeIcon,
      },
      stubs: ["FontAwesomeIcon"],
      global: {
        plugins: [store],
      },
      mocks: {
        $store: store,
      },
    };
  }
  function getOptionsWithMethods() {
    return {
      data() {
        return {
          name: "",
        };
      },
      components: {
        "font-awesome-icon": FontAwesomeIcon,
      },
      stubs: ["FontAwesomeIcon"],
      global: {
        plugins: [store],
      },
      methods: {
        onSubmit: onSubmitMock,
        closeModal: closeModalMock,
      },
      mocks: {
        $store: store,
      },
    };
  }

  beforeEach(() => {
    mockedThemeState = { ...themeState };
    mockedUserState = {
      ...userState,
      isLoggedIn: true,
      userContent: {
        name: "Franny",
        boards: [
          {
            type: "board",
            name: "tablero1",
            notes: [{ id: "1", type: "paragraph", color: "yellow" }],
            id: "123",
          },
          {
            type: "board",
            name: "tablero2",
            notes: [{ id: "2", type: "paragraph", color: "yellow" }],
            id: "234",
          },
        ],
      },
    };
    mockedModalState = {
      ...modalState,
      isBoardEditModal: true,
      idForModal: "123",
    };
    editNameBoardMock = jest.fn();
    setBoardEditModalMock = jest.fn();
    setIdForModalMock = jest.fn();
    onSubmitMock = jest.fn();
    closeModalMock = jest.fn();
    store = createStore({
      modules: {
        theme: {
          namespaced: true,
          state() {
            return mockedThemeState;
          },
        },
        user: {
          namespaced: true,
          state() {
            return mockedUserState;
          },
          actions: {
            editNameBoard: editNameBoardMock,
          },
        },
        modal: {
          namespaced: true,
          state() {
            return mockedModalState;
          },
          actions: {
            setBoardEditModal: setBoardEditModalMock,
            setIdForModal: setIdForModalMock,
          },
        },
      },
    });
  });

  describe("When it is rendered", () => {
    test("Then it renders", () => {
      options = getOptions();
      mount(BoardEdit, options);
    });
    test("Then the it matches the snapshot", () => {
      options = getOptions();
      const wrapper = mount(BoardEdit, options);
      expect(wrapper.element).toMatchSnapshot();
    });
    test("Then name of the board is 'tablero1'", () => {
      options = getOptions();
      const wrapper = mount(BoardEdit, options);
      expect(wrapper.vm.$data.name).toBe("tablero1");
    });
    test("Then it renders a closing icon", () => {
      options = getOptions();
      const wrapper = mount(BoardEdit, options);

      const closeIcon = wrapper.find(".form__icon-close");

      expect(closeIcon.exists()).toBeTruthy();
    });
    test("Then it renders a heading", () => {
      options = getOptions();
      const wrapper = mount(BoardEdit, options);

      const heading = wrapper.find("h2");

      expect(heading.text()).toBe("Edit the board name");
    });
    test("Then it renders a form", () => {
      options = getOptions();
      const wrapper = mount(BoardEdit, options);

      const form = wrapper.find("form");

      expect(form.exists()).toBeTruthy();
    });
  });
  describe("When the form is rendered", () => {
    test("Then a label for name is rendered", () => {
      options = getOptions();
      const wrapper = mount(BoardEdit, options);

      const label = wrapper.find("label");

      expect(label.exists()).toBeTruthy();
    });
    test("Then an input for name is rendered", () => {
      options = getOptions();
      const wrapper = mount(BoardEdit, options);

      const input = wrapper.find("input");

      expect(input.exists()).toBeTruthy();
    });
    test("Then an edit button is rendered", () => {
      options = getOptions();
      const wrapper = mount(BoardEdit, options);

      const button = wrapper.find("button");

      expect(button.exists()).toBeTruthy();
    });
  });
  describe("When it renders a closing icon and you click it", () => {
    test("Then the method closeModal is called", () => {
      options = getOptionsWithMethods();
      const wrapper = mount(BoardEdit, options);

      const closeIcon = wrapper.find(".form__icon-close");
      closeIcon.trigger("click");

      expect(closeModalMock).toHaveBeenCalled();
    });
    test("Then the action setBoardEditModal is called", () => {
      options = getOptions();
      const wrapper = mount(BoardEdit, options);

      const closeIcon = wrapper.find(".form__icon-close");
      closeIcon.trigger("click");

      expect(setBoardEditModalMock).toHaveBeenCalled();
    });
    test("Then the action setIdForModal is called", () => {
      options = getOptions();
      const wrapper = mount(BoardEdit, options);

      const closeIcon = wrapper.find(".form__icon-close");
      closeIcon.trigger("click");

      expect(setIdForModalMock).toHaveBeenCalled();
    });
  });
  describe("When the outside of the modal is clicked", () => {
    test("Then the method closeModal is called", () => {
      options = getOptionsWithMethods();
      const wrapper = mount(BoardEdit, options);

      const modal = wrapper.find(".modal-edit-board");
      modal.trigger("click");

      expect(closeModalMock).toHaveBeenCalled();
    });
    test("Then the action setBoardEditModal is called", () => {
      options = getOptions();
      const wrapper = mount(BoardEdit, options);

      const modal = wrapper.find(".modal-edit-board");
      modal.trigger("click");

      expect(setBoardEditModalMock).toHaveBeenCalled();
    });
    test("Then the action setBoardEditModal is called", () => {
      options = getOptions();
      const wrapper = mount(BoardEdit, options);

      const modal = wrapper.find(".modal-edit-board");
      modal.trigger("click");

      expect(setIdForModalMock).toHaveBeenCalled();
    });
  });
  describe("When the input is left empty", () => {
    test("Then the edit button is disabled", () => {
      options = getOptions();
      const wrapper = mount(BoardEdit, options);

      const input = wrapper.find("input");
      input.setValue("");

      const button = wrapper.find("button");

      expect(button.element.getAttributeNames()).toContain("disabled");
    });
  });
  describe("When input has been rewritten and the edit button clicked", () => {
    test("Then the onSubmit method gets called", () => {
      options = getOptionsWithMethods();
      const wrapper = mount(BoardEdit, options);

      const input = wrapper.find("input");
      input.setValue("Mario");

      const form = wrapper.find("form");
      form.trigger("submit.prevent");

      expect(onSubmitMock).toHaveBeenCalled();
    });
    test("Then the onSubmit method gets called", () => {
      options = getOptions();
      const wrapper = mount(BoardEdit, options);

      const input = wrapper.find("input");
      input.setValue("Mario");

      const form = wrapper.find("form");
      form.trigger("submit.prevent");

      expect(editNameBoardMock).toHaveBeenCalled();
    });
  });
});
