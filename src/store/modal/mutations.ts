import { IModalState } from "@/types/store";

const mutations = {
  setIsBoardEditModal(state: IModalState, payload: boolean): void {
    state.isBoardEditModal = payload;
  },

  setIsUpdateNoteModal(state: IModalState, payload: boolean): void {
    state.isUpdateNoteModal = payload;
  },

  setIsUpdateChecklistNoteModal(state: IModalState, payload: boolean): void {
    state.isUpdateChecklistNoteModal = payload;
  },

  setIsUpdateListNoteModal(state: IModalState, payload: boolean): void {
    state.isUpdateListNoteModal = payload;
  },

  setIdForModal(state: IModalState, payload: string): void {
    state.idForModal = payload;
  },

  setListForModal(state: IModalState, payload: Array<string>): void {
    state.listForModal = payload;
  },

  addElementToModalList(state: IModalState, payload: string): void {
    state.listForModal = [...state.listForModal, payload];
  },

  deleteElementFromModalList(state: IModalState, payload: number): void {
    state.listForModal.splice(payload, 1);
  },
};

export default mutations;
