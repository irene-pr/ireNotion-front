export interface IChecklist {
  isChecked: boolean;
  paragraph: string;
}

export interface INote {
  type?: string;
  color?: string;
  position?: number;
  title?: string;
  paragraph?: string;
  list?: Array<string | IChecklist>;
  id: string;
  userId?: string;
}

export interface IBoard {
  type: string;
  name: string;
  notes: Array<INote>;
  id: string;
}

export interface IUserContent {
  name: string;
  boards: Array<IBoard>;
}

export interface IUserData {
  userId: string;
  username: string;
}

export interface IState {
  isLoggedIn: boolean;
  userContent: IUserContent;
  userData: IUserData;
  isLoading: boolean;
  themeHeaders: string;
  themeSurfaces: string;
  isBoardEditModal: boolean;
  isUpdateNoteModal: boolean;
  isUpdateListNoteModal: boolean;
  isUpdateChecklistNoteModal: boolean;
  idForModal: string;
  listForModal: Array<string>;
}

export interface IThemeState {
  themeHeaders: string;
  themeSurfaces: string;
}

export interface IUserState {
  isLoggedIn: boolean;
  userContent: IUserContent;
  userData: IUserData;
  isLoading: boolean;
}

export interface IModalState {
  isBoardEditModal: boolean;
  isUpdateNoteModal: boolean;
  isUpdateListNoteModal: boolean;
  isUpdateChecklistNoteModal: boolean;
  idForModal: string;
  listForModal: Array<string>;
}
