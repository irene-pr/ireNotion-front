import { IModalState } from "@/types/store";

const mutations = {
  setIsBoardEditModal(state: IModalState, payload: boolean): void {
    state.isBoardEditModal = payload;
  },

  setIsUpdateNoteModal(state: IModalState, payload: boolean): void {
    state.isUpdateNoteModal = payload;
  },

  setIdForModal(state: IModalState, payload: string): void {
    state.idForModal = payload;
  },
};

export default mutations;
