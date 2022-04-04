import Chat from "../components/Chat/Chat";
import Login from "../components/Login/Login";
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