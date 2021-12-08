import { mount } from "@vue/test-utils";
import { createStore } from "vuex";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { IState } from "@/types/interfaces";
import Note from "@/components/Board/Note.vue";

library.add(fas);

describe("Given a Note component", () => {
  let mockedState: IState;
  let deleteNoteMock = jest.fn();
  let updateNoteMock = jest.fn();
  let setIdForModalMock = jest.fn();
  let setUpdateNoteModalMock = jest.fn();
  let onClickOpenModalMock = jest.fn();
  let onClickDeleteMock = jest.fn();
  let store = createStore({});
  let options = {
    components: {
      "font-awesome-icon": FontAwesomeIcon,

      Note,
    },
    stubs: ["FontAwesomeIcon"],
    global: {
      plugins: [store],
    },
    mocks: {
      $store: store,
    },
    props: {
      note: {
        type: "paragraph",
        color: "yellow",
        title: "title",
        paragraph: "paragraph",
        id: "123",
      },
      idBoard: "234",
    },
  };
  function getOptions() {
    return {
      components: {
        "font-awesome-icon": FontAwesomeIcon,

        Note,
      },
      stubs: ["FontAwesomeIcon"],
      global: {
        plugins: [store],
      },
      mocks: {
        $store: store,
      },
      props: {
        note: {
          type: "paragraph",
          color: "yellow",
          title: "title",
          paragraph: "paragraph",
          id: "123",
        },
        idBoard: "234",
      },
    };
  }
  function getOptionsWithMethods() {
    return {
      components: {
        "font-awesome-icon": FontAwesomeIcon,

        Note,
      },
      stubs: ["FontAwesomeIcon"],
      global: {
        plugins: [store],
      },
      methods: {
        onClickOpenModal: onClickOpenModalMock,
        onClickDelete: onClickDeleteMock,
      },
      mocks: {
        $store: store,
      },
      props: {
        note: {
          type: "paragraph",
          color: "yellow",
          title: "title",
          paragraph: "paragraph",
          id: "123",
        },
        idBoard: "234",
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
            notes: [{ type: "paragraph", color: "yellow" }],
            id: "123",
          },
          {
            type: "board",
            name: "tablero2",
            notes: [{ type: "paragraph", color: "yellow" }],
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
      isUpdateNoteModal: false,
      idForModal: "",
    };
    deleteNoteMock = jest.fn();
    updateNoteMock = jest.fn();
    setIdForModalMock = jest.fn();
    setUpdateNoteModalMock = jest.fn();
    onClickOpenModalMock = jest.fn();
    onClickDeleteMock = jest.fn();
    store = createStore({
      state() {
        return mockedState;
      },
      actions: {
        deleteNote: deleteNoteMock,
        updateNote: updateNoteMock,
        setUpdateNoteModal: setUpdateNoteModalMock,
        setIdForModal: setIdForModalMock,
      },
    });
  });
  describe("When it is rendered", () => {
    test("Then it renders", () => {
      options = getOptions();
      mount(Note, options);
    });
    test("Then the it matches the snapshot", () => {
      options = getOptions();
      const wrapper = mount(Note, options);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
  describe("When I double click on the note", () => {
    test("Then the method onClickOpenModal gets called", () => {
      options = getOptionsWithMethods();
      const wrapper = mount(Note, options);

      const note = wrapper.find(".note-paragraph");
      note.trigger("dblclick");

      expect(onClickOpenModalMock).toHaveBeenCalled();
    });
    test("Then the action setUpdateNoteModal gets called", () => {
      options = getOptions();
      const wrapper = mount(Note, options);

      const note = wrapper.find(".note-paragraph");
      note.trigger("dblclick");

      expect(setUpdateNoteModalMock).toHaveBeenCalled();
    });
    test("Then the action setUpdateNoteModal gets called with true", () => {
      options = getOptions();
      const wrapper = mount(Note, options);

      const note = wrapper.find(".note-paragraph");
      note.trigger("dblclick");

      expect(setUpdateNoteModalMock.mock.calls[0][1]).toBe(true);
    });
    test("Then the action setIdForModal gets called", () => {
      options = getOptions();
      const wrapper = mount(Note, options);

      const note = wrapper.find(".note-paragraph");
      note.trigger("dblclick");

      expect(setIdForModalMock).toHaveBeenCalled();
    });
    test("Then the action setIdForModal gets called", () => {
      options = getOptions();
      const noteId = "123";
      const wrapper = mount(Note, options);

      const note = wrapper.find(".note-paragraph");
      note.trigger("dblclick");

      expect(setIdForModalMock.mock.calls[0][1]).toBe(noteId);
    });
  });
  describe("When I click on the pencil", () => {
    test("Then the method onClickOpenModal gets called", () => {
      options = getOptionsWithMethods();
      const wrapper = mount(Note, options);

      const pencil = wrapper.find(".form__icon-update");
      pencil.trigger("click");

      expect(onClickOpenModalMock).toHaveBeenCalled();
    });
    test("Then the action setUpdateNoteModal gets called", () => {
      options = getOptions();
      const wrapper = mount(Note, options);

      const pencil = wrapper.find(".form__icon-update");
      pencil.trigger("click");

      expect(setUpdateNoteModalMock).toHaveBeenCalled();
    });
    test("Then the action setUpdateNoteModal gets called with true", () => {
      options = getOptions();
      const wrapper = mount(Note, options);

      const pencil = wrapper.find(".form__icon-update");
      pencil.trigger("click");

      expect(setUpdateNoteModalMock.mock.calls[0][1]).toBe(true);
    });
    test("Then the action setIdForModal gets called", () => {
      options = getOptions();
      const wrapper = mount(Note, options);

      const pencil = wrapper.find(".form__icon-update");
      pencil.trigger("click");

      expect(setIdForModalMock).toHaveBeenCalled();
    });
    test("Then the action setIdForModal gets called", () => {
      options = getOptions();
      const noteId = "123";
      const wrapper = mount(Note, options);

      const pencil = wrapper.find(".form__icon-update");
      pencil.trigger("click");

      expect(setIdForModalMock.mock.calls[0][1]).toBe(noteId);
    });
  });
  describe("When I click on the cross", () => {
    test("Then the method onClickOpenModal gets called", () => {
      options = getOptionsWithMethods();
      const wrapper = mount(Note, options);

      const cross = wrapper.find(".form__icon-close");
      cross.trigger("click");

      expect(onClickDeleteMock).toHaveBeenCalled();
    });
    test("Then the action setUpdateNoteModal gets called", () => {
      options = getOptions();
      const wrapper = mount(Note, options);

      const cross = wrapper.find(".form__icon-close");
      cross.trigger("click");

      expect(deleteNoteMock).toHaveBeenCalled();
    });
    test("Then the action setUpdateNoteModal gets called with true", () => {
      options = getOptions();
      const params = "234/123";
      const wrapper = mount(Note, options);

      const cross = wrapper.find(".form__icon-close");
      cross.trigger("click");

      expect(deleteNoteMock.mock.calls[0][1]).toBe(params);
    });
  });
});
