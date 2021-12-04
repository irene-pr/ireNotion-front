export interface IChecklist {
  isChecked: boolean;
  paragraph: string;
}

export interface INote {
  type: string;
  color: string;
  position?: number;
  title?: string;
  paragraph?: string;
  list?: Array<string | IChecklist>;
  id: string;
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
  userData: IUserData;
  userContent: IUserContent;
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
