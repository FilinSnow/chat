import { store } from "../../store/store";
import { IUser, IUserReducer } from "../interfaces/interfaces";

export type TMessage = {
  createData: string;
  isChanged: boolean;
  room: string;
  tags: Array<Array<TTags>>;
  voice: string;
  text: string;
  user: IUser;
  _id?: string;
};

export type TTags = {
  displayName: string;
  email: string;
};

export type Anchor = "bottom";

export type IUserCreate = Omit<IUserReducer, 'uid'>
export type IUserLogin = Omit<IUserReducer, 'uid' | 'firstName' | 'lastName'>

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;