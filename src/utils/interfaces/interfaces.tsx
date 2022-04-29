import { TMessage } from "../types/types";

export interface IAuth {
  flag?: boolean;
  setFlag?: (tmp: boolean) => void;
  auth?: boolean | any;
  setAuth?: (tmp: boolean) => void;
  theme?: any;
  setTheme?: any;
}

export interface IAction {
  type: string;
  data: any;
}

export interface IChat {
  theme: string;
  messages: TMessage[];
  handleAddMessage: (message: string) => void;
}

export interface IntTopUsers {
  name: any, 
  count: any
}

export interface IRoute {
  path: string;
  element: any;
  exact: boolean;
}

export interface IFormDataLogin {
  displayName: string;
  email: string;
  roomId: string;
  password: string;
  showPassword: boolean;
}

export interface IEmoji {
  value: any;
  setValue: any;
}

export interface IMain {
  flag?: boolean;
  setFlag?: () => void
}

export interface IFormDataRegister extends Omit<IFormDataLogin, 'displayName' | 'roomId'> {
  firstName: string;
  lastName: string;
  confirmPassword: string;
  showPasswordConfirm: boolean;
}

export interface IOnChangeLogin {
  setFormData: (val: (prevprops: IFormDataLogin) => IFormDataLogin) => void
}

export interface IOnChangeRegister {
  setFormData: (val: (prevprops: IFormDataRegister) => IFormDataRegister) => void
}

export interface IFormError {
  errorPassword: boolean
}

export interface IMessage {
  message: TMessage[];
  user: any;
  theme?: string | undefined;
  oldDays: Array<string>;
}

export interface IUser {
  avatar: string;
  createData: string;
  email: string;
  firstName: string;
  lastName: string;
  status: string;
  _id: string;
}

export interface IUserReducer {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  uid: string;
}

export interface IAction {
  type: string;
  user: IUserReducer;
}
// export interface IAppRouter extends IAuth {
//   setAuth?: () => void;
// }