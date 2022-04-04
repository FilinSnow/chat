import Chat from "../components/Chat/Chat";
import Login from "../components/Login/Login";
import Main from "../components/Main/Main";
import Test from "../components/Test";
import { ConstsPath } from "../utils/consts";

interface IRoute {
  path: string;
  element: any;
  exact: boolean;
}


export const publicRoutes: IRoute[] = [
  {
    element: Login,
    path: ConstsPath.LOGIN,
    exact: true
  },
]


export const privateRoutes: IRoute[] = [
  {
    element: Chat,
    path: ConstsPath.CHAT,
    exact: true
  },
]