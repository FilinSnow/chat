import Chat from "../components/Chat/Chat";
import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";
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
  {
    element: Register,
    path: ConstsPath.REGISTER,
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