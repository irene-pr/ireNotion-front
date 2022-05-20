import { mount } from "@vue/test-utils";
import { createStore } from "vuex";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import UpdateNote from "@/components/Modals/UpdateNote.vue";
import { IState } from "@/types/store";

library.add(fas);

describe("Given a UpdateNote component", () => {
  let mockedState: IState;
  let updateNoteMock = jest.fn();
  let setUpdateNoteModalMock = jest.fn();
  let setIdForModalMock = jest.fn();
  let onSubmitParagraphMock = jest.fn();
  let closeModalMock = jest.fn();
  let store = createStore({});
  let options = {
    data() {
      return {
        type: "",
        order: "",
        color: "",
        title: "",
        paragraph: "",
        list: [],
        file: "",
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
  function getOptions() {
    return {
      data() {
        return {
          type: "",
          order: "",
          color: "",
          title: "",
          paragraph: "",
          list: [],
          file: "",
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
          type: "",
          order: "",
          color: "",
          title: "",
          paragraph: "",
          list: [],
          file: "",
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
        onSubmitParagraph: onSubmitParagraphMock,
        closeModal: closeModalMock,
      },
      mocks: {
        $store: store,
      },
    };
  }

  beforeEach(() => {
    mockedState = {
      isLoading: false,
      isLoggedIn: true,
      userContent: {
        name: "Franny",
        boards: [
          {
            type: "board",
            name: "tablero1",
            notes: [
              {
                type: "paragraph",
                color: "yellow",
                title: "title",
                paragraph: "paragraph",
                id: "678",
              },
            ],
            id: "123",
          },
          {
            type: "board",
            name: "tablero2",
            notes: [{ type: "paragraph", color: "yellow", id: "987" }],
            id: "234",
          },
        ],
      },
      userData: {
        userId: "",
        username: "",
      },
      themeHeaders: "night-mode",
      themeSurfaces: "day-mode",
      isBoardEditModal: false,
      isUpdateNoteModal: true,
      idForModal: "678",
    };
    updateNoteMock = jest.fn();
    setUpdateNoteModalMock = jest.fn();
    setIdForModalMock = jest.fn();
    onSubmitParagraphMock = jest.fn();
    closeModalMock = jest.fn();
    store = createStore({
      state() {
        return mockedState;
      },
      actions: {
        updateNote: updateNoteMock,
        setUpdateNoteModal: setUpdateNoteModalMock,
        setIdForModal: setIdForModalMock,
      },
    });
  });

  describe("When it is rendered", () => {
    test("Then it renders", () => {
      options = getOptions();
      mount(UpdateNote, options);
    });
    test("Then the it matches the snapshot", () => {
      options = getOptions();
      const wrapper = mount(UpdateNote, options);
      expect(wrapper.element).toMatchSnapshot();
    });
    test("Then type of note is 'paragraph'", () => {
      options = getOptions();
      const wrapper = mount(UpdateNote, options);
      expect(wrapper.vm.$data.note.type).toBe("paragraph");
    });
    test("Then color of note is 'yellow'", () => {
      options = getOptions();
      const wrapper = mount(UpdateNote, options);
      expect(wrapper.vm.$data.note.color).toBe("yellow");
    });
    test("Then title of note is 'title'", () => {
      options = getOptions();
      const wrapper = mount(UpdateNote, options);
      expect(wrapper.vm.$data.note.title).toBe("title");
    });
    test("Then paragraph of note is 'paragraph'", () => {
      options = getOptions();
      const wrapper = mount(UpdateNote, options);
      expect(wrapper.vm.$data.note.paragraph).toBe("paragraph");
    });
    test("Then it renders a closing icon", () => {
      options = getOptions();
      const wrapper = mount(UpdateNote, options);

      const closeIcon = wrapper.find(".form__icon-close");

      expect(closeIcon.exists()).toBeTruthy();
    });
    test("Then it renders a heading", () => {
      options = getOptions();
      const wrapper = mount(UpdateNote, options);

      const heading = wrapper.find("h2");

      expect(heading.text()).toBe("Edit the note");
    });
    test("Then it renders a tp text", () => {
      options = getOptions();
      const wrapper = mount(UpdateNote, options);

      const tip = wrapper.find("p");

      expect(tip.text()).toBe(
        "tip: you can leave empty fields, they won't leave an empty space."
      );
    });

    test("Then it renders a form", async () => {
      options = getOptions();
      const wrapper = mount(UpdateNote, options);

      const form = await wrapper.find("form");

      expect(form.exists()).toBeTruthy();
    });
  });
  describe("When the form is rendered", () => {
    test("Then a label for title is rendered", () => {
      options = getOptions();
      const wrapper = mount(UpdateNote, options);

      const label = wrapper.find("label[for='title']");

      expect(label.text()).toBe("Title");
    });
    test("Then an input for title is rendered", () => {
      options = getOptions();
      const wrapper = mount(UpdateNote, options);

      const input = wrapper.find("input[id='title']");

      expect(input.exists()).toBeTruthy();
    });
    test("Then a label for text is rendered", () => {
      options = getOptions();
      const wrapper = mount(UpdateNote, options);

      const label = wrapper.find("label[for='text']");

      expect(label.text()).toBe("Text");
    });
    test("Then a textarea for text is rendered", () => {
      options = getOptions();
      const wrapper = mount(UpdateNote, options);

      const textarea = wrapper.find("textarea[id='text']");

      expect(textarea.exists()).toBeTruthy();
    });
    test("Then 5 inputs radio are rendered", () => {
      options = getOptions();
      const wrapper = mount(UpdateNote, options);

      const radio = wrapper.findAll("input[type='radio']");

      expect(radio).toHaveLength(5);
    });
    test("Then 5 labels for colors are rendered", () => {
      options = getOptions();
      const wrapper = mount(UpdateNote, options);

      const labelPink = wrapper.find("label[for='pink']");
      const labelYellow = wrapper.find("label[for='yellow']");
      const labelBlue = wrapper.find("label[for='blue']");
      const labelOrange = wrapper.find("label[for='orange']");
      const labelGreen = wrapper.find("label[for='green']");

      expect(labelPink.exists()).toBeTruthy();
      expect(labelBlue.exists()).toBeTruthy();
      expect(labelGreen.exists()).toBeTruthy();
      expect(labelOrange.exists()).toBeTruthy();
      expect(labelYellow.exists()).toBeTruthy();
    });
    test("Then an edit button is rendered", () => {
      options = getOptions();
      const wrapper = mount(UpdateNote, options);

      const button = wrapper.find("button");

      expect(button.exists()).toBeTruthy();
    });
  });
  describe("When it renders a closing icon and you click it", () => {
    test("Then the method closeModal is called", () => {
      options = getOptionsWithMethods();
      const wrapper = mount(UpdateNote, options);

      const closeIcon = wrapper.find(".form__icon-close");
      closeIcon.trigger("click");

      expect(closeModalMock).toHaveBeenCalled();
    });
    test("Then the action setUpdateNoteModal is called", () => {
      options = getOptions();
      const wrapper = mount(UpdateNote, options);

      const closeIcon = wrapper.find(".form__icon-close");
      closeIcon.trigger("click");

      expect(setUpdateNoteModalMock).toHaveBeenCalled();
    });
    test("Then the action setUpdateNoteModal is called", () => {
      options = getOptions();
      const wrapper = mount(UpdateNote, options);

      const closeIcon = wrapper.find(".form__icon-close");
      closeIcon.trigger("click");

      expect(setIdForModalMock).toHaveBeenCalled();
    });
  });
  describe("When the modal is double clicked", () => {
    test("Then the method closeModal is called", () => {
      options = getOptionsWithMethods();
      const wrapper = mount(UpdateNote, options);

      const modal = wrapper.find(".modal");
      modal.trigger("dblclick");

      expect(closeModalMock).toHaveBeenCalled();
    });
    test("Then the action setUpdateNoteModal is called", () => {
      options = getOptions();
      const wrapper = mount(UpdateNote, options);

      const modal = wrapper.find(".modal");
      modal.trigger("dblclick");

      expect(setUpdateNoteModalMock).toHaveBeenCalled();
    });
    test("Then the action setIdForModal is called", () => {
      options = getOptions();
      const wrapper = mount(UpdateNote, options);

      const modal = wrapper.find(".modal");
      modal.trigger("dblclick");

      expect(setIdForModalMock).toHaveBeenCalled();
    });
  });

  describe("When input has been rewritten and the edit button clicked", () => {
    test("Then the onSubmit method gets called", () => {
      options = getOptionsWithMethods();
      const wrapper = mount(UpdateNote, options);

      const input = wrapper.find("input");
      input.setValue("Mario");

      const form = wrapper.find("form");
      form.trigger("submit.prevent");

      expect(onSubmitParagraphMock).toHaveBeenCalled();
    });
    test("Then the onSubmit method gets called", () => {
      options = getOptions();
      const wrapper = mount(UpdateNote, options);

      const input = wrapper.find("input");
      input.setValue("Mario");

      const form = wrapper.find("form");
      form.trigger("submit.prevent");

      expect(updateNoteMock).toHaveBeenCalled();
    });
  });
});
