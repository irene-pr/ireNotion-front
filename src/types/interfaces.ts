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
  isLoading: boolean;
  isLoggedIn: boolean;
  userContent: IUserContent;
  userData: IUserData;
  themeHeaders: string;
  themeSurfaces: string;
  isBoardEditModal: boolean;
  isUpdateNoteModal: boolean;
  idForModal: string;
}

export interface IUserLoginData {
  username: string;
  password: string;
}

export interface IUserRegisterData {
  name: string;
  username: string;
  password: string;
}

export interface IBodyEditNameBoard {
  idBoard: string;
  newName: string;
}
export interface IBodyUpdateNote {
  idNote: string;
  updatedNote: INote;
}
