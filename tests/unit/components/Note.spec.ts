import { mount } from "@vue/test-utils";
import { createStore } from "vuex";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { IState } from "@/types/store";
import Note from "@/components/Board/Note.vue";

library.add(fas);

describe("Given a Note component", () => {
  let mockedState: IState;
  let deleteNoteMock = jest.fn();
  let updateNoteMock = jest.fn();
  let setUpdateNoteModalMock = jest.fn();
  let setUpdateListNoteModalMock = jest.fn();
  let setUpdateChecklistNoteModalMock = jest.fn();
  let setIdForModalMock = jest.fn();
  let onClickOpenModalMock = jest.fn();
  let onClickOpenListModalMock = jest.fn();
  let onClickOpenChecklistModalMock = jest.fn();
  let onClickDeleteMock = jest.fn();
  let store = createStore({});
  let options: any;
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
          id: "paragraphId",
        },
        idBoard: "boardId",
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
          id: "paragraphId",
        },
        idBoard: "boardId",
      },
    };
  }
  function getListOptions() {
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
          type: "list",
          color: "yellow",
          title: "title",
          list: ["el1", "el2"],
          id: "listId",
        },
        idBoard: "boardId",
      },
    };
  }
  function getListOptionsWithMethods() {
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
        onClickOpenListModal: onClickOpenListModalMock,
        onClickDelete: onClickDeleteMock,
      },
      mocks: {
        $store: store,
      },
      props: {
        note: {
          type: "list",
          color: "yellow",
          title: "title",
          list: ["el1", "el2"],
          id: "listId",
        },
        idBoard: "boardId",
      },
    };
  }
  function getChecklistOptions() {
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
          type: "checklist",
          color: "yellow",
          title: "title",
          list: [
            { sentence: "el1", checked: true },
            { sentence: "el2", checked: false },
          ],
          id: "checklistId",
        },
        idBoard: "boardId",
      },
    };
  }
  function getChecklistOptionsWithMethods() {
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
        onClickOpenChecklistModal: onClickOpenChecklistModalMock,
        onClickDelete: onClickDeleteMock,
      },
      mocks: {
        $store: store,
      },
      props: {
        note: {
          type: "checklist",
          color: "yellow",
          title: "title",
          list: [
            { sentence: "el1", checked: true },
            { sentence: "el2", checked: false },
          ],
          id: "checklistId",
        },
        idBoard: "boardId",
      },
    };
  }
  function getImageOptions() {
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
          type: "image",
          color: "yellow",
          file: "url",
          id: "imageId",
        },
        idBoard: "boardId",
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
            notes: [{ id: "123", type: "paragraph", color: "yellow" }],
            id: "123",
          },
          {
            type: "board",
            name: "tablero2",
            notes: [{ id: "234", type: "list", color: "yellow" }],
            id: "234",
          },
          {
            type: "board",
            name: "tablero3",
            notes: [{ id: "234", type: "checklist", color: "yellow" }],
            id: "345",
          },
          {
            type: "board",
            name: "tablero4",
            notes: [{ id: "234", type: "image", color: "yellow" }],
            id: "456",
          },
        ],
      },
      userData: {
        userId: "",
        username: "",
      },
      isBoardEditModal: false,
      isUpdateNoteModal: false,
      isUpdateListNoteModal: false,
      isUpdateChecklistNoteModal: false,
      idForModal: "",
      themeSurfaces: "day-mode",
      themeHeaders: "night-mode",
      listForModal: [],
      checklistForModal: [],
    };
    deleteNoteMock = jest.fn();
    updateNoteMock = jest.fn();
    setIdForModalMock = jest.fn();
    setUpdateNoteModalMock = jest.fn();
    setUpdateListNoteModalMock = jest.fn();
    setUpdateChecklistNoteModalMock = jest.fn();
    onClickOpenModalMock = jest.fn();
    onClickOpenListModalMock = jest.fn();
    onClickOpenChecklistModalMock = jest.fn();
    onClickDeleteMock = jest.fn();
    store = createStore({
      state() {
        return mockedState;
      },
      modules: {
        user: {
          namespaced: true,
          actions: {
            deleteNote: deleteNoteMock,
            updateNote: updateNoteMock,
          },
        },
        modal: {
          namespaced: true,
          actions: {
            setIdForModal: setIdForModalMock,
            setUpdateNoteModal: setUpdateNoteModalMock,
            setUpdateListNoteModal: setUpdateListNoteModalMock,
            setUpdateChecklistNoteModal: setUpdateChecklistNoteModalMock,
          },
        },
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
    test("As a list then it renders", () => {
      options = getListOptions();
      mount(Note, options);
    });
    test("As a checklist then it renders", () => {
      options = getChecklistOptions();
      mount(Note, options);
    });
    test("As an image then it renders", () => {
      options = getImageOptions();
      mount(Note, options);
    });
  });
  describe("When I double click on the paragraph note", () => {
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
      const noteId = "paragraphId";
      const wrapper = mount(Note, options);

      const note = wrapper.find(".note-paragraph");
      note.trigger("dblclick");

      expect(setIdForModalMock.mock.calls[0][1]).toBe(noteId);
    });
  });
  describe("When I double click on the list note", () => {
    test("Then the method onClickOpenListModal gets called", () => {
      options = getListOptionsWithMethods();
      const wrapper = mount(Note, options);

      const note = wrapper.find(".note-list");
      note.trigger("dblclick");

      expect(onClickOpenListModalMock).toHaveBeenCalled();
    });
    test("Then the action setUpdateListNoteModal gets called", () => {
      options = getListOptions();
      const wrapper = mount(Note, options);

      const note = wrapper.find(".note-list");
      note.trigger("dblclick");

      expect(setUpdateListNoteModalMock).toHaveBeenCalled();
    });
    test("Then the action setUpdateListNoteModal gets called with true", () => {
      options = getListOptions();
      const wrapper = mount(Note, options);

      const note = wrapper.find(".note-list");
      note.trigger("dblclick");

      expect(setUpdateListNoteModalMock.mock.calls[0][1]).toBe(true);
    });
    test("Then the action setIdForModal gets called", () => {
      options = getListOptions();
      const wrapper = mount(Note, options);

      const note = wrapper.find(".note-list");
      note.trigger("dblclick");

      expect(setIdForModalMock).toHaveBeenCalled();
    });
    test("Then the action setIdForModal gets called", () => {
      options = getListOptions();
      const noteId = "listId";
      const wrapper = mount(Note, options);

      const note = wrapper.find(".note-list");
      note.trigger("dblclick");

      expect(setIdForModalMock.mock.calls[0][1]).toBe(noteId);
    });
  });
  describe("When I double click on the checklist note", () => {
    test("Then the method onClickOpenChecklistModal gets called", () => {
      options = getChecklistOptionsWithMethods();
      const wrapper = mount(Note, options);

      const note = wrapper.find(".note-checklist");
      note.trigger("dblclick");

      expect(onClickOpenChecklistModalMock).toHaveBeenCalled();
    });
    test("Then the action setUpdateChecklistNoteModal gets called", () => {
      options = getChecklistOptions();
      const wrapper = mount(Note, options);

      const note = wrapper.find(".note-checklist");
      note.trigger("dblclick");

      expect(setUpdateChecklistNoteModalMock).toHaveBeenCalled();
    });
    test("Then the action setUpdateChecklistNoteModal gets called with true", () => {
      options = getChecklistOptions();
      const wrapper = mount(Note, options);

      const note = wrapper.find(".note-checklist");
      note.trigger("dblclick");

      expect(setUpdateChecklistNoteModalMock.mock.calls[0][1]).toBe(true);
    });
    test("Then the action setIdForModal gets called", () => {
      options = getChecklistOptions();
      const wrapper = mount(Note, options);

      const note = wrapper.find(".note-checklist");
      note.trigger("dblclick");

      expect(setIdForModalMock).toHaveBeenCalled();
    });
    test("Then the action setIdForModal gets called", () => {
      options = getChecklistOptions();
      const noteId = "checklistId";
      const wrapper = mount(Note, options);

      const note = wrapper.find(".note-checklist");
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
      const noteId = "paragraphId";
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
      const params = "boardId/paragraphId";
      const wrapper = mount(Note, options);

      const cross = wrapper.find(".form__icon-close");
      cross.trigger("click");

      expect(deleteNoteMock.mock.calls[0][1]).toBe(params);
    });
  });
});
